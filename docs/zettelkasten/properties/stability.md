---
id: property-stability
title: Stabilität
type: emergent-property
category: dynamic
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [emergence, stability, persistence, temporal]
promoted_by:
  - "[[decay-rate]]" # +++
  - "[[deposit-amount]]" # +++
  - trail-saturation # ++
  - "[[attraction-strength]]" # +
  - "[[sensor-distance]]" # +
inhibited_by:
  - chaos-interval # ---
  - fade-strength # --
  - chaos-strength # --
  - turn-speed # -
  - "[[agent-speed]]" # -
  - repulsion-strength # -
related:
  - "[[cluster-formation]]" # Korreliert
  - crystallinity # Korreliert
  - chaos # Anti-korreliert
  - fluidity # Anti-korreliert
experiments:
  - "[[Experiment_Decay_Rate_Variation]]"
  - "[[Experiment_Chaos_Injection_Periodizität]]"
sources:
  - "[[Parameter_Oikos_Matrix]]"
---

## Definition

**Stabilität** ist die emergente **zeitliche Persistenz** von Strukturen und Mustern im ökosemiotischen System.

## Charakteristika

### Visuelle Merkmale
- **Konsistenz**: Muster ändern sich wenig über Zeit
- **Geometrische Klarheit**: Scharfe, definierte Strukturen
- **Persistente Hotspots**: Gleiche Regionen bleiben intensiv
- **Minimal

e Fluktuation**: Wenig Rauschen oder Flackern

### Quantifizierung

**Temporale Korrelation**:
```javascript
// Vergleiche Frame t mit Frame t+k
// Höhere Korrelation = höhere Stabilität
stability = correlate(frame_t, frame_t_plus_k)

// Werte:
// 0.9-1.0 = sehr stabil (fast keine Veränderung)
// 0.7-0.9 = moderat stabil
// 0.5-0.7 = volatil
// <0.5 = chaotisch
```

**Pattern-Varianz**:
```javascript
// Varianz der Trail-Intensitäten über Zeit
// Niedrigere Varianz = höhere Stabilität
variance = std(trailIntensities, timeWindow)
```

## Parameter-Einflüsse

### Starke Förderer (+++)

#### [[decay-rate|Decay Rate]] (0.98-0.999)
**Mechanismus**: Hoher Decay → lange Gedächtnis-Horizonte → stabile Strukturen

```yaml
decayRate: 0.99 vs 0.85
  → 0.99: Muster bleiben über 1000+ Frames konsistent
  → 0.85: Muster ändern sich alle 100-200 Frames
```

**Theoretische Interpretation**: Decay strukturiert **temporale Ausdehnung** – wie lange die Vergangenheit die Gegenwart strukturiert.

#### [[deposit-amount|Deposit Amount]] (25-30)
**Mechanismus**: Hoher Deposit → starke Spuren → lange Wirkung → stabile Strukturen

```yaml
deposit: 30 vs 5
  → 30: Trails akkumulieren schnell → stabile Hotspots
  → 5: Trails bleiben schwach → keine Stabilisierung
```

### Moderate Förderer (++)
- **Trail Saturation** (200-255): Limitiert Varianz, "einfrieren" von Hotspots
- **[[decay-rate|Decay]]** × **[[deposit-amount|Deposit]]** Synergie: Beide verstärken Gedächtnis-Effekt

### Starke Inhibitoren (---)

#### Chaos Interval (50-500)
**Mechanismus**: Regelmäßige Chaos-Injektion → verhindert Muster-Stabilisierung

```yaml
chaosInterval: 0 vs 200
  → 0: Muster stabilisieren unbegrenzt
  → 200: Alle 200 Frames Störung → keine Langzeit-Stabilität
```

**Theoretische Interpretation**: Chaos-Injektion ist **Perturbation** der Parameter-Oikos – reset der akkumulierten Ordnung.

#### Fade Strength (0.2-1.0)
**Mechanismus**: Hohe Fade → aggressive Löschung → destabilisiert Muster

```yaml
fadeStrength: 0.05 vs 0.3
  → 0.05: Minimales Löschen → maximale Stabilität
  → 0.3: Aggressives Löschen → volatile Muster
```

#### Chaos Strength (0.5-1.0)
**Mechanismus**: Hohe Strength → starke Störungen → reduziert Stabilität

## Emergenz-Mechanismus

### Akkumulation + Persistenz

```
1. Agent setzt Zeichen (Deposit)
     ↓
2. Zeichen persistiert (hoher Decay, niedriger Fade)
     ↓
3. Andere Agents reagieren auf Zeichen
     ↓
4. Akkumulierte Zeichen strukturieren Handlung
     ↓
5. Muster konsolidiert sich
     ↓
[Stabilität als emergente Eigenschaft]
```

**Temporale Ausdehnung**: Stabilität entsteht, wenn **Vergangenheit** lange **handlungsleitend** bleibt.

### Chaos-Injection-Paradox

**Paradoxe Beobachtung**: Moderate Chaos-Injection kann Stabilität **erhöhen** (Loop-Breaking)

```yaml
chaosInterval: 0 + turnSpeed: 0.8 → Massen-Pulsieren (instabil!)
  - Alle Agents synchronisiert
  - Kollektive Oszillation
  - Ergebnis: Niedrige temporale Stabilität

chaosInterval: 300 + turnSpeed: 0.8 → Desynchronisiert → stabiler!
  - Chaos-Injection bricht Synchronisation
  - Agents diversifiziert
  - Ergebnis: Höhere Makro-Stabilität durch Mikro-Chaos
```

**Theoretische Implikation**: "Störung" ist nicht immer destabilisierend – kann **Diversität erhöhen** und dadurch robustere Muster erzeugen.

## Typen von Stabilität

