import { StyleSheet } from 'react-native';

import {
  colors,
  elevation,
  fontWeights,
  radii,
  spacing,
  typography,
} from '@shared/styles/StyleConstants';

export default StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    opacity: 0.85,
  },
  cardCurrent: {
    borderWidth: 2,
    borderColor: colors.accent,
    opacity: 1,
    ...elevation.card,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  weekTitle: {
    fontSize: typography.title,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
  },
  dateRange: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  stats: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  workoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  modalityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.sm,
  },
  workoutTitle: {
    fontSize: typography.body,
    color: colors.textPrimary,
    flex: 1,
  },
});
