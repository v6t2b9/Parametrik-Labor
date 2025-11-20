---
id: param-trail-saturation
title: Trail Saturation
type: parameter
oikos: physikalische-oikos
range: 100 - 255
default: 200
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [parameter, physics, capacity, limiting]
affects:
  - "[[cluster-formation]]" # ++
  - "[[separation]]" # +
  - "[[stability]]" # ++
  - chaos # -
  - network # ++
  - fluidity # -
  - crystallinity # +
  - density # +++
related:
  - "[[deposit-amount]]"
  - "[[decay-rate]]"
  - diffusion
experiments:
  - TBD
sources:
  - "[[Parameter_Oikos_Matrix]]"
---

## Definition

**Trail Saturation** bestimmt die **maximale Intensität**, die eine Trail-Zelle erreichen kann – die "Kapazitätsgrenze" der Umwelt.

## Ökosemiotische Interpretation

`trailSaturation` ist **nicht** "technisches Limit", sondern:

**"Kapazitätsgrenzen der Umwelt"**

- `trailSaturation = 255` → Hohe Kapazität → Extreme Dichte möglich
- `trailSaturation = 100` → Niedrige Kapazität → Schnelle Sättigung, "Plateaus"

Trail Saturation strukturiert **Selbstlimitierung** – wie stark Zeichen akkumulieren können, bevor die Umwelt "voll" ist.

## Implementation

```javascript
// Nach jedem Deposit: Capping bei Saturation-Limit
trailMap[y][x].r += deposit;
trailMap[y][x].r = Math.min(trailMap[y][x].r, trailSaturation);

// RGB-Werte: 0-255
// trailSaturation = Obergrenze für jede Farbe
```

## Wertebereich

| Wert | Effekt | Typische Anwendung |
|---|---|---|
| **100-150** | Niedrige Kapazität | Schnelle Sättigung, "flache" Hotspots |
| **160-200** | Moderate Kapazität | Balancierte Dichte |
| **210-240** | Hohe Kapazität | Intensive Hotspots möglich |
| **250-255** | Maximale Kapazität | Extreme Dichte, starke Kontraste |

## Effekte auf emergente Eigenschaften

Aus der [[../meta/map-parameter-effects.md|Parameter-Oikos-Matrix]]:

| Eigenschaft | Effekt | Stärke | Erklärung |
|---|---|---|---|
| **[[cluster-formation\|Clusterbildung]]** | ⬆️ | ++ | Hohe Saturation → mehr "Kapazität" → intensivere Cluster |
| **[[separation\|Separation]]** | ⬆️ | + | Höhere Saturation → stärkere Kontraste zwischen Spezies |
| **[[stability\|Stabilität]]** | ⬆️ | ++ | Saturation stabilisiert Hotspots (keine weitere Akkumulation) |
| **Chaos** | ⬇️ | - | Saturation limitiert Varianz → weniger Chaos |
| **Network** | ⬆️ | ++ | Höhere Saturation → sichtbarere Verbindungen |
| **Fluidity** | ⬇️ | - | Saturierte Regionen ändern sich weniger |
| **Crystallinity** | ⬆️ | + | Saturation "friert" geometrische Strukturen ein |
| **Density** | ⬆️ | +++ | Hohe Saturation → mehr "Kapazität" → dichtere Hotspots möglich |

## Interaktionen mit anderen Parametern

### Saturation × [[deposit-amount|Deposit]] Capping

**Deposit wird durch Saturation limitiert**:

```yaml
# Schnelle Sättigung
deposit: 30 + trailSaturation: 100 → Hotspots erreichen Limit schnell
  - Starke Zeichensetzung
  - Niedrige Kapazität
  - Ergebnis: "Plateaus" statt "Spitzen"
  - Zeit bis Saturation: ~3-4 Deposits

# Volle Akkumulation
deposit: 30 + trailSaturation: 255 → Extreme Intensität möglich
  - Starke Zeichensetzung
  - Hohe Kapazität
  - Ergebnis: Sehr dichte "Superclusters"
  - Zeit bis Saturation: ~8-9 Deposits

# Balance
deposit: 15 + trailSaturation: 200 → Moderate Dichte
  - Moderate Zeichensetzung
  - Moderate Kapazität
  - Ergebnis: Sichtbare Hotspots ohne extreme Kontraste
  - Zeit bis Saturation: ~13-14 Deposits
```

### Saturation × Agent Count Skalierung

**Mehr Agents → schnellere Sättigung**:

```yaml
agentCount: 8000 + deposit: 20 + trailSaturation: 150 → Schnelle Sättigung
  - Viele Agents
  - Moderate Deposits
  - Niedrige Kapazität
  - Ergebnis: Hotspots sättigen in Sekunden, "einfrieren"

agentCount: 1000 + deposit: 20 + trailSaturation: 255 → Langsame Sättigung
  - Wenige Agents
  - Moderate Deposits
  - Hohe Kapazität
  - Ergebnis: Hotspots akkumulieren langsam über Minuten
```

### Saturation als Feedback-Regulator

**Selbstlimitierung verhindert unbegrenzte Akkumulation**:

```javascript
// Ohne Saturation: Theoretisch unbegrenztes Wachstum
// deposit: 30, 1000 Agents, 60 FPS
// → Nach 1 Minute: Intensität = 30 * 1000 * 3600 = 108.000.000 (!!)

// Mit Saturation: 255
// → Nach wenigen Sekunden: Intensität = 255 (gecappt)
// → Hotspot "friert ein", weitere Deposits wirkungslos
```

**Theoretische Bedeutung**: Saturation schafft **nicht-triviale Attraktoren** – Hotspots können nicht unbegrenzt wachsen

