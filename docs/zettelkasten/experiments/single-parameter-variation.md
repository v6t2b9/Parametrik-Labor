---
id: experiment-class-single-parameter
title: Einzelparameter-Variation
type: experiment-class
category: experimental-design
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [experiment, single-parameter, isolation, ceteris-paribus]
related:
  - "[[../methods/systematic-variation.md]]"
  - "[[../methods/iterative-deepening.md]]"
  - "[[parameter-combination]]"
sources:
  - "[[../../experiments/Experimentelle_Sektion_Index.md]]"
  - "[[../../experiments/Template_Parameter_Experiment.md]]"
---

## Definition

**Einzelparameter-Variation** ist eine Experimentklasse, bei der **genau ein Parameter** systematisch variiert wird, während alle anderen konstant bleiben, um den **isolierten Effekt** dieses Parameters zu verstehen.

## Ziel

```yaml
Primäres Ziel:
  "Welchen Effekt hat Parameter X auf emergente Eigenschaften?"

Sekundäre Ziele:
  - Schwellenwerte identifizieren
  - Effekt-Stärke quantifizieren
  - Theoretische Hypothesen testen
  - Parameter-Oikos-Matrix befüllen/validieren
```

## Struktur

### Basis-Design

```yaml
1. Parameter auswählen
   - z.B. "Decay Rate"
   - Oikos-Dimension: Physikalisch

2. Variations-Range festlegen
   - Range: 0.85 - 0.99
   - Values: [0.85, 0.88, 0.91, 0.94, 0.97, 0.99]
   - Step: ~0.03

3. Baseline definieren
   - Alle anderen Parameter konstant
   - Oft: Bekannter stabiler Zustand (z.B. RESONANZ-Preset)

4. Durchführung
   - Für jeden Wert: Simulation + Erfassung
   - Identische Bedingungen (Steps, Seed, Visualisierung)

5. Analyse
   - Qualitativ: Muster-Beschreibungen
   - Quantitativ: Metriken-Trends
   - Theorie: Hypothesen-Validierung
```

### Template

Vollständiges Template: [[../../experiments/Template_Parameter_Experiment.md]]

Kern-Sektionen:
1. **Forschungsfrage** + Hypothese
2. **Experimentelles Design** (zu variierender Parameter + Baseline)
3. **Durchführung** (Variations-Tabelle)
4. **Quantitative Ergebnisse** (Metriken-Übersicht, Trends)
5. **Analyse & Interpretation** (Hypothesen-Validierung)
6. **Schlussfolgerungen** (Zentrale Erkenntnisse, Matrix-Update)
7. **Nächste Schritte** (Folge-Experimente, offene Fragen)
8. **Reproduzierbarkeit** (Copy-Paste-Ready Parameter-Sets)

## Anwendungsfälle

### 1. Parameter-Oikos-Matrix befüllen

**Situation**: Neuer Parameter, Effekte unbekannt

```yaml
Beispiel: "turn-speed"

Frage: "Welche emergenten Eigenschaften werden beeinflusst?"

Design:
  - Variiere turnSpeed: [0.1, 0.3, 0.5, 0.7, 0.9]
  - Baseline: RESONANZ-Preset
  - Beobachte: Clusterbildung, Separation, Stabilität, Chaos, ...

Ergebnis:
  - turnSpeed → Chaos: ++ (hoher Turn Speed erhöht Chaos)
  - turnSpeed → Fluidity: +++ (hoher Turn Speed erhöht Fluidität)
  → Matrix-Einträge erstellt
```

### 2. Schwellenwert-Identifikation

**Situation**: Theoretischer Schwellenwert vermutet

```yaml
Beispiel: Decay Rate

Hypothese: "Ab Decay ≈ 0.94 werden Muster stabil"

Design:
  - Runde 1 (grob): [0.85, 0.88, 0.91, 0.94, 0.97, 0.99]
  - Runde 2 (fein): [0.920, 0.925, 0.930, 0.935, 0.940, 0.945]
  → Iterative Deepening (siehe [[../methods/iterative-deepening.md]])

Ergebnis:
  - Kritischer Schwellenwert bei 0.935 identifiziert
  - Unterhalb: instabil, oberhalb: stabil
```

### 3. Effekt-Stärke-Quantifizierung

**Situation**: Theoretische Effekt-Richtung bekannt, Stärke unklar

```yaml
Beispiel: agent-count

Theorie: "Mehr Agents → mehr Clusterbildung" (Richtung klar)

Frage: "Wie stark? Linear? Exponentiell?"

Design:
  - Variiere agentCount: [500, 1000, 2000, 4000, 8000]
  - Metrik: Ridge-Point-Count

Ergebnis:
  - Ridge Points skalieren super-linear (Netzwerk-Effekte)
  - Ridge Points ≈ agentCount^1.4 (Power-Law)
  → Effekt-Stärke quantifiziert
```

## Beispiel-Experimente

### Experiment: Decay Rate Variation

