import { useSimulationStore, resolveSpeciesParams } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';
import type { AgentType } from '../types';

export function ResonanceOikosPanel() {
  const { parameters, updateResonanceParams, ui } = useSimulationStore();

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
      <h3 style={styles.title}>🔗 Resonance Oikos</h3>
      <p style={styles.subtitle}>Inter-system relations and cross-species dynamics</p>

      <ParameterSlider
        label="Attraction Strength"
        value={currentValues.attractionStrength}
        min={-2.0}
        max={2.0}
        step={0.1}
        onChange={(value) => updateResonanceParams({ attractionStrength: value })}
        description="Same-type trail following. High → clustering"
        hasOverride={hasOverride('attractionStrength')}
      />

      <ParameterSlider
        label="Repulsion Strength"
        value={currentValues.repulsionStrength}
        min={-2.0}
        max={2.0}
        step={0.1}
        onChange={(value) => updateResonanceParams({ repulsionStrength: value })}
        description="Cross-type influence. Negative → avoidance"
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
  );
}

const styles = {
  panel: {
    padding: '16px',
    backgroundColor: '#13141f',
    borderRadius: '6px',
    border: '1px solid #2a2b3a',
  } as React.CSSProperties,
  title: {
    fontSize: '16px',
    color: '#e0e0e0',
    marginBottom: '4px',
    fontWeight: 600,
  } as React.CSSProperties,
  subtitle: {
    fontSize: '11px',
    color: '#a0a0b0',
    marginBottom: '16px',
  } as React.CSSProperties,
  checkboxContainer: {
    marginTop: '16px',
    padding: '12px',
    backgroundColor: '#0a0a15',
    borderRadius: '6px',
  } as React.CSSProperties,
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#e0e0e0',
    cursor: 'pointer',
  } as React.CSSProperties,
  checkbox: {
    marginRight: '4px',
    cursor: 'pointer',
    width: '18px',
    height: '18px',
  } as React.CSSProperties,
  overrideBadge: {
    fontSize: '12px',
    opacity: 0.7,
    marginLeft: '4px',
  } as React.CSSProperties,
  checkboxDesc: {
    fontSize: '11px',
    color: '#6a6a7a',
    marginTop: '6px',
    marginLeft: '26px',
    lineHeight: '1.4',
  } as React.CSSProperties,
};
