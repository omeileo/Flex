import {
  APIDateTimeSchema,
  CorrelationIdSchema,
  StatusSchema
} from '../../../../shared/functions/http/response/errorResponse.model'
import { zodd } from '../../../../shared/functions/zod.functions'

/**
 * Dictionary of personalInfo errors.
 */
export const personalInfoErrors = {
  invalidDobFormat: {
    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.BadRequest,
      error: zodd.string().openapi({ example: 'Bad Request' }),
      message: zodd.string().openapi({
        example: 'Invalid Input Data',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/profile/personal-info/update',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'dateOfBirth',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'dateOfBirth must be in YYYY-MM-DD format',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'invalid_string',
            description: 'The issue or error type'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'Please fill out the required fields correctly.',
        description: 'User-friendly error message'
      })
    })
  }
}
