---
id: method-theory-guided-hypotheses
title: Theorie-geleitete Hypothesen
type: method
category: experimental-methodology
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [method, experiment, hypothesis, theory, prediction]
related:
  - "[[../concepts/oekosemiotik.md|Ökosemiotik]]"
  - "[[../concepts/parameter-as-oikos.md|Parameter-as-Oikos]]"
  - "[[systematic-variation]]"
  - "[[../meta/map-parameter-effects.md]]"
sources:
  - "[[../../experiments/Experimentelle_Sektion_Index.md]]"
  - "[[../../research/Von_Stigmergie_zu_Oekosemiotik.md]]"
---

## Definition

**Theorie-geleitete Hypothesen** ist die Methode, bei der **theoretische Erwartungen** vor der experimentellen Durchführung formuliert werden, um:

1. **Vorhersagen** zu generieren
2. **Überraschungen** zu identifizieren (Abweichungen von Erwartung)
3. **Theoretische Entwicklung** zu ermöglichen (Theorie → Experiment → neue Theorie)

## Prinzip

```yaml
Workflow:

1. Theorie-Analyse
   - "Was sagt die Ökosemiotik über Parameter X?"
   - "Welcher Oikos-Dimension gehört X an?"
   - "Welche emergenten Eigenschaften werden beeinflusst?"

2. Hypothesen-Formulierung
   - "Wenn X erhöht wird, dann..."
   - "Schwellenwert bei X ≈ Y erwartet wegen..."
   - "X und Y wirken synergistisch/antagonistisch weil..."

3. Experimentelle Durchführung
   - Systematische Variation
   - Beobachtung & Dokumentation

4. Validierung
   - Hypothese bestätigt? Ja/Teilweise/Nein
   - Falls NEIN → Warum? → Neue theoretische Fragen

5. Theoretische Integration
   - Ergebnisse zurück in Theorie einarbeiten
   - Parameter-Oikos-Matrix aktualisieren
   - Neue Hypothesen für Folge-Experimente
```

## Theoretischer Hintergrund

### Hypothetico-Deduktive Methode

Theorie-geleitete Hypothesen folgen dem klassischen **hypothetico-deduktiven Modell** (Popper):

1. **Theorie** (allgemeine Aussage)
   - "Hoher Decay erhöht Stabilität"

2. **Deduktion** (spezifische Vorhersage)
   - "Wenn Decay von 0.85 auf 0.99 erhöht wird, sollten Muster persistenter werden"

3. **Test** (Experiment)
   - Systematische Decay-Variation

4. **Falsifikation/Bestätigung**
   - Hypothese bestätigt → Theorie gestützt
   - Hypothese widerlegt → Theorie anpassen

### Ökosemiotische Theorie als Hypothesen-Quelle

Die **Parameter-as-Oikos-Theorie** (siehe [[../concepts/parameter-as-oikos.md]]) liefert strukturierte Erwartungen:

```yaml
Parameter: Decay Rate
Oikos-Dimension: Physikalische Oikos (Gedächtnis-Umwelt)
Theoretische Interpretation: "Temporaler Horizont stigmergischer Spuren"

Erwartete Effekte:
  - Stabilität: +++  # "Mehr Gedächtnis → persistentere Strukturen"
  - Clusterbildung: +++  # "Spuren bleiben länger → Agents konvergieren"
  - Chaos: ---  # "Gedächtnis reduziert Unvorhersagbarkeit"

Hypothesen:
  H1: "Decay > 0.94 → stabile Cluster"
  H2: "Decay < 0.90 → chaotische Muster"
  H3: "Schwellenwert bei ~0.92-0.94"
```

## Arten von Hypothesen

### 1. Richtungs-Hypothesen (Directional)

**Form**: "Wenn X steigt, dann steigt/sinkt Y"

```yaml
Beispiel:
  "Je höher attractionStrength, desto mehr Clusterbildung"

Validierung:
  - Einfach (monotoner Trend)
  - Binär: Bestätigt/Widerlegt
```

### 2. Schwellenwert-Hypothesen (Threshold)

**Form**: "Ab Wert X tritt qualitative Änderung ein"

