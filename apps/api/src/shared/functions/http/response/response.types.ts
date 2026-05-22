import { APIDateTime } from '../../date.functions'

/**
 * Represents a success response from an API.
 * @template T - The type of the data in the response.
 */
export interface SuccessResponse<T> {
  timestamp: APIDateTime
  status: number
  message: string
  data: T
  correlationId: string
  userFriendlyMessage: string
}

/**
 * Represents an error response returned by the API.
 */
export interface ErrorResponse {
  timestamp: APIDateTime
  status: number
  error: string
  message: string
  path: string
  details: {
    field: string
    issue: string
    description: string
  }[]
  correlationId: string
  userFriendlyMessage: string
}

/**
 * Represents a quick error response thrown by a service function.
 */
export interface QuickErrorResponse {
  timestamp: APIDateTime
  status: number
  error: string
  message: string
  details: {
    field: string
    issue: string
    description: string
  }[]
  correlationId: string
  userFriendlyMessage: string
}
