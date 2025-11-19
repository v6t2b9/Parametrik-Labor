/**
 * AudioOikosPanel - Music-reactive visualization controls
 * Phase 1: Audio source, live analysis, presets, and key mappings
 * Now supports species-specific audio mappings!
 */

import { useRef, type ChangeEvent } from 'react';
import { useAudioStore } from '../store/useAudioStore';
import { useSimulationStore, resolveSpeciesParams } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';
import { AUDIO_MAPPING_PRESETS } from '../audio/presets';

export function AudioOikosPanel() {
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
  const { ui, parameters, updateAudioParams } = useSimulationStore();

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
      } catch (error) {
        alert('Failed to load audio file. Please try a different file.');
      }
    }
  };

  // Handle microphone start
  const handleMicrophoneStart = async () => {
    try {
      await startMicrophone();
    } catch (error) {
      alert('Microphone access denied or not available.');
    }
  };

  // Load audio preset into current species scope
  const loadPreset = (presetKey: keyof typeof AUDIO_MAPPING_PRESETS) => {
    const preset = AUDIO_MAPPING_PRESETS[presetKey];
    updateAudioParams(preset.params);
  };

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
      <h3 style={styles.title}>🎵 Audio Oikos</h3>
      <p style={styles.subtitle}>
        Music-reactive visualization — Music acts as stigmergic perturbation
      </p>

      {/* Audio Source Section */}
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>🎧 Audio Source</h4>

        <div style={styles.sourceButtons}>
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              ...styles.sourceButton,
              ...(inputMode === 'file' ? styles.sourceButtonActive : {}),
            }}
          >
            📁 Load File
          </button>

          <button
            onClick={handleMicrophoneStart}
            style={{
              ...styles.sourceButton,
              ...(inputMode === 'microphone' ? styles.sourceButtonActive : {}),
            }}
          >
            🎤 Microphone
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        {audioFileName && (
          <div style={styles.fileName}>
            <span style={styles.fileIcon}>
              {inputMode === 'microphone' ? '🎤' : '🎵'}
            </span>
            {audioFileName}
          </div>
        )}

        {/* Playback Controls (File mode only) */}
        {inputMode === 'file' && (
          <div style={styles.playbackControls}>
            <button
              onClick={togglePlay}
              style={styles.controlButton}
              disabled={!audioFileName}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>

            <button onClick={stop} style={styles.controlButton} disabled={!audioFileName}>
              ⏹
            </button>

            <button
              onClick={() => setLoop(!loop)}
              style={{
                ...styles.loopButton,
                ...(loop ? styles.loopButtonActive : {}),
              }}
              disabled={!audioFileName}
            >
              🔁 {loop ? 'Loop: ON' : 'Loop: OFF'}
            </button>
          </div>
        )}
      </div>

      <div style={styles.divider} />

      {/* Music Reactivity Toggle */}
      <div style={styles.section}>
        <div style={styles.toggleRow}>
          <h4 style={styles.sectionTitle}>🎚️ Music Reactivity</h4>
          <button
            onClick={toggleMusic}
            style={{
              ...styles.toggleButton,
              ...(musicEnabled ? styles.toggleButtonActive : {}),
            }}
          >
            {musicEnabled ? 'ON' : 'OFF'}
          </button>
        </div>

        <p style={styles.toggleDescription}>
          {musicEnabled
            ? 'Music is modulating agent behavior in real-time'
            : 'Enable to let music control the simulation'}
        </p>
      </div>

      <div style={styles.divider} />

      {/* Auto-Harmonizer (Adaptive Normalization) */}
      {musicEnabled && (
        <>
          <div style={styles.section}>
            <div style={styles.toggleRow}>
              <h4 style={styles.sectionTitle}>🎛️ Auto-Harmonizer</h4>
              <button
                onClick={toggleAdaptiveNormalization}
                style={{
                  ...styles.toggleButton,
                  ...(adaptiveNormalizationEnabled ? styles.toggleButtonActive : {}),
                }}
              >
                {adaptiveNormalizationEnabled ? 'ON' : 'OFF'}
              </button>
            </div>

            <p style={styles.toggleDescription}>
              {adaptiveNormalizationEnabled
                ? 'Learning musical range to maximize contrast (0-1 normalization)'
                : 'Enable adaptive normalization for stronger visual response'}
            </p>

            <p style={styles.autoHarmonizerHint}>
              💡 Auto-Harmonizer learns your music's actual range (e.g., 1500-3000 Hz instead of 0-8000 Hz)
              and normalizes features to maximize visual contrast. Especially effective for quiet or narrow-range music!
            </p>

            {/* Advanced Configuration (only when enabled) */}
            {adaptiveNormalizationEnabled && (
              <div style={styles.advancedConfig}>
                <h5 style={styles.advancedTitle}>⚙️ Advanced Configuration</h5>

                <ParameterSlider
                  label="Window Size (seconds)"
                  value={adaptiveNormalizerConfig.windowSize! / 60} // Convert to seconds
                  min={3}
                  max={30}
                  step={1}
                  onChange={(value) => configureAdaptiveNormalizer({ windowSize: value * 60 })}
                  description="How much history to learn from (larger = slower adaptation)"
                />

                <ParameterSlider
                  label="Smoothing Factor"
                  value={adaptiveNormalizerConfig.smoothingFactor! * 100} // Convert to percentage
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
                  🔧 These settings control how the Auto-Harmonizer learns and adapts to your music.
                  Default values work well for most music, but feel free to experiment!
                </p>
              </div>
            )}
          </div>

          <div style={styles.divider} />
        </>
      )}

      {/* Dynamic Role Mapping */}
      {musicEnabled && (
        <>
          <div style={styles.section}>
            <div style={styles.toggleRow}>
              <h4 style={styles.sectionTitle}>🧬 Dynamic Role Mapping</h4>
              <button
                onClick={() => {
                  const newEnabled = !mappings.roleMapping.enabled;
                  updateAudioParams({
                    roleMapping: { ...mappings.roleMapping, enabled: newEnabled }
                  });
                }}
                style={{
                  ...styles.toggleButton,
                  ...(mappings.roleMapping.enabled ? styles.toggleButtonActive : {}),
                }}
              >
                {mappings.roleMapping.enabled ? 'ON' : 'OFF'}
              </button>
            </div>

            <p style={styles.toggleDescription}>
              {mappings.roleMapping.enabled
                ? 'Agents dynamically assume functional roles based on audio features'
                : 'Enable to let agents switch roles (builder, harvester, consumer, decomposer, scout)'}
            </p>

            <p style={styles.autoHarmonizerHint}>
              💡 Role Mapping assigns ecosystem roles to agents based on real-time audio:
              <br />
              🏗️ Builder (bass) • 🌾 Harvester (mid) • 🔥 Consumer (arousal) • 🍄 Decomposer (dissonance) • 🔭 Scout (treble)
            </p>

            {/* Role Mapping Configuration (only when enabled) */}
            {mappings.roleMapping.enabled && (
              <div style={styles.advancedConfig}>
                <h5 style={styles.advancedTitle}>⚙️ Role Assignment Thresholds</h5>

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
                  <h6 style={styles.roleThresholdTitle}>🏗️ Builder (Bass Energy)</h6>
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
                  <h6 style={styles.roleThresholdTitle}>🌾 Harvester (Mid Energy)</h6>
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
                  <h6 style={styles.roleThresholdTitle}>🔥 Consumer (Arousal Level)</h6>
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
                  <h6 style={styles.roleThresholdTitle}>🍄 Decomposer (Dissonance)</h6>
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
                  <h6 style={styles.roleThresholdTitle}>🔭 Scout (High Energy)</h6>
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
                  🎯 Lower thresholds = more agents in role. Higher = only strongest signals trigger role.
                  Each role has unique behavior: speed, deposit rate, sensor range modifications.
                </p>
              </div>
            )}
          </div>

          <div style={styles.divider} />
        </>
      )}

      {/* Live Analysis */}
      {musicEnabled && (
        <>
          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>📊 Live Analysis</h4>
            {renderAnalysis()}
          </div>

          <div style={styles.divider} />
        </>
      )}

      {/* Presets */}
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>📦 Mapping Presets</h4>
        <p style={styles.presetDescription}>
          Quick configurations for different music genres
        </p>

        <div style={styles.presetGrid}>
          {Object.entries(AUDIO_MAPPING_PRESETS).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => loadPreset(key as any)}
              style={styles.presetButton}
              title={preset.description}
            >
              <span style={styles.presetIcon}>{preset.icon}</span>
              <span style={styles.presetName}>{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={styles.divider} />

      {/* Key Mapping Controls */}
      {musicEnabled && (
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>🎛️ Key Mappings</h4>

          {/* Global */}
          <div style={styles.mappingGroup}>
            <h5 style={styles.groupTitle}>Global</h5>
            <ParameterSlider
              label="Master Influence"
              value={mappings.globalMusicInfluence}
              min={0}
              max={2}
              step={0.1}
              onChange={(value) => updateAudioParams({ globalMusicInfluence: value })}
              description="Global multiplier for all audio effects"
            />
          </div>

          {/* Tempo */}
          <div style={styles.mappingGroup}>
            <h5 style={styles.groupTitle}>Tempo → Movement</h5>
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

            <div style={styles.curveSelector}>
              <label style={styles.curveLabel}>Curve Type:</label>
              <select
                value={mappings.tempo.tempoToSpeedCurve}
                onChange={(e) =>
                  updateAudioParams({ tempo: { ...mappings.tempo, tempoToSpeedCurve: e.target.value as any } })
                }
                style={styles.curveDropdown}
              >
                <option value="linear">Linear</option>
                <option value="exponential">Exponential</option>
                <option value="logarithmic">Logarithmic</option>
                <option value="sigmoid">Sigmoid</option>
              </select>
            </div>
          </div>

          {/* Spectral - Bass */}
          <div style={styles.mappingGroup}>
            <h5 style={styles.groupTitle}>Bass Impact</h5>
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
          </div>

          {/* Harmony */}
          <div style={styles.mappingGroup}>
            <h5 style={styles.groupTitle}>Harmony → Behavior</h5>
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

            <div style={styles.curveSelector}>
              <label style={styles.curveLabel}>Curve Type:</label>
              <select
                value={mappings.harmony.tensionToRandomnessCurve}
                onChange={(e) =>
                  updateAudioParams({ harmony: { ...mappings.harmony, tensionToRandomnessCurve: e.target.value as any } })
                }
                style={styles.curveDropdown}
              >
                <option value="linear">Linear</option>
                <option value="exponential">Exponential</option>
                <option value="logarithmic">Logarithmic</option>
                <option value="sigmoid">Sigmoid</option>
              </select>
            </div>
          </div>

          {/* Rhythm */}
          <div style={styles.mappingGroup}>
            <h5 style={styles.groupTitle}>Rhythm → Impulses</h5>

            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={mappings.rhythm.beatEnabled}
                onChange={(e) =>
                  updateAudioParams({ rhythm: { ...mappings.rhythm, beatEnabled: e.target.checked } })
                }
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
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  panel: {
    padding: '16px',
    backgroundColor: '#13141f',
    borderRadius: '6px',
    border: '1px solid #2a2b3a',
    maxHeight: '80vh',
    overflowY: 'auto' as const,
  } as React.CSSProperties,

  title: {
    fontSize: '16px',
    color: '#e0e0e0',
    marginBottom: '4px',
    fontWeight: 600,
  } as React.CSSProperties,

  subtitle: {
    fontSize: '11px',
    color: '#a0a0b0',
    marginBottom: '16px',
    lineHeight: 1.4,
  } as React.CSSProperties,

  section: {
    marginBottom: '16px',
  } as React.CSSProperties,

  sectionTitle: {
    fontSize: '13px',
    color: '#e0e0e0',
    marginBottom: '8px',
    fontWeight: 600,
  } as React.CSSProperties,

  divider: {
    height: '1px',
    backgroundColor: '#2a2b3a',
    marginBottom: '16px',
  } as React.CSSProperties,

  // Audio Source
  sourceButtons: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
    marginBottom: '12px',
  } as React.CSSProperties,

  sourceButton: {
    padding: '10px',
    backgroundColor: '#0a0a15',
    border: '1px solid #2a2b3a',
    borderRadius: '6px',
    color: '#e0e0e0',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  } as React.CSSProperties,

  sourceButtonActive: {
    backgroundColor: '#7d5dbd',
    borderColor: '#9d7ddd',
  } as React.CSSProperties,

  fileName: {
    fontSize: '11px',
    color: '#a0a0b0',
    padding: '8px',
    backgroundColor: '#0a0a15',
    borderRadius: '4px',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  } as React.CSSProperties,

  fileIcon: {
    fontSize: '14px',
  } as React.CSSProperties,

  playbackControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  } as React.CSSProperties,

  controlButton: {
    padding: '8px 16px',
    backgroundColor: '#0a0a15',
    border: '1px solid #2a2b3a',
    borderRadius: '4px',
    color: '#e0e0e0',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  } as React.CSSProperties,

  loopButton: {
    padding: '8px 16px',
    backgroundColor: '#0a0a15',
    border: '1px solid #2a2b3a',
    borderRadius: '4px',
    color: '#a0a0b0',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginLeft: 'auto',
  } as React.CSSProperties,

  loopButtonActive: {
    backgroundColor: '#7d5dbd22',
    borderColor: '#7d5dbd',
    color: '#7d5dbd',
  } as React.CSSProperties,

  // Music Reactivity Toggle
  toggleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '8px',
  } as React.CSSProperties,

  toggleButton: {
    padding: '6px 16px',
    backgroundColor: '#0a0a15',
    border: '1px solid #2a2b3a',
    borderRadius: '4px',
    color: '#e0e0e0',
    fontSize: '11px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    minWidth: '60px',
  } as React.CSSProperties,

  toggleButtonActive: {
    backgroundColor: '#4ecdc4',
    borderColor: '#6eddcc',
    color: '#0a0a15',
  } as React.CSSProperties,

  toggleDescription: {
    fontSize: '10px',
    color: '#a0a0b0',
    lineHeight: 1.4,
  } as React.CSSProperties,

  autoHarmonizerHint: {
    fontSize: '9px',
    color: '#7a7a8a',
    lineHeight: 1.5,
    marginTop: '8px',
    padding: '8px',
    backgroundColor: '#0a0a15',
    borderRadius: '4px',
    borderLeft: '2px solid #7d5dbd',
  } as React.CSSProperties,

  // Advanced Auto-Harmonizer Config
  advancedConfig: {
    marginTop: '12px',
    padding: '12px',
    backgroundColor: '#0a0a15',
    borderRadius: '6px',
    border: '1px solid #2a2b3a',
  } as React.CSSProperties,

  advancedTitle: {
    fontSize: '11px',
    color: '#a0a0b0',
    marginBottom: '10px',
    fontWeight: 600,
    margin: '0 0 10px 0',
  } as React.CSSProperties,

  advancedHint: {
    fontSize: '9px',
    color: '#7a7a8a',
    lineHeight: 1.4,
    marginTop: '10px',
    fontStyle: 'italic' as const,
  } as React.CSSProperties,

  // Role Threshold Groups
  roleThresholdGroup: {
    marginTop: '12px',
    marginBottom: '12px',
    paddingTop: '8px',
    borderTop: '1px solid #2a2b3a',
  } as React.CSSProperties,

  roleThresholdTitle: {
    fontSize: '11px',
    color: '#e0e0e0',
    marginBottom: '6px',
    fontWeight: 600,
    margin: '0 0 6px 0',
  } as React.CSSProperties,

  // Live Analysis
  analysisRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px',
    marginBottom: '12px',
  } as React.CSSProperties,

  analysisLabel: {
    fontSize: '10px',
    color: '#a0a0b0',
    textAlign: 'center' as const,
  } as React.CSSProperties,

  frequencyBars: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
    marginBottom: '12px',
  } as React.CSSProperties,

  barContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  } as React.CSSProperties,

  barLabel: {
    fontSize: '10px',
    color: '#a0a0b0',
    width: '40px',
  } as React.CSSProperties,

  barTrack: {
    flex: 1,
    height: '12px',
    backgroundColor: '#0a0a15',
    borderRadius: '6px',
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
    backgroundColor: '#0a0a15',
    borderRadius: '4px',
  } as React.CSSProperties,

  beatPulse: {
    fontSize: '16px',
    animation: 'pulse 0.3s ease-in-out',
  } as React.CSSProperties,

  analysisPlaceholder: {
    fontSize: '11px',
    color: '#6a6a7a',
    fontStyle: 'italic' as const,
    textAlign: 'center' as const,
    padding: '16px',
  } as React.CSSProperties,

  // Presets
  presetDescription: {
    fontSize: '10px',
    color: '#a0a0b0',
    marginBottom: '10px',
    lineHeight: 1.4,
  } as React.CSSProperties,

  presetGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(70px, 1fr))',
    gap: '8px',
  } as React.CSSProperties,

  presetButton: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '10px 8px',
    backgroundColor: '#0a0a15',
    border: '1px solid #2a2b3a',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontSize: '11px',
    color: '#e0e0e0',
    minHeight: '60px',
  } as React.CSSProperties,

  presetButtonActive: {
    backgroundColor: '#7d5dbd',
    borderColor: '#9d7ddd',
  } as React.CSSProperties,

  presetIcon: {
    fontSize: '20px',
    marginBottom: '4px',
  } as React.CSSProperties,

  presetName: {
    fontSize: '9px',
    textAlign: 'center' as const,
  } as React.CSSProperties,

  // Mapping Controls
  mappingGroup: {
    marginBottom: '16px',
  } as React.CSSProperties,

  groupTitle: {
    fontSize: '12px',
    color: '#e0e0e0',
    marginBottom: '8px',
    fontWeight: 600,
  } as React.CSSProperties,

  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '11px',
    color: '#e0e0e0',
    marginBottom: '8px',
    cursor: 'pointer',
  } as React.CSSProperties,

  // Curve Selector
  curveSelector: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '8px',
  } as React.CSSProperties,

  curveLabel: {
    fontSize: '10px',
    color: '#a0a0b0',
    minWidth: '80px',
  } as React.CSSProperties,

  curveDropdown: {
    flex: 1,
    padding: '6px 8px',
    backgroundColor: '#0a0a15',
    border: '1px solid #2a2b3a',
    borderRadius: '4px',
    color: '#e0e0e0',
    fontSize: '11px',
    cursor: 'pointer',
    outline: 'none',
  } as React.CSSProperties,
};
