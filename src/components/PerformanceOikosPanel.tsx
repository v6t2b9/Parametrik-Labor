import { memo } from 'react';
import { useSimulationStore } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';
import type { QualityPreset } from '../types/index.js';
import { colors, spacing, effects, createHeaderStyle, createSubtitleStyle } from '../design-system';
import { Section } from './ui/Section';
import { Divider } from './ui/Divider';
import { InfoBox } from './ui/InfoBox';

const PerformanceOikosPanelComponent = () => {
  // Shallow selectors - only subscribe to needed data
  const performance = useSimulationStore((state) => state.parameters.performance);
  const agentCount = useSimulationStore((state) => state.parameters.globalTemporal.agentCount);
  const performanceMetrics = useSimulationStore((state) => state.performanceMetrics);
  const updatePerformanceParams = useSimulationStore((state) => state.updatePerformanceParams);
  const applyQualityPreset = useSimulationStore((state) => state.applyQualityPreset);
  const reset = useSimulationStore((state) => state.reset);

  const qualityPresets: { value: QualityPreset; label: string; description: string; icon: string }[] = [
    { value: 'low', label: 'Low', description: '~600 agents, minimal effects', icon: '⚡' },
    { value: 'medium', label: 'Medium', description: '~1200 agents, basic effects', icon: '💫' },
    { value: 'high', label: 'High', description: '~1800 agents, smooth effects', icon: '✨' },
    { value: 'ultra', label: 'Ultra', description: '~2400 agents, all effects', icon: '🌟' },
  ];

  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>Performance & Quality</h3>
      <p style={styles.subtitle}>Adaptive quality for smooth fluid motion</p>

      {/* Reset Parameters Button */}
      <div style={styles.resetSection}>
        <button onClick={reset} style={styles.resetButton}>
          Reset All Parameters to Default
        </button>
        <p style={styles.resetWarning}>
          This resets all parameters to default values, not just the simulation state!
        </p>
      </div>

      <Divider />

      {/* Performance Status */}
      <Section title="Performance Status">
        <div style={styles.statusGrid}>
          <div style={styles.statusBox}>
            <div style={styles.statusLabel}>FPS</div>
            <div style={{
              ...styles.statusValue,
              color: performanceMetrics.avgFPS >= performance.targetFPS * 0.9 ? '#50d890' :
                     performanceMetrics.avgFPS >= performance.targetFPS * 0.7 ? '#f0ad4e' : '#ff6b6b'
            }}>
              {performanceMetrics.avgFPS > 0 ? performanceMetrics.avgFPS.toFixed(0) : '-'}
            </div>
          </div>
          <div style={styles.statusBox}>
            <div style={styles.statusLabel}>Target</div>
            <div style={styles.statusValue}>
              {performance.targetFPS}
            </div>
          </div>
          <div style={styles.statusBox}>
            <div style={styles.statusLabel}>Agents</div>
            <div style={styles.statusValue}>
              {agentCount}
            </div>
          </div>
          <div style={styles.statusBox}>
            <div style={styles.statusLabel}>Opt Level</div>
            <div style={styles.statusValue}>
              {performance._currentOptLevel}/10
            </div>
          </div>
        </div>
        {performanceMetrics.avgFPS > 0 && performanceMetrics.avgFPS < performance.targetFPS * 0.7 && (
          <div style={styles.warningBox}>
            Low performance detected. Try reducing quality or enabling auto-optimizer.
          </div>
        )}
      </Section>

      <Divider />

      {/* Auto-Optimizer Toggle */}
      <Section title="Auto-Optimizer">
        <label style={styles.toggleLabel}>
          <input
            type="checkbox"
            checked={performance.autoOptimize}
            onChange={(e) => updatePerformanceParams({ autoOptimize: e.target.checked })}
            style={styles.checkbox}
            aria-label="Enable auto-optimizer"
          />
          <span style={styles.toggleText}>
            {performance.autoOptimize ? 'Auto-Optimizer Active' : 'Auto-Optimizer Disabled'}
          </span>
        </label>
        <p style={styles.toggleDescription}>
          Automatically reduces effects & agent count when FPS drops below target.
          Restores quality when performance improves.
        </p>
      </Section>

      <Divider />

      {/* Quality Preset Selection */}
      <Section
        title="Quality Presets"
        description="Balanced configurations for different hardware capabilities"
      >
        <div style={styles.presetGrid}>
          {qualityPresets.map((preset) => (
            <button
              key={preset.value}
              onClick={() => applyQualityPreset(preset.value)}
              style={{
                ...styles.presetButton,
                ...(performance.qualityPreset === preset.value ? styles.presetButtonActive : {}),
              }}
              aria-pressed={performance.qualityPreset === preset.value}
            >
              <span style={styles.presetIcon}>{preset.icon}</span>
              <span style={styles.presetLabel}>{preset.label}</span>
              <span style={styles.presetDescription}>{preset.description}</span>
            </button>
          ))}
        </div>
      </Section>

      <Divider />

      {/* Target FPS */}
      <Section title="Target Frame Rate">
        <ParameterSlider
          label="Target FPS"
          value={performance.targetFPS}
          min={30}
          max={120}
          step={10}
          onChange={(value) => updatePerformanceParams({ targetFPS: value })}
          description="Auto-optimizer will try to maintain this frame rate"
        />
      </Section>

      <Divider />

      {/* Performance Info */}
      <InfoBox>
        <h4 style={styles.infoTitle}>How it works</h4>
        <ul style={styles.infoList}>
          <li>Quality Preset sets base parameters for agents & effects</li>
          <li>Auto-Optimizer dynamically reduces quality when FPS drops</li>
          <li>Optimization levels (0-10):
            <ul style={styles.subList}>
              <li>0-2: Disable expensive effects (wave, chromatic)</li>
              <li>3-4: Reduce bloom, blur, motion blur</li>
              <li>5-8: Reduce agent count progressively</li>
              <li>9-10: Minimum agents (150) + fastest trails</li>
            </ul>
          </li>
          <li>Aggressive mode: FPS &lt; 50% of target jumps 3 levels</li>
          <li>System recovers quality slowly when FPS is stable</li>
        </ul>
      </InfoBox>
    </div>
  );
};

