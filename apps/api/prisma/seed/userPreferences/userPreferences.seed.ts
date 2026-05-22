import { PrismaClient } from '@prisma/client'

import { logger } from '../../../src/app'
import userPreferences from './data/userPreferences.data'

export default async function (prisma: PrismaClient) {
  logger.info('🌱 Seeding user preferences...')

  try {
    for (const preference of userPreferences) {
      await prisma.preferences.upsert({
        where: { id: preference.id },
        update: {},
        create: preference
      })
    }

    logger.info('✅ User preferences seeding completed')
  } catch (error) {
    logger.error(`❌ Error seeding user preferences: ${error}`)
  }
}
