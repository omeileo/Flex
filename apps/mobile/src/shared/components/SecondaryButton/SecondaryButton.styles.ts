import { StyleSheet } from 'react-native'

import { colors, fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

export default StyleSheet.create({
  button: {
    minHeight: 56,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border
  },
  buttonDestructive: {
    backgroundColor: colors.error,
    borderColor: colors.error
  },
  buttonDisabled: {
    opacity: 0.5
  },
  label: {
    fontSize: typography.bodyLarge,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary
  },
  labelDestructive: {
    color: colors.textInverse
  }
})
