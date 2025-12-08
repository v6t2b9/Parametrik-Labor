import { useMemo, useCallback, memo } from 'react';
import { useSimulationStore, resolveSpeciesParams } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';
import { physicsPresets } from '../presets/tabPresets';
import type { AgentType } from '../types';
import { colors, spacing, effects, createHeaderStyle, createSubtitleStyle } from '../design-system';
import { PresetGrid, type Preset } from './ui/PresetGrid';
import { Divider } from './ui/Divider';

export const PhysicalOikosPanel = memo(function PhysicalOikosPanel() {
  const parameters = useSimulationStore((state) => state.parameters);
  const updatePhysicalParams = useSimulationStore((state) => state.updatePhysicalParams);
  const ui = useSimulationStore((state) => state.ui);

  // Get current values based on active scope
  const currentValues = useMemo(
    () => ui.activeSpeciesScope === 'universal'
      ? parameters.universal.physical
      : resolveSpeciesParams(parameters, ui.activeSpeciesScope as AgentType).physical,
    [ui.activeSpeciesScope, parameters]
  );

  // Check if current param has species override
  const hasOverride = useCallback((param: keyof typeof currentValues) => {
    if (ui.activeSpeciesScope === 'universal') return false;
    const speciesOverride = parameters.species[ui.activeSpeciesScope as AgentType].physical;
    return speciesOverride !== undefined && param in speciesOverride;
  }, [ui.activeSpeciesScope, parameters.species]);

  // Convert physicsPresets to PresetGrid format
  const presets: Preset<typeof currentValues>[] = physicsPresets.map((preset) => ({
    name: preset.name,
    icon: preset.icon,
    description: preset.description,
    params: preset.params,
  }));

  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>Physics</h3>
      <p style={styles.subtitle}>Trail decay and diffusion settings</p>

      {/* Physics Presets */}
      <PresetGrid presets={presets} onSelect={updatePhysicalParams} title="Presets" />

      <Divider />

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
