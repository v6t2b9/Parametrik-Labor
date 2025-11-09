# Parametric Space Explorer

An interactive visualization tool for exploring emergent coordination patterns through parameter manipulation, based on the **Parametrics** theoretical framework.

## Overview

This application transforms parameter exploration from trial-and-error into systematic scientific investigation. Rather than treating parameters as mere "settings," the Parametric Space Explorer treats them as **co-constitutive forces** that fundamentally structure the possibility spaces for emergent coordination.

## Features (Phase 1: Core MVP)

### ✅ Implemented

- **Real-time Simulation Engine**
  - Agent-based simulation with 400×400 grid
  - Multi-species interaction (red, green, blue agents)
  - Chemical trail deposition with **8-connected diffusion** (includes diagonals for smoother patterns)
  - Configurable simulation speed

- **Canvas Visualization**
  - 800×800 pixel rendering with 2× scaling
  - Real-time visualization of agent trails
  - Customizable color schemes (5 species + background)
  - Screenshot export functionality
  - **Fullscreen mode** (press ⛶ Fullscreen button, exit with ESC) for "Lavalampe" usage

- **Parameter Control System**
  - **Physical Oikos**: Decay rate, diffusion frequency, fade strength, trail saturation
  - **Semiotic Oikos**: Sensor distance/angle, deposit amount, turn speed
  - **Temporal Oikos**: Agent speed, population density, chaos injection
  - **Resonance Oikos**: Attraction/repulsion strength, cross-species interaction
  - **Visualization Oikos**: Brightness, color customization (red/green/blue species + background)
  - **Effects Oikos**: Post-processing effects for Lavalampen-Magie (blur, bloom, saturation, contrast, hue shift, motion blur, vignette, chromatic aberration, wave distortion)

- **Global Preset Gallery**
  - **8 curated full-parameter configurations:**
    - 🎯 **Maximale Clusterbildung**: Dense, spatially concentrated groups
    - 💎 **Kristalline Ordnung**: Geometrically precise, rigid structures
    - 🔲 **Maximale Separation**: Spatially segregated species territories
    - 🌀 **Chaotische Turbulenz**: Irregular, unpredictable dynamics
    - 🕸️ **Netzwerk-Strukturen**: Branching, connected paths
    - 🌊 **Fließende Organik**: Continuous morphing without collapse
    - 🔒 **Maximale Stabilität**: Temporally persistent structures
    - 🔥 **Dichte Hotspots**: Intensity concentration in focal points

- **Tab-Specific Presets** (34 total)
  - **8 Visual Presets**: Heatmap, Tiefsee, Galaxie, Nordlicht, Neon, Pastell, Infrarot, Biolumineszenz
  - **6 Physics Presets**: Flüssig, Kristallin, Gasförmig, Klebrig, Turbulent, Stabil
  - **6 Species Presets**: Jäger, Sammler, Scouts, Tanks, Balanced, Chaotisch
  - **6 Temporal Presets**: Blitz, Marathon, Pulsierend, Eingefroren, Mega-Dichte, Minimal
  - **8 Effects Presets**: Klar, Sanft, Traumhaft, Neon Glow, Psychedelisch, Retro CRT, Flüssig, Meditation

- **Interactive Controls**
  - Play/Pause simulation
  - Reset to initial conditions
  - Fullscreen mode toggle
  - Real-time parameter adjustment with immediate visual feedback
  - Frame counter display

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd parametric-explorer

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

## Usage Guide

### Basic Workflow

1. **Load a Global Preset**: Click on one of the 8 preset cards in the Preset Gallery to load a full configuration
2. **Start Simulation**: Click the ▶️ Play button
3. **Experiment with Parameters**:
   - Switch between the 5 Oikos tabs and adjust sliders in real-time
   - Try tab-specific presets (e.g., "Flüssig" vs. "Kristallin" in Physical tab)
   - Combine presets from different tabs to discover new patterns
4. **Observe Emergent Patterns**: Watch how parameter changes affect the visualization
5. **Enter Fullscreen**: Click ⛶ Fullscreen for immersive viewing (perfect for "Lavalampe" mode)
6. **Capture Results**: Use the 📸 Screenshot button to save interesting patterns

### Exploration Strategies

