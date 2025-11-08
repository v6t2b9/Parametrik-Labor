# Experiment: Decay Rate Variation - Temporale Gedächtnis-Horizonte

```yaml
---
title: Decay Rate Variation - Temporale Gedächtnis-Horizonte
type: Experiment
status: Geplant
created: 2025-11-08
experiment_id: EXP001
tags:
  - experiment
  - decay-rate
  - physikalische-oikos
  - gedaechtnis
  - stabilität
related:
  - "[[Experimentelle_Sektion_Index]]"
  - "[[Parameter_Oikos_Matrix]]"
  - "[[Von_Stigmergie_zu_Oekosemiotik]]"
  - "[[Parameter_als_Oikos]]"
---
```

## Experiment-Übersicht

**Experiment-ID**: EXP001  
**Datum**: 2025-11-08 (geplant)  
**Durchgeführt von**: Jay  
**Geschätzte Dauer**: 45 Minuten

---

## 1. Forschungsfrage

**Zentrale Frage**:  
Wie beeinflusst die Decay Rate (Verfallsrate der Spuren) die emergenten Muster in ökosemiotischen Systemen? Konkret: Wie verändert sich der "Gedächtnis-Horizont" des Systems?

**Theoretischer Hintergrund**:  
In der klassischen Stigmergie-Theorie wird Decay als "Verdunstungsrate" behandelt – ein technischer Parameter. Die ökosemiotische Perspektive reinterpretiert Decay als **temporalen Horizont**: Wie lange bleibt die Vergangenheit handlungsleitend für die Gegenwart?

- **Hoher Decay** (0.99): Lange Gedächtnis-Horizonte → Vergangenheit strukturiert Gegenwart stark
- **Niedriger Decay** (0.85): Kurze Gedächtnis-Horizonte → nur unmittelbare Gegenwart ist relevant

**Hypothese**:  
1. Hoher Decay → stabile, persistente Muster (Clusterbildung, Kristallinität)
2. Niedriger Decay → volatile, chaotische Muster (Fluidität, Chaos)
3. Es gibt einen **kritischen Schwellenwert**, unterhalb dessen Muster nicht mehr stabilisieren können

**Verbindung zur Theorie**:  
Dieses Experiment testet die ökosemiotische These, dass Parameter nicht "Einstellungen" sind, sondern **strukturierende Kräfte**. Decay ist nicht "wie schnell etwas verschwindet", sondern **wie weit die Vergangenheit in die Zukunft reicht**.

---

## 2. Experimentelles Design

### Zu variierender Parameter

**Parameter**: Decay Rate  
**Oikos-Dimension**: Physikalisch (materielle Trägheit der Spuren)  
**Variations-Range**: 0.85, 0.90, 0.94, 0.96, 0.98, 0.99  
**Step-Size**: Variabel (feiner bei hohen Werten, wo Effekte stärker sind)

**Rationale für Range-Wahl**:
- 0.85: Sehr schneller Verfall, untere Grenze für Muster-Emergenz
- 0.90-0.94: Mittlerer Bereich
- 0.96-0.99: Hoher Bereich, wo kleine Änderungen große Effekte haben

### Fixierte Parameter (Baseline)

```yaml
Modus: Resonanz
  # Resonanz-Modus gewählt, weil er Parameter-Effekte am deutlichsten zeigt

Physikalische Oikos:
  decayRate: VARIED (0.85 - 0.99)
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

Simulation:
  steps: 500  # Konsistenz über alle Runs
  seed: "decay_rate_baseline"
```

---

## 3. Durchführung

### Variations-Tabelle

