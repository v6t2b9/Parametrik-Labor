import { memo } from 'react';
import { useSimulationStore, resolveSpeciesParams } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';
import type { AgentType } from '../types';
import { colors, spacing, typography, effects, createHeaderStyle, createSubtitleStyle } from '../design-system';

export const ResonanceOikosPanel = memo(function ResonanceOikosPanel() {
  const parameters = useSimulationStore((state) => state.parameters);
  const updateResonanceParams = useSimulationStore((state) => state.updateResonanceParams);
  const ui = useSimulationStore((state) => state.ui);

  const currentValues = ui.activeSpeciesScope === 'universal'
    ? parameters.universal.resonance
    : resolveSpeciesParams(parameters, ui.activeSpeciesScope as AgentType).resonance;

  const hasOverride = (param: keyof typeof currentValues) => {
    if (ui.activeSpeciesScope === 'universal') return false;
    const speciesOverride = parameters.species[ui.activeSpeciesScope as AgentType].resonance;
    return speciesOverride !== undefined && param in speciesOverride;
  };

  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>Resonance</h3>
      <p style={styles.subtitle}>Cross-species interaction controls</p>

      {/* Universal Baseline Section - Only show in universal scope */}
      {ui.activeSpeciesScope === 'universal' && (
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Universal Baseline Settings</h4>
          <p style={styles.sectionDescription}>
            Base attraction/repulsion values applied to all species interactions
          </p>

          <ParameterSlider
            label="Attraction Strength"
            value={currentValues.attractionStrength}
            min={-2.0}
            max={2.0}
            step={0.1}
            onChange={(value) => updateResonanceParams({ attractionStrength: value })}
            description="Same-type trail following · Positive = clustering · Range: -2.0 to 2.0"
            hasOverride={hasOverride('attractionStrength')}
          />

          <ParameterSlider
            label="Repulsion Strength"
            value={currentValues.repulsionStrength}
            min={-2.0}
            max={2.0}
            step={0.1}
            onChange={(value) => updateResonanceParams({ repulsionStrength: value })}
            description="Cross-type influence · Negative = avoidance · Range: -2.0 to 2.0"
            hasOverride={hasOverride('repulsionStrength')}
          />

          <div style={styles.checkboxContainer}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={currentValues.crossSpeciesInteraction}
                onChange={(e) =>
                  updateResonanceParams({ crossSpeciesInteraction: e.target.checked })
                }
                style={styles.checkbox}
              />
              <span>Cross-Species Interaction</span>
              {hasOverride('crossSpeciesInteraction') && <span style={styles.overrideBadge}>⚡</span>}
            </label>
            <p style={styles.checkboxDesc}>
              Enable agents to sense and respond to other species' trails
            </p>
          </div>
        </div>
      )}

      {/* Species-Specific Interaction Controls - Only show for specific species */}
      {ui.activeSpeciesScope === 'red' && (
        <div style={styles.matrixSection}>
          <h4 style={styles.sectionTitle}>Red Species Interactions</h4>
          <p style={styles.sectionDescription}>
            How red agents respond to different species' pheromone trails
            <br />
            Positive values = attraction, Negative values = repulsion, 0 = neutral
          </p>

          <ParameterSlider
            label="Red → Red"
            value={currentValues.interactionMatrix.redToRed}
            min={-2.0}
            max={2.0}
            step={0.1}
            onChange={(value) => updateResonanceParams({
              interactionMatrix: { ...currentValues.interactionMatrix, redToRed: value }
            })}
            description="How red agents respond to red trails"
            hasOverride={hasOverride('interactionMatrix')}
          />
          <ParameterSlider
            label="Red → Green"
            value={currentValues.interactionMatrix.redToGreen}
            min={-2.0}
            max={2.0}
            step={0.1}
            onChange={(value) => updateResonanceParams({
              interactionMatrix: { ...currentValues.interactionMatrix, redToGreen: value }
            })}
            description="How red agents respond to green trails"
            hasOverride={hasOverride('interactionMatrix')}
          />
          <ParameterSlider
            label="Red → Blue"
            value={currentValues.interactionMatrix.redToBlue}
            min={-2.0}
            max={2.0}
            step={0.1}
            onChange={(value) => updateResonanceParams({
              interactionMatrix: { ...currentValues.interactionMatrix, redToBlue: value }
            })}
            description="How red agents respond to blue trails"
            hasOverride={hasOverride('interactionMatrix')}
          />

          <div style={styles.infoBox}>
            <p style={styles.infoText}>
              <strong>Interaction Examples:</strong>
              <br />
              • Set Red→Green to +1.5 for attraction to green trails (symbiosis)
              <br />
              • Set Red→Blue to -1.0 to avoid blue trails (competition)
              <br />
              • Keep Red→Red positive (e.g., +0.5) for clustering behavior
            </p>
          </div>
        </div>
      )}

      {ui.activeSpeciesScope === 'green' && (
        <div style={styles.matrixSection}>
          <h4 style={styles.sectionTitle}>Green Species Interactions</h4>
          <p style={styles.sectionDescription}>
            How green agents respond to different species' pheromone trails
            <br />
            Positive values = attraction, Negative values = repulsion, 0 = neutral
          </p>

          <ParameterSlider
            label="Green → Red"
            value={currentValues.interactionMatrix.greenToRed}
            min={-2.0}
            max={2.0}
            step={0.1}
            onChange={(value) => updateResonanceParams({
              interactionMatrix: { ...currentValues.interactionMatrix, greenToRed: value }
            })}
            description="How green agents respond to red trails"
            hasOverride={hasOverride('interactionMatrix')}
          />
          <ParameterSlider
            label="Green → Green"
            value={currentValues.interactionMatrix.greenToGreen}
            min={-2.0}
            max={2.0}
            step={0.1}
            onChange={(value) => updateResonanceParams({
              interactionMatrix: { ...currentValues.interactionMatrix, greenToGreen: value }
            })}
            description="How green agents respond to green trails"
            hasOverride={hasOverride('interactionMatrix')}
          />
          <ParameterSlider
            label="Green → Blue"
            value={currentValues.interactionMatrix.greenToBlue}
            min={-2.0}
            max={2.0}
            step={0.1}
            onChange={(value) => updateResonanceParams({
              interactionMatrix: { ...currentValues.interactionMatrix, greenToBlue: value }
            })}
            description="How green agents respond to blue trails"
            hasOverride={hasOverride('interactionMatrix')}
          />

          <div style={styles.infoBox}>
            <p style={styles.infoText}>
              <strong>Interaction Examples:</strong>
              <br />
              • Set Green→Red to +1.5 for attraction to red trails (symbiosis)
              <br />
              • Set Green→Blue to -1.0 to avoid blue trails (competition)
              <br />
              • Keep Green→Green positive (e.g., +0.5) for clustering behavior
            </p>
          </div>
        </div>
      )}

      {ui.activeSpeciesScope === 'blue' && (
        <div style={styles.matrixSection}>
          <h4 style={styles.sectionTitle}>Blue Species Interactions</h4>
          <p style={styles.sectionDescription}>
            How blue agents respond to different species' pheromone trails
            <br />
            Positive values = attraction, Negative values = repulsion, 0 = neutral
          </p>

          <ParameterSlider
            label="Blue → Red"
            value={currentValues.interactionMatrix.blueToRed}
            min={-2.0}
            max={2.0}
            step={0.1}
            onChange={(value) => updateResonanceParams({
              interactionMatrix: { ...currentValues.interactionMatrix, blueToRed: value }
            })}
            description="How blue agents respond to red trails"
            hasOverride={hasOverride('interactionMatrix')}
          />
          <ParameterSlider
            label="Blue → Green"
            value={currentValues.interactionMatrix.blueToGreen}
            min={-2.0}
            max={2.0}
            step={0.1}
            onChange={(value) => updateResonanceParams({
              interactionMatrix: { ...currentValues.interactionMatrix, blueToGreen: value }
            })}
            description="How blue agents respond to green trails"
            hasOverride={hasOverride('interactionMatrix')}
          />
          <ParameterSlider
            label="Blue → Blue"
            value={currentValues.interactionMatrix.blueToBlue}
            min={-2.0}
            max={2.0}
            step={0.1}
            onChange={(value) => updateResonanceParams({
              interactionMatrix: { ...currentValues.interactionMatrix, blueToBlue: value }
            })}
            description="How blue agents respond to blue trails"
            hasOverride={hasOverride('interactionMatrix')}
          />

          <div style={styles.infoBox}>
            <p style={styles.infoText}>
              <strong>Interaction Examples:</strong>
              <br />
              • Set Blue→Red to +1.5 for attraction to red trails (symbiosis)
              <br />
              • Set Blue→Green to -1.0 to avoid green trails (competition)
              <br />
              • Keep Blue→Blue positive (e.g., +0.5) for clustering behavior
            </p>
          </div>
        </div>
      )}
    </div>
  );
});

