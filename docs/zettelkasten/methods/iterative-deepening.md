---
id: method-iterative-deepening
title: Iterative Vertiefung
type: method
category: experimental-methodology
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [method, experiment, iteration, refinement, exploration]
related:
  - "[[systematic-variation]]"
  - "[[theory-guided-hypotheses]]"
  - "[[../experiments/boundary-exploration.md]]"
sources:
  - "[[../../experiments/Experimentelle_Sektion_Index.md]]"
---

## Definition

**Iterative Vertiefung** ist die Methode, Parameter-Räume in **mehreren Runden** mit **zunehmender Präzision** zu explorieren:

1. **Erste Runde**: Grobe Variation (gesamte Range abdecken)
2. **Zweite Runde**: Feine Variation (interessante Bereiche vertiefen)
3. **Dritte Runde**: Grenzfall-Exploration (Extreme testen)

## Prinzip

```yaml
Strategie: Von grob zu fein

Runde 1 (Exploration):
  Ziel: "Wo liegen interessante Bereiche?"
  Range: Gesamte sinnvolle Parameter-Range
  Step-Size: Groß (z.B. 0.05)
  Anzahl Runs: 5-7

Runde 2 (Vertiefung):
  Ziel: "Was passiert genau in diesem Bereich?"
  Range: Nur interessanter Teilbereich
  Step-Size: Klein (z.B. 0.01)
  Anzahl Runs: 8-12

Runde 3 (Grenzfall):
  Ziel: "Was ist physikalisch/konzeptuell möglich?"
  Range: Extreme (sehr niedrig, sehr hoch)
  Step-Size: Variabel
  Anzahl Runs: 3-5
```

## Theoretischer Hintergrund

### Effizienz vs. Präzision Trade-off

**Problem**: Vollständige hochauflösende Exploration ist ineffizient

```yaml
# Hypothetisch: Decay von 0.85 - 0.999, Step 0.001
Anzahl Runs: (0.999 - 0.85) / 0.001 = 149 Runs
  → Zu aufwendig für erste Exploration!

# Iterative Vertiefung: Gesamt ~20 Runs
Runde 1: [0.85, 0.88, 0.91, 0.94, 0.97, 0.99] = 6 Runs
Runde 2: [0.92, 0.93, 0.94, 0.95, 0.96] = 5 Runs (interessanter Bereich bei 0.92-0.96)
Runde 3: [0.85, 0.999, 0.9999] = 3 Runs (Grenzfälle)

Total: 14 Runs (10× effizienter!)
```

### Informations-Gewinn pro Iteration

Jede Runde liefert **qualitativ andere Erkenntnisse**:

| Runde | Erkenntnistyp | Beispiel |
|---|---|---|
| 1. Grob | "Wo liegen Schwellenwerte?" | "Interessant bei ~0.94" |
| 2. Fein | "Was ist der exakte Schwellenwert?" | "Kritischer Punkt bei 0.935" |
| 3. Grenzfall | "Was ist theoretisch maximal möglich?" | "Bei 0.9999: Quasi-statische Muster" |

## Drei Runden im Detail

### Runde 1: Explorative Grobvariation

**Ziel**: Überblick gewinnen, interessante Bereiche identifizieren

```yaml
Decay Rate Variation (Runde 1):

Range: 0.85 - 0.99 (gesamte sinnvolle Range)
Values: [0.85, 0.88, 0.91, 0.94, 0.97, 0.99]
Step: ~0.03

Beobachtungen:
  0.85: Chaotisch, keine Stabilität
  0.88: Sehr instabil, Cluster kollabieren
  0.91: Moderate Stabilität, Oszillationen
  0.94: STABIL, Cluster persistieren  ← INTERESSANT!
  0.97: Sehr stabil, kristallin
  0.99: Fast statisch, "eingefrorene" Muster

Erkenntnis: Qualitativer Sprung zwischen 0.91 und 0.94!
  → Runde 2: Diesen Bereich vertiefen
```

### Runde 2: Feinvariation im interessanten Bereich

**Ziel**: Schwellenwert präzise lokalisieren

