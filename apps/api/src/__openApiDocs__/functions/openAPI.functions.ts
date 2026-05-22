import { Roles } from '@/shared/enums/roles.enum'
import { ResponseConfig } from '@asteasolutions/zod-to-openapi'
import { StatusCodes } from 'http-status-codes'

import { zodd } from '../../shared/functions/zod.functions'
import { SuccessResponseBody } from './../../shared/functions/http/response/successResponse.model'

interface ApiResponseConfig {
  result: Zod.ZodTypeAny
  description: string
  statusCode: number
}

/**
 * Creates API responses based on the provided configuration.
 *
 * @param configs - An array of ApiResponseConfig objects containing the response configurations.
 * @returns An object containing the API responses.
 */
export function createApiResponses(configs: ApiResponseConfig[]) {
  const responses: { [key: string]: ResponseConfig } = {}
  configs.forEach(({ result, description, statusCode }) => {
    responses[statusCode] = {
      description,
      content: {
        'application/json': {
          schema: statusCode <= 201 ? SuccessResponseBody(result) : result
        }
      }
    }
  })

  return responses
}

export function errorStatusCodes(
  configs: Array<{
    schema: Zod.ZodTypeAny
    description: string
    statusCode: StatusCodes
  }>
) {
  const statusCodeCounts: { [key: number]: number } = {}

  return configs.map(({ schema, description, statusCode }) => {
    const count = (statusCodeCounts[statusCode] = (statusCodeCounts[statusCode] || 0) + 1)
    const formattedStatusCode = count > 1 ? `${statusCode}(${count})` : `${statusCode}`

    return {
      result: schema,
      description,
      statusCode: formattedStatusCode as unknown as StatusCodes
    }
  })
}

export function withJWTMiddleware() {
  return {
    security: [{ CookieAuth: [] }]
  }
}

export function withUserRoleMiddleware(defaultRole: Roles) {
  return {
    parameters: [
      {
        in: 'header',
        name: 'X-User-Role',
        schema: {
          type: 'string',
          enum: Object.values(Roles),
          default: defaultRole
        },
        required: true,
        description: 'The role of the user making the request'
      }
    ]
  }
}

const errorDetailsSchema = zodd
  .object({
    field: zodd.string().openapi({
      description: 'The field related to the error'
    }),
    issue: zodd.string().openapi({ description: 'The issue or error type' }),
    description: zodd.string().openapi({
      description: 'Detailed description of the error'
    })
  })
  .openapi({ description: 'Schema for error details' })

/**
 * Represents the global API error template.
 */
export const GlobalApiErrorTemplate = zodd.object({
  /**
   * The time when the error occurred.
   */
  timestamp: zodd.string().openapi({
    description: 'The time when the error occurred'
  }),

  /**
   * HTTP status code.
   */
  status: zodd.number().openapi({ description: 'HTTP status code' }),

  /**
   * Short description of the error.
   */
  error: zodd.string().openapi({
    description: 'Short description of the error'
  }),

  /**
   * Detailed message explaining the error.
   */
  message: zodd.string().openapi({
    description: 'Detailed message explaining the error'
  }),

  /**
   * The endpoint where the error occurred.
   */
  path: zodd.string().openapi({
    description: 'The endpoint where the error occurred'
  }),

  /**
   * Optional array providing additional context or validation errors.
   */
  details: zodd.array(errorDetailsSchema).optional().openapi({
    description: 'Optional array providing additional context or validation errors'
  }),

  /**
   * Unique identifier for tracking and troubleshooting.
   */
  correlationId: zodd.string().openapi({
    description: 'Unique identifier for tracking and troubleshooting'
  }),

  /**
   * Simplified message for end users.
   */
  userFriendlyMessage: zodd.string().openapi({
    description: 'Simplified message for end users'
  })
})

export const ParamsFrom = function <T extends Zod.ZodTypeAny>(params: T) {
  return zodd.object({
    params: params as T
  }).shape.params
}
