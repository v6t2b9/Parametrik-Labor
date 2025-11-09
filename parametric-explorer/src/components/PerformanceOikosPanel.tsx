import { useSimulationStore } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';

export function PerformanceOikosPanel() {
  const { parameters, performanceMetrics, updatePerformanceParams } = useSimulationStore();
  const { performance } = parameters;

  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>⚡ Performance Oikos</h3>
      <p style={styles.subtitle}>Adaptive performance optimization</p>

      {/* Performance Metrics Display */}
      <div style={styles.metricsSection}>
        <h4 style={styles.sectionTitle}>Live Metrics</h4>
        <div style={styles.metricsGrid}>
          <div style={styles.metricBox}>
            <div style={styles.metricLabel}>Current FPS</div>
            <div style={styles.metricValue}>
              {performanceMetrics.currentFPS.toFixed(1)}
            </div>
          </div>
          <div style={styles.metricBox}>
            <div style={styles.metricLabel}>Avg FPS</div>
            <div style={styles.metricValue}>
              {performanceMetrics.avgFPS.toFixed(1)}
            </div>
          </div>
          <div style={styles.metricBox}>
            <div style={styles.metricLabel}>Min FPS</div>
            <div style={styles.metricValue}>
              {performanceMetrics.minFPS > 0 ? performanceMetrics.minFPS.toFixed(1) : '-'}
            </div>
          </div>
          <div style={styles.metricBox}>
            <div style={styles.metricLabel}>Max FPS</div>
            <div style={styles.metricValue}>
              {performanceMetrics.maxFPS > 0 ? performanceMetrics.maxFPS.toFixed(1) : '-'}
            </div>
          </div>
          <div style={styles.metricBox}>
            <div style={styles.metricLabel}>Frame Time</div>
            <div style={styles.metricValue}>
              {performanceMetrics.frameTime.toFixed(1)}ms
            </div>
          </div>
          <div style={styles.metricBox}>
            <div style={styles.metricLabel}>Tick Time</div>
            <div style={styles.metricValue}>
              {performanceMetrics.tickTime.toFixed(1)}ms
            </div>
          </div>
          <div style={styles.metricBox}>
            <div style={styles.metricLabel}>Render Time</div>
            <div style={styles.metricValue}>
              {performanceMetrics.renderTime.toFixed(1)}ms
            </div>
          </div>
          <div style={styles.metricBox}>
            <div style={styles.metricLabel}>Agent Count</div>
            <div style={styles.metricValue}>
              {parameters.temporal.agentCount}
            </div>
          </div>
        </div>
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
          Automatically adjusts agent count to maintain target FPS
        </p>
      </div>

      <div style={styles.divider} />

      <h4 style={styles.sectionTitle}>Target Settings</h4>

      <ParameterSlider
        label="Target FPS"
        value={performance.targetFPS}
        min={30}
        max={120}
        step={5}
        onChange={(value) => updatePerformanceParams({ targetFPS: value })}
        description="Desired frames per second for smooth performance"
      />

      <div style={styles.divider} />

      <h4 style={styles.sectionTitle}>Agent Limits</h4>

      <ParameterSlider
        label="Min Agents"
        value={performance.minAgents}
        min={100}
        max={5000}
        step={100}
        onChange={(value) => updatePerformanceParams({ minAgents: value })}
        description="Minimum number of agents (prevents empty simulations)"
      />

      <ParameterSlider
        label="Max Agents"
        value={performance.maxAgents}
        min={1000}
        max={20000}
        step={500}
        onChange={(value) => updatePerformanceParams({ maxAgents: value })}
        description="Maximum number of agents (prevents performance collapse)"
      />

      <div style={styles.divider} />

      <h4 style={styles.sectionTitle}>Optimization Behavior</h4>

      <ParameterSlider
        label="Adjustment Speed"
        value={performance.adjustmentSpeed}
        min={0.01}
        max={0.5}
        step={0.01}
        onChange={(value) => updatePerformanceParams({ adjustmentSpeed: value })}
        description="How quickly agent count adjusts (% per adjustment)"
      />

      <ParameterSlider
        label="FPS Check Interval"
        value={performance.fpsCheckInterval}
        min={30}
        max={300}
        step={10}
        onChange={(value) => updatePerformanceParams({ fpsCheckInterval: value })}
        description="Frames between optimization checks"
      />

      <ParameterSlider
        label="Lower Threshold"
        value={performance.fpsLowerThreshold}
        min={0.5}
        max={1.0}
        step={0.05}
        onChange={(value) => updatePerformanceParams({ fpsLowerThreshold: value })}
        description="Reduce agents when FPS < target × this value"
      />

      <ParameterSlider
        label="Upper Threshold"
        value={performance.fpsUpperThreshold}
        min={1.0}
        max={1.5}
        step={0.05}
        onChange={(value) => updatePerformanceParams({ fpsUpperThreshold: value })}
        description="Increase agents when FPS > target × this value"
      />
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
  metricsSection: {
    marginBottom: '20px',
  } as React.CSSProperties,
  sectionTitle: {
    fontSize: '14px',
    color: '#a0a0b0',
    marginBottom: '12px',
    fontWeight: 600,
  } as React.CSSProperties,
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px',
  } as React.CSSProperties,
  metricBox: {
    backgroundColor: '#0a0a15',
    border: '1px solid #2a2b3a',
    borderRadius: '6px',
    padding: '10px',
    textAlign: 'center',
  } as React.CSSProperties,
  metricLabel: {
    fontSize: '10px',
    color: '#808090',
    marginBottom: '4px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  } as React.CSSProperties,
  metricValue: {
    fontSize: '16px',
    color: '#50d890',
    fontWeight: 600,
    fontFamily: 'monospace',
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
  } as React.CSSProperties,
  divider: {
    height: '1px',
    backgroundColor: '#2a2b3a',
    marginBottom: '20px',
  } as React.CSSProperties,
};
