import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

export const createFormTextFieldStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      marginBottom: spacing.md
    },
    label: {
      fontSize: typography.body,
      fontWeight: fontWeights.semibold,
      color: colors.textPrimary,
      marginBottom: spacing.sm
    },
    input: {
      backgroundColor: colors.surface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      borderRadius: radii.md,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm + 2,
      fontSize: typography.bodyLarge,
      color: colors.textPrimary,
      minHeight: 48
    },
    inputReadOnly: {
      backgroundColor: colors.background,
      color: colors.textSecondary
    },
    inputError: {
      borderColor: colors.error
    },
    error: {
      fontSize: typography.caption,
      color: colors.error,
      marginTop: spacing.xs
    }
  })
