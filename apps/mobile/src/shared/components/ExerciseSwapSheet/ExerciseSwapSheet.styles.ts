import { StyleSheet } from 'react-native'

import { colors, fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md
  },
  cancel: {
    fontSize: typography.bodyLarge,
    color: colors.textSecondary
  },
  title: {
    fontSize: typography.title,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary
  },
  search: {
    height: 44,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm
  },
  searchPlaceholder: {
    fontSize: typography.body,
    color: colors.textSecondary
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md
  },
  chip: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  chipText: {
    fontSize: typography.caption,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.sm,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm
  },
  thumb: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
    backgroundColor: colors.border
  },
  optionName: {
    fontSize: typography.bodyLarge,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary
  },
  optionMeta: {
    fontSize: typography.caption,
    color: colors.textSecondary
  },
  headerSpacer: {
    width: 48
  }
})
