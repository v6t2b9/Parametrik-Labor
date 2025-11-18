// Core Type Definitions for Parametric Space Explorer

// Export ecosystem types
export * from './ecosystem.js';

export type AgentType = 'red' | 'green' | 'blue';

// Complex number type for quantum amplitudes
export interface ComplexNumber {
  re: number;  // Real part
  im: number;  // Imaginary part
}

// Quantum state amplitudes for direction choices
export interface QuantumAmplitudes {
  left: ComplexNumber;
  forward: ComplexNumber;
  right: ComplexNumber;
}

// Context mode for M2 (classical + context-switching)
export type ContextMode = 'explore' | 'exploit';

export interface Agent {
  x: number;
  y: number;
  angle: number;
  type: AgentType;
  rhythmPhase: number;

  // M2: Context-switching state
  contextMode?: ContextMode;

  // M3: Quantum-inspired state
  quantumAmplitudes?: QuantumAmplitudes;
  internalPhase?: number;  // For phase evolution
}

export interface Trails {
  red: Float32Array;
  green: Float32Array;
  blue: Float32Array;
}

// Pheromone phase data for M3 (quantum-inspired model)
export interface PheromonePhases {
  red: Float32Array;
  green: Float32Array;
  blue: Float32Array;
}

export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

// Parameter Definitions organized by Oikos dimensions
export interface PhysicalOikosParams {
  decayRate: number;        // 0.85-0.999: Temporal persistence of traces
  diffusionFreq: number;    // 0-10: Spatial spread frequency
  fadeStrength: number;     // 0.05-0.3: Acceleration of forgetting
  trailSaturation: number;  // 100-255: Environmental capacity limits
}

export interface SemioticOikosParams {
  sensorDist: number;       // 10-40: Perceptual range
  sensorAngle: number;      // 0.2-1.2: Field of view (radians)
  deposit: number;          // 5-30: Trace intensity
  turnSpeed: number;        // 0.1-1.0: Response agility (radians)
}

// Global temporal params (not species-specific)
export interface GlobalTemporalParams {
  agentCount: number;       // 500-10000: Total agent count (all species)
  simulationSpeed: number;  // 0.1-5.0: Global time scale multiplier
}

// Species-specific temporal params
export interface SpeciesTemporalParams {
  speed: number;            // 0.5-3.0: Rate of change
  chaosInterval: number;    // 0-500: Periodic destabilization (0 = off)
  chaosStrength: number;    // 0.1-1.0: Perturbation intensity
}

// Combined temporal params (for backwards compatibility and convenience)
export interface TemporalOikosParams extends GlobalTemporalParams, SpeciesTemporalParams {}

// Species Interaction Matrix (3×3)
export interface SpeciesInteractionMatrix {
  redToRed: number;     // -2.0 to 2.0
  redToGreen: number;   // -2.0 to 2.0
  redToBlue: number;    // -2.0 to 2.0
  greenToRed: number;   // -2.0 to 2.0
  greenToGreen: number; // -2.0 to 2.0
  greenToBlue: number;  // -2.0 to 2.0
  blueToRed: number;    // -2.0 to 2.0
  blueToGreen: number;  // -2.0 to 2.0
  blueToBlue: number;   // -2.0 to 2.0
}

export interface ResonanceOikosParams {
  attractionStrength: number;       // -2.0-2.0: Same-type reinforcement (baseline)
  repulsionStrength: number;        // -2.0-2.0: Cross-type influence (baseline)
  crossSpeciesInteraction: boolean; // Enable/disable cross-species
  interactionMatrix: SpeciesInteractionMatrix; // Fine-grained 3×3 species interactions
}

// Stigmergy model types for computational validation
export type StigmergyModel = 'M1' | 'M2' | 'M3';

// M2: Context-switching parameters
export interface ContextSwitchingParams {
  highThreshold: number;      // 50-200: Density to switch to exploit
  lowThreshold: number;       // 10-50: Density to switch to explore
  explorationNoise: number;   // 0.1-1.0: Noise magnitude in explore mode
}

// M3: Quantum-inspired parameters
export interface QuantumParams {
  phaseRotationRate: number;  // 0.001-0.01: How fast trails "age"
  amplitudeCoupling: number;  // 0.05-0.3: Coupling between directions
  contextThreshold: number;   // 100-500: Food collected before context switch
  phaseNoise: number;         // 0.01-0.1: Environmental phase fluctuations
}

// Model selection and parameters
export interface ModelParams {
  model: StigmergyModel;      // M1, M2, or M3
  m2: ContextSwitchingParams; // Parameters for M2
  m3: QuantumParams;          // Parameters for M3
}

// Species-specific parameter overrides (all optional)
export interface SpeciesParameterSet {
  physical?: Partial<PhysicalOikosParams>;
  semiotic?: Partial<SemioticOikosParams>;
  temporal?: Partial<SpeciesTemporalParams>;
  resonance?: Partial<ResonanceOikosParams>;
  audio?: Partial<import('./musicMappings').MusicMappingParameters>;
}

// Universal parameter set (complete, serves as fallback)
export interface UniversalParameterSet {
  physical: PhysicalOikosParams;
  semiotic: SemioticOikosParams;
  temporal: SpeciesTemporalParams;
  resonance: ResonanceOikosParams;
  audio: import('./musicMappings').MusicMappingParameters;
}

export type BlendMode = 'additive' | 'average' | 'multiply' | 'screen';

