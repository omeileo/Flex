import { User } from '@/shared/email/email.types'
import { env } from '@/shared/functions/envConfig'

import { createStandardEmailTemplate } from '../../../../emailTemplate.builder'

const forgetPasswordLinkBase = `${env.WEB_APP_BASE_URL}${env.FORGET_PASSWORD_REDIRECT_PATH}`

/**
 * Builds a forget password email template
 * @param user - The user to send the email to
 * @param token - The token to use to reset the password
 * @returns The email template
 */
export const forgotPasswordTemplate = {
  build: function (user: User, token: string) {
    const forgetPasswordLink = `${forgetPasswordLinkBase}${token}`

    return createStandardEmailTemplate({
      to: user.email,
      subject: 'Reset Your Flex Password',
      title: 'Reset Your Password',
      firstName: user.user_profile.first_name,
      content: `
        We received a request to reset your Flex password.<br /><br />
        If you made this request, please click the link below to reset your password.
      `,
      buttonConfig: {
        text: 'Reset Password',
        link: forgetPasswordLink
      },
      additionalContent: `
        If you did not request a reset, no action is needed and your account remains secure.
      `
    })
  }
}
