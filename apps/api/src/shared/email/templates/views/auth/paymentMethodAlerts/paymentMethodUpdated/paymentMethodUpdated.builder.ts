import { User } from '@/shared/email/email.types'

import { createStandardEmailTemplate } from '../../../../../emailTemplate.builder'

/**
 * Builds a payment method updated email template
 * @param user - The user to send the email to
 * @returns The email template
 */
export const paymentMethodUpdatedTemplate = {
  build: function (user: User) {
    return createStandardEmailTemplate({
      to: user.email,
      subject: 'Payment Method Updated on Your Hurrier Account',
      title: 'Payment Method Updated',
      firstName: user.user_profile.first_name,
      content: `
        We just wanted to confirm that there was a payment method update on your Hurrier account.<br /><br />
        You're all set!<br /><br />
        Thanks for keeping your payment methods up to date!<br /><br />
      `,
      additionalContent: `
        If you didn't make this update, please get in touch with us and we'll assist you right away.
      `
    })
  }
}
