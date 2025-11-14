/**
 * Model Oikos Panel - Quantum-Inspired Stigmergy Model Selection
 * Allows switching between M1 (Classical), M2 (Context-Switching), and M3 (Quantum-Inspired)
 */

import { useSimulationStore } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';
import type { StigmergyModel } from '../types/index';

export function ModelOikosPanel() {
  const { parameters, updateModelParams } = useSimulationStore();
  const { model, m2, m3 } = parameters.modelParams;

  const handleModelChange = (newModel: StigmergyModel) => {
    updateModelParams({ model: newModel });
  };

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#1a1a1a',
      color: '#e0e0e0',
      maxHeight: '80vh',
      overflowY: 'auto',
    }}>
      <h2 style={{
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '15px',
        color: '#4fc3f7',
      }}>
        🧬 Model Oikos
      </h2>

      <p style={{
        fontSize: '14px',
        marginBottom: '20px',
        color: '#b0b0b0',
        lineHeight: '1.6',
      }}>
        Quantum-Inspired Stigmergy Computational Model (Supplement B)
      </p>

      {/* Model Selection */}
      <div style={{ marginBottom: '30px' }}>
        <label style={{
          display: 'block',
          marginBottom: '10px',
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#90caf9',
        }}>
          Stigmergy Model
        </label>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* M1: Classical */}
          <button
            onClick={() => handleModelChange('M1')}
            style={{
              padding: '12px 16px',
              backgroundColor: model === 'M1' ? '#4fc3f7' : '#2a2a2a',
              color: model === 'M1' ? '#000' : '#e0e0e0',
              border: model === 'M1' ? '2px solid #4fc3f7' : '1px solid #444',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: '14px',
              transition: 'all 0.2s ease',
              fontWeight: model === 'M1' ? 'bold' : 'normal',
            }}
          >
            <div style={{ marginBottom: '4px' }}>
              <strong>M1: Classical Stigmergy</strong> (Baseline)
            </div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>
              Standard pheromone-based navigation. Agents sense and follow trails.
              <br />
              <em>7 parameters</em>
            </div>
          </button>

          {/* M2: Context-Switching */}
          <button
            onClick={() => handleModelChange('M2')}
            style={{
              padding: '12px 16px',
              backgroundColor: model === 'M2' ? '#4fc3f7' : '#2a2a2a',
              color: model === 'M2' ? '#000' : '#e0e0e0',
              border: model === 'M2' ? '2px solid #4fc3f7' : '1px solid #444',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: '14px',
              transition: 'all 0.2s ease',
              fontWeight: model === 'M2' ? 'bold' : 'normal',
            }}
          >
            <div style={{ marginBottom: '4px' }}>
              <strong>M2: Context-Switching</strong>
            </div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>
              Classical + explore/exploit modes. Agents switch based on local density.
              <br />
              <em>10 parameters (7 base + 3 context)</em>
            </div>
          </button>

          {/* M3: Quantum-Inspired */}
          <button
            onClick={() => handleModelChange('M3')}
            style={{
              padding: '12px 16px',
              backgroundColor: model === 'M3' ? '#4fc3f7' : '#2a2a2a',
              color: model === 'M3' ? '#000' : '#e0e0e0',
              border: model === 'M3' ? '2px solid #4fc3f7' : '1px solid #444',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: '14px',
              transition: 'all 0.2s ease',
              fontWeight: model === 'M3' ? 'bold' : 'normal',
            }}
          >
            <div style={{ marginBottom: '4px' }}>
              <strong>M3: Quantum-Inspired</strong> ⚛️
            </div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>
              Superposition states + phase-dependent trails + interference.
              <br />
              <em>11 parameters (7 base + 4 quantum)</em>
            </div>
          </button>
        </div>
      </div>

      {/* Model-Specific Parameters */}
      <div style={{
        borderTop: '1px solid #444',
        paddingTop: '20px',
      }}>
        {model === 'M1' && (
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 'bold',
              marginBottom: '15px',
              color: '#90caf9',
            }}>
              M1: Classical Parameters
            </h3>
            <p style={{ fontSize: '13px', color: '#b0b0b0', marginBottom: '10px' }}>
              Uses standard Physical, Semiotic, Temporal, and Resonance parameters.
              <br />
              Configure in their respective Oikos tabs.
            </p>
            <div style={{
              padding: '12px',
              backgroundColor: '#2a2a2a',
              borderRadius: '6px',
              fontSize: '12px',
              color: '#90caf9',
            }}>
              ✓ No additional parameters for M1
            </div>
          </div>
        )}

        {model === 'M2' && (
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 'bold',
              marginBottom: '15px',
              color: '#90caf9',
            }}>
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

            <div style={{
              marginTop: '15px',
              padding: '12px',
              backgroundColor: '#2a2a2a',
              borderRadius: '6px',
              fontSize: '12px',
              color: '#b0b0b0',
              lineHeight: '1.5',
            }}>
              <strong style={{ color: '#4fc3f7' }}>How it works:</strong><br />
              Agents switch between <strong>explore</strong> (seeking new areas with noise)
              and <strong>exploit</strong> (following strong trails deterministically).
            </div>
          </div>
        )}

        {model === 'M3' && (
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 'bold',
              marginBottom: '15px',
              color: '#90caf9',
            }}>
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

            <div style={{
              marginTop: '15px',
              padding: '12px',
              backgroundColor: '#2a2a2a',
              borderRadius: '6px',
              fontSize: '12px',
              color: '#b0b0b0',
              lineHeight: '1.5',
            }}>
              <strong style={{ color: '#4fc3f7' }}>Quantum Features:</strong><br />
              • <strong>Superposition:</strong> Agents maintain probability amplitudes for directions<br />
              • <strong>Phase:</strong> Trails have complex phases; old trails become repulsive<br />
              • <strong>Interference:</strong> Amplitude coupling creates order effects<br />
              • <strong>Context:</strong> Colony state changes trail interpretation
            </div>

            <div style={{
              marginTop: '10px',
              padding: '12px',
              backgroundColor: '#1a3a2a',
              borderRadius: '6px',
              fontSize: '11px',
              color: '#a0d0b0',
              lineHeight: '1.5',
            }}>
              <strong>Expected Behaviors:</strong><br />
              ✓ Order effects: A→B ≠ B→A (asymmetric exploration)<br />
              ✓ Interference: Trail combinations show non-additive responses<br />
              ✓ Context-dependence: Same trail = different response based on history
            </div>
          </div>
        )}
      </div>

      {/* Info Footer */}
      <div style={{
        marginTop: '25px',
        padding: '15px',
        backgroundColor: '#1a2a3a',
        borderRadius: '8px',
        fontSize: '12px',
        color: '#a0c0d0',
        lineHeight: '1.6',
      }}>
        <strong style={{ color: '#4fc3f7' }}>📚 About Quantum-Inspired Stigmergy:</strong>
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
