# Parametrik-Labor 🧬

**Quantum-Inspired Stigmergy: Interactive Computational Model for Biosemiotics Research**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/v6t2b9/Parametrik-Labor)

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

**Live Demo:** [https://parametrik-labor.vercel.app](https://parametric-space-explorer.vercel.app/)

---

## 📖 About

An interactive web-based simulation exploring **quantum-inspired stigmergy models** for computational validation of biosemiotic phenomena. Implements three agent-based models (M1: Classical, M2: Context-Switching, M3: Quantum-Inspired) to test predictions from quantum cognition research.

### Key Features

#### Core Simulation
✅ **9-Dimensional Parameter Control** - Model, Physical, Semiotic, Temporal, Resonance, Ecosystem, Visual, Effects, Performance
✅ **3 Stigmergy Models** - Classical (M1), Context-Switching (M2), Quantum-Inspired (M3)
✅ **Multi-Species Ecosystem** - 3 basis species (red/green/blue) with species-specific parameter overrides
✅ **Species Interaction Matrix (3×3)** - Two-tier control system:
  - **Universal Baseline Settings** - Global multipliers for attraction (same-species) and repulsion (cross-species)
  - **Interaction Matrix** - Fine-grained per-species-pair tuning (-2.0 to +2.0)
✅ **Quantum Mechanics** - Superposition states, phase-dependent trails, interference patterns
✅ **51+ Presets** - 8 global + 43 dimension-specific curated configurations
✅ **Auto-Optimizer** - Adaptive performance scaling (30-120 FPS targets)

#### Visualization & Rendering
✅ **WebGL-Accelerated Rendering** - GPU-based trail rendering for high performance
✅ **Flexible Aspect Ratios** - 1:1, 16:9, 9:16, 3:2, 4:3, 21:9, and more
✅ **4 Blend Modes** - Additive, Average, Multiply, Screen
✅ **11+ Post-Processing Effects** - Motion blur, bloom, chromatic aberration, vignette, scanlines, pixelation
✅ **High-DPI Support** - Sharp rendering on retina displays (up to 2x devicePixelRatio)

#### Audio Reactivity 🎵
✅ **Audio Oikos Modulation System** - Real-time music analysis with 7+ spectral features
✅ **Auto-Harmonizer (Adaptive Normalization)** - Learns each song's unique range for maximum visual contrast
  - Advanced configuration: Window size (3-30s), Smoothing factor (0.1-10%), Exaggeration (0.5-2.0)
  - Maximizes dynamics for quiet/narrow-range music
✅ **Dynamic Role Mapping System** 🧬 - Audio-driven ecosystem roles
  - 5 functional roles: Builder (bass), Harvester (mid), Consumer (arousal), Decomposer (dissonance), Scout (treble)
  - Configurable thresholds & hysteresis (minimum duration)
  - Role-specific behavior modifiers (speed, deposit, sensor range)
✅ **Interference Patterns** - Consonance → synchronized waves, Dissonance → chaotic turbulence
✅ **Beat Pulse Modulation** - Explosive impulse responses on beats (6x deposit flash)
✅ **Multi-Scale Temporal Structure** - Micro (100ms), Meso (500ms), Macro (4s) time windows
✅ **5 Audio Presets** - Default, Bass-Heavy, Ambient, Chaotic, Minimal

#### Export & Sharing 📤
✅ **Professional Quality Controls** - 3 quality presets (Standard, High, Very High)
  - **Standard:** 8 Mbps video / Quality 10 GIF - Good balance
  - **High:** 12 Mbps video / Quality 5 GIF - Recommended (default)
  - **Very High:** 18 Mbps video / Quality 2 GIF + Floyd-Steinberg dithering - Maximum quality
✅ **Variable Frame Rates** - 30 FPS (smaller files) or 60 FPS (smoother, larger files)
✅ **Multiple Export Formats:**
  - **WebM (VP9):** Universal browser support, excellent compression
  - **MP4 (H.264):** iOS-compatible, native video format
  - **iOS Video:** MP4 + keyframe JPG with Web Share API integration
  - **GIF:** Universal support with optional dithering for quality
✅ **iOS/Android Integration** - Native share sheets for direct-to-Photos export
✅ **Screenshot Capture** - High-quality PNG export with current canvas state
✅ **Smart Recording Workflow** - Automatic capture with real-time progress indicators

#### Progressive Web App (PWA) 📱
✅ **Cross-Platform Installation** - Optimized for iOS, Android, and Desktop
✅ **iOS-Optimized:**
  - Fullscreen standalone mode without Safari UI
  - Black-translucent status bar
  - Notch/Dynamic Island safe area support
  - Native splash screen on launch
✅ **Android-Optimized:**
  - Custom install prompt (appears after 3 seconds)
  - BeforeInstallPrompt handler
  - Maskable/adaptive icons
  - Dismissible with 7-day cooldown
✅ **Offline-First Architecture** - Works completely offline after first visit
  - Workbox-powered service worker
  - Intelligent caching strategies
  - 5MB cache limit for large assets
  - Background updates
✅ **Web Share API Integration** - iOS/Android native share sheets for exports
✅ **App Shortcuts** - Quick access to new visualizations from home screen
✅ **Self-Hosting Ready** - Configurable base path for flexible deployment

#### UX & Interface
✅ **Sticky Peek Canvas (Desktop)** - Canvas partially visible at top while scrolling through parameters
✅ **Vertical Layout** - Natural top-to-bottom flow with sticky visual feedback
✅ **Mobile-Optimized** - Responsive drawer interface with touch controls
✅ **Fullscreen Mode** - Distraction-free visualization with ESC exit

#### Open Science
✅ **AGPL v3 Licensed** - Strong copyleft ensures derivatives remain open source forever
✅ **Pre-registered Protocols** - Falsification criteria and validation benchmarks
✅ **Full Attribution** - All derivatives must credit original work

---

## 🧬 Quantum-Inspired Stigmergy Models

### M1: Classical Stigmergy (Baseline)
Standard pheromone-based navigation. Agents sense → turn → move → deposit trails.
**Parameters:** 7 (sensor angle/distance, turn speed, deposit, decay, etc.)
**Predictions:** Symmetric (A→B ≈ B→A), Additive trails, Context-independent

### M2: Context-Switching
Classical + explore/exploit behavioral modes based on local pheromone density.
**Parameters:** 10 (7 base + 3 context)
**Predictions:** Slight asymmetry, Some saturation, Mode-dependent behavior

### M3: Quantum-Inspired ⚛️
Superposition states + phase-dependent trails + amplitude coupling + interference.
**Parameters:** 11 (7 base + 4 quantum)
**Predictions:** Order effects (A→B ≠ B→A), Destructive/constructive interference, Context-dependence

**Scientific Validation:** Tests against empirical benchmarks (bee learning d=0.40, plant VOC d=-0.50, ant foraging). Uses AIC/BIC model comparison. Pre-registered falsification criteria (Supplement B: Computational Model Protocol).

---

## 📂 Project Structure

```
Parametrik-Labor/
├── src/                          # Application source code
│   ├── components/               # React components (UI panels)
│   ├── engine/                   # Simulation engines
│   │   ├── SimulationEngine.ts          # Legacy classical engine
│   │   ├── QuantumStigmergyEngine.ts    # M1/M2/M3 models
│   │   ├── MusicReactiveEngine.ts       # Audio-reactive simulation
│   │   └── ComplexMath.ts               # Quantum math utilities
│   ├── audio/                    # Audio analysis & modulation
│   │   ├── AudioOikosModulator.ts       # Master modulation system
│   │   ├── AudioAnalyzer.ts             # Music feature extraction
│   │   ├── BeatPulseModulator.ts        # Beat impulse modulation
│   │   ├── InterferenceModulator.ts     # Consonance/dissonance detection
│   │   ├── MultiScaleModulator.ts       # Multi-timescale tracking
│   │   └── AdaptiveNormalizer.ts        # Adaptive contrast maximization
│   ├── store/                    # Zustand state management
│   ├── presets/                  # Curated parameter configurations
│   └── types/                    # TypeScript definitions
├── public/                       # Static assets
├── docs/                         # Documentation & research papers
│   ├── README.md                        # Documentation index
│   ├── guides/                          # User guides
│   ├── development/                     # Developer documentation
│   ├── research/                        # Scientific papers
│   ├── experiments/                     # Experimental protocols
│   └── archive/                         # Outdated documentation
├── package.json                  # Dependencies & scripts
├── vite.config.ts                # Vite build configuration
├── tsconfig.json                 # TypeScript configuration
└── vercel.json                   # Vercel deployment config
```

---

## 🔬 Research Context

Based on **Supplement B: Computational Model Protocol** from the quantum biosemiotics research program. Part of a multi-phase validation strategy:

- **Phase 1** (Complete): Scoping review of empirical benchmarks
- **Phase 2** (Current): Computational model validation ← **This project**
- **Phase 3** (Planned): Biological experiments with pre-specified effect sizes

**Falsification Criteria:** M3 is NOT supported if:
1. ΔAIC(M3 vs M2) < 10 in ≥2/3 test cases
2. M3 requires >15 parameters (excessive flexibility)
3. M3 fails cross-validation (overfits)
4. M3 predictions deviate >50% from empirical benchmarks

---

## 💻 Technology Stack

- **Frontend:** React 19 + TypeScript
- **State Management:** Zustand
- **Build Tool:** Vite
- **Rendering:** Canvas 2D API + WebGL (hybrid approach)
- **Audio:** Web Audio API (AnalyserNode, FFT), AudioContext
- **Export:** gif.js (GIF encoding with dithering), MediaRecorder API (WebM/MP4/H.264), Web Share API
- **PWA:** vite-plugin-pwa, Workbox service worker, Web App Manifest
- **Performance:** Object pooling, WebGL shaders, requestAnimationFrame, aggressive caching
- **Deployment:** Vercel, self-hosting ready
- **License:** AGPL v3 (Strong Copyleft)

---

## 📚 Documentation

**[📖 Documentation Index](./docs/README.md)** - Complete documentation navigation

### 🗂️ Zettelkasten - Knowledge Vault (NEW!)

**Primary knowledge base** - 55 atomic notes following the Zettelkasten principle:
- **[Zettelkasten Index](./docs/zettelkasten/README.md)** ⭐⭐⭐ - Single Source of Truth for all research concepts
  - 52 atomic notes: Concepts, Parameters, Properties, Methods, Experiments, Metrics, Components
  - 3 MOCs (Maps of Content): Parameter-Effects ⭐⭐⭐, Experimental-Methodology ⭐⭐, Theoretical-Framework ⭐⭐
  - Bidirectional linking, YAML frontmatter, systematic organization

**Key Entry Points:**
- [Parameter-Effects-Map](./docs/zettelkasten/meta/map-parameter-effects.md) - Parameter × Property matrix, design recipes
- [Experimental-Methodology-Map](./docs/zettelkasten/meta/map-experimental-methodology.md) - Systematic experimental workflows
- [Theoretical-Framework-Map](./docs/zettelkasten/meta/map-theoretical-framework.md) - Core concepts connected

### User Documentation
- **[User Guide](./docs/guides/user-guide.md)** - Complete guide to using the app
- **[Von Stigmergie zu Ökosemiotik](./docs/research/Von_Stigmergie_zu_Oekosemiotik.md)** - Theoretical foundation narrative
- **[Parameter Matrix](./docs/research/Parameter_Oikos_Matrix.md)** - Matrix view + design recipes
- **[Experiments](./docs/experiments/Experimentelle_Sektion_Index.md)** - Validation experiments

### Developer Documentation
- **[Development Guide](./docs/development/DEVELOPMENT.md)** - Setup, architecture, and development workflow
- **[Architecture Overview](./docs/development/ARCHITECTURE.md)** - System architecture and design patterns
- **[Deployment Guide](./docs/development/DEPLOYMENT.md)** - Build, deploy, and PWA configuration
- **[Self-Hosting Guide](./SELF_HOSTING.md)** - Self-hosting with PWA support
- **[Contributing Guidelines](./CONTRIBUTING.md)** - How to contribute to the project

---

## 🎯 Usage

### Installing as PWA

The app is a full-featured Progressive Web App optimized for all platforms:

#### **iOS Installation (Safari)**
1. Open the app in **Safari** (required for PWA features)
2. Tap the **Share button** (box with arrow)
3. Scroll down and select **"Add to Home Screen"**
4. Tap **"Add"** in the top right

**iOS Features:**
- ✅ Fullscreen mode (no Safari UI)
- ✅ Black translucent status bar
- ✅ Notch/Dynamic Island support
- ✅ Native splash screen
- ✅ Web Share API for exports

#### **Android Installation (Chrome)**
1. Open the app in **Chrome**
2. **Custom install banner** appears after 3 seconds
3. Tap **"Install"** on the banner
4. Or: Menu (⋮) → **"Install app"** / **"Add to Home Screen"**

**Android Features:**
- ✅ BeforeInstallPrompt integration
- ✅ Maskable/adaptive icons
- ✅ Custom install UI
- ✅ Web Share API for exports
- ✅ App shortcuts from icon

#### **Desktop Installation (Chrome/Edge/Brave)**
1. Visit the app in Chrome, Edge, or Brave
2. Look for **install icon (⊕)** in address bar
3. Click **"Install"**
4. Launch from app menu or desktop

**Desktop Features:**
- ✅ Standalone window
- ✅ Desktop app icon
- ✅ Taskbar/dock integration

#### **PWA Benefits:**
- 📴 **Works offline** - Full functionality without internet
- ⚡ **Instant loading** - Cached resources load immediately
- 🔄 **Auto-updates** - Service worker updates in background
- 📤 **Native sharing** - iOS/Android share sheets for exports
- 💾 **Persistent state** - Preferences saved locally
- 🚀 **App-like experience** - No browser UI clutter

### Basic Workflow

1. **Select Model:** Go to 🧬 Model Oikos tab
2. **Choose M1/M2/M3:** Click model button to switch
3. **Adjust Parameters:** Tune quantum parameters (phase rotation, amplitude coupling, etc.)
4. **Load Presets:** Try "Plasma Dream", "Neon Jungle", "Digital Rain", etc.
5. **Observe Behaviors:**
   - M1: Stable trails, simple patterns
   - M2: Dynamic explore/exploit switching
   - M3: Complex interference, order-dependent patterns, trail aging

### Export & Capture

#### Quality Settings

Before exporting, configure quality and performance:

**Quality Presets:**
- **Standard** (8 Mbps video / Quality 10 GIF) - Good balance for social media
- **High** (12 Mbps video / Quality 5 GIF) - Recommended default, excellent quality
- **Very High** (18 Mbps video / Quality 2 GIF + dithering) - Maximum quality for archival

**Frame Rate:**
- **30 FPS** - Smaller files, smooth playback (recommended for most uses)
- **60 FPS** - Ultra-smooth motion, larger files (best for fast animations)

#### Export Formats

**📸 Screenshot:**
- Click `📸 Screenshot` to capture current frame as high-quality PNG
- Perfect for sharing single frames or posters

**🎬 Video Export:**
1. Select `🎬 Video` from export mode
2. Choose your format:
   - **WebM (VP9)** - Best compression, universal browser support, recommended for web
   - **MP4 (H.264)** - iOS-compatible, native video format, great for mobile
   - **iOS Video** - MP4 + keyframe JPG with native iOS sharing (see below)
   - **GIF** - Universal compatibility, larger files, optional dithering for quality
3. Select quality preset: `Standard`, `High`, or `Very High`
4. Select frame rate: `30 FPS` or `60 FPS`
5. Select duration: `3s`, `8s`, or `12s`
6. Click `🎥 Record [FORMAT] ([DURATION]s)`
7. Wait for automatic capture → processing → download/share

**🔁 GIF Loop (Social Media Optimized):**
1. Select `🔁 GIF Loop (2s with fade)` from export mode
2. Configure quality preset (High recommended for social media)
3. Click `🎥 Record GIF Loop (2s)`
4. Result: Seamlessly looping 2-second GIF with fade transitions

#### iOS Integration

When using **iOS Video** format on iOS devices:
1. After recording completes, native **Share Sheet** appears automatically
2. Tap **"Save to Photos"** to save MP4 + keyframe to Camera Roll
3. Use with **intoLive** app (free) to create Live Photos for animated wallpapers
4. Or share directly to Messages, Instagram, etc.

**Why iOS Video?** Browsers can't create true Live Photos due to Apple's proprietary format, but this workflow provides the best mobile experience with one-tap sharing.

#### Format Comparison

| Format | Quality | File Size | Compatibility | Best For |
|--------|---------|-----------|---------------|----------|
| **WebM (VP9)** | Excellent | Small | Modern browsers | Web sharing, embedding |
| **MP4 (H.264)** | Excellent | Medium | Universal | Mobile, iOS, general use |
| **iOS Video** | Excellent | Medium | iOS/Android native | Live Photos workflow, wallpapers |
| **GIF** | Good-Excellent* | Large | Universal | Social media, legacy support |

*With Very High quality + dithering

#### Tips for Best Results

- **Social Media:** Use High quality GIF Loop or WebM at 30 FPS
- **iOS Wallpapers:** Use iOS Video format with Very High quality at 60 FPS
- **Archival:** Use Very High quality WebM or MP4 at 60 FPS
- **File Size Matters:** Use Standard quality at 30 FPS, WebM format
- **Maximum Quality:** Use Very High preset with 60 FPS, enable dithering for GIF

**Status Indicators:**
- `🔴 Capturing... X/Y` - Frames being captured
- `⏳ Processing GIF... X%` - GIF encoding in progress (can take time for Very High quality)
- Download/share starts automatically when complete

### Desktop Layout

On desktop (≥768px width), the interface uses a **vertical sticky peek layout**:
- **Top:** Canvas + control bar (sticky, peeks out ~400-500px when scrolling)
- **Bottom:** Parameter panels (scrollable)

When you scroll down through the parameter controls, the **canvas remains partially visible at the top**, allowing you to **see parameter changes in real-time** without scrolling back!

### Aspect Ratios

Available aspect ratios for export and display:
- **Square:** 1:1
- **Landscape:** 16:9, 3:2, 4:3, 21:9 (ultrawide)
- **Portrait:** 9:16, 2:3, 3:4, 9:21 (ultra portrait)

Select from the `📐 Aspect Ratio` dropdown in the control bar.

---

## 🤝 Contributing

Contributions welcome! This is an open science project. See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## 📄 License

**GNU Affero General Public License v3.0 (AGPL v3)**

This project is licensed under AGPL v3, ensuring:
- ✅ The software remains **open source forever**
- ✅ All derivatives must **share their source code**
- ✅ **Network/web service** deployments must provide source code to users
- ✅ **Attribution required** in all derivative works
- ✅ Same freedoms guaranteed for all future versions

See [LICENSE](./LICENSE) for full details.

**Why AGPL v3?**
As an open science project for biosemiotics research, we believe in maximum transparency. AGPL v3 ensures that all improvements and modifications remain accessible to the research community, even when deployed as web services.

---

## 🙏 Acknowledgments

Research inspired by:
- Quantum cognition and biosemiotics literature
- Stigmergy in ant colonies, slime molds, plant signaling
- Agent-based modeling and complex adaptive systems

**References:**
- Kheradmand et al. (2025). Honey bees can use sequence learning. *iScience*.
- Leon-Reyes et al. (2010). Salicylate-mediated suppression. *Planta*.
- Grassé (1959). La reconstruction du nid. *Insectes Sociaux*.
- Dorigo & Stützle (2004). *Ant Colony Optimization*. MIT Press.

---

**Ready to explore emergent quantum coordination? Try the live demo!** 🚀
