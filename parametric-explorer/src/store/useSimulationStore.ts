import { create } from 'zustand';
import type {
  AllParameters,
  Agent,
  Trails,
  UIState,
  PerformanceMetrics,
  QualityPreset,
  AgentType,
  ResolvedSpeciesParams,
  SpeciesScope,
  OikosTab,
  PhysicalOikosParams,
  SemioticOikosParams,
  SpeciesTemporalParams,
  ResonanceOikosParams,
} from '../types/index.js';
import { defaultParameters } from '../presets';
import { SimulationEngine } from '../engine/SimulationEngine';

// Helper: Merge universal + species overrides
export function resolveSpeciesParams(
  params: AllParameters,
  species: AgentType
): ResolvedSpeciesParams {
  const speciesOverride = params.species[species];

  return {
    physical: {
      ...params.universal.physical,
      ...(speciesOverride.physical || {}),
    },
    semiotic: {
      ...params.universal.semiotic,
      ...(speciesOverride.semiotic || {}),
    },
    temporal: {
      ...params.universal.temporal,
      ...(speciesOverride.temporal || {}),
    },
    resonance: {
      ...params.universal.resonance,
      ...(speciesOverride.resonance || {}),
    },
  };
}

// Quality preset configurations
function getQualitySettings(preset: QualityPreset) {
  switch (preset) {
    case 'low':
      return {
        agentCount: 600,
        diffusionFreq: 10,
        waveDistortion: 0,
        chromaticAberration: 0,
        bloom: 0,
        blur: 0,
        motionBlur: 0,
      };
    case 'medium':
      return {
        agentCount: 1200,
        diffusionFreq: 6,
        waveDistortion: 0,
        chromaticAberration: 0,
        bloom: 0.1,
        blur: 0.5,
        motionBlur: 0.1,
      };
    case 'high':
      return {
        agentCount: 1800,
        diffusionFreq: 3,
        waveDistortion: 0,
        chromaticAberration: 0,
        bloom: 0.2,
        blur: 1,
        motionBlur: 0.3,
      };
    case 'ultra':
      return {
        agentCount: 2400,
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

  // Matrix-aware parameter updates
  updateUniversalPhysicalParams: (params: Partial<PhysicalOikosParams>) => void;
  updateUniversalSemioticParams: (params: Partial<SemioticOikosParams>) => void;
  updateUniversalTemporalParams: (params: Partial<SpeciesTemporalParams>) => void;
  updateUniversalResonanceParams: (params: Partial<ResonanceOikosParams>) => void;

  updateSpeciesPhysicalParams: (species: AgentType, params: Partial<PhysicalOikosParams>) => void;
  updateSpeciesSemioticParams: (species: AgentType, params: Partial<SemioticOikosParams>) => void;
  updateSpeciesTemporalParams: (species: AgentType, params: Partial<SpeciesTemporalParams>) => void;
  updateSpeciesResonanceParams: (species: AgentType, params: Partial<ResonanceOikosParams>) => void;

  // Context-aware updates (based on current activeSpeciesScope)
  updatePhysicalParams: (params: Partial<PhysicalOikosParams>) => void;
  updateSemioticParams: (params: Partial<SemioticOikosParams>) => void;
  updateTemporalParams: (params: Partial<SpeciesTemporalParams>) => void;
  updateResonanceParams: (params: Partial<ResonanceOikosParams>) => void;

  // Global updates
  updateGlobalTemporalParams: (params: Partial<AllParameters['globalTemporal']>) => void;
  updateVisualizationParams: (params: Partial<AllParameters['visualization']>) => void;
  updateEffectsParams: (params: Partial<AllParameters['effects']>) => void;
  updatePerformanceParams: (params: Partial<AllParameters['performance']>) => void;
  updatePerformanceMetrics: (metrics: Partial<PerformanceMetrics>) => void;
  applyQualityPreset: (preset: QualityPreset) => void;

  // UI actions
  setActiveSpeciesScope: (scope: SpeciesScope) => void;
  setActiveOikosTab: (tab: OikosTab) => void;
  setControlPanelOpen: (open: boolean) => void;
  toggleControlPanel: () => void;
  setSimulationSpeed: (speed: number) => void;

  // Simulation
  tick: () => void;
  performAutoOptimization: () => void;
}

const GRID_SIZE = 400;

export const useSimulationStore = create<SimulationStore>((set, get) => {
  // Create engine instance
  const engine = new SimulationEngine(GRID_SIZE);
  engine.setParameters(defaultParameters);
  engine.initializeAgents(defaultParameters.globalTemporal.agentCount);

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
      activeSpeciesScope: 'universal',
      activeOikosTab: 'physical',
      controlPanelOpen: false,
      simulationSpeed: 1,
    },

    // Basic actions
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
      const newParams: AllParameters = {
        ...currentParams,
        ...params,
        universal: {
          physical: { ...currentParams.universal.physical, ...(params.universal?.physical || {}) },
          semiotic: { ...currentParams.universal.semiotic, ...(params.universal?.semiotic || {}) },
          temporal: { ...currentParams.universal.temporal, ...(params.universal?.temporal || {}) },
          resonance: { ...currentParams.universal.resonance, ...(params.universal?.resonance || {}) },
        },
        species: {
          red: {
            physical: { ...currentParams.species.red.physical, ...(params.species?.red?.physical || {}) },
            semiotic: { ...currentParams.species.red.semiotic, ...(params.species?.red?.semiotic || {}) },
            temporal: { ...currentParams.species.red.temporal, ...(params.species?.red?.temporal || {}) },
            resonance: { ...currentParams.species.red.resonance, ...(params.species?.red?.resonance || {}) },
          },
          green: {
            physical: { ...currentParams.species.green.physical, ...(params.species?.green?.physical || {}) },
            semiotic: { ...currentParams.species.green.semiotic, ...(params.species?.green?.semiotic || {}) },
            temporal: { ...currentParams.species.green.temporal, ...(params.species?.green?.temporal || {}) },
            resonance: { ...currentParams.species.green.resonance, ...(params.species?.green?.resonance || {}) },
          },
          blue: {
            physical: { ...currentParams.species.blue.physical, ...(params.species?.blue?.physical || {}) },
            semiotic: { ...currentParams.species.blue.semiotic, ...(params.species?.blue?.semiotic || {}) },
            temporal: { ...currentParams.species.blue.temporal, ...(params.species?.blue?.temporal || {}) },
            resonance: { ...currentParams.species.blue.resonance, ...(params.species?.blue?.resonance || {}) },
          },
        },
        globalTemporal: { ...currentParams.globalTemporal, ...(params.globalTemporal || {}) },
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

    // Universal parameter updates
    updateUniversalPhysicalParams: (params) => {
      const current = get().parameters;
      get().setParameters({
        universal: {
          ...current.universal,
          physical: { ...current.universal.physical, ...params },
        },
      });
    },

    updateUniversalSemioticParams: (params) => {
      const current = get().parameters;
      get().setParameters({
        universal: {
          ...current.universal,
          semiotic: { ...current.universal.semiotic, ...params },
        },
      });
    },

    updateUniversalTemporalParams: (params) => {
      const current = get().parameters;
      get().setParameters({
        universal: {
          ...current.universal,
          temporal: { ...current.universal.temporal, ...params },
        },
      });
    },

    updateUniversalResonanceParams: (params) => {
      const current = get().parameters;
      get().setParameters({
        universal: {
          ...current.universal,
          resonance: { ...current.universal.resonance, ...params },
        },
      });
    },

    // Species-specific parameter updates
    updateSpeciesPhysicalParams: (species, params) => {
      const current = get().parameters;
      const speciesParams = current.species[species];
      get().setParameters({
        species: {
          ...current.species,
          [species]: {
            ...speciesParams,
            physical: { ...speciesParams.physical, ...params },
          },
        },
      });
    },

    updateSpeciesSemioticParams: (species, params) => {
      const current = get().parameters;
      const speciesParams = current.species[species];
      get().setParameters({
        species: {
          ...current.species,
          [species]: {
            ...speciesParams,
            semiotic: { ...speciesParams.semiotic, ...params },
          },
        },
      });
    },

    updateSpeciesTemporalParams: (species, params) => {
      const current = get().parameters;
      const speciesParams = current.species[species];
      get().setParameters({
        species: {
          ...current.species,
          [species]: {
            ...speciesParams,
            temporal: { ...speciesParams.temporal, ...params },
          },
        },
      });
    },

    updateSpeciesResonanceParams: (species, params) => {
      const current = get().parameters;
      const speciesParams = current.species[species];
      get().setParameters({
        species: {
          ...current.species,
          [species]: {
            ...speciesParams,
            resonance: { ...speciesParams.resonance, ...params },
          },
        },
      });
    },

    // Context-aware updates (based on activeSpeciesScope)
    updatePhysicalParams: (params) => {
      const { ui } = get();
      if (ui.activeSpeciesScope === 'universal') {
        get().updateUniversalPhysicalParams(params);
      } else {
        get().updateSpeciesPhysicalParams(ui.activeSpeciesScope as AgentType, params);
      }
    },

    updateSemioticParams: (params) => {
      const { ui } = get();
      if (ui.activeSpeciesScope === 'universal') {
        get().updateUniversalSemioticParams(params);
      } else {
        get().updateSpeciesSemioticParams(ui.activeSpeciesScope as AgentType, params);
      }
    },

    updateTemporalParams: (params) => {
      const { ui } = get();
      if (ui.activeSpeciesScope === 'universal') {
        get().updateUniversalTemporalParams(params);
      } else {
        get().updateSpeciesTemporalParams(ui.activeSpeciesScope as AgentType, params);
      }
    },

    updateResonanceParams: (params) => {
      const { ui } = get();
      if (ui.activeSpeciesScope === 'universal') {
        get().updateUniversalResonanceParams(params);
      } else {
        get().updateSpeciesResonanceParams(ui.activeSpeciesScope as AgentType, params);
      }
    },

    // Global updates
    updateGlobalTemporalParams: (params) => {
      const current = get().parameters;
      const newParams = {
        globalTemporal: { ...current.globalTemporal, ...params },
      };
      get().setParameters(newParams);

      // If agent count changed, reinitialize
      if (params.agentCount !== undefined) {
        const { engine } = get();
        engine.initializeAgents(params.agentCount);
        set({ agents: engine.getAgents() });
      }
    },

    updateVisualizationParams: (params) => {
      const current = get().parameters;
      set({
        parameters: {
          ...current,
          visualization: { ...current.visualization, ...params },
        },
      });
    },

    updateEffectsParams: (params) => {
      const current = get().parameters;
      set({
        parameters: {
          ...current,
          effects: { ...current.effects, ...params },
        },
      });
    },

    updatePerformanceParams: (params) => {
      const current = get().parameters;
      set({
        parameters: {
          ...current,
          performance: { ...current.performance, ...params },
        },
      });
    },

    updatePerformanceMetrics: (metrics) => {
      set((state) => ({
        performanceMetrics: { ...state.performanceMetrics, ...metrics },
      }));
    },

    applyQualityPreset: (preset) => {
      const settings = getQualitySettings(preset);
      const { updateGlobalTemporalParams, updateUniversalPhysicalParams, updateEffectsParams, updatePerformanceParams } = get();

      // Update performance preset
      updatePerformanceParams({ qualityPreset: preset, _currentOptLevel: 0 });

      // Apply quality settings
      updateGlobalTemporalParams({ agentCount: settings.agentCount });
      updateUniversalPhysicalParams({ diffusionFreq: settings.diffusionFreq });
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
      const { parameters, performanceMetrics, updatePerformanceParams, updateEffectsParams, updateUniversalPhysicalParams, updateGlobalTemporalParams } = get();
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
      if (fpsRatio < 0.5 && newOptLevel < 10) {
        newOptLevel = Math.min(10, _currentOptLevel + 3);
        console.log(`[Auto-Optimizer] FPS critical (${avgFPS.toFixed(1)}/${targetFPS}), jumping opt level: ${_currentOptLevel} → ${newOptLevel}`);
      } else if (fpsRatio < 0.7 && newOptLevel < 10) {
        newOptLevel = Math.min(10, _currentOptLevel + 2);
        console.log(`[Auto-Optimizer] FPS very low (${avgFPS.toFixed(1)}/${targetFPS}), increasing opt level: ${_currentOptLevel} → ${newOptLevel}`);
      } else if (fpsRatio < 0.9 && newOptLevel < 10) {
        newOptLevel = Math.min(10, _currentOptLevel + 1);
        console.log(`[Auto-Optimizer] FPS low (${avgFPS.toFixed(1)}/${targetFPS}), increasing opt level: ${_currentOptLevel} → ${newOptLevel}`);
      } else if (fpsRatio > 1.2 && newOptLevel > 0) {
        newOptLevel = Math.max(0, _currentOptLevel - 1);
        console.log(`[Auto-Optimizer] FPS good (${avgFPS.toFixed(1)}/${targetFPS}), decreasing opt level: ${_currentOptLevel} → ${newOptLevel}`);
      }

      // Apply optimization if level changed
      if (newOptLevel !== _currentOptLevel) {
        updatePerformanceParams({ _currentOptLevel: newOptLevel });

        const optFactor = newOptLevel / 10;

        // Apply optimizations
        updateEffectsParams({
          waveDistortion: qualitySettings.waveDistortion * (1 - optFactor * 1.0),
          chromaticAberration: qualitySettings.chromaticAberration * (1 - optFactor * 1.0),
          bloom: qualitySettings.bloom * (1 - optFactor * 0.7),
          blur: qualitySettings.blur * (1 - optFactor * 0.5),
          motionBlur: qualitySettings.motionBlur * (1 - optFactor * 0.6),
        });

        const baseDiffusion = qualitySettings.diffusionFreq;
        const optimizedDiffusion = Math.min(10, baseDiffusion + Math.floor(optFactor * 5));
        updateUniversalPhysicalParams({ diffusionFreq: optimizedDiffusion });

        if (newOptLevel >= 5) {
          const agentReduction = (newOptLevel - 4) / 6;
          const targetAgents = Math.max(150, Math.floor(qualitySettings.agentCount * (1 - agentReduction * 0.85)));
          const currentAgents = parameters.globalTemporal.agentCount;

          if (Math.abs(targetAgents - currentAgents) > 50) {
            updateGlobalTemporalParams({ agentCount: targetAgents });
          }
        }
      }
    },

    // UI actions
    setActiveSpeciesScope: (scope) => {
      set((state) => ({
        ui: { ...state.ui, activeSpeciesScope: scope },
      }));
    },

    setActiveOikosTab: (tab) => {
      set((state) => ({
        ui: { ...state.ui, activeOikosTab: tab },
      }));
    },

    setControlPanelOpen: (open) => {
      set((state) => ({
        ui: { ...state.ui, controlPanelOpen: open },
      }));
    },

    toggleControlPanel: () => {
      set((state) => ({
        ui: { ...state.ui, controlPanelOpen: !state.ui.controlPanelOpen },
      }));
    },

    setSimulationSpeed: (speed) => {
      get().updateGlobalTemporalParams({ simulationSpeed: speed });
    },

    // Simulation tick
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
