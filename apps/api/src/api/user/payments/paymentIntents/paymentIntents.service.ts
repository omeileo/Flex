import { logger } from '@/app'
import { calculateStripeFee } from '@/shared/functions/payments/fees/fees.functions'
import {
  calculatePaymentForExternalFlightBooking,
  calculatePaymentForFlightBooking,
  calculatePaymentForNewOfferRequest
} from '@/shared/functions/payments/payments.functions'
import { CheckoutSessionPaymentData } from '@/shared/functions/payments/payments.types'
import { obfuscateStripeData } from '@/shared/functions/security/security.functions'
import { item_requests, items } from '@prisma/client'

import { createPaymentIntentForPayment, createPaymentIntentForTransfer } from './paymentIntents.functions'
import {
  CreateExternalFlightBookingPaymentIntentRequest,
  CreateFlightBookingPaymentIntentRequest,
  CreateOfferRequestPaymentIntentRequest,
  PaymentIntentData
} from './paymentIntents.types'

export const paymentIntentsService = {
  createOfferRequestPaymentIntent: async (
    request: CreateOfferRequestPaymentIntentRequest
  ): Promise<PaymentIntentData> => {
    logger.info(`Attempting to create payment intent for offer request with details: ${JSON.stringify(request)}`)

    try {
      const paymentData = await calculatePaymentForNewOfferRequest(request.offerDetails)

      const metadata: Record<string, string> = {
        offerDetails: JSON.stringify(request.offerDetails)
      }

      const paymentIntentData = await createPaymentIntentForPayment(paymentData, metadata)

      logger.info(
        `Payment intent created for offer request: ${obfuscateStripeData(paymentIntentData.paymentIntent?.id ?? '')}`
      )

      return paymentIntentData
    } catch (error) {
      logger.error('Error creating payment intent for offer request', error)
      throw error
    }
  },

  createPaymentIntentForExistingItemRequest: async (
    itemRequest: item_requests & {
      items: items
    },
    paymentMethodId?: string
  ): Promise<PaymentIntentData> => {
    logger.info(`Attempting to create payment intent for existing item request for item request id: ${itemRequest.id}`)

    try {
      const {
        id: itemRequestId,
        price_paid_by_shopper,
        tax,
        delivery_fee,
        traveler_benefit,
        items: { currency }
      } = itemRequest

      const itemValue = Number(price_paid_by_shopper)
      const itemTax = Number(tax)
      const itemDeliveryFee = Number(delivery_fee)
      const stripeFee = calculateStripeFee(itemValue, itemDeliveryFee, itemTax)
      const totalFees = stripeFee + itemDeliveryFee
      const total = itemValue + itemDeliveryFee + itemTax + stripeFee
      const travelerBenefit = Number(traveler_benefit)

      const metadata: Record<string, string> = {
        itemRequestId: itemRequestId.toString()
      }

      const paymentData: CheckoutSessionPaymentData = {
        total,
        subtotal: itemValue,
        tax: itemTax,
        deliveryFee: itemDeliveryFee,
        fees: totalFees,
        discount: travelerBenefit,
        stripeFee,
        currency
      }

      const paymentIntentData = await createPaymentIntentForPayment(paymentData, metadata, paymentMethodId)

      logger.info(
        `Payment intent created for existing item request: ${obfuscateStripeData(paymentIntentData.paymentIntent?.id ?? '')}`
      )

      return paymentIntentData
    } catch (error) {
      logger.error('Error creating payment intent for existing item request', error)
      throw error
    }
  },

  createFlightBookingPaymentIntent: async (
    request: CreateFlightBookingPaymentIntentRequest
  ): Promise<PaymentIntentData> => {
    const { flightItineraryId, externalFlightBookingOfferId, additionalServiceIds } = request

    const paymentData = await calculatePaymentForFlightBooking(
      flightItineraryId,
      externalFlightBookingOfferId,
      additionalServiceIds
    )

    const metadata: Record<string, string> = {
      flightItineraryId: flightItineraryId.toString(),
      externalFlightBookingOfferId,
      additionalServices: JSON.stringify(paymentData.serviceTotals)
    }

    if (paymentData.total < 1) {
      const paymentIntentData = await createPaymentIntentForTransfer(paymentData)

      return paymentIntentData
    } else {
      const paymentIntentData = await createPaymentIntentForPayment(paymentData, metadata)

      return paymentIntentData
    }
  },

  createExternalFlightBookingPaymentIntent: async (
    request: CreateExternalFlightBookingPaymentIntentRequest
  ): Promise<PaymentIntentData> => {
    const { flightItineraryId } = request

    const paymentData = await calculatePaymentForExternalFlightBooking(flightItineraryId)

    const paymentIntentData = await createPaymentIntentForTransfer(paymentData)

    return paymentIntentData
  }
}
