import type { WorkoutSessionCreate } from '@flex/shared/types/workoutSession/workoutSession.schemas'

import { ApiErrorResponse, ApiSuccessResponse } from '../../../../shared/types/api.types'
import { SliceActions } from '../../../../shared/types/slice.types'
import { createWorkoutSessionActions } from './createWorkoutSession.slice'

export type CreateWorkoutSessionRequest = WorkoutSessionCreate

export type CreateWorkoutSessionSuccessResponse = ApiSuccessResponse<Record<string, unknown>>

export type CreateWorkoutSessionErrorResponse = ApiErrorResponse

export interface CreateWorkoutSessionState {
  loading: boolean
  error: string | null
  success: Record<string, unknown> | null
}

export type CreateWorkoutSessionActionTypes = SliceActions<typeof createWorkoutSessionActions>
