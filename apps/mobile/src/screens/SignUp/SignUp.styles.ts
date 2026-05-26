import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, fonts, letterSpacing, typography } from '@shared/styles/StyleConstants'

export const createSignUpStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    title: {
      fontSize: typography.heading,
      fontFamily: fonts.display,
      fontWeight: fontWeights.bold,
      letterSpacing: letterSpacing.headline,
      color: colors.textPrimary,
      marginBottom: 24
    },
    error: {
      color: colors.error,
      fontSize: typography.caption,
      marginBottom: 16
    },
    success: {
      color: colors.success,
      fontSize: typography.caption,
      marginBottom: 16
    },
    primaryButton: {
      marginTop: 8
    },
    linkRow: {
      marginTop: 24,
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
