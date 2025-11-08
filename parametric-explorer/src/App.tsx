import { CanvasPanel } from './components/CanvasPanel';
import { ControlBar } from './components/ControlBar';
import { ParameterControlCenter } from './components/ParameterControlCenter';

function App() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>🔬 Parametric Space Explorer</h1>
        <p style={styles.subtitle}>
          Exploring emergent coordination through parameter manipulation
        </p>
        <p style={styles.version}>v1.0 | Phase 1: Core MVP</p>
      </header>

      <main style={styles.main}>
        <div style={styles.canvasSection}>
          <CanvasPanel />
          <ControlBar />
        </div>

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
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    padding: '20px',
    maxWidth: '1800px',
    margin: '0 auto',
  } as React.CSSProperties,
  canvasSection: {
    display: 'flex',
    flexDirection: 'column',
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
};

export default App;
