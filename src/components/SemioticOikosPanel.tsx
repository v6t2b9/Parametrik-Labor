import { useSimulationStore, resolveSpeciesParams } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';
import { speciesPresets } from '../presets/tabPresets';
import type { AgentType } from '../types';
import { colors, spacing, typography, effects, createHeaderStyle, createSubtitleStyle } from '../design-system';

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
      <h3 style={styles.title}>Semiotic Oikos</h3>
      <p style={styles.subtitle}>Perception-action coupling and sign production</p>

      {/* Species Presets Section */}
      <div style={styles.presetSection}>
        <h4 style={styles.presetTitle}>Species Presets</h4>
        <p style={styles.presetDescription}>Quick configurations for different agent behaviors</p>
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
        description="Perceptual range · Large = network formation · Sweetspot: 15-30"
        hasOverride={hasOverride('sensorDist')}
      />

      <ParameterSlider
        label="Sensor Angle"
        value={currentValues.sensorAngle}
        min={0.1}
        max={2.5}
        step={0.05}
        onChange={(value) => updateSemioticParams({ sensorAngle: value })}
        description="Field of view in radians · Wide = chaotic fluid motion · Range: 0.1-2.5"
        hasOverride={hasOverride('sensorAngle')}
      />

      <ParameterSlider
        label="Deposit Amount"
        value={currentValues.deposit}
        min={1}
        max={50}
        step={1}
        onChange={(value) => updateSemioticParams({ deposit: value })}
        description="Trace intensity per step · High = dense stable structures · Range: 1-50"
        hasOverride={hasOverride('deposit')}
      />

      <ParameterSlider
        label="Turn Speed"
        value={currentValues.turnSpeed}
        min={0.05}
        max={2.5}
        step={0.05}
        onChange={(value) => updateSemioticParams({ turnSpeed: value })}
        description="Response agility in radians · High = erratic fluid motion · Range: 0.05-2.5"
        hasOverride={hasOverride('turnSpeed')}
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
