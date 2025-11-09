import { useSimulationStore } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';
import type { QualityPreset } from '../types/index.js';

export function PerformanceOikosPanel() {
  const { parameters, performanceMetrics, updatePerformanceParams, applyQualityPreset, reset } = useSimulationStore();
  const { performance } = parameters;

  const qualityPresets: { value: QualityPreset; label: string; description: string; icon: string }[] = [
    { value: 'low', label: 'Low', description: '~600 agents, minimal effects', icon: '⚡' },
    { value: 'medium', label: 'Medium', description: '~1200 agents, basic effects', icon: '💫' },
    { value: 'high', label: 'High', description: '~1800 agents, smooth effects', icon: '✨' },
    { value: 'ultra', label: 'Ultra', description: '~2400 agents, all effects', icon: '🌟' },
  ];

  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>⚡ Performance & Quality</h3>
      <p style={styles.subtitle}>Adaptive quality for smooth fluid motion</p>

      {/* Reset Parameters Button */}
      <div style={styles.resetSection}>
        <button onClick={reset} style={styles.resetButton}>
          🔄 Reset All Parameters to Default
        </button>
        <p style={styles.resetWarning}>
          ⚠️ This resets all parameters to default values, not just the simulation state!
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
            ⚠️ Low performance detected. Try reducing quality or enabling auto-optimizer.
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
            {performance.autoOptimize ? '✓ Auto-Optimizer Active' : '○ Auto-Optimizer Disabled'}
          </span>
        </label>
        <p style={styles.toggleDescription}>
          Automatically reduces effects & agent count when FPS drops below target.
          Restores quality when performance improves.
        </p>
      </div>

      <div style={styles.divider} />

      {/* Quality Preset Selection */}
      <h4 style={styles.sectionTitle}>Quality Preset</h4>
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
        <h4 style={styles.infoTitle}>💡 How it works</h4>
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
    padding: '20px',
    backgroundColor: '#13141f',
    borderRadius: '8px',
    border: '1px solid #2a2b3a',
  } as React.CSSProperties,
  title: {
    fontSize: '18px',
    color: '#e0e0e0',
    marginBottom: '4px',
    fontWeight: 600,
  } as React.CSSProperties,
  subtitle: {
    fontSize: '12px',
    color: '#a0a0b0',
    marginBottom: '20px',
  } as React.CSSProperties,
  resetSection: {
    marginTop: '20px',
    marginBottom: '20px',
  } as React.CSSProperties,
  resetButton: {
    width: '100%',
    padding: '12px 20px',
    backgroundColor: '#3a2b2b',
    color: '#ffaaaa',
    border: '2px solid #5a3a3a',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  } as React.CSSProperties,
  resetWarning: {
    fontSize: '11px',
    color: '#ff8888',
    marginTop: '8px',
    marginBottom: '0',
    textAlign: 'center',
    lineHeight: '1.4',
  } as React.CSSProperties,
  statusSection: {
    marginBottom: '20px',
  } as React.CSSProperties,
  statusGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
    marginBottom: '10px',
  } as React.CSSProperties,
  statusBox: {
    backgroundColor: '#0a0a15',
    border: '1px solid #2a2b3a',
    borderRadius: '6px',
    padding: '12px',
    textAlign: 'center',
  } as React.CSSProperties,
  statusLabel: {
    fontSize: '10px',
    color: '#808090',
    marginBottom: '4px',
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
    borderRadius: '6px',
    padding: '10px',
    color: '#ff6b6b',
    fontSize: '12px',
    textAlign: 'center',
  } as React.CSSProperties,
  toggleSection: {
    marginBottom: '20px',
  } as React.CSSProperties,
  toggleLabel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    marginBottom: '8px',
  } as React.CSSProperties,
  checkbox: {
    marginRight: '10px',
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  } as React.CSSProperties,
  toggleText: {
    fontSize: '14px',
    color: '#e0e0e0',
    fontWeight: 600,
  } as React.CSSProperties,
  toggleDescription: {
    fontSize: '11px',
    color: '#808090',
    marginLeft: '28px',
    marginTop: '0',
    lineHeight: '1.4',
  } as React.CSSProperties,
  sectionTitle: {
    fontSize: '14px',
    color: '#a0a0b0',
    marginBottom: '12px',
    fontWeight: 600,
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
    padding: '16px 12px',
    backgroundColor: '#0a0a15',
    border: '2px solid #2a2b3a',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  } as React.CSSProperties,
  presetButtonActive: {
    backgroundColor: '#1a1a2e',
    borderColor: '#7d5dbd',
    boxShadow: '0 0 10px rgba(125, 93, 189, 0.3)',
  } as React.CSSProperties,
  presetIcon: {
    fontSize: '28px',
    marginBottom: '8px',
  } as React.CSSProperties,
  presetLabel: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#e0e0e0',
    marginBottom: '4px',
  } as React.CSSProperties,
  presetDescription: {
    fontSize: '10px',
    color: '#808090',
    textAlign: 'center',
    lineHeight: '1.3',
  } as React.CSSProperties,
  divider: {
    height: '1px',
    backgroundColor: '#2a2b3a',
    marginBottom: '20px',
  } as React.CSSProperties,
  infoSection: {
    backgroundColor: '#0a0a15',
    border: '1px solid #2a2b3a',
    borderRadius: '6px',
    padding: '14px',
  } as React.CSSProperties,
  infoTitle: {
    fontSize: '13px',
    color: '#a0a0b0',
    marginBottom: '10px',
    fontWeight: 600,
    margin: '0 0 10px 0',
  } as React.CSSProperties,
  infoList: {
    fontSize: '11px',
    color: '#808090',
    lineHeight: '1.6',
    margin: 0,
    paddingLeft: '20px',
  } as React.CSSProperties,
  subList: {
    marginTop: '4px',
    paddingLeft: '16px',
  } as React.CSSProperties,
};
