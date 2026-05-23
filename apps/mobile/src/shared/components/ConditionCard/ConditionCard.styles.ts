import { StyleSheet } from 'react-native'

import { colors, fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

import { ConditionStatus } from './ConditionCard.types'

export const accentBarByStatus: Record<ConditionStatus, string> = {
  recovered: colors.accentEnergy,
  managing: colors.accentMobility,
  flareUp: colors.accentInjury
}

export default StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm
  },
  accentBar: {
    width: 4,
    height: 56,
    borderRadius: 2
  },
  content: {
    flex: 1,
    gap: spacing.sm
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexWrap: 'wrap'
  },
  title: {
    fontSize: typography.bodyLarge,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary
  },
  badge: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: radii.lg,
    backgroundColor: colors.accentMuted
  },
  badgeText: {
    fontSize: typography.caption,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary
  },
  subtitle: {
    fontSize: typography.caption,
    color: colors.textSecondary
  },
  chevron: {
    fontSize: typography.heading,
    color: colors.textSecondary
  }
})
