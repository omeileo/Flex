import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { RepsScheme } from '@flex/shared/enums/repsScheme.enum'
import { useNavigation } from '@react-navigation/native'
import { completeWorkoutSession } from '@redux/states/workoutSession/completeWorkoutSession/completeWorkoutSession.slice'
import { createWorkoutSession } from '@redux/states/workoutSession/createWorkoutSession/createWorkoutSession.slice'
import { AppDispatch, RootState } from '@redux/store/store.types'
import router from '@router/functions/router.functions'
import { RootStackNavigationProp } from '@router/router.types'
import { formatExercisePrescription } from '@shared/functions/TrainingPlan/trainingPlanPresentation.functions'
import { useDispatch, useSelector } from 'react-redux'

import WorkoutSessionComponent from './WorkoutSession.component'

import {
  ExerciseMenuAction,
  exerciseMenuActions,
  workoutSessionSwapChips,
  workoutSessionSwapOptions
} from './WorkoutSession.dictionary'
import { calculateSessionVolumeKg, countCompletedSets, formatVolumeLabel } from './WorkoutSession.functions'
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
    prescription: formatExercisePrescription(exercise.sets.map((set) => ({ ...set, repsScheme: RepsScheme.STRAIGHT }))),
    sets: exercise.sets.map((set, index) => ({
      setNumber: set.setNumber,
      reps: set.targetReps ?? 8,
      weightKg: set.targetWeightKg ?? 0,
      previousLabel: `${set.targetReps ?? 8}×${set.targetWeightKg ?? 0}`,
      status: index === 0 ? 'active' : 'pending'
    }))
  }))

