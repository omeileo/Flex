import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, fonts, spacing, typography } from '@shared/styles/StyleConstants'

export const createAuthBrandHeaderStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      marginBottom: spacing.lg
    },
    brand: {
      fontSize: typography.display,
      fontFamily: fonts.brand,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary,
      marginBottom: spacing.sm
    },
    accentBar: {
      width: 32,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.accentEnergy,
      marginBottom: spacing.sm
    },
    tagline: {
      fontSize: typography.bodyLarge,
      fontFamily: fonts.body,
      color: colors.textSecondary,
      lineHeight: 22,
      maxWidth: 320
    }
  })
