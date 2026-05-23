import { ApiErrorResponse, ApiSuccessResponse } from '@shared/types/api.types'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponseData {
  token: string
  roles?: string[]
}

export type LoginSuccessResponse = ApiSuccessResponse<LoginResponseData>

export type LoginErrorResponse = ApiErrorResponse

export interface LoginState {
  loading: boolean
  error: string | null
}
