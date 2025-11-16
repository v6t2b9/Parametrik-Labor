/**
 * Audio Mapping Presets
 * 5 predefined mapping configurations for different music genres/styles
 */

import type { MusicMappingParameters } from '../types/musicMappings';

/**
 * Default preset - Balanced mappings based on music psychology research
 * Suitable for most music genres
 */
export const DEFAULT_PRESET: MusicMappingParameters = {
  globalMusicInfluence: 1.0,

  tempo: {
    tempoToSpeedSensitivity: 0.8,
    tempoToSpeedCurve: 'linear',
    tempoToValenceSensitivity: 0.9,
    optimalBPM: 106,
    valenceRange: 0.5,
  },

  harmony: {
    consonanceToStabilitySensitivity: 1.0,
    dissonanceToTensionSensitivity: 0.9,
    tensionToRandomnessSensitivity: 0.8,
    tensionToRandomnessCurve: 'linear',
    repulsionThreshold: 0.85,
    repulsionStrength: -0.5,
  },

  spectral: {
    bassToSpeedSensitivity: 1.0,
    bassToDepositSensitivity: 0.7,
    midToSensorAngleSensitivity: 0.8,
    midToSensorDistanceSensitivity: 0.7,
    midToSensitivitySensitivity: 0.9,
    highToTurnSpeedSensitivity: 1.0,
    highToChaosnessSensitivity: 0.8,
  },

  rhythm: {
    beatEnabled: true,
    beatImpulseStrength: 1.5,
    beatDepositBurst: true,
    beatBurstIntensity: 1.0,
    beatCooldown: 300,
  },

  dynamics: {
    loudnessToIntensitySensitivity: 1.0,
    crescendoDetection: true,
    crescendoBoostFactor: 1.5,
  },

  compound: {
    valenceStabilityToAttractionSensitivity: 1.0,
    arousalValenceToDepositSensitivity: 0.8,
    tensionInstabilityToExplorationSensitivity: 0.7,
  },
};

/**
 * Bass-Heavy preset - Bass dominates, rest subtle
 * Great for electronic, hip-hop, dubstep
 */
export const BASS_HEAVY_PRESET: MusicMappingParameters = {
  globalMusicInfluence: 1.2,

  tempo: {
    tempoToSpeedSensitivity: 0.5,
    tempoToSpeedCurve: 'linear',
    tempoToValenceSensitivity: 0.4,
    optimalBPM: 120,
    valenceRange: 0.3,
  },

  harmony: {
    consonanceToStabilitySensitivity: 0.6,
    dissonanceToTensionSensitivity: 0.4,
    tensionToRandomnessSensitivity: 0.3,
    tensionToRandomnessCurve: 'linear',
    repulsionThreshold: 0.95,
    repulsionStrength: -0.2,
  },

  spectral: {
    bassToSpeedSensitivity: 2.0,
    bassToDepositSensitivity: 1.8,
    midToSensorAngleSensitivity: 0.3,
    midToSensorDistanceSensitivity: 0.3,
    midToSensitivitySensitivity: 0.3,
    highToTurnSpeedSensitivity: 0.2,
    highToChaosnessSensitivity: 0.2,
  },

  rhythm: {
    beatEnabled: true,
    beatImpulseStrength: 2.5,
    beatDepositBurst: true,
    beatBurstIntensity: 2.0,
    beatCooldown: 200,
  },

  dynamics: {
    loudnessToIntensitySensitivity: 1.3,
    crescendoDetection: true,
    crescendoBoostFactor: 2.0,
  },

  compound: {
    valenceStabilityToAttractionSensitivity: 0.5,
    arousalValenceToDepositSensitivity: 1.5,
    tensionInstabilityToExplorationSensitivity: 0.3,
  },
};

/**
 * Ambient/Meditative preset - Gentle, flowing, minimal chaos
 * Perfect for ambient, classical, meditation music
 */
export const AMBIENT_PRESET: MusicMappingParameters = {
  globalMusicInfluence: 0.6,

  tempo: {
    tempoToSpeedSensitivity: 0.3,
    tempoToSpeedCurve: 'logarithmic',
    tempoToValenceSensitivity: 1.2,
    optimalBPM: 90,
    valenceRange: 0.7,
  },

  harmony: {
    consonanceToStabilitySensitivity: 1.5,
    dissonanceToTensionSensitivity: 0.4,
    tensionToRandomnessSensitivity: 0.3,
    tensionToRandomnessCurve: 'logarithmic',
    repulsionThreshold: 0.95,
    repulsionStrength: -0.2,
  },

  spectral: {
    bassToSpeedSensitivity: 0.4,
    bassToDepositSensitivity: 0.5,
    midToSensorAngleSensitivity: 1.2,
    midToSensorDistanceSensitivity: 1.0,
    midToSensitivitySensitivity: 1.3,
    highToTurnSpeedSensitivity: 0.2,
    highToChaosnessSensitivity: 0.1,
  },

  rhythm: {
    beatEnabled: false,
    beatImpulseStrength: 0.0,
    beatDepositBurst: false,
    beatBurstIntensity: 0.0,
    beatCooldown: 0,
  },

  dynamics: {
    loudnessToIntensitySensitivity: 0.5,
    crescendoDetection: false,
    crescendoBoostFactor: 1.0,
  },

  compound: {
    valenceStabilityToAttractionSensitivity: 1.5,
    arousalValenceToDepositSensitivity: 0.5,
    tensionInstabilityToExplorationSensitivity: 0.3,
  },
};

