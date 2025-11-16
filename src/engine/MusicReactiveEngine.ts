/**
 * MusicReactiveEngine - Extends QuantumStigmergyEngine with music-reactive behavior
 * Music acts as stigmergic perturbation source, modulating agent parameters in real-time
 */

import { QuantumStigmergyEngine } from './QuantumStigmergyEngine';
import type { Agent, AllParameters } from '../types/index';
import { resolveSpeciesParams } from '../store/useSimulationStore';
import type {
  MusicAnalysis,
  MusicMappingParameters,
  BehaviorModulation,
} from '../types/musicMappings';
import { applyCurve, clamp } from '../audio/utils';

// Import from unified AudioOikosModulator
import {
  BeatPulseModulator,
  InterferenceModulator,
  MultiScaleModulator,
} from '../audio/AudioOikosModulator';

export class MusicReactiveEngine extends QuantumStigmergyEngine {
  // Species-specific music mappings (resolved from AllParameters)
  private musicMappingsRed: MusicMappingParameters | null = null;
  private musicMappingsGreen: MusicMappingParameters | null = null;
  private musicMappingsBlue: MusicMappingParameters | null = null;

  private currentMusicAnalysis: MusicAnalysis | null = null;
  private musicEnabled: boolean = false;

  // Enhanced modulators (optional, can be enabled/disabled)
  private beatPulseModulator: BeatPulseModulator;
  private interferenceModulator: InterferenceModulator;
  private multiScaleModulator: MultiScaleModulator;

  // Modulator enable flags
  private useBeatPulse: boolean = false;
  private useInterference: boolean = false;
  private useMultiScale: boolean = false;

  constructor(gridSize?: number) {
    super(gridSize);

    // Initialize modulators (disabled by default)
    // New AudioOikosModulator interface: separate parameters
    this.beatPulseModulator = new BeatPulseModulator(
      0.95,  // beatDecay
      5.0    // amplification
    );

    this.interferenceModulator = new InterferenceModulator(
      1.0,  // consonanceWeight
      1.0   // dissonanceWeight
    );

    this.multiScaleModulator = new MultiScaleModulator(60); // fps
  }

  /**
   * Override setParameters to extract species-specific audio mappings
   */
  public setParameters(params: AllParameters): void {
    // Call parent
    super.setParameters(params);

    // Extract species-specific audio mappings
    this.musicMappingsRed = resolveSpeciesParams(params, 'red').audio;
    this.musicMappingsGreen = resolveSpeciesParams(params, 'green').audio;
    this.musicMappingsBlue = resolveSpeciesParams(params, 'blue').audio;
  }

  /**
   * Update current music analysis data
   */
  updateMusicAnalysis(analysis: MusicAnalysis): void {
    this.currentMusicAnalysis = analysis;

    // Debug logging (first 100 frames only)
    if (this.musicEnabled && Math.random() < 0.01) {
      console.log('[Music Reactive] Analysis:', {
        beat: analysis.rhythm.beat,
        beatStrength: analysis.rhythm.beatStrength,
        bassEnergy: analysis.spectral.bassEnergy,
        loudness: analysis.dynamics.loudness,
        modulatorsEnabled: {
          beatPulse: this.useBeatPulse,
          interference: this.useInterference,
          multiScale: this.useMultiScale,
        },
      });
    }

    // Update enhanced modulators if enabled
    if (this.useBeatPulse && analysis.rhythm.beat) {
      this.beatPulseModulator.onBeatDetected(
        analysis.rhythm.beatStrength,
        analysis.timestamp * 1000 // Convert to ms
      );
      console.log('[Music Reactive] BEAT DETECTED! Strength:', analysis.rhythm.beatStrength);
    }

    if (this.useBeatPulse) {
      // Update beat pulse decay (assuming 60fps, ~16.67ms per frame)
      // New interface: only deltaTime parameter
      this.beatPulseModulator.update(1 / 60);
    }

    if (this.useMultiScale) {
      // MultiScaleModulator.update expects micro/meso/macro features
      this.multiScaleModulator.update(
        analysis.spectral.zcr,                // micro (zero crossing rate)
        analysis.rhythm.beatStrength,         // meso
        analysis.spectral.centroid            // macro
      );
    }
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

    // Apply music modulation if enabled (species-specific)
    if (this.musicEnabled && this.currentMusicAnalysis) {
      this.applyMusicModulation();
    }
  }

