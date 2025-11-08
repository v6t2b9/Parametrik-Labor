import { useSimulationStore } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';

export function ResonanceOikosPanel() {
  const { parameters, updateResonanceParams } = useSimulationStore();
  const { resonance } = parameters;

  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>🎵 Resonance Oikos</h3>
      <p style={styles.subtitle}>Inter-system relations and cross-species dynamics</p>

      <ParameterSlider
        label="Attraction Strength"
        value={resonance.attractionStrength}
        min={-2.0}
        max={2.0}
        step={0.1}
        onChange={(value) => updateResonanceParams({ attractionStrength: value })}
        description="Same-type trail following. High → clustering, low → dispersion"
      />

      <ParameterSlider
        label="Repulsion Strength"
        value={resonance.repulsionStrength}
        min={-2.0}
        max={2.0}
        step={0.1}
        onChange={(value) => updateResonanceParams({ repulsionStrength: value })}
        description="Cross-type influence. Negative → avoidance → separation"
      />

      <div style={styles.checkboxContainer}>
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={resonance.crossSpeciesInteraction}
            onChange={(e) =>
              updateResonanceParams({ crossSpeciesInteraction: e.target.checked })
            }
            style={styles.checkbox}
          />
          <span>Cross-Species Interaction</span>
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
    marginBottom: '20px',
  } as React.CSSProperties,
  checkboxContainer: {
    marginTop: '20px',
    padding: '12px',
    backgroundColor: '#0a0a15',
    borderRadius: '6px',
  } as React.CSSProperties,
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: '#e0e0e0',
    cursor: 'pointer',
  } as React.CSSProperties,
  checkbox: {
    marginRight: '8px',
    cursor: 'pointer',
  } as React.CSSProperties,
  checkboxDesc: {
    fontSize: '11px',
    color: '#6a6a7a',
    marginTop: '6px',
    marginLeft: '24px',
    lineHeight: '1.4',
  } as React.CSSProperties,
};
