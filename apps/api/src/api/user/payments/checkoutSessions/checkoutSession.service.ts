import { stripeHelper } from '@/shared/functions/stripe/stripe.functions'

import { getCurrentLoggedInUserOrThrow } from '../../../../shared/appContext.context'

export const checkoutSessionService = {
  createCheckoutSession: async () => {
    const currentUser = getCurrentLoggedInUserOrThrow()
    const session = await stripeHelper.createCheckoutSession(currentUser.userId)

    return session.url
  }
}
