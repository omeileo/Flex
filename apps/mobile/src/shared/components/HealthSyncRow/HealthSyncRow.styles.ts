import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

export const createHealthSyncRowStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      padding: spacing.md,
      marginBottom: spacing.sm,
      opacity: 0.6
    },
    content: {
      flex: 1,
      gap: spacing.xs
    },
    title: {
      fontSize: typography.bodyLarge,
      fontWeight: fontWeights.semibold,
      color: colors.textPrimary
    },
    subtitle: {
      fontSize: typography.caption,
      color: colors.textSecondary
    },
    badge: {
      borderRadius: radii.pill,
      backgroundColor: colors.background,
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm
    },
    badgeText: {
      fontSize: typography.caption,
      fontWeight: fontWeights.medium,
      color: colors.textSecondary
    }
  })
