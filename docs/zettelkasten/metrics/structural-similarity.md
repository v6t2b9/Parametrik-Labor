---
id: metric-structural-similarity
title: Strukturelle Ähnlichkeit
type: metric
category: quantitative-measurement
status: implemented
created: 2025-11-20
updated: 2025-11-20
tags: [metric, similarity, comparison, fingerprint, hash]
related:
  - "[[ridge-point-analysis]]"
  - "[[../methods/qualitative-quantitative-capture.md]]"
sources:
  - "[[../../experiments/Experimentelle_Sektion_Index.md]]"
---

## Definition

**Strukturelle Ähnlichkeit** ist eine Metrik, die **Pattern-Hashes** (Fingerabdrücke) von zwei Mustern vergleicht, um ihre **Ähnlichkeit** zu quantifizieren.

## Konzept

```yaml
Idee:
  - Zwei Muster A und B
  - Jedes Muster hat Ridge Points (siehe [[ridge-point-analysis]])
  - Ridge Points → Pattern-Hash (Fingerabdruck)
  - Vergleiche Hashes → Similarity-Score (0.0 - 1.0)
```

## Implementation

```javascript
// Hamming-Distance zwischen Pattern-Hashes
function calculateSimilarity(hashA, hashB) {
  // Finde Matches
  let matches = 0;
  
  for (const pointA of hashA) {
    for (const pointB of hashB) {
      // Match wenn Position, Intensität, Farbe "nahe genug"
      if (
        Math.abs(pointA.x - pointB.x) <= 20 &&
        Math.abs(pointA.y - pointB.y) <= 20 &&
        Math.abs(pointA.intensity - pointB.intensity) <= 30 &&
        pointA.color === pointB.color
      ) {
        matches++;
        break;  // Zähle jeden Point nur einmal
      }
    }
  }
  
  // Similarity = Matches / Max(länge Hash A, länge Hash B)
  const similarity = matches / Math.max(hashA.length, hashB.length);
  
  return similarity;  // 0.0 - 1.0
}
```

## Similarity-Score Interpretation

```yaml
Similarity > 0.9:
  - Fast identisch
  - Visuelle Unterschiede minimal
  - Gleiche Parameter, gleicher Seed → erwartbar

Similarity 0.7 - 0.9:
  - Ähnlich
  - Erkennbar verwandt
  - Gleiche Parameter, verschiedener Seed → typisch

Similarity 0.5 - 0.7:
  - Moderat ähnlich
  - Einige gemeinsame Merkmale
  - Leicht unterschiedliche Parameter

Similarity < 0.5:
  - Sehr unterschiedlich
  - Wenige gemeinsame Merkmale
  - Stark unterschiedliche Parameter

Similarity < 0.3:
  - Praktisch unähnlich
  - Fundamental verschiedene Muster-Klassen
```

## Anwendungsfälle

### 1. Reproduzierbarkeits-Test

```yaml
Ziel: Gleicher Seed → identisches Muster?

Experiment:
  - Parameter-Set fixiert
  - Seed: "oekosemiotik"
  - Run 1: Pattern-Hash A
  - Run 2: Pattern-Hash B (gleicher Seed!)

Erwartung:
  Similarity(A, B) = 1.0 (perfekt identisch)

Ergebnis:
  Falls Similarity < 1.0 → Non-Determinismus! (Bug)
```

### 2. Seed-Sensitivität (Avalanche-Effekt)

```yaml
Ziel: Wie sensitiv ist System auf Seed-Änderung?

Experiment:
  - Parameter-Set fixiert
  - Seed 1: "oekosemiotik"
  - Seed 2: "oekosemiotik1" (minimale Änderung)
  - Vergleiche Similarity

Erwartung (Chaos-Theorie):
  Similarity < 0.5 (große Änderung trotz minimaler Seed-Differenz)

Ergebnis:
  - Falls Similarity > 0.8: Schwache Sensitivität
  - Falls Similarity < 0.5: Starke Sensitivität (Avalanche-Effekt)
```

### 3. Parameter-Effekt quantifizieren

```yaml
Ziel: Wie stark ändert Parameter X das Muster?

Experiment:
  - Baseline: Decay 0.95 → Pattern-Hash A
  - Variiert: Decay 0.85 → Pattern-Hash B
  - Similarity(A, B) = ?

Interpretation:
  - Similarity > 0.8: Parameter-Effekt gering
  - Similarity 0.5-0.8: Parameter-Effekt moderat
  - Similarity < 0.5: Parameter-Effekt stark

Beispiel:
  Decay 0.95 vs. 0.94: Similarity = 0.92 (geringer Effekt)
  Decay 0.95 vs. 0.85: Similarity = 0.31 (starker Effekt)
```

### 4. Schwellenwert-Identifikation

```yaml
Ziel: Ab welchem Wert ändert sich Muster qualitativ?

Experiment:
  - Baseline: Decay 0.95
  - Variationen: [0.94, 0.93, 0.92, 0.91, 0.90, 0.85]
  - Berechne Similarity zu Baseline

Similarity vs. Decay:
  0.95 (Baseline): 1.00
  0.94: 0.92
  0.93: 0.81
  0.92: 0.65  ← Starker Abfall!
  0.91: 0.48
  0.90: 0.35
  0.85: 0.21

Interpretation:
  - Schwellenwert bei ~0.92-0.93 (Similarity fällt stark ab)
```

## Erweiterte Analysen

### Clustering von Mustern

```yaml
# Mehrere Muster (verschiedene Parameter)
Muster A, B, C, D, E

# Similarity-Matrix
       A     B     C     D     E
A   [1.00  0.85  0.42  0.35  0.12]
B   [0.85  1.00  0.38  0.40  0.15]
C   [0.42  0.38  1.00  0.78  0.55]
D   [0.35  0.40  0.78  1.00  0.60]
E   [0.12  0.15  0.55  0.60  1.00]

# Clustering (Hierarchical)
Cluster 1: {A, B} (Similarity > 0.8)
Cluster 2: {C, D, E} (Similarity > 0.5)

Interpretation:
  - A und B sind sehr ähnlich (möglicherweise gleiche Muster-Klasse)
  - C, D, E bilden andere Muster-Klasse
```

### Muster-Taxonomie

```yaml
# Emergente Muster-Klassen identifizieren

Klasse "Stabil-Kristallin":
  - Decay: 0.97-0.99
  - Diffusion: 0-1
  - Similarity untereinander: > 0.75

Klasse "Fluid-Organisch":
  - Decay: 0.94-0.96
  - Diffusion: 5-8
  - Similarity untereinander: > 0.70

Klasse "Chaotisch":
  - Decay: 0.85-0.90
  - Similarity untereinander: < 0.50 (hohe Varianz!)
```

## Verwandte Metriken

- [[ridge-point-analysis]] - Basis für Pattern-Hash
- [[entropy-measurement]] - Alternative: Ordnung/Chaos-Quantifizierung
- [[fractal-dimension]] - Komplementär: Selbstähnlichkeit

## Verwandte Methoden

- [[../methods/qualitative-quantitative-capture.md]] - Similarity ist quantitative Metrik
- [[../methods/systematic-variation.md]] - Similarity quantifiziert Parameter-Effekt

## Verwandte Konzepte

- [[../concepts/emergenz.md]] - Schwellenwerte zeigen emergente Phasenübergänge
- [[../properties/stability.md]] - Similarity über Zeit quantifiziert Stabilität
