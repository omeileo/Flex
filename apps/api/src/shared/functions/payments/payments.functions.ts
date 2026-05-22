/**
 * ------------------------------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------------------------------
 */
import { Status } from '@/shared/enums/status.enum'
import Stripe from 'stripe'

import { StripePaymentIntentStatus } from '../stripe/stripe.enum'
import { CheckoutSessionPaymentDataWithServices } from './payments.types'

/**
 * Get the corresponding payment status for a Stripe payment intent status
 * @param paymentIntentStatus - The status of the Stripe payment intent
 * @returns The corresponding payment status
 */
export const getCorrespondingPaymentStatus = (paymentIntentStatus: Stripe.PaymentIntent.Status): Status => {
  let paymentStatus: Status

  switch (paymentIntentStatus) {
    case StripePaymentIntentStatus.Succeeded:
      paymentStatus = Status.payment_confirmed
      break

    case StripePaymentIntentStatus.Processing:
      paymentStatus = Status.payment_processing
      break

    case StripePaymentIntentStatus.Canceled:
      paymentStatus = Status.payment_cancelled
      break

    case StripePaymentIntentStatus.RequiresCapture:
      paymentStatus = Status.payment_hold_confirmed
      break

    default:
      paymentStatus = Status.payment_failed
      break
  }

  return paymentStatus
}

/**
 * Get the payment data from a Stripe payment intent
 * @param paymentIntent - The Stripe payment intent to get the payment data from
 * @returns The payment data
 */
export const getPaymentDataFromPaymentIntent = (
  paymentIntent: Stripe.PaymentIntent
): CheckoutSessionPaymentDataWithServices => {
  return JSON.parse(paymentIntent.metadata.paymentData) as CheckoutSessionPaymentDataWithServices
}
