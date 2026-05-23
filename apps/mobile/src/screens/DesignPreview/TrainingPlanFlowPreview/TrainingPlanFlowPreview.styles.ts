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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md
  },
  headerTitle: {
    fontSize: typography.heading,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary
  },
  headerMeta: {
    fontSize: typography.body,
    color: colors.textSecondary,
    fontWeight: fontWeights.medium
  },
  sectionTitle: {
    fontSize: typography.title,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    marginTop: spacing.sm
  },
  weekNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md
  },
  weekNavButton: {
    padding: spacing.sm
  },
  weekNavLabel: {
    fontSize: typography.title,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary
  },
  progressTrack: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: radii.sm,
    overflow: 'hidden',
    marginBottom: spacing.lg
  },
  progressFill: {
    height: '100%',
    width: '25%',
    backgroundColor: colors.accentEnergy
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(17,24,39,0.4)',
    justifyContent: 'flex-end'
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radii.lg,
    borderTopRightRadius: radii.lg,
    padding: spacing.lg,
    maxHeight: '70%',
    ...elevation.floating
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    alignSelf: 'center',
    marginBottom: spacing.md
  },
  sheetTitle: {
    fontSize: typography.heading,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs
  },
  sheetStats: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md
  },
  modalIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: spacing.md
  },
  modalIconText: {
    fontSize: 24
  },
  modalHeadline: {
    fontSize: typography.heading,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm
  },
  modalCopy: {
    fontSize: typography.bodyLarge,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.lg
  },
  secondaryButton: {
    marginTop: spacing.sm,
    paddingVertical: spacing.md,
    alignItems: 'center'
  },
  secondaryButtonText: {
    fontSize: typography.bodyLarge,
    color: colors.textSecondary,
    fontWeight: fontWeights.medium
  },
  footerCta: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm
  },
  calendarIcon: {
    fontSize: typography.title
  },
  viewSwitcher: {
    flexDirection: 'row',
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
  currentWeekButton: {
    marginTop: spacing.sm
  },
  focusCard: {
    marginBottom: spacing.sm,
    padding: spacing.md,
    borderRadius: radii.md
  },
  chatUserBubble: {
    padding: spacing.sm,
    alignSelf: 'flex-end'
  },
  recapBullet: {
    marginTop: spacing.sm
  },
  scrollContent: {
    paddingBottom: 120
  }
})

export const containerWithInset = (paddingTop: number): ViewStyle => ({
  paddingTop
})

export const floatingTabBar = (bottom: number): ViewStyle => ({
  position: 'absolute',
  left: 0,
  right: 0,
  bottom
})

export default styles
