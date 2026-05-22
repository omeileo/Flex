import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { Roles } from '../enums/roles.enum'
import { quickErrorResponse } from '../functions/http/response/response.function'

/**
 * Middleware to validate the user role
 * @param allowedRoles - The allowed roles
 * @returns The middleware function
 */
export const validateUserRole = (allowedRoles: Roles[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.header('X-User-Role') as Roles

    if (!userRole || !Object.values(Roles).includes(userRole)) {
      const response = quickErrorResponse(
        StatusCodes.BAD_REQUEST,
        'Bad Request',
        'Invalid or missing X-User-Role header',
        [],
        'A valid role is required'
      )

      return res.status(response.status).json(response)
    }

    if (!allowedRoles.includes(userRole)) {
      const response = quickErrorResponse(
        StatusCodes.FORBIDDEN,
        'Access denied',
        'The role provided is not authorized to access this resource.',
        [],
        'You are not authorized to access this resource in this role.'
      )

      return res.status(response.status).json(response)
    }

    next()
  }
}
