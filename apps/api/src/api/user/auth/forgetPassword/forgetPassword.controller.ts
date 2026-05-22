import { requestHandler } from '@/shared/middleware/requesthandler.middleware'
import express, { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { getRequestBody } from '../../../../shared/functions/http/request.functions'
import { successResponse } from '../../../../shared/functions/http/response/response.function'
import { forgetPasswordRequestValidator, resetPasswordRequestValidator } from './forgetPassword.middleware'
import { ForgetPasswordRoutes } from './forgetPassword.routes'
import { forgetPasswordService } from './forgetPassword.service'
import { ForgetPasswordRequest, ResetPasswordRequest } from './forgetPassword.types'

/**
 * Controller function for handling user forget password requests.
 * @returns {express.Router}
 */
const controller = function () {
  const router = express.Router()

  router.post(
    ForgetPasswordRoutes.Send_Reset_Email.routerPath,
    requestHandler(forgetPasswordRequestValidator, async (req: Request, res: Response) => {
      const forgetPasswordRequest = getRequestBody<ForgetPasswordRequest>(req)
      await forgetPasswordService.sendResetLink(forgetPasswordRequest)

      successResponse(
        res,
        StatusCodes.CREATED,
        'Password reset request successful. Please check your email for further instructions.',
        {},
        'A password reset link has been sent to your email.'
      )
    })
  )

  router.post(
    ForgetPasswordRoutes.Reset_Password.routerPath,
    requestHandler(resetPasswordRequestValidator, async (req: Request, res: Response) => {
      const resetPasswordRequest = getRequestBody<ResetPasswordRequest>(req)
      await forgetPasswordService.resetPassword(resetPasswordRequest)

      successResponse(
        res,
        StatusCodes.CREATED,
        'Password reset successful.',
        {},
        'Your password has been successfully reset. You can now log in with your new password.'
      )
    })
  )

  return router
}

export const forgetPasswordRouter: Router = controller()
