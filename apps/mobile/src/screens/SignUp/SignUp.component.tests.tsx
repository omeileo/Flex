import React from 'react'

import { renderWithTheme } from '@shared/functions/TestRender/renderWithTheme'

import SignUpComponent from './SignUp.component'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key
  })
}))

const defaultProps = {
  isSubmitting: false,
  error: null,
  successMessage: null,
  onSubmit: jest.fn(),
  onLoginPress: jest.fn()
}

describe('SignUpComponent', () => {
  it('renders branded auth shell and signup form', () => {
    const { getByTestId } = renderWithTheme(<SignUpComponent {...defaultProps} />)

    expect(getByTestId('signup-screen')).toBeTruthy()
    expect(getByTestId('signup-title')).toHaveTextContent('auth.signUp.title')
  })
})
