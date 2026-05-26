import React from 'react'

import { Text, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'

import { createTrainingWeekHeroStyles } from './TrainingWeekHero.styles'
import { TrainingWeekHeroProps } from './TrainingWeekHero.types'

const TrainingWeekHero = ({ weekNumber, totalWeeks, progressPercent, eyebrow, testID }: TrainingWeekHeroProps) => {
  const styles = useThemedStyles(createTrainingWeekHeroStyles)
  const rotation = `${Math.min(360, Math.max(0, (progressPercent / 100) * 360))}deg`

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.accentBar} />

      <View style={styles.row}>
        <View style={styles.copyBlock}>
          <Text style={styles.eyebrow}>{eyebrow}</Text>
          <View style={styles.weekLine}>
            <Text style={styles.weekNumber}>{weekNumber}</Text>
            <Text style={styles.weekTotal}>/ {totalWeeks}</Text>
          </View>
        </View>

        <View style={styles.ringWrap}>
          <View style={styles.ringTrack} />
          <View style={[styles.ringFill, { transform: [{ rotate: rotation }] }]} />
          <Text style={styles.ringLabel}>{progressPercent}%</Text>
        </View>
      </View>
    </View>
  )
}

export default TrainingWeekHero
