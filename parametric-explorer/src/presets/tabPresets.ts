import type {
  VisualizationParams,
  PhysicalOikosParams,
  SemioticOikosParams,
  TemporalOikosParams,
  EffectsParams,
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
      brightness: 3.0,
      colorRed: { r: 255, g: 30, b: 10 },
      colorGreen: { r: 255, g: 200, b: 0 },
      colorBlue: { r: 255, g: 255, b: 100 },
      colorBg: { r: 2, g: 2, b: 5 },
    },
  },
  {
    name: 'Tiefsee',
    icon: '🌊',
    description: 'Dunkle Blau-/Grüntöne',
    params: {
      brightness: 0.8,
      colorRed: { r: 0, g: 60, b: 100 },
      colorGreen: { r: 0, g: 120, b: 120 },
      colorBlue: { r: 10, g: 80, b: 150 },
      colorBg: { r: 0, g: 3, b: 8 },
    },
  },
  {
    name: 'Galaxie',
    icon: '🌌',
    description: 'Violett, blau, magenta',
    params: {
      brightness: 2.4,
      colorRed: { r: 200, g: 30, b: 220 },
      colorGreen: { r: 100, g: 150, b: 255 },
      colorBlue: { r: 220, g: 120, b: 255 },
      colorBg: { r: 3, g: 3, b: 8 },
    },
  },
  {
    name: 'Nordlicht',
    icon: '🌈',
    description: 'Grün-türkis mit Violett',
    params: {
      brightness: 2.8,
      colorRed: { r: 80, g: 255, b: 160 },
      colorGreen: { r: 30, g: 255, b: 230 },
      colorBlue: { r: 180, g: 120, b: 255 },
      colorBg: { r: 1, g: 3, b: 10 },
    },
  },
  {
    name: 'Neon',
    icon: '💡',
    description: 'Gesättigte Primärfarben',
    params: {
      brightness: 4.0,
      colorRed: { r: 255, g: 0, b: 120 },
      colorGreen: { r: 0, g: 255, b: 40 },
      colorBlue: { r: 0, g: 100, b: 255 },
      colorBg: { r: 0, g: 0, b: 0 },
    },
  },
  {
    name: 'Pastell',
    icon: '🎨',
    description: 'Sanfte, entsättigte Farben',
    params: {
      brightness: 1.4,
      colorRed: { r: 255, g: 200, b: 220 },
      colorGreen: { r: 200, g: 255, b: 220 },
      colorBlue: { r: 200, g: 230, b: 255 },
      colorBg: { r: 20, g: 20, b: 25 },
    },
  },
  {
    name: 'Infrarot',
    icon: '🔴',
    description: 'Rot-dominiert, warm',
    params: {
      brightness: 2.6,
      colorRed: { r: 255, g: 20, b: 20 },
      colorGreen: { r: 255, g: 80, b: 0 },
      colorBlue: { r: 180, g: 0, b: 0 },
      colorBg: { r: 8, g: 2, b: 2 },
    },
  },
  {
    name: 'Biolumineszenz',
    icon: '🦠',
    description: 'Grün-blaues Leuchten',
    params: {
      brightness: 3.2,
      colorRed: { r: 30, g: 255, b: 140 },
      colorGreen: { r: 80, g: 255, b: 200 },
      colorBlue: { r: 60, g: 180, b: 255 },
      colorBg: { r: 1, g: 4, b: 6 },
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
      diffusionFreq: 1,  // VIEL Diffusion (jedes Frame)
      fadeStrength: 0.12,
      trailSaturation: 220,
    },
  },
  {
    name: 'Kristallin',
    icon: '💎',
    description: 'Minimal Diffusion, hohe Persistenz',
    params: {
      decayRate: 0.98,
      diffusionFreq: 8,  // WENIG Diffusion (jedes 8. Frame)
      fadeStrength: 0.08,
      trailSaturation: 255,
    },
  },
  {
    name: 'Gasförmig',
    icon: '💨',
    description: 'Sehr hohe Diffusion, schneller Zerfall',
    params: {
      decayRate: 0.88,
      diffusionFreq: 1,  // VIEL Diffusion (jedes Frame)
      fadeStrength: 0.25,
      trailSaturation: 150,
    },
  },
  {
    name: 'Klebrig',
    icon: '🍯',
    description: 'Hohe Persistenz, niedrige Diffusion',
    params: {
      decayRate: 0.99,
      diffusionFreq: 5,  // WENIG Diffusion (jedes 5. Frame)
      fadeStrength: 0.06,
      trailSaturation: 255,
    },
  },
  {
    name: 'Turbulent',
    icon: '🌀',
    description: 'Extreme Diffusion, starker Zerfall',
    params: {
      decayRate: 0.90,
      diffusionFreq: 2,  // SEHR VIEL Diffusion (jedes 2. Frame)
      fadeStrength: 0.20,
      trailSaturation: 180,
    },
  },
  {
    name: 'Stabil',
    icon: '🔒',
    description: 'Ausgeglichene Persistenz und Diffusion',
    params: {
      decayRate: 0.97,
      diffusionFreq: 3,  // MITTLERE Diffusion (jedes 3. Frame)
      fadeStrength: 0.15,
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
      sensorDist: 60,
      sensorAngle: 0.5,
      deposit: 8,
      turnSpeed: 1.5,
    },
  },
  {
    name: 'Sammler',
    icon: '🐜',
    description: 'Kurze Reichweite, hohe Deposition',
    params: {
      sensorDist: 8,
      sensorAngle: 0.3,
      deposit: 40,
      turnSpeed: 0.2,
    },
  },
  {
    name: 'Scouts',
    icon: '🦋',
    description: 'Extreme Reichweite, weites Sichtfeld',
    params: {
      sensorDist: 75,
      sensorAngle: 1.8,
      deposit: 5,
      turnSpeed: 1.2,
    },
  },
  {
    name: 'Tanks',
    icon: '🐢',
    description: 'Minimal Reichweite, sehr hohe Deposition',
    params: {
      sensorDist: 5,
      sensorAngle: 0.15,
      deposit: 48,
      turnSpeed: 0.1,
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
      turnSpeed: 0.5,
    },
  },
  {
    name: 'Chaotisch',
    icon: '🦀',
    description: 'Enges Sichtfeld, extreme Wendigkeit',
    params: {
      sensorDist: 12,
      sensorAngle: 0.2,
      deposit: 10,
      turnSpeed: 2.2,
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
    description: 'Extrem schnell, starker Chaos',
    params: {
      speed: 5.5,
      agentCount: 3000,
      chaosInterval: 80,
      chaosStrength: 1.5,
    },
  },
  {
    name: 'Marathon',
    icon: '🏃',
    description: 'Mittlere Geschwindigkeit, viele Agents',
    params: {
      speed: 1.5,
      agentCount: 8000,
      chaosInterval: 0,
      chaosStrength: 0.0,
    },
  },
  {
    name: 'Pulsierend',
    icon: '💓',
    description: 'Regelmäßige starke Störungen',
    params: {
      speed: 1.2,
      agentCount: 5000,
      chaosInterval: 150,
      chaosStrength: 1.2,
    },
  },
  {
    name: 'Eingefroren',
    icon: '❄️',
    description: 'Minimal langsam, kein Chaos',
    params: {
      speed: 0.15,
      agentCount: 2000,
      chaosInterval: 0,
      chaosStrength: 0.0,
    },
  },
  {
    name: 'Mega-Dichte',
    icon: '🏙️',
    description: 'Extrem viele Agents',
    params: {
      speed: 1.0,
      agentCount: 14000,
      chaosInterval: 0,
      chaosStrength: 0.0,
    },
  },
  {
    name: 'Minimal',
    icon: '🌱',
    description: 'Sehr wenige Agents, langsam',
    params: {
      speed: 0.6,
      agentCount: 150,
      chaosInterval: 0,
      chaosStrength: 0.0,
    },
  },
];

