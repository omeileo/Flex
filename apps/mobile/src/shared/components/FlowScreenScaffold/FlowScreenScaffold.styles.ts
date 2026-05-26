import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, spacing, typography } from '@shared/styles/StyleConstants'

export const createFlowScreenScaffoldStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background
    },
    content: {
      padding: spacing.lg,
      paddingBottom: spacing.xxl,
      gap: spacing.md
    },
    headerBand: {
      marginHorizontal: -spacing.lg,
      marginBottom: spacing.sm,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      backgroundColor: colors.accentMuted,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border
    },
    title: {
      fontSize: typography.display,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary,
      letterSpacing: -0.5
    },
    subtitle: {
      fontSize: typography.body,
      color: colors.textSecondary,
      lineHeight: 20,
      marginTop: spacing.xs,
      maxWidth: 320
    },
    footer: {
      marginTop: spacing.md
    }
  })
