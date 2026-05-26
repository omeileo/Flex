import { configureRequest } from '@network/apiClient/apiClient.functions'
import urls from '@network/apiClient/endpoints'

import { GetProgressMetricsErrorResponse, GetProgressMetricsSuccessResponse } from './getProgressMetrics.types'

export const getProgressMetricsApi = async (): Promise<GetProgressMetricsSuccessResponse> => {
  const response = await configureRequest({
    url: urls.workoutSession.progress,
    method: 'GET'
  })

  if (response.status >= 200 && response.status < 300) {
    return response as GetProgressMetricsSuccessResponse
  }

  throw response as GetProgressMetricsErrorResponse
}

export default getProgressMetricsApi
