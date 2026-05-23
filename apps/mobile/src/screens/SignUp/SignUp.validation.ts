import * as yup from 'yup'

export const signUpDictionary = {
  firstNameRequired: 'auth.validation.firstNameRequired',
  lastNameRequired: 'auth.validation.lastNameRequired',
  emailRequired: 'auth.validation.emailRequired',
  emailInvalid: 'auth.validation.emailInvalid',
  passwordRequired: 'auth.validation.passwordRequired',
  passwordMin: 'auth.validation.passwordMin'
}

export const signUpSchema = yup.object({
  firstName: yup.string().min(2, signUpDictionary.firstNameRequired).required(signUpDictionary.firstNameRequired),
  lastName: yup.string().min(2, signUpDictionary.lastNameRequired).required(signUpDictionary.lastNameRequired),
  email: yup.string().email(signUpDictionary.emailInvalid).required(signUpDictionary.emailRequired),
  password: yup.string().min(8, signUpDictionary.passwordMin).required(signUpDictionary.passwordRequired)
})
