import type { GeneratePlanRequest, TrainingPlan } from '@flex/shared/types/trainingPlan/trainingPlan.schemas'

import { ApiErrorResponse, ApiSuccessResponse } from '../../../../shared/types/api.types'
import { SliceActions } from '../../../../shared/types/slice.types'
import { generatePlanActions } from './generatePlan.slice'

export type GeneratePlanSuccessResponse = ApiSuccessResponse<TrainingPlan>

export type GeneratePlanErrorResponse = ApiErrorResponse

export interface GeneratePlanState {
  loading: boolean
  error: string | null
  success: TrainingPlan | null
}

export type GeneratePlanActionTypes = SliceActions<typeof generatePlanActions>

export type { GeneratePlanRequest }
