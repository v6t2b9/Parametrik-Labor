import { useSimulationStore } from '../store/useSimulationStore';

export function ControlBar() {
  const { running, toggleRunning, reset, frameCount } = useSimulationStore();

  const takeScreenshot = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `parametric-explorer-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.left}>
        <button onClick={toggleRunning} style={styles.playButton}>
          {running ? '⏸️ Pause' : '▶️ Play'}
        </button>
        <button onClick={reset} style={styles.button}>
          🔄 Reset
        </button>
        <button onClick={takeScreenshot} style={styles.button}>
          📸 Screenshot
        </button>
      </div>

      <div style={styles.right}>
        <span style={styles.frameCount}>Frame: {frameCount.toLocaleString()}</span>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    backgroundColor: '#13141f',
    borderRadius: '8px',
    border: '1px solid #2a2b3a',
    marginBottom: '20px',
  } as React.CSSProperties,
  left: {
    display: 'flex',
    gap: '12px',
  } as React.CSSProperties,
  right: {
    display: 'flex',
    alignItems: 'center',
  } as React.CSSProperties,
  playButton: {
    padding: '10px 20px',
    backgroundColor: '#7d5dbd',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  } as React.CSSProperties,
  button: {
    padding: '10px 16px',
    backgroundColor: '#2a2b3a',
    color: '#e0e0e0',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  } as React.CSSProperties,
  frameCount: {
    fontSize: '14px',
    color: '#a0a0b0',
    fontFamily: 'monospace',
  } as React.CSSProperties,
};
