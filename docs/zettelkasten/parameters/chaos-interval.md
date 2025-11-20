---
id: param-chaos-interval
title: Chaos Interval
type: parameter
oikos: temporale-oikos
range: 0 - 500
default: 0
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [parameter, temporal, perturbation, destabilization, paradox]
affects:
  - "[[cluster-formation]]" # -
  - "[[separation]]" # -
  - "[[stability]]" # ---
  - chaos # +++
  - network # -
  - fluidity # ++
  - crystallinity # ---
  - density # -
related:
  - chaos-strength
  - turn-speed
  - "[[decay-rate]]"
experiments:
  - "[[Experiment_Chaos_Injection_Periodizität]]"
sources:
  - "[[Parameter_Oikos_Matrix]]"
---

## Definition

**Chaos Interval** bestimmt, wie **oft** Agents randomisierte Störungen erhalten – die Periode zwischen Chaos-Injections (in Frames).

**Special Case**: `chaosInterval = 0` bedeutet **keine Chaos-Injection** (nur "natürliches" Verhalten).

## Ökosemiotische Interpretation

`chaosInterval` ist **nicht** "Störungs-Frequenz", sondern:

**"Periodische Destabilisierung der akkumulierten Ordnung"**

- `chaosInterval = 0` → Keine Perturbation → Ordnung kann unbegrenzt akkumulieren
- `chaosInterval = 150` → Alle 2.5 Sekunden Störung @ 60 FPS → verhindert Muster-Stabilisierung

Chaos Interval strukturiert **Perturbations-Rhythmus** – wie oft das System "reset" wird.

## Implementation

```javascript
// Alle N Frames: Randomisiere Agent-Richtungen
if (chaosInterval > 0 && frameCount % chaosInterval === 0) {
  agents.forEach(agent => {
    // Zufällige Richtungsänderung
    agent.angle += (Math.random() - 0.5) * 2 * Math.PI * chaosStrength;

    // Optional: Zufällige Position
    if (chaosMode === 'full') {
      agent.x = Math.random() * width;
      agent.y = Math.random() * height;
    }
  });
}
```

## Wertebereich

| Wert | Effekt @ 60 FPS | Typ | Typische Anwendung |
|---|---|---|---|
| **0** | Nie | Kein Chaos | Maximale Stabilität, ungestörte Emergenz |
| **50-100** | 0.8-1.6s | Hochfrequent | Permanente Turbulenz, keine Stabilisierung |
| **150-250** | 2.5-4.2s | Moderat | Balancierte Störung |
| **300-400** | 5-6.7s | Niedrigfrequent | Desynchronisation, aber Muster möglich |
| **>400** | >6.7s | Sehr selten | Fast wie kein Chaos, subtile Perturbation |

## Effekte auf emergente Eigenschaften

Aus der [[../meta/map-parameter-effects.md|Parameter-Oikos-Matrix]]:

| Eigenschaft | Effekt | Stärke | Erklärung |
|---|---|---|---|
| **[[cluster-formation\|Clusterbildung]]** | ⬇️ | - | Chaos-Injection stört Cluster-Akkumulation |
| **[[separation\|Separation]]** | ⬇️ | - | Perturbation mischt Territorien |
| **[[stability\|Stabilität]]** | ⬇️ | --- | Regelmäßige Chaos-Injektion → verhindert Muster-Stabilisierung |
| **Chaos** | ⬆️ | +++ | Periodische Störung → erhöht Irregularität |
| **Network** | ⬇️ | - | Chaos zerstört schwache Verbindungen |
| **Fluidity** | ⬆️ | ++ | Perturbation erzwingt Formveränderung |
| **Crystallinity** | ⬇️ | --- | Chaos-Injection zerstört geometrische Ordnung |
| **Density** | ⬇️ | - | Störung verhindert lokale Akkumulation |

## Das Chaos-Injection-Paradox ⚠️

**Paradoxe Beobachtung**: Moderate Chaos-Injection kann [[../properties/stability.md|Stabilität]] **erhöhen**!

### Ohne Chaos (chaosInterval = 0)

```yaml
turnSpeed: 0.8 + chaosInterval: 0 → Massen-Pulsieren (instabil!)

Problem:
  - Alle Agents starten mit ähnlichen Winkeln
  - Hoher Turn Speed → alle reagieren synchron auf Trails
  - Kollektive Oszillation: Alle drehen gleichzeitig links/rechts
  - Ergebnis: **Niedrige temporale Stabilität** (Masse pulsiert)

Mechanismus:
  - Kein Desynchronisations-Mechanismus
  - Turn Speed verstärkt Synchronisation
  - System "schwingt" kollektiv
```

### Mit moderatem Chaos (chaosInterval = 250-350)

