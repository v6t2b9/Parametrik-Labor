import { useSimulationStore, resolveSpeciesParams } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';
import { temporalPresets } from '../presets/tabPresets';
import type { AgentType } from '../types';

export function TemporalOikosPanel() {
  const { parameters, updateTemporalParams, updateGlobalTemporalParams, ui } = useSimulationStore();

  // Get current values based on active scope
  const currentValues = ui.activeSpeciesScope === 'universal'
    ? parameters.universal.temporal
    : resolveSpeciesParams(parameters, ui.activeSpeciesScope as AgentType).temporal;

  const globalValues = parameters.globalTemporal;

  const hasOverride = (param: keyof typeof currentValues) => {
    if (ui.activeSpeciesScope === 'universal') return false;
    const speciesOverride = parameters.species[ui.activeSpeciesScope as AgentType].temporal;
    return speciesOverride !== undefined && param in speciesOverride;
  };

  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>⏱️ Temporal Oikos</h3>
      <p style={styles.subtitle}>Time-dependent dynamics and rhythm</p>

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

      {ui.activeSpeciesScope === 'universal' && (
        <>
          <div style={styles.sectionHeader}>Global Parameters</div>
          <ParameterSlider
            label="Agent Count"
            value={globalValues.agentCount}
            min={500}
            max={10000}
            step={100}
            onChange={(value) => updateGlobalTemporalParams({ agentCount: value })}
            description="Total population density"
          />
          <ParameterSlider
            label="Simulation Speed"
            value={globalValues.simulationSpeed}
            min={0.1}
            max={5.0}
            step={0.1}
            onChange={(value) => updateGlobalTemporalParams({ simulationSpeed: value })}
            description="Global time scale multiplier"
          />
          <div style={styles.divider} />
          <div style={styles.sectionHeader}>Species-Specific Parameters</div>
        </>
      )}

      <ParameterSlider
        label="Speed"
        value={currentValues.speed}
        min={0.5}
        max={3.0}
        step={0.1}
        onChange={(value) => updateTemporalParams({ speed: value })}
        description="Movement rate"
        hasOverride={hasOverride('speed')}
      />

      <ParameterSlider
        label="Chaos Interval"
        value={currentValues.chaosInterval}
        min={0}
        max={500}
        step={10}
        onChange={(value) => updateTemporalParams({ chaosInterval: value })}
        description="Periodic destabilization (0 = off)"
        hasOverride={hasOverride('chaosInterval')}
      />

      <ParameterSlider
        label="Chaos Strength"
        value={currentValues.chaosStrength}
        min={0.1}
        max={1.0}
        step={0.05}
        onChange={(value) => updateTemporalParams({ chaosStrength: value })}
        description="Perturbation intensity"
        hasOverride={hasOverride('chaosStrength')}
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
    margin: '16px 0',
  } as React.CSSProperties,
  sectionHeader: {
    fontSize: '13px',
    color: '#7d5dbd',
    fontWeight: 600,
    marginBottom: '12px',
  } as React.CSSProperties,
};