const styles = {
  panel: {
    padding: spacing.lg,
    backgroundColor: colors.bg.secondary,
    borderRadius: effects.borderRadius.md,
    border: `1px solid ${colors.border.primary}`,
    maxHeight: '80vh',
    overflowY: 'auto',
  } as React.CSSProperties,
  title: {
    ...createHeaderStyle('h2'),
    marginBottom: spacing.xs,
  } as React.CSSProperties,
  subtitle: {
    ...createSubtitleStyle(),
    marginBottom: spacing.lg,
  } as React.CSSProperties,
  section: {
    marginBottom: spacing.lg,
  } as React.CSSProperties,
  sectionTitle: {
    ...createHeaderStyle('h3'),
    color: colors.accent.light,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  } as React.CSSProperties,
  sectionDescription: {
    ...typography.caption,
    color: colors.text.muted,
    marginBottom: spacing.md,
    lineHeight: '1.4',
  } as React.CSSProperties,
  divider: {
    height: '1px',
    backgroundColor: colors.border.primary,
    margin: `${spacing.xl} 0`,
  } as React.CSSProperties,
  matrixSection: {
    marginTop: spacing.xl,
  } as React.CSSProperties,
  speciesBlock: {
    marginBottom: spacing.xxl,
    padding: spacing.lg,
    backgroundColor: colors.bg.subtle,
    borderRadius: effects.borderRadius.lg,
    border: `1px solid ${colors.border.primary}`,
  } as React.CSSProperties,
  speciesTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.md,
    margin: `0 0 ${spacing.md} 0`,
  } as React.CSSProperties,
  checkboxContainer: {
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.bg.subtle,
    borderRadius: effects.borderRadius.md,
  } as React.CSSProperties,
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    fontSize: typography.h3.fontSize,
    color: colors.text.primary,
    cursor: 'pointer',
  } as React.CSSProperties,
  checkbox: {
    marginRight: spacing.xs,
    cursor: 'pointer',
    width: '18px',
    height: '18px',
  } as React.CSSProperties,
  overrideBadge: {
    fontSize: '12px',
    opacity: 0.7,
    marginLeft: spacing.xs,
  } as React.CSSProperties,
  checkboxDesc: {
    ...typography.caption,
    color: colors.text.tertiary,
    marginTop: spacing.sm,
    marginLeft: '26px',
    lineHeight: '1.4',
  } as React.CSSProperties,
  infoBox: {
    padding: spacing.md,
    backgroundColor: colors.bg.subtle,
    borderRadius: effects.borderRadius.md,
    border: '1px solid #3d2d5d',
    marginTop: spacing.lg,
  } as React.CSSProperties,
  infoText: {
    ...typography.caption,
    color: colors.text.secondary,
    lineHeight: '1.6',
    margin: 0,
  } as React.CSSProperties,
};
