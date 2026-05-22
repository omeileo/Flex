import {
  UpdatePaymentMethodResponseBody,
  paymentMethodQueryParam,
  paymentMethodRequestBody
} from './paymentMethods.model'

/**
 * Represents the request body for adding Payment Method Info.
 */
export type AddPaymentMethodRequestBody = Zod.infer<typeof paymentMethodRequestBody>

/**
 * Represents the request body for updating Payment Method Info.
 */
export type UpdatePaymentMethodRequestBody = Zod.infer<typeof paymentMethodRequestBody>

/**
 * Represents the response object returned by the Update Payment Method Info API.
 */
export type UpdatePaymentMethodResponse = Zod.infer<typeof UpdatePaymentMethodResponseBody>

/**
 * Represents the response object returned by the Get Payment Method Info API.
 */
export type PaymentMethod = Zod.infer<typeof paymentMethodRequestBody>

export type PaymentMethodQueryParam = Zod.infer<typeof paymentMethodQueryParam>
