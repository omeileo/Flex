import { EmailTemplate, User } from '@/shared/email/email.types'
import { createStandardEmailTemplate } from '@/shared/email/emailTemplate.builder'

/**
 * Builds an email template for a test preview email notification.
 * @param user - The user who updated their profile.
 * @returns The email template.
 */
export const testPreviewTemplate = {
  build: function (user: User): EmailTemplate {
    return createStandardEmailTemplate({
      to: user.email,
      subject: 'Reset Your Hurrier Password',
      title: 'Reset Your Password',
      firstName: user.user_profile.first_name,
      content: `
          We received a request to reset your Hurrier password.<br /><br />
          If you made this request, please click the link below to reset your password.
        `,
      additionalContent: `
          If you did not request a reset, no action is needed and your account remains secure.
        `
    })
  }
}
