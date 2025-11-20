---
id: experiment-class-mode-comparison
title: Modus-Vergleich
type: experiment-class
category: experimental-design
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [experiment, mode, comparison, myzel, stigmergie, resonanz]
related:
  - "[[single-parameter-variation]]"
  - "[[../concepts/oekosemiotik.md]]"
  - "[[../parameters/cross-species-interaction.md]]"
sources:
  - "[[../../experiments/Experimentelle_Sektion_Index.md]]"
---

## Definition

**Modus-Vergleich** ist eine Experimentklasse, bei der **verschiedene Modi** (MYZEL, STIGMERGIE, RESONANZ) bei **identischen Parametern** verglichen werden, um modusspezifische Dynamiken zu verstehen.

## Die Drei Modi

### MYZEL-Modus

```yaml
Charakteristik:
  - Alle Agents als EINE Spezies (keine Multi-Spezies-Dynamik)
  - Keine Farb-Segregation
  - Fokus auf reine Stigmergie

Parameter-Kontext:
  - crossSpeciesInteraction: irrelevant (nur 1 Spezies)
  - repulsionStrength: keine Wirkung
  - attractionStrength: Selbst-Resonanz der gesamten Population

Anwendung:
  - Baseline für "reine" stigmergische Dynamiken
  - Vergleichsbasis für Multi-Spezies-Modi
```

### STIGMERGIE-Modus

```yaml
Charakteristik:
  - Mehrere Spezies (3 Farben: R, G, B)
  - ABER: crossSpeciesInteraction = FALSE
  - Jede Spezies "lebt in eigener Welt" (Parallelwelten)

Parameter-Kontext:
  - repulsionStrength: keine Wirkung (keine Fremd-Wahrnehmung)
  - attractionStrength: wirkt (Selbst-Resonanz pro Spezies)

Anwendung:
  - Isolation verschiedener stigmergischer Prozesse
  - "Was passiert wenn 3 unabhängige Populationen koexistieren?"
```

### RESONANZ-Modus

```yaml
Charakteristik:
  - Mehrere Spezies (3 Farben: R, G, B)
  - crossSpeciesInteraction = TRUE
  - Inter-Spezies-Wahrnehmung aktiv → Resonanz-Dynamiken

Parameter-Kontext:
  - repulsionStrength: wirkt (Fremd-Abstoßung)
  - attractionStrength: wirkt (Selbst-Anziehung)
  - Komplexe Interaktionen: Attraction × Repulsion

Anwendung:
  - Vollständige ökosemiotische Dynamiken
  - Segregation, Koexistenz, Harmonie-Untersuchung
```

Siehe [[../concepts/oekosemiotik.md]] und [[../parameters/cross-species-interaction.md]].

## Ziel

```yaml
Primäres Ziel:
  "Wie unterscheiden sich emergente Muster zwischen Modi bei gleichen Parametern?"

Sekundäre Ziele:
  - Modusspezifische Effekte identifizieren
  - Welche Parameter sind modusabhängig?
  - Theoretische Unterschiede empirisch validieren
```

## Struktur

### Basis-Design

```yaml
1. Parameter-Set festlegen
   - z.B. Baseline RESONANZ-Preset
   - ALLE Parameter identisch für alle Modi

2. Modi durchführen
   - Run 1: MYZEL-Modus
   - Run 2: STIGMERGIE-Modus
   - Run 3: RESONANZ-Modus

3. Vergleich
   - Qualitativ: Visuelle Unterschiede?
   - Quantitativ: Metriken-Unterschiede?
   - Theoretisch: Erklärung der Unterschiede

4. Analyse
   - Welche emergenten Eigenschaften sind modusabhängig?
   - Welche sind modus-invariant?
```

### Kritische Parameter-Anpassung

**Problem**: Manche Parameter haben **keine Wirkung** in bestimmten Modi

```yaml
# STIGMERGIE-Modus
repulsionStrength: 0.0  # Immer! (Keine Wirkung wegen crossSpeciesInteraction = false)

# MYZEL-Modus
repulsionStrength: irrelevant  # Nur 1 Spezies
attractionStrength: 1.5  # Gesamte Population

# RESONANZ-Modus
repulsionStrength: -0.5  # Aktiv (Inter-Spezies-Resonanz)
attractionStrength: 1.5  # Selbst-Resonanz pro Spezies
```

