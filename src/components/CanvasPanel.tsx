import { useEffect, useRef, useCallback, useState } from 'react';
import { useSimulationStore } from '../store/useSimulationStore';
import { WebGLTrailRenderer } from './WebGLTrailRenderer';
import { applyHueCycling } from '../utils/colorUtils';

const DEFAULT_CANVAS_SIZE = 800;
const GRID_SIZE = 400;

interface CanvasPanelProps {
  isFullscreen?: boolean;
}

// Helper: Convert aspect ratio string to [width, height] multipliers
function getAspectRatioMultipliers(ratio: string): [number, number] {
  const [w, h] = ratio.split(':').map(Number);
  return [w, h];
}

// Canvas pool for reusable temporary canvases
class CanvasPool {
  private pool: HTMLCanvasElement[] = [];
  private inUse = new Set<HTMLCanvasElement>();

  acquire(width: number, height: number): HTMLCanvasElement {
    let canvas = this.pool.find(c => !this.inUse.has(c) && c.width === width && c.height === height);

    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      this.pool.push(canvas);
    }

    this.inUse.add(canvas);
    return canvas;
  }

  release(canvas: HTMLCanvasElement): void {
    this.inUse.delete(canvas);
  }

  releaseAll(): void {
    this.inUse.clear();
  }
}

