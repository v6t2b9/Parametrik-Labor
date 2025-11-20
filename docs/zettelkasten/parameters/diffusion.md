---
id: param-diffusion
title: Diffusion Frequency
type: parameter
oikos: physikalische-oikos
range: 0 - 10
default: 2
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [parameter, physics, spatial, spreading]
affects:
  - "[[cluster-formation]]" # ++
  - "[[separation]]" # --
  - "[[stability]]" # +
  - chaos # ++
  - network # +
  - fluidity # +++
  - crystallinity # --
  - density # -
related:
  - "[[decay-rate]]"
  - fade-strength
experiments:
  - TBD
sources:
  - "[[Parameter_Oikos_Matrix]]"
---

## Definition

**Diffusion Frequency** bestimmt, wie oft und wie stark Trail-Intensität **räumlich diffundiert** – trails "fließen" zu benachbarten Zellen.

## Ökosemiotische Interpretation

`diffusionFreq` ist **nicht** "Unschärfe", sondern:

**"Räumliche Ausbreitung von Einfluss"**

- `diffusionFreq = 10` → Starke räumliche Ausbreitung → fließende, organische Formen
- `diffusionFreq = 0` → Keine Ausbreitung → scharfe, isolierte Spuren

Diffusion strukturiert die **räumliche Reichweite** von Zeichen – wie weit Einflüsse sich über den Ort der Zeichensetzung hinaus ausbreiten.

## Implementation

```javascript
// Diffusion wird alle N Frames angewendet
if (frameCount % diffusionInterval === 0 && diffusionFreq > 0) {
  // Jede Zelle gibt Anteil ihrer Intensität an Nachbarn ab
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const neighbors = [
        trailMap[y-1][x], trailMap[y+1][x],
        trailMap[y][x-1], trailMap[y][x+1]
      ];
      const avgNeighbor = average(neighbors);
      const current = trailMap[y][x];

      // Mischung zwischen aktuellem Wert und Nachbar-Durchschnitt
      newTrailMap[y][x] = lerp(current, avgNeighbor, diffusionStrength);
    }
  }
}
```

## Wertebereich

| Wert | Effekt | Typische Anwendung |
|---|---|---|
| **0** | Keine Diffusion | Scharfe, kristalline Strukturen |
| **1-3** | Schwache Diffusion | Leichte Weichzeichnung, organische Kanten |
| **4-6** | Moderate Diffusion | Balancierte Fluidität |
| **7-10** | Starke Diffusion | Stark fließende, "Lavalampen"-Effekte |

## Effekte auf emergente Eigenschaften

Aus der [[../meta/map-parameter-effects.md|Parameter-Oikos-Matrix]]:

| Eigenschaft | Effekt | Stärke | Erklärung |
|---|---|---|---|
| **[[cluster-formation\|Clusterbildung]]** | ⬆️ | ++ | Diffusion "verschmiert" Trails → größere Cluster-Flächen |
| **[[separation\|Separation]]** | ⬇️ | -- | Hohe Diffusion → Spuren "vermischen sich" → weniger klare Grenzen |
| **[[stability\|Stabilität]]** | ⬆️ | + | Diffusion glättet Fluktuationen → stabilere Muster |
| **Chaos** | ⬆️ | ++ | Räumliche Ausbreitung → weniger vorhersagbar |
| **Network** | ⬆️ | + | Diffusion verbindet isolierte Trail-Segmente |
| **Fluidity** | ⬆️ | +++ | Hohe Diffusion → Trails "fließen" räumlich → organische Bewegung |
| **Crystallinity** | ⬇️ | -- | Hohe Diffusion → verwischt scharfe Kanten → reduziert geometrische Muster |
| **Density** | ⬇️ | - | Diffusion verteilt Intensität → niedrigere Spitzen-Dichte |

## Interaktionen mit anderen Parametern

### Diffusion × [[decay-rate|Decay]] Trade-off ⭐

**Komplementäre Effekte**: Decay = temporal, Diffusion = spatial

```yaml
# "Lavalampe"-Balance
decayRate: 0.99 + diffusionFreq: 8 → Fließende, stabile Formen
  - Temporal stabil (Decay)
  - Spatial fluid (Diffusion)
  - Ergebnis: Organische Formen, die sich langsam bewegen

# Kristalline Strukturen
decayRate: 0.99 + diffusionFreq: 0-1 → Scharfe, geometrische Muster
  - Temporal stabil (Decay)
  - Spatial scharf (keine Diffusion)
  - Ergebnis: Kristalline, eckige Strukturen

# Volatiles Chaos
decayRate: 0.85 + diffusionFreq: 8 → Ephemere, fließende Muster
  - Temporal instabil (niedriger Decay)
  - Spatial fluid (Diffusion)
  - Ergebnis: Schnell wechselnde, verschwommene Formen
```

**Theoretische Implikation**: Physikalische Oikos-Parameter arbeiten **komplementär** in verschiedenen Dimensionen (Zeit vs. Raum)

