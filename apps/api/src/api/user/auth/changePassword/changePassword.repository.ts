import prisma from '../../../../../prisma/prisma.client'
import { globalErrors } from '../../../../shared/dictionary/errors.dictionary'
import { statusHelper } from '../../../../shared/functions/status.functions'
import { changePasswordErrors } from './changePassword.dictionary'

/**
 * Retrieves a user by their ID.
 * @param userId - The ID of the user to retrieve.
 * @returns A Promise that resolves to the user object.
 * @throws {EntityNotFoundError} If the user with the specified ID is not found.
 * @throws {ForbiddenActionError} If the user's status does not allow password change.
 */
export const changePasswordRepository = {
  getUser: async function (userId: string) {
    const user = await prisma.users.findFirst({
      where: {
        id: userId
      },
      select: {
        id: true,
        password_hash: true,
        status: true
      }
    })

    if (!user) {
      throw globalErrors.entityNotFound.build('User')
    }

    if (!statusHelper.user.isPassworChangeAllowed({ status: user.status })) {
      throw changePasswordErrors.forbiddenActionAttempt.build(user.status)
    }

    return user
  }
}
