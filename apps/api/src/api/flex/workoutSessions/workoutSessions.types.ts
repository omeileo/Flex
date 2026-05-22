import type { WorkoutSessionCreate } from '@flex/shared/types/workoutSession/workoutSession.schemas'
import type { z } from 'zod'
import { workoutSessionCompleteSchema } from '@flex/shared/types/workoutSession/workoutSession.schemas'

export type CreateWorkoutSessionRequest = WorkoutSessionCreate

export type CompleteWorkoutSessionRequest = z.infer<typeof workoutSessionCompleteSchema>

export type WorkoutSessionParams = {
  id: string
}

export type WorkoutSessionResponse = {
  id: number
  trainingPlanId: number
  workoutDayIndex: number
  startedAt: string
  completedAt?: string
}
