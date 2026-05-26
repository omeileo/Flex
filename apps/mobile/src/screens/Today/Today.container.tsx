import React, { useCallback, useEffect, useMemo } from 'react'

import { getActivePlan } from '@redux/states/trainingPlan/getActivePlan/getActivePlan.slice'
import { AppDispatch, RootState } from '@redux/store/store.types'
import router from '@router/functions/router.functions'
import { buildTrainingPlanPresentation } from '@shared/functions/TrainingPlan/trainingPlanPresentation.functions'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import TodayComponent from './Today.component'

const TodayContainer = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = router.navigate()
  const { t } = useTranslation()
  const { loading, success, error } = useSelector((state: RootState) => state.getActivePlan)

  const loadPlan = useCallback(() => {
    dispatch(getActivePlan())
  }, [dispatch])

  useEffect(() => {
    loadPlan()
  }, [loadPlan])

  const presentation = useMemo(() => {
    if (!success) {
      return null
    }

    return buildTrainingPlanPresentation(success, {
      programTitle: t('today.defaultProgramTitle'),
      blurb: t('today.defaultBlurb'),
      phases: [
        { id: 'foundation', name: t('today.phases.foundation'), weeks: t('today.phases.foundationWeeks') },
        { id: 'strength', name: t('today.phases.strength'), weeks: t('today.phases.strengthWeeks') },
        { id: 'peak', name: t('today.phases.peak'), weeks: t('today.phases.peakWeeks') }
      ],
      dateRange: t('today.defaultDateRange')
    })
  }, [success, t])

  const handleWorkoutPress = useCallback(
    (workout: { dayIndex: number; title: string }) => {
      navigate('PlanDetail', {
        params: { dayIndex: workout.dayIndex, workoutName: workout.title }
      })
    },
    [navigate]
  )

  const handleStartWorkout = useCallback(
    (workout: { dayIndex: number; title: string }) => {
      navigate('WorkoutSession', {
        params: { dayIndex: workout.dayIndex, workoutName: workout.title }
      })
    },
    [navigate]
  )

  return (
    <TodayComponent
      weekNumber={presentation?.weekNumber ?? 1}
      totalWeeks={12}
      weekProgressPercent={presentation?.weekProgressPercent ?? 0}
      weekStripDays={presentation?.weekStripDays ?? []}
      workouts={presentation?.todayWorkouts ?? []}
      coachNote={t('today.coachNote')}
      isLoading={loading}
      error={error}
      onRefresh={loadPlan}
      onWorkoutPress={handleWorkoutPress}
      onStartWorkout={handleStartWorkout}
    />
  )
}

export default TodayContainer
