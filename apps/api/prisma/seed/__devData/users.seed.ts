import { PrismaClient, users } from '@prisma/client'

import { logger } from '../../../src/app'

const usersList: Omit<users, 'created_at' | 'updated_at'>[] = [
  {
    id: 1,
    email: 'no-reply@appshop.biz',
    password_hash: '$argon2id$v=19$m=19456,t=2,p=1$CZ8lE3Tg9cqEJxNRayetJg$qwnTsT7HPwu7RcdwE/Os8Vu3RIeDnlcl8ZxFhDlX8yo',
    user_status_id: 1,
    user_profile_id: 1,
    password_attempts: 0
  },
  {
    id: 2,
    email: 'test@appshop.biz',
    password_hash: '$argon2id$v=19$m=19456,t=2,p=1$fdGktWBRvU7QzlZsZsN6UQ$yy7xtfntSQN+e0y9DXQ97II0P/dI1JJlwGnvVYCmyFg',
    user_status_id: 1,
    user_profile_id: 2,
    password_attempts: 0
  },
  {
    id: 3,
    email: 'test-2@appshop.biz',
    password_hash: '$argon2id$v=19$m=19456,t=2,p=1$nTq7zQwmwzaUQFXEgQsGBQ$UqWp8i+CIL8ozA/hwy/5P9+diF5SPT+pHxK48DfkiD0',
    user_status_id: 1,
    user_profile_id: 3,
    password_attempts: 0
  }
]

export default async function (prisma: PrismaClient) {
  logger.info('🌱 Seeding users...')

  for (const user of usersList) {
    await prisma.users.upsert({
      where: { id: user.id },
      update: {},
      create: {
        ...user,
        user_roles: {
          create: [{ role_id: 1 }, { role_id: 2 }]
        },
        id: undefined,
        created_at: new Date('2024-08-10 04:36:20.496000'),
        updated_at: null
      }
    })
  }

  logger.info('✅ Users seeding completed')
}
