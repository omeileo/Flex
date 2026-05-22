import { logger } from '@/app'
import { TABLE_ID_PREFIXES } from '@/shared/functions/id/id.dictionary'
import { generateCustomId } from '@/shared/functions/id/id.functions'
import { obfuscateStripeData } from '@/shared/functions/security/security.functions'
import { stripe_payment_intents } from '@prisma/client'

import prisma from '../../../../../prisma/prisma.client'

export const paymentIntentsRepository = {
  /**
   * Saves a new Stripe payment intent record in the database.
   * @param paymentIntentId - The Stripe payment intent ID.
   * @param userId - The user ID associated with the payment intent.
   * @param amount - The amount for the payment intent.
   * @param currency - The currency for the payment intent.
   * @param status - The status of the payment intent.
   * @param metadata - Any metadata associated with the payment intent.
   * @returns The created stripe_payment_intents record.
   */
  async saveStripePaymentIntent(paymentIntentId: string, userId: number): Promise<stripe_payment_intents> {
    logger.info(
      `Saving Stripe payment intent record for payment intent ID: ${obfuscateStripeData(paymentIntentId)} and user ID: ${userId}`
    )

    try {
      const record = await prisma.stripe_payment_intents.create({
        data: {
          id: generateCustomId(TABLE_ID_PREFIXES.stripe_payment_intents),
          payment_intent_id: paymentIntentId,
          user_id: userId
        }
      })

      return record
    } catch (error) {
      logger.error('Error saving Stripe payment intent record', error)
      throw error
    }
  },

  /**
   * Retrieves a Stripe payment intent record by its Stripe payment intent ID.
   * @param paymentIntentId - The Stripe payment intent ID.
   * @returns The stripe_payment_intents record, or null if not found.
   */
  async getStripePaymentIntentById(paymentIntentId: string): Promise<stripe_payment_intents | null> {
    logger.info(
      `Retrieving Stripe payment intent record for payment intent ID: ${obfuscateStripeData(paymentIntentId)}`
    )

    try {
      const record = await prisma.stripe_payment_intents.findUnique({
        where: {
          payment_intent_id: paymentIntentId
        }
      })

      return record
    } catch (error) {
      logger.error('Error retrieving Stripe payment intent record', error)
      throw error
    }
  }
}
