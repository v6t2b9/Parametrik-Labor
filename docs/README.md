# Documentation Index

Welcome to the Parametrik-Labor documentation! This index will help you find the information you need.

## 📖 Table of Contents

- [Getting Started](#getting-started)
- [For Users](#for-users)
- [For Developers](#for-developers)
- [For Researchers](#for-researchers)
- [For Contributors](#for-contributors)

---

## Getting Started

### Quick Start

1. **Try the app:** Visit the [live demo](https://parametrik-labor.vercel.app)
2. **Install as PWA:** See [installation guide](../README.md#installing-as-pwa)
3. **Read the user guide:** [User Guide](./guides/user-guide.md)

### What is Parametrik-Labor?

An interactive web-based simulation exploring **quantum-inspired stigmergy models** for computational validation of biosemiotic phenomena. Implements three agent-based models (M1: Classical, M2: Context-Switching, M3: Quantum-Inspired) to test predictions from quantum cognition research.

---

## For Users

### Guides
- **[User Guide](./guides/user-guide.md)** - Complete guide to using the application
  - Real-time simulation features
  - Parameter control system (10 Oikos dimensions)
  - Export and recording
  - Post-processing effects
  - Performance optimization
  - Preset gallery
- **[Ecosystem Guide](./guides/ecosystem-guide.md)** - Multi-species ecosystem mode
  - 5 species types and ecological roles
  - Crystal formation and consumption
  - Energy-based lifecycles
  - Behavior state machines
  - Audio-ecology mapping
  - Population dynamics
  - Emergent behaviors
  - Technical implementation

### Installation
- **[Main README](../README.md)** - Installation and quick start
- **[PWA Installation](../README.md#installing-as-pwa)** - Install as native app

---

## For Developers

### Development
- **[Development Guide](./development/DEVELOPMENT.md)** - Complete development setup
  - Prerequisites and setup
  - Project structure
  - Development workflow
  - Architecture overview
  - State management
  - Simulation engine
  - Rendering pipeline
  - Testing and debugging
  - Common development tasks

### Technical Documentation
- **[Architecture](./development/ARCHITECTURE.md)** - System architecture and design
  - High-level architecture
  - Technology stack
  - Component architecture
  - State management patterns
  - Simulation engine design
  - Rendering system
  - PWA architecture
  - Data flow
  - Performance considerations
  - Design patterns

### Deployment
- **[Deployment Guide](./development/DEPLOYMENT.md)** - Deploy to production
  - Quick deployment
  - Platform-specific guides (Vercel, Netlify, GitHub Pages, etc.)
  - PWA configuration
  - Environment variables
  - Build configuration
  - CI/CD setup
  - Domain and HTTPS
  - Performance optimization
  - Monitoring and troubleshooting

- **[Self-Hosting Guide](../SELF_HOSTING.md)** - Self-hosting with PWA support
  - Standard and subdirectory deployment
  - Server requirements
  - Server configuration (nginx, Apache)
  - Docker deployment
  - Troubleshooting

---

## For Researchers

### 📚 Zettelkasten - Knowledge Vault (NEW!)

**Primary knowledge base for research** - Atomic notes following the Zettelkasten principle:
- **[Zettelkasten Index](./zettelkasten/README.md)** ⭐⭐⭐ - **Start here!**
  - 52 atomic notes + 3 MOCs (Maps of Content)
  - Single Source of Truth for all concepts, parameters, and properties
  - Bidirectional linking, YAML frontmatter, systematic organization

**Key MOCs (Navigation Guides)**:
- **[Parameter-Effects-Map](./zettelkasten/meta/map-parameter-effects.md)** ⭐⭐⭐ - Parameter × Property matrix, critical thresholds, design recipes
- **[Experimental-Methodology-Map](./zettelkasten/meta/map-experimental-methodology.md)** ⭐⭐ - 4 experimental workflows, methods, metrics, best practices
- **[Theoretical-Framework-Map](./zettelkasten/meta/map-theoretical-framework.md)** ⭐⭐ - 5 core concepts connected, historical development, research questions

**Quick Links by Topic**:
- **Concepts**: [5 core concepts](./zettelkasten/README.md#concepts) - Stigmergy, Ökosemiotik, Parameter-as-Oikos, Emergenz, Resonanz
- **Parameters**: [15 parameters](./zettelkasten/README.md#parameters) - Organized by 4 Oikos dimensions
- **Properties**: [8 emergent properties](./zettelkasten/README.md#properties) - Structural, Order, Dynamic
- **Methods**: [4 methodologies](./zettelkasten/README.md#methods) - Systematic variation, theory-guided hypotheses
- **Experiments**: [4 experiment classes](./zettelkasten/README.md#experiments) - Design patterns for investigations
- **Metrics**: [4 metrics](./zettelkasten/README.md#metrics) - Quantifying emergent phenomena
- **Components**: [8 system components](./zettelkasten/README.md#components) - Architecture (Simulation, Application, Infrastructure)

---

### Theoretical Framework (Narrative Documents)

**Linear narratives and aggregate views** (for definitions see Zettelkasten):
- **[Von Stigmergie zu Ökosemiotik](./research/Von_Stigmergie_zu_Oekosemiotik.md)** - Theoretical foundation narrative
- **[Parameter Oikos Matrix](./research/Parameter_Oikos_Matrix.md)** - Matrix view + design recipes
- **[Parametrics Paper Draft](./research/parametrics_paper_draft.md)** - Academic paper (WIP)
- **[Ökosemiotik Labor V5](./research/OekosemiotikLaborV5.md)** - Laboratory concepts

---

### Experiments
- **[Experimental Section Index](./experiments/Experimentelle_Sektion_Index.md)** - Overview of experiments
- **[Decay Rate Variation Experiment](./experiments/Experiment_Decay_Rate_Variation.md)** - Parameter variation study
- **[Experiment Template](./experiments/Template_Parameter_Experiment.md)** - Template for new experiments

**See also**: [Experimental-Methodology-Map](./zettelkasten/meta/map-experimental-methodology.md) for systematic workflows

---

### Scientific Models
See [User Guide - Model Oikos](./guides/user-guide.md#-model-oikos) for detailed information on:
- **M1: Classical Stigmergy** - Baseline pheromone-based navigation
- **M2: Context-Switching** - Explore/exploit behavioral modes
- **M3: Quantum-Inspired** - Superposition states and interference patterns

---

## For Contributors

### Contributing
- **[Contributing Guidelines](../CONTRIBUTING.md)** - How to contribute
  - Code of conduct
  - Development setup
  - Coding standards
  - Commit guidelines
  - Pull request process
  - Scientific contributions

- **[Code of Conduct](../CODE_OF_CONDUCT.md)** - Community standards

### Issue Templates
- **Bug Report** - Report bugs or issues
- **Feature Request** - Suggest new features
- **Scientific Contribution** - Propose research improvements

### Project Management
- **[Changelog](../CHANGELOG.md)** - Version history and releases
- **[License](../LICENSE)** - AGPL-3.0-or-later

---

## Archive

Outdated or superseded documentation (kept for historical reference):
- **[Dashboard Concept](./archive/Dashboard_Concept_Parameterraum_Explorer.md)** - Early UI concepts
- **[New Master Presets](./archive/NEW_MASTER_PRESETS.md)** - Legacy preset documentation

---

## Documentation Structure

```
docs/
├── README.md (this file)              # Documentation index
│
├── zettelkasten/ ⭐⭐⭐                  # PRIMARY KNOWLEDGE BASE
│   ├── README.md                      # Zettelkasten index
│   ├── concepts/                      # 5 core theoretical concepts
│   ├── parameters/                    # 15 atomic parameter notes
│   ├── properties/                    # 8 emergent property notes
│   ├── methods/                       # 4 experimental methodologies
│   ├── experiments/                   # 4 experiment class patterns
│   ├── metrics/                       # 4 metrics (2 implemented, 2 planned)
│   ├── components/                    # 8 system architecture components
│   └── meta/                          # 3 MOCs (Maps of Content)
│       ├── map-parameter-effects.md       ⭐⭐⭐
│       ├── map-experimental-methodology.md ⭐⭐
│       └── map-theoretical-framework.md   ⭐⭐
│
├── guides/                             # User guides
│   ├── user-guide.md                  # Complete user guide
│   └── ecosystem-guide.md             # Multi-species ecosystem guide
│
├── development/                        # Developer documentation
│   ├── DEVELOPMENT.md                 # Development guide
│   ├── ARCHITECTURE.md                # Architecture details
│   └── DEPLOYMENT.md                  # Deployment guide
│
├── research/                           # Scientific papers and theory (narratives)
│   ├── Von_Stigmergie_zu_Oekosemiotik.md  # Theoretical foundation
│   ├── Parameter_Oikos_Matrix.md          # Matrix view + design recipes
│   ├── parametrics_paper_draft.md         # Academic paper (WIP)
│   └── OekosemiotikLaborV5.md             # Laboratory concepts
│
├── experiments/                        # Experimental protocols
│   ├── Experimentelle_Sektion_Index.md
│   ├── Experiment_Decay_Rate_Variation.md
│   └── Template_Parameter_Experiment.md
│
└── archive/                            # Outdated documentation
    ├── Dashboard_Concept_Parameterraum_Explorer.md
    └── NEW_MASTER_PRESETS.md
```

---

## Quick Links

### External Resources
- **[Live Demo](https://parametrik-labor.vercel.app)** - Try the app
- **[GitHub Repository](https://github.com/v6t2b9/Parametrik-Labor)** - Source code
- **[Issues](https://github.com/v6t2b9/Parametrik-Labor/issues)** - Report bugs or request features

### Related Documentation
- **Main Project README** - [../README.md](../README.md)
- **Self-Hosting Guide** - [../SELF_HOSTING.md](../SELF_HOSTING.md)
- **Contributing** - [../CONTRIBUTING.md](../CONTRIBUTING.md)
- **Code of Conduct** - [../CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md)
- **Changelog** - [../CHANGELOG.md](../CHANGELOG.md)

---

## Need Help?

- **Questions?** Check the [User Guide](./guides/user-guide.md)
- **Development issues?** See [Development Guide](./development/DEVELOPMENT.md)
- **Deployment problems?** Read [Deployment Guide](./development/DEPLOYMENT.md)
- **Can't find what you need?** [Open an issue](https://github.com/v6t2b9/Parametrik-Labor/issues)

---

**Last updated:** 2025-11-20
**Documentation version:** 1.2 (Zettelkasten integration)
**Project license:** AGPL-3.0-or-later
