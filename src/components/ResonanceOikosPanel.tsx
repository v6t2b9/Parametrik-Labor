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

      {/* Universal Baseline Section */}
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>🌍 Universal Baseline Settings</h4>
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

      <div style={styles.divider} />

      {/* Species Interaction Matrix Section */}
      <div style={styles.matrixSection}>
        <h4 style={styles.sectionTitle}>🧬 Species Interaction Matrix (3×3)</h4>
        <p style={styles.sectionDescription}>
          Fine-tune how each species responds to others' pheromone trails
          <br />
          Positive values = attraction, Negative values = repulsion, 0 = neutral
        </p>

        {/* Red Species Interactions */}
        <div style={styles.speciesBlock}>
          <h5 style={styles.speciesTitle}>🔴 Red Species Interactions</h5>
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
        </div>

        {/* Green Species Interactions */}
        <div style={styles.speciesBlock}>
          <h5 style={styles.speciesTitle}>🟢 Green Species Interactions</h5>
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
        </div>

        {/* Blue Species Interactions */}
        <div style={styles.speciesBlock}>
          <h5 style={styles.speciesTitle}>🔵 Blue Species Interactions</h5>
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
        </div>

        <div style={styles.infoBox}>
          <p style={styles.infoText}>
            💡 <strong>Interaction Examples:</strong>
            <br />
            • Set Red→Green to +1.5 for red agents to be attracted to green trails (symbiosis)
            <br />
            • Set Blue→Red to -1.0 for blue agents to avoid red trails (competition)
            <br />
            • Keep same-species values positive (e.g., Red→Red: +0.5) for clustering
            <br />
            • Use 0 for neutral interactions (no special response)
          </p>
        </div>
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
    maxHeight: '80vh',
    overflowY: 'auto',
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
  section: {
    marginBottom: '16px',
  } as React.CSSProperties,
  sectionTitle: {
    fontSize: '14px',
    color: '#9d7dd4',
    marginBottom: '6px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  } as React.CSSProperties,
  sectionDescription: {
    fontSize: '11px',
    color: '#7d7d8d',
    marginBottom: '12px',
    lineHeight: '1.4',
  } as React.CSSProperties,
  divider: {
    height: '1px',
    backgroundColor: '#2a2b3a',
    margin: '20px 0',
  } as React.CSSProperties,
  matrixSection: {
    marginTop: '20px',
  } as React.CSSProperties,
  speciesBlock: {
    marginBottom: '24px',
    padding: '16px',
    backgroundColor: '#0a0a15',
    borderRadius: '8px',
    border: '1px solid #2a2b3a',
  } as React.CSSProperties,
  speciesTitle: {
    fontSize: '13px',
    color: '#e0e0e0',
    marginBottom: '12px',
    fontWeight: 600,
    margin: '0 0 12px 0',
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
  infoBox: {
    padding: '12px',
    backgroundColor: '#0a0a15',
    borderRadius: '6px',
    border: '1px solid #3d2d5d',
    marginTop: '16px',
  } as React.CSSProperties,
  infoText: {
    fontSize: '11px',
    color: '#a0a0b0',
    lineHeight: '1.6',
    margin: 0,
  } as React.CSSProperties,
};
