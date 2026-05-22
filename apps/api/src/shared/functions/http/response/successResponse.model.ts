import { zodd } from '../../zod.functions'

/**
 * Represents the response body for a successful HTTP response.
 *
 * @template T - The type of the data in the response body.
 * @param {T} dataSchema - The schema for the data in the response body.
 * @returns {object} - The success response body object.
 */

const APIDateTimeSchema = zodd.string()

export const SuccessResponseBody = <T extends Zod.ZodTypeAny>(dataSchema: T) =>
  zodd.object({
    timestamp: APIDateTimeSchema,
    status: zodd.number().openapi({ description: 'Success HTTP status code', example: 200 }),
    message: zodd.string().openapi({
      description: 'Short description of the success',
      example: 'Operation Succcessful'
    }),
    data: dataSchema,
    correlationId: zodd.string().openapi({
      description: 'Unique identifier for tracking and troubleshooting',
      example: '863efa07045c050ff417dfb3b702e9145e36de6ee85996d7ddf8a61c6cdca96e'
    }),
    userFriendlyMessage: zodd.string().openapi({
      description: 'Simplified message for end users',
      example: 'Great!, Operation was Succcessful'
    })
  })
