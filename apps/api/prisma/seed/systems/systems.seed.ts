import { PrismaClient } from '@prisma/client'

import { logger } from '../../../src/app'
import systems from './data/systems.data'

export default async function (prisma: PrismaClient) {
  logger.info('🌱 Seeding systems...')

  try {
    for (const system of systems) {
      await prisma.systems.upsert({
        where: { id: system.id },
        update: {},
        create: system
      })
    }

    logger.info('✅ Systems seeding completed')
  } catch (error) {
    logger.error(`❌ Error seeding systems: ${error}`)
  }
}
