import type { Preset, AllParameters } from '../types/index.js';

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

// Preset 1: Maximale Clusterbildung
const maxClusteringPreset: Preset = {
  name: 'Maximale Clusterbildung',
  icon: '🎯',
  description: 'Agents sammeln sich in dichten, räumlich konzentrierten Gruppen. Empfohlen für: Selbstverstärkung, Attractor-Dynamiken.',
  parameters: {
    physical: {
      decayRate: 0.99,
      diffusionFreq: 5,
      fadeStrength: 0.05,
      trailSaturation: 255,
    },
    semiotic: {
      sensorDist: 15,
      sensorAngle: 0.45,
      deposit: 25,
      turnSpeed: 0.3,
    },
    temporal: {
      speed: 1.5,
      agentCount: 5000,
      chaosInterval: 0,
      chaosStrength: 0.5,
    },
    resonance: {
      attractionStrength: 1.8,
      repulsionStrength: -0.3,
      crossSpeciesInteraction: true,
    },
    visualization: {
      brightness: 1.7,
      colorRed: { r: 255, g: 60, b: 80 },
      colorGreen: { r: 80, g: 255, b: 100 },
      colorBlue: { r: 80, g: 150, b: 255 },
      colorBg: { r: 8, g: 8, b: 18 },
    },
  },
};

// Preset 2: Kristalline Ordnung
const crystallinePreset: Preset = {
  name: 'Kristalline Ordnung',
  icon: '💎',
  description: 'Geometrisch präzise, starre Strukturen. Empfohlen für: Symmetrie, minimale Oberflächen.',
  parameters: {
    physical: {
      decayRate: 0.99,
      diffusionFreq: 1,
      fadeStrength: 0.05,
      trailSaturation: 255,
    },
    semiotic: {
      sensorDist: 12,
      sensorAngle: 0.2,
      deposit: 25,
      turnSpeed: 0.2,
    },
    temporal: {
      speed: 1.0,
      agentCount: 2000,
      chaosInterval: 0,
      chaosStrength: 0.0,
    },
    resonance: {
      attractionStrength: 1.6,
      repulsionStrength: -0.5,
      crossSpeciesInteraction: true,
    },
    visualization: {
      brightness: 1.9,
      colorRed: { r: 255, g: 80, b: 120 },
      colorGreen: { r: 80, g: 255, b: 140 },
      colorBlue: { r: 100, g: 180, b: 255 },
      colorBg: { r: 5, g: 5, b: 15 },
    },
  },
};

// Preset 3: Maximale Separation
const maxSeparationPreset: Preset = {
  name: 'Maximale Separation',
  icon: '🔲',
  description: 'Räumlich getrennte Territorien verschiedener Spezies. Empfohlen für: Grenzen, Segregation, Nischen.',
  parameters: {
    physical: {
      decayRate: 0.95,
      diffusionFreq: 2,
      fadeStrength: 0.1,
      trailSaturation: 255,
    },
    semiotic: {
      sensorDist: 40,
      sensorAngle: 0.6,
      deposit: 20,
      turnSpeed: 0.3,
    },
    temporal: {
      speed: 1.5,
      agentCount: 3000,
      chaosInterval: 0,
      chaosStrength: 0.5,
    },
    resonance: {
      attractionStrength: 1.2,
      repulsionStrength: -0.9,
      crossSpeciesInteraction: true,
    },
    visualization: {
      brightness: 1.6,
      colorRed: { r: 255, g: 50, b: 50 },
      colorGreen: { r: 50, g: 255, b: 50 },
      colorBlue: { r: 50, g: 150, b: 255 },
      colorBg: { r: 10, g: 10, b: 21 },
    },
  },
};

// Preset 4: Chaotische Turbulenz
const maxChaosPreset: Preset = {
  name: 'Chaotische Turbulenz',
  icon: '🌀',
  description: 'Irreguläre, unvorhersagbare, turbulente Dynamiken. Empfohlen für: Instabilität, Nicht-Linearität.',
  parameters: {
    physical: {
      decayRate: 0.68,
      diffusionFreq: 18,
      fadeStrength: 0.42,
      trailSaturation: 150,
    },
    semiotic: {
      sensorDist: 45,
      sensorAngle: 1.8,
      deposit: 8,
      turnSpeed: 1.8,
    },
    temporal: {
      speed: 5.0,
      agentCount: 5000,
      chaosInterval: 100,
      chaosStrength: 1.6,
    },
    resonance: {
      attractionStrength: 0.6,
      repulsionStrength: -0.1,
      crossSpeciesInteraction: true,
    },
    visualization: {
      brightness: 2.2,
      colorRed: { r: 255, g: 60, b: 120 },
      colorGreen: { r: 120, g: 255, b: 60 },
      colorBlue: { r: 60, g: 120, b: 255 },
      colorBg: { r: 5, g: 5, b: 10 },
    },
  },
};

