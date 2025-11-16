# Dashboard Concept: Parametric Space Explorer
## Optimales Dashboard für Parameterraum-Exploration

```yaml
---
title: Dashboard Concept - Parametric Space Explorer
type: UI/UX Design Document
status: Concept
created: 2025-11-08
version: 1.0
related:
  - "[[OekosemiotikLaborV5]]"
  - "[[Parameter_Oikos_Matrix]]"
  - "[[parametrics_paper_draft]]"
tags:
  - ui-design
  - dashboard
  - parameter-exploration
  - visualization
---
```

## Vision Statement

**Ziel**: Ein Dashboard, das nicht nur Parameter **kontrolliert**, sondern den **Parameterraum als eigenständigen Forschungsgegenstand** sichtbar macht und systematische Exploration ermöglicht.

**Kern-Paradigma**:
- Parameter sind nicht "Einstellungen" → sie sind **strukturierende Kräfte**
- Das UI zeigt nicht nur "Ausgabe" → es zeigt **Parameter-Effekt-Beziehungen**
- Exploration ist nicht "Trial & Error" → sie ist **systematische Kartographie**

---

## 1. Master Layout: Multi-Panel Architecture

```
┌──────────────────────────────────────────────────────────────────────────┐
│  🔬 Parametric Space Explorer v6.0                    [⚙️] [💾] [📤] [?] │
├────────────────────┬────────────────────────┬────────────────────────────┤
│                    │                        │                            │
│   CANVAS VIEW      │   METRICS PANEL        │   PARAMETER MATRIX         │
│   (Primary)        │   (Live Analysis)      │   (Effect Visualization)   │
│                    │                        │                            │
│   800×800px        │   - Emergent Props     │   - Heatmap                │
│   Simulation       │   - Time Series        │   - Current Config         │
│   Output           │   - Pattern Type       │   - Predicted Effects      │
│                    │                        │                            │
├────────────────────┴────────────────────────┴────────────────────────────┤
│                                                                            │
│   PARAMETER CONTROL CENTER                                                │
│   - Oikos Tabs: Physical | Semiotic | Temporal | Resonance               │
│   - Preset Gallery                                                        │
│   - Experiment Tracker                                                    │
│                                                                            │
├────────────────────────────────────────────────────────────────────────────┤
│   EXPERIMENT LOG (Collapsible)                                            │
│   - Screenshot Timeline                                                   │
│   - Parameter History                                                     │
│   - Comparison Tools                                                      │
└────────────────────────────────────────────────────────────────────────────┘
```

### Responsive Breakpoints

- **Desktop (>1600px)**: 3-column layout (Canvas | Metrics | Matrix)
- **Tablet (1024-1600px)**: 2-column layout (Canvas | Metrics), Matrix in drawer
- **Mobile (<1024px)**: Single column, tabs for switching views

---

## 2. Core Panel Specifications

### 2.1 Canvas View Panel (Primary Visualization)

```
┌─────────────────────────────────────┐
│  🎬 SIMULATION CANVAS               │
│  ┌───────────────────────────────┐  │
│  │                               │  │
│  │                               │  │
│  │    [Live Simulation Output]   │  │
│  │         800×800 Canvas        │  │
│  │                               │  │
│  │                               │  │
│  └───────────────────────────────┘  │
│  ⏯️ Play  ⏸️ Pause  🔄 Reset        │
│  🎥 Screenshot  📹 Record GIF       │
│  ⚡ Speed: [▱▱▱▰▰] 5x               │
│  📊 Frame: 15,432 | FPS: 60        │
│                                     │
│  🎨 OVERLAY MODES:                  │
│  ○ Normal   ● Heatmap  ○ Gradient  │
│  ○ Trails   ○ Agents   ○ Both      │
│                                     │
│  🔍 ANALYSIS LAYERS (toggle):       │
│  ☑ Ridge Detection                 │
│  ☐ Cluster Boundaries              │
│  ☐ Velocity Vectors                │
│  ☐ Density Grid                    │
└─────────────────────────────────────┘
```

**Features**:
- **Overlay Modes**: Verschiedene Visualisierungsformen
  - Normal: Standardansicht
  - Heatmap: Intensitäts-basierte Farbkodierung
  - Gradient: Zeigt Gradienten-Stärke
  - Trails: Nur Spuren, keine Agenten
  - Agents: Nur Agenten-Positionen

- **Analysis Layers**: Einblendbare Analyse-Overlays
  - Ridge Detection: Zeigt erkannte "Kämme" (aus Fingerprint-Konzept)
  - Cluster Boundaries: Konvex-Hull um Cluster
  - Velocity Vectors: Bewegungsrichtungen als Pfeile
  - Density Grid: Raster mit Farb-Kodierung der Dichte

- **Recording Tools**:
  - Screenshot: PNG-Export mit Timestamp + Parameter-Metadaten
  - Record GIF: Automatische GIF-Erstellung (z.B. 10s @ 30fps)

---

### 2.2 Metrics Panel (Live Analysis)

