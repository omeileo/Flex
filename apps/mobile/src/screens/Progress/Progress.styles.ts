import { StyleSheet } from 'react-native'

import { colors, spacing, typography } from '@shared/styles/StyleConstants'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  title: {
    fontSize: typography.heading,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  message: {
    fontSize: typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
})
