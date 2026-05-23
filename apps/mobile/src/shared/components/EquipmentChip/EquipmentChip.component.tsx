import React from 'react'

import { Pressable, Text } from 'react-native'

import styles from './EquipmentChip.styles'
import { EquipmentChipProps } from './EquipmentChip.types'

const EquipmentChip = ({ label, selected, onPress }: EquipmentChipProps) => (
  <Pressable
    style={[styles.chip, selected && styles.chipSelected]}
    onPress={onPress}
    accessibilityRole="button"
    accessibilityState={{ selected }}
  >
    <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
  </Pressable>
)

export default EquipmentChip
