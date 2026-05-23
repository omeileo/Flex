import React from 'react'

import { Pressable, Text } from 'react-native'

import styles from './MovementRestrictionChip.styles'
import { MovementRestrictionChipProps } from './MovementRestrictionChip.types'

const MovementRestrictionChip = ({ label, selected, onPress }: MovementRestrictionChipProps) => (
  <Pressable
    style={[styles.chip, selected && styles.chipSelected]}
    onPress={onPress}
    accessibilityRole="button"
    accessibilityState={{ selected }}
  >
    <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
  </Pressable>
)

export default MovementRestrictionChip
