import { email } from '@/shared/email/email.functions'
import { stripeHelper } from '@/shared/functions/stripe/stripe.functions'
import { userRepository } from '@/shared/repository/user.repository'

import { signUpRepository } from './signUp.repository'
import { SignupRequest } from './signUp.types'

/**
 * Service responsible for handling user sign up functionality.
 */
export const signUpService = {
  /**
   * Creates a new user account.
   * @param request - The signup request object.
   * @returns A promise that resolves to the created user account (Unverified user account).
   */
  async create(request: SignupRequest) {
    const { userWithStatus, token } = await signUpRepository.create(request)

    const userWithProfile = await userRepository.getUserWithProfile(userWithStatus.id)

    email.auth.sendEmailVerification(userWithProfile, token)

    // Create a stripe customer
    await stripeHelper.createStripeCustomerAtSignUp(
      userWithProfile.email,
      userWithProfile.user_profile.first_name,
      userWithProfile.user_profile.last_name,
      userWithProfile.user_profile.mobile_number,
      userWithProfile.id
    )

    return userWithStatus
  }
}
