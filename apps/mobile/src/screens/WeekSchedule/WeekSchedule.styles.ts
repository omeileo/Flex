import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, getElevation, radii, spacing, typography } from '@shared/styles/StyleConstants'

export const createWeekScheduleStyles = (colors: ThemeColors) => {
  const elevation = getElevation(colors.shadowColor)

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background
    },
    content: {
      padding: spacing.lg,
      paddingBottom: spacing.xxl
    },
    weekNav: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.sm
    },
    weekNavButton: {
      padding: spacing.sm
    },
    weekNavLabel: {
      fontSize: typography.heading,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary
    },
    weekNavMeta: {
      fontSize: typography.body,
      color: colors.textSecondary,
      fontWeight: fontWeights.medium
    },
    phaseTag: {
      fontSize: typography.caption,
      color: colors.textSecondary,
      marginBottom: spacing.md
    },
    dayCard: {
      backgroundColor: colors.surface,
      borderRadius: radii.md,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: spacing.sm,
      gap: spacing.xs,
      ...elevation.subtle
    },
    dayCardDisabled: {
      opacity: 0.55
    },
    dayTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    dayLabel: {
      fontSize: typography.caption,
      fontWeight: fontWeights.semibold,
      color: colors.textSecondary
    },
    dayChevron: {
      fontSize: typography.body,
      color: colors.textSecondary
    },
    dayTitle: {
      fontSize: typography.title,
      fontWeight: fontWeights.semibold,
      color: colors.textPrimary
    },
    dayPreview: {
      fontSize: typography.caption,
      color: colors.textSecondary,
      lineHeight: 18
    },
    footerStats: {
      fontSize: typography.body,
      color: colors.textSecondary,
      marginTop: spacing.lg,
      textAlign: 'center'
    }
  })
}
