import { useEffect, useRef, useCallback } from 'react';
import { useSimulationStore } from '../store/useSimulationStore';
import { WebGLTrailRenderer } from './WebGLTrailRenderer';

const CANVAS_SIZE = 800;
const GRID_SIZE = 400;
const SCALE = CANVAS_SIZE / GRID_SIZE; // 2x scaling

interface CanvasPanelProps {
  isFullscreen?: boolean;
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

  // Initialize WebGL renderer, motion blur canvas, and scanline pattern
  useEffect(() => {
    // WebGL renderer
    if (!webglRendererRef.current) {
      webglRendererRef.current = new WebGLTrailRenderer(CANVAS_SIZE, GRID_SIZE);
    }

    // Motion blur canvas
    if (!motionBlurCanvasRef.current) {
      const mbCanvas = document.createElement('canvas');
      mbCanvas.width = CANVAS_SIZE;
      mbCanvas.height = CANVAS_SIZE;
      motionBlurCanvasRef.current = mbCanvas;
    }

    // Scanline pattern (cached for performance)
    if (!scanlinePatternRef.current && canvasRef.current) {
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
  }, []);

  // Render function with post-processing effects (OPTIMIZED)
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const canvasPool = canvasPoolRef.current;

    // === 1. Render base trails ===
    // Hybrid approach: WebGL for trails (fast, smooth lavalamp effects)
    //                  CPU for agent pixels (precise positioning)
    const USE_WEBGL = true;

    if (USE_WEBGL && webglRendererRef.current) {
      // WebGL rendering for trails - perfect for lavalamp/schlieren effects
      const webglCanvas = webglRendererRef.current.render(trails, visualization);
      ctx.drawImage(webglCanvas, 0, 0);
    } else {
      // CPU rendering (slower but visually accurate)
      ctx.fillStyle = `rgb(${visualization.colorBg.r}, ${visualization.colorBg.g}, ${visualization.colorBg.b})`;
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

      const imageData = ctx.createImageData(CANVAS_SIZE, CANVAS_SIZE);
      const data = imageData.data;

      for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
          const idx = y * GRID_SIZE + x;

          const redVal = trails.red[idx];
          const greenVal = trails.green[idx];
          const blueVal = trails.blue[idx];

          // Scale to canvas size (2x2 blocks)
          for (let dy = 0; dy < SCALE; dy++) {
            for (let dx = 0; dx < SCALE; dx++) {
              const canvasX = x * SCALE + dx;
              const canvasY = y * SCALE + dy;
              const pixelIdx = (canvasY * CANVAS_SIZE + canvasX) * 4;

              // Initialize with background
              data[pixelIdx] = visualization.colorBg.r;
              data[pixelIdx + 1] = visualization.colorBg.g;
              data[pixelIdx + 2] = visualization.colorBg.b;
              data[pixelIdx + 3] = 255;

              // Apply blend mode
              if (visualization.blendMode === 'additive') {
                const tR = Math.min(1, redVal / visualization.trailIntensity);
                const tG = Math.min(1, greenVal / visualization.trailIntensity);
                const tB = Math.min(1, blueVal / visualization.trailIntensity);

                const totalIntensity = tR + tG + tB;
                const normalizationFactor = totalIntensity > 1.5 ? (1.5 / totalIntensity) : 1.0;
                const effectiveBrightness = visualization.brightness * normalizationFactor;

                data[pixelIdx] += visualization.colorRed.r * tR * effectiveBrightness;
                data[pixelIdx + 1] += visualization.colorRed.g * tR * effectiveBrightness;
                data[pixelIdx + 2] += visualization.colorRed.b * tR * effectiveBrightness;

                data[pixelIdx] += visualization.colorGreen.r * tG * effectiveBrightness;
                data[pixelIdx + 1] += visualization.colorGreen.g * tG * effectiveBrightness;
                data[pixelIdx + 2] += visualization.colorGreen.b * tG * effectiveBrightness;

                data[pixelIdx] += visualization.colorBlue.r * tB * effectiveBrightness;
                data[pixelIdx + 1] += visualization.colorBlue.g * tB * effectiveBrightness;
                data[pixelIdx + 2] += visualization.colorBlue.b * tB * effectiveBrightness;

              } else if (visualization.blendMode === 'multiply' || visualization.blendMode === 'average') {
                const totalTrail = redVal + greenVal + blueVal;
                if (totalTrail > 0) {
                  const t = Math.min(1, totalTrail / visualization.trailIntensity);
                  data[pixelIdx] = (visualization.colorRed.r * redVal + visualization.colorGreen.r * greenVal + visualization.colorBlue.r * blueVal) / totalTrail * t * visualization.brightness;
                  data[pixelIdx + 1] = (visualization.colorRed.g * redVal + visualization.colorGreen.g * greenVal + visualization.colorBlue.g * blueVal) / totalTrail * t * visualization.brightness;
                  data[pixelIdx + 2] = (visualization.colorRed.b * redVal + visualization.colorGreen.b * greenVal + visualization.colorBlue.b * blueVal) / totalTrail * t * visualization.brightness;
                }

              } else if (visualization.blendMode === 'screen') {
                const tR = Math.min(1, redVal / visualization.trailIntensity) * visualization.brightness;
                const tG = Math.min(1, greenVal / visualization.trailIntensity) * visualization.brightness;
                const tB = Math.min(1, blueVal / visualization.trailIntensity) * visualization.brightness;

                const r1 = visualization.colorRed.r * tR / 255;
                const g1 = visualization.colorRed.g * tR / 255;
                const b1 = visualization.colorRed.b * tR / 255;

                const r2 = visualization.colorGreen.r * tG / 255;
                const g2 = visualization.colorGreen.g * tG / 255;
                const b2 = visualization.colorGreen.b * tG / 255;

                const r3 = visualization.colorBlue.r * tB / 255;
                const g3 = visualization.colorBlue.g * tB / 255;
                const b3 = visualization.colorBlue.b * tB / 255;

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
      const smallWidth = Math.floor(CANVAS_SIZE / pixelSize);
      const smallHeight = Math.floor(CANVAS_SIZE / pixelSize);

      const tempCanvas = canvasPool.acquire(smallWidth, smallHeight);
      const tempCtx = tempCanvas.getContext('2d');

      if (tempCtx) {
        // Downsample
        tempCtx.imageSmoothingEnabled = false;
        tempCtx.drawImage(canvas, 0, 0, smallWidth, smallHeight);

        // Upsample back
        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        ctx.drawImage(tempCanvas, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
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
      ctx.filter = filters.join(' ');
      ctx.drawImage(canvas, 0, 0);
      ctx.filter = 'none';
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
      const savedCanvas = canvasPool.acquire(CANVAS_SIZE, CANVAS_SIZE);
      const savedCtx = savedCanvas.getContext('2d');

      if (savedCtx) {
        // Save the original image before any modifications
        savedCtx.drawImage(canvas, 0, 0);

        // Clear main canvas
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

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
      const gradient = ctx.createRadialGradient(
        CANVAS_SIZE / 2, CANVAS_SIZE / 2, CANVAS_SIZE * 0.3,
        CANVAS_SIZE / 2, CANVAS_SIZE / 2, CANVAS_SIZE * 0.7
      );
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gradient.addColorStop(1, `rgba(0, 0, 0, ${effects.vignette})`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }

    // === 9. Scanlines (CRT Effect) - OPTIMIZED with cached pattern ===
    if (effects.scanlines > 0 && scanlinePatternRef.current) {
      ctx.globalCompositeOperation = 'multiply';
      ctx.globalAlpha = effects.scanlines;
      ctx.fillStyle = scanlinePatternRef.current;
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    }

    // === 10. Render agents (optional - Lab Mode) ===
    // Controlled via visualization.showAgents and visualization.useTriangles
    if (visualization.showAgents && visualization.brightness > 0.5) {
      agents.forEach((agent) => {
        const x = agent.x * SCALE;
        const y = agent.y * SCALE;

        ctx.fillStyle =
          agent.type === 'red'
            ? `rgb(${visualization.colorRed.r}, ${visualization.colorRed.g}, ${visualization.colorRed.b})`
            : agent.type === 'green'
            ? `rgb(${visualization.colorGreen.r}, ${visualization.colorGreen.g}, ${visualization.colorGreen.b})`
            : `rgb(${visualization.colorBlue.r}, ${visualization.colorBlue.g}, ${visualization.colorBlue.b})`;

        if (visualization.useTriangles) {
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
  }, [trails, agents, visualization, effects]);

  // Animation loop
  useEffect(() => {
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

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    if (running) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      // Render one frame when paused
      render();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [running, tick, render, updatePerformanceMetrics, performAutoOptimization]);

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
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
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
