---
id: param-repulsion-strength
title: Repulsion Strength
type: parameter
oikos: resonanz-oikos
range: -1.0 - 1.0
default: 0.0
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [parameter, resonance, multi-species, affective-relations, segregation]
affects:
  - "[[cluster-formation]]" # ---
  - "[[separation]]" # +++
  - "[[stability]]" # -
  - chaos # ++
  - network # -
  - fluidity # +
  - crystallinity # -
  - density # -
related:
  - "[[attraction-strength]]"
  - cross-species-interaction
  - "[[sensor-distance]]"
experiments:
  - "[[Experiment_Resonanz_Harmonie_Schwelle]]"
sources:
  - "[[Parameter_Oikos_Matrix]]"
  - "[[Von_Stigmergie_zu_Oekosemiotik]]"
---

## Definition

**Repulsion Strength** bestimmt die **Stärke der Fremd-Resonanz** – wie stark Agenten auf Spuren *anderer* Spezies reagieren.

**Wertebereiche**:
- **Negativ (<0)**: Abstoßung (Agents meiden andere Spezies)
- **Null (=0)**: Neutral (Agents ignorieren andere Spezies)
- **Positiv (>0)**: Anziehung (Agents folgen anderen Spezies)

## Ökosemiotische Interpretation

`repulsionStrength` ist **nicht** "Abstoßungskraft", sondern:

**"Grad der Fremd-Resonanz zwischen Zeichensystemen"**

- `repulsionStrength = -0.9` → Starke negative Resonanz → aktive Vermeidung → Segregation
- `repulsionStrength = 0.0` → Keine Resonanz → Ignoranz → zufällige Verteilung
- `repulsionStrength = 0.5` → Positive Resonanz → Anziehung → Koexistenz

Repulsion strukturiert **affektive Beziehungen** zwischen Agents verschiedener Spezies.

Siehe [[../concepts/resonanz.md]] für theoretischen Kontext.

## Implementation

```javascript
// Resonanz-Modus: Agents gewichten eigene vs. fremde Spuren
const selfTrail = trailMap[y][x][ownSpecies];
const otherTrails = [trailMap[y][x].r, trailMap[y][x].g, trailMap[y][x].b]
  .filter(t => t !== selfTrail);
const otherMax = Math.max(...otherTrails);

// Repulsion moduliert Reaktion auf fremde Spuren
const resonanceValue = selfTrail * attractionStrength +
                       otherMax * repulsionStrength;

// Negative Repulsion → Agent dreht weg von fremden Spuren
// Positive Repulsion → Agent dreht hin zu fremden Spuren
```

## Wertebereich

| Wert | Bedeutung | Emergentes Muster |
|---|---|---|
| **-1.0 - -0.7** | Starke Abstoßung | Vollständige Segregation, klare Territorien |
| **-0.6 - -0.4** | Moderate Abstoßung | Tendenz zur Trennung, aber mit Grenzzonen |
| **-0.3 - -0.1** | Schwache Abstoßung | Leichte Trennung, viel Überlappung |
| **0.0** | Neutral | Zufällige Verteilung, keine Separation |
| **0.1 - 0.3** | Schwache Anziehung | Leichte Durchmischung |
| **0.4 - 0.6** | Moderate Anziehung | Koexistenz, durchmischt |
| **0.7 - 1.0** | Starke Anziehung | Maximale Durchmischung, "Verschmelzung" |

## Effekte auf emergente Eigenschaften

Aus der [[../meta/map-parameter-effects.md|Parameter-Oikos-Matrix]]:

| Eigenschaft | Effekt | Stärke | Erklärung |
|---|---|---|---|
| **[[cluster-formation\|Clusterbildung]]** | ⬇️ | --- | Negative Repulsion → Meidung eigener Spezies AUCH → reduziert Clusterung |
| **[[separation\|Separation]]** | ⬆️ | +++ | Starke negative Repulsion → aktive Vermeidung anderer Spezies |
| **[[stability\|Stabilität]]** | ⬇️ | - | Starke Repulsion → erratische Ausweichbewegungen |
| **Chaos** | ⬆️ | ++ | Starke Repulsion → komplexe Ausweich-Dynamiken |
| **Network** | ⬇️ | - | Separation reduziert cross-species Verbindungen |
| **Fluidity** | ⬆️ | + | Repulsion-getriebene Bewegung → dynamischer |
| **Crystallinity** | ⬇️ | - | Komplexe Ausweich-Bewegungen → weniger geometrisch |
| **Density** | ⬇️ | - | Separation verteilt Agents breiter |

