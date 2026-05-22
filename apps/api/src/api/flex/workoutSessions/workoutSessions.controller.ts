import { getParams, getRequestBody } from '@/shared/functions/http/request.functions'
import { successResponse } from '@/shared/functions/http/response/response.function'
import { requestHandler } from '@/shared/middleware/requesthandler.middleware'
import express, { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import {
  completeWorkoutSessionRequestValidator,
  createWorkoutSessionRequestValidator
} from './workoutSessions.middleware'
import { WorkoutSessionsRoutes } from './workoutSessions.routes'
import { workoutSessionsService } from './workoutSessions.service'
import type {
  CompleteWorkoutSessionRequest,
  CreateWorkoutSessionRequest,
  WorkoutSessionParams
} from './workoutSessions.types'

const controller = function () {
  const router = express.Router()

  router.post(
    WorkoutSessionsRoutes.CREATE.routerPath,
    requestHandler(createWorkoutSessionRequestValidator, async (req: Request, res: Response) => {
      const payload = getRequestBody<CreateWorkoutSessionRequest>(req)
      const session = await workoutSessionsService.createWorkoutSession(payload)

      successResponse(res, StatusCodes.CREATED, 'Request successful.', session, 'Workout session started.')
    })
  )

  router.post(
    WorkoutSessionsRoutes.COMPLETE.routerPath,
    requestHandler(completeWorkoutSessionRequestValidator, async (req: Request, res: Response) => {
      const { id } = getParams<WorkoutSessionParams>(req)
      const payload = getRequestBody<CompleteWorkoutSessionRequest>(req)
      const session = await workoutSessionsService.completeWorkoutSession(Number(id), payload)

      successResponse(res, StatusCodes.OK, 'Request successful.', session, 'Workout session completed.')
    })
  )

  return router
}

export const workoutSessionsRouter: Router = controller()
