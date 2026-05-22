import { MMKV } from 'react-native-mmkv'

import env from '../../../networkRequests/apiClient/env.config'
import { logEvent } from '../Logger/logger.functions'

const storage = new MMKV({ id: 'flexmobile.local-storage' })

const isEmpty = (value: string | undefined | null): boolean => value === undefined || value === null || value === ''

export default function wrapperLocalStorage() {
  return {
    /**
     * Stores data in MMKV-backed local storage. Synchronous to mirror the web `localStorage` API.
     */
    setItem: (key: string, value: unknown, onSuccess?: () => void) => {
      if (isEmpty(key)) {
        logEvent('Error_Setting_Empty_Local_Storage_Key')

        return
      }

      try {
        const modifiedKey = `${env.PRODUCT_NAME}_${key}`
        storage.set(modifiedKey, JSON.stringify(value))
        onSuccess && onSuccess()
      } catch (_error) {
        logEvent(`Error_Setting_Local_Storage_Value_${key}`)
      }
    },

    /**
     * Retrieves data from MMKV-backed local storage.
     */
    getItem: (key: string) => {
      try {
        const modifiedKey = `${env.PRODUCT_NAME}_${key}`
        const value = storage.getString(modifiedKey)
        let storageValue = null

        if (value !== undefined && value !== null) {
          storageValue = JSON.parse(value)
        }

        return storageValue
      } catch (_error) {
        logEvent(`Error_Getting_Local_Storage_Value_${key}`)

        return null
      }
    },

    /**
     * Removes data from local storage.
     */
    removeItem: (key: string) => {
      try {
        const modifiedKey = `${env.PRODUCT_NAME}_${key}`
        storage.delete(modifiedKey)
      } catch (_error) {
        logEvent(`Error_Deleting_Local_Storage_Value_${key}`)
      }
    }
  }
}