const WorkoutSessionContainer = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigation = useNavigation<RootStackNavigationProp>()
  const dayIndex = router.getUrlParam<number>('dayIndex') ?? 0
  const workoutName = router.getUrlParam<string>('workoutName') ?? ''
  const { success: plan } = useSelector((state: RootState) => state.getActivePlan)
  const { loading: creating, error: createError } = useSelector((state: RootState) => state.createWorkoutSession)
  const { loading: completing, error: completeError } = useSelector((state: RootState) => state.completeWorkoutSession)

  const workout = useMemo(() => plan?.workouts.find((entry) => entry.dayIndex === dayIndex), [plan, dayIndex])
  const [phase, setPhase] = useState<WorkoutSessionPhase>('preStart')
  const [exercises, setExercises] = useState<SessionExercise[]>([])
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [restSeconds, setRestSeconds] = useState(90)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [editableWorkoutName, setEditableWorkoutName] = useState(workoutName)
  const [privateNotes, setPrivateNotes] = useState('')
  const [discardConfirmOpen, setDiscardConfirmOpen] = useState(false)

  useEffect(() => {
    if (workout) {
      setExercises(buildSessionExercises(workout))
    }
  }, [workout])

  useEffect(() => {
    setEditableWorkoutName(workoutName)
  }, [workoutName])

  useEffect(() => {
    if (phase !== 'active') {
      return undefined
    }

    const timer = setInterval(() => {
      setElapsedSeconds((current) => current + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [phase])

  useEffect(() => {
    if (phase !== 'rest') {
      return undefined
    }

    const timer = setInterval(() => {
      setRestSeconds((current) => {
        if (current <= 1) {
          setPhase('active')

          return 0
        }

        return current - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [phase])

  const completedSets = useMemo(() => countCompletedSets(exercises), [exercises])
  const volumeLabel = useMemo(() => formatVolumeLabel(calculateSessionVolumeKg(exercises)), [exercises])

  const buildSessionPayload = useCallback(
    () => ({
      trainingPlanId: plan?.id ?? '',
      workoutDayIndex: dayIndex,
      exercises: exercises
        .map((exercise) => ({
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
        .filter((exercise) => exercise.sets.length > 0)
    }),
    [plan?.id, dayIndex, exercises]
  )

  const handleBegin = useCallback(async () => {
    if (!plan?.id || !workout) {
      return
    }

    const payload = buildSessionPayload()

    try {
      const created = await dispatch(
        createWorkoutSession({
          ...payload,
          exercises: workout.exercises.map((exercise) => ({
            exerciseId: exercise.exerciseId,
            sets: exercise.sets.map((set) => ({
              setNumber: set.setNumber,
              repsCompleted: set.targetReps,
              weightKg: set.targetWeightKg,
              completed: false
            }))
          }))
        })
      ).unwrap()

      const createdSessionId = (created as { id?: string }).id

      if (createdSessionId) {
        setSessionId(createdSessionId)
      }

      setPhase('active')
      setElapsedSeconds(0)
    } catch {
      // errors handled in selectors
    }
  }, [plan, workout, dispatch, buildSessionPayload])

  const handleNotNow = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  const handlePause = useCallback(() => {
    setPhase('paused')
  }, [])

  const handleResume = useCallback(() => {
    setDiscardConfirmOpen(false)
    setPhase('active')
  }, [])

  const handleOpenExerciseMenu = useCallback(() => {
    setPhase('exerciseMenu')
  }, [])

  const handleExerciseMenuAction = useCallback(
    (action: ExerciseMenuAction) => {
      if (action === 'replace') {
        setPhase('swap')

        return
      }

      if (action === 'delete') {
        setExercises((current) => current.filter((_, index) => index !== activeExerciseIndex))
        setActiveExerciseIndex((current) => Math.max(0, current - 1))
        setPhase('active')

        return
      }

      if (action === 'done' || exerciseMenuActions.includes(action)) {
        setPhase('active')
      }
    },
    [activeExerciseIndex]
  )

  const handleSwapSelect = useCallback(
    (exerciseId: string) => {
      const swapOption = workoutSessionSwapOptions.find((option) => option.id === exerciseId)

      if (!swapOption) {
        setPhase('active')

        return
      }

      setExercises((current) =>
        current.map((exercise, index) => {
          if (index !== activeExerciseIndex) {
            return exercise
          }

          return {
            ...exercise,
            exerciseId: swapOption.id,
            exerciseName: swapOption.name,
            prescription: exercise.prescription
          }
        })
      )
      setPhase('active')
    },
    [activeExerciseIndex]
  )

  const handleSwapCancel = useCallback(() => {
    setPhase('active')
  }, [])

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

  const handlePreviousExercise = useCallback(() => {
    setActiveExerciseIndex((current) => Math.max(0, current - 1))
  }, [])

  const handleNextExercise = useCallback(() => {
    setActiveExerciseIndex((current) => Math.min(exercises.length - 1, current + 1))
  }, [exercises.length])

  const handleFinish = useCallback(() => {
    setDiscardConfirmOpen(false)
    setPhase('finishSheet')
  }, [])

  const handleReviewSave = useCallback(() => {
    setPhase('save')
  }, [])

  const handleSave = useCallback(async () => {
    if (!plan?.id || !workout) {
      return
    }

    const sessionPayload = buildSessionPayload()

    if (sessionPayload.exercises.length === 0) {
      return
    }

    try {
      let activeSessionId = sessionId

      if (!activeSessionId) {
        const created = await dispatch(createWorkoutSession(sessionPayload)).unwrap()
        activeSessionId = (created as { id?: string }).id ?? null
      }

      if (activeSessionId) {
        await dispatch(
          completeWorkoutSession({
            sessionId: activeSessionId,
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
  }, [plan, workout, dispatch, buildSessionPayload, sessionId])

  const handleDiscardRequest = useCallback(() => {
    setDiscardConfirmOpen(true)
  }, [])

  const handleDiscardConfirm = useCallback(() => {
    setDiscardConfirmOpen(false)
    setPhase('discarded')
  }, [])

  const handleDiscardCancel = useCallback(() => {
    setDiscardConfirmOpen(false)
  }, [])

  const handleDone = useCallback(() => {
    navigation.navigate('MainTabs')
  }, [navigation])

  const handleBackToToday = useCallback(() => {
    navigation.navigate('MainTabs')
  }, [navigation])

  return (
    <WorkoutSessionComponent
      workoutName={workoutName}
      editableWorkoutName={editableWorkoutName}
      privateNotes={privateNotes}
      exercises={exercises}
      phase={phase}
      activeExerciseIndex={activeExerciseIndex}
      elapsedLabel={formatElapsed(elapsedSeconds)}
      restSeconds={restSeconds}
      volumeLabel={volumeLabel}
      completedSets={completedSets}
      swapOptions={workoutSessionSwapOptions}
      swapFilterChips={workoutSessionSwapChips}
      discardConfirmOpen={discardConfirmOpen}
      isSubmitting={creating || completing}
      error={createError ?? completeError}
      onWorkoutNameChange={setEditableWorkoutName}
      onPrivateNotesChange={setPrivateNotes}
      onBegin={handleBegin}
      onNotNow={handleNotNow}
      onPause={handlePause}
      onResume={handleResume}
      onOpenExerciseMenu={handleOpenExerciseMenu}
      onExerciseMenuAction={handleExerciseMenuAction}
      onSwapSelect={handleSwapSelect}
      onSwapCancel={handleSwapCancel}
      onLogSet={handleLogSet}
      onSkipRest={handleSkipRest}
      onAdjustRest={handleAdjustRest}
      onPreviousExercise={handlePreviousExercise}
      onNextExercise={handleNextExercise}
      onFinish={handleFinish}
      onReviewSave={handleReviewSave}
      onSave={handleSave}
      onDiscardRequest={handleDiscardRequest}
      onDiscardConfirm={handleDiscardConfirm}
      onDiscardCancel={handleDiscardCancel}
      onDone={handleDone}
      onBackToToday={handleBackToToday}
    />
  )
}

export default WorkoutSessionContainer
