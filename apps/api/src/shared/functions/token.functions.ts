import crypto from 'crypto'

import { env } from './envConfig'

/**
 * A collection of functions related to token generation and manipulation.
 */
export const token = {
  emailVerificationToken: {
    /**
     * Generates a random email verification token.
     * @returns {string} The generated token.
     */
    generate: function () {
      return crypto.randomBytes(32).toString('hex')
    },

    /**
     * Create the expiry date for an email verification token from the current time.
     * @returns {Date} The expiry date.
     */
    createExpiryDateFromNow: function () {
      return new Date(Date.now() + env.VERIFY_EMAIL_TOKEN_EXPIRY)
    },

    /**
     * Check if the token is expired
     * @param expiryDate
     * @returns {boolean}
     */
    isTokenExpired: function (expiryDate: Date) {
      return new Date(expiryDate) < new Date()
    }
  },

  passwordResetToken: {
    /**
     * Generates a random password reset token.
     * @returns {string} The generated token.
     */
    generate: function () {
      return crypto.randomBytes(32).toString('hex')
    },

    /**
     * Create the expiry date for an password reset token from the current time.
     * @returns {Date} The expiry date.
     */
    createExpiryDateFromNow: function () {
      return new Date(Date.now() + env.PASSWORD_RESET_TOKEN_EXPIRY)
    },

    /**
     * Check if the token is expired
     * @param expiryDate
     * @returns {boolean}
     */
    isTokenExpired: function (expiryDate: Date) {
      return new Date(expiryDate) < new Date()
    }
  }
}
