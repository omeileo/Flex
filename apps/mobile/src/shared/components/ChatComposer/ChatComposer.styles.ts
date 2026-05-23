import { StyleSheet } from 'react-native'

import { colors, fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

export default StyleSheet.create({
  container: {
    gap: spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingTop: spacing.sm
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    borderRadius: radii.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.bodyLarge,
    color: colors.textPrimary
  },
  sendButton: {
    minWidth: 72,
    minHeight: 44,
    borderRadius: radii.pill,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md
  },
  sendButtonDisabled: {
    opacity: 0.4
  },
  sendLabel: {
    fontSize: typography.body,
    fontWeight: fontWeights.semibold,
    color: colors.textInverse
  },
  attachButton: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.xs
  },
  attachLabel: {
    fontSize: typography.body,
    fontWeight: fontWeights.medium,
    color: colors.textSecondary
  }
})
