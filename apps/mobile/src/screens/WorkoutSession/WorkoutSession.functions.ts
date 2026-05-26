import { SessionExercise } from './WorkoutSession.types'

export const calculateSessionVolumeKg = (exercises: SessionExercise[]) =>
  exercises.reduce(
    (total, exercise) =>
      total +
      exercise.sets
        .filter((set) => set.status === 'completed')
        .reduce((setTotal, set) => setTotal + set.reps * set.weightKg, 0),
    0
  )

export const formatVolumeLabel = (volumeKg: number) => {
  if (volumeKg >= 1000) {
    return `${(volumeKg / 1000).toFixed(1)}k kg`
  }

  return `${volumeKg.toLocaleString()} kg`
}

export const formatExerciseLogSummary = (exercise: SessionExercise) =>
  exercise.sets
    .filter((set) => set.status === 'completed')
    .map((set) => `${set.reps}×${set.weightKg} kg`)
    .join(', ')

export const countCompletedSets = (exercises: SessionExercise[]) =>
  exercises.reduce((total, exercise) => total + exercise.sets.filter((set) => set.status === 'completed').length, 0)
