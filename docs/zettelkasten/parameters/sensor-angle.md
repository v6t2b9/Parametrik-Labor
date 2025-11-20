---
id: param-sensor-angle
title: Sensor Angle
type: parameter
oikos: semiotische-oikos
range: 0.1 - 1.5
default: 0.5
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [parameter, semiotics, perception, field-of-view]
affects:
  - "[[cluster-formation]]" # ++
  - "[[separation]]" # +
  - "[[stability]]" # -
  - chaos # ++
  - network # +
  - fluidity # ++
  - crystallinity # -
  - density # +
related:
  - "[[sensor-distance]]"
  - turn-speed
  - "[[deposit-amount]]"
experiments:
  - TBD
sources:
  - "[[Parameter_Oikos_Matrix]]"
---

## Definition

**Sensor Angle** bestimmt die **Breite des Wahrnehmungsfelds** – den Winkel zwischen linkem und rechtem Sensor relativ zur Bewegungsrichtung.

## Ökosemiotische Interpretation

`sensorAngle` ist **nicht** "Sichtwinkel", sondern:

**"Breite des zeichenvermittelten Wahrnehmungsfelds"**

- `sensorAngle = 1.5` → Breites Sichtfeld → mehr "Optionen" → weniger deterministische Bewegung
- `sensorAngle = 0.2` → Schmales Sichtfeld → "Laser-Focus" → gerichtete Bewegung

Sensor Angle strukturiert die **semiotische Auswahl** – wie viele potenzielle Zeichen ein Agent gleichzeitig wahrnehmen kann.

## Implementation

```javascript
// Drei Sensoren: Forward, Left, Right
const forward = currentPosition + direction * sensorDist;
const left = forward + rotateLeft(direction, sensorAngle) * sensorDist;
const right = forward + rotateRight(direction, sensorAngle) * sensorDist;

// Sample Trails an diesen Positionen
const trailForward = sampleTrail(forward);
const trailLeft = sampleTrail(left);
const trailRight = sampleTrail(right);

// Bewegungsentscheidung basiert auf Vergleich
if (trailLeft > trailForward && trailLeft > trailRight) {
  agent.angle -= turnSpeed;  // Drehe links
} else if (trailRight > trailForward && trailRight > trailLeft) {
  agent.angle += turnSpeed;  // Drehe rechts
}

// Größerer sensorAngle → größerer Abstand zwischen left/right → breiteres Sampling
```

## Wertebereich

| Wert | Effekt | Visuelle Metapher | Typische Anwendung |
|---|---|---|---|
| **0.1-0.3** | Sehr schmales Feld | "Laser" | Gerichtete, präzise Navigation |
| **0.4-0.6** | Moderates Feld | "Taschenlampe" | Balancierte Exploration |
| **0.7-1.0** | Breites Feld | "Flutlicht" | Breite Exploration, sanfte Kurven |
| **1.1-1.5** | Sehr breites Feld | "Panorama" | Chaotisch, viele Richtungswechsel |

## Effekte auf emergente Eigenschaften

Aus der [[../meta/map-parameter-effects.md|Parameter-Oikos-Matrix]]:

| Eigenschaft | Effekt | Stärke | Erklärung |
|---|---|---|---|
| **[[cluster-formation\|Clusterbildung]]** | ⬆️ | ++ | Größer Angle → sanftere Annäherung an Cluster |
| **[[separation\|Separation]]** | ⬆️ | + | Breites Feld → bessere Detektion anderer Spezies |
| **[[stability\|Stabilität]]** | ⬇️ | - | Großer Angle → mehr "Optionen" → weniger stabile Pfade |
| **Chaos** | ⬆️ | ++ | Großer Sensor Angle → mehr "Optionen" → weniger deterministische Bewegung |
| **Network** | ⬆️ | + | Breites Feld → mehr Verbindungen entdeckt |
| **Fluidity** | ⬆️ | ++ | Großer Sensor Angle → breites Sichtfeld → sanftere Kurven |
| **Crystallinity** | ⬇️ | - | Breites Feld → weniger präzise Navigation → weniger geometrisch |
| **Density** | ⬆️ | + | Breites Feld → findet Hotspots aus mehr Winkeln |

## Interaktionen mit anderen Parametern

