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
  setRow: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border
  },
  setText: {
    fontSize: typography.body,
    color: colors.textPrimary
  }
})
