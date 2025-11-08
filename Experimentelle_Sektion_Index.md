# Experimentelle Sektion: Systematische Parameter-Oikos-Variation

```yaml
---
title: Experimentelle Sektion
type: Methodik & Index
status: Active
created: 2025-11-08
tags:
  - experimente
  - parameter-oikos
  - systematische-variation
  - methodik
related:
  - "[[Von_Stigmergie_zu_Oekosemiotik]]"
  - "[[Parameter_als_Oikos]]"
  - "[[Template_Parameter_Experiment]]"
  - "[[Parameter_Oikos_Matrix]]"
---
```

## Überblick

Diese Sektion dokumentiert **systematische Experimente** zur Untersuchung von Parameter-Oikos-Effekten in ökosemiotischen Systemen. Ziel ist es, die theoretischen Aussagen über Parameter-abhängige Selbstorganisation empirisch zu fundieren.

## Methodologische Prinzipien

### 1. Systematische Variation
- **Ein Parameter variieren**, alle anderen konstant halten
- Dokumentation von Ausgangszustand, Variation, beobachtetem Effekt
- Reproduzierbarkeit durch exakte Parameter-Dokumentation

### 2. Qualitative + Quantitative Erfassung
- **Qualitativ**: Visuelle Beschreibung emergenter Muster
- **Quantitativ**: Metriken (wenn verfügbar)
  - Ridge-Point-Anzahl (Fingerabdruck)
  - Entropie (geplant)
  - Korrelationslänge (geplant)
  - Fraktale Dimension (geplant)

### 3. Theorie-Geleitete Hypothesen
- Jedes Experiment beginnt mit **theoretischer Erwartung**
- Beobachtungen werden gegen Erwartungen abgeglichen
- Überraschungen → neue theoretische Fragen

### 4. Iterative Vertiefung
- Erste Runde: Grobe Variation (z.B. Decay: 0.85, 0.90, 0.95, 0.99)
- Zweite Runde: Feine Variation in interessanten Bereichen
- Dritte Runde: Grenzfall-Exploration

---

## Struktur der Experimente

### Vier Experimentklassen

#### 1. Einzelparameter-Variation
**Ziel**: Isolierter Effekt eines Parameters verstehen  
**Template**: [[Template_Parameter_Experiment]]  
**Beispiele**:
- [[Experiment_Decay_Rate_Variation]]
- [[Experiment_Sensor_Distance_Variation]]
- [[Experiment_Attraction_Strength_Variation]]

#### 2. Parameter-Oikos-Kombination
**Ziel**: Interaktion zwischen Parametern verschiedener Oikos-Dimensionen  
**Template**: [[Template_Kombinations_Experiment]]  
**Beispiele**:
- [[Experiment_Decay_x_Diffusion]]
- [[Experiment_Sensor_x_Resonanz]]
- [[Experiment_Speed_x_Chaos]]

#### 3. Modus-Vergleiche
**Ziel**: Wie verhalten sich Modi bei gleichen Parametern?  
**Template**: [[Template_Modus_Vergleich]]  
**Beispiele**:
- [[Experiment_Myzel_vs_Stigmergie_vs_Resonanz]]
- [[Experiment_Segregation_über_Modi]]

#### 4. Grenzfall-Exploration
**Ziel**: Extreme Parameter-Kombinationen testen  
**Template**: [[Template_Grenzfall_Exploration]]  
**Beispiele**:
- [[Experiment_Maximaler_Decay_Minimale_Diffusion]]
- [[Experiment_Extreme_Resonanz_Werte]]
- [[Experiment_Ultra_Chaos]]

---

## Parameter-Oikos-Matrix

**Zentrale Übersichts-Datei**: [[Parameter_Oikos_Matrix]]

Die Matrix dokumentiert **akkumulierte Erkenntnisse** über Parameter-Effekte:

```
Parameter-Oikos × Emergente Eigenschaften

                    Cluster | Separation | Stabilität | Chaos | Netzwerk
Physikalisch   
- Decay              +++       +            ++          -        ++
- Diffusion          ++        -            +           ++       +
- Fade Strength      +         +            -           +++      -
Semiotisch
- Sensor Dist        +         +++          +           +        +++
- Sensor Angle       ++        +            -           ++       +
- Deposit            ++        +            +++         -        ++
Temporal
- Speed              +         +            -           +++      +
- Agent Count        +++       -            +           +        ++
Resonanz
- Attraction         +++       ---          +           +        -
- Repulsion          ---       +++          -           ++       -
```

**Legende**:
- `+++` = starker fördernder Effekt
- `++` = moderater fördernder Effekt
- `+` = schwacher fördernder Effekt
- `-` = schwacher hemmender Effekt
- `--` = moderater hemmender Effekt
- `---` = starker hemmender Effekt

Diese Matrix wird **kontinuierlich aktualisiert** basierend auf Experimental-Ergebnissen.

---

## Experimentelle Templates

### [[Template_Parameter_Experiment]]
Standardisiertes Format für Einzelparameter-Variation

