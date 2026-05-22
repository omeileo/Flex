import { ApiErrorResponse } from '../../types/api.types'

/**
 * Serializes an error object for Redux to avoid non-serializable value warnings.
 * Extracts only the serializable parts of an error (timestamp, status, message, etc).
 */
export const serializeError = (error: unknown): ApiErrorResponse => {
  const apiErrorResponse = error as ApiErrorResponse

  return {
    timestamp: apiErrorResponse?.timestamp,
    status: apiErrorResponse?.status,
    error: apiErrorResponse?.error,
    message: apiErrorResponse?.message,
    path: apiErrorResponse?.path,
    details: apiErrorResponse?.details,
    correlationId: apiErrorResponse?.correlationId,
    userFriendlyMessage: apiErrorResponse?.userFriendlyMessage
  }
}
