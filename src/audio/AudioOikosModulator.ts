/**
 * Audio Oikos - Enhanced Modulation System
 *
 * Implements adaptive normalization, interference patterns, and beat pulsation
 * for maximum visual responsiveness to music in Parametrik-Labor
 */

// ============================================================================
// I. ADAPTIVE NORMALIZER
// ============================================================================

export class AdaptiveNormalizer {
  private history: number[] = [];
  private windowSize: number;

  constructor(windowSizeSeconds: number = 1.0, fps: number = 60) {
    this.windowSize = Math.floor(windowSizeSeconds * fps);
  }

  /**
   * Normalize value relative to recent history (0-1 range)
   * Uses local min/max from sliding window for maximum contrast
   */
  normalize(value: number): number {
    this.history.push(value);
    if (this.history.length > this.windowSize) {
      this.history.shift();
    }

    if (this.history.length < 2) return 0.5;

    const localMin = Math.min(...this.history);
    const localMax = Math.max(...this.history);
    const range = localMax - localMin;

    // Prevent division by zero
    if (range < 0.001) return 0.5;

    return (value - localMin) / range;
  }

  /**
   * Normalize with power curve for exaggerated response
   * exponent > 1: Emphasizes extremes (0→0, 1→1, middle compressed)
   * exponent < 1: Compresses extremes (S-curve effect)
   */
  normalizeExaggerated(value: number, exponent: number = 2.0): number {
    const normalized = this.normalize(value);
    return Math.pow(normalized, exponent);
  }

  /**
   * Reset history (e.g., when switching songs)
   */
  reset(): void {
    this.history = [];
  }
}

// ============================================================================
// II. INTERFERENCE MODULATOR
// ============================================================================

export interface MusicalMode {
  energy: number;      // RMS amplitude (0-1)
  brightness: number;  // Spectral centroid normalized (0-1)
  complexity: number;  // Spectral flatness (0-1)
  rhythm: number;      // Beat strength (0-1)
}

export interface InterferencePattern {
  constructive: number;  // 0-1: Harmonic/consonant
  destructive: number;   // 0-1: Chaotic/dissonant
}

export interface SubstrateParams {
  crossSpeciesCoupling: number;
  pheromoneDecayRate: number;
  pheromoneDiffusionRate: number;
  sensorNoise: number;
  turnSpeed: number;
  depositRate: number;
}

export class InterferenceModulator {
  private consonanceWeight: number;
  private dissonanceWeight: number;

  constructor(
    consonanceWeight: number = 1.0,
    dissonanceWeight: number = 1.0
  ) {
    this.consonanceWeight = consonanceWeight;
    this.dissonanceWeight = dissonanceWeight;
  }

  /**
   * Calculate constructive/destructive interference from musical features
   *
   * CONSONANCE (constructive): High energy + low complexity + strong rhythm
   * DISSONANCE (destructive): High complexity + variable energy + weak rhythm
   */
  calculateResonance(mode: MusicalMode): InterferencePattern {
    // Constructive interference criteria
    const consonance =
      (mode.energy * (1 - mode.complexity)) * 0.5 +
      (mode.rhythm * (1 - mode.complexity)) * 0.5;

    // Destructive interference criteria
    const dissonance =
      (mode.complexity * (1 - mode.rhythm)) * 0.5 +
      (mode.brightness * mode.complexity) * 0.5;

    return {
      constructive: Math.min(1.0, consonance * this.consonanceWeight),
      destructive: Math.min(1.0, dissonance * this.dissonanceWeight),
    };
  }

  /**
   * Apply interference pattern to substrate parameters
   *
   * Constructive → Synchronization (stronger coupling, slower decay)
   * Destructive → Chaos (faster diffusion, more noise)
   */
  modulateSubstrate(
    interference: InterferencePattern,
    baseParams: SubstrateParams,
    amplification: { constructive: number; destructive: number } = {
      constructive: 3.0,
      destructive: 4.0,
    }
  ): SubstrateParams {
    return {
      // CONSTRUCTIVE: Stronger agent coupling
      crossSpeciesCoupling:
        baseParams.crossSpeciesCoupling *
        (1.0 + interference.constructive * amplification.constructive),

      // CONSTRUCTIVE: Longer substrate memory
      pheromoneDecayRate:
        baseParams.pheromoneDecayRate *
        (1.0 - interference.constructive * 0.7),

      // DESTRUCTIVE: Faster diffusion (blurred trails)
      pheromoneDiffusionRate:
        baseParams.pheromoneDiffusionRate *
        (1.0 + interference.destructive * amplification.destructive),

      // DESTRUCTIVE: More sensor noise
      sensorNoise:
        baseParams.sensorNoise *
        (1.0 + interference.destructive * 2.0),

      // DESTRUCTIVE: Faster turns (nervous movement)
      turnSpeed:
        baseParams.turnSpeed *
        (1.0 + interference.destructive * 1.5),

      // Keep deposit rate unchanged (modulated separately by beat)
      depositRate: baseParams.depositRate,
    };
  }
}

