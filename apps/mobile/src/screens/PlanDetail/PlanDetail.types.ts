import { PlannedExercise, PlannedWorkout } from '@flex/shared/types/trainingPlan/trainingPlan.schemas'

export interface PlanDetailRouteParams {
  dayIndex: number
  workoutName: string
}

export interface PlanDetailComponentProps {
  workout: PlannedWorkout | null
  isLoading: boolean
  error: string | null
  onExercisePress: (exercise: PlannedExercise) => void
  onStartWorkout: () => void
}
