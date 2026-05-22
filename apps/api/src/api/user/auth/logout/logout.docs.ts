import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { StatusCodes } from 'http-status-codes'

import { createApiResponses, withJWTMiddleware } from '../../../../__openApiDocs__/functions/openAPI.functions'
import { logoutErrors } from './logout.dictionary'
import { LogoutRequestBody, LogoutResponseBody } from './logout.model'
import { LogoutRoutes } from './logout.routes'

/**
 * Represents the Open API registry docs for the sign-up functionality.
 */
export const logoutRegistry = new OpenAPIRegistry()

logoutRegistry.registerPath({
  method: 'post',
  path: LogoutRoutes.LOGOUT.openApiFullPath,
  tags: ['Auth'],
  ...withJWTMiddleware(),
  request: {
    body: {
      description: 'Logout Request Body',
      required: true,
      content: {
        'application/json': {
          schema: LogoutRequestBody
        }
      }
    }
  },
  responses: createApiResponses([
    {
      result: LogoutResponseBody,
      description: 'Succesfully logged out user.',
      statusCode: StatusCodes.OK
    },
    // {
    //   result: ValidationErrorResponseBody,
    //   description: 'Logout Request Validation Error',
    //   statusCode: StatusCodes.BAD_REQUEST
    // },
    {
      result: logoutErrors.missingToken.schema,
      description: 'Invalid Logout request. Token is required.',
      statusCode: StatusCodes.BAD_REQUEST
    },
    {
      result: logoutErrors.invalidToken.schema,
      description: 'Invalid/Expired token provided. Please provide a valid token to logout.',
      statusCode: StatusCodes.FORBIDDEN
    }
    // {
    //   result: globalErrors.criticalSystemEntryNotFound.schema,
    //   description:
    //     'Database not seeded properly with user statuses and status types or preferences.',
    //   statusCode: StatusCodes.INTERNAL_SERVER_ERROR
    // },
    // {
    //   result: globalErrors.entityNotCreated.schema,
    //   description:
    //     'Could Create Tail Log.',
    //   statusCode: StatusCodes.UNPROCESSABLE_ENTITY
    // }
    // {
    //   result: globalErrors.entityNotFound.schema,
    //   description: 'Internal Error',
    //   statusCode: StatusCodes.NOT_FOUND
    // },
    // {
    //   result: globalErrors.entityNotUpdated.schema,
    //   description: 'Internal Error',
    //   statusCode: StatusCodes.NOT_MODIFIED
    // }
  ])
})
