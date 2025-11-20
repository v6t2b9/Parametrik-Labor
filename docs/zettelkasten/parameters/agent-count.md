---
id: param-agent-count
title: Agent Count
type: parameter
oikos: temporale-oikos
range: 100 - 8000
default: 3000
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [parameter, temporal, population, density, interactions]
affects:
  - "[[cluster-formation]]" # +++
  - "[[separation]]" # -
  - "[[stability]]" # +
  - chaos # +
  - network # ++
  - fluidity # +
  - crystallinity # -
  - density # +++
related:
  - "[[agent-speed]]"
  - "[[deposit-amount]]"
  - trail-saturation
experiments:
  - "[[Experiment_Agent_Count_Skalierung]]"
sources:
  - "[[Parameter_Oikos_Matrix]]"
---

## Definition

**Agent Count** bestimmt die **Anzahl der Agenten** im System – die Bevölkerungsdichte, die gleichzeitig Zeichen setzt und wahrnimmt.

## Ökosemiotische Interpretation

`agentCount` ist **nicht** "Anzahl der Partikel", sondern:

**"Dichte der Interaktionen"**

- `agentCount = 8000` → Hohe Dichte → viele Interaktionen → verstärkte Cluster-Effekte
- `agentCount = 1000` → Niedrige Dichte → wenige Interaktionen → sparse, isolierte Muster

Agent Count strukturiert die **Interaktionsfrequenz** – wie oft Zeichen gesetzt und wahrgenommen werden.

## Implementation

```javascript
// Agents-Array mit N Elementen
const agents = Array(agentCount).fill(null).map(() => createAgent());

// Jeder Frame: Alle Agents bewegen sich
agents.forEach(agent => {
  updateAgent(agent);  // Sense → Turn → Move → Deposit
});

// Mehr Agents → mehr Deposits pro Frame → höhere Trail-Akkumulationsrate
```

## Wertebereich

| Wert | Effekt | Typische Anwendung |
|---|---|---|
| **100-500** | Sehr sparse | Exploration, subtile Muster |
| **1000-2000** | Niedrige Dichte | Balancierte Sparse-Muster |
| **3000-5000** | Moderate Dichte | Standard-Dynamik |
| **6000-8000** | Hohe Dichte | Intensive Cluster, schnelle Sättigung |
| **>8000** | Sehr hohe Dichte | Performance-kritisch, extreme Dichte |

## Effekte auf emergente Eigenschaften

Aus der [[../meta/map-parameter-effects.md|Parameter-Oikos-Matrix]]:

| Eigenschaft | Effekt | Stärke | Erklärung |
|---|---|---|---|
| **[[cluster-formation\|Clusterbildung]]** | ⬆️ | +++ | Viele Agents → mehr Interaktionen → verstärkte Cluster-Effekte |
| **[[separation\|Separation]]** | ⬇️ | - | Viele Agents → Überlappung erhöht → weniger klare Trennung |
| **[[stability\|Stabilität]]** | ⬆️ | + | Mehr Agents → konsistentere Trail-Dichten → stabilere Muster |
| **Chaos** | ⬆️ | + | Mehr Agents → mehr Interaktions-Komplexität → höhere Varianz |
| **Network** | ⬆️ | ++ | Mehr Agents → mehr Verbindungen zwischen Trails |
| **Fluidity** | ⬆️ | + | Höhere Dichte → dynamischere Veränderungen |
| **Crystallinity** | ⬇️ | - | Viele Agents → "Verschmierung" geometrischer Muster |
| **Density** | ⬆️ | +++ | Viele Agents → mehr Deposits → dichtere Trails |

## Interaktionen mit anderen Parametern

### Agent Count × [[deposit-amount|Deposit]]: Akkumulationsrate

**Gesamte Deposit-Rate = agentCount × deposit × FPS**:

```yaml
# Langsame Akkumulation
agentCount: 1000 + deposit: 10 + FPS: 60
  → 1000 × 10 × 60 = 600.000 Deposits/Sekunde
  - Langsame Muster-Emergenz
  - Subtile Trails

# Moderate Akkumulation
agentCount: 3000 + deposit: 15 + FPS: 60
  → 3000 × 15 × 60 = 2.700.000 Deposits/Sekunde
  - Balancierte Dynamik
  - Standard-Muster

# Sehr schnelle Akkumulation
agentCount: 6000 + deposit: 25 + FPS: 60
  → 6000 × 25 × 60 = 9.000.000 Deposits/Sekunde
  - Explosive Muster-Emergenz
  - Schnelle Sättigung (wenn trail-saturation niedrig)
```

