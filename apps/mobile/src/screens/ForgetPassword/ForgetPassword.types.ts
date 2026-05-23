export interface ForgetPasswordFormValues {
  email: string
}

export interface ForgetPasswordRouteParams {
  email?: string
}

export interface ForgetPasswordComponentProps {
  isSubmitting: boolean
  error: string | null
  successMessage: string | null
  defaultEmail: string
  onSubmit: (values: ForgetPasswordFormValues) => void
  onLoginPress: () => void
}
