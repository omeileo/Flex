import { zodd } from '../../../../shared/functions/zod.functions'

const verificationCodeField = zodd
  .string()
  .trim()
  .toUpperCase()
  .length(6)
  .regex(/^[A-Z0-9]{6}$/)
  .openapi({
    example: 'XC2DAS',
    description: 'Six-character verification code from the signup email'
  })

/**
 * Long token from web verification links.
 */
export const VerifyEmailWithTokenRequestBody = zodd
  .object({
    verificationToken: zodd.string().min(32).openapi({
      example: '48a1d25a36497e9cc232b277917686fd2c0429af970a7edf1c90cdf0af360597',
      description: "The verification token sent to the user's email address"
    })
  })
  .strict()

/**
 * Short code with email (mobile manual entry).
 */
export const VerifyEmailWithCodeAndEmailRequestBody = zodd
  .object({
    email: zodd.string().email().openapi({
      example: 'user@example.com',
      description: 'Email address used at sign-up'
    }),
    code: verificationCodeField
  })
  .strict()

/**
 * Short code only (globally unique per active token).
 */
export const VerifyEmailWithCodeRequestBody = zodd
  .object({
    code: verificationCodeField
  })
  .strict()

/**
 * Union body for verify-email: long token OR short code (+ optional email).
 */
export const VerifyEmailRequestBody = zodd
  .union([VerifyEmailWithTokenRequestBody, VerifyEmailWithCodeAndEmailRequestBody, VerifyEmailWithCodeRequestBody])
  .openapi({
    description: 'Verify with long token, or six-character code with optional email'
  })

export const VerifyEmailResendRequestBody = zodd
  .object({
    email: zodd.string().email().openapi({
      example: 'no-reply@appshop.biz',
      description: 'The email address to resend the verification token to'
    })
  })
  .required()

export const IncommingVerifyEmailRequest = zodd.object({
  body: VerifyEmailRequestBody
})

export const IncommingVerifyEmailResendRequest = zodd.object({
  body: VerifyEmailResendRequestBody
})

export const VerifyEmailResponseBody = zodd.object({
  id: zodd.number().openapi({
    example: 83,
    description: 'User ID'
  }),
  email: zodd.string().email().openapi({
    example: 'johndoe@gmail.com',
    description: 'User email address'
  }),
  status: zodd.object({
    id: zodd.number().openapi({
      example: 1,
      description: 'Status ID'
    }),
    type_id: zodd.number().openapi({
      example: 1,
      description: 'Type ID of the status'
    }),
    name: zodd.string().openapi({
      example: 'active',
      description: 'Name of the status'
    }),
    description: zodd.string().openapi({
      example: 'User account is active and in good standing',
      description: 'Description of the status'
    }),
    display_name: zodd.string().openapi({
      example: 'Active',
      description: 'Display name of the status'
    })
  })
})
