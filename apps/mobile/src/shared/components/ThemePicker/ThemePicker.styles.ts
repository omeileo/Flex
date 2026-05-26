import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

export const createThemePickerStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      gap: spacing.md
    },
    card: {
      borderRadius: radii.lg,
      borderWidth: 2,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      padding: spacing.md,
      gap: spacing.sm
    },
    cardSelected: {
      borderColor: colors.accent
    },
    previewRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm
    },
    previewSwatch: {
      width: 28,
      height: 28,
      borderRadius: radii.sm
    },
    previewSurface: {
      width: 48,
      height: 32,
      borderRadius: radii.sm,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      padding: spacing.xs,
      justifyContent: 'flex-end'
    },
    previewAccentBar: {
      height: 6,
      borderRadius: radii.sm
    },
    previewText: {
      fontSize: typography.caption,
      fontWeight: fontWeights.bold
    },
    label: {
      fontSize: typography.bodyLarge,
      fontWeight: fontWeights.medium,
      color: colors.textPrimary
    },
    labelSelected: {
      color: colors.accent,
      fontWeight: fontWeights.semibold
    }
  })
