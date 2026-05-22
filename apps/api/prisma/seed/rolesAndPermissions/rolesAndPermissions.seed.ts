import { PrismaClient } from '@prisma/client'

import { logger } from '../../../src/app'
import permissions from './data/permissions.data'
import rolePermissions from './data/rolePermissions.data'
import roles from './data/roles.data'

export default async function seedRolesAndPermissions(prisma: PrismaClient) {
  logger.info('🌱 Seeding permissions...')

  try {
    for (const permission of permissions) {
      await prisma.permissions.upsert({
        where: { id: permission.id },
        update: permission,
        create: permission
      })
    }

    logger.info('✅ Permissions seeding completed')
  } catch (error) {
    logger.error(`❌ Error seeding permissions: ${error}`)
  }

  try {
    for (const role of roles) {
      await prisma.roles.upsert({
        where: { id: role.id },
        update: role,
        create: role
      })
    }

    logger.info('✅ Roles seeding completed')
  } catch (error) {
    logger.error(`❌ Error seeding roles: ${error}`)
  }

  try {
    for (const rolePermission of rolePermissions) {
      await prisma.role_permissions.upsert({
        where: {
          role_id_permission_id: {
            role_id: rolePermission.role_id,
            permission_id: rolePermission.permission_id
          }
        },
        update: rolePermission,
        create: rolePermission
      })
    }

    logger.info('✅ Role permissions seeding completed')
  } catch (error) {
    logger.error(`❌ Error seeding role permissions: ${error}`)
  }
}
