import { logger } from '@/app'
import { obfuscateSensitiveData } from '@/shared/functions/security/security.functions'
import { token } from '@/shared/functions/token.functions'
import { email_verification_tokens } from '@prisma/client'

import { email } from '../../../../shared/email/email.functions'
import { Status } from '../../../../shared/enums/status.enum'
import { emailVerificationTokenRepository } from '../../../../shared/repository/emailVerificationToken.repository'
import { userRepository } from '../../../../shared/repository/user.repository'
import { verifyEmailErrors } from './verifyEmail.dictionary'
import { verifyEmailRepository } from './verifyEmail.repository'
import { VerifyEmailRequest, VerifyEmailResendRequest } from './verifyEmail.types'

/**
 * Service for verifying user email.
 */
export const verifyEmailService = {
  /**
   * Verifies the user's email with the provided verification token.
   *
   * Throws an error if the token is expired or invalid, or if the user is already verified.
   *
   * Updates the user's status to active if verification is successful.
   *
   * Deletes the verification token after successful verification.
   *
   * @param verifyEmailRequest - The request object containing the verification token.
   * @returns The updated user object with the active status.
   */
  verfyEmailWithToken: async (verifyEmailRequest: VerifyEmailRequest) => {
    logger.info(`Verifying email with token: ${obfuscateSensitiveData(verifyEmailRequest.verificationToken)}`)

    try {
      const tokenEntry: email_verification_tokens = await emailVerificationTokenRepository.getToken(
        verifyEmailRequest.verificationToken
      )

      // Todo: Refactor to use APIDateTime instead of Date
      if (token.emailVerificationToken.isTokenExpired(tokenEntry.expires_at)) {
        logger.error(`Token expired: ${obfuscateSensitiveData(verifyEmailRequest.verificationToken)}`)
        throw verifyEmailErrors.tokenExpiredOrInvalid.build()
      }

      const user = await verifyEmailRepository.getUser(tokenEntry.user_id)

      const updatedUser = await userRepository.updateUserStatus(user.id, Status.active)

      logger.info(`Email verified: ${obfuscateSensitiveData(updatedUser.email)}`)

      emailVerificationTokenRepository.deleteToken(tokenEntry.token)

      return updatedUser
    } catch (error) {
      logger.error(`Error verifying email: ${error}`)
      throw error
    }
  },

  resendEmailLink: async (verifyEmailResendRequest: VerifyEmailResendRequest) => {
    logger.info(`Resending email link for: ${obfuscateSensitiveData(verifyEmailResendRequest.email)}`)

    try {
      const user = await verifyEmailRepository.getUserByEmail(verifyEmailResendRequest.email)

      const token = await emailVerificationTokenRepository.create(user.id)

      logger.info(`Email link resent for: ${obfuscateSensitiveData(verifyEmailResendRequest.email)}`)

      email.auth.sendEmailVerification(user, token)
    } catch (error) {
      logger.error('Error resending email link', error)
      throw error
    }
  }
}
