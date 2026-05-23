import type { ProgressionChange } from '@flex/shared/functions/progression/progression.types'

import { ApiErrorResponse, ApiSuccessResponse } from '../../../../shared/types/api.types'
import { SliceActions } from '../../../../shared/types/slice.types'
import { getPlanChangesActions } from './getPlanChanges.slice'

export type GetPlanChangesRequest = Record<string, never>

export type GetPlanChangesSuccessResponse = ApiSuccessResponse<ProgressionChange[]>

export type GetPlanChangesErrorResponse = ApiErrorResponse

export interface GetPlanChangesState {
  loading: boolean
  error: string | null
  success: ProgressionChange[] | null
}

export type GetPlanChangesActionTypes = SliceActions<typeof getPlanChangesActions>
