import express, { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { getRequestBody } from '../../../../shared/functions/http/request.functions'
import { successResponse } from '../../../../shared/functions/http/response/response.function'
import { requestHandler } from '../../../../shared/middleware/requesthandler.middleware'
import { changePasswordRequestValidator } from './changePassword.middleware'
import { ChangePasswordRoutes } from './changePassword.routes'
import { changePasswordService } from './changePassword.service'
import { ChangePasswordRequest } from './changePassword.types'

const controller = function () {
  const router = express.Router()

  router.post(
    ChangePasswordRoutes.CHANGE_PASSWORD.routerPath,
    requestHandler(changePasswordRequestValidator, async (req: Request, res: Response) => {
      const changePasswordRequest = getRequestBody<ChangePasswordRequest>(req)

      await changePasswordService.updateUserPassword(changePasswordRequest)

      successResponse(
        res,
        StatusCodes.OK,
        'Password change successful.',
        {},
        'Your password has been successfully changed. You can now log in with your new password.'
      )
    })
  )

  return router
}

export const changePasswordRouter: Router = controller()
