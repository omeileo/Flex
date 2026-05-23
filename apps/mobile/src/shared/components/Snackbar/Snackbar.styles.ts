import { StyleSheet } from 'react-native'

import { radii, spacing, typography } from '@shared/styles/StyleConstants'

export const createSnackbarStyles = (colors: {
  error: string
  warning: string
  success: string
  textInverse: string
  textPrimary: string
  surface: string
}) =>
  StyleSheet.create({
    host: {
      position: 'absolute',
      left: spacing.md,
      right: spacing.md,
      bottom: spacing.lg,
      zIndex: 9999
    },
    alert: {
      borderRadius: radii.md,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4
    },
    alertError: {
      backgroundColor: colors.error
    },
    alertWarning: {
      backgroundColor: colors.warning
    },
    alertSuccess: {
      backgroundColor: colors.success
    },
    alertInfo: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.textPrimary
    },
    content: {
      flex: 1,
      paddingRight: spacing.sm
    },
    message: {
      fontSize: typography.body,
      color: colors.textInverse
    },
    messageInfo: {
      color: colors.textPrimary
    },
    actionButton: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs
    },
    actionLabel: {
      fontSize: typography.body,
      fontWeight: '600',
      color: colors.textInverse,
      textTransform: 'uppercase'
    },
    actionLabelInfo: {
      color: colors.textPrimary
    },
    closeButton: {
      padding: spacing.xs
    },
    closeLabel: {
      fontSize: typography.body,
      fontWeight: '600',
      color: colors.textInverse
    },
    closeLabelInfo: {
      color: colors.textPrimary
    }
  })