export function CanvasPanel({ isFullscreen = false }: CanvasPanelProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const motionBlurCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Responsive canvas size (based on window size in fullscreen and aspect ratio)
  const [canvasWidth, setCanvasWidth] = useState(DEFAULT_CANVAS_SIZE);
  const [canvasHeight, setCanvasHeight] = useState(DEFAULT_CANVAS_SIZE);
  const [scaleX, setScaleX] = useState(DEFAULT_CANVAS_SIZE / GRID_SIZE);
  const [scaleY, setScaleY] = useState(DEFAULT_CANVAS_SIZE / GRID_SIZE);

  // WebGL renderer for trails (major performance boost)
  const webglRendererRef = useRef<WebGLTrailRenderer | null>(null);

  // Canvas pool for temporary canvases (object pooling)
  const canvasPoolRef = useRef<CanvasPool>(new CanvasPool());

  // Scanline pattern cache
  const scanlinePatternRef = useRef<CanvasPattern | null>(null);

  // FPS tracking
  const lastFrameTimeRef = useRef<number>(performance.now());
  const fpsHistoryRef = useRef<number[]>([]);
  const frameCounterRef = useRef<number>(0);

  const tick = useSimulationStore((state) => state.tick);
  const trails = useSimulationStore((state) => state.trails);
  const agents = useSimulationStore((state) => state.agents);
  const running = useSimulationStore((state) => state.running);
  const visualization = useSimulationStore((state) => state.parameters.visualization);
  const effects = useSimulationStore((state) => state.parameters.effects);
  const updatePerformanceMetrics = useSimulationStore((state) => state.updatePerformanceMetrics);
  const performAutoOptimization = useSimulationStore((state) => state.performAutoOptimization);
  const playbackSpeed = useSimulationStore((state) => state.ui.playbackSpeed);
  const aspectRatio = useSimulationStore((state) => state.ui.aspectRatio);

  // Responsive canvas sizing based on fullscreen mode and aspect ratio
  useEffect(() => {
    const updateCanvasSize = () => {
      const [ratioW, ratioH] = getAspectRatioMultipliers(aspectRatio);

      if (isFullscreen) {
        // In fullscreen: use window dimensions, maintaining aspect ratio
        const maxWidth = window.innerWidth;
        const maxHeight = window.innerHeight;

        // Use device pixel ratio for sharp rendering on high-DPI displays
        const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for performance

        // Calculate size that fits the screen while maintaining aspect ratio
        const widthBasedSize = maxWidth * dpr;
        const heightBasedSize = maxHeight * dpr;

        // Determine which dimension is limiting
        const widthLimitedHeight = (widthBasedSize / ratioW) * ratioH;
        const heightLimitedWidth = (heightBasedSize / ratioH) * ratioW;

        let finalWidth, finalHeight;
        if (widthLimitedHeight <= heightBasedSize) {
          // Width is the limiting factor
          finalWidth = widthBasedSize;
          finalHeight = widthLimitedHeight;
        } else {
          // Height is the limiting factor
          finalWidth = heightLimitedWidth;
          finalHeight = heightBasedSize;
        }

        // Cap maximum size at 2400px for longest dimension
        const maxDimension = Math.max(finalWidth, finalHeight);
        if (maxDimension > 2400) {
          const scaleFactor = 2400 / maxDimension;
          finalWidth *= scaleFactor;
          finalHeight *= scaleFactor;
        }

        // Ensure minimum size
        const minSize = GRID_SIZE;
        finalWidth = Math.max(minSize, Math.floor(finalWidth));
        finalHeight = Math.max(minSize, Math.floor(finalHeight));

        setCanvasWidth(finalWidth);
        setCanvasHeight(finalHeight);
        setScaleX(finalWidth / GRID_SIZE);
        setScaleY(finalHeight / GRID_SIZE);
      } else {
        // Normal mode: calculate canvas size based on aspect ratio
        const baseSize = DEFAULT_CANVAS_SIZE;
        let width, height;

        if (ratioW > ratioH) {
          // Landscape
          width = baseSize;
          height = (baseSize / ratioW) * ratioH;
        } else if (ratioH > ratioW) {
          // Portrait
          height = baseSize;
          width = (baseSize / ratioH) * ratioW;
        } else {
          // Square
          width = baseSize;
          height = baseSize;
        }

        setCanvasWidth(Math.floor(width));
        setCanvasHeight(Math.floor(height));
        setScaleX(width / GRID_SIZE);
        setScaleY(height / GRID_SIZE);
      }
    };

    updateCanvasSize();

    if (isFullscreen) {
      window.addEventListener('resize', updateCanvasSize);
      return () => window.removeEventListener('resize', updateCanvasSize);
    }
  }, [isFullscreen, aspectRatio]);

  // Initialize/update WebGL renderer, motion blur canvas, and scanline pattern when canvas size changes
  useEffect(() => {
    // WebGL renderer - recreate when canvas size changes
    // Use actual canvas dimensions (not square) for correct aspect ratio
    if (webglRendererRef.current) {
      webglRendererRef.current.destroy();
    }
    webglRendererRef.current = new WebGLTrailRenderer(canvasWidth, canvasHeight, GRID_SIZE);

    // Motion blur canvas - resize when canvas size changes
    if (!motionBlurCanvasRef.current) {
      motionBlurCanvasRef.current = document.createElement('canvas');
    }
    motionBlurCanvasRef.current.width = canvasWidth;
    motionBlurCanvasRef.current.height = canvasHeight;

    // Scanline pattern (cached for performance)
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        const patternCanvas = document.createElement('canvas');
        patternCanvas.width = 1;
        patternCanvas.height = 2;
        const patternCtx = patternCanvas.getContext('2d');
        if (patternCtx) {
          patternCtx.fillStyle = 'rgba(0, 0, 0, 0.3)';
          patternCtx.fillRect(0, 0, 1, 1);
          patternCtx.fillStyle = 'transparent';
          patternCtx.fillRect(0, 1, 1, 1);
          scanlinePatternRef.current = ctx.createPattern(patternCanvas, 'repeat');
        }
      }
    }

    return () => {
      // Cleanup
      if (webglRendererRef.current) {
        webglRendererRef.current.destroy();
        webglRendererRef.current = null;
      }
    };
  }, [canvasWidth, canvasHeight]);

  // Render function with post-processing effects (OPTIMIZED)
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const canvasPool = canvasPoolRef.current;

    // Apply hue cycling if enabled (using performance.now() for smooth animation)
    const currentVisualization = applyHueCycling(visualization, performance.now());

    // === 1. Render base trails ===
    // Hybrid approach: WebGL for trails (fast, smooth lavalamp effects)
    //                  CPU for agent pixels (precise positioning)
    const USE_WEBGL = true;

    if (USE_WEBGL && webglRendererRef.current) {
      // WebGL rendering for trails - perfect for lavalamp/schlieren effects
      const webglCanvas = webglRendererRef.current.render(trails, currentVisualization);
      ctx.drawImage(webglCanvas, 0, 0);
    } else {
      // CPU rendering (slower but visually accurate)
      ctx.fillStyle = `rgb(${currentVisualization.colorBg.r}, ${currentVisualization.colorBg.g}, ${currentVisualization.colorBg.b})`;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      const imageData = ctx.createImageData(canvasWidth, canvasHeight);
      const data = imageData.data;

      for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
          const idx = y * GRID_SIZE + x;

          const redVal = trails.red[idx];
          const greenVal = trails.green[idx];
          const blueVal = trails.blue[idx];

          // Scale to canvas size (scaleX/scaleY blocks)
          for (let dy = 0; dy < scaleY; dy++) {
            for (let dx = 0; dx < scaleX; dx++) {
              const canvasX = x * scaleX + dx;
              const canvasY = y * scaleY + dy;
              const pixelIdx = (canvasY * canvasWidth + canvasX) * 4;

              // Initialize with background
              data[pixelIdx] = currentVisualization.colorBg.r;
              data[pixelIdx + 1] = currentVisualization.colorBg.g;
              data[pixelIdx + 2] = currentVisualization.colorBg.b;
              data[pixelIdx + 3] = 255;

              // Apply blend mode
              if (currentVisualization.blendMode === 'additive') {
                const tR = Math.min(1, redVal / currentVisualization.trailIntensity);
                const tG = Math.min(1, greenVal / currentVisualization.trailIntensity);
                const tB = Math.min(1, blueVal / currentVisualization.trailIntensity);

                const totalIntensity = tR + tG + tB;
                const normalizationFactor = totalIntensity > 1.5 ? (1.5 / totalIntensity) : 1.0;
                const effectiveBrightness = currentVisualization.brightness * normalizationFactor;

                data[pixelIdx] += currentVisualization.colorRed.r * tR * effectiveBrightness;
                data[pixelIdx + 1] += currentVisualization.colorRed.g * tR * effectiveBrightness;
                data[pixelIdx + 2] += currentVisualization.colorRed.b * tR * effectiveBrightness;

                data[pixelIdx] += currentVisualization.colorGreen.r * tG * effectiveBrightness;
                data[pixelIdx + 1] += currentVisualization.colorGreen.g * tG * effectiveBrightness;
                data[pixelIdx + 2] += currentVisualization.colorGreen.b * tG * effectiveBrightness;

                data[pixelIdx] += currentVisualization.colorBlue.r * tB * effectiveBrightness;
                data[pixelIdx + 1] += currentVisualization.colorBlue.g * tB * effectiveBrightness;
                data[pixelIdx + 2] += currentVisualization.colorBlue.b * tB * effectiveBrightness;

              } else if (currentVisualization.blendMode === 'multiply' || currentVisualization.blendMode === 'average') {
                const totalTrail = redVal + greenVal + blueVal;
                if (totalTrail > 0) {
                  const t = Math.min(1, totalTrail / currentVisualization.trailIntensity);
                  data[pixelIdx] = (currentVisualization.colorRed.r * redVal + currentVisualization.colorGreen.r * greenVal + currentVisualization.colorBlue.r * blueVal) / totalTrail * t * currentVisualization.brightness;
                  data[pixelIdx + 1] = (currentVisualization.colorRed.g * redVal + currentVisualization.colorGreen.g * greenVal + currentVisualization.colorBlue.g * blueVal) / totalTrail * t * currentVisualization.brightness;
                  data[pixelIdx + 2] = (currentVisualization.colorRed.b * redVal + currentVisualization.colorGreen.b * greenVal + currentVisualization.colorBlue.b * blueVal) / totalTrail * t * currentVisualization.brightness;
                }

              } else if (currentVisualization.blendMode === 'screen') {
                const tR = Math.min(1, redVal / currentVisualization.trailIntensity) * currentVisualization.brightness;
                const tG = Math.min(1, greenVal / currentVisualization.trailIntensity) * currentVisualization.brightness;
                const tB = Math.min(1, blueVal / currentVisualization.trailIntensity) * currentVisualization.brightness;

                const r1 = currentVisualization.colorRed.r * tR / 255;
                const g1 = currentVisualization.colorRed.g * tR / 255;
                const b1 = currentVisualization.colorRed.b * tR / 255;

                const r2 = currentVisualization.colorGreen.r * tG / 255;
                const g2 = currentVisualization.colorGreen.g * tG / 255;
                const b2 = currentVisualization.colorGreen.b * tG / 255;

                const r3 = currentVisualization.colorBlue.r * tB / 255;
                const g3 = currentVisualization.colorBlue.g * tB / 255;
                const b3 = currentVisualization.colorBlue.b * tB / 255;

                data[pixelIdx] = 255 * (1 - (1 - r1) * (1 - r2) * (1 - r3));
                data[pixelIdx + 1] = 255 * (1 - (1 - g1) * (1 - g2) * (1 - g3));
                data[pixelIdx + 2] = 255 * (1 - (1 - b1) * (1 - b2) * (1 - b3));
              }

              // Clamp values
              data[pixelIdx] = Math.min(255, Math.max(0, data[pixelIdx]));
              data[pixelIdx + 1] = Math.min(255, Math.max(0, data[pixelIdx + 1]));
              data[pixelIdx + 2] = Math.min(255, Math.max(0, data[pixelIdx + 2]));
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
    }

    // === 2. Pixelation (Lo-Fi Effect) - OPTIMIZED with object pooling ===
    if (effects.pixelation > 1) {
      const pixelSize = Math.floor(effects.pixelation);
      const smallWidth = Math.floor(canvasWidth / pixelSize);
      const smallHeight = Math.floor(canvasHeight / pixelSize);

      const tempCanvas = canvasPool.acquire(smallWidth, smallHeight);
      const tempCtx = tempCanvas.getContext('2d');

      if (tempCtx) {
        // Downsample
        tempCtx.imageSmoothingEnabled = false;
        tempCtx.drawImage(canvas, 0, 0, smallWidth, smallHeight);

        // Upsample back
        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(tempCanvas, 0, 0, canvasWidth, canvasHeight);
        ctx.imageSmoothingEnabled = true;
      }

      canvasPool.release(tempCanvas);
    }

    // === 3. Motion Blur ===
    if (effects.motionBlur > 0 && motionBlurCanvasRef.current) {
      const mbCanvas = motionBlurCanvasRef.current;
      const mbCtx = mbCanvas.getContext('2d');
      if (mbCtx) {
        // Draw current frame to motion blur canvas with opacity
        mbCtx.globalAlpha = 1 - effects.motionBlur;
        mbCtx.drawImage(canvas, 0, 0);
        mbCtx.globalAlpha = 1;

        // Draw motion blur canvas back to main canvas
        ctx.globalAlpha = effects.motionBlur;
        ctx.drawImage(mbCanvas, 0, 0);
        ctx.globalAlpha = 1;
      }
    }

    // === 4. CSS Filters: Blur, Saturation, Contrast, Hue Shift ===
    const filters: string[] = [];
    if (effects.blur > 0) filters.push(`blur(${effects.blur}px)`);
    if (effects.saturation !== 1.0) filters.push(`saturate(${effects.saturation})`);
    if (effects.contrast !== 1.0) filters.push(`contrast(${effects.contrast})`);
    if (effects.hueShift !== 0) filters.push(`hue-rotate(${effects.hueShift}deg)`);

    if (filters.length > 0) {
      // Use temp canvas to apply filters (can't draw canvas onto itself with filter)
      const tempCanvas = canvasPool.acquire(canvasWidth, canvasHeight);
      const tempCtx = tempCanvas.getContext('2d');

      if (tempCtx) {
        // Copy current canvas to temp
        tempCtx.drawImage(canvas, 0, 0);

        // Apply filters and draw back to main canvas
        ctx.filter = filters.join(' ');
        ctx.drawImage(tempCanvas, 0, 0);
        ctx.filter = 'none';
      }

      canvasPool.release(tempCanvas);
    }

    // === 5. Bloom Effect ===
    if (effects.bloom > 0) {
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = effects.bloom;
      ctx.filter = `blur(${Math.max(8, effects.blur + 8)}px) brightness(1.5)`;
      ctx.drawImage(canvas, 0, 0);
      ctx.filter = 'none';
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    }

    // === 6. Chromatic Aberration - OPTIMIZED with object pooling ===
    if (effects.chromaticAberration > 0) {
      const savedCanvas = canvasPool.acquire(canvasWidth, canvasHeight);
      const savedCtx = savedCanvas.getContext('2d');

      if (savedCtx) {
        // Save the original image before any modifications
        savedCtx.drawImage(canvas, 0, 0);

        // Clear main canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        const offset = effects.chromaticAberration;

        // Use lighter composite to combine offset images for RGB shift effect
        ctx.globalCompositeOperation = 'lighter';
        ctx.globalAlpha = 0.4;  // Reduce brightness since we're drawing 3 times

        // Draw shifted left (red channel effect)
        ctx.drawImage(savedCanvas, -offset, 0);

        // Draw center (green channel effect)
        ctx.drawImage(savedCanvas, 0, 0);

        // Draw shifted right (blue channel effect)
        ctx.drawImage(savedCanvas, offset, 0);

        // Reset composite mode and alpha
        ctx.globalAlpha = 1.0;
        ctx.globalCompositeOperation = 'source-over';
      }

      canvasPool.release(savedCanvas);
    }

    // === 7. Wave Distortion - REMOVED FOR PERFORMANCE ===
    // This effect caused 5-10ms overhead due to getImageData() GPU stall
    // If needed, consider implementing with CSS transform or WebGL shader
    // Keeping the parameter for backward compatibility but not applying the effect

    // === 8. Vignette ===
    if (effects.vignette > 0) {
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;
      const maxRadius = Math.max(canvasWidth, canvasHeight) * 0.7;
      const gradient = ctx.createRadialGradient(
        centerX, centerY, Math.min(canvasWidth, canvasHeight) * 0.3,
        centerX, centerY, maxRadius
      );
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gradient.addColorStop(1, `rgba(0, 0, 0, ${effects.vignette})`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    // === 9. Scanlines (CRT Effect) - OPTIMIZED with cached pattern ===
    if (effects.scanlines > 0 && scanlinePatternRef.current) {
      ctx.globalCompositeOperation = 'multiply';
      ctx.globalAlpha = effects.scanlines;
      ctx.fillStyle = scanlinePatternRef.current;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    }

    // === 10. Render agents (optional - Lab Mode) ===
    // Controlled via currentVisualization.showAgents and currentVisualization.useTriangles
    if (currentVisualization.showAgents && currentVisualization.brightness > 0.5) {
      agents.forEach((agent) => {
        const x = agent.x * scaleX;
        const y = agent.y * scaleY;

        ctx.fillStyle =
          agent.type === 'red'
            ? `rgb(${currentVisualization.colorRed.r}, ${currentVisualization.colorRed.g}, ${currentVisualization.colorRed.b})`
            : agent.type === 'green'
            ? `rgb(${currentVisualization.colorGreen.r}, ${currentVisualization.colorGreen.g}, ${currentVisualization.colorGreen.b})`
            : `rgb(${currentVisualization.colorBlue.r}, ${currentVisualization.colorBlue.g}, ${currentVisualization.colorBlue.b})`;

        if (currentVisualization.useTriangles) {
          // Draw directional triangle (points in movement direction)
          const size = 3;
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(agent.angle);

          ctx.beginPath();
          ctx.moveTo(size, 0);           // tip (front)
          ctx.lineTo(-size, -size/2);    // back-left
          ctx.lineTo(-size, size/2);     // back-right
          ctx.closePath();
          ctx.fill();

          ctx.restore();
        } else {
          // Draw simple dot (no direction info)
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    }

    // Release all pooled canvases
    canvasPool.releaseAll();
  }, [trails, agents, visualization, effects, canvasWidth, canvasHeight, scaleX, scaleY]);

  // Animation loop with playback speed control
  useEffect(() => {
    let timeoutId: number | undefined;

    const animate = () => {
      const frameStartTime = performance.now();

      // Measure tick time
      const tickStartTime = performance.now();
      tick();
      const tickEndTime = performance.now();
      const tickTime = tickEndTime - tickStartTime;

      // Measure render time
      const renderStartTime = performance.now();
      render();
      const renderEndTime = performance.now();
      const renderTime = renderEndTime - renderStartTime;

      const frameEndTime = performance.now();
      const frameTime = frameEndTime - frameStartTime;

      // Calculate FPS
      const deltaTime = frameEndTime - lastFrameTimeRef.current;
      lastFrameTimeRef.current = frameEndTime;
      const currentFPS = deltaTime > 0 ? 1000 / deltaTime : 0;

      // Update FPS history (rolling window of last 60 frames)
      fpsHistoryRef.current.push(currentFPS);
      if (fpsHistoryRef.current.length > 60) {
        fpsHistoryRef.current.shift();
      }

      // Calculate average, min, max FPS
      const avgFPS = fpsHistoryRef.current.reduce((a, b) => a + b, 0) / fpsHistoryRef.current.length;
      const minFPS = Math.min(...fpsHistoryRef.current);
      const maxFPS = Math.max(...fpsHistoryRef.current);

      // Update performance metrics
      updatePerformanceMetrics({
        currentFPS,
        avgFPS,
        minFPS,
        maxFPS,
        frameTime,
        tickTime,
        renderTime,
      });

      // Auto-optimization check (every 30 frames = ~0.5 seconds at 60fps)
      frameCounterRef.current++;
      if (frameCounterRef.current >= 30) {
        frameCounterRef.current = 0;
        performAutoOptimization();
      }

      // Schedule next frame based on playback speed
      // playbackSpeed: 1.0 = 60fps, 0.5 = 30fps, 2.0 = 120fps (capped by display)
      if (playbackSpeed >= 0.95) {
        // Normal or faster speed: use requestAnimationFrame
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Slower speed: use setTimeout to delay frames
        const targetFrameTime = (1000 / 60) / playbackSpeed; // 60fps base, adjusted by playback speed
        const delay = Math.max(0, targetFrameTime - frameTime);
        timeoutId = window.setTimeout(() => {
          animationFrameRef.current = requestAnimationFrame(animate);
        }, delay);
      }
    };

    if (running) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      // Render one frame when paused
      render();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [running, tick, render, updatePerformanceMetrics, performAutoOptimization, playbackSpeed]);

  // Initial render
  useEffect(() => {
    render();
  }, [render]);

  const containerStyle: React.CSSProperties = {
    ...styles.container,
    ...(isFullscreen && styles.containerFullscreen),
  };

  const canvasStyle: React.CSSProperties = {
    ...styles.canvas,
    ...(isFullscreen && styles.canvasFullscreen),
  };

  return (
    <div style={containerStyle}>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={canvasStyle}
      />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '20px',
    backgroundColor: '#0a0a15',
  } as React.CSSProperties,
  containerFullscreen: {
    padding: '0',
    backgroundColor: 'transparent',
    height: '100%',
  } as React.CSSProperties,
  canvas: {
    // Responsive sizing: CSS scales the canvas display, not the render buffer
    maxWidth: '100%',
    maxHeight: '90vh',
    width: 'auto',
    height: 'auto',
    objectFit: 'contain',
    border: '2px solid #2a2b3a',
    borderRadius: '8px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
  } as React.CSSProperties,
  canvasFullscreen: {
    maxWidth: '100vw',
    maxHeight: '100vh',
    border: 'none',
    borderRadius: '0',
  } as React.CSSProperties,
};
