export interface CheckoutSessionPaymentData {
  subtotal: number
  discount?: number
  stripeFee?: number
  deliveryFee?: number
  fees: number
  tax?: number
  total: number
  currency: string
}
