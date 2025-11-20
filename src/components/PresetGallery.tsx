import { useSimulationStore } from '../store/useSimulationStore';
import { builtInPresets } from '../presets';
import { useState, useRef } from 'react';
import { colors, spacing, typography, effects, createHeaderStyle, createSubtitleStyle } from '../design-system';

// Categorize presets by their pattern formation characteristics
const presetCategories = {
  organic: {
    title: 'Organisch & Fließend',
    description: 'Weiche, fließende Muster mit organischer Dynamik',
    presets: ['Plasma Dream', 'Aurora Sky', 'Lava Flow'],
  },
  energetic: {
    title: 'Energetisch & Chaotisch',
    description: 'Wilde, energiegeladene Strukturen mit hoher Dynamik',
    presets: ['Neon Jungle', 'Electric Storm'],
  },
  stable: {
    title: 'Stabil & Strukturiert',
    description: 'Präzise, geometrische Muster mit klaren Formen',
    presets: ['Crystal Cave'],
  },
  special: {
    title: 'Spezialeffekte',
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
        <h3 style={styles.title}>Master Preset Gallery</h3>
        <p style={styles.subtitle}>
          Erkunde die beeindruckende Vielfalt der Musterbildung - jedes Preset zeigt einzigartige emergente Strukturen
        </p>
      </div>

      {/* Custom Preset Management Section */}
      <div style={styles.customSection}>
        <div style={styles.categoryHeader}>
          <h4 style={styles.categoryTitle}>Eigene Presets verwalten</h4>
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
        <h5 style={styles.infoTitle}>About Master Presets</h5>
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
    padding: spacing.xl,
    backgroundColor: colors.bg.secondary,
    borderRadius: effects.borderRadius.lg,
    border: `1px solid ${colors.border.primary}`,
  } as React.CSSProperties,
  customSection: {
    marginBottom: spacing.xxxl,
    padding: spacing.xl,
    backgroundColor: colors.bg.subtle,
    borderRadius: effects.borderRadius.md,
    border: `1px solid ${colors.border.primary}`,
  } as React.CSSProperties,
  customControls: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
  } as React.CSSProperties,
  exportSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
  } as React.CSSProperties,
  importSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
  } as React.CSSProperties,
  inputLabel: {
    ...typography.caption,
    color: colors.text.secondary,
    fontWeight: 500,
  } as React.CSSProperties,
  input: {
    padding: `${spacing.sm} ${spacing.md}`,
    backgroundColor: colors.bg.secondary,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: effects.borderRadius.md,
    color: colors.text.primary,
    fontSize: typography.body.fontSize,
    fontFamily: 'inherit',
  } as React.CSSProperties,
  exportButton: {
    padding: `${spacing.md} ${spacing.lg}`,
    backgroundColor: colors.semantic.info,
    color: '#ffffff',
    border: 'none',
    borderRadius: effects.borderRadius.md,
    ...typography.body,
    fontWeight: 600,
    cursor: 'pointer',
    transition: effects.transition.normal,
  } as React.CSSProperties,
  fileInput: {
    display: 'none',
  } as React.CSSProperties,
  importButton: {
    display: 'inline-block',
    padding: `${spacing.md} ${spacing.lg}`,
    backgroundColor: colors.semantic.success,
    color: '#ffffff',
    border: 'none',
    borderRadius: effects.borderRadius.md,
    ...typography.body,
    fontWeight: 600,
    cursor: 'pointer',
    transition: effects.transition.normal,
    textAlign: 'center',
  } as React.CSSProperties,
  statusMessage: {
    marginTop: spacing.lg,
    padding: `${spacing.md} ${spacing.lg}`,
    borderRadius: effects.borderRadius.md,
    border: '1px solid',
    ...typography.body,
    color: colors.text.primary,
    textAlign: 'center',
  } as React.CSSProperties,
  header: {
    marginBottom: spacing.xxxl,
    textAlign: 'center',
    paddingBottom: spacing.xl,
    borderBottom: `1px solid ${colors.border.primary}`,
  } as React.CSSProperties,
  title: {
    ...createHeaderStyle('h1'),
    marginBottom: spacing.sm,
  } as React.CSSProperties,
  subtitle: {
    ...createSubtitleStyle(),
    lineHeight: '1.5',
    maxWidth: '600px',
    margin: '0 auto',
  } as React.CSSProperties,
  category: {
    marginBottom: spacing.xxxl,
  } as React.CSSProperties,
  categoryHeader: {
    marginBottom: spacing.lg,
  } as React.CSSProperties,
  categoryTitle: {
    ...createHeaderStyle('h2'),
    color: colors.accent.light,
    marginBottom: spacing.xs,
  } as React.CSSProperties,
  categoryDescription: {
    ...createSubtitleStyle(),
  } as React.CSSProperties,
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: spacing.lg,
  } as React.CSSProperties,
  card: {
    display: 'flex',
    flexDirection: 'column',
    padding: spacing.xl,
    backgroundColor: colors.bg.subtle,
    borderRadius: effects.borderRadius.lg,
    border: `1px solid ${colors.border.primary}`,
    transition: effects.transition.slow,
    cursor: 'pointer',
  } as React.CSSProperties,
  cardIcon: {
    fontSize: '48px',
    marginBottom: spacing.md,
    textAlign: 'center',
  } as React.CSSProperties,
  cardContent: {
    flex: 1,
    marginBottom: spacing.lg,
  } as React.CSSProperties,
  presetName: {
    ...typography.h2,
    color: colors.text.primary,
    textAlign: 'center',
    margin: `0 0 ${spacing.sm} 0`,
  } as React.CSSProperties,
  description: {
    ...typography.caption,
    color: colors.text.muted,
    lineHeight: '1.5',
    textAlign: 'center',
    minHeight: '54px',
  } as React.CSSProperties,
  loadButton: {
    width: '100%',
    padding: `${spacing.md} ${spacing.lg}`,
    backgroundColor: colors.accent.primary,
    color: '#ffffff',
    border: 'none',
    borderRadius: effects.borderRadius.md,
    ...typography.body,
    fontWeight: 600,
    cursor: 'pointer',
    transition: effects.transition.normal,
  } as React.CSSProperties,
  infoBox: {
    marginTop: spacing.xxxl,
    padding: spacing.xl,
    backgroundColor: colors.bg.subtle,
    borderRadius: effects.borderRadius.lg,
    border: `1px solid ${colors.border.primary}`,
  } as React.CSSProperties,
  infoTitle: {
    ...createHeaderStyle('h3'),
    color: colors.accent.light,
    marginBottom: spacing.md,
  } as React.CSSProperties,
  infoText: {
    ...typography.caption,
    color: colors.text.secondary,
    lineHeight: '1.6',
    margin: 0,
  } as React.CSSProperties,
};
