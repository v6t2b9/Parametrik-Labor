---
id: method-qualitative-quantitative-capture
title: Qualitative + Quantitative Erfassung
type: method
category: experimental-methodology
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [method, experiment, qualitative, quantitative, metrics, observation]
related:
  - "[[../metrics/ridge-point-analysis.md]]"
  - "[[../metrics/structural-similarity.md]]"
  - "[[../metrics/entropy-measurement.md]]"
sources:
  - "[[../../experiments/Experimentelle_Sektion_Index.md]]"
---

## Definition

**Qualitative + Quantitative Erfassung** ist die Methode, emergente Muster **dual** zu dokumentieren:

1. **Qualitativ**: Visuelle Beschreibung, phänomenologische Beobachtung
2. **Quantitativ**: Numerische Metriken, objektive Messungen

## Prinzip

```yaml
Dual-Erfassung:

Qualitativ (menschliche Wahrnehmung):
  - "Das Muster sieht kristallin aus"
  - "Cluster oszillieren leicht"
  - "Starke Kontraste zwischen Hotspots"
  - "Organisch, Lavalampen-artig"

Quantitativ (maschinelle Messung):
  - Ridge Points: 1250
  - Avg Intensity: 142.5
  - Entropie: 4.2 bits
  - Fraktale Dimension: 1.67

Synergy: Qualitativ liefert Kontext, Quantitativ liefert Vergleichbarkeit
```

## Theoretischer Hintergrund

### Komplementarität qualitativer und quantitativer Daten

**Qualitativ**: Reichhaltig, kontextual, interpretativ
- ✅ Erfasst emergente Phänomene, die schwer zu quantifizieren sind
- ✅ Liefert theoretische Inspiration ("Das sieht aus wie...")
- ❌ Subjektiv, schwer vergleichbar
- ❌ Nicht für statistische Analyse geeignet

**Quantitativ**: Präzise, objektiv, vergleichbar
- ✅ Ermöglicht exakte Vergleiche ("142.5 vs. 89.3")
- ✅ Statistische Trends erkennbar
- ❌ Kann wichtige Nuancen übersehen
- ❌ "Was gemessen wird" ist nicht immer "was relevant ist"

**Kombination**: Nutzt Stärken beider Ansätze

| Aspekt | Qualitativ | Quantitativ | Synergy |
|---|---|---|---|
| Muster-Typ | "Kristallin" | Fraktale Dim: 1.4 | Kristallinität quantifiziert |
| Stabilität | "Oszilliert leicht" | Ridge-Point-Varianz: 8% | Oszillations-Stärke messbar |
| Kontrast | "Starke Hotspots" | Peak/Avg Ratio: 3.2 | Kontrast-Intensität numerisch |

### Ökosemiotische Perspektive

Emergente Muster haben **mehrere semiotische Ebenen**:

```yaml
# Visuell-phänomenologisch (Qualitativ)
"Das Muster 'sagt' Kristallinität" → menschliche Zeicheninterpretation

# Strukturell-quantitativ (Quantitativ)
Fraktale Dimension = 1.4 → mathematische Signatur

# Theorie-Brücke
"Kristallinität" ↔ "Fraktale Dimension 1.3-1.5"
  → Qualitativ und Quantitativ referenzieren dasselbe emergente Phänomen
```

Siehe [[../concepts/emergenz.md]] für Emergenz-Theorie.

## Qualitative Erfassungs-Kategorien

### Standard-Taxonomie

**Struktur**:
- `homogen` - Gleichverteilte Intensität
- `netzwerkartig` - Verzweigte, verbundene Pfade
- `cluster-basiert` - Lokalisierte Hotspots
- `chaotisch` - Keine erkennbare Ordnung

**Stabilität**:
- `stabil` - Muster ändert sich kaum über Zeit
- `oszillierend` - Periodische Veränderungen
- `kollabierend` - Muster zerfällt
- `explosiv` - Unkontrolliertes Wachstum

**Textur**:
- `glatt` - Homogene Intensitätsverteilung
- `faserig` - Lineare Strukturen
- `granular` - Punktförmige Hotspots
- `kristallin` - Geometrische Formen

**Dynamik**:
- `statisch` - Kaum Veränderung
- `fließend` - Smooth, kontinuierliche Morphing
- `pulsierend` - Rhythmische Expansion/Kontraktion
- `turbulent` - Chaotische, rapide Veränderung

### Erweiterte Deskriptoren

**Geometrisch**:
- Symmetrien (rotational, bilateral, translational)
- Fraktale Selbstähnlichkeit
- Hierarchische Struktur

**Farblich** (für Multi-Spezies):
- Segregation (klar getrennte Farbbereiche)
- Durchmischung (gemischte Farben)
- Dominanz (eine Farbe überwiegt)

