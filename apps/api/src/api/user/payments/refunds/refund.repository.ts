import { logger } from '@/app'
import { email } from '@/shared/email/email.functions'
import { Status } from '@/shared/enums/status.enum'
import { StatusType } from '@/shared/enums/statusType.enum'
import { obfuscateStripeData } from '@/shared/functions/security/security.functions'
import { StripePaymentIntentStatus, StripeRefundStatus } from '@/shared/functions/stripe/stripe.enum'
import { stripeHelper } from '@/shared/functions/stripe/stripe.functions'
import { paymentsRepository } from '@/shared/repository/payments.repository'
import { statusRepository } from '@/shared/repository/status.repository'
import { refund_requests, stripe_payment_details } from '@prisma/client'

import prisma from '../../../../../prisma/prisma.client'
import { createIdForTable } from '../../../../shared/functions/id/createIdForTable.functions'
import { refundErrors } from './refund.dictionary'
import { FlightBookingRefundMetadata, OfferRequestRefundMetadata, RequestOfferRefundRequestBody } from './refund.types'

export const refundRepository = {
  /**
   * Process a refund for a payment
   * @param {external_system_payment_details} payment - The payment to refund
   * @param {number} refundAmount - The amount to refund
   * @param {number} userId - The user ID
   * @param {object} context - The context of the refund
   * @returns {Promise<void>}
   */
  processRefund: async function (
    payment: stripe_payment_details,
    refundAmount: number,
    userId: string,
    context: {
      entityType: string
      entityId: number | string
      entityDescription?: string
    },
    metadata: FlightBookingRefundMetadata | OfferRequestRefundMetadata
  ): Promise<void> {
    try {
      logger.info(
        `Attempting to create refund for payment: ${obfuscateStripeData(payment.payment_intent_id)} with amount: ${refundAmount}`
      )

      const refund = await stripeHelper.createRefund(payment.payment_intent_id, refundAmount, userId, metadata)

      if (refund === null) {
        logger.error(`Refund creation failed for payment: ${obfuscateStripeData(payment.payment_intent_id)}`)
      } else {
        try {
          await prisma.refund_requests.create({
            data: {
              id: createIdForTable('refund_requests'),
              user_id: userId,
              amount: stripeHelper.convertStripeAmountToDollars(refund.amount),
              external_system_payment_details_id: payment.id,
              created_at: new Date(refund.created),
              refund_id: refund.id,
              status: refund.status ?? '',
              currency: refund.currency,
              refund_receipt_number: refund.receipt_number,
              refund_reason: context.entityDescription,
              refund_failure_reason: refund.failure_reason,
              metadata
            }
          })
        } catch (error) {
          logger.error(
            `Error creating refund request record for payment: ${obfuscateStripeData(payment.payment_intent_id)}`,
            error
          )
        }

        if (refund.status === StripeRefundStatus.Failed) {
          logger.error(
            `${context.entityType} refund failed for payment: ${obfuscateStripeData(payment.payment_intent_id)}`
          )

          throw refundErrors.unableToCreateRefund.build()
        } else {
          logger.info(
            `Successfully created ${context.entityType} refund for offer request (${context.entityId}) with payment: ${obfuscateStripeData(payment.payment_intent_id)}.`
          )

          const refundConfirmedStatus = await statusRepository.getStatus(
            StatusType.payment_status,
            Status.refund_confirmed
          )

          await prisma.payments.update({
            where: {
              id: payment.payment_id
            },
            data: {
              status_id: refundConfirmedStatus.id,
              updated_at: new Date()
            }
          })

          try {
            email.admin.sendAdminAlert(
              `Refund created for payment: ${obfuscateStripeData(payment.payment_intent_id)}`,
              `Refund created for payment: ${obfuscateStripeData(payment.payment_intent_id)} with amount: ${refundAmount} for user: ${userId}`
            )
          } catch (error) {
            logger.error('Error sending refund created email to admin', error)
          }
        }
      }
    } catch (error) {
      logger.error(`Error processing refund for payment: ${obfuscateStripeData(payment.payment_intent_id)}`, error)

      throw error
    }
  },

  /**
   * Get the amount that is eligible for a refund.
   * @note The refundable amount is the total amount charged minus the Stripe fee
   * @param {external_system_payment_details} successfulPayment - The successful payment
   * @returns {number} - The amount eligible for a refund
   */
  getRefundableAmount: async function (
    successfulPayment: stripe_payment_details,
    recordId: number,
    recordType: 'offer request' | 'flight booking'
  ): Promise<number> {
    logger.info(
      `Calculating refundable amount for ${recordType} payment ${obfuscateStripeData(successfulPayment.payment_intent_id)} with payment ID ${successfulPayment.payment_id}`
    )

    const paymentRecord = await paymentsRepository.getPaymentById(successfulPayment.payment_id)

    if (!paymentRecord) {
      logger.error(`No payment record found for payment ${obfuscateStripeData(successfulPayment.payment_intent_id)}`)

      throw refundErrors.noEligiblePaymentsFound.build(recordId, recordType)
    } else {
      const totalAmountCharged = Number(paymentRecord.total)
      const totalStripeFee = Number(paymentRecord.stripe_fee) ?? 0
      const totalDeliveryFee = Number(paymentRecord.delivery_fee) ?? 0
      const amountEligibleForRefund = totalAmountCharged - totalStripeFee

      logger.info(
        `Amount eligible for ${recordType} refund: $${amountEligibleForRefund.toFixed(2)} | Total amount charged: $${totalAmountCharged.toFixed(2)} | Total Stripe fee: $${totalStripeFee.toFixed(2)} | Total delivery fee: $${totalDeliveryFee.toFixed(2)}`
      )

      return amountEligibleForRefund
    }
  }
}
