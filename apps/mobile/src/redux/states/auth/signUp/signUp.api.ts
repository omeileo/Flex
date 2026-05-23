import { configureRequest } from '@network/apiClient/apiClient.functions'
import urls from '@network/apiClient/endpoints'

import { SignUpErrorResponse, SignUpRequest, SignUpSuccessResponse } from './signUp.types'

export const signUpApi = async (request: SignUpRequest): Promise<SignUpSuccessResponse> => {
  const response = await configureRequest({
    url: urls.auth.signUp,
    method: 'POST',
    data: request
  })

  if (response.status >= 200 && response.status < 300) {
    return response as SignUpSuccessResponse
  } else {
    throw response as SignUpErrorResponse
  }
}

export default signUpApi
