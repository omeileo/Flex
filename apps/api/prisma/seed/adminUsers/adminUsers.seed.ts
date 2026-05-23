import { PrismaClient } from '@prisma/client'

import { logger } from '../../../src/app'
import { Roles } from '../../../src/shared/enums/roles.enum'
import { Status } from '../../../src/shared/enums/status.enum'
import { StatusType } from '../../../src/shared/enums/statusType.enum'
import { createIdForTable } from '../../../src/shared/functions/id/createIdForTable.functions'
import adminUserProfiles from './data/adminUserProfiles.data.json'
import adminUsers from './data/adminUsers.data'

export default async function (prisma: PrismaClient) {
  logger.info('🌱 Seeding admin users...')

  try {
    const userStatusType = await prisma.status_types.findFirst({
      where: { type: StatusType.user_status }
    })
    const activeStatus = await prisma.status.findFirst({
      where: {
        name: Status.active,
        type_id: userStatusType?.id
      }
    })
    const adminRole = await prisma.roles.findFirst({
      where: { name: Roles.Admin }
    })

    if (!activeStatus || !adminRole) {
      logger.error('Missing active user status or admin role required for admin user seeding')
      return
    }

    await prisma.$transaction(async (transaction) => {
      const profileIdByLegacyId = new Map<number, string>()

      for (const profile of adminUserProfiles) {
        const createdProfile = await transaction.user_profiles.create({
          data: {
            id: createIdForTable('user_profiles'),
            first_name: profile.first_name,
            last_name: profile.last_name,
            stripe_customer_id: profile.stripe_customer_id,
            stripe_connect_account_id: profile.stripe_connect_account_id,
            firebase_user_id: profile.firebase_user_id,
            mobile_number: profile.mobile_number,
            date_of_birth: profile.date_of_birth ? new Date(profile.date_of_birth) : null,
            created_at: new Date('2024-08-10 04:36:20.496000'),
            updated_at: null
          }
        })

        profileIdByLegacyId.set(profile.id, createdProfile.id)
      }

      for (const user of adminUsers) {
        const profileId = profileIdByLegacyId.get(user.user_profile_id)

        if (!profileId) {
          logger.error(`Missing profile for admin user ${user.email}`)
          continue
        }

        await transaction.users.upsert({
          where: { email: user.email },
          update: {},
          create: {
            id: createIdForTable('users'),
            email: user.email,
            password_hash: user.password_hash,
            user_status_id: activeStatus.id,
            user_profile_id: profileId,
            password_attempts: user.password_attempts,
            user_roles: {
              create: {
                id: createIdForTable('user_roles'),
                role_id: adminRole.id
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
