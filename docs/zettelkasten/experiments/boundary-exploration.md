---
id: experiment-class-boundary-exploration
title: Grenzfall-Exploration
type: experiment-class
category: experimental-design
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [experiment, boundary, extreme, limits, edge-cases]
related:
  - "[[single-parameter-variation]]"
  - "[[../methods/iterative-deepening.md]]"
sources:
  - "[[../../experiments/Experimentelle_Sektion_Index.md]]"
---

## Definition

**Grenzfall-Exploration** ist eine Experimentklasse, bei der **extreme Parameter-Werte** getestet werden, um:

1. **Theoretische Grenzen** zu identifizieren ("Ab wann ist System unbrauchbar?")
2. **Unerwartete Phänomene** zu entdecken (oft an Extremen)
3. **Sinnvollen Parameter-Bereich** zu validieren

## Ziel

```yaml
Primäre Ziele:
  - "Was ist physikalisch/konzeptuell maximal möglich?"
  - "Wo liegen die Grenzen der Stabilität/Nutzbarkeit?"
  - "Gibt es überraschende Phänomene an Extremen?"

Sekundäre Ziele:
  - Parameter-Ranges für reguläre Experimente definieren
  - Edge-Cases für Theorie-Entwicklung nutzen
  - Performance-Limits identifizieren
```

## Theoretischer Hintergrund

### Warum Extreme wichtig sind

#### 1. Theoretische Grenzen definieren

```yaml
Frage: "Welcher Decay-Bereich ist sinnvoll?"

Grenzfall-Exploration:
  - Decay: 0.0 → System kollabiert sofort (Trails verschwinden instant)
  - Decay: 0.50 → Extrem chaotisch
  - Decay: 0.70 → Sehr instabil
  - Decay: 0.85 → Sinnvolle untere Grenze
  ...
  - Decay: 0.99 → Sinnvolle obere Grenze
  - Decay: 0.999 → Quasi-statisch
  - Decay: 0.9999 → Praktisch eingefroren
  - Decay: 1.0 → Unphysikalisch (Trails verschwinden nie)

Ergebnis:
  - Sinnvoller Bereich: 0.85 - 0.99
  - Außerhalb: Theoretisch möglich, aber praktisch unbrauchbar
```

#### 2. Phasenübergänge an Extremen

**Oft emergieren qualitativ neue Phänomene an Grenzen**:

```yaml
Beispiel: Agent Count

Grenzfall niedrig:
  agentCount: 10 → Fast keine Trails (zu sparse)
  agentCount: 50 → Minimale Cluster
  agentCount: 100 → Sinnvolle untere Grenze

Grenzfall hoch:
  agentCount: 8000 → Sinnvolle obere Grenze
  agentCount: 15000 → Extreme Dichte, "Superclusters"
  agentCount: 30000 → Performance-Problem, aber: Neue Muster-Klasse!
    → "Kontinuums-Regime" (Agents wie Flüssigkeit)

Überraschung: Bei extrem hoher Agent Count emergiert fluidartige Dynamik!
```

#### 3. Nichtlineare Effekte sichtbar machen

```yaml
Normalbereich (0.85-0.99):
  - Decay steigt → Stabilität steigt (linear)

Extrembereich (0.999-0.9999):
  - Decay 0.999 → "Eingefrorene" Muster
  - Decay 0.9999 → Quasi-permanente Trails
  
  → Nichtlinearer Effekt: Minimale Decay-Änderung → drastischer Unterschied
```

## Struktur

### Basis-Design

```yaml
1. Parameter auswählen
   - z.B. "Decay Rate"

2. Extreme Werte definieren
   - Sehr niedrig: [0.0, 0.3, 0.5, 0.7]
   - Normal (Referenz): [0.85, 0.99]
   - Sehr hoch: [0.999, 0.9999, 0.99999]

3. Durchführung
   - Für jeden Wert: Simulation
   - ERWARTE Systemkollaps oder unbrauchbare Zustände!

4. Grenzen identifizieren
   - Untere Grenze: "Ab wo ist System nutzbar?"
   - Obere Grenze: "Bis wo ist System nutzbar?"
   - Sinnvoller Bereich: Zwischen Grenzen
```

### Kategorien von Grenzen

#### A. Physikalische/Mathematische Grenzen

```yaml
Beispiele:
  - Decay < 0.0: Mathematisch unsinnig (negative Persistenz)
  - Decay > 1.0: Unphysikalisch (Trails wachsen statt zu zerfallen)
  - sensorDist < 0: Unsinnig
  - agentCount < 1: Keine Simulation möglich
```

