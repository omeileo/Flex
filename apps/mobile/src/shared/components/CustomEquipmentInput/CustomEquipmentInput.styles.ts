import { StyleSheet } from 'react-native'

import { colors, fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

export default StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(17, 24, 39, 0.45)'
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radii.lg,
    borderTopRightRadius: radii.lg,
    padding: spacing.lg,
    paddingBottom: spacing.xl
  },
  title: {
    fontSize: typography.title,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md
  },
  label: {
    fontSize: typography.body,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    marginTop: spacing.sm
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    fontSize: typography.bodyLarge,
    color: colors.textPrimary,
    marginBottom: spacing.md
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm
  },
  cancelButton: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderRadius: radii.pill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border
  },
  cancelText: {
    fontSize: typography.bodyLarge,
    fontWeight: fontWeights.semibold,
    color: colors.textSecondary
  },
  flexOne: {
    flex: 1
  }
})
