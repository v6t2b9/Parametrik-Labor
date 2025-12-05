import { useEffect, useRef, useCallback, useState, useMemo } from 'react';
import { useSimulationStore } from '../store/useSimulationStore';
import { WebGLTrailRenderer } from './WebGLTrailRenderer';
import { applyHueCycling } from '../utils/colorUtils';
import { EcosystemRenderer } from '../engine/EcosystemRenderer';
import { MusicReactiveEcosystemEngine } from '../engine/MusicReactiveEcosystemEngine';
import { SPECIES_COLORS } from '../types/ecosystem';
import { calculateGridDimensions } from '../engine/SimulationEngine';

const DEFAULT_CANVAS_SIZE = 800;

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
  private readonly MAX_POOL_SIZE = 20; // Limit to prevent memory leak

  acquire(width: number, height: number): HTMLCanvasElement {
    let canvas = this.pool.find(c => !this.inUse.has(c) && c.width === width && c.height === height);

    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      this.pool.push(canvas);

      // Cleanup old canvases if pool grows too large
      this.cleanupOldCanvases();
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

  // Remove oldest unused canvases when pool exceeds limit
  private cleanupOldCanvases(): void {
    if (this.pool.length <= this.MAX_POOL_SIZE) return;

    const unusedCanvases = this.pool.filter(c => !this.inUse.has(c));
    const toRemove = this.pool.length - this.MAX_POOL_SIZE;

    if (toRemove > 0 && unusedCanvases.length > 0) {
      // Remove oldest unused canvases
      const removed = unusedCanvases.slice(0, toRemove);
      removed.forEach(canvas => {
        // Clear canvas to free memory
        canvas.width = 0;
        canvas.height = 0;
      });

      // Remove from pool
      this.pool = this.pool.filter(c => !removed.includes(c));

      if (toRemove > 0) {
        console.log(`[CanvasPool] Cleaned up ${removed.length} old canvases (pool size: ${this.pool.length})`);
      }
    }
  }

  // Destroy all canvases and clear pool
  destroy(): void {
    this.pool.forEach(canvas => {
      canvas.width = 0;
      canvas.height = 0;
    });
    this.pool = [];
    this.inUse.clear();
  }
}

