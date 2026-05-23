import { StyleSheet } from 'react-native'

import { spacing } from '@shared/styles/StyleConstants'

export default StyleSheet.create({
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center'
  },
  input: {
    paddingRight: spacing.xl + spacing.md
  },
  toggleButton: {
    position: 'absolute',
    right: 0,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: spacing.md
  }
})