### Agent Count × Trail Saturation: Sättigungszeit

**Zeit bis Saturation ∝ saturation / (agentCount × deposit)**:

```yaml
# Schnelle Sättigung
agentCount: 8000 + deposit: 30 + trailSaturation: 150
  → Hotspots sättigen in ~1-2 Sekunden
  - Sehr hohe Deposit-Rate
  - Niedrige Kapazität
  - Ergebnis: Muster "frieren" schnell ein

# Langsame Sättigung
agentCount: 1000 + deposit: 10 + trailSaturation: 255
  → Hotspots sättigen in ~30-60 Sekunden
  - Niedrige Deposit-Rate
  - Hohe Kapazität
  - Ergebnis: Langsame, organische Emergenz
```

### Agent Count × [[agent-speed|Speed]]: Interaktionsrate

**Gesamte Interaktionsrate ∝ agentCount × speed**:

```yaml
# Niedrige Interaktionsrate
agentCount: 1000 + speed: 1.0 → Sparse, langsame Muster

# Moderate Interaktionsrate
agentCount: 3000 + speed: 1.5 → Balancierte Dynamik

# Hohe Interaktionsrate
agentCount: 6000 + speed: 2.5 → Dichte, schnelle Muster

# Extreme Interaktionsrate
agentCount: 8000 + speed: 3.0 → Maximale Dichte (Performance-kritisch!)
```

## Experimentelle Befunde

### Experiment: [[Experiment_Agent_Count_Skalierung]]

**Befund**: Clusterbildung skaliert **überlinear** mit Agent Count

```yaml
Setup: Konstante Parameter (decay, deposit, attraction), variiere agentCount

Ergebnisse:
  1000 Agents → 2-3 kleine Cluster
  3000 Agents → 4-6 moderate Cluster (nicht 3× mehr!)
  6000 Agents → 6-10 große Cluster (nicht 6× mehr!)

Interpretation:
  - Mehr Agents → nicht nur mehr Cluster
  - Sondern: Cluster werden auch größer, intensiver
  - Überlineares Skalierungsverhalten
```

**Theoretische Implikation**: Clusterbildung ist **nicht linear** in Agent Count – zeigt **Netzwerk-Effekte**

### Beobachtung: Agent Count-Schwellenwerte

**Unter ~1500**: Sparse, isolierte Muster, schwache Cluster
**1500-4000**: Balancierter Bereich – klare Muster ohne Überfüllung
**4000-6000**: Dichte Muster, starke Cluster
**Über ~6000**: Sehr dichte Muster, schnelle Sättigung, Performance-kritisch

## Presets mit charakteristischem Agent Count

| Preset | Agent Count | Deposit | Decay | Muster |
|---|---|---|---|---|
| **Sparse Exploration** | 1000 | 10 | 0.94 | Subtile, isolierte Trails |
| **Balanced** | 3000 | 15 | 0.96 | Standard-Dynamik |
| **Dense Clusters** | 6000 | 20 | 0.98 | Intensive, dichte Hotspots |
| **Superclusters** | 8000 | 25 | 0.99 | Extreme Dichte (Performance-kritisch) |

## Design-Empfehlungen

### Für maximale Clusterbildung
```yaml
agentCount: 5000-8000  # Hoch!
+ attractionStrength: 1.7-2.0
+ decayRate: 0.97-0.99
+ deposit: 20-30
```

**Ergebnis**: Kompakte, dichte, homogene Cluster

### Für sparse, subtile Muster
```yaml
agentCount: 1000-2000  # Niedrig!
+ deposit: 8-15
+ decayRate: 0.92-0.96
+ speed: 1.0-1.5
```

**Ergebnis**: Sparse, organische, subtile Trails

### Für balancierte Dynamik
```yaml
agentCount: 2500-4000
+ deposit: 15-20
+ decayRate: 0.94-0.97
+ speed: 1.5-2.0
```