### [[Template_Kombinations_Experiment]]
Format für Interaktions-Untersuchungen

### [[Template_Modus_Vergleich]]
Format für Vergleiche zwischen Modi

### [[Template_Grenzfall_Exploration]]
Format für Extremwert-Tests

---

## Aktive Experimente

### In Arbeit
- [ ] [[Experiment_Decay_Rate_Variation]] - Systematische Variation 0.85 - 0.999
- [ ] [[Experiment_Resonanz_Harmonie_Schwelle]] - Ab welchem Repulsion-Wert kippt Harmonie?

### Geplant
- [ ] [[Experiment_Chaos_Injection_Periodizität]] - Wie beeinflusst Chaos-Interval emergente Stabilität?
- [ ] [[Experiment_Agent_Count_Skalierung]] - Wie skaliert Muster-Qualität mit Population?
- [ ] [[Experiment_Seed_Similarity_Systematic]] - Systematische Messung von Avalanche-Effekt

### Abgeschlossen
- [x] [[Experiment_Initial_Preset_Comparison]] - Vergleich der Gesamtpresets
  - Erkenntnisse: Unterschiedliche Presets erzeugen klar unterscheidbare Muster-Klassen

---

## Metriken & Analysewerkzeuge

### Implementierte Metriken

#### 1. Ridge-Point-Analyse (Fingerabdruck)
```javascript
// Anzahl identifizierter lokaler Maxima
ridgePoints.length

// Durchschnittliche Intensität
avgIntensity = ridgePoints.reduce((sum, p) => sum + p.intensity, 0) / ridgePoints.length

// Farbverteilung
colorDistribution = {
  r: ridgePoints.filter(p => p.color === 'r').length / ridgePoints.length,
  g: ridgePoints.filter(p => p.color === 'g').length / ridgePoints.length,
  b: ridgePoints.filter(p => p.color === 'b').length / ridgePoints.length
}
```

#### 2. Strukturelle Ähnlichkeit (Vergleichs-Modus)
```javascript
// Hamming Distance zwischen Pattern-Hashes
similarity = matches / max(fp1.length, fp2.length)
```

### Geplante Metriken

#### 3. Entropie-Messung
**Ziel**: Quantifizierung der "Unordnung" im Trail-Map

```javascript
// Shannon-Entropie über Pixel-Intensitäten
H = -Σ p(i) * log2(p(i))

// Hohe Entropie = chaotisches Muster
// Niedrige Entropie = strukturiertes Muster
```

#### 4. Korrelationslänge
**Ziel**: Wie weit erstreckt sich räumliche Korrelation?

```javascript
// Auto-Korrelationsfunktion
C(r) = <I(x) * I(x+r)> / <I(x)²>

// Korrelationslänge ξ = Abstand bei dem C(ξ) = e^(-1)
```

#### 5. Fraktale Dimension
**Ziel**: Selbstähnlichkeit quantifizieren

```javascript
// Box-Counting Dimension
D = log(N(ε)) / log(1/ε)

// N(ε) = Anzahl Boxen mit Größe ε die Muster enthalten
```

#### 6. Spektralanalyse
**Ziel**: Dominante Frequenzen in Farbverteilung

```javascript
// 2D Fourier Transform des Trail-Maps
F = FFT2D(trailMap)

// Power Spectrum
P(k) = |F(k)|²
```

---

## Experimentelle Workflows

### Workflow 1: Einzelparameter-Untersuchung

1. **Vorbereitung**
   ```
   - Template kopieren: [[Template_Parameter_Experiment]]
   - Parameter auswählen: z.B. "Decay Rate"
   - Variations-Range festlegen: z.B. 0.85, 0.90, 0.95, 0.99
   - Alle anderen Parameter fixieren (Baseline)
   ```

2. **Durchführung**
   ```
   - Für jeden Wert:
     - Simulation starten (500 Steps für Konsistenz)
     - Screenshot speichern
     - Metriken dokumentieren (Ridge Points, Similarity zu Baseline)
     - Qualitative Beschreibung notieren
   ```

3. **Analyse**
   ```
   - Muster-Vergleich: Wie unterscheiden sich die Outputs?
   - Trend-Identifikation: Linear, exponentiell, Schwellenwert?
   - Theoretische Interpretation: Warum dieser Effekt?
   ```

4. **Dokumentation**
   ```
   - Experiment-Datei befüllen
   - Parameter-Oikos-Matrix updaten
   - Neue Hypothesen für Folge-Experimente notieren
   ```

### Workflow 2: Kombinations-Untersuchung

1. **Vorbereitung**
   ```
   - Zwei Parameter auswählen: z.B. Decay × Diffusion
   - Grid definieren: 
     Decay: [0.85, 0.92, 0.99]
     Diffusion: [0, 3, 8]
     → 3×3 = 9 Kombinationen
   ```

2. **Durchführung**
   ```
   - Für jede Kombination:
     - Simulation durchführen
     - Screenshots in Grid-Layout dokumentieren
     - Interaktionseffekte notieren
   ```

