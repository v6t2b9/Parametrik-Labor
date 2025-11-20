---
id: param-attraction-strength
title: Attraction Strength
type: parameter
oikos: resonanz-oikos
range: 0.0 - 2.0
default: 1.0
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [parameter, resonance, multi-species, affective-relations, clustering]
affects:
  - "[[cluster-formation]]" # +++
  - "[[separation]]" # ---
  - "[[stability]]" # +
  - chaos # +
  - network # -
  - fluidity # +
  - crystallinity # +
  - density # ++
related:
  - repulsion-strength
  - cross-species-interaction
  - "[[sensor-distance]]"
experiments:
  - "[[Experiment_Resonanz_Harmonie_Schwelle]]"
sources:
  - "[[Parameter_Oikos_Matrix]]"
  - "[[Von_Stigmergie_zu_Oekosemiotik]]"
---

## Definition

**Attraction Strength** bestimmt die **Stärke der Selbst-Resonanz** – wie stark Agenten eigene Spuren folgen und dadurch homogene Gruppen bilden.

## Ökosemiotische Interpretation

`attractionStrength` ist **nicht** "Anziehungskraft", sondern:

**"Grad der Selbst-Resonanz innerhalb eines Zeichensystems"**

- `attractionStrength = 2.0` → Starke Selbst-Resonanz → Homogene Cluster
- `attractionStrength = 0.5` → Schwache Selbst-Resonanz → Diffuse Verteilung

Attraction strukturiert **affektive Beziehungen** zwischen Agenten derselben Spezies.

Siehe [[../concepts/resonanz.md]] für theoretischen Kontext.

## Implementation

```javascript
// Resonanz-Modus: Agents gewichten eigene vs. fremde Spuren
const selfTrail = trailMap[y][x][ownSpecies];
const otherTrails = [trailMap[y][x].r, trailMap[y][x].g, trailMap[y][x].b]
  .filter(t => t !== selfTrail);
const otherMax = Math.max(...otherTrails);

// Attraction verstärkt Reaktion auf eigene Spuren
const resonanceValue = selfTrail * attractionStrength +
                       otherMax * repulsionStrength;
```

## Wertebereich

| Wert | Effekt | Emergentes Muster |
|---|---|---|
| **0.0-0.5** | Sehr schwache Selbst-Resonanz | Zufällige Verteilung, keine Cluster |
| **0.6-1.2** | Moderate Selbst-Resonanz | Balancierte Dynamik, lose Gruppen |
| **1.3-1.7** | Starke Selbst-Resonanz | Deutliche Cluster, Homogenität |
| **1.8-2.0** | Sehr starke Selbst-Resonanz | Kompakte, dichte Cluster |

## Effekte auf emergente Eigenschaften

Aus der [[../meta/map-parameter-effects.md|Parameter-Oikos-Matrix]]:

| Eigenschaft | Effekt | Stärke | Erklärung |
|---|---|---|---|
| **[[cluster-formation\|Clusterbildung]]** | ⬆️ | +++ | Hohe Attraction → Agents folgen eigenen Spuren stark → homogene Cluster |
| **[[separation\|Separation]]** | ⬇️ | --- | Hohe Attraction zu eigener Spezies → weniger Interaktion mit anderen → Segregation |
| **[[stability\|Stabilität]]** | ⬆️ | + | Konsistente Bewegung in Richtung eigener Spuren |
| **Chaos** | ⬆️ | + | In Kombination mit Repulsion → komplexe Dynamiken |
| **Netzwerk** | ⬇️ | - | Starke Cluster → weniger verzweigte Verbindungen |
| **Fluidität** | ⬆️ | + | Moderate Attraction → organische Bewegung |
| **Kristallinität** | ⬆️ | + | Hohe Attraction + hoher Decay → geometrische Cluster |
| **Dichte** | ⬆️ | ++ | Konvergenz auf Hotspots |

## Kritische Interaktion: Attraction × Repulsion

**Harmonie-Schwelle** bei `repulsionStrength ≈ -0.5`:

### Clusterbildung (Harmonie)
```yaml
attractionStrength: 1.5-2.0
repulsionStrength: -0.3-0.2
→ Homogene Cluster, minimale Fremd-Abstoßung
```

### Segregation (Konflikt)
```yaml
attractionStrength: 1.5-2.0
repulsionStrength: -0.7--1.0
→ Getrennte Territorien, starke Fremd-Abstoßung
```

### Koexistenz (Balance)
```yaml
attractionStrength: 0.8-1.2
repulsionStrength: 0.2-0.5
→ Durchmischte Koexistenz, leichte Fremd-Anziehung
```

Siehe [[Experiment_Resonanz_Harmonie_Schwelle]] für experimentelle Validierung.

## Attraction × Cross-Species Interaction

