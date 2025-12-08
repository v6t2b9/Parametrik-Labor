import { memo } from 'react';
import { colors, spacing, effects } from '../../design-system';

export interface ToggleOption<T> {
  value: T;
  label: string;
  description?: string;
  icon?: string;
}

interface ToggleGroupProps<T> {
  options: ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  columns?: number;
  label?: string;
  description?: string;
}

/**
 * Reusable toggle button group component
 * Supports any value type with generics
 */
function ToggleGroupComponent<T extends string | number>({
  options,
  value,
  onChange,
  columns = 2,
  label,
  description,
}: ToggleGroupProps<T>) {
  return (
    <div style={styles.container}>
      {label && <label style={styles.label}>{label}</label>}
      {description && <p style={styles.description}>{description}</p>}
      <div
        style={{
          ...styles.grid,
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
      >
        {options.map((option) => (
          <button
            key={String(option.value)}
            onClick={() => onChange(option.value)}
            style={{
              ...styles.button,
              ...(value === option.value ? styles.buttonActive : {}),
            }}
            title={option.description}
            aria-pressed={value === option.value}
          >
            {option.icon && <span style={styles.icon}>{option.icon}</span>}
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Need to manually cast to support generic memo
export const ToggleGroup = memo(ToggleGroupComponent) as typeof ToggleGroupComponent;

const styles = {
  container: {
    marginTop: spacing.md,
  } as React.CSSProperties,
  label: {
    fontSize: '13px',
    color: colors.text.primary,
    fontWeight: 500,
    marginBottom: spacing.sm,
    display: 'block',
  } as React.CSSProperties,
  description: {
    fontSize: '11px',
    color: colors.text.muted,
    marginBottom: spacing.md,
    lineHeight: '1.3',
    margin: `0 0 ${spacing.md} 0`,
  } as React.CSSProperties,
  grid: {
    display: 'grid',
    gap: spacing.sm,
  } as React.CSSProperties,
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    padding: spacing.md,
    backgroundColor: '#1a1a2d',
    border: '2px solid #2a2b3a',
    borderRadius: effects.borderRadius.lg,
    cursor: 'pointer',
    transition: effects.transition.normal,
    fontWeight: 600,
    fontSize: '12px',
    color: colors.text.primary,
  } as React.CSSProperties,
  buttonActive: {
    backgroundColor: '#7d5dbd',
    borderColor: '#9d7dd4',
  } as React.CSSProperties,
  icon: {
    fontSize: '14px',
  } as React.CSSProperties,
};