// Export memoized component - prevents re-renders when performance params haven't changed
export const PerformanceOikosPanel = memo(PerformanceOikosPanelComponent);

const styles = {
  panel: {
    padding: spacing.xl,
    backgroundColor: colors.bg.secondary,
    borderRadius: effects.borderRadius.lg,
    border: `1px solid ${colors.border.primary}`,
  } as React.CSSProperties,
  title: {
    ...createHeaderStyle('h2'),
    fontSize: '18px',
    marginBottom: spacing.xs,
  } as React.CSSProperties,
  subtitle: {
    ...createSubtitleStyle(),
    fontSize: '12px',
    marginBottom: spacing.xl,
  } as React.CSSProperties,
  resetSection: {
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  } as React.CSSProperties,
  resetButton: {
    width: '100%',
    padding: `${spacing.md} ${spacing.xl}`,
    backgroundColor: '#3a2b2b',
    color: '#ffaaaa',
    border: '2px solid #5a3a3a',
    borderRadius: effects.borderRadius.lg,
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: effects.transition.normal,
  } as React.CSSProperties,
  resetWarning: {
    fontSize: '11px',
    color: '#ff8888',
    marginTop: spacing.sm,
    marginBottom: 0,
    textAlign: 'center' as const,
    lineHeight: '1.4',
  } as React.CSSProperties,
  statusGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  } as React.CSSProperties,
  statusBox: {
    backgroundColor: colors.bg.subtle,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: effects.borderRadius.md,
    padding: spacing.md,
    textAlign: 'center' as const,
  } as React.CSSProperties,
  statusLabel: {
    fontSize: '10px',
    color: colors.text.tertiary,
    marginBottom: spacing.xs,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  } as React.CSSProperties,
  statusValue: {
    fontSize: '20px',
    fontWeight: 700,
    fontFamily: 'monospace',
  } as React.CSSProperties,
  warningBox: {
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    border: '1px solid rgba(255, 107, 107, 0.3)',
    borderRadius: effects.borderRadius.md,
    padding: spacing.sm,
    color: '#ff6b6b',
    fontSize: '12px',
    textAlign: 'center' as const,
    marginTop: spacing.sm,
  } as React.CSSProperties,
  toggleLabel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    marginBottom: spacing.sm,
  } as React.CSSProperties,
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    marginRight: spacing.sm,
    accentColor: colors.accent.primary,
  } as React.CSSProperties,
  toggleText: {
    fontSize: '13px',
    color: colors.text.primary,
    fontWeight: 600,
  } as React.CSSProperties,
  toggleDescription: {
    fontSize: '11px',
    color: colors.text.tertiary,
    marginLeft: '26px',
    marginTop: 0,
    lineHeight: '1.4',
  } as React.CSSProperties,
  presetGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: spacing.sm,
  } as React.CSSProperties,
  presetButton: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.bg.subtle,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: effects.borderRadius.md,
    cursor: 'pointer',
    transition: effects.transition.normal,
    color: colors.text.primary,
    minHeight: '80px',
  } as React.CSSProperties,
  presetButtonActive: {
    backgroundColor: '#1a1a2e',
    borderColor: colors.accent.primary,
    boxShadow: '0 0 10px rgba(125, 93, 189, 0.3)',
  } as React.CSSProperties,
  presetIcon: {
    fontSize: '28px',
    marginBottom: spacing.sm,
  } as React.CSSProperties,
  presetLabel: {
    fontSize: '13px',
    fontWeight: 600,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  } as React.CSSProperties,
  presetDescription: {
    fontSize: '10px',
    color: colors.text.tertiary,
    textAlign: 'center' as const,
    lineHeight: '1.3',
  } as React.CSSProperties,
  infoTitle: {
    fontSize: '13px',
    color: colors.text.secondary,
    marginBottom: spacing.sm,
    fontWeight: 600,
    margin: `0 0 ${spacing.sm} 0`,
  } as React.CSSProperties,
  infoList: {
    fontSize: '11px',
    color: colors.text.tertiary,
    lineHeight: '1.6',
    margin: 0,
    paddingLeft: '20px',
  } as React.CSSProperties,
  subList: {
    marginTop: spacing.xs,
    paddingLeft: spacing.lg,
  } as React.CSSProperties,
};
