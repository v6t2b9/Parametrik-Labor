/**
 * AudioSimulationBridge - Connects audio analysis to simulation engine
 * This component updates the MusicReactiveEngine with audio data every frame
 */

import { useEffect } from 'react';
import { useSimulationStore } from '../store/useSimulationStore';
import { useAudioStore } from '../store/useAudioStore';

export function AudioSimulationBridge() {
  const engine = useSimulationStore((state) => state.engine);
  const running = useSimulationStore((state) => state.running);
  const toggleRunning = useSimulationStore((state) => state.toggleRunning);

  const {
    musicEnabled,
    updateAnalysis,
    currentAnalysis,
    isPlaying,
    inputMode,
    play,
    pause,
  } = useAudioStore();

  // Note: Audio mappings are now synced via SimulationStore.setParameters
  // Each species gets its own mappings from parameters.species[type].audio

  // Sync music enabled state to engine and enable enhanced modulators
  useEffect(() => {
    if (engine) {
      engine.setMusicEnabled(musicEnabled);

      // Enable all enhanced modulators when music is enabled
      engine.setBeatPulseEnabled(musicEnabled);
      engine.setInterferenceEnabled(musicEnabled);
      engine.setMultiScaleEnabled(musicEnabled);
    }
  }, [engine, musicEnabled]);

  // Sync audio playback with simulation when music is enabled
  useEffect(() => {
    if (!musicEnabled || inputMode !== 'file') {
      return; // Only sync when music is enabled and using file input
    }

    // Sync simulation to audio: if audio is playing, simulation should run
    if (isPlaying && !running) {
      toggleRunning();
    } else if (!isPlaying && running) {
      toggleRunning();
    }
  }, [isPlaying, musicEnabled, inputMode]); // Intentionally don't include running/toggleRunning to avoid loops

  // Update audio analysis every animation frame
  useEffect(() => {
    if (!running || !musicEnabled) {
      return;
    }

    let animationFrameId: number;

    const update = () => {
      // Update audio analysis from analyzer
      updateAnalysis();

      // Sync current analysis to engine
      if (currentAnalysis && engine) {
        engine.updateMusicAnalysis(currentAnalysis);
      }

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [running, musicEnabled, updateAnalysis, currentAnalysis, engine]);

  // This component doesn't render anything
  return null;
}
