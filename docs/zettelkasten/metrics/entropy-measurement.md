---
id: metric-entropy-measurement
title: Entropie-Messung
type: metric
category: quantitative-measurement
status: planned
created: 2025-11-20
updated: 2025-11-20
tags: [metric, entropy, shannon, order, chaos, planned]
related:
  - "[[ridge-point-analysis]]"
  - "[[../properties/chaos.md]]"
  - "[[../properties/crystallinity.md]]"
sources:
  - "[[../../experiments/Experimentelle_Sektion_Index.md]]"
---

## Definition

**Entropie-Messung** ist eine geplante Metrik, die die **Shannon-Entropie** der Trail-Intensitäts-Verteilung berechnet, um **Ordnung** vs. **Unordnung** in Mustern zu quantifizieren.

## Theoretischer Hintergrund

### Shannon-Entropie

```yaml
Konzept (Informationstheorie):
  - Entropie H = Maß für "Überraschung" / "Unordnung"
  - Hohe Entropie = unvorhersagbar, chaotisch
  - Niedrige Entropie = vorhersagbar, geordnet

Formel:
  H = -Σ p(i) * log₂(p(i))
  
  p(i) = Wahrscheinlichkeit von Zustand i
```

### Anwendung auf Trail-Maps

```yaml
# Trail-Map als Intensitäts-Verteilung

Pixel-Intensitäten: 0-255 (256 mögliche Zustände)

Wahrscheinlichkeits-Verteilung:
  p(0) = Anzahl Pixel mit Intensität 0 / Total Pixel
  p(1) = Anzahl Pixel mit Intensität 1 / Total Pixel
  ...
  p(255) = Anzahl Pixel mit Intensität 255 / Total Pixel

Shannon-Entropie:
  H = -Σ[i=0 to 255] p(i) * log₂(p(i))
```

## Geplante Implementation

```javascript
function calculateEntropy(trailMap) {
  const width = trailMap.length;
  const height = trailMap[0].length;
  const totalPixels = width * height;
  
  // Histogram: Anzahl Pixel pro Intensitäts-Wert
  const histogram = new Array(256).fill(0);
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const intensity = getIntensity(trailMap, x, y);
      histogram[Math.floor(intensity)]++;
    }
  }
  
  // Wahrscheinlichkeits-Verteilung
  const probabilities = histogram.map(count => count / totalPixels);
  
  // Shannon-Entropie
  let entropy = 0.0;
  for (const p of probabilities) {
    if (p > 0) {  // log(0) ist undefiniert
      entropy -= p * Math.log2(p);
    }
  }
  
  return entropy;  // Wert: 0.0 - 8.0 bits (für 256 Zustände)
}
```

## Interpretation

### Entropie-Bereiche

```yaml
H ≈ 0.0 - 2.0 bits:
  - Sehr niedrige Entropie
  - Extrem geordnet
  - Interpretation: Fast alle Pixel haben gleiche Intensität
  - Beispiel: Komplett leere Canvas ODER komplett gesättigte Canvas

H ≈ 2.0 - 4.0 bits:
  - Niedrige Entropie
  - Geordnet, strukturiert
  - Interpretation: Starke Cluster, klare Hotspots, kristalline Muster
  - Beispiel: Stabile, hochgeordnete Muster (hoher Decay, niedrige Diffusion)

H ≈ 4.0 - 6.0 bits:
  - Moderate Entropie
  - Balanciert
  - Interpretation: Mischung aus Struktur und Variation
  - Beispiel: Typische emergente Muster (moderate Parameter)

H ≈ 6.0 - 8.0 bits:
  - Hohe Entropie
  - Ungeordnet, chaotisch
  - Interpretation: Hohe Variation, wenig Struktur, diffuse Verteilung
  - Beispiel: Chaotische Muster (niedriger Decay, hohe Diffusion, hoher Chaos)
```

### Qualitativ ↔ Quantitativ Mapping

| Qualitativ | Entropie (H) | Beispiel-Parameter |
|---|---|---|
| **Kristallin** | 2.5 - 3.5 bits | Decay: 0.99, Diffusion: 0 |
| **Stabil** | 3.5 - 4.5 bits | Decay: 0.96, Diffusion: 2 |
| **Fluid** | 4.5 - 5.5 bits | Decay: 0.94, Diffusion: 6 |
| **Chaotisch** | > 5.5 bits | Decay: 0.85, Diffusion: 8 |

Siehe [[../methods/qualitative-quantitative-capture.md]] für Mapping-Konzept.

## Anwendungsfälle

### 1. Ordnung/Chaos quantifizieren

```yaml
Beispiel: Decay-Variation

Decay 0.85: Entropie = 6.2 bits (chaotisch)
Decay 0.92: Entropie = 4.8 bits (balanciert)
Decay 0.99: Entropie = 3.1 bits (kristallin)

Trend: Höherer Decay → niedrigere Entropie (mehr Ordnung)

Korrelation mit [[../properties/crystallinity.md]]:
  - Kristallinität ∝ 1/Entropie
```

