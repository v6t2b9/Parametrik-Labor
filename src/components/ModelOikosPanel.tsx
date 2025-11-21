/**
 * Model Oikos Panel - Quantum-Inspired Stigmergy Model Selection
 * Allows switching between M1 (Classical), M2 (Context-Switching), and M3 (Quantum-Inspired)
 */

import { useSimulationStore } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';
import type { StigmergyModel } from '../types/index';
import { colors, spacing, typography, effects, createHeaderStyle, createSubtitleStyle } from '../design-system';

export function ModelOikosPanel() {
  const { parameters, updateModelParams } = useSimulationStore();
  const { model, m2, m3 } = parameters.modelParams;

  const handleModelChange = (newModel: StigmergyModel) => {
    updateModelParams({ model: newModel });
  };

  return (
    <div style={styles.panel}>
      <h2 style={styles.title}>
        Model
      </h2>

      <p style={styles.subtitle}>
        Stigmergy model selection
      </p>

      {/* Model Selection */}
      <div style={{ marginBottom: spacing.xxxl }}>
        <label style={styles.sectionTitle}>
          Model Selection
        </label>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* M1: Classical */}
          <button
            onClick={() => handleModelChange('M1')}
            style={{
              ...styles.modelButton,
              backgroundColor: model === 'M1' ? '#4fc3f7' : colors.bg.tertiary,
              color: model === 'M1' ? '#000' : colors.text.primary,
              border: model === 'M1' ? '2px solid #4fc3f7' : `1px solid ${colors.border.primary}`,
              fontWeight: model === 'M1' ? 'bold' : 'normal',
            }}
          >
            <div style={{ marginBottom: spacing.xs }}>
              <strong>M1: Classical Stigmergy</strong> (Baseline)
            </div>
            <div style={styles.modelDescription}>
              Standard pheromone-based navigation. Agents sense and follow trails.
              <br />
              <em>7 parameters</em>
            </div>
          </button>

          {/* M2: Context-Switching */}
          <button
            onClick={() => handleModelChange('M2')}
            style={{
              ...styles.modelButton,
              backgroundColor: model === 'M2' ? '#4fc3f7' : colors.bg.tertiary,
              color: model === 'M2' ? '#000' : colors.text.primary,
              border: model === 'M2' ? '2px solid #4fc3f7' : `1px solid ${colors.border.primary}`,
              fontWeight: model === 'M2' ? 'bold' : 'normal',
            }}
          >
            <div style={{ marginBottom: spacing.xs }}>
              <strong>M2: Context-Switching</strong>
            </div>
            <div style={styles.modelDescription}>
              Classical + explore/exploit modes. Agents switch based on local density.
              <br />
              <em>10 parameters (7 base + 3 context)</em>
            </div>
          </button>

          {/* M3: Quantum-Inspired */}
          <button
            onClick={() => handleModelChange('M3')}
            style={{
              ...styles.modelButton,
              backgroundColor: model === 'M3' ? '#4fc3f7' : colors.bg.tertiary,
              color: model === 'M3' ? '#000' : colors.text.primary,
              border: model === 'M3' ? '2px solid #4fc3f7' : `1px solid ${colors.border.primary}`,
              fontWeight: model === 'M3' ? 'bold' : 'normal',
            }}
          >
            <div style={{ marginBottom: spacing.xs }}>
              <strong>M3: Quantum-Inspired</strong>
            </div>
            <div style={styles.modelDescription}>
              Superposition states + phase-dependent trails + interference.
              <br />
              <em>11 parameters (7 base + 4 quantum)</em>
            </div>
          </button>
        </div>
      </div>

      {/* Model-Specific Parameters */}
      <div style={styles.paramsSection}>
        {model === 'M1' && (
          <div>
            <h3 style={styles.modelTitle}>
              M1: Classical Parameters
            </h3>
            <p style={styles.modelInfo}>
              Uses standard Physical, Semiotic, Temporal, and Resonance parameters.
              <br />
              Configure in their respective Oikos tabs.
            </p>
            <div style={styles.infoBox}>
              No additional parameters for M1
            </div>
          </div>
        )}

        {model === 'M2' && (
          <div>
            <h3 style={styles.modelTitle}>
              M2: Context-Switching Parameters
            </h3>

            <ParameterSlider
              label="High Threshold"
              value={m2.highThreshold}
              min={50}
              max={200}
              step={5}
              onChange={(val: number) => updateModelParams({ m2: { ...m2, highThreshold: val } })}
              description="Density to switch to exploit mode"
            />

            <ParameterSlider
              label="Low Threshold"
              value={m2.lowThreshold}
              min={10}
              max={50}
              step={5}
              onChange={(val: number) => updateModelParams({ m2: { ...m2, lowThreshold: val } })}
              description="Density to switch to explore mode"
            />

            <ParameterSlider
              label="Exploration Noise"
              value={m2.explorationNoise}
              min={0.1}
              max={1.0}
              step={0.05}
              onChange={(val: number) => updateModelParams({ m2: { ...m2, explorationNoise: val } })}
              description="Noise magnitude in explore mode"
            />

            <div style={styles.howItWorksBox}>
              <strong style={{ color: '#4fc3f7' }}>How it works:</strong><br />
              Agents switch between <strong>explore</strong> (seeking new areas with noise)
              and <strong>exploit</strong> (following strong trails deterministically).
            </div>
          </div>
        )}

        {model === 'M3' && (
          <div>
            <h3 style={styles.modelTitle}>
              M3: Quantum-Inspired Parameters
            </h3>

            <ParameterSlider
              label="Phase Rotation Rate"
              value={m3.phaseRotationRate}
              min={0.001}
              max={0.01}
              step={0.001}
              onChange={(val: number) => updateModelParams({ m3: { ...m3, phaseRotationRate: val } })}
              description="How fast trails 'age' (phase evolution)"
            />

            <ParameterSlider
              label="Amplitude Coupling"
              value={m3.amplitudeCoupling}
              min={0.05}
              max={0.3}
              step={0.01}
              onChange={(val: number) => updateModelParams({ m3: { ...m3, amplitudeCoupling: val } })}
              description="Coupling between direction amplitudes"
            />

            <ParameterSlider
              label="Context Threshold"
              value={m3.contextThreshold}
              min={100}
              max={500}
              step={25}
              onChange={(val: number) => updateModelParams({ m3: { ...m3, contextThreshold: val } })}
              description="Food collected before context switch"
            />

            <ParameterSlider
              label="Phase Noise"
              value={m3.phaseNoise}
              min={0.01}
              max={0.1}
              step={0.01}
              onChange={(val: number) => updateModelParams({ m3: { ...m3, phaseNoise: val } })}
              description="Environmental phase fluctuations"
            />

            <div style={styles.howItWorksBox}>
              <strong style={{ color: '#4fc3f7' }}>Quantum Features:</strong><br />
              • <strong>Superposition:</strong> Agents maintain probability amplitudes for directions<br />
              • <strong>Phase:</strong> Trails have complex phases; old trails become repulsive<br />
              • <strong>Interference:</strong> Amplitude coupling creates order effects<br />
              • <strong>Context:</strong> Colony state changes trail interpretation
            </div>

            <div style={styles.expectedBox}>
              <strong>Expected Behaviors:</strong><br />
              Order effects: A→B ≠ B→A (asymmetric exploration)<br />
              Interference: Trail combinations show non-additive responses<br />
              Context-dependence: Same trail = different response based on history
            </div>
          </div>
        )}
      </div>

      {/* Info Footer */}
      <div style={styles.footerBox}>
        <strong style={{ color: '#4fc3f7' }}>About Quantum-Inspired Stigmergy:</strong>
        <br />
        This implementation is based on <strong>Supplement B: Computational Model Protocol</strong>
        from the quantum biosemiotics research program. The three models allow computational
        validation of quantum-inspired dynamics in stigmergic systems.
        <br /><br />
        <strong>Validation Strategy:</strong> Compare model fits (AIC) against empirical benchmarks
        from bee learning, plant VOC interference, and ant foraging experiments.
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
  sectionTitle: {
    ...createHeaderStyle('h3'),
    display: 'block',
    marginBottom: '10px',
    color: '#90caf9',
  } as React.CSSProperties,
  modelButton: {
    padding: `${spacing.md} ${spacing.lg}`,
    borderRadius: effects.borderRadius.lg,
    cursor: 'pointer',
    textAlign: 'left',
    ...typography.h3,
    transition: effects.transition.normal,
  } as React.CSSProperties,
  modelDescription: {
    fontSize: '12px',
    opacity: 0.8,
  } as React.CSSProperties,
  paramsSection: {
    borderTop: `1px solid ${colors.border.primary}`,
    paddingTop: spacing.xl,
  } as React.CSSProperties,
  modelTitle: {
    ...createHeaderStyle('h2'),
    marginBottom: spacing.md,
    color: '#90caf9',
  } as React.CSSProperties,
  modelInfo: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: '10px',
  } as React.CSSProperties,
  infoBox: {
    padding: spacing.md,
    backgroundColor: colors.bg.tertiary,
    borderRadius: effects.borderRadius.md,
    ...typography.caption,
    color: '#90caf9',
  } as React.CSSProperties,
  howItWorksBox: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.bg.tertiary,
    borderRadius: effects.borderRadius.md,
    ...typography.caption,
    color: colors.text.secondary,
    lineHeight: '1.5',
  } as React.CSSProperties,
  expectedBox: {
    marginTop: '10px',
    padding: spacing.md,
    backgroundColor: '#1a3a2a',
    borderRadius: effects.borderRadius.md,
    fontSize: '11px',
    color: '#a0d0b0',
    lineHeight: '1.5',
  } as React.CSSProperties,
  footerBox: {
    marginTop: '25px',
    padding: spacing.md,
    backgroundColor: '#1a2a3a',
    borderRadius: effects.borderRadius.lg,
    ...typography.caption,
    color: '#a0c0d0',
    lineHeight: '1.6',
  } as React.CSSProperties,
};
