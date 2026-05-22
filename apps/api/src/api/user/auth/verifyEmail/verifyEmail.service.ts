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
import {
  VerifyEmailRequest,
  VerifyEmailResendRequest,
  VerifyEmailWithCodeAndEmailRequest,
  VerifyEmailWithCodeRequest,
  VerifyEmailWithTokenRequest
} from './verifyEmail.types'

const isVerifyWithToken = (request: VerifyEmailRequest): request is VerifyEmailWithTokenRequest =>
  'verificationToken' in request

const isVerifyWithCodeAndEmail = (request: VerifyEmailRequest): request is VerifyEmailWithCodeAndEmailRequest =>
  'email' in request && 'code' in request

const activateUserFromTokenEntry = async (tokenEntry: email_verification_tokens) => {
  if (token.emailVerificationToken.isTokenExpired(tokenEntry.expires_at)) {
    throw verifyEmailErrors.tokenExpiredOrInvalid.build()
  }

  const user = await verifyEmailRepository.getUser(tokenEntry.user_id)
  const updatedUser = await userRepository.updateUserStatus(user.id, Status.active)

  await emailVerificationTokenRepository.deleteTokenEntry(tokenEntry.id)

  return updatedUser
}

/**
 * Service for verifying user email.
 */
export const verifyEmailService = {
  /**
   * Verifies the user's email with the provided verification token.
   */
  verfyEmailWithToken: async (verifyEmailRequest: VerifyEmailWithTokenRequest) => {
    logger.info(`Verifying email with token: ${obfuscateSensitiveData(verifyEmailRequest.verificationToken)}`)

    try {
      const tokenEntry = await emailVerificationTokenRepository.getToken(verifyEmailRequest.verificationToken)
      const updatedUser = await activateUserFromTokenEntry(tokenEntry)

      logger.info(`Email verified: ${obfuscateSensitiveData(updatedUser.email)}`)

      return updatedUser
    } catch (error) {
      logger.error(`Error verifying email: ${error}`)
      throw error
    }
  },

  /**
   * Verifies the user's email with a six-character code (and optional email).
   */
  verifyEmailWithCode: async (verifyEmailRequest: VerifyEmailWithCodeRequest | VerifyEmailWithCodeAndEmailRequest) => {
    const emailForLookup = 'email' in verifyEmailRequest ? verifyEmailRequest.email : undefined

    logger.info(
      `Verifying email with code: ${obfuscateSensitiveData(verifyEmailRequest.code)}${emailForLookup ? ` for ${obfuscateSensitiveData(emailForLookup)}` : ''}`
    )

    try {
      const tokenEntry = await emailVerificationTokenRepository.getByShortCode(verifyEmailRequest.code, emailForLookup)
      const updatedUser = await activateUserFromTokenEntry(tokenEntry)

      logger.info(`Email verified with code: ${obfuscateSensitiveData(updatedUser.email)}`)

      return updatedUser
    } catch (error) {
      logger.error(`Error verifying email with code: ${error}`)
      throw error
    }
  },

  verifyEmail: async (verifyEmailRequest: VerifyEmailRequest) => {
    if (isVerifyWithToken(verifyEmailRequest)) {
      return verifyEmailService.verfyEmailWithToken(verifyEmailRequest)
    }

    if (isVerifyWithCodeAndEmail(verifyEmailRequest)) {
      return verifyEmailService.verifyEmailWithCode(verifyEmailRequest)
    }

    return verifyEmailService.verifyEmailWithCode(verifyEmailRequest)
  },

  resendEmailLink: async (verifyEmailResendRequest: VerifyEmailResendRequest) => {
    logger.info(`Resending email link for: ${obfuscateSensitiveData(verifyEmailResendRequest.email)}`)

    try {
      const user = await verifyEmailRepository.getUserByEmail(verifyEmailResendRequest.email)
      const verificationToken = await emailVerificationTokenRepository.create(user.id)

      logger.info(`Email link resent for: ${obfuscateSensitiveData(verifyEmailResendRequest.email)}`)

      email.auth.sendEmailVerification(user, verificationToken)
    } catch (error) {
      logger.error('Error resending email link', error)
      throw error
    }
  }
}
