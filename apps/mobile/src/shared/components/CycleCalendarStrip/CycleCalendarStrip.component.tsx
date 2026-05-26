import React from 'react'

import { Pressable, Text, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'

import { createCycleCalendarStripStyles } from './CycleCalendarStrip.styles'
import { CycleCalendarStripProps } from './CycleCalendarStrip.types'

const CycleCalendarStrip = ({ days, onDayPress }: CycleCalendarStripProps) => {
  const styles = useThemedStyles(createCycleCalendarStripStyles)

  return (
    <View style={styles.row}>
      {days.map((day) => {
        const isSelected = day.isSelected ?? false
        const isPeriod = day.isPeriodDay ?? false

        return (
          <Pressable
            key={day.key}
            style={[styles.day, isPeriod && !isSelected && styles.dayPeriod, isSelected && styles.daySelected]}
            onPress={onDayPress ? () => onDayPress(day.key) : undefined}
            disabled={!onDayPress}
            accessibilityRole={onDayPress ? 'button' : 'text'}
            accessibilityState={{ selected: isSelected }}
          >
            <Text
              style={[
                styles.dayLabel,
                isPeriod && !isSelected && styles.dayLabelPeriod,
                isSelected && styles.dayLabelSelected
              ]}
            >
              {day.label}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}

export default CycleCalendarStrip
