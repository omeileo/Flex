import { Roles } from '@/shared/enums/roles.enum'
import { validateUserRole } from '@/shared/middleware/roleValidation.middleware'
import express, { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { getRequestBody } from '../../../../shared/functions/http/request.functions'
import { successResponse } from '../../../../shared/functions/http/response/response.function'
import { requestHandler } from '../../../../shared/middleware/requesthandler.middleware'
import {
  createExternalFlightBookingPaymentIntentsValidator,
  createFlightBookingPaymentIntentsValidator,
  createOfferRequestPaymentIntentsValidator
} from './paymentIntents.middleware'
import './paymentIntents.model'
import { paymentIntentsRoutes } from './paymentIntents.routes'
import { paymentIntentsService } from './paymentIntents.service'
import {
  CreateExternalFlightBookingPaymentIntentRequest,
  CreateFlightBookingPaymentIntentRequest,
  CreateOfferRequestPaymentIntentRequest
} from './paymentIntents.types'

const controller = function () {
  const router = express.Router()

  router.post(
    paymentIntentsRoutes.CREATE_OFFER_REQUEST_PAYMENT_INTENTS.routerPath,
    validateUserRole([Roles.User]),
    requestHandler(createOfferRequestPaymentIntentsValidator, async (req: Request, res: Response) => {
      const paymentIntentRequest = getRequestBody<CreateOfferRequestPaymentIntentRequest>(req)

      const response = await paymentIntentsService.createOfferRequestPaymentIntent(paymentIntentRequest)

      successResponse(
        res,
        StatusCodes.CREATED,
        'Request successful.',
        response,
        'Payment intent for offer request created successfully.'
      )
    })
  )

  router.post(
    paymentIntentsRoutes.CREATE_FLIGHT_BOOKING_PAYMENT_INTENTS.routerPath,
    validateUserRole([Roles.User]),
    requestHandler(createFlightBookingPaymentIntentsValidator, async (req: Request, res: Response) => {
      const paymentIntentRequest = getRequestBody<CreateFlightBookingPaymentIntentRequest>(req)

      const response = await paymentIntentsService.createFlightBookingPaymentIntent(paymentIntentRequest)

      successResponse(
        res,
        StatusCodes.CREATED,
        'Request successful.',
        response,
        'Payment intent for flight booking created successfully.'
      )
    })
  )

  router.post(
    paymentIntentsRoutes.CREATE_EXTERNAL_FLIGHT_BOOKING_PAYMENT_INTENTS.routerPath,
    validateUserRole([Roles.User]),
    requestHandler(createExternalFlightBookingPaymentIntentsValidator, async (req: Request, res: Response) => {
      const paymentIntentRequest = getRequestBody<CreateExternalFlightBookingPaymentIntentRequest>(req)

      const response = await paymentIntentsService.createExternalFlightBookingPaymentIntent(paymentIntentRequest)

      successResponse(
        res,
        StatusCodes.CREATED,
        'Request successful.',
        response,
        'Payment intent for external flight booking created successfully.'
      )
    })
  )

  return router
}

export const paymentIntentsRouter: Router = controller()
