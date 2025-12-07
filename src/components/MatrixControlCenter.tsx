import { useState, useEffect } from 'react';
import { useSimulationStore } from '../store/useSimulationStore';
import { PhysicalOikosPanel } from './PhysicalOikosPanel';
import { SemioticOikosPanel } from './SemioticOikosPanel';
import { ResonanceOikosPanel } from './ResonanceOikosPanel';
import { VisualsOikosPanel } from './VisualsOikosPanel';
import { PerformanceOikosPanel } from './PerformanceOikosPanel';
import { PresetGallery } from './PresetGallery';
import type { SpeciesScope, OikosTab } from '../types';
import { colors, spacing, typography, effects } from '../design-system';

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
  { id: 'resonance', label: 'Resonanz', icon: '🔗' },
  { id: 'visuals', label: 'Visuals', icon: '🎨' },
  { id: 'performance', label: 'Performance', icon: '⚡' },
];

export function MatrixControlCenter() {
  const ui = useSimulationStore((state) => state.ui);
  const setActiveSpeciesScope = useSimulationStore((state) => state.setActiveSpeciesScope);
  const setActiveOikosTab = useSimulationStore((state) => state.setActiveOikosTab);
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);

  // Listen to window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeSpeciesTab = SPECIES_TABS.find(t => t.id === ui.activeSpeciesScope) || SPECIES_TABS[0];
  const activeOikosTabId = ui.activeOikosTab === 'presets' ? 'presets' : ui.activeOikosTab;

  // For species-specific tabs, filter out presets and global tabs
  const availableOikosTabs = ui.activeSpeciesScope === 'universal'
    ? OIKOS_TABS
    : OIKOS_TABS.filter(t => !['presets', 'visuals', 'performance'].includes(t.id));

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>Matrix Parameter Control</h2>
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
                if (tab.id !== 'universal' && ['presets', 'visuals', 'performance'].includes(ui.activeOikosTab)) {
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
        {ui.activeOikosTab === 'physical' && <PhysicalOikosPanel />}
        {ui.activeOikosTab === 'semiotic' && <SemioticOikosPanel />}
        {ui.activeOikosTab === 'resonance' && <ResonanceOikosPanel />}
        {ui.activeOikosTab === 'visuals' && <VisualsOikosPanel />}
        {ui.activeOikosTab === 'performance' && <PerformanceOikosPanel />}
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: colors.bg.secondary,
    borderRadius: effects.borderRadius.lg,
    border: `1px solid ${colors.border.primary}`,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  } as React.CSSProperties,
  header: {
    padding: `${spacing.md} ${spacing.lg}`,
    borderBottom: `1px solid ${colors.border.primary}`,
  } as React.CSSProperties,
  title: {
    ...typography.h2,
    color: colors.text.primary,
    margin: 0,
  } as React.CSSProperties,

  // Species Tabs Row (contains tabs + inline info)
  speciesTabsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.lg,
    padding: `${spacing.sm} ${spacing.lg}`,
    borderBottom: `1px solid ${colors.border.primary}`,
    overflowX: 'auto',
    scrollbarWidth: 'thin',
  } as React.CSSProperties,

  // Species Tabs
  speciesTabs: {
    display: 'flex',
    gap: spacing.sm,
    flex: '0 0 auto', // Don't grow, don't shrink
  } as React.CSSProperties,
  speciesTab: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    padding: `${spacing.sm} ${spacing.md}`,
    backgroundColor: 'transparent',
    color: colors.text.secondary,
    border: 'none',
    borderRadius: `${effects.borderRadius.md} ${effects.borderRadius.md} 0 0`,
    ...typography.body,
    fontWeight: 600,
    cursor: 'pointer',
    transition: effects.transition.normal,
    whiteSpace: 'nowrap',
    minWidth: '44px', // Touch-friendly minimum
  } as React.CSSProperties,
  speciesTabActive: {
    backgroundColor: colors.bg.secondary,
    color: colors.text.primary,
    borderBottom: `3px solid ${colors.accent.primary}`,
  } as React.CSSProperties,
  speciesIcon: {
    fontSize: '16px',
  } as React.CSSProperties,
  speciesLabel: {
    ...typography.caption,
  } as React.CSSProperties,

  // Scope Info inline (rechts neben Tabs)
  scopeInfoInline: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    padding: `${spacing.sm} ${spacing.md}`,
    paddingLeft: spacing.sm,
    borderRadius: effects.borderRadius.sm,
    flex: '1 1 auto', // Can grow and shrink
    minWidth: 0, // Allow text truncation
  } as React.CSSProperties,
  scopeIcon: {
    fontSize: '16px',
    flex: '0 0 auto',
  } as React.CSSProperties,
  scopeTextInline: {
    ...typography.caption,
    color: colors.text.secondary,
    lineHeight: 1.3,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  } as React.CSSProperties,

  // Oikos Tabs (Horizontal Axis)
  oikosTabs: {
    display: 'flex',
    gap: spacing.sm,
    padding: `${spacing.sm} ${spacing.lg}`,
    borderBottom: `1px solid ${colors.border.primary}`,
    overflowX: 'auto',
    scrollbarWidth: 'thin',
    WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
  } as React.CSSProperties,
  oikosTab: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    padding: `${spacing.sm} ${spacing.md}`,
    backgroundColor: colors.bg.secondary,
    color: colors.text.secondary,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: effects.borderRadius.md,
    ...typography.caption,
    fontWeight: 600,
    cursor: 'pointer',
    transition: effects.transition.normal,
    whiteSpace: 'nowrap',
    minWidth: '44px', // Touch-friendly
  } as React.CSSProperties,
  oikosTabActive: {
    backgroundColor: colors.bg.tertiary,
    color: colors.accent.primary,
    borderColor: colors.accent.primary,
  } as React.CSSProperties,
  tabIcon: {
    fontSize: '14px',
  } as React.CSSProperties,

  // Content
  content: {
    padding: spacing.lg,
    maxHeight: '400px',
    overflowY: 'auto',
    flex: 1,
  } as React.CSSProperties,
};
