import { PlannedExercise } from '@flex/shared/types/trainingPlan/trainingPlan.schemas'

export interface ExerciseDetailRouteParams {
  exerciseId: number
  exerciseName: string
  dayIndex?: number
}

export interface ExerciseDetailComponentProps {
  exercise: PlannedExercise | null
  isLoading: boolean
  error: string | null
}
