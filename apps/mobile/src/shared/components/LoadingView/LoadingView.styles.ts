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
    marginTop: spacing.md,
    fontSize: typography.body,
    color: colors.textSecondary,
  },
});
