import { logger } from '@/app'
import { Prisma, user_profiles, users } from '@prisma/client'
import { PrismaError } from 'prisma-error-enum'

import prisma from '../../../prisma/prisma.client'
import { changePasswordErrors } from '../../api/user/auth/changePassword/changePassword.dictionary'
import { signupErrors } from '../../api/user/auth/signUp/signUp.dictionary'
import { globalErrors } from '../dictionary/errors.dictionary'
import { Roles } from '../enums/roles.enum'
import { Status } from '../enums/status.enum'
import { StatusType } from '../enums/statusType.enum'
import { env } from '../functions/envConfig'
import passwordHasher from '../functions/password.functions'
import { PrismaTransaction } from '../types/repository.types'
import { rolesRepository } from './roles.repository'
import { statusRepository } from './status.repository'
import { userProfileRepository } from './userProfile.repository'

/**
 * Repository for managing user-related operations.
 */
/**
 * Repository for user-related operations.
 */
export const userRepository = {
  /**
   * Creates a new user. and user profile.
   *
   * @param emailAddress - The email address of the user.
   * @param password_hash - The hashed password of the user.
   * @param firstName - The first name of the user.
   * @param lastName - The last name of the user.
   * @param transaction - The Prisma transaction object.
   * @param initalStatus - The initial status of the user.
   * @returns A promise that resolves to the created user.
   * @throws Throws an error if the email address is already taken or if the user cannot be created.
   */
  createUser: async (
    emailAddress: users['email'],
    password_hash: users['password_hash'],
    firstName: user_profiles['first_name'],
    lastName: user_profiles['last_name'],
    transaction: PrismaTransaction = prisma,
    initalStatus: Status = Status.unverified
  ): Promise<users> => {
    // Check if the email address is already taken
    const existingUser = await transaction.users.findFirst({
      where: { email: emailAddress }
    })

    if (existingUser) {
      throw signupErrors.duplicateEmail.build(emailAddress)
    }

    // Get the unverified status
    const unverifiedStatus = await statusRepository.getStatus(StatusType.user_status, initalStatus, transaction)

    // get and  shopper and traveler roles
    const defaultRoles = await rolesRepository.getRoles([Roles.User], transaction)

    // Create the user profile
    const userProfile = await userProfileRepository.create(firstName, lastName, transaction)

    if (!userProfile) {
      throw globalErrors.entityNotCreated.build('User Profile', emailAddress)
    }

    let createdUser = null

    try {
      // Create the user
      createdUser = await transaction.users.create({
        data: {
          email: emailAddress,
          password_hash: await passwordHasher.hash(password_hash),
          password_attempts: 0,
          user_status_id: unverifiedStatus.id,
          user_profile_id: userProfile.id,
          user_roles: {
            create: defaultRoles.map((role) => ({ role_id: role.id }))
          }
        }
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const fields = error.meta?.target as string[]

        if (error.code === PrismaError.UniqueConstraintViolation && fields.includes('email')) {
          throw signupErrors.duplicateEmail.build(emailAddress)
        }
      }
    }

    if (!createdUser) {
      throw globalErrors.entityNotCreated.build('User', emailAddress)
    }

    return createdUser
  },

  /**
   * Updates the status of a user.
   *
   * @param userId - The ID of the user.
   * @param status - The new status of the user.
   * @param transaction - The Prisma transaction object.
   * @returns A promise that resolves to the updated user.
   * @throws Throws an error if the user cannot be updated.
   */
  updateUserStatus: async (userId: number, status: Status, transaction: PrismaTransaction = prisma) => {
    const newStatus = await statusRepository.getStatus(StatusType.user_status, status, transaction)

    // Update the user's status
    const updatedUser = await transaction.users.update({
      where: { id: userId },
      select: { id: true, email: true, status: true },
      data: {
        user_status_id: newStatus.id,
        updated_at: new Date()
      }
    })

    if (!updatedUser) {
      logger.error(`Failed to update user status for user ${userId} from ${status} to ${newStatus.name}`)
      throw globalErrors.entityNotUpdated.build('User', userId)
    } else {
      logger.info(`Updated user status for user ${userId} from ${status} to ${newStatus.name}`)

      return updatedUser
    }
  },

  /**
   * Unlocks a user account.
   * @param userId - The ID of the user to unlock.
   * @returns void
   * @throws {Error} Throws an error if the user cannot be found or the update operation fails.
   */
  unlockAccount: async (userId: users['id']) => {
    logger.info(`Unlocking account for user ${userId}`)
    await userRepository.updateUserStatus(userId, Status.active)
  },

  /**
   * Retrieves user with all related data.
   *
   * Currently, this includes: user_profiles, user_preferences, and status.
   *
   * @param userId - The ID of the user.
   * @returns A promise that resolves to the user's details.
   * @throws Throws an error if the user cannot be found.
   */
  getAllDataForUser: async (userId: number) => {
    logger.info(`Getting all data for user ${userId}`)

    const userDetail = await prisma.users.findFirst({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        user_profile: true,
        status: true,
        user_preferences: { include: { preferences: true } }
      }
    })

    if (!userDetail) {
      logger.error(`User not found for id ${userId}`)
      throw globalErrors.entityNotFound.build('User')
    }

    return userDetail
  },

  /**
   * Retrieves a user with only their user-profile related data.
   *
   * @param userId - The ID of the user.
   * @returns A promise that resolves to the user with their profile.
   * @throws Throws an error if the user cannot be found.
   */
  getUserWithProfile: async (userId: number) => {
    const userDetail = await prisma.users.findFirst({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        user_profile: true
      }
    })

    if (!userDetail) {
      throw globalErrors.entityNotFound.build('User')
    }

    return userDetail
  },

  /**
   * Retrieves a user with only their user-status related data.
   *
   * @param userId - The ID of the user.
   * @returns A promise that resolves to the user with their status.
   * @throws Throws an error if the user cannot be found.
   */
  getUserWithStatus: async (userId: number) => {
    // Get the user with their status
    const user = await prisma.users.findFirst({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        status: true
      }
    })

    if (!user) {
      throw globalErrors.entityNotFound.build('User')
    }

    return user
  },

  /**
   * Updates the password of a user, given their ID
   * Ensures that the new password is different from the old password.
   * @param userId - The ID of the user.
   */
  updateUserPassword: async (userId: number, newPassword: string) => {
    logger.info(`Updating password for user ${userId}`)

    const user = await prisma.users.findFirst({
      where: { id: userId },
      select: { password_hash: true }
    })

    if (!user) {
      logger.error(`User not found for password update for user ${userId}`)
      throw globalErrors.entityNotFound.build('User')
    }

    if (await passwordHasher.verify(newPassword, user.password_hash)) {
      logger.error(`New password is the same as the old password for user ${userId}`)
      throw changePasswordErrors.passwordSameAsOld.build()
    }

    const password_hash = await passwordHasher.hash(newPassword)

    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: {
        password_hash,
        updated_at: new Date()
      }
    })

    if (!updatedUser) {
      logger.error(`Failed to update password for user ${userId}`)
      throw globalErrors.entityNotUpdated.build('User', userId)
    } else {
      logger.info(`Updated password for user ${userId}`)
    }

    return updatedUser
  },

  /**
   * Retrieves the admin user.
   * @returns A promise that resolves to the admin user.
   * @throws Throws an error if the admin user cannot be found.
   */
  getAdminUser: async () => {
    try {
      const adminUser = await prisma.users.findFirst({
        where: { email: env.ADMIN_EMAIL_ADDRESS },
        include: {
          user_profile: true
        }
      })

      if (!adminUser) {
        logger.error(
          `Admin user not found for email ${env.ADMIN_EMAIL_ADDRESS}. Trying to use dev support user instead.`
        )

        const devSupportUser = await prisma.users.findFirst({
          where: { email: env.DEV_SUPPORT_EMAIL_ADDRESS },
          include: {
            user_profile: true
          }
        })

        if (!devSupportUser) {
          logger.error(`Dev support user not found for email ${env.DEV_SUPPORT_EMAIL_ADDRESS}`)

          return null
        }

        return devSupportUser
      } else {
        return adminUser
      }
    } catch (error) {
      logger.error(`Failed to get admin user for email ${env.ADMIN_EMAIL_ADDRESS}`)
    }
  }
}
