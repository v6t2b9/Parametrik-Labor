/**
 * Ecosystem Oikos Panel
 * Controls for the multi-species ecosystem mode
 */

import { useSimulationStore } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';
import type { EcologyConfig } from '../types/ecosystem';

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
      <div
        style={{
          padding: '20px',
          backgroundColor: '#1a1a1a',
          color: '#e0e0e0',
        }}
      >
        <h2
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '15px',
            color: '#4fc3f7',
          }}
        >
          🌿 Ecosystem Oikos
        </h2>
        <p style={{ color: '#b0b0b0', marginBottom: '20px' }}>
          Ecosystem configuration not initialized. Enable ecosystem mode to configure.
        </p>
        <button
          onClick={handleToggleEcosystem}
          style={{
            padding: '12px 24px',
            backgroundColor: '#4fc3f7',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px',
          }}
        >
          Enable Ecosystem Mode
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#1a1a1a',
        color: '#e0e0e0',
        maxHeight: '80vh',
        overflowY: 'auto',
      }}
    >
      <h2
        style={{
          fontSize: '20px',
          fontWeight: 'bold',
          marginBottom: '15px',
          color: '#4fc3f7',
        }}
      >
        🌿 Ecosystem Oikos
      </h2>

      <p
        style={{
          fontSize: '14px',
          marginBottom: '20px',
          color: '#b0b0b0',
          lineHeight: '1.6',
        }}
      >
        Multi-species ecosystem with crystal consumption and energy metabolism
      </p>

      {/* Ecosystem Mode Toggle */}
      <div style={{ marginBottom: '30px' }}>
        <button
          onClick={handleToggleEcosystem}
          style={{
            padding: '12px 24px',
            backgroundColor: ecosystemMode ? '#66bb6a' : '#424242',
            color: ecosystemMode ? '#000' : '#e0e0e0',
            border: ecosystemMode ? '2px solid #66bb6a' : '1px solid #666',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px',
            width: '100%',
          }}
        >
          {ecosystemMode ? '✓ Ecosystem Mode Active' : 'Enable Ecosystem Mode'}
        </button>
        {ecosystemMode && (
          <p
            style={{
              fontSize: '12px',
              color: '#888',
              marginTop: '8px',
              fontStyle: 'italic',
            }}
          >
            Agents now consume crystals for energy and reproduce
          </p>
        )}
      </div>

      {/* Crystal Settings */}
      <div style={{ marginBottom: '25px' }}>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '12px',
            color: '#90caf9',
          }}
        >
          💎 Crystal Settings
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
        <h3
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '12px',
            color: '#90caf9',
          }}
        >
          👥 Population Settings
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

        <div
          style={{
            marginTop: '12px',
            padding: '12px',
            backgroundColor: '#252525',
            borderRadius: '6px',
            fontSize: '12px',
            color: '#aaa',
          }}
        >
          <div style={{ marginBottom: '6px', fontWeight: 'bold' }}>
            Initial Population:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            <div>🔨 Builder: {ecosystem.population.initialPopulation.builder}</div>
            <div>🌾 Harvester: {ecosystem.population.initialPopulation.harvester}</div>
            <div>🦁 Consumer: {ecosystem.population.initialPopulation.consumer}</div>
            <div>🍄 Decomposer: {ecosystem.population.initialPopulation.decomposer}</div>
            <div>🔭 Scout: {ecosystem.population.initialPopulation.scout}</div>
          </div>
        </div>
      </div>

      {/* Audio-Ecology Mapping */}
      <div style={{ marginBottom: '25px' }}>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '12px',
            color: '#90caf9',
          }}
        >
          🎵 Audio-Ecology Mapping
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

        <div
          style={{
            marginTop: '12px',
            padding: '12px',
            backgroundColor: '#252525',
            borderRadius: '6px',
            fontSize: '12px',
            color: '#aaa',
          }}
        >
          <div style={{ marginBottom: '6px', fontWeight: 'bold' }}>
            Audio Feature → Species Mapping:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div>
              🎸 <strong>Bass</strong> → {ecosystem.audioEcology.bassBoosts.join(', ')}
            </div>
            <div>
              🎹 <strong>Mids</strong> → {ecosystem.audioEcology.midBoosts.join(', ')}
            </div>
            <div>
              🎺 <strong>Highs</strong> →{' '}
              {ecosystem.audioEcology.highBoosts.join(', ')}
            </div>
            <div>
              🥁 <strong>Beats</strong> →{' '}
              {ecosystem.audioEcology.transientBoosts.join(', ')}
            </div>
          </div>
        </div>
      </div>

      {/* Species Info */}
      <div
        style={{
          padding: '12px',
          backgroundColor: '#252525',
          borderRadius: '6px',
          border: '1px solid #333',
        }}
      >
        <div style={{ marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>
          Species Roles:
        </div>
        <div style={{ fontSize: '11px', color: '#888', lineHeight: '1.6' }}>
          <div style={{ marginBottom: '4px' }}>
            <strong style={{ color: 'rgb(255, 150, 50)' }}>🔨 Builder:</strong> Creates structures (eats food → builds)
          </div>
          <div style={{ marginBottom: '4px' }}>
            <strong style={{ color: 'rgb(100, 255, 150)' }}>🌾 Harvester:</strong> Converts resources (eats build → food)
          </div>
          <div style={{ marginBottom: '4px' }}>
            <strong style={{ color: 'rgb(255, 100, 255)' }}>🦁 Consumer:</strong> Hunts food (eats food → marks territory)
          </div>
          <div style={{ marginBottom: '4px' }}>
            <strong style={{ color: 'rgb(150, 100, 200)' }}>🍄 Decomposer:</strong> Recycles all (eats all → explores)
          </div>
          <div>
            <strong style={{ color: 'rgb(100, 200, 255)' }}>🔭 Scout:</strong> Explores territory (fast, marks paths)
          </div>
        </div>
      </div>
    </div>
  );
}
