/**
 * AudioOikosPanel - Music-reactive visualization controls
 * Refactored with reusable UI components for better maintainability
 */

import { useRef, memo, type ChangeEvent } from 'react';
import { useAudioStore } from '../store/useAudioStore';
import { useSimulationStore, resolveSpeciesParams } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';
import { AUDIO_MAPPING_PRESETS } from '../audio/presets';
import { colors, spacing, effects, createHeaderStyle, createSubtitleStyle } from '../design-system';
import { Section, Subsection } from './ui/Section';
import { ToggleSection } from './ui/ToggleSection';
import { CurveSelector } from './ui/CurveSelector';
import { PresetGrid, type Preset } from './ui/PresetGrid';
import { Divider } from './ui/Divider';

export const AudioOikosPanel = memo(function AudioOikosPanel() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Audio playback controls from AudioStore
  const {
    inputMode,
    isPlaying,
    loop,
    audioFileName,
    currentAnalysis,
    musicEnabled,
    adaptiveNormalizationEnabled,
    adaptiveNormalizerConfig,
    loadAudioFile,
    startMicrophone,
    togglePlay,
    stop,
    setLoop,
    toggleMusic,
    toggleAdaptiveNormalization,
    configureAdaptiveNormalizer,
  } = useAudioStore();

  // Audio mappings from SimulationStore (species-aware)
  const ui = useSimulationStore((state) => state.ui);
  const parameters = useSimulationStore((state) => state.parameters);
  const updateAudioParams = useSimulationStore((state) => state.updateAudioParams);

  // Get current mappings based on active species scope
  const mappings = ui.activeSpeciesScope === 'universal'
    ? parameters.universal.audio
    : resolveSpeciesParams(parameters, ui.activeSpeciesScope as 'red' | 'green' | 'blue').audio;

  // Handle file selection
  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await loadAudioFile(file);
      } catch {
        alert('Failed to load audio file. Please try a different file.');
      }
    }
  };

  // Handle microphone start
  const handleMicrophoneStart = async () => {
    try {
      await startMicrophone();
    } catch {
      alert('Microphone access denied or not available.');
    }
  };

  // Convert AUDIO_MAPPING_PRESETS to PresetGrid format
  const audioPresets: Preset<typeof mappings>[] = Object.entries(AUDIO_MAPPING_PRESETS).map(([, preset]) => ({
    name: preset.name,
    icon: preset.icon,
    description: preset.description,
    params: preset.params,
  }));

  // Render analysis display
  const renderAnalysis = () => {
    if (!currentAnalysis || !musicEnabled) {
      return (
        <div style={styles.analysisPlaceholder}>
          {musicEnabled ? 'Play audio to see analysis...' : 'Enable music reactivity to see analysis'}
        </div>
      );
    }

    const { spectral, tempo, harmony, rhythm } = currentAnalysis;

    return (
      <>
        <div style={styles.analysisRow}>
          <div style={styles.analysisLabel}>
            BPM: <strong>{Math.round(tempo.bpm)}</strong>
          </div>
          <div style={styles.analysisLabel}>
            Arousal: <strong>{tempo.arousalLevel.toFixed(2)}</strong>
          </div>
          <div style={styles.analysisLabel}>
            Valence: <strong>{tempo.valenceLevel.toFixed(2)}</strong>
          </div>
          <div style={styles.analysisLabel}>
            Tension: <strong>{harmony.tension.toFixed(2)}</strong>
          </div>
        </div>

        <div style={styles.frequencyBars}>
          <div style={styles.barContainer}>
            <div style={styles.barLabel}>Bass</div>
            <div style={styles.barTrack}>
              <div
                style={{
                  ...styles.barFill,
                  width: `${spectral.bassEnergy * 100}%`,
                  backgroundColor: '#ff6b6b',
                }}
              />
            </div>
          </div>

          <div style={styles.barContainer}>
            <div style={styles.barLabel}>Mid</div>
            <div style={styles.barTrack}>
              <div
                style={{
                  ...styles.barFill,
                  width: `${spectral.midEnergy * 100}%`,
                  backgroundColor: '#4ecdc4',
                }}
              />
            </div>
          </div>

          <div style={styles.barContainer}>
            <div style={styles.barLabel}>High</div>
            <div style={styles.barTrack}>
              <div
                style={{
                  ...styles.barFill,
                  width: `${spectral.highEnergy * 100}%`,
                  backgroundColor: '#95e1d3',
                }}
              />
            </div>
          </div>
        </div>

        {rhythm.beat && (
          <div style={styles.beatIndicator}>
            <span style={styles.beatPulse}>●</span> BEAT
          </div>
        )}
      </>
    );
  };

  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>Audio</h3>
      <p style={styles.subtitle}>Music-reactive visualization controls</p>

      {/* Audio Source Section */}
      <Section title="Audio Source">
        <div style={styles.sourceButtons}>
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              ...styles.sourceButton,
              ...(inputMode === 'file' ? styles.sourceButtonActive : {}),
            }}
          >
            Load File
          </button>

          <button
            onClick={handleMicrophoneStart}
            style={{
              ...styles.sourceButton,
              ...(inputMode === 'microphone' ? styles.sourceButtonActive : {}),
            }}
          >
            Microphone
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        {audioFileName && <div style={styles.fileName}>{audioFileName}</div>}

        {/* Playback Controls (File mode only) */}
        {inputMode === 'file' && (
          <div style={styles.playbackControls}>
            <button
              onClick={togglePlay}
              style={styles.controlButton}
              disabled={!audioFileName}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>

            <button
              onClick={stop}
              style={styles.controlButton}
              disabled={!audioFileName}
              aria-label="Stop"
            >
              ⏹
            </button>

            <button
              onClick={() => setLoop(!loop)}
              style={{
                ...styles.loopButton,
                ...(loop ? styles.loopButtonActive : {}),
              }}
              disabled={!audioFileName}
              aria-pressed={loop}
            >
              🔁 {loop ? 'Loop: ON' : 'Loop: OFF'}
            </button>
          </div>
        )}
      </Section>

      <Divider />

      {/* Music Reactivity Toggle */}
      <ToggleSection
        title="Music Reactivity"
        enabled={musicEnabled}
        onToggle={toggleMusic}
        description={
          musicEnabled
            ? 'Music is modulating agent behavior in real-time'
            : 'Enable to let music control the simulation'
        }
      />

      <Divider />

      {/* Auto-Harmonizer (Adaptive Normalization) */}
      {musicEnabled && (
        <>
          <ToggleSection
            title="Auto-Harmonizer"
            enabled={adaptiveNormalizationEnabled}
            onToggle={toggleAdaptiveNormalization}
            description={
              adaptiveNormalizationEnabled
                ? 'Learning musical range to maximize contrast (0-1 normalization)'
                : 'Enable adaptive normalization for stronger visual response'
            }
            hint="Auto-Harmonizer learns your music's actual range (e.g., 1500-3000 Hz instead of 0-8000 Hz) and normalizes features to maximize visual contrast. Especially effective for quiet or narrow-range music!"
          >
            {/* Advanced Configuration (only when enabled) */}
            {adaptiveNormalizationEnabled && (
              <div style={styles.advancedConfig}>
                <h5 style={styles.advancedTitle}>Advanced Configuration</h5>

                <ParameterSlider
                  label="Window Size (seconds)"
                  value={adaptiveNormalizerConfig.windowSize! / 60}
                  min={3}
                  max={30}
                  step={1}
                  onChange={(value) => configureAdaptiveNormalizer({ windowSize: value * 60 })}
                  description="How much history to learn from (larger = slower adaptation)"
                />

                <ParameterSlider
                  label="Smoothing Factor"
                  value={adaptiveNormalizerConfig.smoothingFactor! * 100}
                  min={0.1}
                  max={10}
                  step={0.1}
                  onChange={(value) => configureAdaptiveNormalizer({ smoothingFactor: value / 100 })}
                  description="How quickly to adapt to changes (higher = faster response)"
                />

                <ParameterSlider
                  label="Exaggeration"
                  value={adaptiveNormalizerConfig.exaggeration!}
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  onChange={(value) => configureAdaptiveNormalizer({ exaggeration: value })}
                  description="Dramatic effect (>1 = amplify extremes, <1 = compress)"
                />

                <p style={styles.advancedHint}>
                  These settings control how the Auto-Harmonizer learns and adapts to your music.
                  Default values work well for most music, but feel free to experiment!
                </p>
              </div>
            )}
          </ToggleSection>

          <Divider />
        </>
      )}

      {/* Dynamic Role Mapping */}
      {musicEnabled && (
        <>
          <ToggleSection
            title="Dynamic Role Mapping"
            enabled={mappings.roleMapping.enabled}
            onToggle={() => {
              const newEnabled = !mappings.roleMapping.enabled;
              updateAudioParams({
                roleMapping: { ...mappings.roleMapping, enabled: newEnabled }
              });
            }}
            description={
              mappings.roleMapping.enabled
                ? 'Agents dynamically assume functional roles based on audio features'
                : 'Enable to let agents switch roles (builder, harvester, consumer, decomposer, scout)'
            }
            hint="Role Mapping assigns ecosystem roles to agents based on real-time audio: Builder (bass) • Harvester (mid) • Consumer (arousal) • Decomposer (dissonance) • Scout (treble)"
          >
            {/* Role Mapping Configuration (only when enabled) */}
            {mappings.roleMapping.enabled && (
              <div style={styles.advancedConfig}>
                <h5 style={styles.advancedTitle}>Role Assignment Thresholds</h5>

                <ParameterSlider
                  label="Min Role Duration (frames)"
                  value={mappings.roleMapping.minRoleDuration}
                  min={10}
                  max={120}
                  step={5}
                  onChange={(value) => updateAudioParams({
                    roleMapping: { ...mappings.roleMapping, minRoleDuration: value }
                  })}
                  description="Minimum frames before role can change (prevents rapid switching)"
                />

                <div style={styles.roleThresholdGroup}>
                  <h6 style={styles.roleThresholdTitle}>Builder (Bass Energy)</h6>
                  <ParameterSlider
                    label="Threshold"
                    value={mappings.roleMapping.builderThreshold.bassEnergy}
                    min={0.3}
                    max={0.9}
                    step={0.05}
                    onChange={(value) => updateAudioParams({
                      roleMapping: {
                        ...mappings.roleMapping,
                        builderThreshold: { ...mappings.roleMapping.builderThreshold, bassEnergy: value }
                      }
                    })}
                    description="Bass energy level to trigger builder role"
                  />
                </div>

                <div style={styles.roleThresholdGroup}>
                  <h6 style={styles.roleThresholdTitle}>Harvester (Mid Energy)</h6>
                  <ParameterSlider
                    label="Threshold"
                    value={mappings.roleMapping.harvesterThreshold.midEnergy}
                    min={0.3}
                    max={0.9}
                    step={0.05}
                    onChange={(value) => updateAudioParams({
                      roleMapping: {
                        ...mappings.roleMapping,
                        harvesterThreshold: { ...mappings.roleMapping.harvesterThreshold, midEnergy: value }
                      }
                    })}
                    description="Mid energy level to trigger harvester role"
                  />
                </div>

                <div style={styles.roleThresholdGroup}>
                  <h6 style={styles.roleThresholdTitle}>Consumer (Arousal Level)</h6>
                  <ParameterSlider
                    label="Threshold"
                    value={mappings.roleMapping.consumerThreshold.arousalLevel}
                    min={0.4}
                    max={0.9}
                    step={0.05}
                    onChange={(value) => updateAudioParams({
                      roleMapping: {
                        ...mappings.roleMapping,
                        consumerThreshold: { ...mappings.roleMapping.consumerThreshold, arousalLevel: value }
                      }
                    })}
                    description="Arousal level (tempo) to trigger consumer role"
                  />
                </div>

                <div style={styles.roleThresholdGroup}>
                  <h6 style={styles.roleThresholdTitle}>Decomposer (Dissonance)</h6>
                  <ParameterSlider
                    label="Threshold"
                    value={mappings.roleMapping.decomposerThreshold.dissonance}
                    min={0.4}
                    max={0.9}
                    step={0.05}
                    onChange={(value) => updateAudioParams({
                      roleMapping: {
                        ...mappings.roleMapping,
                        decomposerThreshold: { ...mappings.roleMapping.decomposerThreshold, dissonance: value }
                      }
                    })}
                    description="Dissonance level to trigger decomposer role"
                  />
                </div>

                <div style={styles.roleThresholdGroup}>
                  <h6 style={styles.roleThresholdTitle}>Scout (High Energy)</h6>
                  <ParameterSlider
                    label="Threshold"
                    value={mappings.roleMapping.scoutThreshold.highEnergy}
                    min={0.4}
                    max={0.9}
                    step={0.05}
                    onChange={(value) => updateAudioParams({
                      roleMapping: {
                        ...mappings.roleMapping,
                        scoutThreshold: { ...mappings.roleMapping.scoutThreshold, highEnergy: value }
                      }
                    })}
                    description="Treble energy level to trigger scout role"
                  />
                </div>

                <p style={styles.advancedHint}>
                  Lower thresholds = more agents in role. Higher = only strongest signals trigger role.
                  Each role has unique behavior: speed, deposit rate, sensor range modifications.
                </p>
              </div>
            )}
          </ToggleSection>

          <Divider />
        </>
      )}

      {/* Live Analysis */}
      {musicEnabled && (
        <>
          <Section title="Live Analysis">
            {renderAnalysis()}
          </Section>

          <Divider />
        </>
      )}

      {/* Presets */}
      <PresetGrid
        presets={audioPresets}
        onSelect={updateAudioParams}
        title="Presets"
      />

      <Divider />

      {/* Key Mapping Controls */}
      {musicEnabled && (
        <Section title="Key Mappings">
          {/* Global */}
          <Subsection title="Global">
            <ParameterSlider
              label="Master Influence"
              value={mappings.globalMusicInfluence}
              min={0}
              max={2}
              step={0.1}
              onChange={(value) => updateAudioParams({ globalMusicInfluence: value })}
              description="Global multiplier for all audio effects"
            />
          </Subsection>

          {/* Tempo */}
          <Subsection title="Tempo → Movement">
            <ParameterSlider
              label="Tempo → Speed"
              value={mappings.tempo.tempoToSpeedSensitivity}
              min={0}
              max={2}
              step={0.1}
              onChange={(value) =>
                updateAudioParams({ tempo: { ...mappings.tempo, tempoToSpeedSensitivity: value } })
              }
              description="How strongly BPM affects agent speed"
            />

            <CurveSelector
              value={mappings.tempo.tempoToSpeedCurve}
              onChange={(curve) =>
                updateAudioParams({ tempo: { ...mappings.tempo, tempoToSpeedCurve: curve } })
              }
            />
          </Subsection>

          {/* Spectral - Bass */}
          <Subsection title="Bass Impact">
            <ParameterSlider
              label="Bass → Speed"
              value={mappings.spectral.bassToSpeedSensitivity}
              min={0}
              max={2}
              step={0.1}
              onChange={(value) =>
                updateAudioParams({ spectral: { ...mappings.spectral, bassToSpeedSensitivity: value } })
              }
              description="Deep frequencies increase movement speed"
            />

            <ParameterSlider
              label="Bass → Deposit"
              value={mappings.spectral.bassToDepositSensitivity}
              min={0}
              max={2}
              step={0.1}
              onChange={(value) =>
                updateAudioParams({ spectral: { ...mappings.spectral, bassToDepositSensitivity: value } })
              }
              description="Bass increases trail deposition"
            />
          </Subsection>

          {/* Harmony */}
          <Subsection title="Harmony → Behavior">
            <ParameterSlider
              label="Tension → Randomness"
              value={mappings.harmony.tensionToRandomnessSensitivity}
              min={0}
              max={2}
              step={0.1}
              onChange={(value) =>
                updateAudioParams({ harmony: { ...mappings.harmony, tensionToRandomnessSensitivity: value } })
              }
              description="Dissonance increases erratic movement"
            />

            <CurveSelector
              value={mappings.harmony.tensionToRandomnessCurve}
              onChange={(curve) =>
                updateAudioParams({ harmony: { ...mappings.harmony, tensionToRandomnessCurve: curve } })
              }
            />
          </Subsection>

          {/* Rhythm */}
          <Subsection title="Rhythm → Impulses">
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={mappings.rhythm.beatEnabled}
                onChange={(e) =>
                  updateAudioParams({ rhythm: { ...mappings.rhythm, beatEnabled: e.target.checked } })
                }
                style={styles.checkbox}
              />
              <span>Enable Beat Detection</span>
            </label>

            {mappings.rhythm.beatEnabled && (
              <ParameterSlider
                label="Beat Impulse Strength"
                value={mappings.rhythm.beatImpulseStrength}
                min={0}
                max={3}
                step={0.1}
                onChange={(value) =>
                  updateAudioParams({ rhythm: { ...mappings.rhythm, beatImpulseStrength: value } })
                }
                description="Speed boost on detected beats"
              />
            )}
          </Subsection>
        </Section>
      )}
    </div>
  );
});

