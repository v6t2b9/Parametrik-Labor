---
id: method-systematic-variation
title: Systematische Variation
type: method
category: experimental-methodology
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [method, experiment, variation, isolation, ceteris-paribus]
related:
  - "[[../concepts/parameter-as-oikos.md|Parameter-as-Oikos]]"
  - "[[single-parameter-variation]]"
  - "[[parameter-combination]]"
sources:
  - "[[../../experiments/Experimentelle_Sektion_Index.md]]"
  - "[[../../experiments/Template_Parameter_Experiment.md]]"
---

## Definition

**Systematische Variation** ist die experimentelle Methode, bei der **ein Parameter variiert** wird, während **alle anderen Parameter konstant gehalten** werden (ceteris paribus).

## Prinzip

```yaml
Ziel: Isolierter Effekt eines Parameters verstehen

Methode:
  - Wähle EINEN Parameter (z.B. Decay Rate)
  - Definiere Variations-Range (z.B. 0.85, 0.90, 0.95, 0.99)
  - Halte ALLE anderen Parameter konstant (Baseline)
  - Dokumentiere Ausgangszustand, Variation, beobachteten Effekt
```

## Theoretischer Hintergrund

Systematische Variation basiert auf dem **ceteris paribus**-Prinzip der experimentellen Wissenschaft:

**Wenn nur X variiert und Y sich ändert** → X beeinflusst Y

Ohne systematische Variation:
- ❌ Mehrere Parameter ändern sich → Ursache-Wirkungs-Beziehung unklar
- ❌ "Was hat den Effekt verursacht?" → Nicht beantwortbar

Mit systematischer Variation:
- ✅ Ein Parameter ändert sich → Ursache identifizierbar
- ✅ "Welchen Effekt hat Parameter X?" → Beantwortbar

## Anwendung im Ökosemiotischen Kontext

### Parameter-Oikos-Isolation

Da Parameter **ko-konstituierende Umwelten** sind (siehe [[../concepts/parameter-as-oikos.md]]), ermöglicht systematische Variation:

1. **Oikos-Effekt isolieren**: Wie verändert diese spezifische Umwelt-Dimension das emergente Muster?
2. **Schwellenwerte identifizieren**: Ab welchem Wert ändert sich qualitativ das Verhalten?
3. **Effekt-Stärke quantifizieren**: Wie stark ist der Einfluss dieses Parameters?

### Beispiel: Decay Rate Variation

```yaml
Baseline (alle Parameter konstant):
  decayRate: 0.95
  diffusionFreq: 3
  deposit: 15
  attractionStrength: 1.5
  # ... alle anderen

Systematische Variation (nur Decay):
  Run 1: decayRate: 0.85 (alle anderen wie Baseline)
  Run 2: decayRate: 0.90 (alle anderen wie Baseline)
  Run 3: decayRate: 0.95 (Baseline)
  Run 4: decayRate: 0.99 (alle anderen wie Baseline)

Beobachtung:
  - Bei Decay < 0.94: Unstabile, chaotische Muster
  - Bei Decay ≥ 0.94: Stabile, persistente Cluster
  → Schwellenwert bei ~0.94 identifiziert!
```

## Variations-Strategien

### 1. Linear Spacing (gleichmäßig)

```yaml
Range: 0.0 - 1.0
Step: 0.2
Values: [0.0, 0.2, 0.4, 0.6, 0.8, 1.0]

Vorteil: Systematische Abdeckung
Nachteil: Kann interessante Bereiche überspringen
```

### 2. Logarithmic Spacing (für große Ranges)

```yaml
Range: 1 - 10000
Values: [1, 10, 100, 1000, 10000]

Vorteil: Effizient für exponentiell skalierende Parameter
Nachteil: Große Lücken zwischen Werten
```

### 3. Adaptive Spacing (iterativ verfeinern)

```yaml
# Erste Runde: Grobe Exploration
Values: [0.85, 0.90, 0.95, 0.99]

# Beobachtung: Interessanter Bereich bei 0.92-0.96
# Zweite Runde: Feine Exploration
Values: [0.92, 0.93, 0.94, 0.95, 0.96]

Vorteil: Effizient + detailliert
Nachteil: Erfordert mehrere Durchläufe
```

## Dokumentations-Anforderungen

Für **Reproduzierbarkeit** sind vollständige Parameter-Sets IMMER zu dokumentieren:

```yaml
# ❌ FALSCH (unvollständig)
Experiment: Decay Variation
  decayRate: 0.99 (variiert)
  # andere "wie üblich"

# ✅ RICHTIG (vollständig)
Experiment: Decay Variation

  Variierter Parameter:
    decayRate: 0.99

  Baseline (konstant):
    diffusionFreq: 3
    fadeStrength: 0.15
    trailSaturation: 255
    sensorDist: 15
    sensorAngle: 0.45
    deposit: 15
    turnSpeed: 0.3
    speed: 1.5
    agentCount: 3000
    chaosInterval: 0
    chaosStrength: 0.5
    attractionStrength: 1.5
    repulsionStrength: -0.5
    crossSpeciesInteraction: true
    # ... weitere Parameter
```

