import type { ProgressMetrics } from '@flex/shared/types/progress/progress.schemas'

import { ApiErrorResponse, ApiSuccessResponse } from '../../../../shared/types/api.types'
import { SliceActions } from '../../../../shared/types/slice.types'
import { getProgressMetricsActions } from './getProgressMetrics.slice'

export type GetProgressMetricsRequest = Record<string, never>

export type GetProgressMetricsSuccessResponse = ApiSuccessResponse<ProgressMetrics>

export type GetProgressMetricsErrorResponse = ApiErrorResponse

export interface GetProgressMetricsState {
  loading: boolean
  error: string | null
  success: ProgressMetrics | null
}

export type GetProgressMetricsActionTypes = SliceActions<typeof getProgressMetricsActions>
