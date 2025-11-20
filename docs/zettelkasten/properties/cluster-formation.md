---
id: property-cluster-formation
title: Clusterbildung
type: emergent-property
category: structural
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [emergence, clustering, social-structure, homogeneity]
promoted_by:
  - "[[decay-rate]]" # +++
  - "[[attraction-strength]]" # +++
  - agent-count # +++
  - "[[deposit-amount]]" # ++
  - diffusion # ++
  - trail-saturation # ++
inhibited_by:
  - repulsion-strength # ---
  - fade-strength # -
  - chaos-interval # -
related:
  - "[[separation]]" # Anti-korreliert
  - "[[stability]]" # Korreliert
  - density # Korreliert
experiments:
  - "[[Experiment_Resonanz_Harmonie_Schwelle]]"
  - "[[Experiment_Agent_Count_Skalierung]]"
sources:
  - "[[Parameter_Oikos_Matrix]]"
---

## Definition

**Clusterbildung** (Clustering) ist die emergente Tendenz zur Bildung **räumlich konzentrierter, homogener Gruppen** von Agenten derselben Spezies.

## Charakteristika

### Visuelle Merkmale
- **Hotspots**: Hohe Trail-Intensität in lokalisierten Regionen
- **Homogenität**: Primär eine Farbe/Spezies pro Cluster
- **Scharfe Grenzen**: Klare Übergänge zwischen Cluster und Umgebung
- **Stabilität**: Cluster bleiben über Zeit an gleicher Position

### Quantifizierung

**Cluster-Koeffizient**:
```javascript
// Verhältnis lokaler Dichte zu globaler Dichte
clusterCoefficient = (localDensity / globalDensity) - 1

// Werte:
// 0 = keine Clusterbildung (uniform verteilt)
// 1-5 = moderate Clusterbildung
// >5 = starke Clusterbildung
```

## Parameter-Einflüsse

### Starke Förderer (+++)

#### [[decay-rate|Decay Rate]] (0.98-0.999)
**Mechanismus**: Hoher Decay → Trails bleiben lange → Agents folgen alten Spuren → Cluster-Verstärkung

```yaml
decayRate: 0.99 vs 0.85
  → 0.99: Starke, stabile Cluster
  → 0.85: Diffuse, volatile Verteilung
```

#### [[attraction-strength|Attraction Strength]] (1.5-2.0)
**Mechanismus**: Hohe Attraction → Agents folgen eigenen Spuren stark → homogene Cluster

```yaml
attractionStrength: 1.8 vs 0.5
  → 1.8: Kompakte, dichte Cluster
  → 0.5: Zufällige Verteilung
```

#### Agent Count (5000-8000)
**Mechanismus**: Viele Agents → mehr Interaktionen → verstärkte Cluster-Effekte

```yaml
agentCount: 6000 vs 1000
  → 6000: Mehrere große Cluster
  → 1000: Wenige, kleine Cluster oder diffus
```

Siehe [[../meta/map-parameter-effects.md]] für vollständige Matrix.

### Moderate Förderer (++)

- **[[deposit-amount|Deposit]]** (20-30): Starke Spuren → Cluster-Konvergenz
- **Diffusion** (5-8): Räumliche Ausbreitung → größere Cluster
- **Trail Saturation** (200-255): Höhere Kapazität → dichtere Cluster

### Starke Inhibitoren (---)

#### Repulsion Strength (<-0.5)
**Mechanismus**: Starke Repulsion → aktive Vermeidung → Segregation statt Clusterbildung

```yaml
repulsionStrength: -0.2 vs -0.8
  → -0.2: Clusterbildung dominiert
  → -0.8: Separation dominiert (siehe [[separation]])
```

**Kritische Schwelle**: Umschlagpunkt bei `repulsion ≈ -0.5`

## Emergenz-Mechanismus

### Positive Feedback-Schleife

```
1. Agent hinterlässt Spur
     ↓
2. Spur bleibt erhalten (hoher Decay)
     ↓
3. Andere Agents der gleichen Spezies folgen Spur (hohe Attraction)
     ↓
4. Mehr Agents → stärkere Spur
     ↓
5. Stärkere Spur → mehr Agents folgen
     ↓
[Verstärkung bis Saturation erreicht]
```

**Selbst-Organisation**: Cluster sind **nicht programmiert** – sie emergieren aus der Interaktion von Zeichensetzung und [[../concepts/parameter-as-oikos.md|Parameter-Oikos]].

### Sättigungs-Mechanismus

**Trail Saturation** limitiert Cluster-Wachstum:
```javascript
trailMap[y][x].r = Math.min(trailMap[y][x].r, trailSaturation);

// Bei Saturation: Kein weiteres Wachstum möglich
// Cluster "friert" ein
```

## Typen von Clustern

