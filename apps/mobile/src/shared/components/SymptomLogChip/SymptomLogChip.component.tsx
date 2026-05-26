import React from 'react'

import { Pressable, Text } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'

import { createSymptomLogChipStyles } from './SymptomLogChip.styles'
import { SymptomLogChipProps } from './SymptomLogChip.types'

const SymptomLogChip = ({ label, icon, selected, onPress }: SymptomLogChipProps) => {
  const styles = useThemedStyles(createSymptomLogChipStyles)

  return (
    <Pressable
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      {icon ? <Text style={styles.icon}>{icon}</Text> : null}
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </Pressable>
  )
}

export default SymptomLogChip
