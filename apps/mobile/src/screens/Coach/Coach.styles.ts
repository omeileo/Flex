import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, getElevation, radii, spacing, typography } from '@shared/styles/StyleConstants'

export const createCoachStyles = (colors: ThemeColors) => {
  const elevation = getElevation(colors.shadowColor)

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background
    },
    headerBand: {
      backgroundColor: colors.accent,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.sm,
      paddingBottom: spacing.lg
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md
    },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.accentStrength,
      alignItems: 'center',
      justifyContent: 'center'
    },
    avatarText: {
      color: colors.textInverse,
      fontWeight: fontWeights.bold,
      fontSize: typography.body
    },
    headerCopy: {
      flex: 1
    },
    title: {
      fontSize: typography.title,
      fontWeight: fontWeights.bold,
      color: colors.textInverse
    },
    statusPill: {
      alignSelf: 'flex-start',
      marginTop: spacing.xs,
      paddingVertical: 2,
      paddingHorizontal: spacing.sm,
      borderRadius: radii.pill,
      backgroundColor: 'rgba(34,197,94,0.24)'
    },
    statusText: {
      fontSize: typography.caption,
      fontWeight: fontWeights.semibold,
      color: colors.accentEnergy
    },
    messageList: {
      flex: 1,
      paddingHorizontal: spacing.md,
      paddingTop: spacing.md
    },
    messageListContent: {
      paddingBottom: spacing.md
    },
    promptRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.sm
    },
    promptChip: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      borderRadius: radii.pill,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      ...elevation.subtle
    },
    promptText: {
      fontSize: typography.caption,
      color: colors.textPrimary,
      fontWeight: fontWeights.medium
    },
    composerWrap: {
      padding: spacing.md,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
      backgroundColor: colors.surface
    }
  })
}