```yaml
Decay Rate Variation (Runde 2):

Range: 0.92 - 0.96 (nur interessanter Bereich aus Runde 1)
Values: [0.920, 0.925, 0.930, 0.935, 0.940, 0.945, 0.950, 0.955, 0.960]
Step: 0.005

Beobachtungen:
  0.920: Noch instabil
  0.925: Grenzfall (mal stabil, mal nicht)
  0.930: Grenzfall
  0.935: KRITISCHER PUNKT! Ab hier konsistent stabil  ← PRÄZISE!
  0.940: Stabil
  0.945: Stabil
  0.950: Stabil
  0.955: Sehr stabil
  0.960: Sehr stabil

Erkenntnis: Kritischer Schwellenwert bei ~0.935 (±0.005)
  → Runde 3: Extreme testen
```

### Runde 3: Grenzfall-Exploration

**Ziel**: Theoretische Grenzen und Extreme verstehen

```yaml
Decay Rate Variation (Runde 3):

Range: Extreme (sehr niedrig, sehr hoch)
Values: [0.70, 0.80, 0.85, 0.99, 0.999, 0.9999]

Beobachtungen:
  0.70: System kollabiert sofort (Trails verschwinden zu schnell)
  0.80: Extrem chaotisch
  0.85: Baseline niedrig (aus Runde 1)
  0.99: Baseline hoch (aus Runde 1)
  0.999: Quasi-statisch, minimale Veränderung
  0.9999: Praktisch eingefroren (Trails verschwinden nie)

Erkenntnis: Sinnvoller Bereich ist 0.85 - 0.99
  - Unter 0.85: System zu chaotisch (keine Struktur)
  - Über 0.99: System zu statisch (keine Dynamik)
```

## Identifikation "interessanter Bereiche"

### Indikatoren für interessante Bereiche

#### 1. Qualitative Phasenübergänge

```yaml
Beispiel: Decay-Variation

0.91 → 0.94: Muster ändert sich von "oszillierend" zu "stabil"
  → Qualitativer Sprung!
  → Interessanter Bereich: 0.91 - 0.96
```

#### 2. Nichtlineare Metriken-Änderungen

```yaml
Beispiel: Ridge-Point-Anzahl

Decay 0.91: 450 Ridge Points
Decay 0.94: 1250 Ridge Points  ← Sprung um 178%!
Decay 0.97: 1300 Ridge Points  ← Nur noch +4%

→ Steilster Anstieg bei 0.91-0.94
→ Interessanter Bereich identifiziert
```

#### 3. Überraschungen (Hypothesen-Widerlegung)

```yaml
Hypothese: "Chaos-Interval reduziert Stabilität monoton"

Runde 1 Beobachtung:
  chaosInterval 0: Stabil
  chaosInterval 200: Noch stabiler?! ⚠️ ÜBERRASCHUNG
  chaosInterval 400: Weniger stabil
  chaosInterval 800: Instabil

→ Nichtlinearer Effekt bei 200-400!
→ Runde 2: Diesen Bereich (150-450) fein explorieren
```

### Kriterien für Vertiefung

**Wann Runde 2 durchführen?**

✅ Durchführen wenn:
- Qualitativer Phasenübergang beobachtet
- Nichtlinearer Metriken-Verlauf
- Hypothese widerlegt (Überraschung)
- Schwellenwert grob lokalisiert

❌ NICHT durchführen wenn:
- Linearer, monotoner Trend
- Hypothese klar bestätigt
- Keine erkennbaren Sprünge

## Kombination mit anderen Methoden

### + [[systematic-variation|Systematische Variation]]

Jede Runde der Iterativen Vertiefung **ist** eine systematische Variation:

```yaml
Runde 1: Systematische Variation (grob)
  → Identifiziert interessanten Bereich

Runde 2: Systematische Variation (fein) im Teilbereich
  → Präzisiert Schwellenwert

Runde 3: Systematische Variation (Grenzfälle)
  → Definiert sinnvollen Gesamt-Bereich
```

### + [[theory-guided-hypotheses|Theorie-geleitete Hypothesen]]

