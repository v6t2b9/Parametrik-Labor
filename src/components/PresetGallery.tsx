import { useSimulationStore } from '../store/useSimulationStore';
import { builtInPresets } from '../presets';
import { useState, useRef } from 'react';

// Categorize presets by their pattern formation characteristics
const presetCategories = {
  organic: {
    title: '🌊 Organisch & Fließend',
    description: 'Weiche, fließende Muster mit organischer Dynamik',
    presets: ['Plasma Dream', 'Aurora Sky', 'Lava Flow'],
  },
  energetic: {
    title: '🔥 Energetisch & Chaotisch',
    description: 'Wilde, energiegeladene Strukturen mit hoher Dynamik',
    presets: ['Neon Jungle', 'Electric Storm'],
  },
  stable: {
    title: '🏔️ Stabil & Strukturiert',
    description: 'Präzise, geometrische Muster mit klaren Formen',
    presets: ['Crystal Cave'],
  },
  special: {
    title: '📺 Spezialeffekte',
    description: 'Thematische Looks mit speziellen visuellen Effekten',
    presets: ['Digital Rain', 'Retro Arcade'],
  },
};

export function PresetGallery() {
  const { loadPreset, exportCurrentPreset, importPresetFromFile } = useSimulationStore();
  const [presetName, setPresetName] = useState('my-preset');
  const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    exportCurrentPreset(presetName);
    setImportStatus({ type: 'success', message: `Preset "${presetName}" wurde erfolgreich exportiert!` });
    setTimeout(() => setImportStatus(null), 3000);
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const result = await importPresetFromFile(file);

    if (result.success) {
      setImportStatus({ type: 'success', message: 'Preset wurde erfolgreich geladen!' });
    } else {
      setImportStatus({ type: 'error', message: result.error || 'Fehler beim Laden des Presets' });
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    setTimeout(() => setImportStatus(null), 5000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>🎯 Master Preset Gallery</h3>
        <p style={styles.subtitle}>
          Erkunde die beeindruckende Vielfalt der Musterbildung - jedes Preset zeigt einzigartige emergente Strukturen
        </p>
      </div>

      {/* Custom Preset Management Section */}
      <div style={styles.customSection}>
        <div style={styles.categoryHeader}>
          <h4 style={styles.categoryTitle}>💾 Eigene Presets verwalten</h4>
          <p style={styles.categoryDescription}>Speichere deine aktuellen Einstellungen oder lade eigene Presets</p>
        </div>

        <div style={styles.customControls}>
          <div style={styles.exportSection}>
            <label style={styles.inputLabel}>Preset-Name:</label>
            <input
              type="text"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              style={styles.input}
              placeholder="mein-preset"
            />
            <button onClick={handleExport} style={styles.exportButton}>
              ⬇️ Aktuelles Preset exportieren
            </button>
          </div>

          <div style={styles.importSection}>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              style={styles.fileInput}
              id="preset-file-input"
            />
            <label htmlFor="preset-file-input" style={styles.importButton}>
              ⬆️ Preset importieren (.json)
            </label>
          </div>
        </div>

        {importStatus && (
          <div style={{
            ...styles.statusMessage,
            backgroundColor: importStatus.type === 'success' ? '#0a3d0a' : '#3d0a0a',
            borderColor: importStatus.type === 'success' ? '#2d8f2d' : '#8f2d2d',
          }}>
            {importStatus.message}
          </div>
        )}
      </div>

      {Object.entries(presetCategories).map(([categoryKey, category]) => {
        const categoryPresets = builtInPresets.filter(p => category.presets.includes(p.name));

        return (
          <div key={categoryKey} style={styles.category}>
            <div style={styles.categoryHeader}>
              <h4 style={styles.categoryTitle}>{category.title}</h4>
              <p style={styles.categoryDescription}>{category.description}</p>
            </div>

            <div style={styles.grid}>
              {categoryPresets.map((preset) => (
                <div key={preset.name} style={styles.card}>
                  <div style={styles.cardIcon}>{preset.icon}</div>
                  <div style={styles.cardContent}>
                    <h5 style={styles.presetName}>{preset.name}</h5>
                    <p style={styles.description}>{preset.description}</p>
                  </div>
                  <button
                    onClick={() => loadPreset(preset.parameters)}
                    style={styles.loadButton}
                  >
                    ▶️ Load Preset
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div style={styles.infoBox}>
        <h5 style={styles.infoTitle}>💡 About Master Presets</h5>
        <p style={styles.infoText}>
          Each preset is a complete system configuration affecting all parameters:
          <strong> Physics, Semiotic Behavior, Temporal Dynamics, Resonance, Visuals,</strong> and <strong>Effects</strong>.
          <br/><br/>
          These carefully crafted combinations showcase the system's ability to generate vastly different pattern formations
          from the same underlying rules - a testament to the richness of emergent behavior!
        </p>
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
  } as React.CSSProperties,
  customSection: {
    marginBottom: '32px',
    padding: '20px',
    backgroundColor: '#0a0a15',
    borderRadius: '8px',
    border: '2px solid #3d2d5d',
  } as React.CSSProperties,
  customControls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  } as React.CSSProperties,
  exportSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  } as React.CSSProperties,
  importSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  } as React.CSSProperties,
  inputLabel: {
    fontSize: '12px',
    color: '#a0a0b0',
    fontWeight: 500,
  } as React.CSSProperties,
  input: {
    padding: '10px 12px',
    backgroundColor: '#13141f',
    border: '1px solid #2a2b3a',
    borderRadius: '6px',
    color: '#e0e0e0',
    fontSize: '13px',
    fontFamily: 'inherit',
  } as React.CSSProperties,
  exportButton: {
    padding: '12px 16px',
    backgroundColor: '#5d8fbd',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  } as React.CSSProperties,
  fileInput: {
    display: 'none',
  } as React.CSSProperties,
  importButton: {
    display: 'inline-block',
    padding: '12px 16px',
    backgroundColor: '#5dbd7d',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'center',
  } as React.CSSProperties,
  statusMessage: {
    marginTop: '16px',
    padding: '12px 16px',
    borderRadius: '6px',
    border: '1px solid',
    fontSize: '13px',
    color: '#e0e0e0',
    textAlign: 'center',
  } as React.CSSProperties,
  header: {
    marginBottom: '32px',
    textAlign: 'center',
    paddingBottom: '20px',
    borderBottom: '2px solid #2a2b3a',
  } as React.CSSProperties,
  title: {
    fontSize: '24px',
    color: '#e0e0e0',
    marginBottom: '8px',
    fontWeight: 700,
  } as React.CSSProperties,
  subtitle: {
    fontSize: '13px',
    color: '#a0a0b0',
    lineHeight: '1.5',
    maxWidth: '600px',
    margin: '0 auto',
  } as React.CSSProperties,
  category: {
    marginBottom: '36px',
  } as React.CSSProperties,
  categoryHeader: {
    marginBottom: '16px',
    paddingLeft: '4px',
  } as React.CSSProperties,
  categoryTitle: {
    fontSize: '16px',
    color: '#9d7dd4',
    marginBottom: '4px',
    fontWeight: 600,
  } as React.CSSProperties,
  categoryDescription: {
    fontSize: '12px',
    color: '#7d7d8d',
    margin: 0,
  } as React.CSSProperties,
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '16px',
  } as React.CSSProperties,
  card: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    backgroundColor: '#0a0a15',
    borderRadius: '8px',
    border: '2px solid #2a2b3a',
    transition: 'all 0.3s',
    cursor: 'pointer',
  } as React.CSSProperties,
  cardIcon: {
    fontSize: '48px',
    marginBottom: '12px',
    textAlign: 'center',
  } as React.CSSProperties,
  cardContent: {
    flex: 1,
    marginBottom: '16px',
  } as React.CSSProperties,
  presetName: {
    fontSize: '16px',
    color: '#e0e0e0',
    marginBottom: '10px',
    fontWeight: 600,
    textAlign: 'center',
    margin: '0 0 10px 0',
  } as React.CSSProperties,
  description: {
    fontSize: '12px',
    color: '#8a8a9a',
    lineHeight: '1.5',
    textAlign: 'center',
    minHeight: '54px',
  } as React.CSSProperties,
  loadButton: {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#7d5dbd',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  } as React.CSSProperties,
  infoBox: {
    marginTop: '32px',
    padding: '20px',
    backgroundColor: '#0a0a15',
    borderRadius: '8px',
    border: '2px solid #3d2d5d',
  } as React.CSSProperties,
  infoTitle: {
    fontSize: '14px',
    color: '#9d7dd4',
    marginBottom: '12px',
    fontWeight: 600,
    margin: '0 0 12px 0',
  } as React.CSSProperties,
  infoText: {
    fontSize: '12px',
    color: '#a0a0b0',
    lineHeight: '1.6',
    margin: 0,
  } as React.CSSProperties,
};
