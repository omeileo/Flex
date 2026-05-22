import { auditLogRepository } from '../../../../shared/repository/auditLog/auditLog.repository'
import { blacklistedTokensRepository } from '../../../../shared/repository/blacklistedTokens.repository'

export const logoutService = {
  logout: async (token: string) => {
    blacklistedTokensRepository.blacklistToken(token)

    auditLogRepository.logActivity('User logout Success')

    return {}
  }
}
