---
id: param-agent-speed
title: Agent Speed
type: parameter
oikos: temporale-oikos
range: 0.5 - 5.0
default: 1.5
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [parameter, temporal, dynamics, chaos, fluidity]
affects:
  - "[[cluster-formation]]" # +
  - "[[separation]]" # +
  - "[[stability]]" # -
  - chaos # +++
  - network # +
  - fluidity # +++
  - crystallinity # -
  - density # +
related:
  - agent-count
  - turn-speed
  - chaos-interval
  - "[[decay-rate]]"
experiments:
  - TBD
sources:
  - "[[Parameter_Oikos_Matrix]]"
---

## Definition

**Agent Speed** bestimmt die **Geschwindigkeit der Bewegung** – wie viele Pixel ein Agent pro Frame zurücklegt.

## Ökosemiotische Interpretation

`speed` ist **nicht** "Bewegungsgeschwindigkeit", sondern:

**"Temporale Dichte der Zeichensetzung und Perzeption"**

- `speed = 5.0` → Schnelle Bewegung → Volatile Muster → Hohe Dynamik
- `speed = 0.5` → Langsame Bewegung → Stabile Muster → Niedrige Dynamik

Speed strukturiert die **temporale Dynamik** des ökosemiotischen Systems – wie schnell sich Muster verändern.

## Implementation

```javascript
// Jeder Frame: Agent bewegt sich in aktuelle Richtung
agent.x += Math.cos(agent.angle) * speed;
agent.y += Math.sin(agent.angle) * speed;

// Höhere Speed → mehr Trail-Deposits pro Zeit
// → Höhere "Zeichen-Frequenz"
```

## Wertebereich

| Wert | Effekt | Typische Anwendung |
|---|---|---|
| **0.5-1.0** | Langsame Bewegung | Stabile, kristalline Muster |
| **1.5-2.0** | Moderate Bewegung | Balancierte Dynamik |
| **2.5-3.5** | Schnelle Bewegung | Volatile, fluide Muster |
| **4.0-5.0** | Sehr schnelle Bewegung | Chaotische, ephemere Muster |

## Effekte auf emergente Eigenschaften

Aus der [[../meta/map-parameter-effects.md|Parameter-Oikos-Matrix]]:

| Eigenschaft | Effekt | Stärke | Erklärung |
|---|---|---|---|
| **[[cluster-formation\|Clusterbildung]]** | ⬆️ | + | Schnellere Konvergenz auf Hotspots |
| **[[separation\|Separation]]** | ⬆️ | + | Schnellere Bildung räumlicher Grenzen |
| **[[stability\|Stabilität]]** | ⬇️ | - | Hohe Speed → weniger Zeit für Muster-Konsolidierung |
| **Chaos** | ⬆️ | +++ | Hohe Speed → schnelle Bewegung → volatile Muster |
| **Netzwerk** | ⬆️ | + | Schnellere Exploration → mehr Verbindungen |
| **Fluidität** | ⬆️ | +++ | Hohe Speed → dynamische Veränderung → fließende Übergänge |
| **Kristallinität** | ⬇️ | - | Schnelle Bewegung → weniger geometrische Akkumulation |
| **Dichte** | ⬆️ | + | Mehr Deposits pro Zeit → schnellere Hotspot-Bildung |

## Interaktionen mit anderen Parametern

### Speed × [[decay-rate|Decay]] Balance

**Trade-off**: Schnelle Bewegung braucht hohen Decay für Stabilität

```yaml
speed: 3.0 + decayRate: 0.99 → Fluide, aber kohärente Muster
  - Schnelle Bewegung (Speed)
  - Aber: Trails bleiben erhalten (Decay)
  - Ergebnis: "Lavalampe"-Effekt

speed: 3.0 + decayRate: 0.85 → Chaos
  - Schnelle Bewegung (Speed)
  - Trails verschwinden schnell (Decay)
  - Ergebnis: Keine Muster stabilisieren
```

### Speed × Agent Count Skalierung

**Dichte-Effekt**: Mehr Agents + höhere Speed = höhere Interaktionsrate

```yaml
speed: 2.0 + agentCount: 8000 → Maximale Dichte
  - Viele schnelle Agents
  - Hohe Deposit-Frequenz
  - Ergebnis: Schnelle Saturation, intensive Hotspots

speed: 0.8 + agentCount: 1000 → Sparse Exploration
  - Wenige langsame Agents
  - Niedrige Deposit-Frequenz
  - Ergebnis: Langsame Muster-Emergenz
```

### Speed × Turn Speed Synergie

**Beweglichkeit**: Beide Parameter zusammen definieren Agilität

```yaml
speed: 3.0 + turnSpeed: 0.8 → Hochdynamisch, reaktiv
  - Schnelle Bewegung
  - Schnelle Richtungswechsel
  - Ergebnis: Erratische, fluide Muster

speed: 1.0 + turnSpeed: 0.2 → Träge, stabil
  - Langsame Bewegung
  - Langsame Richtungswechsel
  - Ergebnis: Smooth, gerichtete Trails
```

