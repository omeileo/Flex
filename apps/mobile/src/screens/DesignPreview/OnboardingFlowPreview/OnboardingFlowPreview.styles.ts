import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

export const createOnboardingFlowPreviewStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background
    },
    scrollContent: {
      padding: spacing.lg,
      paddingBottom: spacing.xxl
    },
    headline: {
      fontSize: typography.display,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary,
      marginBottom: spacing.sm
    },
    subcopy: {
      fontSize: typography.bodyLarge,
      color: colors.textSecondary,
      marginBottom: spacing.lg,
      lineHeight: 24
    },
    chipGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
      marginBottom: spacing.lg
    },
    chip: {
      marginBottom: 0
    },
    radioStack: {
      gap: spacing.sm,
      marginBottom: spacing.lg
    },
    sectionLabel: {
      fontSize: typography.body,
      fontWeight: fontWeights.semibold,
      color: colors.textPrimary,
      marginTop: spacing.md,
      marginBottom: spacing.sm
    },
    skipLink: {
      alignSelf: 'center',
      marginTop: spacing.md,
      padding: spacing.sm
    },
    skipText: {
      fontSize: typography.body,
      color: colors.textSecondary,
      textDecorationLine: 'underline'
    },
    footer: {
      padding: spacing.lg,
      paddingTop: spacing.sm,
      backgroundColor: colors.background,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border
    },
    input: {
      backgroundColor: colors.surface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      borderRadius: radii.md,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm + 2,
      fontSize: typography.bodyLarge,
      color: colors.textPrimary,
      marginBottom: spacing.lg
    },
    sliderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: spacing.sm
    },
    sliderLabel: {
      fontSize: typography.caption,
      color: colors.textSecondary,
      fontWeight: fontWeights.medium
    },
    sliderTrack: {
      flexDirection: 'row',
      gap: spacing.xs,
      marginBottom: spacing.lg
    },
    sliderSegment: {
      flex: 1,
      height: 6,
      borderRadius: radii.sm,
      backgroundColor: colors.border
    },
    sliderSegmentActive: {
      backgroundColor: colors.accentEnergy
    },
    loaderCenter: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing.xl
    },
    loaderTitle: {
      fontSize: typography.heading,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary,
      textAlign: 'center',
      marginTop: spacing.lg,
      marginBottom: spacing.md
    },
    loaderBullet: {
      fontSize: typography.bodyLarge,
      color: colors.textSecondary,
      marginVertical: spacing.xs
    },
    revealCard: {
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      padding: spacing.lg,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      marginBottom: spacing.lg
    },
    revealTitle: {
      fontSize: typography.heading,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary,
      marginBottom: spacing.sm
    },
    revealStats: {
      fontSize: typography.bodyLarge,
      color: colors.textSecondary
    },
    ageRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
      marginBottom: spacing.lg
    },
    loaderSpinner: {
      marginTop: spacing.lg
    }
  })
