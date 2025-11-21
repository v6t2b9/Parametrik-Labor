import type { Agent, Trails, AllParameters, AgentType, ResolvedSpeciesParams } from '../types/index.js';

const GRID_SIZE = 400;

// Helper: Calculate grid dimensions from aspect ratio while maintaining similar area
export function calculateGridDimensions(aspectRatio: string): { width: number; height: number } {
  const [w, h] = aspectRatio.split(':').map(Number);
  const baseArea = GRID_SIZE * GRID_SIZE; // 160,000

  // Calculate dimensions that maintain the aspect ratio and approximate area
  const width = Math.round(Math.sqrt(baseArea * w / h));
  const height = Math.round(Math.sqrt(baseArea * h / w));

  return { width, height };
}

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
  protected gridWidth: number;
  protected gridHeight: number;
  private frameCount: number = 0;
  private params: AllParameters;

  constructor(gridWidth: number = GRID_SIZE, gridHeight: number = GRID_SIZE) {
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.trails = this.createTrails();
    this.tempTrails = this.createTrails();
    this.params = {} as AllParameters; // Will be set via setParameters
  }

  private createTrails(): Trails {
    const size = this.gridWidth * this.gridHeight;
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
        x: Math.random() * this.gridWidth,
        y: Math.random() * this.gridHeight,
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
    if (agent.x < 0) agent.x += this.gridWidth;
    if (agent.x >= this.gridWidth) agent.x -= this.gridWidth;
    if (agent.y < 0) agent.y += this.gridHeight;
    if (agent.y >= this.gridHeight) agent.y -= this.gridHeight;

    // Deposit chemical trace
    const x = Math.floor(agent.x);
    const y = Math.floor(agent.y);
    const idx = y * this.gridWidth + x;

    if (idx >= 0 && idx < this.gridWidth * this.gridHeight) {
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
    const wx = ((x % this.gridWidth) + this.gridWidth) % this.gridWidth;
    const wy = ((y % this.gridHeight) + this.gridHeight) % this.gridHeight;

    const idx = Math.floor(wy) * this.gridWidth + Math.floor(wx);

    if (idx < 0 || idx >= this.gridWidth * this.gridHeight) {
      return 0;
    }

    // Performance optimization: Cache trail references and matrix
    const trails = this.trails;
    const matrix = resonance.interactionMatrix;
    const crossSpecies = resonance.crossSpeciesInteraction;

    // Universal Baseline Settings as global multipliers
    const attractionMult = resonance.attractionStrength; // Multiplies same-species interactions
    const repulsionMult = resonance.repulsionStrength;   // Multiplies cross-species interactions

    // Optimized calculation based on agent type
    // Universal Settings multiply matrix values for global control
    // Early exit optimization: Only read cross-species trails if enabled
    switch (agent.type) {
      case 'red':
        return (trails.red[idx] * matrix.redToRed * attractionMult) +
          (crossSpecies ? (trails.green[idx] * matrix.redToGreen + trails.blue[idx] * matrix.redToBlue) * repulsionMult : 0);
      case 'green':
        return (trails.green[idx] * matrix.greenToGreen * attractionMult) +
          (crossSpecies ? (trails.red[idx] * matrix.greenToRed + trails.blue[idx] * matrix.greenToBlue) * repulsionMult : 0);
      case 'blue':
        return (trails.blue[idx] * matrix.blueToBlue * attractionMult) +
          (crossSpecies ? (trails.red[idx] * matrix.blueToRed + trails.green[idx] * matrix.blueToGreen) * repulsionMult : 0);
      default:
        return 0;
    }
  }

  private diffuseAndDecay(): void {
    // Use universal physical params for trail dynamics
    const { physical } = this.params.universal;
    const { decayRate, fadeStrength } = physical;

    for (const channel of ['red', 'green', 'blue'] as AgentType[]) {
      const trails = this.trails[channel];
      const temp = this.tempTrails[channel];

      for (let y = 0; y < this.gridHeight; y++) {
        for (let x = 0; x < this.gridWidth; x++) {
          const idx = y * this.gridWidth + x;

          // Get neighbors (8-connected: includes diagonals)
          const neighbors = [
            // 4-connected (cardinal directions)
            trails[((y - 1 + this.gridHeight) % this.gridHeight) * this.gridWidth + x],
            trails[((y + 1) % this.gridHeight) * this.gridWidth + x],
            trails[y * this.gridWidth + ((x - 1 + this.gridWidth) % this.gridWidth)],
            trails[y * this.gridWidth + ((x + 1) % this.gridWidth)],
            // 4 diagonals
            trails[((y - 1 + this.gridHeight) % this.gridHeight) * this.gridWidth + ((x - 1 + this.gridWidth) % this.gridWidth)],
            trails[((y - 1 + this.gridHeight) % this.gridHeight) * this.gridWidth + ((x + 1) % this.gridWidth)],
            trails[((y + 1) % this.gridHeight) * this.gridWidth + ((x - 1 + this.gridWidth) % this.gridWidth)],
            trails[((y + 1) % this.gridHeight) * this.gridWidth + ((x + 1) % this.gridWidth)],
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

  public getGridWidth(): number {
    return this.gridWidth;
  }

  public getGridHeight(): number {
    return this.gridHeight;
  }

  // Deprecated: For backwards compatibility
  public getGridSize(): number {
    return this.gridWidth;
  }
}
