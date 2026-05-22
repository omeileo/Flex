import {
  NotificationAuthorCategory,
  NotificationCategory,
  NotificationDeliveryChannel,
  NotificationPriority
} from '@/api/notificationSystem/notification.types'
import { logger } from '@/app'
import { email_verification_tokens, notifications } from '@prisma/client'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

import { Status } from '../enums/status.enum'
import { StatusType } from '../enums/statusType.enum'
import { Systems } from '../enums/systems.enum'
import { changeCase } from '../functions/String/string.functions'
import { obfuscateSensitiveData } from '../functions/security/security.functions'
import { notificationsRepository } from '../repository/notifications.repository'
import { statusRepository } from '../repository/status.repository'
import { userRepository } from '../repository/user.repository'
import transporter, { fromAdress, globalContext } from './email.config'
import { SendEmailOptions, User } from './email.types'
import { adminAlertTemplate } from './templates/views/adminAlert/adminAlert.builder'
import { accountLockedTemplate } from './templates/views/auth/accountLocked/accountLocked.builder'
import { forgotPasswordTemplate } from './templates/views/auth/forgetPassword/forgetPasswordEmail.builder'
import { passwordUpdatedTemplate } from './templates/views/auth/passwordUpdated/passwordUpdated.builder'
import { paymentMethodAddedTemplate } from './templates/views/auth/paymentMethodAlerts/paymentMethodAdded/paymentMethodAdded.builder'
import { paymentMethodUpdatedTemplate } from './templates/views/auth/paymentMethodAlerts/paymentMethodUpdated/paymentMethodUpdated.builder'
import { profileUpdatedTemplate } from './templates/views/auth/profileUpdated/profileUpdatedEmail.builder'
import { verifyEmailTemplate } from './templates/views/auth/verifyEmail/verifyEmail.builder'

const sendEmail = async (
  params: SendEmailOptions
): Promise<
  | {
      info: SMTPTransport.SentMessageInfo
      notification: notifications | undefined
    }
  | undefined
> => {
  const {
    template,
    recipient,
    notificationType = NotificationCategory.notification,
    notificationPriority = NotificationPriority.low,
    logMessageTitle,
    author = {
      id: Systems.TemplateProjectApi,
      type: NotificationAuthorCategory.system
    }
  } = params

  const templateWithGlobalContext = {
    ...template,
    context: {
      ...globalContext,
      ...template.context
    }
  }

  try {
    const info = await transporter.sendMail({
      from: fromAdress,
      ...templateWithGlobalContext
    })

    let notification: notifications | undefined

    const createNotificationRecord = async (successful: boolean) => {
      const successfulDeliveryStatus = await statusRepository.getStatus(
        StatusType.notification_status,
        Status.notification_delivery_successful
      )

      const failedDeliveryStatus = await statusRepository.getStatus(
        StatusType.notification_status,
        Status.notification_delivery_failed
      )

      try {
        notification = await notificationsRepository.createNotification({
          recipient_id: recipient.id,
          author_id: author.id,
          author_type: author.type,
          title: template.context.subject,
          body: template.context.content,
          type: notificationType,
          priority: notificationPriority,
          delivery_status_id: successful ? successfulDeliveryStatus.id : failedDeliveryStatus.id,
          delivery_channel: NotificationDeliveryChannel.email
        })
      } catch (error) {
        logger.error(`Error creating notification for email delivery: ${error}`)
      }
    }

    if (info) {
      logSuccessfulEmailDelivery(changeCase(logMessageTitle).title, template.to)
      await createNotificationRecord(true)
    } else {
      logFailedEmailDelivery(null, logMessageTitle.toLowerCase(), template.to)
      await createNotificationRecord(false)
    }

    return { info, notification }
  } catch (error) {
    logFailedEmailDelivery(error, logMessageTitle.toLowerCase(), template.to)
  }
}

