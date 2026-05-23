import { StyleSheet } from 'react-native'

import { colors, fontWeights, spacing, typography } from '@shared/styles/StyleConstants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg
  },
  title: {
    fontSize: typography.heading,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm
  },
  message: {
    fontSize: typography.bodyLarge,
    fontWeight: fontWeights.regular,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg
  },
  button: {
    minWidth: 160
  }
})

export default styles
