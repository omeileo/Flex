import { StyleSheet } from 'react-native'

import { colors, fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

export default StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.pill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.surface
  },
  chipSelected: {
    backgroundColor: colors.accentInjury,
    borderColor: colors.accentInjury
  },
  label: {
    fontSize: typography.body,
    fontWeight: fontWeights.medium,
    color: colors.textPrimary
  },
  labelSelected: {
    color: colors.textInverse
  }
})
