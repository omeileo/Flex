import React from 'react'

import { Pressable, Text, View } from 'react-native'

import { colors } from '@shared/styles/StyleConstants'
import { workoutModalityColors } from '@shared/types/workoutModality.types'

import styles from './WorkoutCard.styles'
import { WorkoutCardProps } from './WorkoutCard.types'

const WorkoutCard = ({
  title,
  durationMinutes,
  dateLabel,
  modality,
  completed = false,
  onPress,
  onToggleComplete,
  style
}: WorkoutCardProps) => {
  const modalityColor = workoutModalityColors[modality]

  return (
    <Pressable style={[styles.card, style]} onPress={onPress} disabled={!onPress}>
      <View style={styles.modalityBar}>
        <View style={[styles.modalityBarSegment, { backgroundColor: modalityColor }]} />
        <View style={[styles.modalityBarSegment, { backgroundColor: colors.accentEnergy }]} />
      </View>

      <View style={styles.content}>
        <View style={styles.textBlock}>
          {dateLabel ? <Text style={styles.dateLabel}>{dateLabel}</Text> : null}
          <Text style={styles.title}>{title}</Text>
          {durationMinutes ? <Text style={styles.meta}>{durationMinutes} min</Text> : null}
        </View>

        {onToggleComplete ? (
          <Pressable
            style={[styles.checkbox, completed && styles.checkboxCompleted]}
            onPress={onToggleComplete}
            hitSlop={8}
          >
            {completed ? <Text style={styles.checkmark}>✓</Text> : null}
          </Pressable>
        ) : null}
      </View>
    </Pressable>
  )
}

export default WorkoutCard
