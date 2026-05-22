import { zodd } from '../../../../shared/functions/zod.functions'

/**
 * Represents the request body for updating personal information.
 *
 * This is used to validate the incoming request to the "Update Personal Info" endpoint.
 */
export const UpdatePersonalInfoRequestBody = zodd.object({
  firstName: zodd.string().min(1).max(50).openapi({
    example: 'John',
    description: "The user's updated first name"
  }),
  middleName: zodd.string().nullable().openapi({
    example: 'Quincy',
    description: "The user's updated middle name"
  }),
  lastName: zodd.string().min(1).max(50).openapi({
    example: 'Doe',
    description: "The user's updated last name"
  }),
  dateOfBirth: zodd
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'dateOfBirth must be in YYYY-MM-DD format')
    .openapi({
      example: '1990-06-29',
      description: "The user's updated date of birth"
    })
})

/**
 * Represents the incoming request object for updating personal information.
 *
 * This is used to validate the incoming request to the "Update Personal Info" endpoint.
 */
export const IncomingUpdatePersonalInfoRequest = zodd.object({
  body: UpdatePersonalInfoRequestBody
})

/**
 * Represents the response body for the "Update Personal Info" endpoint.
 *
 * This is returned when the personal information update is successful.
 */
export const UpdatePersonalInfoResponseBody = zodd.object({}).openapi({ description: 'Empty object', example: {} })
