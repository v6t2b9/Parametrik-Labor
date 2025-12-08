import { memo, useCallback } from 'react';
import { useSimulationStore } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';
import { ColorPicker } from './ColorPicker';
import { visualPresets, effectsPresets } from '../presets/tabPresets';
import { colors, spacing, typography, effects, createHeaderStyle, createSubtitleStyle } from '../design-system';
import { Section, Subsection } from './ui/Section';
import { ToggleGroup, type ToggleOption } from './ui/ToggleGroup';
import { PresetGrid } from './ui/PresetGrid';
import { Divider } from './ui/Divider';
import { HueCyclingSection } from './visuals/HueCyclingSection';
import type { VisualizationParams } from '../types';

export const VisualsOikosPanel = memo(function VisualsOikosPanel() {
  const visualization = useSimulationStore((state) => state.parameters.visualization);
  const effectsParams = useSimulationStore((state) => state.parameters.effects);
  const updateVisualizationParams = useSimulationStore((state) => state.updateVisualizationParams);
  const updateEffectsParams = useSimulationStore((state) => state.updateEffectsParams);

  // Memoized handlers for better performance
  const handleHueCyclingUpdate = useCallback(
    (updates: Partial<VisualizationParams['hueCycling']>) => {
      updateVisualizationParams({
        hueCycling: {
          enabled: visualization.hueCycling?.enabled ?? false,
          startHue: visualization.hueCycling?.startHue ?? 0,
          endHue: visualization.hueCycling?.endHue ?? 360,
          speed: visualization.hueCycling?.speed ?? 1.0,
          ...updates,
        },
      });
    },
    [updateVisualizationParams, visualization.hueCycling]
  );

  // Blend mode options
  const blendModeOptions: ToggleOption<VisualizationParams['blendMode']>[] = [
    { value: 'additive', label: 'Additive', description: 'Bright luminous mix, auto-normalized on overlap' },
    { value: 'average', label: 'Average', description: 'Soft balanced mix without oversaturation' },
    { value: 'multiply', label: 'Multiply', description: 'Darker mix with high contrast' },
    { value: 'screen', label: 'Screen', description: 'Bright soft combination for organic flows' },
  ];

  // Kaleidoscope presets
  const kaleidoscopePresets: ToggleOption<number>[] = [
    { value: 0, label: 'Off', description: 'No kaleidoscope effect' },
    { value: 4, label: '4 ✚', description: '4-way cross pattern' },
    { value: 6, label: '6 ❄️', description: '6-way snowflake pattern' },
    { value: 8, label: '8 🔮', description: '8-way mandala pattern' },
    { value: 12, label: '12 🕉️', description: '12-way complex mandala' },
    { value: 3, label: '3 △', description: '3-way triangle pattern' },
  ];

  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>Visuals & Effects</h3>
      <p style={styles.subtitle}>
        Complete visual control - from colors to post-processing effects
      </p>

      {/* Visual Presets */}
      <PresetGrid
        presets={visualPresets}
        onSelect={updateVisualizationParams}
        title="Visual Presets"
      />

      <Divider />

      {/* Effect Presets */}
      <PresetGrid
        presets={effectsPresets}
        onSelect={updateEffectsParams}
        title="Effect Presets"
      />

      <Divider />

      {/* Visual Parameters */}
      <Section title="Visual Parameters">
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

        {/* Blend Mode */}
        <ToggleGroup
          label="Blend Mode"
          description="How the three species colors are mixed together"
          options={blendModeOptions}
          value={visualization.blendMode}
          onChange={(mode) => updateVisualizationParams({ blendMode: mode })}
          columns={2}
        />

        {/* Show Agents Checkbox */}
        <div style={styles.toggleContainer}>
          <label style={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={visualization.showAgents}
              onChange={(e) => updateVisualizationParams({ showAgents: e.target.checked })}
              style={styles.checkbox}
              aria-label="Show agent markers on canvas"
            />
            <span>Show Agents</span>
          </label>
          <p style={styles.paramDescription}>
            Display agent markers on the canvas (dots or triangles showing position and direction)
          </p>
        </div>

        {/* Agent Display Type (only visible when agents are shown) */}
        {visualization.showAgents && (
          <ToggleGroup
            label="Agent Display Style"
            description="How agents are visualized on the canvas"
            options={[
              { value: 'dots', label: 'Dots', description: 'Simple circular dots' },
              { value: 'triangles', label: 'Triangles', description: 'Directional triangles showing movement orientation' },
            ]}
            value={visualization.useTriangles ? 'triangles' : 'dots'}
            onChange={(value) => updateVisualizationParams({ useTriangles: value === 'triangles' })}
          />
        )}
      </Section>

      <Divider />

      {/* Post-Processing Effects */}
      <Section title="Post-Processing Effects">
        {/* Blur & Glow */}
        <Subsection title="Blur & Glow">
          <ParameterSlider
            label="Blur"
            value={effectsParams.blur}
            min={0}
            max={20}
            step={0.5}
            onChange={(value) => updateEffectsParams({ blur: value })}
            description="Gaussian blur radius (px) - creates softer, dreamier visuals"
          />
        </Subsection>

        {/* Better Bloom (Professional) */}
        <Subsection title="Better Bloom (Professional Multi-Pass)">
          <ParameterSlider
            label="Bloom Intensity"
            value={effectsParams.bloomIntensity}
            min={0}
            max={2}
            step={0.05}
            onChange={(value) => updateEffectsParams({ bloomIntensity: value })}
            description="Bloom strength (0 = off, 1 = normal, 2 = extreme) - professional quality glow"
          />
          {effectsParams.bloomIntensity > 0 && (
            <>
              <ParameterSlider
                label="Bloom Threshold"
                value={effectsParams.bloomThreshold}
                min={0}
                max={1}
                step={0.05}
                onChange={(value) => updateEffectsParams({ bloomThreshold: value })}
                description="Brightness threshold (0 = all pixels glow, 0.7 = only bright pixels glow)"
              />
              <ParameterSlider
                label="Bloom Radius"
                value={effectsParams.bloomRadius}
                min={1}
                max={10}
                step={1}
                onChange={(value) => updateEffectsParams({ bloomRadius: value })}
                description="Glow spread/softness (1 = tight, 4 = balanced, 10 = very wide & soft)"
              />
            </>
          )}
        </Subsection>

        {/* Color Grading */}
        <Subsection title="Color Grading">
          <ParameterSlider
            label="Saturation"
            value={effectsParams.saturation}
            min={0}
            max={3}
            step={0.1}
            onChange={(value) => updateEffectsParams({ saturation: value })}
            description="Color intensity (1.0 = normal, <1 = desaturated, >1 = vivid)"
          />
          <ParameterSlider
            label="Contrast"
            value={effectsParams.contrast}
            min={0}
            max={3}
            step={0.05}
            onChange={(value) => updateEffectsParams({ contrast: value })}
            description="Contrast adjustment (1.0 = normal, <1 = flat, >1 = punchy)"
          />
          <ParameterSlider
            label="Hue Shift"
            value={effectsParams.hueShift}
            min={0}
            max={360}
            step={5}
            onChange={(value) => updateEffectsParams({ hueShift: value })}
            description="Hue rotation in degrees (0-360) - cycles through the color spectrum"
          />
        </Subsection>

        {/* Motion & Trails */}
        <Subsection title="Motion & Trails">
          <ParameterSlider
            label="Motion Blur"
            value={effectsParams.motionBlur}
            min={0}
            max={0.95}
            step={0.05}
            onChange={(value) => updateEffectsParams({ motionBlur: value })}
            description="Frame persistence / ghosting - higher values create longer trails and fluid motion"
          />
        </Subsection>

        {/* Atmospheric */}
        <Subsection title="Atmospheric">
          <ParameterSlider
            label="Vignette"
            value={effectsParams.vignette}
            min={0}
            max={1}
            step={0.05}
            onChange={(value) => updateEffectsParams({ vignette: value })}
            description="Edge darkening - focuses attention on the center of the canvas"
          />
        </Subsection>

        {/* Feedback / Echo (Recursive Rendering) */}
        <Subsection title="Feedback / Echo (Recursive Rendering)">
          <ParameterSlider
            label="Feedback Amount"
            value={effectsParams.feedbackAmount}
            min={0}
            max={0.98}
            step={0.01}
            onChange={(value) => updateEffectsParams({ feedbackAmount: value })}
            description="Frame persistence for echo effect (0 = off, 0.85+ = infinite trails, 0.95 = psychedelic spirals)"
          />
          {effectsParams.feedbackAmount > 0 && (
            <>
              <ParameterSlider
                label="Zoom"
                value={effectsParams.feedbackZoom}
                min={0.95}
                max={1.05}
                step={0.001}
                onChange={(value) => updateEffectsParams({ feedbackZoom: value })}
                description="Zoom in/out each frame (1.0 = none, >1 = zoom in, <1 = zoom out) - creates spirals"
              />
              <ParameterSlider
                label="Rotation"
                value={effectsParams.feedbackRotation}
                min={-5}
                max={5}
                step={0.1}
                onChange={(value) => updateEffectsParams({ feedbackRotation: value })}
                description="Rotation per frame in degrees (0 = none) - creates spinning spirals"
              />
              <ParameterSlider
                label="Offset X"
                value={effectsParams.feedbackOffsetX}
                min={-10}
                max={10}
                step={0.5}
                onChange={(value) => updateEffectsParams({ feedbackOffsetX: value })}
                description="Horizontal shift per frame in pixels - creates horizontal drift"
              />
              <ParameterSlider
                label="Offset Y"
                value={effectsParams.feedbackOffsetY}
                min={-10}
                max={10}
                step={0.5}
                onChange={(value) => updateEffectsParams({ feedbackOffsetY: value })}
                description="Vertical shift per frame in pixels - creates vertical drift"
              />
            </>
          )}
        </Subsection>

        {/* Kaleidoscope (Radial Mirroring) */}
        <Subsection title="Kaleidoscope (Radial Mirroring)">
          {/* Quick Presets for Mandala Effects */}
          <ToggleGroup
            label="Quick Presets"
            options={kaleidoscopePresets}
            value={effectsParams.kaleidoscopeSegments}
            onChange={(segments) => updateEffectsParams({ kaleidoscopeSegments: segments })}
            columns={3}
          />

          <ParameterSlider
            label="Segments (Fine Control)"
            value={effectsParams.kaleidoscopeSegments}
            min={0}
            max={12}
            step={1}
            onChange={(value) => updateEffectsParams({ kaleidoscopeSegments: value })}
            description="Precise segment count (0 = off, 2-12 = radial mirror segments)"
          />
          {effectsParams.kaleidoscopeSegments >= 2 && (
            <>
              <ParameterSlider
                label="Rotation"
                value={effectsParams.kaleidoscopeRotation}
                min={0}
                max={360}
                step={1}
                onChange={(value) => updateEffectsParams({ kaleidoscopeRotation: value })}
                description="Rotation offset in degrees - rotates the entire kaleidoscope pattern"
              />
              <ParameterSlider
                label="Zoom"
                value={effectsParams.kaleidoscopeZoom}
                min={0.5}
                max={2.0}
                step={0.05}
                onChange={(value) => updateEffectsParams({ kaleidoscopeZoom: value })}
                description="Zoom level (1.0 = normal, <1 = zoom out reveals more, >1 = zoom in for detail)"
              />
            </>
          )}
        </Subsection>

        {/* Radial Blur (Tunnel/Explosion) */}
        <Subsection title="Radial Blur (Tunnel/Explosion)">
          <ParameterSlider
            label="Strength"
            value={effectsParams.radialBlurStrength}
            min={0}
            max={1}
            step={0.05}
            onChange={(value) => updateEffectsParams({ radialBlurStrength: value })}
            description="Blur intensity (0 = off, 0.3 = subtle motion, 0.7+ = extreme tunnel/explosion effect)"
          />
          {effectsParams.radialBlurStrength > 0 && (
            <>
              <ParameterSlider
                label="Center X"
                value={effectsParams.radialBlurCenterX}
                min={0}
                max={1}
                step={0.05}
                onChange={(value) => updateEffectsParams({ radialBlurCenterX: value })}
                description="Horizontal center position (0 = left, 0.5 = middle, 1 = right)"
              />
              <ParameterSlider
                label="Center Y"
                value={effectsParams.radialBlurCenterY}
                min={0}
                max={1}
                step={0.05}
                onChange={(value) => updateEffectsParams({ radialBlurCenterY: value })}
                description="Vertical center position (0 = top, 0.5 = middle, 1 = bottom)"
              />
              <ParameterSlider
                label="Quality"
                value={effectsParams.radialBlurQuality}
                min={2}
                max={10}
                step={1}
                onChange={(value) => updateEffectsParams({ radialBlurQuality: value })}
                description="Number of samples (2 = fast/rough, 6 = balanced, 10 = smooth/slow)"
              />
            </>
          )}
        </Subsection>

        {/* Psychedelic / Distortion */}
        <Subsection title="Psychedelic / Distortion">
          <ParameterSlider
            label="Chromatic Aberration"
            value={effectsParams.chromaticAberration}
            min={0}
            max={15}
            step={0.5}
            onChange={(value) => updateEffectsParams({ chromaticAberration: value })}
            description="RGB channel offset (px) - creates retro glitch or CRT-style effects"
          />
        </Subsection>

        {/* Retro / Lo-Fi */}
        <Subsection title="Retro / Lo-Fi">
          <ParameterSlider
            label="Scanlines"
            value={effectsParams.scanlines}
            min={0}
            max={1}
            step={0.05}
            onChange={(value) => updateEffectsParams({ scanlines: value })}
            description="CRT scanline effect strength - perfect for Matrix/retro aesthetic"
          />
          <ParameterSlider
            label="Pixelation"
            value={effectsParams.pixelation}
            min={1}
            max={16}
            step={1}
            onChange={(value) => updateEffectsParams({ pixelation: value })}
            description="Pixel/block size - 1 = none, higher values create retro pixelated look"
          />
        </Subsection>
      </Section>

      <Divider />

      {/* Color Channels */}
      <Section
        title="Color Channels"
        description="Customize the colors for each species and background (visual only, doesn't affect simulation)"
      >
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
      </Section>

      <Divider />

      {/* Hue Cycling */}
      <HueCyclingSection
        hueCycling={visualization.hueCycling}
        onUpdate={handleHueCyclingUpdate}
      />

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
          <li><strong>Feedback 0.90-0.95</strong> + small <strong>Rotation</strong> (0.2-1°) = spinning spirals</li>
          <li><strong>Feedback 0.85+</strong> + <strong>Zoom 1.002</strong> = infinite zoom tunnel</li>
          <li><strong>Feedback 0.92+</strong> + <strong>Offset X/Y</strong> = drifting echoes</li>
          <li><strong>Kaleidoscope 6 segments</strong> = snowflake patterns, <strong>8 segments</strong> = mandala</li>
          <li><strong>Kaleidoscope + Feedback</strong> = infinite recursive mandalas (psychedelic!)</li>
          <li><strong>Kaleidoscope + Hue Cycling</strong> = rainbow mandalas with color shifts</li>
          <li><strong>Radial Blur 0.3-0.5</strong> = subtle motion, <strong>0.7+</strong> = extreme tunnel effect</li>
          <li><strong>Radial Blur + Feedback</strong> = explosive recursive spirals from center</li>
          <li><strong>Radial Blur off-center</strong> (Center X/Y ≠ 0.5) = asymmetric motion blur</li>
          <li><strong>Better Bloom Threshold 0.7</strong> = only bright areas glow (film-like), <strong>0.3</strong> = more glow</li>
          <li><strong>Better Bloom Radius 4-6</strong> = balanced cinematic glow, <strong>8-10</strong> = very soft & wide</li>
          <li><strong>Better Bloom + High Brightness</strong> = AAA game quality glow on bright trails</li>
          <li><strong>Mirror Horizontal 0.5</strong> = perfect left-right symmetry (Rorschach test)</li>
          <li><strong>Mirror Vertical 0.3-0.7</strong> = off-center landscape reflections</li>
          <li><strong>Mirror Quad</strong> = instant 4-way symmetry (snowflakes, mandalas)</li>
          <li><strong>Mirror + Kaleidoscope</strong> = complex geometric patterns (combine both!)</li>
        </ul>
      </div>
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
    fontSize: '18px',
    marginBottom: spacing.xs,
  } as React.CSSProperties,
  subtitle: {
    ...createSubtitleStyle(),
    fontSize: '12px',
    marginBottom: spacing.xxl,
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
    fontSize: '13px',
    color: colors.text.primary,
    cursor: 'pointer',
    fontWeight: 500,
  } as React.CSSProperties,
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    accentColor: colors.accent.primary,
  } as React.CSSProperties,
  paramDescription: {
    ...typography.caption,
    color: colors.text.muted,
    marginBottom: 0,
    lineHeight: '1.3',
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
  infoList: {
    ...typography.caption,
    color: colors.text.secondary,
    lineHeight: '1.7',
    margin: 0,
    paddingLeft: '20px',
  } as React.CSSProperties,
};
