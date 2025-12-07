import { memo } from 'react';
import type { ReactNode } from 'react';
import { colors, spacing, typography } from '../../design-system';

interface SectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Reusable section component for consistent layout
 */
export const Section = memo(function Section({ title, description, children, className }: SectionProps) {
  return (
    <section style={styles.section} className={className}>
      <header style={styles.header}>
        <h4 style={styles.title}>{title}</h4>
        {description && <p style={styles.description}>{description}</p>}
      </header>
      <div style={styles.content}>{children}</div>
    </section>
  );
});

interface SubsectionProps {
  title: string;
  children: ReactNode;
}

/**
 * Reusable subsection component for nested sections
 */
export const Subsection = memo(function Subsection({ title, children }: SubsectionProps) {
  return (
    <div style={styles.subsection}>
      <h5 style={styles.subsectionTitle}>{title}</h5>
      {children}
    </div>
  );
});

const styles = {
  section: {
    marginBottom: spacing.xxl,
  } as React.CSSProperties,
  header: {
    marginBottom: spacing.md,
  } as React.CSSProperties,
  title: {
    fontSize: '15px',
    color: colors.accent.light,
    marginBottom: spacing.sm,
    fontWeight: 600,
    margin: `0 0 ${spacing.sm} 0`,
  } as React.CSSProperties,
  description: {
    ...typography.caption,
    color: colors.text.muted,
    marginBottom: 0,
    lineHeight: '1.4',
  } as React.CSSProperties,
  content: {
    // Content wrapper
  } as React.CSSProperties,
  subsection: {
    marginTop: spacing.xl,
  } as React.CSSProperties,
  subsectionTitle: {
    ...typography.h3,
    color: colors.text.secondary,
    marginBottom: spacing.md,
    fontWeight: 600,
    margin: `0 0 ${spacing.md} 0`,
  } as React.CSSProperties,
};
