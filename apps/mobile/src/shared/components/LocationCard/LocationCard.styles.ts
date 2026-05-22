import { StyleSheet } from 'react-native';

import {
  colors,
  fontWeights,
  radii,
  spacing,
  typography,
} from '@shared/styles/StyleConstants';

export default StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardPressed: {
    opacity: 0.92,
  },
  left: {
    flex: 1,
    gap: spacing.xs,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  name: {
    fontSize: typography.bodyLarge,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
  },
  badge: {
    fontSize: typography.caption,
    fontWeight: fontWeights.medium,
    color: colors.textSecondary,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radii.sm,
  },
  meta: {
    fontSize: typography.body,
    color: colors.textSecondary,
  },
  defaultLabel: {
    fontSize: typography.caption,
    fontWeight: fontWeights.semibold,
    color: colors.accentEnergy,
  },
  chevron: {
    fontSize: typography.title,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
  },
});
