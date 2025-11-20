# Supplement B: Computational Model Protocol
## Quantum-Inspired Stigmergy: Agent-Based Validation Framework

**Pre-Registration Protocol for Phase 2**  
**Version 1.0**

---

## Executive Summary

This supplement specifies the computational modeling phase of our quantum-inspired biosemiotics research program. Based on **Phase 1 (Scoping Review) benchmarks**, we will implement and compare three agent-based models of stigmergic behavior:

- **M1**: Classical stigmergy (baseline)
- **M2**: Classical with context-switching (no quantum interference)
- **M3**: Quantum-inspired stigmergy (superposition + interference + context operators)

**Validation Strategy**: Test models against empirical data from Phase 1 scoping review, including:
- Bee learning order effects (target d = 0.40)
- Plant VOC interference (target d = -0.50 destructive, d = +0.40 constructive)
- Ant foraging context-dependence

**Falsification Criterion**: If M3 does not outperform M2 by ΔAIC > 10 in ≥2/3 test cases, quantum-inspired framework is not supported.

**Timeline**: 5 months from implementation to manuscript submission

**Open Science**: All code on GitHub (MIT license), pre-registration on OSF, interactive demos deployed publicly

---

## Table of Contents

1. Theoretical Motivation
2. MYZEL Lab Framework Overview
3. Model 1: Classical Stigmergy (Baseline)
4. Model 2: Classical + Context-Switching
5. Model 3: Quantum-Inspired Stigmergy
6. Pre-Registered Model Comparison
7. Validation Datasets from Scoping Review
8. Implementation Specifications
9. Analysis Pipeline
10. Expected Outcomes and Falsification
11. Timeline and Milestones
12. Code Architecture and Deployment

---

## 1. Theoretical Motivation

### 1.1 Why Computational Validation?

**Problem**: Quantum cognition research often proposes expensive biological experiments without first demonstrating that quantum formalism adds explanatory value computationally.

**Our Approach**: Before pursuing novel biological experiments (Phase 3), we validate that:
1. Quantum-inspired models are **implementable** (not just mathematical abstractions)
2. They produce **testably different predictions** from classical alternatives
3. They **fit empirical data better** using rigorous model comparison
4. Parameter counts are **reasonable** (no excessive flexibility)

### 1.2 Why Stigmergy?

**Stigmergy** = Indirect coordination through environmental modification (Grassé, 1959)

**Examples**:
- Ant pheromone trails (agents deposit/follow chemical gradients)
- Slime mold foraging (Physarum polycephalum creates optimal networks)
- Plant VOC communication (chemical signals modify receiver state)
- Bacterial quorum sensing (population density signals)

**Why Test Here?**:
1. **Fundamentally semiotic**: Environmental marks are *signs* interpreted by agents
2. **Context-dependent**: Same pheromone means differently based on colony state
3. **History-dependent**: Prior interactions affect future behavior (order effects)
4. **Well-studied empirically**: Abundant validation data (Phase 1 scoping review)
5. **Computationally tractable**: Agent-based models are standard (Dorigo et al., 2004)

### 1.3 Quantum Signatures in Stigmergy

**Three testable predictions** (from main paper Section IV):

**Prediction 1: Order Effects**
- Classical prediction: Ant exploration patterns symmetric (A→B ≈ B→A)
- Quantum prediction: Asymmetric due to phase evolution (A→B ≠ B→A)
- Empirical benchmark: d = 0.40 (bee learning from Kheradmand et al., 2025)

**Prediction 2: Interference**
- Classical prediction: Combined trails additive (Trail_AB = Trail_A + Trail_B - interaction)
- Quantum prediction: Destructive/constructive interference (Trail_AB ≠ classical)
- Empirical benchmark: d = -0.50 (plant VOC from Leon-Reyes et al., 2010)

**Prediction 3: Context-Dependence**
- Classical prediction: Trail strength determines response (universal)
- Quantum prediction: Context operator changes interpretation basis
- Empirical benchmark: d = 0.40 (ABA renewal from conditioning literature)

---

## 2. MYZEL Lab Framework Overview

### 2.1 What is MYZEL Lab?

**MYZEL** = Multi-agent Yielding Zones for Emergent Learning

An interactive, web-based agent-based modeling framework for stigmergic systems. Named after mycelial networks, which exhibit stigmergy-like coordination.

**Key Features**:
- Real-time visualization of agent behavior
- Parameter manipulation via UI controls
- Export of behavioral data for analysis
- Multiple species/agent types with different parameters
- Grid-based pheromone diffusion simulation

### 2.2 Core Architecture

**Environment**:
- 2D continuous space (agents move in x,y coordinates)
- Discrete grid overlay (512×512 cells) for pheromone concentration
- Each cell stores φ(x,y,t) = pheromone strength at time t

**Agents**:
- Position: (x, y) in continuous space
- Heading: θ (angle in radians)
- Age: counter for lifecycle dynamics
- Species: identifier (allows multi-species interactions)

**Dynamics**:
- Agents sense environment (3 directions: left, forward, right)
- Turn toward strongest pheromone signal
- Move forward by step_size
- Deposit pheromone at current location
- Pheromone decays: φ(t+1) = (1-λ)·φ(t)
- Pheromone diffuses: Gaussian blur kernel

### 2.3 Validation Against Real Stigmergy

**Ant Colony Optimization** (Dorigo & Stützle, 2004):
- Standard ACO uses pheromone τ_ij on edges between nodes
- MYZEL uses continuous space with diffusing pheromones
- Both show emergence of shortest paths through collective reinforcement

**Physarum Polycephalum** (Nakagaki et al., 2000):
- Slime mold creates optimal networks connecting food sources
- MYZEL agents with appropriate parameters reproduce similar patterns
- Network efficiency emerges from local trail reinforcement

**Our Innovation**: Extend classical stigmergy with quantum-inspired dynamics

---

## 3. Model 1: Classical Stigmergy (Baseline)

### 3.1 Agent Movement Algorithm

```javascript
// Sense pheromone in 3 directions
const sensorAngle = 45° // degrees
const sensorDistance = 5 // pixels

let left = sense(heading - sensorAngle, sensorDistance)
let forward = sense(heading, sensorDistance)
let right = sense(heading + sensorAngle, sensorDistance)

// Turn toward strongest signal
if (left > forward && left > right) {
  heading -= turnSpeed
} else if (right > forward && right > left) {
  heading += turnSpeed
}
// else continue forward

// Move
x += cos(heading) * moveSpeed
y += sin(heading) * moveSpeed

// Deposit pheromone
pheromoneGrid[floor(x), floor(y)] += depositAmount
```

### 3.2 Pheromone Dynamics

**Decay**:
```javascript
φ(t+1) = φ(t) * (1 - decayRate)

// Typical values:
decayRate = 0.01  // 1% decay per timestep
```

