---
id: concept-resonanz
title: Resonanz in Zeichensystemen
type: concept
category: theoretical-foundation
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [resonance, interaction, multi-species, affective-relations]
related:
  - "[[oekosemiotik]]"
  - "[[parameter-as-oikos]]"
  - "[[attraction-strength]]"
  - "[[cluster-formation]]"
  - "[[separation]]"
sources:
  - "[[Von_Stigmergie_zu_Oekosemiotik]]"
  - "[[Parameter_Oikos_Matrix]]"
---

## Kernthese

**Affektive Beziehungen zwischen Zeichensystemen werden durch [[parameter-as-oikos|Parameter-Oikos]] vermittelt.**

## Verbindung zur Resonanztheorie

### Klassische Resonanztheorie (Rosa, Bohmann)
- Subjekt ↔ Welt-Beziehung, die **nicht instrumentell** ist
- Resonanz als Gegenpol zur Entfremdung

### Ökosemiotische Erweiterung
- Zeichensystem A ↔ Zeichensystem B-Beziehung
- Vermittelt durch **Resonanz-Oikos** (Parameter-Dimension)

## Resonanz-Oikos: Die vierte Parameter-Dimension

Die **Resonanz-Oikos** umfasst Parameter, die affektive Beziehungen zwischen Zeichensystemen strukturieren:

1. **[[attraction-strength|Attraction Strength]]** (0.0 - 2.0)
   - Verstärkung eigener Spuren
   - Selbst-Resonanz

2. **Repulsion Strength** (-1.0 - 1.0)
   - Wirkung fremder Spuren
   - Fremd-Resonanz
   - Positiv = Anziehung, Negativ = Abstoßung

3. **Cross-Species Interaction** (true/false)
   - Inter-systemische Koppelung
   - Toggle für Wahrnehmung anderer Systeme

## Resonanz-Implementation

```javascript
// Nicht nur: "Andere Spezies ist da"
const otherMax = Math.max(...otherTrails);

// Sondern: "Wie resoniert mein System mit dem anderen?"
return selfTrail * attractionStrength +    // Selbst-Resonanz
       otherMax * repulsionStrength;       // Fremd-Resonanz
```

**Zentrale Erkenntnis**: Die Resonanz ist **nicht vordefiniert**, sondern emergiert aus der Interaktion von Zeichensetzung und Parameter-Oikos.

## Emergente Resonanz-Muster

### 1. Clusterbildung (Harmonie)
**Parameter-Konstellation:**
```
attractionStrength: 1.5-2.0   (hoch)
repulsionStrength: -0.2-0.2   (neutral bis leicht positiv)
```

**Emergentes Muster:**
- Homogene Gruppen
- Starke Selbst-Resonanz
- Minimale Fremd-Abstoßung
- **Siehe:** [[cluster-formation]]

### 2. Segregation (Konflikt)
**Parameter-Konstellation:**
```
attractionStrength: 1.5-2.0   (hoch)
repulsionStrength: -0.7--1.0  (stark negativ)
```

**Emergentes Muster:**
- Getrennte Territorien
- Starke Selbst-Resonanz
- Starke Fremd-Abstoßung
- **Siehe:** [[separation]]

### 3. Koexistenz (Balance)
**Parameter-Konstellation:**
```
attractionStrength: 0.8-1.2   (moderat)
repulsionStrength: 0.2-0.5    (leicht positiv)
```

**Emergentes Muster:**
- Durchmischte Koexistenz
- Moderate Selbst-Resonanz
- Leichte Fremd-Anziehung
- Dynamisches Gleichgewicht

### 4. Isolation
**Parameter-Konstellation:**
```
crossSpeciesInteraction: false
```

**Emergentes Muster:**
- Keine Wahrnehmung anderer Systeme
- Zufällige Verteilung
- Nur Selbst-Resonanz aktiv

## Harmonie-Schwelle

**Kritischer Umschlagpunkt** bei `repulsionStrength ≈ -0.5`:

```
repulsionStrength > -0.5 → Harmonie/Koexistenz
repulsionStrength < -0.5 → Konflikt/Segregation
```

**Experimentelle Validierung:** Systematische Variation der Repulsion bei konstantem Attraction zeigt **qualitative Veränderung** der emergenten Muster am Schwellenwert.

Siehe Experiment: [[../experiments/experiment-resonance-threshold.md]]

## Parameter-Effekte auf emergente Eigenschaften

Aus der [[../meta/map-parameter-effects.md|Parameter-Oikos-Matrix]]:

| Parameter | Cluster | Separation | Stabilität | Chaos |
|---|---|---|---|---|
| **Attraction Strength** | +++ | --- | + | + |
| **Repulsion Strength** | --- | +++ | - | ++ |
| **Cross-Species Interaction** | ~ | ++ | - | + |

**Beobachtung**: Attraction und Repulsion sind **anti-korreliert** bezüglich Clusterbildung vs. Separation.

## Multi-Spezies-Interaktion

Im **3-Spezies-System** (rot, grün, blau):

### Symmetrische Resonanz
Alle Spezies haben gleiche Attraction/Repulsion-Parameter
→ Gleichmäßige Verteilung der Muster

### Asymmetrische Resonanz
Verschiedene Spezies haben verschiedene Parameter
→ Hierarchien, Dominanz-Muster, Nischen-Bildung

**Zukünftige Erweiterung:** Species-specific Interaction Matrix (3×3)
- Rot → Grün: -0.8 (Abstoßung)
- Rot → Blau: 0.5 (Anziehung)
- Grün → Blau: 0.0 (Neutral)

Siehe [[../development/ARCHITECTURE.md#multi-species-system]] für Implementation.

## Theoretische Implikationen

### 1. Resonanz als emergentes Phänomen
Resonanz ist **nicht programmiert**, sondern **emergiert** aus:
- Zeichensetzung der Agenten
- Parameter-Oikos-Struktur
- Akkumulierten Interaktionsgeschichten

### 2. Affektive Geometrie
Die **räumliche Anordnung** der Spezies (Cluster vs. Separation) spiegelt die **affektive Struktur** ihrer Resonanz-Beziehungen wider.

### 3. Nicht-instrumentelle Koordination
Resonanz ist **nicht zielgerichtet** – Agenten "planen" nicht, sich zu clustern oder zu segregieren. Die Muster emergieren aus der **Resonanz mit Zeichen**.

## Anwendungen

### Biologische Systeme
- Ameisen-Kolonien verschiedener Arten
- Pflanzliche VOC-Signalgebung (Inter-Spezies)
- Mikrobiom-Interaktionen

### Soziale Systeme
- Community-Bildung in Online-Foren
- Meinungs-Clustering in sozialen Netzwerken
- Segregation in urbanen Räumen

### Künstliche Systeme
- Multi-Agent-Robotik
- Swarm Intelligence mit heterogenen Agenten
- Distributed Sensor Networks

## Literatur

- Rosa, H. (2016). *Resonanz: Eine Soziologie der Weltbeziehung*. Suhrkamp.
- Bohmann, U. (2019). *Demokratie als Erfahrung*. Springer.
- DeLanda, M. (2006). *A New Philosophy of Society: Assemblage Theory*. Continuum.

## Verwandte Konzepte

- [[oekosemiotik]] - Übergeordneter Rahmen
- [[parameter-as-oikos]] - Resonanz als Parameter-Dimension
- [[attraction-strength]] - Zentraler Resonanz-Parameter
- [[cluster-formation]] - Emergentes Resonanz-Muster
- [[separation]] - Emergentes Resonanz-Muster
