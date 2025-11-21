# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **7 Advanced Visual Effects System** 🎨 ⭐ NEW
  - **Feedback/Echo Effect** 🌀
    - Recursive rendering with frame-by-frame transformations
    - Parameters: Amount (0-0.98), Zoom (0.95-1.05), Rotation (-5° to 5°), Offset X/Y (-10 to 10px)
    - Use cases: Infinite spirals, zoom tunnels, drifting echoes
    - Performance: ~0.5-1ms per frame

  - **Kaleidoscope Effect** 🔮
    - Radial mirroring with 2-12 configurable segments
    - Parameters: Segments (2-12), Rotation (0-360°), Zoom (0.5-2.0)
    - Use cases: Snowflake patterns (6 segments), mandalas (8-12 segments), psychedelic symmetry
    - Performance: ~1-2ms depending on segments

  - **Radial Blur** 🎯
    - Tunnel/explosion motion blur effects
    - Parameters: Strength (0-1), Center X/Y (0-1), Quality (2-10 samples)
    - Use cases: Warp speed, tunnel vision, explosive motion from center
    - Performance: ~2-5ms depending on quality setting

  - **Better Bloom (Multi-Pass Gaussian)** ✨
    - Professional cinematic glow with threshold-based extraction
    - Algorithm: Extract bright pixels → Downscale 4x → Multi-pass blur → Upscale → Blend
    - Parameters: Threshold (0-1), Radius (1-10 passes), Intensity (0-2)
    - Dual-mode: Better Bloom (intensity > 0) OR Simple Bloom (bloom > 0) for backward compatibility
    - Use cases: AAA game-quality glow, film-like highlights, cinematic atmospheres
    - Performance: ~3-7ms depending on radius (4 = 8px blur, 10 = 20px blur)

  - **Displacement Map** 🌊
    - Organic distortions using multi-sine wave noise
    - Algorithm: Per-pixel displacement with directional bias and animation support
    - Parameters: Strength (0-50px), Scale (0.5-5.0), Time (0-1 for animation), Angle (0-360°)
    - Use cases: Water/heat haze, liquid waves, organic warping, flowing distortions
    - Performance: ~2-4ms for typical settings

  - **Color Mapping/LUT (Film Grading)** 🎬
    - Cinematic color grading with 4 professional presets
    - **Teal & Orange**: Hollywood blockbuster look (shadows → teal, highlights → orange)
    - **Bleach Bypass**: Desaturated, high-contrast gritty aesthetic (war/thriller films)
    - **Warm Vintage**: Golden hour sepia tones (Wes Anderson style)
    - **Cool Cyberpunk**: Cyan/magenta/purple neon (Blade Runner 2049)
    - Parameters: LUT preset (dropdown), Intensity (0-1 blend)
    - Algorithm: Luminance-based per-pixel color transformation
    - Performance: ~1-2ms

  - **Mirror/Symmetry** 🦋
    - Geometric symmetry with 5 modes
    - **Horizontal**: Left-right symmetry (Rorschach test)
    - **Vertical**: Top-bottom symmetry (landscape reflections)
    - **Both**: 4-way symmetry from adjustable axes
    - **Quad**: Perfect center 4-way symmetry (snowflakes, mandalas)
    - Parameters: Mode (dropdown), Position (0-1 for axis placement)
    - Use cases: Symmetrical patterns, Rorschach inkblots, geometric art
    - Performance: ~1ms

- **20 Visual Effect Presets** 🎨
  - **11 New Spectacular Presets** showcasing all 7 new effects:
    - **Blockbuster** 🎬: Teal & Orange LUT + cinematic bloom + vignette
    - **Cyberpunk Dreams** 🌃: Cool Cyberpunk LUT + radial blur + extreme bloom
    - **Infinite Spiral** 🌀: Feedback with zoom + rotation (endless spiral)
    - **Mandala Magic** 🔮: Kaleidoscope 8 + Mirror Quad + bloom
    - **Liquid Fractal** 🌊: Displacement + Kaleidoscope 6 + Feedback
    - **Rorschach** 🦋: Mirror Horizontal + Displacement (inkblot aesthetic)
    - **Tunnel Vision** 🎯: Extreme Radial Blur + Feedback Zoom
    - **Golden Hour** 🌅: Warm Vintage LUT + soft bloom
    - **War Film** ⚔️: Bleach Bypass LUT + gritty vignette
    - **Recursive Mandala** 🕉️: Kaleidoscope 12 + Feedback + Displacement + Hue Shift
    - **Warp Speed** 🚀: Radial Blur + Feedback + Motion Blur + Chromatic Aberration

  - **4 Upgraded Classic Presets** now using Better Bloom:
    - **Traumhaft** ☁️: Better Bloom radius 8, intensity 1.3
    - **Neon Glow** ✨: Better Bloom radius 7, intensity 1.6
    - **Meditation** 🧘: Better Bloom radius 9 (very soft and wide)
    - **Psychedelisch** 🌈: Better Bloom + Kaleidoscope 4

