import type { Preset, AllParameters } from '../types/index.js';
import { DEFAULT_PRESET } from '../audio/presets';
import { DEFAULT_ECOLOGY_CONFIG } from '../engine/SpeciesConfigs';

// Re-export Master Presets for easy access
export { masterPresets, type MasterPreset } from './masterPresets.js';

// Default Performance Parameters
export const defaultPerformanceParams = {
  autoOptimize: true,
  targetFPS: 60,
  qualityPreset: 'high' as const,
  _currentOptLevel: 0,
};

// Default/Base Parameters - Hypnotic 12-way mandala with deep relaxation!
export const defaultParameters: AllParameters = {
  // Universal defaults (cross-species baseline)
  universal: {
    physical: {
      decayRate: 0.97,
      diffusionFreq: 2,      // Clean, crisp trails
      fadeStrength: 0.10,
      trailSaturation: 255,
    },
    semiotic: {
      sensorDist: 30,
      sensorAngle: 0.5,
      deposit: 20,
      turnSpeed: 0.3,
    },
    temporal: {
      speed: 0.3,            // Slow, meditative movement
      chaosInterval: 0,
      chaosStrength: 0,
    },
    resonance: {
      attractionStrength: -0.4,  // Gentle repulsion creates organic spreading
      repulsionStrength: -0.2,
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
    agentCount: 3600,         // Dense, detailed patterns
    simulationSpeed: 0.2,     // Very slow, contemplative
  },

  // Visual/technical params (global) - 12-way mandala with deep space colors
  visualization: {
    brightness: 2.2,          // Subtle, not overwhelming
    blendMode: 'additive' as const,
    trailIntensity: 210,      // Strong, lasting trails
    colorRed: { r: 255, g: 0, b: 200 },      // Magenta
    colorGreen: { r: 120, g: 100, b: 255 },  // Purple
    colorBlue: { r: 255, g: 150, b: 255 },   // Pink
    colorBg: { r: 2, g: 0, b: 8 },           // Deep space background
    showAgents: true,
    useTriangles: true,
    hueCycling: {
      enabled: false,
      startHue: 0,
      endHue: 360,
      speed: 1.0,
    },
  },
  effects: {
    blur: 0,
    bloom: 0,
    bloomThreshold: 0.7,
    bloomRadius: 4,
    bloomIntensity: 1.0,      // Clean, minimal bloom
    saturation: 1.0,
    contrast: 1.0,
    hueShift: 0,
    motionBlur: 0,            // Sharp, crisp trails
    vignette: 0,
    chromaticAberration: 0,
    waveDistortion: 0,
    scanlines: 0,
    pixelation: 1,
    feedbackAmount: 0,
    feedbackZoom: 1.0,
    feedbackRotation: 0,
    feedbackOffsetX: 0,
    feedbackOffsetY: 0,
    kaleidoscopeSegments: 12, // Complex sacred geometry
    kaleidoscopeRotation: 0,
    kaleidoscopeZoom: 1.0,
    radialBlurStrength: 0,
    radialBlurCenterX: 0.5,
    radialBlurCenterY: 0.5,
    radialBlurQuality: 6,
    displacementStrength: 0,
    displacementScale: 1.5,
    displacementTime: 0,
    displacementAngle: 0,
    colorLUT: 'none',
    colorLUTIntensity: 1.0,
    mirrorMode: 'none',
    mirrorPosition: 0.5,
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
 * Built-in presets - converted from Master Presets format to Preset format
 * Master Presets use 'params' property, Preset interface uses 'parameters'
 */
export const builtInPresets: Preset[] = masterPresets.map(mp => ({
  name: mp.name,
  icon: mp.icon,
  description: mp.description,
  parameters: mp.params,
}));

// Helper function to get preset by name
export function getPresetByName(name: string): Preset | undefined {
  return builtInPresets.find((p) => p.name === name);
}
