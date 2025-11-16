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
  private bpmHistory: number[] = [];
  private bpmHistorySize: number = 8;

  constructor(
    oscillatorBankConfig: OscillatorBankConfig,
    modulationConfig: RhythmicModulationConfig
  ) {
    this.oscillatorBank = new OscillatorBank(oscillatorBankConfig);
    this.config = modulationConfig;
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
    if (this.bpmHistory.length > this.bpmHistorySize) {
      this.bpmHistory.shift();
    }

    // Calculate average BPM
    const avgBPM = this.bpmHistory.reduce((sum, bpm) => sum + bpm, 0) / this.bpmHistory.length;

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
