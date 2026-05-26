import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

export const createStatusSegmentStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginBottom: spacing.lg
    },
    segment: {
      flex: 1,
      paddingVertical: spacing.sm + 2,
      paddingHorizontal: spacing.sm,
      borderRadius: radii.md,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      alignItems: 'center'
    },
    segmentActive: {
      backgroundColor: colors.accent,
      borderColor: colors.accent
    },
    label: {
      fontSize: typography.caption,
      fontWeight: fontWeights.semibold,
      color: colors.textPrimary,
      textAlign: 'center'
    },
    labelActive: {
      color: colors.textInverse
    }
  })
