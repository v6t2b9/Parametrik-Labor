import { useSimulationStore } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';
import { speciesPresets } from '../presets/tabPresets';

export function SemioticOikosPanel() {
  const { parameters, updateSemioticParams } = useSimulationStore();
  const { semiotic } = parameters;

  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>🔣 Semiotic Oikos</h3>
      <p style={styles.subtitle}>Perception-action coupling and sign production</p>

      {/* Species Presets Section */}
      <div style={styles.presetSection}>
        <h4 style={styles.presetTitle}>Spezies Presets</h4>
        <div style={styles.presetGrid}>
          {speciesPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => updateSemioticParams(preset.params)}
              style={styles.presetButton}
              title={preset.description}
            >
              <span style={styles.presetIcon}>{preset.icon}</span>
              <span style={styles.presetName}>{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={styles.divider} />

      <ParameterSlider
        label="Sensor Distance"
        value={semiotic.sensorDist}
        min={3}
        max={80}
        step={1}
        onChange={(value) => updateSemioticParams({ sensorDist: value })}
        description="Perceptual range. Large → network formation, separation"
      />

      <ParameterSlider
        label="Sensor Angle"
        value={semiotic.sensorAngle}
        min={0.1}
        max={2.5}
        step={0.05}
        onChange={(value) => updateSemioticParams({ sensorAngle: value })}
        description="Field of view (radians). Wide → chaotic, fluid movement"
      />

      <ParameterSlider
        label="Deposit Amount"
        value={semiotic.deposit}
        min={1}
        max={50}
        step={1}
        onChange={(value) => updateSemioticParams({ deposit: value })}
        description="Trace intensity per step. High → dense, stable structures"
      />

      <ParameterSlider
        label="Turn Speed"
        value={semiotic.turnSpeed}
        min={0.05}
        max={2.5}
        step={0.05}
        onChange={(value) => updateSemioticParams({ turnSpeed: value })}
        description="Response agility (radians). High → erratic, fluid motion"
      />
    </div>
  );
}

const styles = {
  panel: {
    padding: '20px',
    backgroundColor: '#13141f',
    borderRadius: '8px',
    border: '1px solid #2a2b3a',
  } as React.CSSProperties,
  title: {
    fontSize: '18px',
    color: '#e0e0e0',
    marginBottom: '4px',
    fontWeight: 600,
  } as React.CSSProperties,
  subtitle: {
    fontSize: '12px',
    color: '#a0a0b0',
    marginBottom: '20px',
  } as React.CSSProperties,
  presetSection: {
    marginBottom: '20px',
  } as React.CSSProperties,
  presetTitle: {
    fontSize: '14px',
    color: '#a0a0b0',
    marginBottom: '12px',
    fontWeight: 600,
  } as React.CSSProperties,
  presetGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px',
  } as React.CSSProperties,
  presetButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px 8px',
    backgroundColor: '#0a0a15',
    border: '1px solid #2a2b3a',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontSize: '11px',
    color: '#e0e0e0',
  } as React.CSSProperties,
  presetIcon: {
    fontSize: '20px',
    marginBottom: '4px',
  } as React.CSSProperties,
  presetName: {
    fontSize: '10px',
    textAlign: 'center',
  } as React.CSSProperties,
  divider: {
    height: '1px',
    backgroundColor: '#2a2b3a',
    marginBottom: '20px',
  } as React.CSSProperties,
};
