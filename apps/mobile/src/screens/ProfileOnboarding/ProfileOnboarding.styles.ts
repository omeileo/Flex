import { StyleSheet } from 'react-native';

import {
  colors,
  radii,
  spacing,
  typography,
} from '@shared/styles/StyleConstants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    fontSize: typography.heading,
    color: colors.textPrimary,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    marginTop: spacing.md,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.bodyLarge,
    color: colors.textPrimary,
  },
  error: {
    color: colors.error,
    marginTop: spacing.sm,
  },
  button: {
    marginTop: spacing.xl,
    backgroundColor: colors.accent,
    borderRadius: radii.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  linkText: {
    color: colors.accent,
    fontSize: typography.body,
  },
  scrollContent: {
    paddingBottom: 48,
  },
  experienceRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  experienceOptionSelected: {
    flex: 1,
    backgroundColor: '#D8E3FB',
  },
});
