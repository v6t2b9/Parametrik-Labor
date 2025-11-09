import { create } from 'zustand';
import type { AllParameters, Agent, Trails, UIState, PerformanceMetrics, QualityPreset } from '../types/index.js';
import { defaultParameters } from '../presets';
import { SimulationEngine } from '../engine/SimulationEngine';

// Quality preset configurations
function getQualitySettings(preset: QualityPreset) {
  switch (preset) {
    case 'low':
      return {
        agentCount: 1000,
        diffusionFreq: 8,
        waveDistortion: 0,
        chromaticAberration: 0,
        bloom: 0,
        blur: 0,
        motionBlur: 0,
      };
    case 'medium':
      return {
        agentCount: 2000,
        diffusionFreq: 5,
        waveDistortion: 0,
        chromaticAberration: 0,
        bloom: 0.1,
        blur: 0.5,
        motionBlur: 0.1,
      };
    case 'high':
      return {
        agentCount: 3500,
        diffusionFreq: 3,
        waveDistortion: 0,
        chromaticAberration: 0,
        bloom: 0.2,
        blur: 1,
        motionBlur: 0.3,
      };
    case 'ultra':
      return {
        agentCount: 6000,
        diffusionFreq: 2,
        waveDistortion: 0.1,
        chromaticAberration: 2,
        bloom: 0.3,
        blur: 2,
        motionBlur: 0.5,
      };
  }
}

interface SimulationStore {
  // Simulation state
  running: boolean;
  frameCount: number;
  agents: Agent[];
  trails: Trails;
  engine: SimulationEngine;

  // Parameters
  parameters: AllParameters;

  // Performance metrics
  performanceMetrics: PerformanceMetrics;

  // UI state
  ui: UIState;

  // Actions
  setRunning: (running: boolean) => void;
  toggleRunning: () => void;
  reset: () => void;
  setParameters: (params: Partial<AllParameters>) => void;
  loadPreset: (params: AllParameters) => void;
  updatePhysicalParams: (params: Partial<AllParameters['physical']>) => void;
  updateSemioticParams: (params: Partial<AllParameters['semiotic']>) => void;
  updateTemporalParams: (params: Partial<AllParameters['temporal']>) => void;
  updateResonanceParams: (params: Partial<AllParameters['resonance']>) => void;
  updateVisualizationParams: (params: Partial<AllParameters['visualization']>) => void;
  updateEffectsParams: (params: Partial<AllParameters['effects']>) => void;
  updatePerformanceParams: (params: Partial<AllParameters['performance']>) => void;
  updatePerformanceMetrics: (metrics: Partial<PerformanceMetrics>) => void;
  applyQualityPreset: (preset: QualityPreset) => void; // Apply quality preset and update all parameters
  setActiveOikosTab: (tab: UIState['activeOikosTab']) => void;
  setSimulationSpeed: (speed: number) => void;
  tick: () => void; // Called on each animation frame
  performAutoOptimization: () => void; // Auto-adjust agent count based on FPS
}

const GRID_SIZE = 400;

