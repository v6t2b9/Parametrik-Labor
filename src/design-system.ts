/**
 * Unified Design System for Parametric Space Explorer
 *
 * This file centralizes all design tokens to ensure consistency across the UI.
 * Following best practices for scalable, maintainable design systems.
 */

// ============================================================================
// TYPOGRAPHY
// ============================================================================

/**
 * Type Scale (Limited to 6 sizes for visual harmony)
 * Based on a modular scale for better readability and hierarchy
 */
export const typography = {
  // Display text (page titles, hero sections)
  display: {
    fontSize: '28px',
    fontWeight: 700,
    lineHeight: 1.2,
  },

  // Main headings (section titles)
  h1: {
    fontSize: '20px',
    fontWeight: 600,
    lineHeight: 1.3,
  },

  // Subsection headings
  h2: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: 1.4,
  },

  // Card titles, labels
  h3: {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: 1.4,
  },

  // Body text, descriptions
  body: {
    fontSize: '13px',
    fontWeight: 400,
    lineHeight: 1.5,
  },

  // Small text, helper text
  caption: {
    fontSize: '11px',
    fontWeight: 400,
    lineHeight: 1.4,
  },
} as const;

// ============================================================================
// SPACING
// ============================================================================

/**
 * Spacing Scale (8px base unit for consistent rhythm)
 * Use these values for margin, padding, and gaps
 */
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  xxl: '24px',
  xxxl: '32px',
  huge: '40px',
} as const;

// ============================================================================
// COLORS
// ============================================================================

/**
 * Color Palette (Simplified and semantic)
 * Using a consistent dark theme with accent colors
 */
export const colors = {
  // Background colors
  bg: {
    primary: '#0a0a15',      // Main app background
    secondary: '#13141f',    // Panel backgrounds
    tertiary: '#1a1b2a',     // Elevated surfaces
    subtle: '#0a0a15',       // Very dark elements
  },

  // Border colors
  border: {
    primary: '#2a2b3a',      // Standard borders
    accent: '#7d5dbd',       // Active/highlighted borders
    subtle: '#1a1b25',       // Very subtle dividers
  },

  // Text colors
  text: {
    primary: '#e0e0e0',      // Main text
    secondary: '#a0a0b0',    // Secondary text
    tertiary: '#6a6a7a',     // Disabled/subtle text
    muted: '#7d7d8d',        // Even more muted
  },

  // Accent colors (primary purple theme)
  accent: {
    primary: '#7d5dbd',      // Primary accent (purple)
    hover: '#9d7dd4',        // Hover state
    light: '#9d7dd4',        // Light variant
    dark: '#5d3d9d',         // Dark variant
  },

  // Semantic colors
  semantic: {
    success: '#5dbd7d',      // Green
    warning: '#bd9d5d',      // Yellow/Orange
    error: '#bd5d5d',        // Red
    info: '#5d9dbd',         // Blue
  },

  // Species colors (for tabs/indicators)
  species: {
    universal: '#7d5dbd',
    red: '#ff5050',
    green: '#50ff50',
    blue: '#5096ff',
  },
} as const;

// ============================================================================
// EFFECTS
// ============================================================================

/**
 * Shadow and effects (Minimal and purposeful)
 */
export const effects = {
  shadow: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.2)',
    md: '0 4px 12px rgba(0, 0, 0, 0.3)',
    lg: '0 6px 16px rgba(0, 0, 0, 0.4)',
  },

  borderRadius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    full: '50%',
  },

  transition: {
    fast: 'all 0.15s ease',
    normal: 'all 0.2s ease',
    slow: 'all 0.3s ease',
  },
} as const;

// ============================================================================
// COMPONENT STYLES
// ============================================================================

/**
 * Reusable component style builders
 */
export const components = {
  // Standard panel/card container
  panel: {
    backgroundColor: colors.bg.secondary,
    borderRadius: effects.borderRadius.md,
    border: `1px solid ${colors.border.primary}`,
    padding: spacing.lg,
  },

  // Section headers (consistent across all panels)
  sectionHeader: {
    marginBottom: spacing.lg,
    paddingBottom: spacing.md,
    borderBottom: `1px solid ${colors.border.primary}`,
  },

  // Button base styles
  button: {
    padding: `${spacing.md} ${spacing.lg}`,
    backgroundColor: colors.accent.primary,
    color: colors.text.primary,
    border: 'none',
    borderRadius: effects.borderRadius.md,
    fontSize: typography.body.fontSize,
    fontWeight: 600,
    cursor: 'pointer',
    transition: effects.transition.normal,
  },

  // Input field base styles
  input: {
    padding: `${spacing.sm} ${spacing.md}`,
    backgroundColor: colors.bg.secondary,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: effects.borderRadius.md,
    color: colors.text.primary,
    fontSize: typography.body.fontSize,
  },
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Creates a consistent header style object
 */
export function createHeaderStyle(level: 'display' | 'h1' | 'h2' | 'h3' = 'h2') {
  return {
    ...typography[level],
    color: colors.text.primary,
    margin: 0,
  } as React.CSSProperties;
}

/**
 * Creates a consistent subtitle/description style
 */
export function createSubtitleStyle() {
  return {
    ...typography.caption,
    color: colors.text.secondary,
    margin: 0,
  } as React.CSSProperties;
}

/**
 * Creates a consistent section container style
 */
export function createSectionStyle() {
  return {
    marginBottom: spacing.xl,
  } as React.CSSProperties;
}
