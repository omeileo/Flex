import React from 'react'

import { Pressable, Text, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { workoutModalityColors } from '@shared/types/workoutModality.types'

import { createWeekSummaryCardStyles } from './WeekSummaryCard.styles'
import { WeekSummaryCardProps } from './WeekSummaryCard.types'

const WeekSummaryCard = ({
  weekNumber,
  dateRange,
  workoutCount,
  totalVolume,
  workouts,
  isCurrent = false,
  onPress
}: WeekSummaryCardProps) => {
  const styles = useThemedStyles(createWeekSummaryCardStyles)

  return (
    <Pressable style={[styles.card, isCurrent && styles.cardCurrent]} onPress={onPress} disabled={!onPress}>
      <View style={styles.header}>
        <View>
          <Text style={styles.weekTitle}>Week {weekNumber}</Text>
          <Text style={styles.dateRange}>{dateRange}</Text>
        </View>
      </View>

      <Text style={styles.stats}>
        {workoutCount} workouts · {totalVolume}
      </Text>

      {workouts.map((workout) => (
        <View key={workout.id} style={styles.workoutRow}>
          <View style={[styles.modalityDot, { backgroundColor: workoutModalityColors[workout.modality] }]} />
          <Text style={styles.workoutTitle}>{workout.title}</Text>
        </View>
      ))}
    </Pressable>
  )
}

export default WeekSummaryCard
