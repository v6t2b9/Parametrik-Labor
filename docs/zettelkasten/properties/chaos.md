---
id: property-chaos
title: Chaos
type: emergent-property
category: dynamic
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [emergence, chaos, volatility, unpredictability]
promoted_by:
  - fade-strength # +++
  - "[[agent-speed]]" # +++
  - chaos-interval # +++
  - chaos-strength # +++
  - turn-speed # +++
  - diffusion # ++
  - repulsion-strength # ++ (bei starker Abstoßung)
inhibited_by:
  - "[[decay-rate]]" # ---
  - "[[deposit-amount]]" # -
  - trail-saturation # -
  - chaos-interval # (Paradox: Bei 0 kann Massen-Pulsieren entstehen)
related:
  - "[[stability]]" # Anti-korreliert
  - fluidity # Korreliert
  - crystallinity # Anti-korreliert
experiments:
  - "[[Experiment_Chaos_Injection_Periodizität]]"
sources:
  - "[[Parameter_Oikos_Matrix]]"
---

## Definition

**Chaos** ist die emergente **Irregularität, Unvorhersagbarkeit und schnelle Veränderung** von Mustern im System.

## Charakteristika

### Visuelle Merkmale
- **Hochfrequente Veränderungen**: Muster ändern sich Frame-für-Frame
- **Keine stabilen Strukturen**: Hotspots entstehen und verschwinden schnell
- **Erratische Bewegung**: Agents zeigen unvorhersagbare Pfade
- **Minimales Gedächtnis**: Vergangenheit hat kaum Einfluss auf Gegenwart

### Quantifizierung

**Temporal Entropy**:
```javascript
// Entropie zwischen aufeinanderfolgenden Frames
entropy = calculateEntropy(correlate(frame_t, frame_t_plus_1))

// Werte:
// 0.1-0.3 = niedrig (stabil, vorhersagbar)
// 0.4-0.6 = moderat (dynamisch)
// 0.7-1.0 = hoch (chaotisch, unvorhersagbar)
```

**Pattern Varianz**:
```javascript
// Varianz über Zeit-Fenster
variance = std(patternMetrics, timeWindow)
// Höhere Varianz = höheres Chaos
```

## Parameter-Einflüsse

### Starke Förderer (+++)

#### fade-strength (0.2-0.5)
**Mechanismus**: Aggressive Löschung → destabilisiert Muster → keine Konsolidierung möglich

#### [[agent-speed|Agent Speed]] (2.5-5.0)
**Mechanismus**: Schnelle Bewegung → volatile Muster → weniger Zeit für Stabilisierung

#### chaos-interval (50-200)
**Mechanismus**: Häufige Perturbation → permanente Destabilisierung

#### chaos-strength (0.7-1.0)
**Mechanismus**: Starke Störungen → zerstört emergente Ordnung

#### turn-speed (0.7-1.0)
**Mechanismus**: Schnelle Richtungswechsel → erratische Bewegung → Noise-Amplification

## Chaos vs. [[stability|Stabilität]]

**Fundamentale Anti-Korrelation**:
```
Chaos ∝ 1/Stabilität
```

**Aber**: Bei moderatem Chaos-Interval (250-350) → **Chaos-Injection-Paradox**:
- Mikro-Chaos (durch Desynchronisation)
- Makro-Stabilität (robustere Muster)

Siehe [[../parameters/chaos-interval.md#das-chaos-injection-paradox]] und [[../properties/stability.md#chaos-injection-paradox]]

## Typen von Chaos

### Typ 1: Thermisches Chaos
**Parameter**:
```yaml
fadeStrength: 0.3-0.5
speed: 3.0-5.0
decayRate: 0.85-0.90
```

**Charakteristik**: Hochfrequentes "Rauschen", keine Muster überhaupt

### Typ 2: Turbulentes Chaos
**Parameter**:
```yaml
chaosInterval: 100-150
chaosStrength: 0.8-1.0
turnSpeed: 0.8-1.0
```

**Charakteristik**: Periodische "Explosionen", Muster entstehen und zerbrechen

### Typ 3: Dynamisches Chaos (Edge of Chaos)
**Parameter**:
```yaml
decayRate: 0.92-0.94
diffusionFreq: 6-8
speed: 2.0-2.5
```

**Charakteristik**: Muster emergieren kurz, dann vergehen – Balance zwischen Ordnung und Chaos

## Design-Rezept: Maximales Chaos

```yaml
Ziel: Permanente Turbulenz, keine Stabilisierung

fadeStrength: 0.3-0.5        # +++
speed: 3.0-5.0               # +++
chaosInterval: 100-150       # +++
chaosStrength: 0.8-1.0       # +++
turnSpeed: 0.7-1.0           # +++
decayRate: 0.85-0.90         # --- (niedrig!)
deposit: 5-10                # - (niedrig!)

Begründung:
  Aggressive Löschung + hohe Geschwindigkeit + häufiges Chaos
  → Keine Zeit für Muster-Stabilisierung
  → Permanente Volatilität
```

## Theoretische Bedeutung

Chaos demonstriert:
1. **Anti-Akkumulation**: Verhindert durch Parameter, die Gedächtnis hemmen
2. **Noise-Dominanz**: Signal (Ordnung) << Noise (Störung)
3. **Edge of Chaos**: Optimale Komplexität an Grenze zwischen Ordnung und Chaos

## Biologische Analogien

- **Thermische Bewegung**: Brownsche Bewegung bei hoher Temperatur
- **Epileptische Aktivität**: Übermäßige, unkoordinierte neuronale Aktivität
- **Ökologischer Kollaps**: Nach katastrophaler Störung

## Verwandte Konzepte

- [[../concepts/emergenz.md]] - Chaos als fehlende Emergenz
- [[stability]] - Anti-korreliert
- [[crystallinity]] - Anti-korreliert
- [[fluidity]] - Korreliert (aber unterschiedlich: Fluidity = kontrollierte Veränderung, Chaos = unkontrollierte)
