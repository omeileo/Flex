import { PrismaClient, user_preferences } from '@prisma/client'

import { logger } from '../../../src/app'

const userPreferencesList: Omit<
  user_preferences,
  'created_at' | 'updated_at'
>[] = [
  {
    id: 1,
    user_id: 1,
    preference_id: 1,
    value: false
  }
]

export default async function (prisma: PrismaClient) {
  logger.info('🌱 Seeding user preferences...')

  for (const preference of userPreferencesList) {
    await prisma.user_preferences.upsert({
      where: { id: preference.id },
      update: {},
      create: {
        ...preference,
        id: undefined,
        created_at: new Date('2024-08-10 04:36:20.496000'),
        updated_at: null
      }
    })
  }

  logger.info('✅ User preferences seeding completed')
}
