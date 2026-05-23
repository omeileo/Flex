import { StyleSheet } from 'react-native'

import { colors, fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginBottom: spacing.xs
  },
  rowActive: {
    borderColor: colors.accentEnergy,
    backgroundColor: '#F0FDF4'
  },
  rowCompleted: {
    opacity: 0.85
  },
  statusCell: {
    width: 28,
    alignItems: 'center'
  },
  statusIcon: {
    fontSize: typography.bodyLarge,
    color: colors.textSecondary
  },
  statusIconActive: {
    color: colors.accentEnergy
  },
  statusIconDone: {
    color: colors.accentEnergy
  },
  cell: {
    flex: 1,
    alignItems: 'center'
  },
  cellLabel: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    marginBottom: 2
  },
  cellValue: {
    fontSize: typography.body,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary
  },
  cellValueMuted: {
    color: colors.textSecondary,
    fontWeight: fontWeights.regular
  }
})
