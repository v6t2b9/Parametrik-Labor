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
      <h3 style={styles.title}>✨ Effects Oikos</h3>
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
        <h4 style={styles.layerTitle}>🎨 Layer 1: Color Grading (Base)</h4>
        <p style={styles.layerDescription}>
          Foundation color adjustments applied to the base image
        </p>
        <div style={styles.section}>
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
      </div>

      {/* Layer 2: Spatial Effects */}
      <div style={styles.layerSection}>
        <h4 style={styles.layerTitle}>🌫️ Layer 2: Spatial Effects</h4>
        <p style={styles.layerDescription}>
          Blur, glow, and motion effects applied after color grading
        </p>
        <div style={styles.section}>
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
      </div>

      {/* Layer 3: Distortion Effects */}
      <div style={styles.layerSection}>
        <h4 style={styles.layerTitle}>🌀 Layer 3: Distortion & Lo-Fi</h4>
        <p style={styles.layerDescription}>
          Spatial distortions and pixelation effects
        </p>
        <div style={styles.section}>
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
            label="Pixelation"
            value={effects.pixelation}
            min={1}
            max={16}
            step={1}
            onChange={(value) => updateEffectsParams({ pixelation: value })}
            description="Pixel/block size. 1 = none, higher = more retro pixelated"
          />
          <ParameterSlider
            label="Wave Distortion"
            value={effects.waveDistortion}
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
        <h4 style={styles.layerTitle}>📺 Layer 4: Screen Overlays (Top)</h4>
        <p style={styles.layerDescription}>
          Final overlay effects rendered on top of everything - vignette, then scanlines last
        </p>
        <div style={styles.section}>
          <ParameterSlider
            label="Vignette"
            value={effects.vignette}
            min={0}
            max={1}
            step={0.05}
            onChange={(value) => updateEffectsParams({ vignette: value })}
            description="Edge darkening overlay. Higher = stronger focus on center"
          />
          <ParameterSlider
            label="Scanlines"
            value={effects.scanlines}
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
          💡 <strong>Rendering Order:</strong> Effects are applied from Layer 1 → Layer 4.
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
  layerSection: {
    marginBottom: '24px',
    padding: '16px',
    backgroundColor: '#0a0a15',
    borderRadius: '8px',
    border: '1px solid #2a2b3a',
  } as React.CSSProperties,
  layerTitle: {
    margin: '0 0 6px 0',
    fontSize: '15px',
    color: '#9d7dd4',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  } as React.CSSProperties,
  layerDescription: {
    margin: '0 0 16px 0',
    fontSize: '11px',
    color: '#7d7d8d',
    lineHeight: '1.4',
  } as React.CSSProperties,
  infoBox: {
    padding: '12px',
    backgroundColor: '#0a0a15',
    borderRadius: '6px',
    border: '1px solid #3d2d5d',
    marginTop: '8px',
  } as React.CSSProperties,
  infoText: {
    fontSize: '11px',
    color: '#a0a0b0',
    lineHeight: '1.6',
    margin: 0,
  } as React.CSSProperties,
};
