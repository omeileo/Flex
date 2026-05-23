import { StatusCodes } from 'http-status-codes'

import {
  APIDateTimeSchema,
  CorrelationIdSchema,
  StatusSchema
} from '../../../shared/functions/http/response/errorResponse.model'
import { quickErrorResponse } from '../../../shared/functions/http/response/response.function'
import { zodd } from '../../../shared/functions/zod.functions'

/**
 * Dictionary of Stripe errors.
 */
export const stripeErrors = {
  unableToRetrievePaymentIntent: {
    build: (paymentIntentId: string) => {
      return quickErrorResponse(
        StatusCodes.NOT_FOUND,
        'Not Found',
        'Unable to retrieve Stripe payment intent.',
        [
          {
            field: 'paymentIntentId',
            issue: 'notFound',
            description: `The provided payment intent ID (${paymentIntentId}) does not exist or could not be retrieved.`
          }
        ],
        `The provided payment intent ID (${paymentIntentId}) does not exist or could not be retrieved. Please check the ID and try again.`
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.NotFound,
      error: zodd.string().openapi({ example: 'Not Found', description: 'Error' }),
      message: zodd.string().openapi({
        example: 'Unable to retrieve Stripe payment intent.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/payments/payment-intents/retrieve',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'paymentIntentId',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'The provided payment intent ID (1) does not exist or could not be retrieved.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'notFound',
            description: 'The issue or error type'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example:
          'The provided payment intent ID (1) does not exist or could not be retrieved. Please check the ID and try again.',
        description: 'User-friendly error message'
      })
    })
  },

  unableToCreatePaymentIntent: {
    build: () => {
      return quickErrorResponse(
        StatusCodes.FAILED_DEPENDENCY,
        'Failed Dependency',
        'Unable to create payment intent for hold.',
        [
          {
            field: 'paymentIntent',
            issue: 'creationFailed',
            description:
              'The payment intent for hold could not be created. This may be due to insufficient funds or an issue with the payment method.'
          }
        ],
        'Unable to create payment intent for hold. Please check your payment method and try again.'
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.FailedDependency,
      error: zodd.string().openapi({ example: 'Failed Dependency', description: 'Error' }),
      message: zodd.string().openapi({
        example: 'Unable to create payment intent for hold.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/payments/payment-intents/create-hold',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'paymentIntent',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example:
              'The payment intent for hold could not be created. This may be due to insufficient funds or an issue with the payment method.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'creationFailed',
            description: 'The issue or error type'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'Unable to create payment intent for hold. Please check your payment method and try again.',
        description: 'User-friendly error message'
      })
    })
  },

  unableToCreateSetupIntent: {
    build: () => {
      return quickErrorResponse(
        StatusCodes.FAILED_DEPENDENCY,
        'Failed Dependency',
        'Unable to create setup intent.',
        [
          {
            field: 'setupIntent',
            issue: 'creationFailed',
            description:
              'The setup intent could not be created. This may be due to an issue with the payment method or Stripe configuration.'
          }
        ],
        'Unable to create setup intent. Please try again or contact support.'
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.FailedDependency,
      error: zodd.string().openapi({ example: 'Failed Dependency', description: 'Error' }),
      message: zodd.string().openapi({
        example: 'Unable to create setup intent.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/payments/setup-intent',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'setupIntent',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example:
              'The setup intent could not be created. This may be due to an issue with the payment method or Stripe configuration.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'creationFailed',
            description: 'The issue or error type'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'Unable to create setup intent. Please try again or contact support.',
        description: 'User-friendly error message'
      })
    })
  },

  unableToCreateStripeConnectAccount: {
    build: () => {
      return quickErrorResponse(
        StatusCodes.FAILED_DEPENDENCY,
        'Failed Dependency',
        'Unable to create Stripe Connect account.',
        [
          {
            field: 'stripeConnectAccount',
            issue: 'creationFailed',
            description:
              'The Stripe Connect account could not be created. This may be due to missing or invalid information.'
          }
        ],
        'Unable to create Stripe Connect account. Please try again or contact support.'
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.FailedDependency,
      error: zodd.string().openapi({ example: 'Failed Dependency', description: 'Error' }),
      message: zodd.string().openapi({
        example: 'Unable to create Stripe Connect account.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/payments/stripe-connect-account',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'stripeConnectAccount',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example:
              'The Stripe Connect account could not be created. This may be due to missing or invalid information.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'creationFailed',
            description: 'The issue or error type'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'Unable to create Stripe Connect account. Please try again or contact support.',
        description: 'User-friendly error message'
      })
    })
  },

  unableToCreateCustomerSession: {
    build: () => {
      return quickErrorResponse(
        StatusCodes.FAILED_DEPENDENCY,
        'Failed Dependency',
        'Unable to create customer session.',
        [
          {
            field: 'customerSession',
            issue: 'creationFailed',
            description:
              'The customer session could not be created. This may be due to an issue with the Stripe integration.'
          }
        ],
        'Unable to create customer session. Please try again or contact support.'
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.FailedDependency,
      error: zodd.string().openapi({ example: 'Failed Dependency', description: 'Error' }),
      message: zodd.string().openapi({
        example: 'Unable to create customer session.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/payments/customer-session',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'customerSession',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example:
              'The customer session could not be created. This may be due to an issue with the Stripe integration.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'creationFailed',
            description: 'The issue or error type'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'Unable to create customer session. Please try again or contact support.',
        description: 'User-friendly error message'
      })
    })
  },

  stripeConnectAccountNotFound: {
    build: () =>
      quickErrorResponse(
        StatusCodes.NOT_FOUND,
        'Not Found',
        'Unable to find Stripe Connect account.',
        [
          {
            field: 'stripeConnectAccount',
            issue: 'notFound',
            description:
              'The Stripe Connect account for the user could not be found. This may be due to an incomplete onboarding process or an issue with the account.'
          }
        ],
        'Unable to find Stripe Connect account. Please ensure you have completed the onboarding process.'
      ),

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.NotFound,
      error: zodd.string().openapi({ example: 'Not Found', description: 'Error' }),
      message: zodd.string().openapi({
        example: 'Stripe Connect account not found.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/payments/stripe-connect-account',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'stripeConnectAccount',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example:
              'The Stripe Connect account for the user could not be found. This may be due to an incomplete onboarding process or an issue with the account.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'notFound',
            description: 'The issue or error type'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'Unable to find Stripe Connect account. Please ensure the user has completed the onboarding process.',
        description: 'User-friendly error message'
      })
    })
  },

  stripeConnectAccountNotOnboarded: {
    build: () => {
      return quickErrorResponse(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'Stripe Connect account not onboarded.',
        [
          {
            field: 'stripeConnectAccount',
            issue: 'notOnboarded',
            description:
              'The Stripe Connect account has not completed the onboarding process. Please complete onboarding before proceeding.'
          }
        ],
        'Please complete the Stripe Connect onboarding process before proceeding.'
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.Unauthorized,
      error: zodd.string().openapi({ example: 'Unauthorized', description: 'Error' }),
      message: zodd.string().openapi({
        example: 'Stripe Connect account not onboarded.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/payments/stripe-connect-account',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'stripeConnectAccount',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example:
              'The Stripe Connect account has not completed the onboarding process. Please complete onboarding before proceeding.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'notOnboarded',
            description: 'The issue or error type'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'Please complete the Stripe Connect onboarding process before proceeding.',
        description: 'User-friendly error message'
      })
    })
  },

  couldNotFindPaymentMethod: {
    build: (userId: string) => {
      return quickErrorResponse(
        StatusCodes.NOT_FOUND,
        'Not Found',
        'No payment method found.',
        [
          {
            field: 'paymentMethod',
            issue: 'notFound',
            description: `No valid payment method was found for user ${userId}.`
          }
        ],
        'No payment method found. Please add a payment method and try again.'
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.NotFound,
      error: zodd.string().openapi({ example: 'Not Found', description: 'Error' }),
      message: zodd.string().openapi({
        example: 'No payment method found.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/payments/payment-methods',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'paymentMethod',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'No valid payment method was found for user 4.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'notFound',
            description: 'The issue or error type'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'No payment method found. Please add a payment method and try again.',
        description: 'User-friendly error message'
      })
    })
  },

  unableToUpdatePaymentIntent: {
    build: (paymentIntentId: string) => {
      return quickErrorResponse(
        StatusCodes.BAD_REQUEST,
        'Bad Request',
        'Unable to update payment intent.',
        [
          {
            field: 'paymentIntent',
            issue: 'updateFailed',
            description: `The payment intent (${paymentIntentId}) could not be updated with the payment method.`
          }
        ],
        'Unable to update payment. Please try again or contact support if the issue persists.'
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.BadRequest,
      error: zodd.string().openapi({ example: 'Bad Request', description: 'Error' }),
      message: zodd.string().openapi({
        example: 'Unable to update payment intent.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/payments/payment-intents/update',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'paymentIntent',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'The payment intent could not be updated with the payment method.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'updateFailed',
            description: 'The issue or error type'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'Unable to update payment. Please try again or contact support if the issue persists.',
        description: 'User-friendly error message'
      })
    })
  },

  cardDeclined: {
    build: () => {
      return quickErrorResponse(
        StatusCodes.BAD_REQUEST,
        'Bad Request',
        'Card was declined.',
        [
          {
            field: 'paymentIntent',
            issue: 'cardDeclined',
            description: 'The card used for this payment was declined by the issuer.'
          }
        ],
        'There was an error while processing your payment. Please check your payment method and try again. If the problem persists, please contact support.'
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.BadRequest,
      error: zodd.string().openapi({ example: 'Bad Request', description: 'Error' }),
      message: zodd.string().openapi({
        example: 'Card was declined.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/payments/payment-intents/create-hold',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'paymentIntent',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'The card used for this payment was declined by the issuer.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'cardDeclined',
            description: 'The issue or error type'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example:
          'There was an error while processing your payment. Please check your payment method and try again. If the problem persists, please contact support.',
        description: 'User-friendly error message'
      })
    })
  },

  insufficientFunds: {
    build: () => {
      return quickErrorResponse(
        StatusCodes.BAD_REQUEST,
        'Bad Request',
        'Insufficient funds.',
        [
          {
            field: 'paymentIntent',
            issue: 'insufficientFunds',
            description: 'The payment intent has insufficient funds.'
          }
        ],
        'There was an error while processing your payment. Please check your payment method and try again. If the problem persists, please contact support.'
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.BadRequest,
      error: zodd.string().openapi({ example: 'Bad Request', description: 'Error' }),
      message: zodd.string().openapi({
        example: 'Insufficient funds.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/payments/payment-intents/create-hold',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'paymentIntent',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'The payment intent has insufficient funds.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'insufficientFunds',
            description: 'The issue or error type'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'Insufficient funds. Please try again with a different payment method.',
        description: 'User-friendly error message'
      })
    })
  }
}
