import prisma from '../../../../../prisma/prisma.client'
import { globalErrors } from '../../../../shared/dictionary/errors.dictionary'
import { dobToISOString } from '../../../../shared/functions/date.functions'
import { UpdatePersonalInfoRequest } from './personalInfo.types'

export const personalInfoRepository = {
  updatePersonalInfo: async function (userId: number, newPersonalInfo: UpdatePersonalInfoRequest) {
    // Todo: Handle ForbiddenActionError: https://appshopapps.atlassian.net/browse/HR-41
    const updatedPersonalInfo = await prisma.user_profiles.updateMany({
      where: {
        user: {
          id: userId
        }
      },
      data: {
        first_name: newPersonalInfo.firstName,
        middle_name: newPersonalInfo.middleName,
        last_name: newPersonalInfo.lastName,
        date_of_birth: dobToISOString(newPersonalInfo.dateOfBirth),
        updated_at: new Date()
      }
    })

    if (!updatedPersonalInfo) {
      throw globalErrors.entityNotUpdated.build('UserPersonalInfo', userId)
    }

    return updatedPersonalInfo
  }
}
