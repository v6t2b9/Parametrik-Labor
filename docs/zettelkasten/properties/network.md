---
id: property-network
title: Netzwerk
type: emergent-property
category: structural
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [emergence, network, connectivity, branching]
promoted_by:
  - "[[sensor-distance]]" # +++
  - "[[decay-rate]]" # ++
  - agent-count # ++
  - trail-saturation # ++
  - "[[deposit-amount]]" # ++
  - diffusion # +
  - turn-speed # +
  - cross-species-interaction # +
inhibited_by:
  - "[[attraction-strength]]" # - (starke Cluster reduzieren Netzwerk)
  - repulsion-strength # - (Separation reduziert Vernetzung)
  - fade-strength # -
  - chaos-interval # -
  - chaos-strength # -
related:
  - "[[cluster-formation]]" # Teils komplementär, teils konkurrierend
  - "[[stability]]" # Korreliert
  - crystallinity # Teils korreliert
experiments:
  - "[[Experiment_Sensor_Distance_Variation]]"
sources:
  - "[[Parameter_Oikos_Matrix]]"
---

## Definition

**Netzwerk** ist die emergente Tendenz zur Bildung **verzweigter, verbundener Strukturen** statt isolierter Hotspots oder diffuser Verteilungen.

## Charakteristika

### Visuelle Merkmale
- **Verzweigungen**: "Äste" und "Kabel" zwischen Regionen
- **Konnektivität**: Trails verbinden verschiedene Bereiche
- **Hubs**: Zentrale Knotenpunkte mit vielen Verbindungen
- **Pfade**: Erkennbare "Highways" zwischen Hotspots

### Quantifizierung

**Graph-Metriken**:
```javascript
// Identifiziere Hotspots als Nodes
const nodes = identifyHotspots(trailMap);

// Verbindungen als Edges
const edges = identifyConnections(nodes, threshold);

// Netzwerk-Metriken
const avgDegree = edges.length / nodes.length;  // Durchschnittliche Konnektivität
const clusterCoeff = calculateClustering(graph);  // Lokale Vernetzung
const pathLength = averageShortestPath(graph);  // Globale Erreichbarkeit

// Hoher avgDegree + niedriger pathLength = "Small World" Network
```

## Parameter-Einflüsse

### Starke Förderer (+++)

#### [[sensor-distance|Sensor Distance]] (30-50)
**Mechanismus**: Große Sensor Distance → "Fernverbindungen" möglich → verzweigte Strukturen

**Beispiel**: Agents können Hotspots aus Distanz "sehen" und Pfade dorthin bilden

#### [[decay-rate|Decay Rate]] (0.94-0.97)
**Mechanismus**: Moderate Decay → Trails bleiben lang genug für Verbindungen, aber nicht zu stabil (sonst Cluster)

### Moderate Förderer (++)
- **agent-count** (2000-4000): Mehr Agents → mehr potenzielle Verbindungen
- **trail-saturation** (180-240): Ausreichend Kapazität für sichtbare Pfade
- **[[deposit-amount|Deposit]]** (15-25): Moderate Deposits → erkennbare Trails ohne sofortige Sättigung

## Netzwerk vs. [[cluster-formation|Clusterbildung]]

**Trade-off**:
```
Hohe Attraction → Starke Cluster, aber weniger Netzwerk
  - Agents konvergieren auf Hotspots
  - Bleiben dort (lokale Sättigung)
  - Wenige "Fernverbindungen"

Moderate Attraction → Weniger dichte Cluster, aber mehr Netzwerk
  - Agents explorieren weiter
  - Bilden Pfade zwischen Regionen
  - Mehr Vernetzung
```

**Optimale Balance**: `attractionStrength = 1.0-1.3` + `sensorDist = 30-40`

## Typen von Netzwerken

### Typ 1: Verzweigte Netzwerke ("Nervensystem")
**Parameter**:
```yaml
sensorDist: 35
decayRate: 0.94
deposit: 20
diffusion: 1-2  # Niedrig für scharfe Kanten
```

**Charakteristik**: Klare "Kabel", verzweigte Struktur, erkennbare Hubs

### Typ 2: Mesh-Netzwerke (dicht verwoben)
**Parameter**:
```yaml
agentCount: 5000
sensorDist: 30
decayRate: 0.95
deposit: 18
```

**Charakteristik**: Viele überlappende Pfade, hohe Redundanz

### Typ 3: Hub-and-Spoke (Stern-Topologie)
**Parameter**:
```yaml
attractionStrength: 1.4
sensorDist: 40
decayRate: 0.96
agent-count: 3000
```

**Charakteristik**: Wenige zentrale Hubs, viele Verbindungen zu diesen

## Design-Rezept: Maximale Netzwerk-Bildung

```yaml
Ziel: Verzweigte, verbundene Strukturen

sensorDist: 30-40            # +++ (Fernverbindungen)
decayRate: 0.94-0.96         # ++ (persistente Pfade)
agentCount: 2000-4000        # ++ (genug Agents für Pfade)
deposit: 15-25               # ++ (erkennbare Trails)
attractionStrength: 1.0-1.3  # Moderat (nicht zu starke Cluster)
diffusion: 1-3               # Niedrig (scharfe Pfade)

Begründung:
  Große Sensor-Reichweite + moderate Agent-Dichte
  → "Fernverbindungen" zwischen Trail-Segmenten
  → Verzweigte Netzwerke statt isolierte Cluster
```

## Theoretische Bedeutung

Netzwerk demonstriert:
1. **Exploration + Exploitation**: Balance zwischen lokalem Cluster und globalem Pfad
2. **Small-World-Phänomen**: Hohe lokale Vernetzung + kurze globale Pfade
3. **Emergente Topologie**: Netzwerk-Struktur nicht programmiert, sondern emergiert

## Biologische Analogien

- **Neuronale Netzwerke**: Verzweigte Axone, Dendriten
- **Myzel-Netzwerke**: Pilz-Hyphen bilden verzweigte Strukturen
- **Ameisen-Highways**: Pfade zwischen Nest und Nahrungsquellen
- **Blutgefäße**: Hierarchische Verzweigung (Arterien → Kapillaren)

## Verwandte Konzepte

- [[../concepts/emergenz.md]] - Netzwerk als emergente Topologie
- [[cluster-formation]] - Trade-off (Cluster vs. Netzwerk)
- [[stability]] - Netzwerke erfordern stabile Pfade
- [[separation]] - Reduziert cross-species Netzwerke