- **Start with Global Presets**: Load "Kristalline Ordnung" or "Fließende Organik" to see extreme states
- **Use Tab Presets to Mix & Match**: Load "Kristallin" physics + "Jäger" species + "Nordlicht" colors
- **Isolate Parameters**: Change one slider at a time to understand individual effects
- **Create Recipes**: Find combinations you like and note the parameter values

### Parameter Exploration

Each parameter tab represents a different dimension of the parameter space:

#### 🌍 Physical Oikos
Controls trace materiality and environmental properties:
- **Decay Rate** (0.5-0.999): Higher values → longer memory → stable structures
- **Diffusion Frequency** (1-10 frames): **INVERTED** - Low (1) = fast diffusion every frame, High (10) = slow diffusion every 10th frame
- **Fade Strength** (0.01-0.5): Higher values → rapid decay → chaos
- **Trail Saturation** (50-255): Maximum trail intensity capacity

**Tab Presets**: Flüssig (high diffusion), Kristallin (minimal diffusion), Gasförmig, Klebrig, Turbulent, Stabil

#### 🔣 Semiotic Oikos
Controls perception-action coupling (species behavior):
- **Sensor Distance** (5-75): Larger range → network formation, separation
- **Sensor Angle** (0.15-1.8 rad): Wider FOV → chaotic, fluid movement
- **Deposit Amount** (5-48): Higher values → dense, stable structures
- **Turn Speed** (0.1-2.2 rad): Higher values → erratic, fluid motion

**Tab Presets**: Jäger (long range, fast), Sammler (short range, high deposit), Scouts (extreme range), Tanks (minimal range, max deposit), Balanced, Chaotisch

#### ⏱️ Temporal Oikos
Controls dynamics and temporal structuring:
- **Agent Speed** (0.15-5.5): Higher values → chaotic, fluid patterns
- **Agent Count** (150-14000): Higher density → clustering, dense trails
- **Chaos Interval** (0-500 frames): Periodic disruption frequency (0 = off)
- **Chaos Strength** (0.0-1.5): Perturbation intensity

**Tab Presets**: Blitz (extreme speed), Marathon (many agents), Pulsierend (periodic chaos), Eingefroren (minimal speed), Mega-Dichte (14K agents), Minimal (150 agents)

#### 🎵 Resonance Oikos
Controls inter-system relations:
- **Attraction Strength** (0.0-2.0): Same-type trail following
- **Repulsion Strength** (-1.2-0.0): Cross-type influence (negative = avoidance)
- **Cross-Species Interaction**: Enable/disable inter-species sensing

#### 🎨 Visualization Oikos
Controls visual appearance (does not affect simulation dynamics):
- **Brightness** (0.5-4.0): Global brightness multiplier
- **Color Red/Green/Blue**: RGB values for each species trail color
- **Color Background**: RGB values for background/empty space

**Tab Presets**: Heatmap (warm colors), Tiefsee (deep blue), Galaxie (purple/magenta), Nordlicht (aurora), Neon (saturated primaries), Pastell (soft), Infrarot (red-dominant), Biolumineszenz (bio-glow)

#### ✨ Effects Oikos
Controls post-processing visual effects (applied after rendering, for Lavalampen-Magie):
- **Blur** (0-20px): Gaussian blur radius - higher = softer, dreamier
- **Bloom** (0-1): Additive glow strength - higher = more ethereal glow
- **Saturation** (0-3): Color saturation (1 = normal, <1 = desaturated, >1 = vivid)
- **Contrast** (0-3): Contrast (1 = normal, <1 = flat, >1 = punchy)
- **Hue Shift** (0-360°): Hue rotation through color spectrum
- **Motion Blur** (0-0.95): Frame persistence / ghosting - higher = longer trails, fluid motion
- **Vignette** (0-1): Edge darkening - higher = stronger center focus
- **Chromatic Aberration** (0-15px): RGB channel offset for retro glitch / CRT effect
- **Wave Distortion** (0-1): Sine wave amplitude - higher = more liquid/psychedelic warping

**Tab Presets**: Klar (no effects), Sanft (subtle glow), Traumhaft (soft blur), Neon Glow (extreme saturation), Psychedelisch (RGB shift + distortion), Retro CRT (monitor look), Flüssig (high motion blur), Meditation (strong blur)

## Architecture

### Technology Stack

- **Frontend**: React 18 + TypeScript
- **State Management**: Zustand
- **Build Tool**: Vite
- **Rendering**: Canvas API

