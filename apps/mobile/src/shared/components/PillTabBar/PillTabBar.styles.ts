import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, getElevation, radii, spacing, typography } from '@shared/styles/StyleConstants'

export const createPillTabBarStyles = (colors: ThemeColors) => {
  const elevation = getElevation(colors.shadowColor)

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: radii.pill,
      padding: spacing.xs,
      marginHorizontal: spacing.md,
      marginBottom: spacing.md,
      ...elevation.floating
    },
    tab: {
      flex: 1,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.xs,
      borderRadius: radii.pill,
      alignItems: 'center',
      justifyContent: 'center'
    },
    tabContent: {
      alignItems: 'center',
      gap: 2
    },
    tabActive: {
      backgroundColor: colors.accent
    },
    tabLabel: {
      fontSize: typography.caption,
      fontWeight: fontWeights.medium,
      color: colors.textSecondary
    },
    tabLabelActive: {
      color: colors.textInverse,
      fontWeight: fontWeights.semibold
    }
  })
}
