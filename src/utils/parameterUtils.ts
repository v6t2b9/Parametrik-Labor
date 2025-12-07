/**
 * Parameter utility functions
 * Shared helpers for parameter resolution and manipulation
 */

import type { AllParameters, AgentType, ResolvedSpeciesParams } from '../types';

/**
 * Resolve species-specific parameters by merging universal defaults with species overrides
 *
 * @param params - All parameters including universal and species-specific
 * @param species - The species type to resolve parameters for
 * @returns Merged parameters for the specified species
 */
export function resolveSpeciesParams(
  params: AllParameters,
  species: AgentType
): ResolvedSpeciesParams {
  const speciesOverride = params.species[species];

  return {
    physical: {
      ...params.universal.physical,
      ...(speciesOverride.physical || {}),
    },
    semiotic: {
      ...params.universal.semiotic,
      ...(speciesOverride.semiotic || {}),
    },
    temporal: {
      ...params.universal.temporal,
      ...(speciesOverride.temporal || {}),
    },
    resonance: {
      ...params.universal.resonance,
      ...(speciesOverride.resonance || {}),
      // Deep copy interactionMatrix to prevent shared references
      interactionMatrix: {
        ...(speciesOverride.resonance?.interactionMatrix || params.universal.resonance.interactionMatrix),
      },
    },
    audio: {
      ...params.universal.audio,
      ...(speciesOverride.audio || {}),
    },
  };
}
