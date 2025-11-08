// Core Type Definitions for Parametric Space Explorer

export type AgentType = 'red' | 'green' | 'blue';

export interface Agent {
  x: number;
  y: number;
  angle: number;
  type: AgentType;
  rhythmPhase: number;
}

export interface Trails {
  red: Float32Array;
  green: Float32Array;
  blue: Float32Array;
}

export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

// Parameter Definitions organized by Oikos dimensions
export interface PhysicalOikosParams {
  decayRate: number;        // 0.85-0.999: Temporal persistence of traces
  diffusionFreq: number;    // 0-10: Spatial spread frequency
  fadeStrength: number;     // 0.05-0.3: Acceleration of forgetting
  trailSaturation: number;  // 100-255: Environmental capacity limits
}

export interface SemioticOikosParams {
  sensorDist: number;       // 10-40: Perceptual range
  sensorAngle: number;      // 0.2-1.2: Field of view (radians)
  deposit: number;          // 5-30: Trace intensity
  turnSpeed: number;        // 0.1-1.0: Response agility (radians)
}

export interface TemporalOikosParams {
  speed: number;            // 0.5-3.0: Rate of change
  agentCount: number;       // 500-10000: Interaction density
  chaosInterval: number;    // 0-500: Periodic destabilization (0 = off)
  chaosStrength: number;    // 0.1-1.0: Perturbation intensity
}

export interface ResonanceOikosParams {
  attractionStrength: number;       // -2.0-2.0: Same-type reinforcement
  repulsionStrength: number;        // -2.0-2.0: Cross-type influence
  crossSpeciesInteraction: boolean; // Enable/disable cross-species
}

export interface VisualizationParams {
  brightness: number;       // 0.5-5.0: Output brightness
  colorRed: RGBColor;       // Red channel color
  colorGreen: RGBColor;     // Green channel color
  colorBlue: RGBColor;      // Blue channel color
  colorBg: RGBColor;        // Background color
}

export interface AllParameters {
  physical: PhysicalOikosParams;
  semiotic: SemioticOikosParams;
  temporal: TemporalOikosParams;
  resonance: ResonanceOikosParams;
  visualization: VisualizationParams;
}

// Preset Definition
export interface Preset {
  name: string;
  icon: string;
  description: string;
  parameters: AllParameters;
}

// Simulation State
export interface SimulationState {
  running: boolean;
  frameCount: number;
  agents: Agent[];
  trails: Trails;
  gridSize: number;
  canvasSize: number;
}

// Emergent Properties (for Phase 2 - Metrics)
export interface EmergentProperties {
  clustering: number;      // 0-100
  separation: number;      // 0-100
  stability: number;       // 0-100
  chaos: number;          // 0-100
  network: number;        // 0-100
  fluidity: number;       // 0-100
  crystallinity: number;  // 0-100
  density: number;        // 0-100
}

// UI State
export interface UIState {
  activeOikosTab: 'physical' | 'semiotic' | 'temporal' | 'resonance';
  simulationSpeed: number; // 1x, 2x, 5x, etc.
}