3. **Analyse**
   ```
   - Additive vs. nichtlineare Effekte identifizieren
   - "Sweet Spots" identifizieren
   - Emergente Muster-Klassen benennen
   ```

### Workflow 3: Reproduzierbarkeits-Test

1. **Ziel**: Sicherstellen dass gleiche Parameter → gleiche Muster (Determinismus)

2. **Durchführung**
   ```
   - Gleiche Parameter 5× wiederholen
   - Mit verschiedenen Seeds (Fingerabdruck-Modus)
   - Pattern-Hashes vergleichen
   ```

3. **Erwartung**
   ```
   - Gleicher Seed → identischer Hash ✓
   - Verschiedener Seed → verschiedener Hash ✓
   - Ähnlicher Seed → ähnlicher (aber nicht identischer) Hash ✓
   ```

---

## Best Practices

### 1. Parametrisierung dokumentieren
**Immer vollständige Parameter-Sets angeben**, auch wenn "Standard-Werte" verwendet werden.

```yaml
Parameter-Set: "Baseline Resonanz"
  Physikalische Oikos:
    decayRate: 0.96
    diffusionFreq: 3
    fadeStrength: 0.15
    trailSaturation: 255
  Semiotische Oikos:
    sensorDist: 15
    sensorAngle: 0.45
    deposit: 15
    turnSpeed: 0.3
  Temporale Oikos:
    speed: 1.5
    agentCount: 3000
    chaosInterval: 0
    chaosStrength: 0.5
  Resonanz Oikos:
    attractionStrength: 1.5
    repulsionStrength: -0.5
    crossSpeciesInteraction: true
  Visualisierung:
    brightness: 2.5
    glowIntensity: 1.2
    contrast: 1.0
```

### 2. Screenshots systematisch benennen
```
[ExperimentID]_[Parameter]_[Wert]_[Seed].png

Beispiel:
EXP001_Decay_0.99_oekosemiotik.png
EXP001_Decay_0.85_oekosemiotik.png
```

### 3. Qualitative Beschreibungen standardisieren
**Kategorien für visuelle Muster**:
- **Struktur**: homogen, netzwerkartig, cluster-basiert, chaotisch
- **Stabilität**: stabil, oszillierend, kollabierend, explosiv
- **Textur**: glatt, faserig, granular, kristallin
- **Dynamik**: statisch, fließend, pulsierend, turbulent

### 4. Überraschungen hervorheben
Wenn ein Experiment **unerwartete** Ergebnisse liefert:
```markdown
⚠️ **ÜBERRASCHUNG**: 
Erwartung war X, beobachtet wurde Y.

Mögliche Erklärungen:
1. ...
2. ...

Folge-Experimente:
- [ ] ...
- [ ] ...
```

### 5. Iterative Vertiefung
Erste Experimente sind **explorativer**.  
Wenn interessante Bereiche gefunden:  
→ **Feinere Variation** in diesem Bereich  
→ **Grenzfall-Tests** an den Rändern

---

## Langfristige Ziele

### Phase 1 (Monate 1-3): Grundlegende Kartierung
- [ ] Jeder Parameter mindestens 1× systematisch variiert
- [ ] Parameter-Oikos-Matrix mit initialen Einträgen gefüllt
- [ ] Standard-Metriken implementiert (Entropie, Korrelation)

### Phase 2 (Monate 4-6): Interaktions-Untersuchung
- [ ] Wichtigste Parameter-Kombinationen getestet
- [ ] Nichtlineare Effekte dokumentiert
- [ ] "Sweet Spots" für verschiedene Muster-Klassen identifiziert

### Phase 3 (Monate 7-9): Theoretische Integration
- [ ] Emergente Muster-Taxonomie entwickelt
- [ ] Formale Modellierungsversuche (wenn möglich)
- [ ] Verbindung zu empirischen Beobachtungen (IT-Koordination LGS Bayern)

### Phase 4 (Monate 10-12): Validierung & Präsentation
- [ ] Reproduzierbarkeits-Tests abgeschlossen
- [ ] Zentrale Experimente für Bohmann-Gespräch ausgewählt
- [ ] Interaktive Demo-Version für Vault-Präsentation

---

## Verbindungen im Vault

- **Grundlagen**: [[Von_Stigmergie_zu_Oekosemiotik]] | [[Parameter_als_Oikos]]
- **Templates**: [[Template_Parameter_Experiment]] | [[Template_Kombinations_Experiment]]
- **Matrix**: [[Parameter_Oikos_Matrix]]
- **Aktive Experimente**: [[Experiment_Decay_Rate_Variation]] | [[Experiment_Resonanz_Harmonie_Schwelle]]
- **Demonstratoren**: [[Myzel_Simulation]] | [[Fingerabdruck_Generator]]

---

*Diese experimentelle Sektion ist der empirische Kern der ökosemiotischen Theorieentwicklung. Sie wandelt abstrakte Konzepte in testbare Hypothesen um und generiert kontinuierlich neue theoretische Fragen.*
