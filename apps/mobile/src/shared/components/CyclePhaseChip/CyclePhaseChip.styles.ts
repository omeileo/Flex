import { StyleSheet } from 'react-native'

import { colors, fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

export default StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radii.pill,
    backgroundColor: colors.accentCycleSoft,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.accentCycleMuted
  },
  chipPeriod: {
    backgroundColor: colors.accentCycle,
    borderColor: colors.accentCycle
  },
  label: {
    fontSize: typography.caption,
    fontWeight: fontWeights.semibold,
    color: colors.accentCycle
  },
  labelPeriod: {
    color: colors.textInverse
  }
})
