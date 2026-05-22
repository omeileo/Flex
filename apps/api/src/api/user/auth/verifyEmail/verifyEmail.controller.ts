import { requestHandler } from '@/shared/middleware/requesthandler.middleware'
import express, { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { getRequestBody } from '../../../../shared/functions/http/request.functions'
import { successResponse } from '../../../../shared/functions/http/response/response.function'
import { verifyEmailRequestValidator, verifyEmailResendRequestValidator } from './verifyEmail.middleware'
import { VerifyEmailRoutes } from './verifyEmail.routes'
import { verifyEmailService } from './verifyEmail.service'
import { VerifyEmailRequest, VerifyEmailResendRequest } from './verifyEmail.types'

/**
 * Controller function for verifying email.
 * @returns {express.Router} The router for the verify email endpoint.
 */
const controller = function () {
  const router = express.Router()
  router.post(
    VerifyEmailRoutes.VERIFY.routerPath,
    requestHandler(verifyEmailRequestValidator, async (req: Request, res: Response) => {
      const verifyEmailRequest = getRequestBody<VerifyEmailRequest>(req)

      const activatedUser = await verifyEmailService.verfyEmailWithToken(verifyEmailRequest)

      successResponse(
        res,
        StatusCodes.OK,
        'Email Verified.',
        activatedUser,
        'Your email has been verified. You can now login.'
      )
    })
  )

  router.post(
    VerifyEmailRoutes.VERIFY_RESEND.routerPath,
    requestHandler(verifyEmailResendRequestValidator, async (req: Request, res: Response) => {
      const verifyEmailResendRequest = getRequestBody<VerifyEmailResendRequest>(req)
      await verifyEmailService.resendEmailLink(verifyEmailResendRequest)

      successResponse(
        res,
        StatusCodes.OK,
        'Please check your email to verify your account.',
        {},
        'The verification email was resent. Please check your email to verify your account.'
      )
    })
  )

  return router
}

export const verifyEmailRouter: Router = controller()
