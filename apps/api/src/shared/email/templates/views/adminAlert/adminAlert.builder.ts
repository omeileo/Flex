import { env } from '@/shared/functions/envConfig'

import { createStandardEmailTemplate } from '../../../emailTemplate.builder'

/**
 * Builds an admin alert email template
 * @param title - The title of the alert
 * @param message - The message of the alert
 * @param emailAddress - The email address to send the alert to
 * @returns The email template
 */
export const adminAlertTemplate = {
  build: function (title: string, message: string, emailAddress: string) {
    return createStandardEmailTemplate({
      to: emailAddress,
      subject: 'Admin Alert: Important System Notification',
      title: title,
      firstName: 'Admin',
      content: `${message}<br /><br />This is an automated alert from the Flex system. Please take appropriate action if needed.`,
      additionalContent: `If you have any questions about this alert, please contact the <a href="mailto:${env.DEV_SUPPORT_EMAIL_ADDRESS}">App Shop</a> team.`
    })
  }
}
