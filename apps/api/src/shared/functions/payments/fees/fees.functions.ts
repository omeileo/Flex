import { logger } from '@/app'

import { env } from '../../envConfig'

/**
 * Calculate processing fees for payments
 */

export interface FeeCalculation {
  subtotal: number
  processingFee: number
  stripeFee: number
  total: number
}

/**
 * Calculate Stripe processing fees
 * Standard Stripe fees: 2.9% + $0.30 per transaction
 * @param amount - The payment amount in dollars
 * @returns The calculated Stripe fee
 */
export const calculateStripeFee = (amount: number): number => {
  try {
    const percentageFee = amount * env.STRIPE_FEE_PERCENTAGE
    const fixedFee = env.STRIPE_FIXED_FEE_CENTS

    return Math.round((percentageFee + fixedFee) * 100) / 100 // Round to 2 decimal places
  } catch (error) {
    logger.error('Error calculating Stripe fee', error)
    return 0
  }
}

/**
 * Calculate total processing fees including platform fees
 * @param amount - The payment amount in dollars
 * @param platformFeePercentage - Optional platform fee percentage (default: 0)
 * @returns Fee calculation breakdown
 */
export const calculateProcessingFees = (amount: number, platformFeePercentage: number = 0): FeeCalculation => {
  try {
    const stripeFee = calculateStripeFee(amount)
    const processingFee = amount * (platformFeePercentage / 100)
    const total = amount + stripeFee + processingFee

    return {
      subtotal: Math.round(amount * 100) / 100,
      processingFee: Math.round(processingFee * 100) / 100,
      stripeFee: Math.round(stripeFee * 100) / 100,
      total: Math.round(total * 100) / 100
    }
  } catch (error) {
    logger.error('Error calculating processing fees', error)

    return {
      subtotal: amount,
      processingFee: 0,
      stripeFee: 0,
      total: amount
    }
  }
}

/**
 * Calculate refund fees (Stripe doesn't refund the fixed fee portion)
 * @param originalAmount - The original payment amount
 * @param refundAmount - The amount being refunded
 * @returns The fee that will be retained by Stripe
 */
export const calculateRefundFee = (originalAmount: number, refundAmount: number): number => {
  try {
    // Stripe keeps the $0.30 fixed fee on refunds
    const fixedFeeRetained = 0.3

    // Calculate the percentage fee that will be refunded
    const originalStripeFee = calculateStripeFee(originalAmount)
    const refundPercentage = refundAmount / originalAmount
    const refundedStripeFee = (originalStripeFee - fixedFeeRetained) * refundPercentage

    return Math.round((originalStripeFee - refundedStripeFee) * 100) / 100
  } catch (error) {
    logger.error('Error calculating refund fee', error)
    return 0.3 // Return minimum fixed fee
  }
}
