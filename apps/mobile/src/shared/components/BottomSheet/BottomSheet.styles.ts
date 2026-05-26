import { StyleSheet } from 'react-native'

import { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'
import { getElevation, radii, spacing } from '@shared/styles/StyleConstants'

export const createBottomSheetStyles = (colors: ThemeColors) => {
  const elevation = getElevation(colors.shadowColor)

  return StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(17,24,39,0.4)',
      justifyContent: 'flex-end'
    },
    overlayCentered: {
      justifyContent: 'center',
      paddingHorizontal: spacing.lg
    },
    sheet: {
      backgroundColor: colors.surface,
      borderTopLeftRadius: radii.lg,
      borderTopRightRadius: radii.lg,
      padding: spacing.lg,
      maxHeight: '70%',
      ...elevation.floating
    },
    centeredPanel: {
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      padding: spacing.lg,
      ...elevation.floating
    },
    handle: {
      width: 40,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.border,
      alignSelf: 'center',
      marginBottom: spacing.md
    }
  })
}
