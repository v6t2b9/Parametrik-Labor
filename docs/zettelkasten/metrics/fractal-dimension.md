---
id: metric-fractal-dimension
title: Fraktale Dimension
type: metric
category: quantitative-measurement
status: planned
created: 2025-11-20
updated: 2025-11-20
tags: [metric, fractal, dimension, self-similarity, planned]
related:
  - "[[entropy-measurement]]"
  - "[[../properties/crystallinity.md]]"
  - "[[../properties/network.md]]"
sources:
  - "[[../../experiments/Experimentelle_Sektion_Index.md]]"
---

## Definition

**Fraktale Dimension** ist eine geplante Metrik, die die **Selbstähnlichkeit** und **Raum-Füllungs-Eigenschaften** von emergenten Mustern quantifiziert.

## Theoretischer Hintergrund

### Was ist fraktale Dimension?

```yaml
Konzept:
  - Klassische Dimension: 1D (Linie), 2D (Fläche), 3D (Volumen)
  - Fraktale Dimension: Nicht-ganzzahlig (z.B. 1.67)
  - Misst "wie sehr füllt Struktur den Raum"

Beispiele:
  - Perfekte Linie: D = 1.0
  - Verzweigtes Netzwerk: D ≈ 1.3-1.7
  - Flächenfüllend: D ≈ 1.8-2.0
  - Perfekte Fläche: D = 2.0
```

### Box-Counting-Methode

**Standard-Verfahren** zur Messung fraktaler Dimension:

```yaml
Prinzip:
  1. Lege Gitter über Muster (Box-Größe ε)
  2. Zähle Boxen N(ε), die Muster enthalten
  3. Wiederhole für verschiedene ε
  4. Plot log(N(ε)) vs. log(1/ε)
  5. Steigung = Fraktale Dimension D

Formel:
  D = lim[ε→0] log(N(ε)) / log(1/ε)
  
  Praktisch: Lineare Regression auf log-log-Plot
```

## Geplante Implementation

```javascript
function calculateFractalDimension(trailMap, threshold = 100) {
  // 1. Binärisierung: Pixel > threshold → 1, sonst 0
  const binary = binarize(trailMap, threshold);
  
  // 2. Box-Counting für verschiedene Box-Größen
  const boxSizes = [2, 4, 8, 16, 32, 64, 128];
  const counts = [];
  
  for (const boxSize of boxSizes) {
    let count = 0;
    
    // Zähle Boxen die mindestens 1 Pixel enthalten
    for (let y = 0; y < height; y += boxSize) {
      for (let x = 0; x < width; x += boxSize) {
        if (boxContainsPattern(binary, x, y, boxSize)) {
          count++;
        }
      }
    }
    
    counts.push(count);
  }
  
  // 3. Log-Log-Regression
  const logSizes = boxSizes.map(s => Math.log(1/s));
  const logCounts = counts.map(c => Math.log(c));
  
  const {slope} = linearRegression(logSizes, logCounts);
  
  return slope;  // = Fraktale Dimension D
}
```

## Interpretation

### Fraktale Dimensions-Bereiche

```yaml
D ≈ 1.0 - 1.3:
  - Lineare Strukturen
  - Wenig Verzweigung
  - Beispiel: Einzelne Trails ohne Clusterbildung

D ≈ 1.3 - 1.6:
  - Verzweigte Netzwerke
  - Moderate Raum-Füllung
  - Beispiel: Kristalline Cluster-Netzwerke
  - Typisch für [[../properties/network.md]]

D ≈ 1.6 - 1.85:
  - Stark verzweigt
  - Hohe Raum-Füllung
  - Beispiel: Dichte, verschmolzene Cluster

D ≈ 1.85 - 2.0:
  - Fast flächenfüllend
  - Sehr hohe Dichte
  - Beispiel: Komplett gesättigte Regions (Trail Saturation erreicht)

D = 2.0:
  - Perfekt flächenfüllend
  - Gesamte Canvas ausgefüllt
  - Beispiel: Theoretisches Limit (praktisch nicht erreicht)
```

