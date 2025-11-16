/**
 * MultiScaleModulator - Multi-timescale feature tracking
 *
 * Tracks audio features at different time scales to capture both
 * micro-details and macro-structure:
 *
 * - MICRO (0.1s):  High-frequency details, texture, nervousness
 * - MESO (0.5s):   Rhythmic structure, beats, pulses
 * - MACRO (4.0s):  Musical form, verse/chorus, overall dynamics
 *
 * Visual effects:
 * - Micro → Agent jitter, turn randomness
 * - Meso → Rhythmic pulsation, deposit rate
 * - Macro → Structural shifts, diffusion changes
 */

import type { MusicAnalysis } from '../types/musicMappings';

export interface TimeScale {
  micro: number;   // 0-1, normalized over ~0.1s window
  meso: number;    // 0-1, normalized over ~0.5s window
  macro: number;   // 0-1, normalized over ~4.0s window
}

export interface MultiScaleConfig {
  microWindow?: number;    // Micro window in seconds (default: 0.1)
  mesoWindow?: number;     // Meso window in seconds (default: 0.5)
  macroWindow?: number;    // Macro window in seconds (default: 4.0)
  fps?: number;            // Target frame rate (default: 60)
}

export class MultiScaleModulator {
  private microWindow: number;
  private mesoWindow: number;
  private macroWindow: number;
  private fps: number;

  // Circular buffers for each time scale
  private microHistory: number[] = [];
  private mesoHistory: number[] = [];
  private macroHistory: number[] = [];

  // Buffer sizes in frames
  private microSize: number;
  private mesoSize: number;
  private macroSize: number;

  constructor(config: MultiScaleConfig = {}) {
    this.microWindow = config.microWindow ?? 0.1;   // 100ms
    this.mesoWindow = config.mesoWindow ?? 0.5;     // 500ms
    this.macroWindow = config.macroWindow ?? 4.0;   // 4 seconds
    this.fps = config.fps ?? 60;

    // Calculate buffer sizes
    this.microSize = Math.floor(this.microWindow * this.fps);  // ~6 frames
    this.mesoSize = Math.floor(this.mesoWindow * this.fps);    // ~30 frames
    this.macroSize = Math.floor(this.macroWindow * this.fps);  // ~240 frames
  }

  /**
   * Update all time scales with new feature values
   *
   * @param analysis - Current audio analysis
   * @returns Normalized values for each time scale
   */
  update(analysis: MusicAnalysis): TimeScale {
    // Extract features for each scale
    const microFeature = analysis.spectral.zcr;           // High-frequency texture
    const mesoFeature = analysis.rhythm.beatStrength;     // Rhythmic pulse
    const macroFeature = analysis.spectral.centroid;      // Overall brightness

    // Update histories
    this.updateHistory(this.microHistory, microFeature, this.microSize);
    this.updateHistory(this.mesoHistory, mesoFeature, this.mesoSize);
    this.updateHistory(this.macroHistory, macroFeature, this.macroSize);

    // Normalize each scale relative to its window
    return {
      micro: this.normalizeHistory(this.microHistory),
      meso: this.normalizeHistory(this.mesoHistory),
      macro: this.normalizeHistory(this.macroHistory),
    };
  }

  /**
   * Update with custom features (advanced usage)
   */
  updateCustom(
    microFeature: number,
    mesoFeature: number,
    macroFeature: number
  ): TimeScale {
    this.updateHistory(this.microHistory, microFeature, this.microSize);
    this.updateHistory(this.mesoHistory, mesoFeature, this.mesoSize);
    this.updateHistory(this.macroHistory, macroFeature, this.macroSize);

    return {
      micro: this.normalizeHistory(this.microHistory),
      meso: this.normalizeHistory(this.mesoHistory),
      macro: this.normalizeHistory(this.macroHistory),
    };
  }

  /**
   * Update circular buffer (efficient, no array shift)
   */
  private updateHistory(history: number[], value: number, maxSize: number): void {
    history.push(value);
    if (history.length > maxSize) {
      history.shift(); // Note: Could optimize with actual circular buffer
    }
  }

