import React from 'react'

import { Pressable, Text, View } from 'react-native'

import { useThemeColors } from '@shared/hooks/useThemeColors/useThemeColors.hooks'
import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { workoutModalityColors } from '@shared/types/workoutModality.types'

import { createWorkoutCardStyles } from './WorkoutCard.styles'
import { WorkoutCardProps } from './WorkoutCard.types'

const WorkoutCard = ({
  title,
  durationMinutes,
  dateLabel,
  subtitle,
  modality,
  completed = false,
  onPress,
  onToggleComplete,
  style
}: WorkoutCardProps) => {
  const colors = useThemeColors()
  const styles = useThemedStyles(createWorkoutCardStyles)
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
          {subtitle ? <Text style={styles.meta}>{subtitle}</Text> : null}
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
