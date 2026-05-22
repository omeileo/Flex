import { zodd } from '../../../../shared/functions/zod.functions'
import { OnboardingInfoType } from './customerSession.types'

/**
 * Represents the request body for creating Customer Session information.
 *
 * This is used to validate the incoming request to the "Create Customer Session" endpoint.
 */

export const createCustomerSessionRequestBody = zodd.object({
  countryCode: zodd
    .string()
    .optional()
    .openapi({
      description: 'Country code',
      example: 'US'
    })
    .optional(),
  phoneNumber: zodd
    .string()
    .optional()
    .openapi({
      description: 'Phone number',
      example: '+1234567890'
    })
    .optional()
})

/**
 * Represents the incoming request object for creating a Customer Session.
 *
 * This is used to validate the incoming request to the "Create Customer Session" endpoint.
 */
export const IncomingCustomerSessionRequestBody = zodd.object({
  body: createCustomerSessionRequestBody
})

/**
 * Represents the response body for the "Create Customer Session" endpoint.
 *
 * This is returned when the Customer Session creation is successful.
 */
export const CreateCustomerSessionResponseBody = zodd
  .object({
    customerSessionClientSecret: zodd.string().openapi({
      description: 'Customer session client secret',
      example: 'cuss_secret_R8OrDeLypgEKPGz3B6VRfTE1qrYw6iZJU1ZPRr9CUOtmnrG'
    }),
    setupIntentClientSecret: zodd.string().openapi({
      description: 'Setup intent client secret',
      example: 'sk_test_1234567890'
    })
  })
  .openapi({
    description: 'Success response',
    example: {
      customerSessionClientSecret: 'cs_1234567890',
      setupIntentClientSecret: 'sk_test_1234567890'
    }
  })

/**
 * Represents the response body for the "Check Onboarding Info" endpoint.
 *
 * This is returned when the Onboarding Info check is successful.
 */
export const CheckOnboardingInfoRequestBody = zodd
  .object({
    infoType: zodd.enum([OnboardingInfoType.ID_DOCUMENT_UPLOADED]).openapi({
      description: 'Type of onboarding information required',
      example: OnboardingInfoType.ID_DOCUMENT_UPLOADED
    })
  })
  .openapi({
    description: 'Success response',
    example: {
      infoType: OnboardingInfoType.ID_DOCUMENT_UPLOADED
    }
  })

/**
 * Represents the incoming request object for checking onboarding info.
 *
 * This is used to validate the incoming request to the "Check Onboarding Info" endpoint.
 */
export const IncomingCheckOnboardingInfoRequestBody = zodd.object({
  body: CheckOnboardingInfoRequestBody
})
