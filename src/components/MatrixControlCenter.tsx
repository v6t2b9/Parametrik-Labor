import { useState } from 'react';
import { useSimulationStore } from '../store/useSimulationStore';
import { PhysicalOikosPanel } from './PhysicalOikosPanel';
import { SemioticOikosPanel } from './SemioticOikosPanel';
import { TemporalOikosPanel } from './TemporalOikosPanel';
import { ResonanceOikosPanel } from './ResonanceOikosPanel';
import { AudioOikosPanel } from './AudioOikosPanel';
import { VisualsOikosPanel } from './VisualsOikosPanel';
import { PerformanceOikosPanel } from './PerformanceOikosPanel';
import { ModelOikosPanel } from './ModelOikosPanel';
import { EcosystemOikosPanel } from './EcosystemOikosPanel';
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
  { id: 'model', label: 'Model', icon: '🧬' },
  { id: 'ecosystem', label: 'Ecosystem', icon: '🌿' },
  { id: 'physical', label: 'Physikalisch', icon: '🌊' },
  { id: 'semiotic', label: 'Semiotisch', icon: '👁️' },
  { id: 'temporal', label: 'Temporal', icon: '⏱️' },
  { id: 'resonance', label: 'Resonanz', icon: '🔗' },
  { id: 'audio', label: 'Audio', icon: '🎵' },
  { id: 'visuals', label: 'Visuals', icon: '🎨' },
  { id: 'performance', label: 'Performance', icon: '⚡' },
];

export function MatrixControlCenter() {
  const { ui, setActiveSpeciesScope, setActiveOikosTab } = useSimulationStore();
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
    : OIKOS_TABS.filter(t => !['presets', 'model', 'ecosystem', 'visuals', 'performance'].includes(t.id));

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>🎛️ Matrix Parameter Control</h2>
      </div>

      {/* Species Scope Tabs Row (Tabs + Info inline) */}
      <div style={styles.speciesTabsRow}>
        {/* Species Tabs */}
        <div style={styles.speciesTabs}>
          {SPECIES_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveSpeciesScope(tab.id);
                // Switch to appropriate tab if current is not available
                if (tab.id !== 'universal' && ['presets', 'model', 'ecosystem', 'visuals', 'performance'].includes(ui.activeOikosTab)) {
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

        {/* Scope Info inline (rechts) */}
        {!isMobile && (
          <div style={{
            ...styles.scopeInfoInline,
            borderLeft: `3px solid ${activeSpeciesTab.color}`,
          }}>
            <span style={styles.scopeIcon}>{activeSpeciesTab.icon}</span>
            <span style={styles.scopeTextInline}>
              <strong>{activeSpeciesTab.label} Scope</strong> · {' '}
              {ui.activeSpeciesScope === 'universal'
                ? 'Cross-species baseline (fallback for all)'
                : `Species-specific overrides for ${activeSpeciesTab.label}`}
            </span>
          </div>
        )}
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

      {/* Scrollable Content Area */}
      <div style={styles.content}>
        {ui.activeOikosTab === 'presets' && <PresetGallery />}
        {ui.activeOikosTab === 'model' && <ModelOikosPanel />}
        {ui.activeOikosTab === 'ecosystem' && <EcosystemOikosPanel />}
        {ui.activeOikosTab === 'physical' && <PhysicalOikosPanel />}
        {ui.activeOikosTab === 'semiotic' && <SemioticOikosPanel />}
        {ui.activeOikosTab === 'temporal' && <TemporalOikosPanel />}
        {ui.activeOikosTab === 'resonance' && <ResonanceOikosPanel />}
        {ui.activeOikosTab === 'audio' && <AudioOikosPanel />}
        {ui.activeOikosTab === 'visuals' && <VisualsOikosPanel />}
        {ui.activeOikosTab === 'performance' && <PerformanceOikosPanel />}
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#13141f',
    borderRadius: '8px',
    border: '1px solid #2a2b3a',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  } as React.CSSProperties,
  header: {
    padding: '10px 16px',
    borderBottom: '1px solid #2a2b3a',
  } as React.CSSProperties,
  title: {
    fontSize: '15px',
    color: '#e0e0e0',
    fontWeight: 700,
    margin: 0,
  } as React.CSSProperties,

  // Species Tabs Row (contains tabs + inline info)
  speciesTabsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    padding: '8px 16px',
    borderBottom: '1px solid #2a2b3a',
    overflowX: 'auto',
    scrollbarWidth: 'thin',
  } as React.CSSProperties,

  // Species Tabs
  speciesTabs: {
    display: 'flex',
    gap: '6px',
    flex: '0 0 auto', // Don't grow, don't shrink
  } as React.CSSProperties,
  speciesTab: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    backgroundColor: 'transparent',
    color: '#a0a0b0',
    border: 'none',
    borderRadius: '6px 6px 0 0',
    fontSize: '13px',
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
    fontSize: '16px',
  } as React.CSSProperties,
  speciesLabel: {
    fontSize: '12px',
  } as React.CSSProperties,

  // Scope Info inline (rechts neben Tabs)
  scopeInfoInline: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 12px',
    paddingLeft: '10px',
    borderRadius: '4px',
    flex: '1 1 auto', // Can grow and shrink
    minWidth: 0, // Allow text truncation
  } as React.CSSProperties,
  scopeIcon: {
    fontSize: '16px',
    flex: '0 0 auto',
  } as React.CSSProperties,
  scopeTextInline: {
    fontSize: '11px',
    color: '#a0a0b0',
    lineHeight: 1.3,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  } as React.CSSProperties,

  // Oikos Tabs (Horizontal Axis)
  oikosTabs: {
    display: 'flex',
    gap: '6px',
    padding: '8px 16px',
    borderBottom: '2px solid #2a2b3a',
    overflowX: 'auto',
    scrollbarWidth: 'thin',
    WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
  } as React.CSSProperties,
  oikosTab: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    backgroundColor: '#13141f',
    color: '#a0a0b0',
    border: '1px solid #2a2b3a',
    borderRadius: '6px',
    fontSize: '12px',
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
    fontSize: '14px',
  } as React.CSSProperties,

  // Content
  content: {
    padding: '16px',
    maxHeight: '400px',
    overflowY: 'auto',
    flex: 1,
  } as React.CSSProperties,
};
