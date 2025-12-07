import { memo } from 'react';
import type { ReactNode } from 'react';
import { colors, spacing, effects } from '../../design-system';

interface InfoBoxProps {
  children: ReactNode;
  variant?: 'info' | 'success' | 'warning';
}

/**
 * Info/hint box for displaying helpful information
 * Used throughout the app for tips, examples, and documentation
 */
export const InfoBox = memo(function InfoBox({ children, variant = 'info' }: InfoBoxProps) {
  return (
    <div style={{ ...styles.container, ...getVariantStyle(variant) }}>
      {children}
    </div>
  );
});

const getVariantStyle = (variant: InfoBoxProps['variant']) => {
  switch (variant) {
    case 'success':
      return { borderLeft: '2px solid #4ecdc4' };
    case 'warning':
      return { borderLeft: '2px solid #f39c12' };
    default:
      return { borderLeft: '2px solid #7d5dbd' };
  }
};

const styles = {
  container: {
    padding: spacing.md,
    backgroundColor: colors.bg.subtle,
    borderRadius: effects.borderRadius.md,
    border: '1px solid #3d2d5d',
    marginTop: spacing.lg,
    fontSize: '11px',
    color: colors.text.secondary,
    lineHeight: '1.6',
  } as React.CSSProperties,
};
