import { User } from '@/shared/email/email.types'
import { env } from '@/shared/functions/envConfig'

import { createStandardEmailTemplate } from '../../../../emailTemplate.builder'

const resetPasswordRoute = `${env.WEB_APP_BASE_URL}${env.FORGET_PASSWORD_PATH}`

/**
 * Builds a account locked email template
 * @param user - The user to send the email to
 * @returns The email template
 */
export const accountLockedTemplate = {
  build: function (user: User) {
    return createStandardEmailTemplate({
      to: user.email,
      subject: 'Your Hurrier Account Has Been Locked',
      title: 'Account Locked',
      firstName: user.user_profile.first_name,
      content: `
        We wanted to let you know that your account has been locked due to multiple failed login attempts.<br /><br />
        You can reset your password by clicking the link below:
      `,
      buttonConfig: {
        link: resetPasswordRoute,
        text: 'Reset Password'
      },
      additionalContent: `
        If you believe this was a mistake, please contact support at ${env.SUPPORT_EMAIL_ADDRESS} for assistance.
      `
    })
  }
}
