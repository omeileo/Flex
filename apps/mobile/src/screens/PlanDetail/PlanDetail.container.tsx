import React, { useCallback, useMemo } from 'react'

import router from '@router/functions/router.functions'
import {
  estimateDurationMinutes
} from '@shared/functions/TrainingPlan/trainingPlanPresentation.functions'
import { useActivePlanPresentation } from '@shared/hooks/useActivePlanPresentation/useActivePlanPresentation.hooks'
import { useTranslation } from 'react-i18next'

import PlanDetailComponent from './PlanDetail.component'

import { PlanDetailRouteParams } from './PlanDetail.types'

const PlanDetailContainer = () => {
  const navigate = router.navigate()
  const { t } = useTranslation()
  const dayIndex = router.getUrlParam<number>('dayIndex')
  const weekNumber = router.getUrlParam<number>('weekNumber')
  const { loading, error, plan, hierarchy, retry } = useActivePlanPresentation()

  const workout = useMemo(() => plan?.workouts.find((entry) => entry.dayIndex === dayIndex) ?? null, [plan, dayIndex])

  const sessionMeta = useMemo(() => {
    if (!workout || !hierarchy) {
      return ''
    }

    const resolvedWeek = weekNumber ?? plan?.weekNumber ?? 1
    const phase = hierarchy.resolvePhaseForWeek(resolvedWeek)
    const duration = estimateDurationMinutes(workout)

    return t('planDetail.sessionMeta', {
      week: resolvedWeek,
      phase: phase.name,
      minutes: duration,
      rpe: phase.rpe
    })
  }, [workout, hierarchy, weekNumber, plan, t])

  const warmUpItems = useMemo(
    () => [t('planDetail.warmUp.one'), t('planDetail.warmUp.two'), t('planDetail.warmUp.three')],
    [t]
  )

  const handleExercisePress = useCallback(
    (exercise: { exerciseId: string; exerciseName: string }) => {
      navigate('ExerciseDetail', {
        params: {
          exerciseId: exercise.exerciseId,
          exerciseName: exercise.exerciseName,
          dayIndex
        }
      })
    },
    [navigate, dayIndex]
  )

  const handleStartWorkout = useCallback(() => {
    const params: PlanDetailRouteParams = {
      dayIndex: dayIndex ?? 0,
      weekNumber: weekNumber ?? plan?.weekNumber ?? 1,
      workoutName: workout?.name ?? ''
    }

    navigate('WorkoutSession', { params: params as unknown as Record<string, unknown> })
  }, [navigate, dayIndex, weekNumber, plan, workout?.name])

  return (
    <PlanDetailComponent
      workout={workout}
      sessionMeta={sessionMeta}
      coachNote={t('planDetail.coachNote')}
      warmUpItems={warmUpItems}
      isLoading={loading}
      error={error}
      onExercisePress={handleExercisePress}
      onStartWorkout={handleStartWorkout}
      onRetry={retry}
    />
  )
}

export default PlanDetailContainer
