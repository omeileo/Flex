import { User } from '@/shared/email/email.types'
import { env } from '@/shared/functions/envConfig'

import { createStandardEmailTemplate } from '../../../../emailTemplate.builder'

/**
 * Builds a password updated email template
 * @param user - The user to send the email to
 * @returns The email template
 */
export const passwordUpdatedTemplate = {
  build: function (user: User) {
    return createStandardEmailTemplate({
      to: user.email,
      subject: 'Your Hurrier Password Has Been Changed',
      title: 'Password Changed',
      firstName: user.user_profile.first_name,
      content: `
        We wanted to let you know that your password for Hurrier has been successfully changed.<br /><br />
        <span>If you didn't make this change, please reach out to us right away at ${env.SUPPORT_EMAIL_ADDRESS} to ensure your account remains secure.</span><br /><br />
        Thank you for being part of Hurrier!
      `
    })
  }
}