## Theoretische Bedeutung

Speed ist ein **zentraler Parameter** der **Temporalen Oikos** weil er:

1. **Temporale Frequenz** definiert (Wie oft pro Zeit werden Zeichen gesetzt?)
2. **Exploration vs. Exploitation** balanciert (Schnell = Exploration, Langsam = Exploitation)
3. **Dynamik-Regime** strukturiert (Langsam = Statisch, Schnell = Chaotisch)

Siehe [[../concepts/parameter-as-oikos.md#temporale-oikos]] für theoretischen Kontext.

## Experimentelle Befunde

### Beobachtung: Speed-Schwellenwerte

**Unter ~1.0**: Muster emergieren sehr langsam, aber sind stabil
**1.0-2.5**: Optimaler Bereich für balancierte Dynamik
**2.5-3.5**: Hohe Fluidität, schwache Stabilität
**Über ~3.5**: Chaotisch, ephemer, schwer kontrollierbar

### Beobachtung: Speed × FPS Abhängigkeit

**Performance-Effekt**: Hohe Speed erhöht FPS-Anforderungen
- Bei FPS drops → effektive Speed sinkt
- Adaptive Optimierung reduziert Agent Count bei hoher Speed

## Presets mit charakteristischer Speed

| Preset | Speed | Decay | Muster |
|---|---|---|---|
| **Lavalampe** | 1.5 | 0.99 | Fließende, organische Formen |
| **Digital Rain** | 2.5 | 0.92 | Schnelle, fallende Trails |
| **Kristallwachstum** | 0.8 | 0.98 | Langsame, geometrische Akkumulation |

## Design-Empfehlungen

### Für maximales Chaos
```yaml
speed: 3.0-5.0
+ fadeStrength: 0.3
+ chaosInterval: 150
+ chaosStrength: 0.9
+ turnSpeed: 0.7-1.0
```

### Für maximale Fluidität
```yaml
speed: 2.0-3.0
+ diffusionFreq: 8
+ turnSpeed: 0.6
+ sensorAngle: 0.8
+ decayRate: 0.96-0.99
```

### Für stabile, langsame Emergenz
```yaml
speed: 0.5-1.0
+ decayRate: 0.98-0.999
+ deposit: 20-30
+ turnSpeed: 0.2-0.4
```

## Performance-Implikationen

### GPU-Load Korrelation

Höhere Speed → mehr Bewegung → mehr Trail-Updates → höhere GPU-Last

**Adaptive Optimizer** reagiert:
```javascript
if (fps < 30 && speed > 2.0) {
  // Reduziere Agent Count statt Speed
  // Um Muster-Charakteristik zu erhalten
}
```

### Optimale Speed für verschiedene FPS-Ziele

| FPS-Ziel | Empfohlene Max Speed | Agent Count |
|---|---|---|
| **30 FPS** | 2.0 | 1000-3000 |
| **60 FPS** | 3.0 | 2000-5000 |
| **120 FPS** | 4.0 | 3000-8000 |

## Biologische Analogien

### Ameisen
- **Speed = Laufgeschwindigkeit**
- Langsam (~0.5-1.0): Akkurate Trail-Following
- Schnell (~2.0-3.0): Schnelle Exploration

### Bakterien (Chemotaxis)
- **Speed = Schwimmgeschwindigkeit**
- "Run and Tumble": Hohe Speed + hohe Turn Speed
- Balanciert Exploration und Gradient-Climbing

### Soziale Medien
- **Speed = Posting-Frequenz**
- Hohe Speed (Twitter): Volatile, ephemere Trends
- Niedrige Speed (Blogs): Stabile, persistente Diskurse

## Offene Fragen

1. **Optimale Speed für Emergenz**: Gibt es eine optimale Speed, die Muster-Emergenz maximiert?
2. **Speed-Heterogenität**: Was passiert, wenn verschiedene Agents verschiedene Speeds haben?
3. **Adaptive Speed**: Sollte Speed von lokaler Trail-Dichte abhängen (langsamer in Hotspots)?

## Verwandte Parameter

- `turnSpeed` - Synergistischer Effekt auf Agilität
- `agentCount` - Speed × Count = Interaktionsrate
- [[decay-rate]] - Anti-korreliert mit Speed für Stabilität
- `chaosInterval` - Beide fördern Dynamik/Chaos

## Verwandte Konzepte

- [[../concepts/parameter-as-oikos.md]] - Speed als Teil der Temporalen Oikos
- [[../concepts/emergenz.md]] - Speed als Dynamik-Treiber
- [[stability]] - Anti-korrelierte emergente Eigenschaft
- [[cluster-formation]] - Schnellere Konvergenz bei höherer Speed
