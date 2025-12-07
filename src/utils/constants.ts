/**
 * Application Constants
 *
 * Centralized configuration values to avoid magic numbers throughout the codebase
 */

/**
 * Simulation Configuration
 */
export const SIMULATION = {
  /** Default grid size for simulation */
  DEFAULT_GRID_SIZE: 400,

  /** Cleanup delay for downloads and DOM operations (ms) */
  CLEANUP_DELAY_MS: 100,

  /** Delay before keyframe download for iOS video (ms) */
  IOS_KEYFRAME_DELAY_MS: 200,
} as const;

/**
 * Performance Optimization Thresholds
 */
export const PERFORMANCE = {
  /** FPS ratio thresholds for auto-optimization */
  FPS_THRESHOLD: {
    CRITICAL: 0.5,    // < 50% of target FPS
    VERY_LOW: 0.7,    // < 70% of target FPS
    LOW: 0.9,         // < 90% of target FPS
    GOOD: 1.2,        // > 120% of target FPS
  },

  /** Optimization level adjustments */
  OPT_LEVEL_STEP: {
    CRITICAL_JUMP: 3,
    INCREASE: 2,
    NORMAL_INCREASE: 1,
    DECREASE: 1,
  },

  /** Maximum optimization level */
  MAX_OPT_LEVEL: 10,

  /** Optimization factors for quality reduction */
  OPT_FACTOR: {
    WAVE_DISTORTION: 1.0,
    CHROMATIC_ABERRATION: 1.0,
    BLOOM: 0.7,
    BLUR: 0.5,
    MOTION_BLUR: 0.6,
    DIFFUSION_MULTIPLIER: 5,
    AGENT_REDUCTION: 0.85,
  },

  /** Agent count limits */
  AGENT_COUNT: {
    MINIMUM: 150,
    REDUCTION_THRESHOLD: 5,
    CHANGE_THRESHOLD: 50,
  },
} as const;

/**
 * Video Recording Quality Settings
 */
export const VIDEO_QUALITY = {
  /** Video bitrates (bits per second) */
  BITRATE: {
    STANDARD: 8_000_000,   // 8 Mbps
    HIGH: 12_000_000,      // 12 Mbps
    VERY_HIGH: 18_000_000, // 18 Mbps
  },

  /** GIF quality settings (1-10, lower = better) */
  GIF_QUALITY: {
    STANDARD: 10,
    HIGH: 5,
    VERY_HIGH: 2,
  },

  /** JPEG quality for keyframes (0-1) */
  KEYFRAME_QUALITY: 0.95,
} as const;
