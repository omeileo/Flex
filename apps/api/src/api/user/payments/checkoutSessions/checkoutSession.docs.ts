import { Roles } from '@/shared/enums/roles.enum'
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { StatusCodes } from 'http-status-codes'

import { createApiResponses, withJWTMiddleware } from '../../../../__openApiDocs__/functions/openAPI.functions'
import { ValidationErrorResponseBody } from '../../../../shared/functions/http/response/errorResponse.model'
import { zodd } from '../../../../shared/functions/zod.functions'
import { checkoutSessionErrors } from './checkoutSession.dictionary'
import { checkoutSessionRoutes } from './checkoutSession.routes'

/**
 * Represents the Open API registry docs for the Checkout Session functionality.
 */
export const checkoutSessionRegistry = new OpenAPIRegistry()

checkoutSessionRegistry.registerPath({
  method: 'post',
  path: checkoutSessionRoutes.CREATE.openApiFullPath,
  tags: ['Checkout Session'],
  ...withJWTMiddleware(),
  parameters: [
    {
      in: 'header',
      name: 'X-User-Role',
      schema: {
        type: 'string',
        enum: Object.values(Roles),
        default: Roles.User
      },
      required: true,
      description: 'The role of the user making the request'
    }
  ],
  request: {
    body: {
      description: 'Checkout Session Request Body',
      required: false,
      content: {
        'application/json': {
          schema: zodd.object({})
        }
      }
    }
  },
  responses: createApiResponses([
    {
      result: zodd.object({
        url: zodd.string().openapi({
          example: 'https://localhost:3000/cart/success?session_id=347473737373'
        })
      }),
      description: 'Successfully Created Checkout Session.',
      statusCode: StatusCodes.OK
    },
    {
      result: ValidationErrorResponseBody,
      description: 'Invalid Checkout Session request. Validation Error.',
      statusCode: StatusCodes.BAD_REQUEST
    },
    {
      result: checkoutSessionErrors.maximumCheckoutSessionsReached.schema,
      description: 'Maximum number of Checkout Sessions reached.',
      statusCode: StatusCodes.UNPROCESSABLE_ENTITY
    }
  ])
})