### Typ 1: Statische Stabilität (Kristalline)
**Parameter**:
```yaml
decayRate: 0.99
deposit: 30
fadeStrength: 0.05
chaosInterval: 0
speed: 0.5-1.0
```

**Charakteristik**: Muster ändern sich **fast gar nicht** – "eingefrorene" Strukturen

**Risiko**: Zu stabil → keine Exploration → lokale Optima

### Typ 2: Dynamische Stabilität (Fluide)
**Parameter**:
```yaml
decayRate: 0.96
deposit: 15
diffusionFreq: 6
speed: 1.5-2.0
```

**Charakteristik**: Muster ändern **Form**, aber **Topologie** bleibt konsistent

**Vorteil**: Balance zwischen Stabilität und Exploration

### Typ 3: Robuste Stabilität (Resilient)
**Parameter**:
```yaml
decayRate: 0.97
chaosInterval: 300
chaosStrength: 0.5
agentCount: 4000
```

**Charakteristik**: Muster **erholen sich** nach Störungen

**Vorteil**: Widerstandsfähig gegen Perturbationen

## Stabilität vs. Andere Eigenschaften

### Korreliert (positiv)
- **[[cluster-formation|Clusterbildung]]**: Stabile Cluster
- **Crystallinity**: Geometrische Stabilität
- **Dichte**: Stabile Hotspots

### Anti-korreliert (negativ)
- **Chaos**: Definitionsgemäß gegensätzlich
- **Fluidity**: Formveränderung vs. Persistenz
- **[[agent-speed|Speed]]**: Schnelle Bewegung → weniger Stabilisierung

## Biologische Analogien

### Ameisen (Trail-Stabilität)
- Hohe Pheromon-Persistenz → stabile Highways
- Niedrige Persistenz → volatile Exploration
- Stabilität ermöglicht **effiziente Ausbeutung** von Ressourcen

### Ökosysteme (Climax-Community)
- Hohe Stabilität = Climax-Stadium
- Niedrige Stabilität = Pioneer-Stadium
- Stabilität entsteht durch **akkumulierte Nischen-Konstruktion**

### Soziale Institutionen
- Hohe Stabilität = Etablierte Normen, Routinen
- Niedrige Stabilität = Innovation, Disruption
- Stabilität durch **akkumulierte Praxis** (Bourdieu: Habitus)

## Experimentelle Befunde

### Experiment: [[Experiment_Decay_Rate_Variation]]

**Befund**: Stabilität zeigt **Schwellenwert-Verhalten** bei Decay ≈ 0.94

```yaml
decayRate < 0.94 → Volatile Muster (Stabilität < 0.6)
decayRate > 0.94 → Stabile Muster (Stabilität > 0.8)
```

**Umschlagpunkt**: Qualitative Veränderung bei kritischer Decay-Rate

### Experiment: [[Experiment_Chaos_Injection_Periodizität]]

**Befund**: Optimale Chaos-Interval für Robustheit ≈ 250-350 Frames

```yaml
chaosInterval: 0 → Statisch stabil (aber fragil)
chaosInterval: 250-350 → Dynamisch stabil (robust)
chaosInterval: 50-100 → Instabil (zu viele Störungen)
```

## Design-Rezepte

### Maximale Stabilität
```yaml
decayRate: 0.98-0.999
deposit: 25-30
fadeStrength: 0.05
chaosInterval: 0
speed: 0.5-1.0
turnSpeed: 0.2-0.4
```

**Ergebnis**: Fast statische, kristalline Strukturen

### Balancierte Dynamische Stabilität
```yaml
decayRate: 0.95-0.97
deposit: 15-20
diffusionFreq: 5-8
speed: 1.5-2.0
chaosInterval: 300
```

**Ergebnis**: Stabile Topologie mit Formveränderung

### Robuste Resiliente Stabilität
```yaml
decayRate: 0.96-0.98
deposit: 20-25
agentCount: 4000-6000
chaosInterval: 250-350
chaosStrength: 0.4-0.6
```

**Ergebnis**: Stabilität mit Selbstheilung nach Störungen

## Theoretische Bedeutung

Stabilität demonstriert:

1. **[[../concepts/parameter-as-oikos.md|Gedächtnis-Horizont]]**: Decay als temporale Ausdehnung
2. **[[../concepts/emergenz.md|Akkumulative Ordnung]]**: Stabilität als akkumuliertes Phänomen
3. **Chaos-Paradox**: Störung kann Robustheit erhöhen

## Philosophische Implikationen

### Heraklit vs. Parmenides
- **Heraklit** (Alles fließt): Niedrige Stabilität, hohe Fluidity
- **Parmenides** (Sein ist unveränderlich): Hohe Stabilität, niedrige Fluidity
- **Ökosemiotik**: Balance möglich (dynamische Stabilität)

### Bergson: Dauer vs. Zeit
- **Stabilität = Dauer**: Qualitative, gelebte Zeit (akkumuliert)
- **Instabilität = Zeit**: Quantitative, gemessene Zeit (vergessen)

## Offene Fragen

1. **Optimale Stabilität**: Gibt es eine optimale Stabilität für Exploration + Exploitation?
2. **Kritische Schwellenwerte**: Sind die beobachteten Umschlagpunkte universell?
3. **Stabilität-Diversität Trade-off**: Verhindert hohe Stabilität notwendige Innovation?

## Verwandte Konzepte

- [[../concepts/parameter-as-oikos.md]] - Decay als Gedächtnis-Parameter
- [[../concepts/emergenz.md]] - Stabilität als emergente Eigenschaft
- [[cluster-formation]] - Korrelierte Eigenschaft
- [[separation]] - Korrelierte Eigenschaft bei hoher Attraction+Repulsion
