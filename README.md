# Parametric Space Explorer

An interactive visualization tool for exploring emergent coordination patterns through parameter manipulation, based on the **Parametrics** theoretical framework.

## Overview

This application transforms parameter exploration from trial-and-error into systematic scientific investigation. Rather than treating parameters as mere "settings," the Parametric Space Explorer treats them as **co-constitutive forces** that fundamentally structure the possibility spaces for emergent coordination.

## Features

### Real-time Simulation Engine
- Agent-based simulation with 400×400 grid (rendered at 800×800 pixels with 2× scaling)
- Multi-species interaction (red, green, blue agents)
- Chemical trail deposition with **8-connected diffusion** (includes diagonals for smoother patterns)
- Configurable simulation speed
- Up to 14,000 agents with automatic performance optimization

### Canvas Visualization
- High-resolution 800×800 pixel rendering
- Real-time visualization of agent trails
- **4 blend modes**: Additive (classic glow), Screen (soft glow), Multiply (lava lamp), Average (balanced)
- Customizable color schemes (3 species + background)
- Screenshot export functionality
- **Fullscreen mode** (press ⛶ Fullscreen button, exit with ESC) for "Lavalampe" usage

### Post-Processing Effects (Effects Oikos)
Transform your simulations into stunning visual experiences:

**Blur & Glow:**
- **Blur** (0-20px): Gaussian blur for dreamier, softer visuals
- **Bloom** (0-1): Additive glow strength for ethereal effects

**Color Grading:**
- **Saturation** (0-3): From monochrome to hyper-saturated
- **Contrast** (0-3): From flat to punchy
- **Hue Shift** (0-360°): Cycle through the entire color spectrum

**Motion & Trails:**
- **Motion Blur** (0-0.95): Frame persistence for fluid, ghosting trails

**Atmospheric:**
- **Vignette** (0-1): Edge darkening for center focus

**Psychedelic / Distortion:**
- **Chromatic Aberration** (0-15px): RGB channel offset for retro glitch/CRT effects
- **Wave Distortion** (0-1): Sine wave warping for liquid/psychedelic effects

**Retro / Lo-Fi:**
- **Scanlines** (0-1): CRT scanline effect for Matrix/retro aesthetics
- **Pixelation** (1-16): Retro pixel/block size

### Performance Optimization (Performance Oikos)
**Auto-Optimizer:**
- Automatically maintains target FPS (30-120)
- Dynamically reduces effects and agent count when performance drops
- Progressive optimization levels (0-10) from disabling expensive effects to reducing agent count
- Gradual quality restoration when performance improves

**Quality Presets:**
- **Low** ⚡: ~800 agents, minimal effects
- **Medium** 💫: ~1.5K agents, basic effects
- **High** ✨: ~3K agents, smooth effects (default)
- **Ultra** 🌟: ~5K agents, all effects enabled

**Real-time Metrics:**
- Current FPS display
- Agent count monitoring
- Optimization level indicator
- Performance warnings

### Parameter Control System

Parameters are organized into **7 "Oikos"** (ecological) dimensions:

#### 🌍 Physical Oikos
Controls trace materiality and environmental properties:
- **Decay Rate** (0.5-0.999): Higher values → longer memory → stable structures
- **Diffusion Frequency** (1-10 frames): **INVERTED** - Low (1) = fast diffusion every frame, High (10) = slow diffusion every 10th frame
- **Fade Strength** (0.01-0.5): Higher values → rapid decay → chaos
- **Trail Saturation** (50-255): Maximum trail intensity capacity

**6 Tab Presets**: Flüssig 💧, Kristallin 💎, Gasförmig 💨, Klebrig 🍯, Turbulent 🌀, Stabil 🔒

#### 🔣 Semiotic Oikos
Controls perception-action coupling (species behavior):
- **Sensor Distance** (5-75): Larger range → network formation, separation
- **Sensor Angle** (0.15-1.8 rad): Wider FOV → chaotic, fluid movement
- **Deposit Amount** (5-48): Higher values → dense, stable structures
- **Turn Speed** (0.1-2.2 rad): Higher values → erratic, fluid motion

