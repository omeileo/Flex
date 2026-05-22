import { User } from '@/shared/email/email.types'

import { createStandardEmailTemplate } from '../../../../../emailTemplate.builder'

/**
 * Builds a payment method added email template
 * @param user - The user to send the email to
 * @returns The email template
 */
export const paymentMethodAddedTemplate = {
  build: function (user: User) {
    return createStandardEmailTemplate({
      to: user.email,
      subject: 'A Payment Method Has Been Added To Your Flex Account.',
      title: 'Payment Method Added',
      firstName: user.user_profile.first_name,
      content: `
        We just wanted to confirm that a payment method has been added to your Flex account.<br /><br />
        You're all set!<br /><br />
        Thanks for keeping your payment methods up to date!<br /><br />
      `,
      additionalContent: `
        If you didn't make this update, please get in touch with us, and we'll assist you right away.
      `
    })
  }
}
