import { globalErrors } from '@/shared/dictionary/errors.dictionary'
import { ValidationErrorResponseBody } from '@/shared/functions/http/response/errorResponse.model'
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { StatusCodes } from 'http-status-codes'

import { createApiResponses } from '../../../../__openApiDocs__/functions/openAPI.functions'
import { signupErrors } from './signUp.dictionary'
import { SignupRequestBody, SignupResponseBody } from './signUp.model'
import { SignUpRoutes } from './signUp.routes'

/**
 * Represents the Open API registry docs for the sign-up functionality.
 */
export const signUpRegistry = new OpenAPIRegistry()

signUpRegistry.registerPath({
  method: 'post',
  path: SignUpRoutes.Register.openApiFullPath,
  tags: ['Auth'],
  request: {
    body: {
      description: 'Sign Up Request Body',
      required: true,
      content: {
        'application/json': {
          schema: SignupRequestBody
        }
      }
    }
  },
  responses: createApiResponses([
    {
      result: SignupResponseBody,
      description: 'Succesfully signed up user.',
      statusCode: StatusCodes.CREATED
    },
    {
      result: ValidationErrorResponseBody,
      description: 'Sign Up Request Validation Error',
      statusCode: StatusCodes.BAD_REQUEST
    },
    {
      result: signupErrors.duplicateEmail.schema,
      description: 'Email Already is use.',
      statusCode: StatusCodes.CONFLICT
    },
    {
      result: globalErrors.criticalSystemEntryNotFound.schema,
      description: 'Database not seeded properly with user statuses and status types or preferences.',
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR
    },
    {
      result: globalErrors.entityNotCreated.schema,
      description: 'Could not create user, user profile or email verification token.',
      statusCode: StatusCodes.UNPROCESSABLE_ENTITY
    }
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
