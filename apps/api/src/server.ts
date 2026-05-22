import { app, logger } from '@/app'
import { env } from '@/shared/functions/envConfig'

import prisma from '../prisma/prisma.client'
import { initializeUtilCaches } from './shared/functions/caching/utilCaches.functions'
import { startUserActivityMonitoringScheduler } from './shared/functions/schedulars/userActivity/userActivity.schedular'

const startServer = async () => {
  try {
    await initializeUtilCaches()
    startUserActivityMonitoringScheduler()

    const server = app.listen(env.PORT, () => {
      const { NODE_ENV, HOST, PORT } = env

      logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}${env.APP_BASE_PATH}/swagger`)
    })

    const onCloseSignal = async () => {
      logger.info('sigint received, shutting down')

      await prisma.$disconnect()

      server.close(() => {
        logger.info('server closed')
        process.exit()
      })

      setTimeout(() => process.exit(1), 10000).unref() // Force shutdown after 10s
    }

    process.on('SIGINT', onCloseSignal)
    process.on('SIGTERM', onCloseSignal)
  } catch (error) {
    logger.error('Failed to initialize caches:', error)
    process.exit(1) // Exit the process with an error code
  }
}

startServer()
