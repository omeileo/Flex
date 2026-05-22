import { Roles } from '@/shared/enums/roles.enum'
import { validateUserRole } from '@/shared/middleware/roleValidation.middleware'
import express, { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { successResponse } from '../../../../shared/functions/http/response/response.function'
import { requestHandler } from '../../../../shared/middleware/requesthandler.middleware'
import { createCheckoutSessionValidator } from './checkoutSession.middleware'
import { checkoutSessionRoutes } from './checkoutSession.routes'
import { checkoutSessionService } from './checkoutSession.service'

const controller = function () {
  const router = express.Router()

  router.post(
    checkoutSessionRoutes.CREATE.routerPath,
    validateUserRole([Roles.User]),
    requestHandler(createCheckoutSessionValidator, async (req: Request, res: Response) => {
      const url = await checkoutSessionService.createCheckoutSession()

      successResponse(res, StatusCodes.OK, 'Request successful.', { url }, 'Checkout session created successfully.')
    })
  )

  return router
}

export const checkoutSessionRouter: Router = controller()
