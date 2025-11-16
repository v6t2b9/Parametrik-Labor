/**
 * Type definitions for Audio Oikos - Music-Reactive Visualization
 * Based on music psychology research (Carpentier & Potter 2007, Lin et al. 2023)
 */

// Curve types for mapping audio values to behavior
export type CurveType = 'linear' | 'exponential' | 'logarithmic' | 'sigmoid';

/**
 * Real-time audio analysis data
 * Contains both raw audio features and calculated music psychology dimensions
 */
export interface MusicAnalysis {
  // Raw spectral data (0-1 normalized)
  spectral: {
    bassEnergy: number;      // 20-250 Hz
    midEnergy: number;       // 250-2000 Hz
    highEnergy: number;      // 2000-20000 Hz
    centroid: number;        // 0-1, spectral brightness (weighted average frequency)
    rolloff: number;         // 0-1, frequency below which 85% of energy is contained
    flatness: number;        // 0-1, noisiness vs tonality (0=tonal, 1=noisy)
    zcr: number;             // 0-1, zero crossing rate (texture/percussiveness)
  };

  // Tempo and arousal (calculated from BPM)
  tempo: {
    bpm: number;             // 60-180 BPM
    arousalLevel: number;    // 0-1 (linear with BPM)
    valenceLevel: number;    // 0-1 (V-shaped, peak at optimalBPM)
  };

  // Harmony analysis (from spectral roughness)
  harmony: {
    consonance: number;      // 0-1 (pleasant, low roughness)
    dissonance: number;      // 0-1 (tense, high roughness)
    tension: number;         // 0-1 (= dissonance)
    stability: number;       // 0-1 (= 1 - tension)
    chroma: number[];        // 12-element array, pitch class distribution (C, C#, D, ..., B)
  };

  // Rhythm detection
  rhythm: {
    beat: boolean;           // Beat detected this frame?
    beatStrength: number;    // 0-1
    lastBeatTime: number;    // Timestamp of last beat
  };

  // Dynamics (loudness changes)
  dynamics: {
    loudness: number;        // 0-1 (RMS amplitude)
    crescendo: boolean;      // Volume increasing?
  };

  // Metadata
  timestamp: number;         // AudioContext.currentTime
}

/**
 * Complete mapping parameter set
 * All audio → behavior mappings with full user control
 */
export interface MusicMappingParameters {
  // Global multiplier for all audio effects
  globalMusicInfluence: number;  // 0-2

  // Tempo → Movement mappings
  tempo: {
    tempoToSpeedSensitivity: number;      // 0-2
    tempoToSpeedCurve: CurveType;
    tempoToValenceSensitivity: number;    // 0-2
    optimalBPM: number;                   // 60-180 (peak of V-curve)
    valenceRange: number;                 // 0-1 (width of V-curve)
  };

  // Harmony → Behavior mappings
  harmony: {
    consonanceToStabilitySensitivity: number;  // 0-2
    dissonanceToTensionSensitivity: number;    // 0-2
    tensionToRandomnessSensitivity: number;    // 0-2
    tensionToRandomnessCurve: CurveType;
    repulsionThreshold: number;                // 0-1 (when trails repel)
    repulsionStrength: number;                 // -1 to 0 (negative = repulsion)
  };

  // Spectral frequency bands → Parameters
  spectral: {
    // Bass (20-250 Hz)
    bassToSpeedSensitivity: number;           // 0-2
    bassToDepositSensitivity: number;         // 0-2

    // Mid (250-2000 Hz)
    midToSensorAngleSensitivity: number;      // 0-2
    midToSensorDistanceSensitivity: number;   // 0-2
    midToSensitivitySensitivity: number;      // 0-2

    // High (2000-20000 Hz)
    highToTurnSpeedSensitivity: number;       // 0-2
    highToChaosnessSensitivity: number;       // 0-2
  };

  // Rhythm → Impulses
  rhythm: {
    beatEnabled: boolean;
    beatImpulseStrength: number;      // 0-3 (speed boost on beat)
    beatDepositBurst: boolean;
    beatBurstIntensity: number;       // 0-2 (trail burst on beat)
    beatCooldown: number;             // 0-1000 ms (min time between beats)
  };

  // Dynamics → Overall intensity
  dynamics: {
    loudnessToIntensitySensitivity: number;  // 0-2
    crescendoDetection: boolean;
    crescendoBoostFactor: number;            // 1-3 (temporary boost)
  };

  // Compound effects (product of multiple dimensions)
  compound: {
    valenceStabilityToAttractionSensitivity: number;     // 0-2
    arousalValenceToDepositSensitivity: number;          // 0-2
    tensionInstabilityToExplorationSensitivity: number;  // 0-2
  };
}

/**
 * Calculated behavior modulation applied to agents
 * Output of mapping function: MusicAnalysis × MappingParameters → BehaviorModulation
 */
export interface BehaviorModulation {
  moveSpeedMultiplier: number;          // 0.1 - 3.0
  turnSpeedMultiplier: number;          // 0.1 - 3.0
  turnRandomnessMultiplier: number;     // 0.1 - 3.0
  sensorAngleMultiplier: number;        // 0.5 - 2.0
  sensorDistanceMultiplier: number;     // 0.5 - 2.0
  sensorSensitivityMultiplier: number;  // 0.5 - 2.0
  depositRateMultiplier: number;        // 0.1 - 3.0
  trailAttraction: number;              // -1.0 to 1.0 (can be negative = repulsion!)
  explorationBiasMultiplier: number;    // 0.5 - 2.0
}

/**
 * Audio input modes
 */
export type AudioInputMode = 'none' | 'file' | 'microphone';

/**
 * Video export options
 */
export interface VideoExportOptions {
  resolution: {
    width: number;
    height: number;
  };
  fps: 30 | 60;
  duration?: number;         // Optional: trim to N seconds
  videoBitrate: number;      // bps (default: 8000000 = 8 Mbps)
}

/**
 * Preset aspect ratios for video export
 */
export type VideoAspectRatio =
  | 'square'        // 1080x1080 (Instagram Feed)
  | 'landscape'     // 1920x1080 (YouTube)
  | 'portrait'      // 1080x1920 (Instagram Stories/TikTok)
  | 'custom';

/**
 * Video export quality presets
 */
export type VideoQualityPreset = 'low' | 'medium' | 'high';
