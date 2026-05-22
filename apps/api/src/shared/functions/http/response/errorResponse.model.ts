import { StatusCodes } from 'http-status-codes'

import { zodd } from '../../zod.functions'

export const APIDateTimeSchema = zodd.string().openapi({
  example: '2024-12-29T14:00:00.000Z',
  description: 'The timestamp of the error response.'
})
export const StatusSchema = {
  BadRequest: zodd.number().openapi({
    example: 400,
    description: 'The HTTP status code of the response, 400, for a validation error.'
  }),

  Conflict: zodd.number().openapi({
    example: 409,
    description: 'The HTTP status code of the response, 409, for a duplication error.'
  }),

  InternalServerError: zodd.number().openapi({
    example: 500,
    description: 'The HTTP status code of the response, 500, for an internal server error.'
  }),

  NotFound: zodd.number().openapi({
    example: 404,
    description: 'The HTTP status code of the response, 404, for a not found error.'
  }),

  Unauthorized: zodd.number().openapi({
    example: 401,
    description: 'The HTTP status code of the response, 401, for an unauthorized error.'
  }),

  UnprocessableEntity: zodd.number().openapi({
    example: 422,
    description: 'The HTTP status code of the response, 422, for a validation error.'
  }),

  NOT_MODIFIED: zodd.number().openapi({
    example: 304,
    description: 'The HTTP status code of the response, 304, for a not modified error.'
  }),

  Forbidden: zodd.number().openapi({
    example: 403,
    description: 'The HTTP status code of the response, 403, for a not modified error.'
  }),

  ServiceUnavailable: zodd.number().openapi({
    example: StatusCodes.SERVICE_UNAVAILABLE,
    description: 'The HTTP status code of the response, 503, for a service unavailable error.'
  }),

  OK: zodd.number().openapi({
    example: 200,
    description: 'The HTTP status code of the response, 200, for a success.'
  }),

  TooManyRequests: zodd.number().openapi({
    example: 429,
    description: 'The HTTP status code of the response, 429, for a too many requests error.'
  }),

  FailedDependency: zodd.number().openapi({
    example: 424,
    description: 'The HTTP status code of the response, 424, for a failed dependency error.'
  }),

  PaymentRequired: zodd.number().openapi({
    example: 402,
    description: 'The HTTP status code of the response, 402, for a payment required error.'
  })
}

export const CorrelationIdSchema = zodd.string().openapi({
  example: '9700dc7bf91ff12abe91f71b6381627b41643cb959a5be5d35eb35ad3b02b5a8',
  description: 'The correlation ID of the request.'
})

/**
 * Represents the general response body for an error response.
 */
export const ErrorResponseBody = zodd.object({
  timestamp: APIDateTimeSchema,
  status: zodd.number(),
  error: zodd.string(),
  message: zodd.string(),
  path: zodd.string(),
  details: zodd.array(
    zodd.object({
      field: zodd.string(),
      issue: zodd.string(),
      description: zodd.string()
    })
  ),
  correlationId: zodd.string(),
  userFriendlyMessage: zodd.string()
})

export const ValidationErrorResponseBody = zodd.object({
  timestamp: APIDateTimeSchema,
  status: StatusSchema.BadRequest,
  error: zodd.string().openapi({
    example: 'Bad Request',
    description: 'The error code or name.'
  }),
  message: zodd.string().openapi({
    example: 'Invalid Input Data',
    description: 'The error message.'
  }),
  path: zodd.string().openapi({
    example: '/api/v1/user/auth/sign-up',
    description: 'The path of the request.'
  }),
  details: zodd.array(
    zodd
      .object({
        field: zodd.string().openapi({
          example: 'firstName',
          description: 'The field that caused the validation error.'
        }),
        issue: zodd.string().openapi({
          example: 'too_small',
          description: 'The issue that caused the validation error.'
        }),
        description: zodd.string().openapi({
          example: 'The firstName must contain at least 3 character(s)',
          description: 'The description of the validation error.'
        })
      })
      .openapi({ description: 'The details of the validation error.' })
  ),
  correlationId: zodd.string().openapi({
    example: '9700dc7bf91ff12abe91f71b6381627b41643cb959a5be5d35eb35ad3b02b5a8',
    description: 'The correlation ID of the request.'
  }),
  userFriendlyMessage: zodd.string().openapi({
    example: 'Please fill out the required fields correctly.',
    description: 'The user-friendly message of the validation error.'
  })
})
