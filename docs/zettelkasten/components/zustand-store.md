---
id: component-zustand-store
title: Zustand State Management
type: component
category: state-management
status: active
location: src/store/
created: 2025-11-20
updated: 2025-11-20
tags: [component, state, zustand, parameters]
related:
  - "[[quantum-stigmergy-engine]]"
  - "[[react-components]]"
sources:
  - "[[../../development/ARCHITECTURE.md]]"
---

## Definition

**Zustand Store** verwaltet den globalen Application State (Parameter, Simulation State, UI State) mit Zustand (React State Management Library).

## Store-Struktur

```typescript
interface AppState {
  // Simulation Parameters (alle 15+ Parameter)
  numAgents: number
  sensorAngle: number
  sensorDist: number
  decayRate: number
  // ... (siehe [[../meta/map-parameter-effects.md]] für alle)
  
  // Simulation State
  isRunning: boolean
  isPaused: boolean
  currentFrame: number
  
  // UI State
  aspectRatio: '16:9' | '1:1' | 'fullscreen'
  selectedMode: 'myzel' | 'stigmergie' | 'resonanz'
  
  // Actions
  setParameter: (key: string, value: any) => void
  reset: () => void
  loadPreset: (preset: PresetName) => void
}
```

## Parameter-Flow

```yaml
User Input (UI) → Zustand Store → QuantumStigmergyEngine

Beispiel:
  1. User ändert Decay Slider (React Component)
  2. Component ruft setParameter('decayRate', 0.98)
  3. Zustand Store updated State
  4. Engine liest neuen Wert im nächsten Frame
```

## Presets

```yaml
Funktion: loadPreset(presetName)

Presets:
  - RESONANZ: Standard-Preset (Multi-Spezies, Segregation)
  - MYZEL: Single-Spezies, hohe Decay
  - STIGMERGIE: Multi-Spezies, isoliert
  - CRYSTAL: Maximale Kristallinität (Decay: 0.99, Diffusion: 0)
  - CHAOS: Maximales Chaos (Decay: 0.85, hohe Speed)

Implementierung:
  - Preset lädt vordefiniertes Parameter-Set
  - Alle 15+ Parameter werden gleichzeitig gesetzt
```

## Verwandte Komponenten

- [[react-components]] - UI Komponenten lesen/schreiben State
- [[quantum-stigmergy-engine]] - Engine liest Parameter aus Store

## Verwandte Konzepte

- [[../meta/map-parameter-effects.md]] - Dokumentiert alle Parameter im Store
