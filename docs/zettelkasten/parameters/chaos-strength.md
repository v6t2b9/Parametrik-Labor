---
id: param-chaos-strength
title: Chaos Strength
type: parameter
oikos: temporale-oikos
range: 0.1 - 1.0
default: 0.5
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [parameter, temporal, perturbation, amplitude]
affects:
  - "[[cluster-formation]]" # -
  - "[[separation]]" # +
  - "[[stability]]" # --
  - chaos # +++
  - network # -
  - fluidity # +
  - crystallinity # --
  - density # -
related:
  - chaos-interval
  - turn-speed
  - fade-strength
experiments:
  - "[[Experiment_Chaos_Injection_Periodizität]]"
sources:
  - "[[Parameter_Oikos_Matrix]]"
---

## Definition

**Chaos Strength** bestimmt, wie **stark** Chaos-Injections sind – die Amplitude der randomisierten Störungen.

**Kontext**: Nur relevant wenn `chaosInterval > 0`. Bei `chaosInterval = 0` (kein Chaos) hat Chaos Strength keine Wirkung.

## Ökosemiotische Interpretation

`chaosStrength` ist **nicht** "Störungs-Größe", sondern:

**"Intensität der Perturbation akkumulierter Ordnung"**

- `chaosStrength = 1.0` → Maximale Perturbation → vollständige Randomisierung bei Chaos-Event
- `chaosStrength = 0.2` → Minimale Perturbation → subtile Störung bei Chaos-Event

Chaos Strength strukturiert **Perturbations-Intensität** – wie stark das System bei Chaos-Events "geschüttelt" wird.

## Implementation

```javascript
// Nur wenn chaosInterval > 0
if (chaosInterval > 0 && frameCount % chaosInterval === 0) {
  agents.forEach(agent => {
    // Randomize angle: chaosStrength = maximale Drehung
    const maxAngle = 2 * Math.PI * chaosStrength;  // 0 bis 2π × strength
    const randomAngle = (Math.random() - 0.5) * maxAngle;

    agent.angle += randomAngle;

    // Optional: Position randomization
    if (chaosMode === 'full' && chaosStrength > 0.7) {
      agent.x = Math.random() * width;
      agent.y = Math.random() * height;
    }
  });
}
```

## Wertebereich

| Wert | Effekt | Maximale Drehung | Typische Anwendung |
|---|---|---|---|
| **0.1-0.3** | Subtile Störung | ±18-54° | Leichte Desynchronisation |
| **0.4-0.6** | Moderate Störung | ±72-108° | Balancierte Perturbation |
| **0.7-0.9** | Starke Störung | ±126-162° | Aggressive Destabilisierung |
| **0.95-1.0** | Maximale Störung | ±171-180° | Vollständige Randomisierung |

## Effekte auf emergente Eigenschaften

Aus der [[../meta/map-parameter-effects.md|Parameter-Oikos-Matrix]]:

| Eigenschaft | Effekt | Stärke | Erklärung |
|---|---|---|---|
| **[[cluster-formation\|Clusterbildung]]** | ⬇️ | - | Starke Störung dispergiert Cluster |
| **[[separation\|Separation]]** | ⬆️ | + | Chaos kann Grenz-Schärfung beschleunigen (ähnlich wie fade-strength) |
| **[[stability\|Stabilität]]** | ⬇️ | -- | Hohe Strength → starke Störungen → reduziert Stabilität |
| **Chaos** | ⬆️ | +++ | Hoher Chaos Strength → starke Störungen → hohe Irregularität |
| **Network** | ⬇️ | - | Chaos zerstört schwache Verbindungen |
| **Fluidity** | ⬆️ | + | Perturbation erzwingt Formveränderung |
| **Crystallinity** | ⬇️ | -- | Starke Störung verhindert geometrische Akkumulation |
| **Density** | ⬇️ | - | Chaos verhindert lokale Akkumulation |

## Interaktionen mit anderen Parametern

### Chaos Strength × chaos-interval: Störungs-Charakteristik

**Interval = Frequenz, Strength = Amplitude**:

