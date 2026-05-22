import { logger } from '@/app'
import { email } from '@/shared/email/email.functions'
import { obfuscateSensitiveData } from '@/shared/functions/security/security.functions'
import { rolesRepository } from '@/shared/repository/roles.repository'
import { userRepository } from '@/shared/repository/user.repository'

import { Status } from '../../../../shared/enums/status.enum'
import { env } from '../../../../shared/functions/envConfig'
import passwordHasher from '../../../../shared/functions/password.functions'
import { jwtService } from '../../../../shared/middleware/jwt/jwt.functions'
import { auditLogRepository } from '../../../../shared/repository/auditLog/auditLog.repository'
import { loginErrors } from './login.dictionary'
import { loginRepository } from './login.repository'
import { LoginRequest, LoginResponse, LoginUser } from './login.types'

export const LoginSettings = {
  maxPasswordAttempts: env.AUTH_LOGIN_MAX_ATTEMPTS,
  forbiddenStatuses: [Status.unverified, Status.disabled, Status.locked, Status.soft_deleted]
}

export const loginService = {
  login: async (loginRequest: LoginRequest): Promise<LoginResponse> => {
    const user = await loginRepository.getUserToLoginByEmail(loginRequest.email)

    if (user.status.name === Status.unverified) {
      throw loginErrors.accountNotVerified.build()
    }

    try {
      await loginService.validateUserStatus(user)
      await loginService.validateUserPassword(user, loginRequest.password)
      const token = jwtService.generateToken({ userId: user.id })
      const roles = await rolesRepository.getRolesOfUser(user.id)

      return { token, roles }
    } catch (error) {
      logger.error('Error logging in', error)
      throw error
    }
  },

  validateUserStatus: async function (user: LoginUser) {
    if (LoginSettings.forbiddenStatuses.includes(user.status.name as Status)) {
      logger.error(`Login attempt forbidden for user ${user.id} with status ${user.status.name}`)

      try {
        const userDetails = await userRepository.getAllDataForUser(user.id)

        email.auth.sendAccountLockedAlert(userDetails)
      } catch (emailError) {
        logger.error(`Error sending account locked alert: ${emailError}`)
      }

      throw loginErrors.forbiddenLoginAttempt.build(user.status.name)
    }
  },

  validateUserPassword: async function (user: LoginUser, password: string) {
    const isPasswordValid = await passwordHasher.verify(password, user.password_hash)

    if (!isPasswordValid) {
      logger.error(`Password incorrect for user ${user.id} - ${obfuscateSensitiveData(user.email)}`)

      await loginRepository.increasePasswordIncorrectAttemptsMaybeLockAccount(user.id)
    } else {
      auditLogRepository.logActivity('User login Success', user.id)
      await loginRepository.resetPasswordAttempts(user.id)
    }
  }
}
