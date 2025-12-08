import { memo } from 'react';
import type { ReactNode } from 'react';
import { colors, spacing, typography, effects } from '../../design-system';

interface ToggleSectionProps {
  title: string;
  description?: string;
  enabled: boolean;
  onToggle: () => void;
  children?: ReactNode;
  hint?: string;
}

/**
 * Section with integrated toggle button
 * Perfect for enabling/disabling features
 */
export const ToggleSection = memo(function ToggleSection({
  title,
  description,
  enabled,
  onToggle,
  children,
  hint,
}: ToggleSectionProps) {
  return (
    <div style={styles.section}>
      <div style={styles.toggleRow}>
        <h4 style={styles.title}>{title}</h4>
        <button
          onClick={onToggle}
          style={{
            ...styles.toggleButton,
            ...(enabled ? styles.toggleButtonActive : {}),
          }}
          aria-pressed={enabled}
          aria-label={`Toggle ${title}`}
        >
          {enabled ? 'ON' : 'OFF'}
        </button>
      </div>

      {description && <p style={styles.description}>{description}</p>}
      {hint && <p style={styles.hint}>{hint}</p>}

      {children}
    </div>
  );
});

const styles = {
  section: {
    marginBottom: spacing.lg,
  } as React.CSSProperties,
  toggleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  } as React.CSSProperties,
  title: {
    fontSize: '14px',
    fontWeight: 600,
    color: colors.accent.light,
    margin: 0,
  } as React.CSSProperties,
  toggleButton: {
    padding: `6px ${spacing.lg}`,
    backgroundColor: colors.bg.subtle,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: effects.borderRadius.sm,
    color: colors.text.primary,
    fontSize: '11px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: effects.transition.normal,
    minWidth: '60px',
  } as React.CSSProperties,
  toggleButtonActive: {
    backgroundColor: colors.accent.primary,
    borderColor: colors.accent.light,
    color: colors.text.primary,
  } as React.CSSProperties,
  description: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: 0,
    marginBottom: spacing.md,
    lineHeight: 1.4,
  } as React.CSSProperties,
  hint: {
    ...typography.caption,
    color: colors.text.muted,
    backgroundColor: colors.bg.subtle,
    padding: spacing.sm,
    borderRadius: effects.borderRadius.sm,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
    lineHeight: 1.5,
  } as React.CSSProperties,
};
