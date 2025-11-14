import { useState, useRef } from 'react';
import { useSimulationStore } from '../store/useSimulationStore';

interface ControlBarProps {
  onFullscreenToggle?: () => void;
}

export function ControlBar({ onFullscreenToggle }: ControlBarProps) {
  const { running, toggleRunning, reset, frameCount, parameters, updateGlobalTemporalParams, performanceMetrics, ui, setPlaybackSpeed } = useSimulationStore();

  // Video recording state
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

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

  const startRecording = () => {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    if (!canvas) return;

    try {
      // Create a stream from the canvas
      const stream = canvas.captureStream(60); // 60 FPS

      // Create MediaRecorder with high quality settings
      const options: MediaRecorderOptions = {
        mimeType: 'video/webm;codecs=vp9',
        videoBitsPerSecond: 8000000, // 8 Mbps for high quality
      };

      // Fallback to vp8 if vp9 is not supported
      if (!MediaRecorder.isTypeSupported(options.mimeType!)) {
        options.mimeType = 'video/webm;codecs=vp8';
      }

      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;
      recordedChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `parametric-explorer-${Date.now()}.webm`;
        a.click();
        URL.revokeObjectURL(url);
        recordedChunksRef.current = [];
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting video recording:', error);
      alert('Video recording not supported in this browser');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
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
          <button
            onClick={isRecording ? stopRecording : startRecording}
            style={isRecording ? styles.recordingButton : styles.button}
          >
            {isRecording ? '⏹️ Stop Recording' : '🎥 Record Video'}
          </button>
          {onFullscreenToggle && (
            <button onClick={onFullscreenToggle} style={styles.fullscreenButton}>
              ⛶ Fullscreen
            </button>
          )}
        </div>

        <div style={styles.right}>
          <span style={styles.statsLabel}>
            FPS: <span style={styles.statsValue}>{performanceMetrics.avgFPS > 0 ? performanceMetrics.avgFPS.toFixed(0) : '-'}</span>
          </span>
          <span style={styles.statsSeparator}>|</span>
          <span style={styles.statsLabel}>
            Frame: <span style={styles.statsValue}>{frameCount.toLocaleString()}</span>
          </span>
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
            max={4800}
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
            <label style={styles.sliderLabel}>⚡ Simulation Speed (Agent Movement)</label>
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
            title="Speed multiplier for agent movement"
          />
        </div>

        {/* Playback Speed Slider */}
        <div style={styles.sliderContainer}>
          <div style={styles.sliderHeader}>
            <label style={styles.sliderLabel}>🎬 Playback Speed (Animation)</label>
            <span style={styles.sliderValue}>{ui.playbackSpeed.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min={0.1}
            max={2}
            step={0.1}
            value={ui.playbackSpeed}
            onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
            style={styles.slider}
            title="Overall animation playback speed"
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
    gap: '12px',
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
  recordingButton: {
    padding: '10px 16px',
    backgroundColor: '#bd5d5d',
    color: '#ffffff',
    border: '1px solid #ff6b6b',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    animation: 'pulse 1.5s infinite',
  } as React.CSSProperties,
  frameCount: {
    fontSize: '14px',
    color: '#a0a0b0',
    fontFamily: 'monospace',
  } as React.CSSProperties,
  statsLabel: {
    fontSize: '13px',
    color: '#8a8a9a',
  } as React.CSSProperties,
  statsValue: {
    color: '#7d5dbd',
    fontFamily: 'monospace',
    fontWeight: 600,
  } as React.CSSProperties,
  statsSeparator: {
    color: '#4a4a5a',
    fontSize: '14px',
  } as React.CSSProperties,
  slidersRow: {
    display: 'flex',
    justifyContent: 'flex-start',
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
