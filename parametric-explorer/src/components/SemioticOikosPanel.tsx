import { useSimulationStore } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';

export function SemioticOikosPanel() {
  const { parameters, updateSemioticParams } = useSimulationStore();
  const { semiotic } = parameters;

  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>🔣 Semiotic Oikos</h3>
      <p style={styles.subtitle}>Perception-action coupling and sign production</p>

      <ParameterSlider
        label="Sensor Distance"
        value={semiotic.sensorDist}
        min={10}
        max={40}
        step={1}
        onChange={(value) => updateSemioticParams({ sensorDist: value })}
        description="Perceptual range. Large → network formation, separation"
      />

      <ParameterSlider
        label="Sensor Angle"
        value={semiotic.sensorAngle}
        min={0.2}
        max={1.2}
        step={0.05}
        onChange={(value) => updateSemioticParams({ sensorAngle: value })}
        description="Field of view (radians). Wide → chaotic, fluid movement"
      />

      <ParameterSlider
        label="Deposit Amount"
        value={semiotic.deposit}
        min={5}
        max={30}
        step={1}
        onChange={(value) => updateSemioticParams({ deposit: value })}
        description="Trace intensity per step. High → dense, stable structures"
      />

      <ParameterSlider
        label="Turn Speed"
        value={semiotic.turnSpeed}
        min={0.1}
        max={1.0}
        step={0.05}
        onChange={(value) => updateSemioticParams({ turnSpeed: value })}
        description="Response agility (radians). High → erratic, fluid motion"
      />
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
};
