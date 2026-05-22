import { UpdatePersonalInfoRequestBody, UpdatePersonalInfoResponseBody } from './personalInfo.model'

/**
 * Represents the request body for updating user Personal Info.
 */
export type UpdatePersonalInfoRequest = Zod.infer<typeof UpdatePersonalInfoRequestBody>

/**
 * Represents the response object returned by the Update Personal Info API.
 */
export type UpdatePersonalInfoResponse = Zod.infer<typeof UpdatePersonalInfoResponseBody>
