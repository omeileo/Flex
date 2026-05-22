import express, { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { getRequestBody } from '../../../../shared/functions/http/request.functions'
import { successResponse } from '../../../../shared/functions/http/response/response.function'
import { requestHandler } from '../../../../shared/middleware/requesthandler.middleware'
import { signUpRequestValidator } from './signUp.middleware'
import { SignUpRoutes } from './signUp.routes'
import { signUpService } from './signUp.service'
import { SignupRequest } from './signUp.types'

/**
 * Controller function for handling user sign up requests.
 * @returns {express.Router}
 */
const controller = function () {
  const router = express.Router()

  router.post(
    SignUpRoutes.Register.routerPath,
    requestHandler(signUpRequestValidator, async (req: Request, res: Response) => {
      const signUpRequest = getRequestBody<SignupRequest>(req)
      const createdUser = await signUpService.create(signUpRequest)

      successResponse(
        res,
        StatusCodes.CREATED,
        'User registration successful. Please verify your email address.',
        createdUser,
        'You have successfully registered. Please check your email to verify your account.'
      )
    })
  )

  return router
}

export const signUpRouter: Router = controller()
