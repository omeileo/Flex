import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

export const createProfileFlowStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background
    },
    content: {
      padding: spacing.lg,
      paddingBottom: spacing.xxl
    },
    title: {
      fontSize: typography.display,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary,
      marginBottom: spacing.lg
    },
    sectionLabel: {
      fontSize: typography.caption,
      fontWeight: fontWeights.semibold,
      color: colors.textSecondary,
      letterSpacing: 0.5,
      marginTop: spacing.md,
      marginBottom: spacing.sm
    },
    subtitle: {
      fontSize: typography.body,
      color: colors.textSecondary,
      lineHeight: 20,
      marginBottom: spacing.lg
    },
    hero: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      padding: spacing.md,
      marginBottom: spacing.lg
    },
    avatar: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.accentMuted,
      alignItems: 'center',
      justifyContent: 'center'
    },
    avatarText: {
      fontSize: typography.title,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary
    },
    heroName: {
      fontSize: typography.title,
      fontWeight: fontWeights.semibold,
      color: colors.textPrimary
    },
    heroMeta: {
      fontSize: typography.caption,
      color: colors.textSecondary
    },
    fieldLabel: {
      fontSize: typography.body,
      fontWeight: fontWeights.semibold,
      color: colors.textPrimary,
      marginBottom: spacing.sm,
      marginTop: spacing.md
    },
    chipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
      marginBottom: spacing.md
    },
    chip: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm + 2,
      borderRadius: radii.pill,
      backgroundColor: colors.accentMuted,
      borderWidth: 2,
      borderColor: colors.accent
    },
    chipInactive: {
      backgroundColor: colors.surface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border
    },
    chipText: {
      fontSize: typography.caption,
      fontWeight: fontWeights.semibold,
      color: colors.textPrimary
    },
    exerciseRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: radii.md,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      padding: spacing.md,
      marginBottom: spacing.sm
    },
    exerciseName: {
      fontSize: typography.body,
      color: colors.textPrimary
    },
    rowAction: {
      fontSize: typography.title,
      color: colors.textSecondary
    },
    coachCard: {
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      padding: spacing.md,
      marginTop: spacing.md,
      gap: spacing.sm
    },
    coachLabel: {
      fontSize: typography.caption,
      fontWeight: fontWeights.semibold,
      color: colors.textSecondary
    },
    coachText: {
      fontSize: typography.body,
      color: colors.textPrimary,
      lineHeight: 20
    },
    footerNote: {
      fontSize: typography.caption,
      color: colors.textSecondary,
      marginTop: spacing.lg,
      lineHeight: 18
    },
    footer: {
      marginTop: spacing.lg
    },
    input: {
      backgroundColor: colors.surface,
      borderRadius: radii.md,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm + 4,
      fontSize: typography.body,
      color: colors.textPrimary,
      marginBottom: spacing.md
    },
    settingsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: radii.md,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      padding: spacing.md,
      marginBottom: spacing.sm
    },
    settingsRowLabel: {
      fontSize: typography.body,
      color: colors.textPrimary
    },
    settingsRowValue: {
      fontSize: typography.body,
      color: colors.textSecondary
    },
    linkText: {
      fontSize: typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: spacing.sm
    },
    infoCard: {
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      padding: spacing.md,
      marginTop: spacing.lg,
      gap: spacing.xs
    },
    infoCardTitle: {
      fontSize: typography.body,
      fontWeight: fontWeights.semibold,
      color: colors.textPrimary
    },
    infoCardText: {
      fontSize: typography.caption,
      color: colors.textSecondary,
      lineHeight: 18
    }
  })
