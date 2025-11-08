import { useEffect, useRef } from 'react';
import { useSimulationStore } from '../store/useSimulationStore';

const CANVAS_SIZE = 800;
const GRID_SIZE = 400;
const SCALE = CANVAS_SIZE / GRID_SIZE; // 2x scaling

export function CanvasPanel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  const { trails, agents, parameters, running, tick } = useSimulationStore();
  const { visualization } = parameters;

  // Animation loop
  useEffect(() => {
    const animate = () => {
      tick();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    if (running) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [running, tick]);

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear with background color and slight fade for trail effect
    ctx.fillStyle = `rgba(${visualization.colorBg.r}, ${visualization.colorBg.g}, ${visualization.colorBg.b}, 0.1)`;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Render trails using ImageData for performance
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

            data[pixelIdx] = r;         // R
            data[pixelIdx + 1] = g;     // G
            data[pixelIdx + 2] = b;     // B
            data[pixelIdx + 3] = 255;   // A
          }
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);

    // Optionally render agents as small dots
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
  }, [trails, agents, visualization]);

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
