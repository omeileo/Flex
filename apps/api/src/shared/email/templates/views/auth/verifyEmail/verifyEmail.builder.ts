import { User } from '@/shared/email/email.types'
import { env } from '@/shared/functions/envConfig'

import { createStandardEmailTemplate } from '../../../../emailTemplate.builder'

const verifyEmailLinkBase = `${env.WEB_APP_BASE_URL}${env.VERIFY_EMAIL_REDIRECT_PATH}`

/**
 * Builds a verify email template
 * @param user - The user to send the email to
 * @param token - The token to use to verify the email
 * @returns The email template
 */
export const verifyEmailTemplate = {
  build: function (user: User, token: string) {
    const verifyEmailLink = `${verifyEmailLinkBase}${token}`

    return createStandardEmailTemplate({
      to: user.email,
      subject: 'Welcome to Hurrier! Please confirm your email address.',
      title: 'Confirm your email address',
      firstName: user.user_profile.first_name,
      content: `
        Thank you for becoming a Hurrier!<br /><br />
        To get started, please confirm your email address by clicking the link below:
      `,
      buttonConfig: {
        text: 'Confirm Email',
        link: verifyEmailLink
      },
      additionalContent: `
        If you didn't sign up, simply ignore this message, and no changes will be made.<br /><br />
        Look forward to having you onboard!
      `
    })
  }
}
