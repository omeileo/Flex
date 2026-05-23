import { WorkoutModality } from '@shared/types/workoutModality.types'

export type WeekSummaryWorkout = {
  id: string
  title: string
  modality: WorkoutModality
}

export type WeekSummaryCardProps = {
  weekNumber: number
  dateRange: string
  workoutCount: number
  totalVolume: string
  workouts: WeekSummaryWorkout[]
  isCurrent?: boolean
  onPress?: () => void
}
