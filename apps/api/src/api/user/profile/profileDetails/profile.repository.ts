import { logger } from '@/app'
import { obfuscateSensitiveData } from '@/shared/functions/security/security.functions'

import prisma from '../../../../../prisma/prisma.client'
import { globalErrors } from '../../../../shared/dictionary/errors.dictionary'

export const profileRepository = {
  getUserProfile: async (userId: number) => {
    logger.info(`Retrieving user profile for user ${userId}`)

    try {
      const profile = await prisma.user_profiles.findFirst({
        where: {
          user: {
            id: userId
          }
        },
        select: {
          id: true,
          first_name: true,
          middle_name: true,
          last_name: true,
          date_of_birth: true,
          mobile_number: true,
          stripe_customer_id: true,
          stripe_connect_account_id: true,
          firebase_user_id: true,
          user: {
            select: {
              email: true,
              user_loyalty_programs: true,
              user_delivery_addresses: {
                include: {
                  cities: true,
                  countries: true
                }
              }
            }
          }
        }
      })

      if (!profile) {
        logger.error(`User profile not found for user ${userId}`)

        throw globalErrors.entityNotFound.build('Profile')
      } else {
        logger.info(`User profile retrieved for user ${userId}`)

        return profile
      }
    } catch (error) {
      logger.error(`Error retrieving user profile for user ${userId}: ${error}`)

      throw error
    }
  },

  /**
   * Updates the Stripe customer ID for a user.
   * @param userId - The ID of the user.
   * @param stripeCustomerId - The ID of the Stripe customer.
   * @returns A promise that resolves to the updated user.
   * @throws Throws an error if the user cannot be updated.
   */
  updateUserStripeCustomerId: async (userId: number, stripeCustomerId: string) => {
    const updatedUser = await prisma.user_profiles.update({
      where: { id: userId },
      data: {
        stripe_customer_id: stripeCustomerId,
        updated_at: new Date()
      }
    })

    if (!updatedUser) {
      logger.error(`Failed to update user ${userId} with stripe customer id ${stripeCustomerId}`)
    }

    return updatedUser
  },

  /**
   * Updates the Stripe Connect account ID for a user.
   * @param userId - The ID of the user.
   * @param stripeConnectAccountId - The ID of the Stripe Connect account.
   * @returns A promise that resolves to the updated user.
   * @throws Throws an error if the user cannot be updated.
   */
  updateUserStripeConnectAccountId: async (userId: number, stripeConnectAccountId: string) => {
    const updatedUser = await prisma.user_profiles.update({
      where: { id: userId },
      data: {
        stripe_connect_account_id: stripeConnectAccountId,
        updated_at: new Date()
      }
    })

    if (!updatedUser) {
      logger.error(`Failed to update user ${userId} with Stripe Connect account id ${stripeConnectAccountId}`)
    }

    return updatedUser
  },

  updateUserPhoneNumber: async (userId: number, phoneNumber: string) => {
    logger.info(`Updating user ${userId} with phone number ${obfuscateSensitiveData(phoneNumber)}`)

    try {
      const updatedUser = await prisma.user_profiles.update({
        where: { id: userId },
        data: {
          mobile_number: phoneNumber,
          updated_at: new Date()
        }
      })

      if (!updatedUser) {
        logger.error(`Failed to update user ${userId} with phone number ${obfuscateSensitiveData(phoneNumber)}`)
      } else {
        logger.info(`User ${userId} updated with phone number ${obfuscateSensitiveData(phoneNumber)}`)

        return updatedUser
      }
    } catch (error) {
      logger.error(`Error updating user ${userId} with phone number ${obfuscateSensitiveData(phoneNumber)}: ${error}`)
      throw error
    }
  },

  updateUserFirebaseUserId: async (userId: number, firebaseUserId: string) => {
    logger.info(`Attempting to update the Firebase user ID for user ${userId}.`)

    try {
      const updatedUser = await prisma.user_profiles.update({
        where: { id: userId },
        data: {
          firebase_user_id: firebaseUserId,
          updated_at: new Date()
        }
      })

      if (!updatedUser) {
        logger.error(`Failed to update the Firebase user ID for user ${userId}.`)
      } else {
        logger.info(`The Firebase user ID for user ${userId} was successfully updated.`)

        return updatedUser
      }
    } catch (error) {
      logger.error(`Error updating the Firebase user ID for user ${userId}`, error)
      throw error
    }
  }
}
