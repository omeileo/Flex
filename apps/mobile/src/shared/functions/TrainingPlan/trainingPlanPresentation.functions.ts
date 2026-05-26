import { PlannedWorkout, TrainingPlan } from '@flex/shared/types/trainingPlan/trainingPlan.schemas'
import { WorkoutModality, workoutModalityColors } from '@shared/types/workoutModality.types'

import {
  PresentedWeekPlan,
  PresentedWorkout,
  TrainingPlanPresentation,
  WeekStripDay
} from './trainingPlanPresentation.types'

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const DAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

export const inferWorkoutModality = (workout: PlannedWorkout): WorkoutModality => {
  const name = workout.name.toLowerCase()

  if (name.includes('run') || name.includes('cardio') || name.includes('easy')) {
    return 'energy'
  }

  if (name.includes('mobility') || name.includes('recovery') || name.includes('stretch')) {
    return 'mobility'
  }

  if (name.includes('conditioning') || name.includes('circuit')) {
    return 'conditioning'
  }

  return 'strength'
}

export const estimateDurationMinutes = (workout: PlannedWorkout): number => {
  const setCount = workout.exercises.reduce((total, exercise) => total + exercise.sets.length, 0)

  return Math.max(20, Math.min(90, setCount * 3 + workout.exercises.length * 2))
}

const estimateVolumeLabel = (workouts: PlannedWorkout[]): string => {
  const setCount = workouts.reduce(
    (total, workout) => total + workout.exercises.reduce((inner, exercise) => inner + exercise.sets.length, 0),
    0
  )

  return `${(setCount * 320).toLocaleString()} kg`
}

const buildExercisePreviewLine = (workout: PlannedWorkout): string => {
  const names = workout.exercises.slice(0, 3).map((exercise) => exercise.exerciseName)
  const remainder = workout.exercises.length - names.length

  if (remainder > 0) {
    return `${names.join(' · ')} +${remainder}`
  }

  return names.join(' · ')
}

const toPresentedWorkout = (workout: PlannedWorkout): PresentedWorkout => ({
  id: `day-${workout.dayIndex}`,
  dayIndex: workout.dayIndex,
  title: workout.name,
  modality: inferWorkoutModality(workout),
  durationMinutes: estimateDurationMinutes(workout),
  exerciseCount: workout.exercises.length,
  exercisePreview: buildExercisePreviewLine(workout)
})

export const buildWeekStripDays = (workouts: PlannedWorkout[], todayIndex = new Date().getDay()): WeekStripDay[] => {
  const normalizedToday = todayIndex === 0 ? 6 : todayIndex - 1
  const workoutDaySet = new Set(workouts.map((workout) => workout.dayIndex % 7))

  return DAY_KEYS.map((key, index) => {
    const hasWorkout = workoutDaySet.has(index)
    const workout = workouts.find((entry) => entry.dayIndex % 7 === index)
    const modality = workout ? inferWorkoutModality(workout) : 'strength'

    return {
      key,
      label: DAY_LABELS[index],
      isToday: index === normalizedToday,
      hasWorkout,
      workoutModalityColor: hasWorkout ? workoutModalityColors[modality] : undefined
    }
  })
}

export const buildTrainingPlanPresentation = (
  plan: TrainingPlan,
  copy: {
    programTitle: string
    blurb: string
    phases: Array<{ id: string; name: string; weeks: string }>
    dateRange: string
  }
): TrainingPlanPresentation => {
  const presentedWorkouts = plan.workouts.map(toPresentedWorkout)
  const weekNumber = plan.weekNumber ?? 1
  const normalizedToday = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1
  const todayWorkouts = plan.workouts
    .filter((workout) => workout.dayIndex % 7 === normalizedToday)
    .map(toPresentedWorkout)

  const weekPlan: PresentedWeekPlan = {
    weekNumber,
    dateRange: copy.dateRange,
    workoutCount: presentedWorkouts.length,
    totalVolume: estimateVolumeLabel(plan.workouts),
    isCurrent: true,
    workouts: presentedWorkouts
  }

  const workoutsByDay = new Map<number, PlannedWorkout>(plan.workouts.map((workout) => [workout.dayIndex, workout]))

  return {
    programTitle: copy.programTitle,
    weekNumber,
    weekProgressPercent: Math.min(100, Math.round((weekNumber / 12) * 100)),
    blurb: copy.blurb,
    phases: copy.phases,
    weekPlans: [weekPlan],
    todayWorkouts: todayWorkouts.length > 0 ? todayWorkouts : presentedWorkouts.slice(0, 2),
    weekStripDays: buildWeekStripDays(plan.workouts),
    workoutsByDay
  }
}

export const formatExercisePrescription = (sets: PlannedWorkout['exercises'][number]['sets']): string => {
  if (sets.length === 0) {
    return ''
  }

  const reps = sets[0].targetReps ?? 8
  const weight = sets[0].targetWeightKg

  if (weight) {
    return `${sets.length}×${reps} @ ${weight} kg`
  }

  return `${sets.length}×${reps}`
}
