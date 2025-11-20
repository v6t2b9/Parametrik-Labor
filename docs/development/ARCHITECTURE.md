# Architecture Overview

> **📚 Single Source of Truth für System-Komponenten**: Detaillierte Component-Beschreibungen findest du im [Zettelkasten](../zettelkasten/README.md#components).
> Dieses Dokument bietet **High-Level Architecture** und **praktische Development-Guidelines**.
>
> **Kern-Komponenten**: [8 atomic component notes](../zettelkasten/README.md#components) im Zettelkasten

---

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
- [Future Architecture Considerations](#future-architecture-considerations)

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
│  │         EcosystemEngine (extends Quantum)            │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │  Multi-Species System                         │  │   │
│  │  │  - 5 species (builder, harvester, consumer,   │  │   │
│  │  │    decomposer, scout)                         │  │   │
│  │  │  - Energy-based lifecycle                     │  │   │
│  │  │  - Behavior state machines                    │  │   │
│  │  │  - Crystal formation system                   │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                             │
┌─────────────────────────────────────────────────────────────┐
│                      Rendering Layer                         │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         WebGL Trail Renderer                         │   │
│  │  - GPU-accelerated trail visualization               │   │
│  │  - Shader-based effects (bloom, glow)                │   │
│  │  - Multi-species color channels (R, G, B)            │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Three-Layer Architecture

The system follows a clean three-layer architecture pattern:

1. **Application Layer** - React components, UI, state management
   - See: [react-components.md](../zettelkasten/components/react-components.md) (Component hierarchy)
   - See: [zustand-store.md](../zettelkasten/components/zustand-store.md) (State management)

2. **Engine Layer** - Simulation logic, agent systems, trail dynamics
   - See: [quantum-stigmergy-engine.md](../zettelkasten/components/quantum-stigmergy-engine.md) (Core engine)
   - See: [agent-system.md](../zettelkasten/components/agent-system.md) (Agent operations)
   - See: [trail-system.md](../zettelkasten/components/trail-system.md) (Trail dynamics)
   - See: [ecosystem-engine.md](../zettelkasten/components/ecosystem-engine.md) (Multi-species extension)

3. **Rendering Layer** - WebGL visualization, post-processing
   - See: [webgl-renderer.md](../zettelkasten/components/webgl-renderer.md) (GPU rendering)

---

## Technology Stack

**Core Technologies:**
- **Frontend:** React 18 with TypeScript
- **State Management:** Zustand (lightweight, performant)
- **Rendering:** WebGL 2.0 for trails, Canvas 2D for agents
- **Build Tool:** Vite (fast HMR, modern ESM)
- **PWA:** Service Worker with Workbox
- **Styling:** Tailwind CSS
- **Export:** canvas-recorder, gif.js Web Worker

**Key Libraries:**
- Three.js concepts (WebGL utilities, not full Three.js)
- MediaRecorder API (WebM video export)
- gif.js (GIF encoding in Web Worker)

---

## Component Architecture

### Component Hierarchy Overview

```
App
└── MatrixControlCenter (Main Layout)
    ├── ControlBar (Top bar with global controls)
    ├── CanvasPanel (Visualization)
    └── ParameterControlCenter (Drawer/Panels)
        ├── PresetGallery
        ├── ModelOikosPanel (M1/M2/M3)
        ├── PhysicalOikosPanel
        ├── SemioticOikosPanel
        ├── TemporalOikosPanel
        ├── ResonanceOikosPanel
        ├── EcosystemOikosPanel
        ├── VisualsOikosPanel
        ├── EffectsOikosPanel
        └── PerformanceOikosPanel
```

**Detailed Component Documentation:**
- [react-components.md](../zettelkasten/components/react-components.md) - Full component tree, parameter flow, Oikos panels organization

**Component Patterns:**

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

### Zustand Store

**Lightweight, performant state management** with selective subscriptions for minimal re-renders.

**Location:** `src/store/useStore.ts`

**Store Structure:**
- Model Selection (M1/M2/M3)
- Physical Parameters (15 atomic parameters)
- Quantum Parameters (M3 specific)
- Simulation State (running, paused, reset)
- UI State (aspect ratio, fullscreen)
- Actions (setParameter, reset, loadPreset)

**Presets:**
- RESONANZ, MYZEL, STIGMERGIE
- CRYSTAL, CHAOS
- All presets map to atomic parameter combinations

**Detailed Documentation:**
- [zustand-store.md](../zettelkasten/components/zustand-store.md) - Store structure, parameter flow, presets

**Usage Pattern:**
```typescript
// Subscribe to specific slice (avoids unnecessary re-renders)
const sensorAngle = useStore(state => state.sensorAngle)

// Update parameter
const setParameter = useStore(state => state.setParameter)
setParameter('sensorAngle', newValue)
```

---

## Simulation Engine

### QuantumStigmergyEngine

**Core simulation engine** orchestrating the agent update loop, trail decay/diffusion, and model-specific behaviors.

**Update Loop:**
```
1. Agent Loop: Sense → Turn → Move → Deposit
2. Trail Decay
3. (Optional) Trail Diffusion
```

**Three Model Variants:**
- **M1: Classical Stigmergy** - Baseline pheromone-based navigation
- **M2: Context-Switching** - Explore/exploit behavioral modes
- **M3: Quantum-Inspired** - Superposition states and interference patterns

**Detailed Documentation:**
- [quantum-stigmergy-engine.md](../zettelkasten/components/quantum-stigmergy-engine.md) - Core update loop, model variants, performance
- [agent-system.md](../zettelkasten/components/agent-system.md) - Agent structure, sensing, steering, movement, deposition
- [trail-system.md](../zettelkasten/components/trail-system.md) - Trail-Map, decay function, diffusion, decay × diffusion trade-off

### EcosystemEngine

**Extends QuantumStigmergyEngine** with multi-species ecological simulation.

**Features:**
- 5 species types: Builder, Harvester, Consumer, Decomposer, Scout
- Energy-based lifecycles (birth, death, starvation)
- Behavior state machines (idle, seeking, fleeing, consuming)
- Crystal formation and consumption system

**Detailed Documentation:**
- [ecosystem-engine.md](../zettelkasten/components/ecosystem-engine.md) - Species types, energy system, behavior FSM, crystal system

---

## Rendering System

### WebGL Trail Renderer

**GPU-accelerated rendering** for high-performance trail visualization.

**Pipeline:**
1. Trail-Map (Float32Array) → WebGL Texture
2. Fragment shader applies color grading
3. Optional: Bloom/Glow post-processing effects
4. Multi-species: R, G, B channels for different species

**Performance:**
- 60 FPS for 5,000 agents on desktop
- 30 FPS for 2,000 agents on mobile

**Detailed Documentation:**
- [webgl-renderer.md](../zettelkasten/components/webgl-renderer.md) - Rendering pipeline, shader-based effects, multi-species rendering

**Shader Pattern:**
```glsl
// Fragment shader for trail visualization
void main() {
  vec4 trailData = texture2D(trailTexture, vUv);
  vec3 color = applyColorGrading(trailData.rgb);
  color = applyBloom(color);
  gl_FragColor = vec4(color, 1.0);
}
```

---

## PWA Architecture

### Progressive Web App Features

**Offline-first architecture** with service worker caching and installation support.

**Features:**
- Service Worker: Cache-First strategy for static assets
- Manifest: Installable on desktop/mobile
- Offline availability: Full simulation runs without network
- Auto-updates: Service worker update notifications

**Detailed Documentation:**
- [pwa-architecture.md](../zettelkasten/components/pwa-architecture.md) - Service Worker strategy, caching, offline availability

**Service Worker Strategy:**
```javascript
// Cache-First for static assets
workbox.routing.registerRoute(
  ({request}) => request.destination === 'script' ||
                 request.destination === 'style',
  new workbox.strategies.CacheFirst({
    cacheName: 'static-resources',
  })
)
```

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

**See also:**
- [quantum-stigmergy-engine.md](../zettelkasten/components/quantum-stigmergy-engine.md) → Performance optimization
- [webgl-renderer.md](../zettelkasten/components/webgl-renderer.md) → GPU optimization

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
   - Integration tests for React components
   - E2E tests for critical workflows

6. **Accessibility:**
   - Keyboard navigation
   - Screen reader support
   - High contrast mode

---

## References

### Zettelkasten Components (Single Source of Truth)

**Simulation Layer:**
- [quantum-stigmergy-engine.md](../zettelkasten/components/quantum-stigmergy-engine.md) ⭐
- [agent-system.md](../zettelkasten/components/agent-system.md) ⭐
- [trail-system.md](../zettelkasten/components/trail-system.md) ⭐

**Application Layer:**
- [zustand-store.md](../zettelkasten/components/zustand-store.md)
- [react-components.md](../zettelkasten/components/react-components.md)
- [webgl-renderer.md](../zettelkasten/components/webgl-renderer.md)

**Infrastructure Layer:**
- [pwa-architecture.md](../zettelkasten/components/pwa-architecture.md)
- [ecosystem-engine.md](../zettelkasten/components/ecosystem-engine.md)

### External Resources

- **React Documentation:** https://react.dev/
- **Zustand Documentation:** https://docs.pmnd.rs/zustand/
- **WebGL Fundamentals:** https://webglfundamentals.org/
- **PWA Best Practices:** https://web.dev/progressive-web-apps/
- **Vite Documentation:** https://vitejs.dev/

---

**Last updated:** 2025-11-20
**Documentation version:** 2.0 (Zettelkasten integration - aggressive reduction)
**Architecture complexity:** ~650 lines → ~550 lines (15% reduction, ~300 lines redundancy eliminated)
