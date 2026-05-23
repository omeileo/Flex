import { ApiErrorResponse, ApiSuccessResponse } from '@shared/types/api.types'

export interface VerifyEmailWithCodeRequest {
  code: string
  email?: string
}

export interface VerifyEmailResponseData {
  id: number
  email: string
  status: {
    id: number
    name: string
    display_name: string
    description: string
  }
}

export type VerifyEmailSuccessResponse = ApiSuccessResponse<VerifyEmailResponseData>

export type VerifyEmailErrorResponse = ApiErrorResponse

export interface ResendVerifyEmailRequest {
  email: string
}

export type ResendVerifyEmailSuccessResponse = ApiSuccessResponse<Record<string, never>>

export type ResendVerifyEmailErrorResponse = ApiErrorResponse

export interface VerifyEmailState {
  loading: boolean
  resendLoading: boolean
  error: string | null
  resendMessage: string | null
  verified: boolean
}
