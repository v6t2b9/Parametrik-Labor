import { useState, useRef } from 'react';
import GIF from 'gif.js.optimized';

export function ToolsOikosPanel() {
  // Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [exportMode, setExportMode] = useState<'screenshot' | 'gif-loop' | 'video'>('screenshot');
  const [videoFormat, setVideoFormat] = useState<'webm' | 'gif'>('webm');
  const [videoDuration, setVideoDuration] = useState<3 | 8 | 12>(3);
  const [recordedFrameCount, setRecordedFrameCount] = useState(0);
  const [processingProgress, setProcessingProgress] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const gifEncoderRef = useRef<any>(null);
  const recordingIntervalRef = useRef<number | null>(null);

  // Screenshot function
  function takeScreenshot() {
    const canvas = document.querySelector('canvas');
    if (!canvas) {
      alert('Canvas not found!');
      return;
    }
    canvas.toBlob((blob) => {
      if (!blob) {
        alert('Screenshot failed!');
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `parametric-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  // Apply fade effect to canvas
  const applyFadeEffect = (canvas: HTMLCanvasElement, fadeAlpha: number): HTMLCanvasElement => {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const ctx = tempCanvas.getContext('2d');
    if (!ctx) return canvas;

    ctx.drawImage(canvas, 0, 0);
    ctx.globalCompositeOperation = 'source-atop';
    ctx.globalAlpha = fadeAlpha;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    return tempCanvas;
  };

  // Start recording
  function startRecording() {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    if (!canvas) {
      alert('Canvas not found!');
      return;
    }

    setRecordedFrameCount(0);
    setIsRecording(true);

    if (exportMode === 'gif-loop') {
      // GIF Loop mode: 2 seconds with fade transitions
      const fadeFrames = 10;
      const totalFrames = 60;
      const fps = 30;

      console.log('Starting GIF Loop recording...');

      try {
        const gif = new GIF({
          workers: 2,
          quality: 10,
          width: canvas.width,
          height: canvas.height,
          workerScript: '/gif.worker.js',
          repeat: 0,
        });

        gifEncoderRef.current = gif;

        gif.on('progress', (progress: number) => {
          setProcessingProgress(Math.round(progress * 100));
          console.log('GIF encoding progress:', (progress * 100).toFixed(1) + '%');
        });

        gif.on('finished', (blob: Blob) => {
          console.log('GIF finished, size:', blob.size);
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

          setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            setIsRecording(false);
            setIsProcessing(false);
            setRecordedFrameCount(0);
            setProcessingProgress(0);
          }, 100);
        });

        // Capture frames
        let frameCount = 0;
        recordingIntervalRef.current = window.setInterval(() => {
          if (frameCount >= totalFrames) {
            console.log('All frames captured, rendering...');
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

          if (frameCount < fadeFrames) {
            fadeAlpha = (frameCount + 1) / fadeFrames;
          } else if (frameCount >= totalFrames - fadeFrames) {
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
        console.error('GIF Loop error:', error);
        alert('GIF Loop recording failed. Please try again.');
        setIsRecording(false);
      }
    } else {
      // Video mode
      const duration = videoDuration * 1000;
      const maxFrames = videoDuration * 30;

      if (videoFormat === 'webm') {
        try {
          const stream = canvas.captureStream(30);
          const options: MediaRecorderOptions = {
            mimeType: 'video/webm;codecs=vp9',
            videoBitsPerSecond: 5000000,
          };

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

            setTimeout(() => {
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
              recordedChunksRef.current = [];
              setIsRecording(false);
              setIsProcessing(false);
            }, 100);
          };

          mediaRecorder.start();

          setTimeout(() => {
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
              mediaRecorderRef.current.stop();
            }
          }, duration);
        } catch (error) {
          console.error('WebM error:', error);
          alert('WebM recording not supported. Try GIF format.');
          setIsRecording(false);
        }
      } else {
        // GIF video mode
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
          });

          gif.on('finished', (blob: Blob) => {
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

            setTimeout(() => {
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
              setIsRecording(false);
              setIsProcessing(false);
              setRecordedFrameCount(0);
              setProcessingProgress(0);
            }, 100);
          });

          let frameCount = 0;
          recordingIntervalRef.current = window.setInterval(() => {
            if (frameCount >= maxFrames) {
              console.log('All video frames captured, rendering...');
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

            gif.addFrame(canvas, { copy: true, delay: 33 });
            frameCount++;
            setRecordedFrameCount(frameCount);

            if (frameCount % 30 === 0) {
              console.log(`Captured ${frameCount}/${maxFrames} frames`);
            }
          }, 33);
        } catch (error) {
          console.error('GIF error:', error);
          alert('GIF recording failed. Please try again.');
          setIsRecording(false);
        }
      }
    }
  }

  // Get button label
  function getButtonLabel() {
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
    if (exportMode === 'screenshot') {
      return '📸 Take Screenshot';
    } else if (exportMode === 'gif-loop') {
      return '🎥 Record GIF Loop (2s)';
    } else {
      return `🎥 Record ${videoFormat.toUpperCase()} (${videoDuration}s)`;
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>🛠️ Tools & Export</h3>
        <p style={styles.subtitle}>Capture screenshots and record animations</p>
      </div>

      {/* Export Mode Selection */}
      <div style={styles.section}>
        <label style={styles.sectionLabel}>Export Mode</label>
        <div style={styles.buttonGroup}>
          <button
            onClick={() => setExportMode('screenshot')}
            style={{
              ...styles.modeButton,
              ...(exportMode === 'screenshot' ? styles.modeButtonActive : {}),
            }}
          >
            📸 Screenshot
          </button>
          <button
            onClick={() => setExportMode('gif-loop')}
            style={{
              ...styles.modeButton,
              ...(exportMode === 'gif-loop' ? styles.modeButtonActive : {}),
            }}
          >
            🔁 GIF Loop
          </button>
          <button
            onClick={() => setExportMode('video')}
            style={{
              ...styles.modeButton,
              ...(exportMode === 'video' ? styles.modeButtonActive : {}),
            }}
          >
            🎬 Video
          </button>
        </div>
      </div>

      {/* Video Settings (only for video mode) */}
      {exportMode === 'video' && (
        <>
          <div style={styles.section}>
            <label style={styles.sectionLabel}>Video Format</label>
            <div style={styles.buttonGroup}>
              <button
                onClick={() => setVideoFormat('webm')}
                style={{
                  ...styles.formatButton,
                  ...(videoFormat === 'webm' ? styles.formatButtonActive : {}),
                }}
              >
                WebM (Best Quality)
              </button>
              <button
                onClick={() => setVideoFormat('gif')}
                style={{
                  ...styles.formatButton,
                  ...(videoFormat === 'gif' ? styles.formatButtonActive : {}),
                }}
              >
                GIF (Universal)
              </button>
            </div>
          </div>

          <div style={styles.section}>
            <label style={styles.sectionLabel}>Duration</label>
            <div style={styles.buttonGroup}>
              <button
                onClick={() => setVideoDuration(3)}
                style={{
                  ...styles.durationButton,
                  ...(videoDuration === 3 ? styles.durationButtonActive : {}),
                }}
              >
                3s
              </button>
              <button
                onClick={() => setVideoDuration(8)}
                style={{
                  ...styles.durationButton,
                  ...(videoDuration === 8 ? styles.durationButtonActive : {}),
                }}
              >
                8s
              </button>
              <button
                onClick={() => setVideoDuration(12)}
                style={{
                  ...styles.durationButton,
                  ...(videoDuration === 12 ? styles.durationButtonActive : {}),
                }}
              >
                12s
              </button>
            </div>
          </div>
        </>
      )}

      {/* Info Box */}
      <div style={styles.infoBox}>
        {exportMode === 'screenshot' && (
          <p style={styles.infoText}>
            📸 Captures current frame as PNG image
          </p>
        )}
        {exportMode === 'gif-loop' && (
          <p style={styles.infoText}>
            🔁 Creates seamless 2-second looping GIF with fade transitions
            <br />
            <span style={styles.infoSmall}>Perfect for social media and profiles!</span>
          </p>
        )}
        {exportMode === 'video' && (
          <p style={styles.infoText}>
            🎬 Records {videoDuration}s animation as {videoFormat.toUpperCase()}
            <br />
            <span style={styles.infoSmall}>
              {videoFormat === 'webm' ? 'High quality, smaller file size' : 'Universal compatibility, larger file'}
            </span>
          </p>
        )}
      </div>

      {/* Action Button */}
      <button
        onClick={exportMode === 'screenshot' ? takeScreenshot : startRecording}
        disabled={isRecording || isProcessing}
        style={{
          ...styles.actionButton,
          ...(isRecording || isProcessing ? styles.actionButtonDisabled : {}),
        }}
      >
        {getButtonLabel()}
      </button>

      {/* Progress Info */}
      {(isRecording || isProcessing) && (
        <div style={styles.progressInfo}>
          {isRecording && (
            <p style={styles.progressText}>Recording in progress...</p>
          )}
          {isProcessing && (
            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressBarFill,
                  width: `${processingProgress}%`,
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
  } as React.CSSProperties,
  header: {
    marginBottom: '24px',
  } as React.CSSProperties,
  title: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#e0e0e0',
    margin: '0 0 8px 0',
  } as React.CSSProperties,
  subtitle: {
    fontSize: '14px',
    color: '#8a8a9a',
    margin: 0,
  } as React.CSSProperties,
  section: {
    marginBottom: '20px',
  } as React.CSSProperties,
  sectionLabel: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: '#b0b0c0',
    marginBottom: '8px',
  } as React.CSSProperties,
  buttonGroup: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  } as React.CSSProperties,
  modeButton: {
    flex: 1,
    minWidth: '120px',
    padding: '12px 16px',
    backgroundColor: '#2a2b3a',
    color: '#e0e0e0',
    border: '2px solid #3a3b4a',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  } as React.CSSProperties,
  modeButtonActive: {
    backgroundColor: '#7d5dbd',
    borderColor: '#7d5dbd',
    color: '#ffffff',
  } as React.CSSProperties,
  formatButton: {
    flex: 1,
    padding: '10px 14px',
    backgroundColor: '#2a2b3a',
    color: '#e0e0e0',
    border: '1px solid #3a3b4a',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  } as React.CSSProperties,
  formatButtonActive: {
    backgroundColor: '#5d7dbd',
    borderColor: '#5d7dbd',
    color: '#ffffff',
  } as React.CSSProperties,
  durationButton: {
    flex: 1,
    padding: '10px 14px',
    backgroundColor: '#2a2b3a',
    color: '#e0e0e0',
    border: '1px solid #3a3b4a',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  } as React.CSSProperties,
  durationButtonActive: {
    backgroundColor: '#bd7d5d',
    borderColor: '#bd7d5d',
    color: '#ffffff',
  } as React.CSSProperties,
  infoBox: {
    padding: '12px 16px',
    backgroundColor: '#1a1b2a',
    border: '1px solid #2a2b3a',
    borderRadius: '8px',
    marginBottom: '20px',
  } as React.CSSProperties,
  infoText: {
    fontSize: '13px',
    color: '#b0b0c0',
    margin: 0,
    lineHeight: 1.6,
  } as React.CSSProperties,
  infoSmall: {
    fontSize: '12px',
    color: '#8a8a9a',
  } as React.CSSProperties,
  actionButton: {
    width: '100%',
    padding: '16px 24px',
    backgroundColor: '#7d5dbd',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.2s',
  } as React.CSSProperties,
  actionButtonDisabled: {
    backgroundColor: '#4a4a5a',
    cursor: 'not-allowed',
    opacity: 0.7,
  } as React.CSSProperties,
  progressInfo: {
    marginTop: '16px',
  } as React.CSSProperties,
  progressText: {
    fontSize: '13px',
    color: '#7d5dbd',
    textAlign: 'center',
    margin: '0 0 8px 0',
  } as React.CSSProperties,
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#2a2b3a',
    borderRadius: '4px',
    overflow: 'hidden',
  } as React.CSSProperties,
  progressBarFill: {
    height: '100%',
    backgroundColor: '#7d5dbd',
    transition: 'width 0.3s',
  } as React.CSSProperties,
};
