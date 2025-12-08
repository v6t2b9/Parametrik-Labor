import { create } from 'zustand';
import type {
  AllParameters,
  Agent,
  Trails,
  UIState,
  PerformanceMetrics,
  QualityPreset,
  AgentType,
  SpeciesScope,
  OikosTab,
  PhysicalOikosParams,
  SemioticOikosParams,
  SpeciesTemporalParams,
  ResonanceOikosParams,
  ModelParams,
  AspectRatio,
} from '../types/index.js';
import type { MusicMappingParameters } from '../types/musicMappings';
import { defaultParameters } from '../presets';
import { MusicReactiveEngine } from '../engine/MusicReactiveEngine';
import { MusicReactiveEcosystemEngine } from '../engine/MusicReactiveEcosystemEngine';
import { calculateGridDimensions } from '../engine/SimulationEngine';
import { exportPresetAsJSON, importPresetFromJSON } from '../utils/presetIO';
import { resolveSpeciesParams } from '../utils/parameterUtils';
import { debug } from '../utils/debug';

// Re-export for backward compatibility
export { resolveSpeciesParams };

// DeepPartial type helper for nested partial objects
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Quality preset configurations
function getQualitySettings(preset: QualityPreset) {
  switch (preset) {
    case 'low':
      return {
        agentCount: 800,
        diffusionFreq: 10,
        waveDistortion: 0,
        chromaticAberration: 0,
        bloom: 0,
        blur: 0,
        motionBlur: 0,
      };
    case 'medium':
      return {
        agentCount: 1600,
        diffusionFreq: 6,
        waveDistortion: 0,
        chromaticAberration: 0,
        bloom: 0.1,
        blur: 0.5,
        motionBlur: 0.1,
      };
    case 'high':
      return {
        agentCount: 2400,
        diffusionFreq: 3,
        waveDistortion: 0,
        chromaticAberration: 0,
        bloom: 0.2,
        blur: 1,
        motionBlur: 0.3,
      };
    case 'ultra':
      return {
        agentCount: 3600,
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
  engine: MusicReactiveEngine | MusicReactiveEcosystemEngine;

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
  updateUniversalResonanceParams: (params: DeepPartial<ResonanceOikosParams>) => void;
  updateUniversalAudioParams: (params: Partial<MusicMappingParameters>) => void;

  updateSpeciesPhysicalParams: (species: AgentType, params: Partial<PhysicalOikosParams>) => void;
  updateSpeciesSemioticParams: (species: AgentType, params: Partial<SemioticOikosParams>) => void;
  updateSpeciesTemporalParams: (species: AgentType, params: Partial<SpeciesTemporalParams>) => void;
  updateSpeciesResonanceParams: (species: AgentType, params: DeepPartial<ResonanceOikosParams>) => void;
  updateSpeciesAudioParams: (species: AgentType, params: Partial<MusicMappingParameters>) => void;

  // Context-aware updates (based on current activeSpeciesScope)
  updatePhysicalParams: (params: Partial<PhysicalOikosParams>) => void;
  updateSemioticParams: (params: Partial<SemioticOikosParams>) => void;
  updateTemporalParams: (params: Partial<SpeciesTemporalParams>) => void;
  updateResonanceParams: (params: DeepPartial<ResonanceOikosParams>) => void;
  updateAudioParams: (params: Partial<MusicMappingParameters>) => void;

  // Global updates
  updateGlobalTemporalParams: (params: Partial<AllParameters['globalTemporal']>) => void;
  updateVisualizationParams: (params: DeepPartial<AllParameters['visualization']>) => void;
  updateEffectsParams: (params: Partial<AllParameters['effects']>) => void;
  updatePerformanceParams: (params: Partial<AllParameters['performance']>) => void;
  updateModelParams: (params: DeepPartial<ModelParams>) => void;
  updatePerformanceMetrics: (metrics: Partial<PerformanceMetrics>) => void;
  applyQualityPreset: (preset: QualityPreset) => void;

  // UI actions
  setActiveSpeciesScope: (scope: SpeciesScope) => void;
  setActiveOikosTab: (tab: OikosTab) => void;
  setControlPanelOpen: (open: boolean) => void;
  toggleControlPanel: () => void;
  setSimulationSpeed: (speed: number) => void;
  setPlaybackSpeed: (speed: number) => void;
  setAspectRatio: (ratio: AspectRatio) => void;

  // Simulation
  tick: () => void;
  performAutoOptimization: () => void;

  // Preset Export/Import
  exportCurrentPreset: (presetName?: string) => void;
  importPresetFromFile: (file: File) => Promise<{ success: boolean; error?: string }>;
}

const GRID_SIZE = 400;

// Helper: Create the appropriate engine based on ecosystem mode
function createEngine(params: AllParameters, gridWidth: number = GRID_SIZE, gridHeight: number = GRID_SIZE): MusicReactiveEngine | MusicReactiveEcosystemEngine {
  const ecosystemMode = params.ecosystemMode || false;

  if (ecosystemMode) {
    const ecosystemEngine = new MusicReactiveEcosystemEngine(gridWidth, gridHeight);
    ecosystemEngine.setParameters(params);
    ecosystemEngine.initializeEcosystem(params);
    return ecosystemEngine;
  } else {
    const engine = new MusicReactiveEngine(gridWidth, gridHeight);
    engine.setParameters(params);
    engine.initializeAgents(params.globalTemporal.agentCount);
    return engine;
  }
}

export const useSimulationStore = create<SimulationStore>((set, get) => {
  // Create initial engine instance
  const engine = createEngine(defaultParameters, GRID_SIZE);

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
      playbackSpeed: 1.0,
      aspectRatio: '1:1',
    },

    // Basic actions
    setRunning: (running: boolean) => set({ running }),
    toggleRunning: () => set((state) => ({ running: !state.running })),

    reset: () => {
      const { engine: currentEngine, parameters } = get();
      currentEngine.setParameters(parameters);
      currentEngine.reset();
      set({
        frameCount: 0,
        agents: currentEngine.getAgents(),
        trails: currentEngine.getTrails(),
        running: false,
      });
    },

    setParameters: (params: Partial<AllParameters>) => {
      const currentParams = get().parameters;

      // Helper to deep merge resonance params including interactionMatrix
      const mergeResonance = (current: any, update: any) => {
        const merged = { ...current, ...update };
        // Deep copy interactionMatrix if present
        if (current.interactionMatrix || update?.interactionMatrix) {
          merged.interactionMatrix = {
            ...(current.interactionMatrix || {}),
            ...(update?.interactionMatrix || {}),
          };
        }
        return merged;
      };

      // Helper to deep merge visualization params including nested color objects
      const mergeVisualization = (current: any, update: any) => {
        const merged = { ...current, ...update };
        // Deep copy color objects if present
        if (update?.colorRed) merged.colorRed = { ...update.colorRed };
        if (update?.colorGreen) merged.colorGreen = { ...update.colorGreen };
        if (update?.colorBlue) merged.colorBlue = { ...update.colorBlue };
        if (update?.colorBg) merged.colorBg = { ...update.colorBg };
        // Deep merge hueCycling (don't overwrite whole object)
        if (current.hueCycling || update?.hueCycling) {
          merged.hueCycling = {
            ...(current.hueCycling || {}),
            ...(update?.hueCycling || {}),
          };
        }
        return merged;
      };

      // Helper to deep merge model params including m2 and m3
      const mergeModelParams = (current: any, update: any) => {
        const merged = { ...current, ...update };
        // Deep copy m2 and m3 if present
        if (current.m2 || update?.m2) {
          merged.m2 = { ...(current.m2 || {}), ...(update?.m2 || {}) };
        }
        if (current.m3 || update?.m3) {
          merged.m3 = { ...(current.m3 || {}), ...(update?.m3 || {}) };
        }
        return merged;
      };

      const newParams: AllParameters = {
        ...currentParams,
        ...params,
        universal: {
          physical: { ...currentParams.universal.physical, ...(params.universal?.physical || {}) },
          semiotic: { ...currentParams.universal.semiotic, ...(params.universal?.semiotic || {}) },
          temporal: { ...currentParams.universal.temporal, ...(params.universal?.temporal || {}) },
          resonance: mergeResonance(currentParams.universal.resonance, params.universal?.resonance),
          audio: { ...currentParams.universal.audio, ...(params.universal?.audio || {}) },
        },
        species: {
          red: {
            physical: { ...currentParams.species.red.physical, ...(params.species?.red?.physical || {}) },
            semiotic: { ...currentParams.species.red.semiotic, ...(params.species?.red?.semiotic || {}) },
            temporal: { ...currentParams.species.red.temporal, ...(params.species?.red?.temporal || {}) },
            resonance: mergeResonance(currentParams.species.red.resonance, params.species?.red?.resonance),
            audio: { ...currentParams.species.red.audio, ...(params.species?.red?.audio || {}) },
          },
          green: {
            physical: { ...currentParams.species.green.physical, ...(params.species?.green?.physical || {}) },
            semiotic: { ...currentParams.species.green.semiotic, ...(params.species?.green?.semiotic || {}) },
            temporal: { ...currentParams.species.green.temporal, ...(params.species?.green?.temporal || {}) },
            resonance: mergeResonance(currentParams.species.green.resonance, params.species?.green?.resonance),
            audio: { ...currentParams.species.green.audio, ...(params.species?.green?.audio || {}) },
          },
          blue: {
            physical: { ...currentParams.species.blue.physical, ...(params.species?.blue?.physical || {}) },
            semiotic: { ...currentParams.species.blue.semiotic, ...(params.species?.blue?.semiotic || {}) },
            temporal: { ...currentParams.species.blue.temporal, ...(params.species?.blue?.temporal || {}) },
            resonance: mergeResonance(currentParams.species.blue.resonance, params.species?.blue?.resonance),
            audio: { ...currentParams.species.blue.audio, ...(params.species?.blue?.audio || {}) },
          },
        },
        globalTemporal: { ...currentParams.globalTemporal, ...(params.globalTemporal || {}) },
        visualization: mergeVisualization(currentParams.visualization, params.visualization),
        effects: { ...currentParams.effects, ...(params.effects || {}) },
        performance: { ...currentParams.performance, ...(params.performance || {}) },
        modelParams: mergeModelParams(currentParams.modelParams, params.modelParams),
        ecosystemMode: params.ecosystemMode !== undefined ? params.ecosystemMode : currentParams.ecosystemMode,
        ecosystem: params.ecosystem ? { ...currentParams.ecosystem, ...params.ecosystem } : currentParams.ecosystem,
      };

      // Check if ecosystem mode changed - if so, recreate engine
      const oldEcosystemMode = currentParams.ecosystemMode || false;
      const newEcosystemMode = newParams.ecosystemMode || false;

      if (oldEcosystemMode !== newEcosystemMode) {
        // Ecosystem mode changed - create new engine
        const { engine: oldEngine } = get();
        const newEngine = createEngine(newParams, GRID_SIZE);

        // Help GC by clearing old engine reference
        // (Engines don't have explicit cleanup, but clearing refs helps)
        if (oldEngine) {
          debug.log('Store', 'Ecosystem mode changed, replacing engine');
        }

        set({
          parameters: newParams,
          engine: newEngine,
          agents: newEngine.getAgents(),
          trails: newEngine.getTrails(),
          frameCount: 0,
        });
      } else {
        // Same mode - just update parameters
        const { engine: currentEngine } = get();
        currentEngine.setParameters(newParams);

        set({ parameters: newParams });
      }
    },

    loadPreset: (params: AllParameters) => {
      const { engine: currentEngine } = get();
      currentEngine.setParameters(params);
      currentEngine.reset();

      set({
        parameters: params,
        frameCount: 0,
        agents: currentEngine.getAgents(),
        trails: currentEngine.getTrails(),
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
      const currentResonance = current.universal.resonance;
      const updatedResonance = { ...currentResonance, ...params } as ResonanceOikosParams;
      // Deep merge interactionMatrix if present
      if (params.interactionMatrix) {
        updatedResonance.interactionMatrix = {
          ...currentResonance.interactionMatrix,
          ...params.interactionMatrix
        } as ResonanceOikosParams['interactionMatrix'];
      }
      get().setParameters({
        universal: {
          ...current.universal,
          resonance: updatedResonance,
        },
      });
    },

    updateUniversalAudioParams: (params) => {
      const current = get().parameters;
      get().setParameters({
        universal: {
          ...current.universal,
          audio: { ...current.universal.audio, ...params },
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
      const currentResonance = speciesParams.resonance || current.universal.resonance;
      const updatedResonance = { ...currentResonance, ...params } as ResonanceOikosParams;
      // Deep merge interactionMatrix if present
      if (params.interactionMatrix) {
        updatedResonance.interactionMatrix = {
          ...currentResonance.interactionMatrix,
          ...params.interactionMatrix
        } as ResonanceOikosParams['interactionMatrix'];
      }
      get().setParameters({
        species: {
          ...current.species,
          [species]: {
            ...speciesParams,
            resonance: updatedResonance,
          },
        },
      });
    },

    updateSpeciesAudioParams: (species, params) => {
      const current = get().parameters;
      const speciesParams = current.species[species];
      get().setParameters({
        species: {
          ...current.species,
          [species]: {
            ...speciesParams,
            audio: { ...speciesParams.audio, ...params },
          },
        },
      });
    },

    // Context-aware updates (based on activeSpeciesScope)
    updatePhysicalParams: (params) => {
      const { ui } = get();
      const scope = ui.activeSpeciesScope;
      if (scope === 'universal') {
        get().updateUniversalPhysicalParams(params);
      } else {
        get().updateSpeciesPhysicalParams(scope, params);
      }
    },

    updateSemioticParams: (params) => {
      const { ui } = get();
      const scope = ui.activeSpeciesScope;
      if (scope === 'universal') {
        get().updateUniversalSemioticParams(params);
      } else {
        get().updateSpeciesSemioticParams(scope, params);
      }
    },

    updateTemporalParams: (params) => {
      const { ui } = get();
      const scope = ui.activeSpeciesScope;
      if (scope === 'universal') {
        get().updateUniversalTemporalParams(params);
      } else {
        get().updateSpeciesTemporalParams(scope, params);
      }
    },

    updateResonanceParams: (params) => {
      const { ui } = get();
      const scope = ui.activeSpeciesScope;
      if (scope === 'universal') {
        get().updateUniversalResonanceParams(params);
      } else {
        get().updateSpeciesResonanceParams(scope, params);
      }
    },

    updateAudioParams: (params) => {
      const { ui } = get();
      const scope = ui.activeSpeciesScope;
      if (scope === 'universal') {
        get().updateUniversalAudioParams(params);
      } else {
        get().updateSpeciesAudioParams(scope, params);
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
        const { engine: currentEngine } = get();
        currentEngine.initializeAgents(params.agentCount);
        set({ agents: currentEngine.getAgents() });
      }
    },

    updateVisualizationParams: (params) => {
      const current = get().parameters;
      const currentViz = current.visualization;
      const updatedViz = { ...currentViz, ...params } as AllParameters['visualization'];
      // Deep merge color objects if present
      if (params.colorRed) {
        updatedViz.colorRed = { ...currentViz.colorRed, ...params.colorRed } as AllParameters['visualization']['colorRed'];
      }
      if (params.colorGreen) {
        updatedViz.colorGreen = { ...currentViz.colorGreen, ...params.colorGreen } as AllParameters['visualization']['colorGreen'];
      }
      if (params.colorBlue) {
        updatedViz.colorBlue = { ...currentViz.colorBlue, ...params.colorBlue } as AllParameters['visualization']['colorBlue'];
      }
      if (params.colorBg) {
        updatedViz.colorBg = { ...currentViz.colorBg, ...params.colorBg } as AllParameters['visualization']['colorBg'];
      }
      // Deep merge hueCycling if present
      if (params.hueCycling) {
        updatedViz.hueCycling = { ...currentViz.hueCycling, ...params.hueCycling } as AllParameters['visualization']['hueCycling'];
      }
      get().setParameters({
        visualization: updatedViz,
      });
    },

    updateEffectsParams: (params) => {
      const current = get().parameters;
      get().setParameters({
        effects: { ...current.effects, ...params },
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

    updateModelParams: (params) => {
      const current = get().parameters;
      const currentModelParams = current.modelParams;
      const updatedModelParams = { ...currentModelParams, ...params } as ModelParams;
      // Deep merge m2 and m3 if present
      if (params.m2) {
        updatedModelParams.m2 = { ...currentModelParams.m2, ...params.m2 } as ModelParams['m2'];
      }
      if (params.m3) {
        updatedModelParams.m3 = { ...currentModelParams.m3, ...params.m3 } as ModelParams['m3'];
      }
      const newParams = {
        ...current,
        modelParams: updatedModelParams,
      } as AllParameters;

      // Update engine and reinitialize agents (model change requires reset)
      const { engine: currentEngine } = get();
      currentEngine.setParameters(newParams);
      currentEngine.initializeAgents(newParams.globalTemporal.agentCount);

      set({
        parameters: newParams,
        frameCount: 0,
        agents: currentEngine.getAgents(),
        trails: currentEngine.getTrails(),
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

      debug.log('Quality Preset', `Applied "${preset}" preset:`, settings);
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
        debug.log('Auto-Optimizer', `FPS critical (${avgFPS.toFixed(1)}/${targetFPS}), jumping opt level: ${_currentOptLevel} → ${newOptLevel}`);
      } else if (fpsRatio < 0.7 && newOptLevel < 10) {
        newOptLevel = Math.min(10, _currentOptLevel + 2);
        debug.log('Auto-Optimizer', `FPS very low (${avgFPS.toFixed(1)}/${targetFPS}), increasing opt level: ${_currentOptLevel} → ${newOptLevel}`);
      } else if (fpsRatio < 0.9 && newOptLevel < 10) {
        newOptLevel = Math.min(10, _currentOptLevel + 1);
        debug.log('Auto-Optimizer', `FPS low (${avgFPS.toFixed(1)}/${targetFPS}), increasing opt level: ${_currentOptLevel} → ${newOptLevel}`);
      } else if (fpsRatio > 1.2 && newOptLevel > 0) {
        newOptLevel = Math.max(0, _currentOptLevel - 1);
        debug.log('Auto-Optimizer', `FPS good (${avgFPS.toFixed(1)}/${targetFPS}), decreasing opt level: ${_currentOptLevel} → ${newOptLevel}`);
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

    setPlaybackSpeed: (speed) => {
      set((state) => ({
        ui: { ...state.ui, playbackSpeed: speed },
      }));
    },

    setAspectRatio: (ratio) => {
      const { parameters, engine: oldEngine } = get();
      const { width, height } = calculateGridDimensions(ratio);

      // Recreate engine with new grid dimensions
      const newEngine = createEngine(parameters, width, height);

      // Help GC by logging engine replacement
      if (oldEngine) {
        debug.log('Store', `Aspect ratio changed to ${ratio}, replacing engine (grid: ${width}x${height})`);
      }

      set((state) => ({
        ui: { ...state.ui, aspectRatio: ratio },
        engine: newEngine,
        agents: newEngine.getAgents(),
        trails: newEngine.getTrails(),
      }));
    },

    // Simulation tick
    tick: () => {
      const { engine: currentEngine, running } = get();

      if (!running) return;

      currentEngine.update();

      // Only update frameCount - trails and agents are read directly from engine for performance
      set({
        frameCount: currentEngine.getFrameCount(),
      });
    },

    // Preset Export/Import
    exportCurrentPreset: (presetName = 'custom-preset') => {
      const { parameters } = get();
      exportPresetAsJSON(parameters, presetName);
    },

    importPresetFromFile: async (file: File) => {
      debug.log('Store', 'importPresetFromFile called with:', file.name);
      const { preset, error } = await importPresetFromJSON(file);

      debug.log('Store', 'Import result:', { hasPreset: !!preset, hasError: !!error });

      if (error) {
        debug.error('Store', 'Import failed with error:', error);
        return { success: false, error };
      }

      if (preset && preset.parameters) {
        debug.log('Store', 'Loading preset parameters...');
        const { loadPreset } = get();
        loadPreset(preset.parameters);
        debug.log('Store', 'Preset loaded successfully');
        return { success: true };
      }

      debug.error('Store', 'Invalid preset format: preset or parameters missing');
      return { success: false, error: 'Ungültiges Preset-Format' };
    },
  };
});
