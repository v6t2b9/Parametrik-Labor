import { useMemo, useCallback, memo } from 'react';
import { useSimulationStore, resolveSpeciesParams } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';
import type { AgentType } from '../types';
import { colors, spacing, effects, createHeaderStyle, createSubtitleStyle } from '../design-system';
import { Section } from './ui/Section';
import { InfoBox } from './ui/InfoBox';

export const ResonanceOikosPanel = memo(function ResonanceOikosPanel() {
  const parameters = useSimulationStore((state) => state.parameters);
  const updateResonanceParams = useSimulationStore((state) => state.updateResonanceParams);
  const ui = useSimulationStore((state) => state.ui);

  const currentValues = useMemo(
    () => ui.activeSpeciesScope === 'universal'
      ? parameters.universal.resonance
      : resolveSpeciesParams(parameters, ui.activeSpeciesScope as AgentType).resonance,
    [ui.activeSpeciesScope, parameters]
  );

  const hasOverride = useCallback((param: keyof typeof currentValues) => {
    if (ui.activeSpeciesScope === 'universal') return false;
    const speciesOverride = parameters.species[ui.activeSpeciesScope as AgentType].resonance;
    return speciesOverride !== undefined && param in speciesOverride;
  }, [ui.activeSpeciesScope, parameters.species]);

  // Render species interaction controls
  const renderSpeciesInteractions = (species: 'red' | 'green' | 'blue') => {
    const speciesName = species.charAt(0).toUpperCase() + species.slice(1);
    const interactions = [
      { label: `${speciesName} → Red`, key: `${species}ToRed` as const, desc: `How ${species} agents respond to red trails` },
      { label: `${speciesName} → Green`, key: `${species}ToGreen` as const, desc: `How ${species} agents respond to green trails` },
      { label: `${speciesName} → Blue`, key: `${species}ToBlue` as const, desc: `How ${species} agents respond to blue trails` },
    ];

    return (
      <Section
        title={`${speciesName} Species Interactions`}
        description={`How ${species} agents respond to different species' pheromone trails · Positive = attraction, Negative = repulsion, 0 = neutral`}
      >
        {interactions.map(({ label, key, desc }) => (
          <ParameterSlider
            key={key}
            label={label}
            value={currentValues.interactionMatrix[key]}
            min={-2.0}
            max={2.0}
            step={0.1}
            onChange={(value) => updateResonanceParams({
              interactionMatrix: { [key]: value }
            })}
            description={desc}
            hasOverride={hasOverride('interactionMatrix')}
          />
        ))}

        <InfoBox>
          <p style={styles.infoText}>
            <strong>Interaction Examples:</strong>
            <br />
            • Set {speciesName}→Other to +1.5 for attraction (symbiosis)
            <br />
            • Set {speciesName}→Other to -1.0 for avoidance (competition)
            <br />
            • Keep {speciesName}→{speciesName} positive (e.g., +0.5) for clustering behavior
          </p>
        </InfoBox>
      </Section>
    );
  };

  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>Resonance</h3>
      <p style={styles.subtitle}>Cross-species interaction controls</p>

      {/* Universal Baseline Section - Only show in universal scope */}
      {ui.activeSpeciesScope === 'universal' && (
        <Section
          title="Universal Baseline Settings"
          description="Base attraction/repulsion values applied to all species interactions"
        >
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
                aria-label="Enable cross-species interaction"
              />
              <span>Cross-Species Interaction</span>
              {hasOverride('crossSpeciesInteraction') && <span style={styles.overrideBadge}>⚡</span>}
            </label>
            <p style={styles.checkboxDesc}>
              Enable agents to sense and respond to other species' trails
            </p>
          </div>
        </Section>
      )}

      {/* Species-Specific Interaction Controls */}
      {ui.activeSpeciesScope === 'red' && renderSpeciesInteractions('red')}
      {ui.activeSpeciesScope === 'green' && renderSpeciesInteractions('green')}
      {ui.activeSpeciesScope === 'blue' && renderSpeciesInteractions('blue')}
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
    overflowY: 'auto' as const,
  } as React.CSSProperties,
  title: {
    ...createHeaderStyle('h2'),
    marginBottom: spacing.xs,
  } as React.CSSProperties,
  subtitle: {
    ...createSubtitleStyle(),
    marginBottom: spacing.lg,
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
  overrideBadge: {
    fontSize: '12px',
    opacity: 0.7,
    marginLeft: spacing.xs,
  } as React.CSSProperties,
  checkboxDesc: {
    fontSize: '11px',
    color: colors.text.tertiary,
    marginTop: spacing.sm,
    marginLeft: '26px',
    lineHeight: '1.4',
  } as React.CSSProperties,
  infoText: {
    margin: 0,
  } as React.CSSProperties,
};
