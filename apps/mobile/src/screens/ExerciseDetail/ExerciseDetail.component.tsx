import React from 'react'

import { ScrollView, Text, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { useTranslation } from 'react-i18next'

import LoadingView from '@shared/components/LoadingView/LoadingView.component'

import { createExerciseDetailStyles } from './ExerciseDetail.styles'
import { ExerciseDetailComponentProps } from './ExerciseDetail.types'

const ExerciseDetailComponent = ({ exercise, isLoading, error }: ExerciseDetailComponentProps) => {
  const styles = useThemedStyles(createExerciseDetailStyles)
  const { t } = useTranslation()

  if (isLoading && !exercise) {
    return <LoadingView message={t('exerciseDetail.loading')} />
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{exercise?.exerciseName}</Text>
      {exercise?.sets.map((set) => (
        <View key={set.setNumber} style={styles.setRow}>
          <Text style={styles.setText}>
            {t('exerciseDetail.setLine', {
              set: set.setNumber,
              reps: set.targetReps ?? '-',
              weight: set.targetWeightKg ?? '-'
            })}
          </Text>
        </View>
      ))}
      {exercise?.notes ? <Text style={styles.setText}>{exercise.notes}</Text> : null}
    </ScrollView>
  )
}

export default ExerciseDetailComponent
