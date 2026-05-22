import { logger } from '@/app'
import { email } from '@/shared/email/email.functions'
import { userRepository } from '@/shared/repository/user.repository'

import { getCurrentLoggedInUserOrThrow } from '../../../../shared/appContext.context'
import { personalInfoRepository } from './personalInfo.repository'
import { UpdatePersonalInfoRequest } from './personalInfo.types'

export const personalInfoService = {
  updateUserPersonalInfo: async (updatePersonalInfoRequest: UpdatePersonalInfoRequest) => {
    const currentUser = getCurrentLoggedInUserOrThrow()

    try {
      await personalInfoRepository.updatePersonalInfo(currentUser.userId, updatePersonalInfoRequest)

      // Send an email to the user when their personal information was updated
      email.profile.basicInfo.updated.sendProfileUpdatedAlert(
        await userRepository.getAllDataForUser(currentUser.userId)
      )
    } catch (error) {
      logger.error(`Error updating personal information for user: ${currentUser.userId} - ${error}`)

      throw error
    }
  }
}
