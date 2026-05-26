import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

export const createProfileSectionRowStyles = (colors: ThemeColors) =>
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
      marginBottom: spacing.sm
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
    preview: {
      fontSize: typography.caption,
      color: colors.textSecondary
    },
    trailing: {
      marginTop: spacing.xs
    },
    chevron: {
      fontSize: typography.heading,
      color: colors.textSecondary
    }
  })
