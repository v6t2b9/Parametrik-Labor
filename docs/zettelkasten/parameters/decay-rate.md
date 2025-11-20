---
id: param-decay-rate
title: Decay Rate
type: parameter
oikos: physikalische-oikos
range: 0.85 - 0.999
default: 0.95
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [parameter, physics, temporal, memory, persistence]
affects:
  - "[[cluster-formation]]" # +++
  - "[[stability]]" # +++
  - "[[separation]]" # +
  - chaos # ---
  - network # ++
  - fluidity # -
  - crystallinity # +++
  - density # ++
related:
  - "[[diffusion]]"
  - "[[fade-strength]]"
  - "[[deposit-amount]]"
experiments:
  - "[[Experiment_Decay_Rate_Variation]]"
sources:
  - "[[Parameter_Oikos_Matrix]]"
---

## Definition

**Decay Rate** bestimmt, wie schnell Trail-Intensität über Zeit abnimmt. Repräsentiert die **zeitliche Persistenz** von Zeichen in der Umwelt.

## Ökosemiotische Interpretation

`decayRate` ist **nicht** "wie schnell Spuren verschwinden", sondern:

**"Wie lange bleibt Vergangenheit handlungsleitend?"**

- `decayRate = 0.99` → Lange Gedächtnis-Horizonte → Stabile Muster
- `decayRate = 0.85` → Kurze Gedächtnis-Horizonte → Volatile Muster

Decay strukturiert den **Gedächtnis-Horizont** des ökosemiotischen Systems.

## Implementation

```javascript
// Jeder Frame: Trail-Intensität wird mit decayRate multipliziert
newTrailMap[y][x].r = cell.r * decayRate;
newTrailMap[y][x].g = cell.g * decayRate;
newTrailMap[y][x].b = cell.b * decayRate;
```

## Wertebereich

| Wert | Effekt | Typische Anwendung |
|---|---|---|
| **0.999** | Sehr langsamer Zerfall | Maximale Stabilität, kristalline Muster |
| **0.98-0.99** | Langsamer Zerfall | Stabile Netzwerke, "Nervensystem" |
| **0.94-0.97** | Moderater Zerfall | Balancierte Dynamik, "Lavalampe" |
| **0.90-0.93** | Schneller Zerfall | Volatile Muster, schnelle Veränderung |
| **0.85-0.89** | Sehr schneller Zerfall | Chaos, minimales Gedächtnis |

## Effekte auf emergente Eigenschaften

Aus der [[../meta/map-parameter-effects.md|Parameter-Oikos-Matrix]]:

| Eigenschaft | Effekt | Stärke | Erklärung |
|---|---|---|---|
| **[[cluster-formation\|Clusterbildung]]** | ⬆️ | +++ | Hoher Decay → Trails bleiben lange → Agents folgen alten Spuren → Cluster-Verstärkung |
| **[[stability\|Stabilität]]** | ⬆️ | +++ | Hoher Decay → lange Gedächtnis-Horizonte → stabile Strukturen |
| **[[separation\|Separation]]** | ⬆️ | + | Stabile Trails ermöglichen klarere Territoriengrenzen |
| **Chaos** | ⬇️ | --- | Hoher Decay reduziert Chaos (Vergangenheit strukturiert Gegenwart) |
| **Netzwerk** | ⬆️ | ++ | Persistente Trails → verzweigte, verbundene Strukturen |
| **Fluidität** | ⬇️ | - | Lange Gedächtnis → weniger Formveränderung |
| **Kristallinität** | ⬆️ | +++ | Sehr hoher Decay (0.98-0.99) + niedrige Diffusion → kristalline Strukturen |
| **Dichte** | ⬆️ | ++ | Akkumulation über Zeit → dichtere Hotspots |

## Interaktionen mit anderen Parametern

### Decay × [[diffusion|Diffusion]] Trade-off

