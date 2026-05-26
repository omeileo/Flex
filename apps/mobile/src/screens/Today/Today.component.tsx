import React from 'react'

import { ScrollView, Text, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { useTranslation } from 'react-i18next'

import CoachNote from '@shared/components/CoachNote/CoachNote.component'
import ErrorView from '@shared/components/ErrorView/ErrorView.component'
import LoadingView from '@shared/components/LoadingView/LoadingView.component'
import PrimaryButton from '@shared/components/PrimaryButton/PrimaryButton.component'
import TrainingWeekHero from '@shared/components/TrainingWeekHero/TrainingWeekHero.component'
import WeekStrip from '@shared/components/WeekStrip/WeekStrip.component'
import WorkoutCard from '@shared/components/WorkoutCard/WorkoutCard.component'

import { createTodayStyles } from './Today.styles'
import { TodayComponentProps } from './Today.types'

const TodayComponent = ({
  weekNumber,
  totalWeeks,
  weekProgressPercent,
  weekStripDays,
  workouts,
  coachNote,
  isLoading,
  error,
  onRefresh,
  onWorkoutPress,
  onStartWorkout
}: TodayComponentProps) => {
  const styles = useThemedStyles(createTodayStyles)
  const { t } = useTranslation()

  if (isLoading && workouts.length === 0) {
    return <LoadingView message={t('today.loading')} />
  }

  if (error) {
    return <ErrorView message={error} onRetry={onRefresh} retryLabel={t('actions.retry')} />
  }

  const primaryWorkout = workouts[0]

  return (
    <View style={styles.container} testID="today-screen">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <TrainingWeekHero
          weekNumber={weekNumber}
          totalWeeks={totalWeeks}
          progressPercent={weekProgressPercent}
          eyebrow={t('today.eyebrow')}
          testID="today-week-hero"
        />

        <WeekStrip days={weekStripDays} />

        <Text style={styles.sectionTitle}>{t('today.todaysWorkouts')}</Text>

        {workouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            title={workout.title}
            durationMinutes={workout.durationMinutes}
            modality={workout.modality}
            onPress={() => onWorkoutPress(workout)}
          />
        ))}

        {workouts.length === 0 ? (
          <Text style={styles.emptyCopy} testID="today-empty">
            {t('today.empty')}
          </Text>
        ) : null}

        <View style={styles.coachNoteSpacing}>
          <CoachNote message={coachNote} />
        </View>
      </ScrollView>

      {primaryWorkout ? (
        <View style={styles.footerCta} testID="today-start-workout">
          <PrimaryButton label={t('today.startWorkout')} onPress={() => onStartWorkout(primaryWorkout)} />
        </View>
      ) : null}
    </View>
  )
}

export default TodayComponent
