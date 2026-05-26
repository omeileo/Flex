import React from 'react'

import { Pressable, ScrollView, Text, View } from 'react-native'

import { formatExercisePrescription } from '@shared/functions/TrainingPlan/trainingPlanPresentation.functions'
import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { useTranslation } from 'react-i18next'

import CoachNote from '@shared/components/CoachNote/CoachNote.component'
import ErrorView from '@shared/components/ErrorView/ErrorView.component'
import LoadingView from '@shared/components/LoadingView/LoadingView.component'
import PrimaryButton from '@shared/components/PrimaryButton/PrimaryButton.component'

import { createPlanDetailStyles } from './PlanDetail.styles'
import { PlanDetailComponentProps } from './PlanDetail.types'

const PlanDetailComponent = ({
  workout,
  coachNote,
  warmUpItems,
  isLoading,
  error,
  onExercisePress,
  onStartWorkout,
  onRetry
}: PlanDetailComponentProps) => {
  const styles = useThemedStyles(createPlanDetailStyles)
  const { t } = useTranslation()

  if (isLoading && !workout) {
    return <LoadingView message={t('planDetail.loading')} />
  }

  if (error) {
    return <ErrorView message={error} onRetry={onRetry} retryLabel={t('actions.retry')} />
  }

  return (
    <View style={styles.container} testID="plan-detail-screen">
      <View style={styles.heroBand}>
        <Text style={styles.heroTitle}>{workout?.name ?? t('planDetail.title')}</Text>
        <Text style={styles.heroMeta}>
          {t('planDetail.dayMeta', {
            count: workout?.exercises.length ?? 0
          })}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionLabel}>{t('planDetail.warmUpLabel')}</Text>
        <View style={styles.warmUpCard}>
          {warmUpItems.map((item) => (
            <Text key={item} style={styles.warmUpItem}>
              {item}
            </Text>
          ))}
        </View>

        <Text style={styles.sectionLabel}>{t('planDetail.mainWorkLabel')}</Text>
        {workout?.exercises.map((exercise) => (
          <Pressable key={exercise.exerciseId} style={styles.exerciseRow} onPress={() => onExercisePress(exercise)}>
            <View style={styles.modalityBar} />
            <View>
              <Text style={styles.exerciseName}>{exercise.exerciseName}</Text>
              <Text style={styles.exerciseRx}>{formatExercisePrescription(exercise.sets)}</Text>
            </View>
          </Pressable>
        ))}

        <View style={styles.coachNoteSpacing}>
          <CoachNote message={coachNote} />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton label={t('planDetail.startWorkout')} onPress={onStartWorkout} />
      </View>
    </View>
  )
}

export default PlanDetailComponent
