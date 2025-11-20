---
id: moc-experimental-methodology
title: Map of Content - Experimental Methodology
type: moc
category: navigation
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [moc, experiments, methodology, workflows, best-practices]
related:
  - "[[map-parameter-effects.md]]"
  - "[[../methods/systematic-variation.md]]"
  - "[[../experiments/single-parameter-variation.md]]"
sources:
  - "[[../../experiments/Experimentelle_Sektion_Index.md]]"
---

# Map of Content: Experimental Methodology

**Zentrale MOC für experimentelles Arbeiten im Parametrik-Labor**

Diese Map aggregiert **Methoden**, **Experimentklassen**, **Metriken** und **Best Practices** für systematische Untersuchung ökosemiotischer Systeme.

---

## Quick Start: Experimentelle Workflows

### Workflow 1: Neuen Parameter untersuchen

```yaml
Ziel: "Was macht Parameter X?"

Schritte:
1. Theorie konsultieren
   → [[map-parameter-effects.md]] - Ist Parameter bereits dokumentiert?
   → [[../concepts/parameter-as-oikos.md]] - Welche Oikos-Dimension?

2. Hypothese formulieren
   → [[../methods/theory-guided-hypotheses.md]]
   → "Erwartung: Parameter X beeinflusst Eigenschaft Y weil..."

3. Einzelparameter-Variation durchführen
   → [[../experiments/single-parameter-variation.md]]
   → [[../../experiments/Template_Parameter_Experiment.md]]

4. Iterative Vertiefung
   → [[../methods/iterative-deepening.md]]
   → Runde 1 (grob), Runde 2 (fein), Runde 3 (Grenzfälle)

5. Ergebnisse dokumentieren
   → [[../methods/qualitative-quantitative-capture.md]]
   → Update [[map-parameter-effects.md]]
```

### Workflow 2: Parameter-Interaktion verstehen

```yaml
Ziel: "Wie wirken Parameter X und Y zusammen?"

Schritte:
1. Einzelparameter-Variationen zuerst
   → Verstehe X und Y isoliert (siehe Workflow 1)

2. Hypothese über Interaktion
   → "Erwartung: X und Y wirken synergistisch/antagonistisch weil..."

3. Parameter-Kombination durchführen
   → [[../experiments/parameter-combination.md]]
   → 2-Parameter-Grid (z.B. 3×3 = 9 Runs)

4. Interaktionstyp identifizieren
   → Additiv, Synergetisch, Antagonistisch, Qualitative Umkehrung
   → Siehe [[#interaktionstypen]]

5. Dokumentieren
   → Update [[map-parameter-effects.md#parameter-interdependenzen]]
```

### Workflow 3: Sinnvollen Parameter-Bereich definieren

```yaml
Ziel: "Welche Werte sind praktisch nutzbar?"

Schritte:
1. Grenzfall-Exploration
   → [[../experiments/boundary-exploration.md]]
   → Teste Extreme: sehr niedrig, sehr hoch

2. Grenzen identifizieren
   → Untere Grenze: "Ab wo kollabiert System?"
   → Obere Grenze: "Bis wo ist System nutzbar?"

3. Dokumentieren in Parameter-Notiz
   → z.B. [[../parameters/decay-rate.md#range]]
   → "Sinnvoller Bereich: X - Y"
```

### Workflow 4: Modi vergleichen

```yaml
Ziel: "Wie unterscheiden sich MYZEL, STIGMERGIE, RESONANZ?"

Schritte:
1. Parameter-Set festlegen
   → Identisch für alle Modi

2. Modi-Vergleich durchführen
   → [[../experiments/mode-comparison.md]]

3. Modusspezifische Effekte identifizieren
   → Welche Eigenschaften sind modus-abhängig?
   → Welche sind modus-invariant?

4. Theoretische Validierung
   → Bestätigt Modi-Vergleich die ökosemiotische These?
   → [[../concepts/oekosemiotik.md#drei-fundamentale-verschiebungen]]
```

---

## Methoden-Übersicht

### 4 Kern-Methoden

1. **[[../methods/systematic-variation.md]]** ⭐
   - **Was**: Ein Parameter variieren, alle anderen konstant
   - **Wann**: Parameter-Effekt isolieren
   - **Kombination**: Basis für alle anderen Methoden

2. **[[../methods/theory-guided-hypotheses.md]]** ⭐
   - **Was**: Hypothesen vor Experiment formulieren
   - **Wann**: IMMER (auch bei Exploration)
   - **Vorteil**: Überraschungen erkennbar

3. **[[../methods/iterative-deepening.md]]**
   - **Was**: Grob → Fein → Grenzfall (3 Runden)
   - **Wann**: Schwellenwerte präzise lokalisieren
   - **Effizienz**: 10× weniger Runs als vollständige Exploration

