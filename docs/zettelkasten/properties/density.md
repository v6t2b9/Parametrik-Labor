---
id: property-density
title: Dichte
type: emergent-property
category: quantitative
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [emergence, density, intensity, concentration, hotspots]
promoted_by:
  - "[[deposit-amount]]" # +++
  - agent-count # +++
  - trail-saturation # +++ (höhere Kapazität)
  - "[[decay-rate]]" # ++
  - "[[attraction-strength]]" # ++
  - "[[sensor-distance]]" # +
  - sensor-angle # +
  - turn-speed # +
inhibited_by:
  - fade-strength # -- (löscht Akkumulation)
  - diffusion # - (verteilt Intensität)
  - chaos-interval # - (verhindert Akkumulation)
  - chaos-strength # -
  - repulsion-strength # - (Separation verteilt breiter)
related:
  - "[[cluster-formation]]" # Stark korreliert
  - "[[stability]]" # Korreliert
  - trail-saturation # Limitiert Dichte
experiments:
  - "[[Experiment_Agent_Count_Skalierung]]"
sources:
  - "[[Parameter_Oikos_Matrix]]"
---

## Definition

**Dichte** ist die **Konzentration von Trail-Intensität** in Hotspots – wie intensiv und konzentriert Spuren akkumulieren.

## Charakteristika

### Visuelle Merkmale
- **Hotspots**: Helle, intensive Regionen
- **Starke Kontraste**: Große Unterschiede zwischen Hotspots und Umgebung
- **Konzentration**: Trails akkumulieren in lokalisierten Bereichen
- **Saturation**: Hotspots erreichen maximale Intensität

### Quantifizierung

**Peak Intensity**:
```javascript
// Maximale Trail-Intensität
const peakIntensity = Math.max(...trailMap.flat().map(cell => Math.max(cell.r, cell.g, cell.b)));

// Werte:
// 50-100 = niedrige Dichte
// 100-180 = moderate Dichte
// 180-255 = hohe Dichte (Saturation erreicht)
```

**Concentration Ratio**:
```javascript
// Verhältnis von Hotspot-Intensität zu Durchschnitts-Intensität
const avgIntensity = average(trailMap);
const concentrationRatio = peakIntensity / avgIntensity;

// Höhere Ratio = höhere Dichte-Konzentration
```

**Gini-Koeffizient** (Ungleichheits-Maß):
```javascript
// Wie ungleich verteilt ist Trail-Intensität?
const gini = calculateGini(trailMap);

// 0.0 = perfekt gleichverteilt
// 1.0 = maximale Konzentration in wenigen Zellen
// Hoher Gini = hohe Dichte-Konzentration
```

## Parameter-Einflüsse

### Starke Förderer (+++)

#### [[deposit-amount|Deposit Amount]] (25-30)
**Mechanismus**: Hoher Deposit → schnelle Akkumulation → dichte Hotspots

**Primär-Effekt**: Deposit ist **der wichtigste Parameter** für Dichte

#### agent-count (5000-8000)
**Mechanismus**: Viele Agents → mehr Deposits → dichtere Trails

**Skalierung**: Dichte skaliert **linear** mit Agent Count (wenn Saturation nicht erreicht)

#### trail-saturation (220-255)
**Mechanismus**: Hohe Saturation → mehr "Kapazität" → dichtere Hotspots möglich

**Limitierung**: Niedrige Saturation (100-150) → schnelle Sättigung → "flache" Hotspots

## Dichte × Trail Saturation: Sättigungsdynamik

**Kritische Interaktion**:

```yaml
# Schnelle Sättigung, "flache" Hotspots
deposit: 30 + agentCount: 8000 + trailSaturation: 150
  - Sehr hohe Deposit-Rate
  - Niedrige Kapazität
  - Ergebnis: Hotspots erreichen Limit in ~2 Sekunden
  - Peak Intensity: ~150 (gecappt)
  - "Plateaus" statt "Spitzen"

# Volle Akkumulation, "Superclusters"
deposit: 30 + agentCount: 6000 + trailSaturation: 255
  - Hohe Deposit-Rate
  - Hohe Kapazität
  - Ergebnis: Hotspots akkumulieren bis ~255
  - Peak Intensity: ~255
  - Extreme Kontraste
```

