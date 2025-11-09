import { useState } from 'react';
import { useSimulationStore } from '../store/useSimulationStore';
import { PhysicalOikosPanel } from './PhysicalOikosPanel';
import { SemioticOikosPanel } from './SemioticOikosPanel';
import { TemporalOikosPanel } from './TemporalOikosPanel';
import { ResonanceOikosPanel } from './ResonanceOikosPanel';
import { VisualizationOikosPanel } from './VisualizationOikosPanel';
import { EffectsOikosPanel } from './EffectsOikosPanel';
import { PerformanceOikosPanel } from './PerformanceOikosPanel';
import { PresetGallery } from './PresetGallery';
import type { SpeciesScope, OikosTab } from '../types';

// Mobile breakpoint
const MOBILE_BREAKPOINT = 768;

interface SpeciesTabDef {
  id: SpeciesScope;
  label: string;
  icon: string;
  color: string;
}

interface OikosTabDef {
  id: OikosTab;
  label: string;
  icon: string;
}

const SPECIES_TABS: SpeciesTabDef[] = [
  { id: 'universal', label: 'Universal', icon: '🌍', color: '#7d5dbd' },
  { id: 'red', label: 'Red', icon: '🔴', color: '#ff5050' },
  { id: 'green', label: 'Green', icon: '🟢', color: '#50ff50' },
  { id: 'blue', label: 'Blue', icon: '🔵', color: '#5096ff' },
];

const OIKOS_TABS: OikosTabDef[] = [
  { id: 'presets', label: 'Presets', icon: '🎯' },
  { id: 'physical', label: 'Physikalisch', icon: '🌊' },
  { id: 'semiotic', label: 'Semiotisch', icon: '👁️' },
  { id: 'temporal', label: 'Temporal', icon: '⏱️' },
  { id: 'resonance', label: 'Resonanz', icon: '🔗' },
  { id: 'visualization', label: 'Visualisierung', icon: '🎨' },
  { id: 'effects', label: 'Effects', icon: '✨' },
  { id: 'performance', label: 'Performance', icon: '⚡' },
];