4. **[[../methods/qualitative-quantitative-capture.md]]**
   - **Was**: Duale Erfassung (visuell + numerisch)
   - **Wann**: Bei JEDEM Experiment
   - **Taxonomie**: Struktur, Stabilität, Textur, Dynamik

---

## Experimentklassen-Übersicht

### 4 Design-Patterns

1. **[[../experiments/single-parameter-variation.md]]** ⭐ (am häufigsten)
   - **Ziel**: Isolierter Effekt eines Parameters
   - **Design**: Ein Parameter × 5-7 Werte
   - **Output**: Parameter-Oikos-Matrix-Eintrag, Schwellenwerte

2. **[[../experiments/parameter-combination.md]]** (für Interaktionen)
   - **Ziel**: Synergie/Antagonismus identifizieren
   - **Design**: 2-Parameter-Grid (3×3 oder 4×4)
   - **Output**: Interaktionstyp, Sweet Spots

3. **[[../experiments/mode-comparison.md]]** (für Modi)
   - **Ziel**: MYZEL vs. STIGMERGIE vs. RESONANZ
   - **Design**: Gleiche Parameter, 3 Modi
   - **Output**: Modusspezifische Eigenschaften

4. **[[../experiments/boundary-exploration.md]]** (für Grenzen)
   - **Ziel**: Sinnvolle Ranges, theoretische Limits
   - **Design**: Extreme Werte testen
   - **Output**: Untere/obere Grenzen, Edge-Cases

---

## Metriken-Übersicht

### Implementiert ✅

1. **[[../metrics/ridge-point-analysis.md]]** ⭐
   - **Was misst es**: Hotspot-Anzahl, -Intensität, -Verteilung
   - **Wann nutzen**: Standard für alle Experimente
   - **Interpretation**:
     - < 100 Ridge Points: Wenige intensive Cluster
     - 100-500: Typische Cluster-Muster
     - > 500: Granulare, verteilte Hotspots

2. **[[../metrics/structural-similarity.md]]** ⭐
   - **Was misst es**: Ähnlichkeit zwischen Mustern (0.0-1.0)
   - **Wann nutzen**: Reproduzierbarkeit, Parameter-Effekt-Stärke, Seed-Sensitivität
   - **Interpretation**:
     - > 0.9: Fast identisch
     - 0.7-0.9: Ähnlich
     - < 0.5: Sehr unterschiedlich

### Geplant 🔜

3. **[[../metrics/entropy-measurement.md]]**
   - **Was misst es**: Ordnung vs. Chaos (Shannon-Entropie)
   - **Wann nutzen**: Kristallinität vs. Chaos quantifizieren
   - **Interpretation**:
     - < 4.0 bits: Geordnet, kristallin
     - 4.0-6.0 bits: Balanciert
     - > 6.0 bits: Chaotisch

4. **[[../metrics/fractal-dimension.md]]**
   - **Was misst es**: Raum-Füllung, Selbstähnlichkeit (1.0-2.0)
   - **Wann nutzen**: Netzwerk-Topologie, Kristallinität
   - **Interpretation**:
     - 1.0-1.3: Linear
     - 1.3-1.6: Verzweigt (kristallin)
     - 1.6-2.0: Flächenfüllend

---

## Kritische Schwellenwerte (Experimentelle Befunde)

### Parameter-Schwellenwerte

Basierend auf empirischen/theoretischen Erkenntnissen aus [[map-parameter-effects.md]]:

```yaml
decay-rate (Physikalische Oikos):
  - Kritischer Punkt: ~0.935
  - Unterhalb: Instabile, oszillierende Muster
  - Oberhalb: Stabile, persistente Cluster
  - Sinnvoller Bereich: 0.85 - 0.99
  - Quelle: Theoretische Analyse + Iterative Vertiefung (geplant)

repulsion-strength (Resonanz-Oikos):
  - Kritischer Punkt: ~-0.5 ("Harmonie-Schwelle")
  - Unterhalb (<-0.5): Starke Segregation, territoriale Muster
  - Oberhalb (>-0.5): Schwache Segregation, Koexistenz
  - Sinnvoller Bereich: -1.5 - 0.0
  - Quelle: Parameter-Oikos-Matrix

sensor-distance (Semiotische Oikos):
  - Kritischer Punkt: ~25 (für Separation)
  - Unterhalb: Separation unmöglich (keine Fernwahrnehmung)
  - Oberhalb: Separation möglich
  - Sinnvoller Bereich: 5 - 50
  - Quelle: Theoretische Analyse (Fernwahrnehmung-Hypothese)

chaos-interval (Temporale Oikos):
  - Paradox-Bereich: 250-350 frames
  - Erwartung: Chaos reduziert Stabilität
  - Überraschung: Moderate Chaos-Injection ERHÖHT Makro-Stabilität!
  - Mechanismus: Loop-Breaking (siehe [[../properties/stability.md#chaos-injection-paradox]])
```

