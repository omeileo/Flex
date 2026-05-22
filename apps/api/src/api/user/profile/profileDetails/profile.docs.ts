import { zodd } from '@/shared/functions/zod.functions'
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { StatusCodes } from 'http-status-codes'

import {
  ParamsFrom,
  createApiResponses,
  withJWTMiddleware
} from '../../../../__openApiDocs__/functions/openAPI.functions'
import { globalErrors } from '../../../../shared/dictionary/errors.dictionary'
import { GetUserProfileQueryParams, ProfileResponseBody, UpdateUserFirebaseUserIdRequestBody } from './profile.model'
import { ProfileRoutes } from './profile.routes'

/**
 * Represents the Open API registry docs for the get profile functionality.
 */
export const profileRegistry = new OpenAPIRegistry()

profileRegistry.registerPath({
  method: 'get',
  path: ProfileRoutes.GET.openApiFullPath,
  tags: ['Profile'],
  ...withJWTMiddleware(),
  request: {
    query: ParamsFrom(GetUserProfileQueryParams)
  },
  responses: createApiResponses([
    {
      result: ProfileResponseBody,
      description: 'Succesfully changed user password.',
      statusCode: StatusCodes.OK
    },
    {
      result: globalErrors.entityNotFound.schema,
      description: 'Could not find profile for user.',
      statusCode: StatusCodes.BAD_REQUEST
    }
  ])
})

profileRegistry.registerPath({
  method: 'post',
  path: ProfileRoutes.UPDATE_FIREBASE_USER_ID.openApiFullPath,
  tags: ['Profile'],
  ...withJWTMiddleware(),
  request: {
    body: {
      description: 'UpdateUserFirebaseUserIdRequestBody',
      required: true,
      content: {
        'application/json': {
          schema: UpdateUserFirebaseUserIdRequestBody
        }
      }
    }
  },
  responses: createApiResponses([
    {
      result: zodd.object({}),
      description: 'Succesfully updated user Firebase user ID.',
      statusCode: StatusCodes.OK
    },
    {
      result: globalErrors.entityNotFound.schema,
      description: 'Could not find profile for user.',
      statusCode: StatusCodes.BAD_REQUEST
    }
  ])
})
