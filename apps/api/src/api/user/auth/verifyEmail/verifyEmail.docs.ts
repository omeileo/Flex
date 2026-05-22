import { globalErrors } from '@/shared/dictionary/errors.dictionary'
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { StatusCodes } from 'http-status-codes'

import { createApiResponses } from '../../../../__openApiDocs__/functions/openAPI.functions'
import { zodd } from '../../../../shared/functions/zod.functions'
import { verifyEmailErrors } from './verifyEmail.dictionary'
import { VerifyEmailRequestBody, VerifyEmailResendRequestBody, VerifyEmailResponseBody } from './verifyEmail.model'
import { VerifyEmailRoutes } from './verifyEmail.routes'

/**
 * Represents the registry for verifying email in the Hourrier API.
 */
export const verifyEmailRegistry = new OpenAPIRegistry()

verifyEmailRegistry.registerPath({
  method: 'post',
  path: VerifyEmailRoutes.VERIFY.openApiFullPath,
  tags: ['Auth'],
  request: {
    body: {
      description: 'Verify Email Request Body',
      required: true,
      content: {
        'application/json': {
          schema: VerifyEmailRequestBody
        }
      }
    }
  },
  responses: createApiResponses([
    {
      result: VerifyEmailResponseBody,
      description: 'Successfully verified email.',
      statusCode: StatusCodes.OK
    },
    {
      result: verifyEmailErrors.tokenExpiredOrInvalid.schema,
      description: 'Token Invalid or Expired',
      statusCode: StatusCodes.UNAUTHORIZED
    },
    {
      result: verifyEmailErrors.userAlreadyVerified.schema,
      description: 'User Status not not Unverified or User Already Verified',
      statusCode: StatusCodes.FORBIDDEN
    },
    {
      result: globalErrors.criticalSystemEntryNotFound.schema,
      description: 'Database not seeded properly with user statuses and status types.',
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR
    },
    {
      result: globalErrors.entityNotUpdated.schema,
      description: 'Could not update user status to verified.',
      statusCode: StatusCodes.NOT_MODIFIED
    }
  ])
})

verifyEmailRegistry.registerPath({
  method: 'post',
  path: VerifyEmailRoutes.VERIFY_RESEND.openApiFullPath,
  tags: ['Auth'],
  request: {
    body: {
      description: 'Resed Email Verification Request Body',
      required: true,
      content: {
        'application/json': {
          schema: VerifyEmailResendRequestBody
        }
      }
    }
  },
  responses: createApiResponses([
    {
      result: zodd.object({}),
      description: 'Successfully resent email verification link.',
      statusCode: StatusCodes.OK
    },
    {
      result: verifyEmailErrors.tokenExpiredOrInvalid.schema,
      description: 'Token Invalid or Expired',
      statusCode: StatusCodes.UNAUTHORIZED
    },
    {
      result: globalErrors.entityNotFound.schema,
      description: 'User Not found in the system.',
      statusCode: StatusCodes.NOT_FOUND
    },
    {
      result: verifyEmailErrors.userAlreadyVerified.schema,
      description: 'User Status not not Unverified or User Already Verified',
      statusCode: StatusCodes.FORBIDDEN
    },
    {
      result: globalErrors.criticalSystemEntryNotFound.schema,
      description: 'Database not seeded properly with user statuses and status types.',
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR
    }
  ])
})
