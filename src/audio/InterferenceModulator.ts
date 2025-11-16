/**
 * InterferenceModulator - Multi-dimensional musical interference patterns
 *
 * Combines multiple audio features to calculate "constructive" vs "destructive"
 * musical interference. Maps musical modes (harmonic/chaotic) to visual patterns.
 *
 * Constructive Interference (Consonance):
 * - High energy + low complexity = Clear, powerful music
 * - Strong rhythm + low complexity = Tight, groovy patterns
 * → Result: Synchronized, wave-like agent movements
 *
 * Destructive Interference (Dissonance):
 * - High complexity + variable energy = Noise, chaos
 * - Low rhythm + high brightness = Unpredictable, scattered
 * → Result: Turbulent, chaotic agent patterns
 */

import type { MusicAnalysis } from '../types/musicMappings';

export interface MusicalMode {
  energy: number;      // RMS amplitude (0-1)
  brightness: number;  // Spectral centroid (0-1, normalized)
  complexity: number;  // Spectral flatness (0-1, 0=tonal, 1=noisy)
  rhythm: number;      // Beat strength (0-1)
}

export interface InterferencePattern {
  constructive: number;  // 0-1: How consonant/harmonic
  destructive: number;   // 0-1: How dissonant/chaotic
  mode: 'harmonic' | 'neutral' | 'chaotic';  // Classification
}

export interface InterferenceConfig {
  consonanceWeight?: number;     // Weight for constructive interference (default: 1.0)
  dissonanceWeight?: number;     // Weight for destructive interference (default: 1.0)
  thresholdHarmonic?: number;    // Threshold for "harmonic" mode (default: 0.6)
  thresholdChaotic?: number;     // Threshold for "chaotic" mode (default: 0.6)
}

export class InterferenceModulator {
  private consonanceWeight: number;
  private dissonanceWeight: number;
  private thresholdHarmonic: number;
  private thresholdChaotic: number;

  constructor(config: InterferenceConfig = {}) {
    this.consonanceWeight = config.consonanceWeight ?? 1.0;
    this.dissonanceWeight = config.dissonanceWeight ?? 1.0;
    this.thresholdHarmonic = config.thresholdHarmonic ?? 0.6;
    this.thresholdChaotic = config.thresholdChaotic ?? 0.6;
  }

  /**
   * Extract musical mode from audio analysis
   */
  extractMusicalMode(analysis: MusicAnalysis): MusicalMode {
    return {
      energy: analysis.dynamics.loudness,
      brightness: analysis.spectral.centroid,
      complexity: analysis.spectral.flatness,
      rhythm: analysis.rhythm.beatStrength,
    };
  }

  /**
   * Calculate interference pattern from musical mode
   */
  calculateInterference(mode: MusicalMode): InterferencePattern {
    // CONSONANCE CRITERIA (Constructive Interference):
    // 1. High energy + low complexity = Clear, powerful music
    const energyCriterion = mode.energy * (1 - mode.complexity);

    // 2. Strong rhythm + low complexity = Tight, groovy patterns
    const rhythmCriterion = mode.rhythm * (1 - mode.complexity);

    // Combined consonance (weighted average)
    const consonance = (energyCriterion * 0.5 + rhythmCriterion * 0.5) * this.consonanceWeight;

    // DISSONANCE CRITERIA (Destructive Interference):
    // 1. High complexity + variable rhythm = Noise, chaos
    const noiseCriterion = mode.complexity * (1 - mode.rhythm);

    // 2. High brightness + high complexity = Unpredictable, scattered
    const scatterCriterion = mode.brightness * mode.complexity;

    // Combined dissonance (weighted average)
    const dissonance = (noiseCriterion * 0.5 + scatterCriterion * 0.5) * this.dissonanceWeight;

    // Classify mode
    let modeClass: 'harmonic' | 'neutral' | 'chaotic';
    if (consonance > this.thresholdHarmonic && consonance > dissonance) {
      modeClass = 'harmonic';
    } else if (dissonance > this.thresholdChaotic && dissonance > consonance) {
      modeClass = 'chaotic';
    } else {
      modeClass = 'neutral';
    }

    return {
      constructive: Math.max(0, Math.min(1, consonance)),
      destructive: Math.max(0, Math.min(1, dissonance)),
      mode: modeClass,
    };
  }

