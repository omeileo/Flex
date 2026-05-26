import React from 'react'

import { Pressable, ScrollView, Text, View } from 'react-native'

import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'
import { useTranslation } from 'react-i18next'

import ErrorView from '@shared/components/ErrorView/ErrorView.component'
import LoadingView from '@shared/components/LoadingView/LoadingView.component'

import { createWeekScheduleStyles } from './WeekSchedule.styles'
import { WeekScheduleComponentProps } from './WeekSchedule.types'

const WeekScheduleComponent = ({
  schedule,
  isLoading,
  error,
  onPreviousWeek,
  onNextWeek,
  onDayPress,
  onRetry
}: WeekScheduleComponentProps) => {
  const styles = useThemedStyles(createWeekScheduleStyles)
  const { t } = useTranslation()

  if (isLoading && !schedule) {
    return <LoadingView message={t('weekSchedule.loading')} />
  }

  if (error) {
    return <ErrorView message={error} onRetry={onRetry} retryLabel={t('actions.retry')} />
  }

  if (!schedule) {
    return <ErrorView message={t('weekSchedule.empty')} onRetry={onRetry} retryLabel={t('actions.retry')} />
  }

  const canGoPrevious = schedule.weekNumber > 1
  const canGoNext = schedule.weekNumber < schedule.totalWeeks

  return (
    <View style={styles.container} testID="week-schedule-screen">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.weekNav}>
          <Pressable
            style={styles.weekNavButton}
            onPress={onPreviousWeek}
            disabled={!canGoPrevious}
            testID="week-schedule-prev"
          >
            <Text style={styles.weekNavMeta}>‹</Text>
          </Pressable>

          <Text style={styles.weekNavLabel} testID="week-schedule-title">
            {t('weekSchedule.weekTitle', { week: schedule.weekNumber })}
          </Text>

          <Pressable
            style={styles.weekNavButton}
            onPress={onNextWeek}
            disabled={!canGoNext}
            testID="week-schedule-next"
          >
            <Text style={styles.weekNavMeta}>›</Text>
          </Pressable>
        </View>

        <Text style={styles.phaseTag}>{schedule.phaseTag}</Text>

        {schedule.days.map((day) => (
          <Pressable
            key={`${day.dayLabel}-${day.dayIndex}`}
            style={[styles.dayCard, !day.hasWorkout && styles.dayCardDisabled]}
            onPress={() => {
              if (day.hasWorkout) {
                onDayPress(day.dayIndex, day.title)
              }
            }}
            disabled={!day.hasWorkout}
            testID={`week-schedule-day-${day.dayLabel.toLowerCase()}`}
          >
            <View style={styles.dayTop}>
              <Text style={styles.dayLabel}>{day.dayLabel}</Text>
              {day.hasWorkout ? <Text style={styles.dayChevron}>›</Text> : null}
            </View>
            <Text style={styles.dayTitle}>{day.title}</Text>
            <Text style={styles.dayPreview}>{day.preview}</Text>
          </Pressable>
        ))}

        <Text style={styles.footerStats}>{schedule.footerStats}</Text>
      </ScrollView>
    </View>
  )
}

export default WeekScheduleComponent
