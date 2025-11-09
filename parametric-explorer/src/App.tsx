import { useState, useEffect } from 'react';
import { CanvasPanel } from './components/CanvasPanel';
import { ControlBar } from './components/ControlBar';
import { ParameterControlCenter } from './components/ParameterControlCenter';

function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // ESC key handler for fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  return (
    <>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>🔬 Parametric Space Explorer</h1>
          <p style={styles.subtitle}>
            Exploring emergent coordination through parameter manipulation
          </p>
          <p style={styles.version}>v1.0 | Phase 1: Core MVP</p>
        </header>

        <main style={styles.main}>
          {/* Canvas Section - Top */}
          <div style={styles.canvasSection}>
            <CanvasPanel />
            <ControlBar onFullscreenToggle={() => setIsFullscreen(!isFullscreen)} />
          </div>

          {/* Controls Section - Bottom */}
          <div style={styles.controlSection}>
            <ParameterControlCenter />
          </div>
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

      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <div style={styles.fullscreenOverlay}>
          <div style={styles.fullscreenCanvasWrapper}>
            <CanvasPanel />
          </div>
          <div style={styles.fullscreenHint}>
            Press <kbd style={styles.kbd}>ESC</kbd> to exit fullscreen
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0a0a15',
    color: '#e0e0e0',
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  } as React.CSSProperties,
  header: {
    padding: '30px 20px',
    textAlign: 'center',
    borderBottom: '2px solid #2a2b3a',
    background: 'linear-gradient(135deg, #7d5dbd22 0%, #5d9dbd22 100%)',
  } as React.CSSProperties,
  title: {
    fontSize: '36px',
    fontWeight: 700,
    margin: '0 0 8px 0',
    background: 'linear-gradient(135deg, #7d5dbd 0%, #5d9dbd 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  } as React.CSSProperties,
  subtitle: {
    fontSize: '16px',
    color: '#a0a0b0',
    margin: '0 0 4px 0',
  } as React.CSSProperties,
  version: {
    fontSize: '12px',
    color: '#6a6a7a',
    margin: 0,
  } as React.CSSProperties,
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px',
    maxWidth: '1400px',
    margin: '0 auto',
  } as React.CSSProperties,
  canvasSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  } as React.CSSProperties,
  controlSection: {
    display: 'flex',
    flexDirection: 'column',
  } as React.CSSProperties,
  footer: {
    padding: '20px',
    textAlign: 'center',
    borderTop: '2px solid #2a2b3a',
    marginTop: '40px',
  } as React.CSSProperties,
  footerText: {
    fontSize: '14px',
    color: '#a0a0b0',
    margin: '0 0 4px 0',
  } as React.CSSProperties,
  footerSubtext: {
    fontSize: '12px',
    color: '#6a6a7a',
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    flexDirection: 'column',
    gap: '20px',
  } as React.CSSProperties,
  fullscreenCanvasWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as React.CSSProperties,
  fullscreenHint: {
    fontSize: '14px',
    color: '#6a6a7a',
    opacity: 0.6,
  } as React.CSSProperties,
  kbd: {
    padding: '2px 8px',
    backgroundColor: '#1a1a1a',
    border: '1px solid #3a3a3a',
    borderRadius: '4px',
    fontSize: '12px',
    fontFamily: 'monospace',
  } as React.CSSProperties,
};

export default App;
