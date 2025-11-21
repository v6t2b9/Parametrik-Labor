import type { Preset, AllParameters } from '../types/index.js';
import { DEFAULT_PRESET } from '../audio/presets';
import { DEFAULT_ECOLOGY_CONFIG } from '../engine/SpeciesConfigs';

// Default Performance Parameters
export const defaultPerformanceParams = {
  autoOptimize: true,
  targetFPS: 60,
  qualityPreset: 'high' as const,
  _currentOptLevel: 0,
};

// Default/Base Parameters - Using "Plasma Dream" for impressive startup!
export const defaultParameters: AllParameters = {
  // Universal defaults (cross-species baseline)
  universal: {
    physical: {
      decayRate: 0.93,
      diffusionFreq: 3,  // Mittlere Diffusion für fluid flow
      fadeStrength: 0.15,
      trailSaturation: 220,
    },
    semiotic: {
      sensorDist: 22,
      sensorAngle: 0.7,
      deposit: 18,
      turnSpeed: 0.5,
    },
    temporal: {
      speed: 1.8,
      chaosInterval: 0,
      chaosStrength: 0.0,
    },
    resonance: {
      attractionStrength: 1.1,
      repulsionStrength: -0.3,
      crossSpeciesInteraction: true,
      interactionMatrix: {
        redToRed: 0.5,
        redToGreen: 0.0,
        redToBlue: 0.0,
        greenToRed: 0.0,
        greenToGreen: 0.5,
        greenToBlue: 0.0,
        blueToRed: 0.0,
        blueToGreen: 0.0,
        blueToBlue: 0.5,
      },
    },
    audio: DEFAULT_PRESET,
  },

  // Species-specific overrides (empty by default - all use universal)
  species: {
    red: { physical: {}, semiotic: {}, temporal: {}, resonance: {}, audio: {} },
    green: { physical: {}, semiotic: {}, temporal: {}, resonance: {}, audio: {} },
    blue: { physical: {}, semiotic: {}, temporal: {}, resonance: {}, audio: {} },
  },

  // Global temporal params
  globalTemporal: {
    agentCount: 2000,
    simulationSpeed: 1.0,
  },

  // Visual/technical params (global) - Plasma Dream colors!
  visualization: {
    brightness: 3.8,
    blendMode: 'screen' as const,
    trailIntensity: 150,
    colorRed: { r: 255, g: 50, b: 150 },    // Vibrant Pink
    colorGreen: { r: 50, g: 255, b: 255 },  // Cyan
    colorBlue: { r: 255, g: 255, b: 50 },   // Yellow
    colorBg: { r: 5, g: 5, b: 15 },
    showAgents: false,     // Default: Lavalamp Mode (pure trails)
    useTriangles: true,    // Lab Mode: Show directional triangles
    hueCycling: {
      enabled: false,
      startHue: 0,
      endHue: 360,
      speed: 1.0,
    },
  },
  effects: {
    blur: 0,
    bloom: 0.4,
    saturation: 1.0,
    contrast: 1.0,
    hueShift: 0,
    motionBlur: 0.4,
    vignette: 0,
    chromaticAberration: 0,
    waveDistortion: 0,
    scanlines: 0,
    pixelation: 1,
  },
  performance: defaultPerformanceParams,
  // Quantum-inspired stigmergy model params
  modelParams: {
    model: 'M1' as const, // Default: Classical stigmergy
    m2: {
      highThreshold: 120,
      lowThreshold: 30,
      explorationNoise: 0.3,
    },
    m3: {
      phaseRotationRate: 0.005,
      amplitudeCoupling: 0.15,
      contextThreshold: 250,
      phaseNoise: 0.05,
    },
  },
  // Ecosystem mode (optional)
  ecosystemMode: false, // Default: Stigmergy mode
  ecosystem: DEFAULT_ECOLOGY_CONFIG,
};

