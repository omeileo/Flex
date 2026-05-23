import { StyleSheet, ViewStyle } from 'react-native'

import { colors, elevation, fontWeights, radii, spacing, typography } from '@shared/styles/StyleConstants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md
  },
  viewSwitcher: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
    marginTop: spacing.sm
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
    paddingVertical: spacing.md
  },
  headerTitle: {
    fontSize: typography.title,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary
  },
  headerMeta: {
    fontSize: typography.body,
    color: colors.textSecondary
  },
  metaRow: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm
  },
  exerciseRow: {
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
  modalityBar: {
    width: 4,
    height: 36,
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
  progressLabel: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs
  },
  progressTrack: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: spacing.md
  },
  progressSegment: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border
  },
  progressDone: {
    backgroundColor: colors.accentEnergy
  },
  progressCurrent: {
    backgroundColor: colors.accent
  },
  sectionTitle: {
    fontSize: typography.heading,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs
  },
  prescription: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm
  },
  videoPlaceholder: {
    height: 120,
    borderRadius: radii.lg,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md
  },
  tableHeader: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
    paddingHorizontal: spacing.sm
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: typography.caption,
    color: colors.textSecondary,
    textAlign: 'center'
  },
  headerPill: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  headerPillDark: {
    backgroundColor: colors.accent,
    borderColor: colors.accent
  },
  headerPillText: {
    fontSize: typography.caption,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary
  },
  headerPillTextLight: {
    color: colors.textInverse
  },
  logSetButton: {
    marginTop: spacing.sm,
    marginBottom: spacing.md
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(17,24,39,0.45)',
    justifyContent: 'flex-end'
  },
  overlayCenter: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(17,24,39,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg
  },
  pauseCard: {
    width: '100%',
    maxWidth: 310,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.md,
    ...elevation.floating
  },
  pauseTitle: {
    fontSize: typography.heading,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
    textAlign: 'center'
  },
  pauseMeta: {
    fontSize: typography.body,
    color: colors.textSecondary,
    textAlign: 'center'
  },
  destructiveText: {
    fontSize: typography.body,
    color: colors.error,
    textAlign: 'center',
    paddingVertical: spacing.sm
  },
  menuItem: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  menuItemText: {
    fontSize: typography.bodyLarge,
    color: colors.textPrimary
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radii.lg,
    borderTopRightRadius: radii.lg,
    padding: spacing.lg,
    ...elevation.floating
  },
  sheetTitle: {
    fontSize: typography.heading,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.md
  },
  statBlock: {
    alignItems: 'center'
  },
  statLabel: {
    fontSize: typography.caption,
    color: colors.textSecondary
  },
  statValue: {
    fontSize: typography.title,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary
  },
  saveExerciseName: {
    fontSize: typography.bodyLarge,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary
  },
  saveExerciseData: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm
  },
  notesBox: {
    minHeight: 80,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginVertical: spacing.md
  },
  notesPlaceholder: {
    fontSize: typography.body,
    color: colors.textSecondary
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 120,
    marginBottom: spacing.lg
  },
  successCheck: {
    fontSize: 36,
    color: colors.accentEnergy
  },
  centeredTitle: {
    fontSize: typography.heading,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
    textAlign: 'center'
  },
  centeredMeta: {
    fontSize: typography.bodyLarge,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.xl
  },
  alertCard: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    overflow: 'hidden',
    ...elevation.floating
  },
  alertBody: {
    padding: spacing.lg,
    gap: spacing.sm
  },
  alertTitle: {
    fontSize: typography.title,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
    textAlign: 'center'
  },
  alertCopy: {
    fontSize: typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22
  },
  alertActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.border
  },
  alertAction: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: colors.border
  },
  alertActionLast: {
    borderRightWidth: 0
  },
  alertActionText: {
    fontSize: typography.bodyLarge,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary
  },
  alertDestructive: {
    color: colors.error
  },
  footer: {
    paddingBottom: spacing.xl,
    gap: spacing.sm
  },
  secondaryOutline: {
    borderWidth: 1,
    borderColor: colors.error,
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md
  },
  secondaryOutlineLabel: {
    fontSize: typography.bodyLarge,
    fontWeight: fontWeights.semibold,
    color: colors.error
  },
  headerMetaCenter: {
    textAlign: 'center'
  },
  headerActionsRow: {
    flexDirection: 'row',
    gap: spacing.sm
  },
  headerMetaSpaced: {
    marginVertical: spacing.md
  },
  statLabelSpaced: {
    marginBottom: spacing.sm
  },
  headerPillRow: {
    flexDirection: 'row',
    gap: 10
  },
  headerPillFlex: {
    flex: 1,
    height: 52,
    justifyContent: 'center'
  },
  headerPillTextCenter: {
    textAlign: 'center'
  },
  flexOne: {
    flex: 1
  },
  scrollContent: {
    paddingBottom: 48
  },
  discardedContentTop: {
    marginTop: 160
  },
  outcomeLayout: {
    flex: 1,
    justifyContent: 'space-between'
  }
})

export const containerWithInset = (paddingTop: number): ViewStyle => ({
  paddingTop
})

export const outcomeLayoutWithInset = (paddingBottom: number): ViewStyle => ({
  flex: 1,
  justifyContent: 'space-between',
  paddingBottom
})

export default styles
