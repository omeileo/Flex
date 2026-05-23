import { PrismaClient } from '@prisma/client'

import { logger } from '../../../src/app'
import { StatusType } from '../../../src/shared/enums/statusType.enum'
import { createIdForTable } from '../../../src/shared/functions/id/createIdForTable.functions'
import statusList from './data/status.data'
import statusTypesList from './data/statusTypes.data'

const legacyStatusTypeIdToEnum: Record<number, StatusType> = {
  1: StatusType.user_status,
  2: StatusType.offer_status,
  3: StatusType.item_tracking_status,
  4: StatusType.flight_status,
  5: StatusType.payment_status,
  6: StatusType.notification_status,
  7: StatusType.virtual_card_status,
  8: StatusType.external_flight_booking_status
}

export default async function (prisma: PrismaClient) {
  logger.info('🌱 Seeding status types...')

  try {
    for (const type of statusTypesList) {
      await prisma.status_types.upsert({
        where: { type: type.type },
        update: { description: type.description },
        create: {
          id: createIdForTable('status_types'),
          type: type.type,
          description: type.description
        }
      })
    }

    logger.info('✅ Status types seeding completed')
  } catch (error) {
    logger.error(`❌ Error seeding status types: ${error}`)
  }

  logger.info('🌱 Seeding statuses...')

  try {
    for (const status of statusList) {
      const statusTypeEnum = legacyStatusTypeIdToEnum[status.type_id]

      if (!statusTypeEnum) {
        logger.error(`Missing status type mapping for legacy type_id ${status.type_id}`)
        continue
      }

      const statusType = await prisma.status_types.findFirst({
        where: { type: statusTypeEnum }
      })

      if (!statusType) {
        logger.error(`Status type not found for ${statusTypeEnum}`)
        continue
      }

      await prisma.status.upsert({
        where: {
          type_id_name: {
            type_id: statusType.id,
            name: status.name
          }
        },
        update: {
          description: status.description,
          display_name: status.display_name
        },
        create: {
          id: createIdForTable('status'),
          type_id: statusType.id,
          name: status.name,
          description: status.description,
          display_name: status.display_name
        }
      })
    }

    logger.info('✅ Statuses seeding completed')
  } catch (error) {
    logger.error(`❌ Error seeding statuses: ${error}`)
  }
}
