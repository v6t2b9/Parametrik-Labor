/**
 * AdaptiveNormalizer - Adaptive Feature Normalization for Audio Oikos
 *
 * Solves the weak modulation problem by using relative normalization
 * instead of absolute ranges. Learns the actual musical range from
 * the current audio and normalizes features to maximize contrast.
 *
 * Example:
 * - Absolute: Spectral Centroid 0-8000 Hz → Most songs 1500-3000 Hz = 0.19-0.38 normalized
 * - Adaptive: Learns 1500-3000 Hz range → Normalizes to full 0.0-1.0 range!
 *
 * Result: Maximum contrast = Maximum visual variation
 */

export interface AdaptiveNormalizerConfig {
  windowSize?: number;        // Number of samples to keep (default: 600 = 10s at 60fps)
  smoothingFactor?: number;   // How quickly to adapt (0.001-0.1, default: 0.02)
  percentileRange?: [number, number]; // Ignore outliers (default: [5, 95])
  exaggeration?: number;      // Power curve exponent for dramatic effect (default: 1.0)
}

export interface AdaptiveRange {
  min: number;
  max: number;
}

export interface FeatureBuckets {
  low: number;   // 33rd percentile threshold
  mid: number;   // 67th percentile threshold
  high: number;  // Max value
}

export interface FeatureStats {
  sampleCount: number;
  currentMin: number;
  currentMax: number;
  adaptiveMin: number;
  adaptiveMax: number;
  buckets: FeatureBuckets;
}

export class AdaptiveNormalizer {
  private windowSize: number;
  private smoothingFactor: number;
  private percentileRange: [number, number];
  private exaggeration: number;

  // History buffers for each feature
  private history: Map<string, number[]> = new Map();

  // Learned min/max for each feature
  private adaptiveRanges: Map<string, AdaptiveRange> = new Map();

  // Bucket thresholds (low/mid/high)
  private buckets: Map<string, FeatureBuckets> = new Map();

  constructor(config: AdaptiveNormalizerConfig = {}) {
    this.windowSize = config.windowSize || 600; // 10 seconds at 60fps
    this.smoothingFactor = config.smoothingFactor || 0.02; // 2% update rate
    this.percentileRange = config.percentileRange || [5, 95]; // Ignore outliers
    this.exaggeration = config.exaggeration || 1.0; // No exaggeration by default
  }

  /**
   * Initialize tracking for a feature
   */
  private initializeFeature(featureName: string): void {
    if (!this.history.has(featureName)) {
      this.history.set(featureName, []);
      this.adaptiveRanges.set(featureName, { min: 0, max: 1 });
      this.buckets.set(featureName, { low: 0, mid: 0, high: 0 });
    }
  }

  /**
   * Update adaptive range for a feature
   */
  private update(featureName: string, rawValue: number): void {
    this.initializeFeature(featureName);

    // Add to history
    const history = this.history.get(featureName);
    if (!history) {
      throw new Error(`Feature ${featureName} not initialized`);
    }

    history.push(rawValue);

    // Keep only windowSize recent values
    if (history.length > this.windowSize) {
      history.shift();
    }

    // Update adaptive range (need minimum samples)
    if (history.length >= 10) {
      this.updateAdaptiveRange(featureName, history);
      this.updateBuckets(featureName, history);
    }
  }

  /**
   * Calculate adaptive min/max using percentiles to ignore outliers
   */
  private updateAdaptiveRange(featureName: string, history: number[]): void {
    const sorted = [...history].sort((a, b) => a - b);
    const [lowPercentile, highPercentile] = this.percentileRange;

    const minIndex = Math.floor((lowPercentile / 100) * sorted.length);
    const maxIndex = Math.floor((highPercentile / 100) * sorted.length);

    const observedMin = sorted[minIndex];
    const observedMax = sorted[maxIndex];

    // Smooth update (exponential moving average)
    const currentRange = this.adaptiveRanges.get(featureName);
    if (!currentRange) {
      throw new Error(`Feature ${featureName} not initialized`);
    }

    const alpha = this.smoothingFactor;

    currentRange.min = alpha * observedMin + (1 - alpha) * currentRange.min;
    currentRange.max = alpha * observedMax + (1 - alpha) * currentRange.max;

    // Ensure min < max (prevent division by zero)
    if (currentRange.max - currentRange.min < 0.001) {
      currentRange.max = currentRange.min + 0.001;
    }
  }

  /**
   * Calculate bucket thresholds (Low/Mid/High classification)
   */
  private updateBuckets(featureName: string, history: number[]): void {
    const sorted = [...history].sort((a, b) => a - b);

    const lowThresholdIndex = Math.floor(sorted.length * 0.33);
    const highThresholdIndex = Math.floor(sorted.length * 0.67);

    this.buckets.set(featureName, {
      low: sorted[lowThresholdIndex],
      mid: sorted[highThresholdIndex],
      high: sorted[sorted.length - 1],
    });
  }

