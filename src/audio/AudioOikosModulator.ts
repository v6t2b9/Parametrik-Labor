/**
 * Audio Oikos - Enhanced Modulation System
 *
 * Implements adaptive normalization, interference patterns, and beat pulsation
 * for maximum visual responsiveness to music in Parametrik-Labor
 */

import { CircularBuffer } from '../utils/CircularBuffer';

// ============================================================================
// I. ADAPTIVE NORMALIZER
// ============================================================================

export class AdaptiveNormalizer {
  private history: CircularBuffer<number>;

  constructor(windowSizeSeconds: number = 1.0, fps: number = 60) {
    const windowSize = Math.floor(windowSizeSeconds * fps);
    this.history = new CircularBuffer<number>(windowSize);
  }

  /**
   * Normalize value relative to recent history (0-1 range)
   * Uses local min/max from sliding window for maximum contrast
   */
  normalize(value: number): number {
    this.history.push(value);

    if (this.history.getSize() < 2) return 0.5;

    const historyArray = this.history.toArray();
    const localMin = Math.min(...historyArray);
    const localMax = Math.max(...historyArray);
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
    this.history.clear();
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  private microHistory: CircularBuffer<number>;
  private mesoHistory: CircularBuffer<number>;
  private macroHistory: CircularBuffer<number>;

  constructor(fps: number = 60) {
    const microWindow = Math.floor(0.1 * fps);  // 100ms
    const mesoWindow = Math.floor(0.5 * fps);   // 500ms
    const macroWindow = Math.floor(4.0 * fps);  // 4 seconds

    this.microHistory = new CircularBuffer<number>(microWindow);
    this.mesoHistory = new CircularBuffer<number>(mesoWindow);
    this.macroHistory = new CircularBuffer<number>(macroWindow);
  }

  /**
   * Update with new feature values and return normalized multi-scale output
   */
  update(
    microFeature: number,  // e.g., zeroCrossingRate
    mesoFeature: number,   // e.g., beatStrength
    macroFeature: number   // e.g., spectralCentroid
  ): MultiScaleOutput {
    // Update histories (O(1) operations)
    this.microHistory.push(microFeature);
    this.mesoHistory.push(mesoFeature);
    this.macroHistory.push(macroFeature);

    return {
      micro: this.normalizeHistory(this.microHistory),
      meso: this.normalizeHistory(this.mesoHistory),
      macro: this.normalizeHistory(this.macroHistory),
    };
  }

  private normalizeHistory(history: CircularBuffer<number>): number {
    if (history.isEmpty()) return 0.5;

    const historyArray = history.toArray();
    const min = Math.min(...historyArray);
    const max = Math.max(...historyArray);
    const current = history.getNewest() ?? 0.5;
    const range = max - min;

    return range < 0.001 ? 0.5 : (current - min) / range;
  }

  /**
   * Reset all histories
   */
  reset(): void {
    this.microHistory.clear();
    this.mesoHistory.clear();
    this.macroHistory.clear();
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
    const modulated = this.interferenceModulator.modulateSubstrate(
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

// ============================================================================
// VII. RHYTHMIC OSCILLATOR SYSTEM
// ============================================================================

/**
 * PHASE-LOCKED MODULATION
 *
 * Kontinuierliche Oszillation statt nur Beat-Impulse!
 * Parameter PUMPEN synchron zur Musik - kein "Totzeit" zwischen Beats.
 */

export type WaveformType = 'sine' | 'sawtooth' | 'square' | 'triangle' | 'pulse';

export interface OscillatorConfig {
  frequency: number;        // Hz (from BPM: frequency = BPM / 60)
  waveform: WaveformType;
  amplitude: number;        // 0-1
  offset: number;           // DC offset (0-1)
  phase: number;            // Initial phase (0-2π)
}

export class PhaseLockedOscillator {
  private phase: number = 0;
  private frequency: number;
  private waveform: WaveformType;
  private amplitude: number;
  private offset: number;

  // Phase correction for beat synchronization
  private targetPhase: number = 0;
  private phaseCorrection: number = 0;
  private phaseLockStrength: number = 0.1; // How fast to correct phase

  constructor(config: OscillatorConfig) {
    this.frequency = config.frequency;
    this.waveform = config.waveform;
    this.amplitude = config.amplitude;
    this.offset = config.offset;
    this.phase = config.phase;
  }

  /**
   * Update oscillator and return current value (0-1 range)
   */
  update(deltaTime: number): number {
    // Apply phase correction (smooth convergence to beat phase)
    this.phase += this.phaseCorrection * this.phaseLockStrength;
    this.phaseCorrection *= (1 - this.phaseLockStrength);

    // Advance phase based on frequency
    const phaseIncrement = 2 * Math.PI * this.frequency * deltaTime;
    this.phase += phaseIncrement;

    // Wrap phase to [0, 2π]
    while (this.phase > 2 * Math.PI) {
      this.phase -= 2 * Math.PI;
    }

    // Generate waveform
    const waveValue = this.generateWaveform(this.phase);

    // Apply amplitude and offset
    return this.offset + waveValue * this.amplitude;
  }

  /**
   * Synchronize to detected beat by correcting phase
   */
  onBeatDetected(): void {
    // Target phase is 0 (or 2π) at beat
    this.targetPhase = 0;

    // Calculate shortest phase correction
    let correction = this.targetPhase - this.phase;

    // Ensure shortest path (handle wrap-around)
    if (correction > Math.PI) {
      correction -= 2 * Math.PI;
    } else if (correction < -Math.PI) {
      correction += 2 * Math.PI;
    }

    // Apply correction gradually over next few frames
    this.phaseCorrection = correction;
  }

  /**
   * Update frequency (from BPM)
   */
  setFrequency(bpm: number): void {
    this.frequency = bpm / 60; // Convert BPM to Hz
  }

  /**
   * Generate waveform value at given phase
   */
  private generateWaveform(phase: number): number {
    const normalizedPhase = phase / (2 * Math.PI); // 0-1 range

    switch (this.waveform) {
      case 'sine':
        // Smooth oscillation: 0 → 1 → 0 → -1 → 0
        return (Math.sin(phase) + 1) / 2; // Normalized to 0-1

      case 'sawtooth':
        // Linear rise, sharp drop: 0 → 1 → 0 (buildup effect)
        return normalizedPhase;

      case 'square':
        // Hard on/off: 0 → 0 → 1 → 1 → 0
        return normalizedPhase < 0.5 ? 0 : 1;

      case 'triangle':
        // Linear rise and fall: 0 → 1 → 0 (symmetric breathing)
        return normalizedPhase < 0.5
          ? normalizedPhase * 2
          : 2 - normalizedPhase * 2;

      case 'pulse':
        // Short pulse at beat: 1 → 0 → 0 → 0 → 1
        return normalizedPhase < 0.1 ? 1 : 0;

      default:
        return 0.5;
    }
  }

  /**
   * Get current phase (for visualization/debugging)
   */
  getPhase(): number {
    return this.phase;
  }
}

// ============================================================================
// VIII. MULTI-OSCILLATOR BANK
// ============================================================================

export interface OscillatorBankConfig {
  baseBPM: number;
  oscillators: {
    [key: string]: {
      frequencyMultiplier: number; // Relative to baseBPM (1x, 2x, 4x, etc.)
      waveform: WaveformType;
      amplitude: number;
      offset: number;
    };
  };
}

export class OscillatorBank {
  private oscillators: Map<string, PhaseLockedOscillator> = new Map();
  private baseBPM: number;
  private oscillatorConfigs: Map<string, { frequencyMultiplier: number }> = new Map();

  constructor(config: OscillatorBankConfig) {
    this.baseBPM = config.baseBPM;

    // Create oscillators
    for (const [name, oscConfig] of Object.entries(config.oscillators)) {
      const frequency = (config.baseBPM / 60) * oscConfig.frequencyMultiplier;

      this.oscillators.set(
        name,
        new PhaseLockedOscillator({
          frequency,
          waveform: oscConfig.waveform,
          amplitude: oscConfig.amplitude,
          offset: oscConfig.offset,
          phase: 0,
        })
      );

      // Store config for later tempo updates
      this.oscillatorConfigs.set(name, {
        frequencyMultiplier: oscConfig.frequencyMultiplier,
      });
    }
  }

  /**
   * Update all oscillators
   */
  update(deltaTime: number): Map<string, number> {
    const values = new Map<string, number>();

    for (const [name, oscillator] of this.oscillators.entries()) {
      values.set(name, oscillator.update(deltaTime));
    }

    return values;
  }

  /**
   * Sync all oscillators to beat
   */
  onBeatDetected(): void {
    for (const oscillator of this.oscillators.values()) {
      oscillator.onBeatDetected();
    }
  }

  /**
   * Update base tempo
   */
  setTempo(bpm: number): void {
    this.baseBPM = bpm;

    // Update all oscillator frequencies
    for (const [name, oscillator] of this.oscillators.entries()) {
      const config = this.oscillatorConfigs.get(name);
      if (config) {
        oscillator.setFrequency(bpm * config.frequencyMultiplier);
      }
    }
  }

  /**
   * Get current base BPM
   */
  getBaseBPM(): number {
    return this.baseBPM;
  }
}

// ============================================================================
// IX. RHYTHMIC PARAMETER MODULATOR
// ============================================================================

export interface RhythmicModulationConfig {
  // Which parameters to modulate
  targets: {
    [paramName: string]: {
      oscillatorName: string;  // Which oscillator to use
      baseValue: number;       // Base parameter value
      modulationDepth: number; // How much to modulate (0-1)
    };
  };
}

export class RhythmicParameterModulator {
  private oscillatorBank: OscillatorBank;
  private config: RhythmicModulationConfig;

  // Tempo tracking
  private currentBPM: number = 120;
  private bpmHistory: CircularBuffer<number>;

  constructor(
    oscillatorBankConfig: OscillatorBankConfig,
    modulationConfig: RhythmicModulationConfig
  ) {
    this.oscillatorBank = new OscillatorBank(oscillatorBankConfig);
    this.config = modulationConfig;
    this.bpmHistory = new CircularBuffer<number>(8); // Keep last 8 BPM values
  }

  /**
   * Update and get modulated parameter values
   */
  modulate(deltaTime: number): { [paramName: string]: number } {
    // Update all oscillators
    const oscillatorValues = this.oscillatorBank.update(deltaTime);

    // Apply to parameters
    const modulatedParams: { [key: string]: number } = {};

    for (const [paramName, targetConfig] of Object.entries(this.config.targets)) {
      const oscillatorValue = oscillatorValues.get(targetConfig.oscillatorName);

      if (oscillatorValue !== undefined) {
        // Modulate around base value
        // oscillatorValue is 0-1, we want to scale by modulationDepth
        const modulation = (oscillatorValue - 0.5) * 2 * targetConfig.modulationDepth;
        modulatedParams[paramName] = targetConfig.baseValue * (1 + modulation);
      }
    }

    return modulatedParams;
  }

  /**
   * Called when beat is detected - syncs oscillators
   */
  onBeatDetected(detectedBPM?: number): void {
    // Sync oscillator phases
    this.oscillatorBank.onBeatDetected();

    // Update tempo if provided
    if (detectedBPM !== undefined) {
      this.updateTempo(detectedBPM);
    }
  }

  /**
   * Smooth tempo updates (running average)
   */
  private updateTempo(newBPM: number): void {
    this.bpmHistory.push(newBPM);

    // Calculate average BPM
    const historyArray = this.bpmHistory.toArray();
    const avgBPM = historyArray.reduce((sum, bpm) => sum + bpm, 0) / historyArray.length;

    // Only update if significantly different (avoid jitter)
    if (Math.abs(avgBPM - this.currentBPM) > 2) {
      this.currentBPM = avgBPM;
      this.oscillatorBank.setTempo(avgBPM);
    }
  }
}

// ============================================================================
// X. RHYTHMIC PRESETS
// ============================================================================

export const RHYTHMIC_PRESETS = {
  /**
   * DEEP BREATHING - Slow sine wave pumping
   */
  deepBreathing: {
    name: 'Deep Breathing',
    description: 'Slow sine wave pumping - meditative flow',
    oscillatorBank: {
      baseBPM: 120,
      oscillators: {
        main: {
          frequencyMultiplier: 1,      // 1x BPM
          waveform: 'sine' as WaveformType,
          amplitude: 0.5,
          offset: 0.5,
        },
        harmonic: {
          frequencyMultiplier: 2,      // 2x BPM
          waveform: 'sine' as WaveformType,
          amplitude: 0.3,
          offset: 0.5,
        },
      },
    },
    modulation: {
      targets: {
        depositRate: {
          oscillatorName: 'main',
          baseValue: 1.0,
          modulationDepth: 0.8,        // Strong modulation
        },
        pheromoneDiffusionRate: {
          oscillatorName: 'harmonic',
          baseValue: 0.1,
          modulationDepth: 0.5,
        },
      },
    },
  },

  /**
   * EDM PUMP - Sawtooth buildup and drop
   */
  edmPump: {
    name: 'EDM Pump',
    description: 'Sawtooth buildup and drop - festival energy',
    oscillatorBank: {
      baseBPM: 128,
      oscillators: {
        buildup: {
          frequencyMultiplier: 0.25,   // Every 4 beats
          waveform: 'sawtooth' as WaveformType,
          amplitude: 0.7,
          offset: 0.3,
        },
        pulse: {
          frequencyMultiplier: 1,      // Every beat
          waveform: 'pulse' as WaveformType,
          amplitude: 1.0,
          offset: 0,
        },
      },
    },
    modulation: {
      targets: {
        crossSpeciesCoupling: {
          oscillatorName: 'buildup',
          baseValue: 1.0,
          modulationDepth: 1.5,        // Extreme modulation
        },
        depositRate: {
          oscillatorName: 'pulse',
          baseValue: 1.0,
          modulationDepth: 3.0,        // Massive pulses
        },
      },
    },
  },

  /**
   * POLYRHYTHMIC - Multiple independent oscillators
   */
  polyrhythmic: {
    name: 'Polyrhythmic',
    description: 'Multiple independent rhythms - complex patterns',
    oscillatorBank: {
      baseBPM: 120,
      oscillators: {
        slow: {
          frequencyMultiplier: 0.5,    // Half tempo
          waveform: 'triangle' as WaveformType,
          amplitude: 0.4,
          offset: 0.5,
        },
        medium: {
          frequencyMultiplier: 1,      // Base tempo
          waveform: 'sine' as WaveformType,
          amplitude: 0.5,
          offset: 0.5,
        },
        fast: {
          frequencyMultiplier: 2,      // Double tempo
          waveform: 'square' as WaveformType,
          amplitude: 0.3,
          offset: 0.5,
        },
      },
    },
    modulation: {
      targets: {
        pheromoneDiffusionRate: {
          oscillatorName: 'slow',
          baseValue: 0.1,
          modulationDepth: 1.0,
        },
        depositRate: {
          oscillatorName: 'medium',
          baseValue: 1.0,
          modulationDepth: 0.8,
        },
        turnSpeed: {
          oscillatorName: 'fast',
          baseValue: 1.0,
          modulationDepth: 0.5,
        },
      },
    },
  },

  /**
   * HEARTBEAT - Strong on-beat pulse
   */
  heartbeat: {
    name: 'Heartbeat',
    description: 'Strong on-beat pulse - living organism',
    oscillatorBank: {
      baseBPM: 120,
      oscillators: {
        systole: {
          frequencyMultiplier: 1,
          waveform: 'pulse' as WaveformType,
          amplitude: 1.0,
          offset: 0,
        },
        diastole: {
          frequencyMultiplier: 1,
          waveform: 'triangle' as WaveformType,
          amplitude: 0.4,
          offset: 0.5,
        },
      },
    },
    modulation: {
      targets: {
        depositRate: {
          oscillatorName: 'systole',
          baseValue: 1.0,
          modulationDepth: 5.0,        // Massive pulse
        },
        crossSpeciesCoupling: {
          oscillatorName: 'diastole',
          baseValue: 1.0,
          modulationDepth: 0.6,
        },
      },
    },
  },
};

// ============================================================================
// XI. AFFECTIVE PHASE TRANSITION SYSTEM
// ============================================================================

/**
 * AFFECTIVE DIMENSIONS (Circumplex Model of Affect)
 * Extended with Tension dimension from musicology
 */
export interface AffectiveState {
  arousal: number;   // 0-1: Low (calm) to High (excited)
  valence: number;   // -1 to +1: Negative (unpleasant) to Positive (pleasant)
  tension: number;   // 0-1: Low (relaxed) to High (tense)
}

/**
 * Discrete affective regimes - collective emotional states
 */
export const MoodState = {
  ETHEREAL: 'ethereal',      // Low arousal, positive valence, low tension
  HARMONIC: 'harmonic',      // Medium arousal, positive valence, low tension
  HECTIC: 'hectic',          // High arousal, neutral valence, high tension
  DISSONANT: 'dissonant',    // High arousal, negative valence, high tension
  MELANCHOLIC: 'melancholic', // Low arousal, negative valence, low tension
  INTENSE: 'intense',        // High arousal, positive valence, medium tension
} as const;

export type MoodState = typeof MoodState[keyof typeof MoodState];

/**
 * Mood State Definitions with boundaries
 */
export const MOOD_DEFINITIONS = {
  [MoodState.ETHEREAL]: {
    name: 'Ätherisch-Leicht',
    arousal: { min: 0.0, max: 0.4 },
    valence: { min: 0.2, max: 1.0 },
    tension: { min: 0.0, max: 0.3 },
    color: '#a8d8ea',  // Light blue
    description: 'Schwebend, traumhaft, ambient',
  },

  [MoodState.HARMONIC]: {
    name: 'Harmonisch-Flow',
    arousal: { min: 0.3, max: 0.7 },
    valence: { min: 0.3, max: 1.0 },
    tension: { min: 0.0, max: 0.4 },
    color: '#90ee90',  // Light green
    description: 'Fließend, balanciert, im Groove',
  },

  [MoodState.HECTIC]: {
    name: 'Hektisch-Chaotisch',
    arousal: { min: 0.6, max: 1.0 },
    valence: { min: -0.3, max: 0.3 },
    tension: { min: 0.6, max: 1.0 },
    color: '#ff6b6b',  // Red
    description: 'Gehetzt, überladen, nervös',
  },

  [MoodState.DISSONANT]: {
    name: 'Dissonant-Düster',
    arousal: { min: 0.5, max: 1.0 },
    valence: { min: -1.0, max: 0.0 },
    tension: { min: 0.5, max: 1.0 },
    color: '#8b0000',  // Dark red
    description: 'Beunruhigend, disharmonisch, aggressiv',
  },

  [MoodState.MELANCHOLIC]: {
    name: 'Melancholisch-Ruhig',
    arousal: { min: 0.0, max: 0.4 },
    valence: { min: -1.0, max: 0.0 },
    tension: { min: 0.0, max: 0.4 },
    color: '#4a5568',  // Dark gray
    description: 'Traurig, introspektiv, gedämpft',
  },

  [MoodState.INTENSE]: {
    name: 'Intensiv-Ekstatisch',
    arousal: { min: 0.7, max: 1.0 },
    valence: { min: 0.4, max: 1.0 },
    tension: { min: 0.3, max: 0.7 },
    color: '#ff1493',  // Deep pink
    description: 'Euphorisch, kraftvoll, peak experience',
  },
};

/**
 * Calculate affective state from audio features
 */
export function calculateAffectiveState(features: AudioFeatures): AffectiveState {
  // AROUSAL - Physiological activation
  const arousal = (
    features.rmsEnergy * 0.5 +
    Math.min(features.tempo / 200, 1.0) * 0.3 +
    features.zeroCrossingRate / 5000 * 0.2
  );

  // VALENCE - Pleasantness
  const harmonicity = 1 - features.spectralFlatness;
  const brightness = features.spectralCentroid / 22050;
  const valence = (
    harmonicity * 0.5 +
    (brightness * 0.5 - 0.25)
  ) * 2 - 1;

  // TENSION - Musical expectation violation
  const dissonance = features.spectralFlatness;
  const dynamicContrast = Math.abs(features.rmsEnergy - 0.5) * 2;
  const tension = (
    dissonance * 0.5 +
    dynamicContrast * 0.3 +
    (1 - harmonicity) * 0.2
  );

  return {
    arousal: Math.max(0, Math.min(1, arousal)),
    valence: Math.max(-1, Math.min(1, valence)),
    tension: Math.max(0, Math.min(1, tension)),
  };
}

/**
 * Classify mood state from affective dimensions
 */
export function classifyMood(affect: AffectiveState): MoodState {
  for (const [mood, def] of Object.entries(MOOD_DEFINITIONS)) {
    const arousalMatch = affect.arousal >= def.arousal.min && affect.arousal <= def.arousal.max;
    const valenceMatch = affect.valence >= def.valence.min && affect.valence <= def.valence.max;
    const tensionMatch = affect.tension >= def.tension.min && affect.tension <= def.tension.max;

    if (arousalMatch && valenceMatch && tensionMatch) {
      return mood as MoodState;
    }
  }

  return MoodState.HARMONIC;
}

// ============================================================================
// XII. PHASE TRANSITION SYSTEM
// ============================================================================

export interface PhaseTransitionConfig {
  hysteresis: number;        // 0-1: How much overlap before switching
  transitionTime: number;    // Seconds: Smooth transition duration
  minDwellTime: number;      // Seconds: Minimum time in state before switching
}

export class AffectivePhaseSystem {
  private currentMood: MoodState = MoodState.HARMONIC;
  private previousMood: MoodState = MoodState.HARMONIC;
  private timeInCurrentMood: number = 0;
  private transitionProgress: number = 1.0; // 0-1: 1 = fully in current mood

  private config: PhaseTransitionConfig;

  // History for hysteresis
  private affectHistory: AffectiveState[] = [];
  private historySize: number = 30; // ~0.5 seconds at 60fps

  constructor(config: PhaseTransitionConfig = {
    hysteresis: 0.2,
    transitionTime: 1.0,
    minDwellTime: 2.0,
  }) {
    this.config = config;
  }

  /**
   * Update mood based on current affective state
   */
  update(
    affect: AffectiveState,
    deltaTime: number
  ): {
    currentMood: MoodState;
    previousMood: MoodState;
    transitionProgress: number;
    isTransitioning: boolean;
  } {
    // Add to history
    this.affectHistory.push(affect);
    if (this.affectHistory.length > this.historySize) {
      this.affectHistory.shift();
    }

    // Classify target mood
    const targetMood = this.classifyMoodWithHysteresis(affect);

    // Update time in current mood
    this.timeInCurrentMood += deltaTime;

    // Check if we should transition
    const shouldTransition =
      targetMood !== this.currentMood &&
      this.timeInCurrentMood >= this.config.minDwellTime;

    if (shouldTransition) {
      // Start transition
      this.previousMood = this.currentMood;
      this.currentMood = targetMood;
      this.transitionProgress = 0;
      this.timeInCurrentMood = 0;
    }

    // Update transition progress
    if (this.transitionProgress < 1.0) {
      this.transitionProgress += deltaTime / this.config.transitionTime;
      this.transitionProgress = Math.min(1.0, this.transitionProgress);
    }

    return {
      currentMood: this.currentMood,
      previousMood: this.previousMood,
      transitionProgress: this.transitionProgress,
      isTransitioning: this.transitionProgress < 1.0,
    };
  }

  /**
   * Classify mood with hysteresis to prevent rapid switching
   */
  private classifyMoodWithHysteresis(affect: AffectiveState): MoodState {
    if (this.affectHistory.length < this.historySize / 2) {
      return classifyMood(affect);
    }

    // Average recent affect
    const avgAffect: AffectiveState = {
      arousal: this.affectHistory.reduce((sum, a) => sum + a.arousal, 0) / this.affectHistory.length,
      valence: this.affectHistory.reduce((sum, a) => sum + a.valence, 0) / this.affectHistory.length,
      tension: this.affectHistory.reduce((sum, a) => sum + a.tension, 0) / this.affectHistory.length,
    };

    const newMood = classifyMood(avgAffect);

    // If different from current, check if we've crossed hysteresis threshold
    if (newMood !== this.currentMood) {
      // How many recent frames agree with new mood?
      const recentFrames = this.affectHistory.slice(-10);
      const agreementRatio = recentFrames.filter(a => classifyMood(a) === newMood).length / recentFrames.length;

      // Require significant agreement to switch
      if (agreementRatio >= (1 - this.config.hysteresis)) {
        return newMood;
      }
    }

    return this.currentMood;
  }

  getCurrentMood(): MoodState {
    return this.currentMood;
  }

  getTransitionProgress(): number {
    return this.transitionProgress;
  }
}

// ============================================================================
// XIII. FREQUENCY NICHE SYSTEM
// ============================================================================

export const FrequencyBand = {
  LOW: 'low',      // 20-200 Hz (Bass, Kick, Sub-bass)
  MID: 'mid',      // 200-2000 Hz (Vocals, Melody, Snare)
  HIGH: 'high',    // 2000-20000 Hz (Hi-hats, Cymbals, Brightness)
} as const;

export type FrequencyBand = typeof FrequencyBand[keyof typeof FrequencyBand];

export interface FrequencyNiche {
  band: FrequencyBand;
  minFreq: number;  // Hz
  maxFreq: number;  // Hz
  energy: number;   // 0-1: Current energy in this band
}

export const FREQUENCY_NICHES: Record<FrequencyBand, Omit<FrequencyNiche, 'energy'>> = {
  [FrequencyBand.LOW]: {
    band: FrequencyBand.LOW,
    minFreq: 20,
    maxFreq: 200,
  },
  [FrequencyBand.MID]: {
    band: FrequencyBand.MID,
    minFreq: 200,
    maxFreq: 2000,
  },
  [FrequencyBand.HIGH]: {
    band: FrequencyBand.HIGH,
    minFreq: 2000,
    maxFreq: 20000,
  },
};

/**
 * Extract energy in each frequency band from FFT data
 * NOTE: Requires raw FFT data access (Float32Array) and sample rate
 */
export function extractBandEnergies(fftData: Float32Array, sampleRate: number): Record<FrequencyBand, number> {
  const binCount = fftData.length;
  const binFreqRange = sampleRate / 2 / binCount;

  const energies: Record<FrequencyBand, number> = {
    [FrequencyBand.LOW]: 0,
    [FrequencyBand.MID]: 0,
    [FrequencyBand.HIGH]: 0,
  };

  // Calculate energy in each band
  for (const [band, niche] of Object.entries(FREQUENCY_NICHES)) {
    const startBin = Math.floor(niche.minFreq / binFreqRange);
    const endBin = Math.floor(niche.maxFreq / binFreqRange);

    let bandEnergy = 0;
    let binCountInBand = 0;

    for (let i = startBin; i < endBin && i < fftData.length; i++) {
      bandEnergy += fftData[i] * fftData[i]; // Power = amplitude²
      binCountInBand++;
    }

    // RMS energy in band
    energies[band as FrequencyBand] = binCountInBand > 0 ? Math.sqrt(bandEnergy / binCountInBand) : 0;
  }

  // Normalize to 0-1
  const maxEnergy = Math.max(...Object.values(energies));
  if (maxEnergy > 0) {
    for (const band of Object.keys(energies)) {
      energies[band as FrequencyBand] /= maxEnergy;
    }
  }

  return energies;
}

// ============================================================================
// XIV. SPECIES-SPECIFIC NICHE OCCUPANCY
// ============================================================================

export interface SpeciesNicheConfig {
  speciesId: string;
  primaryBand: FrequencyBand;     // Main frequency band this species responds to
  sensitivity: number;             // 0-1: How strongly it responds to its band
  crossBandInfluence: number;     // 0-1: How much other bands affect it
}

export class SpeciesNicheSystem {
  private speciesConfigs: Map<string, SpeciesNicheConfig> = new Map();

  /**
   * Register species with frequency niche
   */
  registerSpecies(config: SpeciesNicheConfig): void {
    this.speciesConfigs.set(config.speciesId, config);
  }

  /**
   * Get modulation factor for species based on band energies
   */
  getSpeciesModulation(
    speciesId: string,
    bandEnergies: Record<FrequencyBand, number>
  ): number {
    const config = this.speciesConfigs.get(speciesId);
    if (!config) return 1.0;

    // Primary band energy
    const primaryEnergy = bandEnergies[config.primaryBand];

    // Other bands energy (averaged)
    const otherBands = Object.entries(bandEnergies)
      .filter(([band]) => band !== config.primaryBand)
      .map(([, energy]) => energy); // Ignore band name, only take energy
    const otherEnergy = otherBands.reduce((sum, e) => sum + e, 0) / otherBands.length;

    // Weighted combination
    const modulation =
      primaryEnergy * config.sensitivity +
      otherEnergy * (1 - config.sensitivity) * config.crossBandInfluence;

    return modulation;
  }
}

// ============================================================================
// XV. MOOD-BASED PARAMETER MODULATION
// ============================================================================

export interface MoodParameterProfile {
  crossSpeciesCoupling: number;      // Attraction between different species
  intraSpeciesInteraction: number;   // Attraction/Repulsion within species
  pheromoneDiffusionRate: number;
  pheromoneDecayRate: number;
  agentSpeed: number;
  turnSpeed: number;
  depositRate: number;
  sensorNoise: number;
}

/**
 * Mood-specific parameter profiles
 * Each mood has characteristic behavioral patterns
 */
export const MOOD_PARAMETER_PROFILES: Record<MoodState, MoodParameterProfile> = {
  [MoodState.ETHEREAL]: {
    crossSpeciesCoupling: 0.5,       // Weak coupling (floaty)
    intraSpeciesInteraction: 0.3,    // Weak within-species (dispersed)
    pheromoneDiffusionRate: 0.8,     // High diffusion (blurred trails)
    pheromoneDecayRate: 0.98,        // Slow decay (long memory)
    agentSpeed: 0.5,                 // Slow movement
    turnSpeed: 0.7,                  // Gentle turns
    depositRate: 0.6,                // Moderate deposition
    sensorNoise: 0.1,                // Low noise (smooth)
  },

  [MoodState.HARMONIC]: {
    crossSpeciesCoupling: 1.5,       // Strong coupling (synchronized)
    intraSpeciesInteraction: 1.0,    // Neutral within-species
    pheromoneDiffusionRate: 0.3,     // Low diffusion (clear trails)
    pheromoneDecayRate: 0.95,        // Medium decay
    agentSpeed: 1.0,                 // Normal speed
    turnSpeed: 1.0,                  // Normal turns
    depositRate: 1.0,                // Normal deposition
    sensorNoise: 0.05,               // Very low noise (coordinated)
  },

  [MoodState.HECTIC]: {
    crossSpeciesCoupling: 0.8,       // Moderate coupling
    intraSpeciesInteraction: -0.5,   // REPULSION within species! (scattered)
    pheromoneDiffusionRate: 0.5,     // Medium diffusion
    pheromoneDecayRate: 0.90,        // Fast decay (short memory)
    agentSpeed: 1.8,                 // Fast movement
    turnSpeed: 2.0,                  // Rapid turns
    depositRate: 1.5,                // High deposition
    sensorNoise: 0.3,                // High noise (chaotic)
  },

  [MoodState.DISSONANT]: {
    crossSpeciesCoupling: -0.3,      // REPULSION between species!
    intraSpeciesInteraction: -0.8,   // Strong repulsion within (total scatter)
    pheromoneDiffusionRate: 1.2,     // Very high diffusion (turbulent)
    pheromoneDecayRate: 0.85,        // Very fast decay
    agentSpeed: 1.5,                 // Fast but not as hectic
    turnSpeed: 2.5,                  // Very rapid, erratic turns
    depositRate: 0.8,                // Lower deposition (chaotic trails)
    sensorNoise: 0.5,                // Very high noise (unstable)
  },

  [MoodState.MELANCHOLIC]: {
    crossSpeciesCoupling: 0.6,       // Weak coupling
    intraSpeciesInteraction: 0.5,    // Slight attraction (clustered but separate)
    pheromoneDiffusionRate: 0.4,     // Low diffusion
    pheromoneDecayRate: 0.97,        // Very slow decay (persistent)
    agentSpeed: 0.4,                 // Very slow
    turnSpeed: 0.5,                  // Slow turns
    depositRate: 0.7,                // Moderate deposition
    sensorNoise: 0.08,               // Low noise (deliberate)
  },

  [MoodState.INTENSE]: {
    crossSpeciesCoupling: 2.0,       // Very strong coupling (hyper-sync)
    intraSpeciesInteraction: 1.5,    // Strong attraction (tight packs)
    pheromoneDiffusionRate: 0.2,     // Very low diffusion (sharp trails)
    pheromoneDecayRate: 0.93,        // Medium-fast decay
    agentSpeed: 2.0,                 // Very fast
    turnSpeed: 1.5,                  // Fast but controlled
    depositRate: 2.0,                // Very high deposition (bright trails)
    sensorNoise: 0.02,               // Very low noise (precise coordination)
  },
};

/**
 * Interpolate between two mood parameter profiles
 */
export function interpolateMoodParameters(
  from: MoodParameterProfile,
  to: MoodParameterProfile,
  t: number  // 0-1: transition progress
): MoodParameterProfile {
  const lerp = (a: number, b: number) => a + (b - a) * t;

  return {
    crossSpeciesCoupling: lerp(from.crossSpeciesCoupling, to.crossSpeciesCoupling),
    intraSpeciesInteraction: lerp(from.intraSpeciesInteraction, to.intraSpeciesInteraction),
    pheromoneDiffusionRate: lerp(from.pheromoneDiffusionRate, to.pheromoneDiffusionRate),
    pheromoneDecayRate: lerp(from.pheromoneDecayRate, to.pheromoneDecayRate),
    agentSpeed: lerp(from.agentSpeed, to.agentSpeed),
    turnSpeed: lerp(from.turnSpeed, to.turnSpeed),
    depositRate: lerp(from.depositRate, to.depositRate),
    sensorNoise: lerp(from.sensorNoise, to.sensorNoise),
  };
}

// ============================================================================
// XVI. MASTER AFFECTIVE MODULATION SYSTEM
// ============================================================================

export class AffectiveMusicModulator {
  private phaseSystem: AffectivePhaseSystem;
  private nicheSystem: SpeciesNicheSystem;

  private currentAffect: AffectiveState = { arousal: 0.5, valence: 0, tension: 0.3 };
  private bandEnergies: Record<FrequencyBand, number> = {
    [FrequencyBand.LOW]: 0,
    [FrequencyBand.MID]: 0,
    [FrequencyBand.HIGH]: 0,
  };

  constructor() {
    this.phaseSystem = new AffectivePhaseSystem();
    this.nicheSystem = new SpeciesNicheSystem();
  }

  /**
   * Register species with their frequency niches
   */
  registerSpecies(configs: SpeciesNicheConfig[]): void {
    configs.forEach(config => this.nicheSystem.registerSpecies(config));
  }

  /**
   * Update and get mood-modulated parameters
   * NOTE: Requires FFT data access - if not available, uses simplified mood calculation
   */
  modulate(
    features: AudioFeatures,
    fftData: Float32Array | null,
    sampleRate: number,
    deltaTime: number
  ): {
    moodParams: MoodParameterProfile;
    currentMood: MoodState;
    affect: AffectiveState;
    bandEnergies: Record<FrequencyBand, number>;
    transitionProgress: number;
  } {
    // 1. Calculate affective state
    this.currentAffect = calculateAffectiveState(features);

    // 2. Extract band energies (if FFT data available)
    if (fftData) {
      this.bandEnergies = extractBandEnergies(fftData, sampleRate);
    }

    // 3. Update phase system (mood classification)
    const phaseState = this.phaseSystem.update(this.currentAffect, deltaTime);

    // 4. Get mood parameter profiles
    const currentProfile = MOOD_PARAMETER_PROFILES[phaseState.currentMood];
    const previousProfile = MOOD_PARAMETER_PROFILES[phaseState.previousMood];

    // 5. Interpolate if transitioning
    const moodParams = phaseState.isTransitioning
      ? interpolateMoodParameters(previousProfile, currentProfile, phaseState.transitionProgress)
      : currentProfile;

    return {
      moodParams,
      currentMood: phaseState.currentMood,
      affect: this.currentAffect,
      bandEnergies: this.bandEnergies,
      transitionProgress: phaseState.transitionProgress,
    };
  }

  /**
   * Get species-specific modulation based on frequency niche
   */
  getSpeciesModulation(speciesId: string): number {
    return this.nicheSystem.getSpeciesModulation(speciesId, this.bandEnergies);
  }

  getCurrentMood(): MoodState {
    return this.phaseSystem.getCurrentMood();
  }

  getCurrentAffect(): AffectiveState {
    return this.currentAffect;
  }
}