```yaml
Beispiel:
  "Ab repulsionStrength ≈ -0.5 kippt Harmonie in Segregation"

Validierung:
  - Erfordert Messung des kritischen Werts
  - Präzision-abhängig (±0.1?)
```

### 3. Interaktions-Hypothesen (Synergy/Antagonism)

**Form**: "X und Y wirken zusammen/gegeneinander"

```yaml
Beispiel:
  "Decay (temporal) und Diffusion (spatial) haben Trade-off:
   Hoher Decay + hohe Diffusion → Konflikt → moderate Stabilität"

Validierung:
  - Komplex (erfordert Kombinations-Experimente)
  - Nichtlineare Effekte möglich
```

### 4. Null-Hypothesen (No Effect)

**Form**: "X hat keinen Einfluss auf Y"

```yaml
Beispiel:
  "chaosInterval hat keinen Effekt bei chaosStrength = 0"

Validierung:
  - Schwer zu bestätigen (Abwesenheit von Beweis ≠ Beweis von Abwesenheit)
  - Nützlich für "Ist dieser Parameter überhaupt relevant?"
```

## Hypothesen-Formulierung: Leitfaden

### Schritt 1: Theorie konsultieren

Quellen:
- [[../meta/map-parameter-effects.md|Parameter-Oikos-Matrix]]
- [[../concepts/parameter-as-oikos.md|Parameter-as-Oikos-Theorie]]
- Bisherige Experimente

### Schritt 2: Spezifische Vorhersage formulieren

**Template**:
```markdown
## Hypothese

**Erwartung**: [Spezifische Vorhersage]

**Begründung**: [Warum erwarten wir das?]
- Theoretischer Grund 1
- Theoretischer Grund 2

**Messbare Vorhersage**:
- Metrik X sollte Wert Y erreichen
- Muster-Typ Z sollte emergieren
```

**Beispiel**:
```markdown
## Hypothese: Decay Rate erhöht Stabilität

**Erwartung**: Bei Decay > 0.95 sollten Muster für >500 Steps stabil bleiben

**Begründung**:
- Hoher Decay → Spuren persistieren länger
- Persistente Spuren → Agents folgen denselben Pfaden
- Konsistente Pfade → stabile Cluster

**Messbare Vorhersage**:
- Ridge-Point-Anzahl sollte nach 200 Steps konstant bleiben (±10%)
- Visuelle Ähnlichkeit zwischen Frame 300 und Frame 500 > 90%
```

### Schritt 3: Alternative Erklärungen antizipieren

```markdown
## Alternative Erklärungen

**Falls Hypothese widerlegt**:
1. Interaktionseffekt mit anderem Parameter (z.B. niedrige Diffusion maskiert Decay-Effekt)
2. Schwellenwert anders als erwartet
3. Nichtlineare Dynamik (Tipping Point)
```

## Umgang mit Überraschungen

### Überraschung = Wertvolle Erkenntnis

**Wichtigstes Prinzip**: Abweichungen von Erwartungen sind **genauso wertvoll** (oder wertvoller!) als Bestätigungen

```yaml
⚠️ ÜBERRASCHUNG:

Erwartung: "Hoher Chaos-Interval (500-800) sollte Stabilität reduzieren"

Beobachtung: "Moderater Chaos-Interval (250-350) ERHÖHT Makro-Stabilität!"

Erklärung: "Chaos-Injection bricht Mikro-Loops → verhindert lokale Instabilitäten"

Neue Theorie: "Chaos-Injection-Paradox" (siehe [[../properties/stability.md#chaos-injection-paradox]])
```

### Dokumentations-Template für Überraschungen

```markdown
⚠️ **ÜBERRASCHUNG**: [Kurzbeschreibung]

**Erwartung**: [Was wir erwartet hatten]
**Beobachtung**: [Was tatsächlich passiert ist]

**Mögliche Erklärungen**:
1. [Erklärung 1]
2. [Erklärung 2]
3. [Erklärung 3]

**Theoretische Implikationen**:
- [Was bedeutet das für die Theorie?]

**Folge-Experimente**:
- [ ] [[Experiment_X]]: [Beschreibung]
- [ ] [[Experiment_Y]]: [Beschreibung]
```

## Integration in experimentellen Workflow

### Template-Integration