export interface HueCyclingParams {
  enabled: boolean;         // Enable/disable hue cycling
  startHue: number;         // 0-360: Starting hue value
  endHue: number;           // 0-360: Ending hue value
  speed: number;            // 0.1-10: Cycle speed (lower = slower)
}

export interface VisualizationParams {
  brightness: number;       // 0.5-5.0: Output brightness
  blendMode: BlendMode;     // Color blending mode
  trailIntensity: number;   // 100-300: Trail visibility threshold
  colorRed: RGBColor;       // Red channel color
  colorGreen: RGBColor;     // Green channel color
  colorBlue: RGBColor;      // Blue channel color
  colorBg: RGBColor;        // Background color
  showAgents: boolean;      // Show agents in Lab Mode (false = pure lavalamp)
  useTriangles: boolean;    // Show agents as directional triangles (true) or dots (false)
  hueCycling: HueCyclingParams; // Hue cycling animation
}

export interface EffectsParams {
  // Blur & Glow
  blur: number;              // 0-20px: Gaussian blur radius
  bloom: number;             // 0-1: Additive glow/bloom strength

  // Color Grading
  saturation: number;        // 0-3: Color saturation (1 = normal)
  contrast: number;          // 0-3: Contrast (1 = normal)
  hueShift: number;          // 0-360: Hue rotation in degrees

  // Motion & Trails
  motionBlur: number;        // 0-0.95: Frame persistence (ghosting)

  // Atmospheric
  vignette: number;          // 0-1: Edge darkening strength

  // Psychedelic/Distortion
  chromaticAberration: number; // 0-15px: RGB channel offset
  waveDistortion: number;      // 0-1: Sine wave amplitude

  // Retro/Lo-Fi
  scanlines: number;         // 0-1: CRT scanline effect strength
  pixelation: number;        // 1-16: Pixelation/downsampling factor (1 = none)
}

export type QualityPreset = 'low' | 'medium' | 'high' | 'ultra';

export interface PerformanceParams {
  // Simple Controls
  autoOptimize: boolean;        // Enable/disable auto-optimizer
  targetFPS: number;            // 30-120: Desired FPS target
  qualityPreset: QualityPreset; // Quick quality settings

  // Auto-Optimizer State (internal, not for UI)
  _currentOptLevel: number;     // 0-10: Current optimization level (0 = no opt, 10 = max opt)
}

export interface PerformanceMetrics {
  currentFPS: number;
  avgFPS: number;
  minFPS: number;
  maxFPS: number;
  frameTime: number;           // ms per frame
  tickTime: number;            // ms for engine update
  renderTime: number;          // ms for rendering
}

// New matrix-based parameter structure
export interface AllParameters {
  // Universal defaults (cross-species baseline)
  universal: UniversalParameterSet;

  // Species-specific overrides
  species: {
    red: SpeciesParameterSet;
    green: SpeciesParameterSet;
    blue: SpeciesParameterSet;
  };

  // Global temporal params (not species-specific)
  globalTemporal: GlobalTemporalParams;

  // Global (visual/technical) params
  visualization: VisualizationParams;
  effects: EffectsParams;
  performance: PerformanceParams;

  // Quantum-inspired stigmergy model selection
  modelParams: ModelParams;

  // Ecosystem configuration (optional, for ecosystem mode)
  ecosystem?: import('./ecosystem.js').EcologyConfig;
  ecosystemMode?: boolean; // Toggle between stigmergy and ecosystem mode
}

// Helper type for resolved parameters (after merging universal + species)
export interface ResolvedSpeciesParams {
  physical: PhysicalOikosParams;
  semiotic: SemioticOikosParams;
  temporal: SpeciesTemporalParams;
  resonance: ResonanceOikosParams;
  audio: import('./musicMappings').MusicMappingParameters;
}

// Preset Definition
export interface Preset {
  name: string;
  icon: string;
  description: string;
  parameters: AllParameters | any; // Allow legacy format
}

// Simulation State
export interface SimulationState {
  running: boolean;
  frameCount: number;
  agents: Agent[];
  trails: Trails;
  gridSize: number;
  canvasSize: number;
}

// Emergent Properties (for Phase 2 - Metrics)
export interface EmergentProperties {
  clustering: number;      // 0-100
  separation: number;      // 0-100
  stability: number;       // 0-100
  chaos: number;          // 0-100
  network: number;        // 0-100
  fluidity: number;       // 0-100
  crystallinity: number;  // 0-100
  density: number;        // 0-100
}

// UI State - Matrix Navigation
export type SpeciesScope = 'universal' | 'red' | 'green' | 'blue';
export type OikosTab = 'presets' | 'model' | 'physical' | 'semiotic' | 'resonance' | 'audio' | 'visuals' | 'performance' | 'ecosystem';

// Aspect Ratio options
export type AspectRatio = '1:1' | '16:9' | '9:16' | '3:2' | '2:3' | '4:3' | '3:4' | '21:9' | '9:21';

export interface UIState {
  // Matrix navigation
  activeSpeciesScope: SpeciesScope;  // Vertical axis (Universal / Red / Green / Blue)
  activeOikosTab: OikosTab;          // Horizontal axis (Physical / Semiotic / etc.)

  // Mobile UI
  controlPanelOpen: boolean;         // Drawer state on mobile

  // Legacy
  simulationSpeed: number;           // 1x, 2x, 5x, etc.

  // Playback speed (overall animation speed multiplier)
  playbackSpeed: number;             // 0.1x to 2x, controls frame rate

  // Canvas aspect ratio
  aspectRatio: AspectRatio;          // Canvas dimensions ratio
}
