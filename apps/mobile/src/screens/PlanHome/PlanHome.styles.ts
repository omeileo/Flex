import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, getElevation, radii, spacing, typography } from '@shared/styles/StyleConstants'

export const createPlanHomeStyles = (colors: ThemeColors) => {
  const elevation = getElevation(colors.shadowColor)

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background
    },
    content: {
      flex: 1,
      paddingHorizontal: spacing.md
    },
    scrollContent: {
      paddingBottom: spacing.xl
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: spacing.md
    },
    headerTitle: {
      fontSize: typography.heading,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary
    },
    calendarIcon: {
      fontSize: typography.title
    },
    sectionTitle: {
      fontSize: typography.title,
      fontWeight: fontWeights.semibold,
      color: colors.textPrimary,
      marginTop: spacing.sm
    },
    viewProgramLink: {
      fontSize: typography.body,
      color: colors.accent,
      fontWeight: fontWeights.semibold,
      marginBottom: spacing.sm
    },
    phaseRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
      marginBottom: spacing.md
    },
    phaseChip: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      borderRadius: radii.pill,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border
    },
    phaseChipActive: {
      backgroundColor: colors.accentMuted,
      borderColor: colors.accent
    },
    phaseChipText: {
      fontSize: typography.caption,
      color: colors.textSecondary,
      fontWeight: fontWeights.medium
    },
    phaseChipTextActive: {
      color: colors.textPrimary,
      fontWeight: fontWeights.semibold
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing.lg
    },
    emptyIcon: {
      fontSize: 48,
      marginBottom: spacing.md
    },
    emptyTitle: {
      fontSize: typography.heading,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary,
      textAlign: 'center',
      marginBottom: spacing.sm
    },
    emptyCopy: {
      fontSize: typography.bodyLarge,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: spacing.lg
    },
    generatingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing.lg
    },
    generatingTitle: {
      fontSize: typography.heading,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary,
      textAlign: 'center',
      marginBottom: spacing.sm
    },
    generatingCopy: {
      fontSize: typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: spacing.lg
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(17,24,39,0.4)',
      justifyContent: 'flex-end'
    },
    sheet: {
      backgroundColor: colors.surface,
      borderTopLeftRadius: radii.lg,
      borderTopRightRadius: radii.lg,
      padding: spacing.lg,
      maxHeight: '70%',
      ...elevation.floating
    },
    sheetHandle: {
      width: 40,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.border,
      alignSelf: 'center',
      marginBottom: spacing.md
    },
    sheetTitle: {
      fontSize: typography.heading,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary,
      marginBottom: spacing.xs
    },
    sheetStats: {
      fontSize: typography.body,
      color: colors.textSecondary,
      marginBottom: spacing.md
    },
    modalIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.accentMuted,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      marginBottom: spacing.md
    },
    modalIconText: {
      fontSize: 24
    },
    modalHeadline: {
      fontSize: typography.heading,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary,
      textAlign: 'center',
      marginBottom: spacing.sm
    },
    modalCopy: {
      fontSize: typography.bodyLarge,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: spacing.lg
    },
    secondaryButton: {
      marginTop: spacing.sm,
      paddingVertical: spacing.md,
      alignItems: 'center'
    },
    secondaryButtonText: {
      fontSize: typography.bodyLarge,
      color: colors.textSecondary,
      fontWeight: fontWeights.medium
    },
    errorText: {
      fontSize: typography.body,
      color: colors.error,
      textAlign: 'center',
      marginTop: spacing.sm
    },
    coachNoteSpacing: {
      marginBottom: spacing.md
    },
    focusCard: {
      marginBottom: spacing.sm,
      padding: spacing.md,
      borderRadius: radii.md,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border
    },
    focusCardActive: {
      backgroundColor: colors.accentMuted,
      borderColor: colors.accent
    },
    focusCardTitle: {
      fontSize: typography.title,
      fontWeight: fontWeights.semibold,
      color: colors.textPrimary,
      marginBottom: spacing.xs
    },
    focusCardSubtitle: {
      fontSize: typography.body,
      color: colors.textSecondary
    },
    chatHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.md
    },
    chatAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.accentMuted,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.sm
    },
    chatAvatarText: {
      fontSize: typography.caption,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary
    },
    chatHeaderTitle: {
      fontSize: typography.title,
      fontWeight: fontWeights.semibold,
      color: colors.textPrimary
    },
    chatStatusPill: {
      marginTop: spacing.xs,
      alignSelf: 'flex-start',
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: radii.pill,
      backgroundColor: colors.successMuted
    },
    chatStatusText: {
      fontSize: typography.caption,
      color: colors.success,
      fontWeight: fontWeights.medium
    },
    chatMessageList: {
      marginBottom: spacing.md
    },
    promptRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
      marginBottom: spacing.md
    },
    promptChip: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      borderRadius: radii.pill,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border
    },
    promptChipText: {
      fontSize: typography.caption,
      color: colors.textSecondary,
      fontWeight: fontWeights.medium
    },
    composerWrap: {
      marginTop: spacing.sm
    },
    recapBullet: {
      fontSize: typography.body,
      color: colors.textSecondary,
      marginTop: spacing.sm,
      lineHeight: 22
    },
    recapStats: {
      fontSize: typography.body,
      color: colors.textSecondary,
      marginBottom: spacing.md
    },
    secondaryLink: {
      marginTop: spacing.md,
      alignItems: 'center'
    },
    secondaryLinkText: {
      fontSize: typography.bodyLarge,
      color: colors.textSecondary,
      fontWeight: fontWeights.medium
    },
    weekNav: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.md
    },
    weekNavButton: {
      padding: spacing.sm
    },
    weekNavLabel: {
      fontSize: typography.title,
      fontWeight: fontWeights.semibold,
      color: colors.textPrimary
    },
    progressTrack: {
      height: 8,
      backgroundColor: colors.border,
      borderRadius: radii.sm,
      overflow: 'hidden',
      marginBottom: spacing.lg
    },
    progressFill: {
      height: '100%',
      backgroundColor: colors.accentEnergy
    },
    phaseRulesRow: {
      fontSize: typography.caption,
      color: colors.textSecondary,
      marginBottom: spacing.md
    },
    footerButton: {
      marginTop: spacing.md
    }
  })
}
