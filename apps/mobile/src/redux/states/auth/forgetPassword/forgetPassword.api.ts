import { configureRequest } from '@network/apiClient/apiClient.functions'
import urls from '@network/apiClient/endpoints'

import {
  ForgetPasswordErrorResponse,
  ForgetPasswordRequest,
  ForgetPasswordSuccessResponse
} from './forgetPassword.types'

export const forgetPasswordApi = async (request: ForgetPasswordRequest): Promise<ForgetPasswordSuccessResponse> => {
  const response = await configureRequest({
    url: urls.auth.forgetPassword,
    method: 'POST',
    data: request
  })

  if (response.status >= 200 && response.status < 300) {
    return response as ForgetPasswordSuccessResponse
  }

  throw response as ForgetPasswordErrorResponse
}

export default forgetPasswordApi
