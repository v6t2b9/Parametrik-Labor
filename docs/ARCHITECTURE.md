# Architecture Overview

This document provides a comprehensive overview of the Parametrik-Labor architecture, design patterns, and technical implementation details.

## Table of Contents

- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Component Architecture](#component-architecture)
- [State Management](#state-management)
- [Simulation Engine](#simulation-engine)
- [Rendering System](#rendering-system)
- [PWA Architecture](#pwa-architecture)
- [Data Flow](#data-flow)
- [Performance Considerations](#performance-considerations)
- [Design Patterns](#design-patterns)
- [Security](#security)

---

## System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser Layer                         │
│  ┌────────────┐  ┌────────────┐  ┌──────────────────────┐  │
│  │   PWA      │  │  Service   │  │   IndexedDB/         │  │
│  │  Manifest  │  │   Worker   │  │   LocalStorage       │  │
│  └────────────┘  └────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                             │
┌─────────────────────────────────────────────────────────────┐
│                     Application Layer                        │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              React Component Tree                    │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │  MatrixControlCenter (Root Layout)           │  │   │
│  │  │  ├── ControlBar                              │  │   │
│  │  │  ├── CanvasPanel                             │  │   │
│  │  │  └── ParameterControlCenter                  │  │   │
│  │  │      ├── ModelOikosPanel                     │  │   │
│  │  │      ├── PhysicalOikosPanel                  │  │   │
│  │  │      ├── SemioticOikosPanel                  │  │   │
│  │  │      ├── TemporalOikosPanel                  │  │   │
│  │  │      ├── ResonanceOikosPanel                 │  │   │
│  │  │      ├── VisualsOikosPanel                   │  │   │
│  │  │      ├── EffectsOikosPanel                   │  │   │
│  │  │      └── PerformanceOikosPanel               │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
│                             │                                │
│  ┌─────────────────────────▼─────────────────────────┐     │
│  │         Zustand State Management                   │     │
│  │  ┌──────────────────────────────────────────────┐ │     │
│  │  │  Parameters (numAgents, sensorAngle, etc.)   │ │     │
│  │  │  Simulation State (isRunning, isPaused)      │ │     │
│  │  │  UI State (aspectRatio, fullscreen, etc.)    │ │     │
│  │  │  Actions (setParameter, reset, loadPreset)   │ │     │
│  │  └──────────────────────────────────────────────┘ │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                             │
┌─────────────────────────────────────────────────────────────┐
│                      Engine Layer                            │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         QuantumStigmergyEngine                       │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │  Agent System                                 │  │   │
│  │  │  - Position, direction, velocity              │  │   │
│  │  │  - Sensing (pheromone detection)              │  │   │
│  │  │  - Steering (turn logic)                      │  │   │
│  │  │  - Movement (position update)                 │  │   │
│  │  │  - Deposition (trail creation)                │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  │  ┌──────────────────────────────────────────────┘  │   │
│  │  │  Trail System                                 │  │   │
│  │  │  - Trail map (Float32Array)                   │  │   │
│  │  │  - Decay function                             │  │   │
│  │  │  - Diffusion (optional)                       │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  │  ┌──────────────────────────────────────────────┘  │   │
│  │  │  Model Logic (M1/M2/M3)                       │  │   │
│  │  │  - M1: Classical stigmergy                    │  │   │
│  │  │  - M2: Context switching                      │  │   │
│  │  │  - M3: Quantum superposition & interference   │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              ComplexMath                             │   │
│  │  - Complex number operations                         │   │
│  │  - Phase rotation                                    │   │
│  │  - Amplitude coupling                                │   │
│  │  - Interference calculations                         │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                             │
┌─────────────────────────────────────────────────────────────┐
│                    Rendering Layer                           │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         WebGLTrailRenderer                           │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │  WebGL Context                                │  │   │
│  │  │  Vertex Shader (quad positions)               │  │   │
│  │  │  Fragment Shader (trail coloring)             │  │   │
│  │  │  Texture (trail data)                         │  │   │
│  │  │  Blend modes (additive, multiply, etc.)       │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         Canvas 2D (Agent Rendering)                  │   │
│  │  - Agent positions drawn as points                   │   │
│  │  - Overlaid on WebGL trail layer                     │   │
│  │  - Post-processing effects applied                   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                             │
┌─────────────────────────────────────────────────────────────┐
│                      Export Layer                            │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │  Screenshot  │  │  GIF Export  │  │  WebM Export    │  │
│  │  (Canvas)    │  │  (Worker)    │  │  (MediaRecorder)│  │
│  └──────────────┘  └──────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Core Technologies

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **UI Framework** | React | 19.1.1 | Component-based UI |
| **Language** | TypeScript | 5.9.3 | Type-safe development |
| **State Management** | Zustand | 5.0.8 | Lightweight state store |
| **Build Tool** | Vite | 7.1.7 | Fast build & HMR |
| **Rendering** | Canvas 2D + WebGL | Native | High-performance graphics |
| **PWA** | vite-plugin-pwa | 1.1.0 | Service worker & manifest |
| **Export** | gif.js.optimized | 1.0.1 | GIF encoding |

### Development Tools

- **ESLint**: Code quality and consistency
- **TypeScript ESLint**: TypeScript-specific linting
- **React Hooks ESLint**: React hooks best practices
- **Sharp**: Icon generation (dev dependency)

---

## Component Architecture

### Component Hierarchy

```
App
└── MatrixControlCenter (Main Layout)
    ├── ControlBar (Top bar with global controls)
    │   ├── Preset selector
    │   ├── Play/Pause/Reset
    │   ├── Aspect ratio selector
    │   ├── Export controls
    │   └── Fullscreen toggle
    │
    ├── CanvasPanel (Visualization)
    │   ├── Canvas element (rendering)
    │   ├── WebGL trail renderer
    │   ├── Animation loop (RAF)
    │   └── Export logic
    │
    └── ParameterControlCenter (Drawer/Panels)
        ├── PresetGallery (Quick presets)
        ├── ModelOikosPanel (M1/M2/M3 selection)
        ├── PhysicalOikosPanel (Basic physics)
        ├── SemioticOikosPanel (Semiotic params)
        ├── TemporalOikosPanel (Time-related)
        ├── ResonanceOikosPanel (Quantum params)
        ├── VisualsOikosPanel (Visual settings)
        ├── EffectsOikosPanel (Post-processing)
        └── PerformanceOikosPanel (FPS, resolution)
```

### Component Patterns

**Functional Components with Hooks:**
```typescript
function CanvasPanel() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<QuantumStigmergyEngine>()

  // Subscribe to specific state slices
  const numAgents = useStore(state => state.numAgents)
  const isRunning = useStore(state => state.isRunning)

  useEffect(() => {
    // Initialize engine
  }, [])

  return <canvas ref={canvasRef} />
}
```

**Parameter Slider Pattern:**
```typescript
<ParameterSlider
  label="Sensor Angle"
  value={sensorAngle}
  min={0}
  max={Math.PI}
  step={0.01}
  onChange={(v) => setParameter('sensorAngle', v)}
  unit="rad"
/>
```

---

## State Management

### Zustand Store Structure

**Location:** `src/store/useStore.ts`

```typescript
interface SimulationStore {
  // Model Selection
  currentModel: 'M1' | 'M2' | 'M3'

  // Physical Parameters
  numAgents: number
  sensorAngle: number
  sensorDistance: number
  turnSpeed: number
  moveSpeed: number
  depositAmount: number
  decayRate: number

  // Semiotic Parameters
  trailWeight: number
  // ...

  // Quantum Parameters (M3)
  phaseRotationSpeed: number
  amplitudeCoupling: number
  superpositionStrength: number
  interferencePattern: number

  // Simulation State
  isRunning: boolean
  isPaused: boolean
  currentPreset: string | null

  // UI State
  aspectRatio: string
  fullscreen: boolean
  showStats: boolean
  exportFormat: 'screenshot' | 'gif' | 'webm'
  exportDuration: number

  // Visual Settings
  blendMode: 'additive' | 'average' | 'multiply' | 'screen'
  colorHue: number
  trailIntensity: number

  // Performance
  targetFPS: number
  devicePixelRatio: number

  // Actions
  setParameter: (key: string, value: any) => void
  reset: () => void
  loadPreset: (preset: Partial<SimulationParameters>) => void
  setCurrentModel: (model: 'M1' | 'M2' | 'M3') => void
}
```

### State Update Pattern

```typescript
// Immutable updates via Zustand
const useStore = create<SimulationStore>((set) => ({
  numAgents: 5000,

  setParameter: (key, value) =>
    set((state) => ({ ...state, [key]: value })),

  reset: () => set(getDefaultState()),

  loadPreset: (preset) =>
    set((state) => ({ ...state, ...preset }))
}))
```

### Benefits of Zustand

- **Minimal boilerplate:** No providers, actions, reducers
- **Selective subscriptions:** Components only re-render when their slice changes
- **TypeScript-friendly:** Full type inference
- **Devtools support:** Redux DevTools integration
- **Small bundle size:** ~1KB gzipped

---

## Simulation Engine

### QuantumStigmergyEngine

**Location:** `src/engine/QuantumStigmergyEngine.ts`

### Agent Structure

```typescript
interface Agent {
  x: number           // Position X
  y: number           // Position Y
  angle: number       // Direction (radians)

  // M2 Context Switching
  mode?: 'explore' | 'exploit'

  // M3 Quantum State
  quantumState?: {
    phase: number           // Quantum phase
    amplitude: number       // Superposition amplitude
    coherenceTime: number   // Phase coherence
  }
}
```

### Update Loop

```typescript
class QuantumStigmergyEngine {
  private agents: Agent[]
  private trailMap: Float32Array
  private width: number
  private height: number

  update(deltaTime: number, params: SimulationParameters) {
    // 1. Sense environment
    for (const agent of this.agents) {
      const sensedValues = this.sense(agent, params)

      // 2. Decide direction
      this.turn(agent, sensedValues, params)

      // 3. Move
      this.move(agent, params, deltaTime)

      // 4. Deposit trail
      this.deposit(agent, params)
    }

    // 5. Decay trails
    this.decayTrails(params.decayRate)
  }

  private sense(agent: Agent, params: SimulationParameters): SensedData {
    // Sample trail map at sensor positions
    // Forward, left, right sensors
  }

  private turn(agent: Agent, sensed: SensedData, params: SimulationParameters) {
    // Model-specific turning logic
    // M1: Simple comparison
    // M2: Mode-dependent
    // M3: Phase-influenced
  }

  private move(agent: Agent, params: SimulationParameters, dt: number) {
    // Update position
    // Handle boundary wrapping
  }

  private deposit(agent: Agent, params: SimulationParameters) {
    // Add pheromone to trail map
    // M3: Phase-dependent deposition
  }
}
```

### Model Implementations

**M1 (Classical):**
- Standard pheromone sensing
- Turn towards higher concentration
- Uniform deposition

**M2 (Context-Switching):**
- Detect local pheromone density
- Switch between explore/exploit modes
- Mode affects turn probability

**M3 (Quantum-Inspired):**
- Agents have quantum phase
- Phase rotates over time
- Trail deposition modulated by phase
- Interference between agents
- Amplitude coupling effects

---

## Rendering System

### Hybrid Rendering Architecture

**Why Hybrid?**
- WebGL for trails: GPU acceleration, efficient texture updates
- Canvas 2D for agents: Simple point rendering, easy compositing

### WebGL Trail Rendering

**Location:** `src/components/WebGLTrailRenderer.ts`

```typescript
class WebGLTrailRenderer {
  private gl: WebGLRenderingContext
  private program: WebGLProgram
  private texture: WebGLTexture

  constructor(canvas: HTMLCanvasElement, width: number, height: number) {
    this.gl = canvas.getContext('webgl')!
    this.program = this.createShaderProgram()
    this.texture = this.createTexture(width, height)
  }

  render(trailData: Float32Array, blendMode: string, colorHue: number) {
    // Update texture with trail data
    this.gl.texImage2D(
      this.gl.TEXTURE_2D, 0, this.gl.LUMINANCE,
      width, height, 0,
      this.gl.LUMINANCE, this.gl.FLOAT,
      trailData
    )

    // Set uniforms
    this.gl.uniform1f(this.colorHueLocation, colorHue)
    this.gl.uniform1i(this.blendModeLocation, blendModeIndex)

    // Draw quad
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4)
  }
}
```

**Vertex Shader:**
```glsl
attribute vec2 position;
varying vec2 uv;

void main() {
  uv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
```

**Fragment Shader:**
```glsl
precision mediump float;
uniform sampler2D trailTexture;
uniform float colorHue;
varying vec2 uv;

void main() {
  float intensity = texture2D(trailTexture, uv).r;
  vec3 color = hslToRgb(colorHue, 0.8, intensity);
  gl_FragColor = vec4(color, intensity);
}
```

### Canvas 2D Agent Rendering

```typescript
function renderAgents(ctx: CanvasRenderingContext2D, agents: Agent[]) {
  ctx.fillStyle = '#ffffff'

  for (const agent of agents) {
    ctx.fillRect(agent.x, agent.y, 1, 1)
  }
}
```

### Post-Processing Effects

Applied sequentially after main render:

1. **Motion Blur:** Composite with previous frame
2. **Bloom:** Gaussian blur + additive blend
3. **Chromatic Aberration:** RGB channel offset
4. **Vignette:** Radial gradient overlay
5. **Scanlines:** Horizontal line pattern
6. **Pixelation:** Downscale and upscale

---

## PWA Architecture

### Service Worker Strategy

**Generated by vite-plugin-pwa** (`sw.js`)

**Caching Strategy:**
```
Precache (install):
  - index.html
  - main JS bundle
  - CSS bundle
  - Icons
  - Web app manifest

Runtime Cache (fetch):
  - External fonts (CacheFirst)
  - Images (CacheFirst)
  - API calls (NetworkFirst, if added)
```

**Update Flow:**
```
1. New version deployed
2. Service worker detects new content
3. Downloads new assets in background
4. Waits for all tabs to close
5. Activates new service worker
6. User gets fresh content on next visit
```

**Auto-Update Configuration:**
```typescript
VitePWA({
  registerType: 'autoUpdate',  // Automatically update SW
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
    navigateFallback: null,  // Don't redirect to index.html
  }
})
```

### Offline Functionality

**What Works Offline:**
- Full app functionality
- All UI interactions
- Simulations run locally
- Export to GIF/WebM/screenshot

**What Requires Online:**
- Initial load (first visit)
- Service worker updates
- External fonts (if not cached)

---

## Data Flow

### User Interaction Flow

```
User adjusts slider
  ↓
Event handler fires
  ↓
Zustand store updated (setParameter)
  ↓
Components subscribing to that parameter re-render
  ↓
Engine receives new parameters on next update cycle
  ↓
Simulation behavior changes
  ↓
Render loop draws new frame
  ↓
User sees result
```

### Render Loop Flow

```
requestAnimationFrame callback
  ↓
Calculate deltaTime
  ↓
Update engine (agent movement, trail deposit, decay)
  ↓
Get trail data from engine
  ↓
Render trails with WebGL
  ↓
Render agents with Canvas 2D
  ↓
Apply post-processing effects
  ↓
If recording: capture frame
  ↓
Schedule next frame
```

### Export Flow

**Screenshot:**
```
User clicks screenshot button
  ↓
canvas.toBlob()
  ↓
Create download link
  ↓
Trigger download
```

**GIF:**
```
User clicks record GIF
  ↓
Capture frames for N seconds
  ↓
Send frames to Web Worker (gif.js)
  ↓
Worker encodes GIF
  ↓
Worker returns blob
  ↓
Trigger download
```

**WebM:**
```
User clicks record WebM
  ↓
Start MediaRecorder on canvas stream
  ↓
Collect data chunks
  ↓
After N seconds, stop recording
  ↓
Combine chunks into blob
  ↓
Trigger download
```

---

## Performance Considerations

### Optimization Strategies

1. **WebGL for Trails:**
   - GPU-accelerated rendering
   - Texture-based trail storage
   - Efficient pixel updates

2. **Object Pooling:**
   - Reuse agent objects
   - Avoid garbage collection pauses

3. **Typed Arrays:**
   - Float32Array for trail data
   - Fast, contiguous memory

4. **Selective Rendering:**
   - Skip agents outside viewport (future)
   - LOD for distant agents (future)

5. **RAF Synchronization:**
   - Render at display refresh rate
   - Avoid unnecessary updates

6. **State Subscriptions:**
   - Zustand selective subscriptions
   - Components only re-render when needed

### Performance Metrics

**Target:**
- 60 FPS for 5,000 agents on desktop
- 30 FPS for 2,000 agents on mobile

**Bottlenecks:**
- Agent update loop (CPU)
- Trail rendering (GPU/memory bandwidth)
- Post-processing effects (GPU)

---

## Design Patterns

### Used Patterns

1. **Observer Pattern:** Zustand subscriptions
2. **Factory Pattern:** Agent creation
3. **Strategy Pattern:** Model switching (M1/M2/M3)
4. **Facade Pattern:** WebGLTrailRenderer abstracts WebGL complexity
5. **Singleton Pattern:** Engine instance per canvas
6. **Command Pattern:** Parameter updates via setParameter

### React Patterns

1. **Composition:** Small, focused components
2. **Container/Presentational:** Panels (container) + Sliders (presentational)
3. **Custom Hooks:** useAnimationFrame, useEngine (potential)
4. **Refs for Imperative:** Canvas manipulation, engine instance

---

## Security

### Current Security Measures

1. **AGPL v3 License:** Source code disclosure required
2. **HTTPS-only PWA:** Secure contexts for service workers
3. **No backend:** No server-side vulnerabilities
4. **No user data collection:** Privacy-preserving
5. **CSP-friendly:** No inline scripts (future: add CSP headers)

### Potential Security Enhancements

1. **Content Security Policy:**
   ```
   Content-Security-Policy:
     default-src 'self';
     script-src 'self';
     style-src 'self' 'unsafe-inline';
   ```

2. **Subresource Integrity:**
   - Add SRI hashes for CDN resources

3. **CORS Configuration:**
   - If adding API, configure CORS properly

---

## Future Architecture Considerations

### Potential Enhancements

1. **Web Workers for Simulation:**
   - Offload agent updates to worker thread
   - Free main thread for rendering

2. **WebGPU Migration:**
   - Compute shaders for agent updates
   - Better performance on modern hardware

3. **Streaming Data:**
   - Export long videos via streaming
   - Avoid memory constraints

4. **Modular Presets:**
   - Load presets dynamically
   - Community preset sharing

5. **Test Coverage:**
   - Unit tests for engine logic
   - Integration tests for UI
   - E2E tests for critical paths

---

## References

- [React Documentation](https://react.dev/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Vite Documentation](https://vitejs.dev/)
- [WebGL Fundamentals](https://webglfundamentals.org/)
- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

---

**Questions about architecture?** Open an issue or check [DEVELOPMENT.md](./DEVELOPMENT.md) for practical development guidance.
