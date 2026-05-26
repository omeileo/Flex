import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { spacing } from '@shared/styles/StyleConstants'

export const createThemeSwatchRowStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs
    },
    swatch: {
      width: 14,
      height: 14,
      borderRadius: 7
    },
    swatchActive: {
      borderWidth: 2,
      borderColor: colors.surface
    }
  })
