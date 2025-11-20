---
id: param-deposit-amount
title: Deposit Amount
type: parameter
oikos: semiotische-oikos
range: 1 - 30
default: 10
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [parameter, semiotics, signaling, intensity]
affects:
  - "[[cluster-formation]]" # ++
  - "[[separation]]" # +
  - "[[stability]]" # +++
  - chaos # -
  - network # ++
  - fluidity # -
  - crystallinity # ++
  - density # +++
related:
  - "[[decay-rate]]"
  - "[[sensor-distance]]"
  - fade-strength
experiments:
  - TBD
sources:
  - "[[Parameter_Oikos_Matrix]]"
---

## Definition

**Deposit Amount** bestimmt die **Intensität der Zeichensetzung** – wie stark Agenten Trails hinterlassen, wenn sie sich bewegen.

## Ökosemiotische Interpretation

`deposit` ist **nicht** "wie viel Farbe abgelegt wird", sondern:

**"Stärke der Umwelt-Modifikation durch Zeichensetzung"**

- `deposit = 30` → Starke Zeichen → Lange Wirkung → Stabile Strukturen
- `deposit = 5` → Schwache Zeichen → Kurze Wirkung → Volatile Muster

Deposit strukturiert die **Zeichenintensität** – wie stark Agenten ihre Umwelt durch Handlung modifizieren.

## Implementation

```javascript
// Jeder Agent hinterlässt pro Frame einen Trail
trailMap[y][x].r += deposit * (species === 'red' ? 1 : 0);
trailMap[y][x].g += deposit * (species === 'green' ? 1 : 0);
trailMap[y][x].b += deposit * (species === 'blue' ? 1 : 0);

// Mit Saturation-Limit
trailMap[y][x].r = Math.min(trailMap[y][x].r, trailSaturation);
```

## Wertebereich

| Wert | Effekt | Typische Anwendung |
|---|---|---|
| **1-5** | Sehr schwache Zeichen | Minimales Gedächtnis, volatile Muster |
| **8-15** | Moderate Zeichen | Balancierte Dynamik |
| **20-25** | Starke Zeichen | Stabile Strukturen, dichte Hotspots |
| **28-30** | Sehr starke Zeichen | Maximale Stabilität, schnelle Saturation |

## Effekte auf emergente Eigenschaften

Aus der [[../meta/map-parameter-effects.md|Parameter-Oikos-Matrix]]:

| Eigenschaft | Effekt | Stärke | Erklärung |
|---|---|---|---|
| **[[cluster-formation\|Clusterbildung]]** | ⬆️ | ++ | Hoher Deposit → starke Spuren → Agents konvergieren auf Hotspots |
| **[[separation\|Separation]]** | ⬆️ | + | Starke eigene Spuren → klarere Territoriengrenzen |
| **[[stability\|Stabilität]]** | ⬆️ | +++ | Hoher Deposit → starke Spuren → lange Wirkung → stabile Strukturen |
| **Chaos** | ⬇️ | - | Starke Zeichen → konsistentere Muster → weniger Chaos |
| **Netzwerk** | ⬆️ | ++ | Starke Trails → sichtbare Verbindungen → verzweigte Strukturen |
| **Fluidität** | ⬇️ | - | Starke Zeichen → "klebriger" → weniger Formveränderung |
| **Kristallinität** | ⬆️ | ++ | Hoher Deposit + hoher Decay → scharfe, geometrische Strukturen |
| **Dichte** | ⬆️ | +++ | Hoher Deposit → schnelle Akkumulation → dichte Hotspots |

## Interaktionen mit anderen Parametern

### Deposit × [[decay-rate|Decay]] Synergie

**Beide verstärken Gedächtnis-Effekt**:

```yaml
deposit: 30 + decayRate: 0.99 → Maximale Stabilität
  - Starke Zeichensetzung (Deposit)
  - Lange Persistenz (Decay)
  - Ergebnis: Quasi-permanente Strukturen

deposit: 5 + decayRate: 0.85 → Maximale Volatilität
  - Schwache Zeichensetzung (Deposit)
  - Kurze Persistenz (Decay)
  - Ergebnis: Ephemere, chaotische Muster
```

### Deposit × Trail Saturation Balancing

**Saturation limitiert Deposit-Effekt**:

```yaml
deposit: 30 + trailSaturation: 100 → Schnelle Saturation
  - Hotspots erreichen Limit schnell
  - Weitere Deposits wirkungslos
  - Ergebnis: "Plateaus" statt "Spitzen"

deposit: 30 + trailSaturation: 255 → Volle Akkumulation
  - Hotspots können extrem intensiv werden
  - Starke Kontraste
  - Ergebnis: Dichte "Superclusters"
```

