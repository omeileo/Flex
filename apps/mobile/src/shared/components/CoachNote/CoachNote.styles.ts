import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

export const createCoachNoteStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: colors.surface,
      borderRadius: radii.md,
      padding: spacing.md,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      marginVertical: spacing.sm
    },
    avatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.accentMuted,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.sm
    },
    avatarText: {
      fontSize: typography.caption,
      fontWeight: fontWeights.bold,
      color: colors.accent
    },
    message: {
      flex: 1,
      fontSize: typography.bodyLarge,
      color: colors.textPrimary,
      lineHeight: 22
    }
  })
