import Stripe from 'stripe'

export interface User {
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  hourrierUserId: number
  countryCode: string
}

export interface IDVerificationStatus {
  isVerified: boolean
  status: StripeIdVerificationStatus | undefined
  details: string | undefined | null
}

export type StripeIdVerificationStatus = 'pending' | 'verified' | 'unverified'

export type CreatePaymentIntentType = 'flight-booking' | 'offer-request'

export type AccountSession = Stripe.Response<Stripe.AccountSession>
