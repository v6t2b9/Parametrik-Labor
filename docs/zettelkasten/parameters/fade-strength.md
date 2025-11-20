---
id: param-fade-strength
title: Fade Strength
type: parameter
oikos: physikalische-oikos
range: 0.0 - 1.0
default: 0.1
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [parameter, physics, forgetting, volatility]
affects:
  - "[[cluster-formation]]" # -
  - "[[separation]]" # +
  - "[[stability]]" # --
  - chaos # +++
  - network # -
  - fluidity # ++
  - crystallinity # ---
  - density # --
related:
  - "[[decay-rate]]"
  - "[[deposit-amount]]"
  - diffusion
experiments:
  - TBD
sources:
  - "[[Parameter_Oikos_Matrix]]"
---

## Definition

**Fade Strength** bestimmt, wie aggressiv Trail-Intensität **aktiv gelöscht** wird – zusätzlich zum passiven Decay.

## Ökosemiotische Interpretation

`fadeStrength` ist **nicht** "Löschen", sondern:

**"Beschleunigung des Vergessens"**

- `fadeStrength = 0.0` → Kein aktives Vergessen → Nur Decay wirkt
- `fadeStrength = 0.3` → Aggressives Vergessen → Destabilisiert Muster

Fade strukturiert die **Geschwindigkeit des Vergessens** – wie schnell die Vergangenheit irrelevant wird.

## Implementation

```javascript
// Fade wird zusätzlich zu Decay angewendet
// Option 1: Subtraktiv
newTrailMap[y][x].r = Math.max(0, cell.r * decayRate - fadeStrength);

// Option 2: Threshold-based
if (cell.r < fadeThreshold) {
  newTrailMap[y][x].r = Math.max(0, cell.r - fadeStrength * 10);
} else {
  newTrailMap[y][x].r = cell.r * decayRate;
}
```

## Wertebereich

| Wert | Effekt | Typische Anwendung |
|---|---|---|
| **0.0** | Kein Fade | Maximale Stabilität, nur Decay wirkt |
| **0.05-0.1** | Minimales Fade | Leichte Beschleunigung des Vergessens |
| **0.15-0.25** | Moderates Fade | Balancierte Volatilität |
| **0.3-0.5** | Starkes Fade | Aggressive Löschung, hohe Dynamik |
| **0.6-1.0** | Sehr starkes Fade | Extreme Volatilität, fast keine Persistenz |

## Effekte auf emergente Eigenschaften

Aus der [[../meta/map-parameter-effects.md|Parameter-Oikos-Matrix]]:

| Eigenschaft | Effekt | Stärke | Erklärung |
|---|---|---|---|
| **[[cluster-formation\|Clusterbildung]]** | ⬇️ | - | Fade löscht Trails → schwächere Cluster-Akkumulation |
| **[[separation\|Separation]]** | ⬆️ | + | Fade beschleunigt Grenz-Schärfung (alte Spuren verschwinden schneller) |
| **[[stability\|Stabilität]]** | ⬇️ | -- | Hohe Fade → reduziert Gedächtnis-Effekt → Instabilität |
| **Chaos** | ⬆️ | +++ | Hohe Fade Strength → aggressive Löschung → destabilisiert Muster |
| **Network** | ⬇️ | - | Fade löscht schwache Verbindungen |
| **Fluidity** | ⬆️ | ++ | Fade ermöglicht schnellere Formveränderung |
| **Crystallinity** | ⬇️ | --- | Fade verhindert geometrische Akkumulation |
| **Density** | ⬇️ | -- | Fade reduziert Spitzen-Intensität |

## Interaktionen mit anderen Parametern

### Fade × [[decay-rate|Decay]] Antagonismus

**Gegensätzliche Effekte**:

```yaml
# Maximale Stabilität (kein Vergessen)
decayRate: 0.99 + fadeStrength: 0.0 → Quasi-permanente Strukturen
  - Decay erhält Trails
  - Kein Fade
  - Ergebnis: Maximale Persistenz

# Maximale Volatilität (schnelles Vergessen)
decayRate: 0.85 + fadeStrength: 0.3 → Ephemere Muster
  - Niedriger Decay
  - Hoher Fade
  - Ergebnis: Trails verschwinden sehr schnell

# Balance
decayRate: 0.95 + fadeStrength: 0.1 → Moderate Dynamik
  - Moderate Persistenz
  - Leichtes Fade
  - Ergebnis: Stabile, aber nicht eingefrorene Muster
```

### Fade × [[deposit-amount|Deposit]] Balance

**Trade-off zwischen Setzen und Löschen**:

```yaml
deposit: 30 + fadeStrength: 0.3 → Gleichgewicht
  - Starke Zeichensetzung
  - Starke Löschung
  - Ergebnis: Dynamisches Gleichgewicht, schnelle Muster-Wechsel

deposit: 5 + fadeStrength: 0.05 → Langsame Dynamik
  - Schwache Zeichensetzung
  - Schwache Löschung
  - Ergebnis: Langsame, subtile Muster-Emergenz
```

### Fade als "Reset"-Mechanismus

**Bei sehr hohem Fade (0.5-1.0)**:
- Trails verschwinden fast sofort
- Nur "Gegenwart" zählt
- System kann nicht akkumulieren
- **Verhindert alle Ordnungs-Emergenz**

## Experimentelle Befunde

### Beobachtung: Fade-Schwellenwerte

