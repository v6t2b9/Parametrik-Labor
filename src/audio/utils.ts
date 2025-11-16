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

    case 'sigmoid':
      // y = 1 / (1 + e^(-10*(x - 0.5))) (S-curve, steepness=10, centered at 0.5)
      return 1 / (1 + Math.exp(-10 * (clamped - 0.5)));

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
  _fftSize: number
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
 * Calculate spectral centroid (brightness)
 * @returns Normalized value 0-1 (0 = dark, 1 = bright)
 */
export function calculateSpectralCentroid(
  frequencyData: Uint8Array,
  sampleRate: number
): number {
  const nyquist = sampleRate / 2;
  let numerator = 0;
  let denominator = 0;

  for (let i = 0; i < frequencyData.length; i++) {
    const frequency = (i / frequencyData.length) * nyquist;
    const magnitude = frequencyData[i] / 255.0;
    numerator += frequency * magnitude;
    denominator += magnitude;
  }

  const centroid = denominator > 0 ? numerator / denominator : 0;
  // Normalize to 0-1 (assuming max centroid ~8000 Hz)
  return Math.min(1, centroid / 8000);
}

/**
 * Calculate spectral rolloff (dullness)
 * @returns Normalized value 0-1
 */
export function calculateSpectralRolloff(
  frequencyData: Uint8Array,
  sampleRate: number,
  threshold: number = 0.85
): number {
  const totalEnergy = frequencyData.reduce((sum, val) => sum + val, 0);
  const targetEnergy = totalEnergy * threshold;
  const nyquist = sampleRate / 2;

  let sum = 0;
  for (let i = 0; i < frequencyData.length; i++) {
    sum += frequencyData[i];
    if (sum >= targetEnergy) {
      const rolloff = (i / frequencyData.length) * nyquist;
      // Normalize to 0-1 (assuming max rolloff ~8000 Hz)
      return Math.min(1, rolloff / 8000);
    }
  }
  return 1.0; // All energy in high frequencies
}

/**
 * Calculate spectral flatness (noisiness)
 * @returns 0-1 (0 = tonal/harmonic, 1 = noisy/white noise)
 */
export function calculateSpectralFlatness(frequencyData: Uint8Array): number {
  let geometricMean = 1;
  let arithmeticMean = 0;
  const epsilon = 1e-10;

  for (let i = 0; i < frequencyData.length; i++) {
    const magnitude = frequencyData[i] / 255.0 + epsilon;
    geometricMean *= Math.pow(magnitude, 1.0 / frequencyData.length);
    arithmeticMean += magnitude / frequencyData.length;
  }

  return arithmeticMean > epsilon ? geometricMean / arithmeticMean : 0;
}

/**
 * Calculate zero crossing rate (texture/percussiveness)
 * @returns 0-1 (higher = more percussive/noisy)
 */
export function calculateZeroCrossingRate(timeData: Uint8Array): number {
  let crossings = 0;
  for (let i = 1; i < timeData.length; i++) {
    if (
      (timeData[i] >= 128 && timeData[i - 1] < 128) ||
      (timeData[i] < 128 && timeData[i - 1] >= 128)
    ) {
      crossings++;
    }
  }
  // Normalize to 0-1 (empirically, max ZCR ~0.5)
  return Math.min(1, (crossings / timeData.length) / 0.5);
}

/**
 * Calculate chroma features (12-tone pitch class distribution)
 * @returns Array of 12 values (C, C#, D, D#, E, F, F#, G, G#, A, A#, B), normalized 0-1
 */
export function calculateChroma(
  frequencyData: Uint8Array,
  sampleRate: number
): number[] {
  const chroma = new Array(12).fill(0);
  const nyquist = sampleRate / 2;
  const A4 = 440; // Reference frequency

  // Only analyze musical range (80 Hz - 2000 Hz)
  for (let i = 0; i < frequencyData.length; i++) {
    const frequency = (i / frequencyData.length) * nyquist;
    if (frequency < 80 || frequency > 2000) continue;

    // Calculate pitch class (0-11) using A440 as reference
    const pitchClass = Math.round(12 * Math.log2(frequency / A4)) % 12;
    const normalizedPitch = (pitchClass + 12) % 12; // Ensure positive
    const magnitude = frequencyData[i] / 255.0;
    chroma[normalizedPitch] += magnitude;
  }

  // Normalize to 0-1 range
  const maxChroma = Math.max(...chroma, 1);
  return chroma.map(val => val / maxChroma);
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
