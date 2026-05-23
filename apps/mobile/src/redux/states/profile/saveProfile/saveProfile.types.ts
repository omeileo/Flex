import type { FitnessProfile, FitnessProfileUpsert } from '@flex/shared/types/fitnessProfile/fitnessProfile.schemas'

import { ApiErrorResponse, ApiSuccessResponse } from '../../../../shared/types/api.types'
import { SliceActions } from '../../../../shared/types/slice.types'
import { saveProfileActions } from './saveProfile.slice'

export type SaveProfileRequest = FitnessProfileUpsert

export type SaveProfileSuccessResponse = ApiSuccessResponse<FitnessProfile>

export type SaveProfileErrorResponse = ApiErrorResponse

export interface SaveProfileState {
  loading: boolean
  error: string | null
  success: FitnessProfile | null
}

export type SaveProfileActionTypes = SliceActions<typeof saveProfileActions>
