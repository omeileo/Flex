import React from 'react'

import { Pressable, Text } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'

import { createEquipmentChipStyles } from './EquipmentChip.styles'
import { EquipmentChipProps } from './EquipmentChip.types'

const EquipmentChip = ({ label, selected, onPress }: EquipmentChipProps) => {
  const styles = useThemedStyles(createEquipmentChipStyles)

  return (
    <Pressable
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </Pressable>
  )
}

export default EquipmentChip
