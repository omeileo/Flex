import type { TrainingPlan } from '@flex/shared/types/trainingPlan/trainingPlan.schemas'

import { ApiErrorResponse, ApiSuccessResponse } from '../../../../shared/types/api.types'
import { SliceActions } from '../../../../shared/types/slice.types'
import { getActivePlanActions } from './getActivePlan.slice'

export type GetActivePlanRequest = Record<string, never>

export type GetActivePlanSuccessResponse = ApiSuccessResponse<TrainingPlan>

export type GetActivePlanErrorResponse = ApiErrorResponse

export interface GetActivePlanState {
  loading: boolean
  error: string | null
  notFound: boolean
  success: TrainingPlan | null
}

export type GetActivePlanActionTypes = SliceActions<typeof getActivePlanActions>
