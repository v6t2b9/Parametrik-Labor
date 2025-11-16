import type { Agent, Trails, AllParameters, AgentType, ResolvedSpeciesParams } from '../types/index.js';

const GRID_SIZE = 400;

// Helper: Merge universal + species overrides
function resolveSpeciesParams(
  params: AllParameters,
  species: AgentType
): ResolvedSpeciesParams {
  const speciesOverride = params.species[species];

  return {
    physical: {
      ...params.universal.physical,
      ...(speciesOverride.physical || {}),
    },
    semiotic: {
      ...params.universal.semiotic,
      ...(speciesOverride.semiotic || {}),
    },
    temporal: {
      ...params.universal.temporal,
      ...(speciesOverride.temporal || {}),
    },
    resonance: {
      ...params.universal.resonance,
      ...(speciesOverride.resonance || {}),
    },
    audio: {
      ...params.universal.audio,
      ...(speciesOverride.audio || {}),
    },
  };
}

export class SimulationEngine {
  private agents: Agent[] = [];
  private trails: Trails;
  private tempTrails: Trails;
  private gridSize: number;
  private frameCount: number = 0;
  private params: AllParameters;

  constructor(gridSize: number = GRID_SIZE) {
    this.gridSize = gridSize;
    this.trails = this.createTrails();
    this.tempTrails = this.createTrails();
    this.params = {} as AllParameters; // Will be set via setParameters
  }

  private createTrails(): Trails {
    const size = this.gridSize * this.gridSize;
    return {
      red: new Float32Array(size),
      green: new Float32Array(size),
      blue: new Float32Array(size),
    };
  }

  public setParameters(params: AllParameters): void {
    this.params = params;
  }

  public initializeAgents(count: number): void {
    this.agents = [];
    const types: AgentType[] = ['red', 'green', 'blue'];

    for (let i = 0; i < count; i++) {
      this.agents.push({
        x: Math.random() * this.gridSize,
        y: Math.random() * this.gridSize,
        angle: Math.random() * Math.PI * 2,
        type: types[i % 3],
        rhythmPhase: Math.random() * Math.PI * 2,
      });
    }
  }

  public reset(): void {
    this.trails = this.createTrails();
    this.tempTrails = this.createTrails();
    this.frameCount = 0;
    this.initializeAgents(this.params.globalTemporal.agentCount);
  }

  public update(): void {
    // Use universal physical params for diffusion (could be species-specific in future)
    const universalPhysical = this.params.universal.physical;

    // Update each agent (species-specific)
    for (const agent of this.agents) {
      this.updateAgent(agent);
    }

    // Diffuse and decay trails
    if (this.frameCount % universalPhysical.diffusionFreq === 0) {
      this.diffuseAndDecay();
    }

    this.frameCount++;
  }

  private updateAgent(agent: Agent): void {
    // Resolve species-specific parameters
    const speciesParams = resolveSpeciesParams(this.params, agent.type);
    const { semiotic, temporal, resonance, physical } = speciesParams;
    const { simulationSpeed } = this.params.globalTemporal;

    // Apply rhythmic perturbation (chaos injection)
    if (temporal.chaosInterval > 0 && this.frameCount % temporal.chaosInterval === 0) {
      agent.rhythmPhase += (Math.random() - 0.5) * temporal.chaosStrength * Math.PI;
    }

    // Sense environment in 3 directions
    const sensorDistPixels = semiotic.sensorDist;
    const sensorOffsetAngle = semiotic.sensorAngle;

    const forward = this.sense(agent, agent.angle, sensorDistPixels, resonance);
    const left = this.sense(agent, agent.angle - sensorOffsetAngle, sensorDistPixels, resonance);
    const right = this.sense(agent, agent.angle + sensorOffsetAngle, sensorDistPixels, resonance);

    // Steering logic
    if (forward > left && forward > right) {
      // Continue forward
    } else if (forward < left && forward < right) {
      // Random turn
      agent.angle += (Math.random() - 0.5) * semiotic.turnSpeed;
    } else if (left > right) {
      agent.angle -= semiotic.turnSpeed;
    } else {
      agent.angle += semiotic.turnSpeed;
    }

    // Add rhythmic variation
    agent.angle += Math.sin(agent.rhythmPhase) * 0.05;
    agent.rhythmPhase += 0.02;

    // Move agent (apply global simulation speed multiplier + species speed)
    const effectiveSpeed = temporal.speed * simulationSpeed;
    agent.x += Math.cos(agent.angle) * effectiveSpeed;
    agent.y += Math.sin(agent.angle) * effectiveSpeed;

    // Wrap around edges
    if (agent.x < 0) agent.x += this.gridSize;
    if (agent.x >= this.gridSize) agent.x -= this.gridSize;
    if (agent.y < 0) agent.y += this.gridSize;
    if (agent.y >= this.gridSize) agent.y -= this.gridSize;

    // Deposit chemical trace
    const x = Math.floor(agent.x);
    const y = Math.floor(agent.y);
    const idx = y * this.gridSize + x;

    if (idx >= 0 && idx < this.gridSize * this.gridSize) {
      const currentValue = this.trails[agent.type][idx];
      const newValue = Math.min(
        currentValue + semiotic.deposit,
        physical.trailSaturation
      );
      this.trails[agent.type][idx] = newValue;
    }
  }

