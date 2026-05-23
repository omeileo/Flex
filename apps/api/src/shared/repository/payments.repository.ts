import { logger } from '@/app'
import {
  Prisma,
  payments,
  stripe_payment_details,
  tax_countries,
  tax_country_administrative_divisions
} from '@prisma/client'
import Stripe from 'stripe'

import prisma from '../../../prisma/prisma.client'
import { globalErrors } from '../dictionary/errors.dictionary'
import { ActionInitiators } from '../enums/actionInitiators.enum'
import { Roles } from '../enums/roles.enum'
import { Status } from '../enums/status.enum'
import { StatusType } from '../enums/statusType.enum'
import { createIdForTable } from '../functions/id/createIdForTable.functions'
import { getCorrespondingPaymentStatus } from '../functions/payments/payments.functions'
import { getTaxRateForAdministrativeDivision } from '../functions/payments/taxes/taxes.functions'
import { obfuscateStripeData } from '../functions/security/security.functions'
import { StripePaymentIntentStatus } from '../functions/stripe/stripe.enum'
import { stripeHelper } from '../functions/stripe/stripe.functions'
import { CheckoutSessionPaymentData } from '../types/payments.types'
import { PrismaTransaction } from '../types/repository.types'
import { statusRepository } from './status.repository'

export interface CreatePaymentMetadata {
  type: 'flight_booking' | 'offer_request'
  id: number
}

/**
 * Repository for managing payments.
 */
