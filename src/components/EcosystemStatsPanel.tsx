/**
 * Ecosystem Stats Panel
 * Displays real-time population statistics and species boosts
 */

import { SPECIES_COLORS, type SpeciesType } from '../types/ecosystem';
import type { PopulationStats, SpeciesBoosts } from '../types/ecosystem';

interface EcosystemStatsPanelProps {
  populationStats: PopulationStats;
  speciesBoosts: SpeciesBoosts;
  totalCrystals: number;
  totalEnergy: number;
  maxPopulation: number;
}

const SPECIES_INFO: Record<SpeciesType, { name: string; icon: string; description: string }> = {
  builder: {
    name: 'Builder',
    icon: '🔨',
    description: 'Creates structures',
  },
  harvester: {
    name: 'Harvester',
    icon: '🌾',
    description: 'Converts resources',
  },
  consumer: {
    name: 'Consumer',
    icon: '🦁',
    description: 'Hunts food',
  },
  decomposer: {
    name: 'Decomposer',
    icon: '🍄',
    description: 'Recycles all',
  },
  scout: {
    name: 'Scout',
    icon: '🔭',
    description: 'Explores territory',
  },
};

export function EcosystemStatsPanel({
  populationStats,
  speciesBoosts,
  totalCrystals,
  totalEnergy,
  maxPopulation,
}: EcosystemStatsPanelProps) {
  const species: SpeciesType[] = ['builder', 'harvester', 'consumer', 'decomposer', 'scout'];

  const getPopulationPercent = (count: number): number => {
    return (count / maxPopulation) * 100;
  };

  const getBoostIntensity = (boost: number): number => {
    // Normalize: 1.0 = 0%, 2.5 = 100%
    return Math.min(100, Math.max(0, ((boost - 1.0) / 1.5) * 100));
  };

  const rgbToString = (rgb: [number, number, number]): string => {
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  };

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
        🌿 Ecosystem Statistics
      </h2>

      <p
        style={{
          fontSize: '14px',
          marginBottom: '20px',
          color: '#b0b0b0',
          lineHeight: '1.6',
        }}
      >
        Real-time population dynamics and resource tracking
      </p>

      {/* Overall Stats */}
      <div
        style={{
          marginBottom: '25px',
          padding: '15px',
          backgroundColor: '#252525',
          borderRadius: '8px',
          border: '1px solid #333',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>
              Total Population
            </div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#4fc3f7' }}>
              {populationStats.total} / {maxPopulation}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>
              Active Crystals
            </div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffa726' }}>
              {totalCrystals}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>
              Total Energy
            </div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#66bb6a' }}>
              {totalEnergy.toFixed(1)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>
              Capacity
            </div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ab47bc' }}>
              {Math.round((populationStats.total / maxPopulation) * 100)}%
            </div>
          </div>
        </div>
      </div>

      {/* Species Population */}
      <div style={{ marginBottom: '20px' }}>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '12px',
            color: '#90caf9',
          }}
        >
          Species Populations
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {species.map((sp) => {
            const info = SPECIES_INFO[sp];
            const color = rgbToString(SPECIES_COLORS[sp]);
            const count = populationStats[sp];
            const percent = getPopulationPercent(count);
            const boost = speciesBoosts[sp];
            const boostPercent = getBoostIntensity(boost);

            return (
              <div
                key={sp}
                style={{
                  padding: '12px',
                  backgroundColor: '#252525',
                  borderRadius: '6px',
                  border: `2px solid ${color}`,
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '18px' }}>{info.icon}</span>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 'bold', color }}>
                        {info.name}
                      </div>
                      <div style={{ fontSize: '11px', color: '#888' }}>
                        {info.description}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color }}>
                      {count}
                    </div>
                    <div style={{ fontSize: '10px', color: '#888' }}>
                      {percent.toFixed(0)}%
                    </div>
                  </div>
                </div>

                {/* Population Bar */}
                <div
                  style={{
                    height: '6px',
                    backgroundColor: '#1a1a1a',
                    borderRadius: '3px',
                    overflow: 'hidden',
                    marginBottom: '6px',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${percent}%`,
                      backgroundColor: color,
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>

                {/* Audio Boost Indicator */}
                {boost > 1.01 && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginTop: '6px',
                      fontSize: '11px',
                      color: '#ffa726',
                    }}
                  >
                    <span>🎵</span>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          height: '4px',
                          backgroundColor: '#1a1a1a',
                          borderRadius: '2px',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            width: `${boostPercent}%`,
                            backgroundColor: '#ffa726',
                            transition: 'width 0.2s ease',
                          }}
                        />
                      </div>
                    </div>
                    <span style={{ minWidth: '35px', textAlign: 'right' }}>
                      +{((boost - 1.0) * 100).toFixed(0)}%
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div
        style={{
          padding: '12px',
          backgroundColor: '#252525',
          borderRadius: '6px',
          border: '1px solid #333',
          fontSize: '11px',
          color: '#888',
        }}
      >
        <div style={{ marginBottom: '6px', fontWeight: 'bold', color: '#aaa' }}>
          Legend
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div>
            <span style={{ color: '#4fc3f7' }}>●</span> Population bar shows
            current/max capacity
          </div>
          <div>
            <span style={{ color: '#ffa726' }}>🎵</span> Audio boost indicator (when
            music enabled)
          </div>
          <div>
            <span style={{ color: '#66bb6a' }}>●</span> Total energy from all
            crystals
          </div>
        </div>
      </div>
    </div>
  );
}
