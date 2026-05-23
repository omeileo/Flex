import { configureRequest } from '@network/apiClient/apiClient.functions'
import urls from '@network/apiClient/endpoints'

import { GetProfileErrorResponse, GetProfileSuccessResponse } from './getProfile.types'

export const getProfileApi = async (): Promise<GetProfileSuccessResponse> => {
  const response = await configureRequest({
    url: urls.fitnessProfile.getProfile,
    method: 'GET'
  })

  if (response.status >= 200 && response.status < 300) {
    return response as GetProfileSuccessResponse
  } else {
    throw response as GetProfileErrorResponse
  }
}

export default getProfileApi
