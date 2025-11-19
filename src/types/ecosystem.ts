/**
 * Multi-Species Ecosystem Type Definitions
 * Defines crystals, species, and population dynamics
 */

// ============================================================================
// Crystal System
// ============================================================================

export type CrystalType = 'build' | 'food' | 'home' | 'explore';

export interface ICrystal {
  x: number;
  y: number;
  type: CrystalType;
  energy: number;        // 0.0 - 1.0
  age: number;           // frames since creation
  decayRate: number;     // energy loss per frame
  sourceSpecies: SpeciesType; // which species created this crystal
}

// ============================================================================
// Species System
// ============================================================================

export type SpeciesType = 'builder' | 'harvester' | 'consumer' | 'decomposer' | 'scout';

// Agent behavior states
export type BehaviorState =
  | 'IDLE'
  | 'EXPLORE'
  | 'SEEK_FOOD'
  | 'APPROACH_CRYSTAL'
  | 'CONSUME'
  | 'BUILD'
  | 'HARVEST'
  | 'HUNT'
  | 'DECOMPOSE'
  | 'SCOUT'
  | 'FLEE'
  | 'REPRODUCE';

// Pheromone receptor sensitivity configuration
export interface PheromoneReceptors {
  build: number;     // Sensitivity to BUILD pheromones (0-5)
  food: number;      // Sensitivity to FOOD pheromones
  home: number;      // Sensitivity to HOME pheromones
  explore: number;   // Sensitivity to EXPLORE pheromones
}

// Species configuration preset
export interface SpeciesConfig {
  name: string;
  color: [number, number, number]; // RGB color
  maxSpeed: number;                // Movement speed
  energyDecay: number;             // Energy loss per frame
  defaultState: BehaviorState;     // Initial behavior state
  receptors: PheromoneReceptors;   // Pheromone sensitivities
  diet: CrystalType[];            // Which crystal types can be consumed
  produces: CrystalType;          // Which crystal type is deposited
  visualTrailLength: number;       // Trail persistence
  consumptionRate: number;         // How fast crystals are consumed
  reproductionThreshold: number;   // Energy level needed to reproduce (0-1)
  reproductionCost: number;        // Energy cost of reproduction
  description: string;             // Species description
}

// Extended Agent with ecosystem properties
export interface EcosystemAgent {
  // Base properties (from original Agent)
  x: number;
  y: number;
  angle: number;
  rhythmPhase: number;
  type: import('./index.js').AgentType; // For pheromone trail compatibility (red/green/blue)

  // Quantum properties (optional, for M3)
  quantumAmplitudes?: import('./index.js').QuantumAmplitudes;
  internalPhase?: number;
  contextMode?: import('./index.js').ContextMode;

  // Ecosystem properties
  species: SpeciesType;
  energy: number;                  // 0.0 - 1.0
  behaviorState: BehaviorState;    // Current behavior
  targetCrystal: import('../engine/Crystal.js').Crystal | null; // Crystal being approached/consumed
  age: number;                     // Frames alive
  reproductionCooldown: number;    // Frames until can reproduce again
  lastReproduction: number;        // Frame count of last reproduction

  // Music-reactive properties (optional, added at runtime by MusicReactiveEngine)
  __musicVelocityBoost?: number;
  __musicAttractionPulse?: number;
  __musicRepulsionPulse?: number;
  __musicSpeedMult?: number;
  __musicDepositMult?: number;
  __musicTurnMult?: number;
  __musicAttractionMult?: number;
  __musicRepulsionMult?: number;
}

// ============================================================================
// Population Dynamics
// ============================================================================

export interface PopulationStats {
  builder: number;
  harvester: number;
  consumer: number;
  decomposer: number;
  scout: number;
  total: number;
}

export interface PopulationConfig {
  maxPopulation: number;           // Maximum total agents
  initialPopulation: PopulationStats;
  reproductionRates: {
    [K in SpeciesType]: number;    // Base reproduction rate per species
  };
  deathRates: {
    [K in SpeciesType]: number;    // Natural death rate per species
  };
}

// ============================================================================
// Audio-Ecology Mapping
// ============================================================================

export interface AudioEcologyConfig {
  // Which audio features boost which species
  bassBoosts: SpeciesType[];       // Bass → these species
  midBoosts: SpeciesType[];        // Mids → these species
  highBoosts: SpeciesType[];       // Highs → these species
  transientBoosts: SpeciesType[];  // Transients/beats → these species

  // Boost intensity
  boostStrength: number;           // 0-2, multiplier for audio influence
}

export interface SpeciesBoosts {
  builder: number;     // Current boost multiplier (1.0 = no boost)
  harvester: number;
  consumer: number;
  decomposer: number;
  scout: number;
}

// ============================================================================
// Ecology Configuration
// ============================================================================

export interface EcologyConfig {
  // Crystal settings
  crystalEnergyStart: number;      // Initial energy (0-1)
  crystalDecayRate: number;        // Energy loss per frame
  crystalFormationThreshold: number; // Pheromone level to form crystal

  // Consumption rates
  consumptionRates: {
    [K in SpeciesType]: number;    // How much energy consumed per frame
  };

  // Conversion efficiency (crystal energy → agent energy)
  conversionEfficiency: {
    [key: string]: number;         // e.g., "build_to_food": 0.3
  };

  // Population dynamics
  population: PopulationConfig;

  // Audio mapping
  audioEcology: AudioEcologyConfig;
}

// ============================================================================
// Constants
// ============================================================================

export const SPECIES_COLORS: Record<SpeciesType, [number, number, number]> = {
  builder: [255, 150, 50],    // Warm Orange
  harvester: [100, 255, 150], // Fresh Green
  consumer: [255, 100, 255],  // Vibrant Magenta
  decomposer: [150, 100, 200],// Deep Purple
  scout: [100, 200, 255],     // Sky Blue
};

export const CRYSTAL_COLORS: Record<CrystalType, [number, number, number]> = {
  build: [255, 150, 50],   // Orange (from builders)
  food: [100, 255, 150],   // Green (from harvesters)
  home: [255, 100, 255],   // Magenta (from consumers)
  explore: [100, 200, 255],// Blue (from scouts/decomposers)
};