**Beobachtetes Muster**: Hoher Decay + hohe Diffusion = Balance zwischen Stabilität und Fluidität

```yaml
decayRate: 0.99 + diffusionFreq: 8 → "Lavalampe"
  - Stabil genug für Formen (Decay)
  - Fluid genug für Bewegung (Diffusion)
```

**Theoretische Implikation**: Physikalische Oikos-Parameter arbeiten **komplementär**, nicht additiv.

### Decay × [[deposit-amount|Deposit]] Synergie

**Beide verstärken Gedächtnis-Effekt**:
```yaml
decayRate: 0.99 + deposit: 30 → Maximale Stabilität
decayRate: 0.85 + deposit: 5 → Maximale Volatilität
```

## Experimentelle Befunde

### Experiment: [[Experiment_Decay_Rate_Variation]]

**Setup**: Systematische Variation von Decay (0.85 → 0.999) bei konstanten anderen Parametern

**Befunde**:
1. **Umschlagpunkt bei ~0.94**: Unterhalb volatil, oberhalb stabil
2. **Clusterbildung**: Linear steigend mit Decay
3. **Muster-Typen**:
   - 0.85-0.90: Chaos, keine stabilen Strukturen
   - 0.91-0.94: Volatile Netzwerke
   - 0.95-0.97: Stabile Netzwerke
   - 0.98-0.999: Kristalline Strukturen

Siehe vollständiges Experiment: [[Experiment_Decay_Rate_Variation]]

## Presets mit charakteristischem Decay

| Preset | Decay | Muster |
|---|---|---|
| **Lavalampe** | 0.99 | Fließende, organische Formen |
| **Nervensystem** | 0.94 | Verzweigte, stabile Netzwerke |
| **Kristallwachstum** | 0.98 | Geometrische Strukturen |
| **Plasma Dream** | 0.96 | Balancierte Dynamik |

## Design-Empfehlungen

### Für maximale Stabilität
```yaml
decayRate: 0.98-0.999
+ deposit: 25-30
+ fadeStrength: 0.05
+ chaosInterval: 0
```

### Für maximales Chaos
```yaml
decayRate: 0.85-0.90
+ fadeStrength: 0.3
+ speed: 3.0
+ chaosInterval: 150
```

### Für balancierte Dynamik
```yaml
decayRate: 0.94-0.97
+ diffusionFreq: 5-8
+ deposit: 15-20
```

## Theoretische Bedeutung

Decay ist der **zentrale Parameter** der **Physikalischen Oikos** weil er:

1. **Temporale Ausdehnung** definiert (Gedächtnis-Horizont)
2. **Akkumulative Ordnung** ermöglicht (Stabilität)
3. **Irreversibilität** verstärkt (mehr Schritte → mehr Komplexität)

Siehe [[../concepts/parameter-as-oikos.md#physikalische-oikos]] für theoretischen Kontext.

## Offene Fragen

1. **Kontinuität**: Gibt es einen exakten Phasenübergang zwischen volatilen und stabilen Regimes?
2. **Skalierung**: Wie ändert sich der optimale Decay-Wert bei verschiedenen Grid-Größen?
3. **Zeitabhängigkeit**: Konvergieren Muster bei sehr hohem Decay gegen statische Attraktoren?

## Verwandte Parameter

- [[diffusion]] - Komplementärer Effekt (räumlich vs. temporal)
- [[fade-strength]] - Beschleunigt Decay-Effekt
- [[deposit-amount]] - Synergistischer Effekt auf Stabilität
- [[agent-speed]] - Anti-korreliert mit Decay-Effektivität

## Verwandte Konzepte

- [[../concepts/parameter-as-oikos.md]] - Decay als Teil der Physikalischen Oikos
- [[../concepts/emergenz.md]] - Decay als Ermöglicher von Stabilität
- [[stability]] - Primäre emergente Eigenschaft
- [[cluster-formation]] - Stark gefördert durch hohen Decay
