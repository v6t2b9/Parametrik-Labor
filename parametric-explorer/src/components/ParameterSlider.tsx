interface ParameterSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  description?: string;
  hasOverride?: boolean; // Indicator for species-specific override
}

export function ParameterSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  description,
  hasOverride = false,
}: ParameterSliderProps) {
  return (
    <div style={styles.container}>
      <div style={styles.labelRow}>
        <div style={styles.labelGroup}>
          <label style={styles.label}>{label}</label>
          {hasOverride && (
            <span style={styles.overrideBadge} title="Species-specific override active">
              ⚡
            </span>
          )}
        </div>
        <span style={styles.value}>{value.toFixed(3)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={styles.slider}
      />
      {description && <p style={styles.description}>{description}</p>}
    </div>
  );
}

const styles = {
  container: {
    marginBottom: '16px',
  } as React.CSSProperties,
  labelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '6px',
  } as React.CSSProperties,
  labelGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  } as React.CSSProperties,
  label: {
    fontSize: '14px',
    color: '#e0e0e0',
    fontWeight: 500,
  } as React.CSSProperties,
  overrideBadge: {
    fontSize: '12px',
    opacity: 0.7,
  } as React.CSSProperties,
  value: {
    fontSize: '13px',
    color: '#7d5dbd',
    fontFamily: 'monospace',
    fontWeight: 600,
  } as React.CSSProperties,
  slider: {
    width: '100%',
    height: '8px', // Slightly larger for mobile
    borderRadius: '4px',
    outline: 'none',
    background: '#13141f',
    cursor: 'pointer',
    WebkitAppearance: 'none', // Remove default styling
    appearance: 'none',
  } as React.CSSProperties,
  description: {
    fontSize: '11px',
    color: '#6a6a7a',
    marginTop: '4px',
    lineHeight: '1.4',
  } as React.CSSProperties,
};