// ============================================================================
// III. BEAT PULSE MODULATOR
// ============================================================================

export class BeatPulseModulator {
  private currentImpulse: number = 0;
  private beatDecay: number;
  private amplification: number;

  constructor(beatDecay: number = 0.95, amplification: number = 5.0) {
    this.beatDecay = beatDecay;
    this.amplification = amplification;
  }

  /**
   * Trigger impulse on beat detection
   */
  onBeatDetected(strength: number, _timestamp: number): void {
    this.currentImpulse = strength;
  }

  /**
   * Update impulse (exponential decay between beats)
   * @param deltaTime Time since last frame in seconds
   */
  update(deltaTime: number): void {
    // Exponential decay: impulse *= decay^(deltaTime * 60)
    this.currentImpulse *= Math.pow(this.beatDecay, deltaTime * 60);
  }

  /**
   * Get current impulse value (0-1)
   */
  getImpulse(): number {
    return this.currentImpulse;
  }

  /**
   * Modulate parameter with beat pulse
   * Range: baseValue * (1.0 to (1.0 + amplification))
   */
  modulate(baseValue: number): number {
    return baseValue * (1.0 + this.currentImpulse * this.amplification);
  }
}

// ============================================================================
// IV. MULTI-SCALE MODULATOR
// ============================================================================

export interface MultiScaleOutput {
  micro: number;   // 0-1: Fast changes (100ms window)
  meso: number;    // 0-1: Medium changes (500ms window)
  macro: number;   // 0-1: Slow changes (4s window)
}

export class MultiScaleModulator {
  private microHistory: number[] = [];
  private mesoHistory: number[] = [];
  private macroHistory: number[] = [];

  private microWindow: number;
  private mesoWindow: number;
  private macroWindow: number;

  constructor(fps: number = 60) {
    this.microWindow = Math.floor(0.1 * fps);  // 100ms
    this.mesoWindow = Math.floor(0.5 * fps);   // 500ms
    this.macroWindow = Math.floor(4.0 * fps);  // 4 seconds
  }

  /**
   * Update with new feature values and return normalized multi-scale output
   */
  update(
    microFeature: number,  // e.g., zeroCrossingRate
    mesoFeature: number,   // e.g., beatStrength
    macroFeature: number   // e.g., spectralCentroid
  ): MultiScaleOutput {
    // Update histories
    this.updateHistory(this.microHistory, microFeature, this.microWindow);
    this.updateHistory(this.mesoHistory, mesoFeature, this.mesoWindow);
    this.updateHistory(this.macroHistory, macroFeature, this.macroWindow);

    return {
      micro: this.normalizeHistory(this.microHistory),
      meso: this.normalizeHistory(this.mesoHistory),
      macro: this.normalizeHistory(this.macroHistory),
    };
  }

  private updateHistory(
    history: number[],
    value: number,
    maxSize: number
  ): void {
    history.push(value);
    while (history.length > maxSize) {
      history.shift();
    }
  }

  private normalizeHistory(history: number[]): number {
    if (history.length === 0) return 0.5;

    const min = Math.min(...history);
    const max = Math.max(...history);
    const current = history[history.length - 1];
    const range = max - min;

    return range < 0.001 ? 0.5 : (current - min) / range;
  }

  /**
   * Reset all histories
   */
  reset(): void {
    this.microHistory = [];
    this.mesoHistory = [];
    this.macroHistory = [];
  }
}

// ============================================================================
// V. MASTER AUDIO MODULATION SYSTEM
// ============================================================================

export interface AudioFeatures {
  // Spectral
  spectralCentroid: number;      // Hz (0-22050)
  spectralRolloff: number;       // Hz (0-22050)
  spectralFlatness: number;      // 0-1
  zeroCrossingRate: number;      // 0-5000

  // Amplitude
  rmsEnergy: number;             // 0-1