  private sense(
    agent: Agent,
    angle: number,
    distance: number,
    resonance: ResolvedSpeciesParams['resonance']
  ): number {
    const x = agent.x + Math.cos(angle) * distance;
    const y = agent.y + Math.sin(angle) * distance;

    // Wrap coordinates
    const wx = ((x % this.gridSize) + this.gridSize) % this.gridSize;
    const wy = ((y % this.gridSize) + this.gridSize) % this.gridSize;

    const idx = Math.floor(wy) * this.gridSize + Math.floor(wx);

    if (idx < 0 || idx >= this.gridSize * this.gridSize) {
      return 0;
    }

    // Read signal from own type (attraction)
    const ownSignal = this.trails[agent.type][idx] * resonance.attractionStrength;

    // Read signals from other types (repulsion/attraction)
    let crossSignal = 0;
    if (resonance.crossSpeciesInteraction) {
      const types: AgentType[] = ['red', 'green', 'blue'];
      for (const type of types) {
        if (type !== agent.type) {
          crossSignal += this.trails[type][idx] * resonance.repulsionStrength;
        }
      }
    }

    return ownSignal + crossSignal;
  }

  private diffuseAndDecay(): void {
    // Use universal physical params for trail dynamics
    const { physical } = this.params.universal;
    const { decayRate, fadeStrength } = physical;

    for (const channel of ['red', 'green', 'blue'] as AgentType[]) {
      const trails = this.trails[channel];
      const temp = this.tempTrails[channel];

      for (let y = 0; y < this.gridSize; y++) {
        for (let x = 0; x < this.gridSize; x++) {
          const idx = y * this.gridSize + x;

          // Get neighbors (8-connected: includes diagonals)
          const neighbors = [
            // 4-connected (cardinal directions)
            trails[((y - 1 + this.gridSize) % this.gridSize) * this.gridSize + x],
            trails[((y + 1) % this.gridSize) * this.gridSize + x],
            trails[y * this.gridSize + ((x - 1 + this.gridSize) % this.gridSize)],
            trails[y * this.gridSize + ((x + 1) % this.gridSize)],
            // 4 diagonals
            trails[((y - 1 + this.gridSize) % this.gridSize) * this.gridSize + ((x - 1 + this.gridSize) % this.gridSize)],
            trails[((y - 1 + this.gridSize) % this.gridSize) * this.gridSize + ((x + 1) % this.gridSize)],
            trails[((y + 1) % this.gridSize) * this.gridSize + ((x - 1 + this.gridSize) % this.gridSize)],
            trails[((y + 1) % this.gridSize) * this.gridSize + ((x + 1) % this.gridSize)],
          ];

          const sum = neighbors.reduce((a, b) => a + b, 0) + trails[idx];
          const avg = sum / 9;

          // Apply decay
          let blurred = avg * decayRate;

          // Apply fade (exponential decay for high values)
          if (blurred > 100) {
            blurred -= (blurred - 100) * fadeStrength;
          }

          temp[idx] = Math.max(0, blurred);
        }
      }

      // Swap buffers
      this.trails[channel] = temp;
      this.tempTrails[channel] = trails;
    }
  }

  public getAgents(): Agent[] {
    return this.agents;
  }

  public getTrails(): Trails {
    return this.trails;
  }

  public getFrameCount(): number {
    return this.frameCount;
  }

  public getGridSize(): number {
    return this.gridSize;
  }
}
