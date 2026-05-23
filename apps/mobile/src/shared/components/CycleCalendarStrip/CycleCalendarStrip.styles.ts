import { StyleSheet } from 'react-native'

import { colors, fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.xs
  },
  day: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderRadius: radii.md,
    gap: spacing.xs
  },
  dayPeriod: {
    backgroundColor: colors.accentCycleSoft
  },
  daySelected: {
    backgroundColor: colors.accentCycle
  },
  dayLabel: {
    fontSize: typography.caption,
    fontWeight: fontWeights.medium,
    color: colors.textSecondary
  },
  dayLabelSelected: {
    color: colors.textInverse,
    fontWeight: fontWeights.semibold
  },
  dayLabelPeriod: {
    color: colors.accentCycle
  }
})
