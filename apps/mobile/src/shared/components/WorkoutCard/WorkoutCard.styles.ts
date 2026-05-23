import { StyleSheet } from 'react-native'

import { colors, elevation, fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

export default StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    overflow: 'hidden',
    marginBottom: spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    ...elevation.subtle
  },
  modalityBar: {
    width: 4,
    overflow: 'hidden'
  },
  modalityBarSegment: {
    flex: 1
  },
  content: {
    flex: 1,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textBlock: {
    flex: 1
  },
  dateLabel: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    fontWeight: fontWeights.medium
  },
  title: {
    fontSize: typography.title,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary
  },
  meta: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm
  },
  checkboxCompleted: {
    backgroundColor: colors.success,
    borderColor: colors.success
  },
  checkmark: {
    color: colors.textInverse,
    fontSize: typography.caption,
    fontWeight: fontWeights.bold
  }
})