// Preset 5: Netzwerk-Strukturen
const networkPreset: Preset = {
  name: 'Netzwerk-Strukturen',
  icon: '🕸️',
  description: 'Verzweigte, verbundene Pfade. Empfohlen für: Konnektivität, Nicht-Cluster-Ordnung.',
  parameters: {
    physical: {
      decayRate: 0.96,
      diffusionFreq: 4,
      fadeStrength: 0.08,
      trailSaturation: 220,
    },
    semiotic: {
      sensorDist: 55,
      sensorAngle: 0.4,
      deposit: 12,
      turnSpeed: 0.7,
    },
    temporal: {
      speed: 2.0,
      agentCount: 3500,
      chaosInterval: 0,
      chaosStrength: 0.0,
    },
    resonance: {
      attractionStrength: 1.0,
      repulsionStrength: -0.3,
      crossSpeciesInteraction: true,
    },
    visualization: {
      brightness: 2.0,
      colorRed: { r: 255, g: 50, b: 80 },
      colorGreen: { r: 80, g: 255, b: 100 },
      colorBlue: { r: 80, g: 180, b: 255 },
      colorBg: { r: 3, g: 3, b: 12 },
    },
  },
};

// Preset 6: Fließende Organik
const fluidPreset: Preset = {
  name: 'Fließende Organik',
  icon: '🌊',
  description: 'Kontinuierliche Formveränderung ohne Strukturkollaps. Empfohlen für: Morphogenese, lebendige Systeme.',
  parameters: {
    physical: {
      decayRate: 0.89,
      diffusionFreq: 15,
      fadeStrength: 0.22,
      trailSaturation: 200,
    },
    semiotic: {
      sensorDist: 28,
      sensorAngle: 1.2,
      deposit: 10,
      turnSpeed: 1.1,
    },
    temporal: {
      speed: 3.5,
      agentCount: 4500,
      chaosInterval: 0,
      chaosStrength: 0.0,
    },
    resonance: {
      attractionStrength: 1.0,
      repulsionStrength: -0.4,
      crossSpeciesInteraction: true,
    },
    visualization: {
      brightness: 2.1,
      colorRed: { r: 255, g: 100, b: 50 },
      colorGreen: { r: 50, g: 220, b: 180 },
      colorBlue: { r: 100, g: 150, b: 255 },
      colorBg: { r: 4, g: 4, b: 14 },
    },
  },
};

// Preset 7: Maximale Stabilität
const maxStabilityPreset: Preset = {
  name: 'Maximale Stabilität',
  icon: '🔒',
  description: 'Zeitlich persistente, unveränderliche Strukturen. Empfohlen für: Gedächtnis, Pfadabhängigkeit.',
  parameters: {
    physical: {
      decayRate: 0.98,
      diffusionFreq: 1,
      fadeStrength: 0.05,
      trailSaturation: 255,
    },
    semiotic: {
      sensorDist: 15,
      sensorAngle: 0.2,
      deposit: 30,
      turnSpeed: 0.2,
    },
    temporal: {
      speed: 1.0,
      agentCount: 2000,
      chaosInterval: 0,
      chaosStrength: 0.0,
    },
    resonance: {
      attractionStrength: 1.5,
      repulsionStrength: -0.4,
      crossSpeciesInteraction: true,
    },
    visualization: {
      brightness: 1.8,
      colorRed: { r: 255, g: 70, b: 100 },
      colorGreen: { r: 70, g: 255, b: 120 },
      colorBlue: { r: 90, g: 160, b: 255 },
      colorBg: { r: 5, g: 5, b: 15 },
    },
  },
};

// Preset 8: Dichte Hotspots
const denseHotspotsPreset: Preset = {
  name: 'Dichte Hotspots',
  icon: '🔥',
  description: 'Konzentration von Intensität in fokalen Punkten. Empfohlen für: Akkumulation, kritische Masse.',
  parameters: {
    physical: {
      decayRate: 0.96,
      diffusionFreq: 2,
      fadeStrength: 0.08,
      trailSaturation: 255,
    },
    semiotic: {
      sensorDist: 15,
      sensorAngle: 0.4,
      deposit: 30,
      turnSpeed: 0.25,
    },
    temporal: {
      speed: 1.2,
      agentCount: 6000,
      chaosInterval: 0,
      chaosStrength: 0.5,
    },
    resonance: {
      attractionStrength: 1.8,
      repulsionStrength: -0.3,
      crossSpeciesInteraction: true,
    },
    visualization: {
      brightness: 2.0,
      colorRed: { r: 255, g: 50, b: 50 },
      colorGreen: { r: 50, g: 255, b: 80 },
      colorBlue: { r: 80, g: 150, b: 255 },
      colorBg: { r: 5, g: 5, b: 12 },
    },
  },
};

// Export all presets
export const builtInPresets: Preset[] = [
  maxClusteringPreset,
  crystallinePreset,
  maxSeparationPreset,
  maxChaosPreset,
  networkPreset,
  fluidPreset,
  maxStabilityPreset,
  denseHotspotsPreset,
];

// Helper function to get preset by name
export function getPresetByName(name: string): Preset | undefined {
  return builtInPresets.find((p) => p.name === name);
}
