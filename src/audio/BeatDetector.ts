/**
 * Beat Detection using energy-based onset detection
 * Simplified threshold-based approach for MVP
 */

import { ExponentialMovingAverage } from './utils';

export class BeatDetector {
  private energyHistory: number[] = [];
  private historySize: number = 43; // ~1 second at 60fps
  private lastBeatTime: number = 0;
  private cooldown: number = 300; // ms between beats
  private threshold: number = 1.3; // Energy must be 1.3x average
  private emaEnergy: ExponentialMovingAverage;

  constructor(cooldown: number = 300, threshold: number = 1.3) {
    this.cooldown = cooldown;
    this.threshold = threshold;
    this.emaEnergy = new ExponentialMovingAverage(0.2);
  }

  /**
   * Detect beat from bass energy
   * @param bassEnergy - Current bass energy (0-1)
   * @param timestamp - Current time in milliseconds
   * @returns Object with beat flag, strength, and last beat time
   */
  detect(
    bassEnergy: number,
    timestamp: number
  ): { beat: boolean; beatStrength: number; lastBeatTime: number } {
    // Add current energy to history
    this.energyHistory.push(bassEnergy);
    if (this.energyHistory.length > this.historySize) {
      this.energyHistory.shift();
    }

    // Update smoothed energy
    this.emaEnergy.update(bassEnergy);

    // Calculate average energy over history
    const avgEnergy =
      this.energyHistory.reduce((a, b) => a + b, 0) / this.energyHistory.length;

    // Check if we're in cooldown period
    const timeSinceLastBeat = timestamp - this.lastBeatTime;
    if (timeSinceLastBeat < this.cooldown) {
      return {
        beat: false,
        beatStrength: 0,
        lastBeatTime: this.lastBeatTime,
      };
    }

    // Detect onset: current energy significantly higher than recent average
    const isBeat = bassEnergy > avgEnergy * this.threshold && bassEnergy > 0.1;

    if (isBeat) {
      this.lastBeatTime = timestamp;

      // Calculate beat strength (how much above threshold)
      const beatStrength = Math.min(1, (bassEnergy - avgEnergy) / avgEnergy);

      return {
        beat: true,
        beatStrength,
        lastBeatTime: this.lastBeatTime,
      };
    }

    return {
      beat: false,
      beatStrength: 0,
      lastBeatTime: this.lastBeatTime,
    };
  }

  /**
   * Update detection parameters
   */
  setCooldown(cooldown: number): void {
    this.cooldown = Math.max(0, Math.min(1000, cooldown));
  }

  setThreshold(threshold: number): void {
    this.threshold = Math.max(1.0, Math.min(3.0, threshold));
  }

  /**
   * Reset detector state
   */
  reset(): void {
    this.energyHistory = [];
    this.lastBeatTime = 0;
    this.emaEnergy.reset();
  }
}
