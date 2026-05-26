import type { ProgressMetrics } from '@flex/shared/types/progress/progress.schemas'
import type { WorkoutSessionCreate } from '@flex/shared/types/workoutSession/workoutSession.schemas'
import { workoutSessionCompleteSchema } from '@flex/shared/types/workoutSession/workoutSession.schemas'
import type { z } from 'zod'

export type CreateWorkoutSessionRequest = WorkoutSessionCreate

export type CompleteWorkoutSessionRequest = z.infer<typeof workoutSessionCompleteSchema>

export type WorkoutSessionParams = {
  id: string
}

export type WorkoutSessionResponse = {
  id: string
  trainingPlanId: string
  workoutDayIndex: number
  startedAt: string
  completedAt?: string
}

export type WorkoutSessionProgressResponse = ProgressMetrics
