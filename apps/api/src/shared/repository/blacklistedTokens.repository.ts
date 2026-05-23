import { logger } from '@/app'
import { blacklisted_tokens } from '@prisma/client'

import prisma from '../../../prisma/prisma.client'
import { globalErrors } from '../dictionary/errors.dictionary'
import { createIdForTable } from '../functions/id/createIdForTable.functions'
import { obfuscateSensitiveData } from '../functions/security/security.functions'
import { auditLogRepository } from './auditLog/auditLog.repository'

/**
 * Repository for user logout blacklisted token.
 */
export const blacklistedTokensRepository = {
  blacklistToken: async (token: string): Promise<blacklisted_tokens> => {
    try {
      // First check if token is already blacklisted
      const existingToken = await prisma.blacklisted_tokens.findUnique({
        where: {
          token
        }
      })

      // If token already exists, just return it
      if (existingToken) {
        logger.debug(`Token already blacklisted: ${obfuscateSensitiveData(token)}`)

        return existingToken
      }

      // Create new blacklisted token only if it doesn't exist
      const blacklistedToken = await prisma.blacklisted_tokens.create({
        data: {
          id: createIdForTable('blacklisted_tokens'),
          token
        }
      })

      if (!blacklistedToken) {
        logger.error(`Failed to blacklist token: ${obfuscateSensitiveData(token)}`)

        auditLogRepository.logActivity('User logout failed')
        throw globalErrors.entityNotCreated.build('Logged out token', token)
      } else {
        logger.debug(`Token blacklisted successfully: ${obfuscateSensitiveData(token)}`)

        return blacklistedToken
      }
    } catch (error) {
      logger.error(`Error blacklisting token: ${error}`)
      throw error
    }
  },

  getBlacklistedToken: async (token: string): Promise<blacklisted_tokens | null> => {
    try {
      const blacklistedToken = await prisma.blacklisted_tokens.findFirst({
        where: {
          token
        }
      })

      if (!blacklistedToken) {
        return null
      } else {
        logger.debug(`Blacklisted token found: ${obfuscateSensitiveData(blacklistedToken.token)}`)

        return blacklistedToken
      }
    } catch (error) {
      logger.error(`Error getting blacklisted token: ${error}`)
      throw error
    }
  }
}
