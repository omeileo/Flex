import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

import { checkoutSessionRegistry } from './checkoutSessions/checkoutSession.docs'
import { customerSessionRegistry } from './customerSessions/customerSession.docs'
import { paymentIntentsRegistry } from './paymentIntents/paymentIntents.docs'
import { paymentMethodsRegistry } from './paymentMethods/paymentMethods.docs'
import { refundRegistry } from './refunds/refund.docs'

export const paymentOpenApiRegistries: OpenAPIRegistry[] = [
  paymentMethodsRegistry,
  refundRegistry,
  customerSessionRegistry,
  checkoutSessionRegistry,
  paymentIntentsRegistry
]
