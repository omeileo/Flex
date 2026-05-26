import type { ProgressWeeklyVolumeDay } from '../../types/progress/progress.schemas'

export type ProgressSessionSet = {
  exerciseId: string
  setNumber: number
  repsCompleted?: number | null
  weightKg?: number | null
  completed: boolean
}

export type ProgressSession = {
  id: string
  completedAt: string
  sets: ProgressSessionSet[]
}

export type ProgressMetricsResult = {
  workoutsCompletedThisMonth: number
  totalVolumeKg: number
  currentStreakDays: number
  personalRecordsCount: number
  weeklyVolume: ProgressWeeklyVolumeDay[]
}

export type ProgressMetricsReferenceDate = string | Date
