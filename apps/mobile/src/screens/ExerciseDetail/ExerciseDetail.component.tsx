import React from 'react'

import { ScrollView, Text, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { useTranslation } from 'react-i18next'

import ErrorView from '@shared/components/ErrorView/ErrorView.component'
import LoadingView from '@shared/components/LoadingView/LoadingView.component'

import { createExerciseDetailStyles } from './ExerciseDetail.styles'
import { ExerciseDetailComponentProps } from './ExerciseDetail.types'

const ExerciseDetailComponent = ({
  exercise,
  prescription,
  instructions,
  injuryNote,
  isLoading,
  error,
  onRetry
}: ExerciseDetailComponentProps) => {
  const styles = useThemedStyles(createExerciseDetailStyles)
  const { t } = useTranslation()

  if (isLoading && !exercise) {
    return <LoadingView message={t('exerciseDetail.loading')} />
  }

  if (error) {
    return <ErrorView message={error} onRetry={onRetry} retryLabel={t('actions.retry')} />
  }

  if (!exercise) {
    return <ErrorView message={t('exerciseDetail.empty')} onRetry={onRetry} retryLabel={t('actions.retry')} />
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} testID="exercise-detail-screen">
      <View style={styles.videoPlaceholder}>
        <Text style={styles.videoLabel}>▶</Text>
      </View>

      <Text style={styles.sectionLabel}>{t('exerciseDetail.prescriptionLabel')}</Text>
      <Text style={styles.prescription} testID="exercise-detail-prescription">
        {prescription}
      </Text>
      <Text style={styles.lastSession}>{t('exerciseDetail.lastSession')}</Text>

      <Text style={styles.sectionLabel}>{t('exerciseDetail.setsLabel')}</Text>
      {exercise.sets.map((set) => (
        <View key={set.setNumber} style={styles.setRow} testID={`exercise-detail-set-${set.setNumber}`}>
          <Text style={styles.setLabel}>{t('exerciseDetail.setNumber', { set: set.setNumber })}</Text>
          <Text style={styles.setValue}>
            {t('exerciseDetail.setLine', {
              set: set.setNumber,
              reps: set.targetReps ?? '-',
              weight: set.targetWeightKg ?? '-'
            })}
          </Text>
        </View>
      ))}

      <View style={styles.instructionCard}>
        <Text style={styles.sectionLabel}>{t('exerciseDetail.instructionsLabel')}</Text>
        <Text style={styles.instructionText}>{instructions}</Text>
      </View>

      {injuryNote ? (
        <View style={styles.injuryCard}>
          <Text style={styles.injuryLabel}>{t('exerciseDetail.injuryNoteLabel')}</Text>
          <Text style={styles.injuryText}>{injuryNote}</Text>
        </View>
      ) : null}
    </ScrollView>
  )
}

export default ExerciseDetailComponent
