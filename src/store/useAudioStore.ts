/**
 * Audio Store - Zustand store for Audio Oikos state management
 */

import { create } from 'zustand';
import { AudioAnalyzer } from '../audio/AudioAnalyzer';
import type { AdaptiveNormalizerConfig } from '../audio/AdaptiveNormalizer';
import type {
  MusicAnalysis,
  MusicMappingParameters,
  AudioInputMode,
} from '../types/musicMappings';
import { DEFAULT_PRESET, getPreset, AUDIO_MAPPING_PRESETS } from '../audio/presets';

interface VideoExportOptions {
  duration?: number;
  fps?: number;
  quality?: number;
}

interface AudioStore {
  // Audio source
  analyzer: AudioAnalyzer | null;
  audioFile: File | null;
  audioFileName: string;
  inputMode: AudioInputMode;
  isPlaying: boolean;
  loop: boolean;

  // Current analysis (updated every frame)
  currentAnalysis: MusicAnalysis | null;

  // Mapping parameters
  mappings: MusicMappingParameters;
  currentPresetKey: keyof typeof AUDIO_MAPPING_PRESETS;

  // Music reactivity
  musicEnabled: boolean;

  // Adaptive normalization (Auto-Harmonizer)
  adaptiveNormalizationEnabled: boolean;
  adaptiveNormalizerConfig: AdaptiveNormalizerConfig;

  // Video export
  isExporting: boolean;
  exportProgress: number;

  // Actions - Audio Source
  initializeAnalyzer: () => void;
  loadAudioFile: (file: File) => Promise<void>;
  startMicrophone: () => Promise<void>;
  play: () => void;
  pause: () => void;
  stop: () => void;
  togglePlay: () => void;
  setLoop: (loop: boolean) => void;

  // Actions - Music Reactivity
  toggleMusic: () => void;
  setMusicEnabled: (enabled: boolean) => void;

  // Actions - Adaptive Normalization
  toggleAdaptiveNormalization: () => void;
  setAdaptiveNormalization: (enabled: boolean) => void;
  configureAdaptiveNormalizer: (config: Partial<AdaptiveNormalizerConfig>) => void;

  // Actions - Mappings
  updateMappings: (mappings: Partial<MusicMappingParameters>) => void;
  loadPreset: (presetKey: keyof typeof AUDIO_MAPPING_PRESETS) => void;
  resetMappings: () => void;

  // Actions - Analysis Update (called from animation loop)
  updateAnalysis: () => void;

  // Actions - Video Export
  exportVideo: (options: VideoExportOptions) => Promise<void>;

  // Cleanup
  cleanup: () => void;
}

