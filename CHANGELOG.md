# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Species Interaction Matrix (3×3)** 🧬
  - Fine-grained control of cross-species pheromone trail responses
  - Per-species interaction values: Red↔Red, Red↔Green, Red↔Blue, Green↔Red, etc.
  - Range: -2.0 (strong repulsion) to +2.0 (strong attraction), 0 = neutral
  - Universal baseline settings + species-specific overrides
  - UI restructured: Universal tab shows baseline, Species tabs show 3 interaction sliders each
  - Engine integration: Both SimulationEngine and QuantumStigmergyEngine use matrix values
  - Enables complex ecosystem dynamics (symbiosis, competition, territoriality)

- **Advanced Auto-Harmonizer Configuration** ⚙️
  - Configurable adaptive normalization parameters (previously fixed)
  - Window Size slider (3-30 seconds): Controls history length for learning
  - Smoothing Factor slider (0.1-10%): Controls adaptation speed
  - Exaggeration slider (0.5-2.0): Dramatic effect control (amplify/compress extremes)
  - Real-time configuration while music is playing
  - Optimizes visual dynamics for quiet or narrow-range music

- **Dynamic Role Mapping System** 🎭
  - Audio-driven ecosystem roles: Agents dynamically assume functional behaviors
  - **5 Functional Roles:**
    - 🏗️ **Builder** (triggered by bass): Slow movement, high trail deposition
    - 🌾 **Harvester** (triggered by mid frequencies): Extended sensors, normal speed
    - 🔥 **Consumer** (triggered by arousal/tempo): Fast movement, trail following
    - 🍄 **Decomposer** (triggered by dissonance): Low deposit, dispersal behavior
    - 🔭 **Scout** (triggered by treble): Very fast, long-range sensors
  - **Role Assignment Logic:**
    - Threshold-based assignment per audio feature
    - Hysteresis (minimum duration) prevents rapid role switching
    - Intensity-based signal strength (0-1) for smooth blending
    - RoleAssigner class with configurable thresholds
  - **Behavior Modification:**
    - Role modifiers multiply audio-reactive modulation
    - Per-role speed, deposit rate, sensor range/angle modifications
    - Maintains audio reactivity while adding role-specific behavior
  - **UI Controls:**
    - Enable/Disable toggle in Audio tab
    - Min Role Duration slider (10-120 frames)
    - Per-role threshold sliders (0.3-0.9 for each role)
    - Visual role icons and clear descriptions
  - **Engine Integration:**
    - MusicReactiveEngine initializes RoleAssigner when enabled
    - Role assignment in updateMusicAnalysis()
    - applyRoleModifiers() blends role & audio modulation

- **Audio Oikos - Complete Music Reactivity System** 🎵
  - **AudioOikosModulator** - Master modulation system integrating 5 specialized classes
  - **AdaptiveNormalizer** - Auto-Harmonizer that learns each song's unique frequency range for maximum visual contrast
    - Sliding window normalization (1-second history)
    - Power curve exaggeration (exponents 2.0-3.0) for dramatic visual responses
  - **InterferenceModulator** - Multi-dimensional consonance/dissonance detection
    - Constructive interference (consonance) → synchronized agent movements, stronger coupling, stable trails
    - Destructive interference (dissonance) → chaotic turbulence, faster diffusion, sensor noise
  - **BeatPulseModulator** - Impulse-based beat response with exponential decay
    - Explosive deposit rate spikes (6x amplification) on beat detection
    - Configurable decay factors (0.8-0.99) and amplification (1-10x)
  - **MultiScaleModulator** - Multi-timescale feature tracking
    - Micro scale (100ms): High-frequency texture details → agent jitter, turn randomness
    - Meso scale (500ms): Rhythmic structure → beat pulsation, deposit rate
    - Macro scale (4.0s): Musical form → diffusion changes, overall energy
  - **3 Audio Presets** - Curated configurations for different musical styles
    - Resonant Harmony: Maximum synchronization on harmonic music
    - Beat Machine: Explosive response to beats and rhythm
    - Spectral Dance: Responds to spectral characteristics and texture
  - **Real-time Audio Analysis** - 7+ spectral features extracted via Web Audio API
    - Spectral Centroid (brightness), Rolloff, Flatness (complexity)
    - Zero Crossing Rate (texture), RMS Energy
    - Beat detection and tempo tracking
  - **MusicReactiveEngine** - Integration layer between audio analysis and simulation
    - Modulates substrate parameters in real-time based on music
    - Supports all three stigmergy models (M1/M2/M3)

