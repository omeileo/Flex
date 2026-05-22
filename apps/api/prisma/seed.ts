import { logger } from '../src/app'
import prisma from './prisma.client'
import adminUsersSeed from './seed/adminUsers/adminUsers.seed'
import flexExercisesSeed from './seed/flexExercises.seed'
import rolesAndPermissions from './seed/rolesAndPermissions/rolesAndPermissions.seed'
import statusAndTypes from './seed/statusAndTypes/statusAndTypes.seed'
import userPreferences from './seed/userPreferences/userPreferences.seed'

async function main() {
  await rolesAndPermissions(prisma)
  await statusAndTypes(prisma)
  await userPreferences(prisma)
  await flexExercisesSeed(prisma)
  await adminUsersSeed(prisma)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    logger.error(`❌ Error seeding database: ${e}`)
    await prisma.$disconnect()
    process.exit(1)
  })