- **Technical Improvements** ⚡
  - **Canvas Pooling**: Zero allocations for all new effects using object pooling pattern
  - **Progressive Disclosure UI**: Advanced controls only appear when main parameter > 0
  - **Rendering Pipeline Optimization**: Carefully ordered effect pipeline for optimal quality
  - **Pro Tips**: 20+ combination tips added to Visuals panel
  - **Bundle Size**: 418.62 KB (+7.57 KB from baseline, +1.8% increase)
  - **Total Performance Impact**: ~2-5ms per preset depending on effect combinations

- **Professional Export Quality Controls** 📤
  - **3 Quality Presets** for video and GIF exports:
    - **Standard** (8 Mbps video / Quality 10 GIF): Good balance for social media
    - **High** (12 Mbps video / Quality 5 GIF): Recommended default, excellent quality
    - **Very High** (18 Mbps video / Quality 2 GIF + dithering): Maximum quality for archival
  - **Variable Frame Rates**: 30 FPS (smaller files) or 60 FPS (smoother motion)
  - **Dynamic Quality Parameters**: Bitrate and encoding settings adapt to selected preset
  - UI controls in ControlBar with clear quality/performance descriptions

- **Multiple Export Formats** 🎬
  - **WebM (VP9)**: Universal browser support, excellent compression (previously only format)
  - **MP4 (H.264)**: iOS-compatible, native video format with H.264/AVC1 codec
  - **iOS Video**: MP4 + keyframe JPG with Web Share API integration for Live Photos workflow
  - **GIF**: Universal compatibility with optional Floyd-Steinberg dithering for Very High quality
  - Smart codec fallback: H.264 → AVC1 → VP9 for maximum compatibility
  - Format comparison table in documentation for choosing best export option

- **Web Share API Integration** 📱
  - Native iOS/Android share sheets for iOS Video format
  - One-tap "Save to Photos" workflow for mobile devices
  - Automatic keyframe capture (JPEG at quality 0.95) for iOS Video exports
  - Direct sharing to Messages, Instagram, and other native apps
  - Graceful fallback to standard download when sharing unavailable

- **Enhanced GIF Encoding** 🎨
  - Floyd-Steinberg dithering for Very High quality preset
  - Quality range: 2-10 (previously fixed at 10)
  - Configurable dithering algorithms: FloydSteinberg, FalseFloydSteinberg, Stucki, Atkinson
  - Real-time processing feedback with percentage indicator
  - Updated TypeScript definitions for gif.js with dithering support

- **iOS-Optimized PWA** 🍎
  - **Fullscreen Standalone Mode**: No Safari UI when launched from home screen
  - **Black-Translucent Status Bar**: Seamless integration with iOS status bar
  - **Safe Area Support**: viewport-fit=cover for notch/Dynamic Island compatibility
  - **Native Splash Screen**: Apple touch startup image on app launch
  - **iOS-Specific Meta Tags**:
    - apple-mobile-web-app-capable
    - apple-mobile-web-app-status-bar-style
    - apple-mobile-web-app-title
    - Apple touch icons (180x180)
    - Mask icon for Safari pinned tabs
  - **Web Share API**: Direct export to iOS Photos app
  - Installation guide for Safari users in README

- **Android-Optimized PWA** 🤖
  - **Custom Install Prompt Component** (InstallPrompt.tsx):
    - BeforeInstallPrompt event handler
    - Custom branded install banner with app icon
    - Appears after 3 seconds if not already installed
    - Dismissible with 7-day cooldown (localStorage)
    - Slide-up animation for smooth presentation
  - **Maskable/Adaptive Icons**: Proper icon support for Android home screens
  - **App Detection**: Checks for standalone mode, window.navigator.standalone, android-app:// referrer
  - **Installation Tracking**: Listens for 'appinstalled' event
  - **Smart Dismissal**: Remembers user preference, resets after 1 week
  - Integrated into App.tsx for automatic display

- **Comprehensive PWA Manifest** 📋
  - Enhanced with iOS/Android-specific features
  - **Display Modes**: standalone, fullscreen with display_override
  - **Orientation**: any (supports all device orientations)
  - **Screenshots**: Narrow and wide form factors for app stores
  - **Shortcuts**: "New Visualization" quick action from home screen icon
  - **Share Target**: Enables receiving shares from other apps
  - **Categories**: graphics, utilities, entertainment
  - **Language/Direction**: en-US, left-to-right
  - Configurable base path for self-hosting deployments

