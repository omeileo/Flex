import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

export const createChatBubbleStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    coachRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: spacing.sm,
      alignSelf: 'flex-start',
      maxWidth: '88%'
    },
    userBubble: {
      alignSelf: 'flex-end',
      maxWidth: '80%',
      backgroundColor: colors.accentMuted,
      borderRadius: radii.lg,
      borderTopRightRadius: radii.sm,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md
    },
    avatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.accent,
      alignItems: 'center',
      justifyContent: 'center'
    },
    avatarText: {
      fontSize: typography.caption,
      fontWeight: fontWeights.bold,
      color: colors.textInverse
    },
    coachBubble: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      borderTopLeftRadius: radii.sm,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md
    },
    message: {
      fontSize: typography.body,
      color: colors.textPrimary,
      lineHeight: 20
    }
  })
