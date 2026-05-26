import React from 'react'

import { renderWithTheme } from '@shared/functions/TestRender/renderWithTheme'

import ForgetPasswordComponent from './ForgetPassword.component'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key
  })
}))

const defaultProps = {
  isSubmitting: false,
  error: null,
  successMessage: null,
  defaultEmail: '',
  onSubmit: jest.fn(),
  onLoginPress: jest.fn()
}

describe('ForgetPasswordComponent', () => {
  it('renders reset password auth shell', () => {
    const { getByTestId } = renderWithTheme(<ForgetPasswordComponent {...defaultProps} />)

    expect(getByTestId('forget-password-screen')).toBeTruthy()
    expect(getByTestId('forget-password-title')).toHaveTextContent('auth.forgetPassword.title')
  })
})
