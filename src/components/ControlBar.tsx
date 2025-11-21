import { useState, useRef } from 'react';
import { useSimulationStore } from '../store/useSimulationStore';
import { useAudioStore } from '../store/useAudioStore';
import GIF from 'gif.js.optimized';
import type { AspectRatio } from '../types';
import { colors, spacing, typography, effects } from '../design-system';

interface ControlBarProps {
  onFullscreenToggle?: () => void;
}

export function ControlBar({ onFullscreenToggle }: ControlBarProps) {
  const { running, toggleRunning, reset, frameCount, parameters, updateGlobalTemporalParams, performanceMetrics, ui, setAspectRatio } = useSimulationStore();
  const { musicEnabled, inputMode, togglePlay } = useAudioStore();

  // Combined toggle that syncs audio and simulation when music is enabled
  const handlePlayPause = () => {
    toggleRunning();

    // Also toggle audio playback if music is enabled and using file input
    if (musicEnabled && inputMode === 'file') {
      togglePlay();
    }
  };

  // Video panel state
  const [showVideoPanel, setShowVideoPanel] = useState(false);

  // Video recording state
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [videoFormat, setVideoFormat] = useState<'webm' | 'gif'>('webm');
  const [videoDuration, setVideoDuration] = useState<3 | 8 | 12>(3);
  const [recordedFrameCount, setRecordedFrameCount] = useState(0);
  const [processingProgress, setProcessingProgress] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const gifEncoderRef = useRef<InstanceType<typeof GIF> | null>(null);
  const recordingIntervalRef = useRef<number | null>(null);

  function takeScreenshot() {
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
  }

  function startRecording() {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    if (!canvas) return;

    setRecordedFrameCount(0);
    setIsRecording(true);

    const duration = videoDuration * 1000; // Convert to milliseconds
    const maxFrames = videoDuration * 30; // 30 FPS

    if (videoFormat === 'webm') {
      // WebM recording with MediaRecorder
      try {
        const stream = canvas.captureStream(30); // 30 FPS
        const options: MediaRecorderOptions = {
          mimeType: 'video/webm;codecs=vp9',
          videoBitsPerSecond: 5000000, // 5 Mbps
        };

        // Fallback to vp8 if vp9 not supported
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
          a.download = `parametric-video-${Date.now()}.webm`;
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();

          // Delay cleanup to ensure download starts
          setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            recordedChunksRef.current = [];
            setIsRecording(false);
            setIsProcessing(false);
          }, 100);
        };

        mediaRecorder.start();

        // Auto-stop after selected duration
        setTimeout(() => {
          if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
          }
        }, duration);
      } catch (error) {
        console.error('WebM recording error:', error);
        alert('WebM recording not supported. Try GIF format instead.');
        setIsRecording(false);
      }
    } else {
      // GIF recording with gif.js
      console.log('Starting GIF video recording...');
      try {
        const gif = new GIF({
          workers: 2,
          quality: 10,
          width: canvas.width,
          height: canvas.height,
          workerScript: '/gif.worker.js',
        });

        gifEncoderRef.current = gif;

        gif.on('progress', (progress: number) => {
          setProcessingProgress(Math.round(progress * 100));
          console.log('GIF video encoding progress:', (progress * 100).toFixed(1) + '%');
        });

        gif.on('finished', (blob: Blob) => {
          console.log('GIF video rendering finished, blob size:', blob.size);
          if (!blob || blob.size === 0) {
            alert('GIF rendering failed: Empty file. Please try again.');
            setIsRecording(false);
            setIsProcessing(false);
            setRecordedFrameCount(0);
            setProcessingProgress(0);
            return;
          }

          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `parametric-video-${Date.now()}.gif`;
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();

          // Delay cleanup to ensure download starts
          setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            setIsRecording(false);
            setIsProcessing(false);
            setRecordedFrameCount(0);
            setProcessingProgress(0);
          }, 100);
        });

        // Capture frames at 30 FPS
        let frameCount = 0;
        recordingIntervalRef.current = window.setInterval(() => {
          if (frameCount >= maxFrames) {
            console.log('All video frames captured, starting render...');
            // Auto-stop and start rendering
            if (recordingIntervalRef.current) {
              clearInterval(recordingIntervalRef.current);
              recordingIntervalRef.current = null;
            }
            setIsRecording(false);
            setIsProcessing(true);
            setProcessingProgress(0);
            gif.render();
            return;
          }

          gif.addFrame(canvas, { copy: true, delay: 33 }); // 33ms = ~30fps
          frameCount++;
          setRecordedFrameCount(frameCount);

          if (frameCount % 30 === 0) {
            console.log(`Captured ${frameCount}/${maxFrames} video frames`);
          }
        }, 33);
      } catch (error) {
        console.error('GIF recording error:', error);
        alert('GIF recording failed. Please try again.');
        setIsRecording(false);
      }
    }
  }

  // Get button label based on current state
  function getRecordButtonLabel() {
    if (isProcessing) {
      return `Processing... ${processingProgress}%`;
    }

    if (isRecording) {
      if (videoFormat === 'webm') {
        return `Recording... ${videoDuration}s`;
      } else {
        const maxFrames = videoDuration * 30;
        return `Capturing... ${recordedFrameCount}/${maxFrames}`;
      }
    }

    return 'Start Recording';
  }

  return (
    <div style={styles.container}>
      {/* Top Row: Simulation Controls and Stats */}
      <div style={styles.topRow}>
        <div style={styles.left}>
          <button onClick={handlePlayPause} style={styles.playButton}>
            {running ? 'Pause' : 'Play'}
          </button>
          <button onClick={reset} style={styles.button}>
            Reset
          </button>
          {onFullscreenToggle && (
            <button onClick={onFullscreenToggle} style={styles.button}>
              Fullscreen
            </button>
          )}
          <button
            onClick={takeScreenshot}
            disabled={isRecording || isProcessing}
            style={styles.button}
            title="Take screenshot (PNG)"
          >
            Screenshot
          </button>
          <button
            onClick={() => setShowVideoPanel(!showVideoPanel)}
            style={{
              ...styles.button,
              ...(showVideoPanel ? { backgroundColor: colors.accent.primary, color: '#ffffff' } : {})
            }}
            title="Record video"
          >
            Video
          </button>
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

      {/* Video Options Panel */}
      {showVideoPanel && (
        <div style={styles.videoPanel}>
          <div style={styles.videoPanelContent}>
            <div style={styles.videoOption}>
              <label style={styles.videoLabel}>Format:</label>
              <select
                value={videoFormat}
                onChange={(e) => setVideoFormat(e.target.value as 'webm' | 'gif')}
                disabled={isRecording || isProcessing}
                style={styles.videoSelect}
              >
                <option value="webm">WebM</option>
                <option value="gif">GIF</option>
              </select>
            </div>
            <div style={styles.videoOption}>
              <label style={styles.videoLabel}>Duration:</label>
              <select
                value={videoDuration}
                onChange={(e) => setVideoDuration(parseInt(e.target.value) as 3 | 8 | 12)}
                disabled={isRecording || isProcessing}
                style={styles.videoSelect}
              >
                <option value={3}>3s</option>
                <option value={8}>8s</option>
                <option value={12}>12s</option>
              </select>
            </div>
            <button
              onClick={startRecording}
              disabled={isRecording || isProcessing}
              style={isRecording || isProcessing ? styles.recordButtonDisabled : styles.recordButton}
            >
              {getRecordButtonLabel()}
            </button>
            {(isRecording || isProcessing) && (
              <div style={styles.videoProgress}>
                {isRecording && videoFormat === 'webm' && <span>Recording: {videoDuration}s</span>}
                {isRecording && videoFormat === 'gif' && <span>Frames: {recordedFrameCount}/{videoDuration * 30}</span>}
                {isProcessing && <span>Processing: {processingProgress}%</span>}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Row: Global Parameter Sliders */}
      <div style={styles.slidersRow}>
        {/* Agent Count Slider */}
        <div style={styles.sliderContainer}>
          <div style={styles.sliderHeader}>
            <label style={styles.sliderLabel}>Agent Count</label>
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

        {/* Agent Speed Slider */}
        <div style={styles.sliderContainer}>
          <div style={styles.sliderHeader}>
            <label style={styles.sliderLabel}>Agent Speed</label>
            <span style={styles.sliderValue}>{parameters.globalTemporal.simulationSpeed.toFixed(2)}x</span>
          </div>
          <input
            type="range"
            min={0.05}
            max={2.0}
            step={0.05}
            value={parameters.globalTemporal.simulationSpeed}
            onChange={(e) => updateGlobalTemporalParams({ simulationSpeed: parseFloat(e.target.value) })}
            style={styles.slider}
            title="Speed multiplier for agent movement (sweetspot around 0.3x)"
          />
        </div>

        {/* Aspect Ratio Selector */}
        <div style={styles.sliderContainer}>
          <div style={styles.sliderHeader}>
            <label style={styles.sliderLabel}>Aspect Ratio</label>
            <span style={styles.sliderValue}>{ui.aspectRatio}</span>
          </div>
          <select
            value={ui.aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
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
    gap: spacing.md,
    padding: `${spacing.md} ${spacing.lg}`,
    backgroundColor: colors.bg.secondary,
    borderRadius: effects.borderRadius.lg,
    border: `1px solid ${colors.border.primary}`,
  } as React.CSSProperties,
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.sm,
  } as React.CSSProperties,
  left: {
    display: 'flex',
    gap: spacing.sm,
    flexWrap: 'wrap',
  } as React.CSSProperties,
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
  } as React.CSSProperties,
  playButton: {
    padding: `${spacing.sm} ${spacing.xl}`,
    backgroundColor: colors.accent.primary,
    color: '#ffffff',
    border: 'none',
    borderRadius: effects.borderRadius.md,
    ...typography.h3,
    fontWeight: 600,
    cursor: 'pointer',
    transition: effects.transition.normal,
  } as React.CSSProperties,
  button: {
    padding: `${spacing.sm} ${spacing.lg}`,
    backgroundColor: colors.border.primary,
    color: colors.text.primary,
    border: 'none',
    borderRadius: effects.borderRadius.md,
    ...typography.h3,
    fontWeight: 600,
    cursor: 'pointer',
    transition: effects.transition.normal,
  } as React.CSSProperties,
  fullscreenButton: {
    padding: `${spacing.sm} ${spacing.lg}`,
    backgroundColor: colors.bg.tertiary,
    color: colors.text.primary,
    border: `1px solid ${colors.accent.primary}`,
    borderRadius: effects.borderRadius.md,
    ...typography.h3,
    fontWeight: 600,
    cursor: 'pointer',
    transition: effects.transition.normal,
  } as React.CSSProperties,
  recordingButton: {
    padding: `${spacing.sm} ${spacing.lg}`,
    backgroundColor: colors.semantic.error,
    color: '#ffffff',
    border: '1px solid #ff6b6b',
    borderRadius: effects.borderRadius.md,
    ...typography.h3,
    fontWeight: 600,
    cursor: 'not-allowed',
    transition: effects.transition.normal,
    opacity: 0.9,
  } as React.CSSProperties,
  frameCount: {
    ...typography.h3,
    color: colors.text.secondary,
    fontFamily: 'monospace',
  } as React.CSSProperties,
  statsLabel: {
    ...typography.body,
    color: colors.text.muted,
  } as React.CSSProperties,
  statsValue: {
    color: colors.accent.primary,
    fontFamily: 'monospace',
    fontWeight: 600,
  } as React.CSSProperties,
  statsSeparator: {
    color: '#4a4a5a',
    ...typography.h3,
  } as React.CSSProperties,
  slidersRow: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: spacing.xxxl,
    paddingTop: spacing.md,
    borderTop: `1px solid ${colors.border.primary}`,
    flexWrap: 'wrap',
  } as React.CSSProperties,
  sliderContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
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
    ...typography.body,
    color: colors.text.primary,
    fontWeight: 600,
  } as React.CSSProperties,
  sliderValue: {
    ...typography.body,
    color: colors.accent.primary,
    fontFamily: 'monospace',
    fontWeight: 600,
  } as React.CSSProperties,
  slider: {
    width: '100%',
    height: '8px',
    borderRadius: effects.borderRadius.sm,
    outline: 'none',
    background: `linear-gradient(to right, ${colors.accent.primary} 0%, ${colors.accent.primary} 50%, ${colors.border.primary} 50%, ${colors.border.primary} 100%)`,
    cursor: 'pointer',
    WebkitAppearance: 'none',
    appearance: 'none',
  } as React.CSSProperties,
  select: {
    width: '100%',
    padding: `${spacing.sm} ${spacing.md}`,
    backgroundColor: colors.border.primary,
    color: colors.text.primary,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: effects.borderRadius.md,
    ...typography.body,
    fontWeight: 500,
    cursor: 'pointer',
    outline: 'none',
    transition: effects.transition.normal,
  } as React.CSSProperties,
  formatSelect: {
    padding: `${spacing.sm} ${spacing.md}`,
    backgroundColor: colors.border.primary,
    color: colors.text.primary,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: effects.borderRadius.md,
    ...typography.body,
    fontWeight: 600,
    cursor: 'pointer',
    outline: 'none',
    transition: effects.transition.normal,
  } as React.CSSProperties,
  // Video Panel Styles
  videoPanel: {
    paddingTop: spacing.md,
    borderTop: `1px solid ${colors.border.primary}`,
  } as React.CSSProperties,
  videoPanelContent: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.lg,
    flexWrap: 'wrap',
  } as React.CSSProperties,
  videoOption: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
  } as React.CSSProperties,
  videoLabel: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: 600,
    minWidth: '60px',
  } as React.CSSProperties,
  videoSelect: {
    padding: `${spacing.sm} ${spacing.md}`,
    backgroundColor: colors.border.primary,
    color: colors.text.primary,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: effects.borderRadius.md,
    ...typography.body,
    fontWeight: 600,
    cursor: 'pointer',
    outline: 'none',
    transition: effects.transition.normal,
    minWidth: '100px',
  } as React.CSSProperties,
  recordButton: {
    padding: `${spacing.sm} ${spacing.xl}`,
    backgroundColor: colors.accent.primary,
    color: '#ffffff',
    border: 'none',
    borderRadius: effects.borderRadius.md,
    ...typography.body,
    fontWeight: 600,
    cursor: 'pointer',
    transition: effects.transition.normal,
  } as React.CSSProperties,
  recordButtonDisabled: {
    padding: `${spacing.sm} ${spacing.xl}`,
    backgroundColor: '#4a4a5a',
    color: colors.text.muted,
    border: 'none',
    borderRadius: effects.borderRadius.md,
    ...typography.body,
    fontWeight: 600,
    cursor: 'not-allowed',
    opacity: 0.6,
  } as React.CSSProperties,
  videoProgress: {
    ...typography.body,
    color: colors.accent.primary,
    fontFamily: 'monospace',
    fontWeight: 600,
  } as React.CSSProperties,
};