- Progressive Web App (PWA) support
  - Installable on desktop and mobile devices
  - Offline support with service worker
  - Auto-updating service worker
  - App icons in multiple sizes (192x192, 512x512)
  - Apple touch icon and favicon
  - Web app manifest with proper metadata
- Self-hosting support with configurable base path
  - VITE_BASE_PATH environment variable for flexible deployment
  - Support for root and subdirectory deployments
  - PWA manifest adapts to deployment path
- Comprehensive documentation
  - CONTRIBUTING.md with contribution guidelines
  - CODE_OF_CONDUCT.md for community standards
  - SELF_HOSTING.md with deployment instructions
  - Enhanced README.md with PWA installation guide and Audio Oikos features
- Development tooling
  - vite-plugin-pwa for PWA generation
  - PWA enabled in development mode for testing

### Changed
- Updated README.md with PWA features, Audio Oikos system, and installation instructions
- Updated project structure documentation to include audio/ directory
- Enhanced Technology Stack section with Web Audio API mention
- Improved documentation structure with dedicated developer docs section
- Enhanced build process to support PWA generation

## [Previous Releases]

### GIF Loop Export Feature
- 2-second looping GIFs with automatic fade-in/fade-out transitions
- Seamless loop transitions for social media sharing

### Export Enhancement
- Video export in WebM (high quality) and GIF formats
- Configurable duration (3s/8s/12s)
- Smart recording workflow with real-time progress indicators
- Screenshot capture (PNG export)

### UI/UX Improvements
- Unified UI template for all parameter panels
- Sticky peek canvas on desktop (canvas partially visible while scrolling)
- Vertical layout with natural top-to-bottom flow
- Mobile-optimized responsive drawer interface
- Fullscreen mode with ESC exit

### Performance Optimizations
- Auto-optimizer with adaptive performance scaling (30-120 FPS targets)
- WebGL-accelerated trail rendering
- High-DPI support (up to 2x devicePixelRatio)
- Object pooling for better memory management

### Visualization Features
- Flexible aspect ratios (1:1, 16:9, 9:16, 3:2, 4:3, 21:9, and more)
- 4 blend modes (Additive, Average, Multiply, Screen)
- 11+ post-processing effects (motion blur, bloom, chromatic aberration, vignette, scanlines, pixelation)

### Core Simulation
- 8-dimensional parameter control
- 3 stigmergy models (M1: Classical, M2: Context-Switching, M3: Quantum-Inspired)
- Quantum mechanics implementation (superposition, phase-dependent trails, interference)
- 51+ presets (8 global + 43 dimension-specific)

### Scientific Features
- Pre-registered protocols
- Falsification criteria and validation benchmarks
- Model comparison framework (AIC/BIC)
- Empirical benchmark testing

---

## Release Notes Format

Each release should follow this structure:

### Added
- New features and capabilities

### Changed
- Changes to existing functionality

### Deprecated
- Features that will be removed in future releases

### Removed
- Features that have been removed

### Fixed
- Bug fixes

### Security
- Security improvements and fixes

---

## Version History

Currently in active development. First stable release (v1.0.0) will be tagged when:
- All core features are stable
- Scientific validation is complete
- Documentation is comprehensive
- Test coverage is adequate

---

## Links

- [Repository](https://github.com/v6t2b9/Parametrik-Labor)
- [Live Demo](https://parametrik-labor.vercel.app)
- [Issues](https://github.com/v6t2b9/Parametrik-Labor/issues)
- [Contributing](./CONTRIBUTING.md)
