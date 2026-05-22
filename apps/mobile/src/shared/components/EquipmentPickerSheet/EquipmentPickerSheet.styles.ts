import { StyleSheet } from 'react-native';

import {
  colors,
  fontWeights,
  spacing,
  typography,
} from '@shared/styles/StyleConstants';

export default StyleSheet.create({
  subheader: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  categoryPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  categoryPillActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  categoryText: {
    fontSize: typography.caption,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
  },
  categoryTextActive: {
    color: colors.textInverse,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  quickRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  quickLink: {
    paddingVertical: spacing.sm,
  },
  quickText: {
    fontSize: typography.body,
    color: colors.textSecondary,
    textDecorationLine: 'underline',
  },
  addCustom: {
    paddingVertical: spacing.sm,
    marginBottom: spacing.lg,
  },
  addCustomText: {
    fontSize: typography.bodyLarge,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
  },
});