/**
 * Chaotic/Experimental preset - Maximum reactivity, lots of dissonance response
 * For experimental, industrial, noise, metal
 */
export const CHAOTIC_PRESET: MusicMappingParameters = {
  globalMusicInfluence: 1.8,

  tempo: {
    tempoToSpeedSensitivity: 1.5,
    tempoToSpeedCurve: 'exponential',
    tempoToValenceSensitivity: 0.6,
    optimalBPM: 140,
    valenceRange: 0.3,
  },

  harmony: {
    consonanceToStabilitySensitivity: 0.5,
    dissonanceToTensionSensitivity: 2.0,
    tensionToRandomnessSensitivity: 1.8,
    tensionToRandomnessCurve: 'exponential',
    repulsionThreshold: 0.5,
    repulsionStrength: -0.8,
  },

  spectral: {
    bassToSpeedSensitivity: 1.2,
    bassToDepositSensitivity: 0.8,
    midToSensorAngleSensitivity: 1.0,
    midToSensorDistanceSensitivity: 0.8,
    midToSensitivitySensitivity: 1.0,
    highToTurnSpeedSensitivity: 1.8,
    highToChaosnessSensitivity: 2.0,
  },

  rhythm: {
    beatEnabled: true,
    beatImpulseStrength: 2.0,
    beatDepositBurst: true,
    beatBurstIntensity: 1.5,
    beatCooldown: 150,
  },

  dynamics: {
    loudnessToIntensitySensitivity: 1.8,
    crescendoDetection: true,
    crescendoBoostFactor: 2.5,
  },

  compound: {
    valenceStabilityToAttractionSensitivity: 0.3,
    arousalValenceToDepositSensitivity: 1.2,
    tensionInstabilityToExplorationSensitivity: 1.8,
  },
};

/**
 * Minimal preset - Only essential mappings
 * Subtle response, user can build up from here
 */
export const MINIMAL_PRESET: MusicMappingParameters = {
  globalMusicInfluence: 0.5,

  tempo: {
    tempoToSpeedSensitivity: 0.5,
    tempoToSpeedCurve: 'linear',
    tempoToValenceSensitivity: 0.3,
    optimalBPM: 106,
    valenceRange: 0.5,
  },

  harmony: {
    consonanceToStabilitySensitivity: 0.3,
    dissonanceToTensionSensitivity: 0.2,
    tensionToRandomnessSensitivity: 0.2,
    tensionToRandomnessCurve: 'linear',
    repulsionThreshold: 0.98,
    repulsionStrength: -0.1,
  },

  spectral: {
    bassToSpeedSensitivity: 0.3,
    bassToDepositSensitivity: 0.2,
    midToSensorAngleSensitivity: 0.2,
    midToSensorDistanceSensitivity: 0.2,
    midToSensitivitySensitivity: 0.2,
    highToTurnSpeedSensitivity: 0.2,
    highToChaosnessSensitivity: 0.1,
  },

  rhythm: {
    beatEnabled: false,
    beatImpulseStrength: 0.0,
    beatDepositBurst: false,
    beatBurstIntensity: 0.0,
    beatCooldown: 0,
  },

  dynamics: {
    loudnessToIntensitySensitivity: 0.3,
    crescendoDetection: false,
    crescendoBoostFactor: 1.0,
  },

  compound: {
    valenceStabilityToAttractionSensitivity: 0.3,
    arousalValenceToDepositSensitivity: 0.3,
    tensionInstabilityToExplorationSensitivity: 0.2,
  },
};

/**
 * All presets with metadata
 */
export const AUDIO_MAPPING_PRESETS = {
  default: {
    name: 'Default',
    icon: '🎵',
    description: 'Balanced mappings based on music psychology research',
    params: DEFAULT_PRESET,
  },
  bassHeavy: {
    name: 'Bass-Heavy',
    icon: '🔊',
    description: 'Bass dominates, perfect for electronic & hip-hop',
    params: BASS_HEAVY_PRESET,
  },
  ambient: {
    name: 'Ambient',
    icon: '🌊',
    description: 'Gentle & flowing, ideal for meditation & classical',
    params: AMBIENT_PRESET,
  },
  chaotic: {
    name: 'Chaotic',
    icon: '⚡',
    description: 'Maximum reactivity for experimental & metal',
    params: CHAOTIC_PRESET,
  },
  minimal: {
    name: 'Minimal',
    icon: '✨',
    description: 'Subtle response, build your own from here',
    params: MINIMAL_PRESET,
  },
};

/**
 * Get preset by key
 */
export function getPreset(key: keyof typeof AUDIO_MAPPING_PRESETS): MusicMappingParameters {
  return AUDIO_MAPPING_PRESETS[key].params;
}

/**
 * Get all preset names
 */
export function getPresetNames(): string[] {
  return Object.values(AUDIO_MAPPING_PRESETS).map((p) => p.name);
}