**6 Tab Presets**: Jäger 🦅, Sammler 🐜, Scouts 🦋, Tanks 🐢, Balanced ⚖️, Chaotisch 🦀

#### ⏱️ Temporal Oikos
Controls dynamics and temporal structuring:
- **Agent Speed** (0.15-5.5): Higher values → chaotic, fluid patterns
- **Agent Count** (150-14,000): Higher density → clustering, dense trails
- **Chaos Interval** (0-500 frames): Periodic disruption frequency (0 = off)
- **Chaos Strength** (0.0-1.5): Perturbation intensity
- **Simulation Speed** (0.1-2.0): Global time multiplier

**6 Tab Presets**: Blitz ⚡, Marathon 🏃, Pulsierend 💓, Eingefroren ❄️, Mega-Dichte 🏙️, Minimal 🌱

#### 🎵 Resonance Oikos
Controls inter-system relations:
- **Attraction Strength** (0.0-2.0): Same-type trail following
- **Repulsion Strength** (-1.2-0.0): Cross-type influence (negative = avoidance)
- **Cross-Species Interaction**: Enable/disable inter-species sensing

#### 🎨 Visualization Oikos
Controls visual appearance (does not affect simulation dynamics):
- **Brightness** (0.5-4.0): Global brightness multiplier
- **Blend Mode**: Additive (classic glow), Screen (soft glow), Multiply (lava lamp), Average (balanced)
- **Trail Intensity** (50-255): Base trail visibility
- **Color Red/Green/Blue**: RGB values for each species trail color
- **Color Background**: RGB values for background/empty space

**16 Tab Presets**: Heatmap 🔥, Tiefsee 🌊, Galaxie 🌌, Nordlicht 🌈, Neon City 💡, Pastell 🌸, Infrarot 🔴, Biolumineszenz ✨, Lava 🌋, Frosted Glass ❄️, Blacklight 🌟, Sunset 🌅, Matrix Code 💚, Candy 🍬, Monochrome ⬜, Toxic ☢️

#### 🎨 Effects Oikos
Post-processing effects for Lavalampen-Magie (see Post-Processing Effects section above).

**9 Tab Presets**: Klar 💎, Sanft 🌸, Traumhaft ☁️, Neon Glow ✨, Psychedelisch 🌈, Retro CRT 📺, Flüssig 💧, Meditation 🧘, Pixelated 🎮

#### ⚡ Performance Oikos
Performance optimization and quality settings (see Performance Optimization section above).

### Global Preset Gallery

**8 curated full-parameter configurations** for instant visual impact:

1. **🌈 Plasma Dream**: Fließende organische Plasma-Wellen mit weichen leuchtenden Übergängen - perfekte Lavalampen-Ästhetik!
2. **🔥 Neon Jungle**: Wilde, gesättigte Neon-Energie mit maximaler Leuchtkraft - intensiv und elektrisierend!
3. **💚 Digital Rain**: Matrix Code mit Scanlines - grüne Datenströme im CRT-Stil!
4. **🌌 Aurora Sky**: Nordlicht-Zauber mit langsam fließenden, ätherischen Wellen - magisch und beruhigend!
5. **🌋 Lava Flow**: Geschmolzenes Gestein mit dunklem Multiply-Blend - klassische Lavalampen-Ästhetik!
6. **💎 Crystal Cave**: Geometrisch-kristalline Strukturen mit glasklarer Sicht - präzise und elegant!
7. **⚡ Electric Storm**: Chaotische Energie-Entladungen mit turbulenten Bewegungen - wild und elektrisierend!
8. **🎮 Retro Arcade**: 8-bit Gaming Nostalgie mit Pixelation und Scanlines - retro Perfektion!

### Tab-Specific Presets

**43 dimension-specific presets** for targeted exploration:
- **16 Visual Presets** (Visualization Oikos)
- **6 Physics Presets** (Physical Oikos)
- **6 Species Presets** (Semiotic Oikos)
- **6 Temporal Presets** (Temporal Oikos)
- **9 Effects Presets** (Effects Oikos)

