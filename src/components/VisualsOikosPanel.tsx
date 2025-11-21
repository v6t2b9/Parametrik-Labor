import { useSimulationStore } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';
import { ColorPicker } from './ColorPicker';
import { visualPresets, effectsPresets } from '../presets/tabPresets';
import { colors, spacing, typography, effects, createHeaderStyle, createSubtitleStyle } from '../design-system';

export function VisualsOikosPanel() {
  const visualization = useSimulationStore((state) => state.parameters.visualization);
  const effects = useSimulationStore((state) => state.parameters.effects);
  const updateVisualizationParams = useSimulationStore((state) => state.updateVisualizationParams);
  const updateEffectsParams = useSimulationStore((state) => state.updateEffectsParams);

  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>Visuals & Effects</h3>
      <p style={styles.subtitle}>
        Complete visual control - from colors to post-processing effects
      </p>

      {/* Visual Presets Section */}
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>Presets</h4>
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
        <h4 style={styles.sectionTitle}>Presets</h4>
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
        <h4 style={styles.sectionTitle}>Visual Parameters</h4>

        <ParameterSlider
          label="Brightness"
          value={visualization.brightness}
          min={0.5}
          max={5.0}
          step={0.1}
          onChange={(value) => updateVisualizationParams({ brightness: value })}
          description="Overall brightness of the visualization - higher values create more luminous displays"
        />

        <ParameterSlider
          label="Trail Intensity"
          value={visualization.trailIntensity}
          min={80}
          max={280}
          step={10}
          onChange={(value) => updateVisualizationParams({ trailIntensity: value })}
          description="Trail visibility threshold - lower values show more detail, higher values create smoother trails"
        />

        {/* Blend Mode Section */}
        <div style={styles.blendModeSection}>
          <label style={styles.paramLabel}>Blend Mode</label>
          <p style={styles.paramDescription}>
            How the three species colors are mixed together
          </p>
          <div style={styles.blendModeGrid}>
            {[
              { mode: 'additive' as const, label: 'Additive', desc: 'Bright luminous mix, auto-normalized on overlap' },
              { mode: 'average' as const, label: 'Average', desc: 'Soft balanced mix without oversaturation' },
              { mode: 'multiply' as const, label: 'Multiply', desc: 'Darker mix with high contrast' },
              { mode: 'screen' as const, label: 'Screen', desc: 'Bright soft combination for organic flows' },
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
          <label style={styles.paramLabel}>Visualization Mode</label>
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
              Lavalamp Mode
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
              Lab Mode
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
                  Dots
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
                  Triangles
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={styles.divider} />

      {/* Post-Processing Effects */}
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>Post-Processing Effects</h4>

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

      {/* Color Channels - Interactive Pickers */}
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>Color Channels</h4>
        <p style={styles.sectionDescription}>
          Customize the colors for each species and background (visual only, doesn't affect simulation)
        </p>
        <div style={styles.colorGrid}>
          <ColorPicker
            label="Red Species"
            color={visualization.colorRed}
            onChange={(color) => updateVisualizationParams({ colorRed: color })}
          />

          <ColorPicker
            label="Green Species"
            color={visualization.colorGreen}
            onChange={(color) => updateVisualizationParams({ colorGreen: color })}
          />

          <ColorPicker
            label="Blue Species"
            color={visualization.colorBlue}
            onChange={(color) => updateVisualizationParams({ colorBlue: color })}
          />

          <ColorPicker
            label="Background"
            color={visualization.colorBg}
            onChange={(color) => updateVisualizationParams({ colorBg: color })}
          />
        </div>
      </div>

      <div style={styles.divider} />

      {/* Hue Cycling Section */}
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>Hue Cycling</h4>
        <p style={styles.sectionDescription}>
          Automatic color transitions for flowing animations. Enable cycling and configure the hue range and speed.
        </p>

        {/* Enable Toggle */}
        <div style={styles.toggleContainer}>
          <label style={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={visualization.hueCycling.enabled}
              onChange={(e) => updateVisualizationParams({
                hueCycling: { ...visualization.hueCycling, enabled: e.target.checked }
              })}
              style={styles.checkbox}
            />
            <span>Enable Hue Cycling</span>
          </label>
        </div>

        {/* Hue Cycling Controls (only shown when enabled) */}
        {visualization.hueCycling.enabled && (
          <div style={styles.hueCyclingControls}>
            <ParameterSlider
              label="Start Hue"
              value={visualization.hueCycling.startHue}
              min={0}
              max={360}
              step={1}
              onChange={(value) => updateVisualizationParams({
                hueCycling: { ...visualization.hueCycling, startHue: value }
              })}
              description="Starting hue (0-360° on color wheel)"
            />

            <ParameterSlider
              label="End Hue"
              value={visualization.hueCycling.endHue}
              min={0}
              max={360}
              step={1}
              onChange={(value) => updateVisualizationParams({
                hueCycling: { ...visualization.hueCycling, endHue: value }
              })}
              description="Ending hue (0-360° on color wheel)"
            />

            <ParameterSlider
              label="Cycle Speed"
              value={visualization.hueCycling.speed}
              min={0.1}
              max={10.0}
              step={0.1}
              onChange={(value) => updateVisualizationParams({
                hueCycling: { ...visualization.hueCycling, speed: value }
              })}
              description="Transition speed (lower = slower, smoother)"
            />

            <div style={styles.infoBox}>
              <p style={styles.infoText}>
                <strong>Hue Wheel Reference:</strong> The hue value oscillates between start and end points.
                <br/>
                • <strong>0° = Red</strong>, 60° = Yellow, 120° = Green, 180° = Cyan, 240° = Blue, 300° = Magenta, 360° = Red
                <br/>
                • Small ranges (e.g., 0-60°) create subtle shifts
                <br/>
                • Large ranges (e.g., 0-360°) cycle through the full rainbow
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Tips */}
      <div style={styles.infoBox}>
        <h5 style={styles.infoTitle}>Pro Tips</h5>
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
    padding: spacing.xl,
    backgroundColor: colors.bg.secondary,
    borderRadius: effects.borderRadius.lg,
    border: `1px solid ${colors.border.primary}`,
  } as React.CSSProperties,
  title: {
    ...createHeaderStyle('h2'),
    fontSize: '18px',
    marginBottom: spacing.xs,
  } as React.CSSProperties,
  subtitle: {
    ...createSubtitleStyle(),
    fontSize: '12px',
    marginBottom: spacing.xxl,
  } as React.CSSProperties,
  section: {
    marginBottom: spacing.xxl,
  } as React.CSSProperties,
  sectionTitle: {
    fontSize: '15px',
    color: colors.accent.light,
    marginBottom: spacing.sm,
    fontWeight: 600,
  } as React.CSSProperties,
  sectionDescription: {
    ...typography.caption,
    color: colors.text.muted,
    marginBottom: spacing.md,
    lineHeight: '1.4',
  } as React.CSSProperties,
  subsection: {
    marginTop: spacing.xl,
  } as React.CSSProperties,
  subsectionTitle: {
    ...typography.h3,
    color: colors.text.secondary,
    marginBottom: spacing.md,
    fontWeight: 600,
  } as React.CSSProperties,
  presetGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
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
    minHeight: '60px',
  } as React.CSSProperties,
  presetIcon: {
    fontSize: '24px',
    marginBottom: spacing.xs,
  } as React.CSSProperties,
  presetName: {
    fontSize: '9px',
    textAlign: 'center',
    lineHeight: '1.2',
  } as React.CSSProperties,
  divider: {
    height: '1px',
    backgroundColor: colors.border.primary,
    margin: `${spacing.xxl} 0`,
  } as React.CSSProperties,
  paramLabel: {
    ...typography.h3,
    color: colors.text.primary,
    fontWeight: 500,
    marginBottom: spacing.sm,
    display: 'block',
  } as React.CSSProperties,
  paramDescription: {
    ...typography.caption,
    color: colors.text.muted,
    marginBottom: spacing.md,
    lineHeight: '1.3',
  } as React.CSSProperties,
  blendModeSection: {
    marginTop: spacing.xl,
  } as React.CSSProperties,
  blendModeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: spacing.sm,
  } as React.CSSProperties,
  blendModeButton: {
    padding: spacing.md,
    border: '2px solid',
    borderRadius: effects.borderRadius.lg,
    cursor: 'pointer',
    transition: effects.transition.normal,
    fontWeight: 600,
    fontSize: '12px',
  } as React.CSSProperties,
  blendModeLabel: {
    display: 'block',
    textAlign: 'center',
    color: colors.text.primary,
  } as React.CSSProperties,
  labModeSection: {
    marginTop: spacing.xl,
  } as React.CSSProperties,
  toggleGroup: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: spacing.sm,
  } as React.CSSProperties,
  toggleButton: {
    padding: spacing.md,
    border: '2px solid',
    borderRadius: effects.borderRadius.lg,
    cursor: 'pointer',
    transition: effects.transition.normal,
    fontWeight: 600,
    fontSize: '12px',
    color: colors.text.primary,
  } as React.CSSProperties,
  colorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: spacing.md,
    marginTop: spacing.md,
  } as React.CSSProperties,
  toggleContainer: {
    marginBottom: spacing.lg,
  } as React.CSSProperties,
  toggleLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    ...typography.h3,
    color: colors.text.primary,
    cursor: 'pointer',
  } as React.CSSProperties,
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    accentColor: colors.accent.primary,
  } as React.CSSProperties,
  hueCyclingControls: {
    marginTop: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.bg.subtle,
    borderRadius: effects.borderRadius.md,
    border: '1px solid #3d2d5d',
  } as React.CSSProperties,
  infoBox: {
    padding: spacing.lg,
    backgroundColor: colors.bg.subtle,
    borderRadius: effects.borderRadius.md,
    border: '1px solid #3d2d5d',
    marginTop: spacing.xxl,
  } as React.CSSProperties,
  infoTitle: {
    ...typography.h3,
    color: colors.accent.light,
    marginBottom: spacing.md,
    fontWeight: 600,
    margin: `0 0 ${spacing.md} 0`,
  } as React.CSSProperties,
  infoText: {
    ...typography.caption,
    color: colors.text.secondary,
    lineHeight: '1.6',
    margin: 0,
  } as React.CSSProperties,
  infoList: {
    ...typography.caption,
    color: colors.text.secondary,
    lineHeight: '1.7',
    margin: 0,
    paddingLeft: '20px',
  } as React.CSSProperties,
};
