import { Express } from 'express'

import { env } from '../../shared/functions/envConfig'
import { healthCheckRouter } from '../__healthCheck__/healthCheck.controller'
import { HealthCheckBasePath } from '../__healthCheck__/healthCheck.routes'
import { changePasswordRouter } from '../user/auth/changePassword/changePassword.controller'
import { ChangePasswordBasePath } from '../user/auth/changePassword/changePassword.routes'
import { forgetPasswordRouter } from '../user/auth/forgetPassword/forgetPassword.controller'
import { ForgetPasswordBasePath } from '../user/auth/forgetPassword/forgetPassword.routes'
import { loginRouter } from '../user/auth/login/login.controller'
import { LoginBasePath } from '../user/auth/login/login.routes'
import { logoutRouter } from '../user/auth/logout/logout.controller'
import { LogoutBasePath } from '../user/auth/logout/logout.routes'
import { signUpRouter } from '../user/auth/signUp/signUp.controller'
import { SignUpBasePath } from '../user/auth/signUp/signUp.routes'
import { verifyEmailRouter } from '../user/auth/verifyEmail/verifyEmail.controller'
import { VerifyEmailBasePath } from '../user/auth/verifyEmail/verifyEmail.routes'
import { checkoutSessionRouter } from '../user/payments/checkoutSessions/checkoutSession.controller'
import { checkoutSessionBasePath } from '../user/payments/checkoutSessions/checkoutSession.routes'
import { customerSessionRouter } from '../user/payments/customerSessions/customerSession.controller'
import { customerSessionBasePath } from '../user/payments/customerSessions/customerSession.routes'
import { paymentIntentsRouter } from '../user/payments/paymentIntents/paymentIntents.controller'
import { paymentIntentsBasePath } from '../user/payments/paymentIntents/paymentIntents.routes'
import { paymentMethodsRouter } from '../user/payments/paymentMethods/paymentMethods.controller'
import { paymentMethodsBasePath } from '../user/payments/paymentMethods/paymentMethods.routes'
import { refundRouter } from '../user/payments/refunds/refund.controller'
import { refundBasePath } from '../user/payments/refunds/refund.routes'
import { contactInfoRouter } from '../user/profile/contactInfo/contactInfo.controller'
import { ContactInfoBasePath } from '../user/profile/contactInfo/contactInfo.routes'
import { personalInfoRouter } from '../user/profile/personalInfo/personalInfo.controller'
import { PersonalInfoBasePath } from '../user/profile/personalInfo/personalInfo.routes'
import { profileRouter } from '../user/profile/profileDetails/profile.controller'
import { ProfileBasePath } from '../user/profile/profileDetails/profile.routes'
import { registerFlexRoutes } from './registerFlexRoutes.functions'

export const withBasePath = (basePath: string) => {
  return `${env.APP_BASE_PATH}${basePath}`
}

export const registerRoutes = (app: Express): void => {
  if (env.ENABLE_TEMPLATE_PAYMENTS) {
    app.use(withBasePath(paymentMethodsBasePath), paymentMethodsRouter)
    app.use(withBasePath(refundBasePath), refundRouter)
    app.use(withBasePath(checkoutSessionBasePath), checkoutSessionRouter)
    app.use(withBasePath(customerSessionBasePath), customerSessionRouter)
    app.use(withBasePath(paymentIntentsBasePath), paymentIntentsRouter)
  }

  app.use(withBasePath(VerifyEmailBasePath), verifyEmailRouter)
  app.use(withBasePath(SignUpBasePath), signUpRouter)
  app.use(withBasePath(LoginBasePath), loginRouter)
  app.use(withBasePath(LogoutBasePath), logoutRouter)
  app.use(withBasePath(ForgetPasswordBasePath), forgetPasswordRouter)
  app.use(withBasePath(ChangePasswordBasePath), changePasswordRouter)
  app.use(withBasePath(ProfileBasePath), profileRouter)
  app.use(withBasePath(PersonalInfoBasePath), personalInfoRouter)
  app.use(withBasePath(ContactInfoBasePath), contactInfoRouter)
  app.use(withBasePath(HealthCheckBasePath), healthCheckRouter)

  registerFlexRoutes(app)
}
