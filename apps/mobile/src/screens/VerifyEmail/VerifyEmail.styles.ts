import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, fonts, letterSpacing, typography } from '@shared/styles/StyleConstants'

export const createVerifyEmailStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    title: {
      fontSize: typography.heading,
      fontFamily: fonts.display,
      fontWeight: fontWeights.bold,
      letterSpacing: letterSpacing.headline,
      color: colors.textPrimary,
      marginBottom: 8
    },
    subtitle: {
      fontSize: typography.body,
      color: colors.textSecondary,
      lineHeight: 20,
      marginBottom: 24
    },
    fieldLabel: {
      fontSize: typography.body,
      fontWeight: fontWeights.semibold,
      color: colors.textPrimary,
      marginBottom: 8
    },
    error: {
      color: colors.error,
      fontSize: typography.caption,
      marginTop: 8,
      marginBottom: 16
    },
    info: {
      fontSize: typography.caption,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: 16
    },
    primaryButton: {
      marginTop: 16
    },
    footer: {
      marginTop: 24,
      gap: 16,
      alignItems: 'center'
    },
    linkText: {
      fontSize: typography.body,
      color: colors.textSecondary,
      textAlign: 'center'
    },
    linkEmphasis: {
      color: colors.textPrimary,
      fontWeight: fontWeights.semibold
    }
  })