**Empfehlung**: Dokumentiere welche Parameter in welchem Modus **aktiv** sind

## Anwendungsfälle

### 1. Modus-Einfluss auf Parameter-Effekt

**Frage**: "Ändert sich Decay-Effekt zwischen Modi?"

```yaml
Design:
  - Parameter-Set: decay variiert [0.85, 0.92, 0.99]
  - Für JEDEN Decay-Wert: MYZEL, STIGMERGIE, RESONANZ

Erwartung:
  - Decay-Effekt auf Stabilität: modus-invariant (Physikalische Oikos)
  - Decay-Effekt auf Segregation: nur RESONANZ (braucht Inter-Spezies)

Ergebnis:
  - Validiert welche Effekte modus-abhängig sind
```

### 2. Segregations-Vergleich

**Frage**: "Wie unterscheidet sich Segregation über Modi?"

```yaml
Design:
  - Parameter-Set: repulsionStrength: -0.9 (stark)
  - Modi: MYZEL, STIGMERGIE, RESONANZ

Erwartung:
  MYZEL: Keine Segregation (nur 1 Spezies)
  STIGMERGIE: Keine aktive Segregation (keine Fremd-Wahrnehmung)
    → Räumlich zufällige Verteilung der 3 Spezies
  RESONANZ: Starke Segregation (Repulsion aktiv)
    → Territorien

Ergebnis:
  - Nur RESONANZ zeigt echte Segregation
  → crossSpeciesInteraction ist notwendige Bedingung
```

### 3. Theoretische Validierung

**Frage**: "Stimmt die Theorie dass RESONANZ-Modus qualitativ anders ist?"

```yaml
Theorie (Ökosemiotik):
  - MYZEL: Stigmergie (klassisch)
  - STIGMERGIE: Parallel-Stigmergie (keine Kopplung)
  - RESONANZ: Ökosemiotik (Inter-System-Kopplung)

Test:
  - Gleiche Parameter für alle Modi
  - Vergleich emergenter Muster

Erwartung:
  - MYZEL ≈ STIGMERGIE (wenn agentCount angepasst)
  - RESONANZ ≠ MYZEL/STIGMERGIE (qualitativ unterschiedlich)

Ergebnis:
  - Validiert theoretische Unterscheidung empirisch
```

## Beispiel-Experimente

### Experiment: Myzel vs. Stigmergie vs. Resonanz (geplant)

```yaml
ID: [[Experiment_Myzel_vs_Stigmergie_vs_Resonanz]]

Parameter-Set: Baseline RESONANZ-Preset (identisch für alle Modi)

Modi:
  1. MYZEL (agentCount: 9000, crossSpeciesInteraction: irrelevant)
  2. STIGMERGIE (agentCount: 3000 pro Spezies = 9000 total, crossSpeciesInteraction: false)
  3. RESONANZ (agentCount: 3000 pro Spezies = 9000 total, crossSpeciesInteraction: true, repulsion: -0.5)

Vergleich:
  - Visuelle Unterschiede?
  - Ridge-Point-Anzahl?
  - Segregations-Grad? (nur RESONANZ)

Erwartetes Ergebnis:
  - MYZEL: Homogene Muster
  - STIGMERGIE: 3 unabhängige Muster (räumlich zufällig überlagert)
  - RESONANZ: Territorien (Segregation)
```

### Experiment: Segregation über Modi (geplant)

```yaml
ID: [[Experiment_Segregation_über_Modi]]

Fokus: Segregation (siehe [[../properties/separation.md]])

Parameter-Set:
  - repulsionStrength: -0.9 (sehr stark)
  - sensorDist: 40 (groß, für Fernwahrnehmung)
  - Alle anderen: Baseline

Modi:
  1. MYZEL → Segregation: unmöglich (1 Spezies)
  2. STIGMERGIE → Segregation: nicht aktiv (zufällige Verteilung)
  3. RESONANZ → Segregation: stark (Territorien)

Ergebnis:
  - Dokumentiert dass Segregation RESONANZ-spezifisch ist
  - Validiert crossSpeciesInteraction als notwendige Bedingung
```

