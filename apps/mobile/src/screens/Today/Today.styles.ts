import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, spacing, typography } from '@shared/styles/StyleConstants'

export const createTodayStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background
    },
    content: {
      paddingHorizontal: spacing.md,
      paddingTop: spacing.sm,
      paddingBottom: spacing.xl
    },
    sectionTitle: {
      fontSize: typography.title,
      fontWeight: fontWeights.bold,
      color: colors.textPrimary,
      marginBottom: spacing.sm,
      marginTop: spacing.lg,
      letterSpacing: -0.3
    },
    emptyCopy: {
      fontSize: typography.body,
      color: colors.textSecondary,
      marginTop: spacing.sm
    },
    footerCta: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
      backgroundColor: colors.background
    },
    coachNoteSpacing: {
      marginTop: spacing.lg
    }
  })
