import { getCurrentLoggedInUserOrThrow } from '../../../../shared/appContext.context'
import { profileRepository } from './profile.repository'

export const profileService = {
  getUserProfile: async (firebaseData: boolean = false) => {
    const currentUser = getCurrentLoggedInUserOrThrow()
    const profile = await profileRepository.getUserProfile(currentUser.userId)

    if (firebaseData) {
      return {
        firstName: profile.first_name,
        lastName: profile.last_name,
        userId: currentUser.userId,
        firebaseUserId: profile.firebase_user_id
      }
    } else {
      return {
        firstName: profile.first_name,
        middleName: profile.middle_name,
        lastName: profile.last_name,
        dateOfBirth: profile.date_of_birth,
        mobileNumber: profile.mobile_number,
        email: profile.user?.email,
        deliveryAddresses: profile.user?.user_delivery_addresses,
        loyaltyPrograms: profile.user?.user_loyalty_programs
      }
    }
  },

  updateUserFirebaseUserId: async (firebaseUserId: string) => {
    const currentUser = getCurrentLoggedInUserOrThrow()

    await profileRepository.updateUserFirebaseUserId(currentUser.userId, firebaseUserId)
  }
}
