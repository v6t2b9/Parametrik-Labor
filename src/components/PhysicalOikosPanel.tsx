import { useSimulationStore, resolveSpeciesParams } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';
import { physicsPresets } from '../presets/tabPresets';
import type { AgentType } from '../types';
import { colors, spacing, typography, effects, createHeaderStyle, createSubtitleStyle } from '../design-system';

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
      <h3 style={styles.title}>Physical Oikos</h3>
      <p style={styles.subtitle}>Trace materiality and environmental dynamics</p>

      {/* Physics Presets Section */}
      <div style={styles.presetSection}>
        <h4 style={styles.presetTitle}>Physics Presets</h4>
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
    padding: spacing.lg,
    backgroundColor: colors.bg.secondary,
    borderRadius: effects.borderRadius.md,
    border: `1px solid ${colors.border.primary}`,
  } as React.CSSProperties,
  title: {
    ...createHeaderStyle('h2'),
    marginBottom: spacing.xs,
  } as React.CSSProperties,
  subtitle: {
    ...createSubtitleStyle(),
    marginBottom: spacing.lg,
  } as React.CSSProperties,
  presetSection: {
    marginBottom: spacing.lg,
  } as React.CSSProperties,
  presetTitle: {
    ...createHeaderStyle('h3'),
    marginBottom: spacing.sm,
  } as React.CSSProperties,
  presetDescription: {
    ...typography.caption,
    color: colors.text.secondary,
    marginBottom: spacing.md,
    lineHeight: 1.4,
  } as React.CSSProperties,
  presetGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
    gap: spacing.sm,
  } as React.CSSProperties,
  presetButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${spacing.sm} ${spacing.sm}`,
    backgroundColor: colors.bg.subtle,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: effects.borderRadius.md,
    cursor: 'pointer',
    transition: effects.transition.normal,
    ...typography.caption,
    color: colors.text.primary,
    minHeight: '60px', // Touch-friendly
  } as React.CSSProperties,
  presetIcon: {
    fontSize: '20px',
    marginBottom: spacing.xs,
  } as React.CSSProperties,
  presetName: {
    ...typography.caption,
    textAlign: 'center',
  } as React.CSSProperties,
  divider: {
    height: '1px',
    backgroundColor: colors.border.primary,
    marginBottom: spacing.lg,
  } as React.CSSProperties,
};
