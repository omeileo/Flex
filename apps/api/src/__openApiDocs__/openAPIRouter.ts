import express, { Request, Response, Router } from 'express'
import swaggerUi from 'swagger-ui-express'

import { generateOpenAPIDocument } from '../__openApiDocs__/openAPIDocumentGenerator'
import { env } from '../shared/functions/envConfig'

const basePath = env.APP_BASE_PATH

export const swaggerUrl = `${basePath}/swagger/`

export const swaggerJsonUrl = `${basePath}/swagger.json`

export const openAPIRouter: Router = (() => {
  const router = express.Router()
  const openAPIDocument = generateOpenAPIDocument()

  // Serve the raw OpenAPI document
  router.get(swaggerJsonUrl, (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(openAPIDocument)
  })

  // Serve the Swagger UI at the root
  // Todo: Only allow this in development
  router.use(swaggerUrl, swaggerUi.serve, swaggerUi.setup(openAPIDocument))

  return router
})()
