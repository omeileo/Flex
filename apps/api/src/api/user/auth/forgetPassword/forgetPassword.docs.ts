import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { StatusCodes } from 'http-status-codes'

import { createApiResponses } from '../../../../__openApiDocs__/functions/openAPI.functions'
import { ValidationErrorResponseBody } from '../../../../shared/functions/http/response/errorResponse.model'
import { changePasswordErrors } from '../changePassword/changePassword.dictionary'
import { forgetPasswordErrors } from './forgetPassword.dictionary'
import {
  ForgetPasswordRequestBody,
  ForgetPasswordResponseBody,
  ResetPasswordRequestBody,
  ResetPasswordResponseBody
} from './forgetPassword.model'
import { ForgetPasswordRoutes } from './forgetPassword.routes'

/**
 * Represents the Open API registry docs for the forget password functionality.
 */
export const forgetPasswordRegistry = new OpenAPIRegistry()

forgetPasswordRegistry.registerPath({
  method: 'post',
  path: ForgetPasswordRoutes.Send_Reset_Email.openApiFullPath,
  tags: ['Auth'],
  request: {
    body: {
      description: 'Forget Password Request Body',
      required: true,
      content: {
        'application/json': {
          schema: ForgetPasswordRequestBody
        }
      }
    }
  },
  responses: createApiResponses([
    {
      result: ForgetPasswordResponseBody,
      description: 'Succesfully send reset link to user.',
      statusCode: StatusCodes.OK
    },
    {
      result: forgetPasswordErrors.badRequestInvalidDataFormat.schema,
      description: 'Forget Password Validation Error - Missing or invalid email.',
      statusCode: StatusCodes.BAD_REQUEST
    },
    {
      result: forgetPasswordErrors.forbiddenActionAttempt.schema,
      description: 'Disabled or restricted account disallowed from reseting password.',
      statusCode: StatusCodes.FORBIDDEN
    },
    {
      result: forgetPasswordErrors.emailNotFound.schema,
      description: 'User email not found in the system.',
      statusCode: StatusCodes.NOT_FOUND
    }
  ])
})

forgetPasswordRegistry.registerPath({
  method: 'post',
  path: ForgetPasswordRoutes.Reset_Password.openApiFullPath,
  tags: ['Auth'],
  request: {
    body: {
      description: 'Reset Password Request Body',
      required: true,
      content: {
        'application/json': {
          schema: ResetPasswordRequestBody
        }
      }
    }
  },
  responses: createApiResponses([
    {
      result: ResetPasswordResponseBody,
      description: 'Succesfully send reset link to user.',
      statusCode: StatusCodes.OK
    },
    {
      result: ValidationErrorResponseBody,
      description: 'Validation Error - Missing or invalid password or token.',
      statusCode: StatusCodes.BAD_REQUEST
    },
    {
      result: changePasswordErrors.passwordSameAsOld.schema,
      description: 'New password is the same as the old password',
      statusCode: StatusCodes.CONFLICT
    },
    {
      result: forgetPasswordErrors.forbiddenActionAttempt.schema,
      description: 'Disabled or restricted account disallowed from reseting password.',
      statusCode: StatusCodes.FORBIDDEN
    },
    {
      result: forgetPasswordErrors.forbiddenResetAttempt.schema,
      description: 'Password reset token is invalid or expired.',
      statusCode: StatusCodes.FORBIDDEN
    },
    {
      result: forgetPasswordErrors.emailNotFound.schema,
      description: 'User email not found in the system.',
      statusCode: StatusCodes.NOT_FOUND
    }
  ])
})
