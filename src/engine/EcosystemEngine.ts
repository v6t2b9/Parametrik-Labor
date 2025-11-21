/**
 * Multi-Species Ecosystem Engine
 * Extends QuantumStigmergyEngine with:
 * - Crystal formation and consumption
 * - Multi-species agents with energy/lifecycle
 * - Population dynamics (birth/death)
 * - Audio-ecology mapping
 */

import { QuantumStigmergyEngine } from './QuantumStigmergyEngine.js';
import { Crystal, CrystalGrid, createCrystalFromPheromone } from './Crystal.js';
import { DEFAULT_ECOLOGY_CONFIG, getSpeciesConfig, canConsume, getConversionEfficiency } from './SpeciesConfigs.js';
import type {
  EcosystemAgent,
  SpeciesType,
  CrystalType,
  PopulationStats,
  SpeciesBoosts,
  EcologyConfig,
  SpeciesConfig,
} from '../types/ecosystem.js';
import type { AllParameters } from '../types/index.js';

export class EcosystemEngine extends QuantumStigmergyEngine {
  // Ecosystem state
  private ecosystemAgents: EcosystemAgent[] = [];
  private crystals: Crystal[] = [];
  private crystalGrid: CrystalGrid;
  private ecologyConfig: EcologyConfig;

  // Population tracking
  private populationStats: PopulationStats = {
    builder: 0,
    harvester: 0,
    consumer: 0,
    decomposer: 0,
    scout: 0,
    total: 0,
  };

  // Audio-ecology boosts
  private speciesBoosts: SpeciesBoosts = {
    builder: 1.0,
    harvester: 1.0,
    consumer: 1.0,
    decomposer: 1.0,
    scout: 1.0,
  };

  // Performance tracking
  private crystalFormationCounter = 0;

  constructor(gridWidth: number = 400, gridHeight: number = 400) {
    super(gridWidth, gridHeight);
    this.crystalGrid = new CrystalGrid(Math.max(gridWidth, gridHeight)); // Use max dimension for now
    this.ecologyConfig = DEFAULT_ECOLOGY_CONFIG;
  }

  /**
   * Initialize ecosystem with species distribution
   */
  public initializeEcosystem(params: AllParameters): void {
    this.ecosystemAgents = [];
    this.crystals = [];
    this.crystalGrid.clear();
    this.setParameters(params);

    const { initialPopulation } = this.ecologyConfig.population;
    const gridWidth = this.getGridWidth();
    const gridHeight = this.getGridHeight();

    // Create initial population
    const species: SpeciesType[] = ['builder', 'harvester', 'consumer', 'decomposer', 'scout'];

    for (const speciesType of species) {
      const count = initialPopulation[speciesType];
      for (let i = 0; i < count; i++) {
        const agent = this.createAgent(speciesType, gridWidth, gridHeight);
        this.ecosystemAgents.push(agent);
      }
    }

    this.updatePopulationStats();
  }

  /**
   * Create a new ecosystem agent
   */
  private createAgent(species: SpeciesType, gridWidth: number, gridHeight: number): EcosystemAgent {
    const config = getSpeciesConfig(species);

    // Map species to pheromone type for trail compatibility
    const speciesTypeMap: Record<SpeciesType, 'red' | 'green' | 'blue'> = {
      builder: 'red',
      harvester: 'green',
      consumer: 'blue',
      decomposer: 'red',
      scout: 'blue',
    };

    return {
      x: Math.random() * gridWidth,
      y: Math.random() * gridHeight,
      angle: Math.random() * Math.PI * 2,
      rhythmPhase: Math.random() * Math.PI * 2,
      type: speciesTypeMap[species], // Assign pheromone type
      species,
      energy: 0.5 + Math.random() * 0.3, // Start with 50-80% energy
      behaviorState: config.defaultState,
      targetCrystal: null,
      age: 0,
      reproductionCooldown: 0,
      lastReproduction: 0,
    };
  }

  /**
   * Main update loop for ecosystem
   */
  public updateEcosystem(audioData?: {
    bass: number;
    mid: number;
    high: number;
    transient: number;
  }): void {
    // Update audio-ecology boosts
    if (audioData) {
      this.updateAudioBoosts(audioData);
    }

    // Update all agents
    for (let i = this.ecosystemAgents.length - 1; i >= 0; i--) {
      const agent = this.ecosystemAgents[i];

      // Update agent behavior and movement
      this.updateAgentBehavior(agent);

      // Apply energy decay
      const config = getSpeciesConfig(agent.species);
      agent.energy -= config.energyDecay * this.speciesBoosts[agent.species];

      // Check for death
      if (agent.energy <= 0) {
        this.ecosystemAgents.splice(i, 1);
        continue;
      }

      // Check for reproduction
      if (this.canReproduce(agent)) {
        this.reproduce(agent);
      }

      // Age agent
      agent.age++;
    }

    // Update crystals
    this.updateCrystals();

    // Form new crystals from pheromones
    if (this.getFrameCount() % 10 === 0) {
      this.formCrystalsFromPheromones();
    }

    // Update base stigmergy engine
    super.update();

    // Update population stats
    this.updatePopulationStats();
  }

