import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi'

import { changePasswordRegistry } from '../api/user/auth/changePassword/changePassword.docs'
// import { healthCheckRegistry } from '../api/__healthCheck__/healthCheck.docs'
import { forgetPasswordRegistry } from '../api/user/auth/forgetPassword/forgetPassword.docs'
import { loginRegistry } from '../api/user/auth/login/login.docs'
import { logoutRegistry } from '../api/user/auth/logout/logout.docs'
import { signUpRegistry } from '../api/user/auth/signUp/signUp.docs'
import { verifyEmailRegistry } from '../api/user/auth/verifyEmail/verifyEmail.docs'
import { checkoutSessionRegistry } from '../api/user/payments/checkoutSessions/checkoutSession.docs'
import { customerSessionRegistry } from '../api/user/payments/customerSessions/customerSession.docs'
import { paymentIntentsRegistry } from '../api/user/payments/paymentIntents/paymentIntents.docs'
import { paymentMethodsRegistry } from '../api/user/payments/paymentMethods/paymentMethods.docs'
import { refundRegistry } from '../api/user/payments/refunds/refund.docs'
import { contactInfoRegistry } from '../api/user/profile/contactInfo/contactInfo.docs'
import { personalInfoRegistry } from '../api/user/profile/personalInfo/personalInfo.docs'
import { profileRegistry } from '../api/user/profile/profileDetails/profile.docs'
import { env } from '../shared/functions/envConfig'

/*
 * Generate the OpenAPI document for the Project API
 */
export function generateOpenAPIDocument() {
  const registries = [
    paymentMethodsRegistry,
    refundRegistry,
    customerSessionRegistry,
    checkoutSessionRegistry,
    paymentIntentsRegistry,
    contactInfoRegistry,
    personalInfoRegistry,
    profileRegistry,
    changePasswordRegistry,
    forgetPasswordRegistry,
    logoutRegistry,
    loginRegistry,
    verifyEmailRegistry,
    signUpRegistry,
    cookieComponent
  ]

  const registry = new OpenAPIRegistry(registries.reverse())
  const generator = new OpenApiGeneratorV3(registry.definitions)

  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Hourrier API Docs'
    },
    externalDocs: {
      description: 'View the raw OpenAPI Specification in JSON format',
      url: `${env.APP_BASE_PATH}/swagger.json`
    }
  })
}

const cookieComponent = new OpenAPIRegistry()

cookieComponent.registerComponent('securitySchemes', 'CookieAuth', {
  type: 'apiKey',
  in: 'cookie',
  name: 'jwt',
  description: 'Cookie-based authentication'
})