**Diffusion**:
```javascript
// Gaussian blur with radius σ
φ_diffused = gaussianBlur(φ, σ = 1.5)

// Implemented as:
for each cell (i,j):
  φ_new(i,j) = Σ_{neighbors} w(k) * φ(i+k_x, j+k_y)
  
where w(k) are Gaussian weights
```

### 3.3 Free Parameters (M1)

| Parameter | Symbol | Range | Default | Description |
|-----------|--------|-------|---------|-------------|
| Sensor angle | θ_s | 20-60° | 45° | Angular separation of sensors |
| Sensor distance | d_s | 3-10 px | 5 px | How far ahead agents sense |
| Turn speed | ω | 10-90°/step | 45°/step | Maximum turning rate |
| Move speed | v | 0.5-2 px/step | 1 px/step | Forward velocity |
| Deposit amount | δ | 1-10 | 5 | Pheromone deposited per step |
| Decay rate | λ | 0.001-0.05 | 0.01 | Exponential decay per timestep |
| Diffusion radius | σ | 0.5-3 | 1.5 | Gaussian blur radius |

**Total: 7 free parameters**

### 3.4 Expected Behavior

**Classical stigmergy should exhibit**:
- Emergence of trails connecting resources
- Shortest path selection through reinforcement
- **Symmetric exploration** (A→B ≈ B→A)
- **Additive trail strength** (A+B ≈ A + B)
- **Context-independent** response to trails

---

## 4. Model 2: Classical + Context-Switching

### 4.1 Rationale

**Why this model?**: To test whether quantum-like effects can be explained by classical context-switching without interference.

**Mechanism**: Agents switch between "exploration" and "exploitation" modes based on environmental signals, but no quantum superposition or phase dynamics.

### 4.2 Context-Switching Rule

```javascript
// Agent has internal state: mode ∈ {explore, exploit}
let mode = "explore"  // initial

// Switch based on pheromone density
const localDensity = pheromoneGrid[floor(x), floor(y)]

if (localDensity > thresholdHigh && mode === "explore") {
  mode = "exploit"  // switch to following strong trails
}

if (localDensity < thresholdLow && mode === "exploit") {
  mode = "explore"  // switch to seeking new areas
}

// Behavior depends on mode
if (mode === "explore") {
  // Add noise to sensor readings (explore randomly)
  left += randomNoise()
  forward += randomNoise()
  right += randomNoise()
} else {
  // Follow trails deterministically
  // (no noise)
}
```

### 4.3 Free Parameters (M2)

**Inherits M1 parameters (7) plus**:

| Parameter | Symbol | Range | Description |
|-----------|--------|-------|-------------|
| High threshold | τ_high | 50-200 | Density to switch to exploit |
| Low threshold | τ_low | 10-50 | Density to switch to explore |
| Exploration noise | η_e | 0.1-1.0 | Noise magnitude in explore mode |

**Total: 10 free parameters**

### 4.4 Expected Behavior

**M2 should exhibit**:
- Context-dependent behavior (explore vs. exploit)
- **Some asymmetry** in A→B vs. B→A (due to state persistence)
- **Still additive** (no interference, just mode-dependent gain)
- Better fit than M1 but **no true quantum signatures**

---

## 5. Model 3: Quantum-Inspired Stigmergy

### 5.1 Three Quantum-Inspired Extensions

#### Extension 1: Phase-Dependent Trail Interpretation

**Classical**: Trail attractiveness = φ(x,y) ∈ ℝ⁺

**Quantum-Inspired**: Trail has complex amplitude = |φ(x,y)| · e^(iθ(x,y))

**Phase Evolution**:
```javascript
// Each pheromone cell stores magnitude AND phase
pheromoneGrid[i][j] = {
  magnitude: φ,    // real-valued strength
  phase: θ         // angle in [0, 2π)
}

// Phase evolves over time (aging)
θ(t+1) = θ(t) + ω_phase * Δt + noise

// where:
// ω_phase = rotation rate (trails become "stale")
// noise = environmental fluctuation
```

**Agent Response**:
```javascript
// Effective attractiveness includes phase
const effectiveStrength = magnitude * cos(phase)

// When phase ≈ 0: cos(0) = +1 → attractive (fresh trail)
// When phase ≈ π: cos(π) = -1 → repulsive (stale trail)
// When phase ≈ π/2: cos(π/2) = 0 → neutral
```

**Behavioral Consequence**: Agents can be **repelled** from strong-but-old trails, forcing exploration even in established patterns.

#### Extension 2: Superposition States for Route Choice

**Classical**: Agent chooses direction probabilistically:
```javascript
P(left) = left / (left + forward + right)
P(forward) = forward / (left + forward + right)
P(right) = right / (left + forward + right)
```

**Quantum-Inspired**: Agent maintains probability amplitudes:
```javascript
// Agent state vector
let ψ = {
  α_left: complex(0.577, 0),      // 1/√3
  α_forward: complex(0.577, 0),
  α_right: complex(0.577, 0)
}

// Amplitudes evolve via coupled dynamics
function updateAmplitudes(ψ, sensors) {
  // Extract phases from sensor readings
  const φ_L = sensors.left.phase
  const φ_F = sensors.forward.phase
  const φ_R = sensors.right.phase
  
  // Coupling matrix (agents influenced by neighboring directions)
  const κ = 0.1  // coupling strength
  
  ψ.α_left = ψ.α_left + κ * ψ.α_forward * exp(i * φ_F)
  ψ.α_forward = ψ.α_forward + κ * (ψ.α_left * exp(i * φ_L) + 
                                   ψ.α_right * exp(i * φ_R))
  ψ.α_right = ψ.α_right + κ * ψ.α_forward * exp(i * φ_F)
  
  // Normalize
  const norm = sqrt(|α_left|² + |α_forward|² + |α_right|²)
  ψ.α_left /= norm
  ψ.α_forward /= norm
  ψ.α_right /= norm
  
  return ψ
}

// Measurement (collapse)
function measure(ψ) {
  const P_left = |ψ.α_left|²
  const P_forward = |ψ.α_forward|²
  const P_right = |ψ.α_right|²
  
  // Sample from distribution
  const rand = Math.random()
  if (rand < P_left) return "left"
  if (rand < P_left + P_forward) return "forward"
  return "right"
}
```

**Behavioral Consequence**: Prior measurements affect future amplitude evolution → **order effects**.

#### Extension 3: Context-Dependent Interpretation (Projection Operators)

**Classical**: Pheromone meaning is universal (always "follow toward food")

**Quantum-Inspired**: Context operator projects onto different basis

