/**
 * Ecosystem Oikos Panel
 * Controls for the multi-species ecosystem mode
 */

import { useSimulationStore } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';
import type { EcologyConfig } from '../types/ecosystem';
import { colors, spacing, typography, effects, createHeaderStyle, createSubtitleStyle } from '../design-system';

export function EcosystemOikosPanel() {
  const { parameters, setParameters } = useSimulationStore();
  const ecosystemMode = parameters.ecosystemMode || false;
  const ecosystem = parameters.ecosystem;

  const handleToggleEcosystem = () => {
    setParameters({
      ecosystemMode: !ecosystemMode,
    });
  };

  const handleUpdateEcosystem = (updates: Partial<EcologyConfig>) => {
    if (!ecosystem) return;
    setParameters({
      ecosystem: {
        ...ecosystem,
        ...updates,
      } as EcologyConfig,
    });
  };

  if (!ecosystem) {
    return (
      <div style={styles.panel}>
        <h2 style={styles.title}>
          Ecosystem
        </h2>
        <p style={styles.text}>
          Ecosystem configuration not initialized. Enable ecosystem mode to configure.
        </p>
        <button onClick={handleToggleEcosystem} style={styles.enableButton}>
          Enable Ecosystem Mode
        </button>
      </div>
    );
  }

  return (
    <div style={styles.panel}>
      <h2 style={styles.title}>
        Ecosystem
      </h2>

      <p style={styles.subtitle}>
        Multi-species ecosystem controls
      </p>

      {/* Ecosystem Mode Toggle */}
      <div style={{ marginBottom: spacing.xxxl }}>
        <button
          onClick={handleToggleEcosystem}
          style={{
            ...styles.toggleButton,
            backgroundColor: ecosystemMode ? '#66bb6a' : colors.bg.tertiary,
            color: ecosystemMode ? '#000' : colors.text.primary,
            border: ecosystemMode ? '2px solid #66bb6a' : `1px solid ${colors.border.primary}`,
          }}
        >
          {ecosystemMode ? 'Ecosystem Mode Active' : 'Enable Ecosystem Mode'}
        </button>
        {ecosystemMode && (
          <p style={styles.activeNote}>
            Agents now consume crystals for energy and reproduce
          </p>
        )}
      </div>

      {/* Crystal Settings */}
      <div style={{ marginBottom: '25px' }}>
        <h3 style={styles.sectionTitle}>
          Crystal Settings
        </h3>

        <ParameterSlider
          label="Initial Energy"
          value={ecosystem.crystalEnergyStart}
          min={0.1}
          max={1.0}
          step={0.05}
          onChange={(val) =>
            handleUpdateEcosystem({ crystalEnergyStart: val })
          }
          description="Starting energy level for newly formed crystals"
        />

        <ParameterSlider
          label="Decay Rate"
          value={ecosystem.crystalDecayRate}
          min={0.0001}
          max={0.01}
          step={0.0001}
          onChange={(val) => handleUpdateEcosystem({ crystalDecayRate: val })}
          description="How fast crystals lose energy over time"
        />

        <ParameterSlider
          label="Formation Threshold"
          value={ecosystem.crystalFormationThreshold}
          min={50}
          max={250}
          step={10}
          onChange={(val) =>
            handleUpdateEcosystem({ crystalFormationThreshold: val })
          }
          description="Pheromone level required to form crystals"
        />
      </div>

      {/* Population Settings */}
      <div style={{ marginBottom: '25px' }}>
        <h3 style={styles.sectionTitle}>
          Population Settings
        </h3>

        <ParameterSlider
          label="Max Population"
          value={ecosystem.population.maxPopulation}
          min={50}
          max={500}
          step={10}
          onChange={(val) =>
            handleUpdateEcosystem({
              population: {
                ...ecosystem.population,
                maxPopulation: val,
              },
            })
          }
          description="Maximum total number of agents across all species"
        />

        <div style={styles.infoBox}>
          <div style={{ marginBottom: '6px', fontWeight: 'bold' }}>
            Initial Population:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            <div>Builder: {ecosystem.population.initialPopulation.builder}</div>
            <div>Harvester: {ecosystem.population.initialPopulation.harvester}</div>
            <div>Consumer: {ecosystem.population.initialPopulation.consumer}</div>
            <div>Decomposer: {ecosystem.population.initialPopulation.decomposer}</div>
            <div>Scout: {ecosystem.population.initialPopulation.scout}</div>
          </div>
        </div>
      </div>

      {/* Audio-Ecology Mapping */}
      <div style={{ marginBottom: '25px' }}>
        <h3 style={styles.sectionTitle}>
          Audio-Ecology Mapping
        </h3>

        <ParameterSlider
          label="Boost Strength"
          value={ecosystem.audioEcology.boostStrength}
          min={0}
          max={3}
          step={0.1}
          onChange={(val) =>
            handleUpdateEcosystem({
              audioEcology: {
                ...ecosystem.audioEcology,
                boostStrength: val,
              },
            })
          }
          description="How strongly audio features influence species activity"
        />

        <div style={styles.infoBox}>
          <div style={{ marginBottom: '6px', fontWeight: 'bold' }}>
            Audio Feature → Species Mapping:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div>
              <strong>Bass</strong> → {ecosystem.audioEcology.bassBoosts.join(', ')}
            </div>
            <div>
              <strong>Mids</strong> → {ecosystem.audioEcology.midBoosts.join(', ')}
            </div>
            <div>
              <strong>Highs</strong> →{' '}
              {ecosystem.audioEcology.highBoosts.join(', ')}
            </div>
            <div>
              <strong>Beats</strong> →{' '}
              {ecosystem.audioEcology.transientBoosts.join(', ')}
            </div>
          </div>
        </div>
      </div>

      {/* Species Info */}
      <div style={styles.speciesBox}>
        <div style={{ ...typography.h3, marginBottom: spacing.sm, fontWeight: 'bold' }}>
          Species Roles:
        </div>
        <div style={styles.speciesText}>
          <div style={{ marginBottom: '4px' }}>
            <strong style={{ color: 'rgb(255, 150, 50)' }}>Builder:</strong> Creates structures (eats food → builds)
          </div>
          <div style={{ marginBottom: '4px' }}>
            <strong style={{ color: 'rgb(100, 255, 150)' }}>Harvester:</strong> Converts resources (eats build → food)
          </div>
          <div style={{ marginBottom: '4px' }}>
            <strong style={{ color: 'rgb(255, 100, 255)' }}>Consumer:</strong> Hunts food (eats food → marks territory)
          </div>
          <div style={{ marginBottom: '4px' }}>
            <strong style={{ color: 'rgb(150, 100, 200)' }}>Decomposer:</strong> Recycles all (eats all → explores)
          </div>
          <div>
            <strong style={{ color: 'rgb(100, 200, 255)' }}>Scout:</strong> Explores territory (fast, marks paths)
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  panel: {
    padding: spacing.xl,
    backgroundColor: colors.bg.secondary,
    color: colors.text.primary,
    maxHeight: '80vh',
    overflowY: 'auto',
  } as React.CSSProperties,
  title: {
    ...createHeaderStyle('h1'),
    marginBottom: spacing.md,
    color: '#4fc3f7',
  } as React.CSSProperties,
  subtitle: {
    ...createSubtitleStyle(),
    marginBottom: spacing.xl,
    color: colors.text.secondary,
    lineHeight: '1.6',
  } as React.CSSProperties,
  text: {
    color: colors.text.secondary,
    marginBottom: spacing.xl,
  } as React.CSSProperties,
  enableButton: {
    padding: `${spacing.md} ${spacing.xxl}`,
    backgroundColor: '#4fc3f7',
    color: '#000',
    border: 'none',
    borderRadius: effects.borderRadius.lg,
    cursor: 'pointer',
    ...typography.h3,
    fontWeight: 'bold',
  } as React.CSSProperties,
  toggleButton: {
    padding: `${spacing.md} ${spacing.xxl}`,
    borderRadius: effects.borderRadius.lg,
    cursor: 'pointer',
    ...typography.h3,
    fontWeight: 'bold',
    width: '100%',
  } as React.CSSProperties,
  activeNote: {
    ...typography.caption,
    color: colors.text.tertiary,
    marginTop: spacing.sm,
    fontStyle: 'italic',
  } as React.CSSProperties,
  sectionTitle: {
    ...createHeaderStyle('h2'),
    marginBottom: spacing.md,
    color: '#90caf9',
  } as React.CSSProperties,
  infoBox: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.bg.tertiary,
    borderRadius: effects.borderRadius.md,
    ...typography.caption,
    color: colors.text.secondary,
  } as React.CSSProperties,
  speciesBox: {
    padding: spacing.md,
    backgroundColor: colors.bg.tertiary,
    borderRadius: effects.borderRadius.md,
    border: `1px solid ${colors.border.primary}`,
  } as React.CSSProperties,
  speciesText: {
    fontSize: '11px',
    color: colors.text.tertiary,
    lineHeight: '1.6',
  } as React.CSSProperties,
};
