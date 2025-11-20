---
id: param-sensor-distance
title: Sensor Distance
type: parameter
oikos: semiotische-oikos
range: 5 - 50
default: 20
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [parameter, semiotics, perception, exploration]
affects:
  - "[[cluster-formation]]" # +
  - "[[separation]]" # +++
  - "[[stability]]" # +
  - chaos # +
  - network # +++
  - fluidity # +
  - crystallinity # -
  - density # +
related:
  - sensor-angle
  - turn-speed
  - "[[deposit-amount]]"
experiments:
  - "[[Experiment_Sensor_Distance_Variation]]"
sources:
  - "[[Parameter_Oikos_Matrix]]"
---

## Definition

**Sensor Distance** bestimmt die **Reichweite der Perzeption** – wie weit Agenten "sehen" können, um Trails in ihrer Umgebung zu detektieren.

## Ökosemiotische Interpretation

`sensorDist` ist **nicht** "Sichtweite", sondern:

**"Radius des zeichenvermittelten Handlungsraums"**

- `sensorDist = 50` → Große Wahrnehmungsreichweite → Fernverbindungen möglich
- `sensorDist = 5` → Kleine Wahrnehmungsreichweite → Nur lokale Interaktion

Sensor Distance strukturiert die **semiotische Reichweite** – wie weit Zeichen handlungsleitend wirken können.

## Implementation

```javascript
// Agenten samplen Trails an drei Positionen relativ zu ihrer Richtung
const forward = currentPosition + direction * sensorDist;
const left = forward + rotateLeft(direction, sensorAngle) * sensorDist;
const right = forward + rotateRight(direction, sensorAngle) * sensorDist;

// Bewegungsentscheidung basiert auf diesen drei Sensor-Werten
```

## Wertebereich

| Wert | Effekt | Typische Anwendung |
|---|---|---|
| **5-10** | Sehr kurze Reichweite | Zufällige Bewegung, lokales Chaos |
| **15-25** | Moderate Reichweite | Balancierte Exploration + Exploitation |
| **30-40** | Große Reichweite | Weitreichende Netzwerke, aktive Separation |
| **45-50** | Sehr große Reichweite | Maximale Vernetzung, klare Territorien |

## Effekte auf emergente Eigenschaften

Aus der [[../meta/map-parameter-effects.md|Parameter-Oikos-Matrix]]:

| Eigenschaft | Effekt | Stärke | Erklärung |
|---|---|---|---|
| **[[cluster-formation\|Clusterbildung]]** | ⬆️ | + | Größere Reichweite → Agents finden Cluster aus der Ferne |
| **[[separation\|Separation]]** | ⬆️ | +++ | Große Sensor Distance → Agents "sehen" weit → können Unterschiede zwischen Spezies erkennen → aktive Separation |
| **[[stability\|Stabilität]]** | ⬆️ | + | Weitreichende Perzeption → konsistentere Bewegungsentscheidungen |
| **Chaos** | ⬆️ | + | Mehr Sensor-Input → mehr "Optionen" → weniger deterministische Bewegung |
| **Netzwerk** | ⬆️ | +++ | Große Sensor Distance → "Fernverbindungen" möglich → verzweigte Strukturen |
| **Fluidität** | ⬆️ | + | Weitreichende Sensoren → sanftere Kurven |
| **Kristallinität** | ⬇️ | - | Große Reichweite → weniger lokale Akkumulation → weniger geometrische Muster |
| **Dichte** | ⬆️ | + | Agents konvergieren auf Hotspots aus größerer Entfernung |

## Interaktionen mit anderen Parametern

### Sensor Distance × Sensor Angle

**Wahrnehmungsraum = Radius × Winkel**

```yaml
sensorDist: 40 + sensorAngle: 0.8 → Breiter Wahrnehmungskegel
sensorDist: 40 + sensorAngle: 0.2 → Schmaler "Laser-Focus"
```

