/**
 * BeatPulseModulator - Impulse-based beat modulation with exponential decay
 *
 * Creates dramatic "punch" on beats instead of smooth continuous modulation.
 * Visual effect: Patterns "dance" to the rhythm with explosive flashes on beats.
 *
 * Example:
 * - On beat: depositRate = 6x base rate → Bright flash
 * - Between beats: exponential decay back to 1x → Trails fade
 * - Result: Pulsating patterns synchronized to rhythm
 */

export interface BeatPulseConfig {
  decayFactor?: number;        // How quickly pulse decays (0.8-0.99, default: 0.95)
  amplification?: number;      // Strength multiplier on beat (1-10, default: 5)
  minImpulse?: number;         // Minimum impulse threshold (default: 0.01)
}

export class BeatPulseModulator {
  private lastBeatTime: number = 0;
  private currentImpulse: number = 0;
  private decayFactor: number;
  private amplification: number;
  private minImpulse: number;

  constructor(config: BeatPulseConfig = {}) {
    this.decayFactor = config.decayFactor ?? 0.95;
    this.amplification = config.amplification ?? 5.0;
    this.minImpulse = config.minImpulse ?? 0.01;
  }

  /**
   * Call when beat is detected
   */
  onBeatDetected(strength: number, timestamp: number): void {
    this.currentImpulse = strength;
    this.lastBeatTime = timestamp;
  }

  /**
   * Update impulse with exponential decay
   * Call every frame
   */
  update(currentTime: number, deltaTime: number): void {
    // Exponential decay between beats
    // deltaTime * 60 normalizes to 60fps (decay faster at lower fps)
    const decayExponent = deltaTime * 60;
    this.currentImpulse *= Math.pow(this.decayFactor, decayExponent);

    // Clamp to zero when very small (prevent floating point creep)
    if (this.currentImpulse < this.minImpulse) {
      this.currentImpulse = 0;
    }
  }

  /**
   * Get current impulse value (0-1)
   */
  getImpulse(): number {
    return this.currentImpulse;
  }

  /**
   * Modulate a parameter with impulse
   *
   * @param baseValue - Base parameter value
   * @param multiplierRange - [min, max] multiplier range (default: [1, 6])
   * @returns Modulated value
   */
  modulate(baseValue: number, multiplierRange: [number, number] = [1, 6]): number {
    const [min, max] = multiplierRange;
    const multiplier = min + this.currentImpulse * this.amplification * (max - min) / this.amplification;
    return baseValue * Math.max(min, Math.min(max, multiplier));
  }

  /**
   * Modulate deposition rate (common use case)
   * On beat: 6x deposition → bright flash
   * Between beats: 1x deposition → normal
   */
  modulateDeposition(baseRate: number): number {
    return this.modulate(baseRate, [1.0, 6.0]);
  }

  /**
   * Modulate agent speed (speed boost on beat)
   */
  modulateSpeed(baseSpeed: number): number {
    return this.modulate(baseSpeed, [1.0, 2.0]);
  }

  /**
   * Configure behavior
   */
  setConfig(config: Partial<BeatPulseConfig>): void {
    if (config.decayFactor !== undefined) this.decayFactor = config.decayFactor;
    if (config.amplification !== undefined) this.amplification = config.amplification;
    if (config.minImpulse !== undefined) this.minImpulse = config.minImpulse;
  }

  /**
   * Reset state
   */
  reset(): void {
    this.currentImpulse = 0;
    this.lastBeatTime = 0;
  }

  /**
   * Get time since last beat (in seconds)
   */
  getTimeSinceLastBeat(currentTime: number): number {
    return (currentTime - this.lastBeatTime) / 1000;
  }

  /**
   * Check if currently in beat impulse (above threshold)
   */
  isInBeatImpulse(threshold: number = 0.1): boolean {
    return this.currentImpulse > threshold;
  }
}
