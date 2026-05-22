import { Express } from 'express'

import { checkoutSessionRouter } from '../user/payments/checkoutSessions/checkoutSession.controller'
import { checkoutSessionBasePath } from '../user/payments/checkoutSessions/checkoutSession.routes'
import { customerSessionRouter } from '../user/payments/customerSessions/customerSession.controller'
import { customerSessionBasePath } from '../user/payments/customerSessions/customerSession.routes'
import { paymentIntentsRouter } from '../user/payments/paymentIntents/paymentIntents.controller'
import { paymentIntentsBasePath } from '../user/payments/paymentIntents/paymentIntents.routes'
import { paymentMethodsRouter } from '../user/payments/paymentMethods/paymentMethods.controller'
import { paymentMethodsBasePath } from '../user/payments/paymentMethods/paymentMethods.routes'
import { refundRouter } from '../user/payments/refunds/refund.controller'
import { refundBasePath } from '../user/payments/refunds/refund.routes'
import { env } from '../../shared/functions/envConfig'

const withBasePath = (basePath: string) => `${env.APP_BASE_PATH}${basePath}`

export const registerPaymentRoutes = (app: Express): void => {
  app.use(withBasePath(paymentMethodsBasePath), paymentMethodsRouter)
  app.use(withBasePath(refundBasePath), refundRouter)
  app.use(withBasePath(checkoutSessionBasePath), checkoutSessionRouter)
  app.use(withBasePath(customerSessionBasePath), customerSessionRouter)
  app.use(withBasePath(paymentIntentsBasePath), paymentIntentsRouter)
}
