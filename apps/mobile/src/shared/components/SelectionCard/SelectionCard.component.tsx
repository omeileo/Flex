import React from 'react'

import { Pressable, Text } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'

import { createSelectionCardStyles } from './SelectionCard.styles'
import { SelectionCardProps } from './SelectionCard.types'

const SelectionCard = ({ label, selected, onPress, description, style }: SelectionCardProps) => {
  const styles = useThemedStyles(createSelectionCardStyles)

  return (
    <Pressable
      style={[styles.card, selected && styles.cardSelected, style]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
    </Pressable>
  )
}

export default SelectionCard