Siehe [[../meta/map-parameter-effects.md#cross-oikos-effekt-1-decay--diffusion-trade-off]]

### Diffusion × [[separation|Separation]] Inhibition

**Anti-Separation-Effekt**:

```yaml
sensorDist: 40 + repulsionStrength: -0.8 + diffusionFreq: 0 → Scharfe Territorien
  - Fernwahrnehmung
  - Starke Repulsion
  - Keine Diffusion → klare Grenzen

sensorDist: 40 + repulsionStrength: -0.8 + diffusionFreq: 8 → Verschwommene Grenzen
  - Fernwahrnehmung
  - Starke Repulsion
  - ABER: Diffusion verwischt Spuren → weniger klare Separation
```

## Experimentelle Befunde

### Beobachtung: Diffusion-Schwellenwerte

**Unter ~3**: Minimaler Effekt, Strukturen bleiben scharf
**3-6**: Balancierter Bereich – Fluidität ohne Struktur-Verlust
**Über ~7**: Starke Verschwimm-Effekte, Strukturen werden diffus

### Beobachtung: Diffusion stabilisiert volatile Systeme

Bei sehr niedrigem [[decay-rate|Decay]] (0.85-0.90):
- Ohne Diffusion: Hochfrequentes Flackern
- Mit Diffusion (5-8): Smoothing-Effekt → weniger Flackern

**Mechanismus**: Diffusion wirkt als **räumlicher Low-Pass-Filter**

## Presets mit charakteristischer Diffusion

| Preset | Diffusion | Decay | Muster |
|---|---|---|---|
| **Lavalampe** | 8 | 0.99 | Fließende, organische Formen |
| **Kristallwachstum** | 0-1 | 0.98 | Scharfe, geometrische Strukturen |
| **Nervensystem** | 1-2 | 0.94 | Verzweigte, definierte Netzwerke |
| **Plasma Dream** | 6 | 0.96 | Balancierte Fluidität |

## Design-Empfehlungen

### Für maximale Fluidität
```yaml
diffusionFreq: 7-10
+ decayRate: 0.96-0.99  # Stabil genug für Formen
+ speed: 1.5-2.5
+ sensorAngle: 0.7-0.9
```

**Ergebnis**: Organische, fließende "Lavalampen"-Muster

### Für maximale Kristallinität
```yaml
diffusionFreq: 0-1  # Minimal!
+ decayRate: 0.98-0.999
+ deposit: 25-30
+ sensorAngle: 0.2-0.4  # Eng
```

**Ergebnis**: Scharfe, geometrische, kristalline Strukturen

### Für scharfe Separation
```yaml
diffusionFreq: 0-2  # Niedrig!
+ sensorDist: 35-50
+ repulsionStrength: -0.7--1.0
```

**Ergebnis**: Klare Territorial-Grenzen ohne Vermischung

## Theoretische Bedeutung

Diffusion ist ein **zentraler Parameter** der **Physikalischen Oikos** weil er:

1. **Räumliche Ausdehnung** von Zeichen definiert (analog zu Decay für Zeit)
2. **Fluidity vs. Crystallinity** balanciert (komplementär zu Decay)
3. **Separation** moduliert (hohe Diffusion hemmt klare Grenzen)

Siehe [[../concepts/parameter-as-oikos.md#physikalische-oikos]]

## Physikalische Analogien

### Wärmediffusion
**Fourier'sches Gesetz**: Wärme fließt von heiß zu kalt
- Hohe Diffusion = hohe Wärmeleitfähigkeit
- Trail-Intensität = "Temperatur"
- Diffusion glättet Gradienten

### Chemische Diffusion (Fick'sches Gesetz)
**Konzentrations-Gradienten**: Moleküle diffundieren zu niedriger Konzentration
- Trail-Intensität = Molekül-Konzentration
- Diffusion erzeugt homogenere Verteilung

### Optische Unschärfe
**Gaussian Blur**: Benachbarte Pixel werden gemittelt
- Diffusion ≈ Blur-Radius
- Verwischt Details, erhält Gesamtform

## Performance-Implikationen

### GPU-Intensive Operation

Diffusion ist **teuer** (jede Zelle muss Nachbarn berechnen):

```javascript
// O(width × height × 4) Operationen pro Diffusion-Frame
// Bei diffusionFreq=8 und 60 FPS → ~480 Diffusions-Durchläufe/Sekunde
```

**Optimierung**: Diffusion nur alle N Frames anwenden

```javascript
const diffusionInterval = Math.max(1, 10 - diffusionFreq);
if (frameCount % diffusionInterval === 0) {
  applyDiffusion();
}
```

## Offene Fragen

1. **Anisotrope Diffusion**: Was, wenn Diffusion richtungsabhängig wäre?
2. **Species-specific Diffusion**: Sollten verschiedene Spezies verschiedene Diffusions-Raten haben?
3. **Adaptive Diffusion**: Sollte Diffusion von lokaler Trail-Dichte abhängen?

## Verwandte Parameter

- [[decay-rate]] - **Komplementär** (temporal vs. spatial)
- fade-strength - Beide reduzieren Trail-Intensität
- trail-saturation - Limitiert Diffusions-Effekt (Capping)
- [[sensor-distance]] - Beide beeinflussen räumliche Reichweite

## Verwandte Konzepte

- [[../concepts/parameter-as-oikos.md]] - Diffusion als Teil der Physikalischen Oikos
- [[fluidity]] - Primäre emergente Eigenschaft
- [[crystallinity]] - Anti-korrelierte emergente Eigenschaft
- [[separation]] - Gehemmt durch hohe Diffusion
