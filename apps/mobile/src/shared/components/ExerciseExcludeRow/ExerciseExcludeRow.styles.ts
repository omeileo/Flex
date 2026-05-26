import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

export const createExerciseExcludeRowStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.sm + 2,
      gap: spacing.md
    },
    textBlock: {
      flex: 1,
      gap: 2
    },
    name: {
      fontSize: typography.bodyLarge,
      fontWeight: fontWeights.medium,
      color: colors.textPrimary
    },
    equipment: {
      fontSize: typography.caption,
      color: colors.textSecondary
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: radii.sm,
      borderWidth: 2,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.surface
    },
    checkboxExcluded: {
      backgroundColor: colors.accent,
      borderColor: colors.accent
    },
    checkmark: {
      fontSize: typography.caption,
      fontWeight: fontWeights.bold,
      color: colors.textInverse
    }
  })
