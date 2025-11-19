/**
 * Default Ecosystem Role Configurations
 * Defines behavior modifiers for each functional role
 */

import type { RoleConfig, EcosystemRole } from '../types/index.js';

// Default role configurations
export const ROLE_CONFIGS: Record<EcosystemRole, RoleConfig> = {
  builder: {
    name: 'builder',
    description: 'Slow, high deposit - creates dense trail networks',
    icon: '🏗️',
    modifiers: {
      speedMultiplier: 0.6,       // Slow movement
      depositMultiplier: 1.8,     // High trail deposition
      sensorDistMultiplier: 0.9,  // Normal sensor range
      sensorAngleMultiplier: 1.0, // Normal sensor angle
      turnSpeedMultiplier: 0.7,   // Low agility
    },
  },

  harvester: {
    name: 'harvester',
    description: 'Medium speed, increased sensors - explores and collects',
    icon: '🌾',
    modifiers: {
      speedMultiplier: 1.0,       // Normal speed
      depositMultiplier: 1.0,     // Normal deposit
      sensorDistMultiplier: 1.5,  // Extended sensor range
      sensorAngleMultiplier: 1.3, // Wider sensor angle
      turnSpeedMultiplier: 1.0,   // Normal agility
    },
  },

  consumer: {
    name: 'consumer',
    description: 'Fast, high trail following - consumes existing trails',
    icon: '🔥',
    modifiers: {
      speedMultiplier: 1.5,       // High speed
      depositMultiplier: 0.7,     // Lower deposit
      sensorDistMultiplier: 1.2,  // Slightly extended sensors
      sensorAngleMultiplier: 0.8, // Narrower focus
      turnSpeedMultiplier: 1.3,   // High agility
    },
  },

  decomposer: {
    name: 'decomposer',
    description: 'Slow, low deposit - disperses and breaks down trails',
    icon: '🍄',
    modifiers: {
      speedMultiplier: 0.7,       // Slow movement
      depositMultiplier: 0.4,     // Very low deposit
      sensorDistMultiplier: 0.8,  // Reduced sensors
      sensorAngleMultiplier: 1.2, // Wider angle (scatter)
      turnSpeedMultiplier: 0.9,   // Moderate agility
    },
  },

  scout: {
    name: 'scout',
    description: 'Very fast, low deposit - explores new territory',
    icon: '🔭',
    modifiers: {
      speedMultiplier: 2.0,       // Very fast
      depositMultiplier: 0.5,     // Low deposit
      sensorDistMultiplier: 1.8,  // Very long range sensors
      sensorAngleMultiplier: 0.7, // Focused forward
      turnSpeedMultiplier: 1.5,   // High agility
    },
  },
};

/**
 * Get behavior modifiers for a given role
 */
export function getRoleModifiers(role: EcosystemRole) {
  return ROLE_CONFIGS[role].modifiers;
}

/**
 * Get role config by name
 */
export function getRoleConfig(role: EcosystemRole): RoleConfig {
  return ROLE_CONFIGS[role];
}

/**
 * Get all available roles
 */
export function getAllRoles(): EcosystemRole[] {
  return Object.keys(ROLE_CONFIGS) as EcosystemRole[];
}
