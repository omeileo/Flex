import express, { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { env } from '../../../../shared/functions/envConfig'
import { getJwtTokenFromRequest } from '../../../../shared/functions/http/request.functions'
import { successResponse } from '../../../../shared/functions/http/response/response.function'
import { requestHandler } from '../../../../shared/middleware/requesthandler.middleware'
import { logoutRequestValidator } from './logout.middleware'
import { LogoutRoutes } from './logout.routes'
import { logoutService } from './logout.service'

const controller = function () {
  const router = express.Router()

  router.post(
    LogoutRoutes.LOGOUT.routerPath,
    requestHandler(logoutRequestValidator, async (req: Request, res: Response) => {
      // so we can safely assume that the token is present in the cookie of the request.
      const token = getJwtTokenFromRequest(req) as string

      const response = await logoutService.logout(token)

      res.cookie('jwt', null, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: -1,
        path: '/'
      })

      successResponse(res, StatusCodes.OK, 'Logout successful.', response, 'You have successfully logged out.')
    })
  )

  return router
}

export const logoutRouter: Router = controller()
