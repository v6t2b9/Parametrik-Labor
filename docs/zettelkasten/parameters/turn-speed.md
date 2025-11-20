---
id: param-turn-speed
title: Turn Speed
type: parameter
oikos: semiotische-oikos
range: 0.1 - 1.0
default: 0.5
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [parameter, semiotics, agility, reaction]
affects:
  - "[[cluster-formation]]" # +
  - "[[separation]]" # +
  - "[[stability]]" # -
  - chaos # +++
  - network # +
  - fluidity # +++
  - crystallinity # -
  - density # -
related:
  - "[[sensor-distance]]"
  - sensor-angle
  - "[[agent-speed]]"
experiments:
  - TBD
sources:
  - "[[Parameter_Oikos_Matrix]]"
---

## Definition

**Turn Speed** bestimmt, wie **schnell Agenten ihre Bewegungsrichtung ändern** können – die Winkelgeschwindigkeit bei Richtungswechseln.

## Ökosemiotische Interpretation

`turnSpeed` ist **nicht** "Drehgeschwindigkeit", sondern:

**"Reaktionsfähigkeit auf Zeichen"**

- `turnSpeed = 1.0` → Hohe Reaktionsfähigkeit → schnelle Richtungswechsel → erratische Bewegung
- `turnSpeed = 0.2` → Niedrige Reaktionsfähigkeit → träge Kurven → smooth, gerichtete Trails

Turn Speed strukturiert die **semiotische Agilität** – wie schnell Agenten auf wahrgenommene Zeichen reagieren können.

## Implementation

```javascript
// Basierend auf Sensor-Input: Entscheidung für Richtung
if (trailLeft > trailRight) {
  agent.angle -= turnSpeed;  // Drehe links
} else if (trailRight > trailLeft) {
  agent.angle += turnSpeed;  // Drehe rechts
}

// turnSpeed = Δangle pro Frame
// Höherer turnSpeed → schärfere Kurven pro Frame
```

## Wertebereich

| Wert | Effekt | Typische Anwendung |
|---|---|---|
| **0.1-0.3** | Langsame Drehung | Smooth, gerichtete Trails, stabile Pfade |
| **0.4-0.6** | Moderate Drehung | Balancierte Bewegung |
| **0.7-0.9** | Schnelle Drehung | Agile, reaktive Bewegung |
| **0.95-1.0** | Sehr schnelle Drehung | Erratisch, chaotisch, "Zitter"-Effekt |

## Effekte auf emergente Eigenschaften

Aus der [[../meta/map-parameter-effects.md|Parameter-Oikos-Matrix]]:

| Eigenschaft | Effekt | Stärke | Erklärung |
|---|---|---|---|
| **[[cluster-formation\|Clusterbildung]]** | ⬆️ | + | Schnelle Drehung → schnelle Konvergenz auf Hotspots |
| **[[separation\|Separation]]** | ⬆️ | + | Schnelle Reaktion auf Fremd-Detektion → effektive Vermeidung |
| **[[stability\|Stabilität]]** | ⬇️ | - | Schnelle Drehung → weniger stabile Pfade, mehr Fluktuation |
| **Chaos** | ⬆️ | +++ | Hoher Turn Speed → schnelle Richtungswechsel → erratische Bewegung |
| **Network** | ⬆️ | + | Agile Bewegung → mehr Verbindungen erstellt |
| **Fluidity** | ⬆️ | +++ | Hoher Turn Speed → reaktionsschnell → fließende Anpassung |
| **Crystallinity** | ⬇️ | - | Schnelle Drehung → weniger geometrische, präzise Muster |
| **Density** | ⬇️ | - | Schnelle Drehung → weniger lokale Akkumulation (Agents "springen weg") |

## Interaktionen mit anderen Parametern

### Turn Speed × [[agent-speed|Agent Speed]]: Beweglichkeit

**Beide beeinflussen Gesamtbeweglichkeit**:

```yaml
# Träge, smooth
speed: 1.0 + turnSpeed: 0.2 → Langsam, gerichtete Bewegung
  - Langsame Vorwärtsbewegung
  - Langsame Drehung
  - Ergebnis: Smooth, stabile Trails

# Hochdynamisch, reaktiv
speed: 3.0 + turnSpeed: 0.8 → Schnell, erratisch
  - Schnelle Vorwärtsbewegung
  - Schnelle Drehung
  - Ergebnis: Hochagile, fluide, chaotische Muster

# Schnell aber gerichtet
speed: 3.0 + turnSpeed: 0.3 → Schnell, aber smooth
  - Schnelle Vorwärtsbewegung
  - Langsame Drehung
  - Ergebnis: "Highways", lange Trails mit sanften Kurven

# Langsam aber agil
speed: 1.0 + turnSpeed: 0.8 → Langsam, aber reaktiv
  - Langsame Vorwärtsbewegung
  - Schnelle Drehung
  - Ergebnis: Lokale, explorative "Tanz"-Bewegung
```

### Turn Speed × Sensor Angle: Reaktionsbreite

**Angle = Input, Turn Speed = Output**:

```yaml
# Fokussiert, präzise
sensorAngle: 0.3 + turnSpeed: 0.3 → Schmal wahrgenommen, langsam reagiert
  - Wenige Sensor-Inputs
  - Langsame Reaktion
  - Ergebnis: Präzise, gerichtete Navigation

# Explorativ, agil
sensorAngle: 0.8 + turnSpeed: 0.7 → Breit wahrgenommen, schnell reagiert
  - Viele Sensor-Inputs
  - Schnelle Reaktion
  - Ergebnis: Erratische, explorative Bewegung
```

### Turn Speed × Chaos Interval: Chaos-Paradox