**Temporal**:
- Periodizität (wiederkehrende Muster)
- Drift (langsame Veränderung in eine Richtung)
- Metastabilität (lange stabil, dann plötzlicher Wechsel)

## Quantitative Metriken

### Implementiert

#### 1. Ridge-Point-Analyse (siehe [[../metrics/ridge-point-analysis.md]])

```javascript
// Anzahl lokaler Maxima (Hotspots)
ridgePoints.length

// Durchschnitts-Intensität
avgIntensity = sum(ridgePoints.intensity) / count

// Farbverteilung (Multi-Spezies)
colorRatio = {r: 0.33, g: 0.35, b: 0.32}
```

**Interpretation**:
- Viele Ridge Points → granulare, verteilte Struktur
- Wenige Ridge Points → wenige, aber intensive Cluster
- Hohe Avg Intensity → dichte Hotspots

#### 2. Strukturelle Ähnlichkeit (siehe [[../metrics/structural-similarity.md]])

```javascript
// Hamming-Distance zwischen Pattern-Hashes
similarity = matches / max(fp1.length, fp2.length)
```

**Interpretation**:
- Similarity > 0.9 → fast identisch
- Similarity 0.7-0.9 → ähnlich
- Similarity < 0.5 → sehr unterschiedlich

### Geplant (Priorität)

#### 3. Entropie (siehe [[../metrics/entropy-measurement.md]])

```javascript
// Shannon-Entropie über Pixel-Intensitäten
H = -Σ p(i) * log2(p(i))
```

**Interpretation**:
- Hohe Entropie → chaotisch, ungeordnet
- Niedrige Entropie → strukturiert, geordnet

#### 4. Fraktale Dimension (siehe [[../metrics/fractal-dimension.md]])

```javascript
// Box-Counting Dimension
D = log(N(ε)) / log(1/ε)
```

**Interpretation**:
- D ≈ 1.0-1.3 → lineare Strukturen
- D ≈ 1.4-1.7 → verzweigte Netzwerke
- D ≈ 1.8-2.0 → flächenfüllende Muster

#### 5. Korrelationslänge

```javascript
// Auto-Korrelation
C(r) = <I(x) * I(x+r)> / <I(x)²>
```

**Interpretation**:
- Kleine ξ → lokalisierte Strukturen
- Große ξ → globale Korrelation

## Erfassungs-Workflow

### Schritt-für-Schritt

```yaml
1. Simulation durchführen
   - Parameter setzen
   - Steps ausführen (z.B. 500)
   - Final State erreichen

2. Screenshot speichern
   - Dateiname: [ExperimentID]_[Parameter]_[Wert].png
   - Hohe Auflösung (mindestens 800×800)

3. Quantitative Metriken erfassen
   - Ridge-Point-Analyse durchführen
   - Similarity zu Baseline berechnen
   - (Weitere Metriken falls implementiert)

4. Qualitative Beschreibung notieren
   - Struktur: [homogen / netzwerkartig / ...]
   - Stabilität: [stabil / oszillierend / ...]
   - Textur: [glatt / faserig / ...]
   - Dynamik: [statisch / fließend / ...]
   - Besonderheiten: [Freier Text]

5. Dokumentation zusammenführen
   - In Experiment-Datei eintragen
   - Screenshot verlinken
   - Metriken-Tabelle befüllen
```

### Template-Integration

Im [[../../experiments/Template_Parameter_Experiment.md|Experiment-Template]]:

```markdown
### Variations-Tabelle

| Run | Parameter-Wert | Screenshot | Ridge Points | Avg Intensity | Notizen |
|-----|----------------|------------|--------------|---------------|---------|
| 1   | 0.85           | ![[...]]   | 450          | 89.3          | Chaotisch, instabil |
| 2   | 0.94           | ![[...]]   | 1250         | 142.5         | Stabil, kristallin |

### Qualitative Beschreibungen

#### Run 1: Decay 0.85
**Visuelle Eigenschaften**:
- Struktur: chaotisch
- Stabilität: kollabierend
- Textur: granular
- Dynamik: turbulent

**Besonderheiten**: Cluster bilden sich und zerfallen rapiditierend
```

## Korrespondenz: Qualitativ ↔ Quantitativ

### Mapping etablieren

Ziel: **Qualitative Deskriptoren** mit **quantitativen Metriken** verbinden

| Qualitativ | Quantitativ | Schwellenwert |
|---|---|---|
| "Stabil" | Ridge-Point-Varianz | < 10% über 200 Steps |
| "Chaotisch" | Entropie | > 5.0 bits |
| "Kristallin" | Fraktale Dimension | 1.3 - 1.6 |
| "Homogen" | Ridge-Point-Count | < 100 |
| "Clusterbasiert" | Ridge-Point-Count | > 500 |
| "Intensiv" | Avg Intensity | > 150 |

