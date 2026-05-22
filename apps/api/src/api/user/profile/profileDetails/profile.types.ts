import { ProfileResponseBody } from './profile.model'

/**
 * Represents the response object returned by the Get Profile API.
 */
export type ProfileResponse = Zod.infer<typeof ProfileResponseBody>
