---
id: experiment-class-parameter-combination
title: Parameter-Kombination
type: experiment-class
category: experimental-design
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [experiment, combination, interaction, synergy, grid]
related:
  - "[[single-parameter-variation]]"
  - "[[../methods/systematic-variation.md]]"
  - "[[../concepts/parameter-as-oikos.md]]"
sources:
  - "[[../../experiments/Experimentelle_Sektion_Index.md]]"
---

## Definition

**Parameter-Kombination** ist eine Experimentklasse, bei der **zwei oder mehr Parameter** systematisch variiert werden, um **Interaktionseffekte** (Synergie, Antagonismus) zu identifizieren.

## Ziel

```yaml
Primäres Ziel:
  "Wie wirken Parameter X und Y zusammen?"

Sekundäre Ziele:
  - Synergetische Effekte identifizieren (X + Y > X + Y einzeln)
  - Antagonistische Effekte identifizieren (X hemmt Y)
  - "Sweet Spots" finden (optimale Kombinationen)
  - Nichtlineare Interaktionen verstehen
```

## Theoretischer Hintergrund

### Parameter-Interdependenzen

Die **Parameter-as-Oikos-Theorie** (siehe [[../concepts/parameter-as-oikos.md]]) besagt, dass Parameter **ko-konstituierende Umwelten** sind:

- Parameter wirken **nicht unabhängig**
- Parameter aus verschiedenen Oikos-Dimensionen **interagieren**
- Effekt von X kann von Wert von Y abhängen

**Beispiele bekannter Interaktionen**:

```yaml
# Decay × Diffusion (Temporal × Spatial)
Trade-off:
  - Hoher Decay + niedrige Diffusion → scharfe, stabile Strukturen
  - Hoher Decay + hohe Diffusion → Konflikt → moderate Stabilität
  - Niedriger Decay + hohe Diffusion → diffuse, chaotische Muster

# Attraction × Repulsion (Selbst × Fremd)
Komplex:
  - Hohe Attraction + starke Repulsion (-0.9) → Cluster UND Separation
  - Niedrige Attraction + schwache Repulsion → weder Cluster noch Separation
  
# Speed × Decay (Temporal × Temporal)
Synergy:
  - Hohe Speed + hoher Decay → nötig für Stabilität
  - Hohe Speed + niedriger Decay → Chaos
```

