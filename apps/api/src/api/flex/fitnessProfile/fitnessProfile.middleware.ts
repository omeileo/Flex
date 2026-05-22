import { fitnessProfileUpsertSchema } from '@flex/shared/types/fitnessProfile/fitnessProfile.schemas'
import { z } from 'zod'

import { validateIncomingApiRequest } from '@/shared/functions/http/validateApiRequest.functions'

export const IncomingFitnessProfileUpsertRequest = z.object({
  body: fitnessProfileUpsertSchema
})

export const upsertFitnessProfileRequestValidator = validateIncomingApiRequest(
  IncomingFitnessProfileUpsertRequest
)
