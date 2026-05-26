import React from 'react'

import { Modal, Pressable, ScrollView, Text, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { useTranslation } from 'react-i18next'

import PrimaryButton from '@shared/components/PrimaryButton/PrimaryButton.component'
import RestTimerBar from '@shared/components/RestTimerBar/RestTimerBar.component'
import SetRow from '@shared/components/SetRow/SetRow.component'

import { createWorkoutSessionStyles } from './WorkoutSession.styles'
import { WorkoutSessionComponentProps } from './WorkoutSession.types'

const WorkoutSessionComponent = ({
  workoutName,
  exercises,
  phase,
  activeExerciseIndex,
  elapsedLabel,
  restSeconds,
  isSubmitting,
  error,
  onBegin,
  onNotNow,
  onLogSet,
  onSkipRest,
  onAdjustRest,
  onFinish,
  onSave,
  onDone
}: WorkoutSessionComponentProps) => {
  const styles = useThemedStyles(createWorkoutSessionStyles)
  const { t } = useTranslation()
  const activeExercise = exercises[activeExerciseIndex]
  const completedSets = exercises.reduce(
    (total, exercise) => total + exercise.sets.filter((set) => set.status === 'completed').length,
    0
  )

  if (phase === 'saved') {
    return (
      <View style={styles.container} testID="workout-session-saved">
        <View style={styles.successWrap}>
          <View style={styles.successIcon}>
            <Text style={styles.successCheck}>✓</Text>
          </View>
          <Text style={styles.successTitle}>{t('workoutSession.savedTitle')}</Text>
          <Text style={styles.successMeta}>{t('workoutSession.savedMeta')}</Text>
          <PrimaryButton label={t('workoutSession.done')} onPress={onDone} />
        </View>
      </View>
    )
  }

  if (phase === 'save') {
    return (
      <View style={styles.container} testID="workout-session-save">
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.sectionTitle}>{t('workoutSession.saveTitle')}</Text>
          <Text style={styles.prescription}>{workoutName}</Text>

          <View style={styles.saveStats}>
            <View style={styles.statBlock}>
              <Text style={styles.statLabel}>{t('workoutSession.duration')}</Text>
              <Text style={styles.statValue}>{elapsedLabel}</Text>
            </View>
            <View style={styles.statBlock}>
              <Text style={styles.statLabel}>{t('workoutSession.sets')}</Text>
              <Text style={styles.statValue}>{completedSets}</Text>
            </View>
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}
        </ScrollView>

        <View style={styles.footer}>
          <PrimaryButton
            label={isSubmitting ? t('workoutSession.completing') : t('workoutSession.saveWorkout')}
            onPress={onSave}
            loading={isSubmitting}
            disabled={isSubmitting}
          />
        </View>
      </View>
    )
  }

  if (phase === 'preStart') {
    return (
      <View style={styles.container} testID="workout-session-prestart">
        <View style={styles.heroBand}>
          <Text style={styles.heroTitle}>{workoutName}</Text>
          <Text style={styles.heroMeta}>
            {t('workoutSession.preStartMeta', { count: exercises.length, minutes: exercises.length * 12 })}
          </Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {exercises.map((exercise) => (
            <View key={exercise.exerciseId} style={styles.exerciseRow}>
              <View style={styles.modalityBar} />
              <View>
                <Text style={styles.exerciseName}>{exercise.exerciseName}</Text>
                <Text style={styles.exerciseRx}>{exercise.prescription}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <PrimaryButton label={t('workoutSession.beginWorkout')} onPress={onBegin} />
          <Pressable onPress={onNotNow}>
            <Text style={styles.prescriptionCentered}>{t('workoutSession.notNow')}</Text>
          </Pressable>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container} testID="workout-session-active">
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerRow}>
          <Text style={styles.timer}>{elapsedLabel}</Text>
          <View style={styles.headerActions}>
            <Pressable style={[styles.headerPill, styles.headerPillDark]} onPress={onFinish}>
              <Text style={[styles.headerPillText, styles.headerPillTextLight]}>{t('workoutSession.finish')}</Text>
            </Pressable>
          </View>
        </View>

        <Text style={styles.progressLabel}>
          {t('workoutSession.exerciseProgress', {
            current: activeExerciseIndex + 1,
            total: exercises.length
          })}
        </Text>

        <View style={styles.progressTrack}>
          {exercises.map((_, index) => (
            <View
              key={`segment-${index}`}
              style={[
                styles.progressSegment,
                index < activeExerciseIndex && styles.progressDone,
                index === activeExerciseIndex && styles.progressCurrent
              ]}
            />
          ))}
        </View>

        {activeExercise ? (
          <>
            <Text style={styles.sectionTitle}>{activeExercise.exerciseName}</Text>
            <Text style={styles.prescription}>{activeExercise.prescription}</Text>

            {activeExercise.sets.map((set, setIndex) => (
              <SetRow
                key={`${activeExercise.exerciseId}-${set.setNumber}`}
                setNumber={set.setNumber}
                previousLabel={set.previousLabel}
                reps={set.reps}
                weightKg={set.weightKg}
                status={set.status}
                onPress={set.status === 'active' ? () => onLogSet(activeExerciseIndex, setIndex) : undefined}
              />
            ))}
          </>
        ) : null}
      </ScrollView>

      <Modal visible={phase === 'rest'} transparent animationType="fade">
        <View style={styles.overlay}>
          <RestTimerBar
            secondsRemaining={restSeconds}
            nextSetLabel={t('workoutSession.nextSetPreview')}
            onSkip={onSkipRest}
            onAdjust={onAdjustRest}
          />
        </View>
      </Modal>
    </View>
  )
}

export default WorkoutSessionComponent