### Qualitativ ↔ Quantitativ Mapping

| Qualitativ | Fraktale Dimension | Beispiel-Muster |
|---|---|---|
| **Kristallin** (verzweigt) | 1.3 - 1.6 | Geometrische Netzwerke, scharfe Kanten |
| **Netzwerkartig** | 1.4 - 1.7 | Verzweigte Trails, "Nervensystem"-artig |
| **Clusterbasiert** (dicht) | 1.6 - 1.9 | Verschmolzene Cluster, hohe Dichte |
| **Homogen** (flächig) | > 1.9 | Fast komplett ausgefüllte Canvas |

Siehe [[../methods/qualitative-quantitative-capture.md]].

## Anwendungsfälle

### 1. Kristallinität quantifizieren

```yaml
Hypothese: "Hoher Decay + niedrige Diffusion → kristalline Muster"

Test:
  decay: 0.99, diffusion: 0 → D = 1.42 (verzweigt-kristallin)
  decay: 0.96, diffusion: 3 → D = 1.68 (moderat)
  decay: 0.90, diffusion: 8 → D = 1.88 (fast flächig)

Interpretation:
  - D ≈ 1.3-1.6 korrespondiert mit "Kristallinität"
  - Siehe [[../properties/crystallinity.md]]
```

### 2. Netzwerk-Topologie charakterisieren

```yaml
Frage: "Welche Netzwerk-Struktur emergiert?"

Sensor Distance Variation:
  sensorDist: 10 → D = 1.75 (wenig Fernverbindungen)
  sensorDist: 30 → D = 1.52 (verzweigtes Netzwerk)
  sensorDist: 50 → D = 1.48 (effizientes, sparses Netzwerk)

Interpretation:
  - Moderate Sensor Distance → niedrigste D → effiziente Netzwerke
  - Siehe [[../properties/network.md]]
```

### 3. Dichte × Struktur unterscheiden

```yaml
Problem: Ridge-Point-Count allein unterscheidet nicht zwischen:
  - Viele kleine Cluster (granular)
  - Wenige große Cluster (dicht)

Lösung: Kombination Ridge Points + Fraktale Dimension

Beispiel:
  Muster A: Ridge Points: 1200, D = 1.35 → Viele kleine, verzweigte Cluster
  Muster B: Ridge Points: 1200, D = 1.82 → Wenige große, flächige Cluster

→ Fraktale Dimension disambiguiert
```

## Erweiterte Analysen

### Multi-Scale-Analyse

```javascript
// Fraktale Dimension in verschiedenen Skalen
function multiScaleFractalDimension(trailMap) {
  const scales = [
    {name: "Fine", boxSizes: [2, 4, 8, 16]},
    {name: "Medium", boxSizes: [8, 16, 32, 64]},
    {name: "Coarse", boxSizes: [32, 64, 128, 256]}
  ];
  
  return scales.map(scale => ({
    name: scale.name,
    dimension: calculateFractalDimension(trailMap, scale.boxSizes)
  }));
}
```

**Interpretation**:
- **Konsistente D über Skalen**: Echte fraktale Selbstähnlichkeit
- **Variierende D**: Skalen-abhängige Struktur (nicht fraktal)

### Temporal Evolution

```javascript
// Fraktale Dimension über Zeit
const dimensions = [];
for (let t = 0; t < totalSteps; t += 50) {
  const frame = getFrame(t);
  const D = calculateFractalDimension(frame);
  dimensions.push({time: t, D});
}

// Trend
const finalD = dimensions[dimensions.length - 1].D;
```

**Interpretation**:
- **D steigt über Zeit**: Raum-Füllung nimmt zu (Expansion)
- **D sinkt über Zeit**: Strukturen verdünnen (Kollaps)
- **D konstant**: Strukturelle Stabilität erreicht

