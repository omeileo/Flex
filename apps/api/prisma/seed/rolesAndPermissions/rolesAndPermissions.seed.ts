import { PrismaClient } from '@prisma/client'

import { logger } from '../../../src/app'
import { createIdForTable } from '../../../src/shared/functions/id/createIdForTable.functions'
import permissions from './data/permissions.data'
import rolePermissions from './data/rolePermissions.data'
import roles from './data/roles.data'

export default async function seedRolesAndPermissions(prisma: PrismaClient) {
  logger.info('🌱 Seeding permissions...')

  try {
    for (const permission of permissions) {
      await prisma.permissions.upsert({
        where: { name: permission.name },
        update: {
          description: permission.description
        },
        create: {
          id: createIdForTable('permissions'),
          name: permission.name,
          description: permission.description
        }
      })
    }

    logger.info('✅ Permissions seeding completed')
  } catch (error) {
    logger.error(`❌ Error seeding permissions: ${error}`)
  }

  try {
    for (const role of roles) {
      await prisma.roles.upsert({
        where: { name: role.name },
        update: {
          description: role.description
        },
        create: {
          id: createIdForTable('roles'),
          name: role.name,
          description: role.description
        }
      })
    }

    logger.info('✅ Roles seeding completed')
  } catch (error) {
    logger.error(`❌ Error seeding roles: ${error}`)
  }

  try {
    for (const rolePermission of rolePermissions) {
      const roleData = roles.find((role) => role.id === rolePermission.role_id)
      const permissionData = permissions.find((permission) => permission.id === rolePermission.permission_id)

      if (!roleData || !permissionData) {
        logger.error(
          `Could not resolve role permission mapping for role_id ${rolePermission.role_id} permission_id ${rolePermission.permission_id}`
        )
        continue
      }

      const role = await prisma.roles.findFirst({
        where: { name: roleData.name }
      })
      const permission = await prisma.permissions.findFirst({
        where: { name: permissionData.name }
      })

      if (!role || !permission) {
        logger.error(`Missing seeded role or permission for ${roleData.name} / ${permissionData.name}`)
        continue
      }

      await prisma.role_permissions.upsert({
        where: {
          role_id_permission_id: {
            role_id: role.id,
            permission_id: permission.id
          }
        },
        update: {},
        create: {
          id: createIdForTable('role_permissions'),
          role_id: role.id,
          permission_id: permission.id
        }
      })
    }

    logger.info('✅ Role permissions seeding completed')
  } catch (error) {
    logger.error(`❌ Error seeding role permissions: ${error}`)
  }
}