### Interactive Controls
- Play/Pause simulation
- Reset to initial conditions
- Fullscreen mode toggle
- Real-time parameter adjustment with immediate visual feedback
- Frame counter display
- Screenshot capture

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd Parametrik-Labor/parametric-explorer

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

The built files will be in the `dist/` directory.

## Usage Guide

### Basic Workflow

1. **Load a Global Preset**: Click on one of the 8 preset cards in the Preset Gallery to load a full configuration
2. **Start Simulation**: Click the ▶️ Play button
3. **Experiment with Parameters**:
   - Switch between the 7 Oikos tabs and adjust sliders in real-time
   - Try tab-specific presets (e.g., "Flüssig" vs. "Kristallin" in Physical tab)
   - Combine presets from different tabs to discover new patterns
4. **Apply Effects**: Use the Effects Oikos tab to add post-processing effects
5. **Optimize Performance**: Use the Performance Oikos tab to adjust quality and enable auto-optimization
6. **Observe Emergent Patterns**: Watch how parameter changes affect the visualization
7. **Enter Fullscreen**: Click ⛶ Fullscreen for immersive viewing (perfect for "Lavalampe" mode)
8. **Capture Results**: Use the 📸 Screenshot button to save interesting patterns

### Exploration Strategies

**Start with Global Presets:**
- Load "Plasma Dream" for the ultimate lava lamp experience
- Try "Crystal Cave" or "Electric Storm" to see extreme states
- Experiment with "Digital Rain" or "Retro Arcade" for retro aesthetics

**Use Tab Presets to Mix & Match:**
- Load "Kristallin" physics + "Jäger" species + "Nordlicht" colors + "Neon Glow" effects
- Combine "Flüssig" physics + "Scouts" species + "Psychedelisch" effects for wild results
- Try "Gasförmig" physics + "Mega-Dichte" temporal + "Meditation" effects for zen mode

**Isolate Parameters:**
- Change one slider at a time to understand individual effects
- Compare the same visual preset with different physics presets

**Create Recipes:**
- Find combinations you like and note the parameter values
- Save screenshots of your favorite configurations

**Performance Tuning:**
- Enable Auto-Optimizer for smooth performance on any device
- Adjust Quality Preset based on your hardware capabilities
- Monitor FPS in the Performance Oikos tab

### Tips for Best Results

**For Lavalampe Mode (Fullscreen):**
- Use Global Presets: "Plasma Dream", "Lava Flow", or "Aurora Sky"
- Enable fullscreen mode
- Adjust brightness to your room lighting
- Try "Traumhaft" or "Meditation" effect presets for extra smoothness

**For Visual Performance:**
- Start with "Neon Jungle", "Electric Storm", or "Blacklight" visual preset
- Add "Neon Glow" or "Psychedelisch" effect presets
- Increase saturation and bloom for maximum impact

**For Retro Aesthetics:**
- Use "Digital Rain", "Retro Arcade", or "Matrix Code" global/visual presets
- Apply "Retro CRT" or "Pixelated" effect presets
- Enable scanlines and chromatic aberration

**For Research & Analysis:**
- Start with minimal effects ("Klar" preset)
- Use "Monochrome" visual preset to focus on structure
- Adjust one parameter at a time
- Document emergent properties

## Architecture

### Technology Stack

- **Frontend**: React 19 + TypeScript
- **State Management**: Zustand
- **Build Tool**: Vite
- **Rendering**: Canvas API (2D)
- **Styling**: Inline React styles

### Project Structure