### Sensor Angle × [[sensor-distance|Sensor Distance]]: Wahrnehmungsraum

**Gesamter Wahrnehmungsraum = Distance × Angle**:

```yaml
# Schmaler "Laser" (gerichtet)
sensorDist: 40 + sensorAngle: 0.2 → Schmaler, langer Kegel
  - Weitreichend
  - Aber: Schmal
  - Ergebnis: Präzise Fernnavigation, "Highway"-Bildung

# Breiter "Flutlicht" (explorativ)
sensorDist: 40 + sensorAngle: 0.9 → Breiter, langer Kegel
  - Weitreichend
  - Und: Breit
  - Ergebnis: Breite Exploration, viele "Optionen" erkannt

# Kurzer "Taschenlampe" (lokal)
sensorDist: 15 + sensorAngle: 0.5 → Moderater, kurzer Kegel
  - Nahbereich
  - Moderate Breite
  - Ergebnis: Lokale Navigation

# Kurzer "Laser" (fokussiert)
sensorDist: 15 + sensorAngle: 0.2 → Schmaler, kurzer Kegel
  - Nahbereich
  - Schmal
  - Ergebnis: Sehr fokussierte, lokale Bewegung
```

### Sensor Angle × Turn Speed: Beweglichkeit

**Beide beeinflussen Agilität**:

```yaml
# Träge Navigation
sensorAngle: 0.2 + turnSpeed: 0.2 → Langsam, fokussiert
  - Schmales Feld
  - Langsame Drehung
  - Ergebnis: Smooth, gerichtete Trails, stabile Pfade

# Agile Navigation
sensorAngle: 0.8 + turnSpeed: 0.7 → Schnell, explorativ
  - Breites Feld
  - Schnelle Drehung
  - Ergebnis: Erratische, fluide Muster, viele Richtungswechsel

# Fokussiert aber reaktiv
sensorAngle: 0.3 + turnSpeed: 0.8 → Schmal, aber agil
  - Schmales Feld (wenige Optionen)
  - Aber: Schnelle Reaktion
  - Ergebnis: "Snapping" zu Trails, präzise Verfolgung
```

### Sensor Angle für Separation

**Breites Feld hilft bei Fremd-Detektion**:

```yaml
# Schlechte Separation (schmal)
sensorAngle: 0.2 + sensorDist: 40 + repulsionStrength: -0.8
  - Schmales Feld → sieht andere Spezies oft nicht
  - Auch bei großer Reichweite: Nur direkt voraus
  - Ergebnis: Suboptimale Separation

# Gute Separation (breit)
sensorAngle: 0.7 + sensorDist: 40 + repulsionStrength: -0.8
  - Breites Feld → detektiert andere Spezies in Umgebung
  - Große Reichweite + breites Feld
  - Ergebnis: Effektive Territorial-Vermeidung
```

## Experimentelle Befunde

### Beobachtung: Angle-Schwellenwerte

**Unter ~0.3**: Gerichtete Bewegung, "Highway"-Bildung
**0.3-0.7**: Balancierter Bereich – Exploration + Exploitation
**Über ~0.7**: Chaotisch, erratische Bewegung

### Beobachtung: Angle beeinflusst Trail-Typ

**Schmaler Angle (0.2)**:
- Dünne, präzise Trails
- "Highways" und "Kabel"
- Hohe Kristallinität

**Breiter Angle (0.8)**:
- Breite, verwobene Trails
- "Organisch" und "Flüssig"
- Hohe Fluidität

## Presets mit charakteristischem Sensor Angle

| Preset | Sensor Angle | Sensor Dist | Turn Speed | Muster |
|---|---|---|---|---|
| **Nervensystem** | 0.3 | 35 | 0.4 | Präzise, verzweigte Netzwerke |
| **Lavalampe** | 0.7 | 25 | 0.6 | Fließende, organische Formen |
| **Kristallwachstum** | 0.2 | 20 | 0.3 | Geometrische, eckige Strukturen |

## Design-Empfehlungen

### Für Kristallinität (geometrisch)
```yaml
sensorAngle: 0.2-0.3  # Schmal!
+ sensorDist: 20-30
+ turnSpeed: 0.2-0.4
+ decayRate: 0.98-0.999
```