/**
 * LEGACY COMPATIBILITY
 *
 * This function converts old preset format to the new AllParameters structure.
 * The old format had a flatter structure without the universal/species/globalTemporal split.
 *
 * @deprecated This is maintained for backwards compatibility only. New presets should use AllParameters directly.
 *
 * TODO: Phase out legacy format in v2.0.0
 * - Remove this converter
 * - Update all presets to use AllParameters directly
 * - Add migration guide for custom presets
 *
 * @param legacy - Old preset format (any type for compatibility)
 * @returns AllParameters - New standardized preset format
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertLegacyPreset(legacy: any): AllParameters {
  return {
    universal: {
      physical: legacy.physical,
      semiotic: legacy.semiotic,
      temporal: {
        speed: legacy.temporal.speed,
        chaosInterval: legacy.temporal.chaosInterval,
        chaosStrength: legacy.temporal.chaosStrength,
      },
      resonance: {
        ...legacy.resonance,
        interactionMatrix: legacy.resonance?.interactionMatrix || {
          redToRed: 0.5,
          redToGreen: 0.0,
          redToBlue: 0.0,
          greenToRed: 0.0,
          greenToGreen: 0.5,
          greenToBlue: 0.0,
          blueToRed: 0.0,
          blueToGreen: 0.0,
          blueToBlue: 0.5,
        },
      },
      audio: DEFAULT_PRESET,
    },
    species: {
      red: { physical: {}, semiotic: {}, temporal: {}, resonance: {}, audio: {} },
      green: { physical: {}, semiotic: {}, temporal: {}, resonance: {}, audio: {} },
      blue: { physical: {}, semiotic: {}, temporal: {}, resonance: {}, audio: {} },
    },
    globalTemporal: {
      agentCount: legacy.temporal.agentCount,
      simulationSpeed: legacy.temporal.simulationSpeed,
    },
    visualization: {
      ...legacy.visualization,
      blendMode: legacy.visualization.blendMode || 'additive',
      trailIntensity: legacy.visualization.trailIntensity || 180,
      showAgents: legacy.visualization.showAgents ?? false,  // Default: Lavalamp mode
      useTriangles: legacy.visualization.useTriangles ?? true,  // Default: Directional triangles
      hueCycling: legacy.visualization.hueCycling || {
        enabled: false,
        startHue: 0,
        endHue: 360,
        speed: 1.0,
      },
    },
    effects: {
      ...legacy.effects,
      scanlines: legacy.effects.scanlines || 0,
      pixelation: legacy.effects.pixelation || 1,
    },
    performance: legacy.performance,
    modelParams: legacy.modelParams || defaultParameters.modelParams,
    ecosystemMode: legacy.ecosystemMode || false,
    ecosystem: legacy.ecosystem || DEFAULT_ECOLOGY_CONFIG,
  };
}

// Preset 1: Plasma Dream
const plasmaDreamPreset: Preset = {
  name: 'Plasma Dream',
  icon: '🌈',
  description: 'Fließende organische Plasma-Wellen mit weichen leuchtenden Übergängen - perfekte Lavalampen-Ästhetik!',
  parameters: {
    physical: {
      decayRate: 0.93,
      diffusionFreq: 3,  // Mittlere Diffusion für fluid flow
      fadeStrength: 0.15,
      trailSaturation: 220,
    },
    semiotic: {
      sensorDist: 22,
      sensorAngle: 0.7,
      deposit: 18,
      turnSpeed: 0.5,
    },
    temporal: {
      speed: 1.8,
      agentCount: 2000,
      chaosInterval: 0,
      chaosStrength: 0.0,
      simulationSpeed: 1.0,
    },
    resonance: {
      attractionStrength: 1.1,
      repulsionStrength: -0.3,
      crossSpeciesInteraction: true,
    },
    visualization: {
      brightness: 3.8,
      blendMode: 'screen',
      trailIntensity: 150,
      colorRed: { r: 255, g: 50, b: 150 },    // Vibrant Pink
      colorGreen: { r: 50, g: 255, b: 255 },  // Cyan
      colorBlue: { r: 255, g: 255, b: 50 },   // Yellow
      colorBg: { r: 5, g: 5, b: 15 },
    },
    effects: {
      blur: 0,
      bloom: 0.4,
      saturation: 1.0,
      contrast: 1.0,
      hueShift: 0,
      motionBlur: 0.4,
      vignette: 0,
      chromaticAberration: 0,
      waveDistortion: 0,
      scanlines: 0,
      pixelation: 1,
    },
    performance: defaultPerformanceParams,
  },
};

// Preset 2: Neon Jungle
const neonJunglePreset: Preset = {
  name: 'Neon Jungle',
  icon: '🔥',
  description: 'Wilde, gesättigte Neon-Energie mit maximaler Leuchtkraft - intensiv und elektrisierend!',
  parameters: {
    physical: {
      decayRate: 0.91,
      diffusionFreq: 4,  // Höhere Diffusion für chaotische Energie
      fadeStrength: 0.2,
      trailSaturation: 180,
    },
    semiotic: {
      sensorDist: 18,
      sensorAngle: 0.65,
      deposit: 12,
      turnSpeed: 0.75,
    },
    temporal: {
      speed: 2.5,
      agentCount: 2000,
      chaosInterval: 100,
      chaosStrength: 0.7,
      simulationSpeed: 1.0,
    },
    resonance: {
      attractionStrength: 0.9,
      repulsionStrength: -0.5,
      crossSpeciesInteraction: true,
    },
    visualization: {
      brightness: 4.5,
      blendMode: 'additive',
      trailIntensity: 100,
      colorRed: { r: 255, g: 0, b: 200 },     // Neon Magenta
      colorGreen: { r: 150, g: 255, b: 0 },   // Lime
      colorBlue: { r: 0, g: 255, b: 255 },    // Cyan
      colorBg: { r: 0, g: 0, b: 0 },
    },
    effects: {
      blur: 0,
      bloom: 0.7,
      saturation: 1.8,
      contrast: 1.0,
      hueShift: 0,
      motionBlur: 0,
      vignette: 0,
      chromaticAberration: 0,
      waveDistortion: 0,
      scanlines: 0,
      pixelation: 1,
    },
    performance: defaultPerformanceParams,
  },
};

// Preset 3: Digital Rain
const digitalRainPreset: Preset = {
  name: 'Digital Rain',
  icon: '💚',
  description: 'Matrix Code mit Scanlines - grüne Datenströme im CRT-Stil!',
  parameters: {
    physical: {
      decayRate: 0.94,
      diffusionFreq: 3,
      fadeStrength: 0.12,
      trailSaturation: 210,
    },
    semiotic: {
      sensorDist: 28,
      sensorAngle: 0.4,
      deposit: 16,
      turnSpeed: 0.35,
    },
    temporal: {
      speed: 1.6,
      agentCount: 2000,
      chaosInterval: 0,
      chaosStrength: 0.0,
      simulationSpeed: 1.0,
    },
    resonance: {
      attractionStrength: 1.1,
      repulsionStrength: -0.2,
      crossSpeciesInteraction: true,
    },
    visualization: {
      brightness: 4.2,
      blendMode: 'additive',
      trailIntensity: 110,
      colorRed: { r: 50, g: 200, b: 50 },     // Dark Green
      colorGreen: { r: 100, g: 255, b: 100 }, // Medium Green
      colorBlue: { r: 150, g: 255, b: 150 },  // Light Green
      colorBg: { r: 0, g: 5, b: 0 },
    },
    effects: {
      blur: 0,
      bloom: 0,
      saturation: 1.0,
      contrast: 1.0,
      hueShift: 0,
      motionBlur: 0.3,
      vignette: 0,
      chromaticAberration: 0,
      waveDistortion: 0,
      scanlines: 0.7,
      pixelation: 1,
    },
    performance: defaultPerformanceParams,
  },
};

// Preset 4: Aurora Sky
const auroraSkyPreset: Preset = {
  name: 'Aurora Sky',
  icon: '🌌',
  description: 'Nordlicht-Zauber mit langsam fließenden, ätherischen Wellen - magisch und beruhigend!',
  parameters: {
    physical: {
      decayRate: 0.95,
      diffusionFreq: 2,
      fadeStrength: 0.1,
      trailSaturation: 230,
    },
    semiotic: {
      sensorDist: 30,
      sensorAngle: 0.55,
      deposit: 20,
      turnSpeed: 0.4,
    },
    temporal: {
      speed: 1.2,
      agentCount: 2500,
      chaosInterval: 0,
      chaosStrength: 0.0,
      simulationSpeed: 1.0,
    },
    resonance: {
      attractionStrength: 1.3,
      repulsionStrength: -0.2,
      crossSpeciesInteraction: true,
    },
    visualization: {
      brightness: 3.5,
      blendMode: 'additive',
      trailIntensity: 140,
      colorRed: { r: 50, g: 255, b: 150 },    // Grün
      colorGreen: { r: 100, g: 255, b: 220 }, // Türkis
      colorBlue: { r: 180, g: 100, b: 255 },  // Violett
      colorBg: { r: 2, g: 2, b: 12 },
    },
    effects: {
      blur: 0,
      bloom: 0.5,
      saturation: 1.3,
      contrast: 1.0,
      hueShift: 0,
      motionBlur: 0,
      vignette: 0,
      chromaticAberration: 0,
      waveDistortion: 0,
      scanlines: 0,
      pixelation: 1,
    },
    performance: defaultPerformanceParams,
  },
};

// Preset 5: Lava Flow
const lavaFlowPreset: Preset = {
  name: 'Lava Flow',
  icon: '🌋',
  description: 'Geschmolzenes Gestein mit dunklem Multiply-Blend - klassische Lavalampen-Ästhetik!',
  parameters: {
    physical: {
      decayRate: 0.97,
      diffusionFreq: 8,  // Wenig Diffusion für klebrige Konsistenz
      fadeStrength: 0.08,
      trailSaturation: 240,
    },
    semiotic: {
      sensorDist: 20,
      sensorAngle: 0.45,
      deposit: 22,
      turnSpeed: 0.25,
    },
    temporal: {
      speed: 0.8,
      agentCount: 2000,
      chaosInterval: 0,
      chaosStrength: 0.0,
      simulationSpeed: 1.0,
    },
    resonance: {
      attractionStrength: 1.5,
      repulsionStrength: -0.2,
      crossSpeciesInteraction: true,
    },
    visualization: {
      brightness: 3.2,
      blendMode: 'multiply',
      trailIntensity: 180,
      colorRed: { r: 255, g: 100, b: 0 },     // Orange
      colorGreen: { r: 255, g: 50, b: 0 },    // Rot
      colorBlue: { r: 255, g: 200, b: 0 },    // Gelb
      colorBg: { r: 20, g: 15, b: 10 },
    },
    effects: {
      blur: 3,
      bloom: 0,
      saturation: 1.0,
      contrast: 1.0,
      hueShift: 0,
      motionBlur: 0.6,
      vignette: 0,
      chromaticAberration: 0,
      waveDistortion: 0,
      scanlines: 0,
      pixelation: 1,
    },
    performance: defaultPerformanceParams,
  },
};

// Preset 6: Crystal Cave
const crystalCavePreset: Preset = {
  name: 'Crystal Cave',
  icon: '💎',
  description: 'Geometrisch-kristalline Strukturen mit glasklarer Sicht - präzise und elegant!',
  parameters: {
    physical: {
      decayRate: 0.98,
      diffusionFreq: 1,  // Minimal Diffusion für hohe Stabilität
      fadeStrength: 0.06,
      trailSaturation: 255,
    },
    semiotic: {
      sensorDist: 15,
      sensorAngle: 0.25,
      deposit: 28,
      turnSpeed: 0.2,
    },
    temporal: {
      speed: 1.3,
      agentCount: 2000,
      chaosInterval: 0,
      chaosStrength: 0.0,
      simulationSpeed: 1.0,
    },
    resonance: {
      attractionStrength: 1.7,
      repulsionStrength: -0.5,
      crossSpeciesInteraction: true,
    },
    visualization: {
      brightness: 4.5,
      blendMode: 'additive',
      trailIntensity: 85,
      colorRed: { r: 100, g: 200, b: 255 },   // Eisblau
      colorGreen: { r: 255, g: 100, b: 200 }, // Pink
      colorBlue: { r: 255, g: 255, b: 255 },  // Weiß
      colorBg: { r: 0, g: 0, b: 5 },
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
      scanlines: 0,
      pixelation: 1,
    },
    performance: defaultPerformanceParams,
  },
};

// Preset 7: Electric Storm
const electricStormPreset: Preset = {
  name: 'Electric Storm',
  icon: '⚡',
  description: 'Chaotische Energie-Entladungen mit turbulenten Bewegungen - wild und elektrisierend!',
  parameters: {
    physical: {
      decayRate: 0.9,
      diffusionFreq: 5,  // Höhere Diffusion für Turbulenz
      fadeStrength: 0.22,
      trailSaturation: 160,
    },
    semiotic: {
      sensorDist: 16,
      sensorAngle: 0.7,
      deposit: 10,
      turnSpeed: 0.9,
    },
    temporal: {
      speed: 3.0,
      agentCount: 2000,
      chaosInterval: 80,
      chaosStrength: 0.95,
      simulationSpeed: 1.0,
    },
    resonance: {
      attractionStrength: 0.6,
      repulsionStrength: -0.7,
      crossSpeciesInteraction: true,
    },
    visualization: {
      brightness: 5.0,
      blendMode: 'screen',
      trailIntensity: 80,
      colorRed: { r: 100, g: 200, b: 255 },   // Electric Blue
      colorGreen: { r: 255, g: 255, b: 100 }, // Yellow
      colorBlue: { r: 255, g: 255, b: 255 },  // White
      colorBg: { r: 0, g: 0, b: 0 },
    },
    effects: {
      blur: 0,
      bloom: 0.8,
      saturation: 1.0,
      contrast: 1.0,
      hueShift: 0,
      motionBlur: 0,
      vignette: 0,
      chromaticAberration: 3,
      waveDistortion: 0,
      scanlines: 0,
      pixelation: 1,
    },
    performance: defaultPerformanceParams,
  },
};

// Preset 8: Retro Arcade
const retroArcadePreset: Preset = {
  name: 'Retro Arcade',
  icon: '🎮',
  description: '8-bit Gaming Nostalgie mit Pixelation und Scanlines - retro Perfektion!',
  parameters: {
    physical: {
      decayRate: 0.95,
      diffusionFreq: 3,
      fadeStrength: 0.12,
      trailSaturation: 210,
    },
    semiotic: {
      sensorDist: 24,
      sensorAngle: 0.5,
      deposit: 18,
      turnSpeed: 0.4,
    },
    temporal: {
      speed: 1.5,
      agentCount: 2000,
      chaosInterval: 0,
      chaosStrength: 0.0,
      simulationSpeed: 1.0,
    },
    resonance: {
      attractionStrength: 1.2,
      repulsionStrength: -0.3,
      crossSpeciesInteraction: true,
    },
    visualization: {
      brightness: 2.5,
      blendMode: 'average',
      trailIntensity: 160,
      colorRed: { r: 255, g: 0, b: 0 },       // Primary Red
      colorGreen: { r: 0, g: 255, b: 0 },     // Primary Green
      colorBlue: { r: 0, g: 0, b: 255 },      // Primary Blue
      colorBg: { r: 10, g: 10, b: 10 },
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
      scanlines: 0.5,
      pixelation: 6,
    },
    performance: defaultPerformanceParams,
  },
};

/**
 * LEGACY PRESETS
 *
 * These presets use the old format and are converted at runtime.
 * They are kept here for backwards compatibility.
 *
 * @deprecated Use AllParameters format directly for new presets
 */
const legacyPresets = [
  plasmaDreamPreset,
  neonJunglePreset,
  digitalRainPreset,
  auroraSkyPreset,
  lavaFlowPreset,
  crystalCavePreset,
  electricStormPreset,
  retroArcadePreset,
];

/**
 * Built-in presets converted to the new AllParameters format.
 * Legacy presets are converted at runtime using convertLegacyPreset().
 */
export const builtInPresets: Preset[] = legacyPresets.map(preset => ({
  ...preset,
  parameters: convertLegacyPreset(preset.parameters),
}));

// Helper function to get preset by name
export function getPresetByName(name: string): Preset | undefined {
  return builtInPresets.find((p) => p.name === name);
}
