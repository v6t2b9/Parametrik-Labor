/**
 * ErrorBoundary - Catches React errors and prevents full app crash
 * Displays user-friendly error message with recovery options
 */

import React, { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so next render shows fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    // Optional: Send error to logging service
    // Example: logErrorToService(error, errorInfo);
  }

  handleReload = (): void => {
    window.location.reload();
  };

  handleResetState = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <div style={styles.errorBox}>
            <h1 style={styles.title}>⚠️ Something went wrong</h1>
            <p style={styles.message}>
              The simulation encountered an unexpected error and couldn't continue.
            </p>

            <div style={styles.buttonGroup}>
              <button onClick={this.handleReload} style={styles.primaryButton}>
                🔄 Reload Page
              </button>
              <button onClick={this.handleResetState} style={styles.secondaryButton}>
                ↩️ Try Again
              </button>
            </div>

            {/* Show error details in development */}
            {import.meta.env.DEV && this.state.error && (
              <details style={styles.details}>
                <summary style={styles.summary}>Error Details (Development Only)</summary>
                <pre style={styles.errorText}>
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <p style={styles.helpText}>
              If this problem persists, try clearing your browser cache or using a different browser.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#0a0a0a',
    color: '#ffffff',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    padding: '20px',
  },
  errorBox: {
    maxWidth: '600px',
    width: '100%',
    padding: '40px',
    backgroundColor: '#1a1a1a',
    borderRadius: '12px',
    border: '2px solid #ff4444',
    boxShadow: '0 8px 32px rgba(255, 68, 68, 0.2)',
  },
  title: {
    fontSize: '32px',
    marginBottom: '16px',
    color: '#ff6666',
  },
  message: {
    fontSize: '18px',
    lineHeight: '1.6',
    marginBottom: '32px',
    color: '#cccccc',
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    marginBottom: '32px',
    flexWrap: 'wrap',
  },
  primaryButton: {
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  secondaryButton: {
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#333333',
    color: 'white',
    border: '2px solid #666666',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  details: {
    marginTop: '24px',
    padding: '16px',
    backgroundColor: '#0a0a0a',
    borderRadius: '8px',
    border: '1px solid #333333',
  },
  summary: {
    cursor: 'pointer',
    fontWeight: 'bold',
    marginBottom: '12px',
    color: '#ff9999',
  },
  errorText: {
    fontSize: '12px',
    lineHeight: '1.4',
    color: '#ff9999',
    overflow: 'auto',
    maxHeight: '300px',
  },
  helpText: {
    fontSize: '14px',
    color: '#888888',
    marginTop: '24px',
    textAlign: 'center',
  },
};
