/**
 * Browser-specific API extensions for fullscreen functionality
 * These interfaces extend the DOM types to include vendor-prefixed methods
 */

interface Document {
  // Webkit (Safari)
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void>;

  // Mozilla (Firefox)
  mozFullScreenElement?: Element | null;
  mozCancelFullScreen?: () => Promise<void>;

  // Microsoft (IE/Edge legacy)
  msFullscreenElement?: Element | null;
  msExitFullscreen?: () => Promise<void>;
}

interface HTMLElement {
  // Webkit (Safari)
  webkitRequestFullscreen?: () => Promise<void>;

  // Mozilla (Firefox)
  mozRequestFullScreen?: () => Promise<void>;

  // Microsoft (IE/Edge legacy)
  msRequestFullscreen?: () => Promise<void>;
}

interface Window {
  // Webkit AudioContext
  webkitAudioContext?: typeof AudioContext;
}
