/**
 * Crystal Class
 * Represents consumable resources in the ecosystem
 */

import type { ICrystal, CrystalType, SpeciesType } from '../types/ecosystem.js';

export class Crystal implements ICrystal {
  x: number;
  y: number;
  type: CrystalType;
  energy: number;
  age: number;
  decayRate: number;
  sourceSpecies: SpeciesType;

  constructor(
    x: number,
    y: number,
    type: CrystalType,
    sourceSpecies: SpeciesType,
    initialEnergy: number = 1.0,
    decayRate: number = 0.001
  ) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.sourceSpecies = sourceSpecies;
    this.energy = Math.min(Math.max(initialEnergy, 0), 1);
    this.age = 0;
    this.decayRate = decayRate;
  }

  /**
   * Update crystal state (decay over time)
   * @returns false if crystal is depleted and should be removed
   */
  update(dt: number = 1): boolean {
    this.age += dt;

    // Natural decay
    this.energy -= this.decayRate * dt;

    // Clamp energy
    this.energy = Math.max(0, this.energy);

    // Crystal is depleted if energy reaches 0
    return this.energy > 0;
  }

  /**
   * Consume energy from the crystal
   * @param amount - Requested consumption amount (0-1)
   * @returns actual amount consumed
   */
  consume(amount: number): number {
    const actualConsumed = Math.min(amount, this.energy);
    this.energy -= actualConsumed;
    return actualConsumed;
  }

  /**
   * Get visual properties for rendering
   */
  getVisualProperties(): {
    size: number;
    alpha: number;
    glowIntensity: number;
  } {
    const baseSize = 3;
    const energySize = this.energy * 4;

    return {
      size: baseSize + energySize,
      alpha: Math.max(0.3, this.energy), // Min 30% alpha for visibility
      glowIntensity: this.energy * 10,
    };
  }

  /**
   * Check if crystal is at a position (within radius)
   */
  isAtPosition(x: number, y: number, radius: number = 5): boolean {
    const dx = this.x - x;
    const dy = this.y - y;
    return Math.sqrt(dx * dx + dy * dy) <= radius;
  }

  /**
   * Get distance to a point
   */
  distanceTo(x: number, y: number): number {
    const dx = this.x - x;
    const dy = this.y - y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Check if crystal is depleted
   */
  isDepleted(): boolean {
    return this.energy <= 0;
  }

  /**
   * Get energy percentage (0-100)
   */
  getEnergyPercent(): number {
    return this.energy * 100;
  }
}

// ============================================================================
// Crystal Management Utilities
// ============================================================================

/**
 * Create a crystal from pheromone concentration
 */
export function createCrystalFromPheromone(
  x: number,
  y: number,
  type: CrystalType,
  sourceSpecies: SpeciesType,
  pheromoneStrength: number,
  config: { energyStart: number; decayRate: number }
): Crystal {
  // Scale initial energy based on pheromone strength
  const initialEnergy = Math.min(config.energyStart, pheromoneStrength / 255);

  return new Crystal(x, y, type, sourceSpecies, initialEnergy, config.decayRate);
}

/**
 * Spatial grid for fast crystal lookup
 */
export class CrystalGrid {
  private cellSize: number;
  private grid: Map<string, Crystal[]>;

  constructor(_gridSize: number, cellSize: number = 20) {
    this.cellSize = cellSize;
    this.grid = new Map();
  }

  private getCellKey(x: number, y: number): string {
    const cellX = Math.floor(x / this.cellSize);
    const cellY = Math.floor(y / this.cellSize);
    return `${cellX},${cellY}`;
  }

  add(crystal: Crystal): void {
    const key = this.getCellKey(crystal.x, crystal.y);
    if (!this.grid.has(key)) {
      this.grid.set(key, []);
    }
    this.grid.get(key)!.push(crystal);
  }

  remove(crystal: Crystal): void {
    const key = this.getCellKey(crystal.x, crystal.y);
    const cell = this.grid.get(key);
    if (cell) {
      const index = cell.indexOf(crystal);
      if (index !== -1) {
        cell.splice(index, 1);
      }
      if (cell.length === 0) {
        this.grid.delete(key);
      }
    }
  }

  getNearby(x: number, y: number, radius: number): Crystal[] {
    const results: Crystal[] = [];
    const cellRadius = Math.ceil(radius / this.cellSize);
    const centerCellX = Math.floor(x / this.cellSize);
    const centerCellY = Math.floor(y / this.cellSize);

    for (let dy = -cellRadius; dy <= cellRadius; dy++) {
      for (let dx = -cellRadius; dx <= cellRadius; dx++) {
        const key = `${centerCellX + dx},${centerCellY + dy}`;
        const cell = this.grid.get(key);
        if (cell) {
          for (const crystal of cell) {
            if (crystal.distanceTo(x, y) <= radius) {
              results.push(crystal);
            }
          }
        }
      }
    }

    return results;
  }

  clear(): void {
    this.grid.clear();
  }

  reindex(crystals: Crystal[]): void {
    this.clear();
    for (const crystal of crystals) {
      this.add(crystal);
    }
  }

  getAll(): Crystal[] {
    const all: Crystal[] = [];
    for (const cell of this.grid.values()) {
      all.push(...cell);
    }
    return all;
  }
}
