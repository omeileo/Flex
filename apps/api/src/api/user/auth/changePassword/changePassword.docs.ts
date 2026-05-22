import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { StatusCodes } from 'http-status-codes'

import { createApiResponses, withJWTMiddleware } from '../../../../__openApiDocs__/functions/openAPI.functions'
import { changePasswordErrors } from './changePassword.dictionary'
import { ChangePasswordRequestBody, ChangePasswordResponseBody } from './changePassword.model'
import { ChangePasswordRoutes } from './changePassword.routes'

/**
 * Represents the Open API registry docs for the change password functionality.
 */
export const changePasswordRegistry = new OpenAPIRegistry()

changePasswordRegistry.registerPath({
  method: 'post',
  path: ChangePasswordRoutes.CHANGE_PASSWORD.openApiFullPath,
  tags: ['Auth'],
  ...withJWTMiddleware(),
  request: {
    body: {
      description: 'ChangePassword Request Body',
      required: true,
      content: {
        'application/json': {
          schema: ChangePasswordRequestBody
        }
      }
    }
  },
  responses: createApiResponses([
    {
      result: ChangePasswordResponseBody,
      description: 'Succesfully changed user password.',
      statusCode: StatusCodes.OK
    },
    {
      result: changePasswordErrors.missingRequiredFields.schema,
      description: 'Invalid ChangePassword request. Validation Error.',
      statusCode: StatusCodes.BAD_REQUEST
    },
    {
      result: changePasswordErrors.forbiddenActionAttempt.schema,
      description: 'User is not allowed to change password. Forbidden.',
      statusCode: StatusCodes.FORBIDDEN
    },
    {
      result: changePasswordErrors.passwordMismatch.schema,
      description: 'New password and confirm password do not match. Unprocessable Entity.',
      statusCode: StatusCodes.UNPROCESSABLE_ENTITY
    },
    {
      result: changePasswordErrors.passwordSameAsOld.schema,
      description: 'New password is the same as the old password',
      statusCode: StatusCodes.CONFLICT
    }
  ])
})
