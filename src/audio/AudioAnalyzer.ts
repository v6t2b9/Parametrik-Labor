/**
 * AudioAnalyzer - Web Audio API wrapper for real-time music analysis
 * Provides FFT, frequency bands, BPM detection, beat detection, and harmony analysis
 */

import type { MusicAnalysis, MusicMappingParameters } from '../types/musicMappings';
import {
  calculateRMS,
  calculateRoughness,
  getFrequencyRangeEnergy,
  calculateSpectralCentroid,
  calculateSpectralRolloff,
  calculateSpectralFlatness,
  calculateZeroCrossingRate,
  calculateChroma,
  ExponentialMovingAverage,
} from './utils';
import { BeatDetector } from './BeatDetector';
import {
  calculateArousal,
  calculateValence,
  calculateTension,
  calculateStability,
  estimateBPM,
} from './MusicPsychology';
import { AdaptiveNormalizer } from './AdaptiveNormalizer';

export class AudioAnalyzer {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private source:
    | AudioBufferSourceNode
    | MediaStreamAudioSourceNode
    | MediaElementAudioSourceNode
    | null = null;
  private audioElement: HTMLAudioElement | null = null;

  private frequencyData: Uint8Array;
  private timeData: Uint8Array;
  private fftSize: number;

  private beatDetector: BeatDetector;
  private bpmHistory: number[] = [];
  private loudnessEMA: ExponentialMovingAverage;
  private lastLoudness: number = 0;

  private startTime: number = 0;
  private pausedAt: number = 0;

  private isPlaying: boolean = false;
  private currentMode: 'none' | 'file' | 'microphone' = 'none';

  // Mapping parameters for adaptive analysis
  private mappingParams: MusicMappingParameters | null = null;

  // Adaptive normalization (Auto-Harmonizer)
  private adaptiveNormalizer: AdaptiveNormalizer;
  private useAdaptiveNormalization: boolean = false;

  constructor(fftSize: number = 2048) {
    this.fftSize = fftSize;
    this.frequencyData = new Uint8Array(fftSize / 2);
    this.timeData = new Uint8Array(fftSize);

    this.beatDetector = new BeatDetector();
    this.loudnessEMA = new ExponentialMovingAverage(0.1);

    // Initialize adaptive normalizer (10 seconds window, 2% smoothing)
    this.adaptiveNormalizer = new AdaptiveNormalizer({
      windowSize: 600, // 10 seconds at 60fps
      smoothingFactor: 0.02,
      percentileRange: [5, 95], // Ignore extreme outliers
    });
  }

  /**
   * Initialize Audio Context (lazy initialization)
   */
  private initAudioContext(): void {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();

      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = this.fftSize;
      this.analyser.smoothingTimeConstant = 0.8;

      this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
      this.timeData = new Uint8Array(this.analyser.fftSize);
    }

    // Resume context if suspended (browsers require user interaction)
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  /**
   * Load audio from file
   */
  async loadFile(file: File): Promise<void> {
    this.cleanup();
    this.initAudioContext();

    if (!this.audioContext || !this.analyser) {
      throw new Error('AudioContext not initialized');
    }

    // Create audio element for playback control
    this.audioElement = new Audio();
    this.audioElement.src = URL.createObjectURL(file);
    this.audioElement.loop = false;

    // Wait for metadata to load
    await new Promise<void>((resolve, reject) => {
      this.audioElement!.onloadedmetadata = () => resolve();
      this.audioElement!.onerror = () =>
        reject(new Error('Failed to load audio file'));
    });

    // Connect audio element to analyzer
    this.source = this.audioContext.createMediaElementSource(this.audioElement);
    this.source.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);