Siehe [[../meta/map-parameter-effects.md#parameter-interdependenzen|Parameter-Interdependenzen]].

## Struktur

### 2-Parameter-Grid (Standard)

```yaml
Design:
  - Parameter 1 (z.B. Decay): [0.85, 0.92, 0.99]
  - Parameter 2 (z.B. Diffusion): [0, 3, 8]
  - Grid: 3 × 3 = 9 Kombinationen

Durchführung:
  | Decay | Diffusion | Ridge Points | Muster-Typ |
  |-------|-----------|--------------|------------|
  | 0.85  | 0         | 350          | Chaotisch  |
  | 0.85  | 3         | 420          | Diffus     |
  | 0.85  | 8         | 180          | Sehr diffus|
  | 0.92  | 0         | 890          | Stabil     |
  | 0.92  | 3         | 750          | Moderat    |
  | 0.92  | 8         | 320          | Diffus     |
  | 0.99  | 0         | 1450         | Kristallin |
  | 0.99  | 3         | 980          | Stabil     |
  | 0.99  | 8         | 450          | Fluid      |

Analyse:
  - Additive Effekte? (X + Y = Summe der Einzeleffekte)
  - Nichtlineare Interaktion? (X + Y ≠ Summe)
  - Sweet Spots? (Optimale Kombination)
```

### 3-Parameter-Grid (Erweitert)

```yaml
Design:
  - Parameter 1: [Wert1, Wert2]
  - Parameter 2: [Wert1, Wert2]
  - Parameter 3: [Wert1, Wert2]
  - Grid: 2 × 2 × 2 = 8 Kombinationen

Warnung: Skaliert exponentiell!
  - 3 Parameter, 3 Werte: 27 Runs
  - 4 Parameter, 3 Werte: 81 Runs
  → Schnell unpraktisch
```

**Empfehlung**: Beschränke auf 2-Parameter-Grids, nutze [[single-parameter-variation]] für Vorauswahl.

## Arten von Interaktionen

### 1. Additive Effekte (keine Interaktion)

```yaml
Effekt von X + Effekt von Y = Gesamt-Effekt

Beispiel:
  deposit: 20 → Ridge Points: +300
  agentCount: 6000 → Ridge Points: +400
  deposit: 20 + agentCount: 6000 → Ridge Points: +700

Interpretation: deposit und agentCount wirken unabhängig
```

### 2. Synergetische Effekte (positive Interaktion)

```yaml
Effekt von X + Y > Effekt von X + Effekt von Y

Beispiel:
  deposit: 20 → Ridge Points: +300
  agentCount: 6000 → Ridge Points: +400
  deposit: 20 + agentCount: 6000 → Ridge Points: +1200  # Mehr als 700!

Interpretation: deposit und agentCount verstärken sich gegenseitig
Mechanismus: Mehr Agents + mehr Deposit → super-lineare Akkumulation
```

### 3. Antagonistische Effekte (negative Interaktion)

```yaml
Effekt von X + Y < Effekt von X + Effekt von Y

Beispiel:
  decay: 0.99 → Stabilität: +++
  diffusion: 8 → Stabilität: - (reduziert)
  decay: 0.99 + diffusion: 8 → Stabilität: + (nur moderat)

Interpretation: diffusion hemmt decay-Effekt
Mechanismus: Decay versucht zu schärfen, Diffusion versucht zu verwischen
```

### 4. Qualitative Umkehrung (komplexe Interaktion)

```yaml
Effekt von X ändert VORZEICHEN abhängig von Y

Beispiel:
  attractionStrength: 1.8 + repulsionStrength: 0.0
    → Clusterbildung: +++, Separation: 0

  attractionStrength: 1.8 + repulsionStrength: -0.9
    → Clusterbildung: +++, Separation: +++  # Beides gleichzeitig!

Interpretation: Repulsion schaltet Separation "ein", ohne Attraction zu hemmen
```

## Anwendungsfälle

### 1. Trade-off-Exploration

**Situation**: Zwei Parameter haben gegenläufige Effekte

```yaml
Beispiel: Decay × Diffusion

Frage: "Wie balanciert man scharfe Kanten (Decay) und organische Fluidität (Diffusion)?"

Design:
  decay: [0.94, 0.96, 0.98, 0.99]
  diffusion: [0, 1, 3, 6, 9]
  → 4 × 5 = 20 Kombinationen

Erwartetes Ergebnis:
  - "Sweet Spot" bei decay: 0.97 + diffusion: 3
  → Balance zwischen Schärfe und Fluidität
```

### 2. Synergie-Identifikation

**Situation**: Vermutung dass Parameter sich verstärken

```yaml
Beispiel: Deposit × Agent Count

Hypothese: "Deposit und Agent Count wirken synergetisch (super-linear)"

Design:
  deposit: [10, 20, 30]
  agentCount: [2000, 5000, 8000]
  → 3 × 3 = 9 Kombinationen

Erwartetes Ergebnis:
  - deposit: 30 + agentCount: 8000 → Ridge Points >> einzelne Effekte
  → Synergie bestätigt
```

### 3. Oikos-Interaktion verstehen

**Situation**: Wie wirken Parameter aus verschiedenen Oikos-Dimensionen zusammen?

```yaml
Beispiel: Speed (Temporal) × Chaos-Interval (Temporal)

Frage: "Wie beeinflusst Geschwindigkeit die Chaos-Injection-Dynamik?"

Design:
  speed: [1.0, 2.0, 3.0]
  chaosInterval: [0, 250, 500]
  → 3 × 3 = 9 Kombinationen

Erwartetes Ergebnis:
  - Bei hoher Speed: Chaos-Interval-Effekt verstärkt
  - Bei niedriger Speed: Chaos-Interval-Effekt gedämpft
```

## Beispiel-Experimente

### Experiment: Decay × Diffusion (geplant)

```yaml
ID: [[Experiment_Decay_x_Diffusion]]

Parameter 1: decayRate [0.90, 0.95, 0.99]
Parameter 2: diffusionFreq [0, 3, 8]
Grid: 3 × 3 = 9 Runs

Hypothese: "Decay und Diffusion haben Trade-off (temporal vs. spatial)"

Erwartete Interaktion: Antagonistisch
  - Hoher Decay + niedrige Diffusion → maximale Schärfe (Kristallinität)
  - Hoher Decay + hohe Diffusion → Konflikt → moderate Schärfe (Fluidität)
```

### Experiment: Sensor Distance × Repulsion

```yaml
ID: [[Experiment_Sensor_x_Resonanz]]

Parameter 1: sensorDist [10, 20, 30, 40]
Parameter 2: repulsionStrength [-1.0, -0.5, 0.0]
Grid: 4 × 3 = 12 Runs

Hypothese: "Separation braucht BEIDES: Fernwahrnehmung UND Repulsion"

Erwartete Interaktion: Synergetisch (notwendige Bedingungen)
  - sensorDist > 25 + repulsion < -0.5 → Separation
  - sensorDist < 20 ODER repulsion > -0.3 → KEINE Separation
```

## Analyse-Methoden

### Heatmap-Visualisierung

```yaml
# Beispiel: Ridge Points als Funktion von Decay × Diffusion

         Diffusion: 0    3    8
Decay:
0.90                450  520  280
0.95                890  750  420
0.99                1450 980  550

Heatmap: Dunkel (niedrig) → Hell (hoch)
  → Visuell erkennbar: Diagonal-Muster (Trade-off)
```

### Interaktions-Plot

```yaml
# Linien-Diagramm

X-Achse: Parameter 1 (z.B. Decay)
Y-Achse: Metrik (z.B. Ridge Points)
Linien: Verschiedene Werte von Parameter 2 (z.B. Diffusion 0, 3, 8)

Interpretation:
  - Parallele Linien → Additive Effekte
  - Konvergierende/Divergierende Linien → Interaktion
  - Kreuzende Linien → Komplexe Interaktion
```

## Best Practices

### 1. Vorauswahl durch Einzelparameter-Variation

```yaml
Workflow:
  1. Einzelparameter-Variationen für X und Y
  2. Identifiziere jeweils interessante Bereiche
  3. Kombiniere diese Bereiche in Grid

# Statt blind alle Kombinationen testen
```

### 2. Grobe Grid zuerst

```yaml
# Runde 1 (grob)
Grid: 3 × 3 = 9 Runs

# Falls Interaktion erkennbar:
# Runde 2 (fein) in interessantem Bereich
Grid: 5 × 5 (Teilbereich) = 25 Runs
```

### 3. Dokumentiere ALLE Kombinationen

```yaml
# ✅ RICHTIG
Tabelle mit allen 9 Kombinationen

# ❌ FALSCH
"Haben verschiedene Kombinationen getestet, interessanteste war..."
  → Nicht reproduzierbar, unvollständige Daten
```

## Limitationen

### Skalierungs-Problem

```yaml
# Exponentielles Wachstum
2 Parameter, 3 Werte: 9 Runs
3 Parameter, 3 Werte: 27 Runs
4 Parameter, 3 Werte: 81 Runs
5 Parameter, 3 Werte: 243 Runs  # Unpraktisch!
```

**Lösung**: Fokus auf **paarweise** Kombinationen (2-Parameter-Grids)

### Baseline-Wahl kritischer

Alle **nicht-variierten** Parameter müssen konstant sein:
- Bei 2 Parametern variiert, bleiben ~13 andere konstant
- Baseline-Wahl beeinflusst Interaktions-Effekt

## Verwandte Experimentklassen

- [[single-parameter-variation]] - Vorauswahl für Kombinations-Experimente
- [[boundary-exploration]] - Kann extreme Kombinationen testen
- [[mode-comparison]] - Vergleicht Modi bei festen Parameter-Kombinationen

## Verwandte Methoden

- [[../methods/systematic-variation.md]] - Angewendet auf 2 Dimensionen (Grid)
- [[../methods/iterative-deepening.md]] - Grobe → feine Grids

## Verwandte Konzepte

- [[../concepts/parameter-as-oikos.md]] - Parameter als ko-konstituierende Umwelten → Interaktionen erwartet
- [[../meta/map-parameter-effects.md#parameter-interdependenzen]] - Dokumentiert bekannte Interaktionen