const styles = {
  panel: {
    padding: spacing.lg,
    backgroundColor: colors.bg.secondary,
    borderRadius: effects.borderRadius.md,
    border: `1px solid ${colors.border.primary}`,
    maxHeight: '80vh',
    overflowY: 'auto' as const,
  } as React.CSSProperties,

  title: {
    ...createHeaderStyle('h2'),
    marginBottom: spacing.xs,
  } as React.CSSProperties,

  subtitle: {
    ...createSubtitleStyle(),
    marginBottom: spacing.lg,
    lineHeight: 1.4,
  } as React.CSSProperties,

  // Audio Source
  sourceButtons: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: spacing.sm,
    marginBottom: spacing.md,
  } as React.CSSProperties,

  sourceButton: {
    padding: '10px',
    backgroundColor: colors.bg.subtle,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: effects.borderRadius.md,
    color: colors.text.primary,
    fontSize: '12px',
    cursor: 'pointer',
    transition: effects.transition.normal,
  } as React.CSSProperties,

  sourceButtonActive: {
    backgroundColor: colors.accent.primary,
    borderColor: colors.accent.light,
  } as React.CSSProperties,

  fileName: {
    fontSize: '11px',
    color: colors.text.secondary,
    padding: spacing.sm,
    backgroundColor: colors.bg.subtle,
    borderRadius: effects.borderRadius.sm,
    marginBottom: spacing.md,
  } as React.CSSProperties,

  playbackControls: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
  } as React.CSSProperties,

  controlButton: {
    padding: `${spacing.sm} ${spacing.lg}`,
    backgroundColor: colors.bg.subtle,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: effects.borderRadius.sm,
    color: colors.text.primary,
    fontSize: '14px',
    cursor: 'pointer',
    transition: effects.transition.normal,
  } as React.CSSProperties,

  loopButton: {
    padding: `${spacing.sm} ${spacing.lg}`,
    backgroundColor: colors.bg.subtle,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: effects.borderRadius.sm,
    color: colors.text.secondary,
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: effects.transition.normal,
    marginLeft: 'auto',
  } as React.CSSProperties,

  loopButtonActive: {
    backgroundColor: '#7d5dbd22',
    borderColor: colors.accent.primary,
    color: colors.accent.primary,
  } as React.CSSProperties,

  // Advanced Auto-Harmonizer Config
  advancedConfig: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.bg.subtle,
    borderRadius: effects.borderRadius.md,
    border: `1px solid ${colors.border.primary}`,
  } as React.CSSProperties,

  advancedTitle: {
    fontSize: '12px',
    color: colors.text.secondary,
    marginBottom: spacing.sm,
    fontWeight: 600,
    margin: `0 0 ${spacing.sm} 0`,
  } as React.CSSProperties,

  advancedHint: {
    fontSize: '9px',
    color: colors.text.muted,
    lineHeight: 1.4,
    marginTop: spacing.sm,
    fontStyle: 'italic' as const,
  } as React.CSSProperties,

  // Role Threshold Groups
  roleThresholdGroup: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
    paddingTop: spacing.sm,
    borderTop: `1px solid ${colors.border.primary}`,
  } as React.CSSProperties,

  roleThresholdTitle: {
    fontSize: '11px',
    color: colors.text.primary,
    marginBottom: spacing.sm,
    fontWeight: 600,
    margin: `0 0 ${spacing.sm} 0`,
  } as React.CSSProperties,

  // Live Analysis
  analysisRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: spacing.sm,
    marginBottom: spacing.md,
  } as React.CSSProperties,

  analysisLabel: {
    fontSize: '10px',
    color: colors.text.secondary,
    textAlign: 'center' as const,
  } as React.CSSProperties,

  frequencyBars: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: spacing.sm,
    marginBottom: spacing.md,
  } as React.CSSProperties,

  barContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
  } as React.CSSProperties,

  barLabel: {
    fontSize: '10px',
    color: colors.text.secondary,
    width: '40px',
  } as React.CSSProperties,

  barTrack: {
    flex: 1,
    height: '12px',
    backgroundColor: colors.bg.subtle,
    borderRadius: effects.borderRadius.md,
    overflow: 'hidden',
  } as React.CSSProperties,

  barFill: {
    height: '100%',
    transition: 'width 0.1s ease',
  } as React.CSSProperties,

  beatIndicator: {
    fontSize: '11px',
    color: '#4ecdc4',
    fontWeight: 600,
    textAlign: 'center' as const,
    padding: '6px',
    backgroundColor: colors.bg.subtle,
    borderRadius: effects.borderRadius.sm,
  } as React.CSSProperties,

  beatPulse: {
    fontSize: '16px',
    animation: 'pulse 0.3s ease-in-out',
  } as React.CSSProperties,

  analysisPlaceholder: {
    fontSize: '11px',
    color: colors.text.tertiary,
    fontStyle: 'italic' as const,
    textAlign: 'center' as const,
    padding: spacing.lg,
  } as React.CSSProperties,

  // Checkbox
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    fontSize: '12px',
    color: colors.text.primary,
    marginBottom: spacing.md,
    cursor: 'pointer',
  } as React.CSSProperties,

  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    accentColor: colors.accent.primary,
  } as React.CSSProperties,
};
