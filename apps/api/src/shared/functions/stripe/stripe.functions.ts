import { SetupIntent, StripeSession } from '@/api/user/payments/paymentIntents/paymentIntents.types'
import { profileRepository } from '@/api/user/profile/profileDetails/profile.repository'
import { logger } from '@/app'
import { email } from '@/shared/email/email.functions'
import { Roles } from '@/shared/enums/roles.enum'
import { rolesRepository } from '@/shared/repository/roles.repository'
import Stripe from 'stripe'

import date from '../Date/date.functions'
import { validatePhoneNumber } from '../String/string.functions'
import { env } from '../envConfig'
import { QuickErrorResponse } from '../http/response/response.types'
import { isValidCountryCode } from '../places/places.functions'
import { obfuscateSensitiveData, obfuscateStripeData } from '../security/security.functions'
import { stripeErrors } from './stripe.dictionary'
import { StripeDeclineCodes, StripeErrorCodes, StripePaymentIntentStatus } from './stripe.enum'
import { IDVerificationStatus, StripeIdVerificationStatus, User } from './stripe.types'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: (process.env.STRIPE_API_VERSION as Stripe.StripeConfig['apiVersion']) ?? '2024-06-20'
})

/**
 * Helper functions for Stripe operations.
 */
export const stripeHelper = {
  /**
   * Retrieves the Stripe customer for a given user.
   * @param userId - The ID of the user.
   * @returns A promise that resolves to the Stripe customer object or null if not found.
   */
  getStripeCustomer: async (userId: number) => {
    const userProfile = await profileRepository.getUserProfile(userId)

    if (!userProfile.stripe_customer_id) {
      logger.warn(`Stripe customer ID not found for user ${userId}`)

      return null
    }

    try {
      const customer = await stripe.customers.retrieve(userProfile.stripe_customer_id)

      if (customer.deleted) {
        logger.warn(`Stripe customer was deleted: ${userProfile.stripe_customer_id}`)

        return null
      }

      return customer
    } catch (error) {
      return null
    }
  },

  /**
   * Retrieves the Stripe connect account for a given user.
   * @param userId - The ID of the user.
   * @returns A promise that resolves to the Stripe connect account object or null if not found.
   */
  getStripeConnectAccount: async (userId: number) => {
    logger.info(`Retrieving Stripe connect account for user ${userId}`)

    try {
      const userProfile = await profileRepository.getUserProfile(userId)

      if (!userProfile.stripe_connect_account_id) {
        logger.warn(`Stripe connect account ID not found for user ${userId}`)

        return null
      }

      try {
        const account = await stripe.accounts.retrieve(userProfile.stripe_connect_account_id)

        return account
      } catch (error) {
        logger.warn(`Error retrieving Stripe connect account for user ${userId}: ${error}`)

        return null
      }
    } catch (error) {
      logger.warn(`Error retrieving Stripe connect account for user ${userId}: ${error}`)

      return null
    }
  },

  /**
   * Retrieves the Stripe payment intent for a given payment intent ID.
   * @param paymentIntentId - The ID of the payment intent.
   * @returns A promise that resolves to the Stripe payment intent object.
   */
  getStripePaymentIntent: async (paymentIntentId: string) => {
    logger.info(`Attempting to retrieve Stripe payment intent: ${obfuscateStripeData(paymentIntentId)}`)

    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

      // TODO: Check if payment intent belongs to this customer and validate other data in it to prevent fraud

      return paymentIntent
    } catch (error) {
      logger.error(`Error retrieving Stripe payment intent: ${obfuscateStripeData(paymentIntentId)}`, error)

      return null
    }
  },

  /**
   * Creates a Stripe customer for a new user at sign up.
   * @param email - The email of the user.
   * @param firstName - The first name of the user.
   * @param lastName - The last name of the user.
   * @param phoneNumber - The phone number of the user.
   * @param userId - The ID of the user.
   * @returns A promise that resolves to the Stripe customer object or null if creation fails.
   */
  createStripeCustomerAtSignUp: async (
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string | null,
    userId: number
  ) => {
    try {
      logger.info(`Creating Stripe customer for user (${userId}) with email ${obfuscateSensitiveData(email)}`)

      const customer = await stripe.customers.create({
        email: email,
        name: firstName + ' ' + lastName,
        phone: phoneNumber ?? undefined,
        metadata: {
          userId: userId
        }
      })

      await profileRepository.updateUserStripeCustomerId(userId, customer?.id)

      return customer
    } catch (error) {
      logger.error('Error creating Stripe customer: ', error)

      return null
    }
  },

  /**
   * Creates a Stripe customer for a user.
   * @param userId - The ID of the user.
   * @returns A promise that resolves to the Stripe customer object or null if creation fails.
   */
  createStripeCustomer: async (userId: number) => {
    const userProfile = await profileRepository.getUserProfile(userId)

    if (userProfile.stripe_customer_id) {
      logger.warn(`Stripe customer ID already exists for user ${userId}`)

      return null
    }

    try {
      if (userProfile) {
        const customer = await stripe.customers.create({
          email: userProfile.user?.email,
          name: userProfile.first_name + ' ' + userProfile.last_name,
          metadata: {
            userId: userId
          }
        })

        await profileRepository.updateUserStripeCustomerId(userId, customer?.id)

        return customer
      }

      throw new Error('User profile not found')
    } catch (error) {
      logger.warn(`Error creating Stripe customer for user ${userId}: ${error}`)

      throw error
    }
  },

  /**
   * Creates a Stripe connect account for a user.
   * @param user - The user object.
   * @returns A promise that resolves to the Stripe connect account object.
   */
  createStripeConnectAccount: async (user: User) => {
    logger.info(
      `Creating Stripe connect account for user (${user.hourrierUserId}) with email ${obfuscateSensitiveData(
        user.email
      )}`
    )

    const userProfile = await profileRepository.getUserProfile(user.hourrierUserId)
    const stripeConnectAccountCountries = env.STRIPE_CONNECT_ACCOUNT_COUNTRIES.split(',')

    if (!user.countryCode) {
      logger.warn(`Country code is required for user ${user.hourrierUserId}`)
      throw new Error('Country code is required')
    }

    if (!isValidCountryCode(user.countryCode)) {
      logger.warn(`Invalid country code provided for user ${user.hourrierUserId}: ${user.countryCode}`)
      throw new Error('Invalid country code provided')
    }

    const isCrossBorderTransfer = !stripeConnectAccountCountries.includes(user.countryCode)
    let tosAcceptance: Stripe.AccountCreateParams.TosAcceptance | null = null
    let capabilities: Stripe.AccountCreateParams.Capabilities | null = null

    if (userProfile.stripe_connect_account_id) {
      logger.warn(`Stripe connect account ID already exists for user ${user.hourrierUserId}`)

      return null
    }

    if (isCrossBorderTransfer) {
      tosAcceptance = {
        service_agreement: 'recipient'
      }

      capabilities = {
        transfers: {
          requested: true
        }
      }
    }

    const validatedPhoneNumber = validatePhoneNumber(user.phoneNumber) ?? undefined

    const account = await stripe.accounts.create({
      business_type: 'individual',
      individual: {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        phone: validatedPhoneNumber,
        metadata: {
          userId: user.hourrierUserId
        }
      },
      country: user.countryCode,
      email: user.email,
      controller: {
        fees: {
          payer: 'application'
        },
        losses: {
          payments: 'application'
        },
        stripe_dashboard: {
          type: 'express'
        }
      },
      capabilities: capabilities ?? undefined,
      tos_acceptance: tosAcceptance ?? undefined
    })

    await profileRepository.updateUserStripeConnectAccountId(user.hourrierUserId, account?.id)

    return account
  },

  /**
   * Deletes a Stripe customer for a user.
   * @param userId - The ID of the user.
   * @returns A promise that resolves to the Stripe customer object.
   */
  deleteStripeCustomer: async (userId: number) => {
    const userProfile = await profileRepository.getUserProfile(userId)

    if (!userProfile.stripe_customer_id) {
      logger.error(`Stripe customer ID not found for user ${userId}`)
      throw new Error('Stripe customer ID not found')
    }

    try {
      await stripe.customers.del(userProfile.stripe_customer_id)
    } catch (error) {
      logger.error(`Error deleting Stripe customer for user ${userId}: ${error}`)

      throw error
    }
  },

  /**
   * Creates a Stripe setup intent for a user.
   * @param userId - The ID of the user.
   * @returns A promise that resolves to the Stripe setup intent object.
   */
  createSetupIntent: async (userId: number) => {
    try {
      const customer =
        (await stripeHelper.getStripeCustomer(userId)) ?? (await stripeHelper.createStripeCustomer(userId))

      if (!customer) {
        throw new Error('Customer not found')
      }

      const setupIntent = await stripe.setupIntents.create({
        customer: customer.id
      })

      return setupIntent
    } catch (error) {
      logger.error(`Error creating setup intent for user ${userId}: ${error}`)

      throw stripeErrors.unableToCreateSetupIntent.build()
    }
  },

  /**
   * Retrieves the payment methods for a user.
   * @param userId - The ID of the user.
   * @returns A promise that resolves to the Stripe payment methods object or null if not found.
   */
  getPaymentMethods: async (userId: number) => {
    logger.info(`Retrieving payment methods for user ${userId}`)

    try {
      const customer = await stripeHelper.getStripeCustomer(userId)

      if (!customer) {
        logger.warn(`Stripe customer not found for user ${userId}`)

        return null
      }

      const paymentMethods = await stripe.paymentMethods.list({
        customer: customer.id,
        type: 'card'
      })

      logger.info(`Retrieved ${paymentMethods.data.length} payment methods for user ${userId}`)

      return paymentMethods
    } catch (error) {
      logger.error(`Error retrieving payment methods for user ${userId}: ${error}`)

      throw error
    }
  },

  /**
   * Creates a base Stripe customer session with common functionality.
   * @param userId - The ID of the user.
   * @param features - Customer session features to enable.
   * @returns A promise that resolves to the Stripe customer session.
   */
  async createBaseCustomerSession(userId: number, features: Record<string, string>) {
    const customer = (await stripeHelper.getStripeCustomer(userId)) ?? (await stripeHelper.createStripeCustomer(userId))

    if (!customer) {
      logger.error(`Customer not found for user ${userId}`)
      throw new Error('Customer not found')
    }

    try {
      const customerSession = await stripe.customerSessions.create({
        customer: customer.id,
        components: {
          payment_element: {
            enabled: true,
            features
          }
        }
      })

      return customerSession
    } catch (error) {
      logger.error(`Error creating customer session for user ${userId}: ${error}`)
      throw stripeErrors.unableToCreateCustomerSession.build()
    }
  },

  /**
   * Creates a Stripe customer session for payment processing.
   * @param userId - The ID of the user.
   * @returns A promise that resolves to the Stripe customer session object.
   */
  createCustomerPaymentSession: async (userId: number): Promise<StripeSession> => {
    const customerSessionFeatures: Record<string, string> = {
      payment_method_redisplay: 'enabled'
    }

    const customerSession = await stripeHelper.createBaseCustomerSession(userId, customerSessionFeatures)

    return {
      secret: customerSession.client_secret,
      expiresAt: date(customerSession.expires_at).dateTime.toISO()
    }
  },

  /**
   * Creates a Stripe customer session for saving payment methods.
   * @param userId - The ID of the user.
   * @returns A promise that resolves to the Stripe customer session object with setup intent.
   */
  createCustomerSetupSession: async (
    userId: number
  ): Promise<{ setupIntent: SetupIntent } & { customerSession: StripeSession }> => {
    const customerSessionFeatures: Record<string, string> = {
      payment_method_redisplay: 'enabled',
      payment_method_save: 'enabled',
      payment_method_save_usage: 'on_session',
      payment_method_remove: 'enabled'
    }

    const setupIntent = await stripeHelper.createSetupIntent(userId)
    const customerSession = await stripeHelper.createBaseCustomerSession(userId, customerSessionFeatures)

    return {
      setupIntent: {
        secret: setupIntent?.client_secret
      },
      customerSession: {
        secret: customerSession.client_secret,
        expiresAt: date(customerSession.expires_at).dateTime.toISO()
      }
    }
  },

  /**
   * Creates a Stripe checkout session for a user.
   * @param userId - The ID of the user.
   * @returns A promise that resolves to the Stripe checkout session object.
   */
  createCheckoutSession: async (userId: number) => {
    const customer = (await stripeHelper.getStripeCustomer(userId)) ?? (await stripeHelper.createStripeCustomer(userId))

    if (!customer) {
      throw new Error('Customer not found')
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'setup',
      success_url: `${process.env.WEB_APP_BASE_URL}/cart/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.WEB_APP_BASE_URL}/cart/cancel`,
      customer: customer.id
    })

    return session
  },

  /**
   * Creates a Stripe account session for a user to complete the Stripe Connect onboarding process.
   * @param userId - The ID of the user.
   * @returns A promise that resolves to the Stripe account session object.
   */
  createAccountSession: async (userId: number, countryCode?: string, phoneNumber?: string): Promise<StripeSession> => {
    const userProfile = await profileRepository.getUserProfile(userId)
    let stripeConnectAccountId = userProfile.stripe_connect_account_id

    if (!stripeConnectAccountId && userProfile.user && countryCode) {
      logger.info('Stripe connect account ID not found')

      try {
        logger.info(
          `Creating Stripe connect account for user ${userId}. Country code: ${countryCode}. Phone number: ${phoneNumber ? obfuscateSensitiveData(phoneNumber) : '-'}`
        )

        const account = await stripeHelper.createStripeConnectAccount({
          hourrierUserId: userId,
          firstName: userProfile.first_name,
          lastName: userProfile.last_name,
          email: userProfile.user.email,
          phoneNumber: phoneNumber ?? userProfile.mobile_number ?? undefined,
          countryCode
        })

        if (account) {
          logger.info('Stripe connect account created successfully.')
          stripeConnectAccountId = account.id
        } else {
          logger.error('Unable to create Stripe connect account')
          throw stripeErrors.unableToCreateStripeConnectAccount.build()
        }
      } catch (error) {
        logger.error(`Error creating Stripe connect account: ${error}`)
        throw stripeErrors.unableToCreateStripeConnectAccount.build()
      }
    }

    if (!stripeConnectAccountId) {
      logger.error(`Stripe connect account not found for user ${userId}`)
      throw stripeErrors.stripeConnectAccountNotFound.build()
    } else {
      logger.info(
        `Creating Stripe account session for user ${userId} with Stripe connect account ID ${stripeConnectAccountId}`
      )

      const accountSession = await stripe.accountSessions.create({
        account: stripeConnectAccountId,
        components: {
          account_onboarding: {
            enabled: true,
            features: { external_account_collection: true }
          }
        }
      })

      logger.info('Stripe account session created successfully.')

      // TODO: Uncomment this when we implement a way to give the user a _choice_ of updating their
      // phone number outside of the profile page. We shouldn't do this automatically.
      // if (phoneNumber) {
      //   try {
      //     await profileRepository.updateUserPhoneNumber(userId, phoneNumber)
      //   } catch (error) {
      //     logger.error(`Error updating user ${userId} with phone number ${obfuscateSensitiveData(phoneNumber)}: ${error}`)
      //   }
      // }

      return {
        secret: accountSession.client_secret,
        expiresAt: date(accountSession.expires_at).dateTime.toISO()
      }
    }
  },

  /**
   * Creates a Stripe payment intent for a user where a hold is placed on the funds.
   * @param userId - The ID of the user.
   * @param amount - The amount to be held.
   * @param currency - The currency of the amount.
   * @param metadata - Additional metadata for the payment intent.
   * @param paymentMethodId - The ID of the payment method (optional).
   * @returns A promise that resolves to the Stripe payment intent object.
   */
  createPaymentIntentForHold: async (
    userId: number,
    amount: number,
    currency: string,
    metadata: Record<string, string>,
    paymentMethodId?: string
  ) => {
    const customer = (await stripeHelper.getStripeCustomer(userId)) ?? (await stripeHelper.createStripeCustomer(userId))

    if (!customer) {
      logger.error(`No Stripe customer found for user: ${userId}`)
      throw new Error('Customer not found')
    }

    try {
      logger.info(`Attempting to create payment intent for hold for user: ${userId} with amount: ${currency} ${amount}`)

      const paymentIntent = await stripe.paymentIntents.create({
        customer: customer.id,
        amount: stripeHelper.convertAmountToCents(amount),
        currency: currency,
        metadata: stripeHelper.validateMetadata(metadata),
        capture_method: 'manual',
        setup_future_usage: 'off_session',
        payment_method: paymentMethodId ?? undefined,
        confirm: paymentMethodId ? true : undefined,
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never'
        }
      })

      logger.info(
        `Payment intent successfully created for hold for user: ${userId} with amount: ${currency} ${amount}. Payment intent status: ${paymentIntent.status}`
      )

      return paymentIntent
    } catch (error) {
      logger.error('Error creating payment intent for hold', error)
      throw stripeHelper.handleStripeError(error, stripeErrors.unableToCreatePaymentIntent.build())
    }
  },

  /**
   * Creates a Stripe payment intent for a user where a charge is made immediately.
   * @param userId - The ID of the user.
   * @param paymentMethodId - The ID of the payment method.
   * @param amount - The amount to be charged.
   * @param currency - The currency of the amount.
   * @param metadata - Additional metadata for the payment intent.
   * @returns A promise that resolves to the Stripe payment intent object.
   */
  createPaymentIntentForImmediateCharge: async (
    userId: number,
    paymentMethodId: string,
    amount: number,
    currency: string,
    metadata: Record<string, string>
  ) => {
    const customer = (await stripeHelper.getStripeCustomer(userId)) ?? (await stripeHelper.createStripeCustomer(userId))

    if (!customer) {
      logger.error('No Stripe customer found for user: ', userId)
      throw new Error('Customer not found')
    }

    try {
      logger.info(
        `Attempting to create payment intent for immediate charge for user: ${userId} with amount: ${currency} ${amount}`
      )

      const paymentIntent = await stripe.paymentIntents.create({
        customer: customer.id,
        payment_method: paymentMethodId,
        amount: stripeHelper.convertAmountToCents(amount),
        currency: currency,
        metadata: stripeHelper.validateMetadata(metadata),
        return_url: `${process.env.WEB_APP_BASE_URL}/cart/success?session_id={CHECKOUT_SESSION_ID}`,
        off_session: true,
        confirm: true
      })

      logger.info(
        `Payment intent created for immediate charge for user: ${userId} with amount: ${currency} ${amount}. Payment intent status: ${paymentIntent.status}`
      )

      return paymentIntent
    } catch (error) {
      logger.error(`Error creating payment intent for immediate charge: ${error}`)

      throw error
    }
  },

  /**
   * Updates a Stripe payment intent with a transfer group.
   * @param paymentIntentId - The ID of the payment intent.
   * @param transferGroup - The ID of the transfer group.
   * @returns A promise that resolves to the Stripe payment intent object.
   */
  updatePaymentIntentWithTransferGroup: async (paymentIntentId: string, transferGroup: string) => {
    logger.info(
      `Attempting to update payment intent with transfer group: ${transferGroup} for payment intent: ${obfuscateStripeData(paymentIntentId)}`
    )

    try {
      const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
        transfer_group: transferGroup
      })

      return paymentIntent
    } catch (error) {
      logger.error(
        `Error updating payment intent with transfer group: ${transferGroup} for payment intent: ${obfuscateStripeData(paymentIntentId)}`,
        error
      )

      throw error
    }
  },

  /**
   * Updates a Stripe payment intent with a payment method.
   * @param paymentIntentId - The ID of the payment intent.
   * @param paymentMethodId - The ID of the payment method.
   * @returns A promise that resolves to the Stripe payment intent object.
   */
  updatePaymentIntentWithPaymentMethod: async (paymentIntentId: string, paymentMethodId: string) => {
    logger.info(
      `Attempting to update payment intent with payment method: ${obfuscateStripeData(paymentMethodId)} for payment intent: ${obfuscateStripeData(paymentIntentId)}`
    )

    try {
      const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
        payment_method: paymentMethodId
      })

      return paymentIntent
    } catch (error) {
      logger.error(
        `Error updating payment intent with payment method: ${obfuscateStripeData(paymentMethodId)} for payment intent: ${obfuscateStripeData(paymentIntentId)}`,
        error
      )

      throw error
    }
  },

  /**
   * Confirms a Stripe payment intent.
   * @param paymentIntentId - The ID of the payment intent.
   * @returns A promise that resolves to the Stripe payment intent object.
   */
  confirmPaymentIntent: async (paymentIntentId: string) => {
    logger.info(`Attempting to confirm payment intent: ${obfuscateStripeData(paymentIntentId)}`)

    try {
      const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId)

      return paymentIntent
    } catch (error) {
      logger.error(`Error confirming payment intent ${obfuscateStripeData(paymentIntentId)}`, error)

      throw error
    }
  },

  /**
   * Captures funds from a payment intent for a hold.
   * This captures the total authorised amount by default but can be set to capture a partial amount.
   * @param paymentIntentId - The ID of the payment intent.
   * @param amountToCapture - The amount to capture.
   * @returns A promise that resolves to the Stripe payment intent object.
   */
  captureFunds: async (paymentIntentId: string, amountToCapture?: number) => {
    logger.info(
      `Attempting to capture funds for payment intent ${obfuscateStripeData(paymentIntentId)} with amount to capture $${amountToCapture}`
    )

    try {
      const existingPaymentIntent = await stripeHelper.getStripePaymentIntent(paymentIntentId)
      const convertedAmountToCapture = amountToCapture
        ? stripeHelper.convertAmountToCents(amountToCapture)
        : existingPaymentIntent?.amount

      if (!existingPaymentIntent) {
        logger.error(`Payment intent not found: ${obfuscateStripeData(paymentIntentId)}`)
        throw stripeErrors.unableToRetrievePaymentIntent.build(paymentIntentId)
      } else {
        const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId, {
          amount_to_capture: convertedAmountToCapture
        })

        logger.info(`Funds captured successfully for payment intent ${obfuscateStripeData(paymentIntentId)}`)

        return paymentIntent
      }
    } catch (error) {
      logger.error(`Error capturing funds for payment intent ${obfuscateStripeData(paymentIntentId)}`, error)

      return null
    }
  },

  /**
   * Releases a hold on funds from a payment intent.
   * @param paymentIntentId - The ID of the payment intent.
   * @returns A promise that resolves to the Stripe payment intent object.
   */
  releaseFunds: async (paymentIntentId: string) => {
    logger.info(`Attempting to release funds for payment intent ${obfuscateStripeData(paymentIntentId)}`)

    try {
      const existingPaymentIntent = await stripeHelper.getStripePaymentIntent(paymentIntentId)

      if (!existingPaymentIntent) {
        logger.error(`Payment intent not found: ${obfuscateStripeData(paymentIntentId)}`)
        throw stripeErrors.unableToRetrievePaymentIntent.build(paymentIntentId)
      }

      const invalidStatuses: Stripe.PaymentIntent.Status[] = [
        StripePaymentIntentStatus.RequiresPaymentMethod,
        StripePaymentIntentStatus.RequiresConfirmation,
        StripePaymentIntentStatus.RequiresAction,
        StripePaymentIntentStatus.Canceled
      ]

      if (invalidStatuses.includes(existingPaymentIntent.status)) {
        if (existingPaymentIntent.status === StripePaymentIntentStatus.Canceled) {
          logger.info(
            `Payment intent ${obfuscateStripeData(paymentIntentId)} is already canceled. No need to release funds.`
          )

          return null
        } else {
          logger.error(`Cannot release funds. Payment intent is in ${existingPaymentIntent.status} status.`)
          email.admin.sendAdminAlert(
            'Stripe: Cannot release funds for payment intent',
            `Cannot release funds for payment intent ${obfuscateStripeData(paymentIntentId)} because it is in ${existingPaymentIntent.status} status.`
          )

          // throw new Error(`Cannot release funds. Payment intent is in ${existingPaymentIntent.status} status.`)
        }
      } else {
        const paymentIntent = await stripe.paymentIntents.cancel(paymentIntentId)

        logger.info(`Funds released successfully for payment intent ${obfuscateStripeData(paymentIntentId)}`)

        return paymentIntent
      }
    } catch (error) {
      logger.error(`Error releasing funds for payment intent ${obfuscateStripeData(paymentIntentId)}`, error)
      throw new Error(`Error releasing funds for payment intent ${obfuscateStripeData(paymentIntentId)}: `)
    }
  },

  /**
   * Creates a Stripe transfer for a user.
   * @param amount - The amount to be transferred.
   * @param currency - The currency of the amount.
   * @param destination - The ID of the destination account.
   * @param transferGroup - The ID of the transfer group.
   * @returns A promise that resolves to the Stripe transfer object.
   */
  createTransfer: async (
    amount: number,
    currency: string,
    destination: string,
    transferGroup: string,
    metadata: Record<string, string>
  ) => {
    logger.info(
      `Attempting to create transfer for amount: $${amount} with currency: ${currency} to destination: ${destination} with transfer group: ${transferGroup} and metadata: ${metadata}`
    )

    try {
      logger.info(
        `Creating transfer for amount: ${amount} with currency: ${currency} to destination: ${destination} with transfer group: ${transferGroup} and metadata: ${metadata}`
      )

      const transfer = await stripe.transfers.create({
        amount: stripeHelper.convertAmountToCents(amount),
        currency: currency,
        destination: destination,
        transfer_group: transferGroup,
        metadata: stripeHelper.validateMetadata(metadata)
      })

      logger.info(`Transfer created successfully: ${transfer.id}`)

      return transfer
    } catch (error) {
      if (error instanceof Stripe.errors.StripeInvalidRequestError) {
        logger.error(`Invalid request error creating transfer: ${error.message ?? error.code}`)

        if (error.code === StripeErrorCodes.BalanceInsufficient) {
          try {
            email.admin.sendAdminAlert(
              'Stripe: Insufficient balance',
              `Insufficient balance on Stripe account for transfer: ${error.message ?? error.code}`
            )
          } catch (error) {
            logger.error(`Error sending admin alert: ${error}`)
          }
        }
      }

      logger.error('Error creating transfer', error)
      throw error
    }
  },

  /**
   * Gets a Stripe transfer by ID.
   * @param transferId - The ID of the transfer.
   * @returns A promise that resolves to the Stripe transfer object.
   */
  getTransfer: async (transferId: string) => {
    logger.info(`Attempting to retrieve transfer with ID: ${transferId}`)

    try {
      const transfer = await stripe.transfers.retrieve(transferId)

      logger.info(`Transfer retrieved successfully: ${transfer.id}`)

      return transfer
    } catch (error) {
      logger.error(`Error retrieving transfer ${transferId}`, error)
      throw error
    }
  },

  /**
   * Creates a Stripe payout for the system to transfer funds from Hourrier's Stripe account to the Hourrier's bank account.
   * @param amount - The amount to be paid out.
   * @param currency - The currency of the amount.
   * @returns A promise that resolves to the Stripe payout object.
   */
  createPayout: async (amount: number, currency: string) => {
    logger.info(`Attempting to create payout for amount: $${amount} with currency: ${currency}`)

    try {
      const payout = await stripe.payouts.create({
        amount: amount,
        currency: currency
      })

      logger.info(`Payout created successfully: ${payout.id}`)

      return payout
    } catch (error) {
      logger.error('Error creating payout', error)
      throw error
    }
  },

  /**
   * Creates a Stripe refund for a payment intent.
   * @param paymentIntentId - The ID of the payment intent.
   * @param amount - The amount to be refunded.
   * @returns A promise that resolves to the Stripe refund object.
   */
  createRefund: async (
    paymentIntentId: string,
    amount: number,
    userId: number,
    metadata: Record<string, string>
  ): Promise<Stripe.Refund | null> => {
    const isUserAllowedToRequestRefund = await stripeHelper.canUserRequestRefund(paymentIntentId, userId)

    if (isUserAllowedToRequestRefund) {
      try {
        logger.info(
          `Attempting to create refund for payment intent: ${obfuscateStripeData(paymentIntentId)} with amount: ${amount}`
        )

        const refund = await stripe.refunds.create({
          payment_intent: paymentIntentId,
          amount: stripeHelper.convertAmountToCents(amount),
          metadata: stripeHelper.validateMetadata(metadata)
        })

        logger.info(`Refund created successfully: ${refund.id}`)

        return refund
      } catch (error) {
        if (error instanceof Stripe.errors.StripeInvalidRequestError) {
          let refund: Stripe.Refund | null = null

          switch (error.code) {
            case StripeErrorCodes.AmountTooLarge:
              logger.error(`Error creating refund: Amount too large for refund: ${error.message ?? error.code}`)
              throw error

            case StripeErrorCodes.ChargeAlreadyRefunded:
              logger.error(`Error creating refund: Charge already refunded: ${error.message ?? error.code}`)

              refund = (await stripeHelper.getRefundsByPaymentIntentId(paymentIntentId))?.data[0]

              logger.info(`Retrieved refund with ID: ${refund?.id}`)

              return refund

            default:
              logger.error(`Error creating refund: Unknown error: ${error.message ?? error.code}`)
              throw error
          }
        } else {
          logger.error(`Error creating refund: ${error}`)
          throw error
        }
      }
    } else {
      logger.error(
        `User is not allowed to request a refund for this payment intent: ${obfuscateStripeData(paymentIntentId)}`
      )

      throw new Error(
        `User is not allowed to request a refund for this payment intent: ${obfuscateStripeData(paymentIntentId)}`
      )
    }
  },

  /**
   * Gets a Stripe refund by ID.
   * @param refundId - The ID of the refund.
   * @returns A promise that resolves to the Stripe refund object.
   */
  getRefundByRefundId: async (refundId: string) => {
    logger.info(`Attempting to retrieve refund by ID: ${obfuscateStripeData(refundId)}`)

    try {
      const refund = await stripe.refunds.retrieve(refundId)

      logger.info(`Retrieved refund by ID: ${obfuscateStripeData(refundId)}`)

      return refund
    } catch (error) {
      logger.error(`Error retrieving refund ${obfuscateStripeData(refundId)}`, error)
      throw error
    }
  },

  /**
   * Gets refunds associated with a Stripe payment intent.
   * @param paymentIntentId - The ID of the payment intent.
   * @returns A promise that resolves to the Stripe refund object.
   */
  getRefundsByPaymentIntentId: async (paymentIntentId: string) => {
    logger.info(`Attempting to retrieve refunds for payment intent: ${obfuscateStripeData(paymentIntentId)}`)

    try {
      const refunds = await stripe.refunds.list({
        payment_intent: paymentIntentId
      })

      logger.info(
        `Retrieved ${refunds.data.length} refunds for payment intent: ${obfuscateStripeData(paymentIntentId)}`
      )

      return refunds
    } catch (error) {
      logger.error(`Error retrieving refunds for payment intent ${obfuscateStripeData(paymentIntentId)}`, error)
      throw error
    }
  },

  /**
   * ------------------------------------------------------------------------------------------------
   * Helper functions
   * ------------------------------------------------------------------------------------------------
   */

  /**
   * Converts an amount to cents, which is the unit of Stripe.
   * @param amount - The amount to be converted.
   * @returns The amount in cents.
   */
  convertAmountToCents: (amount: number) => {
    return Math.round(Number(amount.toFixed(2)) * 100)
  },

  /**
   * Converts a Stripe amount that is in cents to dollars.
   * @param amount - The amount to be converted.
   * @returns The amount in dollars.
   */
  convertStripeAmountToDollars: (amount: number) => {
    return Number((amount / 100).toFixed(2))
  },

  /**
   * Checks if the current user can request a refund for a payment intent.
   * @param userId - The ID of the user.
   * @param paymentIntentId - The ID of the payment intent.
   * @returns A promise that resolves to true if the user can request a refund, false otherwise.
   */
  canUserRequestRefund: async (paymentIntentId: string, userId: number) => {
    logger.info(
      `Checking if user can request refund for payment intent: ${obfuscateStripeData(paymentIntentId)} with userId: ${userId}`
    )

    try {
      const rolesOfUser = await rolesRepository.getRolesOfUser(userId)
      const paymentIntent = await stripeHelper.getStripePaymentIntent(paymentIntentId)
      const currentStripeCustomer = await stripeHelper.getStripeCustomer(userId)
      const paymentIntentCustomerId = paymentIntent?.customer
      const isCurrentUserAdmin = rolesOfUser.includes(Roles.Admin)
      const isPaymentIntentCustomerSameAsCurrentUser = paymentIntentCustomerId === currentStripeCustomer?.id

      logger.debug(`paymentIntentCustomerId: ${paymentIntentCustomerId}`)
      logger.debug(`currentStripeCustomerId: ${currentStripeCustomer?.id}`)
      logger.debug(`isCurrentUserAdmin: ${isCurrentUserAdmin}`)
      logger.debug(`isPaymentIntentCustomerSameAsCurrentUser: ${isPaymentIntentCustomerSameAsCurrentUser}`)

      if (isCurrentUserAdmin || isPaymentIntentCustomerSameAsCurrentUser) {
        logger.info('User is allowed to request a refund')

        return true
      } else {
        logger.info('User is not allowed to request a refund')

        return false
      }
    } catch (error) {
      logger.error(`Error checking if user can request refund: ${error}`)

      return false
    }
  },

  validateMetadata: (metadata: Record<string, string>) => {
    const validatedMetadata: Record<string, string> = {}

    for (const [key, value] of Object.entries(metadata)) {
      logger.debug(`Validating metadata for key: ${key} with value: ${value}`)

      if (value.length > 500) {
        validatedMetadata[key] = value.substring(0, 490) + ' [...]'
      } else {
        validatedMetadata[key] = value
      }
    }

    return validatedMetadata
  },

  /**
   * Checks if a user's government-issued ID has been verified through Stripe Connect.
   * @param userId - The ID of the user.
   * @returns A promise that resolves to an object containing verification status and details.
   */
  checkIdVerificationStatus: async (userId: number) => {
    logger.info(`Checking ID Verification Status of user (${userId})`)

    let verificationStatusResponse: IDVerificationStatus = {
      isVerified: false,
      status: undefined,
      details: undefined
    }

    try {
      const account = await stripeHelper.getStripeConnectAccount(userId)

      if (!account) {
        logger.error('Stripe connect account not found for user:', userId)

        return verificationStatusResponse
      } else {
        // For individual accounts
        if (account.type === 'express' || account.type === 'standard' || account.type === 'custom') {
          if (account.individual) {
            verificationStatusResponse = {
              isVerified: account.individual.verification?.status === 'verified',
              status: account.individual.verification?.status as StripeIdVerificationStatus,
              details: account.individual.verification?.details
            }
          }
        } else if (account.company && account.requirements) {
          logger.warn('This account was set up as a company account rather than an individual account')

          const pendingRequirements = account.requirements.currently_due || []

          // Check if there are any pending document verification requirements
          const documentRequirements = pendingRequirements.filter(
            (requirement) => requirement.includes('verification.document') || requirement.includes('document')
          )

          // If no document requirements are pending, consider it verified
          if (documentRequirements.length === 0) {
            verificationStatusResponse = {
              isVerified: true,
              status: 'verified',
              details: 'No document verification requirements are pending'
            }
          }
        }

        logger.info(
          `ID Verification Status of user (${userId}): ${verificationStatusResponse?.status} - ${verificationStatusResponse?.details} - ${verificationStatusResponse?.isVerified}`
        )
        logger.debug(
          `Individual account info: ${JSON.stringify(account.individual)} | Company account info: ${JSON.stringify(account.company)} | Requirements: ${JSON.stringify(account.requirements)}`
        )

        return verificationStatusResponse
      }
    } catch (error) {
      logger.error(`Error checking ID verification status of user (${userId}): ${error}`)

      return verificationStatusResponse
    }
  },

  /**
   * Gets the Stripe processing fee for a payment intent.
   * @param paymentIntentId - The ID of the payment intent.
   * @returns A promise that resolves to the Stripe processing fee.
   */
  getStripeProcessingFee: async (paymentIntentId: string): Promise<number | null> => {
    logger.info(`Attempting to get Stripe processing fee for payment intent: ${obfuscateStripeData(paymentIntentId)}`)

    try {
      const paymentIntent = await stripeHelper.getStripePaymentIntent(paymentIntentId)

      if (!paymentIntent) {
        logger.error(`Payment intent not found: ${obfuscateStripeData(paymentIntentId)}`)

        return null
      }

      // List all charges for the payment intent
      const charges = await stripe.charges.list({
        payment_intent: paymentIntentId
      })

      let totalFee = 0

      // Process each charge to get fees
      for (const charge of charges.data) {
        const balanceTransaction = await stripe.balanceTransactions.retrieve(charge.balance_transaction as string)
        totalFee += balanceTransaction.fee
        logger.debug(`Processed fee ${balanceTransaction.fee} for charge ${charge.id}`)
      }

      logger.info(`Total processing fee for payment intent ${obfuscateStripeData(paymentIntentId)}: ${totalFee}`)

      return totalFee
    } catch (error) {
      logger.error(`Error retrieving Stripe fee for payment intent ${obfuscateStripeData(paymentIntentId)}`, error)

      return null
    }
  },

  /**
   * Handles a Stripe error.
   * @param error - The Stripe error.
   */
  handleStripeError: (error: unknown, errorResponse?: QuickErrorResponse) => {
    logger.error('Processing Stripe error', error)

    if (error instanceof Stripe.errors.StripeError) {
      switch (error.code) {
        case StripeErrorCodes.CardDeclined:
          switch (error.decline_code) {
            case StripeDeclineCodes.InsufficientFunds:
              throw stripeErrors.insufficientFunds.build()

            default:
              if (errorResponse) {
                throw errorResponse
              } else {
                throw stripeErrors.cardDeclined.build()
              }
          }

        default:
          logger.error('Unhandled Stripe error', error)

          if (errorResponse) {
            throw errorResponse
          } else {
            throw error
          }
      }
    } else {
      logger.error('Unknown Stripe error', error)

      if (errorResponse) {
        throw errorResponse
      } else {
        throw error
      }
    }
  }
}
