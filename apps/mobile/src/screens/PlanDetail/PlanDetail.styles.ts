import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, getElevation, radii, spacing, typography } from '@shared/styles/StyleConstants'

export const createPlanDetailStyles = (colors: ThemeColors) => {
  const elevation = getElevation(colors.shadowColor)

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background
    },
    heroBand: {
      backgroundColor: colors.accent,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      marginBottom: spacing.md
    },
    heroTitle: {
      fontSize: typography.display,
      fontWeight: fontWeights.bold,
      color: colors.textInverse,
      letterSpacing: -0.5
    },
    heroMeta: {
      marginTop: spacing.xs,
      fontSize: typography.body,
      color: 'rgba(255,255,255,0.72)'
    },
    content: {
      paddingHorizontal: spacing.md,
      paddingBottom: 120
    },
    sectionLabel: {
      fontSize: typography.caption,
      fontWeight: fontWeights.semibold,
      color: colors.accentStrength,
      letterSpacing: 1,
      textTransform: 'uppercase',
      marginBottom: spacing.sm,
      marginTop: spacing.md
    },
    warmUpCard: {
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: spacing.md,
      ...elevation.subtle
    },
    warmUpItem: {
      fontSize: typography.body,
      color: colors.textSecondary,
      marginBottom: spacing.xs
    },
    exerciseRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      padding: spacing.md,
      borderRadius: radii.lg,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: spacing.sm,
      ...elevation.subtle
    },
    modalityBar: {
      width: 4,
      height: 44,
      borderRadius: 2,
      backgroundColor: colors.accentStrength
    },
    exerciseName: {
      fontSize: typography.bodyLarge,
      fontWeight: fontWeights.semibold,
      color: colors.textPrimary
    },
    exerciseRx: {
      fontSize: typography.body,
      color: colors.textSecondary,
      marginTop: 2
    },
    coachNoteSpacing: {
      marginTop: spacing.md
    },
    footer: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      padding: spacing.md,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
      backgroundColor: colors.background
    }
  })
}