export const email = {
  /**
   * ------------------------------------------------------------------------------------------------
   * Admin
   * ------------------------------------------------------------------------------------------------
   */
  admin: {
    /**
     * Sends an email to the admin when an admin-level event is triggered.
     * @param {string} title - The title of the alert.
     * @param {string} message - The message of the alert.
     */
    sendAdminAlert: async (title: string, message: string): Promise<void> => {
      try {
        const adminUser = await userRepository.getAdminUser()

        if (!adminUser) {
          logger.error('Neither admin nor dev support user found.')
          return
        }

        const emailAddress = adminUser.email
        const template = adminAlertTemplate.build(title, message, emailAddress)
        const user = await userRepository.getAllDataForUser(adminUser.id)

        await sendEmail({
          template,
          recipient: user,
          logMessageTitle: 'admin alert',
          notificationPriority: NotificationPriority.high,
          notificationType: NotificationCategory.alert
        })
      } catch (error) {
        logger.error('Error sending admin alert', error)
      }
    }
  },

  /**
   * ------------------------------------------------------------------------------------------------
   * Authentication
   * ------------------------------------------------------------------------------------------------
   */
  auth: {
    /**
     * Sends an email to the user when they need to verify their email address during signup.
     * @param {User} user - The user to send the email to.
     * @param {email_verification_tokens} token - The token to send to the user.
     */
    sendEmailVerification: async (user: User, token: email_verification_tokens): Promise<void> => {
      const template = verifyEmailTemplate.build(user, token)
      await sendEmail({
        template,
        recipient: user,
        logMessageTitle: 'verification',
        notificationPriority: NotificationPriority.medium
      })
    },

    /**
     * Sends an email to the user when their password was reset.
     * @param {User} user - The user to send the email to.
     * @param {email_verification_tokens} token - The token to send to the user.
     */
    sendPasswordResetLink: async (user: User, token: email_verification_tokens): Promise<void> => {
      const template = forgotPasswordTemplate.build(user, token.token)
      await sendEmail({
        template,
        recipient: user,
        logMessageTitle: 'password reset',
        notificationPriority: NotificationPriority.medium
      })
    },

    /**
     * Sends an email to the user when their password was updated.
     * @param {User} user - The user to send the email to.
     */
    sendPasswordUpdatedAlert: async (user: User): Promise<void> => {
      const template = passwordUpdatedTemplate.build(user)
      await sendEmail({
        template,
        recipient: user,
        logMessageTitle: 'password updated',
        notificationPriority: NotificationPriority.high,
        notificationType: NotificationCategory.alert
      })
    },

    /**
     * Sends an email to the user when their account was locked.
     * @param {User} user - The user to send the email to.
     */
    sendAccountLockedAlert: async (user: User): Promise<void> => {
      const template = accountLockedTemplate.build(user)
      await sendEmail({
        template,
        recipient: user,
        logMessageTitle: 'account locked',
        notificationPriority: NotificationPriority.high,
        notificationType: NotificationCategory.alert
      })
    }
  },

  /**
   * ------------------------------------------------------------------------------------------------
   * Profile
   * ------------------------------------------------------------------------------------------------
   */
  profile: {
    basicInfo: {
      updated: {
        /**
         * Sends an email to the user when their profile was updated.
         * @param {User} user - The user to send the email to.
         */
        sendProfileUpdatedAlert: async (user: User): Promise<void> => {
          const template = profileUpdatedTemplate.build(user)
          await sendEmail({
            template,
            recipient: user,
            logMessageTitle: 'profile updated',
            notificationPriority: NotificationPriority.high,
            notificationType: NotificationCategory.alert
          })
        }
      }
    },

    paymentMethod: {
      added: {
        /**
         * Sends an email to the user when a payment method was added to their account.
         * @param {User} user - The user to send the email to.
         */
        sendPaymentMethodAddedAlert: async (user: User): Promise<void> => {
          const template = paymentMethodAddedTemplate.build(user)
          await sendEmail({
            template,
            recipient: user,
            logMessageTitle: 'payment method added',
            notificationPriority: NotificationPriority.high,
            notificationType: NotificationCategory.alert
          })
        }
      },

      updated: {
        /**
         * Sends an email to the user when a payment method was updated on their account.
         * @param {User} user - The user to send the email to.
         */
        sendPaymentMethodUpdatedAlert: async (user: User): Promise<void> => {
          const template = paymentMethodUpdatedTemplate.build(user)
          await sendEmail({
            template,
            recipient: user,
            logMessageTitle: 'payment method updated',
            notificationPriority: NotificationPriority.high,
            notificationType: NotificationCategory.alert
          })
        }
      }
    }
  }
}

/**
 * ------------------------------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------------------------------
 */

const logSuccessfulEmailDelivery = (type: string, email: string) => {
  logger.info(`${type} email sent to ${obfuscateSensitiveData(email)}`)
}

const logFailedEmailDelivery = (error: unknown, type: string, email: string) => {
  logger.error(`Could not send ${type} email to ${obfuscateSensitiveData(email)}: ${error}`)
}
