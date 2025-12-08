import { memo } from 'react';
import { useSimulationStore } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';
import { effectsPresets } from '../presets/tabPresets';
import { colors, spacing, createHeaderStyle } from '../design-system';
import { Section } from './ui/Section';
import { PresetGrid, type Preset } from './ui/PresetGrid';
import { InfoBox } from './ui/InfoBox';

export const EffectsOikosPanel = memo(function EffectsOikosPanel() {
  const effectsParams = useSimulationStore((state) => state.parameters.effects);
  const updateEffectsParams = useSimulationStore((state) => state.updateEffectsParams);

  // Convert effectsPresets to PresetGrid format
  const presets: Preset<typeof effectsParams>[] = effectsPresets.map((preset) => ({
    name: preset.name,
    icon: preset.icon,
    description: preset.description,
    params: preset.params,
  }));

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Effects</h3>
      <p style={styles.description}>Post-processing effects stack</p>

      {/* Presets */}
      <PresetGrid presets={presets} onSelect={updateEffectsParams} title="Presets" />

      {/* Layer 1: Base Effects */}
      <Section
        title="Layer 1: Color Grading (Base)"
        description="Foundation color adjustments applied to the base image"
      >
        <ParameterSlider
          label="Saturation"
          value={effectsParams.saturation}
          min={0}
          max={3}
          step={0.1}
          onChange={(value) => updateEffectsParams({ saturation: value })}
          description="Color saturation (1 = normal, <1 = desaturated, >1 = vivid)"
        />
        <ParameterSlider
          label="Contrast"
          value={effectsParams.contrast}
          min={0}
          max={3}
          step={0.05}
          onChange={(value) => updateEffectsParams({ contrast: value })}
          description="Contrast (1 = normal, <1 = flat, >1 = punchy)"
        />
        <ParameterSlider
          label="Hue Shift"
          value={effectsParams.hueShift}
          min={0}
          max={360}
          step={5}
          onChange={(value) => updateEffectsParams({ hueShift: value })}
          description="Hue rotation in degrees (0-360). Cycle through color spectrum"
        />
      </Section>

      {/* Layer 2: Spatial Effects */}
      <Section
        title="Layer 2: Spatial Effects"
        description="Blur, glow, and motion effects applied after color grading"
      >
        <ParameterSlider
          label="Blur"
          value={effectsParams.blur}
          min={0}
          max={20}
          step={0.5}
          onChange={(value) => updateEffectsParams({ blur: value })}
          description="Gaussian blur radius (px). Higher = softer, dreamier"
        />
        <ParameterSlider
          label="Bloom"
          value={effectsParams.bloom}
          min={0}
          max={1}
          step={0.05}
          onChange={(value) => updateEffectsParams({ bloom: value })}
          description="Additive glow strength. Higher = more ethereal glow"
        />
        <ParameterSlider
          label="Motion Blur"
          value={effectsParams.motionBlur}
          min={0}
          max={0.95}
          step={0.05}
          onChange={(value) => updateEffectsParams({ motionBlur: value })}
          description="Frame persistence / ghosting. Higher = longer trails, fluid motion"
        />
      </Section>

      {/* Layer 3: Distortion Effects */}
      <Section
        title="Layer 3: Distortion & Lo-Fi"
        description="Spatial distortions and pixelation effects"
      >
        <ParameterSlider
          label="Chromatic Aberration"
          value={effectsParams.chromaticAberration}
          min={0}
          max={15}
          step={0.5}
          onChange={(value) => updateEffectsParams({ chromaticAberration: value })}
          description="RGB channel offset (px). Creates retro glitch / CRT effect"
        />
        <ParameterSlider
          label="Pixelation"
          value={effectsParams.pixelation}
          min={1}
          max={16}
          step={1}
          onChange={(value) => updateEffectsParams({ pixelation: value })}
          description="Pixel/block size. 1 = none, higher = more retro pixelated"
        />
      </Section>

      {/* Layer 4: Screen Overlays */}
      <Section
        title="Layer 4: Screen Overlays (Top)"
        description="Final overlay effects rendered on top of everything - vignette, then scanlines last"
      >
        <ParameterSlider
          label="Vignette"
          value={effectsParams.vignette}
          min={0}
          max={1}
          step={0.05}
          onChange={(value) => updateEffectsParams({ vignette: value })}
          description="Edge darkening overlay. Higher = stronger focus on center"
        />
        <ParameterSlider
          label="Scanlines"
          value={effectsParams.scanlines}
          min={0}
          max={1}
          step={0.05}
          onChange={(value) => updateEffectsParams({ scanlines: value })}
          description="CRT scanline overlay (top layer). Perfect for Matrix/Retro look"
        />
      </Section>

      <InfoBox>
        <p style={styles.infoText}>
          <strong>Rendering Order:</strong> Effects are applied from Layer 1 → Layer 4.
          <br />
          Screen Overlays (Layer 4) are always rendered last, with Scanlines as the final top layer.
        </p>
      </InfoBox>
    </div>
  );
});

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing.xxl,
    padding: spacing.lg,
  } as React.CSSProperties,
  title: {
    ...createHeaderStyle('h1'),
    margin: 0,
    color: colors.text.primary,
  } as React.CSSProperties,
  description: {
    margin: 0,
    fontSize: '13px',
    color: colors.text.tertiary,
  } as React.CSSProperties,
  infoText: {
    margin: 0,
  } as React.CSSProperties,
};
