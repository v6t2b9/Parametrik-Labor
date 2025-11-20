import { useSimulationStore } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';
import { effectsPresets } from '../presets/tabPresets';
import { colors, spacing, typography, effects, createHeaderStyle, createSubtitleStyle } from '../design-system';

export function EffectsOikosPanel() {
  const effectsParams = useSimulationStore((state) => state.parameters.effects);
  const updateEffectsParams = useSimulationStore((state) => state.updateEffectsParams);

  const loadPreset = (presetEffects: typeof effectsParams) => {
    updateEffectsParams(presetEffects);
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Effects Oikos</h3>
      <p style={styles.description}>
        Post-processing layer stack - effects are rendered in order from base to top
      </p>

      {/* Presets */}
      <div style={styles.presetsSection}>
        <h4 style={styles.sectionTitle}>Effect Presets</h4>
        <div style={styles.presetGrid}>
          {effectsPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => loadPreset(preset.params)}
              style={styles.presetButton}
              title={preset.description}
            >
              <span style={styles.presetIcon}>{preset.icon}</span>
              <span style={styles.presetName}>{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Layer 1: Base Effects */}
      <div style={styles.layerSection}>
        <h4 style={styles.layerTitle}>Layer 1: Color Grading (Base)</h4>
        <p style={styles.layerDescription}>
          Foundation color adjustments applied to the base image
        </p>
        <div style={styles.section}>
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
        </div>
      </div>

      {/* Layer 2: Spatial Effects */}
      <div style={styles.layerSection}>
        <h4 style={styles.layerTitle}>Layer 2: Spatial Effects</h4>
        <p style={styles.layerDescription}>
          Blur, glow, and motion effects applied after color grading
        </p>
        <div style={styles.section}>
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
        </div>
      </div>

      {/* Layer 3: Distortion Effects */}
      <div style={styles.layerSection}>
        <h4 style={styles.layerTitle}>Layer 3: Distortion & Lo-Fi</h4>
        <p style={styles.layerDescription}>
          Spatial distortions and pixelation effects
        </p>
        <div style={styles.section}>
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
          <ParameterSlider
            label="Wave Distortion"
            value={effectsParams.waveDistortion}
            min={0}
            max={1}
            step={0.05}
            onChange={(value) => updateEffectsParams({ waveDistortion: value })}
            description="Sine wave amplitude (disabled for performance, kept for compatibility)"
          />
        </div>
      </div>

      {/* Layer 4: Screen Overlays */}
      <div style={styles.layerSection}>
        <h4 style={styles.layerTitle}>Layer 4: Screen Overlays (Top)</h4>
        <p style={styles.layerDescription}>
          Final overlay effects rendered on top of everything - vignette, then scanlines last
        </p>
        <div style={styles.section}>
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
        </div>
      </div>

      <div style={styles.infoBox}>
        <p style={styles.infoText}>
          <strong>Rendering Order:</strong> Effects are applied from Layer 1 → Layer 4.
          <br/>
          Screen Overlays (Layer 4) are always rendered last, with Scanlines as the final top layer.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
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
    ...typography.h3,
    color: colors.text.tertiary,
  } as React.CSSProperties,
  presetsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
  } as React.CSSProperties,
  sectionTitle: {
    margin: 0,
    ...typography.h3,
    color: colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  } as React.CSSProperties,
  presetGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: spacing.sm,
  } as React.CSSProperties,
  presetButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.xs,
    padding: `${spacing.md} ${spacing.sm}`,
    backgroundColor: colors.bg.tertiary,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: effects.borderRadius.lg,
    cursor: 'pointer',
    transition: effects.transition.normal,
    color: colors.text.primary,
  } as React.CSSProperties,
  presetIcon: {
    fontSize: '24px',
  } as React.CSSProperties,
  presetName: {
    ...typography.caption,
    textAlign: 'center',
  } as React.CSSProperties,
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
  } as React.CSSProperties,
  layerSection: {
    marginBottom: spacing.xxl,
    padding: spacing.lg,
    backgroundColor: colors.bg.subtle,
    borderRadius: effects.borderRadius.lg,
    border: `1px solid ${colors.border.primary}`,
  } as React.CSSProperties,
  layerTitle: {
    margin: `0 0 ${spacing.sm} 0`,
    fontSize: '15px',
    color: colors.accent.light,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  } as React.CSSProperties,
  layerDescription: {
    margin: `0 0 ${spacing.lg} 0`,
    ...typography.caption,
    color: colors.text.muted,
    lineHeight: '1.4',
  } as React.CSSProperties,
  infoBox: {
    padding: spacing.md,
    backgroundColor: colors.bg.subtle,
    borderRadius: effects.borderRadius.md,
    border: '1px solid #3d2d5d',
    marginTop: spacing.sm,
  } as React.CSSProperties,
  infoText: {
    ...typography.caption,
    color: colors.text.secondary,
    lineHeight: '1.6',
    margin: 0,
  } as React.CSSProperties,
};
