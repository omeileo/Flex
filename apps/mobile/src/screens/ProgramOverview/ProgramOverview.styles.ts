import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, getElevation, radii, spacing, typography } from '@shared/styles/StyleConstants'

export const createProgramOverviewStyles = (colors: ThemeColors) => {
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
    blurbCard: {
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      padding: spacing.md,
      borderWidth: 2,
      borderColor: colors.accentStrength,
      marginBottom: spacing.md,
      gap: spacing.sm,
      ...elevation.subtle
    },
    blurbLabel: {
      fontSize: typography.caption,
      fontWeight: fontWeights.semibold,
      color: colors.accentStrength,
      letterSpacing: 0.5,
      textTransform: 'uppercase'
    },
    blurbText: {
      fontSize: typography.bodyLarge,
      color: colors.textPrimary,
      lineHeight: 22
    },
    metaRow: {
      fontSize: typography.body,
      color: colors.textSecondary,
      marginBottom: spacing.md
    },
    sectionLabel: {
      fontSize: typography.caption,
      fontWeight: fontWeights.semibold,
      color: colors.textSecondary,
      letterSpacing: 1,
      textTransform: 'uppercase',
      marginBottom: spacing.sm
    },
    phaseCard: {
      backgroundColor: colors.surface,
      borderRadius: radii.md,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: spacing.sm,
      gap: spacing.xs,
      ...elevation.subtle
    },
    phaseCardActive: {
      borderColor: colors.accentStrength,
      borderWidth: 2
    },
    phaseTitle: {
      fontSize: typography.title,
      fontWeight: fontWeights.semibold,
      color: colors.textPrimary
    },
    phaseSub: {
      fontSize: typography.caption,
      color: colors.textSecondary
    },
    deloadNote: {
      fontSize: typography.body,
      color: colors.textSecondary,
      marginTop: spacing.sm,
      marginBottom: spacing.lg
    },
    footer: {
      marginTop: spacing.md
    }
  })
}