**Ergebnis**: Präzise, geometrische, kristalline Strukturen

### Für Fluidität (organisch)
```yaml
sensorAngle: 0.7-1.0  # Breit!
+ sensorDist: 25-35
+ turnSpeed: 0.5-0.8
+ diffusionFreq: 6-8
```

**Ergebnis**: Fließende, organische, fluide Muster

### Für Separation
```yaml
sensorAngle: 0.5-0.8
+ sensorDist: 35-50
+ repulsionStrength: -0.7--1.0
+ crossSpeciesInteraction: true
```

**Ergebnis**: Effektive Territorial-Segregation

## Theoretische Bedeutung

Sensor Angle ist ein **zentraler Parameter** der **Semiotischen Oikos** weil er:

1. **Breite des Wahrnehmungsfelds** definiert (Wie viele Zeichen gleichzeitig?)
2. **Exploration vs. Exploitation** balanciert (Breit = Exploration, Schmal = Exploitation)
3. **Determinismus vs. Stochastizität** moduliert (Breiter Angle → mehr Optionen → weniger determiniert)

Siehe [[../concepts/parameter-as-oikos.md#semiotische-oikos]]

## Biologische Analogien

### Visuelle Systeme
**Field of View (FOV)**:
- Raubvögel: Schmales FOV (~50°), präzise Jagd
- Pflanzenfresser: Breites FOV (~300°), Gefahren-Detektion
- Sensor Angle ≈ FOV

### Antennen (Insekten)
**Antennen-Winkel**:
- Schmaler Winkel: Gerichtete Pheromon-Detektion (Moth, Fernverfolgung)
- Breiter Winkel: Umgebungs-Sampling (Ameisen, Nahbereich)

### Aufmerksamkeit (Menschen)
**Attentional Focus**:
- Schmaler Focus: "Tunnel Vision", zielgerichtet
- Breiter Focus: "Diffuse Attention", explorativ
- Trade-off: Präzision vs. Awareness

## Sensor Angle als Information-Throughput

**Informationstheoretische Sicht**:

```
Schmaler Angle:
- Weniger Sensoren-Input pro Frame
- Höhere Signal-to-Noise Ratio
- Deterministischere Entscheidungen

Breiter Angle:
- Mehr Sensoren-Input pro Frame
- Niedrigere Signal-to-Noise Ratio (mehr "Konflikte")
- Stochastischere Entscheidungen
```

**Theoretische Implikation**: Sensor Angle reguliert **Entscheidungskomplexität**

## Performance-Implikationen

### Minimal-Cost Parameter

Sensor Angle ist **sehr billig**:

```javascript
// Nur drei Samples pro Agent, unabhängig von Angle
const left = rotateLeft(direction, sensorAngle);   // O(1)
const right = rotateRight(direction, sensorAngle); // O(1)

// Keine zusätzliche Computation für größere Angles
```

Im Gegensatz zu Sensor Distance (mehr Samples bei größerer Distance) hat Angle fast keinen Performance-Impact.

## Offene Fragen

1. **Adaptive Angle**: Sollte Sensor Angle von lokaler Trail-Dichte abhängen (breiter bei wenig Trails, schmaler bei vielen)?
2. **Species-specific Angle**: Sollten verschiedene Spezies verschiedene Angles haben ("Jäger" vs. "Sammler")?
3. **Multi-Sensor-Systeme**: Was, wenn Agents mehr als 3 Sensoren hätten (5, 7, 9...)?

## Verwandte Parameter

- [[sensor-distance]] - **Komplementär** (Distance = Reichweite, Angle = Breite)
- turn-speed - **Synergistisch** (beide beeinflussen Agilität)
- [[deposit-amount]] - Trade-off zwischen Sensing (Angle) und Signaling (Deposit)
- [[agent-speed]] - Schnelle Agents brauchen breiteres Angle für Reaktionszeit

## Verwandte Konzepte

- [[../concepts/parameter-as-oikos.md]] - Sensor Angle als Teil der Semiotischen Oikos
- [[fluidity]] - Gefördert durch breites Angle
- [[crystallinity]] - Gefördert durch schmales Angle
- [[separation]] - Breites Angle hilft bei Fremd-Detektion
