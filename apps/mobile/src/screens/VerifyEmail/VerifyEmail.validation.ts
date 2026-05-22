import * as yup from 'yup'

export const dictionary = {
  emailRequired: 'auth.validation.emailRequired',
  emailInvalid: 'auth.validation.emailInvalid',
  codeRequired: 'auth.verifyEmail.codeRequired',
  codeLength: 'auth.verifyEmail.codeLength'
}

export const verifyEmailSchema = yup.object({
  email: yup.string().email(dictionary.emailInvalid).required(dictionary.emailRequired),
  code: yup
    .string()
    .required(dictionary.codeRequired)
    .matches(/^[A-Za-z0-9]{6}$/, dictionary.codeLength)
    .transform((value) => value?.trim().toUpperCase())
})
