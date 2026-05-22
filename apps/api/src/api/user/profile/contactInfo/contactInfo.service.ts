import { logger } from '@/app'
import { email } from '@/shared/email/email.functions'
import { userRepository } from '@/shared/repository/user.repository'

import { getCurrentLoggedInUserOrThrow } from '../../../../shared/appContext.context'
import { contactInfoRepository } from './contactInfo.repository'
import { UpdateContactInfoRequest } from './contactInfo.types'

export const contactInfoService = {
  updateUserContactInfo: async (updateContactInfoRequest: UpdateContactInfoRequest) => {
    const currentUser = getCurrentLoggedInUserOrThrow()

    try {
      await contactInfoRepository.updateContactInfo(currentUser.userId, updateContactInfoRequest)

      // Send an email to the user when their contact information was updated
      email.profile.basicInfo.updated.sendProfileUpdatedAlert(
        await userRepository.getAllDataForUser(currentUser.userId)
      )

      return
    } catch (error) {
      logger.error(`Error updating contact information for user: ${currentUser.userId} - ${error}`)

      throw error
    }
  }
}
