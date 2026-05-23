import type { WorkoutSessionCreate } from '@flex/shared/types/workoutSession/workoutSession.schemas'
import { configureRequest } from '@network/apiClient/apiClient.functions'
import urls from '@network/apiClient/endpoints'

import { CreateWorkoutSessionErrorResponse, CreateWorkoutSessionSuccessResponse } from './createWorkoutSession.types'

export const createWorkoutSessionApi = async (
  request: WorkoutSessionCreate
): Promise<CreateWorkoutSessionSuccessResponse> => {
  const response = await configureRequest({
    url: urls.workoutSession.create,
    method: 'POST',
    data: request
  })

  if (response.status >= 200 && response.status < 300) {
    return response as CreateWorkoutSessionSuccessResponse
  } else {
    throw response as CreateWorkoutSessionErrorResponse
  }
}

export default createWorkoutSessionApi
