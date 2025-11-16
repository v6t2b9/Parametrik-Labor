/**
 * Music Psychology Module
 * Calculates emotional dimensions from audio features
 * Based on empirical research:
 * - Carpentier & Potter (2007): Tempo → Arousal (linear)
 * - Jiang et al. (2018): Tempo → Valence (V-shaped, peak ~106 BPM)
 * - Koelsch et al. (2006): Dissonance → Tension
 */

import { mapRange, clamp } from './utils';

/**
 * Calculate arousal level from BPM
 * Arousal increases linearly with tempo
 * Based on: Carpentier & Potter (2007)
 *
 * @param bpm - Beats per minute (60-180)
 * @returns Arousal level (0-1)
 */
export function calculateArousal(bpm: number): number {
  // Linear mapping: 60 BPM = 0, 180 BPM = 1
  return mapRange(bpm, 60, 180, 0, 1);
}

/**
 * Calculate valence (emotional positivity) from BPM
 * Valence follows V-shaped curve with peak at optimal BPM
 * Based on: Jiang et al. (2018) - medium tempo most pleasant
 *
 * @param bpm - Beats per minute (60-180)
 * @param optimalBPM - Peak of V-curve (default: 106)
 * @param valenceRange - Width of V-curve (default: 0.5)
 * @returns Valence level (0-1)
 */
export function calculateValence(
  bpm: number,
  optimalBPM: number = 106,
  valenceRange: number = 0.5
): number {
  // Distance from optimal BPM
  const distance = Math.abs(bpm - optimalBPM);

  // V-curve: closer to optimal = higher valence
  // Range determines how quickly valence drops off
  const maxDistance = 60; // Max reasonable distance (60-180 BPM range / 2)
  const normalizedDistance = distance / maxDistance;

  // Inverted and scaled
  const valence = 1 - normalizedDistance / (valenceRange + 0.01);

  return clamp(valence, 0, 1);
}

/**
 * Calculate tension from dissonance/roughness
 * Higher roughness = more tension/stress
 * Based on: Koelsch et al. (2006), Dellacherie et al. (2011)
 *
 * @param dissonance - Spectral roughness (0-1)
 * @param sensitivity - Scaling factor (0-2)
 * @returns Tension level (0-1)
 */
export function calculateTension(
  dissonance: number,
  sensitivity: number = 1.0
): number {
  return clamp(dissonance * sensitivity, 0, 1);
}

/**
 * Calculate stability (inverse of tension)
 * Consonant harmonies = stable, pleasant states
 *
 * @param tension - Tension level (0-1)
 * @returns Stability level (0-1)
 */
export function calculateStability(tension: number): number {
  return clamp(1 - tension, 0, 1);
}

/**
 * Estimate BPM from audio features (simplified)
 * For MVP, this is a basic energy-based estimation
 * For production, consider libraries like Aubio.js or Essentia.js
 *
 * @param bassEnergy - Bass frequency energy (0-1)
 * @param beatInterval - Average interval between beats in ms
 * @returns Estimated BPM (60-180)
 */
export function estimateBPM(
  bassEnergy: number,
  beatInterval: number
): number {
  if (beatInterval <= 0 || !isFinite(beatInterval)) {
    // Default to medium tempo if no beats detected
    return 106;
  }

  // Convert interval to BPM
  const bpm = 60000 / beatInterval;

  // Clamp to reasonable range
  return clamp(bpm, 60, 180);
}

/**
 * Calculate compound emotional dimension
 * Example: High arousal + high valence = energetic/happy
 */
export function calculateEmotionalEnergy(
  arousal: number,
  valence: number
): number {
  return Math.sqrt(arousal * valence);
}

/**
 * Calculate compound stress dimension
 * Example: High tension + low stability = chaotic/stressful
 */
export function calculateStress(
  tension: number,
  instability: number
): number {
  return Math.sqrt(tension * instability);
}
