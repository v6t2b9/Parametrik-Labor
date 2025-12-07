import { useState, useEffect } from 'react';
import { colors, spacing, typography, effects } from '../design-system';
import { logger } from '../utils/logger';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// Extend Navigator interface for iOS Safari's non-standard 'standalone' property
interface NavigatorWithStandalone extends Navigator {
  standalone?: boolean;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      || (window.navigator as NavigatorWithStandalone).standalone
      || document.referrer.includes('android-app://');

    if (isStandalone) {
      return; // Already installed, don't show prompt
    }

    // Listen for beforeinstallprompt event (Android)
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();

      const installEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(installEvent);

      // Show our custom install prompt after a short delay
      setTimeout(() => {
        // Check if user hasn't dismissed the prompt before
        const dismissed = localStorage.getItem('pwa-install-dismissed');
        if (!dismissed) {
          setShowPrompt(true);
        }
      }, 3000); // Show after 3 seconds
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for successful installation
    window.addEventListener('appinstalled', () => {
      logger.log('PWA installed successfully');
      setShowPrompt(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    logger.log(`User response to install prompt: ${outcome}`);

    // Clear the deferred prompt
    setDeferredPrompt(null);
    setShowPrompt(false);

    // Track analytics if needed
    if (outcome === 'accepted') {
      logger.log('User accepted the install prompt');
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Remember dismissal for this session
    localStorage.setItem('pwa-install-dismissed', 'true');

    // Clear dismissal after 7 days
    setTimeout(() => {
      localStorage.removeItem('pwa-install-dismissed');
    }, 7 * 24 * 60 * 60 * 1000);
  };

  if (!showPrompt || !deferredPrompt) {
    return null;
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.prompt}>
        <div style={styles.iconContainer}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            style={styles.icon}
          >
            <rect width="48" height="48" rx="12" fill={colors.accent.primary} />
            <path
              d="M24 14v16m0 0l-6-6m6 6l6-6M14 32v2a2 2 0 002 2h16a2 2 0 002-2v-2"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div style={styles.content}>
          <h3 style={styles.title}>Install Parametric Explorer</h3>
          <p style={styles.description}>
            Add to your home screen for a faster, app-like experience with offline support.
          </p>
        </div>

        <div style={styles.actions}>
          <button onClick={handleDismiss} style={styles.dismissButton}>
            Not now
          </button>
          <button onClick={handleInstallClick} style={styles.installButton}>
            Install
          </button>
        </div>

        <button
          onClick={handleDismiss}
          style={styles.closeButton}
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    padding: spacing.lg,
    pointerEvents: 'none',
  } as React.CSSProperties,

  prompt: {
    position: 'relative',
    backgroundColor: colors.bg.secondary,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: effects.borderRadius.lg,
    padding: spacing.lg,
    maxWidth: '600px',
    margin: '0 auto',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
    pointerEvents: 'auto',
    display: 'flex',
    gap: spacing.md,
    alignItems: 'flex-start',
    animation: 'slideUp 0.3s ease-out',
  } as React.CSSProperties,

  iconContainer: {
    flexShrink: 0,
  } as React.CSSProperties,

  icon: {
    display: 'block',
  } as React.CSSProperties,

  content: {
    flex: 1,
    minWidth: 0,
  } as React.CSSProperties,

  title: {
    ...typography.h3,
    color: colors.text.primary,
    margin: 0,
    marginBottom: spacing.xs,
    fontWeight: 600,
  } as React.CSSProperties,

  description: {
    ...typography.body,
    color: colors.text.secondary,
    margin: 0,
    lineHeight: 1.5,
  } as React.CSSProperties,

  actions: {
    display: 'flex',
    gap: spacing.sm,
    flexShrink: 0,
  } as React.CSSProperties,

  dismissButton: {
    padding: `${spacing.sm} ${spacing.lg}`,
    backgroundColor: 'transparent',
    color: colors.text.secondary,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: effects.borderRadius.md,
    ...typography.body,
    fontWeight: 600,
    cursor: 'pointer',
    transition: effects.transition.normal,
    whiteSpace: 'nowrap',
  } as React.CSSProperties,

  installButton: {
    padding: `${spacing.sm} ${spacing.xl}`,
    backgroundColor: colors.accent.primary,
    color: '#ffffff',
    border: 'none',
    borderRadius: effects.borderRadius.md,
    ...typography.body,
    fontWeight: 600,
    cursor: 'pointer',
    transition: effects.transition.normal,
    whiteSpace: 'nowrap',
  } as React.CSSProperties,

  closeButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: '24px',
    height: '24px',
    padding: 0,
    backgroundColor: 'transparent',
    color: colors.text.muted,
    border: 'none',
    borderRadius: effects.borderRadius.sm,
    fontSize: '24px',
    lineHeight: 1,
    cursor: 'pointer',
    transition: effects.transition.normal,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as React.CSSProperties,
};