```
parametric-explorer/
├── src/
│   ├── components/              # React components
│   │   ├── CanvasPanel.tsx           # Main canvas rendering
│   │   ├── ControlBar.tsx            # Play/pause/reset controls
│   │   ├── ParameterControlCenter.tsx # Tab navigation
│   │   ├── ParameterSlider.tsx       # Reusable slider component
│   │   ├── PhysicalOikosPanel.tsx    # Physical parameters
│   │   ├── SemioticOikosPanel.tsx    # Semiotic parameters
│   │   ├── TemporalOikosPanel.tsx    # Temporal parameters
│   │   ├── ResonanceOikosPanel.tsx   # Resonance parameters
│   │   ├── VisualizationOikosPanel.tsx # Visual parameters
│   │   ├── EffectsOikosPanel.tsx     # Post-processing effects
│   │   ├── PerformanceOikosPanel.tsx # Performance settings
│   │   ├── MatrixControlCenter.tsx   # (Future: Matrix integration)
│   │   └── PresetGallery.tsx         # Global preset cards
│   ├── engine/                  # Simulation logic
│   │   └── SimulationEngine.ts       # Core agent-based simulation
│   ├── store/                   # State management
│   │   └── useSimulationStore.ts     # Zustand store
│   ├── types/                   # TypeScript definitions
│   │   └── index.ts                  # All type definitions
│   ├── presets/                 # Curated configurations
│   │   ├── index.ts                  # Global presets (8)
│   │   └── tabPresets.ts             # Tab-specific presets (43)
│   ├── App.tsx                  # Main application + fullscreen
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── vite.config.ts               # Vite build config
└── eslint.config.js             # ESLint config
```

### Core Concepts

#### Simulation Engine
- Agent-based model with 3 species (red, green, blue)
- Chemical trail deposition with **8-connected diffusion** (includes diagonal neighbors for smoother, more natural patterns)
- Sensory-motor coupling (sense → interpret → move → deposit)
- Rhythmic perturbation for chaos injection
- **Critical fix**: Diffusion frequency is inverted (lower value = more frequent = more diffusion)

#### Parameter-Oikos Organization
Parameters are organized into **7 "Oikos"** (ecological) dimensions based on their role in structuring emergent patterns:
1. **Physical**: Environmental constraints (trace persistence, diffusion, saturation)
2. **Semiotic**: Sign production and perception (species behavior)
3. **Temporal**: Time-based dynamics (speed, population, chaos)
4. **Resonance**: Inter-system coupling (attraction/repulsion)
5. **Visualization**: Visual appearance (colors, brightness, blend modes) - does not affect simulation
6. **Effects**: Post-processing effects (blur, bloom, distortion, etc.) - does not affect simulation
7. **Performance**: Quality settings and auto-optimization - affects rendering performance

#### Preset System
- **Global Presets**: 8 full-parameter configurations for extreme/canonical states
- **Tab Presets**: 43 dimension-specific presets for targeted exploration
- **Mix & Match**: Combine tab presets from different dimensions to discover novel patterns

#### Blend Modes
Four distinct blend modes create different visual aesthetics:
- **Additive**: Classic glow effect, colors brighten on overlap (best for dark backgrounds)
- **Screen**: Soft glow, less intense than additive (great for vibrant colors)
- **Multiply**: Darkens on overlap, creates lava lamp effect (works with bright backgrounds)
- **Average**: Balanced blend, maintains color balance

#### Post-Processing Pipeline
Effects are applied in the following order:
1. Base simulation rendering
2. Blur (Gaussian)
3. Motion blur (frame persistence)
4. Bloom (additive glow)
5. Color grading (saturation, contrast, hue shift)
6. Chromatic aberration (RGB offset)
7. Wave distortion (sine warping)
8. Vignette (edge darkening)
9. Scanlines (CRT effect)
10. Pixelation (retro block effect)

#### Auto-Optimizer
The performance system uses a 10-level optimization strategy:
- **Level 0**: Full quality (no optimization)
- **Levels 1-2**: Disable expensive effects (wave distortion, chromatic aberration)
- **Levels 3-4**: Reduce bloom, blur, motion blur
- **Levels 5-8**: Progressively reduce agent count
- **Levels 9-10**: Minimum agents (150) + fastest trails

When FPS drops below 50% of target, the system jumps 3 levels (aggressive mode). When performance is stable above target, quality gradually restores.

