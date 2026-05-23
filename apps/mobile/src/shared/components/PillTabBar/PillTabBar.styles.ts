import { StyleSheet } from 'react-native'

import { colors, elevation, fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    padding: spacing.xs,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    ...elevation.floating
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm + 2,
    borderRadius: radii.pill,
    alignItems: 'center'
  },
  tabActive: {
    backgroundColor: colors.accent
  },
  tabLabel: {
    fontSize: typography.caption,
    fontWeight: fontWeights.medium,
    color: colors.textSecondary
  },
  tabLabelActive: {
    color: colors.textInverse,
    fontWeight: fontWeights.semibold
  }
})
