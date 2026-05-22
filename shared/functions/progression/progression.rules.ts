import type {
  PlannedExercise,
  PlannedSet
} from '../../types/trainingPlan/trainingPlan.schemas'

import type {
  ProgressionChange,
  ProgressionInput,
  ProgressionResult,
  SetPerformance
} from './progression.types'

const DEFAULT_WEIGHT_INCREMENT_KG = 2.5
const DEFAULT_REP_INCREMENT = 1

export const applyWeeklyProgression = (
  input: ProgressionInput,
  performances: SetPerformance[] = []
): ProgressionResult => {
  const changes: ProgressionChange[] = []

  const exercises = input.exercises.map((exercise) => {
    const exercisePerformances = performances.filter(
      (p) => p.exerciseId === exercise.exerciseId
    )

    const allSetsCompleted =
      exercisePerformances.length > 0 &&
      exercisePerformances.every((p) => p.completed)

    if (!allSetsCompleted) {
      return exercise
    }

    const progressedSets = exercise.sets.map((set, index) =>
      progressSet(exercise, set, index, changes)
    )

    return { ...exercise, sets: progressedSets }
  })

  return { exercises, changes }
}

const progressSet = (
  exercise: PlannedExercise,
  set: PlannedSet,
  setIndex: number,
  changes: ProgressionChange[]
): PlannedSet => {
  if (set.targetWeightKg != null) {
    const nextWeight = roundWeight(set.targetWeightKg + DEFAULT_WEIGHT_INCREMENT_KG)
    changes.push({
      exerciseId: exercise.exerciseId,
      exerciseName: exercise.exerciseName,
      field: 'targetWeightKg',
      previousValue: set.targetWeightKg,
      nextValue: nextWeight,
      reason: `Week progression: increase load on set ${setIndex + 1}`
    })
    return { ...set, targetWeightKg: nextWeight }
  }

  if (set.targetReps != null) {
    const nextReps = set.targetReps + DEFAULT_REP_INCREMENT
    changes.push({
      exerciseId: exercise.exerciseId,
      exerciseName: exercise.exerciseName,
      field: 'targetReps',
      previousValue: set.targetReps,
      nextValue: nextReps,
      reason: `Week progression: increase reps on set ${setIndex + 1}`
    })
    return { ...set, targetReps: nextReps }
  }

  return set
}

const roundWeight = (kg: number): number => Math.round(kg * 2) / 2
