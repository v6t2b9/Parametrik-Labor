import { useEffect, useRef, useCallback } from 'react';
import { useSimulationStore } from '../store/useSimulationStore';

const CANVAS_SIZE = 800;
const GRID_SIZE = 400;
const SCALE = CANVAS_SIZE / GRID_SIZE; // 2x scaling

export function CanvasPanel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const motionBlurCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

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

  // Initialize motion blur canvas
  useEffect(() => {
    if (!motionBlurCanvasRef.current) {
      const mbCanvas = document.createElement('canvas');
      mbCanvas.width = CANVAS_SIZE;
      mbCanvas.height = CANVAS_SIZE;
      motionBlurCanvasRef.current = mbCanvas;
    }
  }, []);

  // Render function with post-processing effects
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = `rgb(${visualization.colorBg.r}, ${visualization.colorBg.g}, ${visualization.colorBg.b})`;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // === 1. Render base trails ===
    const imageData = ctx.createImageData(CANVAS_SIZE, CANVAS_SIZE);
    const data = imageData.data;

    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const idx = y * GRID_SIZE + x;

        const redVal = trails.red[idx] * visualization.brightness;
        const greenVal = trails.green[idx] * visualization.brightness;
        const blueVal = trails.blue[idx] * visualization.brightness;

        // Apply color mapping
        const r = Math.min(255, (redVal / 255) * visualization.colorRed.r);
        const g = Math.min(255, (greenVal / 255) * visualization.colorGreen.g);
        const b = Math.min(255, (blueVal / 255) * visualization.colorBlue.b);

        // Scale to canvas size (2x2 blocks)
        for (let dy = 0; dy < SCALE; dy++) {
          for (let dx = 0; dx < SCALE; dx++) {
            const canvasX = x * SCALE + dx;
            const canvasY = y * SCALE + dy;
            const pixelIdx = (canvasY * CANVAS_SIZE + canvasX) * 4;

            data[pixelIdx] = r;
            data[pixelIdx + 1] = g;
            data[pixelIdx + 2] = b;
            data[pixelIdx + 3] = 255;
          }
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);

    // === 2. Motion Blur ===
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

    // === 3. CSS Filters: Blur, Saturation, Contrast, Hue Shift ===
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

    // === 4. Bloom Effect ===
    if (effects.bloom > 0) {
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = effects.bloom;
      ctx.filter = `blur(${Math.max(8, effects.blur + 8)}px) brightness(1.5)`;
      ctx.drawImage(canvas, 0, 0);
      ctx.filter = 'none';
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    }

    // === 5. Chromatic Aberration ===
    if (effects.chromaticAberration > 0) {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = CANVAS_SIZE;
      tempCanvas.height = CANVAS_SIZE;
      const tempCtx = tempCanvas.getContext('2d');
      if (tempCtx) {
        tempCtx.drawImage(canvas, 0, 0);
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        const offset = effects.chromaticAberration;

        // Red channel (offset left)
        ctx.globalCompositeOperation = 'screen';
        tempCtx.globalCompositeOperation = 'copy';
        tempCtx.fillStyle = 'black';
        tempCtx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        tempCtx.globalCompositeOperation = 'lighter';
        tempCtx.drawImage(canvas, -offset, 0);
        ctx.drawImage(tempCanvas, 0, 0);

        // Green channel (no offset)
        tempCtx.globalCompositeOperation = 'copy';
        tempCtx.fillStyle = 'black';
        tempCtx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        tempCtx.globalCompositeOperation = 'lighter';
        tempCtx.drawImage(canvas, 0, 0);
        ctx.drawImage(tempCanvas, 0, 0);

        // Blue channel (offset right)
        tempCtx.globalCompositeOperation = 'copy';
        tempCtx.fillStyle = 'black';
        tempCtx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        tempCtx.globalCompositeOperation = 'lighter';
        tempCtx.drawImage(canvas, offset, 0);
        ctx.drawImage(tempCanvas, 0, 0);

        ctx.globalCompositeOperation = 'source-over';
      }
    }

    // === 6. Wave Distortion ===
    if (effects.waveDistortion > 0) {
      const imgData = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      const distortedData = ctx.createImageData(CANVAS_SIZE, CANVAS_SIZE);

      const amplitude = effects.waveDistortion * 15;
      const frequency = 0.02;

      for (let y = 0; y < CANVAS_SIZE; y++) {
        for (let x = 0; x < CANVAS_SIZE; x++) {
          const offsetX = Math.sin(y * frequency) * amplitude;
          const offsetY = Math.cos(x * frequency) * amplitude;

          const srcX = Math.floor(x + offsetX);
          const srcY = Math.floor(y + offsetY);

          if (srcX >= 0 && srcX < CANVAS_SIZE && srcY >= 0 && srcY < CANVAS_SIZE) {
            const srcIdx = (srcY * CANVAS_SIZE + srcX) * 4;
            const dstIdx = (y * CANVAS_SIZE + x) * 4;

            distortedData.data[dstIdx] = imgData.data[srcIdx];
            distortedData.data[dstIdx + 1] = imgData.data[srcIdx + 1];
            distortedData.data[dstIdx + 2] = imgData.data[srcIdx + 2];
            distortedData.data[dstIdx + 3] = imgData.data[srcIdx + 3];
          }
        }
      }

      ctx.putImageData(distortedData, 0, 0);
    }

    // === 7. Vignette ===
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

    // === 8. Render agents (optional) ===
    if (visualization.brightness > 0.5) {
      agents.forEach((agent) => {
        const x = agent.x * SCALE;
        const y = agent.y * SCALE;

        ctx.fillStyle =
          agent.type === 'red'
            ? `rgb(${visualization.colorRed.r}, ${visualization.colorRed.g}, ${visualization.colorRed.b})`
            : agent.type === 'green'
            ? `rgb(${visualization.colorGreen.r}, ${visualization.colorGreen.g}, ${visualization.colorGreen.b})`
            : `rgb(${visualization.colorBlue.r}, ${visualization.colorBlue.g}, ${visualization.colorBlue.b})`;

        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      });
    }
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

  return (
    <div style={styles.container}>
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        style={styles.canvas}
      />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#0a0a15',
  } as React.CSSProperties,
  canvas: {
    border: '2px solid #2a2b3a',
    borderRadius: '8px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
  } as React.CSSProperties,
};
