import { StyleSheet } from 'react-native'

import { colors, fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm
  },
  dayCell: {
    alignItems: 'center',
    flex: 1
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs
  },
  dayCircleToday: {
    backgroundColor: colors.accent
  },
  dayCircleDefault: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  dayLabel: {
    fontSize: typography.caption,
    fontWeight: fontWeights.medium,
    color: colors.textSecondary
  },
  dayLabelToday: {
    color: colors.textInverse
  },
  dotPlaceholder: {
    height: 6,
    marginTop: spacing.xs
  }
})
