import { logger } from '@/app'
import { obfuscateSensitiveData } from '@/shared/functions/security/security.functions'
import { user_preferences, users } from '@prisma/client'

import prisma from '../../../../../prisma/prisma.client'
import { Preferences } from '../../../../shared/enums/preferences.enum'
import { emailVerificationTokenRepository } from '../../../../shared/repository/emailVerificationToken.repository'
import { userRepository } from '../../../../shared/repository/user.repository'
import { userPreferenceRepository } from '../../../../shared/repository/userPreference.repository'
import { SignupRequest } from './signUp.types'

/**
 * Repository for handling user sign up operations.
 */
export const signUpRepository = {
  /**
   * Creates a new user based on the provided sign up request.
   * @param signUpRequest - The sign up request containing user details.
   * @returns A Promise that resolves to the created user.
   */
  async create(signUpRequest: SignupRequest) {
    return await prisma
      .$transaction(async (transaction) => {
        logger.info(`Creating user: ${obfuscateSensitiveData(signUpRequest.email)}`)

        const createdUser: users = await userRepository.createUser(
          signUpRequest.email,
          signUpRequest.password,
          signUpRequest.firstName,
          signUpRequest.lastName,
          transaction
        )

        logger.info('Creating user preference')

        if (signUpRequest.wantsDealsAndDiscounts) {
          const userPreference: user_preferences = await userPreferenceRepository.createUserPreference(
            createdUser.id,
            Preferences.DEALS_AND_DISCOUNTS,
            transaction
          )

          if (!userPreference) {
            logger.error(`Failed to create user preference for deals and discounts for userId ${createdUser.id}`)
          }
        }

        logger.info('Creating email verification token')

        const token = await emailVerificationTokenRepository.create(createdUser.id, transaction)

        logger.info('User created successfully')

        return { createdUser, token }
      })
      .then(async ({ createdUser, token }) => {
        const userWithStatus = await userRepository.getUserWithStatus(createdUser.id)

        return { userWithStatus, token }
      })
  }
}
