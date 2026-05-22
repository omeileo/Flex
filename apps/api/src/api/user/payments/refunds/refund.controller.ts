import { Roles } from '@/shared/enums/roles.enum'
import { validateUserRole } from '@/shared/middleware/roleValidation.middleware'
import express, { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { getRequestBody } from '../../../../shared/functions/http/request.functions'
import { successResponse } from '../../../../shared/functions/http/response/response.function'
import { requestHandler } from '../../../../shared/middleware/requesthandler.middleware'
import { requestOfferRefundValidator } from './refund.middleware'
import './refund.model'
import { refundRoutes } from './refund.routes'
import { refundService } from './refund.service'
import { RequestOfferRefundRequestBody } from './refund.types'

const controller = function () {
  const router = express.Router()

  router.post(
    refundRoutes.REQUEST_OFFER_REFUND.routerPath,
    validateUserRole([Roles.User]),
    requestHandler(requestOfferRefundValidator, async (req: Request, res: Response) => {
      const offerRefundRequest = getRequestBody<RequestOfferRefundRequestBody>(req)

      await refundService.requestRefundForOfferRequest(offerRefundRequest)

      successResponse(res, StatusCodes.OK, 'Request successful.', {}, 'Your refund has been successfully completed.')
    })
  )

  return router
}

export const refundRouter: Router = controller()