**Vorteil**: Qualitative Aussagen werden **objektiv prüfbar**

```yaml
Behauptung: "Decay > 0.95 erzeugt kristalline Muster"

Test:
  - Qualitativ: Beobachter kategorisiert als "kristallin" ✓
  - Quantitativ: Fraktale Dimension = 1.42 (innerhalb 1.3-1.6) ✓
  → Behauptung unterstützt
```

## Umgang mit Diskrepanzen

### Qualitativ ≠ Quantitativ

**Was tun wenn Qualitativ und Quantitativ nicht übereinstimmen?**

```yaml
Beispiel:

Qualitativ: "Das Muster sieht sehr stabil aus"
Quantitativ: Ridge-Point-Varianz = 25% (hoch!)

Mögliche Erklärungen:
1. Metrik misst falschen Aspekt
   → Ridge Points oszillieren, aber Gesamt-Topologie stabil
   → Lösung: Andere Metrik (z.B. topologische Persistenz)

2. Visuelle Wahrnehmung täuscht
   → "Sieht stabil aus" weil langsame Veränderung
   → Lösung: Längere Beobachtungszeit

3. Definition von "Stabilität" unklar
   → Mikro-Stabilität (Punkte) vs. Makro-Stabilität (Topologie)
   → Lösung: Präzisere Definition

→ Diskrepanz ist Anlass für theoretische Klärung!
```

## Best Practices

### 1. Standardisierte qualitative Kategorien

**Immer** aus Standard-Taxonomie wählen:

```yaml
# ✅ RICHTIG
Struktur: netzwerkartig
Stabilität: oszillierend
Textur: faserig

# ❌ FALSCH (nicht-standardisiert)
"Sieht irgendwie komisch aus"
"Ziemlich cool"
```

### 2. Metriken IMMER dokumentieren

Auch wenn "offensichtlich":

```yaml
# ❌ FALSCH
"Sehr viele Ridge Points"

# ✅ RICHTIG
Ridge Points: 1250
Vergleich zu Baseline (450): +178%
```

### 3. Screenshots mit Metriken kombinieren

```markdown
![Screenshot](path/to/image.png)

**Metriken**:
- Ridge Points: 1250
- Avg Intensity: 142.5
- Similarity to Baseline: 0.42

**Qualitativ**: Kristallin, stabil, faserige Textur
```

### 4. "Besonderheiten" für Nuancen

Kategor ien sind begrenzt – "Besonderheiten" erfassen Einzigartiges:

```markdown
**Besonderheiten**:
- Asymmetrische Cluster-Verteilung (mehr links als rechts)
- Periodisches "Atmen" der Hotspots (Period ≈ 50 Steps)
- Einzelner "Super-Cluster" mit Intensity > 240
```

## Langfristiges Ziel: Automatisierung

### Vision

```yaml
Aktuell (manuell):
  - Screenshots visuell betrachten
  - Kategorien manuell zuweisen
  - Metriken händisch dokumentieren

Zukünftig (automatisiert):
  - ML-Klassifikator: Screenshot → Kategorien
  - Automatische Metrik-Berechnung
  - Datenbank-basierte Erfassung

Vorteil:
  - Skalierbar (100+ Experimente)
  - Reproduzierbar (keine menschliche Variation)
  - Quantitativ analysierbar (Clustering, PCA)
```

### Schritte zur Automatisierung

1. **Metrik-Implementation**: Entropie, Fraktale Dimension, Korrelationslänge
2. **Kategorien-Mapping**: Qualitativ ↔ Quantitativ Schwellenwerte etablieren
3. **ML-Training**: Klassifikator trainieren (Screenshots → Kategorien)
4. **Pipeline-Integration**: Automatische Erfassung bei jedem Experiment

## Verwandte Methoden

- [[systematic-variation]] - Erfasst Daten aus systematischen Variationen
- [[theory-guided-hypotheses]] - Nutzt qualitative+quantitative Daten für Validierung

## Verwandte Metriken

- [[../metrics/ridge-point-analysis.md]] - Quantitative Hotspot-Analyse
- [[../metrics/structural-similarity.md]] - Quantitativer Muster-Vergleich
- [[../metrics/entropy-measurement.md]] - Quantifizierung von Ordnung/Chaos
- [[../metrics/fractal-dimension.md]] - Quantifizierung von Selbstähnlichkeit

## Verwandte Konzepte

- [[../concepts/emergenz.md]] - Emergente Muster haben qualitative UND quantitative Signaturen
- [[../properties/crystallinity.md]] - Beispiel: Qualitativ "kristallin" ↔ Quantitativ "Fraktale Dim 1.4"
- [[../properties/chaos.md]] - Beispiel: Qualitativ "chaotisch" ↔ Quantitativ "Entropie > 5.0"