  /**
   * Normalize history to 0-1 based on local min/max
   */
  private normalizeHistory(history: number[]): number {
    if (history.length === 0) return 0.5;

    const min = Math.min(...history);
    const max = Math.max(...history);
    const current = history[history.length - 1];
    const range = max - min;

    // Prevent division by zero
    if (range < 0.001) return 0.5;

    return (current - min) / range;
  }

  /**
   * Get current history lengths (for debugging)
   */
  getHistoryLengths(): { micro: number; meso: number; macro: number } {
    return {
      micro: this.microHistory.length,
      meso: this.mesoHistory.length,
      macro: this.macroHistory.length,
    };
  }

  /**
   * Check if all scales are ready (have enough samples)
   */
  isReady(): boolean {
    return (
      this.microHistory.length >= Math.min(10, this.microSize) &&
      this.mesoHistory.length >= Math.min(10, this.mesoSize) &&
      this.macroHistory.length >= Math.min(10, this.macroSize)
    );
  }

  /**
   * Reset all histories
   */
  reset(): void {
    this.microHistory = [];
    this.mesoHistory = [];
    this.macroHistory = [];
  }

  /**
   * Configure time windows
   */
  setConfig(config: Partial<MultiScaleConfig>): void {
    if (config.microWindow !== undefined) {
      this.microWindow = config.microWindow;
      this.microSize = Math.floor(this.microWindow * this.fps);
    }
    if (config.mesoWindow !== undefined) {
      this.mesoWindow = config.mesoWindow;
      this.mesoSize = Math.floor(this.mesoWindow * this.fps);
    }
    if (config.macroWindow !== undefined) {
      this.macroWindow = config.macroWindow;
      this.macroSize = Math.floor(this.macroWindow * this.fps);
    }
    if (config.fps !== undefined) {
      this.fps = config.fps;
      // Recalculate buffer sizes
      this.microSize = Math.floor(this.microWindow * this.fps);
      this.mesoSize = Math.floor(this.mesoWindow * this.fps);
      this.macroSize = Math.floor(this.macroWindow * this.fps);
    }
  }

  /**
   * Preset modulation patterns
   */

  /**
   * Modulate turn jitter (micro-scale nervousness)
   */
  modulateTurnJitter(baseJitter: number, scales: TimeScale): number {
    return baseJitter * (1.0 + scales.micro * 0.5);
  }

  /**
   * Modulate deposit rate (meso-scale rhythmic pulse)
   */
  modulateDepositRate(baseRate: number, scales: TimeScale): number {
    return baseRate * (1.0 + scales.meso * 3.0);
  }

  /**
   * Modulate diffusion rate (macro-scale structural shifts)
   */
  modulateDiffusionRate(baseDiffusion: number, scales: TimeScale): number {
    return baseDiffusion * (0.5 + scales.macro * 2.0);
  }

  /**
   * Modulate agent speed (macro-scale energy)
   */
  modulateSpeed(baseSpeed: number, scales: TimeScale): number {
    return baseSpeed * (0.7 + scales.macro * 0.6);
  }

  /**
   * Get suggested mappings for each scale
   */
  getSuggestedMappings(): {
    micro: string[];
    meso: string[];
    macro: string[];
  } {
    return {
      micro: [
        'Turn jitter (subtle nervousness)',
        'Sensor angle jitter (perception randomness)',
        'Step size variance (movement texture)',
      ],
      meso: [
        'Deposit rate (rhythmic pulsation)',
        'Beat impulse strength (flash intensity)',
        'Turn speed (rhythmic responsiveness)',
      ],
      macro: [
        'Diffusion rate (structural density)',
        'Agent speed (overall energy level)',
        'Decay rate (pattern persistence)',
        'Cross-species coupling (synchronization level)',
      ],
    };
  }

  /**
   * Get readiness percentage (0-100)
   */
  getReadiness(): number {
    const microReady = Math.min(1, this.microHistory.length / Math.min(10, this.microSize));
    const mesoReady = Math.min(1, this.mesoHistory.length / Math.min(10, this.mesoSize));
    const macroReady = Math.min(1, this.macroHistory.length / Math.min(10, this.macroSize));

    return ((microReady + mesoReady + macroReady) / 3) * 100;
  }
}
