import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, spacing, typography } from '@shared/styles/StyleConstants'

export const createErrorFallbackStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
      paddingHorizontal: spacing.lg
    },
    title: {
      fontSize: typography.heading,
      fontWeight: fontWeights.semibold,
      color: colors.textPrimary,
      textAlign: 'center',
      marginBottom: spacing.sm
    },
    message: {
      fontSize: typography.bodyLarge,
      fontWeight: fontWeights.regular,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: spacing.lg,
      lineHeight: 24,
      maxWidth: 320
    },
    button: {
      minWidth: 160
    }
  })
