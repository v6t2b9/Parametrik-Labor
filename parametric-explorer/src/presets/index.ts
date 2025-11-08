import { Preset, AllParameters } from '../types';

// Default/Base Parameters
export const defaultParameters: AllParameters = {
  physical: {
    decayRate: 0.94,
    diffusionFreq: 3,
    fadeStrength: 0.12,
    trailSaturation: 200,
  },
  semiotic: {
    sensorDist: 25,
    sensorAngle: 0.6,
    deposit: 15,
    turnSpeed: 0.4,
  },
  temporal: {
    speed: 1.0,
    agentCount: 2000,
    chaosInterval: 0,
    chaosStrength: 0.5,
  },
  resonance: {
    attractionStrength: 1.2,
    repulsionStrength: -0.3,
    crossSpeciesInteraction: true,
  },
  visualization: {
    brightness: 1.5,
    colorRed: { r: 255, g: 50, b: 50 },
    colorGreen: { r: 50, g: 255, b: 50 },
    colorBlue: { r: 50, g: 150, b: 255 },
    colorBg: { r: 10, g: 10, b: 21 },
  },
};

// Preset 1: Crystal Growth Niche
// High decay + Low diffusion + Low fade → Stable, geometric structures
const crystalGrowthPreset: Preset = {
  name: 'Crystal Growth',
  icon: '💎',
  description: 'Stable, geometric structures with sharp boundaries. High persistence creates crystalline patterns.',
  parameters: {
    physical: {
      decayRate: 0.98,        // +++ Stability, +++ Crystallinity
      diffusionFreq: 1,       // -- Crystallinity (low is good!)
      fadeStrength: 0.08,     // --- Crystallinity (low is good!)
      trailSaturation: 220,
    },
    semiotic: {
      sensorDist: 30,
      sensorAngle: 0.3,       // Narrow FOV for sharp patterns
      deposit: 25,            // ++ Density, ++ Crystallinity
      turnSpeed: 0.2,         // Slower turns for geometric forms
    },
    temporal: {
      speed: 0.8,
      agentCount: 3000,
      chaosInterval: 0,       // No chaos injection
      chaosStrength: 0.0,
    },
    resonance: {
      attractionStrength: 1.5,
      repulsionStrength: -0.2,
      crossSpeciesInteraction: true,
    },
    visualization: {
      brightness: 1.8,
      colorRed: { r: 255, g: 80, b: 120 },
      colorGreen: { r: 80, g: 255, b: 140 },
      colorBlue: { r: 100, g: 180, b: 255 },
      colorBg: { r: 5, g: 5, b: 15 },
    },
  },
};

// Preset 2: Fluid Dynamics Niche
// Low decay + High diffusion + High fade → Flowing, organic forms
const fluidDynamicsPreset: Preset = {
  name: 'Fluid Dynamics',
  icon: '🌊',
  description: 'Flowing, organic forms with continuous reformation. High diffusion creates smooth gradients.',
  parameters: {
    physical: {
      decayRate: 0.92,        // --- Stability (low for fluidity)
      diffusionFreq: 8,       // +++ Fluidity
      fadeStrength: 0.20,     // ++ Fluidity, +++ Chaos
      trailSaturation: 180,
    },
    semiotic: {
      sensorDist: 20,
      sensorAngle: 0.9,       // Wide FOV for flowing movement
      deposit: 12,
      turnSpeed: 0.7,         // +++ Fluidity
    },
    temporal: {
      speed: 2.0,             // +++ Fluidity, +++ Chaos
      agentCount: 2500,
      chaosInterval: 0,
      chaosStrength: 0.0,
    },
    resonance: {
      attractionStrength: 0.8,
      repulsionStrength: -0.1,
      crossSpeciesInteraction: true,
    },
    visualization: {
      brightness: 1.3,
      colorRed: { r: 255, g: 100, b: 50 },
      colorGreen: { r: 50, g: 220, b: 180 },
      colorBlue: { r: 100, g: 150, b: 255 },
      colorBg: { r: 8, g: 8, b: 18 },
    },
  },
};

// Preset 3: Network Formation Niche
// Medium decay + Medium diffusion + Large sensor range → Branching structures
const networkFormationPreset: Preset = {
  name: 'Network Formation',
  icon: '🕸️',
  description: 'Branching structures resembling neural or vascular networks. Large sensor range creates connections.',
  parameters: {
    physical: {
      decayRate: 0.94,        // ++ Network
      diffusionFreq: 3,
      fadeStrength: 0.12,
      trailSaturation: 200,
    },
    semiotic: {
      sensorDist: 38,         // +++ Network, +++ Separation
      sensorAngle: 0.5,
      deposit: 20,            // ++ Network
      turnSpeed: 0.4,
    },
    temporal: {
      speed: 1.2,
      agentCount: 2800,       // ++ Network
      chaosInterval: 300,     // Moderate chaos for diversity
      chaosStrength: 0.3,
    },
    resonance: {
      attractionStrength: 1.0,
      repulsionStrength: -0.4,
      crossSpeciesInteraction: true,
    },
    visualization: {
      brightness: 1.6,
      colorRed: { r: 255, g: 50, b: 80 },
      colorGreen: { r: 80, g: 255, b: 100 },
      colorBlue: { r: 80, g: 180, b: 255 },
      colorBg: { r: 6, g: 6, b: 16 },
    },
  },
};

// Preset 4: Adaptive Disruption (Chaos)
// High fade + High speed + Chaos injection → Maximum irregularity
const adaptiveDisruptionPreset: Preset = {
  name: 'Adaptive Disruption',
  icon: '🌀',
  description: 'Irregularly changing patterns with high turbulence. Chaos injection prevents stabilization.',
  parameters: {
    physical: {
      decayRate: 0.90,
      diffusionFreq: 5,       // ++ Chaos
      fadeStrength: 0.25,     // +++ Chaos
      trailSaturation: 160,
    },
    semiotic: {
      sensorDist: 22,
      sensorAngle: 0.8,       // ++ Chaos
      deposit: 10,
      turnSpeed: 0.8,         // +++ Chaos, +++ Fluidity
    },
    temporal: {
      speed: 2.5,             // +++ Chaos
      agentCount: 3500,
      chaosInterval: 150,     // +++ Chaos (frequent)
      chaosStrength: 0.9,     // +++ Chaos (strong)
    },
    resonance: {
      attractionStrength: 0.6,
      repulsionStrength: -0.7, // ++ Chaos, +++ Separation
      crossSpeciesInteraction: true,
    },
    visualization: {
      brightness: 1.4,
      colorRed: { r: 255, g: 60, b: 120 },
      colorGreen: { r: 120, g: 255, b: 60 },
      colorBlue: { r: 60, g: 120, b: 255 },
      colorBg: { r: 10, g: 10, b: 20 },
    },
  },
};

// Export all presets
export const builtInPresets: Preset[] = [
  crystalGrowthPreset,
  fluidDynamicsPreset,
  networkFormationPreset,
  adaptiveDisruptionPreset,
];

// Helper function to get preset by name
export function getPresetByName(name: string): Preset | undefined {
  return builtInPresets.find((p) => p.name === name);
}
