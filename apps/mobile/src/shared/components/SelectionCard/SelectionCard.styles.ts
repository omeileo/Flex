import { StyleSheet } from 'react-native'

import { colors, fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

export default StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    minHeight: 44,
    justifyContent: 'center'
  },
  cardSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accentMuted
  },
  label: {
    fontSize: typography.body,
    fontWeight: fontWeights.medium,
    color: colors.textPrimary
  },
  labelSelected: {
    fontWeight: fontWeights.semibold
  },
  description: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs
  }
})
