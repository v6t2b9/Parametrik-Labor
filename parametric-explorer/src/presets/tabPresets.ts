import type {
  VisualizationParams,
  PhysicalOikosParams,
  SemioticOikosParams,
  TemporalOikosParams,
} from '../types/index.js';

// ========================================
// VISUAL PRESETS (Visualization Tab)
// ========================================

export interface VisualPreset {
  name: string;
  icon: string;
  description: string;
  params: VisualizationParams;
}

export const visualPresets: VisualPreset[] = [
  {
    name: 'Heatmap',
    icon: '🔥',
    description: 'Warme Farben, hohe Helligkeit',
    params: {
      brightness: 2.2,
      colorRed: { r: 255, g: 40, b: 20 },
      colorGreen: { r: 255, g: 180, b: 0 },
      colorBlue: { r: 255, g: 255, b: 50 },
      colorBg: { r: 5, g: 5, b: 10 },
    },
  },
  {
    name: 'Tiefsee',
    icon: '🌊',
    description: 'Dunkle Blau-/Grüntöne',
    params: {
      brightness: 1.2,
      colorRed: { r: 0, g: 80, b: 120 },
      colorGreen: { r: 0, g: 150, b: 140 },
      colorBlue: { r: 20, g: 100, b: 180 },
      colorBg: { r: 2, g: 8, b: 15 },
    },
  },
  {
    name: 'Galaxie',
    icon: '🌌',
    description: 'Violett, blau, magenta',
    params: {
      brightness: 1.8,
      colorRed: { r: 180, g: 50, b: 200 },
      colorGreen: { r: 80, g: 120, b: 255 },
      colorBlue: { r: 200, g: 100, b: 255 },
      colorBg: { r: 5, g: 5, b: 12 },
    },
  },
  {
    name: 'Nordlicht',
    icon: '🌈',
    description: 'Grün-türkis mit Violett',
    params: {
      brightness: 1.9,
      colorRed: { r: 100, g: 255, b: 180 },
      colorGreen: { r: 50, g: 255, b: 220 },
      colorBlue: { r: 150, g: 100, b: 255 },
      colorBg: { r: 3, g: 6, b: 15 },
    },
  },
  {
    name: 'Neon',
    icon: '💡',
    description: 'Gesättigte Primärfarben',
    params: {
      brightness: 2.5,
      colorRed: { r: 255, g: 0, b: 100 },
      colorGreen: { r: 0, g: 255, b: 50 },
      colorBlue: { r: 0, g: 150, b: 255 },
      colorBg: { r: 0, g: 0, b: 0 },
    },
  },
  {
    name: 'Pastell',
    icon: '🎨',
    description: 'Sanfte, entsättigte Farben',
    params: {
      brightness: 1.6,
      colorRed: { r: 255, g: 180, b: 200 },
      colorGreen: { r: 180, g: 255, b: 200 },
      colorBlue: { r: 180, g: 220, b: 255 },
      colorBg: { r: 15, g: 15, b: 20 },
    },
  },
  {
    name: 'Infrarot',
    icon: '🔴',
    description: 'Rot-dominiert, warm',
    params: {
      brightness: 1.7,
      colorRed: { r: 255, g: 50, b: 50 },
      colorGreen: { r: 255, g: 100, b: 0 },
      colorBlue: { r: 200, g: 0, b: 0 },
      colorBg: { r: 10, g: 5, b: 5 },
    },
  },
  {
    name: 'Biolumineszenz',
    icon: '🦠',
    description: 'Grün-blaues Leuchten',
    params: {
      brightness: 2.0,
      colorRed: { r: 50, g: 255, b: 150 },
      colorGreen: { r: 100, g: 255, b: 200 },
      colorBlue: { r: 80, g: 200, b: 255 },
      colorBg: { r: 2, g: 5, b: 8 },
    },
  },
];

// ========================================
// PHYSICS PRESETS (Physical Oikos Tab)
// ========================================

export interface PhysicsPreset {
  name: string;
  icon: string;
  description: string;
  params: PhysicalOikosParams;
}

