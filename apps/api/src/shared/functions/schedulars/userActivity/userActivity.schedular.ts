import { logger } from '@/app'
import { CronJob } from 'cron'

import { env } from '../../envConfig'
import { durationToCronWithDescription } from '../__scehdular/schedular.functions'
import { processSystemHealthMetrics, processUserEngagementMetrics } from './userActivity.functions'

/**
 * Starts the user activity monitoring scheduler.
 * @async
 * @function startUserActivityMonitoringScheduler
 * @returns {Promise<void>}
 */
export const startUserActivityMonitoringScheduler = async (): Promise<void> => {
  const loggerPrefix = 'User Activity Monitoring Schedular :: '

  try {
    logger.info(`${loggerPrefix} Starting user activity monitoring scheduler`)

    const cron = durationToCronWithDescription(env.USER_ACTIVITY_MONITORING_SCHEDULER_INTERVAL)
    let isJobRunning = false

    const job = new CronJob(cron.cronExpression, async () => {
      logger.info(`${loggerPrefix} Running user activity monitoring job`)

      if (isJobRunning) {
        logger.info(`${loggerPrefix} Previous job still running, skipping this execution`)
        return
      }

      isJobRunning = true

      try {
        await processUserEngagementMetrics()
        await processSystemHealthMetrics()

        logger.info(`${loggerPrefix} User activity monitoring job completed`)
      } catch (error) {
        logger.error(`${loggerPrefix} Error Running Job: ${error}`)
      } finally {
        isJobRunning = false
      }
    })

    job.start()
    logger.info(`${loggerPrefix} Scheduler started. Expected to run: ${cron.description}`)
  } catch (error) {
    logger.error(`${loggerPrefix} Error starting user activity monitoring scheduler`, error)
  }
}
