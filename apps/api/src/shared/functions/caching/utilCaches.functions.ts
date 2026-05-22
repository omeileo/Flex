import { logger } from '@/app'
import { currencies } from '@prisma/client'
import NodeCache from 'node-cache'

import prisma from '../../../../prisma/prisma.client'
import { env } from '../envConfig'
import { durationToMilliseconds } from '../schedulars/__scehdular/schedular.functions'

/**
 * Creates a Node Cache instance.
 * @type {NodeCache}
 */
export const cacheClient = new NodeCache()

export const utilCaches = {
  updateAll: async () => {
    await utilCaches.update.updateAvailableCurrencies()
  },

  currencies: {
    findByCode: function (code: string): currencies {
      const currencies = cacheClient.get('currencies') as currencies[]
      const currency = currencies.find((c) => c.code === code)

      if (!currency) {
        return {
          id: 'unknown',
          code: 'UKN',
          name: 'Unknown Currency',
          symbol: '$'
        }
      }

      return currency
    }
  },

  update: {
    /**
     * Updates the cache with the latest list of item providers from the database.
     * @async
     * @function
     */
    updateAvailableCurrencies: async () => {
      try {
        const currencies = await prisma?.currencies?.findMany()

        if (currencies) {
          cacheClient.set('currencies', currencies)
        }
      } catch (error) {
        logger.error(`Failed to update Available Currencies Cache: ${error}`)
      }
    }
  },

  fetch: {
    /**
     * Retrieves the list of available currencies from the cache.
     * @returns {currencies[]} The list of available currencies.
     */
    getAvailableCurrencies: function (): currencies[] {
      const currencies = cacheClient.get('currencies')

      if (currencies) {
        return currencies as currencies[]
      }

      return []
    }
  }
}

/**
 * Initializes the cache by updating the item providers cache.
 * Schedules cache updates every 48 hours.
 * @async
 * @function
 */
const updateAllCaches = async () => {
  await utilCaches.updateAll()
  logger.info('Util Caches Updated')
}

export const initializeUtilCaches = async () => {
  logger.info('🔄 Initializing util caches...')

  try {
    const interval = durationToMilliseconds(env.UTIL_CACHE_INTERVAL)

    await updateAllCaches()
    setInterval(updateAllCaches, interval)

    logger.info(`✅ Util Caches initialized. Interval: ${env.UTIL_CACHE_INTERVAL} (${interval} ms)`)
  } catch (error) {
    logger.error(`❌ Failed to initialize util caches: ${error}`)
    throw error
  }
}
