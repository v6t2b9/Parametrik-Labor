import type {
  VisualizationParams,
  PhysicalOikosParams,
  SemioticOikosParams,
  TemporalOikosParams,
  EffectsParams,
  LetterboxParams,
} from '../types/index.js';

// ========================================
// VISUAL PRESETS (Visualization Tab)
// ========================================

export interface VisualPreset {
  name: string;
  icon: string;
  description: string;
  params: Partial<VisualizationParams>;  // Partial so we don't have to specify showAgents/useTriangles every time
}

export const visualPresets: VisualPreset[] = [
  {
    name: 'Heatmap',
    icon: '🔥',
    description: 'Warme Farben, hohe Intensität, glasklare Trails',
    params: {
      brightness: 3.5,
      blendMode: 'additive',
      trailIntensity: 120,
      colorRed: { r: 255, g: 40, b: 0 },
      colorGreen: { r: 255, g: 200, b: 0 },
      colorBlue: { r: 255, g: 255, b: 100 },
      colorBg: { r: 5, g: 0, b: 0 },
    },
  },
  {
    name: 'Tiefsee',
    icon: '🌊',
    description: 'Dunkle Blau-/Grüntöne, hohe Trail-Persistenz',
    params: {
      brightness: 2.2,
      blendMode: 'additive',
      trailIntensity: 220,
      colorRed: { r: 0, g: 100, b: 180 },
      colorGreen: { r: 0, g: 200, b: 200 },
      colorBlue: { r: 20, g: 120, b: 220 },
      colorBg: { r: 0, g: 2, b: 10 },
    },
  },
  {
    name: 'Galaxie',
    icon: '🌌',
    description: 'Violett-magenta Nebel mit starkem Glow',
    params: {
      brightness: 3.0,
      blendMode: 'additive',
      trailIntensity: 160,
      colorRed: { r: 255, g: 0, b: 200 },
      colorGreen: { r: 120, g: 100, b: 255 },
      colorBlue: { r: 255, g: 150, b: 255 },
      colorBg: { r: 2, g: 0, b: 8 },
    },
  },
  {
    name: 'Nordlicht',
    icon: '🌈',
    description: 'Grün-türkis Aurora mit zartem Violett',
    params: {
      brightness: 3.2,
      blendMode: 'additive',
      trailIntensity: 140,
      colorRed: { r: 100, g: 255, b: 180 },
      colorGreen: { r: 40, g: 255, b: 240 },
      colorBlue: { r: 200, g: 150, b: 255 },
      colorBg: { r: 0, g: 1, b: 8 },
    },
  },
  {
    name: 'Neon City',
    icon: '💡',
    description: 'Gesättigte Primärfarben, pure Energie',
    params: {
      brightness: 4.5,
      blendMode: 'additive',
      trailIntensity: 100,
      colorRed: { r: 255, g: 0, b: 100 },
      colorGreen: { r: 0, g: 255, b: 50 },
      colorBlue: { r: 0, g: 150, b: 255 },
      colorBg: { r: 0, g: 0, b: 0 },
    },
  },
  {
    name: 'Pastell',
    icon: '🌸',
    description: 'Sanfte Farben, multiply blend für weichen Look',
    params: {
      brightness: 1.8,
      blendMode: 'multiply',
      trailIntensity: 240,
      colorRed: { r: 255, g: 180, b: 200 },
      colorGreen: { r: 180, g: 255, b: 210 },
      colorBlue: { r: 200, g: 220, b: 255 },
      colorBg: { r: 240, g: 240, b: 245 },
    },
  },
  {
    name: 'Infrarot',
    icon: '🔴',
    description: 'Thermische Sicht, intensive Rottöne',
    params: {
      brightness: 3.8,
      blendMode: 'additive',
      trailIntensity: 110,
      colorRed: { r: 255, g: 0, b: 0 },
      colorGreen: { r: 255, g: 100, b: 0 },
      colorBlue: { r: 200, g: 0, b: 0 },
      colorBg: { r: 0, g: 0, b: 0 },
    },
  },
  {
    name: 'Biolumineszenz',
    icon: '✨',
    description: 'Organisches Leuchten in Meerestiefen',
    params: {
      brightness: 3.8,
      blendMode: 'additive',
      trailIntensity: 130,
      colorRed: { r: 0, g: 255, b: 180 },
      colorGreen: { r: 100, g: 255, b: 220 },
      colorBlue: { r: 80, g: 200, b: 255 },
      colorBg: { r: 0, g: 0, b: 3 },
    },
  },
  {
    name: 'Lava',
    icon: '🌋',
    description: 'Geschmolzenes Gestein, Orange-Rot Glut',
    params: {
      brightness: 4.2,
      blendMode: 'additive',
      trailIntensity: 105,
      colorRed: { r: 255, g: 40, b: 0 },
      colorGreen: { r: 255, g: 120, b: 0 },
      colorBlue: { r: 220, g: 80, b: 0 },
      colorBg: { r: 10, g: 0, b: 0 },
    },
  },
  {
    name: 'Frosted Glass',
    icon: '❄️',
    description: 'Eisige Pastellfarben mit multiply blend',
    params: {
      brightness: 1.6,
      blendMode: 'multiply',
      trailIntensity: 250,
      colorRed: { r: 200, g: 220, b: 255 },
      colorGreen: { r: 220, g: 255, b: 240 },
      colorBlue: { r: 230, g: 240, b: 255 },
      colorBg: { r: 245, g: 248, b: 252 },
    },
  },
  {
    name: 'Blacklight',
    icon: '🌟',
    description: 'UV-Farben auf schwarzem Grund, extreme Sättigung',
    params: {
      brightness: 5.0,
      blendMode: 'screen',
      trailIntensity: 95,
      colorRed: { r: 255, g: 0, b: 255 },
      colorGreen: { r: 0, g: 255, b: 150 },
      colorBlue: { r: 100, g: 200, b: 255 },
      colorBg: { r: 0, g: 0, b: 0 },
    },
  },
  {
    name: 'Sunset',
    icon: '🌅',
    description: 'Warme Sonnenuntergangsfarben',
    params: {
      brightness: 2.8,
      blendMode: 'additive',
      trailIntensity: 150,
      colorRed: { r: 255, g: 80, b: 50 },
      colorGreen: { r: 255, g: 150, b: 50 },
      colorBlue: { r: 180, g: 100, b: 200 },
      colorBg: { r: 8, g: 4, b: 12 },
    },
  },
  {
    name: 'Matrix Code',
    icon: '💚',
    description: 'Grüne Datenströme mit Scanlines - The Matrix!',
    params: {
      brightness: 4.0,
      blendMode: 'additive',
      trailIntensity: 120,
      colorRed: { r: 0, g: 255, b: 80 },
      colorGreen: { r: 0, g: 255, b: 120 },
      colorBlue: { r: 0, g: 200, b: 100 },
      colorBg: { r: 0, g: 0, b: 0 },
    },
  },
  {
    name: 'Candy',
    icon: '🍬',
    description: 'Bonbonfarben, süß und knallig',
    params: {
      brightness: 3.5,
      blendMode: 'additive',
      trailIntensity: 135,
      colorRed: { r: 255, g: 50, b: 150 },
      colorGreen: { r: 100, g: 255, b: 150 },
      colorBlue: { r: 150, g: 150, b: 255 },
      colorBg: { r: 5, g: 5, b: 10 },
    },
  },
  {
    name: 'Monochrome',
    icon: '⬜',
    description: 'Schwarzweiß mit multiply für Kontrast',
    params: {
      brightness: 2.0,
      blendMode: 'average',
      trailIntensity: 200,
      colorRed: { r: 220, g: 220, b: 220 },
      colorGreen: { r: 200, g: 200, b: 200 },
      colorBlue: { r: 240, g: 240, b: 240 },
      colorBg: { r: 15, g: 15, b: 15 },
    },
  },
  {
    name: 'Toxic',
    icon: '☢️',
    description: 'Giftige Neongrün-Gelb Warnung',
    params: {
      brightness: 4.8,
      blendMode: 'additive',
      trailIntensity: 90,
      colorRed: { r: 200, g: 255, b: 0 },
      colorGreen: { r: 150, g: 255, b: 0 },
      colorBlue: { r: 100, g: 255, b: 50 },
      colorBg: { r: 0, g: 5, b: 0 },
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
      agentCount: 2000,
      chaosInterval: 80,
      chaosStrength: 1.5,
      simulationSpeed: 1.0,
    },
  },
  {
    name: 'Marathon',
    icon: '🏃',
    description: 'Mittlere Geschwindigkeit, viele Agents',
    params: {
      speed: 1.5,
      agentCount: 2400,
      chaosInterval: 0,
      chaosStrength: 0.0,
      simulationSpeed: 1.0,
    },
  },
  {
    name: 'Pulsierend',
    icon: '💓',
    description: 'Regelmäßige starke Störungen',
    params: {
      speed: 1.2,
      agentCount: 2000,
      chaosInterval: 150,
      chaosStrength: 1.2,
      simulationSpeed: 1.0,
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
      simulationSpeed: 1.0,
    },
  },
  {
    name: 'Mega-Dichte',
    icon: '🏙️',
    description: 'Maximum Agents für dichte Strukturen',
    params: {
      speed: 1.0,
      agentCount: 2400,
      chaosInterval: 0,
      chaosStrength: 0.0,
      simulationSpeed: 1.0,
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
      simulationSpeed: 1.0,
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
      scanlines: 0,
      pixelation: 1,
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
      scanlines: 0,
      pixelation: 1,
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
      scanlines: 0,
      pixelation: 1,
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
      scanlines: 0,
      pixelation: 1,
    },
  },
  {
    name: 'Psychedelisch',
    icon: '🌈',
    description: 'RGB-Shift, Farbrotation, extreme Sättigung',
    params: {
      blur: 4,
      bloom: 0.6,
      saturation: 2.2,
      contrast: 1.3,
      hueShift: 180,
      motionBlur: 0.25,
      vignette: 0,
      chromaticAberration: 8,
      waveDistortion: 0,  // Removed for performance
      scanlines: 0,
      pixelation: 1,
    },
  },
  {
    name: 'Retro CRT',
    icon: '📺',
    description: 'Alter Monitor-Look mit Scanlines & RGB-Shift',
    params: {
      blur: 0.5,
      bloom: 0.2,
      saturation: 0.9,
      contrast: 1.3,
      hueShift: 0,
      motionBlur: 0.4,
      vignette: 0.5,
      chromaticAberration: 4,
      waveDistortion: 0,  // Removed for performance
      scanlines: 0.8,
      pixelation: 1,
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
      waveDistortion: 0,  // Removed for performance
      scanlines: 0,
      pixelation: 1,
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
      scanlines: 0,
      pixelation: 1,
    },
  },
  {
    name: 'Pixelated',
    icon: '🎮',
    description: '8-bit Retro Gaming Look',
    params: {
      blur: 0,
      bloom: 0.1,
      saturation: 1.4,
      contrast: 1.2,
      hueShift: 0,
      motionBlur: 0,
      vignette: 0.2,
      chromaticAberration: 0,
      waveDistortion: 0,
      scanlines: 0,
      pixelation: 8,
    },
  },
];

