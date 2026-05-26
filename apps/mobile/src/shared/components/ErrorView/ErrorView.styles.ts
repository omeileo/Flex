import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { spacing, typography } from '@shared/styles/StyleConstants'

export const createErrorViewStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
      padding: spacing.lg
    },
    message: {
      fontSize: typography.body,
      color: colors.error,
      textAlign: 'center',
      marginBottom: spacing.md
    },
    retryButton: {
      backgroundColor: colors.accent,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      borderRadius: 6
    },
    retryLabel: {
      color: colors.surface,
      fontSize: typography.body,
      fontWeight: '600'
    }
  })
