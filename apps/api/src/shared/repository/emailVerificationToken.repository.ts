import { email_verification_tokens, users } from '@prisma/client'

import prisma from '../../../prisma/prisma.client'
import { verifyEmailErrors } from '../../api/user/auth/verifyEmail/verifyEmail.dictionary'
import { globalErrors } from '../dictionary/errors.dictionary'
import { token } from '../functions/token.functions'
import { PrismaTransaction } from '../types/repository.types'

/**
 * Repository for managing email verification tokens.
 */
export const emailVerificationTokenRepository = {
  /**
   * Creates a new email verification token for a user.
   * @param userId - The ID of the user.
   * @param transaction - Optional Prisma transaction object.
   * @returns A promise that resolves to the created email verification token.
   * @throws Throws an error if the email verification token could not be created.
   */
  create: async (userId: users['id'], transaction: PrismaTransaction = prisma): Promise<email_verification_tokens> => {
    const emailVerificationToken = await transaction.email_verification_tokens.create({
      data: {
        user_id: userId,
        token: token.emailVerificationToken.generate(),
        expires_at: token.emailVerificationToken.createExpiryDateFromNow()
      }
    })

    if (!emailVerificationToken) {
      throw globalErrors.entityNotCreated.build('Email Verification Token', userId)
    }

    return emailVerificationToken
  },

  /**
   * Retrieves an email verification token by its token value.
   * @param token - The token value.
   * @returns A promise that resolves to the email verification token.
   * @throws Throws an error if the token is expired or invalid.
   */
  getToken: async (token: email_verification_tokens['token']): Promise<email_verification_tokens> => {
    const tokenEntry = await prisma.email_verification_tokens.findFirst({
      where: {
        token
      }
    })

    if (!tokenEntry) {
      throw verifyEmailErrors.tokenExpiredOrInvalid.build()
    }

    return tokenEntry
  },

  /**
   * Deletes an email verification token by its token value.
   * @param token - The token value.
   * @returns A promise that resolves when the token is deleted.
   */
  deleteToken: async (token: email_verification_tokens['token']): Promise<void> => {
    await prisma.email_verification_tokens.delete({
      where: {
        token
      }
    })
  }
}