#### B. Stabilitäts-Grenzen

```yaml
Beispiele:
  - Decay < 0.70: System zu chaotisch (keine persistenten Strukturen)
  - diffusion > 15: Trails verwischen komplett (keine Hotspots)
  - speed > 5.0: Agents zu schnell für Trail-Akkumulation
```

#### C. Performance-Grenzen

```yaml
Beispiele:
  - agentCount > 20000: GPU-Bottleneck (< 10 FPS)
  - sensorDist > 100: Sensor-Berechnung zu teuer
  - diffusion > 20: Diffusion-Kernel-Berechnung zu teuer
```

#### D. Konzeptuelle Grenzen

```yaml
Beispiele:
  - attractionStrength: 0.0: Keine Selbst-Resonanz → Agents ignorieren eigene Spuren
  - repulsionStrength: 0.0: Keine Fremd-Resonanz → Multi-Spezies verhält sich wie MYZEL
  - chaosInterval: 0: Kein Chaos → Parameter inaktiv
```

## Anwendungsfälle

### 1. Sinnvollen Bereich definieren

**Situation**: Neuer Parameter, Bereich unklar

```yaml
Beispiel: turn-speed (neu)

Grenzfall-Exploration:
  turnSpeed: [0.0, 0.05, 0.1, ..., 0.9, 1.0, 1.5, 2.0]

Beobachtung:
  0.0: Agents drehen sich nie → geradeaus-Bewegung
  0.05: Sehr langsame Drehung
  0.1: Sinnvolle untere Grenze
  ...
  0.9: Sinnvolle obere Grenze
  1.0: Sehr schnelle Drehung → erratisch
  1.5: Zu schnell → Chaos
  2.0: Unkontrolliert

Ergebnis:
  - Sinnvoller Bereich: 0.1 - 1.0
  - Dokumentiere in Parameter-Notiz: [[../parameters/turn-speed.md#range]]
```

### 2. Überraschungen entdecken

**Situation**: Vermutung dass Extreme neue Phänomene zeigen

```yaml
Beispiel: Chaos-Interval (Paradox)

Normalbereich-Test:
  chaosInterval: [100, 300, 500] → Wie erwartet: Mehr Chaos

Grenzfall:
  chaosInterval: 0 → Kein Chaos (erwartet)
  chaosInterval: 50 → Sehr häufig → Erwartung: Extreme Instabilität
  
  ÜBERRASCHUNG: chaosInterval: 50 → STABILER als 0!
    → "Chaos-Injection-Paradox" entdeckt
    → Mechanismus: Häufiges Chaos bricht lokale Instabilitäten
    
Neue Theorie:
  - Moderates Chaos ERHÖHT Makro-Stabilität
  - Dokumentiert in [[../properties/stability.md#chaos-injection-paradox]]
```

### 3. Performance-Limits identifizieren

**Situation**: System-Performance verstehen

```yaml
Beispiel: Agent Count Skalierung

Grenzfall-Exploration:
  agentCount: [100, 500, 1000, 2000, 5000, 10000, 20000, 50000]

Performance-Messung:
  100: 60 FPS ✓
  1000: 60 FPS ✓
  5000: 55 FPS ✓
  10000: 45 FPS (akzeptabel)
  20000: 18 FPS (grenzwertig)
  50000: 4 FPS (unbrauchbar)

Ergebnis:
  - Praktisches Limit: ~10000-15000 Agents
  - Dokumentiere Performance-Constraint
```

## Beispiel-Experimente

### Experiment: Maximaler Decay, Minimale Diffusion (geplant)

```yaml
ID: [[Experiment_Maximaler_Decay_Minimale_Diffusion]]

Hypothese: "Extreme Kristallinität bei Decay ≈ 1.0 + Diffusion ≈ 0"

Parameter:
  decayRate: [0.99, 0.999, 0.9999]
  diffusionFreq: [0, 0.1, 0.5]
  Alle anderen: Baseline

Erwartung:
  - Quasi-permanente, scharfe Trails
  - "Eingefrorene" geometrische Muster
  - Möglicherweise zu statisch (unbrauchbar)

Ergebnis:
  - Definiert obere Grenze für Kristallinität
  - Falls nutzbar: "Ultra-Kristallin"-Preset
```

### Experiment: Extreme Resonanz-Werte (geplant)

