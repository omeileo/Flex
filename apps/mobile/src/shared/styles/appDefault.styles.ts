import { Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'

import { fontWeights, getElevation, radii, spacing, typography } from './StyleConstants'

export type AppDefaultStyles = {
  layout: {
    fill: ViewStyle
    centered: ViewStyle
    row: ViewStyle
    spaceBetween: ViewStyle
    screen: ViewStyle
    section: ViewStyle
    card: ViewStyle
    heroCard: ViewStyle
  }
  text: {
    display: TextStyle
    title: TextStyle
    body: TextStyle
    bodyMuted: TextStyle
    caption: TextStyle
    error: TextStyle
  }
}

export const createAppDefaultStyles = (colors: ThemeColors): AppDefaultStyles => {
  const elevation = getElevation(colors.shadowColor)

  return {
    layout: StyleSheet.create({
      fill: { flex: 1 },
      centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing.lg
      },
      row: { flexDirection: 'row', alignItems: 'center' },
      spaceBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
      screen: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: spacing.lg
      },
      section: {
        marginBottom: spacing.lg,
        gap: spacing.sm
      },
      card: {
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: radii.lg,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border,
        ...elevation.subtle
      },
      heroCard: {
        backgroundColor: colors.surface,
        padding: spacing.lg,
        borderRadius: radii.lg,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.accentMuted,
        ...elevation.card
      }
    }),
    text: StyleSheet.create({
      display: {
        fontSize: typography.display,
        lineHeight: 34,
        fontWeight: fontWeights.bold,
        color: colors.textPrimary,
        letterSpacing: Platform.OS === 'ios' ? -0.4 : 0
      },
      title: {
        fontSize: typography.title,
        lineHeight: 24,
        fontWeight: fontWeights.semibold,
        color: colors.textPrimary
      },
      body: {
        fontSize: typography.body,
        lineHeight: 20,
        fontWeight: fontWeights.regular,
        color: colors.textPrimary
      },
      bodyMuted: {
        fontSize: typography.body,
        lineHeight: 20,
        fontWeight: fontWeights.regular,
        color: colors.textSecondary
      },
      caption: {
        fontSize: typography.caption,
        lineHeight: 16,
        fontWeight: fontWeights.medium,
        color: colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 0.6
      },
      error: {
        fontSize: typography.body,
        lineHeight: 20,
        fontWeight: fontWeights.medium,
        color: colors.error
      }
    })
  }
}
