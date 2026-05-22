import { createApiResponses, withJWTMiddleware } from '@/__openApiDocs__/functions/openAPI.functions'
import { zodd } from '@/shared/functions/zod.functions'
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { StatusCodes } from 'http-status-codes'

import { HealthCheckRoutes } from './healthCheck.routes'

export const healthCheckRegistry = new OpenAPIRegistry()

healthCheckRegistry.registerPath({
  method: 'get',
  path: HealthCheckRoutes.basic.openApiFullPath,
  tags: ['Health Check'],
  ...withJWTMiddleware(),
  responses: createApiResponses([
    {
      result: zodd.string().openapi({ description: 'The status of the service' }),
      description: 'Health check endpoint. Returns the status of the service.',
      statusCode: StatusCodes.OK
    }
  ])
})