```
┌──────────────────────────────────┐
│  📊 LIVE METRICS                 │
├──────────────────────────────────┤
│                                  │
│  🎯 EMERGENT PROPERTIES          │
│  ┌────────────────────────────┐  │
│  │ Clusterbildung   ████▱ 82% │  │
│  │ Separation       ██▱▱▱ 43% │  │
│  │ Stabilität       █████ 96% │  │
│  │ Chaos            ▱▱▱▱▱  8% │  │
│  │ Netzwerk         ███▱▱ 67% │  │
│  │ Fluidität        ██▱▱▱ 34% │  │
│  │ Kristallinität   ████▱ 89% │  │
│  │ Dichte           ███▱▱ 71% │  │
│  └────────────────────────────┘  │
│                                  │
│  📈 TIME SERIES (last 1000 fr)   │
│  ┌────────────────────────────┐  │
│  │     Stabilität ↗           │  │
│  │ 100│     ╱─────────        │  │
│  │  50│   ╱                   │  │
│  │   0│──┴─────────────────── │  │
│  │     0   500   1000  frames │  │
│  └────────────────────────────┘  │
│  [Select Metric: Stabilität ▼]  │
│                                  │
│  🏷️ PATTERN CLASSIFICATION       │
│  Current: Crystal Growth Niche  │
│  Confidence: 94%                │
│                                  │
│  Similar Patterns:              │
│  • Exp_2024_11_05_003 (97%)    │
│  • Preset: Kristallin (89%)    │
│                                  │
│  🔬 FINGERPRINT                  │
│  ┌────────────────────────────┐  │
│  │  Ridge Points: 127         │  │
│  │  Symmetry: 0.34            │  │
│  │  Complexity: 2.89          │  │
│  │  [View Detail] [Compare]   │  │
│  └────────────────────────────┘  │
└──────────────────────────────────┘
```

**Features**:

#### A. Emergent Properties (Real-Time)
Berechnete Metriken für die 8 Kern-Eigenschaften aus der Matrix:

- **Clusterbildung**: Spatial auto-correlation measure
- **Separation**: Distance between species centroids
- **Stabilität**: Variance of trail distribution over time window
- **Chaos**: Frame-to-frame difference
- **Netzwerk**: Graph connectivity measure (trail skeleton)
- **Fluidität**: Temporal gradient in pattern shape
- **Kristallinität**: Symmetry + edge sharpness detection
- **Dichte**: Peak intensity concentration

#### B. Time Series Graphs
- Scrollbare Zeitreihe für jede Metrik
- Zoom: 100 / 500 / 1000 / 5000 Frames
- Export: CSV-Download

#### C. Pattern Classification
- Machine Learning Klassifikation basierend auf Metriken
- Vergleich mit bekannten "Niches" aus Paper
- Ähnlichkeits-Suche in Experiment-History

#### D. Fingerprint Analysis
- Ridge-Point-Detection (aus OekosemiotikLaborV5.md)
- Strukturelle Signaturen
- Vergleichs-Tools

---

### 2.3 Parameter Matrix Panel (Effect Visualization)

```
┌─────────────────────────────────────┐
│  🗺️ PARAMETER-OIKOS-MATRIX          │
├─────────────────────────────────────┤
│                                     │
│  📍 CURRENT CONFIGURATION:          │
│  Decay: 0.98  Diffusion: 3          │
│  Sensor: 35   Deposit: 20           │
│  → Predicted: Crystal + Network     │
│                                     │
│  🔥 EFFECT HEATMAP:                 │
│  ┌─────────────────────────────┐    │
│  │       Cl Se St Ch Ne Fl Kr De│   │
│  │ Decay ██ ░░ ██ ░░ ▓▓ ░░ ██ ▓▓│  │
│  │ Diffu ▓▓ ░░ ░░ ▓▓ ░░ ██ ░░ ░░│  │
│  │ Senso ░░ ██ ░░ ░░ ██ ░░ ░░ ░░│  │
│  │ Depos ▓▓ ░░ ██ ░░ ▓▓ ░░ ▓▓ ██│  │
│  └─────────────────────────────┘    │
│  Legend: ░░ - | ▓▓ ++ | ██ +++      │
│                                     │
│  🎯 INTERACTIVE:                    │
│  Click cell → Show experiments      │
│  Hover → Tooltip with effect desc   │
│                                     │
│  🧪 RECOMMENDATION ENGINE:          │
│  To increase Netzwerk:              │
│  ✓ sensorDist: 35 → 40 (+++)       │
│  ✓ decayRate: 0.98 → 0.94 (++)     │
│  ✓ agentCount: 2000 → 2500 (++)    │
│  [Apply Suggestion] [Explain]      │
│                                     │
│  📊 PARAMETER SPACE MAP:            │
│  ┌─────────────────────────────┐    │
│  │     Decay                   │    │
│  │ 0.99│   ★ You  ○ Presets    │    │
│  │     │     ○                 │    │
│  │ 0.95│ ○     ○               │    │
│  │     │         ○             │    │
│  │ 0.90│                       │    │
│  │     └───────────────────── │    │
│  │      1   5   10  Diffusion │    │
│  └─────────────────────────────┘    │
│  [Select Axes: Decay × Diffusion ▼]│
└─────────────────────────────────────┘
```

**Features**:

#### A. Effect Heatmap
- Live-Visualisierung der Parameter-Oikos-Matrix
- Farbkodierung: Stärke des Effekts (+++ bis ---)
- Interaktiv: Klick → zeigt Experimente, die diese Zelle bestätigen

#### B. Recommendation Engine
- AI-gestützter Vorschlag basierend auf gewünschter Eigenschaft
- "Ich will mehr X" → System schlägt Parameter-Änderungen vor
- Begründung anzeigen (aus Matrix-Wissen)

#### C. Parameter Space Map
- 2D-Projektion des Parameterraums
- Achsen wählbar (z.B. Decay × Diffusion)
- Zeigt:
  - ★ Aktuelle Position
  - ○ Presets
  - ◆ Vergangene Experimente
  - 🎨 Farbkodierung nach resultierendem Muster

---

### 2.4 Parameter Control Center

