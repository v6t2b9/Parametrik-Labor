import { useSimulationStore, resolveSpeciesParams } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';
import { physicsPresets } from '../presets/tabPresets';
import type { AgentType } from '../types';

export function PhysicalOikosPanel() {
  const { parameters, updatePhysicalParams, ui } = useSimulationStore();

  // Get current values based on active scope
  const currentValues = ui.activeSpeciesScope === 'universal'
    ? parameters.universal.physical
    : resolveSpeciesParams(parameters, ui.activeSpeciesScope as AgentType).physical;

  // Check if current param has species override
  const hasOverride = (param: keyof typeof currentValues) => {
    if (ui.activeSpeciesScope === 'universal') return false;
    const speciesOverride = parameters.species[ui.activeSpeciesScope as AgentType].physical;
    return speciesOverride !== undefined && param in speciesOverride;
  };

  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>🌊 Physical Oikos</h3>
      <p style={styles.subtitle}>Trace materiality and environmental dynamics</p>

      {/* Physics Presets Section */}
      <div style={styles.presetSection}>
        <h4 style={styles.presetTitle}>📦 Physics Presets</h4>
        <p style={styles.presetDescription}>Quick configurations for different physical behaviors</p>
        <div style={styles.presetGrid}>
          {physicsPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => updatePhysicalParams(preset.params)}
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
        label="Decay Rate"
        value={currentValues.decayRate}
        min={0.5}
        max={0.999}
        step={0.001}
        onChange={(value) => updatePhysicalParams({ decayRate: value })}
        description="Trail persistence · High = long memory & stable structures · Sweetspot: 0.95-0.99"
        hasOverride={hasOverride('decayRate')}
      />

      <ParameterSlider
        label="Diffusion Frequency"
        value={currentValues.diffusionFreq}
        min={1}
        max={10}
        step={1}
        onChange={(value) => updatePhysicalParams({ diffusionFreq: value })}
        description="Blur interval in frames · Low = fast smoothing, High = crisp trails · Range: 1-10"
        hasOverride={hasOverride('diffusionFreq')}
      />

      <ParameterSlider
        label="Fade Strength"
        value={currentValues.fadeStrength}
        min={0.01}
        max={0.5}
        step={0.01}
        onChange={(value) => updatePhysicalParams({ fadeStrength: value })}
        description="Forgetting acceleration · High = rapid decay & chaos · Sweetspot: 0.05-0.15"
        hasOverride={hasOverride('fadeStrength')}
      />

      <ParameterSlider
        label="Trail Saturation"
        value={currentValues.trailSaturation}
        min={50}
        max={255}
        step={5}
        onChange={(value) => updatePhysicalParams({ trailSaturation: value })}
        description="Maximum trail intensity · Affects glow brightness · Range: 50-255"
        hasOverride={hasOverride('trailSaturation')}
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
    color: '#e0e0e0',
    marginBottom: '6px',
    fontWeight: 600,
  } as React.CSSProperties,
  presetDescription: {
    fontSize: '10px',
    color: '#a0a0b0',
    marginBottom: '10px',
    lineHeight: 1.4,
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
    minHeight: '60px', // Touch-friendly
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
