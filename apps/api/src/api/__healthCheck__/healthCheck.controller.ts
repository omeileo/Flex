import express, { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { successResponse } from '../../shared/functions/http/response/response.function'
import { HealthCheckRoutes } from './healthCheck.routes'

/**
 * Router for handling health check requests
 */
export const healthCheckRouter: Router = (() => {
  const router = express.Router()

  /**
   * Handler for the health check endpoint.
   * @param _req - The request object.
   * @param res - The response object.
   */
  router.get(HealthCheckRoutes.basic.routerPath, (_req: Request, res: Response) => {
    successResponse(res, StatusCodes.OK, 'Service is healthy', null, 'Service is healthy')
  })

  return router
})()