### Project Structure

```
src/
├── components/              # React components
│   ├── CanvasPanel.tsx      # Rendering with post-processing effects
│   ├── ControlBar.tsx
│   ├── ParameterControlCenter.tsx
│   ├── ParameterSlider.tsx
│   ├── PhysicalOikosPanel.tsx
│   ├── SemioticOikosPanel.tsx
│   ├── TemporalOikosPanel.tsx
│   ├── ResonanceOikosPanel.tsx
│   ├── VisualizationOikosPanel.tsx
│   ├── EffectsOikosPanel.tsx  # NEW: Post-processing effects
│   └── PresetGallery.tsx
├── engine/                  # Simulation logic
│   └── SimulationEngine.ts
├── store/                   # State management
│   └── useSimulationStore.ts
├── types/                   # TypeScript definitions
│   └── index.ts
├── presets/                 # Curated configurations
│   ├── index.ts             # Global presets (8)
│   └── tabPresets.ts        # Tab-specific presets (34)
├── App.tsx                  # Main application + fullscreen
└── main.tsx                 # Entry point
```

### Core Concepts

#### Simulation Engine
- Agent-based model with 3 species (red, green, blue)
- Chemical trail deposition with **8-connected diffusion** (includes diagonal neighbors for smoother, more natural patterns)
- Sensory-motor coupling (sense → interpret → move → deposit)
- Rhythmic perturbation for chaos injection
- **Critical fix**: Diffusion frequency is inverted (lower value = more frequent = more diffusion)

#### Parameter-Oikos Organization
Parameters are organized into **6 "Oikos"** (ecological) dimensions based on their role in structuring emergent patterns:
1. **Physical**: Environmental constraints (trace persistence, diffusion, saturation)
2. **Semiotic**: Sign production and perception (species behavior)
3. **Temporal**: Time-based dynamics (speed, population, chaos)
4. **Resonance**: Inter-system coupling (attraction/repulsion)
5. **Visualization**: Visual appearance (colors, brightness) - does not affect simulation
6. **Effects**: Post-processing visual effects (blur, bloom, distortion) - applied after rendering for Lavalampen-Magie

#### Preset System
- **Global Presets**: 8 full-parameter configurations for extreme/canonical states
- **Tab Presets**: 34 dimension-specific presets for targeted exploration
- **Mix & Match**: Combine tab presets from different dimensions to discover novel patterns

### Key Improvements & Fixes

This implementation includes several critical fixes that dramatically improve pattern diversity:

#### 1. **Fixed Diffusion Logic** (Critical)
The diffusion frequency parameter was initially inverted. In the original MYZEL code:
- `diffusionFreq = 1` → diffuse every frame (maximum diffusion)
- `diffusionFreq = 10` → diffuse every 10th frame (minimal diffusion)

This fix enabled the full range of emergent behaviors from crystalline rigidity to fluid organicism.

#### 2. **8-Connected Diffusion** (Major Enhancement)
Upgraded from 4-connected (cardinal directions only) to 8-connected diffusion that includes diagonal neighbors:
```
Before (4-connected):  After (8-connected):
      N                   NW  N  NE
   W  •  E               W   •   E
      S                   SW  S  SE
```
This produces smoother, more natural-looking patterns and eliminates grid artifacts.

#### 3. **Expanded Parameter Ranges**
Parameter ranges were widened based on empirical testing to enable greater diversity:
- Agent count: 500-10K → 150-14K
- Sensor distance: 10-40 → 5-75
- Speed: 0.5-3.0 → 0.15-5.5
- Sensor angle: 0.2-1.2 → 0.15-1.8

#### 4. **Layout Optimization**
Moved controls below canvas (instead of beside) for better visual focus and added fullscreen mode for immersive viewing.

#### 5. **Visualization Independence**
Separated visualization parameters (colors, brightness) from simulation dynamics, allowing aesthetic customization without affecting emergent properties.

## Theoretical Framework

This tool is based on the **Parametrics** framework, which reconceptualizes parameters as:

> **Co-constitutive forces that structure the possibility spaces within which self-organization occurs**

Rather than viewing parameters as passive settings to optimize, Parametrics recognizes that:

1. **Parameters create coordination niches** analogous to ecological niches
2. **Recursive co-constitution** produces path-dependent dynamics
3. **Emergent irreversibility** arises from accumulated parameter-structured interactions

