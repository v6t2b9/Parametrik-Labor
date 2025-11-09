import { useSimulationStore } from '../store/useSimulationStore';

interface ControlBarProps {
  onFullscreenToggle?: () => void;
}

export function ControlBar({ onFullscreenToggle }: ControlBarProps) {
  const { running, toggleRunning, reset, frameCount, parameters, updateGlobalTemporalParams } = useSimulationStore();

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
      {/* Top Row: Buttons and Frame Count */}
      <div style={styles.topRow}>
        <div style={styles.left}>
          <button onClick={toggleRunning} style={styles.playButton}>
            {running ? '⏸️ Pause' : '▶️ Play'}
          </button>
          <button onClick={reset} style={styles.button}>
            🔄 Reset Simulation
          </button>
          <button onClick={takeScreenshot} style={styles.button}>
            📸 Screenshot
          </button>
          {onFullscreenToggle && (
            <button onClick={onFullscreenToggle} style={styles.fullscreenButton}>
              ⛶ Fullscreen
            </button>
          )}
        </div>

        <div style={styles.right}>
          <span style={styles.frameCount}>Frame: {frameCount.toLocaleString()}</span>
        </div>
      </div>

      {/* Bottom Row: Global Parameter Sliders */}
      <div style={styles.slidersRow}>
        {/* Agent Count Slider */}
        <div style={styles.sliderContainer}>
          <div style={styles.sliderHeader}>
            <label style={styles.sliderLabel}>🔢 Agent Count</label>
            <span style={styles.sliderValue}>{parameters.globalTemporal.agentCount.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={150}
            max={2400}
            step={50}
            value={parameters.globalTemporal.agentCount}
            onChange={(e) => updateGlobalTemporalParams({ agentCount: parseInt(e.target.value) })}
            style={styles.slider}
            title="Number of agents in the simulation"
          />
        </div>

        {/* Simulation Speed Slider */}
        <div style={styles.sliderContainer}>
          <div style={styles.sliderHeader}>
            <label style={styles.sliderLabel}>⚡ Simulation Speed</label>
            <span style={styles.sliderValue}>{parameters.globalTemporal.simulationSpeed.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min={0.1}
            max={5}
            step={0.1}
            value={parameters.globalTemporal.simulationSpeed}
            onChange={(e) => updateGlobalTemporalParams({ simulationSpeed: parseFloat(e.target.value) })}
            style={styles.slider}
            title="Speed multiplier for the simulation"
          />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '16px 20px',
    backgroundColor: '#13141f',
    borderRadius: '8px',
    border: '1px solid #2a2b3a',
    marginBottom: '20px',
  } as React.CSSProperties,
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
  } as React.CSSProperties,
  left: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
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
  fullscreenButton: {
    padding: '10px 16px',
    backgroundColor: '#3a3b4a',
    color: '#e0e0e0',
    border: '1px solid #5d5dbd',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  } as React.CSSProperties,
  frameCount: {
    fontSize: '14px',
    color: '#a0a0b0',
    fontFamily: 'monospace',
  } as React.CSSProperties,
  slidersRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '32px',
    paddingTop: '12px',
    borderTop: '1px solid #2a2b3a',
    flexWrap: 'wrap',
  } as React.CSSProperties,
  sliderContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    minWidth: '280px',
    maxWidth: '360px',
    flex: 1,
  } as React.CSSProperties,
  sliderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as React.CSSProperties,
  sliderLabel: {
    fontSize: '13px',
    color: '#e0e0e0',
    fontWeight: 600,
  } as React.CSSProperties,
  sliderValue: {
    fontSize: '13px',
    color: '#7d5dbd',
    fontFamily: 'monospace',
    fontWeight: 600,
  } as React.CSSProperties,
  slider: {
    width: '100%',
    height: '8px',
    borderRadius: '4px',
    outline: 'none',
    background: 'linear-gradient(to right, #7d5dbd 0%, #7d5dbd 50%, #2a2b3a 50%, #2a2b3a 100%)',
    cursor: 'pointer',
    WebkitAppearance: 'none',
    appearance: 'none',
  } as React.CSSProperties,
};