```javascript
// Colony-level context (shared by all agents)
let colonyContext = {
  foodStatus: "abundant",  // or "depleted"
  projectionBasis: "exploit"  // or "explore"
}

// Context operator changes interpretation
function applyContextOperator(pheromoneSignal, context) {
  if (context.projectionBasis === "exploit") {
    // Strong trails → reinforce
    return pheromoneSignal.magnitude * cos(pheromoneSignal.phase)
  } else {
    // Strong trails → avoid (seek new areas)
    return -pheromoneSignal.magnitude * cos(pheromoneSignal.phase + π)
  }
}

// Context switches based on global food availability
if (totalFoodCollected > threshold) {
  colonyContext.projectionBasis = "explore"  // seek new resources
} else {
  colonyContext.projectionBasis = "exploit"  // reinforce current trails
}
```

**Behavioral Consequence**: Same trail produces different responses depending on colony history → **context-dependence**.

### 5.2 Free Parameters (M3)

**Inherits M1 parameters (7) plus**:

| Parameter | Symbol | Range | Description |
|-----------|--------|-------|-------------|
| Phase rotation rate | ω_φ | 0.001-0.01 | How fast trails "age" |
| Amplitude coupling | κ | 0.05-0.3 | Coupling between directions |
| Context threshold | τ_c | 100-500 | Food collected before context switch |
| Phase noise | η_φ | 0.01-0.1 | Environmental phase fluctuations |

**Total: 11 free parameters**

**Note**: Only 4 more parameters than M1, 1 more than M2 → reasonable complexity

### 5.3 Expected Behavior

**M3 should exhibit**:
- **Asymmetric order effects**: A→B ≠ B→A due to amplitude evolution
- **Interference patterns**: Combined trails A+B show destructive/constructive interference
- **Context-dependence**: Same trail interpreted differently based on colony state
- **Quantitatively match empirical benchmarks**: d ≈ 0.40 for order, d ≈ -0.50 for interference

---

## 6. Pre-Registered Model Comparison

### 6.1 Research Questions

**RQ1**: Does quantum-inspired model (M3) fit empirical data better than classical alternatives (M1, M2)?

**RQ2**: Is superior fit (if any) due to explanatory power or just parameter flexibility?

**RQ3**: Do quantum-inspired dynamics produce qualitatively different predictions?

### 6.2 Model Comparison Criteria

**Primary Criterion**: Akaike Information Criterion (AIC)

```
AIC = 2k - 2ln(L)

where:
k = number of free parameters
L = likelihood of data given model

Lower AIC = better model
```

**Decision Rule** (pre-specified):
- **ΔAIC > 10**: Substantial evidence for better model
- **ΔAIC = 4-10**: Moderate evidence
- **ΔAIC < 4**: Models approximately equivalent

**Secondary Criteria**:
- **BIC** (Bayesian Information Criterion): Stronger penalty for parameters
- **Cross-validated log-likelihood**: Generalization performance
- **Visual inspection**: Do model predictions match qualitative patterns?

### 6.3 Falsification Threshold

**M3 (quantum-inspired) is NOT SUPPORTED if**:

**Criterion F1**: M3 does not outperform M2 (classical+context) by ΔAIC > 10 in ≥ 2 out of 3 test cases

**Criterion F2**: M3 requires > 15 parameters to achieve fit (excessive flexibility)

**Criterion F3**: M3 fails cross-validation (overfits training data, poor test performance)

**Criterion F4**: M3 predictions deviate from empirical benchmarks by > 50% (e.g., predicts d = 0.20 when empirical d = 0.40)

**If ANY TWO criteria are met → Quantum hypothesis not supported for stigmergic systems**

### 6.4 Fairness Constraints

**To ensure fair comparison**:

**Constraint 1: Equal Optimization Budget**
- All models: Bayesian optimization with 10,000 iterations
- Same convergence criterion: Δ improvement < 0.001 for 100 iterations

**Constraint 2: Same Parameter Priors**
- Uniform priors over specified ranges for all models
- No informative priors that favor one model

**Constraint 3: Same Data**
- All models trained on identical datasets
- Same train/test splits (70/30)

**Constraint 4: Same Evaluation Metrics**
- Standardized data preprocessing
- Same likelihood function (negative binomial for count data, Gaussian for continuous)

---

## 7. Validation Datasets from Scoping Review

### 7.1 Test Case 1: Bee Learning Order Effects

**Source**: Kheradmand et al. (2025) - "Honey Bees Can Use Sequence Learning to Predict Rewards"

**Phenomenon**: Bees learn alternating rewarded patterns; order matters

**Data Structure**:
- **Condition A→B**: Train Blue→reward, then Yellow→reward
- **Condition B→A**: Train Yellow→reward, then Blue→reward
- **Outcome**: Success rate on transfer test
- **Empirical effect**: d = 0.40 [95% CI: 0.25, 0.55]

**Computational Implementation**:

```python
# Simulation setup
n_agents = 100  # bees
n_trials = 20   # training trials per stimulus

# Condition A→B
for agent in agents_AB:
  for trial in range(n_trials):
    present_stimulus("Blue")
    reward_if_correct()
  for trial in range(n_trials):
    present_stimulus("Yellow")
    reward_if_correct()
  
  # Test: Present novel Green (intermediate)
  response_AB = agent.choice_probability("Yellow")

# Condition B→A (reverse)
for agent in agents_BA:
  # (same but Yellow first, then Blue)
  response_BA = agent.choice_probability("Blue")

# Calculate effect size
d_observed = (mean(response_AB) - mean(response_BA)) / SD_pooled
```

**Model Predictions**:
- **M1 (classical)**: d ≈ 0 (symmetric)
- **M2 (context)**: d ≈ 0.15 (slight asymmetry from state persistence)
- **M3 (quantum)**: d ≈ 0.40 (matches empirical)

**Success Criterion**: M3 within ±0.10 of empirical d = 0.40

### 7.2 Test Case 2: Plant VOC Destructive Interference

**Source**: Leon-Reyes et al. (2010) - "Salicylate-mediated suppression of jasmonate-responsive gene expression"

**Phenomenon**: Combined VOCs (JA + SA) produce sub-additive defense response

**Data Structure**:
- **Response(JA alone)**: Gene expression fold-change = 2.8 ± 0.6
- **Response(SA alone)**: Gene expression fold-change = 2.2 ± 0.5
- **Response(JA + SA)**: Gene expression fold-change = 3.1 ± 0.7
- **Classical prediction**: 2.8 + 2.2 - (2.8×2.2) = 3.9
- **Observed**: 3.1 (sub-additive)
- **Interference**: I = (3.1 - 3.9) / max(2.8, 2.2) = -0.29

**Effect Size**: d = -0.50 for deviation from classical prediction

**Computational Implementation**:

