import { useSimulationStore } from '../store/useSimulationStore';
import { builtInPresets, masterPresets } from '../presets';
import { useState, useRef } from 'react';
import { colors, spacing, typography, effects, createHeaderStyle } from '../design-system';

// Preset category type
interface PresetCategory {
  title: string;
  description?: string;
  presets: string[];
}

// Categorize presets by their pattern formation characteristics
const presetCategories: Record<string, PresetCategory> = {
  master: {
    title: '🌟 Master Experiences (Complete Presets)',
    description: 'Spectacular combinations of all parameters - perfect starting points!',
    presets: ['Cosmic Meditation', 'Liquid Rainbow', 'Infinite Tunnel', 'Crystal Palace', 'Electric Storm', 'Deep Ocean', 'Sacred Geometry', 'Retro Arcade'],
  },
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
  const loadPreset = useSimulationStore((state) => state.loadPreset);
  const exportCurrentPreset = useSimulationStore((state) => state.exportCurrentPreset);
  const importPresetFromFile = useSimulationStore((state) => state.importPresetFromFile);
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
    if (!file) {
      console.log('[PresetGallery] No file selected');
      return;
    }

    console.log('[PresetGallery] Starting import of file:', file.name);
    const result = await importPresetFromFile(file);
    console.log('[PresetGallery] Import result:', result);

    if (result.success) {
      setImportStatus({ type: 'success', message: 'Preset successfully loaded!' });
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
        // Master presets come from masterPresets array, others from builtInPresets
        const categoryPresets = categoryKey === 'master'
          ? masterPresets.filter(p => category.presets.includes(p.name))
          : builtInPresets.filter(p => category.presets.includes(p.name));

        return (
          <div key={categoryKey} style={styles.category}>
            <h4 style={styles.categoryTitle}>{category.title}</h4>
            {category.description && (
              <p style={styles.categoryDescription}>{category.description}</p>
            )}
            <div style={styles.grid}>
              {categoryPresets.map((preset) => {
                // Master presets use 'params', built-in presets use 'parameters'
                const presetParams = 'params' in preset ? preset.params : preset.parameters;
                return (
                  <div key={preset.name} style={styles.card}>
                    <div style={styles.cardIcon}>{preset.icon}</div>
                    <h5 style={styles.presetName}>{preset.name}</h5>
                    <p style={styles.presetDescription}>{preset.description}</p>
                    <button
                      onClick={() => loadPreset(presetParams)}
                      style={styles.loadButton}
                    >
                      Load
                    </button>
                  </div>
                );
              })}
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
    position: 'relative',
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
    marginBottom: spacing.sm,
  } as React.CSSProperties,
  categoryDescription: {
    ...typography.caption,
    color: colors.text.muted,
    marginBottom: spacing.lg,
    fontStyle: 'italic',
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
    fontWeight: 600,
  } as React.CSSProperties,
  presetDescription: {
    ...typography.caption,
    color: colors.text.muted,
    textAlign: 'center',
    margin: `${spacing.xs} 0`,
    fontSize: '10px',
    lineHeight: '1.3',
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
