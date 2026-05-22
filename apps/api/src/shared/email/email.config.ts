import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'

import { env } from '../functions/envConfig'
import { GlobalContext } from './email.types'

export const templatesPath = `${process.cwd()}/${env.EMAIL_TEMPLATES_PATH}`

const viewsPath = `${templatesPath}/views`
const layoutsPath = `${templatesPath}/layouts`
const partialsPath = `${templatesPath}/partials`

export const fromAdress = env.SMTP_FROM_ADDRESS

export const globalContext: GlobalContext = {
  currentYear: new Date().getFullYear(),
  supportEmail: env.SUPPORT_EMAIL_ADDRESS,
  businessName: env.BUSINESS_NAME,
  businessAddress: env.BUSINESS_ADDRESS,
  webAppBaseUrl: env.WEB_APP_BASE_URL
}

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: true,
  auth: {
    user: env.SMTP_AUTH_USER,
    pass: env.SMTP_AUTH_PASS
  }
})

transporter.use(
  'compile',
  hbs({
    viewEngine: {
      extname: '.template.hbs',
      layoutsDir: layoutsPath,
      partialsDir: partialsPath,
      defaultLayout: false
    },
    viewPath: viewsPath,
    extName: '.template.hbs'
  })
)

export default transporter
