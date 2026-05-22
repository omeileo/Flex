import { popupModal } from '../../subjects/popupModal'
import { snackbar } from '../../subjects/snackbar'
import { ApiErrorResponse } from '../../types/api.types'
import { setAuthenticationStatus } from '../Auth/auth.functions'
import { sentenceCase } from '../String/string.functions'

/**
 * Handles API errors and dispatches a snackbar/modal via the corresponding subject.
 *
 * @param error - The error object.
 * @param onError - Optional callback after the error is handled.
 * @param hideSnackbar - Suppress snackbar/modal display.
 * @param modalContent - If provided, prefer modal over snackbar.
 */
export const handleApiError = (
  error: ApiErrorResponse,
  onError?: (data?: ApiErrorResponse) => void,
  hideSnackbar?: boolean,
  modalContent?: { title?: string; body?: string; icon?: 'warning' | 'error' | 'info' | 'success' }
): void => {
  const errorMessage = error?.userFriendlyMessage || 'An error occurred processing your request. Please try again.'

  if (
    error?.status === 401 &&
    (error?.message?.includes('Token is required') || error?.message?.includes('Invalid or expired token'))
  ) {
    setAuthenticationStatus(false)

    if (!hideSnackbar) {
      const message = 'Your session has expired. Please login again.'

      if (modalContent) {
        popupModal.next({
          title: modalContent.title || 'Session Expired',
          body: modalContent.body || message,
          icon: modalContent.icon || 'warning'
        })
      } else {
        snackbar.next({ message, severity: 'warning' })
      }
    }
  } else if (!hideSnackbar) {
    if (modalContent) {
      popupModal.next({
        title: sentenceCase(modalContent.title || 'Request Failed'),
        body: modalContent.body || errorMessage,
        icon: modalContent.icon || 'error'
      })
    } else {
      snackbar.next({ message: errorMessage, severity: 'error' })
    }
  }

  onError && onError(error)
}

export const isErrorCode = (error: unknown, ...codes: number[]): boolean =>
  codes.includes((error as ApiErrorResponse).status)

export const handleDefaultError = (error: unknown) => {
  errorHandler.handleApiError(error as ApiErrorResponse)
}

export const getIssuesFromError = (error: ApiErrorResponse): string[] | undefined => {
  if (!error.details?.length) return undefined

  const issues: string[] = []

  for (const detail of error.details) {
    if (detail.issue && typeof detail.issue === 'string') {
      issues.push(detail.issue)
    }
  }

  return issues.length ? issues : undefined
}

const errorHandler = {
  handleDefaultError,
  handleApiError,
  isErrorCode
}

export default errorHandler
