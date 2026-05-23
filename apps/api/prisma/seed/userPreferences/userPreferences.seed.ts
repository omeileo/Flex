import { PrismaClient } from '@prisma/client'

import { logger } from '../../../src/app'
import { createIdForTable } from '../../../src/shared/functions/id/createIdForTable.functions'
import userPreferences from './data/userPreferences.data'

export default async function (prisma: PrismaClient) {
  logger.info('🌱 Seeding user preferences...')

  try {
    for (const preference of userPreferences) {
      const existing = await prisma.preferences.findFirst({
        where: { name: preference.name }
      })

      if (existing) {
        await prisma.preferences.update({
          where: { id: existing.id },
          data: {
            description: preference.description
          }
        })
        continue
      }

      await prisma.preferences.create({
        data: {
          id: createIdForTable('preferences'),
          name: preference.name,
          description: preference.description
        }
      })
    }

    logger.info('✅ User preferences seeding completed')
  } catch (error) {
    logger.error(`❌ Error seeding user preferences: ${error}`)
  }
}
