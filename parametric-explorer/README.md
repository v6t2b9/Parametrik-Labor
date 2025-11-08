# Parametric Space Explorer

An interactive visualization tool for exploring emergent coordination patterns through parameter manipulation, based on the **Parametrics** theoretical framework.

## Overview

This application transforms parameter exploration from trial-and-error into systematic scientific investigation. Rather than treating parameters as mere "settings," the Parametric Space Explorer treats them as **co-constitutive forces** that fundamentally structure the possibility spaces for emergent coordination.

## Features (Phase 1: Core MVP)

### ✅ Implemented

- **Real-time Simulation Engine**
  - Agent-based simulation with 400×400 grid
  - Multi-species interaction (red, green, blue agents)
  - Chemical trail deposition and diffusion
  - Configurable simulation speed

- **Canvas Visualization**
  - 800×800 pixel rendering
  - Real-time visualization of agent trails
  - Customizable color schemes
  - Screenshot export functionality

- **Parameter Control System**
  - **Physical Oikos**: Decay rate, diffusion, fade strength, trail saturation
  - **Semiotic Oikos**: Sensor distance/angle, deposit amount, turn speed
  - **Temporal Oikos**: Agent speed, population density, chaos injection
  - **Resonance Oikos**: Attraction/repulsion strength, cross-species interaction

- **Preset Gallery**
  - 4 curated parameter configurations:
    - 💎 **Crystal Growth**: Stable, geometric structures
    - 🌊 **Fluid Dynamics**: Flowing, organic forms
    - 🕸️ **Network Formation**: Branching, connected structures
    - 🌀 **Adaptive Disruption**: High chaos and turbulence

- **Interactive Controls**
  - Play/Pause simulation
  - Reset to initial conditions
  - Real-time parameter adjustment
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

1. **Load a Preset**: Click on one of the preset cards in the Preset Gallery
2. **Start Simulation**: Click the ▶️ Play button
3. **Experiment with Parameters**: Switch between Oikos tabs and adjust sliders
4. **Observe Emergent Patterns**: Watch how parameter changes affect the visualization
5. **Capture Results**: Use the 📸 Screenshot button to save interesting patterns

### Parameter Exploration

Each parameter tab represents a different dimension of the parameter space:

#### 🌍 Physical Oikos
Controls trace materiality and environmental properties:
- **Decay Rate** (0.85-0.999): Higher values → longer memory → stable structures
- **Diffusion Frequency** (0-10): Higher values → smooth gradients → fluidity
- **Fade Strength** (0.05-0.3): Higher values → rapid decay → chaos
- **Trail Saturation** (100-255): Maximum trail intensity capacity

#### 🔣 Semiotic Oikos
Controls perception-action coupling:
- **Sensor Distance** (10-40): Larger range → network formation, separation
- **Sensor Angle** (0.2-1.2 rad): Wider FOV → chaotic, fluid movement
- **Deposit Amount** (5-30): Higher values → dense, stable structures
- **Turn Speed** (0.1-1.0 rad): Higher values → erratic, fluid motion

#### ⏱️ Temporal Oikos
Controls dynamics and temporal structuring:
- **Agent Speed** (0.5-3.0): Higher values → chaotic, fluid patterns
- **Agent Count** (500-10000): Higher density → clustering, dense trails
- **Chaos Interval** (0-500): Periodic disruption frequency (0 = off)
- **Chaos Strength** (0.1-1.0): Perturbation intensity

#### 🎵 Resonance Oikos
Controls inter-system relations:
- **Attraction Strength** (-2.0-2.0): Same-type trail following
- **Repulsion Strength** (-2.0-2.0): Cross-type influence (negative = avoidance)
- **Cross-Species Interaction**: Enable/disable inter-species sensing

## Architecture

### Technology Stack

- **Frontend**: React 18 + TypeScript
- **State Management**: Zustand
- **Build Tool**: Vite
- **Rendering**: Canvas API

### Project Structure

```
src/
├── components/          # React components
│   ├── CanvasPanel.tsx
│   ├── ControlBar.tsx
│   ├── ParameterControlCenter.tsx
│   ├── ParameterSlider.tsx
│   ├── PhysicalOikosPanel.tsx
│   ├── SemioticOikosPanel.tsx
│   ├── TemporalOikosPanel.tsx
│   ├── ResonanceOikosPanel.tsx
│   └── PresetGallery.tsx
├── engine/              # Simulation logic
│   └── SimulationEngine.ts
├── store/               # State management
│   └── useSimulationStore.ts
├── types/               # TypeScript definitions
│   └── index.ts
├── presets/             # Curated configurations
│   └── index.ts
├── App.tsx              # Main application
└── main.tsx             # Entry point
```

### Core Concepts

#### Simulation Engine
- Agent-based model with 3 species (red, green, blue)
- Chemical trail deposition and diffusion
- Sensory-motor coupling (sense → interpret → move → deposit)
- Rhythmic perturbation for chaos injection

#### Parameter-Oikos Organization
Parameters are organized into 4 "Oikos" (ecological) dimensions based on their role in structuring emergent patterns:
1. **Physical**: Environmental constraints
2. **Semiotic**: Sign production and perception
3. **Temporal**: Time-based dynamics
4. **Resonance**: Inter-system coupling

## Theoretical Framework

This tool is based on the **Parametrics** framework, which reconceptualizes parameters as:

> **Co-constitutive forces that structure the possibility spaces within which self-organization occurs**

Rather than viewing parameters as passive settings to optimize, Parametrics recognizes that:

1. **Parameters create coordination niches** analogous to ecological niches
2. **Recursive co-constitution** produces path-dependent dynamics
3. **Emergent irreversibility** arises from accumulated parameter-structured interactions

For detailed theoretical background, see `../parametrics_paper_draft.md` and `../Parameter_Oikos_Matrix.md`

## Roadmap

### Phase 1: Core MVP ✅ (Current)
- Basic simulation engine
- Canvas visualization
- Parameter controls
- Preset system

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

**Version**: 1.0.0 (Phase 1)
**Status**: Core MVP Complete
**Last Updated**: 2025-11-08