Siehe [[../parameters/trail-saturation.md#saturation--deposit-capping]]

## Dichte × [[cluster-formation|Clusterbildung]]

**Stark korreliert**, aber unterschiedlich:

- **Clusterbildung**: Tendenz zur **räumlichen Gruppierung** (geometrisch)
- **Dichte**: **Intensität** innerhalb Gruppen (quantitativ)

**Mögliche Kombinationen**:
- Viele schwache Cluster (hohe Clusterbildung, niedrige Dichte)
- Wenige intensive Cluster (moderate Clusterbildung, hohe Dichte)
- Viele intensive Cluster (hohe Clusterbildung, hohe Dichte)

## Typen von Dichte

### Typ 1: Extreme Dichte ("Superclusters")
**Parameter**:
```yaml
deposit: 28-30
agentCount: 6000-8000
trailSaturation: 240-255
decayRate: 0.97-0.99
attractionStrength: 1.7-2.0
```

**Charakteristik**: Sehr helle Hotspots, starke Kontraste, schnelle Sättigung

### Typ 2: Moderate Dichte (balanciert)
**Parameter**:
```yaml
deposit: 15-20
agentCount: 3000-4000
trailSaturation: 180-220
decayRate: 0.94-0.97
```

**Charakteristik**: Erkennbare Hotspots, moderate Kontraste

### Typ 3: Niedrige Dichte (sparse)
**Parameter**:
```yaml
deposit: 8-12
agentCount: 1000-2000
trailSaturation: 120-160
fadeStrength: 0.15-0.25
```

**Charakteristik**: Subtile Trails, niedrige Kontraste, diffuse Hotspots

## Design-Rezept: Maximale Dichte

```yaml
Ziel: Extreme Hotspot-Intensität

deposit: 28-30               # +++ (schnelle Akkumulation)
agentCount: 6000-8000        # +++ (viele Deposits)
trailSaturation: 240-255     # +++ (hohe Kapazität)
decayRate: 0.97-0.99         # ++ (erhält Dichte über Zeit)
attractionStrength: 1.7-2.0  # ++ (Konvergenz auf Hotspots)
fadeStrength: 0.0-0.05       # -- (minimal Löschen)

Begründung:
  Hoher Deposit + viele Agents + hohe Kapazität
  → Schnelle, intensive Akkumulation
  → Extreme Dichte-Hotspots mit maximalen Kontrasten
```

## Theoretische Bedeutung

Dichte demonstriert:
1. **Akkumulative Dynamik**: Ergebnis von Deposit × Agent Count × Zeit
2. **Selbstlimitierung**: Trail Saturation als Kapazitätsgrenze
3. **Konzentrations-Gradient**: Ungleichverteilung als emergentes Phänomen

## Biologische Analogien

- **Biofilm-Dichte**: Bakterielle Akkumulation
- **Nest-Dichte**: Termiten-/Ameisen-Pheromon-Konzentration
- **Populationsdichte**: Konzentration von Organismen in Habitats
- **Neurotransmitter-Konzentration**: Synaptische Dichte

## Performance-Implikationen

### Rendering-Cost

Hohe Dichte erhöht **Fill-Rate** (GPU):

```javascript
// GPU muss mehr intensive Pixel rendern
// Höhere Dichte → mehr Pixel at maximum brightness
// → Höhere Fill-Rate-Last

// Bei extremer Dichte (viele 255-Werte):
// → Blend-Operationen teurer
// → Additive Blending (häufigste Wahl) am kostspieligsten
```

**Optimierung**: Bei sehr hoher Dichte (>80% Saturation), erwägen:
- Agent Count reduzieren
- Deposit reduzieren
- Saturation limitieren

## Offene Fragen

1. **Optimale Dichte**: Gibt es eine optimale Dichte für best Wahrnehmbarkeit?
2. **Dichte-Heterogenität**: Sollte Saturation räumlich variieren ("reiche" vs. "arme" Regionen)?
3. **Dynamic Range**: Wie maximiert man Kontrast bei begrenztem Dichte-Range (0-255)?

## Verwandte Parameter

- [[deposit-amount]] - **Primär-Treiber** von Dichte
- agent-count - **Sekundär-Treiber** von Dichte
- trail-saturation - **Limitiert** maximale Dichte
- [[decay-rate]] - Erhält Dichte über Zeit
- fade-strength - Reduziert Dichte kontinuierlich

## Verwandte Konzepte

- [[../concepts/emergenz.md]] - Dichte als akkumulatives Phänomen
- [[cluster-formation]] - Stark korreliert (Cluster = dichte Regionen)
- [[stability]] - Dichte Hotspots sind oft stabil
- [[trail-saturation]] - Limitiert Dichte
