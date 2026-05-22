import { getRequestBody } from '@/shared/functions/http/request.functions'
import { successResponse } from '@/shared/functions/http/response/response.function'
import { requestHandler } from '@/shared/middleware/requesthandler.middleware'
import express, { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { upsertFitnessProfileRequestValidator } from './fitnessProfile.middleware'
import { FitnessProfileRoutes } from './fitnessProfile.routes'
import { fitnessProfileService } from './fitnessProfile.service'
import { UpsertFitnessProfileRequest } from './fitnessProfile.types'

const controller = function () {
  const router = express.Router()

  router.get(
    FitnessProfileRoutes.GET.routerPath,
    requestHandler(null, async (_req: Request, res: Response) => {
      const profile = await fitnessProfileService.getFitnessProfile()

      successResponse(res, StatusCodes.OK, 'Request successful.', profile, 'Fitness profile loaded.')
    })
  )

  router.put(
    FitnessProfileRoutes.UPSERT.routerPath,
    requestHandler(upsertFitnessProfileRequestValidator, async (req: Request, res: Response) => {
      const payload = getRequestBody<UpsertFitnessProfileRequest>(req)
      const profile = await fitnessProfileService.upsertFitnessProfile(payload)

      successResponse(res, StatusCodes.OK, 'Request successful.', profile, 'Fitness profile saved.')
    })
  )

  return router
}

export const fitnessProfileRouter: Router = controller()
