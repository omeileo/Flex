import { PrismaClient } from '@prisma/client'

import { logger } from '../../../src/app'
import adminUserProfiles from './data/adminUserProfiles.data.json'
import adminUsers from './data/adminUsers.data'

export default async function (prisma: PrismaClient) {
  logger.info('🌱 Seeding admin users...')

  try {
    // Create all profiles first in a single transaction
    await prisma.$transaction(async (transaction) => {
      for (const profile of adminUserProfiles) {
        await transaction.user_profiles.upsert({
          where: { id: profile.id },
          update: {},
          create: {
            ...profile,
            created_at: new Date('2024-08-10 04:36:20.496000'),
            updated_at: null
          }
        })
      }

      // Then create all users
      for (const user of adminUsers) {
        await transaction.users.upsert({
          where: { id: user.id },
          update: {},
          create: {
            ...user,
            user_roles: {
              create: {
                role_id: 3
              }
            },
            created_at: new Date('2024-12-11 01:22:20.496000'),
            updated_at: null
          }
        })
      }
    })

    logger.info('✅ Admin users seeding completed')
  } catch (error) {
    logger.error(`❌ Error seeding admin users: ${error}`)
  }
}
