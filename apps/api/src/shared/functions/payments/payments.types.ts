import { CreateOfferRequestPaymentIntentRequest } from '@/api/user/payments/paymentIntents/paymentIntents.types'
import { Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import prisma from 'prisma/prisma.client'

export type CalculatePaymentForOfferRequest = CreateOfferRequestPaymentIntentRequest

export interface CheckoutSessionPaymentData {
  subtotal: number
  discount?: number
  discountUsageId?: string
  stripeFee?: number
  deliveryFee?: number
  fees: number
  tax?: number
  total: number
  currency: string
}

export interface CheckoutSessionPaymentDataWithServices extends CheckoutSessionPaymentData {
  serviceTotals: FlightBookingServiceTotals
}

export interface ItemDetails {
  id: number
  item_request_id?: number
  accepted_item_price?: number
  price: number
  weight: number
  weight_unit: string
  quantity: number
  country: string
  categories: string[]
  delivery_fee?: number
  tax?: number
  traveler_benefit?: number
}

export interface ItemWithDeliveryFeeAndTravelerBenefit {
  id: number
  deliveryFee: number
  stripeFee: number
  travelerBenefit: number
}

export interface CalculateFeesResponse {
  deliveryFees: number
  stripeFees: number
  totalFees: number
  itemsWithFeesAndTravelerBenefit: ItemWithDeliveryFeeAndTravelerBenefit[]
}

export interface ItemWithTax {
  id: number
  item_request_id?: number
  tax: number
}

export interface CalculateTaxResponse {
  tax: number
  itemsWithTax: ItemWithTax[]
}

export interface TaxExemption {
  id: number
  administrative_division_id: number
  tax_country_id: number | null
  category: string
  no_tax: boolean | null
  conditional_exemption: boolean | null
  threshold_amount: Decimal | null
  tax_price_difference_above_threshold: boolean | null
}

export interface CheckoutSessionPaymentDataFees {
  deliveryFees: number
  stripeFees: number
  totalFees: number
}

export interface FlightBookingServiceTotals {
  baggageSubtotal: number
  seatSubtotal: number
  grandSubtotal: number
}

export type ExternalSystemPaymentDetails = NonNullable<
  Prisma.PromiseReturnType<typeof prisma.external_system_payment_details.findUnique>
>
