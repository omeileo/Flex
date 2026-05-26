import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, getElevation, radii, spacing, typography } from '@shared/styles/StyleConstants'

export const createProgressStyles = (colors: ThemeColors) => {
  const elevation = getElevation(colors.shadowColor)

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background
    },
    content: {
      paddingBottom: spacing.xxl
    },
    heroBand: {
      paddingTop: spacing.lg,
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xl,
      backgroundColor: colors.accentMuted,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
      marginBottom: spacing.md
    },
    heroEyebrow: {
      fontSize: 11,
      fontWeight: fontWeights.semibold,
      color: colors.textSecondary,
      letterSpacing: 1.4,
      textTransform: 'uppercase',
      marginBottom: spacing.xs
    },
    title: {
      fontSize: typography.display,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary,
      letterSpacing: -0.5
    },
    subtitle: {
      fontSize: typography.body,
      color: colors.textSecondary,
      lineHeight: 20,
      maxWidth: 320,
      marginTop: spacing.xs
    },
    featuredCard: {
      marginHorizontal: spacing.lg,
      marginBottom: spacing.md,
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      borderLeftWidth: 4,
      borderLeftColor: colors.accentEnergy,
      padding: spacing.lg,
      gap: spacing.xs,
      ...elevation.card
    },
    featuredLabel: {
      fontSize: typography.caption,
      fontWeight: fontWeights.semibold,
      color: colors.textSecondary,
      letterSpacing: 0.8,
      textTransform: 'uppercase'
    },
    featuredValue: {
      fontSize: 40,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary,
      letterSpacing: -1
    },
    featuredHint: {
      fontSize: typography.body,
      color: colors.accentEnergy,
      fontWeight: fontWeights.medium
    },
    statGrid: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.sm,
      gap: spacing.sm
    },
    statRow: {
      flexDirection: 'row',
      gap: spacing.sm
    },
    chartSection: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.sm,
      gap: spacing.sm
    },
    chartHeader: {
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'space-between'
    },
    chartTitle: {
      fontSize: typography.title,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary,
      letterSpacing: -0.3
    },
    chartBadge: {
      fontSize: typography.caption,
      fontWeight: fontWeights.semibold,
      color: colors.accentStrength,
      letterSpacing: 0.6,
      textTransform: 'uppercase'
    }
  })
}
