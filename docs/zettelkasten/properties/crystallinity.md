---
id: property-crystallinity
title: Kristallinität
type: emergent-property
category: structural
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [emergence, crystalline, geometric, rigid, sharp]
promoted_by:
  - "[[decay-rate]]" # +++ (sehr hoher Decay)
  - "[[deposit-amount]]" # ++
  - trail-saturation # +
  - "[[attraction-strength]]" # +
inhibited_by:
  - diffusion # -- (verwischt Kanten)
  - chaos-interval # --- (zerstört Geometrie)
  - fade-strength # --- (verhindert Akkumulation)
  - turn-speed # - (erratische Bewegung)
  - sensor-angle # - (breites Feld reduziert Präzision)
  - agent-count # - (viele Agents "verschmieren")
  - fluidity # Anti-korreliert
related:
  - "[[stability]]" # Stark korreliert
  - "[[cluster-formation]]" # Korreliert (kristalline Cluster)
  - fluidity # Anti-korreliert
  - chaos # Anti-korreliert
experiments:
  - "[[Experiment_Decay_Rate_Variation]]"
sources:
  - "[[Parameter_Oikos_Matrix]]"
---

## Definition

**Kristallinität** ist die emergente Tendenz zur Bildung **geometrischer, starrer, hochgeordneter** Muster mit scharfen Kanten.

## Charakteristika

### Visuelle Merkmale
- **Geometrische Formen**: Rechtecke, Dreiecke, Polygone
- **Scharfe Kanten**: Klare Grenzen, keine Verwischung
- **Hochgeordnet**: Symmetrien, Wiederholungen, Muster
- **Starr**: Wenig Veränderung über Zeit
- **"Eingefrorene" Strukturen**: Fast statisch

### Quantifizierung

**Edge Sharpness**:
```javascript
// Gradient an Muster-Grenzen
const gradient = calculateImageGradient(trailMap);
const edgeSharpness = average(gradient.map(g => g.magnitude));

// Hoher Gradient = scharfe Kanten = hohe Kristallinität
```

**Symmetrie-Detektion**:
```javascript
// Rotations- und Spiegelungs-Symmetrie
const symmetryScore = detectSymmetry(pattern, [90, 180, 270], ['horizontal', 'vertical']);

// Hoher Score = hohe geometrische Ordnung
```

## Parameter-Einflüsse

### Starke Förderer (+++)

#### [[decay-rate|Decay Rate]] (0.98-0.999)
**Mechanismus**: Sehr hoher Decay + niedrige Diffusion → scharfe, stabile Geometrie

**Kritisch**: Decay allein reicht nicht – braucht auch niedrige Diffusion!

### Moderate Förderer (++)
- **[[deposit-amount|Deposit]]** (25-30): Schnelle Akkumulation → dichte, definierte Strukturen
- **trail-saturation** (200-255): "Einfrieren" bei Sättigung → starre Formen

### Starke Inhibitoren (---)

#### diffusion (6-10)
**Mechanismus**: Hohe Diffusion → verwischt scharfe Kanten → reduziert geometrische Muster

**Trade-off**: Diffusion fördert Fluidität, hemmt Kristallinität

#### chaos-interval (50-200)
**Mechanismus**: Chaos-Injection zerstört geometrische Ordnung periodisch

#### fade-strength (0.2-0.5)
**Mechanismus**: Fade verhindert geometrische Akkumulation

## Kristallinität vs. [[fluidity|Fluidität]]

**Fundamentale Anti-Korrelation**:

```
Kristallinität ∝ 1/Fluidität
```

**Trade-off**:
- **Kristallin**: Starr, geometrisch, scharfe Kanten, statisch
- **Fluid**: Organisch, fließend, weiche Kanten, dynamisch

**Unmöglich**: Hohe Kristallinität UND hohe Fluidität gleichzeitig

## Typen von Kristallinität

### Typ 1: Scharfe Kristall-Cluster
**Parameter**:
```yaml
decayRate: 0.99
diffusion: 0-1  # Minimal!
deposit: 28
sensorAngle: 0.2-0.3  # Eng!
chaosInterval: 0  # Aus!
```

**Charakteristik**: Polygonartige Cluster, sehr scharfe Kanten, fast statisch

### Typ 2: Kristalline Netzwerke
**Parameter**:
```yaml
decayRate: 0.98
diffusion: 1-2
deposit: 22
sensorDist: 30
attractionStrength: 1.3
```

**Charakteristik**: Verzweigte, aber geometrische Strukturen, "Nervensystem"-artig

### Typ 3: Fraktale Kristalle
**Parameter**:
```yaml
decayRate: 0.985
diffusion: 1
deposit: 25
sensorDist: 35
speed: 0.8  # Langsam!
```

**Charakteristik**: Selbstähnliche, verzweigte Strukturen, fraktale Dimension

## Design-Rezept: Maximale Kristallinität

```yaml
Ziel: Geometrisch, starr, hochgeordnet

decayRate: 0.98-0.999        # +++ (sehr hoch!)
diffusionFreq: 0-1           # -- (minimal!)
deposit: 25-30               # ++ (schnelle Akkumulation)
sensorAngle: 0.2-0.4         # - (eng, präzise)
chaosInterval: 0             # --- (aus!)
speed: 0.5-1.0               # Langsam (präzise Navigation)
turnSpeed: 0.2-0.4           # Langsam (smooth Kurven)

Begründung:
  Sehr hoher Decay + minimale Diffusion + enge Sensoren
  → Scharfe Kanten + stabile Geometrie
  → Kristalline Strukturen
```

## Theoretische Bedeutung

Kristallinität demonstriert:
1. **Maximale Ordnung**: Höchster Grad an emergenter Ordnung
2. **Gedächtnis-Dominanz**: Vergangenheit strukturiert Gegenwart maximal
3. **Selbst-Organisation**: Geometrie emergiert ohne explizite Regeln

## Biologische/Physikalische Analogien

- **Kristall-Wachstum**: Mineralien, Schneeflocken
- **Dendritisches Wachstum**: Neuronale Dendriten, Frost-Muster
- **Korallen-Riffe**: Langsames, akkumulatives Wachstum
- **Termiten-Bauten**: Geometrische Architektur durch Stigmergie

## Mathematische Eigenschaften

### Fraktale Dimension

Kristalline Muster haben oft **fraktale Eigenschaften**:

```javascript
// Box-Counting Dimension
const fractalDim = calculateFractalDimension(pattern);

// Werte:
// 1.0-1.3 = niedrig-dimensional (Linien)
// 1.3-1.7 = moderat (verzweigte Strukturen)
// 1.7-2.0 = hochdimensional (flächig)
```

**Kristalline Netzwerke** typischerweise: **D ≈ 1.4-1.6**

### Symmetrie-Gruppen

Kristalline Cluster zeigen oft **diskrete Symmetrien**:
- 90°-Rotationssymmetrie (quadratische Gitter)
- 60°-Rotationssymmetrie (hexagonale Muster)
- Spiegelsymmetrie (bilateral)

## Verwandte Konzepte

- [[../concepts/emergenz.md]] - Kristallinität als maximale emergente Ordnung
- [[stability]] - Stark korreliert (kristalline Muster sind stabil)
- [[cluster-formation]] - Kristalline Cluster möglich
- [[fluidity]] - Anti-korreliert (starr vs. fließend)
- [[chaos]] - Anti-korreliert (Ordnung vs. Unordnung)
