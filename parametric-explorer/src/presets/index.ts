import type { Preset, AllParameters } from '../types/index.js';

// Default Performance Parameters
export const defaultPerformanceParams = {
  autoOptimize: true,
  targetFPS: 60,
  qualityPreset: 'high' as const,
  _currentOptLevel: 0,
};

// Default/Base Parameters
export const defaultParameters: AllParameters = {
  physical: {
    decayRate: 0.96,
    diffusionFreq: 3,  // MITTLERE Diffusion (jedes 3. Frame)
    fadeStrength: 0.15,
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
  effects: {
    blur: 0,
    bloom: 0,
    saturation: 1.0,
    contrast: 1.0,
    hueShift: 0,
    motionBlur: 0,
    vignette: 0,
    chromaticAberration: 0,
    waveDistortion: 0,
  },
  performance: defaultPerformanceParams,
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
    effects: {
      blur: 1,
      bloom: 0.3,
      saturation: 1.1,
      contrast: 1.05,
      hueShift: 0,
      motionBlur: 0,
      vignette: 0,
      chromaticAberration: 0,
      waveDistortion: 0,
    },
    performance: defaultPerformanceParams,
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
    effects: {
      blur: 0,
      bloom: 0,
      saturation: 1.0,
      contrast: 1.1,
      hueShift: 0,
      motionBlur: 0,
      vignette: 0,
      chromaticAberration: 0,
      waveDistortion: 0,
    },
    performance: defaultPerformanceParams,
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
    effects: {
      blur: 0,
      bloom: 0.1,
      saturation: 1.0,
      contrast: 1.3,
      hueShift: 0,
      motionBlur: 0,
      vignette: 0.2,
      chromaticAberration: 0,
      waveDistortion: 0,
    },
    performance: defaultPerformanceParams,
  },
};

// Preset 4: Chaotische Turbulenz
const maxChaosPreset: Preset = {
  name: 'Chaotische Turbulenz',
  icon: '🌀',
  description: 'Irreguläre, unvorhersagbare, turbulente Dynamiken. Empfohlen für: Instabilität, Nicht-Linearität.',
  parameters: {
    physical: {
      decayRate: 0.93,
      diffusionFreq: 4,  // VIEL Diffusion (jedes 4. Frame)
      fadeStrength: 0.18,
      trailSaturation: 180,
    },
    semiotic: {
      sensorDist: 18,
      sensorAngle: 0.6,
      deposit: 12,
      turnSpeed: 0.8,
    },
    temporal: {
      speed: 2.2,
      agentCount: 4000,
      chaosInterval: 150,
      chaosStrength: 0.9,
    },
    resonance: {
      attractionStrength: 0.7,
      repulsionStrength: -0.6,
      crossSpeciesInteraction: true,
    },
    visualization: {
      brightness: 2.2,
      colorRed: { r: 255, g: 60, b: 120 },
      colorGreen: { r: 120, g: 255, b: 60 },
      colorBlue: { r: 60, g: 120, b: 255 },
      colorBg: { r: 5, g: 5, b: 10 },
    },
    effects: {
      blur: 3,
      bloom: 0.4,
      saturation: 1.5,
      contrast: 1.1,
      hueShift: 90,
      motionBlur: 0.2,
      vignette: 0,
      chromaticAberration: 5,
      waveDistortion: 0.3,
    },
    performance: defaultPerformanceParams,
  },
};

// Preset 5: Netzwerk-Strukturen
const networkPreset: Preset = {
  name: 'Netzwerk-Strukturen',
  icon: '🕸️',
  description: 'Verzweigte, verbundene Pfade. Empfohlen für: Konnektivität, Nicht-Cluster-Ordnung.',
  parameters: {
    physical: {
      decayRate: 0.94,
      diffusionFreq: 3,  // MITTLERE Diffusion
      fadeStrength: 0.12,
      trailSaturation: 200,
    },
    semiotic: {
      sensorDist: 35,
      sensorAngle: 0.5,
      deposit: 20,
      turnSpeed: 0.4,
    },
    temporal: {
      speed: 1.5,
      agentCount: 2500,
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
    effects: {
      blur: 1,
      bloom: 0.25,
      saturation: 1.0,
      contrast: 1.0,
      hueShift: 0,
      motionBlur: 0,
      vignette: 0.1,
      chromaticAberration: 0,
      waveDistortion: 0,
    },
    performance: defaultPerformanceParams,
  },
};

// Preset 6: Fließende Organik
const fluidPreset: Preset = {
  name: 'Fließende Organik',
  icon: '🌊',
  description: 'Kontinuierliche Formveränderung ohne Strukturkollaps. Empfohlen für: Morphogenese, lebendige Systeme.',
  parameters: {
    physical: {
      decayRate: 0.92,
      diffusionFreq: 8,  // WENIG Diffusion (glattere Strömungen)
      fadeStrength: 0.15,
      trailSaturation: 220,
    },
    semiotic: {
      sensorDist: 20,
      sensorAngle: 0.8,
      deposit: 15,
      turnSpeed: 0.6,
    },
    temporal: {
      speed: 2.0,
      agentCount: 3500,
      chaosInterval: 0,
      chaosStrength: 0.0,
    },
    resonance: {
      attractionStrength: 1.2,
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
    effects: {
      blur: 4,
      bloom: 0.3,
      saturation: 1.1,
      contrast: 0.95,
      hueShift: 0,
      motionBlur: 0.5,
      vignette: 0.15,
      chromaticAberration: 0,
      waveDistortion: 0.1,
    },
    performance: defaultPerformanceParams,
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
    effects: {
      blur: 0,
      bloom: 0.1,
      saturation: 1.0,
      contrast: 1.0,
      hueShift: 0,
      motionBlur: 0,
      vignette: 0,
      chromaticAberration: 0,
      waveDistortion: 0,
    },
    performance: defaultPerformanceParams,
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
    effects: {
      blur: 2,
      bloom: 0.7,
      saturation: 1.3,
      contrast: 1.2,
      hueShift: 0,
      motionBlur: 0.1,
      vignette: 0.3,
      chromaticAberration: 0,
      waveDistortion: 0,
    },
    performance: defaultPerformanceParams,
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
