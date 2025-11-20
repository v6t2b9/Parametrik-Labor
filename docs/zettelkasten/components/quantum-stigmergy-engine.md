---
id: component-quantum-stigmergy-engine
title: QuantumStigmergyEngine
type: component
category: simulation-engine
status: active
location: src/engine/QuantumStigmergyEngine.ts
created: 2025-11-20
updated: 2025-11-20
tags: [component, engine, simulation, core]
related:
  - "[[agent-system]]"
  - "[[trail-system]]"
  - "[[../concepts/stigmergy.md]]"
sources:
  - "[[../../development/ARCHITECTURE.md]]"
---

## Definition

**QuantumStigmergyEngine** ist die Kern-Simulations-Engine des Parametrik-Labors, die stigmergische Agent-Trail-Interaktionen mit drei Modell-Varianten (M1, M2, M3) implementiert.

## Aufgabe

```yaml
Hauptfunktion:
  - Agent-Update-Loop (Sense → Turn → Move → Deposit)
  - Trail-Decay und -Diffusion
  - Koordination zwischen Agents und Trails
  - Model-spezifische Logik (M1/M2/M3)
```

## Architektur

```typescript
class QuantumStigmergyEngine {
  // State
  private agents: Agent[]
  private trailMap: Float32Array  // Width × Height
  private width: number
  private height: number
  
  // Main Loop
  update(deltaTime: number, params: SimulationParameters) {
    // 1. Agent Loop: Sense → Turn → Move → Deposit
    // 2. Trail Decay
    // 3. (Optional) Trail Diffusion
  }
}
```

## Update-Loop (Kern-Algorithmus)

```yaml
Für jeden Frame:
  1. Für jeden Agent:
     a) Sense: Trail-Map an Sensor-Positionen abfragen
     b) Turn: Richtung basierend auf Sensed Data anpassen
     c) Move: Position aktualisieren
     d) Deposit: Trail auf Map schreiben
  
  2. Trail Decay: trailMap *= decayRate
  
  3. (Optional) Diffusion: trailMap = blur(trailMap)
```

## Drei Modell-Varianten

### M1: Classical Stigmergy

```yaml
Sensing: Forward, Left, Right Sensoren
Turn Logic: Drehe zu höchster Konzentration
Deposition: Konstant (deposit-amount)

Charakteristik: Klassische Physarum-artig
```

### M2: Context-Switching

```yaml
Modes: explore (niedrige Dichte) / exploit (hohe Dichte)
Turn Logic: Modus-abhängig (explore = random, exploit = gradient-following)
Deposition: Modus-abhängig

Charakteristik: Adaptive Verhaltens-Switching
```

### M3: Quantum-Inspired

```yaml
Quantum State: Phase, Amplitude, Coherence Time
Turn Logic: Phase-beeinflusst
Deposition: Phase-moduliert (Interferenz-Muster)

Charakteristik: Emergente Interferenz-Effekte
```

## Verwandte Komponenten

- [[agent-system]] - Agent-Struktur und Verhalten
- [[trail-system]] - Trail-Map und Decay-Logik
- [[zustand-store]] - Empfängt Parameter von State Management

## Verwandte Konzepte

- [[../concepts/stigmergy.md]] - Theoretische Grundlage
- [[../parameters/decay-rate.md]] - Kernparameter für Trail-Persistenz
- [[../parameters/sensor-distance.md]] - Bestimmt Sensing-Radius
