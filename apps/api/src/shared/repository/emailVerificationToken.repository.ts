import { email_verification_tokens, users } from '@prisma/client'

import prisma from '../../../prisma/prisma.client'
import { verifyEmailErrors } from '../../api/user/auth/verifyEmail/verifyEmail.dictionary'
import { globalErrors } from '../dictionary/errors.dictionary'
import { createIdForTable } from '../functions/id/createIdForTable.functions'
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
    await transaction.email_verification_tokens.deleteMany({
      where: {
        user_id: userId
      }
    })

    const maxAttempts = 5

    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
      try {
        const emailVerificationToken = await transaction.email_verification_tokens.create({
          data: {
            id: createIdForTable('email_verification_tokens'),
            user_id: userId,
            token: token.emailVerificationToken.generate(),
            short_code: token.emailVerificationToken.generateShortCode(),
            expires_at: token.emailVerificationToken.createExpiryDateFromNow()
          }
        })

        if (!emailVerificationToken) {
          throw globalErrors.entityNotCreated.build('Email Verification Token', userId)
        }

        return emailVerificationToken
      } catch (error) {
        const isUniqueViolation =
          typeof error === 'object' &&
          error !== null &&
          'code' in error &&
          (error as { code?: string }).code === 'P2002'

        if (!isUniqueViolation || attempt === maxAttempts - 1) {
          throw error
        }
      }
    }

    throw globalErrors.entityNotCreated.build('Email Verification Token', userId)
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
  getByShortCode: async (
    shortCode: email_verification_tokens['short_code'],
    email?: users['email']
  ): Promise<email_verification_tokens> => {
    const normalizedCode = shortCode.trim().toUpperCase()

    const tokenEntry = await prisma.email_verification_tokens.findFirst({
      where: {
        short_code: normalizedCode,
        ...(email
          ? {
              users: {
                email: {
                  equals: email.trim(),
                  mode: 'insensitive'
                }
              }
            }
          : {})
      }
    })

    if (!tokenEntry) {
      throw verifyEmailErrors.tokenExpiredOrInvalid.build()
    }

    return tokenEntry
  },

  deleteToken: async (token: email_verification_tokens['token']): Promise<void> => {
    await prisma.email_verification_tokens.delete({
      where: {
        token
      }
    })
  },

  deleteTokenEntry: async (tokenEntryId: email_verification_tokens['id']): Promise<void> => {
    await prisma.email_verification_tokens.delete({
      where: {
        id: tokenEntryId
      }
    })
  }
}