**Unter ~0.1**: Minimaler Effekt, Decay dominiert
**0.1-0.25**: Erhöht Dynamik ohne Struktur zu zerstören
**Über ~0.3**: Destruktiv, verhindert Muster-Stabilisierung

### Beobachtung: Fade beschleunigt Separation

Bei hoher Repulsion + hohem Fade:
- Fade löscht "Grau-Zonen" zwischen Territorien schneller
- Ergebnis: Schärfere, klarere Grenzen

**Mechanismus**: Fade wirkt wie "Kontrast-Erhöhung" – schwache Spuren verschwinden, starke bleiben

## Presets mit charakteristischer Fade

| Preset | Fade | Decay | Deposit | Muster |
|---|---|---|---|---|
| **Kristallwachstum** | 0.05 | 0.98 | 30 | Stabile, geometrische Strukturen |
| **Digital Rain** | 0.2 | 0.92 | 15 | Schnell fallende, ephemere Trails |
| **Chaos Mode** | 0.3-0.5 | 0.88 | 10 | Volatile, unvorhersagbare Muster |

## Design-Empfehlungen

### Für maximale Stabilität (kein Fade)
```yaml
fadeStrength: 0.0-0.05  # Minimal!
+ decayRate: 0.98-0.999
+ deposit: 25-30
+ chaosInterval: 0
```

**Ergebnis**: Quasi-statische Strukturen

### Für maximales Chaos (starkes Fade)
```yaml
fadeStrength: 0.3-0.5  # Hoch!
+ speed: 3.0-5.0
+ chaosInterval: 100-200
+ chaosStrength: 0.8-1.0
+ turnSpeed: 0.7-1.0
```

**Ergebnis**: Permanente Turbulenz, keine Stabilisierung

### Für dynamische Stabilität
```yaml
fadeStrength: 0.1-0.15
+ decayRate: 0.94-0.97
+ deposit: 15-20
+ diffusionFreq: 5-8
```

**Ergebnis**: Stabile Topologie mit Formveränderung

## Theoretische Bedeutung

Fade ist ein **antagonistischer Parameter** der **Physikalischen Oikos** weil er:

1. **Gegen Akkumulation arbeitet** (vs. Decay/Deposit, die akkumulieren)
2. **Vergessen beschleunigt** (vs. Gedächtnis-Parameter)
3. **Chaos ermöglicht** (durch Destabilisierung)

Siehe [[../concepts/parameter-as-oikos.md#physikalische-oikos]]

## Biologische Analogien

### Neuronale Hemmung (Inhibition)
**GABA-Rezeptoren**: Hemmen neuronale Aktivität
- Fade = neuronale Inhibition
- Verhindert übermäßige Aktivierung
- Balance Exzitation/Inhibition nötig

### Immunsystem (Gedächtnis-Zerfall)
**T-Zell-Memory Decay**: Immungedächtnis nimmt ab
- Fade = natürlicher Memory-Zerfall
- Zu stark: Keine Immunität
- Zu schwach: Autoimmun-Risiko

### Ökosystem (Detritivoren)
**Zersetzer**: Bauen organisches Material ab
- Fade = Dekomposition-Rate
- Verhindert Material-Akkumulation
- Ermöglicht Nährstoff-Recycling

## Fade vs. Decay: Konzeptuelle Unterscheidung

| Aspekt | Decay | Fade |
|---|---|---|
| **Natur** | Passiv, natürlich | Aktiv, forciert |
| **Wirkung** | Multiplikativ (% pro Frame) | Additiv/subtraktiv (fixes Δ) |
| **Bedeutung** | "Natürliches Vergessen" | "Aktive Löschung" |
| **Rolle** | Gedächtnis-Horizont | Reset-Mechanismus |
| **Analogie** | Radioaktiver Zerfall | Haushaltsreinigung |

**Theoretische Implikation**:
- **Decay** strukturiert temporale Ausdehnung (Gedächtnis)
- **Fade** limitiert maximale Akkumulation (Vergessen)

## Performance-Implikationen

### Minimal-Cost Operation

Fade ist **sehr billig** (einfache Subtraktion/Multiplikation):

```javascript
// O(width × height) pro Frame - sehr effizient
newTrailMap[y][x].r = Math.max(0, cell.r - fadeStrength);
```

Im Gegensatz zu Diffusion (teuer) ist Fade fast kostenlos.

## Offene Fragen

1. **Fade-Scheduling**: Sollte Fade nur bei bestimmten Trail-Intensitäten wirken (threshold-based)?
2. **Species-specific Fade**: Sollten verschiedene Spezies verschiedene Fade-Raten haben?
3. **Adaptive Fade**: Sollte Fade von globaler Trail-Dichte abhängen (höhere Dichte → höherer Fade)?

## Verwandte Parameter

- [[decay-rate]] - **Antagonistisch** (Decay erhält, Fade löscht)
- [[deposit-amount]] - **Trade-off** (Setzen vs. Löschen)
- diffusion - Beide reduzieren Trail-Intensität, aber unterschiedlich
- chaos-strength - Beide fördern Volatilität

## Verwandte Konzepte

- [[../concepts/parameter-as-oikos.md]] - Fade als Teil der Physikalischen Oikos
- [[../concepts/emergenz.md]] - Fade hemmt akkumulative Ordnung
- [[stability]] - Stark gehemmt durch Fade
- [[chaos]] - Stark gefördert durch Fade
