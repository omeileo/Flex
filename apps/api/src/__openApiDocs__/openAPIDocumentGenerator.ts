import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi'

import { changePasswordRegistry } from '../api/user/auth/changePassword/changePassword.docs'
import { forgetPasswordRegistry } from '../api/user/auth/forgetPassword/forgetPassword.docs'
import { loginRegistry } from '../api/user/auth/login/login.docs'
import { logoutRegistry } from '../api/user/auth/logout/logout.docs'
import { signUpRegistry } from '../api/user/auth/signUp/signUp.docs'
import { verifyEmailRegistry } from '../api/user/auth/verifyEmail/verifyEmail.docs'
import { contactInfoRegistry } from '../api/user/profile/contactInfo/contactInfo.docs'
import { personalInfoRegistry } from '../api/user/profile/personalInfo/personalInfo.docs'
import { profileRegistry } from '../api/user/profile/profileDetails/profile.docs'
import { env } from '../shared/functions/envConfig'

const cookieComponent = new OpenAPIRegistry()

cookieComponent.registerComponent('securitySchemes', 'CookieAuth', {
  type: 'apiKey',
  in: 'cookie',
  name: 'jwt',
  description: 'Cookie-based authentication'
})

const getPaymentRegistries = (): OpenAPIRegistry[] => {
  if (!env.ENABLE_TEMPLATE_PAYMENTS) {
    return []
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const paymentDocs = require('../api/user/payments/paymentOpenApiRegistries') as {
    paymentOpenApiRegistries: OpenAPIRegistry[]
  }

  return paymentDocs.paymentOpenApiRegistries
}

/*
 * Generate the OpenAPI document for the Project API
 */
export function generateOpenAPIDocument() {
  const registries = [
    ...getPaymentRegistries(),
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