### Property-Korrelationen

```yaml
Kristallinität (crystallinity):
  - Maximiert durch: decay > 0.97 + diffusion < 1
  - Quantifiziert als: Entropie < 3.5 bits, Fraktale Dim 1.3-1.6
  - Anti-korreliert mit: Fluidität, Chaos

Stabilität (stability):
  - Maximiert durch: decay > 0.95 + deposit > 20
  - Quantifiziert als: Ridge-Point-Varianz < 10% über 200 Steps
  - Paradox: Moderate Chaos-Injection kann Stabilität ERHÖHEN

Separation (separation):
  - Erfordert: repulsion < -0.5 + sensorDist > 25 + crossSpeciesInteraction: true
  - Nur in: RESONANZ-Modus
  - Quantifiziert als: Segregation-Index > 0.7
```

---

## Interaktionstypen

### 1. Additive Effekte (keine Interaktion)

```yaml
Definition: Effekt(X) + Effekt(Y) = Effekt(X+Y)

Beispiel:
  deposit + agentCount → Ridge Points (linear additiv)

Interpretation:
  - X und Y wirken unabhängig
  - Kein Synergie/Konflikt

Test:
  - Lineare Regression: R² > 0.9
```

### 2. Synergetische Effekte (positive Interaktion)

```yaml
Definition: Effekt(X+Y) > Effekt(X) + Effekt(Y)

Beispiel:
  deposit × agentCount → Ridge Points (super-linear)
  Mechanismus: Mehr Agents × mehr Deposit → akkumulative Dynamik

Interpretation:
  - X und Y verstärken sich gegenseitig
  - "Sweet Spot" bei bestimmter Kombination

Test:
  - Nichtlineare Regression
  - Heatmap zeigt "Hotspot" bei Kombination
```

### 3. Antagonistische Effekte (negative Interaktion)

```yaml
Definition: Effekt(X+Y) < Effekt(X) + Effekt(Y)

Beispiel:
  decay × diffusion → Kristallinität (Trade-off)
  Mechanismus: Decay schärft, Diffusion verwischt → Konflikt

Interpretation:
  - X und Y hemmen sich gegenseitig
  - Balance nötig

Test:
  - Heatmap zeigt "diagonal Pattern" (Trade-off)
```

### 4. Qualitative Umkehrung (komplexe Interaktion)

```yaml
Definition: Effekt(X) ändert VORZEICHEN abhängig von Y

Beispiel:
  attraction (hoch) + repulsion (stark negativ)
    → Clusterbildung UND Separation (beides gleichzeitig!)

  Ohne Repulsion:
    → Nur Clusterbildung

Interpretation:
  - Y "schaltet" X-Effekt qualitativ um
  - Emergente Eigenschaft nur bei Kombination

Test:
  - Kreuzende Linien im Interaktions-Plot
```

---

## Best Practices

### Experimentelles Design

```yaml
1. Hypothese IMMER formulieren
   ✅ "Ich erwarte X weil Y"
   ❌ "Mal schauen was passiert"

2. Vollständige Parameter-Dokumentation
   ✅ Alle Parameter dokumentiert (auch "Standard")
   ❌ "Andere Parameter wie üblich"

3. Systematische Benennung
   ✅ EXP001_Decay_0.99_oekosemiotik.png
   ❌ screenshot_123.png

4. Baseline sorgfältig wählen
   ✅ Bekannter stabiler Zustand (z.B. RESONANZ-Preset)
   ❌ Zufällige Parameter-Kombination

5. Iterations-Range anpassen
   ✅ Runde 1: 5-7 Werte (grob), Runde 2: 10 Werte (fein)
   ❌ Sofort 20 Werte (ineffizient)
```

### Datenerfassung

```yaml
1. Dual-Erfassung
   ✅ Qualitativ (Struktur, Stabilität, Textur, Dynamik) + Quantitativ (Metriken)
   ❌ Nur Screenshot ODER nur Metriken

2. Metriken-Standard
   ✅ Ridge Points + Similarity (mindestens)
   ⭐ + Entropie + Fraktale Dimension (wenn implementiert)

3. Überraschungen hervorheben
   ✅ "⚠️ ÜBERRASCHUNG: Erwartung war X, beobachtet Y"
   ❌ Abweichungen ignorieren

4. Reproduzierbarkeit
   ✅ Seed dokumentieren, gleicher Seed → identisches Muster testen
   ❌ Seed nicht dokumentiert
```

