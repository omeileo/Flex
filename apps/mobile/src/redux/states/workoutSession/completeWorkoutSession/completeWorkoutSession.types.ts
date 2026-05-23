import { workoutSessionCompleteSchema } from '@flex/shared/types/workoutSession/workoutSession.schemas'
import { z } from 'zod'

import { ApiErrorResponse, ApiSuccessResponse } from '../../../../shared/types/api.types'
import { SliceActions } from '../../../../shared/types/slice.types'
import { completeWorkoutSessionActions } from './completeWorkoutSession.slice'

type WorkoutSessionComplete = z.infer<typeof workoutSessionCompleteSchema>

export type CompleteWorkoutSessionRequest = {
  sessionId: string
  body: WorkoutSessionComplete
}

export type CompleteWorkoutSessionSuccessResponse = ApiSuccessResponse<Record<string, unknown>>

export type CompleteWorkoutSessionErrorResponse = ApiErrorResponse

export interface CompleteWorkoutSessionState {
  loading: boolean
  error: string | null
  success: Record<string, unknown> | null
}

export type CompleteWorkoutSessionActionTypes = SliceActions<typeof completeWorkoutSessionActions>