```yaml
attractionStrength: 1.8 + crossSpeciesInteraction: false
→ Nur Selbst-Resonanz aktiv
→ Cluster entstehen, aber keine aktive Separation von anderen

attractionStrength: 1.8 + crossSpeciesInteraction: true + repulsionStrength: -0.8
→ Selbst-Resonanz UND Fremd-Abstoßung aktiv
→ Cluster MIT aktiver Territorial-Segregation
```

## Theoretische Bedeutung

Attraction ist der **zentrale Parameter** der **Resonanz-Oikos** weil er:

1. **Selbst-Resonanz** strukturiert (Wie stark resonieren Agenten mit eigenen Zeichen?)
2. **Soziale Struktur** ermöglicht (Clusterbildung als emergentes Phänomen)
3. **Affektive Geometrie** definiert (Zusammen mit Repulsion)

Siehe [[../concepts/parameter-as-oikos.md#resonanz-oikos]] und [[../concepts/resonanz.md]].

## Experimentelle Befunde

### Beobachtung: Lineare Skalierung

**Clusterbildung** steigt **linear** mit Attraction:
- `attraction = 0.5` → kaum Cluster
- `attraction = 1.0` → moderate Cluster
- `attraction = 1.5` → starke Cluster
- `attraction = 2.0` → maximale Cluster

### Beobachtung: Umschlagpunkt mit Repulsion

**Qualitative Veränderung** der Muster bei `repulsion ≈ -0.5`:
- Oberhalb: Clusterbildung dominiert
- Unterhalb: Separation dominiert

## Presets mit charakteristischer Attraction

| Preset | Attraction | Repulsion | Muster |
|---|---|---|---|
| **Clusterbildung** | 1.8 | -0.2 | Homogene, dichte Gruppen |
| **Segregation** | 1.5 | -0.8 | Getrennte Territorien |
| **Harmonie** | 1.2 | 0.3 | Durchmischte Koexistenz |

## Design-Empfehlungen

### Für maximale Clusterbildung
```yaml
attractionStrength: 1.7-2.0
+ repulsionStrength: -0.2-0.2
+ decayRate: 0.96-0.99
+ agentCount: 3000-6000
```

### Für maximale Separation
```yaml
attractionStrength: 1.5-1.8
+ repulsionStrength: -0.7--1.0
+ crossSpeciesInteraction: true
+ sensorDist: 35-50
```

### Für balancierte Koexistenz
```yaml
attractionStrength: 0.8-1.2
+ repulsionStrength: 0.2-0.5
+ crossSpeciesInteraction: true
```

## Resonanztheorie-Verbindung

### Rosa: Resonanz als Weltbeziehung

**Klassische Resonanztheorie**:
- Subjekt ↔ Welt-Beziehung
- Nicht instrumentell, nicht kontrollierend

**Ökosemiotische Übersetzung**:
- Agent ↔ Eigene-Spuren-Beziehung
- Nicht programmiert (Attraction ist Oikos-Parameter, kein explizites Ziel)
- Cluster emergieren aus Resonanz

### Attraction als Resonanz-Parameter

`attractionStrength` moduliert **Intensität der Resonanz**:
- Hohe Attraction = Starke Resonanz = Agent "hört" eigene Zeichen stark
- Niedrige Attraction = Schwache Resonanz = Agent "hört" eigene Zeichen kaum

## Biologische Analogien

### Ameisen
- **Attraction = Pheromon-Sensitivität** für eigene Kolonie
- Höhere Attraction → stärkere Trail-Following
- Verschiedene Ameisen-Arten haben verschiedene Attraction-Werte

### Vögel (Schwarmseparation)
- **Attraction = Artspezifische Kohäsion**
- Stare vs. Möwen: verschiedene Attraction-Stärken
- Bestimmt Cluster-Dichte im Schwarm

### Menschen (Echo-Chambers)
- **Attraction = Präferenz für Ingroup-Meinungen**
- Hohe Attraction → Ideologische Cluster
- Social-Media-Algorithmen verstärken Attraction

## Offene Fragen

1. **Optimale Attraction für Stabilität**: Gibt es einen optimalen Attraction-Wert, der Cluster-Stabilität maximiert?
2. **Species-specific Attraction**: Was passiert, wenn Spezies verschiedene Attraction-Werte haben?
3. **Adaptive Attraction**: Sollte Attraction von lokaler Trail-Dichte abhängen?

## Verwandte Parameter

- `repulsionStrength` - Komplementärer Parameter (Fremd-Resonanz)
- `crossSpeciesInteraction` - Aktiviert/deaktiviert Resonanz-Dynamiken
- [[sensor-distance]] - Verstärkt Attraction-Effekt bei größerer Reichweite
- [[decay-rate]] - Synergie mit Attraction für Cluster-Stabilität

## Verwandte Konzepte

- [[../concepts/resonanz.md]] - Theoretischer Rahmen
- [[../concepts/parameter-as-oikos.md]] - Attraction als Teil der Resonanz-Oikos
- [[cluster-formation]] - Primäre emergente Eigenschaft
- [[separation]] - Anti-korrelierte emergente Eigenschaft