### Dokumentation

```yaml
1. Parameter-Oikos-Matrix aktualisieren
   ✅ Nach jedem Experiment: Matrix-Eintrag prüfen/updaten
   → [[map-parameter-effects.md]]

2. Experiment-Template nutzen
   ✅ [[../../experiments/Template_Parameter_Experiment.md]]
   → Standardisierte Struktur

3. Folge-Experimente notieren
   ✅ "Offene Fragen" → Konkrete Folge-Experimente
   ❌ Ergebnisse dokumentieren, aber nicht iterieren

4. Null-Ergebnisse dokumentieren
   ✅ "Kein Effekt beobachtet" ist ein Ergebnis!
   ❌ Nur positive Befunde dokumentieren
```

---

## Häufige Fehler & Lösungen

### Fehler 1: "Zu viele Parameter variieren"

```yaml
Problem:
  - 3+ Parameter gleichzeitig variiert
  - Ursache-Wirkungs-Beziehung unklar

Lösung:
  - [[../methods/systematic-variation.md]]: Ein Parameter pro Experiment
  - Falls Interaktion wichtig: [[../experiments/parameter-combination.md]] (max 2 Parameter)
```

### Fehler 2: "Baseline-Abhängigkeit ignoriert"

```yaml
Problem:
  - Decay-Effekt bei agentCount: 1000 gemessen
  - Effekt bei agentCount: 8000 anders!
  - Schlussfolgerung: "Decay hat Effekt X" (zu pauschal)

Lösung:
  - Teste mehrere Baselines (verschiedene Kontexte)
  - Dokumentiere Baseline-Abhängigkeit
  - Formuliere: "Bei Baseline Y hat Decay Effekt X"
```

### Fehler 3: "Grenzfälle überspringen"

```yaml
Problem:
  - Systematische Variation: [0.90, 0.92, 0.94, 0.96, 0.98]
  - Interessanter Bereich bei 0.88 übersehen!

Lösung:
  - Runde 1 MUSS gesamte Range abdecken
  - [[../methods/iterative-deepening.md]]: Erst breit, dann tief
```

### Fehler 4: "Qualitativ ≠ Quantitativ → Verwirrt"

```yaml
Problem:
  - Qualitativ: "Sieht sehr stabil aus"
  - Quantitativ: Ridge-Point-Varianz: 25% (hoch!)
  - "Was stimmt nicht?"

Lösung:
  - Diskrepanz ist Chance für Klärung!
  - Möglicherweise: Mikro- vs. Makro-Stabilität
  - [[../methods/qualitative-quantitative-capture.md#umgang-mit-diskrepanzen]]
```

### Fehler 5: "Hypothese vergessen"

```yaml
Problem:
  - Experiment ohne Hypothese durchgeführt
  - Ergebnis: "Es sieht anders aus"
  - Aber: Entspricht das Erwartung? Unklar.

Lösung:
  - [[../methods/theory-guided-hypotheses.md]]: IMMER Hypothese
  - Auch bei Exploration: "Erwartung: keine Ahnung, aber falls X dann Y"
```

---

## Verbindungen

### Andere MOCs

- **[[map-parameter-effects.md]]** ⭐⭐⭐ - Parameter × Property Matrix (Ergebnisse)
- *(Geplant)* `map-system-architecture.md` - System-Komponenten (für Entwickler)

### Konzepte

- [[../concepts/parameter-as-oikos.md]] - Theoretische Grundlage für experimentelles Design
- [[../concepts/emergenz.md]] - Schwellenwerte sind emergente Phänomene
- [[../concepts/oekosemiotik.md]] - Ökosemiotische Wende experimentell validieren

### Templates

- [[../../experiments/Template_Parameter_Experiment.md]] - Standard-Template für Einzelparameter-Variation
- [[../../experiments/Experimentelle_Sektion_Index.md]] - Legacy-Index (umfassender, nicht-atomar)

---

## Externe Ressourcen

- **Parameter-Oikos-Matrix** (Legacy): [[../../research/Parameter_Oikos_Matrix.md]]
  → Wird sukzessive durch atomare Notizen + MOCs ersetzt

- **Experimentelle Sektion** (Legacy): [[../../experiments/Experimentelle_Sektion_Index.md]]
  → Enthält zusätzliche methodische Details (noch nicht vollständig extrahiert)

---

**Status**: Living Document - wird mit jedem Experiment erweitert! 🔬

⭐ = Kern-Methode/-Experimentklasse (am häufigsten verwendet)
