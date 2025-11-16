# Template: Parameter-Experiment

```yaml
---
title: [Name des Experiments]
type: Experiment
status: [Geplant / In Arbeit / Abgeschlossen]
created: [YYYY-MM-DD]
experiment_id: [EXPXXX]
tags:
  - experiment
  - [parameter-name]
  - [oikos-dimension]
related:
  - "[[Experimentelle_Sektion_Index]]"
  - "[[Parameter_Oikos_Matrix]]"
  - "[[Von_Stigmergie_zu_Oekosemiotik]]"
---
```

## Experiment-Übersicht

**Experiment-ID**: EXPXXX  
**Datum**: [YYYY-MM-DD]  
**Durchgeführt von**: [Name]  
**Dauer**: [Zeit für Durchführung]

---

## 1. Forschungsfrage

**Zentrale Frage**:  
[Was genau soll untersucht werden?]

**Theoretischer Hintergrund**:  
[Warum ist diese Frage relevant für Ökosemiotik?]

**Hypothese**:  
[Was erwarten wir zu beobachten?]

---

## 2. Experimentelles Design

### Zu variierender Parameter

**Parameter**: [Name, z.B. "Decay Rate"]  
**Oikos-Dimension**: [Physikalisch / Semiotisch / Temporal / Resonanz]  
**Variations-Range**: [z.B. 0.85, 0.90, 0.95, 0.99]  
**Step-Size**: [z.B. 0.05]

### Fixierte Parameter (Baseline)

```yaml
Modus: [Myzel / Stigmergie / Resonanz]

Physikalische Oikos:
  decayRate: [Wert oder VARIED]
  diffusionFreq: [Wert]
  fadeStrength: [Wert]
  trailSaturation: [Wert]

Semiotische Oikos:
  sensorDist: [Wert]
  sensorAngle: [Wert]
  deposit: [Wert]
  turnSpeed: [Wert]

Temporale Oikos:
  speed: [Wert]
  agentCount: [Wert]
  chaosInterval: [Wert]
  chaosStrength: [Wert]

Resonanz Oikos (falls Resonanz-Modus):
  attractionStrength: [Wert]
  repulsionStrength: [Wert]
  crossSpeciesInteraction: [true/false]

Visualisierung:
  brightness: [Wert]
  glowIntensity: [Wert]
  contrast: [Wert]

Simulation:
  steps: [Anzahl Schritte, z.B. 500]
  seed: [Seed für Reproduzierbarkeit]
```

---

## 3. Durchführung

### Variations-Tabelle

| Run | Parameter-Wert | Screenshot | Ridge Points | Avg Intensity | Notizen |
|-----|----------------|------------|--------------|---------------|---------|
| 1   | [Wert 1]       | ![[EXP_]] | [Anzahl]     | [Wert]        | [Qualitative Beschreibung] |
| 2   | [Wert 2]       | ![[EXP_]] | [Anzahl]     | [Wert]        | [Qualitative Beschreibung] |
| 3   | [Wert 3]       | ![[EXP_]] | [Anzahl]     | [Wert]        | [Qualitative Beschreibung] |
| 4   | [Wert 4]       | ![[EXP_]] | [Anzahl]     | [Wert]        | [Qualitative Beschreibung] |

### Qualitative Beschreibungen

#### Run 1: [Parameter-Wert 1]
**Visuelle Eigenschaften**:
- Struktur: [homogen / netzwerkartig / cluster-basiert / chaotisch]
- Stabilität: [stabil / oszillierend / kollabierend / explosiv]
- Textur: [glatt / faserig / granular / kristallin]
- Dynamik: [statisch / fließend / pulsierend / turbulent]

**Besonderheiten**: [Auffällige Merkmale]

#### Run 2: [Parameter-Wert 2]
[Wie oben]

#### Run 3: [Parameter-Wert 3]
[Wie oben]

#### Run 4: [Parameter-Wert 4]
[Wie oben]

---

## 4. Quantitative Ergebnisse

### Metriken-Übersicht

| Parameter-Wert | Ridge Points | Avg Intensity | Entropie | Korrelationslänge | Fraktale Dim |
|----------------|--------------|---------------|----------|-------------------|--------------|
| [Wert 1]       | [Anzahl]     | [Wert]        | [Wert]   | [Wert]            | [Wert]       |
| [Wert 2]       | [Anzahl]     | [Wert]        | [Wert]   | [Wert]            | [Wert]       |
| [Wert 3]       | [Anzahl]     | [Wert]        | [Wert]   | [Wert]            | [Wert]       |
| [Wert 4]       | [Anzahl]     | [Wert]        | [Wert]   | [Wert]            | [Wert]       |