export function MatrixControlCenter() {
  const { reset, ui, setActiveSpeciesScope, setActiveOikosTab } = useSimulationStore();
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);

  // Listen to window resize
  useState(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  const activeSpeciesTab = SPECIES_TABS.find(t => t.id === ui.activeSpeciesScope) || SPECIES_TABS[0];
  const activeOikosTabId = ui.activeOikosTab === 'presets' ? 'presets' : ui.activeOikosTab;

  // For species-specific tabs, filter out presets and global tabs
  const availableOikosTabs = ui.activeSpeciesScope === 'universal'
    ? OIKOS_TABS
    : OIKOS_TABS.filter(t => !['presets', 'visualization', 'effects', 'performance'].includes(t.id));

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>🎛️ Matrix Parameter Control</h2>
        <button onClick={reset} style={styles.resetButton}>
          🔄 Reset
        </button>
      </div>

      {/* Species Scope Tabs (Vertical Axis) */}
      <div style={styles.speciesTabs}>
        {SPECIES_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveSpeciesScope(tab.id);
              // Switch to appropriate tab if current is not available
              if (tab.id !== 'universal' && ['presets', 'visualization', 'effects', 'performance'].includes(ui.activeOikosTab)) {
                setActiveOikosTab('physical');
              }
            }}
            style={{
              ...styles.speciesTab,
              ...(ui.activeSpeciesScope === tab.id ? {
                ...styles.speciesTabActive,
                borderBottomColor: tab.color,
              } : {}),
            }}
          >
            <span style={styles.speciesIcon}>{tab.icon}</span>
            {!isMobile && <span style={styles.speciesLabel}>{tab.label}</span>}
          </button>
        ))}
      </div>

      {/* Species Scope Info */}
      <div style={{
        ...styles.scopeInfo,
        backgroundColor: activeSpeciesTab.color + '11',
        borderLeft: `3px solid ${activeSpeciesTab.color}`,
      }}>
        <span style={styles.scopeIcon}>{activeSpeciesTab.icon}</span>
        <div>
          <div style={styles.scopeTitle}>{activeSpeciesTab.label} Scope</div>
          <div style={styles.scopeDesc}>
            {ui.activeSpeciesScope === 'universal'
              ? 'Cross-species baseline parameters (fallback for all species)'
              : `Species-specific overrides for ${activeSpeciesTab.label} agents`}
          </div>
        </div>
      </div>

      {/* Oikos Tabs (Horizontal Axis) */}
      <div style={styles.oikosTabs}>
        {availableOikosTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveOikosTab(tab.id)}
            style={{
              ...styles.oikosTab,
              ...(activeOikosTabId === tab.id ? styles.oikosTabActive : {}),
            }}
          >
            <span style={styles.tabIcon}>{tab.icon}</span>
            {!isMobile && <span>{tab.label}</span>}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div style={styles.content}>
        {ui.activeOikosTab === 'presets' && <PresetGallery />}
        {ui.activeOikosTab === 'physical' && <PhysicalOikosPanel />}
        {ui.activeOikosTab === 'semiotic' && <SemioticOikosPanel />}
        {ui.activeOikosTab === 'temporal' && <TemporalOikosPanel />}
        {ui.activeOikosTab === 'resonance' && <ResonanceOikosPanel />}
        {ui.activeOikosTab === 'visualization' && <VisualizationOikosPanel />}
        {ui.activeOikosTab === 'effects' && <EffectsOikosPanel />}
        {ui.activeOikosTab === 'performance' && <PerformanceOikosPanel />}
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#0a0a15',
    borderRadius: '8px',
    overflow: 'hidden',
  } as React.CSSProperties,
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    borderBottom: '2px solid #2a2b3a',
  } as React.CSSProperties,
  title: {
    fontSize: '20px',
    color: '#e0e0e0',
    fontWeight: 700,
    margin: 0,
  } as React.CSSProperties,
  resetButton: {
    padding: '8px 16px',
    backgroundColor: '#2a2b3a',
    color: '#e0e0e0',
    border: 'none',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  } as React.CSSProperties,

  // Species Tabs (Vertical Axis)
  speciesTabs: {
    display: 'flex',
    gap: '6px',
    padding: '12px 12px 0 12px',
    borderBottom: '1px solid #1a1a25',
    overflowX: 'auto',
  } as React.CSSProperties,
  speciesTab: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'transparent',
    color: '#a0a0b0',
    border: 'none',
    borderRadius: '8px 8px 0 0',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
    minWidth: '44px', // Touch-friendly minimum
  } as React.CSSProperties,
  speciesTabActive: {
    backgroundColor: '#13141f',
    color: '#e0e0e0',
    borderBottom: '3px solid #7d5dbd',
  } as React.CSSProperties,
  speciesIcon: {
    fontSize: '18px',
  } as React.CSSProperties,
  speciesLabel: {
    fontSize: '13px',
  } as React.CSSProperties,

  // Scope Info
  scopeInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    margin: '12px 12px 0 12px',
    borderRadius: '6px',
  } as React.CSSProperties,
  scopeIcon: {
    fontSize: '24px',
  } as React.CSSProperties,
  scopeTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#e0e0e0',
    marginBottom: '2px',
  } as React.CSSProperties,
  scopeDesc: {
    fontSize: '11px',
    color: '#a0a0b0',
    lineHeight: 1.4,
  } as React.CSSProperties,

  // Oikos Tabs (Horizontal Axis)
  oikosTabs: {
    display: 'flex',
    gap: '6px',
    padding: '12px',
    borderBottom: '2px solid #2a2b3a',
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
  } as React.CSSProperties,
  oikosTab: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 14px',
    backgroundColor: '#13141f',
    color: '#a0a0b0',
    border: '1px solid #2a2b3a',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
    minWidth: '44px', // Touch-friendly
  } as React.CSSProperties,
  oikosTabActive: {
    backgroundColor: '#1a1b2a',
    color: '#7d5dbd',
    borderColor: '#7d5dbd',
  } as React.CSSProperties,
  tabIcon: {
    fontSize: '16px',
  } as React.CSSProperties,

  // Content
  content: {
    padding: '16px',
    minHeight: '350px',
  } as React.CSSProperties,
};
