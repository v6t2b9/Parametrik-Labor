import { memo } from 'react';
import { colors, spacing, effects } from '../../design-system';
import type { CurveType } from '../../types/musicMappings';

interface CurveSelectorProps {
  label?: string;
  value: CurveType;
  onChange: (value: CurveType) => void;
}

/**
 * Dropdown selector for curve types
 * Used in audio mapping configurations
 */
export const CurveSelector = memo(function CurveSelector({
  label = 'Curve Type:',
  value,
  onChange,
}: CurveSelectorProps) {
  return (
    <div style={styles.container}>
      <label style={styles.label}>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as CurveType)}
        style={styles.dropdown}
        aria-label={label}
      >
        <option value="linear">Linear</option>
        <option value="exponential">Exponential</option>
        <option value="logarithmic">Logarithmic</option>
        <option value="sigmoid">Sigmoid</option>
      </select>
    </div>
  );
});

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  } as React.CSSProperties,
  label: {
    fontSize: '11px',
    color: colors.text.secondary,
    fontWeight: 500,
  } as React.CSSProperties,
  dropdown: {
    flex: 1,
    padding: `${spacing.xs} ${spacing.sm}`,
    backgroundColor: colors.bg.subtle,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: effects.borderRadius.sm,
    color: colors.text.primary,
    fontSize: '11px',
    cursor: 'pointer',
    transition: effects.transition.normal,
  } as React.CSSProperties,
};
