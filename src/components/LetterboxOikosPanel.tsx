import { useSimulationStore } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';
import { letterboxPresets } from '../presets/tabPresets';
import type { LetterboxParams } from '../types/index';

export function LetterboxOikosPanel() {
  const letterbox = useSimulationStore((state) => state.parameters.letterbox);
  const updateLetterboxParams = useSimulationStore((state) => state.updateLetterboxParams);

  const loadPreset = (presetLetterbox: Partial<LetterboxParams>) => {
    updateLetterboxParams(presetLetterbox);
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>🎬 Letterbox Oikos</h3>
      <p style={styles.description}>
        Reactive cinema-style borders that visualize agent wrap events with interference patterns
      </p>

      {/* Enable/Disable Toggle */}
      <div style={styles.toggleSection}>
        <label style={styles.toggleLabel}>
          <input
            type="checkbox"
            checked={letterbox.enabled}
            onChange={(e) => {
              console.log(`[LetterboxPanel] Checkbox clicked, new value: ${e.target.checked}`);
              updateLetterboxParams({ enabled: e.target.checked });
              console.log(`[LetterboxPanel] updateLetterboxParams called with enabled: ${e.target.checked}`);
            }}
            style={styles.checkbox}
          />
          <span style={styles.toggleText}>Enable Letterbox Visualization</span>
        </label>
      </div>

      {/* Presets */}
      <div style={styles.presetsSection}>
        <h4 style={styles.sectionTitle}>Letterbox Presets</h4>
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

      {/* Section 1: Data Sources */}
      <div style={styles.layerSection}>
        <h4 style={styles.layerTitle}>📊 Data Sources</h4>
        <p style={styles.layerDescription}>
          Control which agent data influences the wave visualization
        </p>
        <div style={styles.section}>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={letterbox.useAgentColor}
              onChange={(e) => updateLetterboxParams({ useAgentColor: e.target.checked })}
              style={styles.checkbox}
            />
            <span>Use Agent Color</span>
          </label>
          <ParameterSlider
            label="Agent Color Weight"
            value={letterbox.agentColorWeight}
            min={0}
            max={3}
            step={0.1}
            onChange={(value) => updateLetterboxParams({ agentColorWeight: value })}
            description="How much agent color influences wave amplitude"
            disabled={!letterbox.useAgentColor}
          />

          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={letterbox.useTrailIntensity}
              onChange={(e) => updateLetterboxParams({ useTrailIntensity: e.target.checked })}
              style={styles.checkbox}
            />
            <span>Use Trail Intensity</span>
          </label>
          <ParameterSlider
            label="Trail Intensity Weight"
            value={letterbox.trailIntensityWeight}
            min={0}
            max={2}
            step={0.1}
            onChange={(value) => updateLetterboxParams({ trailIntensityWeight: value })}
            description="How much pheromone trails at edge affect waves"
            disabled={!letterbox.useTrailIntensity}
          />

          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={letterbox.useForceVector}
              onChange={(e) => updateLetterboxParams({ useForceVector: e.target.checked })}
              style={styles.checkbox}
            />
            <span>Use Force Vector (Velocity)</span>
          </label>
          <ParameterSlider
            label="Force Vector Weight"
            value={letterbox.forceVectorWeight}
            min={0}
            max={2}
            step={0.1}
            onChange={(value) => updateLetterboxParams({ forceVectorWeight: value })}
            description="How much agent velocity/speed affects amplitude"
            disabled={!letterbox.useForceVector}
          />
        </div>
      </div>

      {/* Section 2: Wave Physics */}
      <div style={styles.layerSection}>
        <h4 style={styles.layerTitle}>🌊 Wave Physics</h4>
        <p style={styles.layerDescription}>
          Control wave propagation, decay, and diffusion dynamics
        </p>
        <div style={styles.section}>
          <ParameterSlider
            label="Propagation Speed"
            value={letterbox.propagationSpeed}
            min={0.1}
            max={10}
            step={0.1}
            onChange={(value) => updateLetterboxParams({ propagationSpeed: value })}
            description="How fast waves travel from edge into bars"
          />
          <ParameterSlider
            label="Decay Rate"
            value={letterbox.decayRate}
            min={0.5}
            max={1}
            step={0.01}
            onChange={(value) => updateLetterboxParams({ decayRate: value })}
            description="Wave amplitude decay per frame (1 = no decay, 0.9 = fast decay)"
          />
          <ParameterSlider
            label="Diffusion Rate"
            value={letterbox.diffusionRate}
            min={0}
            max={1}
            step={0.05}
            onChange={(value) => updateLetterboxParams({ diffusionRate: value })}
            description="How much waves spread to neighbors (0 = no spread, 1 = instant diffusion)"
          />
          <ParameterSlider
            label="Diffusion Frequency"
            value={letterbox.diffusionFreq}
            min={1}
            max={10}
            step={1}
            onChange={(value) => updateLetterboxParams({ diffusionFreq: value })}
            description="Apply diffusion every N frames (lower = smoother, higher = performance)"
          />
          <ParameterSlider
            label="Max Event History"
            value={letterbox.maxEventHistory}
            min={50}
            max={500}
            step={10}
            onChange={(value) => updateLetterboxParams({ maxEventHistory: value })}
            description="Maximum wrap events to track (higher = more interference patterns)"
          />
        </div>
      </div>

      {/* Section 3: Interference (Double-Slit Physics) */}
      <div style={styles.layerSection}>
        <h4 style={styles.layerTitle}>✨ Interference Patterns</h4>
        <p style={styles.layerDescription}>
          Double-slit experiment visualization - constructive/destructive wave interference
        </p>
        <div style={styles.section}>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={letterbox.interferenceEnabled}
              onChange={(e) => updateLetterboxParams({ interferenceEnabled: e.target.checked })}
              style={styles.checkbox}
            />
            <span>Enable Interference</span>
          </label>

          <div style={styles.radioGroup}>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                value="constructive"
                checked={letterbox.interferenceType === 'constructive'}
                onChange={() => updateLetterboxParams({ interferenceType: 'constructive' })}
                disabled={!letterbox.interferenceEnabled}
                style={styles.radio}
              />
              <span>Constructive (Peaks only)</span>
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                value="destructive"
                checked={letterbox.interferenceType === 'destructive'}
                onChange={() => updateLetterboxParams({ interferenceType: 'destructive' })}
                disabled={!letterbox.interferenceEnabled}
                style={styles.radio}
              />
              <span>Destructive (Valleys only)</span>
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                value="both"
                checked={letterbox.interferenceType === 'both'}
                onChange={() => updateLetterboxParams({ interferenceType: 'both' })}
                disabled={!letterbox.interferenceEnabled}
                style={styles.radio}
              />
              <span>Both (Peaks & Valleys)</span>
            </label>
          </div>

          <ParameterSlider
            label="Wave Length"
            value={letterbox.waveLength}
            min={5}
            max={100}
            step={1}
            onChange={(value) => updateLetterboxParams({ waveLength: value })}
            description="Distance between wave peaks (smaller = tighter patterns)"
            disabled={!letterbox.interferenceEnabled}
          />
          <ParameterSlider
            label="Coherence Length"
            value={letterbox.coherenceLength}
            min={20}
            max={300}
            step={10}
            onChange={(value) => updateLetterboxParams({ coherenceLength: value })}
            description="How far waves remain coherent (smaller = localized interference)"
            disabled={!letterbox.interferenceEnabled}
          />

          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={letterbox.showInterferencePattern}
              onChange={(e) => updateLetterboxParams({ showInterferencePattern: e.target.checked })}
              style={styles.checkbox}
              disabled={!letterbox.interferenceEnabled}
            />
            <span>Show Interference Pattern</span>
          </label>
        </div>
      </div>

      {/* Section 4: Visual Style */}
      <div style={styles.layerSection}>
        <h4 style={styles.layerTitle}>🎨 Visual Style</h4>
        <p style={styles.layerDescription}>
          Color blending, brightness, blur, and animation effects
        </p>
        <div style={styles.section}>
          <div style={styles.radioGroup}>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                value="additive"
                checked={letterbox.blendMode === 'additive'}
                onChange={() => updateLetterboxParams({ blendMode: 'additive' })}
                style={styles.radio}
              />
              <span>Additive Blend</span>
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                value="alpha"
                checked={letterbox.blendMode === 'alpha'}
                onChange={() => updateLetterboxParams({ blendMode: 'alpha' })}
                style={styles.radio}
              />
              <span>Alpha Blend</span>
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                value="multiply"
                checked={letterbox.blendMode === 'multiply'}
                onChange={() => updateLetterboxParams({ blendMode: 'multiply' })}
                style={styles.radio}
              />
              <span>Multiply Blend</span>
            </label>
          </div>

          <ParameterSlider
            label="Brightness"
            value={letterbox.brightness}
            min={0}
            max={5}
            step={0.1}
            onChange={(value) => updateLetterboxParams({ brightness: value })}
            description="Overall brightness multiplier"
          />
          <ParameterSlider
            label="Blur"
            value={letterbox.blur}
            min={0}
            max={20}
            step={0.5}
            onChange={(value) => updateLetterboxParams({ blur: value })}
            description="Gaussian blur radius for softer, dreamier waves"
          />

          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={letterbox.hueCycling}
              onChange={(e) => updateLetterboxParams({ hueCycling: e.target.checked })}
              style={styles.checkbox}
            />
            <span>Hue Cycling Animation</span>
          </label>
          <ParameterSlider
            label="Hue Cycling Speed"
            value={letterbox.hueCyclingSpeed}
            min={0.1}
            max={10}
            step={0.1}
            onChange={(value) => updateLetterboxParams({ hueCyclingSpeed: value })}
            description="Speed of color cycling through hue spectrum"
            disabled={!letterbox.hueCycling}
          />
        </div>
      </div>

      {/* Info Box */}
      <div style={styles.infoBox}>
        <p style={styles.infoText}>
          💡 <strong>Double-Slit Experiment:</strong> When multiple agents wrap at nearby positions,
          their waves interfere like light passing through slits. Constructive interference creates
          bright bands, destructive interference creates dark bands.
          <br/><br/>
          🎬 <strong>Cinema Letterbox:</strong> Only horizontal OR vertical bars are shown at once,
          depending on your aspect ratio. 16:9 landscape = top/bottom bars. 9:16 portrait = left/right bars.
          <br/><br/>
          ⚡ <strong>Performance Tip:</strong> Higher diffusion frequency (fewer updates) improves FPS.
          Lower max event history reduces interference calculations.
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
  toggleSection: {
    padding: '12px',
    backgroundColor: '#0a0a15',
    borderRadius: '8px',
    border: '1px solid #2a2b3a',
  } as React.CSSProperties,
  toggleLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#fff',
  } as React.CSSProperties,
  toggleText: {
    fontWeight: 600,
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
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#ccc',
    cursor: 'pointer',
  } as React.CSSProperties,
  checkbox: {
    width: '16px',
    height: '16px',
    cursor: 'pointer',
  } as React.CSSProperties,
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '8px',
    backgroundColor: '#05050a',
    borderRadius: '6px',
  } as React.CSSProperties,
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#ccc',
    cursor: 'pointer',
  } as React.CSSProperties,
  radio: {
    width: '16px',
    height: '16px',
    cursor: 'pointer',
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
