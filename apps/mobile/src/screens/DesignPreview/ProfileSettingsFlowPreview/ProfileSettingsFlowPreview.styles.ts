import { StyleSheet } from 'react-native'

import { colors, fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl
  },
  viewChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg
  },
  viewChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border
  },
  viewChipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent
  },
  viewChipText: {
    fontSize: typography.caption,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary
  },
  viewChipTextActive: {
    color: colors.textInverse
  },
  title: {
    fontSize: typography.display,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.lg
  },
  sectionLabel: {
    fontSize: typography.caption,
    fontWeight: fontWeights.semibold,
    color: colors.textSecondary,
    letterSpacing: 0.5,
    marginTop: spacing.md,
    marginBottom: spacing.sm
  },
  subtitle: {
    fontSize: typography.body,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.lg
  },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.lg
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarText: {
    fontSize: typography.title,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary
  },
  heroName: {
    fontSize: typography.title,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary
  },
  heroMeta: {
    fontSize: typography.caption,
    color: colors.textSecondary
  },
  fieldLabel: {
    fontSize: typography.body,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    marginTop: spacing.md
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: radii.pill,
    backgroundColor: colors.accentMuted,
    borderWidth: 2,
    borderColor: colors.accent
  },
  chipInactive: {
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border
  },
  chipText: {
    fontSize: typography.caption,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary
  },
  exerciseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm
  },
  exerciseName: {
    fontSize: typography.body,
    color: colors.textPrimary
  },
  remove: {
    fontSize: typography.title,
    color: colors.textSecondary
  },
  coachCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    padding: spacing.md,
    marginTop: spacing.md,
    gap: spacing.sm
  },
  coachLabel: {
    fontSize: typography.caption,
    fontWeight: fontWeights.semibold,
    color: colors.textSecondary
  },
  coachText: {
    fontSize: typography.body,
    color: colors.textPrimary,
    lineHeight: 20
  },
  footerNote: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.lg,
    lineHeight: 18
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(17, 24, 39, 0.4)'
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.surface,
    borderTopLeftRadius: radii.lg,
    borderTopRightRadius: radii.lg,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    gap: spacing.md
  },
  sheetTitle: {
    fontSize: typography.title,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary
  },
  linkText: {
    fontSize: typography.body,
    color: colors.textSecondary,
    textAlign: 'center'
  },
  footer: {
    marginTop: spacing.lg
  },
  deleteSheetContainer: {
    flex: 1,
    minHeight: 400
  },
  fieldLabelNoTop: {
    marginTop: 0
  }
})
