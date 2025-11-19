/**
 * Music-Reactive Ecosystem Engine
 * Extends EcosystemEngine with audio-reactive species boosts
 * Integrates with AudioEcologyMapper for music-driven population dynamics
 */

import { EcosystemEngine } from './EcosystemEngine.js';
import { AudioEcologyMapper, extractAudioFeatures, type AudioFeatures } from '../audio/AudioEcologyMapper.js';
import { DEFAULT_ECOLOGY_CONFIG } from './SpeciesConfigs.js';
import type { AllParameters } from '../types/index.js';
import type { MusicAnalysis } from '../types/musicMappings.js';

export class MusicReactiveEcosystemEngine extends EcosystemEngine {
  private audioEcologyMapper: AudioEcologyMapper;
  private musicEnabled: boolean = false;
  private currentMusicAnalysis: MusicAnalysis | null = null;

  constructor(gridSize: number = 400) {
    super(gridSize);
    this.audioEcologyMapper = new AudioEcologyMapper(DEFAULT_ECOLOGY_CONFIG.audioEcology);
  }

  /**
   * Update with music analysis
   */
  public updateWithMusic(analysis: MusicAnalysis | null = null): void {
    if (analysis) {
      this.currentMusicAnalysis = analysis;
    }

    if (this.musicEnabled && this.currentMusicAnalysis) {
      // Extract audio features from music analysis
      const audioFeatures = this.extractFeaturesFromMusicAnalysis(this.currentMusicAnalysis);

      // Update audio-ecology mapper
      this.audioEcologyMapper.update(audioFeatures);

      // Update ecosystem with audio data
      this.updateEcosystem({
        bass: audioFeatures.bass,
        mid: audioFeatures.mid,
        high: audioFeatures.high,
        transient: audioFeatures.transient,
      });
    } else {
      // Update without audio
      this.updateEcosystem();
    }
  }

  /**
   * Extract audio features from MusicAnalysis format
   */
  private extractFeaturesFromMusicAnalysis(analysis: MusicAnalysis): AudioFeatures {
    const { spectral, rhythm, dynamics } = analysis;

    return {
      bass: spectral.bassEnergy || 0,
      mid: spectral.midEnergy || 0,
      high: spectral.highEnergy || 0,
      transient: rhythm.beat ? rhythm.beatStrength : 0,
      rms: dynamics.loudness || 0,
      spectralCentroid: spectral.centroid || 0.5,
    };
  }

  /**
   * Update with simple audio data (alternative to full MusicAnalysis)
   */
  public updateWithSimpleAudio(audioData: {
    frequencyData: Uint8Array;
    rms: number;
    spectralCentroid?: number;
    beatDetected?: boolean;
  }): void {
    if (this.musicEnabled) {
      const audioFeatures = extractAudioFeatures(audioData);
      this.audioEcologyMapper.update(audioFeatures);

      this.updateEcosystem({
        bass: audioFeatures.bass,
        mid: audioFeatures.mid,
        high: audioFeatures.high,
        transient: audioFeatures.transient,
      });
    } else {
      this.updateEcosystem();
    }
  }

  /**
   * Enable/disable music reactivity
   */
  public setMusicEnabled(enabled: boolean): void {
    this.musicEnabled = enabled;
    if (!enabled) {
      this.audioEcologyMapper.reset();
    }
  }

  /**
   * Compatibility methods for AudioSimulationBridge
   * These are no-ops for ecosystem engine as it has different modulation system
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public setBeatPulseEnabled(_enabled: boolean): void {
    // No-op: Ecosystem uses audio-ecology mapping instead
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public setInterferenceEnabled(_enabled: boolean): void {
    // No-op: Ecosystem uses audio-ecology mapping instead
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public setMultiScaleEnabled(_enabled: boolean): void {
    // No-op: Ecosystem uses audio-ecology mapping instead
  }

  /**
   * Alias for compatibility with AudioSimulationBridge
   */
  public updateMusicAnalysis(analysis: MusicAnalysis): void {
    this.updateWithMusic(analysis);
  }

  /**
   * Get current music enabled state
   */
  public isMusicEnabled(): boolean {
    return this.musicEnabled;
  }

  /**
   * Get audio ecology mapper for UI access
   */
  public getAudioEcologyMapper(): AudioEcologyMapper {
    return this.audioEcologyMapper;
  }

  /**
   * Override update to use music-reactive update
   */
  public update(): void {
    this.updateWithMusic();
  }

  /**
   * Override setParameters to update audio ecology config
   */
  public setParameters(params: AllParameters): void {
    super.setParameters(params);

    // Update audio ecology config if present
    if (params.ecosystem?.audioEcology) {
      this.audioEcologyMapper.setConfig(params.ecosystem.audioEcology);
    }
  }

  /**
   * Reset with music disabled
   */
  public resetWithMusic(params: AllParameters): void {
    this.resetEcosystem(params);
    this.audioEcologyMapper.reset();
  }

  /**
   * Get current music analysis
   */
  public getCurrentMusicAnalysis(): MusicAnalysis | null {
    return this.currentMusicAnalysis;
  }

  /**
   * Get most boosted species name for UI display
   */
  public getMostBoostedSpecies(): string {
    return this.audioEcologyMapper.getMostBoostedSpecies();
  }

  /**
   * Get boost intensity for species (0-1 for UI visualization)
   */
  public getBoostIntensity(species: 'builder' | 'harvester' | 'consumer' | 'decomposer' | 'scout'): number {
    return this.audioEcologyMapper.getBoostIntensity(species);
  }
}
