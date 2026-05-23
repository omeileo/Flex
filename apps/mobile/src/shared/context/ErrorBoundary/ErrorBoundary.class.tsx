import React, { Component } from 'react'

import { logError } from '@shared/functions/Logger/logger.functions'

import ErrorFallback from './ErrorFallback.component'

import { ErrorBoundaryProps, ErrorBoundaryState } from './ErrorBoundary.types'

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logError(error, error.message, 'ErrorBoundary.componentDidCatch', {
      componentStack: errorInfo.componentStack ?? ''
    })
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null
    })

    this.props.onReset?.()
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback onRetry={this.handleReset} />
    }

    return this.props.children
  }
}

export default ErrorBoundary
