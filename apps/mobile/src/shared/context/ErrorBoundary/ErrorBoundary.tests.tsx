import React from 'react'

import { Text } from 'react-native'

import { act, fireEvent, render } from '@testing-library/react-native'

import ErrorBoundary from './ErrorBoundary.class'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key
  })
}))

const ThrowError = () => {
  throw new Error('Test render error')
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders children when no error is thrown', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <Text>Safe content</Text>
      </ErrorBoundary>
    )

    expect(getByText('Safe content')).toBeTruthy()
  })

  it('shows fallback UI when a child throws during render', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    expect(getByText('errorBoundary.title')).toBeTruthy()
    expect(getByText('errorBoundary.message')).toBeTruthy()
    expect(getByText('errorBoundary.retry')).toBeTruthy()
  })

  it('calls onReset when retry is pressed', () => {
    const onReset = jest.fn()

    const { getByText } = render(
      <ErrorBoundary onReset={onReset}>
        <ThrowError />
      </ErrorBoundary>
    )

    act(() => {
      fireEvent.press(getByText('errorBoundary.retry'))
    })

    expect(onReset).toHaveBeenCalledTimes(1)
  })
})
