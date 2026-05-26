import { PlannedExercise } from '@flex/shared/types/trainingPlan/trainingPlan.schemas'

export interface ExerciseDetailRouteParams {
  exerciseId: string
  exerciseName: string
  dayIndex?: number
}

export interface ExerciseDetailComponentProps {
  exercise: PlannedExercise | null
  prescription: string
  instructions: string
  injuryNote: string | null
  isLoading: boolean
  error: string | null
  onRetry: () => void
}