```yaml
ID: [[Experiment_Extreme_Resonanz_Werte]]

Parameter:
  attractionStrength: [0.0, 0.5, 2.0, 3.0]
  repulsionStrength: [-1.5, -1.0, 0.5, 1.0]
  
Erwartung:
  - attractionStrength: 0.0 → Keine Cluster (Agents ignorieren Spuren)
  - attractionStrength: 3.0 → Hyper-Cluster (sofortige Konvergenz)
  - repulsionStrength: -1.5 → Extreme Segregation
  - repulsionStrength: 1.0 → "Negative Segregation" (Anziehung statt Abstoßung!)

Ergebnis:
  - Validiert sinnvollen Bereich
  - Möglicherweise unerwartete Phänomene an Extremen
```

### Experiment: Ultra-Chaos (geplant)

```yaml
ID: [[Experiment_Ultra_Chaos]]

Parameter:
  speed: 5.0 (sehr hoch)
  turnSpeed: 1.0 (sehr hoch)
  chaosInterval: 50 (sehr häufig)
  chaosStrength: 1.0 (maximal)
  decayRate: 0.70 (sehr niedrig)

Erwartung:
  - Maximales Chaos
  - Keine persistenten Strukturen
  - Turbulenz

Ergebnis:
  - Definiert "Chaos-Limit"
  - Falls interessant: "Ultra-Chaos"-Preset für Demonstrationen
```

## Analyse-Methoden

### Grenzwert-Identifikation

```yaml
# Systematisches Testen bis Kollaps

decay: 0.85 → Nutzbar
decay: 0.80 → Nutzbar
decay: 0.75 → Nutzbar
decay: 0.70 → Grenzwertig
decay: 0.65 → System kollabiert (keine Cluster mehr)

→ Untere Grenze: ~0.70
```

### Qualitäts-Bewertung

```yaml
# Kategorisierung

Parameter-Wert | Qualität | Nutzbarkeit
---------------|----------|-------------
0.0            | Kollaps  | Unbrauchbar
0.50           | Chaos    | Unbrauchbar
0.70           | Instabil | Grenzwertig
0.85           | Nutzbar  | ✓ (untere Grenze)
...
0.99           | Nutzbar  | ✓ (obere Grenze)
0.999          | Statisch | Grenzwertig
0.9999         | Eingefroren | Unbrauchbar
```

## Best Practices

### 1. Systematisch an Grenzen herantasten

```yaml
# ✅ RICHTIG
Schrittweise: [0.85, 0.80, 0.75, 0.70, 0.65, ...] bis Kollaps

# ❌ FALSCH
Sprung zu Extrem: [0.85, 0.0] (überspringt Grenzbereich)
```

### 2. Erwarte "Unbrauchbarkeit"

Grenzfall-Exploration SOLL unbrauchbare Zustände finden:

```yaml
# Das ist der ZWECK
"Bei Decay = 0.5 kollabiert System" → ERFOLG (Grenze identifiziert)

# NICHT
"Bei Decay = 0.5 sollte System funktionieren" → Falsche Erwartung
```

### 3. Dokumentiere Grenzen in Parameter-Notizen

```markdown
# In parameters/decay-rate.md

## Range

**Sinnvoller Bereich**: 0.85 - 0.99

**Erweitert (mit Einschränkungen)**:
- Untere Grenze: 0.70 (sehr instabil, nur für Chaos-Experimente)
- Obere Grenze: 0.999 (quasi-statisch, nur für "Eingefrorene"-Demonstrationen)

**Unbrauchbar**:
- < 0.70: System kollabiert (keine persistenten Strukturen)
- > 0.999: Praktisch eingefroren (keine Dynamik)

Basierend auf: [[../../experiments/Experiment_Decay_Grenzfall_Exploration|Grenzfall-Exploration EXP015]]
```

## Verwandte Experimentklassen

- [[single-parameter-variation]] - Grenzfall-Exploration ist oft **Runde 3** der iterativen Vertiefung
- [[parameter-combination]] - Kann auch Grenzfall-Kombinationen testen

## Verwandte Methoden

- [[../methods/iterative-deepening.md]] - Grenzfall-Exploration = Runde 3
- [[../methods/theory-guided-hypotheses.md]] - Grenzen testen theoretische Annahmen

## Verwandte Konzepte

- [[../concepts/emergenz.md]] - Extreme zeigen emergente Phasenübergänge
- [[../properties/chaos.md]] - "Chaos-Limit" durch Grenzfall-Exploration definiert
- [[../properties/crystallinity.md]] - "Kristallinit Extremum" bei maximalen Decay + minimaler Diffusion
