import { resetFlexApiClient } from '@network/flexApi/flexApi.functions'
import { clearFlexApiToken, getFlexApiToken } from '@network/flexApi/flexApiToken.functions'
import logger from '@shared/functions/Logger/logger.functions'

import { removeUserRole } from '../UserRole/userRoleManagment.functions'
import { isAuthenticated, setAuthenticationStatus } from './auth.functions'

export const clearSession = (): void => {
  setAuthenticationStatus(false)
  removeUserRole()
  void clearFlexApiToken()
  resetFlexApiClient()
}

export const validateStoredSession = async (): Promise<void> => {
  try {
    const token = await getFlexApiToken()
    const authenticated = isAuthenticated()

    if (authenticated && !token) {
      clearSession()

      return
    }

    if (!authenticated && token) {
      setAuthenticationStatus(true)
    }
  } catch (error) {
    logger.logError(error, 'Failed to validate stored session', 'validateStoredSession')
    clearSession()
  }
}
