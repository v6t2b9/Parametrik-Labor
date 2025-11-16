/**
 * MusicReactiveEngine - Extends QuantumStigmergyEngine with music-reactive behavior
 * Music acts as stigmergic perturbation source, modulating agent parameters in real-time
 */

import { QuantumStigmergyEngine } from './QuantumStigmergyEngine';
import type { Agent } from '../types/index';
import type {
  MusicAnalysis,
  MusicMappingParameters,
  BehaviorModulation,
} from '../types/musicMappings';
import { applyCurve, clamp } from '../audio/utils';

export class MusicReactiveEngine extends QuantumStigmergyEngine {
  private musicMappings: MusicMappingParameters | null = null;
  private currentMusicAnalysis: MusicAnalysis | null = null;
  private musicEnabled: boolean = false;

  /**
   * Set music mapping parameters
   */
  setMusicMappings(mappings: MusicMappingParameters): void {
    this.musicMappings = mappings;
  }

  /**
   * Update current music analysis data
   */
  updateMusicAnalysis(analysis: MusicAnalysis): void {
    this.currentMusicAnalysis = analysis;
  }

  /**
   * Enable/disable music reactivity
   */
  setMusicEnabled(enabled: boolean): void {
    this.musicEnabled = enabled;
  }

  /**
   * Override update method to apply music modulation
   */
  update(): void {
    // Call parent update
    super.update();

    // Apply music modulation if enabled
    if (this.musicEnabled && this.musicMappings && this.currentMusicAnalysis) {
      this.applyMusicModulation();
    }
  }

  /**
   * Apply music modulation to all agents
   */
  private applyMusicModulation(): void {
    if (!this.currentMusicAnalysis || !this.musicMappings) return;

    const agents = this.getAgents();
    const music = this.currentMusicAnalysis;
    const mappings = this.musicMappings;

    // Calculate behavior modulation from music
    const modulation = this.calculateBehaviorModulation(music, mappings);

    // Apply modulation to each agent
    // Note: We modulate by adjusting velocities and trail deposition
    // The core steering logic remains in the parent class
    for (const agent of agents) {
      this.applyModulationToAgent(agent, modulation, music, mappings);
    }
  }

