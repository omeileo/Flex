import React from 'react'

import { Pressable, Text, View } from 'react-native'

import styles from './ThemePicker.styles'
import { ThemePickerProps } from './ThemePicker.types'

const ThemePicker = ({ options, selectedMode, onSelect }: ThemePickerProps) => (
  <View style={styles.container}>
    {options.map((option) => {
      const isSelected = option.mode === selectedMode

      return (
        <Pressable
          key={option.mode}
          style={[styles.card, isSelected && styles.cardSelected]}
          onPress={() => onSelect(option.mode)}
          accessibilityRole="button"
          accessibilityState={{ selected: isSelected }}
        >
          <View style={styles.previewRow}>
            <View style={[styles.previewSwatch, { backgroundColor: option.previewBackground }]} />
            <View style={[styles.previewSurface, { backgroundColor: option.previewSurface }]}>
              <Text style={[styles.previewText, { color: option.previewText }]}>Aa</Text>
              <View style={[styles.previewAccentBar, { backgroundColor: option.previewAccent }]} />
            </View>
          </View>
          <Text style={[styles.label, isSelected && styles.labelSelected]}>{option.label}</Text>
        </Pressable>
      )
    })}
  </View>
)

export default ThemePicker
