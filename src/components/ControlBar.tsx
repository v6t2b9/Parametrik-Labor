import { useState, useRef } from 'react';
import { useSimulationStore } from '../store/useSimulationStore';
import UPNG from '@pdf-lib/upng';

interface ControlBarProps {
  onFullscreenToggle?: () => void;
}

export function ControlBar({ onFullscreenToggle }: ControlBarProps) {
  const { running, toggleRunning, reset, frameCount, parameters, updateGlobalTemporalParams, performanceMetrics, ui, setPlaybackSpeed, setAspectRatio } = useSimulationStore();

  // APNG recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordedFrameCount, setRecordedFrameCount] = useState(0);
  const recordedFramesRef = useRef<ImageData[]>([]);
  const recordingIntervalRef = useRef<number | null>(null);
  const maxFrames = 120; // 2 seconds at 60fps, or 4 seconds at 30fps

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

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset recording state
    recordedFramesRef.current = [];
    setRecordedFrameCount(0);
    setIsRecording(true);

    // Capture frames at 30 FPS
    recordingIntervalRef.current = window.setInterval(() => {
      const currentCount = recordedFramesRef.current.length;
      if (currentCount >= maxFrames) {
        stopRecording();
        return;
      }

      // Capture current frame as ImageData
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      recordedFramesRef.current.push(imageData);
      setRecordedFrameCount(recordedFramesRef.current.length);
    }, 1000 / 30); // 30 FPS
  };

  const stopRecording = async () => {
    if (!isRecording) return;

    // Stop capturing frames
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
    }

    setIsRecording(false);

    if (recordedFramesRef.current.length === 0) {
      alert('No frames recorded');
      return;
    }

    try {
      // Convert frames to APNG
      const canvas = document.querySelector('canvas') as HTMLCanvasElement;
      if (!canvas) return;

      const width = canvas.width;
      const height = canvas.height;

      // Convert ImageData frames to raw RGBA buffers
      const frames = recordedFramesRef.current.map(imageData => imageData.data.buffer);

      // Encode as APNG with 30 FPS (33ms delay per frame)
      const apng = UPNG.encode(frames, width, height, 0, Array(frames.length).fill(33));

      // Create blob and download
      const blob = new Blob([apng], { type: 'image/apng' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `parametric-explorer-${Date.now()}.apng`;
      a.click();
      URL.revokeObjectURL(url);

      // Clean up
      recordedFramesRef.current = [];
      setRecordedFrameCount(0);
    } catch (error) {
      console.error('Error creating APNG:', error);
      alert('Failed to create APNG. Try recording a shorter clip.');
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
            {isRecording ? `⏹️ Stop (${recordedFrameCount}/${maxFrames})` : '🎥 Record APNG (4s)'}
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

        {/* Aspect Ratio Selector */}
        <div style={styles.sliderContainer}>
          <div style={styles.sliderHeader}>
            <label style={styles.sliderLabel}>📐 Aspect Ratio</label>
            <span style={styles.sliderValue}>{ui.aspectRatio}</span>
          </div>
          <select
            value={ui.aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value as any)}
            style={styles.select}
            title="Canvas aspect ratio for export and display"
          >
            <option value="1:1">1:1 (Square)</option>
            <option value="16:9">16:9 (Landscape)</option>
            <option value="9:16">9:16 (Portrait)</option>
            <option value="3:2">3:2 (Photo Landscape)</option>
            <option value="2:3">2:3 (Photo Portrait)</option>
            <option value="4:3">4:3 (Classic)</option>
            <option value="3:4">3:4 (Classic Portrait)</option>
            <option value="21:9">21:9 (Ultrawide)</option>
            <option value="9:21">9:21 (Ultra Portrait)</option>
          </select>
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
  select: {
    width: '100%',
    padding: '8px 12px',
    backgroundColor: '#2a2b3a',
    color: '#e0e0e0',
    border: '1px solid #3a3b4a',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.2s',
  } as React.CSSProperties,
};
