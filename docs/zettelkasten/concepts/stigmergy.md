---
id: concept-stigmergy
title: Stigmergie
type: concept
category: theoretical-foundation
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [stigmergy, coordination, biosemiotics, theory]
related:
  - "[[oekosemiotik]]"
  - "[[parameter-as-oikos]]"
sources:
  - "[[Von_Stigmergie_zu_Oekosemiotik]]"
---

## Definition

**Stigmergie** (von griechisch *stigma* = "Zeichen, Markierung" + *ergon* = "Werk, Arbeit") bezeichnet **Koordination durch Zeichen bzw. Spuren in der Umwelt**.

Geprägt 1959 von Pierre-Paul Grassé zur Beschreibung des Termitenverhaltens beim Nestbau.

## Kern-Mechanismus

```
Individuum → Spur in Umwelt → Beeinflusst andere Individuen
          ↑___________________________________|
          (Positive Feedback Loop)
```

**Zentrale Idee**: Koordination erfolgt **ohne direkte Kommunikation**, nur durch Umwelt-Modifikation.

## Biologisches Beispiel

**Termiten beim Nestbau:**
- Einzelne Termite hinterlässt Lehmpille
- Verstärkt Wahrscheinlichkeit, dass andere dort weiterbauen
- Koordination durch **Stimulation durch Spuren** (*stigmergy*)

## Historische Phasen

### Phase 1: Biologische Entdeckung (1959-1980)
- **Pierre-Paul Grassé (1959)**: Termiten und Nestbau
- Beobachtung: Umwelt-Modifikation als Koordinationsmechanismus

### Phase 2: Informatische Formalisierung (1980-2000)
- **Jean-Louis Deneubourg (1990er)**: Mathematische Modelle (Differentialgleichungen)
- **Marco Dorigo (1992)**: Ant Colony Optimization (ACO) für kombinatorische Optimierung
- **Reduktion**: Stigmergie als Optimierungstechnik

### Phase 3: Sozialwissenschaftliche Erweiterung (2000-heute)
- **Eric Bonabeau et al. (1999)**: "Swarm Intelligence"
- Anwendung auf Wikipedia, Open-Source-Entwicklung
- **H. Van Dyke Parunak (2006)**: Digital Stigmergy (E-Mail, Foren)

## Grenzen der klassischen Stigmergie

### 1. Umwelt-Passivität
**Problem**: Umwelt wird als passiver Container konzipiert
- Pheromone werden "gespeichert"
- Keine Theorie über **wie Parameter die emergente Ordnung ko-konstituieren**

**Beispiel**:
Warum entsteht mit schneller Verdunstung EIN Hauptpfad, aber mit langsamer Verdunstung ein NETZWERK von Pfaden?

→ Die **Verdunstungsrate** ist nicht nur "Parameter", sondern **ko-konstituiert die Art der emergenten Ordnung**

### 2. Zeichen-Reduktion
**Problem**: Zeichen wird auf "Information" reduziert
- Pheromon = "hier war jemand"
- Keine Theorie über **wie Zeichen die Handlungsparameter anderer verändern**

### 3. Parameter-Blindheit
**Problem**: Parameter werden als "Einstellungen" behandelt, nicht als ontologische Kategorien

```python
evaporation_rate = 0.1  # "Einstellung"
pheromone_deposit = 1.0  # "Einstellung"
```

**Fehlende Erkenntnis**: Diese "Einstellungen" sind **strukturierende Kräfte**, die den gesamten Möglichkeitsraum der Emergenz definieren.

## Übergang zur Ökosemiotik

Die klassische Stigmergie-Theorie behandelt **Umwelt als neutralen Speicher**.

Die [[oekosemiotik|ökosemiotische Wende]] erkennt: **Parameter-Oikos sind aktive Ko-Konstituenten emergenter Ordnung, keine passiven "Einstellungen".**

## Anwendungen

- **Biologie**: Ameisen, Termiten, Slime Molds
- **Informatik**: Ant Colony Optimization, Schwarmroboter
- **Sozial**: Wikipedia, GitHub, Open-Source-Koordination

## Literatur

- Grassé, P.-P. (1959). "La reconstruction du nid." *Insectes Sociaux*, 6, 41-80.
- Theraulaz, G., & Bonabeau, E. (1999). "A brief history of stigmergy." *Artificial Life*, 5(2), 97-116.
- Dorigo, M., & Stützle, T. (2004). *Ant Colony Optimization*. MIT Press.
- Heylighen, F. (2016). "Stigmergy as a universal coordination mechanism." *Cognitive Systems Research*, 38, 4-13.

## Verwandte Konzepte

- [[oekosemiotik]] - Theoretische Weiterentwicklung
- [[parameter-as-oikos]] - Umwelt als aktiver Ko-Konstituent
- [[emergenz]] - Selbstorganisation in stigmergischen Systemen
