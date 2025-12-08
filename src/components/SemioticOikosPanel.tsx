import { useMemo, useCallback, memo } from 'react';
import { useSimulationStore, resolveSpeciesParams } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';
import { speciesPresets } from '../presets/tabPresets';
import type { AgentType } from '../types';
import { colors, spacing, effects, createHeaderStyle, createSubtitleStyle } from '../design-system';
import { PresetGrid, type Preset } from './ui/PresetGrid';
import { Divider } from './ui/Divider';

export const SemioticOikosPanel = memo(function SemioticOikosPanel() {
  const parameters = useSimulationStore((state) => state.parameters);
  const updateSemioticParams = useSimulationStore((state) => state.updateSemioticParams);
  const ui = useSimulationStore((state) => state.ui);

  // Get current values based on active scope
  const currentValues = useMemo(
    () => ui.activeSpeciesScope === 'universal'
      ? parameters.universal.semiotic
      : resolveSpeciesParams(parameters, ui.activeSpeciesScope as AgentType).semiotic,
    [ui.activeSpeciesScope, parameters]
  );

  // Check if current param has species override
  const hasOverride = useCallback((param: keyof typeof currentValues) => {
    if (ui.activeSpeciesScope === 'universal') return false;
    const speciesOverride = parameters.species[ui.activeSpeciesScope as AgentType].semiotic;
    return speciesOverride !== undefined && param in speciesOverride;
  }, [ui.activeSpeciesScope, parameters.species]);

  // Convert speciesPresets to PresetGrid format
  const presets: Preset<typeof currentValues>[] = speciesPresets.map((preset) => ({
    name: preset.name,
    icon: preset.icon,
    description: preset.description,
    params: preset.params,
  }));

  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>Behavior</h3>
      <p style={styles.subtitle}>Agent sensing and movement parameters</p>

      {/* Species Presets */}
      <PresetGrid presets={presets} onSelect={updateSemioticParams} title="Presets" />

      <Divider />

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
});

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
};
