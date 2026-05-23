import { configureRequest } from '@network/apiClient/apiClient.functions'
import urls from '@network/apiClient/endpoints'

import { LoginErrorResponse, LoginRequest, LoginSuccessResponse } from './login.types'

export const loginApi = async (request: LoginRequest): Promise<LoginSuccessResponse> => {
  const response = await configureRequest({
    url: urls.auth.login,
    method: 'POST',
    data: request
  })

  if (response.status >= 200 && response.status < 300) {
    return response as LoginSuccessResponse
  } else {
    throw response as LoginErrorResponse
  }
}

export default loginApi
