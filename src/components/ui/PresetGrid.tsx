import { memo } from 'react';
import { colors, spacing, typography, effects } from '../../design-system';

export interface Preset<T> {
  name: string;
  icon: string;
  description: string;
  params: T;
}

interface PresetGridProps<T> {
  presets: Preset<T>[];
  onSelect: (params: T) => void;
  title?: string;
}

/**
 * Reusable preset grid component
 * Displays presets in a responsive grid with icons
 */
function PresetGridComponent<T>({ presets, onSelect, title }: PresetGridProps<T>) {
  return (
    <div style={styles.container}>
      {title && <h5 style={styles.title}>{title}</h5>}
      <div style={styles.grid}>
        {presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => onSelect(preset.params)}
            style={styles.button}
            title={preset.description}
            aria-label={`Apply ${preset.name} preset: ${preset.description}`}
          >
            <span style={styles.icon}>{preset.icon}</span>
            <span style={styles.name}>{preset.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Cast to support generics with memo
export const PresetGrid = memo(PresetGridComponent) as typeof PresetGridComponent;

const styles = {
  container: {
    marginBottom: spacing.lg,
  } as React.CSSProperties,
  title: {
    fontSize: '13px',
    color: colors.text.secondary,
    marginBottom: spacing.md,
    fontWeight: 600,
    margin: `0 0 ${spacing.md} 0`,
  } as React.CSSProperties,
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
    gap: spacing.sm,
  } as React.CSSProperties,
  button: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${spacing.sm} ${spacing.sm}`,
    backgroundColor: colors.bg.subtle,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: effects.borderRadius.md,
    cursor: 'pointer',
    transition: effects.transition.normal,
    ...typography.caption,
    color: colors.text.primary,
    minHeight: '60px',
  } as React.CSSProperties,
  icon: {
    fontSize: '24px',
    marginBottom: spacing.xs,
  } as React.CSSProperties,
  name: {
    fontSize: '9px',
    textAlign: 'center',
    lineHeight: '1.2',
  } as React.CSSProperties,
};