**Siehe** [[../properties/stability.md#chaos-injection-paradox]]

```yaml
chaosInterval: 0 + turnSpeed: 0.8 → Massen-Pulsieren (instabil)
  - Alle Agents synchronisiert
  - Schnelle Drehung verstärkt Synchronisation
  - Ergebnis: Kollektive Oszillation, niedrige Stabilität

chaosInterval: 300 + turnSpeed: 0.8 → Desynchronisiert → stabiler!
  - Chaos-Injection bricht Synchronisation
  - Agents diversifiziert trotz schneller Drehung
  - Ergebnis: Höhere Makro-Stabilität durch Mikro-Chaos
```

## Experimentelle Befunde

### Beobachtung: Turn Speed-Schwellenwerte

**Unter ~0.3**: Smooth, stabile Pfade, geometrische Muster möglich
**0.3-0.7**: Balancierter Bereich – Reaktivität ohne Chaos
**Über ~0.7**: Chaotisch, erratische "Zitter"-Bewegung

### Beobachtung: Turn Speed beeinflusst Trail-Charakter

**Niedriger Turn Speed (0.2)**:
- Lange, smooth Trails
- "Autobahn"-Charakter
- Hohe Kristallinität möglich

**Hoher Turn Speed (0.8)**:
- Kurze, verwobene Trails
- "Knäuel"-Charakter
- Hohe Fluidität

## Presets mit charakteristischem Turn Speed

| Preset | Turn Speed | Speed | Sensor Angle | Muster |
|---|---|---|---|---|
| **Kristallwachstum** | 0.3 | 0.8 | 0.2 | Geometrisch, smooth Kurven |
| **Lavalampe** | 0.6 | 1.5 | 0.7 | Fluid, organisch |
| **Chaos Mode** | 0.9 | 3.0 | 0.9 | Erratisch, turbulent |

## Design-Empfehlungen

### Für Kristallinität (präzise)
```yaml
turnSpeed: 0.2-0.4  # Langsam!
+ speed: 0.8-1.5
+ sensorAngle: 0.2-0.4
+ decayRate: 0.98-0.999
```

**Ergebnis**: Geometrische, präzise, kristalline Strukturen

### Für Fluidität (agil)
```yaml
turnSpeed: 0.6-0.8  # Schnell!
+ speed: 1.5-2.5
+ sensorAngle: 0.6-0.9
+ diffusionFreq: 6-8
```

**Ergebnis**: Fließende, organische, fluide Muster

### Für maximales Chaos
```yaml
turnSpeed: 0.8-1.0  # Maximal!
+ speed: 3.0-5.0
+ chaosInterval: 100-200
+ chaosStrength: 0.8-1.0
+ fadeStrength: 0.3-0.5
```

**Ergebnis**: Permanente Turbulenz, erratische Bewegung

## Theoretische Bedeutung

Turn Speed ist ein **zentraler Parameter** der **Semiotischen Oikos** weil er:

1. **Reaktionsfähigkeit auf Zeichen** definiert (Wie schnell kann reagiert werden?)
2. **Agilität** strukturiert (Zusammen mit Agent Speed)
3. **Chaos vs. Ordnung** balanciert (Schnelle Drehung fördert Chaos)

Siehe [[../concepts/parameter-as-oikos.md#semiotische-oikos]]

## Biologische Analogien

### Bewegungsagilität (Tiere)
**Maneuverability**:
- Kolibri: Hoher Turn Speed (schnelle Richtungswechsel)
- Albatros: Niedriger Turn Speed (lange, smooth Kurven)
- Trade-off: Agilität vs. Effizienz

### Neuronale Reaktionszeit
**Reflex Speed**:
- Schnelle Reflexe = hoher Turn Speed
- Langsame Reflexe = niedriger Turn Speed
- Bestimmt Reaktion auf Stimuli

### Entscheidungsgeschwindigkeit
**Decision Latency**:
- Schnelle Entscheidungen = hoher Turn Speed (aber: mehr Fehler)
- Langsame Entscheidungen = niedriger Turn Speed (aber: präziser)
- Speed-Accuracy Trade-off

## Turn Speed als Noise-Amplifier

**Bei hohem Turn Speed**:
- Kleine Sensor-Unterschiede → große Richtungsänderungen
- Verstärkt "Noise" im System
- Ergebnis: Chaotischere Muster

**Bei niedrigem Turn Speed**:
- Kleine Sensor-Unterschiede → kleine Richtungsänderungen
- Dämpft "Noise"
- Ergebnis: Stabilere Muster

**Informationstheoretische Sicht**: Turn Speed ist **Verstärkungsfaktor** (Gain) für Sensor-Input

## Performance-Implikationen

### Minimal-Cost Operation

Turn Speed ist **extrem billig**:

```javascript
// O(1) Operation - nur Winkel-Addition
agent.angle += deltaAngle;

// Keine zusätzlichen Berechnungen für höhere Turn Speeds
```

Einer der billigsten Parameter überhaupt.

## Synchronisations-Effekt

**Bei chaosInterval = 0** (kein Chaos):
- Alle Agents starten mit ähnlichen Winkeln
- Hoher Turn Speed → alle reagieren synchron auf Trails
- **Massen-Pulsieren**: Kollektive Oszillation

**Lösung**: Chaos Interval desynchronisiert
- Siehe [[../properties/stability.md#chaos-injection-paradox]]
- Moderate Chaos-Injection erhöht Stabilität durch Diversifizierung

## Offene Fragen

1. **Adaptive Turn Speed**: Sollte Turn Speed von lokaler Trail-Stärke abhängen (langsamer bei starken Trails)?
2. **Species-specific Turn Speed**: Sollten verschiedene Spezies verschiedene Agilitäten haben?
3. **Momentum**: Was, wenn Turn Speed von aktueller Geschwindigkeit abhinge (Trägheit)?

## Verwandte Parameter

- [[agent-speed]] - **Synergistisch** (beide definieren Beweglichkeit)
- sensor-angle - **Input-Output-Beziehung** (Angle = Input, Turn Speed = Output)
- [[sensor-distance]] - Beide beeinflussen Reaktivität
- chaos-interval - Chaos-Injection bricht Turn-Speed-Synchronisation

## Verwandte Konzepte

- [[../concepts/parameter-as-oikos.md]] - Turn Speed als Teil der Semiotischen Oikos
- [[fluidity]] - Stark gefördert durch hohen Turn Speed
- [[chaos]] - Stark gefördert durch hohen Turn Speed
- [[stability]] - Gehemmt durch hohen Turn Speed
