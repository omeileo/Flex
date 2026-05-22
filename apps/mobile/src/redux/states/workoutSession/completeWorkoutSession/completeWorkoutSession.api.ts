import { z } from 'zod'
import { workoutSessionCompleteSchema } from '@flex/shared/types/workoutSession/workoutSession.schemas'
import { getFlexApi } from '../../../../networkRequests/flexApi/flexApi.functions'

type WorkoutSessionComplete = z.infer<typeof workoutSessionCompleteSchema>

export const completeWorkoutSessionApi = async (request: { sessionId: number, body: WorkoutSessionComplete }): Promise<Record<string, unknown>> => {
  return getFlexApi().completeWorkoutSession(request.sessionId, request.body) as Promise<Record<string, unknown>>
}

export default completeWorkoutSessionApi
