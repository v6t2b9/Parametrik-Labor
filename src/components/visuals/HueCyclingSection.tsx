import { memo, useCallback } from 'react';
import { ParameterSlider } from '../ParameterSlider';
import { Section } from '../ui/Section';
import type { VisualizationParams } from '../../types';
import { colors, spacing, effects } from '../../design-system';

interface HueCyclingSectionProps {
  hueCycling: VisualizationParams['hueCycling'];
  onUpdate: (updates: Partial<VisualizationParams['hueCycling']>) => void;
}

/**
 * Extracted Hue Cycling section with cleaner update logic
 */
export const HueCyclingSection = memo(function HueCyclingSection({
  hueCycling,
  onUpdate,
}: HueCyclingSectionProps) {
  const enabled = hueCycling?.enabled ?? false;
  const startHue = hueCycling?.startHue ?? 0;
  const endHue = hueCycling?.endHue ?? 360;
  const speed = hueCycling?.speed ?? 1.0;

  // Cleaner update handler - only updates changed values
  const handleToggle = useCallback((checked: boolean) => {
    onUpdate({ enabled: checked });
  }, [onUpdate]);

  const handleStartHue = useCallback((value: number) => {
    onUpdate({ startHue: value });
  }, [onUpdate]);

  const handleEndHue = useCallback((value: number) => {
    onUpdate({ endHue: value });
  }, [onUpdate]);

  const handleSpeed = useCallback((value: number) => {
    onUpdate({ speed: value });
  }, [onUpdate]);

  return (
    <Section
      title="Hue Cycling"
      description="Automatic color transitions for flowing animations. Enable cycling and configure the hue range and speed."
    >
      {/* Enable Toggle */}
      <div style={styles.toggleContainer}>
        <label style={styles.toggleLabel}>
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => handleToggle(e.target.checked)}
            style={styles.checkbox}
            aria-label="Enable Hue Cycling"
          />
          <span>Enable Hue Cycling</span>
        </label>
      </div>

      {/* Hue Cycling Controls (only shown when enabled) */}
      {enabled && (
        <div style={styles.controls}>
          <ParameterSlider
            label="Start Hue"
            value={startHue}
            min={0}
            max={360}
            step={1}
            onChange={handleStartHue}
            description="Starting hue (0-360° on color wheel)"
          />

          <ParameterSlider
            label="End Hue"
            value={endHue}
            min={0}
            max={360}
            step={1}
            onChange={handleEndHue}
            description="Ending hue (0-360° on color wheel)"
          />

          <ParameterSlider
            label="Cycle Speed"
            value={speed}
            min={0.1}
            max={10.0}
            step={0.1}
            onChange={handleSpeed}
            description="Transition speed (lower = slower, smoother)"
          />

          <div style={styles.infoBox}>
            <p style={styles.infoText}>
              <strong>Hue Wheel Reference:</strong> The hue value oscillates between start and end points.
              <br />
              • <strong>0° = Red</strong>, 60° = Yellow, 120° = Green, 180° = Cyan, 240° = Blue, 300° = Magenta, 360° = Red
              <br />
              • Small ranges (e.g., 0-60°) create subtle shifts
              <br />
              • Large ranges (e.g., 0-360°) cycle through the full rainbow
            </p>
          </div>
        </div>
      )}
    </Section>
  );
});

const styles = {
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
  controls: {
    marginTop: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.bg.subtle,
    borderRadius: effects.borderRadius.md,
    border: '1px solid #3d2d5d',
  } as React.CSSProperties,
  infoBox: {
    padding: spacing.md,
    backgroundColor: colors.bg.secondary,
    borderRadius: effects.borderRadius.sm,
    border: '1px solid #3d2d5d',
    marginTop: spacing.lg,
  } as React.CSSProperties,
  infoText: {
    fontSize: '11px',
    color: colors.text.secondary,
    lineHeight: '1.6',
    margin: 0,
  } as React.CSSProperties,
};