```python
# Simulation setup
n_plants = 50
voc_JA_strength = 1.0  # normalized
voc_SA_strength = 0.8

# Expose to single VOCs
response_JA = simulate_plant_response(voc_JA_strength, phase=0)
response_SA = simulate_plant_response(voc_SA_strength, phase=0)

# Expose to combined VOCs
# Classical: additive
response_AB_classical = response_JA + response_SA

# Quantum: interference depends on phase
phase_difference = estimate_phase_from_biology()  # from literature
response_AB_quantum = |α·exp(iφ_JA) + β·exp(iφ_SA)|²

# Calculate interference
I_quantum = (response_AB_quantum - response_AB_classical) / max(response_JA, response_SA)
```

**Model Predictions**:
- **M1 (classical)**: I ≈ 0 (additive)
- **M2 (context)**: I ≈ -0.10 (some saturation, not true interference)
- **M3 (quantum)**: I ≈ -0.29 (matches empirical destructive interference)

**Success Criterion**: M3 predicts I within ±0.10 of empirical I = -0.29

### 7.3 Test Case 3: Ant Foraging Food Source Switch

**Source**: Beckers et al. (1992) - "Trail laying behaviour during food recruitment in the ant Lasius niger"

**Phenomenon**: Ants reallocate faster than exponential pheromone decay predicts

**Data Structure**:
- Phase 1: Food source A only → colony establishes trail
- Phase 2: Remove A, introduce B → measure reallocation time
- **Classical prediction**: Exponential decay, t_realloc = ln(φ_0)/λ ≈ 30 minutes
- **Observed**: t_realloc ≈ 10 minutes (3× faster)

**Computational Implementation**:

```python
# Simulation
n_ants = 500
food_A = position(50, 50)  # 50cm from nest
food_B = position(-50, -50)  # opposite direction

# Phase 1: Establish trail to A
simulate_foraging(food_A, duration=1800_seconds)
trail_A_strength = measure_trail_strength(food_A)

# Phase 2: Remove A, add B
remove_food(food_A)
add_food(food_B)

# Measure reallocation time
t_classical = time_until(trail_B_strength > trail_A_strength, 
                         decay_model="exponential")

t_quantum = time_until(trail_B_strength > trail_A_strength,
                       decay_model="phase_dependent_repulsion")
```

**Model Predictions**:
- **M1 (classical)**: t ≈ 30 min (exponential decay)
- **M2 (context)**: t ≈ 20 min (context switch accelerates)
- **M3 (quantum)**: t ≈ 10 min (phase-driven repulsion from A)

**Success Criterion**: M3 within ±5 min of empirical t = 10 min

### 7.4 Data Preprocessing

**For all datasets**:

1. **Normalization**: Scale responses to [0,1] or [-1,1] for comparable likelihood calculations
2. **Missing Data**: Exclude trials with missing observations (no imputation)
3. **Outlier Detection**: Identify outliers (> 3 SD from mean), report but do not exclude
4. **Train/Test Split**: 70% training, 30% testing (stratified by condition)

---

## 8. Implementation Specifications

### 8.1 Software Stack

**Core Simulation**: JavaScript (ES6+)
- Reason: Web-based interactivity, real-time visualization
- Libraries: None required (vanilla JS for performance)

**Analysis**: Python 3.10+
- Libraries: NumPy, SciPy, Pandas, Matplotlib, Seaborn
- Bayesian Optimization: Optuna (v3.0+)
- Statistical Modeling: statsmodels, scikit-learn

**Model Comparison**: R 4.2+
- Package: bbmle (AIC/BIC calculation and comparison)
- Package: MuMIn (multi-model inference)

**Version Control**: Git + GitHub
- Repository: [github.com/username/quantum-biosemiotics-computational]
- License: MIT (open source)

**Deployment**:
- Interactive Demo: GitHub Pages (free hosting)
- Compute: Local machines (no HPC required)

### 8.2 Code Architecture

```
project/
├── src/
│   ├── core/
│   │   ├── agent.js          # Agent class
│   │   ├── environment.js    # Grid + pheromones
│   │   ├── simulation.js     # Main simulation loop
│   │   └── models/
│   │       ├── classical.js  # M1 implementation
│   │       ├── context.js    # M2 implementation
│   │       └── quantum.js    # M3 implementation
│   ├── analysis/
│   │   ├── fit_models.py     # Bayesian optimization
│   │   ├── compare_models.py # AIC/BIC comparison
│   │   └── visualize.py      # Plotting functions
│   └── experiments/
│       ├── bee_learning.py   # Test Case 1
│       ├── plant_voc.py      # Test Case 2
│       └── ant_foraging.py   # Test Case 3
├── data/
│   ├── empirical/            # CSV files from scoping review
│   ├── simulated/            # Model outputs
│   └── results/              # Analysis results
├── docs/
│   ├── README.md
│   └── API.md
├── tests/
│   └── unit_tests.js
└── notebooks/
    └── exploratory_analysis.ipynb
```

### 8.3 Computational Requirements

**Hardware**:
- CPU: Modern quad-core (Intel i5/i7, AMD Ryzen 5/7)
- RAM: 8 GB minimum, 16 GB recommended
- GPU: Not required (CPU simulations sufficient)

**Time Estimates**:
- Single simulation run: 1-5 minutes (10,000 timesteps, 100 agents)
- Bayesian optimization: 2-8 hours per model (10,000 iterations)
- Full analysis pipeline: ~1 week computational time

**Storage**:
- Simulation outputs: ~500 MB per test case
- Total project: < 5 GB

---

## 9. Analysis Pipeline

### 9.1 Parameter Optimization

**Method**: Bayesian Optimization using Tree-structured Parzen Estimator (TPE)

**Library**: Optuna (Python)

```python
import optuna

def objective(trial):
    # Sample parameters from pre-specified ranges
    sensor_angle = trial.suggest_float("sensor_angle", 20, 60)
    sensor_dist = trial.suggest_float("sensor_dist", 3, 10)
    turn_speed = trial.suggest_float("turn_speed", 10, 90)
    # ... (all 7-11 parameters)
    
    # Run simulation with these parameters
    simulation_output = run_simulation(parameters)
    
    # Calculate likelihood of empirical data given model
    log_likelihood = calculate_likelihood(simulation_output, empirical_data)
    
    return -log_likelihood  # Optuna minimizes, we want to maximize L

# Optimize
study = optuna.create_study(direction="minimize")
study.optimize(objective, n_trials=10000, timeout=28800)  # 8 hours

# Best parameters
best_params = study.best_params
```

**Convergence Criterion**: Stop if improvement < 0.001 for 100 consecutive trials

### 9.2 Likelihood Calculation

**For Count Data** (e.g., number of ants visiting food source):
```python
from scipy.stats import nbinom

def neg_binomial_likelihood(data, predicted_mean, dispersion):
    """
    Negative binomial is appropriate for overdispersed count data
    """
    n_success = dispersion
    p_success = dispersion / (dispersion + predicted_mean)
    
    log_L = np.sum(nbinom.logpmf(data, n_success, p_success))
    return log_L
```

