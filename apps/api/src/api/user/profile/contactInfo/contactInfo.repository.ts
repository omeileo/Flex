import prisma from '../../../../../prisma/prisma.client'
import { globalErrors } from '../../../../shared/dictionary/errors.dictionary'
import { UpdateContactInfoRequest } from './contactInfo.types'

export const contactInfoRepository = {
  updateContactInfo: async function (userId: number, newContactInfo: UpdateContactInfoRequest) {
    // Todo: Handle ForbiddenActionError: https://appshopapps.atlassian.net/browse/HR-41
    const updatedContactInfo = await prisma.user_profiles.updateMany({
      where: {
        user: {
          id: userId
        }
      },
      data: {
        mobile_number: newContactInfo.mobileNumber,
        updated_at: new Date()
      }
    })

    if (!updatedContactInfo) {
      throw globalErrors.entityNotUpdated.build('UserContactInfo-mobile', userId)
    }

    const updatedUser = await prisma.users.update({
      where: {
        id: userId
      },
      data: {
        email: newContactInfo.email,
        updated_at: new Date()
      }
    })

    if (!updatedUser) {
      throw globalErrors.entityNotUpdated.build('UserContactInfo-email', userId)
    }

    return { updatedContactInfo, updatedUser }
  }
}