| Run | Decay Rate | Screenshot | Ridge Points | Avg Intensity | Qualitative Beschreibung |
|-----|------------|------------|--------------|---------------|--------------------------|
| 1   | 0.85       | [TODO]     | [TODO]       | [TODO]        | **Erwartung**: Sehr volatil, kaum persistente Strukturen, hohe Fluidität |
| 2   | 0.90       | [TODO]     | [TODO]       | [TODO]        | **Erwartung**: Moderate Volatilität, kurzlebige Muster |
| 3   | 0.94       | [TODO]     | [TODO]       | [TODO]        | **Erwartung**: Beginnende Stabilisierung, erkennbare Netzwerke |
| 4   | 0.96       | [TODO]     | [TODO]       | [TODO]        | **Erwartung**: Stabile Cluster, deutliche Segregation |
| 5   | 0.98       | [TODO]     | [TODO]       | [TODO]        | **Erwartung**: Sehr stabile, kristalline Strukturen |
| 6   | 0.99       | [TODO]     | [TODO]       | [TODO]        | **Erwartung**: Maximum Stabilität, fast "gefrorene" Muster |

### Zusätzliche Messungen

**Für jeden Run dokumentieren**:
- **Trail Map Entropie** (wenn implementiert)
- **Farbverteilung** (R:G:B Ratio)
- **Visuelle Stabilität**: Wie sehr verändert sich das Muster zwischen Schritt 400 und 500?
  - Hoch: Deutliche Veränderungen
  - Mittel: Moderate Anpassungen
  - Niedrig: Fast statisch

---

## 4. Erwartete Quantitative Ergebnisse

### Hypothetische Metriken-Übersicht

| Decay Rate | Ridge Points | Avg Intensity | Trail Entropie | Stabilität | Kristallinität |
|------------|--------------|---------------|----------------|------------|----------------|
| 0.85       | ~60          | ~120          | Hoch           | Niedrig    | Niedrig        |
| 0.90       | ~75          | ~145          | Mittel-Hoch    | Niedrig-Mittel | Niedrig    |
| 0.94       | ~90          | ~170          | Mittel         | Mittel     | Mittel         |
| 0.96       | ~95          | ~190          | Mittel-Niedrig | Mittel-Hoch| Mittel-Hoch    |
| 0.98       | ~100         | ~210          | Niedrig        | Hoch       | Hoch           |
| 0.99       | ~105         | ~230          | Sehr Niedrig   | Sehr Hoch  | Sehr Hoch      |

**Erwarteter Trend**:
- **Ridge Points**: Leicht ansteigend (mehr Stabilität → mehr persistente Maxima)
- **Avg Intensity**: Deutlich ansteigend (Akkumulation durch weniger Decay)
- **Entropie**: Deutlich fallend (geordnetere Strukturen)

---

## 5. Analyse & Interpretation (Vorab-Erwartungen)

### Erwartete Bestätigung der Hypothese

**Hypothese 1**: Hoher Decay → Stabilität  
**Test**: Vergleich Runs 5-6 (0.98-0.99) mit Runs 1-2 (0.85-0.90)  
**Erwartung**: Visuell deutlich erkennbare Unterschiede in Persistenz

**Hypothese 2**: Niedriger Decay → Chaos  
**Test**: Run 1 (0.85) sollte hochgradig volatile Muster zeigen  
**Erwartung**: Hohe Trail-Entropie, keine stabilen Cluster

**Hypothese 3**: Kritischer Schwellenwert  
**Test**: Gibt es einen Decay-Wert, unterhalb dessen KEINE stabilen Muster emergieren?  
**Erwartung**: Irgendwo zwischen 0.85-0.90 liegt die "Emergenz-Schwelle"

### Mögliche Überraschungen

⚠️ **MÖGLICHE ÜBERRASCHUNG 1**: 
Was wenn sehr niedriger Decay (0.85) AUCH interessante Muster erzeugt – nur andere Art?

**Falls beobachtet**: 
- Könnte bedeuten, dass "Chaos" selbst eine Art emergente Ordnung ist
- Niedrige Gedächtnis-Horizonte → "Präsenz-Muster" statt "Akkumulations-Muster"
- **Folge-Experiment**: Chaos-Muster genauer charakterisieren

