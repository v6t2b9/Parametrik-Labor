/**
 * AudioSimulationBridge - Connects audio analysis to simulation engine
 * This component updates the MusicReactiveEngine with audio data every frame
 */

import { useEffect, useRef } from 'react';
import { useSimulationStore } from '../store/useSimulationStore';
import { useAudioStore } from '../store/useAudioStore';
import { logger } from '../utils/logger';

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

  // Track previous values to prevent unnecessary toggles
  const prevSyncState = useRef<{ isPlaying: boolean; running: boolean } | null>(null);

  // Sync audio playback with simulation when music is enabled
  useEffect(() => {
    if (!musicEnabled || inputMode !== 'file') {
      prevSyncState.current = null;
      return; // Only sync when music is enabled and using file input
    }

    // Only toggle if state actually changed to prevent loops
    const shouldRun = isPlaying;
    if (prevSyncState.current === null || prevSyncState.current.running !== shouldRun) {
      if (shouldRun !== running) {
        toggleRunning();
      }
      prevSyncState.current = { isPlaying, running: shouldRun };
    }
  }, [isPlaying, musicEnabled, inputMode, running, toggleRunning]);

  // Update audio analysis every animation frame
  useEffect(() => {
    if (!running || !musicEnabled) {
      return;
    }

    let animationFrameId: number;
    let frameCount = 0;

    const update = () => {
      // Update audio analysis from analyzer
      updateAnalysis();

      // Debug: Log every 60 frames (once per second at 60fps)
      if (frameCount % 60 === 0) {
        logger.log('[AudioSimulationBridge] Running - musicEnabled:', musicEnabled, 'currentAnalysis:', !!currentAnalysis);
      }

      // Sync current analysis to engine
      if (currentAnalysis && engine) {
        engine.updateMusicAnalysis(currentAnalysis);

        // Debug first few frames
        if (frameCount < 5) {
          logger.log('[AudioSimulationBridge] Frame', frameCount, '- Sending analysis to engine:', {
            beat: currentAnalysis.rhythm.beat,
            bassEnergy: currentAnalysis.spectral.bassEnergy,
            loudness: currentAnalysis.dynamics.loudness,
          });
        }
      } else {
        if (frameCount < 5) {
          logger.warn('[AudioSimulationBridge] No analysis or engine!', { engine: !!engine, analysis: !!currentAnalysis });
        }
      }

      frameCount++;
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
