import { useState } from 'react';
import { useSimulationStore } from '../store/useSimulationStore';
import { exportPresetAsJSON, copyPresetToClipboard } from '../utils/presetIO';

export function ExportOikosPanel() {
  const { parameters } = useSimulationStore();
  const [copySuccess, setCopySuccess] = useState(false);
  const [presetName, setPresetName] = useState('my-preset');

  // Canvas Screenshot Export
  const handleScreenshot = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) {
      alert('Canvas nicht gefunden');
      return;
    }

    canvas.toBlob((blob) => {
      if (!blob) {
        alert('Screenshot fehlgeschlagen');
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `parametric-explorer-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  // Preset JSON Export
  const handlePresetExport = () => {
    exportPresetAsJSON(parameters, presetName);
  };

  // Preset Clipboard Export
  const handleCopyToClipboard = async () => {
    const success = await copyPresetToClipboard(parameters);
    setCopySuccess(success);
    if (success) {
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>💾 Export</h3>
      <p style={styles.subtitle}>Export your creations and presets</p>

      {/* Canvas Export Section */}
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>📸 Canvas Export</h4>
        <p style={styles.sectionDescription}>
          Capture the current canvas as PNG image
        </p>
        <button onClick={handleScreenshot} style={styles.exportButton}>
          <span style={styles.buttonIcon}>📸</span>
          <span>Screenshot (PNG)</span>
        </button>
      </div>

      <div style={styles.divider} />

      {/* Preset Export Section */}
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>⚙️ Preset Export</h4>
        <p style={styles.sectionDescription}>
          Save your current parameter configuration
        </p>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Preset Name:</label>
          <input
            type="text"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
            style={styles.input}
            placeholder="my-preset"
          />
        </div>

        <div style={styles.buttonGroup}>
          <button onClick={handlePresetExport} style={styles.exportButton}>
            <span style={styles.buttonIcon}>💾</span>
            <span>Download JSON</span>
          </button>

          <button onClick={handleCopyToClipboard} style={styles.exportButton}>
            <span style={styles.buttonIcon}>📋</span>
            <span>{copySuccess ? '✓ Copied!' : 'Copy to Clipboard'}</span>
          </button>
        </div>
      </div>

      <div style={styles.divider} />

      {/* Info Section */}
      <div style={styles.infoSection}>
        <h4 style={styles.infoTitle}>ℹ️ Export Info</h4>
        <ul style={styles.infoList}>
          <li style={styles.infoItem}>
            <strong>Screenshot:</strong> Captures the current canvas visual state
          </li>
          <li style={styles.infoItem}>
            <strong>JSON Download:</strong> Saves all parameters as a .json file
          </li>
          <li style={styles.infoItem}>
            <strong>Clipboard:</strong> Quick copy for sharing or backup
          </li>
        </ul>
      </div>

      {/* Future Features */}
      <div style={styles.divider} />
      <div style={styles.futureSection}>
        <h4 style={styles.sectionTitle}>🎬 Video Export (Coming Soon)</h4>
        <p style={styles.futureDescription}>
          GIF loops and WebM video recording will be available soon.
          Currently accessible via the control bar at the top.
        </p>
      </div>
    </div>
  );
}

const styles = {
  panel: {
    padding: '16px',
    backgroundColor: '#13141f',
    borderRadius: '6px',
    border: '1px solid #2a2b3a',
  } as React.CSSProperties,
  title: {
    fontSize: '16px',
    color: '#e0e0e0',
    marginBottom: '4px',
    fontWeight: 600,
  } as React.CSSProperties,
  subtitle: {
    fontSize: '11px',
    color: '#a0a0b0',
    marginBottom: '16px',
  } as React.CSSProperties,
  section: {
    marginBottom: '16px',
  } as React.CSSProperties,
  sectionTitle: {
    fontSize: '13px',
    color: '#e0e0e0',
    marginBottom: '6px',
    fontWeight: 600,
  } as React.CSSProperties,
  sectionDescription: {
    fontSize: '10px',
    color: '#a0a0b0',
    marginBottom: '12px',
    lineHeight: 1.4,
  } as React.CSSProperties,
  exportButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 16px',
    backgroundColor: '#1a1b2e',
    border: '1px solid #2a2b3a',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontSize: '12px',
    color: '#e0e0e0',
    width: '100%',
    fontWeight: 500,
  } as React.CSSProperties,
  buttonIcon: {
    fontSize: '16px',
  } as React.CSSProperties,
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  } as React.CSSProperties,
  inputGroup: {
    marginBottom: '12px',
  } as React.CSSProperties,
  label: {
    display: 'block',
    fontSize: '11px',
    color: '#a0a0b0',
    marginBottom: '6px',
  } as React.CSSProperties,
  input: {
    width: '100%',
    padding: '8px 12px',
    backgroundColor: '#0a0a15',
    border: '1px solid #2a2b3a',
    borderRadius: '4px',
    color: '#e0e0e0',
    fontSize: '12px',
    outline: 'none',
    boxSizing: 'border-box',
  } as React.CSSProperties,
  divider: {
    height: '1px',
    backgroundColor: '#2a2b3a',
    marginBottom: '16px',
  } as React.CSSProperties,
  infoSection: {
    backgroundColor: '#0a0a15',
    padding: '12px',
    borderRadius: '4px',
    border: '1px solid #2a2b3a',
  } as React.CSSProperties,
  infoTitle: {
    fontSize: '12px',
    color: '#e0e0e0',
    marginBottom: '8px',
    fontWeight: 600,
  } as React.CSSProperties,
  infoList: {
    margin: 0,
    paddingLeft: '20px',
  } as React.CSSProperties,
  infoItem: {
    fontSize: '10px',
    color: '#a0a0b0',
    marginBottom: '6px',
    lineHeight: 1.4,
  } as React.CSSProperties,
  futureSection: {
    opacity: 0.6,
  } as React.CSSProperties,
  futureDescription: {
    fontSize: '10px',
    color: '#a0a0b0',
    fontStyle: 'italic',
    lineHeight: 1.4,
  } as React.CSSProperties,
};