### Deposit × [[sensor-distance|Sensor Distance]] Trade-off

**Signaling vs. Sensing**:

```yaml
deposit: 25 + sensorDist: 10 → Lokal, intensiv
  - Starke Zeichen, kurze Reichweite
  - Ergebnis: Isolierte, dichte Cluster

deposit: 10 + sensorDist: 40 → Global, diffus
  - Schwache Zeichen, große Reichweite
  - Ergebnis: Weitreichende, dünnere Netzwerke
```

## Experimentelle Befunde

### Beobachtung: Deposit-Schwellenwerte

**Unter ~8**: Patterns können nicht stabilisieren (zu schwache Zeichen)
**8-15**: Dynamische Balance
**15-25**: Stabile Strukturen
**Über ~25**: Schnelle Saturation, "Einfrieren"

## Presets mit charakteristischem Deposit

| Preset | Deposit | Muster |
|---|---|---|
| **Kristallwachstum** | 25 | Geometrische, dichte Strukturen |
| **Lavalampe** | 15 | Balancierte Fluidität |
| **Nervensystem** | 20 | Verzweigte, moderate Dichte |

## Design-Empfehlungen

### Für maximale Stabilität
```yaml
deposit: 25-30
+ decayRate: 0.98-0.999
+ fadeStrength: 0.05
+ chaosInterval: 0
```

### Für maximale Dichte
```yaml
deposit: 28-30
+ agentCount: 5000-8000
+ trailSaturation: 255
+ sensorDist: 15-25
```

### Für volatile, chaotische Muster
```yaml
deposit: 3-8
+ decayRate: 0.85-0.90
+ fadeStrength: 0.3
+ speed: 2.5-3.5
```

## Theoretische Bedeutung

Deposit ist ein **zentraler Parameter** der **Semiotischen Oikos** weil er:

1. **Zeichenintensität** definiert (Wie stark modifizieren Agenten ihre Umwelt?)
2. **Akkumulative Dynamik** steuert (Zusammen mit Decay)
3. **Feedback-Stärke** determiniert (Stärkere Zeichen → stärkeres Feedback)

Siehe [[../concepts/parameter-as-oikos.md#semiotische-oikos]] für theoretischen Kontext.

## Balance: Deposit vs. Decay vs. Fade

**Drei Parameter steuern Trail-Lebenszyklus**:

```
Deposit → Trail entsteht (Zeichensetzung)
   ↓
Decay → Trail persistiert (Gedächtnis)
   ↓
Fade → Trail verschwindet (Vergessen)
```

**Optimale Balance** hängt von gewünschtem Muster ab:
- **Stabilität**: Hoher Deposit, hoher Decay, niedriger Fade
- **Dynamik**: Moderater Deposit, moderater Decay, moderater Fade
- **Chaos**: Niedriger Deposit, niedriger Decay, hoher Fade

## Biologische Analogien

### Ameisen
- **Deposit = Pheromon-Menge** pro Schritt
- Höhere Deposit bei Nahrungsfund
- Variable Deposit für verschiedene Pheromon-Typen

### Pflanzen (VOC-Signaling)
- **Deposit = Emissions-Rate** von flüchtigen organischen Verbindungen
- Stress erhöht Deposit (Herbivoren-Angriff)
- Deposit variiert zwischen Spezies

### Soziale Medien
- **Deposit = Posting-Frequenz**
- Power-User haben hohen "Deposit"
- Lurkers haben niedrigen "Deposit"

## Offene Fragen

1. **Species-specific Deposit**: Was passiert, wenn verschiedene Spezies verschiedene Deposit-Werte haben?
2. **Adaptive Deposit**: Sollte Deposit von lokalem Trail-Gradient abhängen?
3. **Deposit × Agent Count**: Wie sollte Deposit skalieren mit Bevölkerungsdichte?

## Verwandte Parameter

- [[decay-rate]] - Synergistischer Effekt auf Stabilität
- `trailSaturation` - Limitiert Deposit-Effekt
- `fadeStrength` - Antagonistischer Effekt (Löschen vs. Setzen)
- [[sensor-distance]] - Trade-off zwischen Signaling und Sensing

## Verwandte Konzepte

- [[../concepts/parameter-as-oikos.md]] - Deposit als Teil der Semiotischen Oikos
- [[../concepts/stigmergy.md]] - Deposit als Kern-Mechanismus der Stigmergie
- [[stability]] - Primäre emergente Eigenschaft
- [[cluster-formation]] - Sekundäre emergente Eigenschaft
