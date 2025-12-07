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

import { CircularBuffer } from '../utils/CircularBuffer';
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

  // Circular buffers for each time scale (O(1) operations)
  private microHistory: CircularBuffer<number>;
  private mesoHistory: CircularBuffer<number>;
  private macroHistory: CircularBuffer<number>;

  constructor(config: MultiScaleConfig = {}) {
    this.microWindow = config.microWindow ?? 0.1;   // 100ms
    this.mesoWindow = config.mesoWindow ?? 0.5;     // 500ms
    this.macroWindow = config.macroWindow ?? 4.0;   // 4 seconds
    this.fps = config.fps ?? 60;

    // Calculate buffer sizes and initialize circular buffers
    const microSize = Math.floor(this.microWindow * this.fps);  // ~6 frames
    const mesoSize = Math.floor(this.mesoWindow * this.fps);    // ~30 frames
    const macroSize = Math.floor(this.macroWindow * this.fps);  // ~240 frames

    this.microHistory = new CircularBuffer<number>(microSize);
    this.mesoHistory = new CircularBuffer<number>(mesoSize);
    this.macroHistory = new CircularBuffer<number>(macroSize);
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
    this.updateHistory(this.microHistory, microFeature);
    this.updateHistory(this.mesoHistory, mesoFeature);
    this.updateHistory(this.macroHistory, macroFeature);

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
    this.updateHistory(this.microHistory, microFeature);
    this.updateHistory(this.mesoHistory, mesoFeature);
    this.updateHistory(this.macroHistory, macroFeature);

    return {
      micro: this.normalizeHistory(this.microHistory),
      meso: this.normalizeHistory(this.mesoHistory),
      macro: this.normalizeHistory(this.macroHistory),
    };
  }

  /**
   * Update circular buffer (O(1) operation)
   */
  private updateHistory(history: CircularBuffer<number>, value: number): void {
    history.push(value);
  }

  /**
   * Normalize history to 0-1 based on local min/max
   */
  private normalizeHistory(history: CircularBuffer<number>): number {
    if (history.isEmpty()) return 0.5;

    const historyArray = history.toArray();
    const min = Math.min(...historyArray);
    const max = Math.max(...historyArray);
    const current = history.getNewest() ?? 0.5;
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
      micro: this.microHistory.getSize(),
      meso: this.mesoHistory.getSize(),
      macro: this.macroHistory.getSize(),
    };
  }

  /**
   * Check if all scales are ready (have enough samples)
   */
  isReady(): boolean {
    return (
      this.microHistory.getSize() >= Math.min(10, this.microHistory.getCapacity()) &&
      this.mesoHistory.getSize() >= Math.min(10, this.mesoHistory.getCapacity()) &&
      this.macroHistory.getSize() >= Math.min(10, this.macroHistory.getCapacity())
    );
  }

  /**
   * Reset all histories
   */
  reset(): void {
    this.microHistory.clear();
    this.mesoHistory.clear();
    this.macroHistory.clear();
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
