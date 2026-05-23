import prisma from '../../../../../prisma/prisma.client'
import { globalErrors } from '../../../../shared/dictionary/errors.dictionary'
import { statusHelper } from '../../../../shared/functions/status.functions'
import { verifyEmailErrors } from './verifyEmail.dictionary'

/**
 * Retrieves a user by their ID.
 * @param userId - The ID of the user to retrieve.
 * @returns A Promise that resolves to the user object.
 * @throws {EntityNotFoundError} If the user with the specified ID is not found.
 * @throws {ForbiddenActionError} If the user's status does not allow password change.
 */
/**
 * Repository for verifying email addresses.
 */
export const verifyEmailRepository = {
  getUser: async function (userId: string) {
    const user = await prisma.users.findFirst({
      where: {
        id: userId
      },
      select: {
        id: true,
        email: true,
        status: true,
        user_profile: true
      }
    })

    if (!user) {
      throw globalErrors.entityNotFound.build('User')
    }

    if (!statusHelper.user.isUnverified(user)) {
      throw verifyEmailErrors.userAlreadyVerified.build()
    }

    return user
  },

  getUserByEmail: async function (email: string) {
    const user = await prisma.users.findFirst({
      where: {
        email: {
          equals: email.trim(),
          mode: 'insensitive'
        }
      },
      select: {
        id: true,
        email: true,
        status: true,
        user_profile: true
      }
    })

    if (!user) {
      throw globalErrors.entityNotFound.build('User')
    }

    if (!statusHelper.user.isUnverified(user)) {
      throw verifyEmailErrors.userAlreadyVerified.build()
    }

    return user
  }
}
