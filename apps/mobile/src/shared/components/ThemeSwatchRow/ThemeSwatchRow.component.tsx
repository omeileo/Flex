import React from 'react'

import { View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { themePalettes } from '@shared/styles/StyleConstants'

import { createThemeSwatchRowStyles } from './ThemeSwatchRow.styles'
import { ThemeSwatchRowProps } from './ThemeSwatchRow.types'

const ThemeSwatchRow = ({ modes, activeMode }: ThemeSwatchRowProps) => {
  const styles = useThemedStyles(createThemeSwatchRowStyles)

  return (
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
}

export default ThemeSwatchRow
