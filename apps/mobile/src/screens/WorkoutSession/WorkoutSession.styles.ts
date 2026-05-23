import { StyleSheet } from 'react-native'

import { colors, radii, spacing, typography } from '@shared/styles/StyleConstants'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg
  },
  title: {
    fontSize: typography.heading,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md
  },
  subtitle: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: radii.md,
    paddingVertical: spacing.md,
    alignItems: 'center'
  },
  buttonText: {
    color: colors.textInverse,
    fontWeight: '600',
    fontSize: typography.bodyLarge
  },
  error: {
    color: colors.error,
    marginBottom: spacing.md
  }
})
