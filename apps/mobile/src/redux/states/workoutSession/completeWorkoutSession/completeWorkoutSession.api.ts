import { workoutSessionCompleteSchema } from '@flex/shared/types/workoutSession/workoutSession.schemas'
import { configureRequest, replacePathVariables } from '@network/apiClient/apiClient.functions'
import urls from '@network/apiClient/endpoints'
import { z } from 'zod'

import {
  CompleteWorkoutSessionErrorResponse,
  CompleteWorkoutSessionSuccessResponse
} from './completeWorkoutSession.types'

type WorkoutSessionComplete = z.infer<typeof workoutSessionCompleteSchema>

export const completeWorkoutSessionApi = async (request: {
  sessionId: string
  body: WorkoutSessionComplete
}): Promise<CompleteWorkoutSessionSuccessResponse> => {
  const response = await configureRequest({
    url: replacePathVariables(urls.workoutSession.complete, { sessionId: request.sessionId }),
    method: 'POST',
    data: request.body
  })

  if (response.status >= 200 && response.status < 300) {
    return response as CompleteWorkoutSessionSuccessResponse
  } else {
    throw response as CompleteWorkoutSessionErrorResponse
  }
}

export default completeWorkoutSessionApi