## Analyse-Methoden

### Side-by-Side-Vergleich

```markdown
| Aspekt | MYZEL | STIGMERGIE | RESONANZ |
|---|---|---|---|
| Ridge Points | 1250 | 1180 | 980 |
| Segregation | Nein | Nein | Ja |
| Muster-Typ | Homogen | 3× Homogen | Territorien |
| Stabilität | Hoch | Hoch | Moderat |
```

### Qualitative Beschreibung

```markdown
## Visuelle Unterschiede

**MYZEL**: Einheitliche Farbe (z.B. nur Grün), homogene Cluster, keine Segregation.

**STIGMERGIE**: Drei Farben (R, G, B) räumlich zufällig verteilt, jede Farbe bildet eigene Cluster, aber keine aktive Vermeidung → "Patchwork".

**RESONANZ**: Drei Farben (R, G, B) in klar getrennten Territorien, scharfe Grenzen, minimale Überlappung → "Segregation".
```

### Metriken-Differenz

```yaml
# Segregations-Metrik (nur für Multi-Spezies)
segregationIndex = spatialSeparation(R, G, B)

MYZEL: N/A (nur 1 Spezies)
STIGMERGIE: segregationIndex ≈ 0.2 (zufällig)
RESONANZ: segregationIndex ≈ 0.85 (stark segregiert)

→ Quantifiziert Modus-Unterschied
```

## Theoretische Bedeutung

### Validierung der Ökosemiotischen Wende

```yaml
These (Von Stigmergie zu Ökosemiotik):
  "Ökosemiotik (RESONANZ) ist qualitativ anders als Stigmergie (MYZEL/STIGMERGIE)"

Empirischer Test:
  - Modi-Vergleich bei identischen Parametern
  - Unterschiede in emergenten Eigenschaften?

Falls JA:
  → These empirisch gestützt
  → Ökosemiotik ist nicht nur "erweiterte Stigmergie"

Falls NEIN:
  → These zu überdenken
  → Ökosemiotik vielleicht nur quantitativ anders
```

Siehe [[../concepts/oekosemiotik.md#drei-fundamentale-verschiebungen]].

## Best Practices

### 1. Agent-Count-Normalisierung

```yaml
# Problem: MYZEL hat alle Agents in 1 Spezies, RESONANZ hat 3 Spezies

# ✅ RICHTIG
MYZEL: agentCount: 9000 (total)
RESONANZ: agentCount: 3000 pro Spezies (9000 total)
  → Gleiche Gesamt-Agent-Zahl

# ❌ FALSCH
MYZEL: agentCount: 3000
RESONANZ: agentCount: 3000 pro Spezies (9000 total)
  → Unterschiedliche Gesamt-Dichte
```

### 2. Parameter-Aktivität dokumentieren

```markdown
## Parameter-Status pro Modus

| Parameter | MYZEL | STIGMERGIE | RESONANZ |
|---|---|---|---|
| repulsionStrength | Inaktiv | Inaktiv | **Aktiv** |
| attractionStrength | Aktiv | Aktiv | Aktiv |
| crossSpeciesInteraction | N/A | false | true |
```

### 3. Theoretische Erwartung formulieren

```markdown
## Hypothese

**Erwartung für RESONANZ**:
- Territoriale Segregation erwartet (repulsion = -0.9)

**Erwartung für STIGMERGIE**:
- KEINE Segregation (crossSpeciesInteraction = false)
- 3 unabhängige Cluster-Felder, zufällig verteilt

**Erwartung für MYZEL**:
- Homogene Cluster, keine Farb-Trennung (nur 1 Spezies)
```

## Verwandte Experimentklassen

- [[single-parameter-variation]] - Kann für jeden Modus separat durchgeführt werden
- [[parameter-combination]] - Kombination mit Modus-Variation möglich

## Verwandte Konzepte

- [[../concepts/oekosemiotik.md]] - Theoretische Grundlage der Modus-Unterscheidung
- [[../parameters/cross-species-interaction.md]] - Ontologischer Toggle zwischen Modi
- [[../properties/separation.md]] - RESONANZ-spezifische emergente Eigenschaft