For detailed theoretical background, see `../parametrics_paper_draft.md` and `../Parameter_Oikos_Matrix.md`

## Use Cases

### Research & Analysis
- **Parameter Space Mapping**: Systematically explore how parameter combinations produce emergent properties
- **Hypothesis Testing**: Test predictions about coordination mechanisms
- **Pattern Classification**: Identify and catalog distinct emergent regimes
- **Comparative Studies**: Analyze differences between parameter configurations

### Creative & Artistic Applications
- **Generative Art**: Create unique visual patterns and animations
- **Lavalampe Mode**: Use fullscreen mode for ambient, meditative displays
- **Live Performance**: Real-time parameter manipulation for VJ/live visual applications
- **Design Exploration**: Discover organic patterns for design inspiration

### Educational Applications
- **Complex Systems Education**: Demonstrate emergence, self-organization, stigmergy
- **Interactive Learning**: Hands-on exploration of parameter effects
- **Theory Demonstration**: Illustrate Parametrics concepts concretely
- **Scientific Visualization**: Make abstract concepts tangible

## Roadmap

### Phase 1: Core MVP + Effects ✅ **COMPLETE**
- ✅ 8-connected diffusion simulation engine
- ✅ Canvas visualization with fullscreen mode and post-processing pipeline
- ✅ 6-dimensional parameter controls (Physical, Semiotic, Temporal, Resonance, Visualization, Effects)
- ✅ 42 total presets (8 global + 34 tab-specific across 6 dimensions)
- ✅ Screenshot export
- ✅ Real-time parameter manipulation
- ✅ Post-processing effects: blur, bloom, saturation, contrast, hue shift, motion blur, vignette, chromatic aberration, wave distortion
- ✅ Critical fixes: inverted diffusion logic, expanded ranges, layout optimization

### Phase 2: Metrics & Analysis (Planned)
- Real-time emergent property calculation
- Time series graphs
- Pattern classification
- Experiment logging

### Phase 3: Matrix Integration (Planned)
- Parameter-Oikos-Matrix visualization
- Effect heatmap
- Parameter space mapping
- Recommendation engine

### Phase 4: Advanced Features (Planned)
- Parameter sweep mode
- Comparison tools
- Recipe builder
- Fingerprint analyzer

### Phase 5: Polish & Optimization (Planned)
- Performance optimization (WebGL, worker threads)
- Progressive disclosure UI
- Accessibility improvements
- Mobile responsiveness

## Contributing

This project is part of the Parametrik-Labor research initiative. Contributions are welcome!

### Development Guidelines

- Follow TypeScript strict mode
- Use functional components with hooks
- Maintain separation of concerns (engine, UI, state)
- Document parameter effects based on observations

## License

[To be determined]

## Acknowledgments

Based on research into stigmergy, self-organization, and parametric systems theory.

---

**Version**: 1.1.0 (Phase 1 Complete + Effects)
**Status**: Production-ready with 42 presets, fullscreen mode, and post-processing effects
**Last Updated**: 2025-11-09

### Recent Updates (2025-11-09)

**v1.1.0 - Effects Oikos Release:**
- ✅ **NEW: Effects Oikos** - 6th parameter dimension with 9 post-processing effects
- ✅ **NEW: 8 Effects Presets** - Klar, Sanft, Traumhaft, Neon Glow, Psychedelisch, Retro CRT, Flüssig, Meditation
- ✅ Blur, Bloom, Saturation, Contrast, Hue Shift effects
- ✅ Motion Blur for fluid ghosting trails
- ✅ Vignette for atmospheric focus
- ✅ Chromatic Aberration for retro glitch effects
- ✅ Wave Distortion for psychedelic warping
- ✅ Total presets: 42 (8 global + 34 tab-specific)

**v1.0.0 - Initial Release:**
- ✅ Fixed critical inverted diffusion logic bug
- ✅ Upgraded to 8-connected diffusion algorithm
- ✅ Expanded from 4 to 8 global presets
- ✅ Added 26 tab-specific presets across 5 dimensions
- ✅ Implemented fullscreen mode with ESC key
- ✅ Reorganized layout: controls below canvas
- ✅ Added Visualization Oikos tab for independent color/brightness control
- ✅ Expanded parameter ranges for greater diversity
