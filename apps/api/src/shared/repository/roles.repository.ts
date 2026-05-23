import { logger } from '@/app'
import { roles } from '@prisma/client'

import prisma from '../../../prisma/prisma.client'
import { globalErrors } from '../dictionary/errors.dictionary'
import { Roles } from '../enums/roles.enum'
import { PrismaTransaction } from '../types/repository.types'

/**
 * Repository for managing roles.
 */
export const rolesRepository = {
  getRoles: async (roles: Roles[], transaction: PrismaTransaction = prisma): Promise<roles[]> => {
    logger.info(`Attempting to get roles: ${roles.join(', ')}`)

    try {
      if (!roles || roles.length === 0) {
        logger.error('No roles provided')
        throw globalErrors.criticalSystemEntryNotFound.build('Role', 'No roles provided')
      } else {
        logger.info(`Getting roles: ${roles.join(', ')}`)

        const foundRoles = await transaction.roles.findMany({
          where: {
            name: {
              in: roles
            }
          }
        })

        if (!foundRoles || foundRoles.length !== roles.length) {
          logger.error(`Roles not found: ${roles.join(', ')}`)
          throw globalErrors.criticalSystemEntryNotFound.build('Role', roles.join(', '))
        } else {
          logger.info(`Roles found: ${foundRoles.map((role) => role.name).join(', ')}`)

          return foundRoles
        }
      }
    } catch (error) {
      logger.error(`Error getting roles for ${roles.join(', ')}: ${error}`)
      throw globalErrors.criticalSystemEntryNotFound.build('Role', roles.join(', '))
    }
  },

  getRolesOfUser: async (userId: string): Promise<string[]> => {
    logger.info(`Getting roles of user: ${userId}`)

    try {
      const user = await prisma.users.findUnique({
        where: {
          id: userId
        },
        include: {
          user_roles: {
            include: {
              roles: true
            }
          }
        }
      })

      if (!user) {
        logger.error(`User not found: ${userId}`)
        throw globalErrors.entityNotFound.build('User', userId)
      } else if (!user.user_roles) {
        logger.error(`User roles not found: ${userId}`)
        throw globalErrors.entityNotFound.build('User roles', userId)
      } else {
        const roles = user.user_roles.map((userRole) => userRole.roles.name)

        logger.info(`Roles of user (${userId}): ${roles}`)

        return roles
      }
    } catch (error) {
      logger.error(`Error getting roles of user: ${userId}: ${error}`)

      throw globalErrors.criticalSystemEntryNotFound.build('User roles', userId)
    }
  }
}
