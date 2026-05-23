import { logger } from '@/app'
import { audit_logs } from '@prisma/client'

import prisma from '../../../../prisma/prisma.client'
import { getCurrentLoggedInUser } from '../../appContext.context'
import { globalErrors } from '../../dictionary/errors.dictionary'
import { ActionInitiators } from '../../enums/actionInitiators.enum'
import { createIdForTable } from '../../functions/id/createIdForTable.functions'
import { PrismaTransaction } from '../../types/repository.types'

/**
 * Repository for audit logs.
 * @returns The audit log or null if it fails to create.
 * @param action The action to log.
 * @param userId The user id to log.
 * @example
 * const auditLog = await auditLogRepository.logActivity('createUser', 1)
 */
export const auditLogRepository = {
  logActivity: async (action: string, userId?: string, transaction?: PrismaTransaction): Promise<audit_logs | null> => {
    logger.info(`Logging activity for ${action} in audit log repository`)

    try {
      const currentUser = getCurrentLoggedInUser()
      const prismaInstance = transaction ?? prisma

      const auditLog = await prismaInstance.audit_logs.create({
        data: {
          id: createIdForTable('audit_logs'),
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
