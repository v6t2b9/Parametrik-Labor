/**
 * Quantum-Inspired Stigmergy Engine
 * Implements M1 (Classical), M2 (Context-Switching), and M3 (Quantum-Inspired) models
 * Based on Supplement B: Computational Model Protocol
 */

import type {
  Agent,
  Trails,
  PheromonePhases,
  AllParameters,
  AgentType,
  ResolvedSpeciesParams,
  StigmergyModel,
  ContextMode,
  QuantumAmplitudes,
} from '../types/index.js';

import {
  initializeQuantumState,
  normalizeAmplitudes,
  measureDirection,
  effectiveStrengthWithPhase,
  cmul,
  cadd,
  cscale,
  cexp,
  cabs2,
} from './ComplexMath.js';

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
  };
}

export class QuantumStigmergyEngine {
  private agents: Agent[] = [];
  private trails: Trails;
  private phases: PheromonePhases; // For M3
  private tempTrails: Trails;
  private tempPhases: PheromonePhases;
  private gridSize: number;
  private frameCount: number = 0;
  private params: AllParameters;
  private totalFoodCollected: number = 0; // For M3 context switching

  constructor(gridSize: number = GRID_SIZE) {
    this.gridSize = gridSize;
    this.trails = this.createTrails();
    this.phases = this.createPhases();
    this.tempTrails = this.createTrails();
    this.tempPhases = this.createPhases();
    this.params = {} as AllParameters;
  }

  private createTrails(): Trails {
    const size = this.gridSize * this.gridSize;
    return {
      red: new Float32Array(size),
      green: new Float32Array(size),
      blue: new Float32Array(size),
    };
  }

  private createPhases(): PheromonePhases {
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
    const model = this.params.modelParams.model;

    for (let i = 0; i < count; i++) {
      const agent: Agent = {
        x: Math.random() * this.gridSize,
        y: Math.random() * this.gridSize,
        angle: Math.random() * Math.PI * 2,
        type: types[i % 3],
        rhythmPhase: Math.random() * Math.PI * 2,
      };

      // Initialize M2 context mode
      if (model === 'M2') {
        agent.contextMode = 'explore';
      }

      // Initialize M3 quantum state
      if (model === 'M3') {
        agent.quantumAmplitudes = initializeQuantumState();
        agent.internalPhase = Math.random() * Math.PI * 2;
      }

      this.agents.push(agent);
    }
  }

  public reset(): void {
    this.trails = this.createTrails();
    this.phases = this.createPhases();
    this.tempTrails = this.createTrails();
    this.tempPhases = this.createPhases();
    this.frameCount = 0;
    this.totalFoodCollected = 0;
    this.initializeAgents(this.params.globalTemporal.agentCount);
  }

  public update(): void {
    const universalPhysical = this.params.universal.physical;
    const model = this.params.modelParams.model;

    // Update each agent based on selected model
    for (const agent of this.agents) {
      switch (model) {
        case 'M1':
          this.updateAgentM1(agent);
          break;
        case 'M2':
          this.updateAgentM2(agent);
          break;
        case 'M3':
          this.updateAgentM3(agent);
          break;
      }
    }

    // Diffuse and decay trails
    if (this.frameCount % universalPhysical.diffusionFreq === 0) {
      if (model === 'M3') {
        this.diffuseAndDecayM3(); // With phase evolution
      } else {
        this.diffuseAndDecay(); // Classical
      }
    }

    this.frameCount++;
  }

  /**
   * M1: Classical Stigmergy (Baseline)
   * Standard pheromone-based navigation
   */
  private updateAgentM1(agent: Agent): void {
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

    const forward = this.senseM1(agent, agent.angle, sensorDistPixels, resonance);
    const left = this.senseM1(agent, agent.angle - sensorOffsetAngle, sensorDistPixels, resonance);
    const right = this.senseM1(agent, agent.angle + sensorOffsetAngle, sensorDistPixels, resonance);

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

    // Move agent
    const effectiveSpeed = temporal.speed * simulationSpeed;
    agent.x += Math.cos(agent.angle) * effectiveSpeed;
    agent.y += Math.sin(agent.angle) * effectiveSpeed;

    // Wrap around edges
    this.wrapAgent(agent);

    // Deposit chemical trace
    this.depositTrail(agent, semiotic.deposit, physical.trailSaturation);
  }

