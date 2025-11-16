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

  const {
    musicEnabled,
    updateAnalysis,
    currentAnalysis,
  } = useAudioStore();

  // Note: Audio mappings are now synced via SimulationStore.setParameters
  // Each species gets its own mappings from parameters.species[type].audio

  // Sync music enabled state to engine
  useEffect(() => {
    if (engine) {
      engine.setMusicEnabled(musicEnabled);
    }
  }, [engine, musicEnabled]);

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
