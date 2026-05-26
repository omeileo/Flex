import React from 'react'

import { Pressable, Text, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'

import { createWeekStripStyles } from './WeekStrip.styles'
import { WeekStripProps } from './WeekStrip.types'

export type { WeekStripDay } from './WeekStrip.types'

const WeekStrip = ({ days, onDayPress }: WeekStripProps) => {
  const styles = useThemedStyles(createWeekStripStyles)

  return (
    <View style={styles.container}>
      {days.map((day) => (
        <Pressable key={day.key} style={styles.dayCell} onPress={() => onDayPress?.(day)} disabled={!onDayPress}>
          <View style={[styles.dayCircle, day.isToday ? styles.dayCircleToday : styles.dayCircleDefault]}>
            <Text style={[styles.dayLabel, day.isToday && styles.dayLabelToday]}>{day.label}</Text>
          </View>
          {day.hasWorkout && day.workoutModalityColor ? (
            <View style={[styles.dot, { backgroundColor: day.workoutModalityColor }]} />
          ) : (
            <View style={styles.dotPlaceholder} />
          )}
        </Pressable>
      ))}
    </View>
  )
}

export default WeekStrip