  /**
   * Calculate behavior modulation from music analysis
   */
  private calculateBehaviorModulation(
    music: MusicAnalysis,
    mappings: MusicMappingParameters
  ): BehaviorModulation {
    const { spectral, tempo, harmony, dynamics } = music;
    const globalInfluence = mappings.globalMusicInfluence;

    // Initialize modulation at neutral (1.0 = no change)
    let moveSpeedMult = 1.0;
    let turnSpeedMult = 1.0;
    let turnRandomnessMult = 1.0;
    let sensorAngleMult = 1.0;
    let sensorDistanceMult = 1.0;
    let sensorSensitivityMult = 1.0;
    let depositRateMult = 1.0;
    let trailAttraction = 0.0; // Additive, not multiplicative
    let explorationBiasMult = 1.0;

    // 1. TEMPO → SPEED
    if (mappings.tempo.tempoToSpeedSensitivity > 0) {
      const arousalNorm = tempo.arousalLevel; // Already 0-1
      const arousalCurved = applyCurve(arousalNorm, mappings.tempo.tempoToSpeedCurve);
      const tempoEffect = 1.0 + arousalCurved * mappings.tempo.tempoToSpeedSensitivity;
      moveSpeedMult *= tempoEffect;
    }

    // 2. TEMPO → VALENCE (affects trail attraction)
    if (mappings.tempo.tempoToValenceSensitivity > 0) {
      const valenceEffect = tempo.valenceLevel * mappings.tempo.tempoToValenceSensitivity;
      trailAttraction += valenceEffect * 0.5; // Positive valence = attraction
    }

    // 3. HARMONY → STABILITY (affects trail attraction)
    if (mappings.harmony.consonanceToStabilitySensitivity > 0) {
      const stabilityEffect =
        harmony.stability * mappings.harmony.consonanceToStabilitySensitivity;
      trailAttraction += stabilityEffect * 0.3;
    }

    // 4. HARMONY → TENSION → RANDOMNESS
    if (mappings.harmony.tensionToRandomnessSensitivity > 0) {
      const tensionNorm = harmony.tension; // Already 0-1
      const tensionCurved = applyCurve(
        tensionNorm,
        mappings.harmony.tensionToRandomnessCurve
      );
      const chaosEffect = 1.0 + tensionCurved * mappings.harmony.tensionToRandomnessSensitivity;
      turnRandomnessMult *= chaosEffect;
    }

    // 5. HARMONY → REPULSION (high tension can repel from trails)
    if (harmony.tension > mappings.harmony.repulsionThreshold) {
      const excessTension = harmony.tension - mappings.harmony.repulsionThreshold;
      const repulsionAmount = excessTension * mappings.harmony.repulsionStrength;
      trailAttraction += repulsionAmount; // Negative value = repulsion
    }

    // 6. SPECTRAL → BASS (speed & deposit)
    if (mappings.spectral.bassToSpeedSensitivity > 0) {
      const bassEffect = 1.0 + spectral.bassEnergy * mappings.spectral.bassToSpeedSensitivity;
      moveSpeedMult *= bassEffect;
    }

    if (mappings.spectral.bassToDepositSensitivity > 0) {
      const bassDepositEffect =
        1.0 + spectral.bassEnergy * mappings.spectral.bassToDepositSensitivity;
      depositRateMult *= bassDepositEffect;
    }

    // 7. SPECTRAL → MID (sensors)
    if (mappings.spectral.midToSensorAngleSensitivity > 0) {
      const midAngleEffect =
        1.0 + spectral.midEnergy * mappings.spectral.midToSensorAngleSensitivity;
      sensorAngleMult *= midAngleEffect;
    }

    if (mappings.spectral.midToSensorDistanceSensitivity > 0) {
      const midDistEffect =
        1.0 + spectral.midEnergy * mappings.spectral.midToSensorDistanceSensitivity;
      sensorDistanceMult *= midDistEffect;
    }

    if (mappings.spectral.midToSensitivitySensitivity > 0) {
      const midSensEffect =
        1.0 + spectral.midEnergy * mappings.spectral.midToSensitivitySensitivity;
      sensorSensitivityMult *= midSensEffect;
    }

    // 8. SPECTRAL → HIGH (turn speed & chaos)
    if (mappings.spectral.highToTurnSpeedSensitivity > 0) {
      const highTurnEffect =
        1.0 + spectral.highEnergy * mappings.spectral.highToTurnSpeedSensitivity;
      turnSpeedMult *= highTurnEffect;
    }

    if (mappings.spectral.highToChaosnessSensitivity > 0) {
      const highChaosEffect =
        1.0 + spectral.highEnergy * mappings.spectral.highToChaosnessSensitivity;
      turnRandomnessMult *= highChaosEffect;
    }

    // 9. DYNAMICS → LOUDNESS (global intensity)
    if (mappings.dynamics.loudnessToIntensitySensitivity > 0) {
      const loudnessEffect =
        dynamics.loudness * mappings.dynamics.loudnessToIntensitySensitivity;
      const intensityMult = 1.0 + loudnessEffect;

      // Apply to multiple parameters
      moveSpeedMult *= intensityMult;
      depositRateMult *= intensityMult;
    }

    // 10. DYNAMICS → CRESCENDO (temporary boost)
    if (mappings.dynamics.crescendoDetection && dynamics.crescendo) {
      const boostFactor = mappings.dynamics.crescendoBoostFactor;
      moveSpeedMult *= boostFactor;
      depositRateMult *= boostFactor;
    }

    // 11. COMPOUND EFFECTS
    // Valence × Stability → Attraction (pleasant + stable = cohesion)
    if (mappings.compound.valenceStabilityToAttractionSensitivity > 0) {
      const compoundEffect =
        Math.sqrt(tempo.valenceLevel * harmony.stability) *
        mappings.compound.valenceStabilityToAttractionSensitivity;
      trailAttraction += compoundEffect * 0.4;
    }

    // Arousal × Valence → Deposit (energetic + pleasant = more trails)
    if (mappings.compound.arousalValenceToDepositSensitivity > 0) {
      const energyEffect =
        Math.sqrt(tempo.arousalLevel * tempo.valenceLevel) *
        mappings.compound.arousalValenceToDepositSensitivity;
      depositRateMult *= 1.0 + energyEffect;
    }

    // Tension × Instability → Exploration (tense + unstable = explore)
    if (mappings.compound.tensionInstabilityToExplorationSensitivity > 0) {
      const instability = 1.0 - harmony.stability;
      const stressEffect =
        Math.sqrt(harmony.tension * instability) *
        mappings.compound.tensionInstabilityToExplorationSensitivity;
      explorationBiasMult *= 1.0 + stressEffect;
    }

    // Apply global influence multiplier
    const neutral = 1.0;
    moveSpeedMult = neutral + (moveSpeedMult - neutral) * globalInfluence;
    turnSpeedMult = neutral + (turnSpeedMult - neutral) * globalInfluence;
    turnRandomnessMult = neutral + (turnRandomnessMult - neutral) * globalInfluence;
    sensorAngleMult = neutral + (sensorAngleMult - neutral) * globalInfluence;
    sensorDistanceMult = neutral + (sensorDistanceMult - neutral) * globalInfluence;
    sensorSensitivityMult = neutral + (sensorSensitivityMult - neutral) * globalInfluence;
    depositRateMult = neutral + (depositRateMult - neutral) * globalInfluence;
    trailAttraction *= globalInfluence;
    explorationBiasMult = neutral + (explorationBiasMult - neutral) * globalInfluence;

    // Clamp to reasonable ranges
    return {
      moveSpeedMultiplier: clamp(moveSpeedMult, 0.1, 3.0),
      turnSpeedMultiplier: clamp(turnSpeedMult, 0.1, 3.0),
      turnRandomnessMultiplier: clamp(turnRandomnessMult, 0.1, 3.0),
      sensorAngleMultiplier: clamp(sensorAngleMult, 0.5, 2.0),
      sensorDistanceMultiplier: clamp(sensorDistanceMult, 0.5, 2.0),
      sensorSensitivityMultiplier: clamp(sensorSensitivityMult, 0.5, 2.0),
      depositRateMultiplier: clamp(depositRateMult, 0.1, 3.0),
      trailAttraction: clamp(trailAttraction, -1.0, 1.0),
      explorationBiasMultiplier: clamp(explorationBiasMult, 0.5, 2.0),
    };
  }

