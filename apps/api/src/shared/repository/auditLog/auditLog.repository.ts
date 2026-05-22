import { logger } from '@/app'
import { ActionInitiators } from '@/shared/enums/actionInitiators.enum'
import { audit_logs } from '@prisma/client'

import prisma from '../../../../prisma/prisma.client'
import { getCurrentLoggedInUser } from '../../appContext.context'
import { globalErrors } from '../../dictionary/errors.dictionary'
import { PrismaTransaction } from '../repository.types'

/**
 * Repository for audit logs.
 * @returns The audit log or null if it fails to create.
 * @param action The action to log.
 * @param userId The user id to log.
 * @example
 * const auditLog = await auditLogRepository.logActivity('createUser', 1)
 */
export const auditLogRepository = {
  logActivity: async (action: string, userId?: number, transaction?: PrismaTransaction): Promise<audit_logs | null> => {
    logger.info(`Logging activity for ${action} in audit log repository`)

    try {
      const currentUser = getCurrentLoggedInUser()
      const prismaInstance = transaction ?? prisma

      const auditLog = await prismaInstance.audit_logs.create({
        data: {
          user_id: userId || currentUser.userId,
          user_role: currentUser?.userRole ?? null,
          action: action,
          ip_address: currentUser?.userIp ?? null,
          initiator_type: currentUser?.userId ? ActionInitiators.User : ActionInitiators.System,
          user_agent: currentUser?.userAgent ?? null
        }
      })

      if (!auditLog) {
        logger.error(
          `Failed to create audit log for user ${currentUser?.userId} - ${action} - ${currentUser?.userIp} - ${currentUser?.userAgent}`
        )

        throw globalErrors.entityNotCreated.build(
          'Audit Log',
          `${currentUser?.userId} - ${action} - ${currentUser?.userIp} - ${currentUser?.userAgent}`
        )
      }

      return auditLog
    } catch (error) {
      logger.error(`Failed to create audit log for "${action}". Error`, error)

      return null
    }
  }
}
