import { Roles } from '@/shared/enums/roles.enum'
import { getRequestBody } from '@/shared/functions/http/request.functions'
import { validateUserRole } from '@/shared/middleware/roleValidation.middleware'
import express, { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { successResponse } from '../../../../shared/functions/http/response/response.function'
import { requestHandler } from '../../../../shared/middleware/requesthandler.middleware'
import { checkOnboardingInfoValidator, createCustomerSessionValidator } from './customerSession.middleware'
import { customerSessionRoutes } from './customerSession.routes'
import { customerSessionService } from './customerSession.service'
import { CheckOnboardingInfoRequest, CreateCustomerSessionRequest } from './customerSession.types'

const controller = function () {
  const router = express.Router()

  router.get(
    customerSessionRoutes.CREATE_CUSTOMER_SESSION.routerPath,
    validateUserRole([Roles.User]),
    requestHandler(createCustomerSessionValidator, async (req: Request, res: Response) => {
      const response = await customerSessionService.createCustomerSession()

      successResponse(
        res,
        StatusCodes.CREATED,
        'Request successful.',
        response,
        'Customer session created successfully.'
      )
    })
  )

  router.post(
    customerSessionRoutes.CREATE_CUSTOMER_ACCOUNT_SESSION.routerPath,
    validateUserRole([Roles.User]),
    requestHandler(createCustomerSessionValidator, async (req: Request, res: Response) => {
      const customerSessionRequest = getRequestBody<CreateCustomerSessionRequest>(req)
      const response = await customerSessionService.createCustomerAccountSession(customerSessionRequest)

      successResponse(
        res,
        StatusCodes.CREATED,
        'Request successful.',
        response,
        'Customer session created successfully.'
      )
    })
  )

  router.post(
    customerSessionRoutes.CHECK_ONBOARDING_INFO.routerPath,
    validateUserRole([Roles.User]),
    requestHandler(checkOnboardingInfoValidator, async (req: Request, res: Response) => {
      const checkOnboardingInfoRequest = getRequestBody<CheckOnboardingInfoRequest>(req)
      const response = await customerSessionService.checkOnboardingInfo(checkOnboardingInfoRequest)

      successResponse(res, StatusCodes.OK, 'Request successful.', response, 'Onboarding info checked successfully.')
    })
  )

  return router
}

export const customerSessionRouter: Router = controller()