Hypothesen leiten Vertiefungs-Entscheidungen:

```yaml
# Nach Runde 1
Hypothese: "Schwellenwert bei ~0.94 wegen Gedächtnis-Dynamik"

# Runde 2 Design
Fokus: 0.92 - 0.96 (um Hypothese präzise zu testen)
  → Falls Schwellenwert NICHT bei ~0.94: Hypothese widerlegt → neue Theorie nötig
```

## Dokumentations-Strategie

### Runden-Nummerierung in Experiment-IDs

```yaml
Experiment: Decay-Rate-Variation

EXP001_R1: Runde 1 (grob, 0.85-0.99)
EXP001_R2: Runde 2 (fein, 0.92-0.96)
EXP001_R3: Runde 3 (Grenzfälle)
```

### Verweis zwischen Runden

```markdown
## Runde 1: Explorative Grobvariation

[Durchführung und Ergebnisse...]

**Erkenntnis**: Interessanter Bereich bei 0.92-0.96

**Folge-Experiment**: [[EXP001_R2]] - Feinvariation in diesem Bereich

---

## Runde 2: Feinvariation (Folge von [[EXP001_R1]])

[Durchführung und Ergebnisse...]
```

## Grenzen der Methode

### 1. "Lokales Minimum"-Problem

**Problem**: Vertiefung kann interessante Bereiche **außerhalb** überspringen

```yaml
Runde 1: [0.85, 0.90, 0.95, 0.99]
  → Interessant bei 0.95

Runde 2: [0.93, 0.94, 0.95, 0.96, 0.97]
  → Fokus auf 0.95

ABER: Vielleicht gibt es auch interessanten Bereich bei 0.88!
  → Durch frühen Fokus auf 0.95 übersehen
```

**Lösung**: Runde 1 muss ausreichend **breit** sein (5-7 Werte über gesamte Range)

### 2. Ressourcen-Intensität

**Problem**: Auch iterative Vertiefung kann viele Runs erfordern

```yaml
Runde 1: 6 Runs
Runde 2: 10 Runs
Runde 3: 5 Runs
Total: 21 Runs pro Parameter

Bei 15 Parametern: 315 Runs!
```

**Lösung**: Priorisierung (siehe [[../meta/map-parameter-effects.md]] für wichtigste Parameter)

## Best Practices

### 1. Runde 1 ausreichend breit

**Faustregel**: 5-7 Werte über **gesamte sinnvolle Range**

```yaml
# ❌ FALSCH (zu eng)
Runde 1: [0.90, 0.92, 0.94] (nur Teil der Range)

# ✅ RICHTIG (gesamte Range)
Runde 1: [0.85, 0.88, 0.91, 0.94, 0.97, 0.99]
```

### 2. Runde 2 ausreichend fein

**Faustregel**: Step-Size **10× kleiner** als Runde 1

```yaml
Runde 1: Step ~0.03 → Runde 2: Step ~0.003-0.005
```

### 3. Runde 3 selektiv

**Nicht immer notwendig!** Grenzfall-Exploration nur wenn:
- Theoretische Grenzen unklar
- Extreme für Theorie-Entwicklung relevant
- Validierung des "sinnvollen Bereichs" gewünscht

### 4. Dokumentation der Rationale

```markdown
## Warum Runde 2?

Runde 1 zeigte qualitativen Sprung bei 0.91 → 0.94.
Wir vermuten kritischen Schwellenwert in diesem Bereich.
Runde 2 soll diesen Schwellenwert präzise lokalisieren (±0.01).
```

## Verwandte Methoden

- [[systematic-variation]] - Basis-Methode für jede Runde
- [[theory-guided-hypotheses]] - Leitet Vertiefungs-Entscheidungen
- [[../experiments/boundary-exploration.md]] - Runde 3 entspricht oft Grenzfall-Exploration

## Verwandte Konzepte

- [[../concepts/emergenz.md]] - Schwellenwerte sind emergente Phänomene
- [[../meta/map-parameter-effects.md]] - Aggregiert Erkenntnisse aus allen Runden