  /**
   * Calculate interference from audio analysis (convenience method)
   */
  calculateFromAnalysis(analysis: MusicAnalysis): InterferencePattern {
    const mode = this.extractMusicalMode(analysis);
    return this.calculateInterference(mode);
  }

  /**
   * Modulate a parameter based on interference
   *
   * @param baseValue - Base parameter value
   * @param pattern - Interference pattern
   * @param type - Which interference to use
   * @param range - [min, max] multiplier range
   */
  modulate(
    baseValue: number,
    pattern: InterferencePattern,
    type: 'constructive' | 'destructive',
    range: [number, number] = [1, 3]
  ): number {
    const [min, max] = range;
    const strength = type === 'constructive' ? pattern.constructive : pattern.destructive;
    const multiplier = min + strength * (max - min);
    return baseValue * multiplier;
  }

  /**
   * Preset modulation patterns for common use cases
   */

  /**
   * Modulate cross-species coupling (synchronization)
   * High consonance → strong coupling → synchronized movements
   */
  modulateCoupling(baseCoupling: number, pattern: InterferencePattern): number {
    return this.modulate(baseCoupling, pattern, 'constructive', [0.1, 10.0]);
  }

  /**
   * Modulate diffusion rate (trail blur)
   * High dissonance → high diffusion → blurred, chaotic trails
   */
  modulateDiffusion(baseDiffusion: number, pattern: InterferencePattern): number {
    return this.modulate(baseDiffusion, pattern, 'destructive', [1.0, 5.0]);
  }

  /**
   * Modulate sensor noise (erratic behavior)
   * High dissonance → high noise → unpredictable movements
   */
  modulateSensorNoise(baseNoise: number, pattern: InterferencePattern): number {
    return this.modulate(baseNoise, pattern, 'destructive', [1.0, 3.0]);
  }

  /**
   * Modulate turn speed (nervousness)
   * High dissonance → high turn speed → jittery movements
   */
  modulateTurnSpeed(baseTurnSpeed: number, pattern: InterferencePattern): number {
    return this.modulate(baseTurnSpeed, pattern, 'destructive', [1.0, 2.5]);
  }

  /**
   * Modulate pheromone decay (memory duration)
   * High consonance → slow decay → stable, persistent trails
   */
  modulateDecay(baseDecay: number, pattern: InterferencePattern): number {
    // Inverse: high consonance → LOW decay (longer trails)
    const inverseCoupling = 1 - pattern.constructive;
    return baseDecay * (0.3 + inverseCoupling * 0.7);
  }

  /**
   * Configure behavior
   */
  setConfig(config: Partial<InterferenceConfig>): void {
    if (config.consonanceWeight !== undefined) this.consonanceWeight = config.consonanceWeight;
    if (config.dissonanceWeight !== undefined) this.dissonanceWeight = config.dissonanceWeight;
    if (config.thresholdHarmonic !== undefined) this.thresholdHarmonic = config.thresholdHarmonic;
    if (config.thresholdChaotic !== undefined) this.thresholdChaotic = config.thresholdChaotic;
  }

  /**
   * Get recommended modulation for current pattern
   */
  getRecommendedModulation(pattern: InterferencePattern): {
    description: string;
    suggestions: string[];
  } {
    switch (pattern.mode) {
      case 'harmonic':
        return {
          description: 'Harmonic music detected - maximize synchronization',
          suggestions: [
            'Increase cross-species coupling (agents move together)',
            'Reduce diffusion (keep trails clear)',
            'Slow decay (stable, persistent patterns)',
            'Reduce sensor noise (smooth movements)',
          ],
        };
      case 'chaotic':
        return {
          description: 'Chaotic music detected - maximize turbulence',
          suggestions: [
            'Reduce coupling (independent agent movements)',
            'Increase diffusion (blurred, unstable trails)',
            'Fast decay (ephemeral patterns)',
            'Increase sensor noise (erratic behavior)',
            'Increase turn speed (jittery movements)',
          ],
        };
      case 'neutral':
        return {
          description: 'Neutral music - balanced modulation',
          suggestions: ['Use moderate modulation for all parameters'],
        };
    }
  }
}
