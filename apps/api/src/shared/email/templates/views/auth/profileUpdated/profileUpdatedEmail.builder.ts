import { User } from '@/shared/email/email.types'

import { createStandardEmailTemplate } from '../../../../emailTemplate.builder'

/**
 * Builds a profile updated email template
 * @param user - The user to send the email to
 * @returns The email template
 */
export const profileUpdatedTemplate = {
  build: function (user: User) {
    return createStandardEmailTemplate({
      to: user.email,
      subject: 'Your Hurrier Profile Has Been Updated.',
      title: 'Profile Updated',
      firstName: user.user_profile.first_name,
      content: `
        We just wanted to confirm that your Hurrier profile has been updated.<br /><br />
        You're all set!<br /><br />
        Thanks for keeping your profile up to date!<br /><br />
      `,
      additionalContent: `
        If you didn't make this update, please get in touch with us, and we'll assist you right away.
      `
    })
  }
}
