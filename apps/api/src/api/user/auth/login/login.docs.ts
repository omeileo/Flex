import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { StatusCodes } from 'http-status-codes'

import { createApiResponses } from '../../../../__openApiDocs__/functions/openAPI.functions'
import { ValidationErrorResponseBody } from '../../../../shared/functions/http/response/errorResponse.model'
import { loginErrors } from './login.dictionary'
import { LoginRequestBody, LoginResponseBody } from './login.model'
import { LoginRoutes } from './login.routes'

/**
 * Represents the Open API registry docs for the login functionality.
 */
export const loginRegistry = new OpenAPIRegistry()

loginRegistry.registerPath({
  method: 'post',
  path: LoginRoutes.LOGIN.openApiFullPath,
  tags: ['Auth'],
  request: {
    body: {
      description: 'Login Request Body',
      required: true,
      content: {
        'application/json': {
          schema: LoginRequestBody
        }
      }
    }
  },
  responses: createApiResponses([
    {
      result: LoginResponseBody,
      description: 'Succesfully logged in user.',
      statusCode: StatusCodes.OK
    },
    {
      result: ValidationErrorResponseBody,
      description: 'Login Request Validation Error',
      statusCode: StatusCodes.BAD_REQUEST
    },
    {
      result: loginErrors.unauthorized.schema,
      description: 'Invalid username or password.',
      statusCode: StatusCodes.UNAUTHORIZED
    },
    {
      result: loginErrors.forbiddenLoginAttempt.schema,
      description: 'Restricted Account. (locked, disabled, or the soft_deleted state',
      statusCode: StatusCodes.FORBIDDEN
    }
  ])
})
