import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { StatusCodes } from 'http-status-codes'

import { createApiResponses, withJWTMiddleware } from '../../../../__openApiDocs__/functions/openAPI.functions'
import { personalInfoErrors } from './personalInfo.dictionary'
import { UpdatePersonalInfoRequestBody, UpdatePersonalInfoResponseBody } from './personalInfo.model'
import { PersonalInfoRoutes } from './personalInfo.routes'

/**
 * Represents the Open API registry docs for the personal info functionality.
 */
export const personalInfoRegistry = new OpenAPIRegistry()

personalInfoRegistry.registerPath({
  method: 'put',
  path: PersonalInfoRoutes.UPDATE.openApiFullPath,
  tags: ['Profile - Personal Info'],
  ...withJWTMiddleware(),
  request: {
    body: {
      description: 'PersonalInfo Request Body',
      required: true,
      content: {
        'application/json': {
          schema: UpdatePersonalInfoRequestBody
        }
      }
    }
  },
  responses: createApiResponses([
    {
      result: UpdatePersonalInfoResponseBody,
      description: 'Succesfully updated user personal info.',
      statusCode: StatusCodes.OK
    },
    {
      result: personalInfoErrors.invalidDobFormat.schema,
      description: 'Invalid PersonalInfo request. Validation Error.',
      statusCode: StatusCodes.BAD_REQUEST
    }
  ])
})
