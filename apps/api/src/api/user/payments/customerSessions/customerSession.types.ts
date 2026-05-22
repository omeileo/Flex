import {
  CheckOnboardingInfoRequestBody,
  CreateCustomerSessionResponseBody,
  createCustomerSessionRequestBody
} from './customerSession.model'

/**
 * Represents the request object for creating a Customer Session.
 */
export type CreateCustomerSessionRequest = Zod.infer<typeof createCustomerSessionRequestBody>

/**
 * Represents the response object returned by the Create Customer Session API.
 */
export type CreateCustomerSessionResponse = Zod.infer<typeof CreateCustomerSessionResponseBody>

/**
 * Represents the request object for checking onboarding info.
 */
export type CheckOnboardingInfoRequest = Zod.infer<typeof CheckOnboardingInfoRequestBody>

export const enum OnboardingInfoType {
  ID_DOCUMENT_UPLOADED = 'ID_DOCUMENT_UPLOADED'
}
