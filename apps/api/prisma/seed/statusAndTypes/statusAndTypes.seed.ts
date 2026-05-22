import { PrismaClient } from '@prisma/client'

import { logger } from '../../../src/app'
import statusList from './data/status.data'
import statusTypesList from './data/statusTypes.data'

export default async function (prisma: PrismaClient) {
  logger.info('🌱 Seeding status types...')

  try {
    for (const type of statusTypesList) {
      await prisma.status_types.upsert({
        where: { id: type.id },
        update: type,
        create: type
      })
    }

    logger.info('✅ Status types seeding completed')
  } catch (error) {
    logger.error(`❌ Error seeding status types: ${error}`)
  }

  logger.info('🌱 Seeding statuses...')

  try {
    for (const status of statusList) {
      await prisma.status.upsert({
        where: { id: status.id },
        update: status,
        create: status
      })
    }

    logger.info('✅ Statuses seeding completed')
  } catch (error) {
    logger.error(`❌ Error seeding statuses: ${error}`)
  }
}
