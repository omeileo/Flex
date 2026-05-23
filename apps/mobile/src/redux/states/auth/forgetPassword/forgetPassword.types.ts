import { ApiErrorResponse, ApiSuccessResponse } from '@shared/types/api.types'

export interface ForgetPasswordRequest {
  email: string
}

export type ForgetPasswordSuccessResponse = ApiSuccessResponse<Record<string, never>>

export type ForgetPasswordErrorResponse = ApiErrorResponse

export interface ForgetPasswordState {
  loading: boolean
  error: string | null
  successMessage: string | null
}
