import React from 'react'

import { View } from 'react-native'

import { themePalettes } from '@shared/styles/StyleConstants'

import styles from './ThemeSwatchRow.styles'
import { ThemeSwatchRowProps } from './ThemeSwatchRow.types'

const ThemeSwatchRow = ({ modes, activeMode }: ThemeSwatchRowProps) => (
  <View style={styles.row}>
    {modes.map((mode) => {
      const palette = themePalettes[mode]
      const isActive = mode === activeMode

      return (
        <View
          key={mode}
          style={[styles.swatch, { backgroundColor: palette.accent }, isActive && styles.swatchActive]}
        />
      )
    })}
  </View>
)

export default ThemeSwatchRow