## Die Harmonie-Schwelle: Kritischer Umschlagpunkt ⚠️

**Experimenteller Befund**: Qualitative Veränderung bei `repulsionStrength ≈ -0.5`

### Über -0.5 (Harmonie/Clusterbildung)

```yaml
attractionStrength: 1.5 + repulsionStrength: -0.2 → Clusterbildung dominiert

Mechanismus:
  - Selbst-Resonanz (Attraction) ist stark
  - Fremd-Abstoßung ist schwach
  - Agents fokussieren auf eigene Spuren
  - Andere Spezies werden toleriert/ignoriert

Ergebnis:
  - Homogene Cluster pro Spezies
  - ABER: Räumlich durchmischt (keine Segregation)
  - Segregations-Index < 0.3
```

### Unter -0.5 (Konflikt/Segregation)

```yaml
attractionStrength: 1.5 + repulsionStrength: -0.8 → Segregation dominiert

Mechanismus:
  - Selbst-Resonanz ist stark
  - Fremd-Abstoßung ist stark
  - Agents clustern UND meiden andere aktiv
  - Territorial-Vermeidung

Ergebnis:
  - Homogene Cluster in getrennten Territorien
  - Räumlich segregiert
  - Segregations-Index > 0.6
```

**Theoretische Implikation**: Bei `repulsion ≈ -0.5` schlägt [[../concepts/resonanz.md|Resonanz-Dynamik]] qualitativ um – von Koexistenz zu Konflikt