**For Continuous Data** (e.g., choice proportion):
```python
from scipy.stats import norm

def gaussian_likelihood(data, predicted_mean, predicted_sd):
    """
    Gaussian for continuous outcomes (after logit transform if proportions)
    """
    log_L = np.sum(norm.logpdf(data, loc=predicted_mean, scale=predicted_sd))
    return log_L
```

### 9.3 Model Comparison

```r
# R script for model comparison
library(bbmle)

# AIC values from Python
AIC_M1 <- 1234.5
AIC_M2 <- 1220.3
AIC_M3 <- 1205.8

# Compare
delta_AIC_M3_vs_M1 <- AIC_M1 - AIC_M3  # 28.7 → M3 substantially better
delta_AIC_M3_vs_M2 <- AIC_M2 - AIC_M3  # 14.5 → M3 moderately better

# AIC weights (relative likelihood)
AICs <- c(M1 = AIC_M1, M2 = AIC_M2, M3 = AIC_M3)
weights <- exp(-0.5 * (AICs - min(AICs)))
weights <- weights / sum(weights)

# M3 weight = 0.95 → 95% confidence it's the best model
```

### 9.4 Cross-Validation

**K-Fold Cross-Validation** (K = 5):

```python
from sklearn.model_selection import KFold

kf = KFold(n_splits=5, shuffle=True, random_state=42)

cv_log_likelihoods = {"M1": [], "M2": [], "M3": []}

for train_idx, test_idx in kf.split(data):
    train_data = data[train_idx]
    test_data = data[test_idx]
    
    # Fit each model on training data
    params_M1 = optimize(model_M1, train_data)
    params_M2 = optimize(model_M2, train_data)
    params_M3 = optimize(model_M3, train_data)
    
    # Evaluate on test data
    cv_log_likelihoods["M1"].append(likelihood(model_M1, params_M1, test_data))
    cv_log_likelihoods["M2"].append(likelihood(model_M2, params_M2, test_data))
    cv_log_likelihoods["M3"].append(likelihood(model_M3, params_M3, test_data))

# Average cross-validated likelihood
mean_cv_LL = {model: np.mean(LLs) for model, LLs in cv_log_likelihoods.items()}
```

**Interpretation**:
- If mean_cv_LL[M3] >> mean_cv_LL[M1, M2] → M3 generalizes better
- If mean_cv_LL[M3] < mean_cv_LL[M2] → M3 overfits (despite better training fit)

---

## 10. Expected Outcomes and Falsification

### 10.1 Scenario 1: M3 Supported

**If**:
- ΔAIC(M3 vs. M2) > 10 in ≥ 2/3 test cases ✓
- M3 predictions within ±20% of empirical effect sizes ✓
- Cross-validation shows no overfitting ✓

**Conclusion**: Quantum-inspired model adds explanatory value beyond classical alternatives

**Interpretation**:
- Phase-dependent dynamics explain order effects
- Interference terms explain non-additive responses
- Context operators explain state-dependent interpretation

**Next Step**: Proceed to Phase 3 (biological experiments with pre-specified effect sizes from M3 predictions)

### 10.2 Scenario 2: M3 Not Supported (Falsified)

**If**:
- ΔAIC(M3 vs. M2) < 10 in ≥ 2/3 test cases ✗
- OR M3 predictions deviate > 50% from empirical ✗

**Conclusion**: Quantum-inspired framework does not provide superior explanation for stigmergic behavior

**Interpretation**:
- Classical context-switching (M2) sufficient
- Additional quantum parameters (phase, superposition) add complexity without explanatory power
- Hypothesis C (emergent quantum structure from semiosis) not supported for stigmergy

**Next Step**: 
- Publish negative result (falsification is valuable)
- Revise hypothesis or conclude quantum structure limited to specific domains
- Do NOT proceed to Phase 3 (expensive biology)

### 10.3 Scenario 3: Ambiguous (Mixed Results)

**If**:
- M3 better for some test cases but not others
- OR ΔAIC = 4-10 (moderate evidence, not substantial)

**Conclusion**: Quantum-inspired model shows promise but not conclusively superior

**Interpretation**:
- Quantum structure may apply selectively (e.g., bees but not plants)
- OR model needs refinement
- OR additional test cases needed

**Next Step**:
- Conduct additional computational tests (synthetic data, edge cases)
- Publish results as "exploratory" rather than "confirmatory"
- Consider selective biological experiments (e.g., only bees if M3 works for bee test)

### 10.4 Reporting Standards

**Regardless of outcome, we will report**:
1. All three models (M1, M2, M3) with full parameter specifications
2. Complete optimization trajectories (Optuna histories)
3. AIC, BIC, cross-validated likelihood for all models
4. Effect size predictions vs. empirical benchmarks (with confidence intervals)
5. Visual comparisons (forest plots showing model predictions vs. data)
6. Full code and data on GitHub/OSF

**No selective reporting**: If M3 fails, we publish failure transparently

---

## 11. Timeline and Milestones

### 11.1 5-Month Timeline

**Month 1: Implementation**
- Week 1-2: Core MYZEL framework (agent, environment, visualization)
- Week 3: Model M1 (classical stigmergy)
- Week 4: Model M2 (classical + context)

**Month 2: Quantum Extensions**
- Week 5-6: Model M3 (phase-dependent trails, superposition states)
- Week 7: Context operators and colony-level dynamics
- Week 8: Unit testing and validation against toy problems

**Month 3: Optimization & Test Case 1**
- Week 9-10: Bayesian optimization setup (Optuna)
- Week 11: Fit M1, M2, M3 to bee learning data (Test Case 1)
- Week 12: Model comparison and cross-validation

**Month 4: Test Cases 2 & 3**
- Week 13-14: Plant VOC interference (Test Case 2)
- Week 15-16: Ant foraging (Test Case 3)

**Month 5: Analysis & Writing**
- Week 17: Aggregate results, sensitivity analyses
- Week 18: Create visualizations (forest plots, parameter landscapes)
- Week 19-20: Manuscript writing

**Contingency**: +2 weeks buffer for unexpected issues

### 11.2 Milestones and Decision Points

| Milestone | Date | Decision Point |
|-----------|------|----------------|
| Core framework complete | End Month 1 | Proceed if agents exhibit basic stigmergy |
| M3 implementation | End Month 2 | Proceed if simulations stable (no crashes) |
| Test Case 1 complete | End Month 3 | GO/NO-GO: If M3 fails bee test by ΔAIC < 0, consider stopping |
| All tests complete | End Month 4 | Final GO/NO-GO: Assess overall pattern |
| Manuscript submitted | End Month 5 | - |

### 11.3 Personnel Requirements

**Primary Developer**: 1 person full-time
- Skills: JavaScript, Python, statistical modeling
- Role: Implement models, run simulations, analyze data

