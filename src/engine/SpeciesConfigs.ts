/**
 * Species Configuration Presets
 * Defines the 5 core species with their behavioral parameters
 */

import type { SpeciesConfig, SpeciesType, EcologyConfig, CrystalType } from '../types/ecosystem.js';

// ============================================================================
// Species Presets
// ============================================================================

export const SPECIES_CONFIGS: Record<SpeciesType, SpeciesConfig> = {
  builder: {
    name: 'Builder',
    color: [255, 150, 50],  // Warm Orange
    maxSpeed: 1.2,
    energyDecay: 0.002,
    defaultState: 'BUILD',
    receptors: {
      build: 2.0,    // Moderate attraction to build sites
      food: 4.0,     // Strong attraction to food (needs energy)
      home: 0.5,
      explore: 1.0,
    },
    diet: ['food'],  // Builders eat food to get energy
    produces: 'build', // Builders create build crystals
    visualTrailLength: 30,
    consumptionRate: 0.08,
    reproductionThreshold: 0.7,
    reproductionCost: 0.3,
    description: 'Methodical builders that create structures. Feed on food crystals and deposit build pheromones.',
  },

  harvester: {
    name: 'Harvester',
    color: [100, 255, 150], // Fresh Green
    maxSpeed: 1.5,
    energyDecay: 0.003,
    defaultState: 'HARVEST',
    receptors: {
      build: 4.0,    // Strong attraction to build crystals (to harvest)
      food: 1.5,
      home: 0.5,
      explore: 2.0,
    },
    diet: ['build'],  // Harvesters convert build → food
    produces: 'food',
    visualTrailLength: 25,
    consumptionRate: 0.10,
    reproductionThreshold: 0.65,
    reproductionCost: 0.25,
    description: 'Efficient harvesters that convert build structures into food resources.',
  },

  consumer: {
    name: 'Consumer',
    color: [255, 100, 255], // Vibrant Magenta
    maxSpeed: 2.0,  // Fast, aggressive
    energyDecay: 0.005,  // High energy cost
    defaultState: 'HUNT',
    receptors: {
      build: 0.5,
      food: 5.0,     // Very strong attraction to food
      home: 2.0,     // Attracted to home territory
      explore: 1.0,
    },
    diet: ['food'],  // Consumers hunt food crystals
    produces: 'home',
    visualTrailLength: 40,
    consumptionRate: 0.15,  // Fast consumption
    reproductionThreshold: 0.75,
    reproductionCost: 0.35,
    description: 'Aggressive consumers that hunt food crystals and mark territory.',
  },

  decomposer: {
    name: 'Decomposer',
    color: [150, 100, 200], // Deep Purple
    maxSpeed: 1.0,  // Slower, methodical
    energyDecay: 0.001,  // Very efficient
    defaultState: 'DECOMPOSE',
    receptors: {
      build: 2.0,
      food: 2.0,
      home: 2.0,
      explore: 3.0,
    },
    diet: ['build', 'food', 'home'], // Can eat all crystal types
    produces: 'explore',
    visualTrailLength: 35,
    consumptionRate: 0.08,
    reproductionThreshold: 0.6,
    reproductionCost: 0.2,
    description: 'Versatile decomposers that recycle all crystal types and open new territories.',
  },

  scout: {
    name: 'Scout',
    color: [100, 200, 255], // Sky Blue
    maxSpeed: 2.5,  // Fastest
    energyDecay: 0.004,
    defaultState: 'SCOUT',
    receptors: {
      build: 0.5,
      food: 1.0,     // Minimal food seeking
      home: 0.5,
      explore: 4.0,  // Strong attraction to unexplored areas
    },
    diet: ['food'],  // Scouts eat minimal food
    produces: 'explore',
    visualTrailLength: 50,  // Longest trails
    consumptionRate: 0.05,  // Slow consumption
    reproductionThreshold: 0.8,
    reproductionCost: 0.4,
    description: 'Fast scouts that explore new territories and mark pathways.',
  },
};

// ============================================================================
// Default Ecology Configuration
// ============================================================================

export const DEFAULT_ECOLOGY_CONFIG: EcologyConfig = {
  // Crystal settings
  crystalEnergyStart: 1.0,
  crystalDecayRate: 0.001,
  crystalFormationThreshold: 150, // Pheromone level to form crystal

  // Consumption rates
  consumptionRates: {
    builder: 0.08,
    harvester: 0.10,
    consumer: 0.15,
    decomposer: 0.08,
    scout: 0.05,
  },

  // Conversion efficiency
  conversionEfficiency: {
    build_to_energy: 0.30,    // Build crystal → 30% energy
    food_to_energy: 0.80,     // Food crystal → 80% energy
    home_to_energy: 0.50,     // Home crystal → 50% energy
    explore_to_energy: 0.20,  // Explore crystal → 20% energy
  },

  // Population dynamics
  population: {
    maxPopulation: 300,
    initialPopulation: {
      builder: 50,
      harvester: 40,
      consumer: 30,
      decomposer: 20,
      scout: 10,
      total: 150,
    },
    reproductionRates: {
      builder: 0.002,
      harvester: 0.003,
      consumer: 0.002,
      decomposer: 0.001,
      scout: 0.001,
    },
    deathRates: {
      builder: 0.001,
      harvester: 0.001,
      consumer: 0.002,
      decomposer: 0.0005,
      scout: 0.0015,
    },
  },

  // Audio-ecology mapping
  audioEcology: {
    bassBoosts: ['builder'],           // Bass → builders
    midBoosts: ['harvester'],          // Mids → harvesters
    highBoosts: ['scout', 'decomposer'], // Highs → scouts & decomposers
    transientBoosts: ['consumer'],     // Beats → consumers
    boostStrength: 1.5,
  },
};

// ============================================================================
// Helper Functions
// ============================================================================

export function getSpeciesConfig(species: SpeciesType): SpeciesConfig {
  return SPECIES_CONFIGS[species];
}

export function canConsume(species: SpeciesType, crystalType: string): boolean {
  const config = SPECIES_CONFIGS[species];
  return config.diet.includes(crystalType as CrystalType);
}

export function getConversionEfficiency(crystalType: string): number {
  const key = `${crystalType}_to_energy`;
  return DEFAULT_ECOLOGY_CONFIG.conversionEfficiency[key] || 0.5;
}

// ============================================================================
// State Machine Behaviors
// ============================================================================

export const BEHAVIOR_DESCRIPTIONS: Record<string, string> = {
  IDLE: 'Resting or waiting for stimuli',
  EXPLORE: 'Wandering to discover new areas',
  SEEK_FOOD: 'Actively searching for food crystals',
  APPROACH_CRYSTAL: 'Moving toward a target crystal',
  CONSUME: 'Consuming a crystal for energy',
  BUILD: 'Depositing build pheromones to create structures',
  HARVEST: 'Converting build crystals to food',
  HUNT: 'Aggressively seeking food crystals',
  DECOMPOSE: 'Recycling old crystals',
  SCOUT: 'Exploring and marking new territories',
  FLEE: 'Avoiding danger or overcrowded areas',
  REPRODUCE: 'Creating offspring',
};