⚠️ **MÖGLICHE ÜBERRASCHUNG 2**: 
Was wenn der Effekt nicht linear ist, sondern exponentiell?

**Falls beobachtet**:
- Kleine Änderungen bei hohen Decay-Werten haben unverhältnismäßig große Effekte
- Deutet auf **kritische Übergänge** (Phase Transitions) hin
- **Theoretische Implikation**: Parameter-Oikos-Effekte sind nichtlinear

---

## 6. Theoretische Implikationen (Vorab-Reflexion)

### Was zeigt dieses Experiment über Parameter-Oikos?

**Wenn Hypothesen bestätigt**:
- Decay ist nicht "technischer Parameter", sondern **ontologisch wirksam**
- "Gedächtnis" ist emergente Eigenschaft des Systems, ko-konstituiert durch Decay-Oikos
- Parameter-Variation erzeugt **qualitativ verschiedene Muster-Klassen**, nicht nur graduelle Unterschiede

**Wenn Hypothesen widerlegt**:
- Müssen theoretische Annahmen über Gedächtnis-Horizonte revidieren
- Andere Parameter (z.B. Diffusion) könnten primärer sein als gedacht
- Interaktionseffekte wichtiger als isolierte Parameter

### Relevanz für zentrale ökosemiotische These

Dieses Experiment ist **zentral**, weil es zeigt:
1. **Parameter ko-konstituieren emergente Ordnung** (nicht nur "beeinflussen")
2. **Zeitliche Dimension** (Decay = Gedächtnis) ist fundamentaler Parameter-Oikos
3. **Praktische Implikation**: In IT-Systemen müssen "Persistenz-Parameter" bewusst gestaltet werden

**Analogie zu IT-Koordination**:
- E-Mail-Archivierung: Wie lange bleiben alte Mails "sichtbar"?
- Slack-Retention-Policy: Wie weit reicht der Konversations-Horizont?
- Git-History: Wie stark prägt Vergangenheit gegenwärtige Entwicklung?

→ Diese sind keine "Speicher-Fragen", sondern **Parameter-Oikos-Gestaltung**

---

## 7. Nächste Schritte

### Unmittelbare Folge-Experimente

- [ ] [[Experiment_Decay_x_Diffusion]]: Wie interagiert Decay mit Diffusion?
  - **Hypothese**: Hoher Decay + hohe Diffusion = "Lavalampe"-Effekt (stabil UND fluid)
  
- [ ] [[Experiment_Decay_Fine_Grain]]: Feinere Variation im Bereich 0.96-0.99
  - **Hypothese**: Hier liegen die interessantesten nichtlinearen Effekte

- [ ] [[Experiment_Decay_Modus_Vergleich]]: Gleiche Decay-Variation in Myzel vs. Stigmergie vs. Resonanz
  - **Hypothese**: Effekt ist **modusübergreifend** (Universalität der Parameter-Oikos)

### Methodische Verbesserungen

**Wenn verfügbar**:
- Automatisierte Entropie-Messung implementieren
- Korrelationslängen-Berechnung
- Time-Series-Analyse: Wie entwickelt sich Muster über Zeit bei verschiedenen Decay-Raten?

**Visualisierung**:
- Side-by-Side-Vergleich aller Runs
- Animierte Übergänge zwischen Decay-Werten
- Heatmap: Decay × Zeit × Entropie

---

## 8. Reproduzierbarkeit

### Exakte Parameter-Dokumentation (Copy-Paste Ready)

```javascript
// Ökosemiotik Labor v3.1 Einstellungen
// Experiment: EXP001 - Decay Rate Variation

// Modus
setMode('resonanz');

// Physikalische Oikos
setDecayRate(VARIED); // 0.85, 0.90, 0.94, 0.96, 0.98, 0.99
setDiffusionFreq(3);
setFadeStrength(0.15);
setTrailSaturation(255);

// Semiotische Oikos
setSensorDist(15);
setSensorAngle(0.45);
setDeposit(15);
setTurnSpeed(0.3);

// Temporale Oikos
setSpeed(1.5);
setAgentCount(3000);
setChaosInterval(0);
setChaosStrength(0.5);

// Resonanz Oikos
setAttractionStrength(1.5);
setRepulsionStrength(-0.5);
setCrossSpeciesInteraction(true);

// Visualisierung
setBrightness(2.5);
setGlowIntensity(1.2);
setContrast(1.0);

// Simulation
simulationSteps = 500;
seed = "decay_rate_baseline";
```

