import React from 'react';
import { Pressable, Text, View } from 'react-native';

import styles from './WeekStrip.styles';
import { WeekStripDay, WeekStripProps } from './WeekStrip.types';

const WeekStrip = ({ days, onDayPress }: WeekStripProps) => (
  <View style={styles.container}>
    {days.map(day => (
      <Pressable
        key={day.key}
        style={styles.dayCell}
        onPress={() => onDayPress?.(day)}
        disabled={!onDayPress}
      >
        <View
          style={[
            styles.dayCircle,
            day.isToday ? styles.dayCircleToday : styles.dayCircleDefault,
          ]}
        >
          <Text style={[styles.dayLabel, day.isToday && styles.dayLabelToday]}>
            {day.label}
          </Text>
        </View>
        {day.hasWorkout && day.workoutModalityColor ? (
          <View
            style={[styles.dot, { backgroundColor: day.workoutModalityColor }]}
          />
        ) : (
          <View style={styles.dotPlaceholder} />
        )}
      </Pressable>
    ))}
  </View>
);

export type { WeekStripDay };

export default WeekStrip;
