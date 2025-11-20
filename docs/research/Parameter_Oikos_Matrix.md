# Parameter-Oikos-Matrix

```yaml
---
title: Parameter-Oikos-Matrix
type: Aggregiertes Wissen (Matrix View)
status: Living Document
created: 2025-11-08
last_updated: 2025-11-20
tags:
  - parameter-oikos
  - emergente-eigenschaften
  - systematisches-wissen
  - matrix
related:
  - "[[../zettelkasten/meta/map-parameter-effects]]"
  - "[[Experimentelle_Sektion_Index]]"
  - "[[Von_Stigmergie_zu_Oekosemiotik]]"
---
```

> **📚 Single Source of Truth**: Detaillierte Parameter-Definitionen findest du im [Zettelkasten](../zettelkasten/README.md).
> Dieses Dokument bietet eine **Matrix-Übersicht** und **Design-Rezepte** für praktische Anwendung.

---

## Über diese Matrix

Die **Parameter-Oikos-Matrix** bietet eine **tabellarische Übersicht** über Parameter-Effekte auf emergente Eigenschaften.

### Prinzip

Jede Zelle repräsentiert die **beobachtete Stärke des Effekts** eines bestimmten Parameters auf eine emergente Eigenschaft.

**Notation**:
- `+++` = **starker fördernder Effekt**
- `++` = **moderater fördernder Effekt**
- `+` = **schwacher fördernder Effekt**
- `~` = **neutraler/ambivalenter Effekt**
- `-` = **schwacher hemmender Effekt**
- `--` = **moderater hemmender Effekt**
- `---` = **starker hemmender Effekt**
- `?` = **noch nicht untersucht**

### Verwendung

