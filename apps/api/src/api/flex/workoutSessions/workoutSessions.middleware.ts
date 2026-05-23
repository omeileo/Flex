import { validateIncomingApiRequest } from '@/shared/functions/http/validateApiRequest.functions'
import {
  workoutSessionCompleteSchema,
  workoutSessionCreateSchema
} from '@flex/shared/types/workoutSession/workoutSession.schemas'
import { z } from 'zod'

export const IncomingCreateWorkoutSessionRequest = z.object({
  body: workoutSessionCreateSchema
})

export const IncomingCompleteWorkoutSessionRequest = z.object({
  body: workoutSessionCompleteSchema,
  params: z.object({
    id: z.string().min(1).max(64)
  })
})

export const createWorkoutSessionRequestValidator = validateIncomingApiRequest(IncomingCreateWorkoutSessionRequest)

export const completeWorkoutSessionRequestValidator = validateIncomingApiRequest(IncomingCompleteWorkoutSessionRequest)
