import type { FitnessProfile } from '@flex/shared/types/fitnessProfile/fitnessProfile.schemas'
import { SliceActions } from '../../../../shared/types/slice.types'
import { getProfileActions } from './getProfile.slice'

export interface GetProfileRequest extends Record<string, never> {}

export interface GetProfileState {
  loading: boolean
  error: string | null
  notFound: boolean
  success: FitnessProfile | null
}

export type GetProfileActionTypes = SliceActions<typeof getProfileActions>
