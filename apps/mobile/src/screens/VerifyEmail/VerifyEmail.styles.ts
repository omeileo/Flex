import { StyleSheet } from 'react-native'

import { colors, radii, spacing, typography } from '@shared/styles/StyleConstants'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg
  },
  title: {
    fontSize: typography.heading,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.sm
  },
  subtitle: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg
  },
  label: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    marginTop: spacing.md
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.bodyLarge,
    color: colors.textPrimary
  },
  codeInput: {
    letterSpacing: 4,
    textTransform: 'uppercase',
    fontWeight: '700'
  },
  inputReadOnly: {
    opacity: 0.85
  },
  error: {
    color: colors.error,
    marginTop: spacing.sm
  },
  info: {
    color: colors.success,
    marginTop: spacing.sm
  },
  button: {
    marginTop: spacing.xl,
    backgroundColor: colors.accent,
    borderRadius: radii.md,
    paddingVertical: spacing.md,
    alignItems: 'center'
  },
  buttonText: {
    color: colors.textInverse,
    fontSize: typography.bodyLarge,
    fontWeight: '600'
  },
  link: {
    marginTop: spacing.lg,
    alignItems: 'center'
  },
  linkText: {
    color: colors.accent,
    fontSize: typography.body
  },
  scrollContent: {
    paddingBottom: 48
  }
})