### Sensor Distance × [[attraction-strength|Attraction]]/Repulsion

**Separation-Maximierung**:
```yaml
sensorDist: 40 + repulsionStrength: -0.9 + crossSpeciesInteraction: true
→ Agents "sehen" andere Spezies aus der Ferne und meiden aktiv
→ Klare räumliche Trennung
```

## Experimentelle Befunde

### Experiment: [[Experiment_Sensor_Distance_Variation]]

**Setup**: Systematische Variation von Sensor Distance (5 → 50) bei konstanten anderen Parametern

**Hypothesen**:
1. Kleine Sensor Distance → isolierte Cluster
2. Große Sensor Distance → verzweigte Netzwerke
3. Umschlagpunkt bei ~25 zwischen lokalem und globalem Verhalten

**Status**: Geplant

Siehe Experiment-Template: [[Experiment_Sensor_Distance_Variation]]

## Presets mit charakteristischer Sensor Distance

| Preset | Sensor Dist | Muster |
|---|---|---|
| **Nervensystem** | 35 | Weitreichende Verzweigungen |
| **Ameisenpfade** | 25 | Balancierte Netzwerke |
| **Territorien** | 40 | Klare räumliche Separation |

## Design-Empfehlungen

### Für maximale Separation
```yaml
sensorDist: 35-50
+ repulsionStrength: -0.7--1.0
+ crossSpeciesInteraction: true
+ sensorAngle: 0.5-0.8
```

### Für maximale Netzwerk-Bildung
```yaml
sensorDist: 30-40
+ decayRate: 0.94-0.96
+ deposit: 15-25
+ agentCount: 2000-3000
```

### Für lokales Chaos
```yaml
sensorDist: 5-10
+ turnSpeed: 0.7-1.0
+ chaosStrength: 0.5-0.8
```

## Theoretische Bedeutung

Sensor Distance ist der **zentrale Parameter** der **Semiotischen Oikos** weil er:

1. **Semiotische Reichweite** definiert (Wie weit wirken Zeichen?)
2. **Exploration vs. Exploitation** balanciert (Lokale vs. globale Information)
3. **Soziale Struktur** ermöglicht (Separation erfordert Fernwahrnehmung)

Siehe [[../concepts/parameter-as-oikos.md#semiotische-oikos]] für theoretischen Kontext.

## Biologische Analogien

### Ameisen
- **Kurze Sensor Distance** (~10-15): Folgen direkten Trail-Gradienten
- Erzeugen: Highways, lokale Cluster

### Vögel (Schwarmverhalten)
- **Mittlere Sensor Distance** (~25-35): Sehen mehrere Nachbarn
- Erzeugen: Fluide Schwärme, verzweigte Formationen

### Menschen (soziale Netzwerke)
- **Variable Sensor Distance**: Abhängig von Medium (lokal vs. digital)
- Erzeugen: Communities mit verschiedenen Vernetzungsgraden

## Offene Fragen

1. **Optimale Reichweite**: Gibt es eine optimale Sensor Distance für bestimmte emergente Muster?
2. **Skalierung**: Wie sollte Sensor Distance mit Grid-Größe skalieren?
3. **Asymmetrie**: Was passiert, wenn verschiedene Spezies verschiedene Sensor Distances haben?

## Verwandte Parameter

- `sensorAngle` - Definiert Breite des Wahrnehmungsfelds
- `turnSpeed` - Wie schnell Agents auf Sensor-Input reagieren
- [[deposit-amount]] - Balance zwischen Sensing und Signaling
- [[attraction-strength]] - Verstärkt Separation-Effekt

## Verwandte Konzepte

- [[../concepts/parameter-as-oikos.md]] - Sensor Distance als Teil der Semiotischen Oikos
- [[../concepts/resonanz.md]] - Separation als Resonanz-Muster
- [[separation]] - Primäre emergente Eigenschaft
- [[cluster-formation]] - Sekundäre emergente Eigenschaft
