import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, getElevation, radii, spacing, typography } from '@shared/styles/StyleConstants'

export const createPhaseDetailStyles = (colors: ThemeColors) => {
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
    goalCard: {
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      padding: spacing.md,
      borderWidth: 2,
      borderColor: colors.accentStrength,
      marginBottom: spacing.md,
      gap: spacing.sm,
      ...elevation.subtle
    },
    goalLabel: {
      fontSize: typography.caption,
      fontWeight: fontWeights.semibold,
      color: colors.accentStrength,
      letterSpacing: 0.5,
      textTransform: 'uppercase'
    },
    goalText: {
      fontSize: typography.bodyLarge,
      color: colors.textPrimary,
      lineHeight: 22
    },
    ruleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: spacing.sm,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border
    },
    ruleLabel: {
      fontSize: typography.body,
      color: colors.textSecondary,
      flex: 1,
      paddingRight: spacing.sm
    },
    ruleValue: {
      fontSize: typography.body,
      fontWeight: fontWeights.semibold,
      color: colors.textPrimary,
      textAlign: 'right',
      flex: 1
    },
    sectionLabel: {
      fontSize: typography.caption,
      fontWeight: fontWeights.semibold,
      color: colors.textSecondary,
      letterSpacing: 1,
      textTransform: 'uppercase',
      marginTop: spacing.lg,
      marginBottom: spacing.sm
    },
    splitItem: {
      fontSize: typography.body,
      color: colors.textPrimary,
      paddingVertical: spacing.xs
    },
    runCard: {
      backgroundColor: colors.surface,
      borderRadius: radii.md,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.accentEnergy,
      marginTop: spacing.md,
      gap: spacing.xs,
      ...elevation.subtle
    },
    runLabel: {
      fontSize: typography.caption,
      fontWeight: fontWeights.semibold,
      color: colors.accentEnergy,
      letterSpacing: 0.5,
      textTransform: 'uppercase'
    },
    runCopy: {
      fontSize: typography.body,
      color: colors.textPrimary,
      lineHeight: 20
    },
    footer: {
      marginTop: spacing.xl
    }
  })
}
