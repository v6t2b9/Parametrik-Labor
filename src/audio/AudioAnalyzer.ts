/**
 * AudioAnalyzer - Web Audio API wrapper for real-time music analysis
 * Provides FFT, frequency bands, BPM detection, beat detection, and harmony analysis
 */

import type { MusicAnalysis, MusicMappingParameters } from '../types/musicMappings';
import {
  calculateRMS,
  calculateRoughness,
  getFrequencyRangeEnergy,
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

  constructor(fftSize: number = 2048) {
    this.fftSize = fftSize;
    this.frequencyData = new Uint8Array(fftSize / 2);
    this.timeData = new Uint8Array(fftSize);

    this.beatDetector = new BeatDetector();
    this.loudnessEMA = new ExponentialMovingAverage(0.1);
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
    } catch (error) {
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
    this.analyser.getByteFrequencyData(this.frequencyData);
    this.analyser.getByteTimeDomainData(this.timeData);

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

    return {
      spectral: {
        bassEnergy,
        midEnergy,
        highEnergy,
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
      },
      rhythm: {
        beat: beatData.beat,
        beatStrength: beatData.beatStrength,
        lastBeatTime: beatData.lastBeatTime,
      },
      dynamics: {
        loudness,
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
}