    this.currentMode = 'file';
    this.resetAnalysisState();
  }

  /**
   * Start microphone input
   */
  async startMicrophone(): Promise<void> {
    this.cleanup();
    this.initAudioContext();

    if (!this.audioContext || !this.analyser) {
      throw new Error('AudioContext not initialized');
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      this.source = this.audioContext.createMediaStreamSource(stream);
      this.source.connect(this.analyser);

      this.currentMode = 'microphone';
      this.isPlaying = true;
      this.startTime = this.audioContext.currentTime;
      this.resetAnalysisState();
    } catch {
      throw new Error('Microphone access denied or not available');
    }
  }

  /**
   * Play audio (file mode only)
   */
  play(): void {
    if (this.currentMode !== 'file' || !this.audioElement) {
      return;
    }

    if (!this.isPlaying) {
      this.audioElement.play();
      this.isPlaying = true;

      if (this.audioContext) {
        this.startTime = this.audioContext.currentTime - this.pausedAt;
      }
    }
  }

  /**
   * Pause audio (file mode only)
   */
  pause(): void {
    if (this.currentMode !== 'file' || !this.audioElement) {
      return;
    }

    if (this.isPlaying) {
      this.audioElement.pause();
      this.isPlaying = false;

      if (this.audioContext) {
        this.pausedAt = this.audioContext.currentTime - this.startTime;
      }
    }
  }

  /**
   * Stop audio and reset
   */
  stop(): void {
    if (this.currentMode === 'file' && this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }

    this.isPlaying = false;
    this.startTime = 0;
    this.pausedAt = 0;
    this.resetAnalysisState();
  }

  /**
   * Set loop mode (file mode only)
   */
  setLoop(loop: boolean): void {
    if (this.audioElement) {
      this.audioElement.loop = loop;
    }
  }

  /**
   * Set mapping parameters for adaptive analysis
   */
  setMappingParameters(params: MusicMappingParameters): void {
    this.mappingParams = params;

    // Update beat detector cooldown
    if (params.rhythm.beatCooldown !== undefined) {
      this.beatDetector.setCooldown(params.rhythm.beatCooldown);
    }
  }

  /**
   * Get current audio analysis
   * This is the main method called every frame
   */
  getCurrentAnalysis(): MusicAnalysis {
    if (!this.analyser || !this.audioContext) {
      return this.getEmptyAnalysis();
    }

    // Get frequency and time domain data
    this.analyser.getByteFrequencyData(this.frequencyData as Uint8Array<ArrayBuffer>);
    this.analyser.getByteTimeDomainData(this.timeData as Uint8Array<ArrayBuffer>);

    const sampleRate = this.audioContext.sampleRate;
    const timestamp = this.audioContext.currentTime;

    // 1. Spectral Analysis
    const bassEnergy = getFrequencyRangeEnergy(
      this.frequencyData,
      20,
      250,
      sampleRate,
      this.fftSize
    );

    const midEnergy = getFrequencyRangeEnergy(
      this.frequencyData,
      250,
      2000,
      sampleRate,
      this.fftSize
    );

    const highEnergy = getFrequencyRangeEnergy(
      this.frequencyData,
      2000,
      20000,
      sampleRate,
      this.fftSize
    );

    // Advanced spectral features
    const centroid = calculateSpectralCentroid(this.frequencyData, sampleRate);
    const rolloff = calculateSpectralRolloff(this.frequencyData, sampleRate);
    const flatness = calculateSpectralFlatness(this.frequencyData);
    const zcr = calculateZeroCrossingRate(this.timeData);

    // 2. Beat Detection
    const beatData = this.beatDetector.detect(bassEnergy, timestamp * 1000);

    // 3. BPM Estimation (simplified)
    let bpm = 106; // Default medium tempo
    if (beatData.beat) {
      const beatInterval = timestamp * 1000 - beatData.lastBeatTime;
      if (beatInterval > 0) {
        const estimatedBPM = estimateBPM(bassEnergy, beatInterval);
        this.bpmHistory.push(estimatedBPM);

        // Keep last 10 beats for averaging
        if (this.bpmHistory.length > 10) {
          this.bpmHistory.shift();
        }

        // Average BPM from history
        bpm =
          this.bpmHistory.reduce((a, b) => a + b, 0) / this.bpmHistory.length;
      }
    }

    // 4. Harmony Analysis (Roughness)
    const roughness = calculateRoughness(this.frequencyData);
    const dissonance = roughness;
    const consonance = 1 - roughness;

    // Chroma features (pitch class distribution)
    const chroma = calculateChroma(this.frequencyData, sampleRate);

    // 5. Music Psychology Dimensions
    const optimalBPM = this.mappingParams?.tempo.optimalBPM ?? 106;
    const valenceRange = this.mappingParams?.tempo.valenceRange ?? 0.5;

    const arousalLevel = calculateArousal(bpm);
    const valenceLevel = calculateValence(bpm, optimalBPM, valenceRange);
    const tension = calculateTension(dissonance);
    const stability = calculateStability(tension);

    // 6. Dynamics
    const loudness = calculateRMS(this.frequencyData);
    this.loudnessEMA.update(loudness);

    // Detect crescendo (loudness increasing)
    const crescendo = loudness > this.lastLoudness * 1.1 && loudness > 0.2;
    this.lastLoudness = loudness;

    // Apply adaptive normalization if enabled
    let normalizedBassEnergy = bassEnergy;
    let normalizedMidEnergy = midEnergy;
    let normalizedHighEnergy = highEnergy;
    let normalizedCentroid = centroid;
    let normalizedRolloff = rolloff;
    let normalizedFlatness = flatness;
    let normalizedZcr = zcr;
    let normalizedBeatStrength = beatData.beatStrength;
    let normalizedLoudness = loudness;

    if (this.useAdaptiveNormalization) {
      normalizedBassEnergy = this.adaptiveNormalizer.normalize('bassEnergy', bassEnergy);
      normalizedMidEnergy = this.adaptiveNormalizer.normalize('midEnergy', midEnergy);
      normalizedHighEnergy = this.adaptiveNormalizer.normalize('highEnergy', highEnergy);
      normalizedCentroid = this.adaptiveNormalizer.normalize('spectralCentroid', centroid);
      normalizedRolloff = this.adaptiveNormalizer.normalize('spectralRolloff', rolloff);
      normalizedFlatness = this.adaptiveNormalizer.normalize('spectralFlatness', flatness);
      normalizedZcr = this.adaptiveNormalizer.normalize('zcr', zcr);
      normalizedBeatStrength = this.adaptiveNormalizer.normalize('beatStrength', beatData.beatStrength);
      normalizedLoudness = this.adaptiveNormalizer.normalize('loudness', loudness);
    }

    return {
      spectral: {
        bassEnergy: normalizedBassEnergy,
        midEnergy: normalizedMidEnergy,
        highEnergy: normalizedHighEnergy,
        centroid: normalizedCentroid,
        rolloff: normalizedRolloff,
        flatness: normalizedFlatness,
        zcr: normalizedZcr,
      },
      tempo: {
        bpm,
        arousalLevel,
        valenceLevel,
      },
      harmony: {
        consonance,
        dissonance,
        tension,
        stability,
        chroma,
      },
      rhythm: {
        beat: beatData.beat,
        beatStrength: normalizedBeatStrength,
        lastBeatTime: beatData.lastBeatTime,
      },
      dynamics: {
        loudness: normalizedLoudness,
        crescendo,
      },
      timestamp,
    };
  }

  /**
   * Get empty analysis (when no audio is playing)
   */
  private getEmptyAnalysis(): MusicAnalysis {
    return {
      spectral: {
        bassEnergy: 0,
        midEnergy: 0,
        highEnergy: 0,
        centroid: 0,
        rolloff: 0,
        flatness: 0,
        zcr: 0,
      },
      tempo: {
        bpm: 106,
        arousalLevel: 0,
        valenceLevel: 0,
      },
      harmony: {
        consonance: 1,
        dissonance: 0,
        tension: 0,
        stability: 1,
        chroma: new Array(12).fill(0),
      },
      rhythm: {
        beat: false,
        beatStrength: 0,
        lastBeatTime: 0,
      },
      dynamics: {
        loudness: 0,
        crescendo: false,
      },
      timestamp: 0,
    };
  }

  /**
   * Reset analysis state
   */
  private resetAnalysisState(): void {
    this.beatDetector.reset();
    this.bpmHistory = [];
    this.loudnessEMA.reset();
    this.lastLoudness = 0;
  }

  /**
   * Cleanup resources
   */
  private cleanup(): void {
    // Stop and disconnect source
    if (this.source) {
      this.source.disconnect();
      this.source = null;
    }

    // Cleanup audio element
    if (this.audioElement) {
      this.audioElement.pause();
      URL.revokeObjectURL(this.audioElement.src);
      this.audioElement = null;
    }

    this.isPlaying = false;
    this.currentMode = 'none';
  }

  /**
   * Destroy analyzer and cleanup all resources
   */
  destroy(): void {
    this.cleanup();

    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }

    this.analyser = null;
  }

  // Getters
  get playing(): boolean {
    return this.isPlaying;
  }

  get mode(): 'none' | 'file' | 'microphone' {
    return this.currentMode;
  }

  get currentTime(): number {
    if (this.currentMode === 'file' && this.audioElement) {
      return this.audioElement.currentTime;
    }
    if (this.audioContext) {
      return this.audioContext.currentTime - this.startTime;
    }
    return 0;
  }

  get duration(): number {
    if (this.currentMode === 'file' && this.audioElement) {
      return this.audioElement.duration || 0;
    }
    return 0;
  }

  // Adaptive Normalization (Auto-Harmonizer) Controls

  /**
   * Enable/disable adaptive normalization
   */
  setAdaptiveNormalization(enabled: boolean): void {
    this.useAdaptiveNormalization = enabled;
    if (enabled) {
      // Reset normalizer when enabling to start fresh
      this.adaptiveNormalizer.reset();
    }
  }

  /**
   * Get adaptive normalization status
   */
  getAdaptiveNormalization(): boolean {
    return this.useAdaptiveNormalization;
  }

  /**
   * Get the adaptive normalizer instance for UI/debugging
   */
  getAdaptiveNormalizer(): AdaptiveNormalizer {
    return this.adaptiveNormalizer;
  }

  /**
   * Reset adaptive normalizer (e.g., when new song starts)
   */
  resetAdaptiveNormalizer(): void {
    this.adaptiveNormalizer.reset();
  }

  /**
   * Configure adaptive normalizer
   */
  configureAdaptiveNormalizer(config: {
    windowSize?: number;
    smoothingFactor?: number;
    percentileRange?: [number, number];
  }): void {
    this.adaptiveNormalizer.setConfig(config);
  }
}
