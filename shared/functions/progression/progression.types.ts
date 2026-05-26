import type { PlannedExercise } from '../../types/trainingPlan/trainingPlan.schemas'

export type ProgressionInput = {
  exercises: PlannedExercise[]
  weekNumber: number
}

export type ProgressionResult = {
  exercises: PlannedExercise[]
  changes: ProgressionChange[]
}

export type ProgressionChange = {
  exerciseId: string
  exerciseName: string
  field: 'targetReps' | 'targetWeightKg' | 'targetRpe'
  previousValue: number
  nextValue: number
  reason: string
}

export type SetPerformance = {
  exerciseId: string
  setNumber: number
  repsCompleted?: number
  weightKg?: number
  rpe?: number
  completed: boolean
}
