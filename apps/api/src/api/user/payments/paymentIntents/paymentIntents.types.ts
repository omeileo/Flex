import {
  CreateOfferRequestPaymentIntentRequestBody,
  CreateOfferRequestPaymentIntentResponse
} from './paymentIntents.model'

/**
 * Represents the request body for adding a user Offer Request Payment Intents Info.
 */
export type CreateOfferRequestPaymentIntentRequest = Zod.infer<typeof CreateOfferRequestPaymentIntentRequestBody>

/**
 * Represents the response object returned by the Update Offer Request Payment Intents Info API.
 */
export type CreateOfferRequestPaymentIntentResponse = Zod.infer<typeof CreateOfferRequestPaymentIntentResponse>

export interface OfferDetail {
  itemId: number
  itemQuantity: number
}

export interface DeliveryDetails {
  countryIataCode: string
  cityIataCode: string
}

export interface CreateFlightBookingPaymentIntentRequest {
  flightItineraryId: number
  externalFlightBookingOfferId: string
  additionalServiceIds: string[]
  countryCode?: string
}

export interface CreateExternalFlightBookingPaymentIntentRequest {
  flightItineraryId: string
}

export interface StripeSession {
  secret: string | null
  expiresAt: string | null
}

export interface SetupIntent {
  secret: string | null
}

export interface PaymentIntent {
  id: string
  secret: string | null
}

export interface PaymentIntentData {
  paymentIntent?: PaymentIntent
  setupIntent?: SetupIntent
  customerSession?: StripeSession
  isCustomerOnboardedToStripeConnect?: boolean
  subtotal: number
  tax?: number
  fees?: number
  stripeFee?: number
  deliveryFee?: number
  discount?: number
  total: number
  currency: string
}

export interface CreatePaymentIntentResponse {
  timestamp: string
  status: number
  message: string
  data: PaymentIntentData
  correlationId: string
  userFriendlyMessage: string
}

export type CreatePaymentIntentType = 'offer-request' | 'flight-booking'
