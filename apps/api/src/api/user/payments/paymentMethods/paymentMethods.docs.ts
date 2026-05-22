import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { StatusCodes } from 'http-status-codes'

import {
  ParamsFrom,
  createApiResponses,
  withJWTMiddleware
} from '../../../../__openApiDocs__/functions/openAPI.functions'
import { globalErrors } from '../../../../shared/dictionary/errors.dictionary'
import { ValidationErrorResponseBody } from '../../../../shared/functions/http/response/errorResponse.model'
import { paymentMethodQueryParam, paymentMethodRequestBody } from './paymentMethods.model'
import { paymentMethodsRoutes } from './paymentMethods.routes'

/**
 * Represents the Open API registry docs for the Payment Methods functionality.
 */
export const paymentMethodsRegistry = new OpenAPIRegistry()

paymentMethodsRegistry.registerPath({
  method: 'put',
  path: paymentMethodsRoutes.LOG_UPDATE.openApiFullPath,
  tags: ['Payment Methods'],
  ...withJWTMiddleware(),
  request: {
    query: ParamsFrom(paymentMethodQueryParam),
    body: {
      description: 'Update Payment Methods Request Body',
      required: true,
      content: {
        'application/json': {
          schema: paymentMethodRequestBody
        }
      }
    }
  },
  responses: createApiResponses([
    {
      result: paymentMethodRequestBody,
      description: 'Successfully Updated Payment Methods.',
      statusCode: StatusCodes.OK
    },
    {
      result: ValidationErrorResponseBody,
      description: 'Invalid Payment Methods request. Validation Error.',
      statusCode: StatusCodes.BAD_REQUEST
    },
    {
      result: globalErrors.entityNotFound.schema,
      description: 'Payment Methods not found.',
      statusCode: StatusCodes.NOT_FOUND
    }
  ])
})