```yaml
ID: [[../../experiments/Experiment_Decay_Rate_Variation.md]]

Parameter: decayRate
Range: 0.85 - 0.99
Values: [0.85, 0.88, 0.91, 0.94, 0.97, 0.99]

Baseline:
  diffusionFreq: 3
  deposit: 15
  attractionStrength: 1.5
  # ... alle anderen

Ergebnisse:
  - Schwellenwert bei ~0.94 (Stabilität)
  - Unterhalb: chaotisch
  - Oberhalb: kristallin

Matrix-Update:
  decayRate → Stabilität: +++
  decayRate → Clusterbildung: +++
  decayRate → Kristallinität: +++
```

### Experiment: Sensor Distance Variation (geplant)

```yaml
ID: [[Experiment_Sensor_Distance_Variation]]

Parameter: sensorDist
Range: 5 - 50
Values: [5, 10, 15, 20, 30, 40, 50]

Hypothese:
  "Sensor Distance > 25 ermöglicht Separation (Fernwahrnehmung)"

Erwartete Ergebnisse:
  - sensorDist < 20: Keine Separation
  - sensorDist > 25: Separation möglich
  - sensorDist > 40: Netzwerk-Bildung
```

## Kombination mit Methoden

### + [[../methods/systematic-variation.md|Systematische Variation]]

Einzelparameter-Variation **ist** systematische Variation:
- Ein Parameter variieren
- Alle anderen konstant (ceteris paribus)
- Reproduzierbare Baseline

### + [[../methods/iterative-deepening.md|Iterative Vertiefung]]

Einzelparameter-Variation oft in **mehreren Runden**:
- Runde 1: Grobe Exploration (6 Werte)
- Runde 2: Feine Vertiefung (10 Werte in interessantem Bereich)
- Runde 3: Grenzfälle (extreme Werte)

### + [[../methods/theory-guided-hypotheses.md|Theorie-geleitete Hypothesen]]

Einzelparameter-Variation testet **spezifische Hypothesen**:
- Parameter-Oikos-Theorie → Hypothese
- Einzelparameter-Variation → Test
- Ergebnis → Theorie-Validierung/Revision

## Vor- und Nachteile

### Vorteile ✅

1. **Kausalität**: Klare Ursache-Wirkungs-Beziehung
   - "X variiert → Y ändert sich → X beeinflusst Y"

2. **Einfachheit**: Leicht zu verstehen und zu kommunizieren
   - "Was macht Decay Rate?" → Ein Experiment

3. **Effiz ienz**: Relativ wenige Runs nötig
   - 5-7 Werte für erste Exploration

4. **Vergleichbarkeit**: Standardisiertes Design
   - Verschiedene Parameter-Variationen haben gleiche Struktur

### Nachteile ❌

1. **Ignoriert Interaktionen**: Parameter wirken oft zusammen
   - Decay × Diffusion Trade-off nicht sichtbar
   - Attraction × Repulsion Synergy nicht erkennbar

2. **Baseline-abhängig**: Effekt kann von Kontext abhängen
   - Decay-Effekt bei niedriger vs. hoher Agent Count unterschiedlich

3. **Linearitäts-Annahme**: Nicht alle Effekte sind linear
   - Kann nichtlineare Interaktionen übersehen

**Lösung**: Ergänzend [[parameter-combination|Parameter-Kombinations-Experimente]]

## Best Practices

### 1. Baseline sorgfältig wählen

```yaml
# ✅ RICHTIG
Baseline: RESONANZ-Preset (empirisch erprobter stabiler Zustand)

# ❌ FALSCH
Baseline: Zufällige Parameter-Kombination (unbekannte Eigenschaften)
```

### 2. Variations-Range vollständig abdecken

```yaml
# ✅ RICHTIG
Range: 0.85 - 0.99 (gesamter sinnvoller Bereich)

# ❌ FALSCH
Range: 0.92 - 0.96 (nur Teilbereich, könnte interessante Extreme übersehen)
```

### 3. Vollständige Parameter-Dokumentation

```yaml
# ✅ RICHTIG
Vollständiges Parameter-Set dokumentiert (siehe Template Sektion 2)

# ❌ FALSCH
"Alle anderen Parameter wie üblich" (nicht reproduzierbar!)
```

### 4. Hypothesen vor Durchführung formulieren

```yaml
# Workflow
1. Hypothese: "Decay > 0.95 → Stabilität"
2. Experiment durchführen
3. Hypothese validieren/widerlegen

# NICHT
1. Experiment durchführen
2. "Mal schauen was passiert" (keine theoretische Leitlinie)
```

## Verwandte Experimentklassen

- [[parameter-combination]] - Erweitert auf 2+ Parameter (Interaktionen)
- [[mode-comparison]] - Vergleicht Modi statt Parameter
- [[boundary-exploration]] - Testet extreme Werte

## Verwandte Methoden

- [[../methods/systematic-variation.md]] - Methodische Basis
- [[../methods/iterative-deepening.md]] - Oft in mehreren Runden
- [[../methods/theory-guided-hypotheses.md]] - Liefert Hypothesen
- [[../methods/qualitative-quantitative-capture.md]] - Erfasst Daten

## Verwandte Konzepte

- [[../concepts/parameter-as-oikos.md]] - Parameter als Umwelten → Einzelparameter-Variation isoliert Oikos-Effekte
- [[../meta/map-parameter-effects.md]] - Aggregiert Erkenntnisse aus Einzelparameter-Variationen
- [[../concepts/emergenz.md]] - Einzelparameter-Variation zeigt emergente Schwellenwerte
