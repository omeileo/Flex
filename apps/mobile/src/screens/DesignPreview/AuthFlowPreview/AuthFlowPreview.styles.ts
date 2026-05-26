import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

export const createAuthFlowPreviewStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background
    },
    scrollContent: {
      padding: spacing.lg,
      paddingBottom: spacing.xxl
    },
    viewChips: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
      marginBottom: spacing.lg
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
    title: {
      fontSize: typography.heading,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary,
      marginBottom: spacing.sm,
      textAlign: 'center'
    },
    subtitle: {
      fontSize: typography.body,
      color: colors.textSecondary,
      lineHeight: 20,
      marginBottom: spacing.lg
    },
    fieldLabel: {
      fontSize: typography.body,
      fontWeight: fontWeights.semibold,
      color: colors.textPrimary,
      marginBottom: spacing.sm
    },
    forgotPasswordLink: {
      alignSelf: 'flex-end',
      marginTop: 8,
      marginBottom: spacing.md
    },
    forgotPasswordText: {
      color: colors.textSecondary,
      fontSize: typography.body,
      fontWeight: fontWeights.semibold
    },
    linkRow: {
      marginTop: spacing.lg,
      alignItems: 'center'
    },
    linkText: {
      fontSize: typography.body,
      color: colors.textSecondary,
      textAlign: 'center'
    },
    linkEmphasis: {
      color: colors.textPrimary,
      fontWeight: fontWeights.semibold
    },
    info: {
      fontSize: typography.caption,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: spacing.md
    },
    footer: {
      marginTop: spacing.md,
      gap: spacing.md
    }
  })