### 2. Stabilität über Zeit

```yaml
# Entropie über Zeitschritte

Frame 100: H = 5.2 bits
Frame 200: H = 4.9 bits
Frame 300: H = 4.7 bits
Frame 400: H = 4.6 bits
Frame 500: H = 4.6 bits

Trend: Entropie sinkt (System ordnet sich)

Interpretation:
  - System konvergiert zu geordnetem Zustand
  - Stabilität erreicht bei Frame ~400 (Entropie konstant)
```

### 3. Chaos-Effekt messen

```yaml
Hypothese: "Chaos-Interval erhöht Entropie"

Chaos-Interval 0: H = 4.2 bits
Chaos-Interval 250: H = 5.1 bits  # +21%
Chaos-Interval 500: H = 6.3 bits  # +50%

Interpretation:
  - Chaos-Injection erhöht Unordnung (wie erwartet)
  - Quantifizierung des Chaos-Effekts

Siehe [[../properties/chaos.md]].
```

## Erweiterte Varianten

### Spatiale Entropie (lokale Ordnung)

```javascript
// Entropie in Teilregionen
function calculateSpatialEntropy(trailMap, regionSize = 50) {
  const regions = divideIntoRegions(trailMap, regionSize);
  const entropies = regions.map(region => calculateEntropy(region));
  
  return {
    mean: average(entropies),
    std: standardDeviation(entropies),
    min: Math.min(...entropies),
    max: Math.max(...entropies)
  };
}
```

**Interpretation**:
- **Niedriger Std**: Homogen (alle Regionen ähnlich geordnet/ungeordnet)
- **Hoher Std**: Heterogen (einige Regionen geordnet, andere chaotisch)

### Temporale Entropie (Veränderungsrate)

```javascript
// Entropie der Veränderungen zwischen Frames
function calculateTemporalEntropie(frame_t, frame_t_plus_1) {
  const diff = frameDifference(frame_t, frame_t_plus_1);
  return calculateEntropy(diff);
}
```

**Interpretation**:
- **Hohe temporale Entropie**: Rapide, chaotische Veränderung
- **Niedrige temporale Entropie**: Langsame, konsistente Veränderung (Stabilität)

## Korrelation mit Eigenschaften

### Entropie × [[../properties/stability.md|Stabilität]]

```yaml
Erwartung: Negative Korrelation

Stabile Muster → niedrige Entropie (geordnet)
Instabile Muster → hohe Entropie (chaotisch)

Test:
  - Messe Entropie über 500 Steps
  - Falls Entropie konstant (±0.5 bits) → stabil
  - Falls Entropie oszilliert (±2 bits) → instabil
```

### Entropie × [[../properties/crystallinity.md|Kristallinität]]

```yaml
Erwartung: Stark negative Korrelation

Kristalline Muster → sehr niedrige Entropie (2.5-3.5 bits)
  - Scharfe Kanten
  - Geometrische Ordnung
  - Wenig Variation

Nicht-kristalline Muster → höhere Entropie (> 4.5 bits)
```

### Entropie × [[../properties/chaos.md|Chaos]]

```yaml
Erwartung: Stark positive Korrelation

Chaotische Muster → hohe Entropie (> 5.5 bits)
Geordnete Muster → niedrige Entropie (< 4.0 bits)

Quantifizierung:
  "Chaos" wird numerisch als "Entropie > 5.5 bits" definiert
```

## Implementation-Priorität

### Warum wichtig?

1. **Objektive Ordnungs-Quantifizierung**: Entropie ist mathematisch fundiert
2. **Komplementär zu Ridge-Point-Analyse**: Ridge Points zählen Hotspots, Entropie misst Verteilung
3. **Validierung qualitativer Kategorien**: "Kristallin" vs. "Chaotisch" wird messbar

### Nächste Schritte

```yaml
1. Implementation in Fingerprint-Generator
   - calculateEntropy(trailMap)
   - Anzeige im Dashboard

2. Kalibrierung
   - Bekannte Muster (Kristallin, Chaotisch) messen
   - Schwellenwerte etablieren (siehe Interpretation)

3. Integration in Experimente
   - Entropie als Standard-Metrik in Experiment-Template
   - Neben Ridge Points dokumentieren
```

## Verwandte Metriken

- [[ridge-point-analysis]] - Komplementär (Hotspots vs. Verteilung)
- [[fractal-dimension]] - Komplementär (Selbstähnlichkeit vs. Ordnung)
- [[structural-similarity]] - Beide nutzen Intensitäts-Verteilung

## Verwandte Eigenschaften

- [[../properties/chaos.md]] - Entropie quantifiziert Chaos
- [[../properties/crystallinity.md]] - Inverse Korrelation mit Entropie
- [[../properties/stability.md]] - Entropie über Zeit misst Stabilität

## Verwandte Konzepte

- [[../concepts/emergenz.md]] - Entropie zeigt emergente Ordnung
- [[../methods/qualitative-quantitative-capture.md]] - Entropie als quantitative Metrik für "Ordnung"
