import { useSimulationStore } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';

export function PhysicalOikosPanel() {
  const { parameters, updatePhysicalParams } = useSimulationStore();
  const { physical } = parameters;

  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>🌍 Physical Oikos</h3>
      <p style={styles.subtitle}>Trace materiality and environmental properties</p>

      <ParameterSlider
        label="Decay Rate"
        value={physical.decayRate}
        min={0.85}
        max={0.999}
        step={0.001}
        onChange={(value) => updatePhysicalParams({ decayRate: value })}
        description="Trail persistence over time. High → long memory → stable structures"
      />

      <ParameterSlider
        label="Diffusion Frequency"
        value={physical.diffusionFreq}
        min={0}
        max={10}
        step={1}
        onChange={(value) => updatePhysicalParams({ diffusionFreq: value })}
        description="Spatial spread of trails. High → smooth gradients → fluidity"
      />

      <ParameterSlider
        label="Fade Strength"
        value={physical.fadeStrength}
        min={0.05}
        max={0.3}
        step={0.01}
        onChange={(value) => updatePhysicalParams({ fadeStrength: value })}
        description="Acceleration of forgetting. High → rapid decay → chaos"
      />

      <ParameterSlider
        label="Trail Saturation"
        value={physical.trailSaturation}
        min={100}
        max={255}
        step={5}
        onChange={(value) => updatePhysicalParams({ trailSaturation: value })}
        description="Maximum trail intensity capacity"
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