  /**
   * Update agent behavior based on state machine
   */
  private updateAgentBehavior(agent: EcosystemAgent): void {
    const config = getSpeciesConfig(agent.species);

    // State machine logic
    switch (agent.behaviorState) {
      case 'IDLE':
      case 'EXPLORE':
        this.behaviorExplore(agent, config);
        break;

      case 'SEEK_FOOD':
        this.behaviorSeekFood(agent, config);
        break;

      case 'APPROACH_CRYSTAL':
        this.behaviorApproachCrystal(agent, config);
        break;

      case 'CONSUME':
        this.behaviorConsume(agent, config);
        break;

      case 'BUILD':
      case 'HARVEST':
      case 'HUNT':
      case 'DECOMPOSE':
      case 'SCOUT':
        this.behaviorSpeciesSpecific(agent, config);
        break;

      default:
        this.behaviorExplore(agent, config);
    }
  }

  /**
   * Explore behavior: wander and sense environment
   */
  private behaviorExplore(agent: EcosystemAgent, config: SpeciesConfig): void {
    // Check if low energy
    if (agent.energy < 0.3) {
      agent.behaviorState = 'SEEK_FOOD';
      return;
    }

    // Look for crystals based on diet and receptors
    const nearby = this.crystalGrid.getNearby(agent.x, agent.y, 50);
    let bestCrystal: Crystal | null = null;
    let bestScore = 0;

    for (const crystal of nearby) {
      if (canConsume(agent.species, crystal.type)) {
        const distance = crystal.distanceTo(agent.x, agent.y);
        const receptor = config.receptors[crystal.type] || 1.0;
        const score = (receptor * crystal.energy) / (distance + 1);

        if (score > bestScore) {
          bestScore = score;
          bestCrystal = crystal;
        }
      }
    }

    if (bestCrystal) {
      agent.targetCrystal = bestCrystal;
      agent.behaviorState = 'APPROACH_CRYSTAL';
      return;
    }

    // Random exploration movement
    agent.angle += (Math.random() - 0.5) * 0.3;
    agent.x += Math.cos(agent.angle) * config.maxSpeed;
    agent.y += Math.sin(agent.angle) * config.maxSpeed;

    this.wrapAgentPosition(agent);
  }

  /**
   * Seek food behavior: actively search for food crystals
   */
  private behaviorSeekFood(agent: EcosystemAgent, config: SpeciesConfig): void {
    const nearby = this.crystalGrid.getNearby(agent.x, agent.y, 80);
    let bestCrystal: Crystal | null = null;
    let bestDistance = Infinity;

    // Find nearest food crystal
    for (const crystal of nearby) {
      if (canConsume(agent.species, crystal.type)) {
        const distance = crystal.distanceTo(agent.x, agent.y);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestCrystal = crystal;
        }
      }
    }

    if (bestCrystal) {
      agent.targetCrystal = bestCrystal;
      agent.behaviorState = 'APPROACH_CRYSTAL';
      return;
    }

    // Move toward higher pheromone concentrations
    const gridWidth = this.getGridWidth();
    const gridHeight = this.getGridHeight();
    const trails = this.getTrails();

    // Sample food pheromone gradient
    const sampleDist = 20;
    const angles = [agent.angle - 0.5, agent.angle, agent.angle + 0.5];
    let bestAngle = agent.angle;
    let bestValue = 0;

    for (const angle of angles) {
      const x = agent.x + Math.cos(angle) * sampleDist;
      const y = agent.y + Math.sin(angle) * sampleDist;
      const wx = ((x % gridWidth) + gridWidth) % gridWidth;
      const wy = ((y % gridHeight) + gridHeight) % gridHeight;
      const idx = Math.floor(wy) * gridWidth + Math.floor(wx);

      // Check food pheromone (green channel for now, will map properly later)
      const value = trails.green[idx] || 0;
      if (value > bestValue) {
        bestValue = value;
        bestAngle = angle;
      }
    }

    agent.angle = bestAngle;
    agent.x += Math.cos(agent.angle) * config.maxSpeed;
    agent.y += Math.sin(agent.angle) * config.maxSpeed;

