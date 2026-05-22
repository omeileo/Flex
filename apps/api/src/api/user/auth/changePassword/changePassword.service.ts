import { email } from '@/shared/email/email.functions'

import { getCurrentLoggedInUserOrThrow } from '../../../../shared/appContext.context'
import passwordHasher from '../../../../shared/functions/password.functions'
import { userRepository } from '../../../../shared/repository/user.repository'
import { changePasswordErrors } from './changePassword.dictionary'
import { changePasswordRepository } from './changePassword.repository'
import { ChangePasswordRequest } from './changePassword.types'

/**
 * Service responsible for changing user passwords.
 */
export const changePasswordService = {
  /**
   * Updates the password for the current logged-in user.
   * @param changePasswordRequest - The request object containing the current and new passwords.
   */
  updateUserPassword: async function (changePasswordRequest: ChangePasswordRequest) {
    const currentUser = getCurrentLoggedInUserOrThrow()
    const user = await changePasswordRepository.getUser(currentUser.userId)

    const newPassword = await changePasswordService.validatePassword(
      user.password_hash,
      changePasswordRequest.currentPassword,
      changePasswordRequest.newPassword,
      changePasswordRequest.confirmNewPassword
    )

    await userRepository.updateUserPassword(user.id, newPassword)
    email.auth.sendPasswordUpdatedAlert(await userRepository.getAllDataForUser(user.id))

    return
  },

  /**
   * Validates the current and new passwords.
   *
   * @param storedPasswordHash - The hashed password stored in the database.
   * @param currentPassword - The current password entered by the user.
   * @param newPassword - The new password entered by the user.
   * @param confirmNewPassword - The confirmation of the new password entered by the user.
   * @returns The new password if it passes validation.
   * @throws {InvalidAuthenticationCredentialsError} If the current password is incorrect.
   * @throws {PasswordMismatchError} If the new password and confirmation do not match.
   */
  validatePassword: async function (
    storedPasswordHash: string,
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string
  ) {
    if (!(await passwordHasher.verify(currentPassword, storedPasswordHash))) {
      throw changePasswordErrors.invalidAuthenticationCredentials.build()
    }

    if (newPassword !== confirmNewPassword) {
      throw changePasswordErrors.passwordMismatch.build()
    }

    return newPassword
  }
}
