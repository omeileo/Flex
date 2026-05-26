import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, fonts, letterSpacing, spacing, typography } from '@shared/styles/StyleConstants'

export const createLoginStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    title: {
      fontSize: typography.heading,
      fontFamily: fonts.display,
      fontWeight: fontWeights.bold,
      letterSpacing: letterSpacing.headline,
      color: colors.textPrimary,
      textAlign: 'center'
    },
    tagline: {
      fontSize: typography.body,
      color: colors.textSecondary,
      lineHeight: 20,
      marginTop: spacing.lg,
      marginBottom: spacing.lg
    },
    forgotPasswordLink: {
      alignSelf: 'flex-end',
      marginTop: 8,
      marginBottom: 16
    },
    forgotPasswordText: {
      color: colors.textSecondary,
      fontSize: typography.body,
      fontWeight: fontWeights.semibold
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
      color: colors.textSecondary,
      fontWeight: fontWeights.regular
    }
  })
