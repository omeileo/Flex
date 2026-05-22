import type { WorkoutSessionCreate } from '@flex/shared/types/workoutSession/workoutSession.schemas'
import { SliceActions } from '../../../../shared/types/slice.types'
import { createWorkoutSessionActions } from './createWorkoutSession.slice'

export interface CreateWorkoutSessionRequest extends Record<string, never> {}

export interface CreateWorkoutSessionState {
  loading: boolean
  error: string | null
  success: Record<string, unknown> | null
}

export type CreateWorkoutSessionActionTypes = SliceActions<typeof createWorkoutSessionActions>
