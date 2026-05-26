import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

export const createProgressHeaderStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      marginBottom: spacing.lg
    },
    stepText: {
      fontSize: typography.caption,
      fontWeight: fontWeights.medium,
      color: colors.textSecondary,
      marginBottom: spacing.sm
    },
    track: {
      height: 4,
      backgroundColor: colors.border,
      borderRadius: radii.sm,
      overflow: 'hidden'
    },
    fill: {
      height: '100%',
      backgroundColor: colors.accentEnergy,
      borderRadius: radii.sm
    }
  })
