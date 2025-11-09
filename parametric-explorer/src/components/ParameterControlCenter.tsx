import { useState } from 'react';
import { useSimulationStore } from '../store/useSimulationStore';
import { PhysicalOikosPanel } from './PhysicalOikosPanel';
import { SemioticOikosPanel } from './SemioticOikosPanel';
import { TemporalOikosPanel } from './TemporalOikosPanel';
import { ResonanceOikosPanel } from './ResonanceOikosPanel';
import { VisualizationOikosPanel } from './VisualizationOikosPanel';
import { EffectsOikosPanel } from './EffectsOikosPanel';
import { PresetGallery } from './PresetGallery';

type TabType = 'presets' | 'physical' | 'semiotic' | 'temporal' | 'resonance' | 'visualization' | 'effects';

export function ParameterControlCenter() {
  const [activeTab, setActiveTab] = useState<TabType>('presets');
  const { reset } = useSimulationStore();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>🎛️ Parameter Control Center</h2>
        <button onClick={reset} style={styles.resetButton}>
          🔄 Reset Simulation
        </button>
      </div>

      <div style={styles.tabs}>
        <Tab
          active={activeTab === 'presets'}
          onClick={() => setActiveTab('presets')}
          label="🎯 Presets"
        />
        <Tab
          active={activeTab === 'physical'}
          onClick={() => setActiveTab('physical')}
          label="🌊 Physikalisch"
        />
        <Tab
          active={activeTab === 'semiotic'}
          onClick={() => setActiveTab('semiotic')}
          label="👁️ Semiotisch"
        />
        <Tab
          active={activeTab === 'temporal'}
          onClick={() => setActiveTab('temporal')}
          label="⏱️ Temporal"
        />
        <Tab
          active={activeTab === 'resonance'}
          onClick={() => setActiveTab('resonance')}
          label="🔗 Resonanz"
        />
        <Tab
          active={activeTab === 'visualization'}
          onClick={() => setActiveTab('visualization')}
          label="🎨 Visualisierung"
        />
        <Tab
          active={activeTab === 'effects'}
          onClick={() => setActiveTab('effects')}
          label="✨ Effects"
        />
      </div>

      <div style={styles.content}>
        {activeTab === 'presets' && <PresetGallery />}
        {activeTab === 'physical' && <PhysicalOikosPanel />}
        {activeTab === 'semiotic' && <SemioticOikosPanel />}
        {activeTab === 'temporal' && <TemporalOikosPanel />}
        {activeTab === 'resonance' && <ResonanceOikosPanel />}
        {activeTab === 'visualization' && <VisualizationOikosPanel />}
        {activeTab === 'effects' && <EffectsOikosPanel />}
      </div>
    </div>
  );
}

function Tab({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        ...styles.tab,
        ...(active ? styles.tabActive : {}),
      }}
    >
      {label}
    </button>
  );
}

const styles = {
  container: {
    backgroundColor: '#0a0a15',
    padding: '20px',
    borderRadius: '8px',
  } as React.CSSProperties,
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  } as React.CSSProperties,
  title: {
    fontSize: '22px',
    color: '#e0e0e0',
    fontWeight: 700,
    margin: 0,
  } as React.CSSProperties,
  resetButton: {
    padding: '10px 16px',
    backgroundColor: '#2a2b3a',
    color: '#e0e0e0',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  } as React.CSSProperties,
  tabs: {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px',
    borderBottom: '2px solid #2a2b3a',
    paddingBottom: '8px',
  } as React.CSSProperties,
  tab: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    color: '#a0a0b0',
    border: 'none',
    borderRadius: '6px 6px 0 0',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  } as React.CSSProperties,
  tabActive: {
    backgroundColor: '#13141f',
    color: '#7d5dbd',
    borderBottom: '2px solid #7d5dbd',
  } as React.CSSProperties,
  content: {
    minHeight: '400px',
  } as React.CSSProperties,
};