  /**
   * M2: Classical + Context-Switching
   * Agents switch between explore/exploit modes based on local pheromone density
   */
  private updateAgentM2(agent: Agent): void {
    const speciesParams = resolveSpeciesParams(this.params, agent.type);
    const { semiotic, temporal, resonance, physical } = speciesParams;
    const { simulationSpeed } = this.params.globalTemporal;
    const { highThreshold, lowThreshold, explorationNoise } = this.params.modelParams.m2;

    // Check local pheromone density for context switching
    const x = Math.floor(agent.x);
    const y = Math.floor(agent.y);
    const idx = y * this.gridSize + x;
    const localDensity = this.trails[agent.type][idx];

    // Update context mode
    if (!agent.contextMode) agent.contextMode = 'explore';

    if (localDensity > highThreshold && agent.contextMode === 'explore') {
      agent.contextMode = 'exploit';
    }
    if (localDensity < lowThreshold && agent.contextMode === 'exploit') {
      agent.contextMode = 'explore';
    }

    // Apply rhythmic perturbation
    if (temporal.chaosInterval > 0 && this.frameCount % temporal.chaosInterval === 0) {
      agent.rhythmPhase += (Math.random() - 0.5) * temporal.chaosStrength * Math.PI;
    }

    // Sense environment
    const sensorDistPixels = semiotic.sensorDist;
    const sensorOffsetAngle = semiotic.sensorAngle;

    let forward = this.senseM1(agent, agent.angle, sensorDistPixels, resonance);
    let left = this.senseM1(agent, agent.angle - sensorOffsetAngle, sensorDistPixels, resonance);
    let right = this.senseM1(agent, agent.angle + sensorOffsetAngle, sensorDistPixels, resonance);

    // Add noise in explore mode
    if (agent.contextMode === 'explore') {
      forward += (Math.random() - 0.5) * explorationNoise * 100;
      left += (Math.random() - 0.5) * explorationNoise * 100;
      right += (Math.random() - 0.5) * explorationNoise * 100;
    }

    // Steering logic (same as M1)
    if (forward > left && forward > right) {
      // Continue forward
    } else if (forward < left && forward < right) {
      agent.angle += (Math.random() - 0.5) * semiotic.turnSpeed;
    } else if (left > right) {
      agent.angle -= semiotic.turnSpeed;
    } else {
      agent.angle += semiotic.turnSpeed;
    }

    // Add rhythmic variation
    agent.angle += Math.sin(agent.rhythmPhase) * 0.05;
    agent.rhythmPhase += 0.02;

    // Move agent
    const effectiveSpeed = temporal.speed * simulationSpeed;
    agent.x += Math.cos(agent.angle) * effectiveSpeed;
    agent.y += Math.sin(agent.angle) * effectiveSpeed;

    // Wrap around edges
    this.wrapAgent(agent);

    // Deposit chemical trace
    this.depositTrail(agent, semiotic.deposit, physical.trailSaturation);
  }

  /**
   * M3: Quantum-Inspired Stigmergy
   * Superposition states + phase-dependent trail interpretation + context operators
   */
  private updateAgentM3(agent: Agent): void {
    const speciesParams = resolveSpeciesParams(this.params, agent.type);
    const { semiotic, temporal, resonance, physical } = speciesParams;
    const { simulationSpeed } = this.params.globalTemporal;
    const { phaseRotationRate, amplitudeCoupling, contextThreshold, phaseNoise } =
      this.params.modelParams.m3;

    // Initialize quantum state if needed
    if (!agent.quantumAmplitudes) {
      agent.quantumAmplitudes = initializeQuantumState();
    }
    if (agent.internalPhase === undefined) {
      agent.internalPhase = 0;
    }

    // Apply rhythmic perturbation
    if (temporal.chaosInterval > 0 && this.frameCount % temporal.chaosInterval === 0) {
      agent.rhythmPhase += (Math.random() - 0.5) * temporal.chaosStrength * Math.PI;
    }

    // Sense environment with phase information
    const sensorDistPixels = semiotic.sensorDist;
    const sensorOffsetAngle = semiotic.sensorAngle;

    const sensorForward = this.senseM3(agent, agent.angle, sensorDistPixels, resonance);
    const sensorLeft = this.senseM3(agent, agent.angle - sensorOffsetAngle, sensorDistPixels, resonance);
    const sensorRight = this.senseM3(agent, agent.angle + sensorOffsetAngle, sensorDistPixels, resonance);

    // Update quantum amplitudes (coupled dynamics)
    const ψ = agent.quantumAmplitudes!;
    const κ = amplitudeCoupling;

    // Coupling: each direction influenced by neighbors
    const δψ_left = cscale(cmul(ψ.forward, cexp(sensorForward.phase)), κ);
    const δψ_forward = cadd(
      cscale(cmul(ψ.left, cexp(sensorLeft.phase)), κ),
      cscale(cmul(ψ.right, cexp(sensorRight.phase)), κ)
    );
    const δψ_right = cscale(cmul(ψ.forward, cexp(sensorForward.phase)), κ);

    // Update amplitudes
    ψ.left = cadd(ψ.left, δψ_left);
    ψ.forward = cadd(ψ.forward, δψ_forward);
    ψ.right = cadd(ψ.right, δψ_right);

    // Normalize
    agent.quantumAmplitudes = normalizeAmplitudes(ψ);

    // Measure (collapse to classical choice)
    const direction = measureDirection(agent.quantumAmplitudes);

    // Turn based on measurement
    if (direction === 'left') {
      agent.angle -= semiotic.turnSpeed;
    } else if (direction === 'right') {
      agent.angle += semiotic.turnSpeed;
    }
    // 'forward' → no turn

    // Add rhythmic variation
    agent.angle += Math.sin(agent.rhythmPhase) * 0.05;
    agent.rhythmPhase += 0.02;

    // Move agent
    const effectiveSpeed = temporal.speed * simulationSpeed;
    agent.x += Math.cos(agent.angle) * effectiveSpeed;
    agent.y += Math.sin(agent.angle) * effectiveSpeed;

    // Wrap around edges
    this.wrapAgent(agent);

    // Deposit chemical trace with phase
    const depositPhase = (agent.internalPhase! + Math.random() * phaseNoise) % (2 * Math.PI);
    this.depositTrailWithPhase(agent, semiotic.deposit, physical.trailSaturation, depositPhase);

    // Evolve internal phase
    agent.internalPhase! += phaseRotationRate;
    agent.internalPhase! = agent.internalPhase! % (2 * Math.PI);
  }

