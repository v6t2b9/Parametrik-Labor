import { useSimulationStore } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';
import { visualPresets, effectsPresets } from '../presets/tabPresets';

export function VisualsOikosPanel() {
  const { parameters, updateVisualizationParams, updateEffectsParams } = useSimulationStore();
  const { visualization, effects } = parameters;

  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>🎨 Visuals & Effects</h3>
      <p style={styles.subtitle}>
        Complete visual control - from colors to post-processing effects
      </p>

      {/* Visual Presets Section */}
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>📦 Visual Presets</h4>
        <p style={styles.sectionDescription}>
          Pre-configured color schemes with matching blend modes and trail settings
        </p>
        <div style={styles.presetGrid}>
          {visualPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => updateVisualizationParams(preset.params)}
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

      {/* Effect Presets Section */}
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>📦 Effect Presets</h4>
        <p style={styles.sectionDescription}>
          Pre-configured post-processing combinations for different moods
        </p>
        <div style={styles.presetGrid}>
          {effectsPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => updateEffectsParams(preset.params)}
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

      {/* Visual Parameters */}
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>🎨 Visual Parameters</h4>

        <ParameterSlider
          label="✨ Brightness"
          value={visualization.brightness}
          min={0.5}
          max={5.0}
          step={0.1}
          onChange={(value) => updateVisualizationParams({ brightness: value })}
          description="Overall brightness of the visualization - higher values create more luminous displays"
        />

        <ParameterSlider
          label="🌫️ Trail Intensity"
          value={visualization.trailIntensity}
          min={80}
          max={280}
          step={10}
          onChange={(value) => updateVisualizationParams({ trailIntensity: value })}
          description="Trail visibility threshold - lower values show more detail, higher values create smoother trails"
        />

        {/* Blend Mode Section */}
        <div style={styles.blendModeSection}>
          <label style={styles.paramLabel}>🎭 Blend Mode</label>
          <p style={styles.paramDescription}>
            How the three species colors are mixed together
          </p>
          <div style={styles.blendModeGrid}>
            {[
              { mode: 'additive' as const, label: '✨ Additive', desc: 'Bright luminous mix, auto-normalized on overlap' },
              { mode: 'average' as const, label: '🎨 Average', desc: 'Soft balanced mix without oversaturation' },
              { mode: 'multiply' as const, label: '🌓 Multiply', desc: 'Darker mix with high contrast' },
              { mode: 'screen' as const, label: '🌟 Screen', desc: 'Bright soft combination for organic flows' },
            ].map((item) => (
              <button
                key={item.mode}
                onClick={() => updateVisualizationParams({ blendMode: item.mode })}
                style={{
                  ...styles.blendModeButton,
                  backgroundColor: visualization.blendMode === item.mode ? '#7d5dbd' : '#1a1a2d',
                  borderColor: visualization.blendMode === item.mode ? '#9d7dd4' : '#2a2b3a',
                }}
                title={item.desc}
              >
                <span style={styles.blendModeLabel}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Lab Mode / Lavalamp Mode Toggle */}
        <div style={styles.labModeSection}>
          <label style={styles.paramLabel}>🔬 Visualization Mode</label>
          <p style={styles.paramDescription}>
            Switch between pure lavalamp aesthetics and scientific agent view
          </p>
          <div style={styles.toggleGroup}>
            <button
              onClick={() => updateVisualizationParams({ showAgents: false })}
              style={{
                ...styles.toggleButton,
                backgroundColor: !visualization.showAgents ? '#7d5dbd' : '#1a1a2d',
                borderColor: !visualization.showAgents ? '#9d7dd4' : '#2a2b3a',
              }}
              title="Pure trail visualization - meditative lavalamp experience"
            >
              🌈 Lavalamp Mode
            </button>
            <button
              onClick={() => updateVisualizationParams({ showAgents: true })}
              style={{
                ...styles.toggleButton,
                backgroundColor: visualization.showAgents ? '#7d5dbd' : '#1a1a2d',
                borderColor: visualization.showAgents ? '#9d7dd4' : '#2a2b3a',
              }}
              title="Show agent markers - scientific analysis mode"
            >
              🔬 Lab Mode
            </button>
          </div>

          {/* Agent Display Type (only visible in Lab Mode) */}
          {visualization.showAgents && (
            <div style={{ marginTop: '12px' }}>
              <label style={styles.paramLabel}>Agent Display</label>
              <p style={styles.paramDescription}>
                How agents are visualized in Lab Mode
              </p>
              <div style={styles.toggleGroup}>
                <button
                  onClick={() => updateVisualizationParams({ useTriangles: false })}
                  style={{
                    ...styles.toggleButton,
                    backgroundColor: !visualization.useTriangles ? '#7d5dbd' : '#1a1a2d',
                    borderColor: !visualization.useTriangles ? '#9d7dd4' : '#2a2b3a',
                  }}
                  title="Simple circular dots"
                >
                  ⚫ Dots
                </button>
                <button
                  onClick={() => updateVisualizationParams({ useTriangles: true })}
                  style={{
                    ...styles.toggleButton,
                    backgroundColor: visualization.useTriangles ? '#7d5dbd' : '#1a1a2d',
                    borderColor: visualization.useTriangles ? '#9d7dd4' : '#2a2b3a',
                  }}
                  title="Directional triangles showing movement orientation"
                >
                  🔺 Triangles
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={styles.divider} />

      {/* Post-Processing Effects */}
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>✨ Post-Processing Effects</h4>

        {/* Blur & Glow */}
        <div style={styles.subsection}>
          <h5 style={styles.subsectionTitle}>Blur & Glow</h5>
          <ParameterSlider
            label="Blur"
            value={effects.blur}
            min={0}
            max={20}
            step={0.5}
            onChange={(value) => updateEffectsParams({ blur: value })}
            description="Gaussian blur radius (px) - creates softer, dreamier visuals"
          />
          <ParameterSlider
            label="Bloom"
            value={effects.bloom}
            min={0}
            max={1}
            step={0.05}
            onChange={(value) => updateEffectsParams({ bloom: value })}
            description="Additive glow strength - adds ethereal luminous halos"
          />
        </div>

        {/* Color Grading */}
        <div style={styles.subsection}>
          <h5 style={styles.subsectionTitle}>Color Grading</h5>
          <ParameterSlider
            label="Saturation"
            value={effects.saturation}
            min={0}
            max={3}
            step={0.1}
            onChange={(value) => updateEffectsParams({ saturation: value })}
            description="Color intensity (1.0 = normal, <1 = desaturated, >1 = vivid)"
          />
          <ParameterSlider
            label="Contrast"
            value={effects.contrast}
            min={0}
            max={3}
            step={0.05}
            onChange={(value) => updateEffectsParams({ contrast: value })}
            description="Contrast adjustment (1.0 = normal, <1 = flat, >1 = punchy)"
          />
          <ParameterSlider
            label="Hue Shift"
            value={effects.hueShift}
            min={0}
            max={360}
            step={5}
            onChange={(value) => updateEffectsParams({ hueShift: value })}
            description="Hue rotation in degrees (0-360) - cycles through the color spectrum"
          />
        </div>

        {/* Motion & Trails */}
        <div style={styles.subsection}>
          <h5 style={styles.subsectionTitle}>Motion & Trails</h5>
          <ParameterSlider
            label="Motion Blur"
            value={effects.motionBlur}
            min={0}
            max={0.95}
            step={0.05}
            onChange={(value) => updateEffectsParams({ motionBlur: value })}
            description="Frame persistence / ghosting - higher values create longer trails and fluid motion"
          />
        </div>

        {/* Atmospheric */}
        <div style={styles.subsection}>
          <h5 style={styles.subsectionTitle}>Atmospheric</h5>
          <ParameterSlider
            label="Vignette"
            value={effects.vignette}
            min={0}
            max={1}
            step={0.05}
            onChange={(value) => updateEffectsParams({ vignette: value })}
            description="Edge darkening - focuses attention on the center of the canvas"
          />
        </div>

        {/* Psychedelic / Distortion */}
        <div style={styles.subsection}>
          <h5 style={styles.subsectionTitle}>Psychedelic / Distortion</h5>
          <ParameterSlider
            label="Chromatic Aberration"
            value={effects.chromaticAberration}
            min={0}
            max={15}
            step={0.5}
            onChange={(value) => updateEffectsParams({ chromaticAberration: value })}
            description="RGB channel offset (px) - creates retro glitch or CRT-style effects"
          />
          <ParameterSlider
            label="Wave Distortion"
            value={effects.waveDistortion}
            min={0}
            max={1}
            step={0.05}
            onChange={(value) => updateEffectsParams({ waveDistortion: value })}
            description="Sine wave amplitude - higher values create liquid/psychedelic warping"
          />
        </div>

        {/* Retro / Lo-Fi */}
        <div style={styles.subsection}>
          <h5 style={styles.subsectionTitle}>Retro / Lo-Fi</h5>
          <ParameterSlider
            label="Scanlines"
            value={effects.scanlines}
            min={0}
            max={1}
            step={0.05}
            onChange={(value) => updateEffectsParams({ scanlines: value })}
            description="CRT scanline effect strength - perfect for Matrix/retro aesthetic"
          />
          <ParameterSlider
            label="Pixelation"
            value={effects.pixelation}
            min={1}
            max={16}
            step={1}
            onChange={(value) => updateEffectsParams({ pixelation: value })}
            description="Pixel/block size - 1 = none, higher values create retro pixelated look"
          />
        </div>
      </div>

      <div style={styles.divider} />

      {/* Color Channels Display */}
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>🎨 Color Channels</h4>
        <p style={styles.sectionDescription}>
          The colors assigned to each species and the background (visual only, doesn't affect simulation)
        </p>
        <div style={styles.colorGrid}>
          <div style={styles.colorCard}>
            <div style={styles.colorLabel}>🔴 Red Species</div>
            <div
              style={{
                ...styles.colorPreview,
                backgroundColor: `rgb(${visualization.colorRed.r}, ${visualization.colorRed.g}, ${visualization.colorRed.b})`,
              }}
            />
            <div style={styles.colorValues}>
              RGB({visualization.colorRed.r}, {visualization.colorRed.g}, {visualization.colorRed.b})
            </div>
          </div>

          <div style={styles.colorCard}>
            <div style={styles.colorLabel}>🟢 Green Species</div>
            <div
              style={{
                ...styles.colorPreview,
                backgroundColor: `rgb(${visualization.colorGreen.r}, ${visualization.colorGreen.g}, ${visualization.colorGreen.b})`,
              }}
            />
            <div style={styles.colorValues}>
              RGB({visualization.colorGreen.r}, {visualization.colorGreen.g}, {visualization.colorGreen.b})
            </div>
          </div>

          <div style={styles.colorCard}>
            <div style={styles.colorLabel}>🔵 Blue Species</div>
            <div
              style={{
                ...styles.colorPreview,
                backgroundColor: `rgb(${visualization.colorBlue.r}, ${visualization.colorBlue.g}, ${visualization.colorBlue.b})`,
              }}
            />
            <div style={styles.colorValues}>
              RGB({visualization.colorBlue.r}, {visualization.colorBlue.g}, {visualization.colorBlue.b})
            </div>
          </div>

          <div style={styles.colorCard}>
            <div style={styles.colorLabel}>⬛ Background</div>
            <div
              style={{
                ...styles.colorPreview,
                backgroundColor: `rgb(${visualization.colorBg.r}, ${visualization.colorBg.g}, ${visualization.colorBg.b})`,
              }}
            />
            <div style={styles.colorValues}>
              RGB({visualization.colorBg.r}, {visualization.colorBg.g}, {visualization.colorBg.b})
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div style={styles.infoBox}>
        <h5 style={styles.infoTitle}>💡 Pro Tips</h5>
        <ul style={styles.infoList}>
          <li><strong>Additive</strong> + low Trail Intensity = crisp glowing structures</li>
          <li><strong>Average</strong> + high Brightness = saturated colors without white-out</li>
          <li><strong>Multiply</strong> + high Trail Intensity = soft gradients with contrast</li>
          <li><strong>Screen</strong> + medium Trail Intensity = organic luminous flows</li>
          <li>Combine <strong>Motion Blur</strong> with low <strong>Trail Intensity</strong> for fluid trails</li>
          <li>Use <strong>Chromatic Aberration</strong> + <strong>Scanlines</strong> for authentic CRT look</li>
        </ul>
      </div>
    </div>
  );
}

const styles = {
  panel: {
    padding: '20px',
    backgroundColor: '#13141f',
    borderRadius: '8px',
    border: '1px solid #2a2b3a',
  } as React.CSSProperties,
  title: {
    fontSize: '18px',
    color: '#e0e0e0',
    marginBottom: '4px',
    fontWeight: 600,
  } as React.CSSProperties,
  subtitle: {
    fontSize: '12px',
    color: '#a0a0b0',
    marginBottom: '24px',
  } as React.CSSProperties,
  section: {
    marginBottom: '24px',
  } as React.CSSProperties,
  sectionTitle: {
    fontSize: '15px',
    color: '#9d7dd4',
    marginBottom: '8px',
    fontWeight: 600,
  } as React.CSSProperties,
  sectionDescription: {
    fontSize: '11px',
    color: '#7d7d8d',
    marginBottom: '12px',
    lineHeight: '1.4',
  } as React.CSSProperties,
  subsection: {
    marginTop: '20px',
  } as React.CSSProperties,
  subsectionTitle: {
    fontSize: '13px',
    color: '#b0b0c0',
    marginBottom: '12px',
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
    padding: '10px 8px',
    backgroundColor: '#0a0a15',
    border: '1px solid #2a2b3a',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontSize: '11px',
    color: '#e0e0e0',
  } as React.CSSProperties,
  presetIcon: {
    fontSize: '24px',
    marginBottom: '4px',
  } as React.CSSProperties,
  presetName: {
    fontSize: '9px',
    textAlign: 'center',
    lineHeight: '1.2',
  } as React.CSSProperties,
  divider: {
    height: '1px',
    backgroundColor: '#2a2b3a',
    margin: '24px 0',
  } as React.CSSProperties,
  paramLabel: {
    fontSize: '14px',
    color: '#e0e0e0',
    fontWeight: 500,
    marginBottom: '6px',
    display: 'block',
  } as React.CSSProperties,
  paramDescription: {
    fontSize: '11px',
    color: '#7d7d8d',
    marginBottom: '12px',
    lineHeight: '1.3',
  } as React.CSSProperties,
  blendModeSection: {
    marginTop: '20px',
  } as React.CSSProperties,
  blendModeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '8px',
  } as React.CSSProperties,
  blendModeButton: {
    padding: '12px',
    border: '2px solid',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontWeight: 600,
    fontSize: '12px',
  } as React.CSSProperties,
  blendModeLabel: {
    display: 'block',
    textAlign: 'center',
    color: '#e0e0e0',
  } as React.CSSProperties,
  labModeSection: {
    marginTop: '20px',
  } as React.CSSProperties,
  toggleGroup: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '8px',
  } as React.CSSProperties,
  toggleButton: {
    padding: '12px',
    border: '2px solid',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontWeight: 600,
    fontSize: '12px',
    color: '#e0e0e0',
  } as React.CSSProperties,
  colorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    marginTop: '12px',
  } as React.CSSProperties,
  colorCard: {
    padding: '12px',
    backgroundColor: '#0a0a15',
    borderRadius: '6px',
    border: '1px solid #2a2b3a',
  } as React.CSSProperties,
  colorLabel: {
    fontSize: '12px',
    color: '#e0e0e0',
    marginBottom: '8px',
    textAlign: 'center',
    fontWeight: 600,
  } as React.CSSProperties,
  colorPreview: {
    width: '100%',
    height: '40px',
    borderRadius: '4px',
    border: '1px solid #2a2b3a',
    marginBottom: '6px',
  } as React.CSSProperties,
  colorValues: {
    fontSize: '9px',
    color: '#6a6a7a',
    textAlign: 'center',
    fontFamily: 'monospace',
  } as React.CSSProperties,
  infoBox: {
    padding: '16px',
    backgroundColor: '#0a0a15',
    borderRadius: '6px',
    border: '1px solid #3d2d5d',
    marginTop: '24px',
  } as React.CSSProperties,
  infoTitle: {
    fontSize: '13px',
    color: '#9d7dd4',
    marginBottom: '12px',
    fontWeight: 600,
    margin: '0 0 12px 0',
  } as React.CSSProperties,
  infoList: {
    fontSize: '11px',
    color: '#a0a0b0',
    lineHeight: '1.7',
    margin: 0,
    paddingLeft: '20px',
  } as React.CSSProperties,
};
