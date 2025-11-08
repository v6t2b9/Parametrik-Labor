interface ParameterSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  description?: string;
}

export function ParameterSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  description,
}: ParameterSliderProps) {
  return (
    <div style={styles.container}>
      <div style={styles.labelRow}>
        <label style={styles.label}>{label}</label>
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
  label: {
    fontSize: '14px',
    color: '#e0e0e0',
    fontWeight: 500,
  } as React.CSSProperties,
  value: {
    fontSize: '13px',
    color: '#7d5dbd',
    fontFamily: 'monospace',
    fontWeight: 600,
  } as React.CSSProperties,
  slider: {
    width: '100%',
    height: '6px',
    borderRadius: '3px',
    outline: 'none',
    background: '#13141f',
    cursor: 'pointer',
  } as React.CSSProperties,
  description: {
    fontSize: '11px',
    color: '#6a6a7a',
    marginTop: '4px',
    lineHeight: '1.4',
  } as React.CSSProperties,
};
