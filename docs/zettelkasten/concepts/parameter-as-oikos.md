---
id: concept-parameter-as-oikos
title: Parameter als Oikos
type: concept
category: theoretical-foundation
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [parameter-oikos, theory, emergence, environment]
related:
  - "[[oekosemiotik]]"
  - "[[emergenz]]"
  - "[[stigmergy]]"
sources:
  - "[[Von_Stigmergie_zu_Oekosemiotik]]"
  - "[[Parameter_Oikos_Matrix]]"
---

## Kernidee

**Parameter sind nicht bloße "Einstellungen", sondern aktive ko-konstituierende Umwelten (Oikos), die den Möglichkeitsraum emergenter Ordnung strukturieren.**

## Von "Einstellungen" zu "Strukturierenden Kräften"

### Klassische Sicht (abgelehnt)
```python
evaporation_rate = 0.1  # "Einstellung"
pheromone_deposit = 1.0  # "Einstellung"
```
→ Technische Perspektive: "Man kann es so oder so einstellen"

### Ökosemiotische Sicht

Parameter-Oikos sind **strukturierende Kräfte**, die den gesamten Möglichkeitsraum der Emergenz definieren.

```
Gleiche Agenten + Gleiche Regeln + Verschiedene Oikos = Völlig verschiedene Muster
```

**Beispiel aus Simulationen:**
- `decayRate=0.99, diffusionFreq=8` → "Lavalampe" (fließende, organische Formen)
- `decayRate=0.94, diffusionFreq=1` → "Nervensystem" (verzweigte, stabile Netzwerke)

Die Muster sind **nicht reduzierbar** auf initiale Bedingungen oder Regeln – sie emergieren **nur in der Interaktion mit Parameter-Oikos**.

## Vier Parameter-Oikos-Dimensionen

### 1. Physikalische Oikos
**Materialität der Spuren**

- [[decay-rate]] - Zeitlicher Horizont des Gedächtnisses
- [[diffusion]] - Räumliche Ausbreitung von Einfluss
- [[fade-strength]] - Beschleunigung des Vergessens
- `trailSaturation` - Kapazitätsgrenzen der Umwelt

**Fördert**: Stabilität, Kristallinität, Persistenz

### 2. Semiotische Oikos
**Wahrnehmungs- und Handlungsradius**

- [[sensor-distance]] - Reichweite der Perzeption
- `sensorAngle` - Sichtfeld-Breite
- [[deposit-amount]] - Zeichensetzungs-Intensität
- `turnSpeed` - Reaktionsfähigkeit auf Zeichen

**Fördert**: Separation, Netzwerk-Bildung, Exploration

### 3. Temporale Oikos
**Dynamik und Bevölkerungsdichte**

- [[agent-speed]] - Geschwindigkeit des Wandels
- `agentCount` - Dichte der Interaktionen
- `chaosInterval` - Periodische Destabilisierung
- `chaosStrength` - Intensität der Störung

**Fördert**: Chaos, Fluidität, Dynamik

### 4. Resonanz-Oikos
**Affektive Beziehungen zwischen Zeichensystemen**

- [[attraction-strength]] - Verstärkung eigener Spuren
- `repulsionStrength` - Wirkung fremder Spuren
- `crossSpeciesInteraction` - Inter-systemische Koppelung

**Fördert**: Clusterbildung vs. Separation

Siehe [[../meta/map-parameter-effects.md]] für vollständige Parameter-Effekt-Matrix.

## Analogie: Ökologische Nische

**Biologische Nische:**
- Temperatur, Feuchtigkeit, pH-Wert → bestimmen welche Arten überleben können

**Parameter-Nische:**
- Decay, Diffusion, Sensor-Distance → bestimmen welche Muster emergieren können

## Zentrale These

**Parameter-Oikos determinieren nicht das emergente Muster, sondern die Möglichkeitsräume der Selbstorganisation.**

## Konkrete Beispiele

### Beispiel 1: Decay-Rate als Gedächtnis-Horizont

```javascript
// Nicht nur: "Spur verschwindet"
newTrailMap[y][x].r = cell.r * decayRate;

// Sondern: "Wie lange bleibt Vergangenheit handlungsleitend?"
// decayRate = 0.99 → Lange Gedächtnis-Horizonte → Stabile Muster
// decayRate = 0.85 → Kurze Gedächtnis-Horizonte → Volatile Muster
```

### Beispiel 2: Attraction/Repulsion als Resonanz-Vermittler

```javascript
// Zeichen ist nicht nur "Information über andere Spezies"
const otherMax = Math.max(...otherTrails);

// Sondern: Verändert Bewegungsparameter durch Resonanz
return selfTrail * attractionStrength +
       otherMax * repulsionStrength;
```

## Parameter-Interdependenz

Parameter wirken **nicht isoliert**, sondern in **komplementären Beziehungen**.

### Cross-Oikos-Effekt: Decay × Diffusion

```
decayRate: 0.99 + diffusionFreq: 8 → "Lavalampe"
  - Stabil genug für Formen (Decay)
  - Fluid genug für Bewegung (Diffusion)
```

**Theoretische Implikation**: Physikalische Oikos-Parameter arbeiten **komplementär**, nicht additiv.

Siehe [[../meta/map-parameter-effects.md#cross-oikos-effects]] für weitere Interdependenzen.

## Experimentelle Validierung

Die Parameter-Oikos-Matrix dokumentiert systematisch die Effekte jedes Parameters auf emergente Eigenschaften.

Siehe:
- [[../meta/map-parameter-effects.md]] - Vollständige Effekt-Matrix
- [[../experiments/Experimentelle_Sektion_Index.md]] - Experimentelle Methodik
- [[Parameter_Oikos_Matrix]] - Original-Dokumentation

## Theoretische Implikationen

### Ontologische Fragen
- Sind Parameter-Oikos **kausal wirksam**? (Sie determinieren emergente Muster)
- Sind sie **emergent**? (Sie entstehen nicht aus Agenten, sondern sind "gegeben")
- Sind sie **relational**? (Sie existieren nur in Beziehung zu Agenten)

**Mögliche Ansätze**:
- Relationaler Realismus (Cassirer, Rovelli)
- Dispositionale Ontologie (Mumford, Anjum)
- Struktureller Realismus (Ladyman, Ross)

## Verwandte Konzepte

- [[oekosemiotik]] - Übergeordneter theoretischer Rahmen
- [[emergenz]] - Was Parameter-Oikos ermöglichen
- [[stigmergy]] - Klassische Theorie ohne Parameter-Fokus
- [[resonanz]] - Spezialfall der Resonanz-Oikos
