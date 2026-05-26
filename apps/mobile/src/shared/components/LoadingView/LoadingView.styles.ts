import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { spacing, typography } from '@shared/styles/StyleConstants'

export const createLoadingViewStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
      padding: spacing.lg
    },
    message: {
      marginTop: spacing.md,
      fontSize: typography.body,
      color: colors.textSecondary
    }
  })
