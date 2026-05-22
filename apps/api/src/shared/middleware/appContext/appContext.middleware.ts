import { NextFunction, Request, Response } from 'express'

import appContext, { setContextValue } from '../../appContext.context'
import { Roles } from '../../enums/roles.enum'
import { CurrentUser } from './appContext.types'

/**
 * Middleware to set the application context.
 * The application context is used to store the current user and other context values.
 */
const appContextMiddleware = (req: Request, res: Response, next: NextFunction) => {
  appContext.run(() => {
    const currentUser: CurrentUser = {
      userId: req.userPayload?.userId || null,
      userIp: req.ip || 'Unknown',
      userAgent: req.get('User-Agent') || 'Unknown',
      userRole: (req.headers['x-user-role'] as Roles) || 'Unknown'
    }

    setContextValue('currentUser', currentUser)
    next()
  })
}

export default appContextMiddleware