    this.wrapAgentPosition(agent);
  }

  /**
   * Approach crystal behavior
   */
  private behaviorApproachCrystal(agent: EcosystemAgent, config: SpeciesConfig): void {
    if (!agent.targetCrystal || agent.targetCrystal.isDepleted()) {
      agent.targetCrystal = null;
      agent.behaviorState = agent.energy < 0.3 ? 'SEEK_FOOD' : 'EXPLORE';
      return;
    }

    const crystal = agent.targetCrystal;
    const distance = crystal.distanceTo(agent.x, agent.y);

    // Reached crystal
    if (distance < 5) {
      agent.behaviorState = 'CONSUME';
      return;
    }

    // Move toward crystal
    const targetAngle = Math.atan2(crystal.y - agent.y, crystal.x - agent.x);
    agent.angle = targetAngle;
    agent.x += Math.cos(agent.angle) * config.maxSpeed;
    agent.y += Math.sin(agent.angle) * config.maxSpeed;

    this.wrapAgentPosition(agent);
  }

  /**
   * Consume crystal behavior
   */
  private behaviorConsume(agent: EcosystemAgent, config: SpeciesConfig): void {
    if (!agent.targetCrystal || agent.targetCrystal.isDepleted()) {
      agent.targetCrystal = null;
      agent.behaviorState = 'EXPLORE';
      return;
    }

    const crystal = agent.targetCrystal;

    // Consume energy
    const consumeAmount = config.consumptionRate;
    const actualConsumed = crystal.consume(consumeAmount);

    // Convert to agent energy
    const efficiency = getConversionEfficiency(crystal.type);
    agent.energy = Math.min(1.0, agent.energy + actualConsumed * efficiency);

    // If crystal depleted or agent full, return to exploring
    if (crystal.isDepleted() || agent.energy >= 0.9) {
      agent.targetCrystal = null;
      agent.behaviorState = 'EXPLORE';
    }
  }

  /**
   * Species-specific behaviors (BUILD, HARVEST, HUNT, etc.)
   */
  private behaviorSpeciesSpecific(agent: EcosystemAgent, config: SpeciesConfig): void {
    // For now, delegate to the appropriate behavior
    // In a full implementation, each would have unique logic

    switch (agent.behaviorState) {
      case 'BUILD':
        // Builders deposit build pheromones while exploring
        this.behaviorExplore(agent, config);
        break;

      case 'HARVEST':
        // Harvesters specifically look for build crystals
        if (agent.energy < 0.4) {
          agent.behaviorState = 'SEEK_FOOD';
        } else {
          this.behaviorExplore(agent, config);
        }
        break;

      case 'HUNT':
        // Consumers aggressively hunt food
        if (agent.energy < 0.5) {
          agent.behaviorState = 'SEEK_FOOD';
        } else {
          this.behaviorExplore(agent, config);
        }
        break;

      case 'DECOMPOSE':
        // Decomposers eat any crystal type
        this.behaviorExplore(agent, config);
        break;

      case 'SCOUT':
        // Scouts explore rapidly
        this.behaviorExplore(agent, config);
        break;
    }
  }

  /**
   * Update crystals (decay, removal)
   */
  private updateCrystals(): void {
    for (let i = this.crystals.length - 1; i >= 0; i--) {
      const crystal = this.crystals[i];

      if (!crystal.update()) {
        // Crystal depleted, remove it
        this.crystalGrid.remove(crystal);
        this.crystals.splice(i, 1);
      }
    }
  }

  /**
   * Form crystals from high pheromone concentrations
   */
  private formCrystalsFromPheromones(): void {
    const trails = this.getTrails();
    const gridWidth = this.getGridWidth();
    const gridHeight = this.getGridHeight();
    const threshold = this.ecologyConfig.crystalFormationThreshold;

    // Sample grid at regular intervals to avoid performance issues
    const step = 10;

    for (let y = 0; y < gridHeight; y += step) {
      for (let x = 0; x < gridWidth; x += step) {
        const idx = y * gridWidth + x;

        // Check each pheromone type
        const types: { type: CrystalType; value: number; species: SpeciesType }[] = [
          { type: 'build', value: trails.red[idx], species: 'builder' },
          { type: 'food', value: trails.green[idx], species: 'harvester' },
          { type: 'home', value: trails.blue[idx], species: 'consumer' },
        ];

        for (const { type, value, species } of types) {
          if (value > threshold) {
            // Check if crystal already exists nearby
            const existing = this.crystalGrid.getNearby(x, y, 10);
            if (existing.length === 0) {
              // Create new crystal
              const crystal = createCrystalFromPheromone(
                x,
                y,
                type,
                species,
                value,
                {
                  energyStart: this.ecologyConfig.crystalEnergyStart,
                  decayRate: this.ecologyConfig.crystalDecayRate,
                }
              );

              this.crystals.push(crystal);
              this.crystalGrid.add(crystal);
              this.crystalFormationCounter++;
            }
          }
        }
      }
    }
  }

  /**
   * Check if agent can reproduce
   */
  private canReproduce(agent: EcosystemAgent): boolean {
    const config = getSpeciesConfig(agent.species);
    const frameCount = this.getFrameCount();

    return (
      agent.energy >= config.reproductionThreshold &&
      agent.reproductionCooldown <= 0 &&
      this.populationStats.total < this.ecologyConfig.population.maxPopulation &&
      frameCount - agent.lastReproduction > 300 // Min 300 frames between reproductions
    );
  }

  /**
   * Reproduce: create offspring
   */
  private reproduce(agent: EcosystemAgent): void {
    const config = getSpeciesConfig(agent.species);
    const gridWidth = this.getGridWidth();
    const gridHeight = this.getGridHeight();

    // Create offspring near parent
    const offspring = this.createAgent(agent.species, gridWidth, gridHeight);
    offspring.x = agent.x + (Math.random() - 0.5) * 20;
    offspring.y = agent.y + (Math.random() - 0.5) * 20;
    offspring.angle = agent.angle + (Math.random() - 0.5) * Math.PI;
    offspring.energy = 0.4 + Math.random() * 0.2;

    this.ecosystemAgents.push(offspring);

    // Deduct energy from parent
    agent.energy -= config.reproductionCost;
    agent.reproductionCooldown = 200;
    agent.lastReproduction = this.getFrameCount();
  }

  /**
   * Update audio-ecology boosts based on audio features
   */
  private updateAudioBoosts(audioData: {
    bass: number;
    mid: number;
    high: number;
    transient: number;
  }): void {
    const { bassBoosts, midBoosts, highBoosts, transientBoosts, boostStrength } =
      this.ecologyConfig.audioEcology;

    // Reset boosts
    this.speciesBoosts = {
      builder: 1.0,
      harvester: 1.0,
      consumer: 1.0,
      decomposer: 1.0,
      scout: 1.0,
    };

    // Apply bass boosts
    const bassMultiplier = 1.0 + audioData.bass * boostStrength;
    for (const species of bassBoosts) {
      this.speciesBoosts[species] *= bassMultiplier;
    }

    // Apply mid boosts
    const midMultiplier = 1.0 + audioData.mid * boostStrength;
    for (const species of midBoosts) {
      this.speciesBoosts[species] *= midMultiplier;
    }

    // Apply high boosts
    const highMultiplier = 1.0 + audioData.high * boostStrength;
    for (const species of highBoosts) {
      this.speciesBoosts[species] *= highMultiplier;
    }

    // Apply transient boosts
    const transientMultiplier = 1.0 + audioData.transient * boostStrength;
    for (const species of transientBoosts) {
      this.speciesBoosts[species] *= transientMultiplier;
    }
  }

  /**
   * Update population statistics
   */
  private updatePopulationStats(): void {
    this.populationStats = {
      builder: 0,
      harvester: 0,
      consumer: 0,
      decomposer: 0,
      scout: 0,
      total: 0,
    };

    for (const agent of this.ecosystemAgents) {
      this.populationStats[agent.species]++;
      this.populationStats.total++;
    }
  }

  /**
   * Wrap agent position around edges
   */
  private wrapAgentPosition(agent: EcosystemAgent): void {
    const gridWidth = this.getGridWidth();
    const gridHeight = this.getGridHeight();
    if (agent.x < 0) agent.x += gridWidth;
    if (agent.x >= gridWidth) agent.x -= gridWidth;
    if (agent.y < 0) agent.y += gridHeight;
    if (agent.y >= gridHeight) agent.y -= gridHeight;
  }

  // ============================================================================
  // Public API
  // ============================================================================

  public getEcosystemAgents(): EcosystemAgent[] {
    return this.ecosystemAgents;
  }

  public getCrystals(): Crystal[] {
    return this.crystals;
  }

  public getPopulationStats(): PopulationStats {
    return { ...this.populationStats };
  }

  public getSpeciesBoosts(): SpeciesBoosts {
    return { ...this.speciesBoosts };
  }

  public getTotalCrystals(): number {
    return this.crystals.length;
  }

  public getTotalEnergy(): number {
    return this.crystals.reduce((sum, c) => sum + c.energy, 0);
  }

  /**
   * Override setParameters to update ecology configuration
   */
  public setParameters(params: AllParameters): void {
    super.setParameters(params);

    // Update ecology config if present in parameters
    if (params.ecosystem) {
      this.ecologyConfig = params.ecosystem;
    }
  }

  public resetEcosystem(params: AllParameters): void {
    this.crystals = [];
    this.crystalGrid.clear();
    this.crystalFormationCounter = 0;
    this.initializeEcosystem(params);
    this.reset();
  }

  /**
   * Override getAgents() to return ecosystem agents for pheromone trail generation
   * EcosystemAgent extends Agent interface, so this is compatible
   */
  public override getAgents(): EcosystemAgent[] {
    return this.ecosystemAgents;
  }
}
