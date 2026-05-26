import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

export const createSymptomLogChipStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    chip: {
      width: 72,
      height: 72,
      borderRadius: radii.lg,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.xs
    },
    chipSelected: {
      backgroundColor: colors.accentCycleSoft,
      borderColor: colors.accentCycle
    },
    icon: {
      fontSize: typography.title
    },
    label: {
      fontSize: typography.caption,
      fontWeight: fontWeights.medium,
      color: colors.textSecondary,
      textAlign: 'center'
    },
    labelSelected: {
      color: colors.accentCycle,
      fontWeight: fontWeights.semibold
    }
  })