Siehe [[../properties/separation.md#kritische-interaktion-attraction--repulsion]] und [[../meta/map-parameter-effects.md#kritische-schwellenwerte]]

## Interaktionen mit anderen Parametern

### Repulsion × [[attraction-strength|Attraction]]: Resonanz-Matrix ⭐

**Die zentrale Interaktion für soziale Struktur**:

```yaml
# Typ 1: Weder Cluster noch Separation
attractionStrength: 0.5-1.0 + repulsionStrength: -0.2-0.2
  - Schwache Selbst-Resonanz
  - Neutrale Fremd-Resonanz
  - Ergebnis: Zufällige, diffuse Verteilung

# Typ 2: Clusterbildung OHNE Separation
attractionStrength: 1.5-2.0 + repulsionStrength: -0.2-0.2
  - Starke Selbst-Resonanz
  - Neutrale Fremd-Resonanz
  - Ergebnis: Cluster, aber durchmischt

# Typ 3: Separation OHNE starke Cluster
attractionStrength: 0.8-1.2 + repulsionStrength: -0.7--1.0
  - Moderate Selbst-Resonanz
  - Starke Fremd-Abstoßung
  - Ergebnis: Territorien, aber diffuse Grenzen

# Typ 4: SOWOHL Cluster ALS AUCH Separation ⭐
attractionStrength: 1.5-2.0 + repulsionStrength: -0.7--1.0
  - Starke Selbst-Resonanz
  - Starke Fremd-Abstoßung
  - Ergebnis: Homogene Cluster in getrennten Territorien

# Typ 5: Koexistenz (Harmonie)
attractionStrength: 0.8-1.2 + repulsionStrength: 0.2-0.5
  - Moderate Selbst-Resonanz
  - Positive Fremd-Resonanz (Anziehung!)
  - Ergebnis: Durchmischte Koexistenz
```

**Schlüssel-Erkenntnis**: [[cluster-formation]] und [[separation]] sind **nicht immer anti-korreliert** – bei hoher Attraction + starker Repulsion treten BEIDE auf!

### Repulsion × [[sensor-distance|Sensor Distance]]: Separation-Effektivität

**Separation erfordert Fernwahrnehmung**:

```yaml
# Ineffektive Separation
sensorDist: 15 + repulsionStrength: -0.8
  - Kurze Reichweite → sieht andere Spezies oft nicht
  - Auch bei starker Repulsion: Vermeidung unvollständig
  - Ergebnis: Suboptimale Segregation

# Effektive Separation
sensorDist: 40 + repulsionStrength: -0.8
  - Große Reichweite → detektiert andere Spezies früh
  - Starke Repulsion → aktive Vermeidung
  - Ergebnis: Klare, weitreichende Territorien

# Theoretische Implikation: Separation braucht BEIDE Parameter
```

Siehe [[../parameters/sensor-distance.md#sensor-distance-fr-separation]]

### Repulsion × Cross-Species Interaction Toggle

**Repulsion ist nur wirksam wenn `crossSpeciesInteraction = true`**:

```yaml
# Repulsion deaktiviert
repulsionStrength: -0.9 + crossSpeciesInteraction: false
  - Repulsion hat KEINE Wirkung
  - Agents "sehen" andere Spezies nicht
  - Ergebnis: Zufällige Verteilung (wie repulsion=0)

# Repulsion aktiviert
repulsionStrength: -0.9 + crossSpeciesInteraction: true
  - Repulsion wirkt
  - Agents meiden andere Spezies aktiv
  - Ergebnis: Starke Segregation
```

## Experimentelle Befunde

### Experiment: [[Experiment_Resonanz_Harmonie_Schwelle]]

**Setup**: Konstanthalten von attractionStrength=1.5, variiere repulsionStrength

**Befunde**:

```yaml
repulsionStrength: 0.5 (positive Resonanz)
  → Segregations-Index: 0.15
  → Durchmischt, Koexistenz

repulsionStrength: 0.0 (neutral)
  → Segregations-Index: 0.22
  → Cluster, aber durchmischt

repulsionStrength: -0.3 (schwache Abstoßung)
  → Segregations-Index: 0.35
  → Cluster, leichte Trennung

repulsionStrength: -0.5 (Schwellenwert) ⚠️
  → Segregations-Index: 0.52
  → Umschlagpunkt: Qualitative Veränderung

repulsionStrength: -0.7 (starke Abstoßung)
  → Segregations-Index: 0.71
  → Klare Territorien

repulsionStrength: -0.9 (maximale Abstoßung)
  → Segregations-Index: 0.83
  → Fast vollständige Segregation
```

**Kritischer Schwellenwert bestätigt**: Bei `repulsion ≈ -0.5` schlägt Dynamik um

## Presets mit charakteristischem Repulsion

| Preset | Attraction | Repulsion | Muster |
|---|---|---|---|
| **Clusterbildung** | 1.8 | -0.2 | Homogene Cluster, durchmischt |
| **Segregation** | 1.5 | -0.8 | Getrennte Territorien |
| **Harmonie** | 1.2 | 0.3 | Durchmischte Koexistenz |
| **Isolation** | 1.0 | 0.0 + crossSpeciesInteraction: false | Keine Inter-Spezies-Wahrnehmung |

## Design-Empfehlungen

### Für maximale Separation (Segregation)
```yaml
repulsionStrength: -0.7--1.0  # Stark negativ!
+ attractionStrength: 1.5-1.8  # Ermöglicht auch Cluster in Territorien
+ sensorDist: 35-50  # Essentiell für Fernwahrnehmung
+ crossSpeciesInteraction: true  # Muss aktiv sein
+ sensorAngle: 0.5-0.8
```

**Ergebnis**: Homogene Cluster in klar getrennten Territorien

### Für Koexistenz (Harmonie)
```yaml
repulsionStrength: 0.2-0.5  # Positiv (Anziehung)!
+ attractionStrength: 0.8-1.2
+ crossSpeciesInteraction: true
```

**Ergebnis**: Durchmischte Koexistenz, moderate Cluster

### Für Clusterbildung ohne Separation
```yaml
repulsionStrength: -0.2-0.2  # Neutral!
+ attractionStrength: 1.7-2.0  # Hoch
+ decayRate: 0.97-0.99
```

**Ergebnis**: Starke Cluster, aber räumlich durchmischt

## Theoretische Bedeutung

Repulsion ist der **zentrale Parameter** der **Resonanz-Oikos** weil er:

1. **Fremd-Resonanz** strukturiert (Wie resonieren Zeichensysteme miteinander?)
2. **Soziale Geographie** definiert (Zusammen mit Attraction)
3. **Kritische Schwellenwerte** aufweist (Qualitative Umschlagpunkte)

Siehe [[../concepts/parameter-as-oikos.md#resonanz-oikos]] und [[../concepts/resonanz.md]]

## Gesellschaftliche Implikationen

### Schelling's Segregationsmodell (1971) Revisited

**Klassisches Modell**:
- Minimale individuelle Präferenz für Ähnliches (~30%) → starke kollektive Segregation (~70%)
- "Tipping Point" bei ca. 30-40% Unzufriedenheit

**Ökosemiotische Interpretation**:
```yaml
Individuelle Präferenz = attractionStrength + abs(repulsionStrength)

Schelling's "30% Präferenz":
  attractionStrength: 1.3 + repulsionStrength: -0.3
  → Moderate Selbst-Resonanz + schwache Fremd-Abstoßung
  → Aber: Führt zu Segregations-Index ~0.6-0.7 (!)

Theoretische Erkenntnis:
  - Segregation emergiert aus PARAMETER-OIKOS-EFFEKTEN
  - Nicht reduzierbar auf "individuelle Vorurteile" allein
  - Systemische Dynamik, nicht nur individuelle Präferenz
```

**Policy-Implikationen**:
1. **Nicht nur Einstellungen ändern** (attractionStrength, repulsionStrength)
2. **Auch Wahrnehmungs-Strukturen** (sensorDistance - "Bubble"-Effekte)
3. **Und Inter-Gruppen-Kontakt** (crossSpeciesInteraction)

## Biologische Analogien

### Allelopathie (Pflanzen)
**Chemische Inhibition**: Pflanzen hemmen andere Arten durch Exsudate
- Repulsion ≈ Allelopathische Stärke
- Negative Repulsion = Wachstumshemmung
- Territoriale Dominanz

### Inter-Species Competition
**Competitive Exclusion**: Arten meiden oder verdrängen sich
- Repulsion ≈ Competitive Strength
- Nischen-Segregation durch Vermeidung
- Coexistence bei schwacher Competition (niedrige Repulsion)

### Immunsystem (Self/Non-Self)
**T-Cell Response**: Immunsystem unterscheidet "Self" vs. "Non-Self"
- Attraction ≈ Toleranz zu Self
- Negative Repulsion ≈ Attack auf Non-Self
- Autoimmunität = Fehlkalibrierung

## Offene Fragen

1. **Asymmetrische Repulsion**: Was, wenn Spezies A Spezies B meidet, aber nicht umgekehrt (A → B ≠ B → A)?
2. **Adaptive Repulsion**: Sollte Repulsion von lokaler Trail-Dichte abhängen?
3. **Repulsion-Gradienten**: Was, wenn Repulsion räumlich variiert ("sichere Zonen" vs. "Konfliktzonen")?

## Verwandte Parameter

- [[attraction-strength]] - **Komplementär** (Selbst- vs. Fremd-Resonanz)
- cross-species-interaction - **Aktiviert/deaktiviert** Repulsion-Effekt
- [[sensor-distance]] - **Verstärkt** Repulsion-Effekt (Separation braucht Fernwahrnehmung)
- sensor-angle - Breites Feld hilft bei Fremd-Detektion

## Verwandte Konzepte

- [[../concepts/resonanz.md]] - Theoretischer Rahmen
- [[../concepts/parameter-as-oikos.md]] - Repulsion als Teil der Resonanz-Oikos
- [[separation]] - Primäre emergente Eigenschaft
- [[cluster-formation]] - Komplexe, bedingte Anti-Korrelation
