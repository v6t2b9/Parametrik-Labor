/**
 * Audio analysis utility functions
 */

import type { CurveType } from '../types/musicMappings';

/**
 * Map a value from one range to another
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  const clamped = Math.max(inMin, Math.min(inMax, value));
  return ((clamped - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

/**
 * Apply curve transformation to a normalized value (0-1)
 */
export function applyCurve(value: number, curve: CurveType): number {
  const clamped = Math.max(0, Math.min(1, value));

  switch (curve) {
    case 'linear':
      return clamped;

    case 'exponential':
      // y = x^2 (accelerating curve)
      return clamped * clamped;

    case 'logarithmic':
      // y = sqrt(x) (decelerating curve)
      return Math.sqrt(clamped);

    default:
      return clamped;
  }
}

/**
 * Calculate RMS (Root Mean Square) loudness from audio buffer
 */
export function calculateRMS(dataArray: Uint8Array): number {
  let sum = 0;
  for (let i = 0; i < dataArray.length; i++) {
    const normalized = dataArray[i] / 255;
    sum += normalized * normalized;
  }
  return Math.sqrt(sum / dataArray.length);
}

/**
 * Calculate spectral roughness (proxy for dissonance)
 * Higher roughness = more dissonant/tense
 */
export function calculateRoughness(frequencyData: Uint8Array): number {
  // Simplified roughness calculation:
  // Sum of differences between adjacent frequency bins
  let roughness = 0;
  for (let i = 1; i < frequencyData.length; i++) {
    const diff = Math.abs(frequencyData[i] - frequencyData[i - 1]);
    roughness += diff;
  }

  // Normalize by number of bins
  roughness = roughness / (frequencyData.length - 1);

  // Normalize to 0-1 range (empirically, max diff ~255)
  return Math.min(1, roughness / 128);
}

/**
 * Extract energy from specific frequency range
 * @param frequencyData - Full FFT frequency data
 * @param minFreq - Minimum frequency in Hz
 * @param maxFreq - Maximum frequency in Hz
 * @param sampleRate - Audio sample rate (typically 44100 or 48000)
 * @param fftSize - FFT size used for analysis
 */
export function getFrequencyRangeEnergy(
  frequencyData: Uint8Array,
  minFreq: number,
  maxFreq: number,
  sampleRate: number,
  fftSize: number
): number {
  // Calculate bin indices for frequency range
  const nyquist = sampleRate / 2;
  const binSize = nyquist / frequencyData.length;

  const minBin = Math.floor(minFreq / binSize);
  const maxBin = Math.ceil(maxFreq / binSize);

  const startBin = Math.max(0, minBin);
  const endBin = Math.min(frequencyData.length - 1, maxBin);

  // Sum energy in range
  let sum = 0;
  for (let i = startBin; i <= endBin; i++) {
    sum += frequencyData[i];
  }

  // Average and normalize to 0-1
  const count = endBin - startBin + 1;
  return count > 0 ? sum / (count * 255) : 0;
}

/**
 * Clamp value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Smoothly interpolate between two values
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * clamp(t, 0, 1);
}

/**
 * Exponential moving average for smoothing time-series data
 */
export class ExponentialMovingAverage {
  private value: number;
  private alpha: number;

  constructor(alpha: number = 0.1, initialValue: number = 0) {
    this.alpha = clamp(alpha, 0, 1);
    this.value = initialValue;
  }

  update(newValue: number): number {
    this.value = this.alpha * newValue + (1 - this.alpha) * this.value;
    return this.value;
  }

  getValue(): number {
    return this.value;
  }

  reset(value: number = 0): void {
    this.value = value;
  }
}