### Typ 1: Stabile Hotspot-Cluster
**Parameter**:
```yaml
decayRate: 0.98-0.999
attractionStrength: 1.7-2.0
deposit: 25-30
```

**Charakteristik**: Kompakt, stationär, hohe Dichte

### Typ 2: Dynamische Schwarm-Cluster
**Parameter**:
```yaml
decayRate: 0.94-0.97
attractionStrength: 1.3-1.6
speed: 2.0-3.0
```

**Charakteristik**: Bewegt sich, mittlere Dichte, fluid

### Typ 3: Netzwerk-Cluster
**Parameter**:
```yaml
decayRate: 0.94-0.96
sensorDist: 30-40
deposit: 15-20
```

**Charakteristik**: Verzweigt, verbunden, mittlere Dichte

## Clusterbildung vs. [[separation|Separation]]

**Anti-Korrelation**: Parameter, die Clusterbildung fördern, hemmen oft Separation

| Parameter | Cluster | Separation | Erklärung |
|---|---|---|---|
| **Attraction** | +++ | --- | Fokus auf eigene Spuren → weniger Interaktion mit anderen |
| **Repulsion** | --- | +++ | Fokus auf Vermeidung → aktive Segregation |
| **Agent Count** | +++ | - | Viele Agents → Überlappung → weniger klare Trennung |

**Aber**: Bei hoher Attraction + starker Repulsion → **sowohl** Cluster **als auch** Separation (getrennte Territorien)

## Biologische Analogien

### Ameisen (Nest-Clustering)
- Hohe Pheromon-Persistenz (Decay)
- Hohe Artspezifische Sensitivität (Attraction)
- → Nest-Formation

### Bakterien (Biofilm-Bildung)
- Quorum Sensing (Agent Count-Effekt)
- Extrazelluläre Matrix (Trail Saturation)
- → Biofilm-Cluster

### Menschen (Urbane Segregation)
- "Gravitational" attraction zu eigener Gruppe
- Ressourcen-Clustering (Hotspots)
- → Ethnische/sozioökonomische Nachbarschaften

## Experimentelle Validierung

### Experiment: [[Experiment_Resonanz_Harmonie_Schwelle]]

**Befund**: Clusterbildung ist **maximal** bei:
```yaml
attractionStrength: 1.8
repulsionStrength: -0.2 bis 0.2
crossSpeciesInteraction: true/false (irrelevant für reine Clusterbildung)
```

### Experiment: [[Experiment_Agent_Count_Skalierung]]

**Befund**: Clusterbildung skaliert **überlinear** mit Agent Count:
- 1000 Agents → 2-3 kleine Cluster
- 3000 Agents → 4-6 moderate Cluster
- 6000 Agents → 6-10 große Cluster

## Design-Rezepte

### Maximale Clusterbildung
```yaml
decayRate: 0.99
agentCount: 5000-8000
attractionStrength: 1.8-2.0
deposit: 25-30
diffusionFreq: 5-8
repulsionStrength: -0.2-0.2
```

**Ergebnis**: Kompakte, dichte, homogene Cluster

### Balancierte Clusterbildung
```yaml
decayRate: 0.95-0.97
agentCount: 2000-3000
attractionStrength: 1.2-1.5
deposit: 15-20
```

**Ergebnis**: Moderate Cluster mit Dynamik

## Theoretische Bedeutung

Clusterbildung demonstriert:

1. **[[../concepts/emergenz.md|Emergenz]]**: Nicht programmiert, entsteht aus Interaktion
2. **[[../concepts/resonanz.md|Selbst-Resonanz]]**: Attraction als Resonanz-Parameter
3. **[[../concepts/parameter-as-oikos.md|Parameter-Oikos]]**: Multiple Parameter ko-konstituieren Cluster-Emergenz

## Korrelierte Eigenschaften

**Familie: Ordnung** (positiv korreliert)
- [[stability]] - Cluster sind oft stabil
- Density - Cluster sind dichte Regionen
- Crystallinity - Bei hohem Decay + niedriger Diffusion

**Familie: Dynamik** (negativ korreliert)
- Chaos - Clusterbildung reduziert Chaos
- Fluidity - Stabile Cluster sind weniger fluid

## Offene Fragen

1. **Optimale Cluster-Größe**: Gibt es eine "natürliche" Cluster-Größe für gegebene Parameter?
2. **Cluster-Lebensdauer**: Wie lange persistieren Cluster bei verschiedenen Chaos-Interventionen?
3. **Multi-Cluster-Dynamik**: Wie interagieren mehrere Cluster (Competition? Merging?)

## Verwandte Konzepte

- [[../concepts/resonanz.md]] - Attraction als Selbst-Resonanz
- [[../concepts/emergenz.md]] - Clusterbildung als emergentes Phänomen
- [[separation]] - Anti-korrelierte Eigenschaft
- [[stability]] - Korrelierte Eigenschaft
