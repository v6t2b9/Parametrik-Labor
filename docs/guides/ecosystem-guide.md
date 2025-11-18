# Multi-Species Ecosystem Guide

**A comprehensive guide to the Ecosystem mode in Parametrik-Labor**

---

## Table of Contents

- [Overview](#overview)
- [Core Concepts](#core-concepts)
- [Species Types](#species-types)
- [Crystal System](#crystal-system)
- [Energy & Lifecycle](#energy--lifecycle)
- [Behavior State Machine](#behavior-state-machine)
- [Audio-Ecology Mapping](#audio-ecology-mapping)
- [Parameters Reference](#parameters-reference)
- [Usage Guide](#usage-guide)
- [Emergent Behaviors](#emergent-behaviors)
- [Technical Implementation](#technical-implementation)
- [Troubleshooting](#troubleshooting)

---

## Overview

The **Ecosystem Mode** transforms Parametrik-Labor from a static pheromone trail simulation into a dynamic living ecosystem. Instead of simple agents depositing trails, you get:

- **5 distinct species** with unique behaviors and ecological roles
- **Consumable crystals** that form from pheromone concentrations
- **Energy-based lifecycles** with birth, death, and reproduction
- **Population dynamics** with feedback loops and resource competition
- **Audio-reactive ecology** where music influences species activity

### What's New?

**Before (Standard Stigmergy):**
- Agents deposit pheromone trails indefinitely
- Trails decay but never run out
- Static agent population
- Focus on pattern formation

**After (Ecosystem Mode):**
- Pheromones crystallize into consumable resources
- Agents must eat crystals to survive
- Dynamic population (birth, death, reproduction)
- Focus on ecological dynamics + pattern formation

---

## Core Concepts

### From Trails to Crystals

In standard stigmergy, agents follow and deposit pheromone trails. In Ecosystem mode:

1. **Pheromone Accumulation** - Agents deposit pheromones as before
2. **Crystal Formation** - When pheromone concentration exceeds a threshold, a crystal forms
3. **Resource Type** - Crystal type matches pheromone color (red→build, green→food, blue→home)
4. **Consumption** - Agents seek and consume crystals to gain energy
5. **Depletion** - Crystals decay and disappear when energy = 0

### Energy Economy

Every agent has an **energy level** (0-1):

- **Decay:** Constant energy loss over time (species-dependent rate)
- **Consumption:** Gain energy by eating compatible crystals
- **Death:** Agent dies when energy reaches 0
- **Reproduction:** High-energy agents can reproduce (costs energy)

This creates a **dynamic equilibrium** where agent populations fluctuate based on resource availability.

### Ecological Roles

Each species occupies a unique ecological niche:

| Species | Eats | Produces | Role |
|---------|------|----------|------|
| Builder | Food | Build | Converts food into structures |
| Harvester | Build | Food | Converts structures into food |
| Consumer | Food, Home | Home | Consumes resources, produces homes |
| Decomposer | All | Food | Recycles everything into food |
| Scout | Food | Home | Explores and marks territory |

This creates **resource cycles** and **trophic relationships**.

---

## Species Types

### 🟠 Builder

**Role:** Structure Formation

**Ecology:**
- **Diet:** Food crystals only
- **Production:** Build pheromones (red)
- **Behavior:** Moderate speed, focused on construction
- **Energy Decay:** 0.002 (moderate consumption)

**Characteristics:**
- Forms stable, geometric structures
- Attracted to areas with food crystals
- Repelled by high build concentrations (prevents overcrowding)
- Audio boost: **Bass frequencies** (structure responds to low tones)

**Typical Usage:**
- Foundational species for creating persistent structures
- Works well with harvesters (they convert build→food)
- Responds dramatically to bass-heavy music

---

### 🟢 Harvester

**Role:** Resource Gathering

**Ecology:**
- **Diet:** Build crystals only
- **Production:** Food pheromones (green)
- **Behavior:** Fast movement, wide sensory range
- **Energy Decay:** 0.0025 (higher consumption)

**Characteristics:**
- Converts solid structures into consumable food
- High mobility for efficient resource gathering
- Creates sprawling food networks
- Audio boost: **Mid frequencies** (gathering responds to mid tones)

**Typical Usage:**
- Complementary to builders (build↔food cycle)
- Essential for sustaining other food-eating species
- Responds to melodic/harmonic mid-range music

---

### 🟣 Consumer

**Role:** Resource Consumption

**Ecology:**
- **Diet:** Food AND Home crystals
- **Production:** Home pheromones (blue)
- **Behavior:** Aggressive, high turn speed
- **Energy Decay:** 0.003 (highest consumption)

**Characteristics:**
- Consumes multiple resource types
- Aggressively seeks food when energy < 50%
- Creates territorial home markers
- Audio boost: **Transients** (consumption spikes with percussive events)

**Typical Usage:**
- Population control (consumes resources rapidly)
- Creates dynamic, chaotic patterns
- Explosive response to beats/percussion

---

### 🟪 Decomposer

**Role:** Recycling & Cleanup

**Ecology:**
- **Diet:** ALL crystal types (food, build, home)
- **Production:** Food pheromones (green)
- **Behavior:** Opportunistic, eats anything
- **Energy Decay:** 0.0015 (lowest consumption)

**Characteristics:**
- Universal diet (eats any crystal type)
- Converts waste/unused resources back to food
- Energy-efficient (low decay rate)
- Audio boost: **High frequencies** (cleanup responds to treble)

**Typical Usage:**
- Prevents resource deadlocks
- Recycles unused crystals back into circulation
- Stabilizes ecosystem during resource scarcity

---

### 🔵 Scout

**Role:** Exploration & Territory Marking

**Ecology:**
- **Diet:** Food crystals
- **Production:** Home pheromones (blue)
- **Behavior:** Very fast, wide sensor angle
- **Energy Decay:** 0.002 (moderate)

**Characteristics:**
- Highest movement speed
- Wide sensory field for exploration
- Marks explored areas with home pheromones
- Audio boost: **High frequencies** (exploration responds to treble)

**Typical Usage:**
- Rapid space exploration
- Creates sprawling territorial networks
- Responds dramatically to high-frequency/bright sounds

---

## Crystal System

### Formation

Crystals form when pheromone concentration exceeds the **formation threshold**:

```
if pheromone_value > formationThreshold:
    create_crystal(type=pheromone_color, energy=energyStart)
```

**Parameters:**
- **Formation Threshold** (0.1-0.9)
  - Low (0.1): Many crystals, high resource availability
  - High (0.9): Few crystals, resource scarcity
- **Energy Start** (0.2-2.0)
  - Initial energy capacity of new crystals
  - Higher = longer-lasting resources

**Spatial Logic:**
- Checks every 10th frame to avoid performance hit
- Samples grid at 10-pixel intervals
- Only forms if no crystal exists within 10 pixels (prevents clustering)

### Types

Three crystal types map to pheromone trails:

| Type | Pheromone Color | Visual Color | Produced By |
|------|----------------|--------------|-------------|
| **Build** | Red | Red-Orange | Builder |
| **Food** | Green | Yellow-Green | Harvester, Decomposer |
| **Home** | Blue | Cyan-Blue | Consumer, Scout |

### Energy & Decay

Each crystal has:
- **Energy** - Current energy level (0 to energyStart)
- **Decay Rate** - Energy loss per frame
- **Age** - Frames since formation

```typescript
crystal.energy -= crystal.decayRate * dt
if (crystal.energy <= 0) {
  remove_crystal(crystal)
}
```

**Parameters:**
- **Decay Rate** (0.001-0.05)
  - Low (0.001): Crystals last ~1000 frames
  - High (0.05): Crystals last ~20 frames

### Consumption

Agents consume crystals based on diet compatibility:

```typescript
const consumed = crystal.consume(consumptionRate)
const efficiency = getConversionEfficiency(crystal.type)
agent.energy += consumed * efficiency
```

**Conversion Efficiency:**
- Compatible food (in diet): 1.0x (100% efficient)
- All food (decomposer): 0.8x (80% efficient)

---

## Energy & Lifecycle

### Energy Decay

All agents constantly lose energy:

```typescript
agent.energy -= speciesConfig.energyDecay * speciesBoosts[species]
```

**Decay Rates by Species:**
- Builder: 0.002 (moderate)
- Harvester: 0.0025 (higher)
- Consumer: 0.003 (highest)
- Decomposer: 0.0015 (lowest)
- Scout: 0.002 (moderate)

**Audio Modulation:**
- Bass boosts builders → faster energy decay when bass-heavy
- Mids boost harvesters → faster decay with melodic music
- Etc.

### Death

When energy reaches 0, agent is removed:

```typescript
if (agent.energy <= 0) {
  ecosystemAgents.splice(index, 1)
  populationStats[agent.species]--
}
```

**Implications:**
- No food = population collapse
- Resource scarcity = natural population control

### Reproduction

High-energy agents reproduce when conditions are met:

```typescript
if (
  agent.energy >= reproductionThreshold &&  // e.g., 0.7
  agent.reproductionCooldown <= 0 &&        // Not in cooldown
  populationStats.total < maxPopulation &&  // Below cap
  frames_since_last_reproduction > 300      // Minimum interval
) {
  // Create offspring near parent
  offspring = createAgent(agent.species)
  offspring.x = agent.x + random(-20, 20)
  offspring.y = agent.y + random(-20, 20)
  offspring.energy = 0.4 + random(0, 0.2)  // 40-60% energy

  // Deduct from parent
  agent.energy -= reproductionCost  // e.g., 0.3
  agent.reproductionCooldown = 200  // Frames
}
```

**Parameters:**
- **Reproduction Threshold** (0.6-0.9): Minimum energy to reproduce
- **Reproduction Cost** (0.2-0.5): Energy deducted from parent
- **Cooldown:** 200 frames between reproductions

### Population Dynamics

**Initial Population:**
- Set starting count for each species (e.g., 20 builders, 30 harvesters)

**Max Population:**
- Global cap (100-1000) prevents runaway growth

**Emergent Dynamics:**
- Boom-bust cycles (resources → growth → depletion → collapse → recovery)
- Competitive exclusion (one species may dominate)
- Mutualism (builders+harvesters form stable cycle)

---

## Behavior State Machine

Agents transition between behavioral states based on energy, proximity to crystals, and current state:

```
┌─────────┐
│  IDLE   │
└────┬────┘
     │
     v
┌─────────────┐    energy < 30%     ┌──────────────┐
│   EXPLORE   │ ───────────────────> │  SEEK_FOOD   │
└─────────────┘                      └──────┬───────┘
     │                                      │
     │ crystal                              │ crystal
     │ detected                             │ found
     │                                      │
     v                                      v
┌─────────────────────┐              ┌─────────────────────┐
│ APPROACH_CRYSTAL    │ <────────────│   (fast seek)       │
└─────────┬───────────┘              └─────────────────────┘
          │
          │ distance < 5
          v
     ┌─────────┐
     │ CONSUME │
     └────┬────┘
          │
          │ crystal depleted
          │ OR energy > 90%
          v
     ┌─────────┐
     │ EXPLORE │
     └─────────┘
```

### State Descriptions

#### IDLE / EXPLORE
- Random movement with slight angle variation
- Sense nearby crystals (50px radius)
- Check energy level
- **Transition:**
  - energy < 30% → SEEK_FOOD
  - crystal detected → APPROACH_CRYSTAL

#### SEEK_FOOD
- Active search for compatible food crystals
- Larger search radius (80px)
- Follow pheromone gradients
- **Transition:**
  - crystal found → APPROACH_CRYSTAL
  - no crystal → continue seeking

#### APPROACH_CRYSTAL
- Direct movement toward target crystal
- Update target angle each frame
- **Transition:**
  - distance < 5px → CONSUME
  - crystal depleted → SEEK_FOOD or EXPLORE

#### CONSUME
- Extract energy from crystal
- Convert with species efficiency
- **Transition:**
  - crystal depleted → EXPLORE
  - energy >= 90% → EXPLORE (full)

#### Species-Specific States
- **BUILD:** Builders deposit build pheromones while exploring
- **HARVEST:** Harvesters specifically seek build crystals
- **HUNT:** Consumers aggressively hunt food
- **DECOMPOSE:** Decomposers eat any crystal type
- **SCOUT:** Scouts explore rapidly

---

## Audio-Ecology Mapping

When Audio Reactivity is enabled, audio features modulate species activity:

### Feature → Species Mapping

| Audio Feature | Boosted Species | Effect |
|---------------|----------------|--------|
| **Bass** | Builders | Low frequencies → structure formation |
| **Mids** | Harvesters | Melodic tones → resource gathering |
| **Highs** | Scouts, Decomposers | Bright sounds → exploration/cleanup |
| **Transients** | Consumers | Percussive hits → consumption bursts |

### Implementation

```typescript
speciesBoosts.builder = 1.0 + audioFeatures.bass * boostStrength
speciesBoosts.harvester = 1.0 + audioFeatures.mid * boostStrength
speciesBoosts.scout = 1.0 + audioFeatures.high * boostStrength
speciesBoosts.decomposer = 1.0 + audioFeatures.high * boostStrength
speciesBoosts.consumer = 1.0 + audioFeatures.transient * boostStrength
```

**Boost Strength:** 0-3.0 (multiplier)

### Effects on Ecosystem

- **Energy Decay:** `decay *= boost` → Bass-heavy music → builders burn energy faster
- **Movement:** Boosted species move more
- **Reproduction:** Higher activity → more reproduction opportunities
- **Visual:** Boosted species appear brighter (energy affects opacity)

### Musical Patterns

**Bass-heavy (electronic, dubstep):**
- Builders explode in activity
- Massive build crystal formation
- Harvesters lag behind (mid-poor music)
- Result: Build-crystal accumulation

**Mid-rich (acoustic, piano):**
- Harvesters dominate
- Food crystal production spikes
- Builders/consumers well-fed
- Result: Balanced ecosystem

**High-frequency (percussion, cymbals):**
- Scouts scatter widely
- Decomposers clean up aggressively
- Rapid exploration + cleanup
- Result: Chaotic, sprawling patterns

**Percussive (drums, beats):**
- Consumers spike with each beat
- Explosive consumption bursts
- Rapid boom-bust cycles
- Result: Pulsating population dynamics

---

## Parameters Reference

### Crystal Settings

| Parameter | Range | Default | Effect |
|-----------|-------|---------|--------|
| **Formation Threshold** | 0.1-0.9 | 0.5 | Higher = fewer crystals |
| **Energy Start** | 0.2-2.0 | 1.0 | Initial crystal energy |
| **Decay Rate** | 0.001-0.05 | 0.01 | Crystal energy decay speed |

### Population

| Parameter | Range | Default | Effect |
|-----------|-------|---------|--------|
| **Builder Initial** | 0-100 | 20 | Starting builder count |
| **Harvester Initial** | 0-100 | 30 | Starting harvester count |
| **Consumer Initial** | 0-100 | 15 | Starting consumer count |
| **Decomposer Initial** | 0-100 | 10 | Starting decomposer count |
| **Scout Initial** | 0-100 | 25 | Starting scout count |
| **Max Population** | 100-1000 | 500 | Global population cap |

### Energy

| Parameter | Range | Default | Effect |
|-----------|-------|---------|--------|
| **Reproduction Threshold** | 0.6-0.9 | 0.7 | Min energy to reproduce |
| **Reproduction Cost** | 0.2-0.5 | 0.3 | Energy deducted from parent |

### Audio-Ecology

| Parameter | Range | Default | Effect |
|-----------|-------|---------|--------|
| **Boost Strength** | 0-3.0 | 1.0 | Audio modulation intensity |
| **Bass Boost** | Enabled | Yes | Bass → Builders |
| **Mid Boost** | Enabled | Yes | Mids → Harvesters |
| **High Boost** | Enabled | Yes | Highs → Scouts/Decomposers |
| **Transient Boost** | Enabled | Yes | Transients → Consumers |

---

## Usage Guide

### Getting Started

1. **Enable Ecosystem Mode**
   - Open Ecosystem Oikos panel
   - Toggle "Enable Ecosystem Mode" ON
   - Engine switches from MusicReactiveEngine to MusicReactiveEcosystemEngine

2. **Set Initial Populations**
   - Adjust sliders for each species
   - Recommended starting ratio: 20/30/15/10/25 (builder/harvester/consumer/decomposer/scout)

3. **Configure Resources**
   - **Formation Threshold:** 0.5 (moderate crystal density)
   - **Energy Start:** 1.0 (standard lifespan)
   - **Decay Rate:** 0.01 (moderate decay)

4. **Set Population Limits**
   - Max Population: 500 (prevents lag)

5. **Start Simulation**
   - Click Play ▶️
   - Watch crystals form from pheromone trails
   - Observe agents seeking and consuming crystals
   - Population counts update in real-time (HUD overlay)

### Audio Integration

1. **Enable Audio Reactivity**
   - Go to Audio Oikos panel
   - Toggle "Enable Music Reactivity" ON
   - Select input (microphone or file upload)

2. **Ecosystem Audio Settings**
   - Return to Ecosystem Oikos
   - Set "Boost Strength" to 1.5-2.0 for noticeable effects

3. **Play Music**
   - **Bass-heavy:** Watch builders explode
   - **Mid-rich:** See harvesters flourish
   - **High-frequency:** Scouts/decomposers scatter
   - **Percussive:** Consumers pulse with beats

### Experimentation Tips

**Stable Ecosystem:**
- Balanced populations (20/30/15/10/25)
- Moderate formation threshold (0.5)
- Low boost strength (0.5-1.0)
- Result: Stable oscillations, predictable cycles

**Chaotic Ecosystem:**
- High consumer/scout populations
- Low formation threshold (0.2) → many crystals
- High boost strength (2.0-3.0)
- Result: Boom-bust cycles, unpredictable

**Resource Scarcity:**
- High formation threshold (0.8) → few crystals
- High crystal decay (0.05) → short lifespan
- Result: Population collapse, survival mode

**Builder Dominance:**
- 80 builders, 20 harvesters, 0 others
- Moderate threshold (0.5)
- Result: Build crystal accumulation, eventual collapse

---

## Emergent Behaviors

### Resource Cycles

**Builder ↔ Harvester Mutualism:**
1. Builders eat food, produce build
2. Build accumulates
3. Harvesters eat build, produce food
4. Food accumulates
5. Builders eat food → cycle repeats

**Observation:**
- Stable oscillations (period ~500-1000 frames)
- Population waves 90° out of phase
- Self-sustaining system

### Population Oscillations

**Boom-Bust Dynamics:**
1. **Boom:** High food → rapid reproduction → population spike
2. **Overshoot:** Population exceeds carrying capacity
3. **Resource Depletion:** Food consumed faster than produced
4. **Bust:** Mass starvation, population crash
5. **Recovery:** Remaining agents reproduce → cycle repeats

**Observation:**
- Period varies (200-2000 frames)
- Amplitude depends on reproduction parameters
- Can stabilize with decomposers (recycling)

### Spatial Patterns

**Species Clustering:**
- Builders cluster near food crystals
- Harvesters cluster near build crystals
- Consumers/scouts form territorial patches
- Decomposers patrol boundaries

**Pattern Formation:**
- Build crystals → geometric, stable structures
- Food crystals → sprawling networks
- Home crystals → scattered, territorial markers

### Trophic Cascades

**Removing Harvesters:**
1. No conversion of build → food
2. Build accumulates, food depletes
3. Builders starve (no food)
4. Consumer/scout populations collapse
5. Ecosystem collapse

**Adding Decomposers:**
1. Decomposers recycle build → food
2. Prevents resource deadlock
3. Ecosystem stabilizes
4. Population diversity increases

---

## Technical Implementation

### File Structure

```
src/
├── types/
│   └── ecosystem.ts              # Type definitions
├── engine/
│   ├── EcosystemEngine.ts        # Core ecosystem logic
│   ├── MusicReactiveEcosystemEngine.ts  # Audio integration
│   ├── Crystal.ts                # Crystal class & grid
│   └── SpeciesConfigs.ts         # Species behavior presets
├── audio/
│   └── AudioEcologyMapper.ts     # Audio → species mapping
├── components/
│   ├── EcosystemOikosPanel.tsx   # UI controls
│   ├── EcosystemStatsPanel.tsx   # Population display
│   └── CanvasPanel.tsx           # Rendering (modified)
└── engine/
    └── EcosystemRenderer.ts      # Crystal/HUD rendering
```

### Key Classes

**EcosystemEngine:**
- Extends `QuantumStigmergyEngine`
- Manages `ecosystemAgents[]`, `crystals[]`
- Overrides `getAgents()` to return ecosystem agents
- `updateEcosystem()` runs full lifecycle

**Crystal:**
- Energy storage and decay
- `update(dt)` → age and decay
- `consume(amount)` → extract energy
- `isDepleted()` → check if empty

**CrystalGrid:**
- Spatial optimization
- `getNearby(x, y, radius)` → fast lookup
- Grid cells for O(1) access

### Engine Switching

Store detects `ecosystemMode` and creates appropriate engine:

```typescript
function createEngine(params: AllParameters) {
  if (params.ecosystemMode) {
    const ecosystem = new MusicReactiveEcosystemEngine(gridSize)
    ecosystem.initializeEcosystem(params)
    return ecosystem
  } else {
    const standard = new MusicReactiveEngine(gridSize)
    standard.initializeAgents(params.globalTemporal.agentCount)
    return standard
  }
}
```

### Rendering Logic

**CanvasPanel.tsx:**

```typescript
const isEcosystemEngine = 'getEcosystemAgents' in engine
const ecosystemMode = currentParameters.ecosystemMode

if (isEcosystemEngine && ecosystemMode) {
  // Ecosystem rendering
  const ecosystemAgents = engine.getEcosystemAgents()
  const crystals = engine.getCrystals()

  // Render species-colored agents
  ecosystemAgents.forEach(agent => {
    const color = SPECIES_COLORS[agent.species]
    const alpha = Math.max(0.3, agent.energy)
    ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`
    // ... draw agent
  })

  // Render crystals
  EcosystemRenderer.renderCrystals(ctx, crystals, options)

  // Render HUD
  EcosystemRenderer.renderHUD(ctx, populationStats, totalCrystals, totalEnergy)
}
```

---

## Troubleshooting

### Canvas Goes Black

**Problem:** Activating ecosystem mode causes black canvas.

**Cause:** `EcosystemAgent` missing `type` property for pheromone trail compatibility.

**Solution:** ✅ Fixed in latest version
- `EcosystemAgent` now includes `type: 'red' | 'green' | 'blue'`
- `getAgents()` overridden to return `ecosystemAgents`

### No Crystals Forming

**Problem:** Agents move but no crystals appear.

**Diagnosis:**
- Check formation threshold (lower = more crystals)
- Ensure pheromone trails are visible (may be below threshold)

**Solution:**
- Lower formation threshold to 0.2-0.3
- Increase deposit amount (Semiotic Oikos)
- Decrease decay rate (Physical Oikos)

### Population Collapse

**Problem:** All agents die quickly.

**Diagnosis:**
- No food crystals → starvation
- High decay rate → energy depletes too fast
- Max population too low

**Solution:**
- Increase initial populations
- Lower formation threshold (more crystals)
- Increase crystal energy start
- Decrease decay rates

### Runaway Population

**Problem:** Population explodes, lag increases.

**Diagnosis:**
- Too many crystals (low threshold)
- Low reproduction cost
- Max population too high

**Solution:**
- Increase formation threshold
- Increase reproduction cost
- Decrease max population
- Increase decay rates

### No Audio Effect

**Problem:** Music plays but ecosystem doesn't respond.

**Diagnosis:**
- Audio reactivity disabled
- Boost strength = 0
- Wrong input source

**Solution:**
- Enable Audio Reactivity (Audio Oikos)
- Increase Boost Strength (Ecosystem Oikos)
- Verify input source (microphone or file)
- Check audio permissions (browser)

---

## Next Steps

**Explore Further:**
- Try different species ratios
- Experiment with audio-ecology mapping
- Combine with other Oikos (Physical, Semiotic, Temporal)
- Create custom ecosystem presets

**Research Applications:**
- Study population dynamics
- Model trophic cascades
- Test resource competition
- Analyze spatial patterns
- Validate ecological theories

**Creative Applications:**
- Live audio-visual performances
- Generative art with ecosystems
- Ambient background animations
- Educational demonstrations

---

**Ready to evolve? Enable Ecosystem Mode and watch life emerge!** 🌿
