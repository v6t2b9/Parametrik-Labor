---
id: property-separation
title: Separation
type: emergent-property
category: structural
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [emergence, separation, multi-species, territorial, segregation]
promoted_by:
  - repulsion-strength # +++
  - "[[sensor-distance]]" # +++
  - cross-species-interaction # ++
  - "[[decay-rate]]" # +
  - sensor-angle # +
  - fade-strength # +
  - chaos-strength # +
inhibited_by:
  - "[[attraction-strength]]" # ---
  - diffusion # --
  - agent-count # -
  - chaos-interval # -
related:
  - "[[cluster-formation]]" # Anti-korreliert (aber: beides bei hoher Attraction+Repulsion)
  - "[[stability]]" # Korreliert
  - network # Negativ korreliert
experiments:
  - "[[Experiment_Resonanz_Harmonie_Schwelle]]"
  - "[[Experiment_Sensor_Distance_Variation]]"
sources:
  - "[[Parameter_Oikos_Matrix]]"
  - "[[Von_Stigmergie_zu_Oekosemiotik]]"
---

## Definition

**Separation** (Segregation) ist die emergente Tendenz zur **räumlichen Trennung** verschiedener Spezies/Zeichensysteme in distinkte Territorien.

## Charakteristika

### Visuelle Merkmale
- **Territoriale Grenzen**: Klare räumliche Trennung zwischen Farben
- **Homogene Regionen**: Jedes Territorium primär eine Spezies
- **Minimale Überlappung**: Wenig "Vermischung" an Grenzen
- **Persistente Geographie**: Territorien bleiben über Zeit stabil

### Quantifizierung

**Segregations-Index**:
```javascript
// Basierend auf räumlicher Autokorrelation pro Spezies
// Moran's I oder Simpson's Index
segregationIndex = calculateSpatialAutocorrelation(speciesMap)

// Werte:
// 0.0-0.2 = keine Separation (durchmischt)
// 0.2-0.5 = moderate Separation
// 0.5-0.8 = starke Separation
// 0.8-1.0 = vollständige Segregation
```

**Grenz-Schärfe**:
```javascript
// Gradient an Spezies-Grenzen
// Höherer Gradient = schärfere Separation
boundarySharpness = calculateGradient(speciesTransitions)
```

## Parameter-Einflüsse

### Starke Förderer (+++)

#### Repulsion Strength (<-0.5)
**Mechanismus**: Starke negative Repulsion → aktive Vermeidung anderer Spezies

```yaml
repulsionStrength: -0.2 vs -0.8
  → -0.2: Clusterbildung dominiert, wenig Separation
  → -0.8: Segregation dominiert, klare Territorien
```

**Kritische Schwelle**: Umschlagpunkt bei `repulsion ≈ -0.5`
- Oberhalb: [[cluster-formation|Clusterbildung]] ohne starke Separation
- Unterhalb: **Segregation** als dominantes Muster

#### [[sensor-distance|Sensor Distance]] (35-50)
**Mechanismus**: Große Sensor Distance → Agents "sehen" weit → können Unterschiede zwischen Spezies erkennen → aktive Separation

```yaml
sensorDist: 10 vs 40
  → 10: Lokale Interaktion → zufällige Vermischung
  → 40: Fernwahrnehmung → gezielte Vermeidung → klare Grenzen
```

**Theoretische Interpretation**: Separation **erfordert Fernwahrnehmung** – nur mit großer Reichweite können Agents "andere Territorien" erkennen und meiden.

### Moderate Förderer (++)

#### Cross-Species Interaction (true)
**Mechanismus**: Aktiviert Wahrnehmung anderer Spezies → ermöglicht Separation

```yaml
crossSpeciesInteraction: false vs true
  → false: Keine Wahrnehmung → zufällige Verteilung
  → true: Wahrnehmung aktiv → Separation möglich (wenn Repulsion < 0)
```

### Starke Inhibitoren (---)

#### [[attraction-strength|Attraction Strength]] (>1.5)
**Mechanismus**: Sehr hohe Attraction → Fokus auf eigene Spuren → weniger Interaktion mit anderen

**Paradox**: Hohe Attraction hemmt Separation **nur wenn Repulsion schwach ist**

