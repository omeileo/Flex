import { configureRequest, replacePathVariables } from '@network/apiClient/apiClient.functions'
import urls from '@network/apiClient/endpoints'

import { GetPlanChangesErrorResponse, GetPlanChangesSuccessResponse } from './getPlanChanges.types'

export const getPlanChangesApi = async (planId: string): Promise<GetPlanChangesSuccessResponse> => {
  const response = await configureRequest({
    url: replacePathVariables(urls.trainingPlan.planChanges, { planId }),
    method: 'GET'
  })

  if (response.status >= 200 && response.status < 300) {
    return response as GetPlanChangesSuccessResponse
  } else {
    throw response as GetPlanChangesErrorResponse
  }
}

export default getPlanChangesApi
