import { configureRequest } from '@network/apiClient/apiClient.functions'
import urls from '@network/apiClient/endpoints'

import {
  ResendVerifyEmailErrorResponse,
  ResendVerifyEmailRequest,
  ResendVerifyEmailSuccessResponse,
  VerifyEmailErrorResponse,
  VerifyEmailSuccessResponse,
  VerifyEmailWithCodeRequest
} from './verifyEmail.types'

export const verifyEmailApi = async (request: VerifyEmailWithCodeRequest): Promise<VerifyEmailSuccessResponse> => {
  const response = await configureRequest({
    url: urls.auth.verifyEmail,
    method: 'POST',
    data: request.email ? { email: request.email, code: request.code } : { code: request.code }
  })

  if (response.status >= 200 && response.status < 300) {
    return response as VerifyEmailSuccessResponse
  } else {
    throw response as VerifyEmailErrorResponse
  }
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
  } else {
    throw response as ResendVerifyEmailErrorResponse
  }
}

export default verifyEmailApi
