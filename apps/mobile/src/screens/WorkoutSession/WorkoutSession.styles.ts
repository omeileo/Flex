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
    },
    notNow: {
      textAlign: 'center'
    },
    headerMeta: {
      fontSize: typography.body,
      color: colors.textSecondary
    },
    headerMetaCenter: {
      textAlign: 'center'
    },
    headerActionsRow: {
      flexDirection: 'row',
      gap: spacing.sm
    },
    videoPlaceholder: {
      height: 120,
      borderRadius: radii.lg,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.md
    },
    tableHeader: {
      flexDirection: 'row',
      marginBottom: spacing.xs,
      paddingHorizontal: spacing.sm
    },
    tableHeaderCell: {
      flex: 1,
      fontSize: typography.caption,
      color: colors.textSecondary,
      textAlign: 'center'
    },
    logSetButton: {
      marginTop: spacing.sm,
      marginBottom: spacing.md
    },
    navRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.xl
    },
    overlayCenter: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(17,24,39,0.45)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.lg
    },
    pauseCard: {
      width: '100%',
      maxWidth: 310,
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      padding: spacing.lg,
      gap: spacing.md,
      ...elevation.floating
    },
    pauseTitle: {
      fontSize: typography.heading,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary,
      textAlign: 'center'
    },
    pauseMeta: {
      fontSize: typography.body,
      color: colors.textSecondary,
      textAlign: 'center'
    },
    destructiveText: {
      fontSize: typography.body,
      color: colors.error,
      textAlign: 'center',
      paddingVertical: spacing.sm
    },
    menuItem: {
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border
    },
    menuItemText: {
      fontSize: typography.bodyLarge,
      color: colors.textPrimary
    },
    sheet: {
      backgroundColor: colors.surface,
      borderTopLeftRadius: radii.lg,
      borderTopRightRadius: radii.lg,
      padding: spacing.lg,
      ...elevation.floating
    },
    sheetTitle: {
      fontSize: typography.heading,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary,
      marginBottom: spacing.sm
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: spacing.md
    },
    saveExerciseName: {
      fontSize: typography.bodyLarge,
      fontWeight: fontWeights.semibold,
      color: colors.textPrimary
    },
    saveExerciseData: {
      fontSize: typography.body,
      color: colors.textSecondary,
      marginBottom: spacing.sm
    },
    notesBox: {
      minHeight: 80,
      borderRadius: radii.lg,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.md,
      marginVertical: spacing.md
    },
    notesInput: {
      fontSize: typography.body,
      color: colors.textPrimary,
      minHeight: 64,
      textAlignVertical: 'top'
    },
    notesPlaceholder: {
      fontSize: typography.body,
      color: colors.textSecondary
    },
    secondaryOutline: {
      borderWidth: 1,
      borderColor: colors.error,
      backgroundColor: colors.surface,
      borderRadius: radii.pill,
      minHeight: 48,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.md
    },
    secondaryOutlineLabel: {
      fontSize: typography.bodyLarge,
      fontWeight: fontWeights.semibold,
      color: colors.error
    },
    saveHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: spacing.md
    },
    saveHeaderTitle: {
      fontSize: typography.title,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary
    },
    workoutNameInput: {
      fontSize: typography.title,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary,
      marginBottom: spacing.sm
    },
    statLabelSpaced: {
      marginBottom: spacing.sm,
      textTransform: 'uppercase',
      letterSpacing: 0.6
    },
    headerPillRow: {
      flexDirection: 'row',
      gap: spacing.sm
    },
    headerPillFlex: {
      flex: 1,
      height: 52,
      justifyContent: 'center'
    },
    headerPillTextCenter: {
      textAlign: 'center'
    },
    flexOne: {
      flex: 1
    },
    alertCard: {
      width: '100%',
      maxWidth: 300,
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      overflow: 'hidden',
      ...elevation.floating
    },
    alertBody: {
      padding: spacing.lg,
      gap: spacing.sm
    },
    alertTitle: {
      fontSize: typography.title,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary,
      textAlign: 'center'
    },
    alertCopy: {
      fontSize: typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 22
    },
    alertActions: {
      flexDirection: 'row',
      borderTopWidth: 1,
      borderTopColor: colors.border
    },
    alertAction: {
      flex: 1,
      paddingVertical: spacing.md,
      alignItems: 'center',
      borderRightWidth: 1,
      borderRightColor: colors.border
    },
    alertActionLast: {
      borderRightWidth: 0
    },
    alertActionText: {
      fontSize: typography.bodyLarge,
      fontWeight: fontWeights.semibold,
      color: colors.textPrimary
    },
    alertDestructive: {
      color: colors.error
    },
    outcomeLayout: {
      flex: 1,
      justifyContent: 'space-between',
      padding: spacing.lg
    },
    outcomeContent: {
      flex: 1,
      justifyContent: 'center'
    },
    discardedContentTop: {
      marginTop: spacing.xxl
    },
    menuHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: spacing.md
    },
    menuNoteHint: {
      marginVertical: spacing.md
    },
    exerciseMenuButton: {
      padding: spacing.xs
    }
  })
}
