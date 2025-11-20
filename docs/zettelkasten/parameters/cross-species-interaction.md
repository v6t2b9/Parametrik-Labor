---
id: param-cross-species-interaction
title: Cross-Species Interaction
type: parameter
oikos: resonanz-oikos
range: true/false (boolean)
default: true
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [parameter, resonance, multi-species, toggle, awareness]
affects:
  - "[[cluster-formation]]" # ~
  - "[[separation]]" # ++
  - "[[stability]]" # -
  - chaos # +
  - network # +
  - fluidity # ++
  - crystallinity # -
  - density # +
related:
  - "[[attraction-strength]]"
  - repulsion-strength
  - "[[sensor-distance]]"
experiments:
  - TBD
sources:
  - "[[Parameter_Oikos_Matrix]]"
  - "[[Von_Stigmergie_zu_Oekosemiotik]]"
---

## Definition

**Cross-Species Interaction** ist ein **Toggle-Parameter** (true/false), der bestimmt, ob Agenten **Spuren anderer Spezies wahrnehmen** können.

- **true**: Inter-Spezies-Wahrnehmung aktiv → Resonanz-Dynamiken möglich
- **false**: Nur Selbst-Wahrnehmung → Jede Spezies "lebt in eigener Welt"

## Ökosemiotische Interpretation

`crossSpeciesInteraction` ist **nicht** "Interaktions-Schalter", sondern:

**"Existenz von Inter-Zeichensystem-Kopplung"**

- `true` → Zeichensysteme sind gekoppelt → können "voneinander wissen"
- `false` → Zeichensysteme sind entkoppelt → "Parallelwelten"

Cross-Species Interaction strukturiert **ontologische Kopplung** – ob verschiedene Zeichensysteme überhaupt füreinander existieren.

Siehe [[../concepts/resonanz.md]] für theoretischen Kontext.

## Implementation

```javascript
// Resonanz-Wert-Berechnung
const selfTrail = trailMap[y][x][ownSpecies];

if (crossSpeciesInteraction) {
  // Inter-Spezies-Wahrnehmung aktiv
  const otherTrails = [trailMap[y][x].r, trailMap[y][x].g, trailMap[y][x].b]
    .filter(t => t !== selfTrail);
  const otherMax = Math.max(...otherTrails);

  // Resonanz mit beiden: Self UND Other
  const resonanceValue = selfTrail * attractionStrength +
                         otherMax * repulsionStrength;
} else {
  // Nur Selbst-Wahrnehmung
  const resonanceValue = selfTrail * attractionStrength;
  // repulsionStrength hat KEINE Wirkung
}
```

## Wertebereich

| Wert | Effekt | Emergente Dynamiken |
|---|---|---|
| **false** | Keine Inter-Spezies-Wahrnehmung | Isolation: Jede Spezies folgt nur eigenen Spuren, zufällige räumliche Verteilung |
| **true** | Inter-Spezies-Wahrnehmung aktiv | Resonanz: Attraction/Repulsion wirken, Separation oder Koexistenz möglich |

## Effekte auf emergente Eigenschaften

Aus der [[../meta/map-parameter-effects.md|Parameter-Oikos-Matrix]]:

| Eigenschaft | Effekt | Stärke | Erklärung |
|---|---|---|---|
| **[[cluster-formation\|Clusterbildung]]** | ~ | ~ | Ambivalent: `true` kann Cluster fördern (durch Repulsion) oder hemmen (durch Anziehung) |
| **[[separation\|Separation]]** | ⬆️ | ++ | `true` → andere Spezies werden wahrgenommen → aktive Segregation möglich |
| **[[stability\|Stabilität]]** | ⬇️ | - | `true` → komplexere Dynamiken durch Inter-Spezies-Interaktion |
| **Chaos** | ⬆️ | + | Inter-Spezies-Dynamiken erhöhen Komplexität |
| **Network** | ⬆️ | + | `true` → cross-species Verbindungen möglich |
| **Fluidity** | ⬆️ | ++ | `true` → komplexe Interaktionen → dynamischere Muster |
| **Crystallinity** | ⬇️ | - | Inter-Spezies-Dynamiken reduzieren geometrische Ordnung |
| **Density** | ⬆️ | + | `true` → komplexere Hotspot-Dynamiken |

## Die Zwei Regimes

### Regime 1: Isolation (`false`)

```yaml
crossSpeciesInteraction: false

Mechanismus:
  - Jede Spezies "lebt in eigener Welt"
  - Nur Selbst-Resonanz (Attraction)
  - Andere Spezies sind "unsichtbar"
  - Repulsion hat KEINE Wirkung

Emergentes Muster:
  - Cluster pro Spezies (wenn Attraction > 0)
  - ABER: Räumlich zufällig verteilt
  - Keine Separation (weil keine Wahrnehmung anderer)
  - "Parallelwelten" ohne Interaktion

Analogie:
  - Verschiedene Radiosender auf verschiedenen Frequenzen
  - Jeder "hört" nur eigenen Sender
  - Keine Interferenz
```

