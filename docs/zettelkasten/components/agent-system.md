---
id: component-agent-system
title: Agent System
type: component
category: simulation-core
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [component, agents, sensing, movement]
related:
  - "[[quantum-stigmergy-engine]]"
  - "[[trail-system]]"
sources:
  - "[[../../development/ARCHITECTURE.md]]"
---

## Definition

**Agent System** implementiert die Agenten-Logik: Position, Sensing (Pheromone Detection), Steering (Turn Logic), Movement, und Trail Deposition.

## Agent-Struktur

```typescript
interface Agent {
  x: number           // Position X (Pixel)
  y: number           // Position Y (Pixel)
  angle: number       // Direction (Radians, 0-2π)
  
  // M2 Context Switching
  mode?: 'explore' | 'exploit'
  
  // M3 Quantum State
  quantumState?: {
    phase: number          // Quantum Phase
    amplitude: number      // Superposition Amplitude
    coherenceTime: number  // Phase Coherence
  }
}
```

## Vier Kern-Operationen

### 1. Sensing (Pheromone Detection)

```yaml
Funktion: sense(agent, params) → SensedData

Algorithmus:
  - Berechne 3 Sensor-Positionen:
    - Forward: (x + cos(angle) * sensorDist, y + sin(angle) * sensorDist)
    - Left:    (x + cos(angle - sensorAngle) * sensorDist, ...)
    - Right:   (x + cos(angle + sensorAngle) * sensorDist, ...)
  - Sample Trail-Map an diesen Positionen
  - Return: {forward, left, right} Trail-Intensitäten

Parameter-Abhängigkeit:
  - [[../parameters/sensor-distance.md]]: Radius
  - [[../parameters/sensor-angle.md]]: Sensor-Spread
```

### 2. Steering (Turn Logic)

```yaml
Funktion: turn(agent, sensedData, params)

M1 Classical:
  if (left > forward && left > right): angle -= turnSpeed
  if (right > forward && right > left): angle += turnSpeed
  
M2 Context-Switching:
  if (mode == 'explore'): angle += random(-turnSpeed, turnSpeed)
  if (mode == 'exploit'): [wie M1]

M3 Quantum:
  baseAngle = [wie M1]
  phaseInfluence = sin(quantumState.phase)
  angle = baseAngle + phaseInfluence * turnSpeed

Parameter-Abhängigkeit:
  - [[../parameters/turn-speed.md]]: Turn Rate
```

### 3. Movement (Position Update)

```yaml
Funktion: move(agent, params, deltaTime)

Algorithmus:
  agent.x += cos(agent.angle) * speed * deltaTime
  agent.y += sin(agent.angle) * speed * deltaTime
  
  // Boundary Wrapping (Toroidal Topology)
  if (agent.x < 0): agent.x += width
  if (agent.x >= width): agent.x -= width
  if (agent.y < 0): agent.y += height
  if (agent.y >= height): agent.y -= height

Parameter-Abhängigkeit:
  - [[../parameters/agent-speed.md]]: Movement Speed
```

### 4. Deposition (Trail Creation)

```yaml
Funktion: deposit(agent, params)

M1 Classical:
  trailMap[agent.x, agent.y] += deposit

M3 Quantum:
  phaseModulation = 0.5 + 0.5 * cos(quantumState.phase)
  trailMap[agent.x, agent.y] += deposit * phaseModulation

Parameter-Abhängigkeit:
  - [[../parameters/deposit-amount.md]]: Trail Intensity
```

## Verwandte Komponenten

- [[quantum-stigmergy-engine]] - Orchestriert Agent-Updates
- [[trail-system]] - Agents schreiben auf Trail-Map

## Verwandte Konzepte

- [[../concepts/stigmergy.md]] - Agents als Zeichen-Setzer
- [[../concepts/parameter-as-oikos.md]] - Parameter ko-konstituieren Agent-Umwelt