```yaml
turnSpeed: 0.8 + chaosInterval: 300 → Desynchronisiert → stabiler!

Lösung:
  - Chaos-Injection bricht Synchronisation alle 5 Sekunden
  - Agents werden diversifiziert
  - Kein kollektives Pulsieren mehr
  - Ergebnis: **Höhere Makro-Stabilität** durch Mikro-Chaos

Mechanismus:
  - Chaos desynchronisiert Agents
  - Verhindert Masse-Oszillation
  - Robustere, diversifizierte Muster
```

**Theoretische Implikation**: "Störung" ist nicht immer destabilisierend – kann **Diversität erhöhen** und dadurch robustere Muster erzeugen.

Siehe [[../properties/stability.md#chaos-injection-paradox]] und [[../meta/map-parameter-effects.md#cross-oikos-effekt-4-chaos-injection-paradox]]

## Interaktionen mit anderen Parametern

### Chaos Interval × Chaos Strength: Störungs-Intensität

**Interval = Frequenz, Strength = Amplitude**:

```yaml
# Subtile, häufige Perturbation
chaosInterval: 100 + chaosStrength: 0.3 → Permanentes "Rauschen"
  - Hochfrequent
  - Niedrige Amplitude
  - Ergebnis: Konstante leichte Störung, keine Stabilisierung

# Starke, seltene Perturbation
chaosInterval: 400 + chaosStrength: 0.9 → "Reset"-Events
  - Niedrigfrequent
  - Hohe Amplitude
  - Ergebnis: Muster emergieren, dann periodische "Resets"

# Moderate Balance
chaosInterval: 250 + chaosStrength: 0.5 → Balancierte Störung
  - Moderate Frequenz
  - Moderate Amplitude
  - Ergebnis: Dynamische Stabilität, keine Einfrierung
```

### Chaos Interval × [[decay-rate|Decay]]: Muster-Persistenz

**Decay = Wie lange Muster bleiben, Chaos = Wie oft zerstört**:

```yaml
# Kurze Muster-Lebensdauer
decayRate: 0.88 + chaosInterval: 150 → Keine Stabilisierung
  - Trails verschwinden schnell (niedriger Decay)
  - Chaos oft (kurzes Interval)
  - Ergebnis: Ephemere, volatile Muster

# Resiliente Muster (erholen sich)
decayRate: 0.97 + chaosInterval: 300 → Dynamische Stabilität
  - Trails bleiben lange (hoher Decay)
  - Chaos moderat (moderates Interval)
  - Ergebnis: Muster erholen sich nach Chaos

# Quasi-statische Muster
decayRate: 0.99 + chaosInterval: 0 → Maximale Stabilität
  - Trails bleiben sehr lange
  - Kein Chaos
  - Ergebnis: "Eingefrorene" Strukturen
```

## Experimentelle Befunde

### Experiment: [[Experiment_Chaos_Injection_Periodizität]]

**Setup**: Konstanthalten von anderen Parametern, variiere chaosInterval

**Befunde**:

```yaml
chaosInterval: 0 (kein Chaos)
  → Statisch stabil (aber fragil bei Synchronisation)
  → Massen-Pulsieren bei hohem Turn Speed

chaosInterval: 50-150 (hochfrequent)
  → Instabil (zu viele Störungen)
  → Keine Muster-Emergenz möglich

chaosInterval: 250-350 (optimal)
  → Dynamisch stabil (robust)
  → Desynchronisiert ohne zu zerstören
  → **Maximale Makro-Stabilität**

chaosInterval: 400-500 (niedrigfrequent)
  → Quasi-statisch
  → Fast wie kein Chaos
```

**Kritischer Bereich**: **250-350 Frames** (@ 60 FPS ≈ 4-6 Sekunden) ist optimal für robuste Stabilität

### Beobachtung: Chaos als "Loop-Breaker"

Bei hohem Turn Speed ohne Chaos:
- Agents synchronisieren
- Kollektive Loops entstehen
- System "schwingt"

Mit Chaos (Interval 250-350):
- Synchronisation wird gebrochen
- Agents diversifiziert
- Stabileres Makro-Verhalten

## Presets mit charakteristischem Chaos Interval

| Preset | Chaos Interval | Chaos Strength | Turn Speed | Muster |
|---|---|---|---|---|
| **Kristallwachstum** | 0 | - | 0.3 | Statisch, geometrisch |
| **Dynamische Stabilität** | 300 | 0.5 | 0.7 | Robust, resilient |
| **Chaos Mode** | 150 | 0.9 | 0.9 | Permanente Turbulenz |
| **Territorien** | 250 | 0.4 | 0.6 | Desynchronisiert, aber Separation möglich |

## Design-Empfehlungen

### Für maximale Stabilität (kein Chaos)
```yaml
chaosInterval: 0  # Aus!
+ decayRate: 0.98-0.999
+ deposit: 25-30
+ turnSpeed: 0.3-0.5  # Nicht zu hoch (Synchronisations-Risiko)
```

**Ergebnis**: Statische, "eingefrorene" Strukturen

**Warnung**: Bei hohem Turn Speed → Massen-Pulsieren möglich!

### Für dynamische robuste Stabilität (optimal)
```yaml
chaosInterval: 250-350  # Optimal!
+ chaosStrength: 0.4-0.6
+ decayRate: 0.95-0.98
+ turnSpeed: 0.6-0.9  # Kann hoch sein, weil Chaos desynchronisiert
```

**Ergebnis**: Stabile Topologie mit Formveränderung, robust gegen Perturbationen

### Für maximales Chaos
```yaml
chaosInterval: 100-150  # Hochfrequent!
+ chaosStrength: 0.8-1.0
+ speed: 3.0-5.0
+ turnSpeed: 0.8-1.0
+ fadeStrength: 0.3-0.5
```

**Ergebnis**: Permanente Turbulenz, keine Stabilisierung möglich

## Theoretische Bedeutung

Chaos Interval ist ein **paradoxer Parameter** der **Temporalen Oikos** weil er:

1. **Störung einführt** (destabilisiert auf Mikro-Ebene)
2. **Aber stabilisieren kann** (Makro-Ebene durch Desynchronisation)
3. **Perturbations-Rhythmus** strukturiert (wie oft wird "Reset"?)

**Philosophische Implikation**: Ordnung braucht manchmal Störung – zu viel Stabilität führt zu Fragilität (Synchronisation)

Siehe [[../concepts/parameter-as-oikos.md#temporale-oikos]]

## Biologische Analogien

### Neuronale Noise
**Stochastic Resonance**: Noise kann Signal-Detektion **verbessern**
- Moderates Rauschen hilft bei schwachen Signalen
- Zu viel Rauschen überwältigt Signal
- Chaos Interval ≈ Noise-Frequenz

### Ökologische Disturbance
**Intermediate Disturbance Hypothesis**: Moderate Störung maximiert Diversität
- Keine Störung: Dominante Arten verdrängen andere
- Moderate Störung: Koexistenz vieler Arten
- Zu viel Störung: Keine Etablierung möglich

### Organisationale Disruption
**Creative Destruction**: Periodische Restrukturierung verhindert Stagnation
- Keine Disruption: Rigidität, Fragilität
- Moderate Disruption: Innovation, Adaptation
- Zu viel Disruption: Instabilität, Kollaps

## Chaos Interval als System-Parameter

**Im Gegensatz zu anderen Parametern**:
- Chaos Interval **existiert nicht in der Umwelt**
- Es ist ein **Meta-Parameter** – verändert System, nicht Umwelt
- **Nicht-ökologisch** – keine biologische Analogie im eigentlichen Sinne

**Theoretische Einordnung**: Chaos Interval ist eher **experimenteller Eingriff** als natürlicher Parameter

## Performance-Implikationen

### Moderate Cost

Chaos-Injection ist **moderat teuer**:

```javascript
// O(agentCount) pro Chaos-Event
if (frameCount % chaosInterval === 0) {
  agents.forEach(agent => {
    agent.angle += randomPerturbation;  // O(1) per Agent
  });
}

// Häufigkeit: 1/chaosInterval Frames
// Bei chaosInterval=300: Alle 5 Sekunden @ 60 FPS
// → 12 mal/Minute → vernachlässigbar
```

Bei sehr kurzen Intervals (50-100) kann es messbar werden.

## Offene Fragen

1. **Adaptive Chaos**: Sollte Chaos Interval von globaler Ordnung abhängen (mehr Chaos bei hoher Synchronisation)?
2. **Species-specific Chaos**: Sollten verschiedene Spezies verschiedene Chaos-Frequenzen haben?
3. **Spatially-varying Chaos**: Was, wenn verschiedene Regionen verschiedene Chaos-Intervals hätten?

## Verwandte Parameter

- chaos-strength - **Zusammen** definieren Störungs-Charakter
- turn-speed - Chaos desynchronisiert Turn-Speed-Effekte
- [[decay-rate]] - Balance zwischen Muster-Persistenz und Chaos-Zerstörung
- [[stability]] (Property) - Paradox: Moderates Chaos erhöht Stabilität

## Verwandte Konzepte

- [[../concepts/parameter-as-oikos.md]] - Chaos Interval als Teil der Temporalen Oikos
- [[../properties/stability.md]] - Das Chaos-Injection-Paradox
- [[chaos]] (Property) - Primär gefördert durch Chaos Interval
- [[crystallinity]] - Stark gehemmt durch Chaos Interval
