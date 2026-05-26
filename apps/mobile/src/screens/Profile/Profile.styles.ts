import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { getElevation, spacing } from '@shared/styles/StyleConstants'
import { createProfileFlowStyles } from '@shared/styles/profileFlow.styles'

export const createProfileStyles = (colors: ThemeColors) => {
  const flow = createProfileFlowStyles(colors)
  const elevation = getElevation(colors.shadowColor)

  return StyleSheet.create({
    ...flow,
    container: flow.screen,
    scrollContent: {
      ...flow.content,
      paddingTop: spacing.sm
    },
    title: {
      ...flow.title,
      letterSpacing: -0.5,
      marginBottom: spacing.md
    },
    hero: {
      ...flow.hero,
      overflow: 'hidden',
      borderLeftWidth: 4,
      borderLeftColor: colors.accentStrength,
      ...elevation.card
    },
    avatar: {
      ...flow.avatar,
      borderWidth: 2,
      borderColor: colors.surface
    },
    sectionLabel: {
      ...flow.sectionLabel,
      textTransform: 'uppercase',
      letterSpacing: 1.2,
      fontSize: 11
    },
    footerNote: {
      ...flow.footerNote,
      paddingHorizontal: spacing.xs,
      fontStyle: 'italic'
    }
  })
}