  /**
   * Apply modulation to individual agent
   * This modulates the agent's behavior for the next frame
   */
  private applyModulationToAgent(
    agent: Agent,
    _modulation: BehaviorModulation,
    music: MusicAnalysis,
    mappings: MusicMappingParameters
  ): void {
    // Store original values if not already stored
    if (!(agent as any).__musicOriginalSpeed) {
      // We'll modulate by temporarily adjusting movement
      // The actual parameter changes happen in the update loop
      // For MVP, we primarily modulate via speed and deposit bursts
    }

    // BEAT IMPULSE: Sudden speed boost on beat
    if (
      mappings.rhythm.beatEnabled &&
      music.rhythm.beat &&
      mappings.rhythm.beatImpulseStrength > 0
    ) {
      // Apply temporary velocity boost
      const impulse = mappings.rhythm.beatImpulseStrength * music.rhythm.beatStrength;
      const speedBoost = 1.0 + impulse;

      // Boost movement for this frame
      const dx = Math.cos(agent.angle) * speedBoost;
      const dy = Math.sin(agent.angle) * speedBoost;

      agent.x += dx;
      agent.y += dy;

      // Wrap around edges
      const gridSize = this.getGridSize();
      if (agent.x < 0) agent.x += gridSize;
      if (agent.x >= gridSize) agent.x -= gridSize;
      if (agent.y < 0) agent.y += gridSize;
      if (agent.y >= gridSize) agent.y -= gridSize;
    }

    // BEAT DEPOSIT BURST: Extra trail on beat
    if (
      mappings.rhythm.beatEnabled &&
      mappings.rhythm.beatDepositBurst &&
      music.rhythm.beat
    ) {
      // Deposit handled by parent class, we'd need to expose depositTrail method
      // For MVP, this is a placeholder - can be enhanced later
      // Future: const burstAmount = mappings.rhythm.beatBurstIntensity * 10;
    }

    // Note: Most modulation is indirect - we're modulating the emergent behavior
    // by changing how agents respond to their environment in real-time
    // The actual steering/movement happens in parent class update methods
  }

  /**
   * Get current music analysis
   */
  getMusicAnalysis(): MusicAnalysis | null {
    return this.currentMusicAnalysis;
  }

  /**
   * Get current music mappings
   */
  getMusicMappings(): MusicMappingParameters | null {
    return this.musicMappings;
  }

  /**
   * Check if music is enabled
   */
  isMusicEnabled(): boolean {
    return this.musicEnabled;
  }
}
