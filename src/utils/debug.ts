/**
 * Debug Logging Utility
 *
 * Provides controlled logging that only outputs in development mode.
 * This prevents console spam in production and allows for better performance.
 */

// Only enable debug logging in development mode
const DEBUG = import.meta.env.DEV;

/**
 * Debug logger with category prefix
 * Only logs in development mode
 */
export const debug = {
  /**
   * General log (replacement for console.log)
   */
  log: (category: string, ...args: unknown[]) => {
    if (DEBUG) {
      console.log(`[${category}]`, ...args);
    }
  },

  /**
   * Warning log (replacement for console.warn)
   */
  warn: (category: string, ...args: unknown[]) => {
    if (DEBUG) {
      console.warn(`[${category}]`, ...args);
    }
  },

  /**
   * Error log (always shown, even in production)
   */
  error: (category: string, ...args: unknown[]) => {
    console.error(`[${category}]`, ...args);
  },

  /**
   * Performance timing helper
   */
  time: (label: string) => {
    if (DEBUG) {
      console.time(`[Perf] ${label}`);
    }
  },

  timeEnd: (label: string) => {
    if (DEBUG) {
      console.timeEnd(`[Perf] ${label}`);
    }
  },
};

/**
 * Check if debug mode is enabled
 */
export const isDebugMode = (): boolean => DEBUG;
