import { EmailTemplate, EmailTemplateConfig } from '@/shared/email/email.types'
import { env } from '@/shared/functions/envConfig'

import { sentenceCase } from '../functions/String/string.functions'
import { templatesPath } from './email.config'

const defaultAttachments = [
  {
    filename: 'template-project-logo.png',
    path: `${templatesPath}/images/template-project-logo.png`,
    cid: 'template-project-logo'
  }
]

export const createStandardEmailTemplate = (config: EmailTemplateConfig): EmailTemplate => {
  const {
    to,
    title,
    subject,
    firstName,
    content,
    buttonConfig,
    additionalContent,
    customSalutation,
    attachments = []
  } = config

  const baseContext = {
    title: sentenceCase(title),
    subject: sentenceCase(subject),
    firstName,
    content,
    buttonConfig,
    additionalContent,
    customSalutation,
    supportEmail: env.SUPPORT_EMAIL_ADDRESS,
    businessName: env.BUSINESS_NAME,
    businessAddress: env.BUSINESS_ADDRESS,
    currentYear: new Date().getFullYear()
  }

  return {
    to,
    subject: sentenceCase(subject),
    template: 'baseEmail',
    context: baseContext,
    attachments: [...defaultAttachments, ...attachments]
  }
}
