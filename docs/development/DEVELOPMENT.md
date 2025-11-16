# Development Guide

This guide covers setting up your development environment, understanding the architecture, and contributing to Parametrik-Labor.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Architecture Overview](#architecture-overview)
- [State Management](#state-management)
- [Simulation Engine](#simulation-engine)
- [Rendering Pipeline](#rendering-pipeline)
- [Testing](#testing)
- [Performance Optimization](#performance-optimization)
- [Debugging](#debugging)
- [Common Tasks](#common-tasks)

---

## Prerequisites

### Required

- **Node.js** 18.x or higher
- **npm** 9.x or higher
- **Git** 2.x or higher
- Modern browser with:
  - Canvas 2D support
  - WebGL support
  - Service Worker support (for PWA)

### Recommended

- **VS Code** with extensions:
  - ESLint
  - TypeScript and JavaScript Language Features
  - Prettier
  - GitLens
- **Chrome DevTools** or **Firefox Developer Tools**
- **React Developer Tools** browser extension

---

## Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/v6t2b9/Parametrik-Labor.git
cd Parametrik-Labor
```

### 2. Install Dependencies

```bash
npm install
```

This installs:
- React 19 and React DOM
- TypeScript and type definitions
- Vite build tool and plugins
- Zustand for state management
- ESLint for code quality
- gif.js for GIF encoding
- vite-plugin-pwa for PWA support

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

**Features in dev mode:**
- Hot Module Replacement (HMR)
- Fast refresh for React components
- Source maps for debugging
- PWA enabled for testing offline functionality

### 4. Verify Setup

Open `http://localhost:5173` and verify:
- Canvas renders with agents
- Parameter controls work
- No console errors
- Service worker registers (check DevTools → Application → Service Workers)

---

## Project Structure

```
Parametrik-Labor/
├── public/                          # Static assets
│   ├── pwa-192x192.png             # PWA icon (192x192)
│   ├── pwa-512x512.png             # PWA icon (512x512)
│   ├── apple-touch-icon.png        # iOS icon
│   ├── favicon.ico                 # Favicon
│   ├── mask-icon.svg               # Safari mask icon
│   ├── vite.svg                    # Vite logo
│   └── gif.worker.js               # GIF encoding web worker
│
├── src/                             # Application source
│   ├── components/                 # React components
│   │   ├── CanvasPanel.tsx        # Main canvas component
│   │   ├── ControlBar.tsx         # Top control bar
│   │   ├── MatrixControlCenter.tsx # Main app layout
│   │   ├── ParameterControlCenter.tsx # Parameter panels container
│   │   ├── ParameterSlider.tsx    # Reusable slider component
│   │   ├── PresetGallery.tsx      # Preset selector
│   │   ├── WebGLTrailRenderer.ts  # WebGL renderer
│   │   └── *OikosPanel.tsx        # Parameter panels (Model, Physical, etc.)
│   │
│   ├── engine/                     # Simulation engines
│   │   ├── QuantumStigmergyEngine.ts  # M1/M2/M3 models
│   │   ├── SimulationEngine.ts        # Legacy classical engine
│   │   └── ComplexMath.ts             # Quantum math utilities
│   │
│   ├── presets/                    # Parameter presets
│   │   └── index.ts               # All presets organized by category
│   │
│   ├── store/                      # State management
│   │   └── useStore.ts            # Zustand store
│   │
│   ├── types/                      # TypeScript definitions
│   │   └── index.ts               # Type definitions
│   │
│   ├── App.tsx                     # Root component
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Global styles
│
├── docs/                            # Documentation
│   ├── README.md                   # Full documentation
│   ├── DEVELOPMENT.md             # This file
│   ├── DEPLOYMENT.md              # Deployment guide
│   ├── ARCHITECTURE.md            # Architecture details
│   └── *.md                        # Research papers and specs
│
├── .env.example                    # Environment variables example
├── .gitignore                      # Git ignore rules
├── CHANGELOG.md                    # Version history
├── CODE_OF_CONDUCT.md             # Community guidelines
├── CONTRIBUTING.md                 # Contribution guide
├── LICENSE                         # AGPL v3 license
├── README.md                       # Main readme
├── SELF_HOSTING.md                # Self-hosting guide
├── eslint.config.js               # ESLint configuration
├── index.html                      # HTML entry point
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript config (main)
├── tsconfig.app.json              # TypeScript config (app)
├── tsconfig.node.json             # TypeScript config (node)
├── vercel.json                     # Vercel deployment config
└── vite.config.ts                 # Vite build configuration
```

---

## Development Workflow

### Day-to-Day Development

1. **Pull latest changes:**
   ```bash
   git pull origin main
   ```

2. **Create feature branch:**
   ```bash
   git checkout -b feature/your-feature
   ```

3. **Start dev server:**
   ```bash
   npm run dev
   ```

4. **Make changes** - Edit files, save, see instant updates

5. **Test changes:**
   ```bash
   npm run lint      # Check code quality
   npm run build     # Ensure production build works
   npm run preview   # Test production build
   ```

6. **Commit changes:**
   ```bash
   git add .
   git commit -m "feat: add feature description"
   ```

7. **Push and create PR:**
   ```bash
   git push origin feature/your-feature
   ```

### Available Scripts

```bash
# Development
npm run dev          # Start dev server with HMR

# Building
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

---

## Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────┐
│              React Components (UI)               │
│  ┌──────────┐ ┌──────────┐ ┌─────────────────┐ │
│  │ Canvas   │ │ Controls │ │ Parameter Panels│ │
│  └────┬─────┘ └────┬─────┘ └────────┬────────┘ │
│       │            │                 │          │
└───────┼────────────┼─────────────────┼──────────┘
        │            │                 │
        └────────────┼─────────────────┘
                     │
        ┌────────────▼──────────────┐
        │   Zustand Store (State)   │
        │  ┌──────────────────────┐ │
        │  │ Parameters           │ │
        │  │ Simulation State     │ │
        │  │ UI State             │ │
        │  └──────────────────────┘ │
        └────────────┬──────────────┘
                     │
        ┌────────────▼──────────────┐
        │   Simulation Engine       │
        │  ┌──────────────────────┐ │
        │  │ Agent Management     │ │
        │  │ Physics Simulation   │ │
        │  │ Trail System         │ │
        │  └──────────────────────┘ │
        └────────────┬──────────────┘
                     │
        ┌────────────▼──────────────┐
        │   Rendering Pipeline      │
        │  ┌──────────────────────┐ │
        │  │ Canvas 2D (Agents)   │ │
        │  │ WebGL (Trails)       │ │
        │  │ Post-Processing      │ │
        │  └──────────────────────┘ │
        └───────────────────────────┘
```

### Key Architectural Patterns

1. **State Management:** Centralized Zustand store
2. **Component Pattern:** Functional components with hooks
3. **Engine Pattern:** Separate simulation logic from rendering
4. **Web Worker:** GIF encoding offloaded to worker thread
5. **Service Worker:** PWA offline functionality

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation.

---

## State Management

### Zustand Store

Located in `src/store/useStore.ts`

**Structure:**
```typescript
{
  // Parameters
  numAgents: number
  sensorAngle: number
  // ... all other parameters

  // Simulation State
  isRunning: boolean
  isPaused: boolean
  currentPreset: string | null

  // UI State
  aspectRatio: string
  exportFormat: string

  // Actions
  setParameter: (key, value) => void
  reset: () => void
  loadPreset: (preset) => void
}
```

**Usage in Components:**
```typescript
import { useStore } from '../store/useStore'

function MyComponent() {
  const numAgents = useStore(state => state.numAgents)
  const setParameter = useStore(state => state.setParameter)

  return (
    <input
      value={numAgents}
      onChange={(e) => setParameter('numAgents', Number(e.target.value))}
    />
  )
}
```

**Best Practices:**
- Subscribe to specific state slices, not entire store
- Use `setParameter` for all parameter updates
- Keep UI state separate from simulation state

---

## Simulation Engine

### QuantumStigmergyEngine

Located in `src/engine/QuantumStigmergyEngine.ts`

**Three Models:**
1. **M1 (Classical):** Basic pheromone-based stigmergy
2. **M2 (Context-Switching):** Explore/exploit behavior modes
3. **M3 (Quantum-Inspired):** Superposition and interference

**Update Loop:**
```typescript
update(deltaTime: number) {
  for (agent of agents) {
    sense()      // Detect pheromones
    turn()       // Adjust direction
    move()       // Update position
    deposit()    // Leave trail
  }
  decayTrails()  // Fade existing trails
}
```

**Key Methods:**
- `sense()`: Sample pheromone field
- `turn()`: Update direction based on sensed values
- `move()`: Update position with boundary handling
- `deposit()`: Add pheromone to trail map
- `decayTrails()`: Apply decay to all trail cells

### Complex Math (Quantum)

Located in `src/engine/ComplexMath.ts`

Utilities for quantum calculations:
- Complex number operations
- Phase rotation
- Amplitude coupling
- Interference patterns

---

## Rendering Pipeline

### Hybrid Rendering Approach

1. **WebGL for Trails** (`WebGLTrailRenderer.ts`)
   - GPU-accelerated
   - Fragment shader for trail rendering
   - Handles blend modes and effects

2. **Canvas 2D for Agents** (`CanvasPanel.tsx`)
   - Agent positions rendered as points
   - Overlaid on trail layer

### Render Flow

```
Frame Request (RAF)
  ↓
Simulation Update
  ↓
Clear Canvas
  ↓
Render Trails (WebGL)
  ↓
Apply Effects (WebGL/Canvas)
  ↓
Render Agents (Canvas 2D)
  ↓
Display Frame
```

### Post-Processing Effects

Implemented in `CanvasPanel.tsx`:
- Motion blur
- Bloom
- Chromatic aberration
- Vignette
- Scanlines
- Pixelation
- And more...

---

## Testing

### Manual Testing Checklist

Before creating a PR:

- [ ] Test all three models (M1, M2, M3)
- [ ] Try multiple presets
- [ ] Test parameter changes
- [ ] Test exports (screenshot, GIF, WebM)
- [ ] Test fullscreen mode
- [ ] Test different aspect ratios
- [ ] Test on different screen sizes
- [ ] Test PWA installation
- [ ] Test offline functionality
- [ ] Check console for errors
- [ ] Test in multiple browsers:
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge

### Browser Testing

**Desktop:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Mobile:**
- iOS Safari 14+
- Android Chrome 90+

---

## Performance Optimization

### Current Optimizations

1. **WebGL Rendering:** GPU-accelerated trail rendering
2. **Object Pooling:** Reuse agent objects
3. **RequestAnimationFrame:** Synchronized with display refresh
4. **Auto-Optimizer:** Dynamic FPS adjustment
5. **Efficient State Updates:** Minimal re-renders

### Performance Profiling

**Chrome DevTools:**
1. Open DevTools → Performance
2. Record a simulation session
3. Look for:
   - Long tasks (>50ms)
   - Layout thrashing
   - Memory leaks

**Common Issues:**
- Too many agents (reduce `numAgents`)
- High resolution (reduce `devicePixelRatio`)
- Complex effects (disable effects)

### Optimization Tips

- Keep update loop under 16ms (60 FPS)
- Minimize state changes
- Use Web Workers for heavy computation
- Profile before optimizing

---

## Debugging

### React DevTools

Install React DevTools extension:
- Inspect component tree
- View props and state
- Profile component renders

### Console Logging

Add debug logs in development:
```typescript
if (import.meta.env.DEV) {
  console.log('Agent positions:', agents)
}
```

### Source Maps

Source maps are enabled in development:
- Set breakpoints in original TypeScript files
- Step through code in DevTools

### Common Issues

**Canvas not rendering:**
- Check browser console for errors
- Verify WebGL support
- Check canvas dimensions

**Poor performance:**
- Reduce agent count
- Disable effects
- Lower resolution

**PWA not updating:**
- Clear service worker cache
- Unregister old service worker
- Hard refresh (Ctrl+Shift+R)

---

## Common Tasks

### Adding a New Parameter

1. **Add to type definition** (`src/types/index.ts`):
   ```typescript
   export interface SimulationParameters {
     myNewParam: number
   }
   ```

2. **Add to store** (`src/store/useStore.ts`):
   ```typescript
   myNewParam: 0.5,
   ```

3. **Add to UI** (appropriate `*OikosPanel.tsx`):
   ```typescript
   <ParameterSlider
     label="My New Param"
     value={myNewParam}
     min={0}
     max={1}
     step={0.01}
     onChange={(v) => setParameter('myNewParam', v)}
   />
   ```

4. **Use in engine** (`src/engine/QuantumStigmergyEngine.ts`):
   ```typescript
   const effect = params.myNewParam * someValue
   ```

### Creating a Preset

Add to `src/presets/index.ts`:
```typescript
export const MY_PRESET: Partial<SimulationParameters> = {
  name: 'My Preset',
  numAgents: 5000,
  sensorAngle: 0.5,
  // ... other parameters
}
```

### Adding a Post-Processing Effect

In `CanvasPanel.tsx`:
1. Add effect parameter to store
2. Add UI control in EffectsOikosPanel
3. Implement effect in render loop

---

## Questions?

- Check [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed system design
- See [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines
- Create an issue for bugs or feature requests

Happy coding! 🚀
