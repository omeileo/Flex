import React from 'react'

import { Pressable, Text } from 'react-native'

import styles from './CyclePhaseChip.styles'
import { CyclePhaseChipProps } from './CyclePhaseChip.types'

const CyclePhaseChip = ({ label, onPress, variant = 'default' }: CyclePhaseChipProps) => {
  const isPeriod = variant === 'period'

  const content = <Text style={[styles.label, isPeriod && styles.labelPeriod]}>{label}</Text>

  if (!onPress) {
    return (
      <Pressable style={[styles.chip, isPeriod && styles.chipPeriod]} disabled>
        {content}
      </Pressable>
    )
  }

  return (
    <Pressable style={[styles.chip, isPeriod && styles.chipPeriod]} onPress={onPress} accessibilityRole="button">
      {content}
    </Pressable>
  )
}

export default CyclePhaseChip
