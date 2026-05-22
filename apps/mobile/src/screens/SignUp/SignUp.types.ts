export interface SignUpFormValues {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface SignUpComponentProps {
  isSubmitting: boolean
  error: string | null
  successMessage: string | null
  onSubmit: (values: SignUpFormValues) => void
  onLoginPress: () => void
}
