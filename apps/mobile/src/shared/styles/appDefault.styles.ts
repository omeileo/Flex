import { StyleSheet } from 'react-native'

import { colors, spacing, typography } from './StyleConstants'

export const layout = StyleSheet.create({
  fill: { flex: 1 },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'center' },
  spaceBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  card: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
})

export const text = StyleSheet.create({
  title: { fontSize: typography.title, color: colors.textPrimary, fontWeight: '600' },
  body: { fontSize: typography.body, color: colors.textPrimary },
  bodyMuted: { fontSize: typography.body, color: colors.textSecondary },
  error: { fontSize: typography.body, color: colors.error },
})
