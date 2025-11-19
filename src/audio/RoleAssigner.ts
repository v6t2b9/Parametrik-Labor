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

  // Performance optimization: Cache dominant role calculation per frame
  private cachedDominantRole: { role: EcosystemRole; intensity: number } | null = null;
  private cachedFrameCount: number = -1;

  constructor(roleMappings: MusicMappingParameters['roleMapping']) {
    this.roleMappings = roleMappings;
  }

  /**
   * Update role mapping configuration
   */
  public setRoleMappings(roleMappings: MusicMappingParameters['roleMapping']): void {
    this.roleMappings = roleMappings;
    // Invalidate cache when config changes
    this.cachedFrameCount = -1;
  }

  /**
   * Determine the dominant role based on current audio analysis
   * Returns the role with the highest signal strength above threshold
   * Performance optimized: Caches result per frame and avoids array allocations
   */
  public getDominantRole(analysis: MusicAnalysis): { role: EcosystemRole; intensity: number } | null {
    if (!this.roleMappings.enabled) {
      return null;
    }

    // Performance optimization: Return cached result if same frame
    if (this.cachedFrameCount === this.frameCount) {
      return this.cachedDominantRole;
    }

    // Calculate signal strength for each role and track max directly
    // Performance optimization: No array allocation, direct comparison
    let maxRole: EcosystemRole | null = null;
    let maxIntensity = -Infinity;

    // Builder: High bass energy
    const builderSignal = analysis.spectral.bassEnergy;
    if (builderSignal >= this.roleMappings.builderThreshold.bassEnergy && builderSignal > maxIntensity) {
      maxRole = 'builder';
      maxIntensity = builderSignal;
    }

    // Harvester: High mid energy
    const harvesterSignal = analysis.spectral.midEnergy;
    if (harvesterSignal >= this.roleMappings.harvesterThreshold.midEnergy && harvesterSignal > maxIntensity) {
      maxRole = 'harvester';
      maxIntensity = harvesterSignal;
    }

    // Consumer: High arousal
    const consumerSignal = analysis.tempo.arousalLevel;
    if (consumerSignal >= this.roleMappings.consumerThreshold.arousalLevel && consumerSignal > maxIntensity) {
      maxRole = 'consumer';
      maxIntensity = consumerSignal;
    }

    // Decomposer: High dissonance
    const decomposerSignal = analysis.harmony.dissonance;
    if (decomposerSignal >= this.roleMappings.decomposerThreshold.dissonance && decomposerSignal > maxIntensity) {
      maxRole = 'decomposer';
      maxIntensity = decomposerSignal;
    }

    // Scout: High treble energy
    const scoutSignal = analysis.spectral.highEnergy;
    if (scoutSignal >= this.roleMappings.scoutThreshold.highEnergy && scoutSignal > maxIntensity) {
      maxRole = 'scout';
      maxIntensity = scoutSignal;
    }

    // Cache result for this frame
    const result = maxRole ? { role: maxRole, intensity: maxIntensity } : null;
    this.cachedDominantRole = result;
    this.cachedFrameCount = this.frameCount;

    return result;
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
