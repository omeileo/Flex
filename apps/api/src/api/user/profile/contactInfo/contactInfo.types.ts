import { UpdateContactInfoRequestBody, UpdateContactInfoResponseBody } from './contactInfo.model'

/**
 * Represents the request body for updating user Contact Info.
 */
export type UpdateContactInfoRequest = Zod.infer<typeof UpdateContactInfoRequestBody>

/**
 * Represents the response object returned by the Update Contact Info API.
 */
export type UpdateContactInfoResponse = Zod.infer<typeof UpdateContactInfoResponseBody>
