import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

export const createEquipmentChipStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    chip: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm + 2,
      borderRadius: radii.md,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      minWidth: '46%',
      flexGrow: 1
    },
    chipSelected: {
      backgroundColor: colors.accent,
      borderColor: colors.accent
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
