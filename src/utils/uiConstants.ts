/**
 * UI Component Constants
 * Centralized constants for UI components to improve maintainability
 */

// ============================================================================
// TIMING CONSTANTS
// ============================================================================

/**
 * PWA Install Prompt timing
 */
export const INSTALL_PROMPT = {
  /** Delay before showing install prompt (ms) */
  SHOW_DELAY: 3000,
  /** Duration to remember dismissal (ms) - 7 days */
  DISMISSAL_DURATION: 7 * 24 * 60 * 60 * 1000,
} as const;

/**
 * Animation and frame timing
 */
export const TIMING = {
  /** Target frames per second */
  TARGET_FPS: 60,
  /** Frame time in milliseconds (1000ms / 60fps) */
  FRAME_TIME: 1000 / 60,
} as const;

// ============================================================================
// CANVAS CONSTANTS
// ============================================================================

/**
 * Canvas rendering limits and performance settings
 */
export const CANVAS = {
  /** Maximum number of cached canvas elements in pool */
  MAX_POOL_SIZE: 20,
  /** Maximum device pixel ratio (prevents excessive memory use on high-DPI displays) */
  MAX_DEVICE_PIXEL_RATIO: 2,
  /** Maximum canvas dimension in pixels (prevents memory issues) */
  MAX_DIMENSION: 2400,
  /** FPS history buffer size for performance tracking */
  FPS_HISTORY_SIZE: 60,
} as const;

// ============================================================================
// LAYOUT CONSTANTS
// ============================================================================

/**
 * Responsive breakpoints
 */
export const BREAKPOINTS = {
  /** Mobile breakpoint width in pixels */
  MOBILE: 768,
  /** Tablet breakpoint width in pixels */
  TABLET: 1024,
  /** Desktop breakpoint width in pixels */
  DESKTOP: 1280,
} as const;
