---
id: moc-parameter-effects
title: Map of Content - Parameter Effects Matrix
type: map-of-content
status: living-document
created: 2025-11-20
updated: 2025-11-20
tags: [moc, matrix, parameter-effects, aggregation]
related:
  - "[[../concepts/parameter-as-oikos.md]]"
  - "[[Parameter_Oikos_Matrix]]"
sources:
  - "[[Parameter_Oikos_Matrix]]"
  - All atomic parameter and property notes
---

## Purpose

This **Map of Content (MOC)** serves as the central hub for understanding how [[../concepts/parameter-as-oikos.md|Parameter-Oikos]] affect [[../concepts/emergenz.md|emergent properties]] in the ökosemiotisches System.

## Navigation

### By Parameter Type
- **[[#physikalische-oikos|Physikalische Oikos]]** - Materialität der Spuren
- **[[#semiotische-oikos|Semiotische Oikos]]** - Wahrnehmungs- und Handlungsradius
- **[[#temporale-oikos|Temporale Oikos]]** - Dynamik und Bevölkerungsdichte
- **[[#resonanz-oikos|Resonanz-Oikos]]** - Affektive Beziehungen

### By Emergent Property
- **[[../properties/cluster-formation.md|Clusterbildung]]**
- **[[../properties/separation.md|Separation]]**
- **[[../properties/stability.md|Stabilität]]**
- Chaos, Netzwerk, Fluidität, Kristallinität, Dichte

### Cross-Cutting Patterns
- **[[#kritische-schwellenwerte|Kritische Schwellenwerte]]**
- **[[#parameter-interdependenzen|Parameter-Interdependenzen]]**
- **[[#emergente-eigenschaft-familien|Emergente Eigenschaft-Familien]]**

---

## Matrix: Physikalische Oikos

|  Parameter       | [[../properties/cluster-formation.md\|Cluster]] | [[../properties/separation.md\|Separation]] | [[../properties/stability.md\|Stabilität]] | Chaos | Netzwerk | Fluidität | Kristallinität | Dichte |
|------------------|---------|------------|------------|-------|----------|-----------|----------------|--------|
| **[[../parameters/decay-rate.md\|Decay Rate]]**   | +++ | + | +++ | --- | ++ | - | +++ | ++ |
| **Diffusion Freq**| ++ | -- | + | ++ | + | +++ | -- | - |
| **Fade Strength**| - | + | -- | +++ | - | ++ | --- | -- |
| **Trail Saturation**| ++ | + | ++ | - | ++ | - | + | +++ |

### Notation
- `+++` = **starker fördernder Effekt**
- `++` = **moderater fördernder Effekt**
- `+` = **schwacher fördernder Effekt**
- `~` = **neutraler/ambivalenter Effekt**
- `-` = **schwacher hemmender Effekt**
- `--` = **moderater hemmender Effekt**
- `---` = **starker hemmender Effekt**

### Key Parameters

#### [[../parameters/decay-rate.md|Decay Rate]] (0.85 - 0.999)
**Ökosemiotische Bedeutung**: Temporaler Horizont des Gedächtnisses

**Starke Effekte**:
- **[[../properties/cluster-formation.md|Clusterbildung]] (+++)**: Hoher Decay → Trails bleiben lange → Cluster-Verstärkung
- **[[../properties/stability.md|Stabilität]] (+++)**: Lange Gedächtnis-Horizonte → stabile Strukturen
- **Kristallinität (+++)**: Sehr hoher Decay + niedrige Diffusion → geometrische Muster
- **Chaos (---)**: Hoher Decay reduziert Chaos (Vergangenheit strukturiert Gegenwart)

**Kritischer Schwellenwert**: Umschlagpunkt bei **~0.94** zwischen volatilen und stabilen Regimes

---

## Matrix: Semiotische Oikos

|  Parameter       | [[../properties/cluster-formation.md\|Cluster]] | [[../properties/separation.md\|Separation]] | [[../properties/stability.md\|Stabilität]] | Chaos | Netzwerk | Fluidität | Kristallinität | Dichte |
|------------------|---------|------------|------------|-------|----------|-----------|----------------|--------|
| **[[../parameters/sensor-distance.md\|Sensor Distance]]**| + | +++ | + | + | +++ | + | - | + |
| **Sensor Angle** | ++ | + | - | ++ | + | ++ | - | + |
| **[[../parameters/deposit-amount.md\|Deposit]]**      | ++ | + | +++ | - | ++ | - | ++ | +++ |
| **Turn Speed**   | + | + | - | +++ | + | +++ | - | - |

### Key Parameters

#### [[../parameters/sensor-distance.md|Sensor Distance]] (5 - 50)
**Ökosemiotische Bedeutung**: Radius des zeichenvermittelten Handlungsraums

**Starke Effekte**:
- **[[../properties/separation.md|Separation]] (+++)**: Große Sensor Distance → Agents "sehen" weit → aktive Separation möglich
- **Netzwerk (+++)**: Große Sensor Distance → "Fernverbindungen" möglich → verzweigte Strukturen

**Theoretische Implikation**: Separation **erfordert Fernwahrnehmung**

#### [[../parameters/deposit-amount.md|Deposit Amount]] (1 - 30)
**Ökosemiotische Bedeutung**: Stärke der Umwelt-Modifikation durch Zeichensetzung

**Starke Effekte**:
- **[[../properties/stability.md|Stabilität]] (+++)**: Hoher Deposit → starke Spuren → lange Wirkung
- **Dichte (+++)**: Hoher Deposit → schnelle Akkumulation → dichte Hotspots

**Synergie**: Deposit × [[../parameters/decay-rate.md|Decay]] verstärken beide Gedächtnis-Effekt

---

## Matrix: Temporale Oikos

|  Parameter       | [[../properties/cluster-formation.md\|Cluster]] | [[../properties/separation.md\|Separation]] | [[../properties/stability.md\|Stabilität]] | Chaos | Netzwerk | Fluidität | Kristallinität | Dichte |
|------------------|---------|------------|------------|-------|----------|-----------|----------------|--------|
| **[[../parameters/agent-speed.md\|Speed]]**        | + | + | - | +++ | + | +++ | - | + |
| **Agent Count**  | +++ | - | + | + | ++ | + | - | +++ |
| **Chaos Interval**| - | - | --- | +++ | - | ++ | --- | - |
| **Chaos Strength**| - | + | -- | +++ | - | + | -- | - |

### Key Parameters

#### [[../parameters/agent-speed.md|Agent Speed]] (0.5 - 5.0)
**Ökosemiotische Bedeutung**: Temporale Dichte der Zeichensetzung

**Starke Effekte**:
- **Chaos (+++)**: Hohe Speed → schnelle Bewegung → volatile Muster
- **Fluidität (+++)**: Hohe Speed → dynamische Veränderung → fließende Übergänge

**Trade-off**: Schnelle Bewegung braucht hohen [[../parameters/decay-rate.md|Decay]] für Stabilität

---

## Matrix: Resonanz-Oikos

|  Parameter       | [[../properties/cluster-formation.md\|Cluster]] | [[../properties/separation.md\|Separation]] | [[../properties/stability.md\|Stabilität]] | Chaos | Netzwerk | Fluidität | Kristallinität | Dichte |
|------------------|---------|------------|------------|-------|----------|-----------|----------------|--------|
| **[[../parameters/attraction-strength.md\|Attraction Strength]]**| +++ | --- | + | + | - | + | + | ++ |
| **Repulsion Strength**| --- | +++ | - | ++ | - | + | - | - |
| **Cross-Species Interaction**| ~ | ++ | - | + | + | ++ | - | + |

### Key Parameters

#### [[../parameters/attraction-strength.md|Attraction Strength]] (0.0 - 2.0)
**Ökosemiotische Bedeutung**: Grad der Selbst-Resonanz (siehe [[../concepts/resonanz.md]])

**Starke Effekte**:
- **[[../properties/cluster-formation.md|Clusterbildung]] (+++)**: Hohe Attraction → Agents folgen eigenen Spuren → homogene Cluster
- **[[../properties/separation.md|Separation]] (---)**: Hohe Attraction zu eigener Spezies → **ABER**: Bei starker Repulsion SOWOHL Cluster ALS AUCH Separation!

**Komplexe Beziehung**: Anti-Korrelation ist **bedingt** (nur bei schwacher Repulsion)

#### Repulsion Strength (-1.0 - 1.0)
**Ökosemiotische Bedeutung**: Grad der Fremd-Resonanz (siehe [[../concepts/resonanz.md]])

**Starke Effekte**:
- **[[../properties/separation.md|Separation]] (+++)**: Starke negative Repulsion → aktive Vermeidung → Territorien
- **[[../properties/cluster-formation.md|Clusterbildung]] (---)**: **NUR bei schwacher Attraction**

**Kritischer Schwellenwert**: **Harmonie-Schwelle** bei `repulsion ≈ -0.5`

---

## Kritische Schwellenwerte

### 1. Decay-Rate Umschlagpunkt (~0.94)

```yaml
decayRate < 0.94 → Volatile Regime
  - Stabilität: Niedrig
  - Muster: Kurzlebig
  - Chaos: Hoch

decayRate > 0.94 → Stabile Regime
  - Stabilität: Hoch
  - Muster: Persistent
  - Chaos: Niedrig
```

**Theoretische Bedeutung**: Qualitative Veränderung am Schwellenwert, nicht nur graduell

Siehe [[../parameters/decay-rate.md#experimentelle-befunde]]

### 2. Harmonie-Schwelle bei Repulsion (~-0.5)

```yaml
attractionStrength: 1.5 (konstant)

repulsionStrength > -0.5 → Harmonie/Clusterbildung
  - Clusterbildung: Dominant
  - Separation: Minimal
  - Muster: Homogene Cluster, durchmischt

repulsionStrength < -0.5 → Konflikt/Segregation
  - Separation: Dominant
  - Clusterbildung: **Bleibt erhalten** (sowohl Cluster als auch Territorien)
  - Muster: Homogene Cluster in getrennten Territorien
```

**Theoretische Bedeutung**: Kritischer Punkt, an dem [[../concepts/resonanz.md|Resonanz-Dynamik]] qualitativ umschlägt

Siehe [[../properties/separation.md#kritische-interaktion-attraction--repulsion]]

### 3. Sensor-Distance Schwelle für Separation (~20-25)

```yaml
sensorDist < 20 → Lokale Interaktion
  - Separation: Nicht möglich
  - Muster: Zufällige Vermischung

sensorDist > 25 → Fernwahrnehmung
  - Separation: Möglich (wenn Repulsion < 0)
  - Muster: Territoriale Grenzen
```

**Theoretische Bedeutung**: [[../properties/separation.md|Separation]] **erfordert** Fernwahrnehmung

Siehe [[../parameters/sensor-distance.md]]

---

## Parameter-Interdependenzen

### Cross-Oikos-Effekt 1: Decay × Diffusion Trade-off

**Muster**: Hoher Decay + hohe Diffusion = Balance zwischen Stabilität und Fluidität

```yaml
decayRate: 0.99 + diffusionFreq: 8 → "Lavalampe"
  - Stabil genug für Formen (Decay)
  - Fluid genug für Bewegung (Diffusion)
  - Emergentes Muster: Organische, fließende Strukturen
```

**Theoretische Implikation**: Physikalische Oikos-Parameter arbeiten **komplementär**, nicht additiv

Siehe [[../parameters/decay-rate.md#interaktionen-mit-anderen-parametern]]

### Cross-Oikos-Effekt 2: Attraction/Repulsion Dynamik

**Muster**: Hohe Attraction + starke Repulsion = SOWOHL Cluster ALS AUCH Separation

```yaml
attractionStrength: 1.8 + repulsionStrength: -0.8
  → Selbst-Resonanz (Clusterbildung)
  → UND Fremd-Abstoßung (Separation)
  → Emergentes Muster: Homogene Cluster in getrennten Territorien
```

**Theoretische Implikation**: [[../properties/cluster-formation.md|Clusterbildung]] und [[../properties/separation.md|Separation]] sind **nicht immer anti-korreliert**

Siehe [[../concepts/resonanz.md#emergente-resonanz-muster]]

### Cross-Oikos-Effekt 3: Speed × Decay Balance

**Muster**: Schnelle Bewegung braucht hohen Decay für Stabilität

```yaml
speed: 3.0 + decayRate: 0.99 → Fluide, aber kohärente Muster
  - Schnelle Bewegung (Temporale Oikos)
  - Trails bleiben erhalten (Physikalische Oikos)
  - Emergentes Muster: Dynamische Stabilität

speed: 3.0 + decayRate: 0.85 → Chaos
  - Schnelle Bewegung
  - Trails verschwinden schnell
  - Emergentes Muster: Keine Stabilisierung möglich
```

**Theoretische Implikation**: Oikos-Dimensionen müssen **balanciert** sein für bestimmte emergente Muster

Siehe [[../parameters/agent-speed.md#interaktionen-mit-anderen-parametern]]

### Cross-Oikos-Effekt 4: Chaos-Injection-Paradox

**Muster**: Moderate Chaos-Injection kann Stabilität **erhöhen** (Loop-Breaking)

```yaml
chaosInterval: 0 + turnSpeed: 0.8 → Massen-Pulsieren (instabil)
  - Alle Agents synchronisiert
  - Kollektive Oszillation
  - Ergebnis: Niedrige temporale Stabilität

chaosInterval: 300 + turnSpeed: 0.8 → Desynchronisiert → stabiler!
  - Chaos-Injection bricht Synchronisation
  - Agents diversifiziert
  - Ergebnis: Höhere Makro-Stabilität durch Mikro-Chaos
```

**Theoretische Implikation**: "Störung" ist nicht immer destabilisierend – kann **Diversität erhöhen**

Siehe [[../properties/stability.md#chaos-injection-paradox]]

### Synergie: Deposit × Decay für Gedächtnis

**Beide Parameter verstärken Gedächtnis-Effekt**:

```yaml
deposit: 30 + decayRate: 0.99 → Maximale Stabilität
  - Starke Zeichensetzung (Deposit)
  - Lange Persistenz (Decay)
  - Ergebnis: Quasi-permanente Strukturen

deposit: 5 + decayRate: 0.85 → Maximale Volatilität
  - Schwache Zeichensetzung
  - Kurze Persistenz
  - Ergebnis: Ephemere, chaotische Muster
```

Siehe [[../parameters/deposit-amount.md#deposit--decay-synergie]]

---

## Emergente Eigenschaft-Familien

### Familie 1: Ordnung
**Korrelierte Eigenschaften**:
- [[../properties/stability.md|Stabilität]]
- [[../properties/cluster-formation.md|Clusterbildung]] (bei hoher Attraction)
- Kristallinität
- Dichte

**Gefördert durch**:
- Hoher [[../parameters/decay-rate.md|Decay]] (0.98-0.999)
- Hoher [[../parameters/deposit-amount.md|Deposit]] (25-30)
- Niedriger Fade (0.05-0.1)
- Kein Chaos (Interval = 0)

**Theoretische Interpretation**: Parameter, die **Gedächtnis** erhöhen, fördern systematisch akkumulative Ordnung

### Familie 2: Dynamik
**Korrelierte Eigenschaften**:
- Chaos
- Fluidität

**Gefördert durch**:
- Hoher Fade (0.2-0.3)
- Hohe [[../parameters/agent-speed.md|Speed]] (2.5-5.0)
- Chaos-Injection (Interval 50-200)
- Hoher Turn Speed (0.7-1.0)

**Theoretische Interpretation**: Parameter, die **Vergessen** beschleunigen, fördern Volatilität

### Familie 3: Soziale Struktur
**Anti-korrelierte Eigenschaften**:
- [[../properties/cluster-formation.md|Clusterbildung]] vs. [[../properties/separation.md|Separation]] (bedingt)

**Kontrolliert durch**:
- [[../parameters/attraction-strength.md|Attraction Strength]] (Selbst-Resonanz)
- Repulsion Strength (Fremd-Resonanz)
- [[../parameters/sensor-distance.md|Sensor Distance]] (Wahrnehmungsreichweite)

**Theoretische Interpretation**: [[../concepts/resonanz.md|Resonanz-Oikos]] strukturiert affektive Geometrie

**Komplexität**: Bei hoher Attraction + starker Repulsion → **BEIDE** Eigenschaften gleichzeitig

---

## Design-Rezepte

Diese Rezepte dienen als **Ausgangspunkt** für gezielte Muster-Erzeugung.

### Rezept: Maximale [[../properties/cluster-formation.md|Clusterbildung]]
```yaml
Ziel: Homogene, dichte Cluster

Parameter:
  decayRate: 0.99          # +++
  agentCount: 5000         # +++
  attractionStrength: 1.8  # +++
  deposit: 25              # ++
  diffusionFreq: 5         # ++

Begründung:
  Hoher Decay + hohe Agent-Dichte + starke Attraction
  → Agents folgen alten Spuren intensiv
  → Cluster-Verstärkung
```

### Rezept: Maximale [[../properties/separation.md|Separation]]
```yaml
Ziel: Räumlich getrennte Territorien

Parameter:
  sensorDist: 40           # +++
  repulsionStrength: -0.9  # +++
  crossSpeciesInteraction: true  # ++
  attractionStrength: 1.5  # Ermöglicht auch Cluster in Territorien
  sensorAngle: 0.6         # +

Begründung:
  Große Sensor-Reichweite + starke Repulsion
  → Agents "sehen" andere Spezies und meiden sie aktiv
  → Klare räumliche Trennung
```

### Rezept: Maximale [[../properties/stability.md|Stabilität]]
```yaml
Ziel: Zeitlich persistente Strukturen

Parameter:
  decayRate: 0.98          # +++
  deposit: 30              # +++
  fadeStrength: 0.05       # -- (niedrig!)
  chaosInterval: 0         # --- (aus!)
  speed: 0.8               # - (langsam)

Begründung:
  Hoher Decay + hoher Deposit + minimales Fade
  → Spuren bleiben sehr lange erhalten
  → Stabile, unveränderliche Muster
```

### Rezept: Maximales Chaos
```yaml
Ziel: Irregulär, unvorhersagbar, dynamisch

Parameter:
  fadeStrength: 0.3        # +++
  speed: 3.0               # +++
  chaosInterval: 150       # +++
  chaosStrength: 0.9       # +++
  turnSpeed: 0.8           # +++
  decayRate: 0.88          # --- (niedrig!)

Begründung:
  Aggressive Löschung + hohe Geschwindigkeit + Chaos-Injection
  → Keine Zeit für Muster-Stabilisierung
  → Permanente Turbulenz
```

---

## Verwendung für Theorieentwicklung

### Pattern Recognition über Oikos-Dimensionen

**Beobachtung**: Parameter, die **Gedächtnis** erhöhen (Decay, Deposit), fördern systematisch [[../properties/stability.md|Stabilität]] und Kristallinität.

**Theoretische Hypothese**:
```
Gedächtnis-Parameter → Temporale Ausdehnung → Akkumulative Ordnung
```

Siehe [[../concepts/parameter-as-oikos.md]]

### Trade-offs identifizieren

**Beispiel**: Man kann nicht gleichzeitig maximale [[../properties/stability.md|Stabilität]] UND maximales Chaos haben.

```
Stabilität ∝ 1/Chaos
```

**Aber**: Man kann **balancierte** Zustände erreichen (moderate Werte beider) → "Dynamische Stabilität"

### Kritische Schwellenwerte als Phasenübergänge

**Physik-Analogie**: Wie Wasser bei 0°C von fest zu flüssig übergeht, zeigen ökosemiotische Systeme **qualitative Umschlagpunkte**:

- Decay ≈ 0.94: Volatil ↔ Stabil
- Repulsion ≈ -0.5: Harmonie ↔ Konflikt
- Sensor Distance ≈ 20-25: Lokal ↔ Global

**Theoretische Bedeutung**: [[../concepts/emergenz.md|Emergente Eigenschaften]] sind **nicht linear** in Parametern

---

## Experimentelle Validierung

Diese Matrix aggregiert Befunde aus:

- [[../experiments/Experiment_Decay_Rate_Variation.md]] - Decay-Effekte validiert
- [[../experiments/Experiment_Resonanz_Harmonie_Schwelle.md]] - Harmonie-Schwelle validiert
- [[../experiments/Experiment_Agent_Count_Skalierung.md]] - Skalierungs-Effekte
- [[../experiments/Experiment_Chaos_Injection_Periodizität.md]] - Chaos-Paradox
- [[../experiments/Experiment_Sensor_Distance_Variation.md]] (geplant) - Sensor-Distance-Effekte

Offene Fragen und fehlende Experimente sind in den jeweiligen Parameter-/Property-Notes dokumentiert.

---

## Related Maps

- [[../concepts/parameter-as-oikos.md]] - Theoretischer Rahmen
- [[../concepts/emergenz.md]] - Was Parameter-Oikos ermöglichen
- [[../concepts/resonanz.md]] - Resonanz-Oikos im Detail
- [[Parameter_Oikos_Matrix]] - Original-Dokumentation (nicht-atomar)

---

## Maintenance

**Aktualisierung**: Diese MOC wird kontinuierlich aktualisiert basierend auf:
1. Neuen experimentellen Befunden
2. Neuen atomaren Notizen (Parameter/Properties)
3. Erkenntnissen aus Kreuzvalidierung

**Letzte Updates**:
- 2025-11-20: Initiale MOC-Erstellung basierend auf atomaren Notizen