### Key Improvements & Fixes

This implementation includes several critical fixes and enhancements:

#### 1. Fixed Diffusion Logic (Critical)
The diffusion frequency parameter was initially inverted. In the original MYZEL code:
- `diffusionFreq = 1` → diffuse every frame (maximum diffusion)
- `diffusionFreq = 10` → diffuse every 10th frame (minimal diffusion)

This fix enabled the full range of emergent behaviors from crystalline rigidity to fluid organicism.

#### 2. 8-Connected Diffusion (Major Enhancement)
Upgraded from 4-connected (cardinal directions only) to 8-connected diffusion that includes diagonal neighbors:
```
Before (4-connected):  After (8-connected):
      N                   NW  N  NE
   W  •  E               W   •   E
      S                   SW  S  SE
```
This produces smoother, more natural-looking patterns and eliminates grid artifacts.

#### 3. Expanded Parameter Ranges
Parameter ranges were widened based on empirical testing to enable greater diversity:
- Agent count: 500-10K → 150-14K
- Sensor distance: 10-40 → 5-75
- Speed: 0.5-3.0 → 0.15-5.5
- Sensor angle: 0.2-1.2 → 0.15-1.8

#### 4. Advanced Visual System
Added comprehensive visual control:
- 4 blend modes (additive, screen, multiply, average)
- Trail intensity control (50-255)
- 16 visual presets
- Independent color control per species

#### 5. Post-Processing Effects
Complete effects suite:
- 11 distinct effect parameters
- 9 curated effect presets
- Real-time effect preview
- Performance-aware effect scaling

#### 6. Performance Optimization
Intelligent auto-optimizer:
- 10-level progressive optimization
- Automatic FPS monitoring
- 4 quality presets
- Graceful degradation and recovery

#### 7. Layout Optimization
Moved controls below canvas (instead of beside) for better visual focus and added fullscreen mode for immersive viewing.

#### 8. Visualization Independence
Separated visualization and effects parameters from simulation dynamics, allowing aesthetic customization without affecting emergent properties.

## Theoretical Framework

This tool is based on the **Parametrics** framework, which reconceptualizes parameters as:

> **Co-constitutive forces that structure the possibility spaces within which self-organization occurs**

Rather than viewing parameters as passive settings to optimize, Parametrics recognizes that:

1. **Parameters create coordination niches** analogous to ecological niches
2. **Recursive co-constitution** produces path-dependent dynamics
3. **Emergent irreversibility** arises from accumulated parameter-structured interactions

For detailed theoretical background, see `parametrics_paper_draft.md` and `Parameter_Oikos_Matrix.md`

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

### Entertainment & Wellness
- **Meditation Aid**: Use "Meditation" effect preset with slow, flowing patterns
- **Ambient Display**: Perfect for background visuals in cafes, lounges, or home
- **Screen Saver**: Endless variation, never repeats exactly
- **Stress Relief**: Watch emergent patterns form and dissolve

## Roadmap

### Phase 1: Core MVP ✅ **COMPLETE**
- ✅ 8-connected diffusion simulation engine
- ✅ Canvas visualization with fullscreen mode
- ✅ 7-dimensional parameter controls (Physical, Semiotic, Temporal, Resonance, Visualization, Effects, Performance)
- ✅ 8 global presets + 43 tab-specific presets (51 total!)
- ✅ Screenshot export
- ✅ Real-time parameter manipulation
- ✅ 4 blend modes (additive, screen, multiply, average)
- ✅ 11 post-processing effects
- ✅ Auto-optimizer with 10-level adaptive quality
- ✅ 4 quality presets (low, medium, high, ultra)
- ✅ Critical fixes: inverted diffusion logic, expanded ranges, layout optimization

### Phase 2: Metrics & Analysis (Planned)
- Real-time emergent property calculation
- Time series graphs
- Pattern classification
- Experiment logging
- Export parameter configurations as JSON
- Import custom configurations

