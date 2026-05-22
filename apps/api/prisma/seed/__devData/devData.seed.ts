import { logger } from '../../../src/app'
import prisma from '../../prisma.client'
import userPreferences from './userPreferences.seed'
import userProfiles from './userProfiles.seed'
import users from './users.seed'

export default async function devDataSeed() {
  await userProfiles(prisma)
  await users(prisma)
  await userPreferences(prisma)

  logger.info('✅ All data in the data folder seeded successfully')
}
