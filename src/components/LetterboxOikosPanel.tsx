import { useSimulationStore } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';
import { letterboxPresets } from '../presets/tabPresets';
import type { LetterboxParams, WrapEffectType } from '../types/index';

export function LetterboxOikosPanel() {
  const letterbox = useSimulationStore((state) => state.parameters.letterbox);
  const updateLetterboxParams = useSimulationStore((state) => state.updateLetterboxParams);

  const loadPreset = (presetLetterbox: Partial<LetterboxParams>) => {
    updateLetterboxParams(presetLetterbox);
  };

  const effectTypes: { value: WrapEffectType; label: string; icon: string }[] = [
    { value: 'burst', label: 'Burst', icon: '💥' },
    { value: 'sparks', label: 'Sparks', icon: '✨' },
    { value: 'plasma', label: 'Plasma', icon: '🔮' },
    { value: 'fireworks', label: 'Fireworks', icon: '🎆' },
    { value: 'lightning', label: 'Lightning', icon: '⚡' },
    { value: 'aurora', label: 'Aurora', icon: '🌌' },
  ];

  const fadeTypes: { value: 'linear' | 'smooth' | 'sudden'; label: string }[] = [
    { value: 'linear', label: 'Linear' },
    { value: 'smooth', label: 'Smooth' },
    { value: 'sudden', label: 'Sudden' },
  ];

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>🎬 Wrap Effects</h3>
      <p style={styles.description}>
        Explosive particle effects when agents cross grid boundaries
      </p>

      {/* Enable/Disable Toggle */}
      <div style={styles.toggleSection}>
        <label style={styles.toggleLabel}>
          <input
            type="checkbox"
            checked={letterbox.enabled}
            onChange={(e) => updateLetterboxParams({ enabled: e.target.checked })}
            style={styles.checkbox}
          />
          <span style={styles.toggleText}>Enable Wrap Effects</span>
        </label>
      </div>

      {/* Presets */}
      <div style={styles.presetsSection}>
        <h4 style={styles.sectionTitle}>Effect Presets</h4>
        <div style={styles.presetGrid}>
          {letterboxPresets.map((preset) => (
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

      {/* Effect Type */}
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>Effect Style</h4>
        <div style={styles.effectTypeGrid}>
          {effectTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => updateLetterboxParams({ effectType: type.value })}
              style={{
                ...styles.effectTypeButton,
                backgroundColor: letterbox.effectType === type.value ? '#7d5dbd' : '#1a1a2d',
                borderColor: letterbox.effectType === type.value ? '#9d7dd4' : '#2a2b3a',
              }}
            >
              <span style={styles.effectIcon}>{type.icon}</span>
              <span style={styles.effectLabel}>{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Particle Behavior */}
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>⚙️ Particle Behavior</h4>

        <ParameterSlider
          label="Particle Count"
          value={letterbox.particleCount}
          min={10}
          max={200}
          step={5}
          onChange={(value) => updateLetterboxParams({ particleCount: value })}
          description="Number of particles spawned per wrap event"
        />

        <ParameterSlider
          label="Speed"
          value={letterbox.particleSpeed}
          min={0.5}
          max={10}
          step={0.5}
          onChange={(value) => updateLetterboxParams({ particleSpeed: value })}
          description="Initial particle velocity"
        />

        <ParameterSlider
          label="Lifetime"
          value={letterbox.particleLifetime}
          min={0.2}
          max={3.0}
          step={0.1}
          onChange={(value) => updateLetterboxParams({ particleLifetime: value })}
          description="Particle duration in seconds"
        />

        <ParameterSlider
          label="Size"
          value={letterbox.particleSize}
          min={1}
          max={20}
          step={1}
          onChange={(value) => updateLetterboxParams({ particleSize: value })}
          description="Particle render size in pixels"
        />

        <ParameterSlider
          label="Spread Angle"
          value={letterbox.spread}
          min={0}
          max={180}
          step={10}
          onChange={(value) => updateLetterboxParams({ spread: value })}
          description="Emission cone angle in degrees (0 = tight beam, 180 = hemisphere)"
        />
      </div>

      {/* Visual Properties */}
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>🎨 Visual Properties</h4>

        <ParameterSlider
          label="Intensity"
          value={letterbox.intensity}
          min={0}
          max={1}
          step={0.05}
          onChange={(value) => updateLetterboxParams({ intensity: value })}
          description="Overall effect intensity/opacity"
        />

        <ParameterSlider
          label="Glow"
          value={letterbox.glow}
          min={0}
          max={3}
          step={0.1}
          onChange={(value) => updateLetterboxParams({ glow: value })}
          description="Bloom/halo around particles"
        />

        <ParameterSlider
          label="Color Saturation"
          value={letterbox.colorSaturation}
          min={0}
          max={2}
          step={0.1}
          onChange={(value) => updateLetterboxParams({ colorSaturation: value })}
          description="Color vibrancy (0 = grayscale, 1 = normal, >1 = vivid)"
        />

        <div style={styles.toggleContainer}>
          <label style={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={letterbox.useAgentColor}
              onChange={(e) => updateLetterboxParams({ useAgentColor: e.target.checked })}
              style={styles.checkbox}
            />
            <span>Use Agent Species Color</span>
          </label>
        </div>

        <ParameterSlider
          label="Trail Influence"
          value={letterbox.trailInfluence}
          min={0}
          max={1}
          step={0.05}
          onChange={(value) => updateLetterboxParams({ trailInfluence: value })}
          description="How much trail intensity affects particle speed"
        />
      </div>

      {/* Animation */}
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>⚡ Animation</h4>

        <ParameterSlider
          label="Gravity"
          value={letterbox.gravity}
          min={-5}
          max={5}
          step={0.5}
          onChange={(value) => updateLetterboxParams({ gravity: value })}
          description="Particle gravity (negative = float up, positive = fall down)"
        />

        <ParameterSlider
          label="Turbulence"
          value={letterbox.turbulence}
          min={0}
          max={1}
          step={0.05}
          onChange={(value) => updateLetterboxParams({ turbulence: value })}
          description="Chaotic particle movement"
        />

        <div style={styles.fadeTypeSection}>
          <label style={styles.paramLabel}>Fade Type</label>
          <div style={styles.fadeTypeGrid}>
            {fadeTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => updateLetterboxParams({ fadeType: type.value })}
                style={{
                  ...styles.fadeTypeButton,
                  backgroundColor: letterbox.fadeType === type.value ? '#7d5dbd' : '#1a1a2d',
                  borderColor: letterbox.fadeType === type.value ? '#9d7dd4' : '#2a2b3a',
                }}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Info */}
      <div style={styles.infoBox}>
        <p style={styles.infoText}>
          💡 <strong>Tip:</strong> Try different presets to explore various moods - from meditative aurora flows to explosive fireworks!
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
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
  toggleSection: {
    padding: '12px',
    backgroundColor: '#0a0a15',
    borderRadius: '6px',
    border: '1px solid #2a2b3a',
  } as React.CSSProperties,
  toggleLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#e0e0e0',
  } as React.CSSProperties,
  toggleText: {
    fontWeight: 600,
  } as React.CSSProperties,
  checkbox: {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    accentColor: '#7d5dbd',
  } as React.CSSProperties,
  presetsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  } as React.CSSProperties,
  sectionTitle: {
    margin: 0,
    fontSize: '14px',
    color: '#9d7dd4',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontWeight: 600,
  } as React.CSSProperties,
  presetGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
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
  effectTypeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px',
  } as React.CSSProperties,
  effectTypeButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: '10px',
    border: '2px solid',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  } as React.CSSProperties,
  effectIcon: {
    fontSize: '24px',
  } as React.CSSProperties,
  effectLabel: {
    fontSize: '11px',
    color: '#e0e0e0',
    fontWeight: 600,
  } as React.CSSProperties,
  toggleContainer: {
    padding: '10px',
    backgroundColor: '#0a0a15',
    borderRadius: '6px',
    border: '1px solid #2a2b3a',
  } as React.CSSProperties,
  paramLabel: {
    fontSize: '13px',
    color: '#e0e0e0',
    fontWeight: 500,
    marginBottom: '8px',
    display: 'block',
  } as React.CSSProperties,
  fadeTypeSection: {
    marginTop: '8px',
  } as React.CSSProperties,
  fadeTypeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px',
  } as React.CSSProperties,
  fadeTypeButton: {
    padding: '10px',
    border: '2px solid',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontSize: '12px',
    fontWeight: 600,
    color: '#e0e0e0',
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
