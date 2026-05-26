import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

export const createVerificationCodeInputStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      marginBottom: spacing.lg
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: spacing.sm
    },
    box: {
      flex: 1,
      maxWidth: 48,
      height: 52,
      borderRadius: radii.md,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center'
    },
    boxFilled: {
      borderColor: colors.accent,
      borderWidth: 2
    },
    boxText: {
      fontSize: typography.title,
      fontWeight: fontWeights.semibold,
      color: colors.textPrimary,
      textTransform: 'uppercase'
    },
    hiddenInput: {
      height: 0,
      width: 0,
      opacity: 0,
      position: 'absolute'
    }
  })
