import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

export const createMovementRestrictionChipStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    chip: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: radii.pill,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      backgroundColor: colors.surface
    },
    chipSelected: {
      backgroundColor: colors.accentInjury,
      borderColor: colors.accentInjury
    },
    label: {
      fontSize: typography.body,
      fontWeight: fontWeights.medium,
      color: colors.textPrimary
    },
    labelSelected: {
      color: colors.textInverse
    }
  })
