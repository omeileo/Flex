import { logger } from '@/app'
import { password_reset_tokens, status, users } from '@prisma/client'

import prisma from '../../../prisma/prisma.client'
import { forgetPasswordErrors } from '../../api/user/auth/forgetPassword/forgetPassword.dictionary'
import { globalErrors } from '../dictionary/errors.dictionary'
import { obfuscateSensitiveData } from '../functions/security/security.functions'
import { statusHelper } from '../functions/status.functions'
import { token } from '../functions/token.functions'
import { PrismaTransaction } from '../types/repository.types'

/**
 * Repository for managing password reset tokens.
 */
export const passwordResetTokenRepository = {
  /**
   * Creates a new password reset token for a user.
   * @param userId - The ID of the user.
   * @param status - The status of the user.
   * @param transaction - Optional Prisma transaction object.
   * @returns A promise that resolves to the created password reset token.
   * @throws Throws an error if the password reset token could not be created.
   */
  create: async (
    userId: users['id'],
    status: status,
    transaction: PrismaTransaction = prisma
  ): Promise<password_reset_tokens> => {
    if (!statusHelper.user.isPasswordResetAllowed({ status })) {
      logger.error(`Forbidden password reset attempt for user ${userId} with status ${status.name}`)
      throw forgetPasswordErrors.forbiddenActionAttempt.build()
    }

    logger.info(`Creating password reset token for user ${userId}`)

    const passwordResetToken = await transaction.password_reset_tokens.create({
      data: {
        user_id: userId,
        token: token.passwordResetToken.generate(),
        expires_at: token.passwordResetToken.createExpiryDateFromNow()
      }
    })

    if (!passwordResetToken) {
      logger.error(`Failed to create password reset token for user ${userId}`)
      throw globalErrors.entityNotCreated.build('Password Reset Token', userId)
    }

    logger.info(`Created password reset token for user ${userId}`)

    return passwordResetToken
  },

  /**
   * Gets a password reset token by its token value.
   * @param tokenVlaue - The token value.
   * @returns A promise that resolves to the password reset token.
   * @throws Throws an error if the token is expired or invalid.
   */
  getToken: async (tokenVlaue: password_reset_tokens['token']) => {
    const tokenEntry = await prisma.password_reset_tokens.findFirst({
      where: {
        token: tokenVlaue
      },
      select: {
        id: true,
        expires_at: true,
        users: {
          include: {
            status: true
          }
        }
      }
    })

    if (!tokenEntry) {
      throw forgetPasswordErrors.invalidPasswordResetToken.build()
    }

    if (
      !statusHelper.user.isPasswordResetAllowed({
        status: tokenEntry.users.status
      })
    ) {
      throw forgetPasswordErrors.forbiddenActionAttempt.build()
    }

    if (token.passwordResetToken.isTokenExpired(tokenEntry.expires_at)) {
      throw forgetPasswordErrors.invalidPasswordResetToken.build()
    }

    return tokenEntry
  },

  /**
   * Deletes a password reset token by its token value.
   * @param token - The token value.
   * @returns A promise that resolves when the token is deleted.
   */
  deleteToken: async (tokenId: password_reset_tokens['id']): Promise<void> => {
    logger.info(`Deleting password reset token: ${obfuscateSensitiveData(tokenId.toString())}`)

    await prisma.password_reset_tokens.delete({
      where: {
        id: tokenId
      }
    })
  }
}
