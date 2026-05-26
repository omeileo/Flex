import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { completeWorkoutSession } from '@redux/states/workoutSession/completeWorkoutSession/completeWorkoutSession.slice'
import { createWorkoutSession } from '@redux/states/workoutSession/createWorkoutSession/createWorkoutSession.slice'
import { AppDispatch, RootState } from '@redux/store/store.types'
import router from '@router/functions/router.functions'
import { RootStackNavigationProp } from '@router/router.types'
import { formatExercisePrescription } from '@shared/functions/TrainingPlan/trainingPlanPresentation.functions'
import { useDispatch, useSelector } from 'react-redux'

import WorkoutSessionComponent from './WorkoutSession.component'

import { SessionExercise, WorkoutSessionPhase } from './WorkoutSession.types'

const formatElapsed = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainder = seconds % 60

  return `${minutes}:${remainder.toString().padStart(2, '0')}`
}

const buildSessionExercises = (workout: {
  exercises: Array<{
    exerciseId: string
    exerciseName: string
    sets: Array<{
      setNumber: number
      targetReps?: number
      targetWeightKg?: number
    }>
  }>
}): SessionExercise[] =>
  workout.exercises.map((exercise) => ({
    exerciseId: exercise.exerciseId,
    exerciseName: exercise.exerciseName,
    prescription: formatExercisePrescription(exercise.sets),
    sets: exercise.sets.map((set, index) => ({
      setNumber: set.setNumber,
      reps: set.targetReps ?? 8,
      weightKg: set.targetWeightKg ?? 0,
      previousLabel: `${set.targetReps ?? 8}×${set.targetWeightKg ?? 0}`,
      status: index === 0 ? 'active' : 'pending'
    }))
  }))

const selectWorkout = (plan: RootState['getActivePlan']['success'], dayIndex: number) =>
  plan?.workouts.find((entry) => entry.dayIndex === dayIndex) ?? null

const WorkoutSessionContainer = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigation = useNavigation<RootStackNavigationProp>()
  const dayIndex = router.getUrlParam<number>('dayIndex') ?? 0
  const workoutName = router.getUrlParam<string>('workoutName') ?? ''
  const { success: plan } = useSelector((state: RootState) => state.getActivePlan)
  const { loading: creating, error: createError } = useSelector((state: RootState) => state.createWorkoutSession)
  const { loading: completing, error: completeError } = useSelector((state: RootState) => state.completeWorkoutSession)

  const workout = useMemo(() => selectWorkout(plan, dayIndex), [plan, dayIndex])
  const [phase, setPhase] = useState<WorkoutSessionPhase>('preStart')
  const [exercises, setExercises] = useState<SessionExercise[]>([])
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [restSeconds, setRestSeconds] = useState(90)

  useEffect(() => {
    if (workout) {
      setExercises(buildSessionExercises(workout))
    }
  }, [workout])

  useEffect(() => {
    if (phase !== 'active' && phase !== 'rest') {
      return undefined
    }

    const timer = setInterval(() => {
      setElapsedSeconds((current) => current + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [phase])

  const handleBegin = useCallback(() => {
    setPhase('active')
    setElapsedSeconds(0)
  }, [])

  const handleNotNow = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  const handleLogSet = useCallback((exerciseIndex: number, setIndex: number) => {
    setExercises((current) =>
      current.map((exercise, exerciseIdx) => {
        if (exerciseIdx !== exerciseIndex) {
          return exercise
        }

        const nextSets = exercise.sets.map((set, idx) => {
          if (idx === setIndex) {
            return { ...set, status: 'completed' as const }
          }

          if (idx === setIndex + 1) {
            return { ...set, status: 'active' as const }
          }

          return set
        })

        return { ...exercise, sets: nextSets }
      })
    )

    setRestSeconds(90)
    setPhase('rest')
  }, [])

  const handleSkipRest = useCallback(() => {
    setPhase('active')
  }, [])

  const handleAdjustRest = useCallback((delta: number) => {
    setRestSeconds((current) => Math.max(0, current + delta))
  }, [])

  const handleFinish = useCallback(() => {
    setPhase('save')
  }, [])

  const handleSave = useCallback(async () => {
    if (!plan?.id || !workout) {
      return
    }

    try {
      const sessionPayload = {
        trainingPlanId: plan.id,
        workoutDayIndex: dayIndex,
        exercises: exercises.map((exercise) => ({
          exerciseId: exercise.exerciseId,
          sets: exercise.sets
            .filter((set) => set.status === 'completed')
            .map((set) => ({
              setNumber: set.setNumber,
              repsCompleted: set.reps,
              weightKg: set.weightKg,
              completed: true
            }))
        }))
      }

      const created = await dispatch(createWorkoutSession(sessionPayload)).unwrap()
      const sessionId = (created as { id?: string }).id

      if (sessionId) {
        await dispatch(
          completeWorkoutSession({
            sessionId,
            body: {
              exercises: sessionPayload.exercises
            }
          })
        ).unwrap()
      }

      setPhase('saved')
    } catch {
      // errors handled in selectors
    }
  }, [plan, workout, dayIndex, dispatch, exercises])

  const handleDone = useCallback(() => {
    navigation.navigate('MainTabs')
  }, [navigation])

  return (
    <WorkoutSessionComponent
      workoutName={workoutName}
      exercises={exercises}
      phase={phase}
      activeExerciseIndex={activeExerciseIndex}
      elapsedLabel={formatElapsed(elapsedSeconds)}
      restSeconds={restSeconds}
      isSubmitting={creating || completing}
      error={createError ?? completeError}
      onBegin={handleBegin}
      onNotNow={handleNotNow}
      onLogSet={handleLogSet}
      onSkipRest={handleSkipRest}
      onAdjustRest={handleAdjustRest}
      onFinish={handleFinish}
      onSave={handleSave}
      onDone={handleDone}
    />
  )
}

export default WorkoutSessionContainer