```yaml
# Hochfrequent, subtil
chaosInterval: 100 + chaosStrength: 0.3 → Permanentes "Rauschen"
  - Oft gestört (alle 1.6s @ 60 FPS)
  - Aber: Schwache Störungen
  - Ergebnis: Konstante leichte Volatilität, kein "Shock"

# Niedrigfrequent, stark
chaosInterval: 400 + chaosStrength: 0.9 → "Earthquake"-Events
  - Selten gestört (alle 6.7s @ 60 FPS)
  - Aber: Starke Störungen
  - Ergebnis: Muster emergieren, dann periodische "Shocks"

# Balanciert
chaosInterval: 250 + chaosStrength: 0.5 → Moderate Perturbation
  - Moderate Frequenz (alle 4s @ 60 FPS)
  - Moderate Amplitude
  - Ergebnis: Dynamische Stabilität, Desynchronisation ohne Zerstörung

# Hochfrequent, stark
chaosInterval: 100 + chaosStrength: 0.9 → Maximales Chaos
  - Oft UND stark gestört
  - Ergebnis: Keine Muster-Emergenz möglich, permanente Turbulenz
```

### Chaos Strength × Turn Speed: Reaktivität nach Störung

**Chaos ändert Richtung, Turn Speed bestimmt Reaktion danach**:

```yaml
# Starke Störung, schnelle Reaktion
chaosStrength: 0.9 + turnSpeed: 0.8 → Explosive Reorientierung
  - Chaos randomisiert stark
  - Agents reagieren schnell auf neue Trails
  - Ergebnis: Schnelle Neu-Strukturierung nach Chaos

# Starke Störung, langsame Reaktion
chaosStrength: 0.9 + turnSpeed: 0.3 → Smooth Recovery
  - Chaos randomisiert stark
  - Agents reagieren träge auf neue Trails
  - Ergebnis: Langsame, smooth Rückkehr zur Ordnung

# Subtile Störung, schnelle Reaktion
chaosStrength: 0.3 + turnSpeed: 0.8 → Desynchronisation
  - Chaos nudges leicht
  - Agents reagieren schnell
  - Ergebnis: Bricht Synchronisation ohne Ordnung zu zerstören
```

### Chaos Strength × fade-strength: Doppler-Destabilisierung

**Beide destabilisieren, aber unterschiedlich**:

```yaml
# Beide hoch: Extreme Volatilität
chaosStrength: 0.8 + fadeStrength: 0.3 + chaosInterval: 150
  - Chaos stört Agents periodisch
  - Fade löscht Trails kontinuierlich
  - Ergebnis: Maximale Destabilisierung, keine Ordnung möglich

# Balance: Dynamische Volatilität
chaosStrength: 0.5 + fadeStrength: 0.1 + chaosInterval: 300
  - Moderate Störungen
  - Minimales Löschen
  - Ergebnis: Dynamische Muster mit Formveränderung
```

## Experimentelle Befunde

### Experiment: [[Experiment_Chaos_Injection_Periodizität]]

**Befund**: Optimale Chaos Strength hängt von Interval ab

```yaml
Setup: Variiere chaosStrength bei konstantem chaosInterval

Bei chaosInterval = 300:
  chaosStrength: 0.2 → Zu schwach, Desynchronisation unvollständig
  chaosStrength: 0.4-0.6 → **Optimal**, bricht Synchronisation ohne zu zerstören
  chaosStrength: 0.9 → Zu stark, zerstört emergente Muster

Bei chaosInterval = 100:
  chaosStrength: 0.2 → Brauchbar, häufige subtile Störungen
  chaosStrength: 0.6 → Zu stark bei hoher Frequenz, keine Stabilisierung
```

**Regel**: Kürzeres Interval → niedrigere Strength nötig

### Beobachtung: Strength-Schwellenwerte

**Unter ~0.3**: Subtile Effekte, Muster bleiben weitgehend intakt
**0.3-0.7**: Balancierter Bereich – Störung ohne vollständige Zerstörung
**Über ~0.7**: Destruktiv, Muster werden stark deformiert oder zerstört

## Presets mit charakteristischem Chaos Strength

| Preset | Chaos Interval | Chaos Strength | Muster |
|---|---|---|---|
| **Subtile Perturbation** | 400 | 0.3 | Leichte Störungen, stabile Basis |
| **Dynamische Stabilität** | 300 | 0.5 | Desynchronisiert, robust |
| **Aggressive Disruption** | 200 | 0.8 | Starke Störungen, hochvolatil |
| **Chaos Mode** | 150 | 0.9 | Permanente Turbulenz |

## Design-Empfehlungen

### Für Desynchronisation (Chaos-Paradox)
```yaml
chaosInterval: 250-350
chaosStrength: 0.4-0.6  # Moderat!
+ turnSpeed: 0.6-0.9  # Kann hoch sein
+ decayRate: 0.95-0.98
```

**Ergebnis**: Bricht Synchronisation, erhöht Makro-Stabilität