```
┌────────────────────────────────────────────────────────────┐
│  🎛️ PARAMETER CONTROL CENTER                               │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  📚 OIKOS TABS:                                            │
│  [ Physical ] [ Semiotic ] [ Temporal ] [ Resonance ]     │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  🌍 PHYSICAL OIKOS                                   │ │
│  │                                                      │ │
│  │  Decay Rate          [▱▱▱▱▰▰▰▰▰▰] 0.98              │ │
│  │  Effect: Cluster+++ Stability+++ Kristall+++        │ │
│  │  ⚠️ High value → Long memory → Stable structures    │ │
│  │                                                      │ │
│  │  Diffusion Freq      [▱▱▱▰▰▰▰▰▰▰] 3                 │ │
│  │  Effect: Fluidity++ Chaos++ Separation--            │ │
│  │  💡 Currently in sweet spot for Network formation   │ │
│  │                                                      │ │
│  │  Fade Strength       [▱▰▰▰▰▰▰▰▰▰] 0.08              │ │
│  │  Trail Saturation    [▱▱▱▱▱▱▱▱▰▰] 200               │ │
│  │                                                      │ │
│  │  [🎲 Randomize] [↩️ Reset to Default] [💾 Save]     │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  🎯 PRESET GALLERY:                                        │
│  ┌────────┬────────┬────────┬────────┬────────┐          │
│  │ Kristal│ Fluid  │ Netzw  │ Chaos  │ Custom │          │
│  │ ████   │ ≈≈≈≈   │ ┣━┳━┫ │ ░▒▓█   │   +    │          │
│  │ [Load] │ [Load] │ [Load] │ [Load] │ [Load] │          │
│  └────────┴────────┴────────┴────────┴────────┘          │
│                                                            │
│  💾 CUSTOM PRESETS (User-Saved):                          │
│  • My_Network_Exp_01  [Load] [Delete] [Share]            │
│  • Resonanz_Test_v3   [Load] [Delete] [Share]            │
│  [➕ Save Current Configuration]                          │
│                                                            │
│  🔗 PARAMETER LINKING:                                     │
│  Link decay ⇄ stability (keep product constant)          │
│  [➕ Add Link] [Manage Links]                             │
└────────────────────────────────────────────────────────────┘
```

**Features**:

#### A. Smart Parameter Controls
Jeder Slider zeigt:
- **Current Value** mit Live-Update
- **Effect Preview**: Welche emergenten Eigenschaften werden beeinflusst (aus Matrix)
- **Contextual Warnings**: z.B. "High decay + high diffusion = contradictory effects"
- **Sweet Spot Indicators**: Visuelle Markierung optimaler Bereiche für bestimmte Muster

#### B. Preset Gallery
- **Visual Thumbnails**: Mini-Preview wie das Muster aussieht
- **Quick Load**: Ein Klick lädt alle Parameter
- **Metadata**: Zeigt Timestamp, Beschreibung, Autor

