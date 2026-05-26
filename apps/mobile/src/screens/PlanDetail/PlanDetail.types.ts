import { PlannedExercise, PlannedWorkout } from '@flex/shared/types/trainingPlan/trainingPlan.schemas'

export interface PlanDetailRouteParams {
  dayIndex: number
  weekNumber?: number
  workoutName: string
}

export interface PlanDetailComponentProps {
  workout: PlannedWorkout | null
  sessionMeta: string
  coachNote: string
  warmUpItems: string[]
  isLoading: boolean
  error: string | null
  onExercisePress: (exercise: PlannedExercise) => void
  onStartWorkout: () => void
  onRetry: () => void
}
