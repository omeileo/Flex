import { StyleSheet } from 'react-native'

import { spacing } from '@shared/styles/StyleConstants'

export default StyleSheet.create({
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
    borderColor: '#FFFFFF'
  }
})
