import * as yup from 'yup'

export const loginDictionary = {
  emailRequired: 'auth.validation.emailRequired',
  emailInvalid: 'auth.validation.emailInvalid',
  passwordRequired: 'auth.validation.passwordRequired',
  passwordMin: 'auth.validation.passwordMin'
}

export const loginSchema = yup.object({
  email: yup.string().email(loginDictionary.emailInvalid).required(loginDictionary.emailRequired),
  password: yup.string().min(8, loginDictionary.passwordMin).required(loginDictionary.passwordRequired)
})
