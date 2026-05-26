import { createFlexApiClient } from '@flex/shared/functions/http/flexApiClient/flexApiClient'
import env from '@network/apiClient/env.config'
import { clearSession } from '@shared/functions/Auth/session.functions'

import { FlexApiInstance } from './flexApi.types'
import { getFlexApiToken } from './flexApiToken.functions'

let flexApiClient: FlexApiInstance | null = null

export const getFlexApi = (): FlexApiInstance => {
  if (!flexApiClient) {
    flexApiClient = createFlexApiClient({
      baseUrl: env.API_BASE_URL,
      getToken: getFlexApiToken,
      onUnauthorized: () => {
        clearSession()
      }
    })
  }

  return flexApiClient
}

export const resetFlexApiClient = () => {
  flexApiClient = null
}
