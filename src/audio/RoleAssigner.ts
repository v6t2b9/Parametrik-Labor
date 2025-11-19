/**
 * RoleAssigner - Audio-driven dynamic role assignment for agents
 *
 * Assigns ecosystem roles to agents based on real-time audio analysis
 * Features hysteresis (minimum duration) to prevent rapid role switching
 */

import type { Agent, EcosystemRole } from '../types/index.js';
import type { MusicAnalysis, MusicMappingParameters } from '../types/musicMappings.js';

export class RoleAssigner {
  private roleMappings: MusicMappingParameters['roleMapping'];
  private frameCount: number = 0;

  constructor(roleMappings: MusicMappingParameters['roleMapping']) {
    this.roleMappings = roleMappings;
  }

  /**
   * Update role mapping configuration
   */
  public setRoleMappings(roleMappings: MusicMappingParameters['roleMapping']): void {
    this.roleMappings = roleMappings;
  }

  /**
   * Determine the dominant role based on current audio analysis
   * Returns the role with the highest signal strength above threshold
   */
  public getDominantRole(analysis: MusicAnalysis): { role: EcosystemRole; intensity: number } | null {
    if (!this.roleMappings.enabled) {
      return null;
    }

    // Calculate signal strength for each role
    const roleSignals: Array<{ role: EcosystemRole; intensity: number }> = [];

    // Builder: High bass energy
    const builderSignal = analysis.spectral.bassEnergy;
    if (builderSignal >= this.roleMappings.builderThreshold.bassEnergy) {
      roleSignals.push({ role: 'builder', intensity: builderSignal });
    }

    // Harvester: High mid energy
    const harvesterSignal = analysis.spectral.midEnergy;
    if (harvesterSignal >= this.roleMappings.harvesterThreshold.midEnergy) {
      roleSignals.push({ role: 'harvester', intensity: harvesterSignal });
    }

    // Consumer: High arousal
    const consumerSignal = analysis.tempo.arousalLevel;
    if (consumerSignal >= this.roleMappings.consumerThreshold.arousalLevel) {
      roleSignals.push({ role: 'consumer', intensity: consumerSignal });
    }

    // Decomposer: High dissonance
    const decomposerSignal = analysis.harmony.dissonance;
    if (decomposerSignal >= this.roleMappings.decomposerThreshold.dissonance) {
      roleSignals.push({ role: 'decomposer', intensity: decomposerSignal });
    }

    // Scout: High treble energy
    const scoutSignal = analysis.spectral.highEnergy;
    if (scoutSignal >= this.roleMappings.scoutThreshold.highEnergy) {
      roleSignals.push({ role: 'scout', intensity: scoutSignal });
    }

    // Return role with highest intensity, or null if no roles above threshold
    if (roleSignals.length === 0) {
      return null;
    }

    return roleSignals.reduce((max, current) =>
      current.intensity > max.intensity ? current : max
    );
  }

  /**
   * Assign role to an agent with hysteresis
   * Only switches role if minimum duration has passed
   */
  public assignRole(agent: Agent, analysis: MusicAnalysis): void {
    if (!this.roleMappings.enabled) {
      // Clear role if mapping is disabled
      agent.currentRole = undefined;
      agent.roleTransitionTime = undefined;
      agent.roleIntensity = undefined;
      return;
    }

    const dominantRole = this.getDominantRole(analysis);

    // Initialize role tracking if not present
    if (agent.roleTransitionTime === undefined) {
      agent.roleTransitionTime = 0;
    }

    // Increment transition time
    agent.roleTransitionTime++;

    // No dominant role - clear assignment
    if (!dominantRole) {
      if (agent.currentRole !== undefined) {
        // Only clear if enough time has passed
        if (agent.roleTransitionTime >= this.roleMappings.minRoleDuration) {
          agent.currentRole = undefined;
          agent.roleIntensity = 0;
          agent.roleTransitionTime = 0;
        }
      }
      return;
    }

    // Same role as current - update intensity
    if (agent.currentRole === dominantRole.role) {
      agent.roleIntensity = dominantRole.intensity;
      return;
    }

    // Different role - check if enough time has passed
    const newRole = dominantRole.role;
    const minDuration = this.getMinDurationForRole(newRole);

    if (agent.roleTransitionTime >= minDuration) {
      // Switch to new role
      agent.currentRole = newRole;
      agent.roleIntensity = dominantRole.intensity;
      agent.roleTransitionTime = 0; // Reset transition timer
    }
  }

  /**
   * Get minimum duration required for a specific role
   */
  private getMinDurationForRole(role: EcosystemRole): number {
    switch (role) {
      case 'builder':
        return this.roleMappings.builderThreshold.minDuration;
      case 'harvester':
        return this.roleMappings.harvesterThreshold.minDuration;
      case 'consumer':
        return this.roleMappings.consumerThreshold.minDuration;
      case 'decomposer':
        return this.roleMappings.decomposerThreshold.minDuration;
      case 'scout':
        return this.roleMappings.scoutThreshold.minDuration;
      default:
        return this.roleMappings.minRoleDuration;
    }
  }

  /**
   * Batch assign roles to all agents
   */
  public assignRolesToAgents(agents: Agent[], analysis: MusicAnalysis): void {
    for (const agent of agents) {
      this.assignRole(agent, analysis);
    }
    this.frameCount++;
  }

  /**
   * Get role distribution statistics
   */
  public getRoleDistribution(agents: Agent[]): Record<EcosystemRole | 'unassigned', number> {
    const distribution: Record<string, number> = {
      builder: 0,
      harvester: 0,
      consumer: 0,
      decomposer: 0,
      scout: 0,
      unassigned: 0,
    };

    for (const agent of agents) {
      if (agent.currentRole) {
        distribution[agent.currentRole]++;
      } else {
        distribution.unassigned++;
      }
    }

    return distribution as Record<EcosystemRole | 'unassigned', number>;
  }
}