  /**
   * Normalize value using adaptive range
   *
   * @param featureName - Unique identifier for this feature
   * @param rawValue - Raw feature value
   * @returns Normalized value in range [0, 1]
   */
  public normalize(featureName: string, rawValue: number): number {
    // Update history and ranges
    this.update(featureName, rawValue);

    const range = this.adaptiveRanges.get(featureName);
    if (!range) {
      throw new Error(`Feature ${featureName} not initialized`);
    }

    // Adaptive normalization
    let normalized = (rawValue - range.min) / (range.max - range.min);

    // Clamp to [0, 1]
    normalized = Math.max(0, Math.min(1, normalized));

    // Apply exaggeration (power curve for dramatic effect)
    // exponent > 1: Amplifies extremes (0→0, 1→1, middle compressed)
    // exponent < 1: Compresses extremes (S-curve effect)
    if (this.exaggeration !== 1.0) {
      normalized = Math.pow(normalized, this.exaggeration);
    }

    return normalized;
  }

  /**
   * Normalize with custom exaggeration
   * Useful for different dramatic effects per feature
   *
   * @param exponent - Power curve exponent (1.0 = linear, >1 = dramatic, <1 = subtle)
   */
  public normalizeExaggerated(featureName: string, rawValue: number, exponent: number): number {
    // Update history and ranges
    this.update(featureName, rawValue);

    const range = this.adaptiveRanges.get(featureName);
    if (!range) {
      throw new Error(`Feature ${featureName} not initialized`);
    }

    // Adaptive normalization
    let normalized = (rawValue - range.min) / (range.max - range.min);

    // Clamp to [0, 1]
    normalized = Math.max(0, Math.min(1, normalized));

    // Apply custom exaggeration
    normalized = Math.pow(normalized, exponent);

    return normalized;
  }

  /**
   * Get bucket classification
   *
   * @returns 0 = low, 1 = mid, 2 = high
   */
  public getBucket(featureName: string, rawValue: number): 0 | 1 | 2 {
    const buckets = this.buckets.get(featureName);
    if (!buckets) return 1; // Default to mid

    if (rawValue < buckets.low) return 0;
    if (rawValue < buckets.mid) return 1;
    return 2;
  }

  /**
   * Get bucket as normalized 0-1 value
   *
   * @returns 0.0 (low), 0.5 (mid), or 1.0 (high)
   */
  public getBucketNormalized(featureName: string, rawValue: number): number {
    const bucket = this.getBucket(featureName, rawValue);
    return bucket / 2; // 0 → 0.0, 1 → 0.5, 2 → 1.0
  }

  /**
   * Get current adaptive range for display/debugging
   */
  public getRange(featureName: string): AdaptiveRange {
    return this.adaptiveRanges.get(featureName) || { min: 0, max: 1 };
  }

  /**
   * Reset all history (e.g., when new song starts)
   */
  public reset(): void {
    this.history.clear();
    this.adaptiveRanges.clear();
    this.buckets.clear();
  }

  /**
   * Reset specific feature
   */
  public resetFeature(featureName: string): void {
    this.history.delete(featureName);
    this.adaptiveRanges.delete(featureName);
    this.buckets.delete(featureName);
  }

  /**
   * Configure behavior
   */
  public setConfig(config: Partial<AdaptiveNormalizerConfig>): void {
    if (config.windowSize !== undefined) this.windowSize = config.windowSize;
    if (config.smoothingFactor !== undefined) this.smoothingFactor = config.smoothingFactor;
    if (config.percentileRange !== undefined) this.percentileRange = config.percentileRange;
    if (config.exaggeration !== undefined) this.exaggeration = config.exaggeration;
  }

  /**
   * Get statistics for debugging/UI display
   */
  public getStats(featureName: string): FeatureStats | null {
    const history = this.history.get(featureName);
    if (!history || history.length === 0) return null;

    const range = this.adaptiveRanges.get(featureName) || { min: 0, max: 1 };
    const buckets = this.buckets.get(featureName) || { low: 0, mid: 0, high: 0 };

    return {
      sampleCount: history.length,
      currentMin: Math.min(...history),
      currentMax: Math.max(...history),
      adaptiveMin: range.min,
      adaptiveMax: range.max,
      buckets,
    };
  }

  /**
   * Get all tracked features
   */
  public getTrackedFeatures(): string[] {
    return Array.from(this.history.keys());
  }

  /**
   * Check if normalizer has enough data to be effective
   */
  public isReady(featureName: string): boolean {
    const history = this.history.get(featureName);
    return history ? history.length >= 10 : false;
  }

  /**
   * Get overall readiness (percentage of features with enough samples)
   */
  public getReadiness(): number {
    const features = this.getTrackedFeatures();
    if (features.length === 0) return 0;

    const readyCount = features.filter((f) => this.isReady(f)).length;
    return readyCount / features.length;
  }
}