### Spezifische Run-Konfigurationen

**Run 1 (Decay 0.85)**:
```javascript
setDecayRate(0.85);
// [Rest wie oben]
```

**Run 2 (Decay 0.90)**:
```javascript
setDecayRate(0.90);
// [Rest wie oben]
```

**Run 3 (Decay 0.94)**:
```javascript
setDecayRate(0.94);
// [Rest wie oben]
```

**Run 4 (Decay 0.96)**:
```javascript
setDecayRate(0.96);
// [Rest wie oben]
```

**Run 5 (Decay 0.98)**:
```javascript
setDecayRate(0.98);
// [Rest wie oben]
```

**Run 6 (Decay 0.99)**:
```javascript
setDecayRate(0.99);
// [Rest wie oben]
```

### Dateien & Assets

**Screenshots**: `experiments/EXP001/screenshots/`  
- `EXP001_Decay_0.85_baseline.png`
- `EXP001_Decay_0.90_baseline.png`
- `EXP001_Decay_0.94_baseline.png`
- `EXP001_Decay_0.96_baseline.png`
- `EXP001_Decay_0.98_baseline.png`
- `EXP001_Decay_0.99_baseline.png`

**Comparison Grid**: `experiments/EXP001/EXP001_comparison_grid.png`  

**Raw Data** (falls implementiert): `experiments/EXP001/data/`
- `EXP001_metrics.csv` (Ridge Points, Intensities, Entropie pro Run)

---

## Update nach Durchführung

[Dieser Abschnitt wird befüllt, nachdem das Experiment tatsächlich durchgeführt wurde]

### Tatsächliche Beobachtungen

**Run 1 (0.85)**: [Tatsächliche Beschreibung]  
**Run 2 (0.90)**: [Tatsächliche Beschreibung]  
...

### Vergleich: Erwartung vs. Realität

| Aspekt | Erwartung | Beobachtung | Übereinstimmung? |
|--------|-----------|-------------|------------------|
| Stabilität-Trend | Ansteigend mit Decay | [TBD] | [TBD] |
| Kritischer Schwellenwert | ~0.87 | [TBD] | [TBD] |
| Nichtlinearität | Exponentiell bei hohen Werten | [TBD] | [TBD] |

### Aktualisierung Parameter-Oikos-Matrix

[Nach Durchführung: Konkrete Einträge für Matrix basierend auf Beobachtungen]

---

## Verbindungen

- **Experimentelle Sektion**: [[Experimentelle_Sektion_Index]]
- **Verwandte Experimente**: [[Experiment_Decay_x_Diffusion]] | [[Experiment_Decay_Fine_Grain]]
- **Theoretische Grundlagen**: [[Von_Stigmergie_zu_Oekosemiotik]] | [[Parameter_als_Oikos]]
- **Parameter-Matrix**: [[Parameter_Oikos_Matrix#Decay-Rate]]

---

## Meta

**Status**: Geplant  
**Qualität**: Systematisch (geplant)  
**Publikations-Relevanz**: Hoch (Grundlagen-Experiment)

**Notizen**:
- Dies ist das ERSTE systematische Parameter-Experiment
- Dient als Methodologie-Demonstration für weitere Experimente
- Besonders wichtig für Bohmann-Gespräch, da es Gedächtnis-Konzept konkretisiert

---

*Dieses Experiment wurde nach [[Template_Parameter_Experiment]] erstellt und demonstriert die standardisierte Vorgehensweise für systematische Parameter-Variationen.*
