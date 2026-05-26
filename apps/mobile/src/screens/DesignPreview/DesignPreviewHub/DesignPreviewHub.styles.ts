import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, getElevation, radii, spacing, typography } from '@shared/styles/StyleConstants'

export const createDesignPreviewHubStyles = (colors: ThemeColors) => {
  const elevation = getElevation(colors.shadowColor)

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: spacing.lg
    },
    title: {
      fontSize: typography.display,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary,
      marginBottom: spacing.sm
    },
    subtitle: {
      fontSize: typography.bodyLarge,
      color: colors.textSecondary,
      marginBottom: spacing.xl,
      lineHeight: 24
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      padding: spacing.lg,
      marginBottom: spacing.md,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      ...elevation.subtle
    },
    cardTitle: {
      fontSize: typography.title,
      fontWeight: fontWeights.semibold,
      color: colors.textPrimary,
      marginBottom: spacing.xs
    },
    cardMeta: {
      fontSize: typography.body,
      color: colors.textSecondary,
      marginBottom: spacing.md
    }
  })
}