Siehe [[../concepts/emergenz.md#emergente-irreversibilität]]

## Experimentelle Befunde

### Beobachtung: Saturation-Schwellenwerte

**Unter ~150**: Hotspots sättigen sehr schnell, "flache" Cluster
**150-220**: Balancierter Bereich – Hotspots intensiv, aber nicht extrem
**Über ~220**: Extreme Kontraste, sehr dichte Cluster möglich

### Beobachtung: Saturation stabilisiert volatile Systeme

Bei niedrigem [[decay-rate|Decay]] (0.85-0.90) + hohem [[deposit-amount|Deposit]] (25-30):
- **Ohne Saturation** (255): Chaotisches Flickern, Trail-Intensität "explodiert"
- **Mit niedriger Saturation** (150): Hotspots sättigen schnell → stabilisieren → weniger Chaos

**Mechanismus**: Saturation wirkt als **Selbstregulations-Mechanismus**

## Presets mit charakteristischer Saturation

| Preset | Saturation | Deposit | Agent Count | Muster |
|---|---|---|---|---|
| **Superclusters** | 255 | 30 | 6000 | Extreme Dichte, starke Kontraste |
| **Balanced** | 200 | 20 | 3000 | Moderate Hotspots |
| **Subtle** | 120 | 10 | 2000 | Sanfte, "flache" Cluster |

## Design-Empfehlungen

### Für maximale Dichte
```yaml
trailSaturation: 240-255  # Maximal!
+ deposit: 25-30
+ agentCount: 5000-8000
+ decayRate: 0.97-0.99
```

**Ergebnis**: Extreme Dichte-Hotspots, starke Kontraste

### Für schnelle Sättigung (stabilisierend)
```yaml
trailSaturation: 100-150  # Niedrig!
+ deposit: 20-30
+ agentCount: 4000-6000
+ decayRate: 0.95-0.98
```

**Ergebnis**: Hotspots "frieren" schnell ein, stabile Plateaus

### Für balancierte Dynamik
```yaml
trailSaturation: 180-220
+ deposit: 15-20
+ agentCount: 2000-4000
+ diffusionFreq: 4-6
```

**Ergebnis**: Sichtbare Hotspots ohne extreme Kontraste

## Theoretische Bedeutung

Trail Saturation ist ein **regulierender Parameter** der **Physikalischen Oikos** weil er:

1. **Selbstlimitierung** einführt (verhindert unbegrenzte Akkumulation)
2. **Nicht-triviale Attraktoren** schafft (Hotspots "frieren" bei Saturation)
3. **Feedback-Regulation** ermöglicht (weitere Deposits wirkungslos bei Saturation)

Siehe [[../concepts/parameter-as-oikos.md#physikalische-oikos]]

## Biologische Analogien

### Carrying Capacity (Tragfähigkeit)
**Ökologie**: Maximale Populationsgröße, die Umwelt tragen kann
- Trail Saturation = Carrying Capacity
- Bei Erreichen: Kein weiteres Wachstum
- Stabilisiert System

### Neuronale Sättigung
**Action Potential Ceiling**: Neuron kann nicht unbegrenzt feuern
- Trail Saturation = Maximale Feuerrate
- Verhindert "Explosion"
- Selbstregulation

### Speicher-Kapazität
**Computer-RAM**: Begrenzte Kapazität
- Trail Saturation = RAM-Limit
- Bei Voll: Weitere Writes überschreiben/ignoriert
- System "friert" in gewissem Zustand

## Saturation als Emergenz-Limitierung

**Ohne Saturation**: Theoretisch **unbegrenzte Emergenz**
- Muster könnten unbegrenzt intensivieren
- Keine Stabilisierung
- Mathematisch instabil

**Mit Saturation**: **Begrenzte Emergenz**
- Muster stabilisieren bei Saturation
- Selbstregulation
- Mathematisch stabil (bounded)

**Philosophische Implikation**: Emergenz braucht **Grenzen** – unbegrenzte Akkumulation ≠ Ordnung

## RGB-Implementierungs-Details

```javascript
// RGB-Farbmodell: Jede Komponente 0-255
trailMap[y][x] = {
  r: 0,  // Red:   0-255
  g: 0,  // Green: 0-255
  b: 0   // Blue:  0-255
};

// Saturation gilt pro Komponente
trailMap[y][x].r = Math.min(trailMap[y][x].r + deposit, trailSaturation);

// Für Multi-Species:
// - Spezies Rot nutzt .r
// - Spezies Grün nutzt .g
// - Spezies Blau nutzt .b
```

**Technische Implikation**: Saturation < 255 reduziert effektiven Farbraum

## Offene Fragen

1. **Species-specific Saturation**: Sollten verschiedene Spezies verschiedene Saturation-Limits haben?
2. **Spatial-varying Saturation**: Was, wenn verschiedene Regionen verschiedene Kapazitäten haben ("Ressourcen-Gradienten")?
3. **Dynamic Saturation**: Sollte Saturation von globalen Faktoren abhängen (z.B. niedriger bei hoher Agent-Dichte)?

## Verwandte Parameter

- [[deposit-amount]] - **Direkt limitiert** durch Saturation
- [[decay-rate]] - Zusammen mit Saturation definiert Gleichgewichts-Intensität
- diffusion - Saturation limitiert auch diffundierte Werte
- agent-count - Mehr Agents → schnellere Sättigung

## Verwandte Konzepte

- [[../concepts/parameter-as-oikos.md]] - Saturation als Teil der Physikalischen Oikos
- [[../concepts/emergenz.md]] - Saturation schafft nicht-triviale Attraktoren
- [[density]] - Primäre emergente Eigenschaft
- [[stability]] - Saturation stabilisiert durch "Einfrieren"
