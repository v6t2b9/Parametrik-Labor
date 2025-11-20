---
id: component-ecosystem-engine
title: EcosystemEngine (Multi-Species)
type: component
category: simulation-extension
status: active
location: src/engine/EcosystemEngine.ts
created: 2025-11-20
updated: 2025-11-20
tags: [component, ecosystem, multi-species, energy]
related:
  - "[[quantum-stigmergy-engine]]"
  - "[[agent-system]]"
sources:
  - "[[../../development/ARCHITECTURE.md]]"
---

## Definition

**EcosystemEngine** erweitert QuantumStigmergyEngine um Multi-Spezies-Dynamiken, Energie-basierte Lifecycles, und Behavior State Machines.

## Erweiterung gegenüber QuantumStigmergyEngine

```yaml
QuantumStigmergyEngine:
  - Single/Multi-Spezies stigmergische Trails
  - Einfache Agent-Logik

EcosystemEngine (extends Quantum):
  - 5 Spezies-Typen (Builder, Harvester, Consumer, Decomposer, Scout)
  - Energie-System (Energy, Reproduction, Death)
  - Behavior State Machines (verschiedene Modi pro Spezies)
  - Crystal System (emergente Strukturen)
  - Audio-Ecology Mapping (Sound-Reaktivität)
```

## 5 Spezies-Typen

```yaml
1. Builder:
   - Hinterlässt starke Trails
   - Baut "Pfade" und Strukturen
   
2. Harvester:
   - Sammelt Ressourcen (virtuelle)
   - Moderate Trails
   
3. Consumer:
   - "Frisst" Trails (reduziert Trail-Intensität)
   - Schwache eigene Trails
   
4. Decomposer:
   - Zersetzt starke Trail-Konzentrationen
   - Fade-ähnlicher Effekt, lokal
   
5. Scout:
   - Hohe Geschwindigkeit, schwache Trails
   - Exploration-Verhalten
```

## Energie-System

```yaml
EcosystemAgent:
  energy: number  // Aktuelle Energie (0-100)
  
Energy Gain:
  - Bei Trail-Sensing (abhängig von Spezies)
  - Builder: Energie aus hoher Trail-Dichte
  
Energy Loss:
  - Pro Frame: -0.1 (Metabolismus)
  - Bei Bewegung: -0.05 * speed
  
Lifecycle:
  - Energy > 80: Reproduction (neuer Agent)
  - Energy < 10: Death (Agent entfernt)
```

## Behavior State Machine

```yaml
States:
  - EXPLORE: Zufällige Bewegung, sucht Ressourcen
  - EXPLOIT: Folgt hohen Trail-Konzentrationen
  - REPRODUCE: Bei hoher Energie
  - FLEE: Bei niedrigem Energy, sucht "sichere" Regions

Transitions:
  EXPLORE → EXPLOIT: Trail-Dichte > threshold
  EXPLOIT → EXPLORE: Trail-Dichte < threshold
  * → REPRODUCE: Energy > 80
  * → FLEE: Energy < 20
```

## Crystal System

```yaml
Emergente Strukturen:
  - Bei hoher Builder-Aktivität + stabilen Trails
  - "Kristalle" wachsen an Trail-Hotspots
  - Beeinflusst Agent-Bewegung (Attraction/Repulsion)

Mechanismus:
  - Threshold-basiert: Trail-Intensität > 200 → Crystal-Seed
  - Wachstum über Zeit
  - Zerfall bei niedriger Trail-Dichte
```

## Verwandte Komponenten

- [[quantum-stigmergy-engine]] - Basis-Klasse
- [[agent-system]] - Erweitert Agent-Struktur

## Verwandte Konzepte

- [[../concepts/oekosemiotik.md]] - Multi-Spezies als Zeichen-Systeme
- [[../properties/separation.md]] - Separation emergiert aus Multi-Spezies-Interaktion
