import { PresentedWorkout, WeekStripDay } from '@shared/functions/TrainingPlan/trainingPlanPresentation.types'

export interface TodayComponentProps {
  weekNumber: number
  totalWeeks: number
  weekProgressPercent: number
  weekStripDays: WeekStripDay[]
  workouts: PresentedWorkout[]
  coachNote: string
  isLoading: boolean
  error: string | null
  onRefresh: () => void
  onWorkoutPress: (workout: PresentedWorkout) => void
  onStartWorkout: (workout: PresentedWorkout) => void
}
