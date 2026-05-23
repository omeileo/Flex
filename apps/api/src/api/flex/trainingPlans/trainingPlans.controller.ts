import { getParams, getRequestBody } from '@/shared/functions/http/request.functions'
import { successResponse } from '@/shared/functions/http/response/response.function'
import { requestHandler } from '@/shared/middleware/requesthandler.middleware'
import express, { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { generateTrainingPlanRequestValidator, trainingPlanIdParamsValidator } from './trainingPlans.middleware'
import { TrainingPlansRoutes } from './trainingPlans.routes'
import { trainingPlansService } from './trainingPlans.service'
import type { GenerateTrainingPlanRequest, TrainingPlanParams } from './trainingPlans.types'

const controller = function () {
  const router = express.Router()

  router.post(
    TrainingPlansRoutes.GENERATE.routerPath,
    requestHandler(generateTrainingPlanRequestValidator, async (req: Request, res: Response) => {
      const payload = getRequestBody<GenerateTrainingPlanRequest>(req)
      const plan = await trainingPlansService.generateTrainingPlan(payload)

      successResponse(res, StatusCodes.CREATED, 'Request successful.', plan, 'Training plan generated.')
    })
  )

  router.get(
    TrainingPlansRoutes.ACTIVE.routerPath,
    requestHandler(null, async (_req: Request, res: Response) => {
      const plan = await trainingPlansService.getActiveTrainingPlan()

      successResponse(res, StatusCodes.OK, 'Request successful.', plan, 'Active training plan loaded.')
    })
  )

  router.post(
    TrainingPlansRoutes.APPLY_WEEKLY_PROGRESSION.routerPath,
    requestHandler(trainingPlanIdParamsValidator, async (req: Request, res: Response) => {
      const { id } = getParams<TrainingPlanParams>(req)
      const plan = await trainingPlansService.applyWeeklyProgression(id)

      successResponse(res, StatusCodes.OK, 'Request successful.', plan, 'Weekly progression applied.')
    })
  )

  router.get(
    TrainingPlansRoutes.CHANGES.routerPath,
    requestHandler(trainingPlanIdParamsValidator, async (req: Request, res: Response) => {
      const { id } = getParams<TrainingPlanParams>(req)
      const changes = await trainingPlansService.getPlanChanges(id)

      successResponse(res, StatusCodes.OK, 'Request successful.', changes, 'Plan changes loaded.')
    })
  )

  return router
}

export const trainingPlansRouter: Router = controller()
