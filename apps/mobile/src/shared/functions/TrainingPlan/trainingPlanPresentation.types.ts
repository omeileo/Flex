import { PlannedWorkout } from '@flex/shared/types/trainingPlan/trainingPlan.schemas'
import { WorkoutModality } from '@shared/types/workoutModality.types'

export type PresentedWorkout = {
  id: string
  dayIndex: number
  title: string
  modality: WorkoutModality
  durationMinutes: number
  exerciseCount: number
  exercisePreview?: string
}

export type PresentedWeekPlan = {
  weekNumber: number
  dateRange: string
  workoutCount: number
  totalVolume: string
  isCurrent: boolean
  workouts: PresentedWorkout[]
}

export type WeekStripDay = {
  key: string
  label: string
  isToday?: boolean
  hasWorkout?: boolean
  workoutModalityColor?: string
}

export type PlanPhasePresentation = {
  id: string
  name: string
  weeks: string
}

export type TrainingPlanPresentation = {
  programTitle: string
  weekNumber: number
  weekProgressPercent: number
  blurb: string
  phases: PlanPhasePresentation[]
  weekPlans: PresentedWeekPlan[]
  todayWorkouts: PresentedWorkout[]
  weekStripDays: WeekStripDay[]
  workoutsByDay: Map<number, PlannedWorkout>
}