export function CanvasPanel({ isFullscreen = false }: CanvasPanelProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const motionBlurCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const feedbackCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Responsive canvas size (based on window size in fullscreen and aspect ratio)
  const [canvasWidth, setCanvasWidth] = useState(DEFAULT_CANVAS_SIZE);
  const [canvasHeight, setCanvasHeight] = useState(DEFAULT_CANVAS_SIZE);
  const [scale, setScale] = useState(2); // Initial scale, will be updated by useEffect
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  // WebGL renderer for trails (major performance boost)
  const webglRendererRef = useRef<WebGLTrailRenderer | null>(null);

  // Canvas pool for temporary canvases (object pooling)
  const canvasPoolRef = useRef<CanvasPool>(new CanvasPool());

  // Scanline pattern cache
  const scanlinePatternRef = useRef<CanvasPattern | null>(null);

  // Vignette gradient cache (avoid recreating every frame)
  const vignetteGradientRef = useRef<{ gradient: CanvasGradient; width: number; height: number } | null>(null);

  // FPS tracking with circular buffer (OPTIMIZED: avoids Array.shift() O(n) operation)
  const lastFrameTimeRef = useRef<number>(performance.now());
  const fpsHistoryRef = useRef<number[]>(new Array(60).fill(0));
  const fpsHistoryIndexRef = useRef<number>(0);
  const fpsHistoryCountRef = useRef<number>(0);
  const frameCounterRef = useRef<number>(0);
  const metricsUpdateCounterRef = useRef<number>(0);

  // Use refs for callbacks to avoid recreating animation loop
  const renderRef = useRef<(() => void) | null>(null);

  const tick = useSimulationStore((state) => state.tick);
  const engine = useSimulationStore((state) => state.engine);
  const running = useSimulationStore((state) => state.running);

  // OPTIMIZATION: Extract only needed parameters to avoid re-renders on unrelated parameter changes
  const visualization = useSimulationStore((state) => state.parameters.visualization);
  const effects = useSimulationStore((state) => state.parameters.effects);
  const ecosystemMode = useSimulationStore((state) => state.parameters.ecosystemMode);

  const updatePerformanceMetrics = useSimulationStore((state) => state.updatePerformanceMetrics);
  const performAutoOptimization = useSimulationStore((state) => state.performAutoOptimization);
  const playbackSpeed = useSimulationStore((state) => state.ui.playbackSpeed);
  const aspectRatio = useSimulationStore((state) => state.ui.aspectRatio);

  // Check if ecosystem mode is active
  const isEcosystemEngine = engine instanceof MusicReactiveEcosystemEngine;

  // Memoize grid dimensions calculation (only recalculate when aspect ratio changes)
  const gridDimensions = useMemo(() => calculateGridDimensions(aspectRatio), [aspectRatio]);

  // Responsive canvas sizing based on fullscreen mode and aspect ratio
  useEffect(() => {
    const updateCanvasSize = () => {
      // Use memoized grid dimensions
      const { width: gridWidth, height: gridHeight } = gridDimensions;
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
        const minSize = Math.min(gridWidth, gridHeight);
        finalWidth = Math.max(minSize, Math.floor(finalWidth));
        finalHeight = Math.max(minSize, Math.floor(finalHeight));

        setCanvasWidth(finalWidth);
        setCanvasHeight(finalHeight);

        // Calculate scale based on grid dimensions (no letterbox)
        const scaleX = finalWidth / gridWidth;
        const scaleY = finalHeight / gridHeight;
        const uniformScale = Math.min(scaleX, scaleY);
        setScale(uniformScale);
        setOffsetX(0);
        setOffsetY(0);
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

        // Calculate scale based on grid dimensions (no letterbox)
        const scaleX = width / gridWidth;
        const scaleY = height / gridHeight;
        const uniformScale = Math.min(scaleX, scaleY);
        setScale(uniformScale);
        setOffsetX(0);
        setOffsetY(0);
      }
    };

    updateCanvasSize();

    if (isFullscreen) {
      window.addEventListener('resize', updateCanvasSize);
      return () => window.removeEventListener('resize', updateCanvasSize);
    }
  }, [isFullscreen, aspectRatio, gridDimensions]); // Removed engine dependency to prevent unnecessary updates

  // Initialize/update WebGL renderer, motion blur canvas, and scanline pattern when canvas size changes
  useEffect(() => {
    // WebGL renderer - recreate when canvas size changes
    // Use memoized grid dimensions
    const { width: gridWidth, height: gridHeight } = gridDimensions;
    const gridPixelWidth = Math.floor(gridWidth * scale);
    const gridPixelHeight = Math.floor(gridHeight * scale);
    if (webglRendererRef.current) {
      webglRendererRef.current.destroy();
    }
    webglRendererRef.current = new WebGLTrailRenderer(gridPixelWidth, gridPixelHeight, gridWidth, gridHeight);

    // Motion blur canvas - resize when canvas size changes
    if (!motionBlurCanvasRef.current) {
      motionBlurCanvasRef.current = document.createElement('canvas');
    } else if (motionBlurCanvasRef.current.width !== canvasWidth || motionBlurCanvasRef.current.height !== canvasHeight) {
      // Clear old canvas data before resizing to free memory
      const ctx = motionBlurCanvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, motionBlurCanvasRef.current.width, motionBlurCanvasRef.current.height);
      }
    }
    motionBlurCanvasRef.current.width = canvasWidth;
    motionBlurCanvasRef.current.height = canvasHeight;

    // Feedback canvas - stores previous frame for echo effect
    if (!feedbackCanvasRef.current) {
      feedbackCanvasRef.current = document.createElement('canvas');
    } else if (feedbackCanvasRef.current.width !== canvasWidth || feedbackCanvasRef.current.height !== canvasHeight) {
      // Clear old canvas data before resizing to free memory
      const ctx = feedbackCanvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, feedbackCanvasRef.current.width, feedbackCanvasRef.current.height);
      }
    }
    feedbackCanvasRef.current.width = canvasWidth;
    feedbackCanvasRef.current.height = canvasHeight;

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
      // Cleanup WebGL renderer
      if (webglRendererRef.current) {
        webglRendererRef.current.destroy();
        webglRendererRef.current = null;
      }

      // Cleanup canvas pool
      if (canvasPoolRef.current) {
        canvasPoolRef.current.destroy();
      }

      // Cleanup motion blur and feedback canvases
      if (motionBlurCanvasRef.current) {
        motionBlurCanvasRef.current.width = 0;
        motionBlurCanvasRef.current.height = 0;
        motionBlurCanvasRef.current = null;
      }
      if (feedbackCanvasRef.current) {
        feedbackCanvasRef.current.width = 0;
        feedbackCanvasRef.current.height = 0;
        feedbackCanvasRef.current = null;
      }
    };
  }, [canvasWidth, canvasHeight, scale, aspectRatio]);

  // Render function with post-processing effects (OPTIMIZED)
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const canvasPool = canvasPoolRef.current;

    // Read trails and agents directly from engine (avoids creating new references)
    const trails = engine.getTrails();
    const agents = engine.getAgents();

    // Apply hue cycling if enabled (using performance.now() for smooth animation)
    // visualization and effects are already extracted from store at component level
    const currentVisualization = applyHueCycling(visualization, performance.now());

    // === 0. Fill entire canvas with background (letterbox/pillarbox bars) ===
    ctx.fillStyle = `rgb(${currentVisualization.colorBg.r}, ${currentVisualization.colorBg.g}, ${currentVisualization.colorBg.b})`;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // === 0.5. Feedback/Echo Effect (Recursive Rendering) ===
    // Apply BEFORE trails are rendered, creating infinite recursive trails
    if (effects.feedbackAmount > 0 && feedbackCanvasRef.current) {
      const fbCanvas = feedbackCanvasRef.current;
      const fbCtx = fbCanvas.getContext('2d');

      if (fbCtx && fbCanvas.width === canvasWidth && fbCanvas.height === canvasHeight) {
        // Check if feedback canvas has content (not first frame)
        const imageData = fbCtx.getImageData(0, 0, 1, 1);
        const hasContent = imageData.data[3] > 0; // Check alpha channel

        if (hasContent) {
          // Calculate center point for zoom and rotation
          const centerX = canvasWidth / 2;
          const centerY = canvasHeight / 2;

          // Apply transformations for feedback effect
          ctx.save();
          ctx.globalAlpha = effects.feedbackAmount;

          // Translate to center, apply transformations, translate back
          ctx.translate(centerX, centerY);
          ctx.scale(effects.feedbackZoom, effects.feedbackZoom);
          ctx.rotate((effects.feedbackRotation * Math.PI) / 180); // Convert degrees to radians
          ctx.translate(-centerX + effects.feedbackOffsetX, -centerY + effects.feedbackOffsetY);

          // Draw previous frame with transformations
          ctx.drawImage(fbCanvas, 0, 0, canvasWidth, canvasHeight);

          ctx.restore();
        }
      }
    }

    // Save context state before applying offset
    ctx.save();
    ctx.translate(offsetX, offsetY);

    // Use memoized grid dimensions
    const { width: gridWidth, height: gridHeight } = gridDimensions;
    const gridPixelWidth = Math.floor(gridWidth * scale);
    const gridPixelHeight = Math.floor(gridHeight * scale);

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
      ctx.fillRect(0, 0, gridPixelWidth, gridPixelHeight);

      const imageData = ctx.createImageData(gridPixelWidth, gridPixelHeight);
      const data = imageData.data;

      for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
          const idx = y * gridWidth + x;

          const redVal = trails.red[idx];
          const greenVal = trails.green[idx];
          const blueVal = trails.blue[idx];

          // Scale to grid pixel size (uniform scale blocks)
          for (let dy = 0; dy < scale; dy++) {
            for (let dx = 0; dx < scale; dx++) {
              const canvasX = x * scale + dx;
              const canvasY = y * scale + dy;
              const pixelIdx = (canvasY * gridPixelWidth + canvasX) * 4;

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
      const smallWidth = Math.floor(gridPixelWidth / pixelSize);
      const smallHeight = Math.floor(gridPixelHeight / pixelSize);

      // Create a temporary canvas to capture current grid content
      const tempCanvas = canvasPool.acquire(gridPixelWidth, gridPixelHeight);
      const tempCtx = tempCanvas.getContext('2d');

      if (tempCtx) {
        // Capture current grid content (context is already translated)
        tempCtx.drawImage(canvas, offsetX, offsetY, gridPixelWidth, gridPixelHeight, 0, 0, gridPixelWidth, gridPixelHeight);

        // Create downsampled version
        const smallCanvas = canvasPool.acquire(smallWidth, smallHeight);
        const smallCtx = smallCanvas.getContext('2d');

        if (smallCtx) {
          smallCtx.imageSmoothingEnabled = false;
          smallCtx.drawImage(tempCanvas, 0, 0, smallWidth, smallHeight);

          // Upsample back to grid
          ctx.imageSmoothingEnabled = false;
          ctx.clearRect(0, 0, gridPixelWidth, gridPixelHeight);
          ctx.drawImage(smallCanvas, 0, 0, gridPixelWidth, gridPixelHeight);
          ctx.imageSmoothingEnabled = true;

          canvasPool.release(smallCanvas);
        }

        canvasPool.release(tempCanvas);
      }
    }

    // === 2.25. Render agents (optional - Show Agents mode) ===
    // Rendered BEFORE mirror/kaleidoscope effects so agents get mirrored too!
    // Controlled via currentVisualization.showAgents and currentVisualization.useTriangles
    if (currentVisualization.showAgents && currentVisualization.brightness > 0.5) {
      // Check if we're in ecosystem mode and should render ecosystem-specific agents
      if (isEcosystemEngine && ecosystemMode) {
        // Render ecosystem agents with species colors
        const ecosystemEngine = engine as MusicReactiveEcosystemEngine;
        const ecosystemAgents = ecosystemEngine.getEcosystemAgents();

        ecosystemAgents.forEach((agent) => {
          const x = agent.x * scale;
          const y = agent.y * scale;

          // Get species color
          const color = SPECIES_COLORS[agent.species];
          // Energy-based alpha (dim when low energy)
          const alpha = Math.max(0.3, agent.energy);
          ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;

          if (currentVisualization.useTriangles) {
            // Draw directional triangle
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
            // Draw simple dot
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      } else {
        // Standard stigmergy agent rendering
        agents.forEach((agent) => {
          const x = agent.x * scale;
          const y = agent.y * scale;

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
    }

    // === 2.3. Mirror/Symmetry Effect ===
    // Simple mirroring along horizontal, vertical, or both axes
    if (effects.mirrorMode !== 'none') {
      const tempCanvas = canvasPool.acquire(gridPixelWidth, gridPixelHeight);
      const tempCtx = tempCanvas.getContext('2d');

      if (tempCtx && tempCanvas.width === gridPixelWidth && tempCanvas.height === gridPixelHeight) {
        // Capture current grid content
        tempCtx.drawImage(canvas, offsetX, offsetY, gridPixelWidth, gridPixelHeight, 0, 0, gridPixelWidth, gridPixelHeight);

        // Clear grid area
        ctx.clearRect(0, 0, gridPixelWidth, gridPixelHeight);

        const mirrorPos = effects.mirrorPosition;

        if (effects.mirrorMode === 'horizontal') {
          // Left half original, right half mirrored
          const splitX = gridPixelWidth * mirrorPos;
          ctx.drawImage(tempCanvas, 0, 0, splitX, gridPixelHeight, 0, 0, splitX, gridPixelHeight);
          ctx.save();
          ctx.translate(splitX, 0);
          ctx.scale(-1, 1);
          ctx.drawImage(tempCanvas, 0, 0, splitX, gridPixelHeight, -splitX, 0, splitX, gridPixelHeight);
          ctx.restore();
        } else if (effects.mirrorMode === 'vertical') {
          // Top half original, bottom half mirrored
          const splitY = gridPixelHeight * mirrorPos;
          ctx.drawImage(tempCanvas, 0, 0, gridPixelWidth, splitY, 0, 0, gridPixelWidth, splitY);
          ctx.save();
          ctx.translate(0, splitY);
          ctx.scale(1, -1);
          ctx.drawImage(tempCanvas, 0, 0, gridPixelWidth, splitY, 0, -splitY, gridPixelWidth, splitY);
          ctx.restore();
        } else if (effects.mirrorMode === 'both') {
          // Quarter grid mirrored in both axes
          const splitX = gridPixelWidth * mirrorPos;
          const splitY = gridPixelHeight * mirrorPos;

          // Top-left original
          ctx.drawImage(tempCanvas, 0, 0, splitX, splitY, 0, 0, splitX, splitY);

          // Top-right (mirrored horizontally)
          ctx.save();
          ctx.translate(splitX, 0);
          ctx.scale(-1, 1);
          ctx.drawImage(tempCanvas, 0, 0, splitX, splitY, -splitX, 0, splitX, splitY);
          ctx.restore();

          // Bottom-left (mirrored vertically)
          ctx.save();
          ctx.translate(0, splitY);
          ctx.scale(1, -1);
          ctx.drawImage(tempCanvas, 0, 0, splitX, splitY, 0, -splitY, splitX, splitY);
          ctx.restore();

          // Bottom-right (mirrored both)
          ctx.save();
          ctx.translate(splitX, splitY);
          ctx.scale(-1, -1);
          ctx.drawImage(tempCanvas, 0, 0, splitX, splitY, -splitX, -splitY, splitX, splitY);
          ctx.restore();
        } else if (effects.mirrorMode === 'quad') {
          // 4-way symmetry (center mirror)
          const halfW = gridPixelWidth / 2;
          const halfH = gridPixelHeight / 2;

          // Top-left quadrant (original)
          ctx.drawImage(tempCanvas, 0, 0, halfW, halfH, 0, 0, halfW, halfH);

          // Top-right (mirror horizontally)
          ctx.save();
          ctx.translate(gridPixelWidth, 0);
          ctx.scale(-1, 1);
          ctx.drawImage(tempCanvas, 0, 0, halfW, halfH, 0, 0, halfW, halfH);
          ctx.restore();

          // Bottom-left (mirror vertically)
          ctx.save();
          ctx.translate(0, gridPixelHeight);
          ctx.scale(1, -1);
          ctx.drawImage(tempCanvas, 0, 0, halfW, halfH, 0, 0, halfW, halfH);
          ctx.restore();

          // Bottom-right (mirror both)
          ctx.save();
          ctx.translate(gridPixelWidth, gridPixelHeight);
          ctx.scale(-1, -1);
          ctx.drawImage(tempCanvas, 0, 0, halfW, halfH, 0, 0, halfW, halfH);
          ctx.restore();
        }

        canvasPool.release(tempCanvas);
      }
    }

    // === 2.5. Kaleidoscope Effect (Radial Mirroring) ===
    // Creates symmetrical mandala patterns by mirroring the grid in radial segments
    if (effects.kaleidoscopeSegments >= 2) {
      // Create temp canvas to save current grid content
      const tempCanvas = canvasPool.acquire(gridPixelWidth, gridPixelHeight);
      const tempCtx = tempCanvas.getContext('2d');

      if (tempCtx && tempCanvas.width === gridPixelWidth && tempCanvas.height === gridPixelHeight) {
        // Capture current grid content (without offset)
        tempCtx.drawImage(canvas, offsetX, offsetY, gridPixelWidth, gridPixelHeight, 0, 0, gridPixelWidth, gridPixelHeight);

        // Clear grid area
        ctx.clearRect(0, 0, gridPixelWidth, gridPixelHeight);

        // Calculate center point and segment angle
        const centerX = gridPixelWidth / 2;
        const centerY = gridPixelHeight / 2;
        const segmentAngle = (2 * Math.PI) / effects.kaleidoscopeSegments;
        // Use diagonal distance from center to corner, ensures wedges fill entire canvas including corners
        const radius = Math.sqrt(centerX * centerX + centerY * centerY) * 1.5;

        // Apply kaleidoscope rotation and zoom
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate((effects.kaleidoscopeRotation * Math.PI) / 180);
        ctx.scale(effects.kaleidoscopeZoom, effects.kaleidoscopeZoom);
        ctx.translate(-centerX, -centerY);

        // Draw each kaleidoscope segment
        for (let i = 0; i < effects.kaleidoscopeSegments; i++) {
          ctx.save();

          // Rotate to segment position
          ctx.translate(centerX, centerY);
          ctx.rotate(i * segmentAngle);
          ctx.translate(-centerX, -centerY);

          // Create triangular wedge clip path (half segment for mirroring)
          ctx.beginPath();
          ctx.moveTo(centerX, centerY); // Center point
          ctx.lineTo(centerX + radius, centerY); // Right edge
          ctx.arc(centerX, centerY, radius, 0, segmentAngle / 2); // Arc to half-segment
          ctx.lineTo(centerX, centerY); // Back to center
          ctx.closePath();
          ctx.clip();

          // Draw original wedge
          ctx.drawImage(tempCanvas, 0, 0, gridPixelWidth, gridPixelHeight);

          ctx.restore();

          // Mirror the wedge for classic kaleidoscope effect
          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate(i * segmentAngle);
          ctx.scale(1, -1); // Vertical flip for radial symmetry
          ctx.translate(-centerX, -centerY);

          // Create mirrored wedge clip path
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(centerX + radius, centerY);
          ctx.arc(centerX, centerY, radius, 0, segmentAngle / 2);
          ctx.lineTo(centerX, centerY);
          ctx.closePath();
          ctx.clip();

          ctx.drawImage(tempCanvas, 0, 0, gridPixelWidth, gridPixelHeight);
          ctx.restore();
        }

        ctx.restore();
        canvasPool.release(tempCanvas);
      }
    }

    // Note: Motion Blur and CSS Filters will be applied after we restore the context
    // This is needed so they can work on the full canvas including letterbox bars

    // === 7. Wave Distortion - REMOVED FOR PERFORMANCE ===
    // This effect caused 5-10ms overhead due to getImageData() GPU stall
    // If needed, consider implementing with CSS transform or WebGL shader
    // Keeping the parameter for backward compatibility but not applying the effect

    // === 8. Agents now rendered earlier (before Mirror/Kaleidoscope) ===
    // See section 2.25 above - agents are rendered before symmetry effects
    // so they get mirrored/kaleidoscoped along with trails!

    // === 8.5. Displacement Map - REMOVED FOR PERFORMANCE ===
    // This effect used getImageData() + nested pixel loop = 10-30ms overhead per frame
    // Alternative: Use CSS filter: url(#displacement) with SVG filter for hardware acceleration
    // For now, removed to prioritize stable 60fps performance

    // === 9. Vignette (Screen Overlay) - OPTIMIZED with cached gradient ===
    // Applied AFTER agents for correct layering - darkens edges
    if (effects.vignette > 0) {
      // Use cached gradient if dimensions match, otherwise create new one
      const vignetteCache = vignetteGradientRef.current;
      let gradient: CanvasGradient;

      if (!vignetteCache || vignetteCache.width !== gridPixelWidth || vignetteCache.height !== gridPixelHeight) {
        const centerX = gridPixelWidth / 2;
        const centerY = gridPixelHeight / 2;
        const maxRadius = Math.max(gridPixelWidth, gridPixelHeight) * 0.7;
        gradient = ctx.createRadialGradient(
          centerX, centerY, Math.min(gridPixelWidth, gridPixelHeight) * 0.3,
          centerX, centerY, maxRadius
        );
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 1)'); // Max opacity, will be controlled by globalAlpha

        // Cache for future frames
        vignetteGradientRef.current = { gradient, width: gridPixelWidth, height: gridPixelHeight };
      } else {
        gradient = vignetteCache.gradient;
      }

      ctx.globalAlpha = effects.vignette;
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, gridPixelWidth, gridPixelHeight);
      ctx.globalAlpha = 1;
    }

    // === 10. Scanlines (Top Screen Overlay - CRT Effect) ===
    // MUST be rendered LAST as top layer - OPTIMIZED with cached pattern
    if (effects.scanlines > 0 && scanlinePatternRef.current) {
      ctx.globalCompositeOperation = 'multiply';
      ctx.globalAlpha = effects.scanlines;
      ctx.fillStyle = scanlinePatternRef.current;
      ctx.fillRect(0, 0, gridPixelWidth, gridPixelHeight);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    }

    // === 11. Render ecosystem crystals (if in ecosystem mode) ===
    if (isEcosystemEngine && ecosystemMode) {
      const ecosystemEngine = engine as MusicReactiveEcosystemEngine;
      const crystals = ecosystemEngine.getCrystals();

      // Render crystals using EcosystemRenderer
      const renderOptions = {
        scaleX: scale,
        scaleY: scale,
        showAgents: currentVisualization.showAgents,
        useTriangles: currentVisualization.useTriangles,
        showCrystals: true,
        showEnergyRings: true,
        agentSize: 3,
        crystalGlow: effects.bloom > 0,
      };

      EcosystemRenderer.renderCrystals(ctx, crystals, renderOptions);

      // === 12. Render population stats HUD (optional) ===
      if (currentVisualization.showAgents) {
        const populationStats = ecosystemEngine.getPopulationStats();
        const totalCrystals = ecosystemEngine.getTotalCrystals();
        const totalEnergy = ecosystemEngine.getTotalEnergy();

        EcosystemRenderer.renderHUD(
          ctx,
          populationStats,
          totalCrystals,
          totalEnergy
        );
      }
    }

    // Restore context (removes translation offset)
    ctx.restore();

    // === 15. Motion Blur (applied to full canvas) ===
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

    // === 15.5. Radial Blur (Tunnel/Explosion Effect) ===
    // Creates motion blur radiating from a center point (outward = explosion, inward = tunnel)
    if (effects.radialBlurStrength > 0) {
      const tempCanvas = canvasPool.acquire(canvasWidth, canvasHeight);
      const tempCtx = tempCanvas.getContext('2d');

      if (tempCtx && tempCanvas.width === canvasWidth && tempCanvas.height === canvasHeight) {
        // Save current canvas
        tempCtx.clearRect(0, 0, canvasWidth, canvasHeight);
        tempCtx.drawImage(canvas, 0, 0, canvasWidth, canvasHeight);

        // Calculate center point in pixels
        const centerX = canvasWidth * effects.radialBlurCenterX;
        const centerY = canvasHeight * effects.radialBlurCenterY;

        // Clear main canvas (we'll draw accumulated samples)
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Multi-sample radial blur
        const samples = Math.floor(effects.radialBlurQuality);
        const maxOffset = effects.radialBlurStrength * 50; // Max 50px offset at strength 1.0

        for (let i = 0; i < samples; i++) {
          // Calculate offset for this sample (linear distribution)
          const t = i / (samples - 1); // 0 to 1
          const offset = t * maxOffset;

          // Calculate alpha for this sample (distribute evenly)
          ctx.globalAlpha = 1.0 / samples;

          // Apply radial offset from center
          ctx.save();
          ctx.translate(centerX, centerY);

          // Scale outward from center (creates the radial blur effect)
          const scale = 1 + (offset / Math.max(canvasWidth, canvasHeight));
          ctx.scale(scale, scale);

          ctx.translate(-centerX, -centerY);

          // Draw sample
          ctx.drawImage(tempCanvas, 0, 0, canvasWidth, canvasHeight);

          ctx.restore();
        }

        // Reset alpha
        ctx.globalAlpha = 1.0;

        canvasPool.release(tempCanvas);
      }
    }

    // === 16. CSS Filters: Blur, Saturation, Contrast, Hue Shift ===
    // Apply filters individually to ensure they are not overridden
    const filters: string[] = [];
    if (effects.blur > 0) filters.push(`blur(${effects.blur}px)`);
    if (effects.saturation !== 1.0) filters.push(`saturate(${effects.saturation})`);
    if (effects.contrast !== 1.0) filters.push(`contrast(${effects.contrast})`);
    if (effects.hueShift !== 0) filters.push(`hue-rotate(${effects.hueShift}deg)`);

    if (filters.length > 0) {
      // Use temp canvas to apply filters (can't draw canvas onto itself with filter)
      const tempCanvas = canvasPool.acquire(canvasWidth, canvasHeight);
      const tempCtx = tempCanvas.getContext('2d');

      if (tempCtx && tempCanvas.width === canvasWidth && tempCanvas.height === canvasHeight) {
        // Copy current canvas to temp (preserve all content)
        tempCtx.clearRect(0, 0, canvasWidth, canvasHeight);
        tempCtx.drawImage(canvas, 0, 0, canvasWidth, canvasHeight);

        // Apply filters and draw back to main canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.filter = filters.join(' ');
        ctx.drawImage(tempCanvas, 0, 0, canvasWidth, canvasHeight);
        ctx.filter = 'none';
      }

      canvasPool.release(tempCanvas);
    }

    // === 16.5. Color Mapping/LUT - REMOVED FOR PERFORMANCE ===
    // This effect used getImageData() + pixel loop = 5-10ms overhead per frame
    // Alternative: Use hue-rotate() + sepia() + saturate() CSS filters for similar effects
    // For now, removed to prioritize stable 60fps performance

    // === 17. Bloom Effect ===
    // Multi-pass Gaussian Bloom (optimized with CSS filters for threshold)
    if (effects.bloomIntensity > 0) {
      // Professional quality bloom with GPU-accelerated threshold extraction and multi-pass blur
      const bloomDownscale = 4; // Downscale factor (4 = 1/4 size)
      const bloomWidth = Math.floor(canvasWidth / bloomDownscale);
      const bloomHeight = Math.floor(canvasHeight / bloomDownscale);

      // Step 1: Extract bright pixels to temp canvas
      const brightCanvas = canvasPool.acquire(canvasWidth, canvasHeight);
      const brightCtx = brightCanvas.getContext('2d');

      if (brightCtx && brightCanvas.width === canvasWidth && brightCanvas.height === canvasHeight) {
        // Extract bright pixels (threshold) using CSS brightness filter
        // OPTIMIZED: GPU-accelerated filter instead of slow getImageData() pixel loop
        if (effects.bloomThreshold > 0) {
          // Use brightness + contrast to extract bright pixels
          const brightnessBoost = 1 + effects.bloomThreshold;
          const contrastBoost = 1 + effects.bloomThreshold * 2;
          brightCtx.filter = `brightness(${brightnessBoost}) contrast(${contrastBoost})`;
          brightCtx.drawImage(canvas, 0, 0);
          brightCtx.filter = 'none';
        } else {
          // No threshold - just copy
          brightCtx.drawImage(canvas, 0, 0);
        }

        // Step 2: Downscale to bloom canvas
        const bloomCanvas = canvasPool.acquire(bloomWidth, bloomHeight);
        const bloomCtx = bloomCanvas.getContext('2d');

        if (bloomCtx && bloomCanvas.width === bloomWidth && bloomCanvas.height === bloomHeight) {
          bloomCtx.imageSmoothingEnabled = true;
          bloomCtx.imageSmoothingQuality = 'high';
          bloomCtx.drawImage(brightCanvas, 0, 0, bloomWidth, bloomHeight);

          // Step 3: Multi-pass Gaussian blur
          const blurPasses = Math.floor(effects.bloomRadius);
          for (let pass = 0; pass < blurPasses; pass++) {
            const tempBloom = canvasPool.acquire(bloomWidth, bloomHeight);
            const tempBloomCtx = tempBloom.getContext('2d');

            if (tempBloomCtx) {
              // Apply blur (each pass = 2px blur, accumulates)
              tempBloomCtx.filter = 'blur(2px)';
              tempBloomCtx.drawImage(bloomCanvas, 0, 0);
              tempBloomCtx.filter = 'none';

              // Copy back
              bloomCtx.clearRect(0, 0, bloomWidth, bloomHeight);
              bloomCtx.drawImage(tempBloom, 0, 0);
            }

            canvasPool.release(tempBloom);
          }

          // Step 4: Upscale bloom and blend with main canvas
          ctx.globalCompositeOperation = 'lighter';
          ctx.globalAlpha = effects.bloomIntensity;
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(bloomCanvas, 0, 0, canvasWidth, canvasHeight);
          ctx.globalAlpha = 1;
          ctx.globalCompositeOperation = 'source-over';

          canvasPool.release(bloomCanvas);
        }

        canvasPool.release(brightCanvas);
      }
    }
    // Legacy Simple Bloom removed - use bloomIntensity parameter instead of bloom

    // === 16. Chromatic Aberration - OPTIMIZED with object pooling ===
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

    // Release all pooled canvases
    canvasPool.releaseAll();

    // === FINAL: Copy current frame to feedback canvas for next iteration ===
    if (effects.feedbackAmount > 0 && feedbackCanvasRef.current) {
      const fbCanvas = feedbackCanvasRef.current;
      const fbCtx = fbCanvas.getContext('2d');

      if (fbCtx && fbCanvas.width === canvasWidth && fbCanvas.height === canvasHeight) {
        // Clear and copy entire canvas (including letterbox bars)
        fbCtx.clearRect(0, 0, canvasWidth, canvasHeight);
        fbCtx.drawImage(canvas, 0, 0, canvasWidth, canvasHeight);
      }
    }
  }, [canvasWidth, canvasHeight, scale, offsetX, offsetY, gridDimensions, engine, ecosystemMode, isEcosystemEngine, visualization, effects]);
  // OPTIMIZATION: Use specific visualization and effects instead of entire parameters object

  // Update ref to latest render function
  useEffect(() => {
    renderRef.current = render;
  }, [render]);

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
      if (renderRef.current) {
        renderRef.current();
      }
      const renderEndTime = performance.now();
      const renderTime = renderEndTime - renderStartTime;

      const frameEndTime = performance.now();
      const frameTime = frameEndTime - frameStartTime;

      // Calculate FPS
      const deltaTime = frameEndTime - lastFrameTimeRef.current;
      lastFrameTimeRef.current = frameEndTime;
      const currentFPS = deltaTime > 0 ? 1000 / deltaTime : 0;

      // Update FPS history using circular buffer (OPTIMIZED: O(1) instead of O(n))
      const fpsHistory = fpsHistoryRef.current;
      const currentIndex = fpsHistoryIndexRef.current;
      fpsHistory[currentIndex] = currentFPS;
      fpsHistoryIndexRef.current = (currentIndex + 1) % 60;
      fpsHistoryCountRef.current = Math.min(fpsHistoryCountRef.current + 1, 60);

      // Calculate average, min, max FPS (OPTIMIZED: manual loop instead of spread operator)
      const count = fpsHistoryCountRef.current;
      let sum = 0;
      let min = Infinity;
      let max = -Infinity;
      for (let i = 0; i < count; i++) {
        const fps = fpsHistory[i];
        sum += fps;
        if (fps < min) min = fps;
        if (fps > max) max = fps;
      }
      const avgFPS = sum / count;
      const minFPS = min === Infinity ? 0 : min;
      const maxFPS = max === -Infinity ? 0 : max;

      // Update performance metrics (OPTIMIZED: only every 6 frames = ~10x/sec instead of 60x/sec)
      metricsUpdateCounterRef.current++;
      if (metricsUpdateCounterRef.current >= 6) {
        metricsUpdateCounterRef.current = 0;
        updatePerformanceMetrics({
          currentFPS,
          avgFPS,
          minFPS,
          maxFPS,
          frameTime,
          tickTime,
          renderTime,
        });
      }

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
      if (renderRef.current) {
        renderRef.current();
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [running, tick, updatePerformanceMetrics, performAutoOptimization, playbackSpeed]);

  // Initial render
  useEffect(() => {
    if (renderRef.current) {
      renderRef.current();
    }
  }, []); // Empty deps - only run once on mount

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