export const useSimulationStore = create<SimulationStore>((set, get) => {
  // Create engine instance
  const engine = new SimulationEngine(GRID_SIZE);
  engine.setParameters(defaultParameters);
  engine.initializeAgents(defaultParameters.temporal.agentCount);

  return {
    // Initial state
    running: false,
    frameCount: 0,
    agents: engine.getAgents(),
    trails: engine.getTrails(),
    engine,
    parameters: defaultParameters,
    performanceMetrics: {
      currentFPS: 0,
      avgFPS: 0,
      minFPS: 0,
      maxFPS: 0,
      frameTime: 0,
      tickTime: 0,
      renderTime: 0,
    },
    ui: {
      activeOikosTab: 'physical',
      simulationSpeed: 1,
    },

    // Actions
    setRunning: (running: boolean) => set({ running }),

    toggleRunning: () => set((state) => ({ running: !state.running })),

    reset: () => {
      const { engine, parameters } = get();
      engine.setParameters(parameters);
      engine.reset();
      set({
        frameCount: 0,
        agents: engine.getAgents(),
        trails: engine.getTrails(),
        running: false,
      });
    },

    setParameters: (params: Partial<AllParameters>) => {
      const currentParams = get().parameters;
      const newParams = {
        ...currentParams,
        ...params,
        physical: { ...currentParams.physical, ...(params.physical || {}) },
        semiotic: { ...currentParams.semiotic, ...(params.semiotic || {}) },
        temporal: { ...currentParams.temporal, ...(params.temporal || {}) },
        resonance: { ...currentParams.resonance, ...(params.resonance || {}) },
        visualization: { ...currentParams.visualization, ...(params.visualization || {}) },
        effects: { ...currentParams.effects, ...(params.effects || {}) },
        performance: { ...currentParams.performance, ...(params.performance || {}) },
      };

      const { engine } = get();
      engine.setParameters(newParams);

      set({ parameters: newParams });
    },

    loadPreset: (params: AllParameters) => {
      const { engine } = get();
      engine.setParameters(params);
      engine.reset();

      set({
        parameters: params,
        frameCount: 0,
        agents: engine.getAgents(),
        trails: engine.getTrails(),
      });
    },

    updatePhysicalParams: (params: Partial<AllParameters['physical']>) => {
      const currentParams = get().parameters;
      const newParams = {
        ...currentParams,
        physical: { ...currentParams.physical, ...params },
      };
      get().setParameters(newParams);
    },

    updateSemioticParams: (params: Partial<AllParameters['semiotic']>) => {
      const currentParams = get().parameters;
      const newParams = {
        ...currentParams,
        semiotic: { ...currentParams.semiotic, ...params },
      };
      get().setParameters(newParams);
    },

    updateTemporalParams: (params: Partial<AllParameters['temporal']>) => {
      const currentParams = get().parameters;
      const newParams = {
        ...currentParams,
        temporal: { ...currentParams.temporal, ...params },
      };
      get().setParameters(newParams);

      // If agent count changed, reinitialize
      if (params.agentCount !== undefined) {
        const { engine } = get();
        engine.initializeAgents(params.agentCount);
        set({ agents: engine.getAgents() });
      }
    },

    updateResonanceParams: (params: Partial<AllParameters['resonance']>) => {
      const currentParams = get().parameters;
      const newParams = {
        ...currentParams,
        resonance: { ...currentParams.resonance, ...params },
      };
      get().setParameters(newParams);
    },

    updateVisualizationParams: (params: Partial<AllParameters['visualization']>) => {
      const currentParams = get().parameters;
      const newParams = {
        ...currentParams,
        visualization: { ...currentParams.visualization, ...params },
      };
      set({ parameters: newParams });
    },

    updateEffectsParams: (params: Partial<AllParameters['effects']>) => {
      const currentParams = get().parameters;
      const newParams = {
        ...currentParams,
        effects: { ...currentParams.effects, ...params },
      };
      set({ parameters: newParams });
    },

    updatePerformanceParams: (params: Partial<AllParameters['performance']>) => {
      const currentParams = get().parameters;
      const newParams = {
        ...currentParams,
        performance: { ...currentParams.performance, ...params },
      };
      set({ parameters: newParams });
    },

    updatePerformanceMetrics: (metrics: Partial<PerformanceMetrics>) => {
      set((state) => ({
        performanceMetrics: { ...state.performanceMetrics, ...metrics },
      }));
    },

    applyQualityPreset: (preset: QualityPreset) => {
      const settings = getQualitySettings(preset);
      const { updateTemporalParams, updatePhysicalParams, updateEffectsParams, updatePerformanceParams } = get();

      // Update performance preset
      updatePerformanceParams({ qualityPreset: preset, _currentOptLevel: 0 });

      // Apply quality settings
      updateTemporalParams({ agentCount: settings.agentCount });
      updatePhysicalParams({ diffusionFreq: settings.diffusionFreq });
      updateEffectsParams({
        waveDistortion: settings.waveDistortion,
        chromaticAberration: settings.chromaticAberration,
        bloom: settings.bloom,
        blur: settings.blur,
        motionBlur: settings.motionBlur,
      });

      console.log(`[Quality Preset] Applied "${preset}" preset:`, settings);
    },

    performAutoOptimization: () => {
      const { parameters, performanceMetrics, updatePerformanceParams, updateEffectsParams, updatePhysicalParams, updateTemporalParams } = get();
      const { autoOptimize, targetFPS, _currentOptLevel, qualityPreset } = parameters.performance;

      // Only optimize if enabled and we have valid FPS data
      if (!autoOptimize || performanceMetrics.avgFPS === 0) return;

      const avgFPS = performanceMetrics.avgFPS;
      const fpsRatio = avgFPS / targetFPS;

      // Get quality preset base values
      const qualitySettings = getQualitySettings(qualityPreset);

      // Determine optimization direction
      let newOptLevel = _currentOptLevel;

      // FPS too low - increase optimization (reduce quality)
      if (fpsRatio < 0.85 && newOptLevel < 10) {
        newOptLevel = Math.min(10, _currentOptLevel + 1);
        console.log(`[Auto-Optimizer] FPS too low (${avgFPS.toFixed(1)}/${targetFPS}), increasing opt level: ${_currentOptLevel} → ${newOptLevel}`);
      }
      // FPS good - decrease optimization (increase quality)
      else if (fpsRatio > 1.1 && newOptLevel > 0) {
        newOptLevel = Math.max(0, _currentOptLevel - 1);
        console.log(`[Auto-Optimizer] FPS good (${avgFPS.toFixed(1)}/${targetFPS}), decreasing opt level: ${_currentOptLevel} → ${newOptLevel}`);
      }

      // Apply optimization if level changed
      if (newOptLevel !== _currentOptLevel) {
        updatePerformanceParams({ _currentOptLevel: newOptLevel });

        // Calculate optimization factor (0 = no opt, 1 = max opt)
        const optFactor = newOptLevel / 10;

        // Apply multi-dimensional optimizations
        // 1. Effects (most expensive)
        updateEffectsParams({
          waveDistortion: qualitySettings.waveDistortion * (1 - optFactor * 1.0), // Remove completely if optimizing
          chromaticAberration: qualitySettings.chromaticAberration * (1 - optFactor * 1.0), // Remove completely
          bloom: qualitySettings.bloom * (1 - optFactor * 0.7), // Reduce by 70%
          blur: qualitySettings.blur * (1 - optFactor * 0.5), // Reduce by 50%
          motionBlur: qualitySettings.motionBlur * (1 - optFactor * 0.6), // Reduce by 60%
        });

        // 2. Physical (trail quality)
        const baseDiffusion = qualitySettings.diffusionFreq;
        const optimizedDiffusion = Math.min(10, baseDiffusion + Math.floor(optFactor * 5)); // Higher freq = less diffusion = faster
        updatePhysicalParams({
          diffusionFreq: optimizedDiffusion,
        });

        // 3. Agent count (last resort, only at high opt levels)
        if (newOptLevel >= 7) {
          const agentReduction = (newOptLevel - 6) / 4; // 0 at level 6, 1 at level 10
          const targetAgents = Math.floor(qualitySettings.agentCount * (1 - agentReduction * 0.5)); // Max 50% reduction
          const currentAgents = parameters.temporal.agentCount;

          if (Math.abs(targetAgents - currentAgents) > 100) {
            updateTemporalParams({ agentCount: targetAgents });
          }
        }
      }
    },

    setActiveOikosTab: (tab: UIState['activeOikosTab']) => {
      set((state) => ({
        ui: { ...state.ui, activeOikosTab: tab },
      }));
    },

    setSimulationSpeed: (speed: number) => {
      set((state) => ({
        ui: { ...state.ui, simulationSpeed: speed },
      }));
    },

    tick: () => {
      const { engine, running } = get();

      if (!running) return;

      engine.update();

      set({
        frameCount: engine.getFrameCount(),
        agents: engine.getAgents(),
        trails: engine.getTrails(),
      });
    },
  };
});