**Theorie**: Siehe [[chaos-interval#das-chaos-injection-paradox]]

### Für maximales Chaos
```yaml
chaosInterval: 100-150
chaosStrength: 0.8-1.0  # Maximal!
+ speed: 3.0-5.0
+ turnSpeed: 0.8-1.0
+ fadeStrength: 0.3-0.5
```

**Ergebnis**: Permanente Turbulenz, keine Stabilisierung möglich

### Für subtile Volatilität
```yaml
chaosInterval: 400-500
chaosStrength: 0.2-0.4  # Niedrig!
+ decayRate: 0.96-0.98
+ deposit: 20-25
```

**Ergebnis**: Weitgehend stabil, mit gelegentlichen "Nudges"

## Theoretische Bedeutung

Chaos Strength ist ein **Perturbations-Parameter** der **Temporalen Oikos** weil er:

1. **Störungs-Intensität** definiert (Wie stark wird perturbiert?)
2. **Zusammen mit Chaos Interval** Störungs-Charakter strukturiert (Frequenz × Amplitude)
3. **Balance** zwischen Ordnung und Störung ermöglicht (optimale Strength bei gegebenem Interval)

Siehe [[../concepts/parameter-as-oikos.md#temporale-oikos]]

## Biologische Analogien

### Neuronale Noise (Amplitude)
**Noise Level**: Stärke des neuronalen Rauschens
- Niedrig: Deterministische Aktivität
- Moderat: Stochastic Resonance (Signal-Enhancement)
- Hoch: Signal überwältigt von Noise

### Ökologische Disturbance (Severity)
**Disturbance Intensity**: Stärke der Störung
- Niedrig: Subtile Veränderung (leichter Regen)
- Moderat: Signifikante Veränderung (Sturm)
- Hoch: Katastrophal (Waldbrand)

### Seismische Aktivität
**Earthquake Magnitude**: Stärke des Bebens
- Niedrig (< 4.0): Kaum spürbar
- Moderat (4.0-6.0): Spürbar, moderate Schäden
- Hoch (> 6.0): Destruktiv, große Schäden

## Chaos Strength als Meta-Parameter

**Ähnlich wie Chaos Interval**:
- Chaos Strength **existiert nicht in der Umwelt**
- Es ist ein **experimenteller Eingriff**
- **Nicht-ökologisch** – keine direkte biologische Analogie

**Aber**: Modelliert **exogene Schocks** oder **Umwelt-Volatilität**

## Performance-Implikationen

### Negligible Cost

Chaos Strength hat **keinen zusätzlichen Performance-Impact**:

```javascript
// Gleicher Cost unabhängig von Strength
agent.angle += randomAngle;  // O(1)

// Nur Random-Number-Generation, keine komplexen Berechnungen
```

Performance wird nur von `chaosInterval` bestimmt (Frequenz), nicht von Strength (Amplitude).

## Chaos Strength als Amplitude-Modulator

**Informationstheoretische Sicht**:

```
Niedrige Strength (0.2):
  - Signal (emergente Ordnung) >> Noise (Chaos)
  - Muster bleiben erkennbar

Moderate Strength (0.5):
  - Signal ≈ Noise
  - Balance zwischen Ordnung und Störung

Hohe Strength (0.9):
  - Noise >> Signal
  - Ordnung wird überwältigt
```

**Theoretische Implikation**: Chaos Strength reguliert **Signal-to-Noise Ratio**

## Offene Fragen

1. **Adaptive Chaos Strength**: Sollte Strength von aktueller Ordnung abhängen (höher bei hoher Synchronisation)?
2. **Species-specific Strength**: Sollten verschiedene Spezies verschiedene Störungs-Intensitäten haben?
3. **Spatially-varying Strength**: Was, wenn verschiedene Regionen verschiedene Chaos Strengths hätten ("Störungs-Gradienten")?

## Verwandte Parameter

- chaos-interval - **Zusammen** definieren Störungs-Charakter (Frequenz × Amplitude)
- turn-speed - Bestimmt Reaktion nach Chaos-Event
- fade-strength - **Synergistisch** (beide destabilisieren)
- [[decay-rate]] - **Antagonistisch** (Decay stabilisiert, Chaos destabilisiert)

## Verwandte Konzepte

- [[../concepts/parameter-as-oikos.md]] - Chaos Strength als Teil der Temporalen Oikos
- [[../properties/chaos.md]] - Primär gefördert durch Chaos Strength
- [[../properties/stability.md]] - Stark gehemmt durch Chaos Strength
- [[chaos-interval]] - Chaos-Injection-Paradox
