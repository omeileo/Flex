import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

export const createGymLocationsSettingsPreviewStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background
    },
    scrollContent: {
      padding: spacing.lg,
      paddingBottom: spacing.xxl
    },
    header: {
      marginBottom: spacing.lg
    },
    title: {
      fontSize: typography.display,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary,
      marginBottom: spacing.sm
    },
    subtitle: {
      fontSize: typography.bodyLarge,
      color: colors.textSecondary,
      lineHeight: 24,
      marginBottom: spacing.lg
    },
    sectionLabel: {
      fontSize: typography.body,
      fontWeight: fontWeights.semibold,
      color: colors.textPrimary,
      marginTop: spacing.md,
      marginBottom: spacing.sm
    },
    row: {
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      padding: spacing.md,
      marginBottom: spacing.sm,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    rowLabel: {
      fontSize: typography.bodyLarge,
      color: colors.textPrimary
    },
    rowValue: {
      fontSize: typography.body,
      fontWeight: fontWeights.semibold,
      color: colors.accentEnergy
    },
    chipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
      marginBottom: spacing.lg
    },
    viewChips: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
      marginBottom: spacing.md
    },
    viewChip: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: radii.pill,
      backgroundColor: colors.surface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border
    },
    viewChipActive: {
      backgroundColor: colors.accent,
      borderColor: colors.accent
    },
    viewChipText: {
      fontSize: typography.caption,
      fontWeight: fontWeights.semibold,
      color: colors.textPrimary
    },
    viewChipTextActive: {
      color: colors.textInverse
    },
    footer: {
      padding: spacing.lg,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
      backgroundColor: colors.background
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
    }
  })
