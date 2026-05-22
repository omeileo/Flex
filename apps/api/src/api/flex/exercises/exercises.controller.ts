import { successResponse } from '@/shared/functions/http/response/response.function'
import { requestHandler } from '@/shared/middleware/requesthandler.middleware'
import express, { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { ExercisesRoutes } from './exercises.routes'
import { exercisesService } from './exercises.service'

const controller = function () {
  const router = express.Router()

  router.get(
    ExercisesRoutes.LIST.routerPath,
    requestHandler(null, async (_req: Request, res: Response) => {
      const exercises = await exercisesService.listExercises()

      successResponse(res, StatusCodes.OK, 'Request successful.', exercises, 'Exercises loaded.')
    })
  )

  return router
}

export const exercisesRouter: Router = controller()