## Kombination mit anderen Methoden

### + [[theory-guided-hypotheses|Theorie-geleitete Hypothesen]]

```yaml
1. Theorie-Analyse: "Decay beeinflusst Stabilität (+++)"
2. Hypothese: "Höherer Decay → stabilere Muster"
3. Systematische Variation: Decay von 0.85 - 0.99
4. Validierung: Hypothese bestätigt? Ja/Nein/Teilweise
```

### + [[iterative-deepening|Iterative Vertiefung]]

```yaml
1. Systematische Variation (grob): [0.85, 0.90, 0.95, 0.99]
2. Interessanter Bereich identifiziert: 0.92-0.96
3. Systematische Variation (fein): [0.92, 0.93, 0.94, 0.95, 0.96]
4. Schwellenwert präzise lokalisiert: ~0.94
```

## Limitationen

### 1. Parameter-Interdependenzen ignoriert

**Problem**: Manche Parameter wirken **synergistisch** oder **antagonistisch**

Beispiel:
- Decay × Diffusion haben Trade-off (siehe [[../parameters/decay-rate.md#decay--diffusion-trade-off]])
- Systematische Variation nur eines Parameters zeigt nicht die volle Interaktion

**Lösung**: Ergänzend [[parameter-combination|Parameter-Kombinations-Experimente]] durchführen

### 2. "Baseline-Abhängigkeit"

**Problem**: Effekt kann von Baseline-Werten abhängen

Beispiel:
```yaml
# Baseline A: niedrige Agent Count
Decay-Variation bei agentCount: 1000
  → Schwacher Effekt

# Baseline B: hohe Agent Count
Decay-Variation bei agentCount: 8000
  → Starker Effekt

Interpretation: Decay-Effekt ist Agent-Count-abhängig!
```

**Lösung**: Mehrere Baselines testen (verschiedene "Kontexte")

### 3. Grenzfall-Blindheit

**Problem**: Systematische linear-spacing Variation kann extreme Bereiche überspringen

**Lösung**: Ergänzend [[../experiments/boundary-exploration.md|Grenzfall-Exploration]]

## Best Practices

### 1. Baseline wählen

Wähle Baseline **nahe einem bekannten stabilen Zustand**:
- ✅ Preset "RESONANZ-Modus" als Baseline
- ✅ Empirisch erprobte Parameter-Kombination
- ❌ Zufällige Parameter-Werte

### 2. Variations-Range festlegen

**Faustregel**: Abdecke den **physikalisch/semantisch sinnvollen Bereich**

```yaml
# Decay Rate
Range: 0.85 - 0.999  # ✅ Voller sinnvoller Bereich
NOT:   0.0 - 100.0   # ❌ Unsinnige Extrema (Decay > 1.0 unphysikalisch)

# Agent Count
Range: 100 - 10000   # ✅ Realistischer Bereich
NOT:   1 - 1000000   # ❌ Extreme zu groß (Performance/relevanz)
```

### 3. Step-Size anpassen

**Faustregel**: **5-7 Variations-Schritte** für ersten Durchlauf

```yaml
# Zu wenig (2-3 Schritte): Trend nicht erkennbar
Values: [0.85, 0.99]  # ❌ Nur Extrema

# Optimal (5-7 Schritte): Trend erkennbar, effizient
Values: [0.85, 0.88, 0.91, 0.94, 0.97, 0.99]  # ✅

# Zu viel (>10 Schritte): Ineffizient für erste Runde
Values: [0.85, 0.86, 0.87, ..., 0.99]  # ❌ 15 Schritte
```

### 4. Konsistente Simulation-Bedingungen

```yaml
# Für ALLE Variations-Runs identisch:
- Simulation Steps: 500
- Seed: "oekosemiotik" (oder systematisch variieren für Reproduzierbarkeits-Test)
- Canvas-Größe: 800×800
- Visualization Settings: Brightness, Glow, Contrast KONSTANT
```

## Verwandte Methoden

- [[theory-guided-hypotheses]] - Liefert Hypothesen für systematische Variation
- [[iterative-deepening]] - Verwendet systematische Variation in mehreren Runden
- [[../experiments/single-parameter-variation.md|Single-Parameter-Variation]] - Experimentklasse basierend auf dieser Methode
- [[../experiments/parameter-combination.md|Parameter-Kombination]] - Erweitert systematische Variation auf 2+ Parameter

## Verwandte Konzepte

- [[../concepts/parameter-as-oikos.md]] - Parameter als ko-konstituierende Umwelten
- [[../meta/map-parameter-effects.md]] - Aggregiert Erkenntnisse aus systematischen Variationen
- [[../concepts/emergenz.md]] - Systematische Variation zeigt emergente Schwellenwerte
