import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { StatusCodes } from 'http-status-codes'

import { createApiResponses, withJWTMiddleware } from '../../../../__openApiDocs__/functions/openAPI.functions'
import { contactInfoErrors } from './contactInfo.dictionary'
import { UpdateContactInfoRequestBody, UpdateContactInfoResponseBody } from './contactInfo.model'
import { ContactInfoRoutes } from './contactInfo.routes'

/**
 * Represents the Open API registry docs for the personal info functionality.
 */
export const contactInfoRegistry = new OpenAPIRegistry()

contactInfoRegistry.registerPath({
  method: 'put',
  path: ContactInfoRoutes.UPDATE.openApiFullPath,
  tags: ['Profile - Contact Info'],
  ...withJWTMiddleware(),
  request: {
    body: {
      description: 'ContactInfo Request Body',
      required: true,
      content: {
        'application/json': {
          schema: UpdateContactInfoRequestBody
        }
      }
    }
  },
  responses: createApiResponses([
    {
      result: UpdateContactInfoResponseBody,
      description: 'Succesfully updated user contact info.',
      statusCode: StatusCodes.OK
    },
    {
      result: contactInfoErrors.invalidMobileNumberFormat.schema,
      description: 'Invalid Contact Info request. Validation Error.',
      statusCode: StatusCodes.BAD_REQUEST
    }
  ])
})
