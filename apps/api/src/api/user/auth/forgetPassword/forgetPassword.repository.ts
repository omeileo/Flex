import prisma from '../../../../../prisma/prisma.client'
import { forgetPasswordErrors } from './forgetPassword.dictionary'

export const forgetPasswordRepository = {
  getUserByEmail: async function (email: string) {
    const user = await prisma.users.findFirst({
      where: {
        email
      },
      select: {
        id: true,
        email: true,
        status: true,
        user_profile: true
      }
    })

    if (!user) {
      throw forgetPasswordErrors.emailNotFound.build()
    }

    return user
  }
}