### Phase 3: Matrix Integration (Planned)
- Parameter-Oikos-Matrix visualization
- Effect heatmap
- Parameter space mapping
- Recommendation engine

### Phase 4: Advanced Features (Planned)
- Parameter sweep mode (animate through parameter range)
- Comparison tools (side-by-side view)
- Recipe builder (save/load custom configurations)
- Fingerprint analyzer (identify pattern types)
- Species-specific parameter control
- Video export

### Phase 5: Polish & Optimization (Planned)
- Performance optimization (WebGL renderer, worker threads)
- Progressive disclosure UI
- Accessibility improvements (keyboard navigation, screen reader support)
- Mobile responsiveness
- Touch gesture support
- PWA support (offline mode)

## Contributing

This project is part of the Parametrik-Labor research initiative. Contributions are welcome!

### Development Guidelines

- Follow TypeScript strict mode
- Use functional components with hooks
- Maintain separation of concerns (engine, UI, state)
- Document parameter effects based on observations
- Add new presets via `src/presets/` files
- Test performance impact of new features

### Adding New Presets

**Global Presets** (`src/presets/index.ts`):
```typescript
const newPreset: Preset = {
  name: 'My Preset',
  icon: '🌟',
  description: 'What makes this preset special',
  parameters: {
    physical: { ... },
    semiotic: { ... },
    temporal: { ... },
    resonance: { ... },
    visualization: { ... },
    effects: { ... },
    performance: defaultPerformanceParams,
  },
};
```

**Tab Presets** (`src/presets/tabPresets.ts`):
Add to the appropriate array (`visualPresets`, `physicsPresets`, `speciesPresets`, `temporalPresets`, `effectsPresets`).

## License

MIT License - See LICENSE file for details

## Acknowledgments

Based on research into:
- Stigmergy and self-organization
- Parametric systems theory
- Agent-based modeling
- Complex adaptive systems
- Generative art and creative coding

Inspired by:
- Physarum polycephalum (slime mold) behavior
- Ant colony optimization
- Reaction-diffusion systems
- Cellular automata

## Technical Details

### Performance Characteristics

**Typical Performance:**
- High Quality (3K agents): 60 FPS on modern hardware
- Ultra Quality (5K agents): 45-60 FPS on high-end hardware
- Low Quality (800 agents): 60 FPS on older hardware

**Optimization Techniques:**
- RequestAnimationFrame-based rendering
- Adaptive quality scaling
- Progressive effect disabling
- Agent count reduction
- Efficient Uint8ClampedArray for trail data
- Optimized diffusion algorithm (8-connected neighborhood)

### Browser Compatibility

- Chrome/Edge 90+ (recommended)
- Firefox 88+
- Safari 14+
- No IE support (uses modern ES6+ features)

### Known Limitations

- Canvas-based rendering (WebGL version planned for Phase 5)
- Single-threaded simulation (worker threads planned for Phase 5)
- No mobile touch gestures (planned for Phase 5)
- Screenshot quality limited by canvas resolution

---

**Version**: 2.0.0 (Phase 1 Complete - Ultimate Visual Edition)
**Status**: Production-ready with 51 presets, 7 parameter dimensions, 4 blend modes, 11 effects, and adaptive performance optimization
**Last Updated**: 2025-11-09

### Recent Updates (2025-11-09)
- ✅ Complete overhaul with 51 total presets (8 global + 43 tab-specific)
- ✅ Added Effects Oikos with 11 post-processing parameters and 9 presets
- ✅ Added Performance Oikos with auto-optimizer and 4 quality presets
- ✅ Expanded Visualization Oikos to 16 visual presets
- ✅ Added 4 blend modes (additive, screen, multiply, average)
- ✅ Added trail intensity control
- ✅ Redesigned global presets as visual showpieces
- ✅ Implemented 10-level adaptive performance optimization
- ✅ Real-time FPS monitoring and display
- ✅ Enhanced parameter ranges and simulation stability
- ✅ Comprehensive documentation update

---

**Ready to explore emergent coordination? Load a preset and press Play!** 🚀
