import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, getElevation, radii, spacing, typography } from '@shared/styles/StyleConstants'

export const createStatCardStyles = (colors: ThemeColors) => {
  const elevation = getElevation(colors.shadowColor)

  return StyleSheet.create({
    card: {
      flex: 1,
      minWidth: '46%',
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      padding: 14,
      gap: spacing.xs,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      ...elevation.subtle
    },
    label: {
      fontSize: typography.caption,
      fontWeight: fontWeights.regular,
      color: colors.textSecondary
    },
    value: {
      fontSize: typography.heading,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary
    },
    hint: {
      fontSize: 11,
      fontWeight: fontWeights.regular,
      color: colors.textSecondary
    }
  })
}