```yaml
# Fall 1: Clusterbildung ohne Separation
attractionStrength: 1.8 + repulsionStrength: -0.2
  → Fokus auf eigene Spuren
  → Aber: keine aktive Vermeidung
  → Ergebnis: Cluster, aber räumlich durchmischt

# Fall 2: SOWOHL Clusterbildung ALS AUCH Separation
attractionStrength: 1.8 + repulsionStrength: -0.8
  → Fokus auf eigene Spuren (Cluster)
  → UND: aktive Vermeidung anderer (Separation)
  → Ergebnis: Homogene Cluster in getrennten Territorien
```

**Anti-Korrelation ist bedingt**: Nur bei schwacher Repulsion.

## Emergenz-Mechanismus

### Fremd-Resonanz als Treiber

Siehe [[../concepts/resonanz.md]] für theoretischen Kontext.

```javascript
// Resonanz-Mechanismus
const selfTrail = trailMap[y][x][ownSpecies];
const otherMax = Math.max(...otherSpeciesTrails);

// Negative Repulsion → Abstoßung
const resonanceValue = selfTrail * attractionStrength +
                       otherMax * repulsionStrength;  // negativ!

// Agent dreht weg von Regionen mit hohem otherMax
if (otherMax > threshold && repulsionStrength < 0) {
  agent.angle += turnAwayFromOthers;
}
```

**Selbst-Organisation**: Territorien emergieren aus **akkumulierter Vermeidung** – nicht aus zentraler Planung.

### Territorial-Feedback-Schleife

```
1. Spezies A vermeidet Region mit Spezies B (Repulsion)
     ↓
2. Spezies A konzentriert sich in Region X
     ↓
3. Region X wird "Territorium von A" (hohe Dichte)
     ↓
4. Spezies B vermeidet Region X noch stärker
     ↓
5. Territoriale Grenze stabilisiert sich
     ↓
[Separation als emergente Eigenschaft]
```

## Typen von Separation

### Typ 1: Starke Segregation (Konflikt)
**Parameter**:
```yaml
attractionStrength: 1.5-2.0
repulsionStrength: -0.7--1.0
sensorDist: 35-50
crossSpeciesInteraction: true
```

**Charakteristik**: Klare, scharfe Grenzen; minimale Überlappung

**Analogie**: Ethnische Segregation, militärische Frontlinien

### Typ 2: Moderate Separation (Nischen)
**Parameter**:
```yaml
attractionStrength: 1.0-1.5
repulsionStrength: -0.4--0.6
sensorDist: 25-35
```

**Charakteristik**: Tendenz zur Trennung, aber mit "Grau-Zonen"

**Analogie**: Ökologische Nischen, Markt-Segmentation

### Typ 3: Dynamische Separation (Fluktuierend)
**Parameter**:
```yaml
attractionStrength: 1.2-1.6
repulsionStrength: -0.5--0.7
speed: 2.0-3.0
chaosInterval: 200-400
```

**Charakteristik**: Territorien ändern sich, aber Separation bleibt

**Analogie**: Nomadische Territorien, saisonale Migration

## Separation vs. [[cluster-formation|Clusterbildung]]

**Komplexe Beziehung**:

| Attraction | Repulsion | Ergebnis |
|---|---|---|
| Niedrig (0.5-1.0) | Neutral (-0.2-0.2) | Weder Cluster noch Separation |
| Hoch (1.5-2.0) | Neutral (-0.2-0.2) | Clusterbildung OHNE Separation |
| Hoch (1.5-2.0) | Stark negativ (<-0.5) | Clusterbildung UND Separation |
| Niedrig (0.5-1.0) | Stark negativ (<-0.5) | Separation OHNE starke Cluster |

**Schlüssel**: Bei **hoher Attraction + starker Repulsion** → Beide Eigenschaften gleichzeitig!

## Biologische Analogien

### Ameisen (Inter-Spezies Territorien)
- Verschiedene Arten vermeiden gegenseitig Territorien
- Pheromon-basierte Grenz-Erkennung
- **Separation ohne zentrale Koordination**

