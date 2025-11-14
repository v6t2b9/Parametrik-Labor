import { useSimulationStore, resolveSpeciesParams } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';
import { speciesPresets } from '../presets/tabPresets';
import type { AgentType } from '../types';

export function SemioticOikosPanel() {
  const { parameters, updateSemioticParams, ui } = useSimulationStore();

  // Get current values based on active scope
  const currentValues = ui.activeSpeciesScope === 'universal'
    ? parameters.universal.semiotic
    : resolveSpeciesParams(parameters, ui.activeSpeciesScope as AgentType).semiotic;

  // Check if current param has species override
  const hasOverride = (param: keyof typeof currentValues) => {
    if (ui.activeSpeciesScope === 'universal') return false;
    const speciesOverride = parameters.species[ui.activeSpeciesScope as AgentType].semiotic;
    return speciesOverride !== undefined && param in speciesOverride;
  };

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
        value={currentValues.sensorDist}
        min={3}
        max={80}
        step={1}
        onChange={(value) => updateSemioticParams({ sensorDist: value })}
        description="Perceptual range. Large → network formation, separation"
        hasOverride={hasOverride('sensorDist')}
      />

      <ParameterSlider
        label="Sensor Angle"
        value={currentValues.sensorAngle}
        min={0.1}
        max={2.5}
        step={0.05}
        onChange={(value) => updateSemioticParams({ sensorAngle: value })}
        description="Field of view (radians). Wide → chaotic, fluid movement"
        hasOverride={hasOverride('sensorAngle')}
      />

      <ParameterSlider
        label="Deposit Amount"
        value={currentValues.deposit}
        min={1}
        max={50}
        step={1}
        onChange={(value) => updateSemioticParams({ deposit: value })}
        description="Trace intensity per step. High → dense, stable structures"
        hasOverride={hasOverride('deposit')}
      />

      <ParameterSlider
        label="Turn Speed"
        value={currentValues.turnSpeed}
        min={0.05}
        max={2.5}
        step={0.05}
        onChange={(value) => updateSemioticParams({ turnSpeed: value })}
        description="Response agility (radians). High → erratic, fluid motion"
        hasOverride={hasOverride('turnSpeed')}
      />
    </div>
  );
}

const styles = {
  panel: {
    padding: '16px',
    backgroundColor: '#13141f',
    borderRadius: '6px',
    border: '1px solid #2a2b3a',
  } as React.CSSProperties,
  title: {
    fontSize: '16px',
    color: '#e0e0e0',
    marginBottom: '4px',
    fontWeight: 600,
  } as React.CSSProperties,
  subtitle: {
    fontSize: '11px',
    color: '#a0a0b0',
    marginBottom: '16px',
  } as React.CSSProperties,
  presetSection: {
    marginBottom: '16px',
  } as React.CSSProperties,
  presetTitle: {
    fontSize: '13px',
    color: '#a0a0b0',
    marginBottom: '10px',
    fontWeight: 600,
  } as React.CSSProperties,
  presetGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
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
    minHeight: '60px',
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
    marginBottom: '16px',
  } as React.CSSProperties,
};
