import {
  NotificationAuthorCategoryType,
  NotificationCategory,
  NotificationPriority
} from '@/api/notificationSystem/notification.types'
import { users } from '@prisma/client'
import { user_profiles } from '@prisma/client'

interface Attachment {
  filename: string
  path: string
  cid: string
}

export interface MailOptions {
  from: string
  to: string
  subject: string
  template: string
  context: BaseEmailContext
  attachments: Attachment[]
}

export interface GlobalContext {
  currentYear: number
  supportEmail: string
  businessName: string
  businessAddress: string
  webAppBaseUrl: string
}

interface ButtonConfig {
  text: string
  link: string
}

export interface EmailTemplateConfig {
  to: string
  subject: string
  title: string
  firstName: string
  content: string // Accepts HTML
  buttonConfig?: ButtonConfig
  additionalContent?: string // Accepts HTML
  customSalutation?: string // Accepts HTML
  attachments?: Array<{
    filename: string
    path: string
    cid: string
  }>
}

export type User = Pick<users, 'email' | 'id'> & {
  user_profile: user_profiles
}

export type Templates = 'verifyEmail/verifyEmail' | 'reset_password/reset_password'

// MailOptions<T> but exclude from
export type EmailTemplate = Omit<MailOptions, 'from'>

export interface BaseEmailContext {
  title: string
  subject: string
  firstName: string
  content: string
  buttonConfig?: ButtonConfig
  additionalContent?: string
  customSalutation?: string
  supportEmail: string
  businessName: string
  businessAddress: string
  currentYear: number
}

export interface NotificationAuthor {
  id: string
  type: NotificationAuthorCategoryType
}

export interface SendEmailOptions {
  template: EmailTemplate
  recipient: User
  author?: NotificationAuthor
  notificationType?: NotificationCategory
  notificationPriority?: NotificationPriority
  logMessageTitle: string
}
