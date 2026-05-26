import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, spacing, typography } from '@shared/styles/StyleConstants'

export const createPlanReadaptSheetStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    title: {
      fontSize: typography.title,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary
    },
    subtitle: {
      fontSize: typography.body,
      color: colors.textSecondary,
      lineHeight: 20,
      marginBottom: spacing.sm
    },
    linkText: {
      fontSize: typography.body,
      color: colors.textSecondary,
      textAlign: 'center'
    }
  })