export const useAudioStore = create<AudioStore>((set, get) => ({
  // Initial state
  analyzer: null,
  audioFile: null,
  audioFileName: '',
  inputMode: 'none',
  isPlaying: false,
  loop: false,

  currentAnalysis: null,

  mappings: DEFAULT_PRESET,
  currentPresetKey: 'default',

  musicEnabled: false,

  adaptiveNormalizationEnabled: false,
  adaptiveNormalizerConfig: {
    windowSize: 600, // 10 seconds at 60fps
    smoothingFactor: 0.02, // 2% update rate
    percentileRange: [5, 95], // Ignore outliers
    exaggeration: 1.0, // No exaggeration by default
  },

  isExporting: false,
  exportProgress: 0,

  // Initialize analyzer (lazy)
  initializeAnalyzer: () => {
    const { analyzer } = get();
    if (!analyzer) {
      const newAnalyzer = new AudioAnalyzer(2048);
      newAnalyzer.setMappingParameters(get().mappings);
      set({ analyzer: newAnalyzer });
    }
  },

  // Load audio file
  loadAudioFile: async (file: File) => {
    try {
      get().initializeAnalyzer();
      const { analyzer } = get();

      if (!analyzer) {
        throw new Error('Analyzer not initialized');
      }

      await analyzer.loadFile(file);

      set({
        audioFile: file,
        audioFileName: file.name,
        inputMode: 'file',
        isPlaying: false,
      });

      console.log(`[Audio Oikos] Loaded file: ${file.name}`);
    } catch (error) {
      console.error('[Audio Oikos] Failed to load audio file:', error);
      throw error;
    }
  },

  // Start microphone input
  startMicrophone: async () => {
    try {
      get().initializeAnalyzer();
      const { analyzer } = get();

      if (!analyzer) {
        throw new Error('Analyzer not initialized');
      }

      await analyzer.startMicrophone();

      set({
        inputMode: 'microphone',
        isPlaying: true,
        audioFile: null,
        audioFileName: 'Microphone Input',
      });

      console.log('[Audio Oikos] Microphone started');
    } catch (error) {
      console.error('[Audio Oikos] Failed to start microphone:', error);
      throw error;
    }
  },

  // Play audio
  play: () => {
    const { analyzer, inputMode } = get();

    if (analyzer && inputMode === 'file') {
      analyzer.play();
      set({ isPlaying: true });
    }
  },

  // Pause audio
  pause: () => {
    const { analyzer, inputMode } = get();

    if (analyzer && inputMode === 'file') {
      analyzer.pause();
      set({ isPlaying: false });
    }
  },

  // Stop audio
  stop: () => {
    const { analyzer } = get();

    if (analyzer) {
      analyzer.stop();
      set({ isPlaying: false });
    }
  },

  // Toggle play/pause
  togglePlay: () => {
    const { isPlaying } = get();

    if (isPlaying) {
      get().pause();
    } else {
      get().play();
    }
  },

  // Set loop mode
  setLoop: (loop: boolean) => {
    const { analyzer } = get();

    if (analyzer) {
      analyzer.setLoop(loop);
      set({ loop });
    }
  },

  // Toggle music reactivity
  toggleMusic: () => {
    set((state) => ({ musicEnabled: !state.musicEnabled }));
  },

  // Set music enabled
  setMusicEnabled: (enabled: boolean) => {
    set({ musicEnabled: enabled });
  },

  // Toggle adaptive normalization
  toggleAdaptiveNormalization: () => {
    const newValue = !get().adaptiveNormalizationEnabled;
    const { analyzer } = get();

    if (analyzer) {
      analyzer.setAdaptiveNormalization(newValue);
    }

    set({ adaptiveNormalizationEnabled: newValue });
  },

  // Set adaptive normalization
  setAdaptiveNormalization: (enabled: boolean) => {
    const { analyzer } = get();

    if (analyzer) {
      analyzer.setAdaptiveNormalization(enabled);
    }

    set({ adaptiveNormalizationEnabled: enabled });
  },

  // Configure adaptive normalizer
  configureAdaptiveNormalizer: (config: Partial<AdaptiveNormalizerConfig>) => {
    const currentConfig = get().adaptiveNormalizerConfig;
    const newConfig = { ...currentConfig, ...config };

    const { analyzer } = get();
    if (analyzer) {
      analyzer.configureAdaptiveNormalizer(newConfig);
    }

    set({ adaptiveNormalizerConfig: newConfig });
  },

  // Update mappings
  updateMappings: (newMappings: Partial<MusicMappingParameters>) => {
    const currentMappings = get().mappings;
    const updatedMappings = {
      ...currentMappings,
      ...newMappings,
      // Merge nested objects
      tempo: { ...currentMappings.tempo, ...(newMappings.tempo || {}) },
      harmony: { ...currentMappings.harmony, ...(newMappings.harmony || {}) },
      spectral: { ...currentMappings.spectral, ...(newMappings.spectral || {}) },
      rhythm: { ...currentMappings.rhythm, ...(newMappings.rhythm || {}) },
      dynamics: { ...currentMappings.dynamics, ...(newMappings.dynamics || {}) },
      compound: { ...currentMappings.compound, ...(newMappings.compound || {}) },
    };

    // Update analyzer with new mappings
    const { analyzer } = get();
    if (analyzer) {
      analyzer.setMappingParameters(updatedMappings);
    }

    set({ mappings: updatedMappings });
  },

  // Load preset
  loadPreset: (presetKey: keyof typeof AUDIO_MAPPING_PRESETS) => {
    const preset = getPreset(presetKey);

    // Update analyzer with new mappings
    const { analyzer } = get();
    if (analyzer) {
      analyzer.setMappingParameters(preset);
    }

    set({
      mappings: preset,
      currentPresetKey: presetKey,
    });

    console.log(`[Audio Oikos] Loaded preset: ${AUDIO_MAPPING_PRESETS[presetKey].name}`);
  },

  // Reset mappings to default
  resetMappings: () => {
    get().loadPreset('default');
  },

  // Update analysis (called every frame from animation loop)
  updateAnalysis: () => {
    const { analyzer, musicEnabled } = get();

    if (!analyzer || !musicEnabled) {
      set({ currentAnalysis: null });
      return;
    }

    const analysis = analyzer.getCurrentAnalysis();
    set({ currentAnalysis: analysis });
  },

  // Export video (placeholder for now)
  exportVideo: async (_options: VideoExportOptions) => {
    console.log('[Audio Oikos] Video export not yet implemented');
    set({ isExporting: true, exportProgress: 0 });

    // Simulate progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      set({ exportProgress: i });
    }

    set({ isExporting: false, exportProgress: 0 });
  },

  // Cleanup
  cleanup: () => {
    const { analyzer } = get();

    if (analyzer) {
      analyzer.destroy();
    }

    set({
      analyzer: null,
      audioFile: null,
      audioFileName: '',
      inputMode: 'none',
      isPlaying: false,
      currentAnalysis: null,
    });
  },
}));