**Secondary Analyst**: 1 person part-time (20%)
- Skills: R, model comparison, Bayesian statistics
- Role: Independent verification of AIC calculations, cross-validation

**Total Labor**: ~6 person-months

---

## 12. Code Architecture and Deployment

### 12.1 Agent Class (JavaScript)

```javascript
class Agent {
  constructor(x, y, heading, species) {
    this.x = x
    this.y = y
    this.heading = heading  // radians
    this.species = species
    this.age = 0
    
    // Quantum-inspired state (M3 only)
    this.amplitudes = {
      left: {re: 0.577, im: 0},     // 1/√3
      forward: {re: 0.577, im: 0},
      right: {re: 0.577, im: 0}
    }
  }
  
  sense(angle, distance) {
    const x_sense = this.x + Math.cos(this.heading + angle) * distance
    const y_sense = this.y + Math.sin(this.heading + angle) * distance
    
    // Sample pheromone at sensor location
    return environment.getPheromone(x_sense, y_sense, this.species)
  }
  
  update(model_type) {
    if (model_type === "M1") {
      this.updateClassical()
    } else if (model_type === "M2") {
      this.updateContext()
    } else if (model_type === "M3") {
      this.updateQuantum()
    }
  }
  
  updateClassical() {
    // Implement Model 1 dynamics (see Section 3)
    const left = this.sense(-SENSOR_ANGLE, SENSOR_DIST)
    const forward = this.sense(0, SENSOR_DIST)
    const right = this.sense(SENSOR_ANGLE, SENSOR_DIST)
    
    // Turn toward strongest
    if (left > forward && left > right) {
      this.heading -= TURN_SPEED
    } else if (right > forward && right > left) {
      this.heading += TURN_SPEED
    }
    
    // Move
    this.x += Math.cos(this.heading) * MOVE_SPEED
    this.y += Math.sin(this.heading) * MOVE_SPEED
    
    // Deposit
    environment.deposit(this.x, this.y, DEPOSIT_AMOUNT, this.species)
    
    this.age++
  }
  
  updateQuantum() {
    // Implement Model 3 dynamics (see Section 5)
    
    // Sense with phase information
    const sensors = {
      left: this.senseComplex(-SENSOR_ANGLE, SENSOR_DIST),
      forward: this.senseComplex(0, SENSOR_DIST),
      right: this.senseComplex(SENSOR_ANGLE, SENSOR_DIST)
    }
    
    // Update amplitudes
    this.evolveAmplitudes(sensors)
    
    // Measure (collapse)
    const direction = this.measureDirection()
    
    // Turn
    if (direction === "left") this.heading -= TURN_SPEED
    else if (direction === "right") this.heading += TURN_SPEED
    
    // Move
    this.x += Math.cos(this.heading) * MOVE_SPEED
    this.y += Math.sin(this.heading) * MOVE_SPEED
    
    // Deposit with phase
    const phase = (this.age * PHASE_ROTATION_RATE) % (2 * Math.PI)
    environment.depositComplex(this.x, this.y, DEPOSIT_AMOUNT, phase, this.species)
    
    this.age++
  }
  
  evolveAmplitudes(sensors) {
    // Coupling dynamics (see Section 5.1.2)
    const κ = COUPLING_STRENGTH
    
    const α_L = this.amplitudes.left
    const α_F = this.amplitudes.forward
    const α_R = this.amplitudes.right
    
    // Complex multiplication: (a+bi)*(c+di) = (ac-bd) + (ad+bc)i
    function cmul(z1, z2) {
      return {
        re: z1.re * z2.re - z1.im * z2.im,
        im: z1.re * z2.im + z1.im * z2.re
      }
    }
    
    // exp(iφ) = cos(φ) + i*sin(φ)
    function cexp(phase) {
      return {re: Math.cos(phase), im: Math.sin(phase)}
    }
    
    // Update
    const new_α_L = {
      re: α_L.re + κ * cmul(α_F, cexp(sensors.forward.phase)).re,
      im: α_L.im + κ * cmul(α_F, cexp(sensors.forward.phase)).im
    }
    
    // ... (similar for α_F and α_R)
    
    // Normalize
    const norm = Math.sqrt(
      new_α_L.re**2 + new_α_L.im**2 +
      new_α_F.re**2 + new_α_F.im**2 +
      new_α_R.re**2 + new_α_R.im**2
    )
    
    this.amplitudes.left = {re: new_α_L.re / norm, im: new_α_L.im / norm}
    // ... (normalize others)
  }
  
  measureDirection() {
    // Born rule: P = |amplitude|²
    const P_L = this.amplitudes.left.re**2 + this.amplitudes.left.im**2
    const P_F = this.amplitudes.forward.re**2 + this.amplitudes.forward.im**2
    const P_R = this.amplitudes.right.re**2 + this.amplitudes.right.im**2
    
    // Sample
    const rand = Math.random()
    if (rand < P_L) return "left"
    if (rand < P_L + P_F) return "forward"
    return "right"
  }
}
```

### 12.2 Environment Class

```javascript
class Environment {
  constructor(width, height, gridSize) {
    this.width = width
    this.height = height
    this.gridSize = gridSize
    
    // Pheromone grids (one per species)
    this.pheromones = {
      red: new Float32Array(gridSize * gridSize),
      blue: new Float32Array(gridSize * gridSize),
      green: new Float32Array(gridSize * gridSize)
    }
    
    // Phase grids (M3 only)
    this.phases = {
      red: new Float32Array(gridSize * gridSize),
      blue: new Float32Array(gridSize * gridSize),
      green: new Float32Array(gridSize * gridSize)
    }
  }
  
  getPheromone(x, y, species) {
    const i = Math.floor(x * this.gridSize / this.width)
    const j = Math.floor(y * this.gridSize / this.height)
    const idx = j * this.gridSize + i
    
    if (idx < 0 || idx >= this.gridSize * this.gridSize) return 0
    
    return this.pheromones[species][idx]
  }
  
  deposit(x, y, amount, species) {
    const i = Math.floor(x * this.gridSize / this.width)
    const j = Math.floor(y * this.gridSize / this.height)
    const idx = j * this.gridSize + i
    
    if (idx >= 0 && idx < this.gridSize * this.gridSize) {
      this.pheromones[species][idx] += amount
    }
  }
  
  update() {
    // Decay
    for (let species of ['red', 'blue', 'green']) {
      for (let i = 0; i < this.pheromones[species].length; i++) {
        this.pheromones[species][i] *= (1 - DECAY_RATE)
        
        // Phase evolution (M3)
        this.phases[species][i] += PHASE_ROTATION_RATE
        this.phases[species][i] %= (2 * Math.PI)
      }
    }
    
    // Diffusion (Gaussian blur)
    this.diffuse()
  }
  
  diffuse() {
    // Implement 2D Gaussian blur
    // (convolve with kernel or use FFT for speed)
    // ... (implementation details)
  }
}
```

