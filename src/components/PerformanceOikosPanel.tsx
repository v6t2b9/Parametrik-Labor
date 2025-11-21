import { useSimulationStore } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';
import type { QualityPreset } from '../types/index.js';
import { colors, spacing, typography, effects, createHeaderStyle, createSubtitleStyle } from '../design-system';

export function PerformanceOikosPanel() {
  const parameters = useSimulationStore((state) => state.parameters);
  const performanceMetrics = useSimulationStore((state) => state.performanceMetrics);
  const updatePerformanceParams = useSimulationStore((state) => state.updatePerformanceParams);
  const applyQualityPreset = useSimulationStore((state) => state.applyQualityPreset);
  const reset = useSimulationStore((state) => state.reset);
  const { performance } = parameters;

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

      <div style={styles.divider} />

      {/* Performance Status */}
      <div style={styles.statusSection}>
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
              {parameters.globalTemporal.agentCount}
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
      </div>

      <div style={styles.divider} />

      {/* Auto-Optimizer Toggle */}
      <div style={styles.toggleSection}>
        <label style={styles.toggleLabel}>
          <input
            type="checkbox"
            checked={performance.autoOptimize}
            onChange={(e) => updatePerformanceParams({ autoOptimize: e.target.checked })}
            style={styles.checkbox}
          />
          <span style={styles.toggleText}>
            {performance.autoOptimize ? 'Auto-Optimizer Active' : 'Auto-Optimizer Disabled'}
          </span>
        </label>
        <p style={styles.toggleDescription}>
          Automatically reduces effects & agent count when FPS drops below target.
          Restores quality when performance improves.
        </p>
      </div>

      <div style={styles.divider} />

      {/* Quality Preset Selection */}
      <h4 style={styles.sectionTitle}>Quality Presets</h4>
      <p style={styles.sectionDescription}>Balanced configurations for different hardware capabilities</p>
      <div style={styles.presetGrid}>
        {qualityPresets.map((preset) => (
          <button
            key={preset.value}
            onClick={() => applyQualityPreset(preset.value)}
            style={{
              ...styles.presetButton,
              ...(performance.qualityPreset === preset.value ? styles.presetButtonActive : {}),
            }}
          >
            <span style={styles.presetIcon}>{preset.icon}</span>
            <span style={styles.presetLabel}>{preset.label}</span>
            <span style={styles.presetDescription}>{preset.description}</span>
          </button>
        ))}
      </div>

      <div style={styles.divider} />

      {/* Target FPS */}
      <h4 style={styles.sectionTitle}>Target Frame Rate</h4>
      <ParameterSlider
        label="Target FPS"
        value={performance.targetFPS}
        min={30}
        max={120}
        step={10}
        onChange={(value) => updatePerformanceParams({ targetFPS: value })}
        description="Auto-optimizer will try to maintain this frame rate"
      />

      <div style={styles.divider} />

      {/* Performance Info */}
      <div style={styles.infoSection}>
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
      </div>
    </div>
  );
}

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
    fontSize: typography.h3.fontSize,
    fontWeight: 600,
    cursor: 'pointer',
    transition: effects.transition.normal,
  } as React.CSSProperties,
  resetWarning: {
    ...typography.caption,
    color: '#ff8888',
    marginTop: spacing.sm,
    marginBottom: '0',
    textAlign: 'center',
    lineHeight: '1.4',
  } as React.CSSProperties,
  statusSection: {
    marginBottom: spacing.xl,
  } as React.CSSProperties,
  statusGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
    marginBottom: '10px',
  } as React.CSSProperties,
  statusBox: {
    backgroundColor: colors.bg.subtle,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: effects.borderRadius.md,
    padding: spacing.md,
    textAlign: 'center',
  } as React.CSSProperties,
  statusLabel: {
    fontSize: '10px',
    color: colors.text.tertiary,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
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
    padding: '10px',
    color: '#ff6b6b',
    fontSize: '12px',
    textAlign: 'center',
  } as React.CSSProperties,
  toggleSection: {
    marginBottom: spacing.xl,
  } as React.CSSProperties,
  toggleLabel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    marginBottom: spacing.sm,
  } as React.CSSProperties,
  checkbox: {
    marginRight: '10px',
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  } as React.CSSProperties,
  toggleText: {
    ...typography.h3,
    color: colors.text.primary,
    fontWeight: 600,
  } as React.CSSProperties,
  toggleDescription: {
    ...typography.caption,
    color: colors.text.tertiary,
    marginLeft: '28px',
    marginTop: '0',
    lineHeight: '1.4',
  } as React.CSSProperties,
  sectionTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    fontWeight: 600,
  } as React.CSSProperties,
  sectionDescription: {
    fontSize: '10px',
    color: colors.text.secondary,
    marginBottom: '10px',
    lineHeight: 1.4,
  } as React.CSSProperties,
  presetGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
  } as React.CSSProperties,
  presetButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${spacing.sm} ${spacing.sm}`,
    backgroundColor: colors.bg.subtle,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: effects.borderRadius.md,
    cursor: 'pointer',
    transition: effects.transition.normal,
    ...typography.caption,
    color: colors.text.primary,
    minHeight: '60px',
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
    ...typography.h3,
    fontWeight: 600,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  } as React.CSSProperties,
  presetDescription: {
    fontSize: '10px',
    color: colors.text.tertiary,
    textAlign: 'center',
    lineHeight: '1.3',
  } as React.CSSProperties,
  divider: {
    height: '1px',
    backgroundColor: colors.border.primary,
    marginBottom: spacing.xl,
  } as React.CSSProperties,
  infoSection: {
    backgroundColor: colors.bg.subtle,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: effects.borderRadius.md,
    padding: '14px',
  } as React.CSSProperties,
  infoTitle: {
    ...typography.h3,
    color: colors.text.secondary,
    marginBottom: '10px',
    fontWeight: 600,
    margin: '0 0 10px 0',
  } as React.CSSProperties,
  infoList: {
    ...typography.caption,
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
