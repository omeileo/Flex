import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, getElevation, radii, spacing, typography } from '@shared/styles/StyleConstants'

export const createExerciseDetailStyles = (colors: ThemeColors) => {
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
    videoPlaceholder: {
      height: 160,
      backgroundColor: colors.border,
      borderRadius: radii.lg,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.md
    },
    videoLabel: {
      fontSize: typography.body,
      color: colors.textSecondary,
      fontWeight: fontWeights.medium
    },
    sectionLabel: {
      fontSize: typography.caption,
      fontWeight: fontWeights.semibold,
      color: colors.textSecondary,
      letterSpacing: 1,
      textTransform: 'uppercase',
      marginBottom: spacing.sm
    },
    prescription: {
      fontSize: typography.display,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary,
      marginBottom: spacing.sm
    },
    lastSession: {
      fontSize: typography.body,
      color: colors.textSecondary,
      marginBottom: spacing.lg
    },
    setRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: colors.surface,
      borderRadius: radii.md,
      padding: spacing.md,
      marginBottom: spacing.sm,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      ...elevation.subtle
    },
    setLabel: {
      fontSize: typography.body,
      color: colors.textSecondary
    },
    setValue: {
      fontSize: typography.body,
      fontWeight: fontWeights.semibold,
      color: colors.textPrimary
    },
    instructionCard: {
      backgroundColor: colors.surface,
      borderRadius: radii.md,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
      gap: spacing.sm,
      marginBottom: spacing.md,
      ...elevation.subtle
    },
    instructionText: {
      fontSize: typography.bodyLarge,
      color: colors.textPrimary,
      lineHeight: 22
    },
    injuryCard: {
      backgroundColor: colors.surface,
      borderRadius: radii.md,
      padding: spacing.md,
      borderWidth: 2,
      borderColor: colors.accentStrength,
      gap: spacing.sm,
      ...elevation.subtle
    },
    injuryLabel: {
      fontSize: typography.caption,
      fontWeight: fontWeights.semibold,
      color: colors.accentStrength,
      letterSpacing: 0.5,
      textTransform: 'uppercase'
    },
    injuryText: {
      fontSize: typography.body,
      color: colors.textPrimary,
      lineHeight: 20
    }
  })
}
