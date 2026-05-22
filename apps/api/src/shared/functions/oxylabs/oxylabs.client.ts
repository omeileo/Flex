import { logger } from '@/app'
import axios from 'axios'
import https from 'https'

import { env } from '../envConfig'
import { AmazonProductInfoRequest, AmazonProductInfoResponse } from './oxylabs.types'

// Create custom agent to handle SSL
const agent = new https.Agent({
  rejectUnauthorized: env.NODE_ENV === 'production' ? true : false // Bypass SSL verification (TEMPORARY FIX)
})

/**
 * A custom client for interacting with the Oxylabs API.
 */
const oxylabsClient = {
  baseUrl: env.OXYLABS_API_URL,
  auth: {
    username: env.OXYLABS_USERNAME,
    password: env.OXYLABS_PASSWORD
  },

  /**
   * Get the headers required for the Oxylabs API requests.
   * @returns {Object} The headers object.
   */
  get headers() {
    return {
      'Accept-Encoding': 'gzip',
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  },

  /**
   * Fetches the Amazon product info from the Oxylabs API.
   * @param {AmazonProductInfoRequest} request - The request object containing the URL.
   * @returns {Promise<AmazonProductInfoResponse>} The response containing the product info.
   * @throws Will throw an error if the request fails.
   */
  async getAmazonProductInfo(request: AmazonProductInfoRequest): Promise<AmazonProductInfoResponse> {
    try {
      const response = await axios.post(`${this.baseUrl}/queries`, request, {
        headers: this.headers,
        auth: this.auth,
        httpsAgent: agent, // Add custom agent
        timeout: env.OXYLABS_TIMEOUT
      })

      return response.data
    } catch (error) {
      logger.error('Error fetching Amazon product info:', error)
      throw error
    }
  }
}

export default oxylabsClient
