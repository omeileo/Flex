import { ParamsFrom } from '@/__openApiDocs__/functions/openAPI.functions'

import { zodd } from '../../../../shared/functions/zod.functions'

export const GetUserProfileQueryParams = zodd.object({
  firebaseData: zodd.boolean().optional().default(false).openapi({
    example: false,
    description: 'Whether to return only Firebase data in the response'
  })
})

export const IncomingGetUserProfileQueryParams = zodd.object({
  query: ParamsFrom(GetUserProfileQueryParams)
})

/**
 * Represents the response body for the Profile endpoint.
 *
 * This is returned when the password change is successful.
 */
export const ProfileResponseBody = zodd.object({
  firstName: zodd.string().openapi({
    example: 'John',
    description: 'First name of the user'
  }),
  middleName: zodd.string().openapi({
    example: 'Alexander',
    description: 'Middle name of the user'
  }),
  lastName: zodd.string().openapi({
    example: 'Doe',
    description: 'Last name of the user'
  }),
  dateOfBirth: zodd
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .openapi({
      example: '1990-01-01',
      description: 'Date of birth in YYYY-MM-DD format'
    }),
  mobileNumber: zodd.string().openapi({
    example: '+1234567890',
    description: 'Mobile number of the user'
  }),
  email: zodd.string().email().openapi({
    example: 'john.doe@example.com',
    description: 'Email address of the user'
  }),
  deliveryAddresses: zodd.array(zodd.any()).openapi({
    example: [],
    description: 'List of delivery addresses'
  }),
  loyaltyPrograms: zodd.array(zodd.any()).openapi({
    example: [],
    description: 'List of loyalty programs the user is part of'
  })
})

export const UpdateUserFirebaseUserIdRequestBody = zodd.object({
  firebaseUserId: zodd.string().openapi({
    example: '1ECFxpoyCTNKZU3Rz4RRBqTkNge2',
    description: 'Firebase User ID of the user'
  })
})

export const IncomingUpdateUserFirebaseUserIdRequestBody = zodd.object({
  body: UpdateUserFirebaseUserIdRequestBody
})
