import { useSimulationStore } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';
import { temporalPresets } from '../presets/tabPresets';

export function TemporalOikosPanel() {
  const { parameters, updateTemporalParams } = useSimulationStore();
  const { temporal } = parameters;

  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>⏱️ Temporal Oikos</h3>
      <p style={styles.subtitle}>Dynamics and temporal structuring</p>

      {/* Temporal Presets Section */}
      <div style={styles.presetSection}>
        <h4 style={styles.presetTitle}>Temporal Presets</h4>
        <div style={styles.presetGrid}>
          {temporalPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => updateTemporalParams(preset.params)}
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
        label="Agent Speed"
        value={temporal.speed}
        min={0.1}
        max={6.0}
        step={0.1}
        onChange={(value) => updateTemporalParams({ speed: value })}
        description="Movement rate. High → chaotic, fluid patterns"
      />

      <ParameterSlider
        label="Agent Count"
        value={temporal.agentCount}
        min={100}
        max={15000}
        step={100}
        onChange={(value) => updateTemporalParams({ agentCount: value })}
        description="Interaction density. High → clustering, dense trails"
      />

      <ParameterSlider
        label="Chaos Interval"
        value={temporal.chaosInterval}
        min={0}
        max={1000}
        step={10}
        onChange={(value) => updateTemporalParams({ chaosInterval: value })}
        description="Periodic disruption frequency (0 = off)"
      />

      <ParameterSlider
        label="Chaos Strength"
        value={temporal.chaosStrength}
        min={0.0}
        max={2.0}
        step={0.05}
        onChange={(value) => updateTemporalParams({ chaosStrength: value })}
        description="Perturbation intensity during chaos injection"
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
