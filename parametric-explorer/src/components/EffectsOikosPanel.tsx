import { useSimulationStore } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';
import { effectsPresets } from '../presets/tabPresets';

export function EffectsOikosPanel() {
  const effects = useSimulationStore((state) => state.parameters.effects);
  const updateEffectsParams = useSimulationStore((state) => state.updateEffectsParams);

  const loadPreset = (presetEffects: typeof effects) => {
    updateEffectsParams(presetEffects);
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>🎨 Effects Oikos</h3>
      <p style={styles.description}>
        Post-processing effects for Lavalampen-Magie
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

      {/* Blur & Glow */}
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>Blur & Glow</h4>
        <ParameterSlider
          label="Blur"
          value={effects.blur}
          min={0}
          max={20}
          step={0.5}
          onChange={(value) => updateEffectsParams({ blur: value })}
          description="Gaussian blur radius (px). Higher = softer, dreamier"
        />
        <ParameterSlider
          label="Bloom"
          value={effects.bloom}
          min={0}
          max={1}
          step={0.05}
          onChange={(value) => updateEffectsParams({ bloom: value })}
          description="Additive glow strength. Higher = more ethereal glow"
        />
      </div>

      {/* Color Grading */}
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>Color Grading</h4>
        <ParameterSlider
          label="Saturation"
          value={effects.saturation}
          min={0}
          max={3}
          step={0.1}
          onChange={(value) => updateEffectsParams({ saturation: value })}
          description="Color saturation (1 = normal, <1 = desaturated, >1 = vivid)"
        />
        <ParameterSlider
          label="Contrast"
          value={effects.contrast}
          min={0}
          max={3}
          step={0.05}
          onChange={(value) => updateEffectsParams({ contrast: value })}
          description="Contrast (1 = normal, <1 = flat, >1 = punchy)"
        />
        <ParameterSlider
          label="Hue Shift"
          value={effects.hueShift}
          min={0}
          max={360}
          step={5}
          onChange={(value) => updateEffectsParams({ hueShift: value })}
          description="Hue rotation in degrees (0-360). Cycle through color spectrum"
        />
      </div>

      {/* Motion & Trails */}
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>Motion & Trails</h4>
        <ParameterSlider
          label="Motion Blur"
          value={effects.motionBlur}
          min={0}
          max={0.95}
          step={0.05}
          onChange={(value) => updateEffectsParams({ motionBlur: value })}
          description="Frame persistence / ghosting. Higher = longer trails, fluid motion"
        />
      </div>

      {/* Atmospheric */}
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>Atmospheric</h4>
        <ParameterSlider
          label="Vignette"
          value={effects.vignette}
          min={0}
          max={1}
          step={0.05}
          onChange={(value) => updateEffectsParams({ vignette: value })}
          description="Edge darkening. Higher = stronger focus on center"
        />
      </div>

      {/* Psychedelic / Distortion */}
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>Psychedelic / Distortion</h4>
        <ParameterSlider
          label="Chromatic Aberration"
          value={effects.chromaticAberration}
          min={0}
          max={15}
          step={0.5}
          onChange={(value) => updateEffectsParams({ chromaticAberration: value })}
          description="RGB channel offset (px). Creates retro glitch / CRT effect"
        />
        <ParameterSlider
          label="Wave Distortion"
          value={effects.waveDistortion}
          min={0}
          max={1}
          step={0.05}
          onChange={(value) => updateEffectsParams({ waveDistortion: value })}
          description="Sine wave amplitude. Higher = more liquid/psychedelic warping"
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    padding: '16px',
  } as React.CSSProperties,
  title: {
    margin: 0,
    fontSize: '20px',
    color: '#ffffff',
  } as React.CSSProperties,
  description: {
    margin: 0,
    fontSize: '14px',
    color: '#888',
  } as React.CSSProperties,
  presetsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  } as React.CSSProperties,
  sectionTitle: {
    margin: 0,
    fontSize: '14px',
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  } as React.CSSProperties,
  presetGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: '8px',
  } as React.CSSProperties,
  presetButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: '12px 8px',
    backgroundColor: '#1a1b2e',
    border: '1px solid #2a2b3a',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    color: '#fff',
  } as React.CSSProperties,
  presetIcon: {
    fontSize: '24px',
  } as React.CSSProperties,
  presetName: {
    fontSize: '11px',
    textAlign: 'center',
  } as React.CSSProperties,
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  } as React.CSSProperties,
};