// ========================================
// EFFECTS PRESETS (Effects Tab)
// ========================================

export interface EffectsPreset {
  name: string;
  icon: string;
  description: string;
  params: EffectsParams;
}

export const effectsPresets: EffectsPreset[] = [
  {
    name: 'Klar',
    icon: '💎',
    description: 'Keine Effekte, kristallklare Sicht',
    params: {
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
  },
  {
    name: 'Sanft',
    icon: '🌸',
    description: 'Subtile Effekte, leichter Glow',
    params: {
      blur: 1.5,
      bloom: 0.15,
      saturation: 1.1,
      contrast: 1.05,
      hueShift: 0,
      motionBlur: 0.1,
      vignette: 0.1,
      chromaticAberration: 0,
      waveDistortion: 0,
    },
  },
  {
    name: 'Traumhaft',
    icon: '☁️',
    description: 'Weich verschwommen, hoher Bloom',
    params: {
      blur: 8,
      bloom: 0.5,
      saturation: 0.85,
      contrast: 0.9,
      hueShift: 0,
      motionBlur: 0.3,
      vignette: 0.25,
      chromaticAberration: 0,
      waveDistortion: 0,
    },
  },
  {
    name: 'Neon Glow',
    icon: '✨',
    description: 'Extreme Sättigung, starker Bloom',
    params: {
      blur: 3,
      bloom: 0.8,
      saturation: 2.5,
      contrast: 1.4,
      hueShift: 0,
      motionBlur: 0.15,
      vignette: 0.3,
      chromaticAberration: 0,
      waveDistortion: 0,
    },
  },
  {
    name: 'Psychedelisch',
    icon: '🌈',
    description: 'RGB-Shift, Farbrotation, Verzerrung',
    params: {
      blur: 4,
      bloom: 0.4,
      saturation: 2.0,
      contrast: 1.2,
      hueShift: 180,
      motionBlur: 0.25,
      vignette: 0,
      chromaticAberration: 8,
      waveDistortion: 0.6,
    },
  },
  {
    name: 'Retro CRT',
    icon: '📺',
    description: 'Alter Monitor-Look mit RGB-Shift',
    params: {
      blur: 0.5,
      bloom: 0.2,
      saturation: 0.9,
      contrast: 1.3,
      hueShift: 0,
      motionBlur: 0.4,
      vignette: 0.5,
      chromaticAberration: 4,
      waveDistortion: 0.2,
    },
  },
  {
    name: 'Flüssig',
    icon: '💧',
    description: 'Hoher Motion Blur, fließende Bewegungen',
    params: {
      blur: 6,
      bloom: 0.35,
      saturation: 1.2,
      contrast: 0.95,
      hueShift: 0,
      motionBlur: 0.75,
      vignette: 0.15,
      chromaticAberration: 0,
      waveDistortion: 0.1,
    },
  },
  {
    name: 'Meditation',
    icon: '🧘',
    description: 'Starker Blur, weiche Kanten, beruhigend',
    params: {
      blur: 15,
      bloom: 0.6,
      saturation: 0.7,
      contrast: 0.8,
      hueShift: 0,
      motionBlur: 0.5,
      vignette: 0.4,
      chromaticAberration: 0,
      waveDistortion: 0,
    },
  },
];
