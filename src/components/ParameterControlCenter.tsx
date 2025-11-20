import { useState } from 'react';
import { useSimulationStore } from '../store/useSimulationStore';
import { PhysicalOikosPanel } from './PhysicalOikosPanel';
import { SemioticOikosPanel } from './SemioticOikosPanel';
import { ResonanceOikosPanel } from './ResonanceOikosPanel';
import { VisualizationOikosPanel } from './VisualizationOikosPanel';
import { EffectsOikosPanel } from './EffectsOikosPanel';
import { LetterboxOikosPanel } from './LetterboxOikosPanel';
import { PerformanceOikosPanel } from './PerformanceOikosPanel';
import { PresetGallery } from './PresetGallery';
import { ModelOikosPanel } from './ModelOikosPanel';
import { AudioOikosPanel } from './AudioOikosPanel';
import { EcosystemOikosPanel } from './EcosystemOikosPanel';

type TabType = 'presets' | 'model' | 'physical' | 'semiotic' | 'resonance' | 'ecosystem' | 'audio' | 'visualization' | 'effects' | 'letterbox' | 'performance';

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
          active={activeTab === 'model'}
          onClick={() => setActiveTab('model')}
          label="🧬 Model"
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
          active={activeTab === 'resonance'}
          onClick={() => setActiveTab('resonance')}
          label="🔗 Resonanz"
        />
        <Tab
          active={activeTab === 'ecosystem'}
          onClick={() => setActiveTab('ecosystem')}
          label="🌿 Ecosystem"
        />
        <Tab
          active={activeTab === 'audio'}
          onClick={() => setActiveTab('audio')}
          label="🎵 Audio"
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
        <Tab
          active={activeTab === 'letterbox'}
          onClick={() => setActiveTab('letterbox')}
          label="🎬 Letterbox"
        />
        <Tab
          active={activeTab === 'performance'}
          onClick={() => setActiveTab('performance')}
          label="⚡ Performance"
        />
      </div>

      <div style={styles.content}>
        {activeTab === 'presets' && <PresetGallery />}
        {activeTab === 'model' && <ModelOikosPanel />}
        {activeTab === 'physical' && <PhysicalOikosPanel />}
        {activeTab === 'semiotic' && <SemioticOikosPanel />}
        {activeTab === 'resonance' && <ResonanceOikosPanel />}
        {activeTab === 'ecosystem' && <EcosystemOikosPanel />}
        {activeTab === 'audio' && <AudioOikosPanel />}
        {activeTab === 'visualization' && <VisualizationOikosPanel />}
        {activeTab === 'effects' && <EffectsOikosPanel />}
        {activeTab === 'letterbox' && <LetterboxOikosPanel />}
        {activeTab === 'performance' && <PerformanceOikosPanel />}
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
    flexWrap: 'wrap',
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
