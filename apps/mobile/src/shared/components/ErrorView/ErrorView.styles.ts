import { StyleSheet } from 'react-native';

import { colors, spacing, typography } from '@shared/styles/StyleConstants';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  message: {
    fontSize: typography.body,
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  retryButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 6,
  },
  retryLabel: {
    color: colors.surface,
    fontSize: typography.body,
    fontWeight: '600',
  },
});
