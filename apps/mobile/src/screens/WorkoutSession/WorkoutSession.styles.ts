import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, getElevation, radii, spacing, typography } from '@shared/styles/StyleConstants'

export const createWorkoutSessionStyles = (colors: ThemeColors) => {
  const elevation = getElevation(colors.shadowColor)

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background
    },
    scrollContent: {
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.xxl
    },
    heroBand: {
      backgroundColor: colors.accent,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
      paddingBottom: spacing.lg,
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
      color: 'rgba(255,255,255,0.72)',
      fontWeight: fontWeights.medium
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: spacing.md
    },
    timer: {
      fontSize: typography.display,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary,
      fontVariant: ['tabular-nums']
    },
    headerActions: {
      flexDirection: 'row',
      gap: spacing.sm
    },
    headerPill: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.md,
      borderRadius: radii.pill,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface
    },
    headerPillDark: {
      backgroundColor: colors.accent,
      borderColor: colors.accent
    },
    headerPillText: {
      fontSize: typography.caption,
      fontWeight: fontWeights.semibold,
      color: colors.textPrimary
    },
    headerPillTextLight: {
      color: colors.textInverse
    },
    progressLabel: {
      fontSize: typography.caption,
      fontWeight: fontWeights.semibold,
      color: colors.textSecondary,
      letterSpacing: 0.8,
      textTransform: 'uppercase',
      marginBottom: spacing.sm
    },
    progressTrack: {
      flexDirection: 'row',
      gap: 4,
      marginBottom: spacing.lg
    },
    progressSegment: {
      flex: 1,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.border
    },
    progressDone: {
      backgroundColor: colors.accentStrength
    },
    progressCurrent: {
      backgroundColor: colors.accentEnergy
    },
    sectionTitle: {
      fontSize: typography.title,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary,
      marginBottom: spacing.xs
    },
    prescription: {
      fontSize: typography.bodyLarge,
      color: colors.textSecondary,
      marginBottom: spacing.md
    },
    prescriptionCentered: {
      fontSize: typography.bodyLarge,
      color: colors.textSecondary,
      marginBottom: spacing.md,
      textAlign: 'center'
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
      height: 40,
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
    tableHeader: {
      flexDirection: 'row',
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      marginBottom: spacing.xs
    },
    tableHeaderCell: {
      flex: 1,
      fontSize: typography.caption,
      fontWeight: fontWeights.semibold,
      color: colors.textSecondary,
      textTransform: 'uppercase'
    },
    footer: {
      padding: spacing.md,
      gap: spacing.sm,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
      backgroundColor: colors.background
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(17,24,39,0.45)',
      justifyContent: 'flex-end'
    },
    saveStats: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginVertical: spacing.md
    },
    statBlock: {
      flex: 1,
      padding: spacing.sm,
      borderRadius: radii.md,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border
    },
    statLabel: {
      fontSize: typography.caption,
      color: colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.6
    },
    statValue: {
      marginTop: spacing.xs,
      fontSize: typography.title,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary
    },
    successWrap: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing.lg
    },
    successIcon: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: colors.successMuted,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.md
    },
    successCheck: {
      fontSize: 32,
      color: colors.success,
      fontWeight: fontWeights.bold
    },
    successTitle: {
      fontSize: typography.heading,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary,
      textAlign: 'center',
      marginBottom: spacing.sm
    },
    successMeta: {
      fontSize: typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: spacing.xl
    },
    error: {
      color: colors.error,
      marginBottom: spacing.md,
      paddingHorizontal: spacing.md
    }
  })
}
