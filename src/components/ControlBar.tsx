import { useState, useRef } from 'react';
import { useSimulationStore } from '../store/useSimulationStore';
import GIF from 'gif.js.optimized';

interface ControlBarProps {
  onFullscreenToggle?: () => void;
}

export function ControlBar({ onFullscreenToggle }: ControlBarProps) {
  const { running, toggleRunning, reset, frameCount, parameters, updateGlobalTemporalParams, performanceMetrics, ui, setPlaybackSpeed, setAspectRatio } = useSimulationStore();

  // Video recording state
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [exportMode, setExportMode] = useState<'gif-loop' | 'video'>('video');
  const [videoFormat, setVideoFormat] = useState<'webm' | 'gif'>('webm');
  const [videoDuration, setVideoDuration] = useState<3 | 8 | 12>(3);
  const [recordedFrameCount, setRecordedFrameCount] = useState(0);
  const [processingProgress, setProcessingProgress] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const gifEncoderRef = useRef<any>(null);
  const recordingIntervalRef = useRef<number | null>(null);

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

  const applyFadeEffect = (canvas: HTMLCanvasElement, fadeAlpha: number): HTMLCanvasElement => {
    // Create a temporary canvas with the fade effect
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const ctx = tempCanvas.getContext('2d');
    if (!ctx) return canvas;

    // Draw original canvas
    ctx.drawImage(canvas, 0, 0);

    // Apply fade overlay
    ctx.globalCompositeOperation = 'source-atop';
    ctx.globalAlpha = fadeAlpha;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    return tempCanvas;
  };

  const startRecording = () => {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    if (!canvas) return;

    setRecordedFrameCount(0);
    setIsRecording(true);

    if (exportMode === 'gif-loop') {
      // GIF Loop mode: 2 seconds with fade transitions
      const fadeFrames = 10; // Frames for fade in/out
      const totalFrames = 60; // 2 seconds at 30fps
      const fps = 30;

      console.log('Starting GIF Loop recording...');

      try {
        const gif = new GIF({
          workers: 2,
          quality: 10,
          width: canvas.width,
          height: canvas.height,
          workerScript: '/gif.worker.js',
          repeat: 0, // 0 = infinite loop
        });

        gifEncoderRef.current = gif;

        gif.on('progress', (progress: number) => {
          setProcessingProgress(Math.round(progress * 100));
          console.log('GIF encoding progress:', (progress * 100).toFixed(1) + '%');
        });

        gif.on('finished', (blob: Blob) => {
          console.log('GIF rendering finished, blob size:', blob.size);
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
          a.download = `parametric-loop-${Date.now()}.gif`;
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

        // Capture frames at 30 FPS with fade effects
        let frameCount = 0;
        recordingIntervalRef.current = window.setInterval(() => {
          if (frameCount >= totalFrames) {
            console.log('All frames captured, starting render...');
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

          let fadeAlpha = 1.0;

          // Fade in at the beginning
          if (frameCount < fadeFrames) {
            fadeAlpha = (frameCount + 1) / fadeFrames;
          }
          // Fade out at the end
          else if (frameCount >= totalFrames - fadeFrames) {
            fadeAlpha = (totalFrames - frameCount) / fadeFrames;
          }

          const frameCanvas = fadeAlpha < 1.0 ? applyFadeEffect(canvas, fadeAlpha) : canvas;
          gif.addFrame(frameCanvas, { copy: true, delay: 1000 / fps });

          frameCount++;
          setRecordedFrameCount(frameCount);

          if (frameCount % 10 === 0) {
            console.log(`Captured ${frameCount}/${totalFrames} frames`);
          }
        }, 1000 / fps);
      } catch (error) {
        console.error('GIF Loop recording error:', error);
        alert('GIF Loop recording failed. Please try again.');
        setIsRecording(false);
      }
    } else {
      // Video mode: WebM or GIF with selected duration
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
        // GIF recording with gif.js (no fade effects for video mode)
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
  };

  // Get button label based on current state
  const getButtonLabel = () => {
    if (isProcessing) {
      return `⏳ Processing GIF... ${processingProgress}%`;
    }

    if (isRecording) {
      if (exportMode === 'gif-loop') {
        return `🔴 Capturing... ${recordedFrameCount}/60`;
      } else if (videoFormat === 'webm') {
        return `🔴 Recording WebM... ${videoDuration}s`;
      } else {
        const maxFrames = videoDuration * 30;
        return `🔴 Capturing... ${recordedFrameCount}/${maxFrames}`;
      }
    }

    // Not recording
    if (exportMode === 'gif-loop') {
      return '🎥 Record GIF Loop (2s)';
    } else {
      return `🎥 Record ${videoFormat.toUpperCase()} (${videoDuration}s)`;
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

          {/* Export Mode Selection */}
          <select
            value={exportMode}
            onChange={(e) => setExportMode(e.target.value as 'gif-loop' | 'video')}
            disabled={isRecording || isProcessing}
            style={styles.formatSelect}
            title="Export mode"
          >
            <option value="gif-loop">🔁 GIF Loop (2s with fade)</option>
            <option value="video">🎬 Video</option>
          </select>

          {/* Video Format Selection (only for video mode) */}
          {exportMode === 'video' && (
            <select
              value={videoFormat}
              onChange={(e) => setVideoFormat(e.target.value as 'webm' | 'gif')}
              disabled={isRecording || isProcessing}
              style={styles.formatSelect}
              title="Video format"
            >
              <option value="webm">WebM (Best Quality)</option>
              <option value="gif">GIF (Universal)</option>
            </select>
          )}

          {/* Video Duration Selection (only for video mode) */}
          {exportMode === 'video' && (
            <select
              value={videoDuration}
              onChange={(e) => setVideoDuration(parseInt(e.target.value) as 3 | 8 | 12)}
              disabled={isRecording || isProcessing}
              style={styles.formatSelect}
              title="Video duration"
            >
              <option value="3">3 seconds</option>
              <option value="8">8 seconds</option>
              <option value="12">12 seconds</option>
            </select>
          )}

          <button
            onClick={startRecording}
            disabled={isRecording || isProcessing}
            style={
              isRecording || isProcessing
                ? styles.recordingButton
                : styles.button
            }
          >
            {getButtonLabel()}
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
    cursor: 'not-allowed',
    transition: 'all 0.2s',
    opacity: 0.9,
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
  formatSelect: {
    padding: '10px 12px',
    backgroundColor: '#2a2b3a',
    color: '#e0e0e0',
    border: '1px solid #3a3b4a',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.2s',
  } as React.CSSProperties,
};
