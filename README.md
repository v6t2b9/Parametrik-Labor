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

**Live Demo:** https://parametrik-labor.vercel.app

---

## 📖 About

An interactive web-based simulation exploring **quantum-inspired stigmergy models** for computational validation of biosemiotic phenomena. Implements three agent-based models (M1: Classical, M2: Context-Switching, M3: Quantum-Inspired) to test predictions from quantum cognition research.

### Key Features

✅ **8-Dimensional Parameter Control** - Model, Physical, Semiotic, Temporal, Resonance, Visual, Effects, Performance
✅ **3 Stigmergy Models** - Classical (M1), Context-Switching (M2), Quantum-Inspired (M3)
✅ **Quantum Mechanics** - Superposition states, phase-dependent trails, interference patterns
✅ **Real-time Visualization** - 800×800 canvas with 4 blend modes, 11 post-processing effects
✅ **51+ Presets** - 8 global + 43 dimension-specific curated configurations
✅ **Auto-Optimizer** - Adaptive performance scaling (30-120 FPS targets)
✅ **Open Science** - MIT licensed, full code transparency, pre-registered protocols

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
│   │   └── ComplexMath.ts               # Quantum math utilities
│   ├── store/                    # Zustand state management
│   ├── presets/                  # Curated parameter configurations
│   └── types/                    # TypeScript definitions
├── public/                       # Static assets
├── docs/                         # Documentation & research papers
│   ├── README.md                        # Full app documentation
│   ├── parametrics_paper_draft.md       # Theoretical framework
│   ├── Parameter_Oikos_Matrix.md        # Parameter organization
│   └── ...                              # Additional research docs
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
- **State:** Zustand
- **Build:** Vite
- **Rendering:** Canvas 2D API
- **Deploy:** Vercel
- **License:** MIT

---

## 📚 Documentation

- **[Full Documentation](./docs/README.md)** - Complete guide (600+ lines)
- **[Theoretical Framework](./docs/parametrics_paper_draft.md)** - Parametrics theory
- **[Parameter Matrix](./docs/Parameter_Oikos_Matrix.md)** - Oikos organization
- **[Experiments](./docs/Experimentelle_Sektion_Index.md)** - Validation experiments

---

## 🎯 Usage

1. **Select Model:** Go to 🧬 Model Oikos tab
2. **Choose M1/M2/M3:** Click model button to switch
3. **Adjust Parameters:** Tune quantum parameters (phase rotation, amplitude coupling, etc.)
4. **Load Presets:** Try "Plasma Dream", "Neon Jungle", "Digital Rain", etc.
5. **Observe Behaviors:**
   - M1: Stable trails, simple patterns
   - M2: Dynamic explore/exploit switching
   - M3: Complex interference, order-dependent patterns, trail aging

---

## 🤝 Contributing

Contributions welcome! This is an open science project. See [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for guidelines.

---

## 📄 License

MIT License - See [LICENSE](./LICENSE) for details.

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