  /**
   * M1/M2: Classical sensing (magnitude only)
   */
  private senseM1(
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

  /**
   * M3: Quantum sensing (magnitude + phase)
   */
  private senseM3(
    agent: Agent,
    angle: number,
    distance: number,
    resonance: ResolvedSpeciesParams['resonance']
  ): { magnitude: number; phase: number } {
    const x = agent.x + Math.cos(angle) * distance;
    const y = agent.y + Math.sin(angle) * distance;

    // Wrap coordinates
    const wx = ((x % this.gridSize) + this.gridSize) % this.gridSize;
    const wy = ((y % this.gridSize) + this.gridSize) % this.gridSize;

    const idx = Math.floor(wy) * this.gridSize + Math.floor(wx);

    if (idx < 0 || idx >= this.gridSize * this.gridSize) {
      return { magnitude: 0, phase: 0 };
    }

    // Read own type trail with phase
    const magnitude = this.trails[agent.type][idx];
    const phase = this.phases[agent.type][idx];

    // Apply phase-dependent interpretation
    const effectiveStrength = effectiveStrengthWithPhase(magnitude, phase);

    // For simplicity, cross-species interaction uses magnitude only (classical)
    let crossSignal = 0;
    if (resonance.crossSpeciesInteraction) {
      const types: AgentType[] = ['red', 'green', 'blue'];
      for (const type of types) {
        if (type !== agent.type) {
          crossSignal += this.trails[type][idx] * resonance.repulsionStrength;
        }
      }
    }

    return {
      magnitude: effectiveStrength * resonance.attractionStrength + crossSignal,
      phase: phase,
    };
  }

  /**
   * Classical trail deposition
   */
  private depositTrail(agent: Agent, deposit: number, saturation: number): void {
    const x = Math.floor(agent.x);
    const y = Math.floor(agent.y);
    const idx = y * this.gridSize + x;

    if (idx >= 0 && idx < this.gridSize * this.gridSize) {
      const currentValue = this.trails[agent.type][idx];
      const newValue = Math.min(currentValue + deposit, saturation);
      this.trails[agent.type][idx] = newValue;
    }
  }

  /**
   * M3: Trail deposition with phase
   */
  private depositTrailWithPhase(
    agent: Agent,
    deposit: number,
    saturation: number,
    phase: number
  ): void {
    const x = Math.floor(agent.x);
    const y = Math.floor(agent.y);
    const idx = y * this.gridSize + x;

    if (idx >= 0 && idx < this.gridSize * this.gridSize) {
      const currentValue = this.trails[agent.type][idx];
      const newValue = Math.min(currentValue + deposit, saturation);
      this.trails[agent.type][idx] = newValue;

      // Update phase (weighted average with existing phase)
      const currentPhase = this.phases[agent.type][idx];
      if (currentValue < 1) {
        // No existing trail, use new phase
        this.phases[agent.type][idx] = phase;
      } else {
        // Weighted average: favor stronger trail's phase
        const weight = deposit / (currentValue + deposit);
        this.phases[agent.type][idx] = currentPhase * (1 - weight) + phase * weight;
      }
    }
  }

  /**
   * Classical diffusion and decay
   */
  private diffuseAndDecay(): void {
    const { physical } = this.params.universal;
    const { decayRate, fadeStrength } = physical;

    for (const channel of ['red', 'green', 'blue'] as AgentType[]) {
      const trails = this.trails[channel];
      const temp = this.tempTrails[channel];

      for (let y = 0; y < this.gridSize; y++) {
        for (let x = 0; x < this.gridSize; x++) {
          const idx = y * this.gridSize + x;

          // Get neighbors (8-connected)
          const neighbors = [
            trails[((y - 1 + this.gridSize) % this.gridSize) * this.gridSize + x],
            trails[((y + 1) % this.gridSize) * this.gridSize + x],
            trails[y * this.gridSize + ((x - 1 + this.gridSize) % this.gridSize)],
            trails[y * this.gridSize + ((x + 1) % this.gridSize)],
            trails[((y - 1 + this.gridSize) % this.gridSize) * this.gridSize + ((x - 1 + this.gridSize) % this.gridSize)],
            trails[((y - 1 + this.gridSize) % this.gridSize) * this.gridSize + ((x + 1) % this.gridSize)],
            trails[((y + 1) % this.gridSize) * this.gridSize + ((x - 1 + this.gridSize) % this.gridSize)],
            trails[((y + 1) % this.gridSize) * this.gridSize + ((x + 1) % this.gridSize)],
          ];

          const sum = neighbors.reduce((a, b) => a + b, 0) + trails[idx];
          const avg = sum / 9;

          // Apply decay
          let blurred = avg * decayRate;

          // Apply fade
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

  /**
   * M3: Diffusion and decay with phase evolution
   */
  private diffuseAndDecayM3(): void {
    const { physical } = this.params.universal;
    const { decayRate, fadeStrength } = physical;
    const { phaseRotationRate, phaseNoise } = this.params.modelParams.m3;

    for (const channel of ['red', 'green', 'blue'] as AgentType[]) {
      const trails = this.trails[channel];
      const phases = this.phases[channel];
      const temp = this.tempTrails[channel];
      const tempPhases = this.tempPhases[channel];

      for (let y = 0; y < this.gridSize; y++) {
        for (let x = 0; x < this.gridSize; x++) {
          const idx = y * this.gridSize + x;

          // Diffuse magnitude (same as classical)
          const neighbors = [
            trails[((y - 1 + this.gridSize) % this.gridSize) * this.gridSize + x],
            trails[((y + 1) % this.gridSize) * this.gridSize + x],
            trails[y * this.gridSize + ((x - 1 + this.gridSize) % this.gridSize)],
            trails[y * this.gridSize + ((x + 1) % this.gridSize)],
            trails[((y - 1 + this.gridSize) % this.gridSize) * this.gridSize + ((x - 1 + this.gridSize) % this.gridSize)],
            trails[((y - 1 + this.gridSize) % this.gridSize) * this.gridSize + ((x + 1) % this.gridSize)],
            trails[((y + 1) % this.gridSize) * this.gridSize + ((x - 1 + this.gridSize) % this.gridSize)],
            trails[((y + 1) % this.gridSize) * this.gridSize + ((x + 1) % this.gridSize)],
          ];

          const sum = neighbors.reduce((a, b) => a + b, 0) + trails[idx];
          const avg = sum / 9;

          let blurred = avg * decayRate;

          if (blurred > 100) {
            blurred -= (blurred - 100) * fadeStrength;
          }

          temp[idx] = Math.max(0, blurred);

          // Evolve phase (trails "age")
          let newPhase = phases[idx] + phaseRotationRate + (Math.random() - 0.5) * phaseNoise;
          newPhase = newPhase % (2 * Math.PI);
          tempPhases[idx] = newPhase;
        }
      }

      // Swap buffers
      this.trails[channel] = temp;
      this.tempTrails[channel] = trails;
      this.phases[channel] = tempPhases;
      this.tempPhases[channel] = phases;
    }
  }

  private wrapAgent(agent: Agent): void {
    if (agent.x < 0) agent.x += this.gridSize;
    if (agent.x >= this.gridSize) agent.x -= this.gridSize;
    if (agent.y < 0) agent.y += this.gridSize;
    if (agent.y >= this.gridSize) agent.y -= this.gridSize;
  }

  // Public API
  public getAgents(): Agent[] {
    return this.agents;
  }

  public getTrails(): Trails {
    return this.trails;
  }

  public getPhases(): PheromonePhases {
    return this.phases;
  }

  public getFrameCount(): number {
    return this.frameCount;
  }

  public getGridSize(): number {
    return this.gridSize;
  }

  public getModel(): StigmergyModel {
    return this.params.modelParams.model;
  }
}
