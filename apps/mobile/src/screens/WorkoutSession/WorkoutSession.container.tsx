import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { createWorkoutSession } from '@redux/states/workoutSession/createWorkoutSession/createWorkoutSession.slice'
import { completeWorkoutSession } from '@redux/states/workoutSession/completeWorkoutSession/completeWorkoutSession.slice'
import { AppDispatch, RootState } from '@redux/store/store.types'
import router from '@router/functions/router.functions'

import WorkoutSessionComponent from './WorkoutSession.component'

const WorkoutSessionContainer = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigation = useNavigation<any>()
  const dayIndex = router.getUrlParam<number>('dayIndex') ?? 0
  const workoutName = router.getUrlParam<string>('workoutName') ?? ''
  const { success: plan } = useSelector((state: RootState) => state.getActivePlan)
  const { loading: creating, error: createError } = useSelector((state: RootState) => state.createWorkoutSession)
  const { loading: completing, error: completeError } = useSelector((state: RootState) => state.completeWorkoutSession)

  const workout = useMemo(
    () => plan?.workouts.find((entry) => entry.dayIndex === dayIndex),
    [plan, dayIndex]
  )

  const handleComplete = useCallback(async () => {
    if (!plan?.id || !workout) {
      return
    }

    try {
      const sessionPayload = {
        trainingPlanId: plan.id,
        workoutDayIndex: dayIndex,
        exercises: workout.exercises.map((exercise) => ({
          exerciseId: exercise.exerciseId,
          sets: exercise.sets.map((set) => ({
            setNumber: set.setNumber,
            repsCompleted: set.targetReps,
            weightKg: set.targetWeightKg,
            completed: true,
          })),
        })),
      }

      const created = await dispatch(createWorkoutSession(sessionPayload)).unwrap()
      const sessionId = (created as { id?: number }).id

      if (sessionId) {
        await dispatch(completeWorkoutSession({
          sessionId,
          body: {
            exercises: sessionPayload.exercises,
          },
        })).unwrap()
      }

      navigation.navigate('MainTabs')
    } catch {
      // errors handled in selectors
    }
  }, [plan, workout, dayIndex, dispatch, navigation])

  return (
    <WorkoutSessionComponent
      workoutName={ workoutName }
      isSubmitting={ creating || completing }
      error={ createError ?? completeError }
      onComplete={ handleComplete }
    />
  )
}

export default WorkoutSessionContainer
