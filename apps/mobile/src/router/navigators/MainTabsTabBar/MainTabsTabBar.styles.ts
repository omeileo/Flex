import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { spacing } from '@shared/styles/StyleConstants'

export const createMainTabsTabBarStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor: colors.background,
      paddingTop: spacing.sm
    }
  })
