import { email_verification_tokens } from '@prisma/client'

import { User } from '@/shared/email/email.types'
import { env } from '@/shared/functions/envConfig'

import { createStandardEmailTemplate } from '../../../../emailTemplate.builder'

const verifyEmailLinkBase = `${env.WEB_APP_BASE_URL}${env.VERIFY_EMAIL_REDIRECT_PATH}`

/**
 * Builds a verify email template
 * @param user - The user to send the email to
 * @param verificationToken - Token row including short code for mobile entry
 * @returns The email template
 */
export const verifyEmailTemplate = {
  build: function (user: User, verificationToken: email_verification_tokens) {
    const verifyEmailLink = `${verifyEmailLinkBase}${verificationToken.token}`
    const mobileDeepLink = `${env.MOBILE_APP_DEEP_LINK_SCHEME}://verify?code=${verificationToken.short_code}&email=${encodeURIComponent(user.email)}`

    return createStandardEmailTemplate({
      to: user.email,
      subject: 'Welcome to Flex! Please confirm your email address.',
      title: 'Confirm your email address',
      firstName: user.user_profile.first_name,
      customSalutation: 'Best,<br />The Flex Team',
      content: `
        Thank you for joining Flex!<br /><br />
        Enter this verification code in the app:<br /><br />
        <strong style="font-size: 28px; letter-spacing: 4px;">${verificationToken.short_code}</strong><br /><br />
        Or confirm your email using one of the links below:
      `,
      buttonConfig: {
        text: 'Open Flex app',
        link: mobileDeepLink
      },
      additionalContent: `
        You can also confirm on the web:<br />
        <a href="${verifyEmailLink}">${verifyEmailLink}</a><br /><br />
        Open in the app:<br />
        <a href="${mobileDeepLink}">${mobileDeepLink}</a><br /><br />
        If you didn't sign up, ignore this message and no changes will be made.
      `
    })
  }
}
