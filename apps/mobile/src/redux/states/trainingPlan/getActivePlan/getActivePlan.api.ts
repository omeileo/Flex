import { configureRequest } from '@network/apiClient/apiClient.functions'
import urls from '@network/apiClient/endpoints'

import { GetActivePlanErrorResponse, GetActivePlanSuccessResponse } from './getActivePlan.types'

export const getActivePlanApi = async (): Promise<GetActivePlanSuccessResponse> => {
  const response = await configureRequest({
    url: urls.trainingPlan.active,
    method: 'GET'
  })

  if (response.status >= 200 && response.status < 300) {
    return response as GetActivePlanSuccessResponse
  } else {
    throw response as GetActivePlanErrorResponse
  }
}

export default getActivePlanApi
