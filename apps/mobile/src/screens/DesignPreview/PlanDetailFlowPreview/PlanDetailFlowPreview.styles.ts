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
  viewSwitcher: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md
  },
  viewChip: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  viewChipActive: {
    backgroundColor: colors.accentMuted,
    borderColor: colors.accent
  },
  viewChipText: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    fontWeight: fontWeights.medium
  },
  viewChipTextActive: {
    color: colors.textPrimary,
    fontWeight: fontWeights.semibold
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md
  },
  headerTitle: {
    fontSize: typography.heading,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
    flex: 1,
    textAlign: 'center'
  },
  headerMeta: {
    fontSize: typography.body,
    color: colors.textSecondary,
    fontWeight: fontWeights.medium
  },
  blurbCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 2,
    borderColor: colors.accentStrength,
    marginBottom: spacing.md,
    gap: spacing.sm
  },
  blurbLabel: {
    fontSize: typography.caption,
    fontWeight: fontWeights.semibold,
    color: colors.accentStrength
  },
  blurbText: {
    fontSize: typography.bodyLarge,
    color: colors.textPrimary,
    lineHeight: 22
  },
  metaRow: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md
  },
  sectionLabel: {
    fontSize: typography.caption,
    fontWeight: fontWeights.semibold,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    marginTop: spacing.sm
  },
  phaseCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
    gap: spacing.xs
  },
  phaseCardActive: {
    borderColor: colors.accentStrength,
    borderWidth: 2
  },
  phaseTitle: {
    fontSize: typography.title,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary
  },
  phaseSub: {
    fontSize: typography.caption,
    color: colors.textSecondary
  },
  ruleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  ruleLabel: {
    fontSize: typography.body,
    color: colors.textSecondary
  },
  ruleValue: {
    fontSize: typography.body,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary
  },
  dayCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
    gap: spacing.xs
  },
  dayTop: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dayLabel: {
    fontSize: typography.caption,
    fontWeight: fontWeights.semibold,
    color: colors.textSecondary
  },
  dayTitle: {
    fontSize: typography.title,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary
  },
  dayPreview: {
    fontSize: typography.caption,
    color: colors.textSecondary
  },
  runCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.accentEnergy,
    marginTop: spacing.sm,
    gap: spacing.xs
  },
  runLabel: {
    fontSize: typography.caption,
    fontWeight: fontWeights.semibold,
    color: colors.accentEnergy
  },
  warmUpSection: {
    marginBottom: spacing.md
  },
  warmUpItem: {
    fontSize: typography.body,
    color: colors.textPrimary,
    paddingVertical: spacing.xs
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm
  },
  modalityBar: {
    width: 4,
    height: 44,
    borderRadius: 2,
    backgroundColor: colors.accentStrength
  },
  exerciseName: {
    fontSize: typography.bodyLarge,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary
  },
  exerciseRx: {
    fontSize: typography.caption,
    color: colors.textSecondary
  },
  videoPlaceholder: {
    height: 160,
    backgroundColor: colors.border,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md
  },
  prescription: {
    fontSize: typography.display,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm
  },
  instructionCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm
  },
  footer: {
    marginTop: spacing.md
  }
})
