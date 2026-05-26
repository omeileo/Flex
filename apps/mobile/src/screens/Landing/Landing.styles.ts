import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, getElevation, radii, spacing, typography } from '@shared/styles/StyleConstants'

export const createLandingStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    hero: {
      marginBottom: spacing.xxl
    },
    primaryButton: {
      marginBottom: spacing.md
    },
    secondaryButton: {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      borderRadius: radii.pill,
      paddingVertical: spacing.md + 2,
      alignItems: 'center',
      backgroundColor: colors.surface,
      ...getElevation(colors.shadowColor).subtle
    },
    secondaryButtonText: {
      color: colors.textPrimary,
      fontSize: typography.bodyLarge,
      fontWeight: fontWeights.semibold
    },
    devButton: {
      marginTop: spacing.xl,
      alignItems: 'center',
      paddingVertical: spacing.sm
    },
    devButtonText: {
      color: colors.textSecondary,
      fontSize: typography.caption,
      textDecorationLine: 'underline'
    }
  })
