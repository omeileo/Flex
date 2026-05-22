import { logger } from '@/app'
import { stripeErrors } from '@/shared/functions/stripe/stripe.dictionary'
import { stripeHelper } from '@/shared/functions/stripe/stripe.functions'

import { getCurrentLoggedInUserOrThrow } from '../../../../shared/appContext.context'
import {
  CheckOnboardingInfoRequest,
  CreateCustomerSessionRequest,
  CreateCustomerSessionResponse,
  OnboardingInfoType
} from './customerSession.types'

export const customerSessionService = {
  createCustomerSession: async () => {
    const currentUser = getCurrentLoggedInUserOrThrow()
    const sessionData = await stripeHelper.createCustomerSetupSession(currentUser.userId)

    const response: CreateCustomerSessionResponse = {
      setupIntentClientSecret: sessionData.setupIntent.secret ?? '',
      customerSessionClientSecret: sessionData.customerSession.secret ?? ''
    }

    return response
  },

  createCustomerAccountSession: async (request: CreateCustomerSessionRequest) => {
    const currentUser = getCurrentLoggedInUserOrThrow()
    const countryCode = request.countryCode
    const phoneNumber = request.phoneNumber
    const accountSession = await stripeHelper.createAccountSession(currentUser.userId, countryCode, phoneNumber)

    return accountSession
  },

  checkOnboardingInfo: async (request: CheckOnboardingInfoRequest) => {
    const currentUser = getCurrentLoggedInUserOrThrow()
    const stripeConnectAccount = await stripeHelper.getStripeConnectAccount(currentUser.userId)

    if (!stripeConnectAccount) {
      logger.error(`Stripe connect account not found for user ${currentUser.userId}`)
      throw stripeErrors.stripeConnectAccountNotFound.build()
    }

    switch (request.infoType) {
      case OnboardingInfoType.ID_DOCUMENT_UPLOADED: {
        const hasStripeConnectIdUploaded = !stripeConnectAccount?.requirements?.eventually_due?.includes(
          'individual.verification.document'
        )

        if (hasStripeConnectIdUploaded) {
          logger.info(`Stripe connect ID uploaded for user ${currentUser.userId}`)
        }

        return {
          infoType: OnboardingInfoType.ID_DOCUMENT_UPLOADED,
          value: hasStripeConnectIdUploaded
        }
      }
    }
  }
}
