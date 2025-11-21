import { useSimulationStore } from '../store/useSimulationStore';
import { builtInPresets } from '../presets';
import { useState, useRef } from 'react';
import { colors, spacing, typography, effects, createHeaderStyle, createSubtitleStyle } from '../design-system';

// Categorize presets by their pattern formation characteristics
const presetCategories = {
  organic: {
    title: 'Organic & Flowing',
    presets: ['Plasma Dream', 'Aurora Sky', 'Lava Flow'],
  },
  energetic: {
    title: 'Energetic & Chaotic',
    presets: ['Neon Jungle', 'Electric Storm'],
  },
  stable: {
    title: 'Stable & Structured',
    presets: ['Crystal Cave'],
  },
  special: {
    title: 'Special Effects',
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
    setImportStatus({ type: 'success', message: `Exported "${presetName}"` });
    setTimeout(() => setImportStatus(null), 2000);
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const result = await importPresetFromFile(file);

    if (result.success) {
      setImportStatus({ type: 'success', message: 'Preset loaded' });
    } else {
      setImportStatus({ type: 'error', message: result.error || 'Load failed' });
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    setTimeout(() => setImportStatus(null), 3000);
  };

  return (
    <div style={styles.container}>
      {/* Import/Export Bar */}
      <div style={styles.toolbar}>
        <div style={styles.toolbarLeft}>
          <input
            type="text"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
            style={styles.input}
            placeholder="preset-name"
          />
          <button onClick={handleExport} style={styles.toolButton}>
            Export
          </button>
        </div>
        <div style={styles.toolbarRight}>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            style={styles.fileInput}
            id="preset-file-input"
          />
          <label htmlFor="preset-file-input" style={styles.toolButton}>
            Import
          </label>
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
            <h4 style={styles.categoryTitle}>{category.title}</h4>
            <div style={styles.grid}>
              {categoryPresets.map((preset) => (
                <div key={preset.name} style={styles.card}>
                  <div style={styles.cardIcon}>{preset.icon}</div>
                  <h5 style={styles.presetName}>{preset.name}</h5>
                  <button
                    onClick={() => loadPreset(preset.parameters)}
                    style={styles.loadButton}
                  >
                    Load
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  container: {
    padding: spacing.lg,
    backgroundColor: colors.bg.secondary,
    borderRadius: effects.borderRadius.md,
    border: `1px solid ${colors.border.primary}`,
  } as React.CSSProperties,
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.lg,
    padding: `${spacing.md} ${spacing.lg}`,
    marginBottom: spacing.xl,
    backgroundColor: colors.bg.subtle,
    borderRadius: effects.borderRadius.md,
    border: `1px solid ${colors.border.primary}`,
    flexWrap: 'wrap',
  } as React.CSSProperties,
  toolbarLeft: {
    display: 'flex',
    gap: spacing.sm,
    alignItems: 'center',
    flex: 1,
    minWidth: '200px',
  } as React.CSSProperties,
  toolbarRight: {
    display: 'flex',
    gap: spacing.sm,
  } as React.CSSProperties,
  input: {
    padding: `${spacing.sm} ${spacing.md}`,
    backgroundColor: colors.bg.secondary,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: effects.borderRadius.sm,
    color: colors.text.primary,
    ...typography.body,
    fontFamily: 'inherit',
    flex: 1,
    minWidth: '120px',
  } as React.CSSProperties,
  toolButton: {
    padding: `${spacing.sm} ${spacing.lg}`,
    backgroundColor: colors.border.primary,
    color: colors.text.primary,
    border: 'none',
    borderRadius: effects.borderRadius.sm,
    ...typography.body,
    fontWeight: 600,
    cursor: 'pointer',
    transition: effects.transition.normal,
    whiteSpace: 'nowrap',
  } as React.CSSProperties,
  fileInput: {
    display: 'none',
  } as React.CSSProperties,
  statusMessage: {
    position: 'absolute',
    top: '50%',
    right: spacing.lg,
    transform: 'translateY(-50%)',
    padding: `${spacing.xs} ${spacing.md}`,
    borderRadius: effects.borderRadius.sm,
    border: '1px solid',
    ...typography.caption,
    color: colors.text.primary,
  } as React.CSSProperties,
  category: {
    marginBottom: spacing.xxxl,
  } as React.CSSProperties,
  categoryTitle: {
    ...createHeaderStyle('h3'),
    color: colors.text.secondary,
    marginBottom: spacing.lg,
  } as React.CSSProperties,
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: spacing.md,
  } as React.CSSProperties,
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.bg.subtle,
    borderRadius: effects.borderRadius.md,
    border: `1px solid ${colors.border.primary}`,
    transition: effects.transition.normal,
    gap: spacing.sm,
  } as React.CSSProperties,
  cardIcon: {
    fontSize: '36px',
  } as React.CSSProperties,
  presetName: {
    ...typography.body,
    color: colors.text.primary,
    textAlign: 'center',
    margin: 0,
  } as React.CSSProperties,
  loadButton: {
    width: '100%',
    padding: `${spacing.sm} ${spacing.md}`,
    backgroundColor: colors.border.primary,
    color: colors.text.primary,
    border: 'none',
    borderRadius: effects.borderRadius.sm,
    ...typography.caption,
    fontWeight: 600,
    cursor: 'pointer',
    transition: effects.transition.normal,
  } as React.CSSProperties,
};
