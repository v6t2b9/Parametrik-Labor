---
id: metric-ridge-point-analysis
title: Ridge-Point-Analyse (Fingerabdruck)
type: metric
category: quantitative-measurement
status: implemented
created: 2025-11-20
updated: 2025-11-20
tags: [metric, ridge-points, hotspots, fingerprint, implemented]
related:
  - "[[structural-similarity]]"
  - "[[../methods/qualitative-quantitative-capture.md]]"
sources:
  - "[[../../experiments/Experimentelle_Sektion_Index.md]]"
---

## Definition

**Ridge-Point-Analyse** ist eine implementierte Metrik, die **lokale Maxima** (Hotspots) im Trail-Map identifiziert und quantifiziert, um emergente Muster numerisch zu charakterisieren.

## Konzept

```yaml
Idee:
  - Trail-Map hat Intensitäts-Verteilung (0-255)
  - Lokale Maxima = "Ridge Points" = Hotspots
  - Anzahl, Intensität, Verteilung der Ridge Points = "Fingerabdruck" des Musters
```

##Implementation

```javascript
// Ridge-Point-Detektion
function findRidgePoints(trailMap, threshold = 100) {
  const ridgePoints = [];
  
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const center = getIntensity(trailMap, x, y);
      
      // Lokales Maximum?
      if (center < threshold) continue;
      
      const isLocalMax = 
        center > getIntensity(trailMap, x-1, y) &&
        center > getIntensity(trailMap, x+1, y) &&
        center > getIntensity(trailMap, x, y-1) &&
        center > getIntensity(trailMap, x, y+1) &&
        center > getIntensity(trailMap, x-1, y-1) &&
        center > getIntensity(trailMap, x+1, y-1) &&
        center > getIntensity(trailMap, x-1, y+1) &&
        center > getIntensity(trailMap, x+1, y+1);
      
      if (isLocalMax) {
        ridgePoints.push({
          x, y,
          intensity: center,
          color: getDominantColor(trailMap, x, y)  // r, g, or b
        });
      }
    }
  }
  
  return ridgePoints;
}
```

## Metriken

### 1. Ridge-Point-Anzahl

```javascript
const count = ridgePoints.length;
```

**Interpretation**:
- **Niedrig** (< 100): Wenige, aber intensive Cluster
- **Moderat** (100-500): Typische Cluster-basierte Muster
- **Hoch** (> 500): Viele verteilte Hotspots, granulare Struktur

### 2. Durchschnitts-Intensität

```javascript
const avgIntensity = ridgePoints.reduce((sum, p) => sum + p.intensity, 0) / ridgePoints.length;
```

**Interpretation**:
- **Niedrig** (< 120): Schwache Hotspots
- **Moderat** (120-180): Typische Hotspot-Intensität
- **Hoch** (> 180): Sehr intensive, gesättigte Hotspots

### 3. Farbverteilung (Multi-Spezies)

```javascript
const colorDistribution = {
  r: ridgePoints.filter(p => p.color === 'r').length / ridgePoints.length,
  g: ridgePoints.filter(p => p.color === 'g').length / ridgePoints.length,
  b: ridgePoints.filter(p => p.color === 'b').length / ridgePoints.length
};
```

**Interpretation**:
- **Ausgeglichen** ({r: 0.33, g: 0.33, b: 0.34}): Keine Dominanz
- **Dominanz** ({r: 0.70, g: 0.15, b: 0.15}): Eine Spezies überwiegt
- **Binär** ({r: 0.50, g: 0.50, b: 0.00}): Zwei Spezies, eine ausgestorben

## Anwendungsfälle

### 1. Parameter-Effekt quantifizieren

```yaml
Beispiel: Decay-Variation

Decay 0.85: Ridge Points: 350
Decay 0.94: Ridge Points: 1250  # +257%!
Decay 0.99: Ridge Points: 1450  # +16%

Trend: Decay erhöht Ridge-Point-Anzahl (nichtlinear)
Interpretation: Höherer Decay → mehr persistente Cluster
```

### 2. Muster-Vergleich

```yaml
Muster A: 450 Ridge Points, Avg Intensity: 89.3
Muster B: 1250 Ridge Points, Avg Intensity: 142.5

Vergleich:
  - Muster B hat ~3× mehr Hotspots
  - Muster B hat ~60% höhere Intensität
  → Muster B ist "dichter" und "intensiver"
```

### 3. Stabilität über Zeit

```yaml
# Ridge Points über Zeitschritte

Frame 100: 890 Ridge Points
Frame 200: 920 Ridge Points (+3%)
Frame 300: 905 Ridge Points (-2%)
Frame 400: 915 Ridge Points (+1%)
Frame 500: 910 Ridge Points (-1%)

Varianz: ±3%
Interpretation: Stabiles Muster (Ridge Points oszillieren minimal)
```

## Fingerabdruck-Modus

### Pattern-Hash

Ridge Points können zu **Pattern-Hash** komprimiert werden:

```javascript
// Pattern-Hash (vereinfacht)
function generateHash(ridgePoints) {
  // Sortiere nach Intensität (höchste zuerst)
  const sorted = ridgePoints.sort((a, b) => b.intensity - a.intensity);
  
  // Nimm Top 50
  const top50 = sorted.slice(0, 50);
  
  // Hash: Position + Intensität + Farbe
  const hash = top50.map(p => ({
    x: Math.floor(p.x / 10) * 10,  // Quantisierung (Runden auf 10px)
    y: Math.floor(p.y / 10) * 10,
    intensity: Math.floor(p.intensity / 10) * 10,
    color: p.color
  }));
  
  return hash;
}
```

**Verwendung**: Siehe [[structural-similarity]] für Vergleich von Pattern-Hashes.

## Verwandte Metriken

- [[structural-similarity]] - Nutzt Ridge Points für Fingerabdruck-Vergleich
- [[entropy-measurement]] - Alternative Metrik (Ordnung/Chaos)
- [[fractal-dimension]] - Komplementär (Selbstähnlichkeit statt Hotspots)

## Verwandte Eigenschaften

- [[../properties/density.md]] - Ridge-Point-Intensität quantifiziert Dichte
- [[../properties/cluster-formation.md]] - Ridge-Point-Anzahl korreliert mit Clusterbildung
- [[../properties/separation.md]] - Farbverteilung quantifiziert Segregation (Multi-Spezies)
