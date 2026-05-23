import type { ErrorInfo, ReactNode } from 'react'

export type ErrorBoundaryProps = {
  children: ReactNode
  onReset?: () => void
}

export type ErrorBoundaryState = {
  hasError: boolean
  error: Error | null
}

export type ErrorBoundaryCatchInfo = {
  error: Error
  errorInfo: ErrorInfo
}
