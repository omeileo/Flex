import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, spacing, typography } from '@shared/styles/StyleConstants'

export const createScreenHeaderStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      minHeight: 44
    },
    backButton: {
      minWidth: 44,
      paddingVertical: spacing.xs
    },
    backLabel: {
      fontSize: typography.bodyLarge,
      fontWeight: fontWeights.medium,
      color: colors.textPrimary
    },
    title: {
      flex: 1,
      textAlign: 'center',
      fontSize: typography.title,
      fontWeight: fontWeights.semibold,
      color: colors.textPrimary
    },
    rightSlot: {
      minWidth: 44,
      alignItems: 'flex-end'
    }
  })
