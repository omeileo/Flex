import { logger } from '@/app'

import { userActivityRepository } from './userActivity.repository'

/**
 * Process user engagement metrics and log basic information
 */
export const processUserEngagementMetrics = async (): Promise<void> => {
  const loggerPrefix = 'User Engagement Metrics :: '

  try {
    logger.info(`${loggerPrefix} Starting user engagement analysis`)

    const metrics = await userActivityRepository.getUserEngagementMetrics()

    logger.info(`${loggerPrefix} Active users in last 24h: ${metrics.activeUsers24h}`)
    logger.info(`${loggerPrefix} New user registrations: ${metrics.newUsers}`)
    logger.info(`${loggerPrefix} User sessions created: ${metrics.sessionsCreated}`)
    logger.info(`${loggerPrefix} Average session duration: ${metrics.avgSessionDuration}mins`)

    // Log engagement insights
    if (metrics.activeUsers24h > 100) {
      logger.info(`${loggerPrefix} High user activity detected - system performing well`)
    } else if (metrics.activeUsers24h < 10) {
      logger.warn(`${loggerPrefix} Low user activity - may need attention`)
    }

    logger.info(`${loggerPrefix} User engagement analysis completed`)
  } catch (error) {
    logger.error(`${loggerPrefix} Error processing user engagement metrics:`, error)
    throw error
  }
}

/**
 * Process system health metrics and log basic information
 */
export const processSystemHealthMetrics = async (): Promise<void> => {
  const loggerPrefix = 'System Health Metrics :: '

  try {
    logger.info(`${loggerPrefix} Starting system health check`)

    const healthMetrics = await userActivityRepository.getSystemHealthMetrics()

    logger.info(`${loggerPrefix} Database connections: ${healthMetrics.dbConnections}`)
    logger.info(`${loggerPrefix} API requests in last hour: ${healthMetrics.apiRequests}`)
    logger.info(`${loggerPrefix} Error rate: ${healthMetrics.errorRate}%`)
    logger.info(`${loggerPrefix} Memory usage: ${healthMetrics.memoryUsage}MB`)

    // Log health insights
    if (healthMetrics.errorRate > 5) {
      logger.warn(`${loggerPrefix} High error rate detected - ${healthMetrics.errorRate}%`)
    }

    if (healthMetrics.memoryUsage > 1000) {
      logger.warn(`${loggerPrefix} High memory usage - ${healthMetrics.memoryUsage}MB`)
    }

    logger.info(`${loggerPrefix} System health check completed`)
  } catch (error) {
    logger.error(`${loggerPrefix} Error processing system health metrics:`, error)
    throw error
  }
}