// ========================================
// LETTERBOX PRESETS (Letterbox Tab)
// ========================================

export interface LetterboxPreset {
  name: string;
  icon: string;
  description: string;
  params: Partial<LetterboxParams>;
}

export const letterboxPresets: LetterboxPreset[] = [
  {
    name: 'Fireworks',
    icon: '🎆',
    description: 'Bunte Explosionen mit hoher Streuung',
    params: {
      enabled: true,
      effectType: 'fireworks',
      particleCount: 100,
      particleSpeed: 4.0,
      particleLifetime: 1.5,
      particleSize: 3,
      spread: 180,
      intensity: 1.0,
      glow: 2.0,
      colorSaturation: 1.5,
      useAgentColor: true,
      trailInfluence: 0.2,
      gravity: 2.0,
      turbulence: 0.3,
      fadeType: 'smooth',
    },
  },
  {
    name: 'Sparks',
    icon: '✨',
    description: 'Funkenschauer mit Schwerkraft',
    params: {
      enabled: true,
      effectType: 'sparks',
      particleCount: 80,
      particleSpeed: 5.0,
      particleLifetime: 0.8,
      particleSize: 2,
      spread: 60,
      intensity: 0.9,
      glow: 1.8,
      colorSaturation: 1.8,
      useAgentColor: true,
      trailInfluence: 0.5,
      gravity: 3.0,
      turbulence: 0.1,
      fadeType: 'linear',
    },
  },
  {
    name: 'Plasma',
    icon: '🔮',
    description: 'Flüssiges Plasma, organisch fließend',
    params: {
      enabled: true,
      effectType: 'plasma',
      particleCount: 120,
      particleSpeed: 2.0,
      particleLifetime: 2.0,
      particleSize: 8,
      spread: 120,
      intensity: 0.7,
      glow: 2.5,
      colorSaturation: 1.0,
      useAgentColor: true,
      trailInfluence: 0.8,
      gravity: 0,
      turbulence: 0.8,
      fadeType: 'smooth',
    },
  },
  {
    name: 'Lightning',
    icon: '⚡',
    description: 'Elektrische Blitze und Bögen',
    params: {
      enabled: true,
      effectType: 'lightning',
      particleCount: 40,
      particleSpeed: 8.0,
      particleLifetime: 0.4,
      particleSize: 6,
      spread: 30,
      intensity: 1.0,
      glow: 3.0,
      colorSaturation: 2.0,
      useAgentColor: true,
      trailInfluence: 0.1,
      gravity: 0,
      turbulence: 0.6,
      fadeType: 'sudden',
    },
  },
  {
    name: 'Aurora',
    icon: '🌌',
    description: 'Fließende Nordlichter',
    params: {
      enabled: true,
      effectType: 'aurora',
      particleCount: 150,
      particleSpeed: 1.5,
      particleLifetime: 2.5,
      particleSize: 10,
      spread: 160,
      intensity: 0.6,
      glow: 2.2,
      colorSaturation: 0.8,
      useAgentColor: true,
      trailInfluence: 0.4,
      gravity: -1.0,
      turbulence: 0.9,
      fadeType: 'smooth',
    },
  },
  {
    name: 'Burst',
    icon: '💥',
    description: 'Explosive Bursts, schnell und kraftvoll',
    params: {
      enabled: true,
      effectType: 'burst',
      particleCount: 60,
      particleSpeed: 6.0,
      particleLifetime: 0.6,
      particleSize: 5,
      spread: 90,
      intensity: 1.0,
      glow: 1.5,
      colorSaturation: 1.2,
      useAgentColor: true,
      trailInfluence: 0.3,
      gravity: 0,
      turbulence: 0.2,
      fadeType: 'smooth',
    },
  },
  {
    name: 'Off',
    icon: '⬛',
    description: 'Letterbox deaktiviert',
    params: {
      enabled: false,
    },
  },
];