#### C. Custom Presets
- **Save Current**: Speichert aktuelle Konfiguration mit Name + Beschreibung
- **Share**: Export als JSON/Link zum Teilen
- **Tag System**: Kategorisierung (z.B. #crystal #stable #network)

#### D. Parameter Linking
Advanced Feature:
- Kopplung von Parametern (z.B. "Wenn Decay steigt, senke Diffusion proportional")
- Für systematische Trade-off-Exploration
- Constraint-basierte Exploration

---

### 2.5 Experiment Log (Collapsible Bottom Panel)

```
┌────────────────────────────────────────────────────────────────┐
│  📋 EXPERIMENT LOG                           [⬇️ Collapse] [🗑️] │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  🗓️ SESSION: 2025-11-08_14:32 | Duration: 1h 23m              │
│                                                                │
│  📸 SCREENSHOT TIMELINE (21 captures):                         │
│  ┌────┬────┬────┬────┬────┬────┬────┬────┬────┐ [→ more]     │
│  │ 📷 │ 📷 │ 📷 │ 📷 │ 📷 │ 📷 │ 📷 │ 📷 │ 📷 │              │
│  │ 32 │ 35 │ 41 │ 48 │ 52 │ 67 │ 71 │ 89 │ 95 │              │
│  │ min│ min│ min│ min│ min│ min│ min│ min│ min│              │
│  └────┴────┴────┴────┴────┴────┴────┴────┴────┘              │
│  Click to load parameters & view                              │
│                                                                │
│  📊 PARAMETER HISTORY GRAPH:                                   │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ Decay                                                    │ │
│  │ 0.99│     ╱────╲                                         │ │
│  │ 0.95│   ╱        ╲___                                    │ │
│  │ 0.90│──┴──────────────────────────────────────────────── │ │
│  │      0   20   40   60   80  100  min                     │ │
│  └──────────────────────────────────────────────────────────┘ │
│  [Add Parameter: Diffusion ▼] [Download CSV]                 │
│                                                                │
│  🔄 COMPARISON MODE:                                           │
│  ┌─────────────┬─────────────┬────────────────────┐          │
│  │ Screenshot  │ Screenshot  │ Diff Heatmap       │          │
│  │ #32 (14:35) │ #89 (15:47) │ Changed: 67%       │          │
│  │             │             │                    │          │
│  │   [Image]   │   [Image]   │ [Difference View]  │          │
│  │             │             │                    │          │
│  └─────────────┴─────────────┴────────────────────┘          │
│  Δ Parameters:                                                │
│  • Decay: 0.98 → 0.92 (↓ 0.06)                               │
│  • Diffusion: 3 → 8 (↑ 5)                                    │
│  • Speed: 1.0 → 2.5 (↑ 1.5)                                  │
│  Pattern Change: Crystal → Fluid (Matrix prediction: ✓)     │
│                                                                │
│  [📤 Export Session] [💾 Save Report] [🔄 New Session]        │
└────────────────────────────────────────────────────────────────┘
```

**Features**:

#### A. Screenshot Timeline
- **Auto-Capture**: Optional bei signifikanten Pattern-Changes
- **Manual Capture**: Button in Canvas Panel
- **Metadata Embedded**: Jeder Screenshot speichert:
  - Timestamp
  - Alle Parameter-Werte
  - Berechnete Metriken
  - Pattern-Klassifikation

#### B. Parameter History Graph
- **Multi-Parameter-Overlay**: Mehrere Parameter gleichzeitig visualisieren
- **Correlation View**: Zeigt wie Parameter gemeinsam variiert wurden
- **Export**: CSV für externe Analyse

#### C. Comparison Mode
- **Side-by-Side**: Zwei Screenshots direkt vergleichen
- **Diff Heatmap**: Pixel-Differenz visualisiert
- **Parameter Delta**: Automatische Berechnung der Änderungen
- **Matrix Validation**: "Hat die Matrix die Änderung vorhergesagt?"

#### D. Session Management
- **Export Session**: Alle Screenshots + Parameter + Report als ZIP
- **Save Report**: Markdown-Bericht mit Findings
- **New Session**: Reset Log, behalte Presets

---

## 3. Advanced Features

### 3.1 Multi-View Comparison Mode

```
┌────────────────────────────────────────────────────────────┐
│  🔬 PARAMETER SWEEP MODE                                   │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Sweep Parameter: Decay Rate                              │
│  Range: 0.85 → 0.99 | Steps: 8 | Duration: 500 frames/ea │
│                                                            │
│  ┌──────┬──────┬──────┬──────┐                            │
│  │ 0.85 │ 0.87 │ 0.89 │ 0.91 │  [Grid View: 2×4]         │
│  │[sim] │[sim] │[sim] │[sim] │                            │
│  ├──────┼──────┼──────┼──────┤                            │
│  │ 0.93 │ 0.95 │ 0.97 │ 0.99 │  Status: Running 3/8      │
│  │[sim] │[run] │[wait]│[wait]│                            │
│  └──────┴──────┴──────┴──────┘                            │
│                                                            │
│  ⏯️ [Start Sweep] ⏸️ [Pause] 🎥 [Record All]              │
│                                                            │
│  📊 RESULT AGGREGATION:                                    │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ Metric: Stabilität vs. Decay Rate                   │ │
│  │                                                      │ │
│  │ 100│                    ╱──────                      │ │
│  │  50│              ╱────╱                             │ │
│  │   0│─────────────┴───────────────────────────────── │ │
│  │    0.85  0.88  0.91  0.94  0.97  1.00              │ │
│  │                                                      │ │
│  │  Phase Transition detected at ≈ 0.95!               │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  [Export Results] [Save as Experiment Report]             │
└────────────────────────────────────────────────────────────┘
```

**Use Case**: Systematische Exploration eines Parameters über seinen gesamten Wertebereich

**Features**:
- **Grid View**: Alle Variationen parallel sichtbar
- **Auto-Run**: Sequentielles oder paralleles Ausführen
- **Aggregation**: Automatische Metric-Extraktion über alle Runs
- **Phase Detection**: Algorithmus erkennt qualitative Umschlagpunkte

---

### 3.2 Pattern Fingerprint Analyzer

```
┌─────────────────────────────────────────────────────┐
│  🔍 PATTERN FINGERPRINT ANALYZER                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────┬───────────────────────────────┐   │
│  │             │  STRUCTURAL METRICS:          │   │
│  │  [Pattern]  │                               │   │
│  │             │  Ridge Points: 127            │   │
│  │   Canvas    │  Bifurcations: 34             │   │
│  │  w/ Ridge   │  Endpoints: 89                │   │
│  │  Overlay    │  Loops: 12                    │   │
│  │             │  Symmetry Score: 0.34         │   │
│  │             │  Fractal Dimension: 1.73      │   │
│  └─────────────┤                               │   │
│               │  CLASSIFICATION:               │   │
│               │  Type: Dendritic Network       │   │
│               │  Confidence: 87%               │   │
│               │                                │   │
│               │  SIMILAR PATTERNS:             │   │
│               │  1. Exp_05_Nov [93% match]    │   │
│               │  2. Preset_Network [81%]      │   │
│               │  3. Exp_02_Nov [76%]          │   │
│               └────────────────────────────────┘   │
│                                                     │
│  🧬 FINGERPRINT SIGNATURE (64-dim vector):          │
│  [●●●○○●●○○●●●●○○●...] [Copy] [Compare]            │
│                                                     │
│  📊 SIMILARITY SEARCH in Database:                  │
│  [Search] Min Similarity: 75% [▱▱▱▱▱▱▰▰▰▰]         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Technical Approach**:
- **Ridge Detection**: Skeletonization algorithm auf Trail-Daten
- **Graph Analysis**: Topologische Metriken (basierend auf OekosemiotikLaborV5 Konzept)
- **Feature Vector**: 64-dimensionale Signatur für ML-Vergleiche
- **Database**: Alle Screenshots werden mit Fingerprint indiziert

---

### 3.3 Parameter Recipe Builder

```
┌──────────────────────────────────────────────────────┐
│  👨‍🍳 PARAMETER RECIPE BUILDER                         │
├──────────────────────────────────────────────────────┤
│                                                      │
│  🎯 GOAL: Define desired emergent properties        │
│                                                      │
│  Target Properties (drag to prioritize):            │
│  ┌────────────────────────────────────────────────┐ │
│  │  1. [▓▓▓▓▓▓▓▓▓▓] Netzwerk      (maximize)      │ │
│  │  2. [▓▓▓▓▓▓▱▱▱▱] Stabilität    (high)          │ │
│  │  3. [▓▱▱▱▱▱▱▱▱▱] Chaos         (minimize)      │ │
│  │  4. [▓▓▓▓▓▱▱▱▱▱] Kristallinität (medium)       │ │
│  │  [+] Add Property                              │ │
│  └────────────────────────────────────────────────┘ │
│                                                      │
│  🧠 AI OPTIMIZATION:                                 │
│  ┌────────────────────────────────────────────────┐ │
│  │  Analyzing Parameter-Oikos-Matrix...           │ │
│  │  Found 3 candidate configurations:             │ │
│  │                                                 │ │
│  │  ✅ Recipe A (Match: 94%)                      │ │
│  │     Netzwerk: ████▓ 92%  Stabilität: ███▓ 78% │ │
│  │     • sensorDist: 38                           │ │
│  │     • decayRate: 0.94                          │ │
│  │     • agentCount: 2800                         │ │
│  │     • deposit: 22                              │ │
│  │     [Preview] [Apply] [Explain]                │ │
│  │                                                 │ │
│  │  ○ Recipe B (Match: 87%)                       │ │
│  │  ○ Recipe C (Match: 81%)                       │ │
│  └────────────────────────────────────────────────┘ │
│                                                      │
│  📝 MANUAL OVERRIDE:                                 │
│  [Edit Recipe A] [Start from Scratch]              │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Algorithm**:
1. User definiert gewünschte Properties + Priorität
2. System nutzt Parameter-Oikos-Matrix als Constraint-Set
3. Multi-Objective Optimization (z.B. Genetic Algorithm)
4. Liefert Top-3 Parameter-Konfigurationen
5. User kann testen, iterieren, verfeinern

---

## 4. Technical Architecture

### 4.1 Component Hierarchy

```
App
├── Header (Controls, Session Info)
├── MainLayout
│   ├── CanvasPanel
│   │   ├── SimulationCanvas (WebGL upgrade optional)
│   │   ├── OverlayControls
│   │   ├── AnalysisLayers
│   │   └── RecordingTools
│   ├── MetricsPanel
│   │   ├── EmergentPropertiesDisplay
│   │   ├── TimeSeriesChart (Chart.js / D3)
│   │   ├── PatternClassifier
│   │   └── FingerprintCard
│   └── MatrixPanel
│       ├── EffectHeatmap
│       ├── RecommendationEngine
│       └── ParameterSpaceMap (2D scatter plot)
├── ParameterControlCenter
│   ├── OikosTabs
│   │   ├── PhysicalOikos
│   │   ├── SemioticOikos
│   │   ├── TemporalOikos
│   │   └── ResonanceOikos
│   ├── PresetGallery
│   ├── CustomPresetManager
│   └── ParameterLinker
└── ExperimentLog (Collapsible)
    ├── ScreenshotTimeline
    ├── ParameterHistoryChart
    ├── ComparisonMode
    └── SessionExporter
```

### 4.2 State Management

**Recommendation**: Zustand oder Redux Toolkit

```typescript
// Global State Structure
{
  simulation: {
    running: boolean,
    frameCount: number,
    agents: Agent[],
    trails: {red: Float32Array, green: Float32Array, blue: Float32Array},
    parameters: ParameterSet,
    speed: number
  },

  metrics: {
    current: EmergentProperties,
    timeSeries: TimeSeriesData[],
    patternType: string,
    fingerprint: FingerprintData
  },

  matrix: {
    effects: EffectMatrix,  // From Parameter_Oikos_Matrix.md
    recommendations: Recommendation[],
    parameterSpace: ParameterSpacePoint[]
  },

  experiments: {
    screenshots: Screenshot[],
    parameterHistory: ParameterHistoryEntry[],
    currentSession: Session,
    savedPresets: Preset[]
  },

  ui: {
    activeOikosTab: string,
    canvasOverlayMode: string,
    analysisLayers: string[],
    logExpanded: boolean
  }
}
```

### 4.3 Data Flow

```
User Interaction (Slider, Button)
    ↓
State Update (Zustand action)
    ↓
┌─────────────────┬──────────────────┐
│                 │                  │
Simulation       Metrics           Matrix
Engine           Calculator        Analyzer
  ↓                ↓                 ↓
Canvas           Properties        Effects
Render           Display           Heatmap
  ↓                ↓                 ↓
Screenshot    ─→  Time Series  ←─  Recommendations
  ↓                ↓                 ↓
Experiment Log ←──┴─────────────────┘
```

### 4.4 Key Libraries

**Core**:
- React 18+ (with Hooks)
- TypeScript
- Zustand (State Management)

**Visualization**:
- Canvas API (primary simulation)
- Chart.js or Recharts (time series graphs)
- D3.js (optional, for parameter space map)

**UI Components**:
- Tailwind CSS (styling)
- Radix UI or shadcn/ui (accessible components)
- Framer Motion (animations)

**Analysis**:
- TensorFlow.js (optional, for pattern classification ML)
- image-js (fingerprint analysis)

**Export**:
- canvas-to-blob (screenshots)
- gif.js (GIF recording)
- file-saver (downloads)

---

## 5. Calculation Specifications for Metrics

### 5.1 Emergent Properties (Real-Time)

#### Clusterbildung (0-100%)
```javascript
// Moran's I (spatial autocorrelation)
function calculateClustering(trails, agentPositions) {
  // For each agent, compare trail intensity at position vs. neighbors
  // High similarity → high clustering
  // Use k-nearest neighbors (k=8)
  return moransI(trails, agentPositions);
}
```

#### Separation (0-100%)
```javascript
// Distance between species centroids
function calculateSeparation(agents) {
  const centroids = {
    red: calculateCentroid(agents.filter(a => a.type === 'red')),
    green: calculateCentroid(agents.filter(a => a.type === 'green')),
    blue: calculateCentroid(agents.filter(a => a.type === 'blue'))
  };

  const distances = [
    distance(centroids.red, centroids.green),
    distance(centroids.green, centroids.blue),
    distance(centroids.blue, centroids.red)
  ];

  return normalize(mean(distances), 0, maxPossibleDistance) * 100;
}
```

#### Stabilität (0-100%)
```javascript
// Inverse of temporal variance
function calculateStability(trailsHistory, windowSize = 100) {
  // Compare trail distribution over last N frames
  const variance = calculateVariance(trailsHistory.slice(-windowSize));
  return (1 - normalize(variance, 0, maxVariance)) * 100;
}
```

#### Chaos (0-100%)
```javascript
// Frame-to-frame difference
function calculateChaos(currentFrame, previousFrame) {
  const diff = pixelDifference(currentFrame, previousFrame);
  return normalize(diff, 0, maxPossibleDiff) * 100;
}
```

#### Netzwerk (0-100%)
```javascript
// Graph connectivity of trail skeleton
function calculateNetwork(trails) {
  const skeleton = skeletonize(trails);  // Zhang-Suen algorithm
  const graph = skeletonToGraph(skeleton);
  const connectivity = graph.edges.length / graph.nodes.length;
  return normalize(connectivity, 0, 3) * 100;  // 3 = highly connected
}
```

#### Fluidität (0-100%)
```javascript
// Temporal gradient in pattern shape
function calculateFluidity(shapeHistory, windowSize = 50) {
  // Extract shape descriptor (e.g., moment invariants)
  const shapes = shapeHistory.slice(-windowSize).map(extractShapeDescriptor);
  const gradient = meanGradient(shapes);
  return normalize(gradient, 0, maxGradient) * 100;
}
```

#### Kristallinität (0-100%)
```javascript
// Symmetry + edge sharpness
function calculateCrystallinity(trails) {
  const symmetry = calculateSymmetry(trails);  // Mirror symmetry score
  const edgeSharpness = calculateEdgeSharpness(trails);  // Sobel filter
  return (symmetry * 0.6 + edgeSharpness * 0.4) * 100;
}
```

#### Dichte (0-100%)
```javascript
// Peak intensity concentration
function calculateDensity(trails) {
  const histogram = calculateHistogram(trails, bins = 256);
  const giniCoefficient = calculateGini(histogram);  // Inequality measure
  return giniCoefficient * 100;
}
```

---

### 5.2 Pattern Classification

**Approach**: K-Nearest Neighbors auf 8-dimensionalem Feature-Space

```javascript
const knownPatterns = [
  {
    name: "Crystal Growth Niche",
    features: {
      clustering: 85, separation: 60, stability: 95, chaos: 10,
      network: 40, fluidity: 15, crystallinity: 90, density: 80
    }
  },
  {
    name: "Fluid Dynamics Niche",
    features: {
      clustering: 50, separation: 30, stability: 40, chaos: 75,
      network: 55, fluidity: 90, crystallinity: 20, density: 45
    }
  },
  // ... more patterns from paper
];

function classifyPattern(currentFeatures) {
  const distances = knownPatterns.map(p =>
    euclideanDistance(currentFeatures, p.features)
  );

  const nearest = knownPatterns[argMin(distances)];
  const confidence = 1 - normalize(min(distances), 0, maxDistance);

  return {type: nearest.name, confidence};
}
```

---

### 5.3 Fingerprint Analysis (Ridge Points)

Basierend auf `OekosemiotikLaborV5.md` lines 280-310:

```javascript
function analyzeFingerprint(trails) {
  // 1. Skeletonize
  const skeleton = zhangSuenThinning(trails);

  // 2. Find ridge points
  const ridgePoints = [];
  for (let [x, y] of skeleton) {
    const neighbors = countNeighbors(skeleton, x, y);
    if (neighbors === 1) {
      ridgePoints.push({type: 'endpoint', x, y});
    } else if (neighbors >= 3) {
      ridgePoints.push({type: 'bifurcation', x, y});
    }
  }

  // 3. Calculate metrics
  const endpoints = ridgePoints.filter(p => p.type === 'endpoint').length;
  const bifurcations = ridgePoints.filter(p => p.type === 'bifurcation').length;
  const loops = detectLoops(skeleton);
  const symmetry = calculateSymmetryScore(ridgePoints);
  const fractalDim = boxCountingDimension(skeleton);

  // 4. Generate 64-dim feature vector
  const featureVector = generateFeatureVector(ridgePoints, skeleton);

  return {
    ridgePoints: ridgePoints.length,
    endpoints,
    bifurcations,
    loops,
    symmetry,
    fractalDimension: fractalDim,
    signature: featureVector
  };
}
```

---

## 6. User Workflows

### Workflow 1: Exploratory Session (Beginner)

```
1. User öffnet App
   → Begrüßung: "Willkommen im Parametric Space Explorer"
   → Tutorial-Overlay (optional)

2. User wählt Preset: "Crystal Growth Niche 💎"
   → System lädt Parameter
   → Simulation startet automatisch
   → Metrics Panel zeigt live Kristallinität: 89%

3. User experimentiert mit Sliders
   → Erhöht Diffusion: 1 → 5
   → Metrics Panel: Kristallinität fällt: 89% → 45%
   → Matrix Panel: Warnung "Hohe Diffusion reduziert Kristallinität (--)"

4. User nimmt Screenshot
   → Wird automatisch im Experiment Log gespeichert
   → Timestamp + alle Parameter embedded

5. User lädt anderen Preset: "Fluid Dynamics 🌊"
   → Vergleicht visuell in Experiment Log
   → Comparison Mode zeigt Diff Heatmap

6. Session Ende
   → Export Session als ZIP (Screenshots + Report)
```

### Workflow 2: Systematic Exploration (Advanced)

```
1. User hat Research Question:
   "Bei welchem Decay-Wert kippt das System von Fluid zu Crystal?"

2. User öffnet Parameter Sweep Mode
   → Wählt Parameter: Decay Rate
   → Range: 0.90 → 0.99
   → Steps: 10

3. System führt 10 Simulationen parallel aus
   → Grid View zeigt alle 10 Canvas-Outputs
   → Metrics werden pro Run berechnet

4. User analysiert Result Aggregation Graph
   → Stabilität vs. Decay: Zeigt Phase Transition bei ≈ 0.95
   → Screenshot aller 10 Runs

5. User verfeinert Bereich:
   → Neuer Sweep: 0.93 → 0.97 (5 Steps)
   → Findet exakten Kipppunkt: 0.954

6. User dokumentiert Finding
   → Speichert als "Decay_Phase_Transition_Experiment"
   → Updated Parameter-Oikos-Matrix (falls Abweichung von Vorhersage)
```

### Workflow 3: Goal-Oriented Design (Expert)

```
1. User hat Ziel: "Ich brauche maximale Netzwerk-Bildung + Stabilität"

2. User öffnet Parameter Recipe Builder
   → Setzt Netzwerk: 100%
   → Setzt Stabilität: 90%
   → Setzt Chaos: minimal

3. AI Optimization liefert 3 Kandidaten
   → Recipe A: 94% Match
   → Preview zeigt vorhergesagtes Muster

4. User testet Recipe A
   → Simulation läuft
   → Metrics bestätigen: Netzwerk 92%, Stabilität 88%

5. User tweakt Parameter manuell
   → sensorDist: 38 → 42
   → Metrics verbessern sich: Netzwerk 95%

6. User speichert als Custom Preset: "Optimal_Network_v1"
   → Kann später wiederverwendet werden
```

---

## 7. Progressive Disclosure Strategy

**Problem**: Dashboard ist feature-reich → kann Anfänger überfordern

**Lösung**: Progressive Complexity

### Level 1: Beginner Mode (Default)
```
Sichtbar:
- Canvas Panel (groß)
- Basic Parameter Controls (6 wichtigste Parameter)
- Play/Pause/Reset Buttons
- Preset Gallery

Versteckt:
- Metrics Panel (collapsible)
- Matrix Panel (in drawer)
- Advanced Features (Sweep, Recipe Builder)
- Experiment Log (minimiert)
```

### Level 2: Intermediate Mode
```
User aktiviert via Settings:
- Metrics Panel wird sichtbar (rechts)
- Alle Parameter-Tabs verfügbar
- Screenshot-Tools aktiviert
- Experiment Log expanded
```

### Level 3: Expert Mode
```
Full UI:
- Alle Panels sichtbar
- Advanced Tools (Sweep, Recipe Builder, Fingerprint Analyzer)
- Parameter Linking
- Custom Metrics
```

**Trigger**: System bietet automatisch Upgrade an nach:
- 10 Minuten Nutzung → "Intermediate Mode freischalten?"
- 30 Screenshots → "Expert Tools freischalten?"

---

## 8. Visual Design System

### Color Palette

```css
/* Base Colors (Dark Theme) */
--bg-primary: #0a0a15;       /* Deep dark blue-black */
--bg-secondary: #13141f;     /* Slightly lighter */
--bg-tertiary: #1c1d2e;      /* Cards, panels */

/* Accent Colors */
--accent-primary: #7d5dbd;   /* Purple (parametric) */
--accent-secondary: #5d9dbd; /* Blue (data) */
--accent-tertiary: #bd5d7d;  /* Pink (emergent) */

/* Semantic Colors */
--success: #4caf50;          /* Green */
--warning: #ff9800;          /* Orange */
--error: #f44336;            /* Red */
--info: #2196f3;             /* Blue */

/* Text */
--text-primary: #e0e0e0;     /* Light gray */
--text-secondary: #a0a0b0;   /* Darker gray */
--text-muted: #6a6a7a;       /* Very dark gray */

/* Borders */
--border-primary: #2a2b3a;   /* Subtle borders */
--border-secondary: #3a3b4a; /* Stronger borders */

/* Gradients */
--gradient-parametric: linear-gradient(135deg, #7d5dbd 0%, #5d9dbd 100%);
--gradient-emergent: linear-gradient(135deg, #bd5d7d 0%, #7d5dbd 100%);
```

### Typography

```css
/* Font Stack */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

/* Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */

/* Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Spacing System (8px Grid)

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### Component Styling Examples

#### Card Component
```css
.card {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: 8px;
  padding: var(--space-4);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.card:hover {
  border-color: var(--accent-primary);
  box-shadow: 0 4px 16px rgba(125, 93, 189, 0.2);
}
```

#### Slider Component
```css
input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  background: var(--bg-secondary);
  border-radius: 3px;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  background: var(--accent-primary);
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 0 8px var(--accent-primary);
}
```

---

## 9. Performance Considerations

### Canvas Rendering Optimization

```javascript
// Use OffscreenCanvas for background processing
const offscreen = new OffscreenCanvas(GRID_SIZE, GRID_SIZE);
const offscreenCtx = offscreen.getContext('2d');

// Render in worker thread
const worker = new Worker('simulation-worker.js');
worker.postMessage({trails, agents, parameters});

worker.onmessage = (e) => {
  // Copy ImageData to main canvas
  mainCtx.putImageData(e.data.imageData, 0, 0);
};
```

### Metrics Calculation Throttling

```javascript
// Don't calculate every frame - only every N frames
const METRICS_CALCULATION_INTERVAL = 30; // Every 30 frames ≈ 0.5s at 60fps

if (frameCount % METRICS_CALCULATION_INTERVAL === 0) {
  const metrics = calculateAllMetrics(trails, agents);
  updateMetricsDisplay(metrics);
  addToTimeSeries(metrics);
}
```

### Memory Management

```javascript
// Limit time series storage
const MAX_TIME_SERIES_LENGTH = 10000;

function addToTimeSeries(metrics) {
  timeSeries.push({frame: frameCount, ...metrics});

  if (timeSeries.length > MAX_TIME_SERIES_LENGTH) {
    // Downsample: keep every 2nd entry
    timeSeries = timeSeries.filter((_, i) => i % 2 === 0);
  }
}
```

---

## 10. Accessibility Features

### Keyboard Navigation

```
Tab: Navigate through controls
Space: Play/Pause simulation
R: Reset simulation
S: Take screenshot
1-4: Switch Oikos tabs
Arrows: Adjust focused slider
+/-: Increase/decrease simulation speed
```

### Screen Reader Support

```jsx
<button
  aria-label="Start simulation"
  aria-pressed={running}
  onClick={toggleSimulation}
>
  {running ? '⏸️' : '⏯️'}
</button>

<input
  type="range"
  aria-label="Decay rate parameter"
  aria-valuemin={0.85}
  aria-valuemax={0.99}
  aria-valuenow={decayRate}
  aria-valuetext={`${decayRate.toFixed(2)} - affects trail persistence`}
/>
```

### High Contrast Mode

```css
@media (prefers-contrast: high) {
  :root {
    --bg-primary: #000000;
    --text-primary: #ffffff;
    --border-primary: #ffffff;
    --accent-primary: #ffff00;
  }
}
```

---

## 11. Implementation Roadmap

### Phase 1: Core MVP (2-3 weeks)
- [ ] Canvas Panel mit Simulation Engine
- [ ] Basic Parameter Controls (alle 4 Oikos)
- [ ] Preset System (4 built-in Presets)
- [ ] Play/Pause/Reset Funktionalität
- [ ] Screenshot-Export

### Phase 2: Metrics & Analysis (2 weeks)
- [ ] Metrics Panel mit 8 emergenten Eigenschaften
- [ ] Time Series Graphs
- [ ] Pattern Classification (KNN)
- [ ] Experiment Log (Screenshot Timeline)

### Phase 3: Matrix Integration (1-2 weeks)
- [ ] Parameter-Oikos-Matrix Panel
- [ ] Effect Heatmap Visualisierung
- [ ] Parameter Space Map (2D)
- [ ] Matrix-basierte Warnungen

### Phase 4: Advanced Features (2-3 weeks)
- [ ] Parameter Sweep Mode
- [ ] Comparison Mode
- [ ] Recipe Builder
- [ ] Fingerprint Analyzer
- [ ] Parameter Linking

### Phase 5: Polish & Optimization (1 week)
- [ ] Performance Optimization (Worker Threads)
- [ ] UI/UX Refinement
- [ ] Progressive Disclosure
- [ ] Accessibility Audit
- [ ] Documentation

**Total Estimate**: 8-11 weeks für vollständige Implementierung

---

## 12. Open Questions & Future Enhancements

### Open Questions
1. **WebGL vs Canvas 2D**: Für sehr große Simulationen (10k+ agents) - WebGL erwägen?
2. **Backend Storage**: Sollen Experimente in Cloud gespeichert werden oder nur lokal?
3. **Collaboration**: Multi-User-Modus für gemeinsame Exploration?
4. **ML Training**: Soll Pattern Classifier on-device trainiert werden können?

### Future Enhancements (Post-MVP)
- **3D Visualization**: Räumliche Darstellung des Parameterraums
- **Video Export**: MP4-Export statt nur GIF
- **Custom Metrics**: User definiert eigene emergente Eigenschaften
- **API Integration**: REST API für externe Tools
- **VR Mode**: Immersive Parameter-Exploration in VR
- **Multi-Species Expansion**: >3 Agent-Types
- **Temporal Patterns**: Fourier-Analysis für periodische Muster

---

## Conclusion

Dieses Dashboard-Konzept transformiert die Parameter-Exploration von "Trial & Error" zu **systematischer wissenschaftlicher Untersuchung**.

**Kern-Innovation**:
- Parameter nicht als "Settings" sondern als **Forschungsgegenstand**
- Parameter-Oikos-Matrix als **navigationales Werkzeug**
- Emergente Eigenschaften als **First-Class Citizens**

**Next Steps**:
1. User-Feedback zu diesem Konzept einholen
2. High-Fidelity Mockups erstellen (z.B. in Figma)
3. Phase 1 Implementierung starten

---

**Version**: 1.0
**Author**: Claude
**Date**: 2025-11-08
**Status**: Ready for Review & Implementation