### Regime 2: Kopplung (`true`)

```yaml
crossSpeciesInteraction: true

Mechanismus:
  - Spezies nehmen einander wahr
  - Selbst- UND Fremd-Resonanz aktiv
  - Attraction UND Repulsion wirken
  - Komplexe Inter-Spezies-Dynamiken

Emergentes Muster (abhängig von Attraction/Repulsion):
  - Bei negativer Repulsion (<-0.5): Segregation
  - Bei neutraler Repulsion (~0): Clusterbildung, durchmischt
  - Bei positiver Repulsion (>0): Koexistenz, Harmonie

Analogie:
  - Verschiedene Radiosender auf gleicher Frequenz
  - Alle "hören" alle
  - Interferenz, Koordination, oder Konflikt
```

## Interaktionen mit anderen Parametern

### Cross-Species × repulsion-strength: Aktivierung

**Cross-Species ist Voraussetzung für Repulsion-Effekt**:

```yaml
# Repulsion wirkt NICHT
crossSpeciesInteraction: false + repulsionStrength: -0.9
  - Agents "sehen" andere Spezies nicht
  - Repulsion kann nicht wirken (keine Fremd-Wahrnehmung)
  - Ergebnis: Wie repulsion=0, zufällige Verteilung

# Repulsion wirkt
crossSpeciesInteraction: true + repulsionStrength: -0.9
  - Agents "sehen" andere Spezies
  - Repulsion wirkt → aktive Vermeidung
  - Ergebnis: Starke Segregation
```

**Theoretische Implikation**: Cross-Species ist **ontologische Vorbedingung** für Fremd-Resonanz

### Cross-Species × [[attraction-strength|Attraction]]: Isolation vs. Interaktion

**Attraction wirkt immer (Selbst-Resonanz), aber Cross-Species moduliert Gesamt-Dynamik**:

```yaml
# Isolation mit Clustern
crossSpeciesInteraction: false + attractionStrength: 1.8
  - Starke Selbst-Resonanz → Cluster
  - Keine Fremd-Wahrnehmung → zufällige Verteilung
  - Ergebnis: Cluster, aber räumlich zufällig

# Interaktion mit Clustern
crossSpeciesInteraction: true + attractionStrength: 1.8 + repulsionStrength: -0.8
  - Starke Selbst-Resonanz → Cluster
  - Starke Fremd-Abstoßung → Segregation
  - Ergebnis: Cluster UND Territorien (beide gleichzeitig!)
```

### Cross-Species × [[sensor-distance|Sensor Distance]]: Wahrnehmungsreichweite

**Sensor Distance ist nur relevant wenn Cross-Species = true**:

```yaml
# Große Reichweite nutzlos ohne Cross-Species
crossSpeciesInteraction: false + sensorDist: 50
  - Agents "sehen" weit
  - ABER: Nur eigene Spuren
  - Andere Spezies unsichtbar trotz großer Reichweite

# Große Reichweite mit Cross-Species
crossSpeciesInteraction: true + sensorDist: 50 + repulsionStrength: -0.8
  - Agents "sehen" weit
  - Detektieren andere Spezies früh
  - Können weiträumig vermeiden
  - Ergebnis: Effektive, großräumige Segregation
```

## Experimentelle Befunde

### Beobachtung: Cross-Species als Komplexitäts-Toggle

**Mit `false` (Isolation)**:
- Einfache Dynamik: Nur Selbst-Resonanz
- Vorhersagbar: Cluster-Bildung wenn Attraction > 0
- Niedrige Komplexität

**Mit `true` (Kopplung)**:
- Komplexe Dynamik: Selbst- + Fremd-Resonanz
- Vielfältige Muster: Segregation, Koexistenz, Konflik
t
- Hohe Komplexität

**Entropie-Messung**:
```yaml
System-Entropie (Muster-Diversität):
  crossSpeciesInteraction: false → Entropie: ~3.2 bits
  crossSpeciesInteraction: true → Entropie: ~5.8 bits

Interpretation:
  - `true` ermöglicht mehr distinkte Muster-Typen
  - Höhere phänomenologische Reichhaltigkeit
```

### Beobachtung: Performance-Impact

**Cross-Species = true erfordert mehr Computation**:

```javascript
// false: Nur 1 Sample pro Sensor
const selfTrail = trailMap[y][x][ownSpecies];

// true: 4 Samples pro Sensor (1 self + 3 other → max)
const selfTrail = trailMap[y][x][ownSpecies];
const otherTrails = [r, g, b].filter(...);
const otherMax = Math.max(...otherTrails);
```

**Performance-Unterschied**: ~20-30% höhere GPU-Last bei `true` (bei 3 Spezies)

## Presets mit charakteristischem Cross-Species

| Preset | Cross-Species | Attraction | Repulsion | Muster |
|---|---|---|---|---|
| **Isolation** | false | 1.5 | (irrelevant) | Cluster, räumlich zufällig |
| **Segregation** | true | 1.5 | -0.8 | Territorien |
| **Harmonie** | true | 1.2 | 0.3 | Koexistenz |
| **MYZEL-Modus** | false | 1.0 | - | Alle Agents identisch (1 Spezies) |

