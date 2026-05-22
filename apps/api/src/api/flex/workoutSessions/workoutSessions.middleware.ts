import {
  workoutSessionCompleteSchema,
  workoutSessionCreateSchema
} from '@flex/shared/types/workoutSession/workoutSession.schemas'
import { z } from 'zod'

import { validateIncomingApiRequest } from '@/shared/functions/http/validateApiRequest.functions'

export const IncomingCreateWorkoutSessionRequest = z.object({
  body: workoutSessionCreateSchema
})

export const IncomingCompleteWorkoutSessionRequest = z.object({
  body: workoutSessionCompleteSchema,
  params: z.object({
    id: z.string().regex(/^\d+$/)
  })
})

export const createWorkoutSessionRequestValidator = validateIncomingApiRequest(
  IncomingCreateWorkoutSessionRequest
)

export const completeWorkoutSessionRequestValidator = validateIncomingApiRequest(
  IncomingCompleteWorkoutSessionRequest
)
