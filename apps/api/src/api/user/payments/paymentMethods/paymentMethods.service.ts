import { logger } from '@/app'
import { email } from '@/shared/email/email.functions'
import { Status } from '@/shared/enums/status.enum'
import { paymentsRepository } from '@/shared/repository/payments.repository'
import { userRepository } from '@/shared/repository/user.repository'

import { getCurrentLoggedInUserOrThrow } from '../../../../shared/appContext.context'

export const paymentMethodsService = {
  logPaymentMethodUpdate: async () => {
    const currentUser = getCurrentLoggedInUserOrThrow()
    const user = await userRepository.getAllDataForUser(currentUser.userId)

    logger.info('Payment method updated successfully.')

    email.profile.paymentMethod.updated.sendPaymentMethodUpdatedAlert(user)

    return
  }
}