- **Offline-First Architecture** 📴
  - **Workbox Service Worker** with intelligent caching strategies:
    - CacheFirst for Google Fonts (1 year expiration)
    - NetworkFirst for media exports (1 week expiration)
  - **Large Asset Support**: 5MB cache limit for video/GIF files
  - **Auto-Update**: Background service worker updates
  - **Dev Mode Support**: PWA enabled in development for testing
  - **Glob Patterns**: Comprehensive asset caching (JS, CSS, HTML, images, fonts)
  - Works completely offline after first visit

- **Species Interaction Matrix (3×3)** 🧬
  - Two-tier control system for fine-grained species interaction dynamics
  - **Universal Baseline Settings** (global multipliers):
    - Attraction Strength: Multiplies all same-species interactions (clustering behavior)
    - Repulsion Strength: Multiplies all cross-species interactions (inter-species dynamics)
    - Cross-Species Interaction: Enable/disable cross-species sensing
  - **Interaction Matrix** (fine-grained tuning):
    - Per-species-pair interaction values: Red↔Red, Red↔Green, Red↔Blue, etc.
    - Range: -2.0 (strong repulsion) to +2.0 (strong attraction), 0 = neutral
    - Species-specific overrides available
  - UI restructured: Universal tab shows baseline multipliers, Species tabs show 3 interaction sliders each
  - Engine integration: Both SimulationEngine and QuantumStigmergyEngine use baseline × matrix formula
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
- **Export System Overhaul** 🔄
  - Video bitrate increased from fixed 5 Mbps to 8-18 Mbps (configurable)
  - GIF quality improved from fixed Quality 10 to Quality 2-10 (configurable)
  - Frame rate changed from fixed 30 FPS to configurable 30/60 FPS
  - Export UI redesigned with quality preset dropdowns and FPS selector
  - Recording workflow updated to support multiple formats and quality levels
  - Status messages enhanced to show format-specific processing steps

- **Documentation Enhancements** 📚
  - **README.md** completely restructured:
    - Export & Sharing section rewritten with quality controls, format comparison table, iOS integration guide
    - PWA section expanded with platform-specific features (iOS/Android/Desktop)
    - Installation instructions dramatically expanded with step-by-step guides per platform
    - Technology Stack updated with MediaRecorder API, Web Share API, gif.js details
    - New "Tips for Best Results" section with use-case recommendations
  - **CHANGELOG.md** updated with comprehensive export quality and PWA improvements
  - Format comparison table added for choosing optimal export settings
  - Platform-specific PWA benefits documented (offline-first, native sharing, app shortcuts)

- **PWA Functionality Enhanced** 🚀
  - index.html updated with comprehensive iOS/Android/general PWA meta tags
  - vite.config.ts enhanced with detailed PWA manifest configuration
  - Service worker caching strategies optimized for media exports
  - Manifest now includes screenshots, shortcuts, share target capabilities
  - Base path configuration improved for flexible self-hosting deployments

- **TypeScript Definitions Updated** 📝
  - gif.js type definitions extended to support dithering algorithm strings
  - Added support for: FloydSteinberg, FalseFloydSteinberg, Stucki, Atkinson
  - Changed dither parameter from boolean-only to union type

- Updated README.md with PWA features, Audio Oikos system, and installation instructions
- Updated project structure documentation to include audio/ directory
- Enhanced Technology Stack section with Web Audio API mention
- Improved documentation structure with dedicated developer docs section
- Enhanced build process to support PWA generation

### Fixed
- **Universal Baseline Settings now functional** 🔧
  - Fixed bug where Attraction Strength and Repulsion Strength sliders had no effect
  - Universal Baseline Settings now work as global multipliers:
    - Attraction Strength multiplies all same-species interactions (Red→Red, Green→Green, Blue→Blue)
    - Repulsion Strength multiplies all cross-species interactions (Red→Green, Red→Blue, etc.)
  - Two-tier control system: Universal = global control, Matrix = fine-tuning
  - Cross-Species Interaction checkbox was already working correctly

### Performance
- **Optimized simulation engines for smoother animation** ⚡
  - Species Interaction Matrix calculations optimized with early-exit patterns
    - 66% reduction in array lookups when cross-species interaction disabled
  - Role Modifier application optimized:
    - Eliminated closure allocations (60,000+ allocations/second @ 1000 agents, 60 FPS)
    - Inline calculations instead of closure functions
    - Bundle size reduced by 80 bytes (407.56 kB → 407.48 kB)
  - RoleAssigner optimized with frame-based caching:
    - From O(n) to O(1) - 999 saved calculations per frame @ 1000 agents
    - Eliminated array allocations, direct comparison instead of Array.reduce()
  - Expected improvements: More consistent frame times, reduced frame-time spikes

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
