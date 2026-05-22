import express, { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { successResponse } from '../../../../shared/functions/http/response/response.function'
import { requestHandler } from '../../../../shared/middleware/requesthandler.middleware'
import { paymentMethodsValidator } from './paymentMethods.middleware'
import './paymentMethods.model'
import { paymentMethodsRoutes } from './paymentMethods.routes'
import { paymentMethodsService } from './paymentMethods.service'

const controller = function () {
  const router = express.Router()

  router.post(
    paymentMethodsRoutes.LOG_UPDATE.routerPath,
    requestHandler(paymentMethodsValidator, async (_req: Request, res: Response) => {
      await paymentMethodsService.logPaymentMethodUpdate()
      successResponse(res, StatusCodes.CREATED, 'Request successful.', {}, 'Payment method updated successfully.')
    })
  )

  return router
}

export const paymentMethodsRouter: Router = controller()