### 12.3 Interactive Demo

**Web Interface** (HTML + Canvas):

```html
<!DOCTYPE html>
<html>
<head>
  <title>MYZEL Lab - Quantum-Inspired Stigmergy</title>
  <style>
    canvas { border: 1px solid black; }
    .controls { margin: 20px; }
  </style>
</head>
<body>
  <h1>MYZEL Lab</h1>
  <canvas id="canvas" width="512" height="512"></canvas>
  
  <div class="controls">
    <label>Model:
      <select id="model-select">
        <option value="M1">M1: Classical</option>
        <option value="M2">M2: Classical + Context</option>
        <option value="M3">M3: Quantum-Inspired</option>
      </select>
    </label>
    
    <button id="start">Start</button>
    <button id="pause">Pause</button>
    <button id="reset">Reset</button>
    
    <br><br>
    
    <label>Number of Agents: 
      <input id="n-agents" type="range" min="10" max="500" value="100">
      <span id="n-agents-value">100</span>
    </label>
    
    <!-- More parameter controls -->
  </div>
  
  <script src="agent.js"></script>
  <script src="environment.js"></script>
  <script src="simulation.js"></script>
  <script src="main.js"></script>
</body>
</html>
```

**Deployment**: GitHub Pages (static hosting, free)
- URL: https://username.github.io/quantum-biosemiotics-myzel/

---

## 13. Open Science Commitments

### 13.1 Pre-Registration

**Before any optimization or data analysis**:
- Register this protocol on OSF (Open Science Framework)
- Obtain DOI
- Publicly commit to analysis plan

**What is pre-registered**:
- Three models (M1, M2, M3) with parameter ranges
- Three test cases with empirical benchmarks
- Model comparison criteria (ΔAIC > 10)
- Falsification criteria (4 specific conditions)

**What is NOT pre-registered** (exploratory):
- Sensitivity analyses
- Additional test cases beyond the three
- Parameter visualizations and landscapes

### 13.2 Code Availability

**GitHub Repository**: Public from day 1
- All simulation code (JavaScript)
- All analysis scripts (Python, R)
- Unit tests
- Documentation (README, API docs)

**License**: MIT (permissive open source)
- Anyone can use, modify, distribute
- Encourages replication and extension

### 13.3 Data Availability

**Empirical Data**: 
- Extracted from published papers (already public)
- Our compiled dataset on OSF (CSV format)

**Simulation Outputs**:
- Raw simulation data on OSF (too large for GitHub)
- Analysis scripts to reproduce all figures/tables

### 13.4 Reproducibility

**Computational Environment**:
- Docker container (optional) with all dependencies
- requirements.txt (Python packages)
- package.json (JavaScript dependencies)

**Random Seeds**: Fixed for reproducibility
```python
np.random.seed(42)
random.seed(42)
```

**Detailed Logging**: All optimization runs logged
```python
study.optimize(objective, n_trials=10000)
study.trials_dataframe().to_csv("optimization_history.csv")
```

---

## 14. Limitations and Boundary Conditions

### 14.1 Acknowledged Limitations

**Limitation 1: Simplified Biology**
- Real stigmergic systems have complex chemistry (multiple pheromones, receptor types)
- MYZEL uses single pheromone type per species (abstraction)
- Quantum-inspired model is mathematical, not claiming literal quantum biology

**Limitation 2: 2D Space**
- Real environments are 3D (ants walk on surfaces, plants sense in 3D space)
- 2D sufficient for conceptual validation, but not high-fidelity simulation

**Limitation 3: Homogeneous Agents**
- Real colonies have worker castes, age polyethism
- MYZEL agents identical (except species)
- Could extend to heterogeneous populations in future

**Limitation 4: No Learning**
- Agents follow fixed rules (no adaptation within simulation)
- Real organisms learn from experience
- Could add reinforcement learning in future versions

### 14.2 Scope of Claims

