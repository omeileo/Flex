import { PrismaClient } from '@prisma/client'

import { logger } from '../../../src/app'
import { createIdForTable } from '../../../src/shared/functions/id/createIdForTable.functions'
import systems from './data/systems.data'

export default async function (prisma: PrismaClient) {
  logger.info('🌱 Seeding systems...')

  try {
    for (const system of systems) {
      await prisma.systems.upsert({
        where: { name: system.name },
        update: {
          description: system.description,
          is_internal: system.is_internal
        },
        create: {
          id: createIdForTable('systems'),
          name: system.name,
          description: system.description,
          is_internal: system.is_internal
        }
      })
    }

    logger.info('✅ Systems seeding completed')
  } catch (error) {
    logger.error(`❌ Error seeding systems: ${error}`)
  }
}