## Korrelation mit Eigenschaften

### Fraktale Dimension × [[../properties/crystallinity.md|Kristallinität]]

```yaml
Erwartung: Kristallinität ∝ niedrige D (1.3-1.6)

Kristalline Muster:
  - Verzweigte, aber nicht flächenfüllende Strukturen
  - Scharfe Kanten → D bleibt niedrig
  - Geometrische Selbstähnlichkeit

Test:
  decayRate: 0.99, diffusion: 0 → D ≈ 1.4 (kristallin bestätigt)
```

### Fraktale Dimension × [[../properties/network.md|Netzwerk]]

```yaml
Erwartung: Netzwerk-Muster haben D ≈ 1.4-1.7

Mechanismus:
  - Verzweigungen → D > 1.0
  - Aber: Effiziente Pfade → D < 2.0 (nicht flächenfüllend)
  - "Small-World"-Netzwerke: typischerweise D ≈ 1.5

Test:
  sensorDist: 35 (Netzwerk-fördernd) → D ≈ 1.52
```

### Fraktale Dimension × [[../properties/density.md|Dichte]]

```yaml
Erwartung: Hohe Dichte → höhere D (aber nicht zwingend)

Ambivalenz:
  - Dichte kann lokalisiert sein (hohe Intensität, aber D niedrig)
  - Dichte kann flächig sein (hohe Intensität UND D hoch)

→ D disambiguiert Dichte-Typ:
  - Hohe Dichte + D ≈ 1.3-1.5: "Superclusters" (lokalisiert)
  - Hohe Dichte + D ≈ 1.8-2.0: "Saturated Canvas" (flächig)
```

## Implementation-Priorität

### Warum wichtig?

1. **Strukturelle Charakterisierung**: D unterscheidet linear vs. verzweigt vs. flächig
2. **Komplementär zu Entropie**: Entropie misst Ordnung, D misst Raum-Füllung
3. **Kristallinität-Validierung**: "Kristallin" wird als D ≈ 1.3-1.6 operationalisiert

### Herausforderungen

```yaml
1. Performance:
   - Box-Counting über viele Skalen ist rechenintensiv
   - Möglicherweise: Sampling statt vollständige Canvas

2. Threshold-Sensitivität:
   - Binarisierungs-Threshold beeinflusst D
   - Lösung: Mehrere Thresholds testen, average D

3. Interpretation:
   - D allein sagt nicht alles (braucht Kontext)
   - Kombination mit anderen Metriken nötig
```

### Nächste Schritte

```yaml
1. Prototyp-Implementation
   - calculateFractalDimension(trailMap)
   - Test mit bekannten fraktalen Patterns (Validierung)

2. Kalibrierung
   - Messe D für bekannte Muster-Klassen
   - Etabliere D-Bereiche (siehe Interpretation)

3. Integration
   - D als optionale Metrik in Experimente
   - Kombination mit Ridge Points + Entropie
```

## Verwandte Metriken

- [[entropy-measurement]] - Komplementär (Ordnung vs. Raum-Füllung)
- [[ridge-point-analysis]] - D disambiguiert Ridge-Point-Verteilung
- [[structural-similarity]] - Beide beschreiben Muster-Struktur

## Verwandte Eigenschaften

- [[../properties/crystallinity.md]] - D ≈ 1.3-1.6 definiert "kristallin"
- [[../properties/network.md]] - D ≈ 1.4-1.7 für Netzwerk-Strukturen
- [[../properties/density.md]] - D disambiguiert Dichte-Typ (lokalisiert vs. flächig)

## Verwandte Konzepte

- [[../concepts/emergenz.md]] - Fraktale Selbstähnlichkeit ist emergentes Phänomen
- [[../methods/qualitative-quantitative-capture.md]] - D quantifiziert "Struktur-Typ"
