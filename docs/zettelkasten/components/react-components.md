---
id: component-react-components
title: React Component Tree
type: component
category: ui
status: active
location: src/components/
created: 2025-11-20
updated: 2025-11-20
tags: [component, react, ui, panels]
related:
  - "[[zustand-store]]"
  - "[[webgl-renderer]]"
sources:
  - "[[../../development/ARCHITECTURE.md]]"
---

## Definition

**React Component Tree** implementiert die UI-Struktur mit Parameter-Control-Panels, Canvas-Display, und Toolbar.

## Component-Hierarchie

```yaml
MatrixControlCenter (Root Layout)
├── ControlBar (Top Toolbar)
│   ├── Mode Selector (MYZEL / STIGMERGIE / RESONANZ)
│   ├── Preset Loader
│   └── Play/Pause/Reset Controls
│
├── CanvasPanel (Center)
│   └── WebGL Canvas (Trail Visualization)
│
└── ParameterControlCenter (Right Sidebar)
    ├── ModelOikosPanel (Mode Selection)
    ├── PhysicalOikosPanel (Decay, Diffusion, Fade, Saturation)
    ├── SemioticOikosPanel (Sensor Distance/Angle, Deposit, Turn Speed)
    ├── TemporalOikosPanel (Speed, Agent Count, Chaos)
    ├── ResonanceOikosPanel (Attraction, Repulsion)
    ├── VisualsOikosPanel (Brightness, Glow, Contrast)
    ├── EffectsOikosPanel (Bloom, Blur)
    └── PerformanceOikosPanel (FPS, Canvas Size)
```

## Oikos-Panels (Parameter-Groups)

### PhysicalOikosPanel

```yaml
Parameter:
  - decayRate: Slider (0.85 - 0.999)
  - diffusion: Slider (0 - 10)
  - fadeStrength: Slider (0.0 - 1.0)
  - trailSaturation: Slider (100 - 255)

Siehe: [[../concepts/parameter-as-oikos.md#physikalische-oikos]]
```

### SemioticOikosPanel

```yaml
Parameter:
  - sensorDist: Slider (5 - 50)
  - sensorAngle: Slider (0.1 - 1.57 radians)
  - deposit: Slider (1 - 30)
  - turnSpeed: Slider (0.1 - 1.0)

Siehe: [[../concepts/parameter-as-oikos.md#semiotische-oikos]]
```

### TemporalOikosPanel

```yaml
Parameter:
  - speed: Slider (0.5 - 5.0)
  - agentCount: Slider (100 - 10000)
  - chaosInterval: Slider (0 - 1000 frames)
  - chaosStrength: Slider (0.0 - 1.0)

Siehe: [[../concepts/parameter-as-oikos.md#temporale-oikos]]
```

### ResonanceOikosPanel

```yaml
Parameter:
  - attractionStrength: Slider (0.0 - 2.0)
  - repulsionStrength: Slider (-1.5 - 1.0)
  - crossSpeciesInteraction: Toggle (true/false)

Siehe: [[../concepts/parameter-as-oikos.md#resonanz-oikos]]
```

## Verwandte Komponenten

- [[zustand-store]] - Components lesen/schreiben State
- [[webgl-renderer]] - Canvas-Panel zeigt Rendering

## Verwandte Konzepte

- [[../concepts/parameter-as-oikos.md]] - UI-Panels organisiert nach Oikos-Dimensionen
