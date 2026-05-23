import { StyleSheet } from 'react-native'

import { colors, elevation, fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

export default StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.md,
    ...elevation.subtle
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: spacing.sm,
    minHeight: 120
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs
  },
  barTrack: {
    width: '100%',
    height: 96,
    justifyContent: 'flex-end',
    borderRadius: radii.sm,
    backgroundColor: colors.background
  },
  barFill: {
    width: '100%',
    borderRadius: radii.sm,
    backgroundColor: colors.accentStrength,
    minHeight: 4
  },
  barLabel: {
    fontSize: typography.caption,
    fontWeight: fontWeights.medium,
    color: colors.textSecondary,
    textAlign: 'center'
  },
  footnote: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    lineHeight: 18
  }
})
