import { StyleSheet } from 'react-native'

import { colors, radii, spacing, typography } from '@shared/styles/StyleConstants'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md
  },
  title: {
    fontSize: typography.heading,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border
  },
  exerciseName: {
    fontSize: typography.title,
    color: colors.textPrimary,
    fontWeight: '600'
  },
  meta: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs
  },
  startButton: {
    marginTop: spacing.lg,
    backgroundColor: colors.accent,
    borderRadius: radii.md,
    paddingVertical: spacing.md,
    alignItems: 'center'
  },
  startButtonText: {
    color: colors.textInverse,
    fontWeight: '600',
    fontSize: typography.bodyLarge
  }
})
