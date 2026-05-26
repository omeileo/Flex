import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { composition, spacing } from '@shared/styles/StyleConstants'

export const createAuthScreenShellStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.background
    },
    content: {
      flex: 1
    },
    scrollContent: {
      paddingTop: composition.authTopInset,
      paddingHorizontal: spacing.lg,
      paddingBottom: composition.authBottomInset
    },
    heroScrollContent: {
      flexGrow: 1,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.xxl,
      justifyContent: 'center'
    }
  })