1. **Vor Experiment**: Prüfe aktuelle Matrix-Einträge für Kontext
2. **Nach Experiment**: Update relevante Zellen basierend auf Beobachtungen
3. **Für Theorie**: Identifiziere Muster über Parameter-Dimensionen hinweg
4. **Für Design**: Nutze [Muster-Rezepte](#muster-rezepte-parameter-kombinationen) zur gezielten Muster-Erzeugung

### Verbindung zum Zettelkasten

Für **detaillierte Informationen**:
- **Parameter**: Siehe [Parameters](../zettelkasten/README.md#parameters) (15 atomare Notizen)
- **Emergente Eigenschaften**: Siehe [Properties](../zettelkasten/README.md#properties) (8 atomare Notizen)
- **Umfassende MOC**: [Parameter-Effects-Map](../zettelkasten/meta/map-parameter-effects.md) ⭐⭐⭐

---

## Hauptmatrix: Parameter × Emergente Eigenschaften

### Legende Emergente Eigenschaften

Detaillierte Definitionen in `zettelkasten/properties/`:

| Eigenschaft | Kurz-Beschreibung | Zettelkasten-Link |
|------------|-------------------|-------------------|
| **Clusterbildung** | Räumlich konzentrierte, homogene Gruppen | [cluster-formation.md](../zettelkasten/properties/cluster-formation.md) |
| **Separation** | Räumliche Trennung verschiedener Spezies | [separation.md](../zettelkasten/properties/separation.md) |
| **Stabilität** | Zeitliche Persistenz emergenter Strukturen | [stability.md](../zettelkasten/properties/stability.md) |
| **Chaos** | Irregularität, Unvorhersagbarkeit | [chaos.md](../zettelkasten/properties/chaos.md) |
| **Netzwerk** | Verzweigte, verbundene Strukturen | [network.md](../zettelkasten/properties/network.md) |
| **Fluidität** | Kontinuierliche Formveränderung | [fluidity.md](../zettelkasten/properties/fluidity.md) |
| **Kristallinität** | Geometrische, hochgeordnete Muster | [crystallinity.md](../zettelkasten/properties/crystallinity.md) |
| **Dichte** | Konzentration von Trail-Intensität | [density.md](../zettelkasten/properties/density.md) |

---

## Matrix: Physikalische Oikos

Detaillierte Parameter-Infos: [Physikalische Oikos](../zettelkasten/README.md#physikalische-oikos-4-parameter) im Zettelkasten

|  Parameter       | Cluster | Separation | Stabilität | Chaos | Netzwerk | Fluidität | Kristallinität | Dichte | Zettelkasten |
|------------------|---------|------------|------------|-------|----------|-----------|----------------|--------|--------------|
| **Decay Rate** ⭐ | +++     | +          | +++        | ---   | ++       | -         | +++            | ++     | [Link](../zettelkasten/parameters/decay-rate.md) |
| **Diffusion**     | ++      | --         | +          | ++    | +        | +++       | --             | -      | [Link](../zettelkasten/parameters/diffusion.md) |
| **Fade Strength** | -       | +          | --         | +++   | -        | ++        | ---            | --     | [Link](../zettelkasten/parameters/fade-strength.md) |
| **Trail Saturation**| ++    | +          | ++         | -     | ++       | -         | +              | +++    | [Link](../zettelkasten/parameters/trail-saturation.md) |

**Experiment-Links**: [[Experiment_Decay_Rate_Variation]] | [[Experiment_Decay_x_Diffusion]]

---

## Matrix: Semiotische Oikos

Detaillierte Parameter-Infos: [Semiotische Oikos](../zettelkasten/README.md#semiotische-oikos-4-parameter) im Zettelkasten

|  Parameter       | Cluster | Separation | Stabilität | Chaos | Netzwerk | Fluidität | Kristallinität | Dichte | Zettelkasten |
|------------------|---------|------------|------------|-------|----------|-----------|----------------|--------|--------------|
| **Sensor Distance** ⭐ | + | +++        | +          | +     | +++      | +         | -              | +      | [Link](../zettelkasten/parameters/sensor-distance.md) |
| **Sensor Angle**  | ++      | +          | -          | ++    | +        | ++        | -              | +      | [Link](../zettelkasten/parameters/sensor-angle.md) |
| **Deposit**       | ++      | +          | +++        | -     | ++       | -         | ++             | +++    | [Link](../zettelkasten/parameters/deposit-amount.md) |
| **Turn Speed**    | +       | +          | -          | +++   | +        | +++       | -              | -      | [Link](../zettelkasten/parameters/turn-speed.md) |

**Experiment-Links**: [[Experiment_Sensor_Distance_Variation]]

---

## Matrix: Temporale Oikos

Detaillierte Parameter-Infos: [Temporale Oikos](../zettelkasten/README.md#temporale-oikos-4-parameter) im Zettelkasten

|  Parameter       | Cluster | Separation | Stabilität | Chaos | Netzwerk | Fluidität | Kristallinität | Dichte | Zettelkasten |
|------------------|---------|------------|------------|-------|----------|-----------|----------------|--------|--------------|
| **Agent Speed**   | +       | +          | -          | +++   | +        | +++       | -              | +      | [Link](../zettelkasten/parameters/agent-speed.md) |
| **Agent Count**   | +++     | -          | +          | +     | ++       | +         | -              | +++    | [Link](../zettelkasten/parameters/agent-count.md) |
| **Chaos Interval**| -       | -          | ---        | +++   | -        | ++        | ---            | -      | [Link](../zettelkasten/parameters/chaos-interval.md) |
| **Chaos Strength**| -       | +          | --         | +++   | -        | +         | --             | -      | [Link](../zettelkasten/parameters/chaos-strength.md) |

**Experiment-Links**: [[Experiment_Agent_Count_Skalierung]] | [[Experiment_Chaos_Injection_Periodizität]]

---

## Matrix: Resonanz-Oikos

Detaillierte Parameter-Infos: [Resonanz-Oikos](../zettelkasten/README.md#resonanz-oikos-3-parameter) im Zettelkasten

|  Parameter       | Cluster | Separation | Stabilität | Chaos | Netzwerk | Fluidität | Kristallinität | Dichte | Zettelkasten |
|------------------|---------|------------|------------|-------|----------|-----------|----------------|--------|--------------|
| **Attraction Strength** ⭐ | +++ | ---  | +          | +     | -        | +         | +              | ++     | [Link](../zettelkasten/parameters/attraction-strength.md) |
| **Repulsion Strength** ⭐  | --- | +++  | -          | ++    | -        | +         | -              | -      | [Link](../zettelkasten/parameters/repulsion-strength.md) |
| **Cross-Species Interaction** ⭐ | ~ | ++ | -      | +     | +        | ++        | -              | +      | [Link](../zettelkasten/parameters/cross-species-interaction.md) |

**Experiment-Links**: [[Experiment_Resonanz_Harmonie_Schwelle]]

---

## Muster-Rezepte (Parameter-Kombinationen)

Basierend auf Matrix-Erkenntnissen: **Wie erzeugt man gezielt bestimmte Muster?**

### Rezept: Maximale Clusterbildung
```yaml
Ziel: Homogene, dichte Cluster

Empfohlene Parameter:
  decayRate: 0.99          # +++
  agentCount: 5000         # +++
  attractionStrength: 1.8  # +++
  deposit: 25              # ++
  diffusionFreq: 5         # ++

Begründung:
  Hoher Decay + hohe Agent-Dichte + starke Attraction
  → Agents folgen alten Spuren intensiv
  → Cluster-Verstärkung

Siehe auch: cluster-formation.md im Zettelkasten
```

### Rezept: Maximale Separation
```yaml
Ziel: Räumlich getrennte Territorien

Empfohlene Parameter:
  sensorDist: 40           # +++
  repulsionStrength: -0.9  # +++
  crossSpeciesInteraction: true  # ++
  sensorAngle: 0.6         # +

Begründung:
  Große Sensor-Reichweite + starke Repulsion
  → Agents "sehen" andere Spezies und meiden sie aktiv
  → Klare räumliche Trennung

Siehe auch: separation.md im Zettelkasten
Kritischer Schwellenwert: Harmonie-Schwelle bei Repulsion ≈ -0.5
```

### Rezept: Maximale Stabilität
```yaml
Ziel: Zeitlich persistente Strukturen

Empfohlene Parameter:
  decayRate: 0.98          # +++
  deposit: 30              # +++
  fadeStrength: 0.05       # -- (niedrig!)
  chaosInterval: 0         # --- (aus!)

Begründung:
  Hoher Decay + hoher Deposit + minimales Fade
  → Spuren bleiben sehr lange erhalten
  → Stabile, unveränderliche Muster

Siehe auch: stability.md im Zettelkasten
```

### Rezept: Maximales Chaos
```yaml
Ziel: Irregulär, unvorhersagbar, dynamisch

Empfohlene Parameter:
  fadeStrength: 0.3        # +++
  speed: 3.0               # +++
  chaosInterval: 150       # +++
  chaosStrength: 0.9       # +++
  turnSpeed: 0.8           # +++

Begründung:
  Aggressive Löschung + hohe Geschwindigkeit + Chaos-Injection
  → Keine Zeit für Muster-Stabilisierung
  → Permanente Turbulenz

Siehe auch: chaos.md im Zettelkasten
Paradox: Moderate Chaos-Injection kann Makro-Stabilität erhöhen!
```

### Rezept: Maximale Netzwerk-Bildung
```yaml
Ziel: Verzweigte, verbundene Strukturen

Empfohlene Parameter:
  sensorDist: 35           # +++
  decayRate: 0.94          # ++
  agentCount: 2500         # ++
  deposit: 20              # ++

Begründung:
  Große Sensor-Reichweite + moderate Agent-Dichte
  → "Fernverbindungen" zwischen Trail-Segmenten
  → Verzweigte Netzwerke statt isolierte Cluster

Siehe auch: network.md im Zettelkasten
```

### Rezept: Maximale Fluidität
```yaml
Ziel: Kontinuierliche, organische Formveränderung

Empfohlene Parameter:
  diffusionFreq: 8         # +++
  speed: 2.0               # +++
  turnSpeed: 0.6           # +++
  sensorAngle: 0.8         # ++

Begründung:
  Hohe Diffusion + hohe Geschwindigkeit
  → Trails "fließen" räumlich
  → Organische, nie stabile Formen

Siehe auch: fluidity.md im Zettelkasten
```

### Rezept: Maximale Kristallinität
```yaml
Ziel: Geometrisch, starr, hochgeordnet

Empfohlene Parameter:
  decayRate: 0.99          # +++
  diffusionFreq: 1         # -- (niedrig!)
  deposit: 25              # ++
  sensorAngle: 0.2         # - (eng!)
  chaosInterval: 0         # --- (aus!)

Begründung:
  Sehr hoher Decay + minimale Diffusion + enge Sensoren
  → Scharfe Kanten + stabile Geometrie
  → Kristalline Strukturen

Siehe auch: crystallinity.md im Zettelkasten
Kritischer Schwellenwert: Decay ~0.94 für kristalline Transition
```

---

## Meta-Muster: Cross-Oikos-Effekte

### Beobachtung 1: Decay × Diffusion Trade-off

**Muster**: Hoher Decay + hohe Diffusion = Balance zwischen Stabilität und Fluidität

```
decayRate: 0.99 + diffusionFreq: 8 → "Lavalampe"
  - Stabil genug für Formen (Decay)
  - Fluid genug für Bewegung (Diffusion)
```

**Theoretische Implikation**:
Physikalische Oikos-Parameter arbeiten **komplementär**, nicht additiv.

**Siehe auch**: [Parameter-Effects-Map](../zettelkasten/meta/map-parameter-effects.md) → Parameter-Interdependenzen

---

### Beobachtung 2: Attraction/Repulsion Harmonie-Schwelle

**Muster**: Umschlagpunkt bei Repulsion ≈ -0.5

```
attractionStrength: 1.5 + repulsionStrength: -0.3 → Clusterbildung
attractionStrength: 1.5 + repulsionStrength: -0.7 → Segregation
```

**Theoretische Implikation**:
Es gibt **kritische Schwellenwerte**, an denen emergente Eigenschaften qualitativ umschlagen.

**Experimente**: [[Experiment_Resonanz_Harmonie_Schwelle]]

**Siehe auch**: [repulsion-strength.md](../zettelkasten/parameters/repulsion-strength.md) → Harmonie-Schwelle

---

### Beobachtung 3: Chaos-Injection-Paradox

**Muster**: Moderate Chaos-Injection kann Stabilität **erhöhen** (Loop-Breaking)

```
chaosInterval: 0 + hoher turnSpeed → Massen-Pulsieren (instabil)
chaosInterval: 300 + hoher turnSpeed → Desynchronisiert → stabiler!
```

**Theoretische Implikation**:
"Störung" ist nicht immer destabilisierend – kann **Diversität erhöhen** und dadurch robustere Muster erzeugen.

**Siehe auch**: [chaos-interval.md](../zettelkasten/parameters/chaos-interval.md) → Chaos-Injection Paradox

---

## Offene Fragen für Matrix-Erweiterung

### Noch nicht untersuchte Zellen

- [ ] **Diffusion × Separation**: Systematische Variation fehlt
- [ ] **Sensor Angle × Kristallinität**: Hypothese: Enger Winkel → geometrischere Muster?
- [ ] **Turn Speed × Dichte**: Hypothese: Schneller Turn → weniger lokale Akkumulation?
- [ ] **Cross-Species × alle Eigenschaften**: Nur partielle Daten

### Noch nicht erfasste Emergente Eigenschaften

**Kandidaten für Matrix-Erweiterung**:
- **Symmetrie**: Grad der Spiegelung/Rotation in Mustern
- **Periodizität**: Wiederkehrende zeitliche Muster
- **Fraktale Selbstähnlichkeit**: Multi-Scale-Struktur → [fractal-dimension.md](../zettelkasten/metrics/fractal-dimension.md) (Metrik in Planung)
- **Robustheit**: Widerstand gegen Parameter-Perturbation

### Meta-Fragen

1. **Universalität**: Gelten Matrix-Einträge über verschiedene Modi (Myzel/Stigmergie/Resonanz) hinweg? → Siehe [mode-comparison.md](../zettelkasten/experiments/mode-comparison.md)
2. **Skalierung**: Wie ändern sich Effekte bei verschiedenen Grid-Sizes?
3. **Zeitabhängigkeit**: Sind Effekte nach 500 vs. 2000 Schritten gleich?

---

## Verwendung für Theorieentwicklung

### Pattern Recognition über Oikos-Dimensionen

**Beobachtung**: Parameter, die **Gedächtnis** erhöhen (Decay, Deposit), fördern systematisch Stabilität und Kristallinität.

**Theoretische Hypothese**:
```
Gedächtnis-Parameter → Temporale Ausdehnung → Akkumulative Ordnung
```

**Siehe auch**: [Theoretical-Framework-Map](../zettelkasten/meta/map-theoretical-framework.md)

---

### Trade-offs identifizieren

**Beispiel**: Man kann nicht gleichzeitig maximale Stabilität UND maximales Chaos haben.

```
Stabilität ∝ 1/Chaos
```

Aber: Man kann **balancierte** Zustände erreichen (moderate Werte beider).

**Siehe auch**: [Parameter-Effects-Map](../zettelkasten/meta/map-parameter-effects.md) → Emergente Eigenschaft-Familien

---

### Emergente Eigenschaft "Familien"

**Familie 1: Ordnung**
- Stabilität, Kristallinität, Dichte → korreliert
- Gefördert durch: Hoher Decay, hoher Deposit, niedriger Fade

**Familie 2: Dynamik**
- Chaos, Fluidität → korreliert
- Gefördert durch: Hoher Fade, hohe Speed, Chaos-Injection

**Familie 3: Soziale Struktur**
- Clusterbildung vs. Separation → anti-korreliert
- Kontrolliert durch: Resonanz-Parameter

**Detailliert dokumentiert in**: [Parameter-Effects-Map](../zettelkasten/meta/map-parameter-effects.md)

---

## Update-Log

### 2025-11-20: Zettelkasten-Integration
- **Aggressive Reduktion**: Redundante Parameter-Definitionen durch Links ersetzt
- Matrix-Tabellen erweitert um Zettelkasten-Spalte
- Legende verlinkt auf Properties
- Alle Abschnitte mit Zettelkasten-Links ergänzt
- ~220 Zeilen Redundanz eliminiert

### 2025-11-08: Initial Matrix
- Grundstruktur erstellt
- Initiale Einträge basierend auf Preset-Beobachtungen (v3.1)
- Muster-Rezepte hinzugefügt

---

## Verbindungen

### Zettelkasten (Single Source of Truth)
- **Haupt-MOC**: [Parameter-Effects-Map](../zettelkasten/meta/map-parameter-effects.md) ⭐⭐⭐
- **Alle Parameter**: [Parameters](../zettelkasten/README.md#parameters) (15 Notizen)
- **Alle Properties**: [Properties](../zettelkasten/README.md#properties) (8 Notizen)
- **Zettelkasten-Index**: [README](../zettelkasten/README.md)

### Legacy-Dokumentation
- **Experimentelle Sektion**: [[Experimentelle_Sektion_Index]]
- **Theorie**: [[Von_Stigmergie_zu_Oekosemiotik]]
- **Templates**: [[Template_Parameter_Experiment]]

---

*Diese Matrix bietet eine tabellarische Übersicht und praktische Design-Rezepte. Für detaillierte Definitionen siehe [Zettelkasten](../zettelkasten/README.md). Sie wird kontinuierlich durch experimentelle Ergebnisse aktualisiert.*
