import * as yup from 'yup'

export const forgetPasswordDictionary = {
  emailRequired: 'auth.validation.emailRequired',
  emailInvalid: 'auth.validation.emailInvalid'
}

export const forgetPasswordSchema = yup.object({
  email: yup.string().email(forgetPasswordDictionary.emailInvalid).required(forgetPasswordDictionary.emailRequired)
})
