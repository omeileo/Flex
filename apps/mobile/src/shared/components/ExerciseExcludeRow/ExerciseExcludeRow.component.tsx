import React from 'react'

import { Pressable, Text, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'

import { createExerciseExcludeRowStyles } from './ExerciseExcludeRow.styles'
import { ExerciseExcludeRowProps } from './ExerciseExcludeRow.types'

const ExerciseExcludeRow = ({ name, equipment, excluded, onToggle }: ExerciseExcludeRowProps) => {
  const styles = useThemedStyles(createExerciseExcludeRowStyles)

  return (
    <Pressable
      style={styles.row}
      onPress={onToggle}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: excluded }}
    >
      <View style={styles.textBlock}>
        <Text style={styles.name}>{name}</Text>
        {equipment ? <Text style={styles.equipment}>{equipment}</Text> : null}
      </View>

      <View style={[styles.checkbox, excluded && styles.checkboxExcluded]}>
        {excluded ? <Text style={styles.checkmark}>✓</Text> : null}
      </View>
    </Pressable>
  )
}

export default ExerciseExcludeRow