export const paymentsRepository = {
  /**
   * Creates a new payment in the payments table and creates a corresponding external system payment details record.
   * @param paymentIntent - The payment intent.
   * @param userId - The user ID.
   * @param isInitatedBySystem - Whether the payment is initiated by the system.
   * @param paymentMetadata - The payment metadata.
   * @param metadata - The metadata.
   * @param transaction - The Prisma transaction object (optional, defaults to prisma).
   * @param shouldUpdateOfferRequestPaymentId - Whether to update the offer request payment ID.
   * @returns A Promise that resolves to the created payment.
   * @throws {EntityNotCreated} If the payment cannot be created.
   */
  createPayment: async (
    paymentIntent: Stripe.PaymentIntent,
    userId: string,
    isInitatedBySystem?: boolean,
    paymentMetadata?: Record<string, string>,
    metadata?: CreatePaymentMetadata,
    transaction: PrismaTransaction = prisma,
    shouldUpdateOfferRequestPaymentId: boolean = true
  ): Promise<payments> => {
    logger.info(
      `Attempting to create payment record for user ${userId} with payment intent ${obfuscateStripeData(paymentIntent.id)}`
    )

    try {
      const paymentHoldConfirmedStatus = await statusRepository.getStatus(
        StatusType.payment_status,
        Status.payment_hold_confirmed
      )

      const paymentData: CheckoutSessionPaymentData = JSON.parse(paymentIntent.metadata?.paymentData)

      const payment = await transaction.payments.create({
        data: {
          id: createIdForTable('payments'),
          initiator_type: isInitatedBySystem ? ActionInitiators.System : ActionInitiators.User,
          initiator_id: userId,
          total: paymentData.total,
          subtotal: paymentData.subtotal,
          tax: paymentData?.tax ?? 0,
          fees: paymentData?.fees ?? 0,
          stripe_fee: paymentData?.stripeFee ?? 0,
          delivery_fee: paymentData?.deliveryFee ?? 0,
          discount: paymentData?.discount ?? 0,
          currency: paymentIntent.currency,
          status_id: paymentHoldConfirmedStatus.id,
          metadata: paymentMetadata ? paymentMetadata : undefined
        }
      })

      await paymentsRepository.createExternalSystemPaymentDetails(paymentIntent, payment.id, transaction)

      if (metadata?.type && metadata?.id) {
        switch (metadata?.type) {
          case 'offer_request':
            if (shouldUpdateOfferRequestPaymentId) {
              await transaction.offer_requests.update({
                where: {
                  id: metadata.id
                },
                data: {
                  payment_id: payment.id,
                  updated_at: new Date()
                }
              })
            }
            break

          case 'flight_booking':
            await transaction.flight_itineraries.update({
              where: {
                id: metadata.id
              },
              data: {
                payment_id: payment.id,
                updated_at: new Date()
              }
            })
            break
        }
      }

      logger.info(
        `Payment ${payment.id} created successfully with payment intent ${obfuscateStripeData(paymentIntent.id)}`
      )

      return payment
    } catch (error) {
      throw globalErrors.entityNotCreated.build('Payment', paymentIntent.id)
    }
  },

  /**
   * Cancels a payment.
   * @param paymentId - The payment ID.
   * @param paymentIntentId - The payment intent ID.
   * @param transaction - The Prisma transaction object (optional, defaults to prisma).
   * @returns A Promise that resolves to the canceled payment.
   * @throws {EntityNotUpdated} If the payment cannot be canceled.
   */
  cancelPayment: async (
    paymentId: string,
    paymentIntentId: string,
    transaction: PrismaTransaction = prisma
  ): Promise<payments | null> => {
    logger.info(`Attempting to cancel payment ${paymentId} with payment intent ${obfuscateStripeData(paymentIntentId)}`)

    try {
      const paymentHoldCancelledStatus = await statusRepository.getStatus(
        StatusType.payment_status,
        Status.payment_hold_cancelled
      )

      const releasedFundsPaymentIntent = await stripeHelper.releaseFunds(paymentIntentId)

      if (!releasedFundsPaymentIntent) {
        logger.info(
          `Payment intent ${obfuscateStripeData(paymentIntentId)} is already canceled or cannot be released. No need to update payment.`
        )
        return null
      } else {
        logger.info(`Payment intent ${obfuscateStripeData(paymentIntentId)} released funds successfully.`)

        const payment = await transaction.payments.update({
          where: { id: paymentId },
          data: {
            status_id: paymentHoldCancelledStatus.id,
            updated_at: new Date()
          }
        })

        await paymentsRepository.updateExternalSystemPaymentDetailsStatus(
          releasedFundsPaymentIntent,
          undefined,
          transaction
        )

        logger.info(
          `Payment ${paymentId} with payment intent ${obfuscateStripeData(paymentIntentId)} canceled successfully`
        )

        return payment
      }
    } catch (error) {
      logger.error(
        `Error canceling payment ${paymentId} with payment intent ${obfuscateStripeData(paymentIntentId)}: ${error}`
      )

      throw globalErrors.entityNotUpdated.build('payment', paymentIntentId)
    }
  },

  /**
   * Creates new Stripe Payment Intent details.
   * @param paymentIntent - The payment intent.
   * @param paymentId - The payment ID.
   * @param transaction - The Prisma transaction object (optional, defaults to prisma).
   * @returns A Promise that resolves to the created external system payment details.
   * @throws {EntityNotCreated} If the external system payment details cannot be created.
   */
  createExternalSystemPaymentDetails: async (
    paymentIntent: Stripe.PaymentIntent,
    paymentId: string,
    transaction: PrismaTransaction = prisma
  ): Promise<stripe_payment_details> => {
    logger.info(
      `Attempting to create external system payment details for payment ${paymentId} and payment intent ${obfuscateStripeData(paymentIntent.id)}`
    )

    // Check if the record already exists in the table
    const existingRecord = await transaction.stripe_payment_details.findFirst({
      where: {
        payment_id: paymentId,
        payment_intent_id: paymentIntent.id
      }
    })

    // If the record already exists, update the status
    if (existingRecord) {
      const updatedExternalSystemPaymentDetails = await paymentsRepository.updateExternalSystemPaymentDetailsStatus(
        paymentIntent,
        undefined,
        transaction
      )

      logger.info(
        `External system payment details record already exists for payment ${paymentId} and payment intent ${obfuscateStripeData(paymentIntent.id)}`
      )

      return updatedExternalSystemPaymentDetails
    } else {
      try {
        logger.info(
          `Creating external system payment details for payment ${paymentId} and payment intent ${obfuscateStripeData(paymentIntent.id)}`
        )

        const createdExternalSystemPaymentDetails = await transaction.stripe_payment_details.create({
          data: {
            id: createIdForTable('stripe_payment_details'),
            payment_id: paymentId,
            payment_intent_id: paymentIntent.id,
            payment_status: paymentIntent.status,
            amount: paymentIntent.amount / 100,
            canceled_at: paymentIntent.canceled_at ? new Date(paymentIntent.canceled_at) : null,
            cancellation_reason: paymentIntent.cancellation_reason
          }
        })

        logger.info(
          `External system payment details created for payment ${paymentId} and payment intent ${obfuscateStripeData(paymentIntent.id)}`
        )

        return createdExternalSystemPaymentDetails
      } catch (error) {
        logger.error(
          `Error creating external system payment details for payment ${paymentId} and payment intent ${obfuscateStripeData(paymentIntent.id)}: ${error}`
        )
        throw globalErrors.entityNotCreated.build('external system payment details', paymentId)
      }
    }
  },

  /**
   * Gets a payment by its ID.
   * @param paymentId - The payment ID.
   * @param transaction - The Prisma transaction object (optional, defaults to prisma).
   * @returns A Promise that resolves to the payment.
   * @throws {EntityNotFound} If the payment cannot be found.
   */
  getPaymentById: async (paymentId: string, transaction: PrismaTransaction = prisma): Promise<payments | null> => {
    logger.info(`Attempting to get payment by ID ${paymentId}`)

    try {
      const payment = await transaction.payments.findUnique({
        where: { id: paymentId }
      })

      logger.info(`Found payment by ID ${paymentId}`)

      return payment
    } catch (error) {
      logger.error(`Error getting payment by ID ${paymentId}: ${error}`)
      throw globalErrors.entityNotFound.build('payment')
    }
  },

  getExternalSystemPaymentDetailsByPaymentIntentId: async (
    paymentIntentId: string,
    transaction: PrismaTransaction = prisma
  ): Promise<stripe_payment_details | null> => {
    logger.info(
      `Attempting to get external system payment details for payment intent ${obfuscateStripeData(paymentIntentId)}`
    )

    try {
      const externalSystemPaymentDetails = await transaction.stripe_payment_details.findUnique({
        where: { payment_intent_id: paymentIntentId }
      })

      logger.info(`Found external system payment details for payment intent ${obfuscateStripeData(paymentIntentId)}`)

      return externalSystemPaymentDetails
    } catch (error) {
      logger.error(
        `Error getting external system payment details for payment intent ${obfuscateStripeData(paymentIntentId)}: ${error}`
      )

      throw globalErrors.entityNotFound.build('external system payment details')
    }
  },

  getPaymentAndExternalSystemPaymentDetailsByPaymentId: async (
    paymentId: string,
    transaction: PrismaTransaction = prisma
  ): Promise<{
    payment: payments
    externalSystemPaymentDetails: stripe_payment_details
  } | null> => {
    logger.info(`Attempting to get payment and external system payment details for payment ${paymentId}`)

    try {
      const payment = await paymentsRepository.getPaymentById(paymentId, transaction)

      const externalSystemPaymentDetails = await transaction.stripe_payment_details.findFirst({
        where: {
          payment_id: paymentId,
          payment_status: {
            in: [StripePaymentIntentStatus.RequiresCapture, StripePaymentIntentStatus.Succeeded]
          }
        }
      })

      if (!payment || !externalSystemPaymentDetails) {
        return null
      }

      logger.info(`Found payment and external system payment details for payment ${paymentId}`)

      return { payment, externalSystemPaymentDetails }
    } catch (error) {
      logger.error(`Error getting payment and external system payment details for payment ${paymentId}: ${error}`)

      throw globalErrors.entityNotFound.build('payment')
    }
  },

  getPaymentAndExternalSystemPaymentDetailsByPaymentIntentId: async (
    paymentIntentId: string,
    transaction: PrismaTransaction = prisma
  ): Promise<{
    payment: payments
    externalSystemPaymentDetails: stripe_payment_details
  } | null> => {
    logger.info(
      `Attempting to get payment and external system payment details for payment intent ${obfuscateStripeData(paymentIntentId)}`
    )

    try {
      const externalSystemPaymentDetails = await transaction.stripe_payment_details.findFirst({
        where: {
          payment_intent_id: paymentIntentId,
          payment_status: {
            in: [StripePaymentIntentStatus.RequiresCapture, StripePaymentIntentStatus.Succeeded]
          }
        },
        include: {
          payments: true
        }
      })

      if (!externalSystemPaymentDetails) {
        logger.error(
          `No external system payment details found for payment intent ${obfuscateStripeData(paymentIntentId)}`
        )

        return null
      } else {
        logger.info(`Found external system payment details for payment intent ${obfuscateStripeData(paymentIntentId)}.`)

        return { payment: externalSystemPaymentDetails.payments, externalSystemPaymentDetails }
      }
    } catch (error) {
      logger.error(
        `Error getting payment and external system payment details for payment intent ${obfuscateStripeData(paymentIntentId)}: ${error}`
      )

      throw globalErrors.entityNotFound.build('payment')
    }
  },

  /**
   * Updates an existing payment and creates a new external system payment details record for a new hold. Also cancels the previous hold.
   * @param existingPaymentIntentId - The existing payment intent ID.
   * @param newPaymentIntent - The new payment intent.
   * @param user - The current user.
   * @param transaction - The Prisma transaction object (optional, defaults to prisma).
   * @returns A Promise that resolves to the updated payment.
   * @throws {EntityNotUpdated} If the payment cannot be updated.
   */
  updateExistingPaymentAndCreateNewExternalSystemPaymentDetails: async (
    existingPaymentIntentId: string,
    newPaymentIntent: Stripe.PaymentIntent,
    userId: string,
    userRole: Roles,
    transaction: PrismaTransaction = prisma
  ): Promise<payments> => {
    logger.info(
      `Attempting to update existing payment and create new external system payment details for payment intent ${obfuscateStripeData(existingPaymentIntentId)}`
    )

    try {
      const paymentHoldConfirmedStatus = await statusRepository.getStatus(
        StatusType.payment_status,
        Status.payment_hold_confirmed
      )

      const paymentData: CheckoutSessionPaymentData = JSON.parse(newPaymentIntent.metadata?.paymentData)

      const existingExternalPaymentDetailsRecord = await transaction.stripe_payment_details.findFirst({
        where: {
          payment_intent_id: existingPaymentIntentId
        }
      })

      if (!existingExternalPaymentDetailsRecord) {
        logger.error(
          `No existing external system payment details record found for payment intent ${obfuscateStripeData(existingPaymentIntentId)}`
        )

        throw globalErrors.entityNotFound.build('external system payment details', existingPaymentIntentId)
      } else {
        logger.info(
          `Updating existing payment for payment ${existingExternalPaymentDetailsRecord.payment_id} and payment intent ${obfuscateStripeData(existingPaymentIntentId)}`
        )

        const newPayment = await transaction.payments.update({
          where: { id: existingExternalPaymentDetailsRecord.payment_id },
          data: {
            initiator_type: userRole,
            initiator_id: userId,
            total: paymentData.total,
            subtotal: paymentData.subtotal,
            tax: paymentData?.tax ?? 0,
            fees: paymentData?.fees ?? 0,
            stripe_fee: paymentData?.stripeFee ?? 0,
            delivery_fee: paymentData?.deliveryFee ?? 0,
            discount: paymentData?.discount ?? 0,
            currency: newPaymentIntent.currency,
            status_id: paymentHoldConfirmedStatus.id,
            updated_at: new Date()
          }
        })

        logger.info(
          `Creating new external system payment details record for payment ${newPayment.id} and payment intent ${newPaymentIntent.id}`
        )

        await paymentsRepository.createExternalSystemPaymentDetails(newPaymentIntent, newPayment.id, transaction)

        logger.info(
          `Cancelling previous hold for payment ${existingExternalPaymentDetailsRecord.payment_id} and payment intent ${obfuscateStripeData(existingPaymentIntentId)}`
        )

        // Cancel the previous hold if it isn't already canceled
        if (existingExternalPaymentDetailsRecord.payment_status !== StripePaymentIntentStatus.Canceled) {
          await paymentsRepository.cancelPayment(
            existingExternalPaymentDetailsRecord.payment_id,
            existingPaymentIntentId,
            transaction
          )
        }

        return newPayment
      }
    } catch (error) {
      logger.error(
        `Error updating existing payment and creating new external system payment details for payment intent ${obfuscateStripeData(existingPaymentIntentId)}: ${error}`
      )

      throw globalErrors.entityNotUpdated.build('payment', existingPaymentIntentId)
    }
  },

  /**
   * Updates the status and captured amount of a payment and creates a new external system payment details record.
   * @param paymentIntent - The payment intent.
   * @param capturedAmount - The amount captured.
   * @param paymentMetadata - The payment metadata.
   * @param transaction - The Prisma transaction object (optional, defaults to prisma).
   * @returns A Promise that resolves to the updated payment.
   * @throws {EntityNotUpdated} If the payment cannot be updated.
   */
  updatePaymentDetailsWithPaymentIntentAndCapturedAmount: async (
    paymentIntent: Stripe.PaymentIntent,
    capturedAmount?: number,
    paymentMetadata?: {
      type: 'offer_request' | 'flight_booking'
      id: number
    },
    transaction: PrismaTransaction = prisma
  ): Promise<payments> => {
    logger.info(
      `Attempting to update payment details with payment intent ${obfuscateStripeData(paymentIntent.id)} and captured amount ${capturedAmount}`
    )

    try {
      const externalSystemPaymentDetails = await paymentsRepository.getExternalSystemPaymentDetailsByPaymentIntentId(
        paymentIntent.id
      )

      const paymentStatus = getCorrespondingPaymentStatus(paymentIntent.status)

      const paymentStatusRecord = await statusRepository.getStatus(StatusType.payment_status, paymentStatus)

      const updatedPayment = await transaction.payments.update({
        where: { id: externalSystemPaymentDetails?.payment_id },
        data: {
          status_id: paymentStatusRecord.id,
          ...(capturedAmount !== undefined ? { total: capturedAmount } : {})
        }
      })

      await paymentsRepository.updateExternalSystemPaymentDetailsStatus(paymentIntent, capturedAmount, transaction)

      if (paymentMetadata?.type && paymentMetadata?.id) {
        switch (paymentMetadata?.type) {
          case 'offer_request':
            await transaction.offer_requests.update({
              where: {
                id: paymentMetadata.id
              },
              data: {
                payment_id: updatedPayment.id,
                updated_at: new Date()
              }
            })
            break

          case 'flight_booking':
            await transaction.flight_itineraries.update({
              where: {
                id: paymentMetadata.id
              },
              data: {
                payment_id: updatedPayment.id,
                updated_at: new Date()
              }
            })
            break
        }
      }

      return updatedPayment
    } catch (error) {
      logger.error(
        `Error updating payment details with payment intent ${obfuscateStripeData(paymentIntent.id)} and captured amount ${capturedAmount}: ${error}`
      )

      throw globalErrors.entityNotUpdated.build('payment', paymentIntent.id)
    }
  },

  getPaymentStatus: async (paymentId: string): Promise<string | null> => {
    logger.info(`Attempting to get payment status for payment ${paymentId}`)
    const payment = await paymentsRepository.getPaymentById(paymentId)

    try {
      if (!payment) {
        logger.error(`No payment found for payment ${paymentId}`)

        return null
      } else {
        const statusId = payment.status_id
        const status = await statusRepository.getStatusById(statusId)

        logger.info(`Payment ${paymentId} has status ${status.name}`)

        return status.name
      }
    } catch (error) {
      logger.error(`Error getting payment status for payment ${paymentId}: ${error}`)

      return null
    }
  },

  updatePaymentStatus: async (paymentId: string, paymentStatus: Status): Promise<payments> => {
    logger.info(`Attempting to update payment ${paymentId} to status ${paymentStatus}`)

    try {
      const paymentStatusRecord = await statusRepository.getStatus(StatusType.payment_status, paymentStatus)

      const updatedPayment = await prisma.payments.update({
        where: { id: paymentId },
        data: {
          status_id: paymentStatusRecord.id,
          updated_at: new Date()
        }
      })

      logger.info(`Payment ${paymentId} updated to status ${paymentStatus}`)

      return updatedPayment
    } catch (error) {
      logger.error(`Error updating payment ${paymentId} to status ${paymentStatus}: ${error}`)

      throw globalErrors.entityNotUpdated.build('payment', paymentId)
    }
  },

  updateExternalSystemPaymentDetailsStatus: async (
    paymentIntent: Stripe.PaymentIntent,
    capturedAmount?: number,
    transaction: PrismaTransaction = prisma
  ): Promise<stripe_payment_details> => {
    logger.info(
      `Attempting to update external system payment details status for payment intent ${obfuscateStripeData(paymentIntent.id)}`
    )

    try {
      const externalSystemPaymentDetails = await paymentsRepository.getExternalSystemPaymentDetailsByPaymentIntentId(
        paymentIntent.id
      )

      const updatedExternalSystemPaymentDetails = await transaction.stripe_payment_details.update({
        where: { id: externalSystemPaymentDetails?.id },
        data: {
          payment_status: paymentIntent.status,
          ...(capturedAmount !== undefined ? { amount: capturedAmount } : {}),
          updated_at: new Date()
        }
      })

      logger.info(
        `Updated external system payment details status for payment intent ${obfuscateStripeData(paymentIntent.id)}`
      )

      return updatedExternalSystemPaymentDetails
    } catch (error) {
      logger.error(
        `Error updating external system payment details status for payment intent ${obfuscateStripeData(paymentIntent.id)}: ${error}`
      )

      throw globalErrors.entityNotUpdated.build('external system payment details', paymentIntent.id)
    }
  },

  /**
   * Gets the payment intent for a flight itinerary.
   * @param flightItineraryId - The flight itinerary ID.
   * @param transaction - The Prisma transaction object (optional, defaults to prisma).
   * @returns A Promise that resolves to the payment intent.
   * @throws {EntityNotFound} If the payment intent cannot be found.
   */
  getPaymentIntentByFlightItineraryId: async (
    flightItineraryId: number,
    transaction: PrismaTransaction = prisma
  ): Promise<Stripe.PaymentIntent | null> => {
    const payment = await transaction.payments.findFirst({
      where: {
        flight_itineraries: {
          is: {
            id: flightItineraryId
          }
        }
      }
    })

    if (!payment) {
      logger.error(`No payment found for flight itinerary ${flightItineraryId}`)

      return null
    } else {
      const externalSystemPaymentDetails =
        await paymentsRepository.getPaymentAndExternalSystemPaymentDetailsByPaymentId(payment.id)

      if (!externalSystemPaymentDetails) {
        logger.error(`No external system payment details found for payment: ${payment.id}`)

        return null
      } else {
        const paymentIntentId = externalSystemPaymentDetails.externalSystemPaymentDetails.payment_intent_id
        const paymentIntent = await stripeHelper.getStripePaymentIntent(paymentIntentId)

        return paymentIntent
      }
    }
  },

  /**
   * Gets all successful payments for an offer request.
   * @param offerRequestId - The offer request ID.
   * @param transaction - The Prisma transaction object (optional, defaults to prisma).
   * @returns A Promise that resolves to the successful payments.
   * @throws {EntityNotFound} If the successful payments cannot be found.
   */
  getSuccessfulPaymentsForOfferRequest: async (
    offerRequestId: number,
    transaction: PrismaTransaction = prisma
  ): Promise<(payments & { stripe_payment_details: stripe_payment_details[] })[]> => {
    logger.info(`Attempting to get successful payments for offer request ${offerRequestId}`)

    try {
      const payments = await transaction.payments.findMany({
        where: {
          offer_requests: { id: offerRequestId },
          stripe_payment_details: {
            every: {
              payment_status: {
                in: [StripePaymentIntentStatus.Succeeded]
              }
            }
          }
        },
        include: {
          stripe_payment_details: true
        }
      })

      return payments
    } catch (error) {
      logger.error(`Error getting successful payments for offer request ${offerRequestId}: ${error}`)

      throw globalErrors.entityNotFound.build('successful payments for offer request', offerRequestId)
    }
  },

  /**
   * Gets all payments on hold for an offer request.
   * @param offerRequestId - The offer request ID.
   * @param transaction - The Prisma transaction object (optional, defaults to prisma).
   * @returns A Promise that resolves to the payments on hold.
   * @throws {EntityNotFound} If the payments on hold cannot be found.
   */
  getPaymentsOnHoldForOfferRequest: async (
    offerRequestId: number,
    transaction: PrismaTransaction = prisma
  ): Promise<(payments & { stripe_payment_details: stripe_payment_details[] })[]> => {
    logger.info(`Attempting to get payments on hold for offer request ${offerRequestId}`)

    try {
      const payments = await transaction.payments.findMany({
        where: {
          offer_requests: { id: offerRequestId },
          stripe_payment_details: {
            every: {
              payment_status: {
                in: [
                  StripePaymentIntentStatus.RequiresCapture,
                  StripePaymentIntentStatus.RequiresConfirmation,
                  StripePaymentIntentStatus.RequiresAction
                ]
              }
            }
          }
        },
        include: {
          stripe_payment_details: true
        }
      })

      return payments
    } catch (error) {
      logger.error(`Error getting payments on hold for offer request ${offerRequestId}`, error)

      throw globalErrors.entityNotFound.build('payments on hold for offer request', offerRequestId)
    }
  },

  /**
   * Checks if the payment hold is canceled for an offer request.
   * @param offerRequestId - The offer request ID.
   * @param transaction - The Prisma transaction object (optional, defaults to prisma).
   * @returns A Promise that resolves to true if the payment hold is canceled, false otherwise.
   * @throws {EntityNotFound} If the payments on hold cannot be found.
   */
  isPaymentHoldCanceledForOfferRequest: async (
    offerRequestId: number,
    transaction: PrismaTransaction = prisma
  ): Promise<boolean> => {
    logger.info(`Attempting to check if payment hold is canceled for offer request ${offerRequestId}`)

    try {
      const payment = await transaction.payments.findFirst({
        where: {
          offer_requests: { id: offerRequestId },
          stripe_payment_details: {
            every: {
              payment_status: {
                in: [StripePaymentIntentStatus.Canceled]
              }
            }
          }
        },
        include: {
          stripe_payment_details: true
        }
      })

      if (!payment) {
        logger.error(`No payment found for offer request ${offerRequestId}`)

        return false
      } else {
        const paymentStatus = payment.stripe_payment_details.find(
          (paymentDetail) => paymentDetail.payment_status === StripePaymentIntentStatus.Canceled
        )

        if (!paymentStatus) {
          logger.error(`No payment status found for offer request ${offerRequestId}`)

          return false
        } else {
          logger.info(`Payment hold is canceled for offer request ${offerRequestId}`)

          return true
        }
      }
    } catch (error) {
      logger.error(`Error checking if payment hold is canceled for offer request ${offerRequestId}`, error)

      throw globalErrors.entityNotFound.build('payments on hold for offer request', offerRequestId)
    }
  },

  /**
   * Gets all successful payments for a flight booking.
   * @param flightBookingId - The flight booking ID.
   * @param transaction - The Prisma transaction object (optional, defaults to prisma).
   * @returns A Promise that resolves to the successful payments.
   * @throws {EntityNotFound} If the successful payments cannot be found.
   */
  getSuccessfulPaymentsForFlightBooking: async (
    flightBookingId: number,
    transaction: PrismaTransaction = prisma
  ): Promise<(payments & { stripe_payment_details: stripe_payment_details[] })[]> => {
    logger.info(`Attempting to get successful payments for flight booking ${flightBookingId}`)

    try {
      const payments = await transaction.payments.findMany({
        where: {
          flight_itineraries: {
            flight_bookings: {
              id: flightBookingId
            }
          },
          stripe_payment_details: {
            some: {
              payment_status: {
                in: [StripePaymentIntentStatus.Succeeded]
              }
            }
          }
        },
        include: {
          stripe_payment_details: true
        }
      })

      logger.info(
        `Found ${payments.flatMap((payment) => payment.stripe_payment_details)?.length} successful payment details for flight booking ${flightBookingId}`
      )

      return payments
    } catch (error) {
      logger.error(`Error getting successful payments for flight booking ${flightBookingId}`, error)

      throw globalErrors.entityNotFound.build('successful payments for flight booking', flightBookingId)
    }
  },

  /**
   * Gets the total amount that was successfully charged for an offer request.
   * @param offerRequestId - The offer request ID.
   * @returns A Promise that resolves to the total amount charged.
   * @throws {EntityNotFound} If the total amount charged cannot be found.
   */
  getTotalAmountChargedForOfferRequest: async (offerRequestId: number): Promise<number> => {
    logger.info(`Attempting to get total amount charged for offer request ${offerRequestId}`)

    try {
      const payments = await paymentsRepository.getSuccessfulPaymentsForOfferRequest(offerRequestId)
      const totalAmountCharged = payments.reduce((sum, payment) => sum + Number(payment.total), 0)

      logger.info(`Payment total for offer request ${offerRequestId}: $${totalAmountCharged.toFixed(2)}`)

      return totalAmountCharged
    } catch (error) {
      logger.error(`Error getting total amount charged for offer request ${offerRequestId}`, error)

      throw globalErrors.entityNotFound.build('total amount charged for offer request', offerRequestId)
    }
  },

  getTotalAmountOnHoldForOfferRequest: async (offerRequestId: number): Promise<number> => {
    logger.info(`Attempting to get total amount on hold for offer request ${offerRequestId}`)

    try {
      const paymentsOnHolds = await paymentsRepository.getPaymentsOnHoldForOfferRequest(offerRequestId)

      const totalAmountOnHold = paymentsOnHolds.reduce((sum, payment) => sum + Number(payment.total), 0)

      logger.info(`Total amount on hold for offer request ${offerRequestId}: $${totalAmountOnHold.toFixed(2)}`)

      return totalAmountOnHold
    } catch (error) {
      logger.error(`Error getting total amount on hold for offer request ${offerRequestId}`, error)

      throw globalErrors.entityNotFound.build('total amount on hold for offer request', offerRequestId)
    }
  },

  /**
   * Gets the tax administrative division by ID.
   * @param administrativeDivisionId - The administrative division ID.
   * @returns A Promise that resolves to the tax administrative division.
   * @throws {EntityNotFound} If the tax administrative division cannot be found.
   */
  getTaxAdministrativeDivision: async (
    administrativeDivisionId: number
  ): Promise<(tax_country_administrative_divisions & { tax_countries: tax_countries }) | null> => {
    logger.info(`Attempting to get tax administrative division ${administrativeDivisionId}`)

    try {
      const taxAdministrativeDivision = await prisma.tax_country_administrative_divisions.findUnique({
        where: { id: administrativeDivisionId },
        include: {
          tax_countries: true
        }
      })

      if (!taxAdministrativeDivision) {
        logger.error(`Tax administrative division ${administrativeDivisionId} not found`)
        return null
      } else {
        logger.info(`Tax administrative division ${administrativeDivisionId} found: ${taxAdministrativeDivision?.name}`)
      }

      return taxAdministrativeDivision
    } catch (error) {
      logger.error(`Error getting tax administrative division ${administrativeDivisionId}: ${error}`)
      throw globalErrors.entityNotFound.build('tax administrative division', administrativeDivisionId)
    }
  }
}
