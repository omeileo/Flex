import type { GeneratePlanRequest, TrainingPlan } from '@flex/shared/types/trainingPlan/trainingPlan.schemas'
import { configureRequest } from '@network/apiClient/apiClient.functions'
import urls from '@network/apiClient/endpoints'

import { GeneratePlanErrorResponse, GeneratePlanSuccessResponse } from './generatePlan.types'

export const generatePlanApi = async (request?: GeneratePlanRequest): Promise<GeneratePlanSuccessResponse> => {
  const response = await configureRequest({
    url: urls.trainingPlan.generate,
    method: 'POST',
    data: request ?? {}
  })

  if (response.status >= 200 && response.status < 300) {
    return response as GeneratePlanSuccessResponse
  } else {
    throw response as GeneratePlanErrorResponse
  }
}

export default generatePlanApi