export const physicsPresets: PhysicsPreset[] = [
  {
    name: 'Flüssig',
    icon: '💧',
    description: 'Hohe Diffusion, mittlerer Zerfall',
    params: {
      decayRate: 0.92,
      diffusionFreq: 8,
      fadeStrength: 0.15,
      trailSaturation: 220,
    },
  },
  {
    name: 'Kristallin',
    icon: '💎',
    description: 'Minimal Diffusion, hohe Persistenz',
    params: {
      decayRate: 0.99,
      diffusionFreq: 1,
      fadeStrength: 0.05,
      trailSaturation: 255,
    },
  },
  {
    name: 'Gasförmig',
    icon: '💨',
    description: 'Sehr hohe Diffusion, schneller Zerfall',
    params: {
      decayRate: 0.88,
      diffusionFreq: 10,
      fadeStrength: 0.25,
      trailSaturation: 180,
    },
  },
  {
    name: 'Klebrig',
    icon: '🍯',
    description: 'Hohe Persistenz, niedrige Diffusion',
    params: {
      decayRate: 0.96,
      diffusionFreq: 2,
      fadeStrength: 0.08,
      trailSaturation: 255,
    },
  },
  {
    name: 'Turbulent',
    icon: '🌀',
    description: 'Hohe Diffusion, mittlerer Zerfall',
    params: {
      decayRate: 0.90,
      diffusionFreq: 7,
      fadeStrength: 0.20,
      trailSaturation: 200,
    },
  },
  {
    name: 'Stabil',
    icon: '🔒',
    description: 'Sehr hohe Persistenz, minimale Diffusion',
    params: {
      decayRate: 0.98,
      diffusionFreq: 1,
      fadeStrength: 0.05,
      trailSaturation: 255,
    },
  },
];

// ========================================
// SPECIES PRESETS (Semiotic Oikos Tab)
// ========================================

export interface SpeciesPreset {
  name: string;
  icon: string;
  description: string;
  params: SemioticOikosParams;
}

export const speciesPresets: SpeciesPreset[] = [
  {
    name: 'Jäger',
    icon: '🦅',
    description: 'Große Reichweite, schnelle Reaktion',
    params: {
      sensorDist: 35,
      sensorAngle: 0.7,
      deposit: 12,
      turnSpeed: 0.8,
    },
  },
  {
    name: 'Sammler',
    icon: '🐜',
    description: 'Kurze Reichweite, hohe Deposition',
    params: {
      sensorDist: 15,
      sensorAngle: 0.4,
      deposit: 25,
      turnSpeed: 0.3,
    },
  },
  {
    name: 'Scouts',
    icon: '🦋',
    description: 'Große Reichweite, weites Sichtfeld',
    params: {
      sensorDist: 40,
      sensorAngle: 0.9,
      deposit: 10,
      turnSpeed: 0.6,
    },
  },
  {
    name: 'Tanks',
    icon: '🐢',
    description: 'Kurze Reichweite, langsam, hohe Deposition',
    params: {
      sensorDist: 12,
      sensorAngle: 0.3,
      deposit: 30,
      turnSpeed: 0.2,
    },
  },
  {
    name: 'Balanced',
    icon: '⚖️',
    description: 'Ausgewogene Parameter',
    params: {
      sensorDist: 25,
      sensorAngle: 0.6,
      deposit: 15,
      turnSpeed: 0.4,
    },
  },
  {
    name: 'Asymmetrisch',
    icon: '🦀',
    description: 'Enges Sichtfeld, hohe Wendigkeit',
    params: {
      sensorDist: 20,
      sensorAngle: 0.3,
      deposit: 18,
      turnSpeed: 0.9,
    },
  },
];

// ========================================
// TEMPORAL PRESETS (Temporal Oikos Tab)
// ========================================

export interface TemporalPreset {
  name: string;
  icon: string;
  description: string;
  params: TemporalOikosParams;
}

export const temporalPresets: TemporalPreset[] = [
  {
    name: 'Blitz',
    icon: '⚡',
    description: 'Sehr schnell, hoher Chaos',
    params: {
      speed: 3.0,
      agentCount: 3000,
      chaosInterval: 100,
      chaosStrength: 0.8,
    },
  },
  {
    name: 'Marathon',
    icon: '🏃',
    description: 'Mittlere Geschwindigkeit, viele Agents',
    params: {
      speed: 1.5,
      agentCount: 6000,
      chaosInterval: 0,
      chaosStrength: 0.5,
    },
  },
  {
    name: 'Pulsierend',
    icon: '💓',
    description: 'Regelmäßige Chaos-Injektionen',
    params: {
      speed: 1.2,
      agentCount: 4000,
      chaosInterval: 200,
      chaosStrength: 0.7,
    },
  },
  {
    name: 'Eingefroren',
    icon: '❄️',
    description: 'Sehr langsam, kein Chaos',
    params: {
      speed: 0.5,
      agentCount: 2000,
      chaosInterval: 0,
      chaosStrength: 0.0,
    },
  },
  {
    name: 'Mega-Dichte',
    icon: '🏙️',
    description: 'Sehr viele Agents, mittlere Geschwindigkeit',
    params: {
      speed: 1.0,
      agentCount: 10000,
      chaosInterval: 0,
      chaosStrength: 0.5,
    },
  },
  {
    name: 'Minimal',
    icon: '🌱',
    description: 'Wenige Agents, langsam',
    params: {
      speed: 0.8,
      agentCount: 500,
      chaosInterval: 0,
      chaosStrength: 0.5,
    },
  },
];
