import { memo } from 'react';
import { colors, spacing, typography, effects } from '../design-system';

interface ParameterSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  description?: string;
  hasOverride?: boolean; // Indicator for species-specific override
  disabled?: boolean; // Disable slider interaction
}

// OPTIMIZED: React.memo prevents re-renders when props haven't changed
// Custom comparison ignores onChange function reference changes (shallow comparison for other props)
const ParameterSliderComponent = (props: ParameterSliderProps) => {
  const {
    label,
    value,
    min,
    max,
    step,
    onChange,
    description,
    hasOverride,
    disabled,
  } = props;

  const hasOverrideValue = hasOverride ?? false;
  const disabledValue = disabled ?? false;
  return (
    <div style={{ ...styles.container, ...(disabledValue ? styles.containerDisabled : {}) }}>
      <div style={styles.labelRow}>
        <div style={styles.labelGroup}>
          <label style={{ ...styles.label, ...(disabledValue ? styles.labelDisabled : {}) }}>{label}</label>
          {hasOverrideValue && (
            <span style={styles.overrideBadge} title="Species-specific override active">
              ●
            </span>
          )}
        </div>
        <span style={{ ...styles.value, ...(disabledValue ? styles.valueDisabled : {}) }}>{value.toFixed(3)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={styles.slider}
        disabled={disabledValue}
      />
      {description && <p style={{ ...styles.description, ...(disabledValue ? styles.descriptionDisabled : {}) }}>{description}</p>}
    </div>
  );
};

// Custom comparison: only re-render if value/label/min/max/step/hasOverride/disabled change
// Ignore onChange function reference changes (typical in React - callbacks change but logic doesn't)
function areEqual(prevProps: ParameterSliderProps, nextProps: ParameterSliderProps) {
  return (
    prevProps.value === nextProps.value &&
    prevProps.label === nextProps.label &&
    prevProps.min === nextProps.min &&
    prevProps.max === nextProps.max &&
    prevProps.step === nextProps.step &&
    prevProps.description === nextProps.description &&
    prevProps.hasOverride === nextProps.hasOverride &&
    prevProps.disabled === nextProps.disabled
    // onChange intentionally not compared - function reference changes don't matter
  );
}

export const ParameterSlider = memo(ParameterSliderComponent, areEqual);

const styles = {
  container: {
    marginBottom: spacing.xl,
  } as React.CSSProperties,
  labelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  } as React.CSSProperties,
  labelGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
  } as React.CSSProperties,
  label: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: 600,
  } as React.CSSProperties,
  overrideBadge: {
    ...typography.caption,
    color: colors.accent.primary,
    opacity: 0.7,
  } as React.CSSProperties,
  value: {
    ...typography.body,
    color: colors.accent.primary,
    fontFamily: 'monospace',
    fontWeight: 600,
  } as React.CSSProperties,
  slider: {
    width: '100%',
    height: '8px',
    borderRadius: effects.borderRadius.sm,
    outline: 'none',
    background: colors.border.primary,
    cursor: 'pointer',
    WebkitAppearance: 'none',
    appearance: 'none',
    transition: effects.transition.normal,
  } as React.CSSProperties,
  description: {
    ...typography.caption,
    color: colors.text.muted,
    marginTop: spacing.sm,
    lineHeight: '1.5',
  } as React.CSSProperties,
  containerDisabled: {
    opacity: 0.5,
    pointerEvents: 'none',
  } as React.CSSProperties,
  labelDisabled: {
    color: '#808080',
  } as React.CSSProperties,
  valueDisabled: {
    color: '#606060',
  } as React.CSSProperties,
  descriptionDisabled: {
    color: '#505050',
  } as React.CSSProperties,
};
