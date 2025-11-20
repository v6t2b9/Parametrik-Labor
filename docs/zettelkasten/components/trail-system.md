---
id: component-trail-system
title: Trail System
type: component
category: simulation-core
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [component, trails, pheromones, decay, diffusion]
related:
  - "[[agent-system]]"
  - "[[quantum-stigmergy-engine]]"
  - "[[../parameters/decay-rate.md]]"
sources:
  - "[[../../development/ARCHITECTURE.md]]"
---

## Definition

**Trail System** verwaltet die Trail-Map (Pheromone-Verteilung), implementiert Decay (Vergessen) und optionale Diffusion (räumliche Ausbreitung).

## Trail-Map Struktur

```typescript
// Float32Array für Performance
private trailMap: Float32Array

// Indexierung: trailMap[y * width + x]
// Werte: 0.0 - 255.0 (Trail-Intensität)
```

## Kern-Operationen

### 1. Decay (Temporal Forgetting)

```yaml
Funktion: decayTrails(decayRate)

Algorithmus:
  for (let i = 0; i < trailMap.length; i++):
    trailMap[i] *= decayRate

Effekt:
  - decayRate = 0.95: Trail reduziert sich um 5% pro Frame
  - decayRate = 0.99: Trail reduziert sich um 1% pro Frame
  → Höherer Decay = längeres "Gedächtnis"

Siehe: [[../parameters/decay-rate.md]]
```

### 2. Diffusion (Spatial Spreading)

```yaml
Funktion: diffuseTrails(diffusionFreq)

Algorithmus (Gauss-Blur-ähnlich):
  newMap = convolve(trailMap, kernel)
  
  kernel (3×3):
    [0.0625, 0.125, 0.0625]
    [0.125,  0.25,  0.125 ]
    [0.0625, 0.125, 0.0625]

Effekt:
  - diffusionFreq = 0: Keine Diffusion (scharfe Trails)
  - diffusionFreq = 5: Moderate Diffusion (organische Trails)
  - diffusionFreq = 10: Starke Diffusion (diffuse Trails)

Siehe: [[../parameters/diffusion.md]]
```

### 3. Trail Saturation (Limits)

```yaml
Funktion: Begrenzung der maximalen Intensität

Algorithmus:
  if (trailMap[i] > trailSaturation):
    trailMap[i] = trailSaturation

Effekt:
  - Verhindert unbegrenztes Wachstum
  - Schafft "Decken-Effekt" (Selbstlimitierung)
  - Nicht-triviale Attraktoren

Siehe: [[../parameters/trail-saturation.md]]
```

## Decay × Diffusion Trade-off

```yaml
Interaktion: Antagonistisch

Hoher Decay + niedrige Diffusion:
  → Scharfe, stabile Strukturen (Kristallin)
  
Hoher Decay + hohe Diffusion:
  → Konflikt: Decay versucht zu schärfen, Diffusion verwischt
  → Moderate Stabilität (Fluid)

Niedriger Decay + hohe Diffusion:
  → Diffuse, chaotische Muster

Siehe: [[../meta/map-parameter-effects.md#parameter-interdependenzen]]
```

## Verwandte Komponenten

- [[agent-system]] - Agents schreiben auf Trail-Map (Deposit)
- [[webgl-renderer]] - Visualisiert Trail-Map

## Verwandte Konzepte

- [[../concepts/stigmergy.md]] - Trails als stigmergische Zeichen
- [[../properties/stability.md]] - Decay beeinflusst Stabilität
- [[../properties/crystallinity.md]] - Niedriger Decay + niedrige Diffusion → kristallin
