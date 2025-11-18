/**
 * Audio-Ecology Mapper
 * Maps audio features to species activity boosts
 * Integrates with AudioAnalyzer to create responsive ecosystem dynamics
 */

import type { SpeciesBoosts, AudioEcologyConfig } from '../types/ecosystem.js';

export interface AudioFeatures {
  bass: number;       // 0-1: Low frequency energy
  mid: number;        // 0-1: Mid frequency energy
  high: number;       // 0-1: High frequency energy
  transient: number;  // 0-1: Beat/transient strength
  rms: number;        // 0-1: Overall loudness
  spectralCentroid: number; // Frequency content
}

export class AudioEcologyMapper {
  private config: AudioEcologyConfig;
  private currentBoosts: SpeciesBoosts;
  private smoothingFactor: number = 0.3; // For temporal smoothing
  private previousBoosts: SpeciesBoosts;

  constructor(config: AudioEcologyConfig) {
    this.config = config;
    this.currentBoosts = this.createNeutralBoosts();
    this.previousBoosts = this.createNeutralBoosts();
  }

  /**
   * Create neutral boosts (1.0 = no boost)
   */
  private createNeutralBoosts(): SpeciesBoosts {
    return {
      builder: 1.0,
      harvester: 1.0,
      consumer: 1.0,
      decomposer: 1.0,
      scout: 1.0,
    };
  }

  /**
   * Update boosts based on audio features
   */
  public update(features: AudioFeatures): SpeciesBoosts {
    const newBoosts = this.createNeutralBoosts();
    const { bassBoosts, midBoosts, highBoosts, transientBoosts, boostStrength } = this.config;

    // Map bass to species (typically low-frequency = structural, slow)
    const bassMultiplier = 1.0 + features.bass * boostStrength;
    for (const species of bassBoosts) {
      newBoosts[species] *= bassMultiplier;
    }

    // Map mids to species (typically mid-frequency = harvest, conversion)
    const midMultiplier = 1.0 + features.mid * boostStrength;
    for (const species of midBoosts) {
      newBoosts[species] *= midMultiplier;
    }

    // Map highs to species (typically high-frequency = exploration, movement)
    const highMultiplier = 1.0 + features.high * boostStrength;
    for (const species of highBoosts) {
      newBoosts[species] *= highMultiplier;
    }

    // Map transients/beats to species (typically percussive = aggressive, hunting)
    const transientMultiplier = 1.0 + features.transient * boostStrength;
    for (const species of transientBoosts) {
      newBoosts[species] *= transientMultiplier;
    }

    // Apply temporal smoothing to avoid jitter
    this.currentBoosts = this.smoothBoosts(newBoosts, this.previousBoosts);
    this.previousBoosts = { ...this.currentBoosts };

    return this.currentBoosts;
  }

  /**
   * Smooth boosts over time
   */
  private smoothBoosts(current: SpeciesBoosts, previous: SpeciesBoosts): SpeciesBoosts {
    const α = this.smoothingFactor;
    return {
      builder: current.builder * α + previous.builder * (1 - α),
      harvester: current.harvester * α + previous.harvester * (1 - α),
      consumer: current.consumer * α + previous.consumer * (1 - α),
      decomposer: current.decomposer * α + previous.decomposer * (1 - α),
      scout: current.scout * α + previous.scout * (1 - α),
    };
  }

  /**
   * Get current boosts
   */
  public getBoosts(): SpeciesBoosts {
    return { ...this.currentBoosts };
  }

  /**
   * Update configuration
   */
  public setConfig(config: AudioEcologyConfig): void {
    this.config = config;
  }

  /**
   * Reset boosts to neutral
   */
  public reset(): void {
    this.currentBoosts = this.createNeutralBoosts();
    this.previousBoosts = this.createNeutralBoosts();
  }

  /**
   * Get boost for specific species
   */
  public getBoost(species: keyof SpeciesBoosts): number {
    return this.currentBoosts[species];
  }

  /**
   * Get species with highest current boost
   */
  public getMostBoostedSpecies(): keyof SpeciesBoosts {
    let maxSpecies: keyof SpeciesBoosts = 'builder';
    let maxBoost = 0;

    for (const species of Object.keys(this.currentBoosts) as Array<keyof SpeciesBoosts>) {
      if (this.currentBoosts[species] > maxBoost) {
        maxBoost = this.currentBoosts[species];
        maxSpecies = species;
      }
    }

    return maxSpecies;
  }

  /**
   * Get boost intensity (0-1) for UI visualization
   */
  public getBoostIntensity(species: keyof SpeciesBoosts): number {
    const boost = this.currentBoosts[species];
    // Normalize: 1.0 = 0%, 2.5 = 100%
    return Math.min(1.0, Math.max(0, (boost - 1.0) / 1.5));
  }
}

/**
 * Extract audio features from AudioAnalyzer data
 * Compatible with existing audio analysis system
 */
export function extractAudioFeatures(audioData: {
  frequencyData: Uint8Array;
  rms: number;
  spectralCentroid?: number;
  beatDetected?: boolean;
}): AudioFeatures {
  const freqData = audioData.frequencyData;
  const length = freqData.length;

  // Divide spectrum into bass, mid, high regions
  const bassEnd = Math.floor(length * 0.15);    // 0-15%
  const midEnd = Math.floor(length * 0.5);      // 15-50%
  const highEnd = length;                        // 50-100%

  // Calculate average energy in each band
  let bassSum = 0;
  let midSum = 0;
  let highSum = 0;

  for (let i = 0; i < bassEnd; i++) {
    bassSum += freqData[i];
  }
  for (let i = bassEnd; i < midEnd; i++) {
    midSum += freqData[i];
  }
  for (let i = midEnd; i < highEnd; i++) {
    highSum += freqData[i];
  }

  const bass = (bassSum / bassEnd) / 255;
  const mid = (midSum / (midEnd - bassEnd)) / 255;
  const high = (highSum / (highEnd - midEnd)) / 255;

  return {
    bass: Math.min(1.0, bass),
    mid: Math.min(1.0, mid),
    high: Math.min(1.0, high),
    transient: audioData.beatDetected ? 1.0 : 0.0,
    rms: audioData.rms || 0,
    spectralCentroid: audioData.spectralCentroid || 0.5,
  };
}
