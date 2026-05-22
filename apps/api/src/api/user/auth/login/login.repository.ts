import { users } from '@prisma/client'

import prisma from '../../../../../prisma/prisma.client'
import { globalErrors } from '../../../../shared/dictionary/errors.dictionary'
import { Status } from '../../../../shared/enums/status.enum'
import { auditLogRepository } from '../../../../shared/repository/auditLog/auditLog.repository'
import { userRepository } from '../../../../shared/repository/user.repository'
import { loginErrors } from './login.dictionary'
import { LoginSettings } from './login.service'
import { LoginUser } from './login.types'

/**
 * Repository for login operations.
 */
export const loginRepository = {
  /**
   * Retrieves a user's login details by their email address.
   * This method is primarily used during the login process to fetch the necessary user details for authentication.
   *
   * @param emailAddress The email address of the user attempting to log in.
   * @returns A promise that resolves to the user's login details, including their ID, password hash, email, and account status.
   * @throws {Error} Throws an 'unauthorized' error if no user is found with the provided email address, indicating an authentication failure.
   */
  getUserToLoginByEmail: async (emailAddress: users['email']): Promise<LoginUser> => {
    const userDetail = await prisma.users.findFirst({
      where: { email: emailAddress },
      select: {
        id: true,
        password_hash: true,
        email: true,
        status: true
      }
    })

    if (!userDetail) {
      throw loginErrors.unauthorized.build()
    }

    return userDetail
  },

  /**
   * Increases the count of incorrect password attempts for a user and may lock the account if the maximum number of attempts is reached.
   * This function is called during the login process when a user enters an incorrect password.
   *
   * @param useId The unique identifier of the user whose incorrect password attempt count is to be incremented.
   * @returns void This function does not return a value but throws an error if the operation fails or if the account is locked.
   * @throws {Error} Throws a 'unauthorized' error if the user's account is locked due to exceeding the maximum number of password attempts.
   * @throws {Error} Throws an 'entityNotUpdated' error if the user cannot be found or the update operation fails.
   */
  increasePasswordIncorrectAttemptsMaybeLockAccount: async (userId: users['id']) => {
    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: {
        password_attempts: {
          increment: 1
        },
        updated_at: new Date()
      },
      select: {
        id: true,
        password_attempts: true
      }
    })

    if (!updatedUser) {
      throw globalErrors.entityNotUpdated.build('User', userId)
    }

    auditLogRepository.logActivity('User login Failed', userId)

    if (updatedUser.password_attempts >= LoginSettings.maxPasswordAttempts) {
      await userRepository.updateUserStatus(updatedUser.id, Status.locked)
    }

    throw loginErrors.unauthorized.build()
  },

  /**
   * Resets the password attempt counter for a user.
   * This is typically called after a successful login or when an account lockout period has expired.
   *
   * @param useId The unique identifier of the user whose password attempt counter is to be reset.
   * @returns The updated user object with the reset password attempt counter.
   * @throws {Error} Throws an error if the user cannot be found or the update operation fails.
   */
  resetPasswordAttempts: async (useId: users['id']) => {
    const updatedUser = await prisma.users.update({
      where: { id: useId },
      data: {
        password_attempts: {
          set: 0
        },
        updated_at: new Date()
      }
    })

    if (!updatedUser) {
      throw globalErrors.entityNotUpdated.build('User', useId)
    }

    return updatedUser
  }
}