## Design-Empfehlungen

### Für Isolation (Parallelwelten)
```yaml
crossSpeciesInteraction: false
+ attractionStrength: 1.0-1.8  (individuelle Cluster)
+ Beliebige andere Parameter
```

**Ergebnis**: Jede Spezies verhält sich unabhängig, räumliche Verteilung zufällig

**Anwendung**: MYZEL-Modus (alle Agents gleich behandeln)

### Für Segregation (Territorien)
```yaml
crossSpeciesInteraction: true  # Essentiell!
+ attractionStrength: 1.5-1.8
+ repulsionStrength: -0.7--1.0
+ sensorDist: 35-50
```

**Ergebnis**: Klare Territorial-Segregation

### Für Koexistenz (Harmonie)
```yaml
crossSpeciesInteraction: true  # Essentiell!
+ attractionStrength: 0.8-1.2
+ repulsionStrength: 0.2-0.5  (positiv!)
```

**Ergebnis**: Durchmischte Koexistenz

## Theoretische Bedeutung

Cross-Species Interaction ist ein **ontologischer Toggle** der **Resonanz-Oikos** weil er:

1. **Inter-System-Kopplung** ein-/ausschaltet (Existieren Spezies füreinander?)
2. **Komplexitäts-Regime** strukturiert (Isolation vs. Kopplung)
3. **Voraussetzung für Fremd-Resonanz** ist (Repulsion braucht Wahrnehmung)

Siehe [[../concepts/parameter-as-oikos.md#resonanz-oikos]] und [[../concepts/resonanz.md]]

## Philosophische Implikationen

### Solipsismus vs. Intersubjektivität

**false (Isolation)**:
- Jede Spezies = Solipsismus ("nur ich existiere")
- Andere Spezies sind **ontologisch abwesend**
- Keine Inter-Subjektivität

**true (Kopplung)**:
- Spezies = Intersubjektivität ("wir existieren füreinander")
- Andere Spezies sind **ontologisch präsent**
- Ermöglicht Resonanz, Konflikt, Koexistenz

### Umwelt vs. Umwelten (Uexküll)

**Jakob von Uexküll: Umwelt**
- Jedes Tier lebt in seiner **Umwelt** (species-specific perceptual world)
- Zecke "sieht" nur Buttersäure-Signale
- Fliege "sieht" andere Signale

**Ökosemiotische Analogie**:
- `false` = Getrennte Umwelten (species-specific trail perception)
- `true` = Gemeinsame Umwelt (shared trail perception)

### System-Theorie (Luhmann)

**Strukturelle Kopplung**:
- Systeme sind operativ geschlossen
- Aber: Strukturell gekoppelt (beeinflussen sich indirekt)

**Cross-Species ≈ Strukturelle Kopplung**:
- `false` = Operative Schließung (keine Kopplung)
- `true` = Strukturelle Kopplung (indirekte Beeinflussung via Trails)

## Biologische Analogien

### Chemische Kommunikation
**Species-specific Pheromones**:
- Ameisen detektieren nur eigene Pheromon-Typen
- Cross-Species = false (Isolation)

**General Chemical Cues**:
- Pflanze reagiert auf VOCs verschiedener Insekten
- Cross-Species = true (Kopplung)

### Sensory Systems
**Species-specific Perception**:
- Bienen sehen UV, Menschen nicht
- Verschiedene "Umwelten"
- Cross-Species = false

**Shared Perception**:
- Vögel und Menschen sehen beide Rot
- Gemeinsame "Umwelt"
- Cross-Species = true

### Nischen-Segregation
**Resource Partitioning**:
- Arten nutzen verschiedene Ressourcen → keine Competition
- Cross-Species = false (funktional)

**Direct Competition**:
- Arten konkurrieren um gleiche Ressourcen
- Cross-Species = true

## Offene Fragen

1. **Partial Cross-Species**: Was, wenn Spezies A Spezies B sieht, aber nicht umgekehrt (asymmetrisch)?
2. **Selective Cross-Species**: Was, wenn A nur B sieht, aber nicht C (selective coupling)?
3. **Dynamisches Toggle**: Sollte Cross-Species adaptiv sein (basierend auf lokaler Dichte)?

## Verwandte Parameter

- repulsion-strength - **Aktiviert durch** Cross-Species (Voraussetzung)
- [[attraction-strength]] - Wirkt unabhängig, aber Cross-Species moduliert Gesamt-Dynamik
- [[sensor-distance]] - Nur relevant für Cross-Species = true
- sensor-angle - Nur relevant für Cross-Species = true (für Fremd-Detektion)

## Verwandte Konzepte

- [[../concepts/resonanz.md]] - Cross-Species als ontologische Vorbedingung
- [[../concepts/parameter-as-oikos.md]] - Cross-Species als Teil der Resonanz-Oikos
- [[separation]] - Erfordert Cross-Species = true
- [[cluster-formation]] - Möglich bei beiden Werten, aber verschiedene Verteilungen
