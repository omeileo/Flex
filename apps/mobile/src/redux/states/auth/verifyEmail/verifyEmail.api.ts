import { configureRequest } from '@network/apiClient/apiClient.functions'
import urls from '@network/apiClient/endpoints'
import { ApiErrorResponse } from '@shared/types/api.types'

import {
  ResendVerifyEmailRequest,
  ResendVerifyEmailSuccessResponse,
  VerifyEmailSuccessResponse,
  VerifyEmailWithCodeRequest
} from './verifyEmail.types'

export const verifyEmailApi = async (
  request: VerifyEmailWithCodeRequest
): Promise<VerifyEmailSuccessResponse> => {
  const response = await configureRequest({
    url: urls.auth.verifyEmail,
    method: 'POST',
    data: request.email ? { email: request.email, code: request.code } : { code: request.code }
  })

  if (response.status >= 200 && response.status < 300) {
    return response as VerifyEmailSuccessResponse
  }

  throw response as ApiErrorResponse
}

export const resendVerifyEmailApi = async (
  request: ResendVerifyEmailRequest
): Promise<ResendVerifyEmailSuccessResponse> => {
  const response = await configureRequest({
    url: urls.auth.verifyEmailResend,
    method: 'POST',
    data: request
  })

  if (response.status >= 200 && response.status < 300) {
    return response as ResendVerifyEmailSuccessResponse
  }

  throw response as ApiErrorResponse
}
