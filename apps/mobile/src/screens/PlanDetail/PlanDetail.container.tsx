import React, { useCallback, useEffect, useMemo } from 'react'

import { getActivePlan } from '@redux/states/trainingPlan/getActivePlan/getActivePlan.slice'
import { AppDispatch, RootState } from '@redux/store/store.types'
import router from '@router/functions/router.functions'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import PlanDetailComponent from './PlanDetail.component'

import { PlanDetailRouteParams } from './PlanDetail.types'

const PlanDetailContainer = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = router.navigate()
  const { t } = useTranslation()
  const dayIndex = router.getUrlParam<number>('dayIndex')
  const { loading, success, error } = useSelector((state: RootState) => state.getActivePlan)

  const workout = useMemo(
    () => success?.workouts.find((entry) => entry.dayIndex === dayIndex) ?? null,
    [success, dayIndex]
  )

  const warmUpItems = useMemo(
    () => [t('planDetail.warmUp.one'), t('planDetail.warmUp.two'), t('planDetail.warmUp.three')],
    [t]
  )

  useEffect(() => {
    if (!success) {
      dispatch(getActivePlan())
    }
  }, [dispatch, success])

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
      workoutName: workout?.name ?? ''
    }

    navigate('WorkoutSession', { params })
  }, [navigate, dayIndex, workout?.name])

  const handleRetry = useCallback(() => {
    dispatch(getActivePlan())
  }, [dispatch])

  return (
    <PlanDetailComponent
      workout={workout}
      coachNote={t('planDetail.coachNote')}
      warmUpItems={warmUpItems}
      isLoading={loading}
      error={error}
      onExercisePress={handleExercisePress}
      onStartWorkout={handleStartWorkout}
      onRetry={handleRetry}
    />
  )
}

export default PlanDetailContainer