Das [[../../experiments/Template_Parameter_Experiment.md|Template-Parameter-Experiment]] integriert Theorie-geleitete Hypothesen:

```markdown
## 1. Forschungsfrage

**Zentrale Frage**: [Was genau soll untersucht werden?]

**Theoretischer Hintergrund**:
[Warum ist diese Frage relevant für Ökosemiotik?]

**Hypothese**:
[Was erwarten wir zu beobachten?]

---

## 5. Analyse & Interpretation

### Übereinstimmung mit Hypothese

**Hypothese bestätigt?**: [Ja / Teilweise / Nein]

**Begründung**: [Warum wurde Hypothese bestätigt/widerlegt?]
```

### Iterativer Zyklus

```yaml
Iteration 1:
  1. Theorie-Analyse: Parameter-Oikos-Matrix konsultieren
  2. Hypothese: "Decay > 0.95 → Stabilität"
  3. Experiment: Decay-Variation
  4. Ergebnis: Bestätigt (Schwellenwert bei ~0.94)
  5. Matrix-Update: Decay → Stabilität: +++ (validiert)

Iteration 2:
  1. Neue Frage: "Warum genau 0.94? Was ist besonders an diesem Wert?"
  2. Hypothese: "0.94 ist kritischer Punkt wo Gedächtnis-Decay-Balance kippt"
  3. Experiment: Fein-Variation 0.92-0.96
  4. Ergebnis: Scharfer Phasenübergang bei 0.935
  5. Neue Theorie: "Kritischer Decay-Schwellenwert" (neue Notiz)

Iteration 3:
  1. Neue Frage: "Gilt 0.94-Schwellenwert für alle Baselines?"
  2. Hypothese: "Schwellenwert verschiebt sich bei hoher Diffusion"
  3. Experiment: Decay × Diffusion Grid
  4. ... (und so weiter)
```

## Best Practices

### 1. Explizite Hypothesen IMMER formulieren

**Auch bei explorativen Experimenten**:
```yaml
# ❌ FALSCH
"Mal schauen was passiert wenn ich Decay variiere"

# ✅ RICHTIG
"Ich erwarte dass Decay Stabilität erhöht (Theorie: Gedächtnis-Effekt).
 Falls das NICHT passiert, wäre das eine wichtige Überraschung."
```

### 2. Mehrere Hypothesen-Stufen

```yaml
# Haupt-Hypothese (grob)
H1: "Decay erhöht Stabilität"

# Sub-Hypothesen (präzise)
H1a: "Decay > 0.95 → stabil"
H1b: "Decay < 0.90 → instabil"
H1c: "Schwellenwert bei ~0.92-0.94"

# Mechanismus-Hypothese
H1d: "Mechanismus: Längere Spuren → konsistentere Agent-Bewegungen"
```

### 3. Falsifizierbarkeit sicherstellen

**Popper-Kriterium**: Hypothese muss **widerlegbar** sein

```yaml
# ❌ NICHT falsifizierbar
"Decay beeinflusst irgendwie das System"

# ✅ Falsifizierbar
"Decay > 0.95 erhöht Ridge-Point-Persistenz um >50%"
  → Messbar: Ja/Nein
```

### 4. Null-Ergebnisse dokumentieren

**Auch "keine Änderung" ist ein Ergebnis!**

```yaml
Hypothese: "sensorAngle beeinflusst Separation"

Ergebnis: KEIN signifikanter Effekt beobachtet

Interpretation:
  - sensorAngle ist NICHT primärer Treiber von Separation
  - Sensor-Distance dominiert (wie Matrix vorschlägt)
  - Hypothese widerlegt → Matrix bestätigt
```

## Verwandte Methoden

- [[systematic-variation]] - Testet Hypothesen durch isolierte Parameter-Variation
- [[iterative-deepening]] - Verwendet Hypothesen-Validierung für Vertiefung
- [[qualitative-quantitative-capture]] - Liefert Daten für Hypothesen-Test

## Verwandte Konzepte

- [[../concepts/parameter-as-oikos.md]] - Zentrale theoretische Quelle für Hypothesen
- [[../meta/map-parameter-effects.md]] - Aggregiert validierte/widerlegte Hypothesen
- [[../concepts/emergenz.md]] - Emergenz-Theorie liefert Schwellenwert-Hypothesen
