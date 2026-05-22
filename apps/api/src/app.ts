import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Express } from 'express'
import helmet from 'helmet'

import { openAPIRouter } from './__openApiDocs__/openAPIRouter'
import { registerRoutes } from './api/__routes__/registerRoutes.functions'
import { env } from './shared/functions/envConfig'
import { createSecureLogger } from './shared/functions/logger/logger.functions'
import { logConnectionUsage } from './shared/middleware/connectionLogger.middleware'
import errorHandler from './shared/middleware/errorHandler.middleware'
import rateLimiter from './shared/middleware/rateLimiter.middleware'
import requestLogger from './shared/middleware/requestLogger/requestLogger.middleware'

// Create a secure logger that automatically sanitizes sensitive data
const logger = createSecureLogger({
  name: 'template-project-api',
  level: env.LOG_LEVEL
})
const app: Express = express()

app.use(express.json())

// Cookie-parser middleware
app.use(cookieParser())

// Set the application to trust the reverse proxy
app.set('trust proxy', true)

// Middlewares
app.use(cors({ origin: env.CORS_ORIGIN.split(','), credentials: true }))
app.use(helmet())
app.use(rateLimiter)

// Request logging
app.use(requestLogger)
app.use(logConnectionUsage)

// Routes
registerRoutes(app)

// Only show Swagger UI in local environments
if (env.NODE_ENV === 'local') {
  app.use(openAPIRouter)
}

// Error handlers
app.use(errorHandler())

export { app, logger }
