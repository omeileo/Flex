import { logger } from '@/app'
import { getCurrentLoggedInUserOrThrow } from '@/shared/appContext.context'
import { obfuscateStripeData } from '@/shared/functions/security/security.functions'
import { stripeHelper } from '@/shared/functions/stripe/stripe.functions'
import { CheckoutSessionPaymentData } from '@/shared/types/payments.types'

import { paymentIntentsErrors } from './paymentIntents.dictionary'
import { paymentIntentsRepository } from './paymentIntents.repository'
import { PaymentIntentData } from './paymentIntents.types'

/**
 * Creates a payment intent for a payment.
 * @param intentType - The type of payment intent.
 * @param paymentData - The payment data.
 * @param metadata - The metadata.
 * @returns The payment intent data.
 */
export async function createPaymentIntentForPayment(
  paymentData: CheckoutSessionPaymentData,
  metadata: Record<string, string>,
  paymentMethodId?: string
): Promise<PaymentIntentData> {
  logger.info(`Attempting to create payment intent for payment with details: ${JSON.stringify(paymentData)}`)

  try {
    const currentUser = getCurrentLoggedInUserOrThrow()

    const paymentIntent = await stripeHelper.createPaymentIntentForHold(
      currentUser.userId,
      paymentData.total,
      paymentData.currency,
      {
        userId: currentUser.userId.toString(),
        ipAddress: currentUser.userIp,
        paymentData: JSON.stringify(paymentData),
        ...metadata
      },
      paymentMethodId
    )

    if (!paymentIntent.id) {
      logger.error('Payment intent not created')
      throw new Error('Payment intent not created')
    } else if (!paymentIntent.client_secret) {
      logger.error('Payment intent client secret not created')
      throw new Error('Payment intent client secret not created')
    }

    const customerSession = await stripeHelper.createCustomerPaymentSession(currentUser.userId)

    const paymentIntentData: PaymentIntentData = {
      paymentIntent: {
        id: paymentIntent.id,
        secret: paymentIntent.client_secret
      },
      customerSession: customerSession,
      subtotal: paymentData.subtotal,
      tax: paymentData.tax,
      fees: paymentData.fees,
      stripeFee: paymentData.stripeFee,
      deliveryFee: paymentData.deliveryFee,
      discount: paymentData?.discount,
      total: paymentData.total,
      currency: paymentIntent.currency.toUpperCase()
    }

    logger.info(`Payment intent created for payment: ${obfuscateStripeData(paymentIntentData.paymentIntent?.id ?? '')}`)

    await paymentIntentsRepository.saveStripePaymentIntent(paymentIntent.id, currentUser.userId)

    return paymentIntentData
  } catch (error) {
    logger.error('Error creating payment intent for payment', error)
    throw paymentIntentsErrors.unableToCreatePaymentIntentForHold.build()
  }
}

/**
 * Creates a payment intent for a transfer.
 * @param paymentData - The payment data.
 * @returns The payment intent data.
 */
export async function createPaymentIntentForTransfer(
  paymentData: CheckoutSessionPaymentData
): Promise<PaymentIntentData> {
  const currentUser = getCurrentLoggedInUserOrThrow()

  try {
    const sessionData = await stripeHelper.createCustomerSetupSession(currentUser.userId)
    const stripeConnectAccount = await stripeHelper.getStripeConnectAccount(currentUser.userId)

    if (sessionData) {
      const paymentIntentData: PaymentIntentData = {
        setupIntent: {
          secret: sessionData.setupIntent.secret
        },
        customerSession: sessionData.customerSession,
        isCustomerOnboardedToStripeConnect: stripeConnectAccount?.details_submitted ?? false,
        subtotal: paymentData.subtotal,
        tax: paymentData.tax,
        fees: paymentData.fees,
        discount: paymentData?.discount,
        total: paymentData.total,
        currency: paymentData.currency
      }

      return paymentIntentData
    } else {
      throw paymentIntentsErrors.unableToCreatePaymentIntentForTransfer.build()
    }
  } catch (error) {
    throw paymentIntentsErrors.unableToCreatePaymentIntentForTransfer.build()
  }
}
