import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, fonts, letterSpacing, spacing, typography } from '@shared/styles/StyleConstants'

export const createAuthBrandHeaderStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      marginBottom: spacing.lg
    },
    brand: {
      fontSize: typography.display + 2,
      fontFamily: fonts.brand,
      fontWeight: fontWeights.bold,
      letterSpacing: letterSpacing.brand,
      color: colors.textPrimary,
      marginBottom: spacing.sm,
      textTransform: 'uppercase'
    },
    accentBar: {
      width: 32,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.accentEnergy,
      marginBottom: spacing.md
    },
    tagline: {
      fontSize: typography.bodyLarge,
      fontFamily: fonts.body,
      color: colors.textSecondary,
      lineHeight: 22,
      maxWidth: 320
    }
  })
