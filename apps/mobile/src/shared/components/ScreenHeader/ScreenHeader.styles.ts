import { StyleSheet } from 'react-native'

import { colors, fontWeights, spacing, typography } from '@shared/styles/StyleConstants'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 44
  },
  backButton: {
    minWidth: 44,
    paddingVertical: spacing.xs
  },
  backLabel: {
    fontSize: typography.bodyLarge,
    fontWeight: fontWeights.medium,
    color: colors.textPrimary
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: typography.title,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary
  },
  rightSlot: {
    minWidth: 44,
    alignItems: 'flex-end'
  }
})
