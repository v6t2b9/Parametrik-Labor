import { useState, useEffect, useRef } from 'react';
import { CanvasPanel } from './components/CanvasPanel';
import { ControlBar } from './components/ControlBar';
import { MatrixControlCenter } from './components/MatrixControlCenter';
import { AudioSimulationBridge } from './components/AudioSimulationBridge';
import { useSimulationStore } from './store/useSimulationStore';
import { useAudioStore } from './store/useAudioStore';
import { colors, spacing, typography, effects } from './design-system';

function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [canvasHeight, setCanvasHeight] = useState(800); // Track canvas height for sticky offset
  const fullscreenContainerRef = useRef<HTMLDivElement>(null);
  const { ui, toggleControlPanel, toggleRunning } = useSimulationStore();
  const { musicEnabled, inputMode, togglePlay } = useAudioStore();

  // Fullscreen handlers
  const enterFullscreen = async () => {
    const container = fullscreenContainerRef.current;
    if (!container) return;

    try {
      // Try native Fullscreen API first
      if (container.requestFullscreen) {
        await container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        // iOS Safari fallback
        await container.webkitRequestFullscreen();
      } else if (container.mozRequestFullScreen) {
        await container.mozRequestFullScreen();
      } else if (container.msRequestFullscreen) {
        await container.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } catch {
      console.warn('Fullscreen API not available, using fallback');
      // Fallback: Just set fullscreen state for CSS-based fullscreen
      setIsFullscreen(true);
    }
  };

  const exitFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (document.webkitFullscreenElement) {
        await document.webkitExitFullscreen?.();
      } else if (document.mozFullScreenElement) {
        await document.mozCancelFullScreen?.();
      } else if (document.msFullscreenElement) {
        await document.msExitFullscreen?.();
      }
    } catch (error) {
      console.warn('Error exiting fullscreen:', error);
    }
    setIsFullscreen(false);
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };

  // Listen for native fullscreen changes (e.g., ESC key, F11)
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Keyboard handlers for fullscreen mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC: Exit fullscreen
      if (e.key === 'Escape' && isFullscreen) {
        exitFullscreen();
      }

      // SPACEBAR: Toggle play/pause in fullscreen mode
      if (e.key === ' ' && isFullscreen) {
        e.preventDefault(); // Prevent page scroll
        toggleRunning();

        // Also toggle audio if music is enabled and using file input
        if (musicEnabled && inputMode === 'file') {
          togglePlay();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, musicEnabled, inputMode, toggleRunning, togglePlay]);

  // Mobile detection and canvas height tracking
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);

      // Calculate canvas height based on aspect ratio
      const aspectRatio = ui.aspectRatio;
      const [w, h] = aspectRatio.split(':').map(Number);
      const baseSize = 800; // DEFAULT_CANVAS_SIZE from CanvasPanel

      let height;
      if (w > h) {
        // Landscape
        height = (baseSize / w) * h;
      } else if (h > w) {
        // Portrait
        height = baseSize;
      } else {
        // Square
        height = baseSize;
      }

      setCanvasHeight(Math.floor(height));
    };

    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [ui.aspectRatio]);

  return (
    <>
      {/* Audio-Simulation Bridge (invisible component) */}
      <AudioSimulationBridge />

      {/* Fullscreen Container */}
      <div
        ref={fullscreenContainerRef}
        style={isFullscreen ? styles.fullscreenOverlay : undefined}
      >
        {isFullscreen ? (
          // Fullscreen Mode: Canvas Only
          <div style={styles.fullscreenContent}>
            <div style={styles.fullscreenCanvasWrapper}>
              <CanvasPanel isFullscreen={true} />
            </div>
            <div style={styles.fullscreenHint}>
              Press <kbd style={styles.kbd}>ESC</kbd> to exit fullscreen
            </div>
            <button
              onClick={exitFullscreen}
              style={styles.fullscreenExitButton}
              aria-label="Exit fullscreen"
            >
              ✕
            </button>
          </div>
        ) : (
          // Normal Mode: Full UI
          <div style={styles.container}>
            <header style={styles.header}>
              <h1 style={styles.title}>Parametric Space Explorer</h1>
              <p style={styles.subtitle}>
                Exploring emergent coordination through parameter manipulation
              </p>
            </header>

            <main style={styles.main}>
              {isMobile ? (
                // Mobile Layout: Vertical Stack with Drawer
                <>
                  <div style={styles.canvasSection}>
                    <CanvasPanel isFullscreen={false} />
                    <ControlBar onFullscreenToggle={toggleFullscreen} />
                    <button onClick={toggleControlPanel} style={styles.mobileToggleButton}>
                      {ui.controlPanelOpen ? '✕ Close Controls' : '🎛️ Open Controls'}
                    </button>
                  </div>

                  {ui.controlPanelOpen && (
                    <div style={styles.mobileDrawer}>
                      <MatrixControlCenter />
                    </div>
                  )}
                </>
              ) : (
                // Desktop Layout: Everything sticky together, content scrolls internally
                <div style={{
                  ...styles.stickyCanvasSection,
                  top: `${-(canvasHeight + 100)}px`, // Compact sticky elements below canvas, 150px canvas peek
                }}>
                  <CanvasPanel isFullscreen={false} />
                  <ControlBar onFullscreenToggle={toggleFullscreen} />
                  <MatrixControlCenter />
                </div>
              )}
            </main>

            <footer style={styles.footer}>
              <p style={styles.footerText}>
                Based on the <strong>Parametrics</strong> theoretical framework
              </p>
              <p style={styles.footerSubtext}>
                Parameters are not settings — they are co-constitutive forces
              </p>
            </footer>
          </div>
        )}
      </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: colors.bg.primary,
    color: colors.text.primary,
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  } as React.CSSProperties,
  header: {
    padding: `${spacing.xxxl} ${spacing.xl}`,
    textAlign: 'center',
    borderBottom: `1px solid ${colors.border.primary}`,
    backgroundColor: colors.bg.primary,
  } as React.CSSProperties,
  title: {
    ...typography.display,
    margin: `0 0 ${spacing.sm} 0`,
    color: colors.text.primary,
  } as React.CSSProperties,
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
    margin: 0,
  } as React.CSSProperties,
  // Main container
  main: {
    padding: spacing.xl,
    maxWidth: '1600px',
    margin: '0 auto',
  } as React.CSSProperties,

  // Mobile canvas section
  canvasSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
  } as React.CSSProperties,

  // Desktop container
  desktopContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0', // No gap, sticky elements handle spacing
  } as React.CSSProperties,

  // Desktop: Sticky canvas section (peeks at top)
  stickyCanvasSection: {
    position: 'sticky',
    // Note: top value is set dynamically based on canvas height
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
    zIndex: 100,
    paddingBottom: spacing.lg,
    backgroundColor: colors.bg.primary,
    boxShadow: effects.shadow.lg,
  } as React.CSSProperties,
  mobileToggleButton: {
    position: 'fixed',
    bottom: spacing.xl,
    right: spacing.xl,
    padding: `${spacing.md} ${spacing.xl}`,
    backgroundColor: colors.accent.primary,
    color: colors.text.primary,
    border: 'none',
    borderRadius: effects.borderRadius.lg,
    fontSize: typography.h3.fontSize,
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: effects.shadow.md,
    zIndex: 1000,
  } as React.CSSProperties,
  mobileDrawer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: '70vh',
    backgroundColor: colors.bg.primary,
    borderTop: `2px solid ${colors.accent.primary}`,
    overflow: 'auto',
    zIndex: 999,
    boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.5)',
  } as React.CSSProperties,
  footer: {
    padding: spacing.xl,
    textAlign: 'center',
    borderTop: `1px solid ${colors.border.primary}`,
    marginTop: spacing.huge,
  } as React.CSSProperties,
  footerText: {
    ...typography.body,
    color: colors.text.secondary,
    margin: `0 0 ${spacing.xs} 0`,
  } as React.CSSProperties,
  footerSubtext: {
    ...typography.caption,
    color: colors.text.tertiary,
    fontStyle: 'italic',
    margin: 0,
  } as React.CSSProperties,
  // Fullscreen styles
  fullscreenOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: '#000000',
    zIndex: 9999,
    overflow: 'hidden',
  } as React.CSSProperties,
  fullscreenContent: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  } as React.CSSProperties,
  fullscreenCanvasWrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: spacing.xl,
  } as React.CSSProperties,
  fullscreenHint: {
    position: 'absolute',
    bottom: spacing.xl,
    left: '50%',
    transform: 'translateX(-50%)',
    ...typography.body,
    color: colors.text.tertiary,
    opacity: 0.6,
    textAlign: 'center',
    pointerEvents: 'none',
  } as React.CSSProperties,
  fullscreenExitButton: {
    position: 'absolute',
    top: spacing.xl,
    right: spacing.xl,
    width: '44px',
    height: '44px',
    backgroundColor: 'rgba(42, 43, 58, 0.9)',
    color: colors.text.primary,
    border: `1px solid ${colors.accent.primary}`,
    borderRadius: effects.borderRadius.full,
    fontSize: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: effects.transition.normal,
    zIndex: 10000,
    backdropFilter: 'blur(10px)',
  } as React.CSSProperties,
  kbd: {
    padding: `${spacing.xs} ${spacing.sm}`,
    backgroundColor: '#1a1a1a',
    border: '1px solid #3a3a3a',
    borderRadius: effects.borderRadius.sm,
    ...typography.caption,
    fontFamily: 'monospace',
  } as React.CSSProperties,
};

export default App;