  /**
   * Apply music modulation to all agents (species-specific)
   */
  private applyMusicModulation(): void {
    if (!this.currentMusicAnalysis) return;
    if (!this.musicMappingsRed || !this.musicMappingsGreen || !this.musicMappingsBlue) return;

    const agents = this.getAgents();
    const music = this.currentMusicAnalysis;

    // Debug logging for first agent (occasional)
    let debugLogged = false;

    // Apply modulation to each agent with species-specific mappings
    // Note: We modulate by adjusting velocities and trail deposition
    // The core steering logic remains in the parent class
    for (const agent of agents) {
      // Get species-specific mappings
      let mappings: MusicMappingParameters;
      switch (agent.type) {
        case 'red':
          mappings = this.musicMappingsRed;
          break;
        case 'green':
          mappings = this.musicMappingsGreen;
          break;
        case 'blue':
          mappings = this.musicMappingsBlue;
          break;
        default:
          continue; // Skip unknown types
      }

      // Calculate behavior modulation from music for this species
      const modulation = this.calculateBehaviorModulation(music, mappings);

      // Debug log modulation values occasionally
      if (!debugLogged && Math.random() < 0.001) {
        console.log('[Music Reactive] Modulation:', {
          speedMult: modulation.moveSpeedMultiplier,
          depositMult: modulation.depositRateMultiplier,
          turnRandomness: modulation.turnRandomnessMultiplier,
          globalInfluence: mappings.globalMusicInfluence,
        });
        debugLogged = true;
      }

      // Apply modulation to agent
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

    // 12. ENHANCED MODULATORS (optional, dramatic effects)

    // Beat Pulse: Explosive modulation on beats with decay
    if (this.useBeatPulse) {
      const beatImpulse = this.beatPulseModulator.getImpulse();
      if (beatImpulse > 0) {
        // Deposit rate spike on beat (1x → 6x with amplification=5.0)
        depositRateMult *= this.beatPulseModulator.modulate(1.0);

        // Speed boost on beat (reduced amplification for speed)
        moveSpeedMult *= (1.0 + beatImpulse * 1.0); // 1x → 2x boost
      }
    }

    // Interference: Consonance/Dissonance modulation
    if (this.useInterference) {
      // Construct MusicalMode from MusicAnalysis
      const mode = {
        energy: music.dynamics.loudness,
        brightness: music.spectral.centroid,
        complexity: music.spectral.flatness,
        rhythm: music.rhythm.beatStrength,
      };
      const interference = this.interferenceModulator.calculateResonance(mode);

      // High consonance → strong synchronization (long trails, low noise)
      if (interference.constructive > 0.5) {
        // Slower decay for stable patterns (not directly modulated here, but documented)
        // Lower turn randomness for smoother movements
        turnRandomnessMult *= 0.7;
      }

      // High dissonance → chaos and turbulence
      if (interference.destructive > 0.5) {
        // Increase turn randomness (jittery movements)
        turnRandomnessMult *= (1.0 + interference.destructive * 0.5);

        // Increase turn speed (nervous behavior)
        turnSpeedMult *= (1.0 + interference.destructive * 0.3);
      }
    }

    // Multi-Scale: Micro/Meso/Macro temporal modulation
    if (this.useMultiScale) {
      // Update was already called in updateMusicAnalysis, call again to get current values
      const scales = this.multiScaleModulator.update(
        music.spectral.zcr,
        music.rhythm.beatStrength,
        music.spectral.centroid
      );

      // Micro: Subtle turn jitter from high-frequency texture
      turnRandomnessMult *= (1.0 + scales.micro * 0.3);

      // Meso: Rhythmic deposit pulse (already handled by beat pulse, skip if overlap)
      if (!this.useBeatPulse) {
        depositRateMult *= (1.0 + scales.meso * 2.0);
      }

      // Macro: Structural speed shifts (overall energy)
      moveSpeedMult *= (0.8 + scales.macro * 0.4);
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
   * Music creates SHORT-LIVED IMPULSES that decay, not permanent position changes
   */
  private applyModulationToAgent(
    agent: Agent,
    modulation: BehaviorModulation,
    music: MusicAnalysis,
    mappings: MusicMappingParameters
  ): void {
    // Initialize music-reactive state if needed
    if ((agent as any).__musicVelocityBoost === undefined) {
      (agent as any).__musicVelocityBoost = 0;
      (agent as any).__musicAttractionPulse = 0;
      (agent as any).__musicRepulsionPulse = 0;
    }

    // DECAY existing impulses (exponential decay)
    const decayRate = 0.85; // Faster decay for snappy response
    (agent as any).__musicVelocityBoost *= decayRate;
    (agent as any).__musicAttractionPulse *= decayRate;
    (agent as any).__musicRepulsionPulse *= decayRate;

    // BEAT IMPULSE: Create short velocity burst on beat
    if (
      mappings.rhythm.beatEnabled &&
      music.rhythm.beat &&
      mappings.rhythm.beatImpulseStrength > 0
    ) {
      const impulseStrength = mappings.rhythm.beatImpulseStrength * music.rhythm.beatStrength;

      // Add to velocity boost (doesn't move position, just increases next movement)
      (agent as any).__musicVelocityBoost += impulseStrength * 3.0;

      // BEAT → ATTRACTION/REPULSION PULSE (makes trails pulse like veins!)
      // High energy beats = stronger attraction pulse
      const energyLevel = (music.spectral.bassEnergy + music.dynamics.loudness) / 2;

      if (energyLevel > 0.5) {
        // High energy = attraction pulse (agents drawn together, trails thicken)
        (agent as any).__musicAttractionPulse += energyLevel * 2.0;
      } else {
        // Low energy = subtle repulsion (trails spread slightly)
        (agent as any).__musicRepulsionPulse += (1.0 - energyLevel) * 0.5;
      }
    }

    // BASS ENERGY: Direct velocity push (continuous while bass is present)
    if (music.spectral.bassEnergy > 0.4) {
      const bassPush = (music.spectral.bassEnergy - 0.4) * 2.0; // Threshold at 0.4
      (agent as any).__musicVelocityBoost += bassPush;
    }

    // APPLY VELOCITY BOOST (temporary speed increase)
    const currentBoost = (agent as any).__musicVelocityBoost;
    if (currentBoost > 0.01) {
      const dx = Math.cos(agent.angle) * currentBoost;
      const dy = Math.sin(agent.angle) * currentBoost;

      agent.x += dx;
      agent.y += dy;

      // Wrap around edges
      const gridSize = this.getGridSize();
      if (agent.x < 0) agent.x += gridSize;
      if (agent.x >= gridSize) agent.x -= gridSize;
      if (agent.y < 0) agent.y += gridSize;
      if (agent.y >= gridSize) agent.y -= gridSize;
    }

    // CONTINUOUS MODULATION (affects base behavior)

    // Apply turn randomness (jitter from high frequencies)
    if (modulation.turnRandomnessMultiplier !== 1.0) {
      const randomness = (modulation.turnRandomnessMultiplier - 1.0) * 0.3;
      agent.angle += (Math.random() - 0.5) * randomness;
    }

    // Apply speed modulation from tempo/arousal (subtle continuous adjustment)
    if (modulation.moveSpeedMultiplier !== 1.0) {
      const speedAdjust = (modulation.moveSpeedMultiplier - 1.0) * 0.5;
      const dx = Math.cos(agent.angle) * speedAdjust;
      const dy = Math.sin(agent.angle) * speedAdjust;

      agent.x += dx;
      agent.y += dy;

      const gridSize = this.getGridSize();
      if (agent.x < 0) agent.x += gridSize;
      if (agent.x >= gridSize) agent.x -= gridSize;
      if (agent.y < 0) agent.y += gridSize;
      if (agent.y >= gridSize) agent.y -= gridSize;
    }

    // Store ALL modulation values for parent class (including pulses!)
    (agent as any).__musicSpeedMult = modulation.moveSpeedMultiplier + currentBoost;
    (agent as any).__musicDepositMult = modulation.depositRateMultiplier;
    (agent as any).__musicTurnMult = modulation.turnSpeedMultiplier;

    // Store attraction/repulsion pulses for parent to use in trail-following
    (agent as any).__musicAttractionMult = 1.0 + (agent as any).__musicAttractionPulse;
    (agent as any).__musicRepulsionMult = 1.0 + (agent as any).__musicRepulsionPulse;
  }

  /**
   * Get current music analysis
   */
  getMusicAnalysis(): MusicAnalysis | null {
    return this.currentMusicAnalysis;
  }

  /**
   * Get current music mappings (returns red species mappings as default)
   */
  getMusicMappings(): MusicMappingParameters | null {
    return this.musicMappingsRed;
  }

  /**
   * Check if music is enabled
   */
  isMusicEnabled(): boolean {
    return this.musicEnabled;
  }

  // Enhanced Modulator Controls

  /**
   * Enable/disable beat pulse modulation
   */
  setBeatPulseEnabled(enabled: boolean): void {
    this.useBeatPulse = enabled;
    // Note: BeatPulseModulator impulse will naturally decay to 0
  }

  /**
   * Enable/disable interference modulation
   */
  setInterferenceEnabled(enabled: boolean): void {
    this.useInterference = enabled;
  }

  /**
   * Enable/disable multi-scale modulation
   */
  setMultiScaleEnabled(enabled: boolean): void {
    this.useMultiScale = enabled;
    if (!enabled) {
      this.multiScaleModulator.reset();
    }
  }

  /**
   * Get beat pulse modulator (for UI/debugging)
   */
  getBeatPulseModulator(): BeatPulseModulator {
    return this.beatPulseModulator;
  }

  /**
   * Get interference modulator (for UI/debugging)
   */
  getInterferenceModulator(): InterferenceModulator {
    return this.interferenceModulator;
  }

  /**
   * Get multi-scale modulator (for UI/debugging)
   */
  getMultiScaleModulator(): MultiScaleModulator {
    return this.multiScaleModulator;
  }

  /**
   * Check enhanced modulator states
   */
  getModulatorStates(): {
    beatPulse: boolean;
    interference: boolean;
    multiScale: boolean;
  } {
    return {
      beatPulse: this.useBeatPulse,
      interference: this.useInterference,
      multiScale: this.useMultiScale,
    };
  }
}
