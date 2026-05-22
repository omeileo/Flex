import { Roles } from '@/shared/enums/roles.enum'
import express, { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { env } from '../../../../shared/functions/envConfig'
import { getRequestBody } from '../../../../shared/functions/http/request.functions'
import { successResponse } from '../../../../shared/functions/http/response/response.function'
import { requestHandler } from '../../../../shared/middleware/requesthandler.middleware'
import { loginRequestValidator } from './login.middleware'
import { LoginRoutes } from './login.routes'
import { loginService } from './login.service'
import { LoginRequest } from './login.types'

/**
 * Controller function for handling login requests.
 * @returns {express.Router} The router for login requests.
 */
const controller = function () {
  const router = express.Router()

  /**
   * Defines the POST route for user login.
   * This route handler performs user authentication and returns a JWT token upon successful login.
   *
   * @route POST /login (The exact path is defined by `LoginRoutes.LOGIN.routerPath`.)
   * @param loginRequestValidator Middleware that validates the login request body against predefined criteria.
   * @param requestHandler Middleware that handles the request-response lifecycle, including error handling.
   * @callback Asynchronous function that processes the login request.
   *   - Extracts the `LoginRequest` object from the request body.
   *   - Calls `loginService.login` with the extracted `LoginRequest` to authenticate the user.
   *   - On successful authentication, `loginService.login` returns a JWT token.
   *   - Sends a success response back to the client with the status code `200 (OK)`, a success message, and the JWT token.
   *
   * @param {Request} req - The request object, representing the HTTP request.
   * @param {Response} res - The response object, used to send a response back to the client.
   *
   * @returns A success response with a JWT token if the login is successful.
   * @throws Will pass any thrown errors to the next error handling middleware, which could include validation errors or authentication failures.
   */
  router.post(
    LoginRoutes.LOGIN.routerPath,
    requestHandler(loginRequestValidator, async (req: Request, res: Response) => {
      const loginRequest = getRequestBody<LoginRequest>(req)
      const result = await loginService.login(loginRequest)
      const userRoles = result.roles
      const returnedRoles = userRoles.includes(Roles.Admin) ? userRoles : undefined

      res.cookie(
        'jwt',
        { token: result.token },
        {
          httpOnly: true,
          secure: env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 1000 * 60 * 60 * 24 * env.JWT_COOKIE_EXPIRATION_DAYS
        }
      )

      successResponse(
        res,
        StatusCodes.OK,
        'Login successful.',
        {
          roles: returnedRoles
        },
        'You have successfully logged in.'
      )
    })
  )

  return router
}

export const loginRouter: Router = controller()
