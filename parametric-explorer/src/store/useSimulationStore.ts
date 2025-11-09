import { create } from 'zustand';
import type { AllParameters, Agent, Trails, UIState } from '../types/index.js';
import { defaultParameters } from '../presets';
import { SimulationEngine } from '../engine/SimulationEngine';

interface SimulationStore {
  // Simulation state
  running: boolean;
  frameCount: number;
  agents: Agent[];
  trails: Trails;
  engine: SimulationEngine;

  // Parameters
  parameters: AllParameters;

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
  setActiveOikosTab: (tab: UIState['activeOikosTab']) => void;
  setSimulationSpeed: (speed: number) => void;
  tick: () => void; // Called on each animation frame
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
