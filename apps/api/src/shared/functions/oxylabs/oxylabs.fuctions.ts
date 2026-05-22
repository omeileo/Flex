import { logger } from '@/app'

import oxylabsClient from './oxylabs.client'
import { AmazonProductInfoRequest, AmazonProductInfoResponse } from './oxylabs.types'

export const oxylabsHelper = {
  async getAmazonProductInfo(url: string): Promise<AmazonProductInfoResponse> {
    logger.info('Getting Amazon product info for URL')

    try {
      const request: AmazonProductInfoRequest = {
        source: 'amazon',
        url,
        parse: true
      }

      const productInfo = await oxylabsClient.getAmazonProductInfo(request)
      const sanitizedProductInfo = JSON.parse(this.cleanAndSanitizeString(JSON.stringify(productInfo)))

      logger.info('Successfully retrieved Amazon product info for URL:', url)

      return sanitizedProductInfo
    } catch (error) {
      logger.error('Error getting Amazon product info:', error)
      throw error
    }
  },

  /**
   * Helper functions for Amazon product info
   */
  amazon: {
    getStockStatus(stock: string): 'In Stock' | 'Out of Stock' | 'Low Stock' {
      if (stock === 'In Stock') {
        return 'In Stock'
      } else if (stock.includes('Only') && stock.includes('left in stock')) {
        return 'Low Stock'
      } else {
        // return 'Out of Stock'
        return 'In Stock'
      }
    },

    extractStockQuantity(stock: string): number {
      const match = stock.match(/Only (\d+) left in stock - order soon\./)

      return match ? parseInt(match[1], 10) : -1
    },

    parseWeight(weightStr: string): { weight: number; unit: string } {
      if (weightStr) {
        const match = weightStr.match(/([\d.]+)\s*(\w+)/)

        if (match) {
          return {
            weight: parseFloat(match[1]),
            unit: match[2]
          }
        }
      }

      return {
        weight: -1,
        unit: ''
      }
    }
  },

  /**
   * Cleans and sanitizes a string by normalizing it to NFKC and removing non-ASCII characters.
   * @param input - The input string to clean and sanitize.
   * @returns The cleaned and sanitized string.
   */
  cleanAndSanitizeString(input: string): string {
    return input.normalize('NFKC').replace(/[^\x20-\x7E]/g, '')
  }
}