  // Rhythm
  beatStrength: number;          // 0-1
  tempo: number;                 // BPM (40-200)
  beatDetected: boolean;
}

export class AudioOikosModulator {
  private centroidNormalizer: AdaptiveNormalizer;
  private energyNormalizer: AdaptiveNormalizer;
  private interferenceModulator: InterferenceModulator;
  private beatPulseModulator: BeatPulseModulator;
  private multiScaleModulator: MultiScaleModulator;

  private lastTimestamp: number = 0;

  constructor(fps: number = 60) {
    // Initialize normalizers with 1-second window
    this.centroidNormalizer = new AdaptiveNormalizer(1.0, fps);
    this.energyNormalizer = new AdaptiveNormalizer(1.0, fps);

    // Initialize modulators
    this.interferenceModulator = new InterferenceModulator();
    this.beatPulseModulator = new BeatPulseModulator(0.95, 5.0);
    this.multiScaleModulator = new MultiScaleModulator(fps);
  }

  /**
   * Process audio features and return modulated substrate parameters
   */
  modulate(
    features: AudioFeatures,
    baseParams: SubstrateParams,
    timestamp: number
  ): SubstrateParams {
    // Calculate delta time
    const deltaTime = this.lastTimestamp > 0
      ? (timestamp - this.lastTimestamp) / 1000
      : 1/60;
    this.lastTimestamp = timestamp;

    // 1. ADAPTIVE NORMALIZATION
    const normalizedCentroid = this.centroidNormalizer.normalizeExaggerated(
      features.spectralCentroid,
      2.5  // Strong exaggeration
    );
    const normalizedEnergy = this.energyNormalizer.normalizeExaggerated(
      features.rmsEnergy,
      2.0
    );

    // 2. CALCULATE MUSICAL MODE
    const musicalMode: MusicalMode = {
      energy: normalizedEnergy,
      brightness: normalizedCentroid,
      complexity: features.spectralFlatness,
      rhythm: features.beatStrength,
    };

    // 3. INTERFERENCE MODULATION
    const interference = this.interferenceModulator.calculateResonance(musicalMode);
    let modulated = this.interferenceModulator.modulateSubstrate(
      interference,
      baseParams
    );

    // 4. BEAT PULSE MODULATION
    if (features.beatDetected) {
      this.beatPulseModulator.onBeatDetected(features.beatStrength, timestamp);
    }
    this.beatPulseModulator.update(deltaTime);
    modulated.depositRate = this.beatPulseModulator.modulate(baseParams.depositRate);

    // 5. MULTI-SCALE MODULATION
    const multiScale = this.multiScaleModulator.update(
      features.zeroCrossingRate,
      features.beatStrength,
      features.spectralCentroid
    );

    // Apply multi-scale modulation
    modulated.turnSpeed *= (1.0 + multiScale.micro * 0.5);  // Micro jitter
    modulated.pheromoneDiffusionRate *= (0.5 + multiScale.macro * 2.0);  // Macro shift

    return modulated;
  }

  /**
   * Reset all internal state (e.g., when changing songs)
   */
  reset(): void {
    this.centroidNormalizer.reset();
    this.energyNormalizer.reset();
    this.multiScaleModulator.reset();
    this.lastTimestamp = 0;
  }
}

// ============================================================================
// VI. PRESET CONFIGURATIONS
// ============================================================================

export const AUDIO_OIKOS_PRESETS = {
  resonantHarmony: {
    name: "Resonant Harmony",
    description: "Maximum synchronization on harmonic music",
    config: {
      interferenceAmplification: {
        constructive: 5.0,
        destructive: 2.0,
      },
      beatAmplification: 3.0,
      beatDecay: 0.93,
      adaptiveExponent: 2.5,
    },
  },

  beatMachine: {
    name: "Beat Machine",
    description: "Explosive response to beats and rhythm",
    config: {
      interferenceAmplification: {
        constructive: 2.0,
        destructive: 2.0,
      },
      beatAmplification: 8.0,
      beatDecay: 0.90,
      adaptiveExponent: 2.0,
    },
  },

  spectralDance: {
    name: "Spectral Dance",
    description: "Responds to spectral characteristics and texture",
    config: {
      interferenceAmplification: {
        constructive: 3.0,
        destructive: 4.0,
      },
      beatAmplification: 4.0,
      beatDecay: 0.95,
      adaptiveExponent: 3.0,
    },
  },
};
