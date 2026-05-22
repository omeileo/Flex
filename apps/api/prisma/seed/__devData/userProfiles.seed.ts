import { PrismaClient, user_profiles } from '@prisma/client'

import { logger } from '../../../src/app'

const userProfilesList: Omit<user_profiles, 'created_at' | 'updated_at'>[] = [
  {
    id: 1,
    mobile_number: null,
    first_name: 'Juleen',
    middle_name: null,
    last_name: 'Shoppe',
    date_of_birth: null,
    stripe_customer_id: null,
    stripe_connect_account_id: null
  },
  {
    id: 2,
    mobile_number: null,
    first_name: 'Mark',
    middle_name: null,
    last_name: 'Travaille',
    date_of_birth: null,
    stripe_customer_id: null,
    stripe_connect_account_id: null
  },
  {
    id: 3,
    mobile_number: null,
    first_name: 'Keisha',
    middle_name: null,
    last_name: 'Johnson',
    date_of_birth: null,
    stripe_customer_id: null,
    stripe_connect_account_id: null
  }
]

export default async function (prisma: PrismaClient) {
  logger.info('🌱 Seeding user profiles...')

  for (const profile of userProfilesList) {
    await prisma.user_profiles.upsert({
      where: { id: profile.id },
      update: {},
      create: {
        ...profile,
        id: undefined,
        created_at: new Date('2024-08-10 04:36:20.496000'),
        updated_at: null
      }
    })
  }

  logger.info('✅ User profiles seeding completed')
}
