import type { FitnessProfile } from '@flex/shared/types/fitnessProfile/fitnessProfile.schemas'

import { ApiErrorResponse, ApiSuccessResponse } from '../../../../shared/types/api.types'
import { SliceActions } from '../../../../shared/types/slice.types'
import { getProfileActions } from './getProfile.slice'

export type GetProfileRequest = Record<string, never>

export type GetProfileSuccessResponse = ApiSuccessResponse<FitnessProfile>

export type GetProfileErrorResponse = ApiErrorResponse

export interface GetProfileState {
  loading: boolean
  error: string | null
  notFound: boolean
  success: FitnessProfile | null
}

export type GetProfileActionTypes = SliceActions<typeof getProfileActions>
