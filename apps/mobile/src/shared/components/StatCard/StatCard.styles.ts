import { StyleSheet } from 'react-native'

import { colors, elevation, fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

export default StyleSheet.create({
  card: {
    flex: 1,
    minWidth: '46%',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    gap: spacing.xs,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    ...elevation.subtle
  },
  value: {
    fontSize: typography.heading,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary
  },
  label: {
    fontSize: typography.caption,
    fontWeight: fontWeights.medium,
    color: colors.textSecondary
  }
})