### Pflanzen (Allelopathie)
- Chemische Signale (VOCs) hemmen andere Arten
- "Territorien" durch Wurzel-Exsudate
- Negative Resonanz durch biochemische Repulsion

### Menschen (Urbane Segregation)
- Schelling's Segregationsmodell (1971)
- Minimale "Präferenz für Ähnliches" → starke Segregation
- Ökosemiotische Interpretation: Attraction + Repulsion als affektive Parameter

## Experimentelle Befunde

### Experiment: [[Experiment_Resonanz_Harmonie_Schwelle]]

**Befund**: Harmonie-Schwelle bei `repulsion ≈ -0.5`

```yaml
Setup: attractionStrength = 1.5 (konstant)
      repulsionStrength: -1.0 bis 0.5 (variiert)

Ergebnis:
  repulsion > -0.5 → Clusterbildung dominiert (Segregations-Index < 0.3)
  repulsion < -0.5 → Separation dominiert (Segregations-Index > 0.6)
```

**Theoretische Implikation**: Es gibt **kritische Schwellenwerte**, an denen emergente Eigenschaften qualitativ umschlagen.

### Experiment: [[Experiment_Sensor_Distance_Variation]] (geplant)

**Hypothese**: Separation **erfordert** mindestens `sensorDist > 20`

## Design-Rezepte

### Maximale Separation (Segregation)
```yaml
sensorDist: 35-50
repulsionStrength: -0.7--1.0
crossSpeciesInteraction: true
attractionStrength: 1.5-1.8
sensorAngle: 0.5-0.8
```

**Ergebnis**: Klare, stabile Territorien mit scharfen Grenzen

### Balancierte Koexistenz (Nischen)
```yaml
sensorDist: 20-30
repulsionStrength: -0.3--0.5
attractionStrength: 0.8-1.2
crossSpeciesInteraction: true
```

**Ergebnis**: Moderate Trennung mit Überlappungs-Zonen

### Keine Separation (Durchmischung)
```yaml
sensorDist: 5-15
repulsionStrength: -0.2-0.2
crossSpeciesInteraction: false/true
attractionStrength: 0.5-1.0
```

**Ergebnis**: Zufällige räumliche Verteilung

## Theoretische Bedeutung

Separation demonstriert:

1. **[[../concepts/resonanz.md|Fremd-Resonanz]]**: Repulsion als affektive Beziehung zwischen Zeichensystemen
2. **[[../concepts/emergenz.md|Emergente Geographie]]**: Territorien ohne zentrale Planung
3. **Kritische Schwellenwerte**: Qualitative Umschlagpunkte in emergenten Eigenschaften

## Gesellschaftliche Implikationen

### Schelling's Segregationsmodell (1971)
**Klassisches Modell**:
- Minimale individuelle Präferenz für Ähnliches (~30%)
- Führt zu starker kollektiver Segregation (~70%)

**Ökosemiotische Interpretation**:
- Präferenz = `attractionStrength` + `repulsionStrength`
- Emergente Segregation als **Parameter-Oikos-Effekt**
- Nicht reduzierbar auf individuelle "Vorurteile"

### Policy-Implikationen
1. **Sensor-Distance-Reduktion**: Kleinere Wahrnehmungsreichweite → weniger Segregation
2. **Cross-Species-Interaction**: Förderung von inter-Gruppen-Wahrnehmung
3. **Repulsion-Modulation**: Reduktion negativer Resonanz-Parameter

## Offene Fragen

1. **Grenz-Stabilität**: Wie stabil sind Territorial-Grenzen bei verschiedenen Chaos-Levels?
2. **Multi-Spezies-Matrix**: Was passiert bei asymmetrischer Repulsion (A meidet B, aber B nicht A)?
3. **Separation vs. Diversität**: Ist Separation immer schlecht, oder ermöglicht sie Nischen-Diversität?

## Verwandte Konzepte

- [[../concepts/resonanz.md]] - Repulsion als Fremd-Resonanz
- [[../concepts/parameter-as-oikos.md]] - Repulsion als Resonanz-Oikos-Parameter
- [[cluster-formation]] - Komplexe, bedingte Anti-Korrelation
- [[stability]] - Separation erfordert stabile Territorien