### Trend-Analyse

**Beobachteter Trend**:
[Linear / Exponentiell / Schwellenwert / Nichtlinear / Kein klarer Trend]

**Grafische Darstellung**:
[Optional: Diagramm einfügen]

---

## 5. Analyse & Interpretation

### Übereinstimmung mit Hypothese

**Hypothese bestätigt?**: [Ja / Teilweise / Nein]

**Begründung**:
[Warum wurde Hypothese bestätigt/widerlegt?]

### Überraschende Beobachtungen

⚠️ **ÜBERRASCHUNG**: [Falls vorhanden]

**Erwartung**: [Was wir erwartet hatten]  
**Beobachtung**: [Was tatsächlich passiert ist]  
**Mögliche Erklärungen**:
1. [Erklärung 1]
2. [Erklärung 2]
3. [Erklärung 3]

### Theoretische Implikationen

**Was zeigt dieses Experiment über Parameter-Oikos?**
[Verbindung zur Theorie herstellen]

**Relevanz für zentrale ökosemiotische These**:
[Wie unterstützt/erweitert/widerlegt das Experiment die Kernthesen?]

---

## 6. Schlussfolgerungen

### Zentrale Erkenntnisse

1. [Erkenntnis 1]
2. [Erkenntnis 2]
3. [Erkenntnis 3]

### Einfluss auf Parameter-Oikos-Matrix

**Update für Matrix**:
```
Parameter: [Name]
Emergente Eigenschaft: [z.B. "Clusterbildung"]
Effekt: [+++, ++, +, -, --, ---]
Begründung: [Kurze Erklärung]
```

**Zu aktualisierende Einträge**: [[Parameter_Oikos_Matrix#[Relevant Section]]]

---

## 7. Nächste Schritte

### Folge-Experimente

- [ ] [[Experiment_Name_1]]: [Kurze Beschreibung warum dieses Folge-Experiment sinnvoll ist]
- [ ] [[Experiment_Name_2]]: [Beschreibung]

### Offene Fragen

1. [Frage 1, die durch dieses Experiment aufgeworfen wurde]
2. [Frage 2]
3. [Frage 3]

### Methodische Verbesserungen

[Was könnte beim nächsten Mal besser gemacht werden?]

---

## 8. Reproduzierbarkeit

### Exakte Parameter-Dokumentation (Copy-Paste Ready)

```javascript
// Ökosemiotik Labor v3.1 Einstellungen
// Experiment: [EXPXXX]

// Modus
setMode('[myzel/stigmergie/resonanz]');

// Physikalische Oikos
setDecayRate([Wert]);
setDiffusionFreq([Wert]);
setFadeStrength([Wert]);
setTrailSaturation([Wert]);

// Semiotische Oikos
setSensorDist([Wert]);
setSensorAngle([Wert]);
setDeposit([Wert]);
setTurnSpeed([Wert]);

// Temporale Oikos
setSpeed([Wert]);
setAgentCount([Wert]);
setChaosInterval([Wert]);
setChaosStrength([Wert]);

// Resonanz Oikos (falls relevant)
setAttractionStrength([Wert]);
setRepulsionStrength([Wert]);
setCrossSpeciesInteraction([true/false]);

// Visualisierung
setBrightness([Wert]);
setGlowIntensity([Wert]);
setContrast([Wert]);

// Simulation
simulationSteps = [Anzahl];
seed = "[Seed-String]";
```

### Dateien & Assets

**Screenshots**: `experiments/EXPXXX/screenshots/`  
**Raw Data** (falls vorhanden): `experiments/EXPXXX/data/`  
**Code/Scripts** (falls relevant): `experiments/EXPXXX/scripts/`

---

## Verbindungen

- **Experimentelle Sektion**: [[Experimentelle_Sektion_Index]]
- **Verwandte Experimente**: [[Experiment_X]] | [[Experiment_Y]]
- **Theoretische Grundlagen**: [[Von_Stigmergie_zu_Oekosemiotik]] | [[Parameter_als_Oikos]]
- **Parameter-Matrix**: [[Parameter_Oikos_Matrix]]

---

## Meta

**Status**: [Geplant / In Arbeit / Abgeschlossen / Abgebrochen]  
**Qualität**: [Explorativ / Systematisch / Validiert]  
**Publikations-Relevanz**: [Niedrig / Mittel / Hoch]

---

*Template Version: 1.0*  
*Für neue Experimente: Kopiere dieses Template und ersetze alle [Platzhalter]*
