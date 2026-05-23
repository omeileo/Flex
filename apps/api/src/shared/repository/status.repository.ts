import { logger } from '@/app'
import { status, status_types } from '@prisma/client'

import prisma from '../../../prisma/prisma.client'
import { globalErrors } from '../dictionary/errors.dictionary'
import { Status } from '../enums/status.enum'
import { StatusType } from '../enums/statusType.enum'
import { PrismaTransaction } from '../types/repository.types'

/**
 * Repository for managing statuses.
 */
export const statusRepository = {
  /**
   * Retrieves the status based on the status type and status name.
   * @param statusType - The type of the status.
   * @param status - The name of the status.
   * @param transaction - The Prisma transaction object (optional, defaults to prisma).
   * @returns A Promise that resolves to the target status.
   * @throws {CriticalSystemEntryNotFound} If the status type or status is not found.
   */
  // Todo: Cache Status and Seeded Tables
  getStatus: async (
    statusType: StatusType,
    status: Status,
    transaction: PrismaTransaction = prisma
  ): Promise<status> => {
    try {
      const type = await transaction.status_types.findFirst({
        where: { type: statusType }
      })

      if (!type) {
        logger.error(`Failed to find status type: ${statusType}.`)
        throw globalErrors.criticalSystemEntryNotFound.build('Status Type', statusType)
      }

      const targetStatus = await transaction.status.findFirst({
        where: { type_id: type.id, name: status }
      })

      if (!targetStatus) {
        logger.error(`Failed to find status: ${status} for status type: ${statusType}.`)
        throw globalErrors.criticalSystemEntryNotFound.build('Status', status)
      }

      return targetStatus
    } catch (error) {
      logger.error(`Failed to find status: ${status} for status type: ${statusType}.`)
      throw globalErrors.criticalSystemEntryNotFound.build('Status', status)
    }
  },

  /**
   * Retrieves the status based on the status ID.
   * @param statusId - The ID of the status.
   * @param transaction - The Prisma transaction object (optional, defaults to prisma).
   * @returns A Promise that resolves to the target status.
   * @throws {CriticalSystemEntryNotFound} If the status is not found.
   */
  getStatusById: async (statusId: string, transaction: PrismaTransaction = prisma): Promise<status> => {
    const status = await transaction.status.findFirst({
      where: { id: statusId }
    })

    if (!status) {
      throw globalErrors.criticalSystemEntryNotFound.build('Status', statusId)
    } else {
      return status
    }
  },

  /**
   * Retrieves the status type record based on the status type.
   * @param statusType - The type of the status.
   * @param transaction - The Prisma transaction object (optional, defaults to prisma).
   * @returns A Promise that resolves to the target status type.
   * @throws {CriticalSystemEntryNotFound} If the status type is not found.
   */
  getStatusType: async (statusType: StatusType, transaction: PrismaTransaction = prisma): Promise<status_types> => {
    logger.info(`Attempting to find status type: ${statusType}.`)

    try {
      const type = await transaction.status_types.findFirst({
        where: { type: statusType }
      })

      if (!type) {
        logger.error(`Failed to find status type: ${statusType}.`)
        throw globalErrors.criticalSystemEntryNotFound.build('Status Type', statusType)
      }

      logger.info(`Found status type: ${type.id}.`)

      return type
    } catch (error) {
      logger.error(`Failed to find status by type: ${statusType}.`)
      throw globalErrors.criticalSystemEntryNotFound.build('Status Type', statusType)
    }
  }
}
