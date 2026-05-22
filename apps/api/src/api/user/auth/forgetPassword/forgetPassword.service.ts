import { logger } from '@/app'

import { email } from '../../../../shared/email/email.functions'
import { passwordResetTokenRepository } from '../../../../shared/repository/passwordResetToken.repository'
import { userRepository } from '../../../../shared/repository/user.repository'
import { forgetPasswordRepository } from './forgetPassword.repository'
import { ForgetPasswordRequest, ResetPasswordRequest } from './forgetPassword.types'

export const forgetPasswordService = {
  sendResetLink: async function (forgetPasswordRequest: ForgetPasswordRequest) {
    const user = await forgetPasswordRepository.getUserByEmail(forgetPasswordRequest.email)

    try {
      const passwordResetToken = await passwordResetTokenRepository.create(user.id, user.status)

      email.auth.sendPasswordResetLink(user, passwordResetToken)
    } catch (error) {
      logger.error(`Error sending password reset link: ${error}`)
    }

    return
  },

  resetPassword: async function (resetPasswordRequest: ResetPasswordRequest) {
    const token = await passwordResetTokenRepository.getToken(resetPasswordRequest.resetToken)

    try {
      logger.info(`Resetting password for user: ${token.users.id}`)

      await userRepository.updateUserPassword(token.users.id, resetPasswordRequest.newPassword)

      await passwordResetTokenRepository.deleteToken(token.id)

      await userRepository.unlockAccount(token.users.id)

      email.auth.sendPasswordUpdatedAlert(await userRepository.getAllDataForUser(token.users.id))

      return
    } catch (error) {
      logger.error(`Error resetting password: ${error}`)
      throw error
    }
  }
}