**What This Validates**:
- Quantum-inspired **mathematics** can model stigmergic behavior
- Quantum formalism provides **useful abstraction** for order effects, interference
- Computational models **fit empirical data** (or don't)

**What This Does NOT Claim**:
- Real ants/plants have quantum superposition in their brains/cells
- Quantum mechanics is **necessary** for semiosis (only that it's a good model)
- MYZEL perfectly replicates all biological details

### 14.3 Generalizability

**Systems Where Framework May Apply**:
- Stigmergic collectives (ants, termites, slime molds)
- Chemical signaling networks (plant VOCs, bacterial quorum sensing)
- Neural networks (if synapses interpreted as "marks" modifying future signals)

**Systems Where Framework May NOT Apply**:
- Simple reflexes (phototaxis toward light - no history-dependence)
- Non-communicating individuals (solitary foragers)
- Deterministic dynamics (no stochastic element to produce interference)

---

## 15. Relation to Main Research Program

### 15.1 How Computational Phase Informs Biological Phase

**If M3 is supported** (ΔAIC > 10):

**Phase 3 Experiments Can Use**:
- **Pre-specified effect sizes** from M3 predictions
- **Parameter values** (e.g., phase rotation rate) for biological interpretation
- **Specific test designs** that maximize quantum vs. classical distinction

**Example**: If M3 predicts bee order effect d = 0.42 [0.37, 0.47], biological experiment should aim for N sufficient to detect d = 0.40 with 80% power.

**If M3 is not supported** (ΔAIC < 10):

**Phase 3 Does NOT Proceed**:
- Quantum hypothesis falsified computationally (cheaper than biology)
- Publish negative result
- Consider alternative hypotheses (e.g., quantum structure only in specific domains, or not at all)

### 15.2 Integration with Scoping Review (Phase 1)

**Phase 1 → Phase 2**:
- Scoping review provides empirical benchmarks (d = 0.40, d = -0.50, etc.)
- Phase 2 tests whether models can reproduce these benchmarks

**Phase 2 → Phase 1**:
- Computational models may reveal patterns not obvious in narrative synthesis
- Could inform updated scoping review (identify new relevant studies)

### 15.3 Timeline Integration

```
Month 0: Phase 1 (Scoping Review) complete
         ↓
Months 1-5: Phase 2 (Computational) [this supplement]
         ↓
Month 6: GO/NO-GO Decision
         ↓
         If GO:
Months 7-18: Phase 3 (Biological experiments) [main paper Section VII]
         ↓
Month 24: Synthesis manuscript
```

---

## 16. Success Metrics

### 16.1 Quantitative Success

**Primary Metric**: ΔAIC > 10 for M3 vs. M2 in ≥ 2/3 test cases

**Secondary Metrics**:
- Effect size accuracy: |predicted - empirical| < 0.15
- Cross-validation: M3 does not overfit (test LL within 10% of train LL)
- Parameter parsimony: M3 uses ≤ 15 parameters (currently 11)

### 16.2 Qualitative Success

**Visual Predictions Match Empirics**:
- Order effect plots show similar asymmetry shape
- Interference patterns show destructive (I < 0) where empirical does
- Context switch timing qualitatively matches ant reallocation

**Mechanistic Insight**:
- Can explain WHY quantum structure emerges (e.g., phase from signal decay)
- Provides testable predictions for novel scenarios (not just fitting existing data)

### 16.3 Publication Success

**Target Journals**:
- *PLoS Computational Biology* (computational focus)
- *Journal of Theoretical Biology* (modeling + biology)
- *Royal Society Open Science* (open access, broad scope)

**Expected Impact**:
- Demonstrates quantum cognition can be computationally validated
- Provides open-source framework (MYZEL) for community use
- Bridges theoretical quantum cognition and empirical biosemiotics

---

## 17. Contingency Plans

### 17.1 If Optimization Fails to Converge

**Problem**: Bayesian optimization doesn't find good parameters (stuck in local minimum)

**Solution**:
- Try alternative optimizers (CMA-ES, genetic algorithms)
- Increase n_trials (20,000 instead of 10,000)
- Manually seed optimization with literature values
- Simplify model (reduce parameter count)

### 17.2 If M3 Requires Too Many Parameters

**Problem**: Need > 15 parameters to fit data (excessive flexibility)

**Solution**:
- Fix some parameters at literature values (reduce free parameters)
- Use informative priors instead of uniform (Bayesian approach)
- Report as "M3 fails parsimony test" → does not support quantum hypothesis

### 17.3 If Computational Resources Insufficient

**Problem**: Simulations take too long (> 2 weeks per test case)

**Solution**:
- Reduce simulation resolution (256×256 grid instead of 512×512)
- Reduce agent count (50 instead of 100)
- Use parallelization (run multiple optimization trials simultaneously)
- Cloud computing (AWS, Google Cloud - pay for compute if necessary)

### 17.4 If GitHub/OSF Unavailable

**Problem**: Platform outage or account issues

**Solution**:
- Backup code on Zenodo (DOI-based repository)
- Host demo on alternative platform (GitLab Pages, Netlify)
- Store data on institutional repository as backup

---

## Conclusion

This protocol specifies a comprehensive, pre-registered computational validation of quantum-inspired biosemiotics. By implementing three models (classical, classical+context, quantum-inspired) and testing against empirical benchmarks from Phase 1 scoping review, we will determine whether quantum formalism adds explanatory value beyond classical alternatives.

**Key Strengths**:
- Pre-registered with explicit falsification criteria
- Tests against real data (not toy problems)
- Computationally tractable (5 months, standard hardware)
- Fully open science (code, data, protocols public)
- Clear go/no-go decision before expensive biology

**Expected Outcome**: Clear answer to whether quantum-inspired dynamics are necessary (M3 > M2) or just convenient (M3 ≈ M2) for modeling stigmergic semiosis.

---

**END OF SUPPLEMENT B**

---

## Appendix A: Parameter Ranges Summary

| Parameter | M1 | M2 | M3 | Justification |
|-----------|----|----|----|--------------| 
| Sensor angle | ✓ | ✓ | ✓ | Standard in ACO literature (30-60°) |
| Sensor distance | ✓ | ✓ | ✓ | ~10% of environment size |
| Turn speed | ✓ | ✓ | ✓ | Limited by biology (max ~90°/step) |
| Move speed | ✓ | ✓ | ✓ | Normalized to unit distance |
| Deposit amount | ✓ | ✓ | ✓ | Affects trail formation rate |
| Decay rate | ✓ | ✓ | ✓ | Typical 1-5% per timestep |
| Diffusion radius | ✓ | ✓ | ✓ | Balance between local/global info |
| High threshold | ✗ | ✓ | ✗ | Context-switch trigger |
| Low threshold | ✗ | ✓ | ✗ | Context-switch trigger |
| Exploration noise | ✗ | ✓ | ✗ | Noise in explore mode |
| Phase rotation | ✗ | ✗ | ✓ | Trail aging rate |
| Coupling strength | ✗ | ✗ | ✓ | Amplitude cross-talk |
| Context threshold | ✗ | ✗ | ✓ | Colony state switch |
| Phase noise | ✗ | ✗ | ✓ | Environmental fluctuation |

**Total Parameters**: M1 = 7, M2 = 10, M3 = 11

---

## Appendix B: Code Snippets for Key Algorithms

**Gaussian Blur (Pheromone Diffusion)**:
```javascript
function gaussianBlur(grid, sigma, gridSize) {
  const kernel = makeGaussianKernel(sigma)
  const output = new Float32Array(gridSize * gridSize)
  
  for (let j = 0; j < gridSize; j++) {
    for (let i = 0; i < gridSize; i++) {
      let sum = 0
      for (let kj = -2; kj <= 2; kj++) {
        for (let ki = -2; ki <= 2; ki++) {
          const ni = (i + ki + gridSize) % gridSize
          const nj = (j + kj + gridSize) % gridSize
          sum += grid[nj * gridSize + ni] * kernel[kj + 2][ki + 2]
        }
      }
      output[j * gridSize + i] = sum
    }
  }
  
  return output
}

function makeGaussianKernel(sigma) {
  // 5×5 kernel
  const kernel = []
  for (let j = -2; j <= 2; j++) {
    kernel[j + 2] = []
    for (let i = -2; i <= 2; i++) {
      kernel[j + 2][i + 2] = Math.exp(-(i*i + j*j) / (2 * sigma * sigma))
    }
  }
  // Normalize
  let sum = kernel.flat().reduce((a, b) => a + b)
  return kernel.map(row => row.map(val => val / sum))
}
```

---

## References

Beckers, R., et al. (1992). Trail laying behaviour during food recruitment in the ant Lasius niger. *Insectes Sociaux*, 39, 59-72.

Dorigo, M., & Stützle, T. (2004). *Ant Colony Optimization*. MIT Press.

Grassé, P.-P. (1959). La reconstruction du nid et les coordinations interindividuelles chez Bellicositermes natalensis et Cubitermes sp. *Insectes Sociaux*, 6, 41-80.

Kheradmand, A., et al. (2025). Honey bees can use sequence learning to predict rewards in conditional discriminations. *iScience*, 28, 111856.

Leon-Reyes, A., et al. (2010). Salicylate-mediated suppression of jasmonate-responsive gene expression in Arabidopsis is targeted downstream of the jasmonate biosynthesis pathway. *Planta*, 232, 1423-1432.

Nakagaki, T., et al. (2000). Maze-solving by an amoeboid organism. *Nature*, 407, 470.
