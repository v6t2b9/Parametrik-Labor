import { memo } from 'react';
import { colors, spacing } from '../../design-system';

/**
 * Simple divider component for visual separation
 */
export const Divider = memo(function Divider() {
  return <div style={styles.divider} role="separator" aria-hidden="true" />;
});

const styles = {
  divider: {
    height: '1px',
    backgroundColor: colors.border.primary,
    margin: `${spacing.xxl} 0`,
  } as React.CSSProperties,
};
