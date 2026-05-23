import { validateIncomingApiRequest } from '@/shared/functions/http/validateApiRequest.functions'
import { generatePlanRequestSchema } from '@flex/shared/types/trainingPlan/trainingPlan.schemas'
import { z } from 'zod'

export const IncomingGenerateTrainingPlanRequest = z.object({
  body: generatePlanRequestSchema.default({})
})

export const generateTrainingPlanRequestValidator = validateIncomingApiRequest(IncomingGenerateTrainingPlanRequest)

export const TrainingPlanIdParamsSchema = z.object({
  params: z.object({
    id: z.string().min(1).max(64)
  })
})

export const trainingPlanIdParamsValidator = validateIncomingApiRequest(TrainingPlanIdParamsSchema)