**Ergebnis**: Standard-Dynamik, klare Muster ohne Überfüllung

## Theoretische Bedeutung

Agent Count ist ein **zentraler Parameter** der **Temporalen Oikos** weil er:

1. **Interaktionsfrequenz** definiert (Wie oft werden Zeichen gesetzt/wahrgenommen?)
2. **Netzwerk-Effekte** ermöglicht (Überlineare Skalierung)
3. **Emergenz-Geschwindigkeit** strukturiert (Mehr Agents → schnellere Muster-Emergenz)

Siehe [[../concepts/parameter-as-oikos.md#temporale-oikos]]

## Biologische Analogien

### Populationsdichte (Ökologie)
**Carrying Capacity**:
- Niedrige Dichte: Wenig Interaktionen, Isolation
- Hohe Dichte: Viele Interaktionen, Competition, Kooperation
- Optimale Dichte für bestimmte Emergenz-Typen

### Neuronale Dichte
**Neuronal Density**:
- Niedrige Dichte: Wenig Konnektivität
- Hohe Dichte: Hohe Konnektivität, komplexe Emergenz
- Zu hoch: "Overload", Chaos

### Soziale Netzwerke
**Network Density**:
- Sparse Networks: Wenig Information-Flow
- Dense Networks: Hoher Information-Flow, schnelle Verbreitung
- Dunbar's Number: Optimale soziale Gruppen-Größe (~150)

## Agent Count als Performance-Bottleneck

### Computational Cost

Agent Count ist **der teuerste Parameter**:

```javascript
// O(agentCount) pro Frame
agents.forEach(agent => {
  updateAgent(agent);  // Sense (3 samples) + Move + Deposit
});

// Bei 8000 Agents, 60 FPS:
// → 8000 × 60 = 480.000 Agent-Updates/Sekunde
// → 1.440.000 Sensor-Samples/Sekunde (3 pro Agent)
```

**Performance-Implikationen**:
- **Unter 3000**: Minimal-Impact, 60 FPS+ leicht
- **3000-5000**: Moderate Impact, 60 FPS machbar
- **5000-7000**: High Impact, 30-60 FPS
- **Über 7000**: Very High Impact, <30 FPS (ohne Optimierung)

### Adaptive Optimization

Das System **reduziert Agent Count automatisch** bei niedrigem FPS:

```javascript
if (fps < targetFPS && agentCount > minAgents) {
  agentCount -= reductionStep;
  console.log(`Performance optimization: Reduced agents to ${agentCount}`);
}
```

Siehe [[../development/ARCHITECTURE.md#performance-optimization]]

## Agent Count vs. Deposit: Trade-off

**Für gleiche Akkumulationsrate**:

```
Option A: agentCount = 6000, deposit = 10 → 60.000 total deposits/frame
Option B: agentCount = 3000, deposit = 20 → 60.000 total deposits/frame
```

**Aber unterschiedliche Emergenz**:
- **Option A** (mehr Agents): Mehr Sensor-Samples → feinere Trails, mehr Netzwerk
- **Option B** (höherer Deposit): Weniger Samples → gröbere Trails, stärkere Hotspots

**Theoretische Implikation**: Agent Count und Deposit sind **nicht äquivalent** trotz gleicher Akkumulationsrate

## Offene Fragen

1. **Optimale Agent Density**: Gibt es eine optimale Density pro Grid-Größe?
2. **Heterogene Populationen**: Was, wenn Agents verschiedene Parameter haben (species-specific)?
3. **Dynamische Population**: Sollte Agent Count adaptiv sein (basierend auf Trail-Dichte)?

## Verwandte Parameter

- [[deposit-amount]] - **Zusammen** definieren Akkumulationsrate
- [[agent-speed]] - **Zusammen** definieren Interaktionsrate
- trail-saturation - Mehr Agents → schnellere Sättigung
- [[attraction-strength]] - Mehr Agents verstärken Cluster-Effekt

## Verwandte Konzepte

- [[../concepts/parameter-as-oikos.md]] - Agent Count als Teil der Temporalen Oikos
- [[../concepts/emergenz.md]] - Agent Count ermöglicht Netzwerk-Effekte
- [[cluster-formation]] - Stark gefördert durch hohen Agent Count
- [[density]] - Primär bestimmt durch Agent Count
