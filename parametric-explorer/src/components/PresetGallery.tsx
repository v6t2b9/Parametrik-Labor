import { useSimulationStore } from '../store/useSimulationStore';
import { builtInPresets } from '../presets';

export function PresetGallery() {
  const { loadPreset } = useSimulationStore();

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>🎯 Preset Gallery</h3>
      <p style={styles.subtitle}>Quick-load curated parameter configurations</p>

      <div style={styles.grid}>
        {builtInPresets.map((preset) => (
          <div key={preset.name} style={styles.card}>
            <div style={styles.icon}>{preset.icon}</div>
            <h4 style={styles.presetName}>{preset.name}</h4>
            <p style={styles.description}>{preset.description}</p>
            <button
              onClick={() => loadPreset(preset.parameters)}
              style={styles.loadButton}
            >
              Load Preset
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#13141f',
    borderRadius: '8px',
    border: '1px solid #2a2b3a',
    marginBottom: '20px',
  } as React.CSSProperties,
  title: {
    fontSize: '18px',
    color: '#e0e0e0',
    marginBottom: '4px',
    fontWeight: 600,
  } as React.CSSProperties,
  subtitle: {
    fontSize: '12px',
    color: '#a0a0b0',
    marginBottom: '20px',
  } as React.CSSProperties,
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '12px',
  } as React.CSSProperties,
  card: {
    padding: '16px',
    backgroundColor: '#0a0a15',
    borderRadius: '6px',
    border: '1px solid #2a2b3a',
    transition: 'all 0.2s',
    cursor: 'pointer',
  } as React.CSSProperties,
  icon: {
    fontSize: '32px',
    marginBottom: '8px',
    textAlign: 'center',
  } as React.CSSProperties,
  presetName: {
    fontSize: '14px',
    color: '#e0e0e0',
    marginBottom: '8px',
    fontWeight: 600,
    textAlign: 'center',
  } as React.CSSProperties,
  description: {
    fontSize: '11px',
    color: '#6a6a7a',
    lineHeight: '1.4',
    marginBottom: '12px',
    minHeight: '48px',
  } as React.CSSProperties,
  loadButton: {
    width: '100%',
    padding: '8px 12px',
    backgroundColor: '#7d5dbd',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  } as React.CSSProperties,
};
