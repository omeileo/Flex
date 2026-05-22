import { StatusCodes } from 'http-status-codes'

import { APIDateTimeSchema, CorrelationIdSchema, StatusSchema } from '../functions/http/response/errorResponse.model'
import { quickErrorResponse } from '../functions/http/response/response.function'
import { zodd } from '../functions/zod.functions'

type Value = string | number

/**
 * Dictionary of global errors.
 */
export const globalErrors = {
  /**
   * Error for when an entity is not found.
   * @param entity - The entity name. Example: Status
   * @param value - The value of the entity. Example: unverified
   * @returns The error response.
   */
  entityNotFound: {
    build: (entity: string, value?: Value | null) =>
      quickErrorResponse(
        StatusCodes.NOT_FOUND,
        `${entity} Not Found`,
        `The requested ${entity} could not be found.`,
        [
          {
            field: entity,
            description: `The requested ${entity} could not be found ${value ? `: ${value}.` : '.'}`,
            issue: 'not_found'
          }
        ],
        `The requested ${entity} could not be found.`
      ),
    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.NotFound,
      error: zodd.string().openapi({ example: 'Status(unverified) not found' }),
      message: zodd.string().openapi({
        example: 'The unverified for Status could not be found.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/api/v1/user/auth/sign-up',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'Status',
            description: 'The table/entity name related to the error'
          }),
          description: zodd.string().openapi({
            example: 'The Status - unverified could not be found.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'not_found',
            description: 'The issue'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'The Status unverified could not be found.',
        description: 'User-friendly error message'
      })
    })
  },

  /**
   * Error for when a critical system entry is not found.
   * @param entity - The entity name. Example: Status
   * @param value - The value of the entity. Example: unverified
   * @returns The error response.
   */
  criticalSystemEntryNotFound: {
    build: (entity: string, value: Value) =>
      quickErrorResponse(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `${entity}(${value}) not found`,
        `The ${value} for ${entity} could not be found.`,
        [
          {
            field: entity,
            description: `The ${entity} - ${value} could not be found.`,
            issue: 'not_found'
          }
        ],
        'System not fully initialized. Please try again later.'
      ),

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.InternalServerError,
      error: zodd.string().openapi({ example: 'Status(unverified) not found' }),
      message: zodd.string().openapi({
        example: 'The unverified for Status could not be found.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/api/v1/user/auth/sign-up',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'Status',
            description: 'The table/entity name related to the error'
          }),
          description: zodd.string().openapi({
            example: 'The Status - unverified could not be found.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'not_found',
            description: 'The issue'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'System not fully initialized, please try again later.',
        description: 'User-friendly error message'
      })
    })
  },

  /**
   * Error for when an entity could not be created.
   * @param entity - The entity name. Example: User
   * @param value - The value of the entity. Example: xyz@example.com
   * @returns The error response.
   */
  entityNotCreated: {
    build: function (entity: string, value: Value) {
      return quickErrorResponse(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `${entity} Creation Error`,
        `An error occurred while creating the ${entity}: ${value}.`,
        [
          {
            field: entity,
            description: `An error occurred while creating the ${entity}:${value}.`,
            issue: 'creation_error'
          }
        ],
        `An error occurred while creating the ${entity}. Please try again later.`
      )
    },
    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.UnprocessableEntity,
      error: zodd.string().openapi({ example: 'User Creation Error' }),
      message: zodd.string().openapi({
        example: 'An error occurred while creating the User:xyz@example.com.',
        description: 'Error Message'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'User',
            description: 'The table/entity name related to the error'
          }),
          description: zodd.string().openapi({
            example: 'The User - xyz@example.com could created.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'creation_error',
            description: 'The issue'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'An error occurred while creating the User. Please try again later.',
        description: 'User-friendly error message'
      })
    })
  },

  /**
   * Error for when an entity could not be updated.
   *
   * @param entity - The entity name. Exmaple: User
   * @param value - The value of the entity. Example: xyz@example.com
   * @returns The error response.
   */
  entityNotUpdated: {
    build: function (entity: string, value: Value) {
      return quickErrorResponse(
        StatusCodes.NOT_MODIFIED,
        `${entity} Update Error`,
        `An error occurred while updating the ${entity}:${value}.`,
        [
          {
            field: entity,
            description: `An error occurred while updating the ${entity}:${value}.`,
            issue: 'update_error'
          }
        ],
        `An error occurred while updating the ${entity}. Please try again later.`
      )
    },
    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.NOT_MODIFIED,
      error: zodd.string().openapi({ example: 'User Update Error' }),
      message: zodd.string().openapi({
        example: 'An error occurred while updating the User: xyz@example.com.',
        description: 'Error Message'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'User',
            description: 'The table/entity name related to the error'
          }),
          description: zodd.string().openapi({
            example: 'The User - xyz@example.com could not be updated.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'update_error',
            description: 'The issue'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'An error occurred while updating the User. Please try again later.',
        description: 'User-friendly error message'
      })
    })
  },

  /**
   * Error for when an entity could not be deleted.
   *
   * @param entity - The entity name. Exmaple: User
   * @param value - The value of the entity. Example:
   * @returns The error response.
   */
  entityNotDeleted: {
    build: function (entity: string, value: Value) {
      return quickErrorResponse(
        StatusCodes.CONFLICT,
        `${entity} Deletion Error`,
        `An error occurred while deleting the ${entity}: ${value}.`,
        [
          {
            field: entity,
            description: `An error occurred while deleting the ${entity}: ${value}.`,
            issue: 'deletion_error'
          }
        ],
        `An error occurred while deleting the ${entity}. Please try again later.`
      )
    },
    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.Conflict,
      error: zodd.string().openapi({ example: 'Deletion Error' }),
      message: zodd.string().openapi({
        example: 'An error occurred while deleting the entity: value.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/api/v1/entity/delete',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'entity',
            description: 'The table/entity name related to the error'
          }),
          description: zodd.string().openapi({
            example: 'An error occurred while deleting the entity: value.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'deletion_error',
            description: 'The issue'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'An error occurred while deleting the entity. Please try again later.',
        description: 'User-friendly error message'
      })
    })
  },

  missingToken: {
    /**
     * Builds the error response for missing token.
     *
     * @returns The error response object.
     */
    build: () => {
      return quickErrorResponse(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'Token is required.',
        [
          {
            field: 'token',
            description: 'Authentication failed. A valid token is required.',
            issue: 'required'
          }
        ],
        'Please provide a valid token to access this endpoint.'
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.Unauthorized,
      error: zodd.string().openapi({ example: 'Bad Request', description: 'Error Title' }),
      message: zodd.string().openapi({
        example: 'Invalid input data. A token is required.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/api/auth/logout',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'token',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'The token field must be provided and cannot be empty.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'required',
            description: 'The issue or error type'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'Please provide a valid token to access this endpoint.',
        description: 'User-friendly error message'
      })
    })
  },

  invalidToken: {
    /**
     * Builds the error response for invalid or expired token.
     *
     * @returns The error response object.
     */
    build: () => {
      return quickErrorResponse(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'Invalid or expired token.',
        [
          {
            field: 'token',
            description: 'The provided token is invalid or has expired.',
            issue: 'invalid'
          }
        ],
        'The token you provided is invalid or has expired. Please log in again.'
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.Unauthorized,
      error: zodd.string().openapi({ example: 'Unauthorized', description: 'Error Title' }),
      message: zodd.string().openapi({
        example: 'Invalid or expired token.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/api/auth/logout',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'token',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'The provided token is invalid or has expired.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'invalid',
            description: 'The issue or error type'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'The token you provided is invalid or has expired. Please log in again.',
        description: 'User-friendly error message'
      })
    })
  },
  databaseError: {
    databaseConnectionSetupFailed: {
      build: () =>
        quickErrorResponse(
          StatusCodes.SERVICE_UNAVAILABLE,
          'Database Connection Setup Failed',
          'Failed to establish a connection with the database.',
          [
            {
              field: 'Database',
              description: 'Failed to establish a connection with the database.',
              issue: 'connection_failed'
            }
          ],
          'The service is currently unavailable due to a database connection issue. Please try again later.'
        ),
      schema: zodd.object({
        timestamp: APIDateTimeSchema,
        status: StatusSchema.ServiceUnavailable,
        error: zodd.string().openapi({ example: 'Database Connection Setup Failed' }),
        message: zodd.string().openapi({
          example: 'Failed to establish a connection with the database.',
          description: 'Error Message'
        }),
        path: zodd.string().openapi({
          example: '/auth/login',
          description: 'The path of the request where the error occurred.'
        }),
        details: zodd.array(
          zodd.object({
            field: zodd.string().openapi({
              example: 'Database',
              description: 'The component that failed to connect'
            }),
            description: zodd.string().openapi({
              example: 'Failed to establish a connection with the database.',
              description: 'Detailed description of the error'
            }),
            issue: zodd.string().openapi({
              example: 'connection_failed',
              description: 'The issue'
            })
          })
        ),
        correlationId: CorrelationIdSchema,
        userFriendlyMessage: zodd.string().openapi({
          example: 'The service is currently unavailable due to a database connection issue. Please try again later.',
          description: 'User-friendly error message'
        })
      })
    },

    prismaClientKnownRequestError: {
      build: () =>
        quickErrorResponse(
          StatusCodes.BAD_REQUEST,
          'Request Error',
          'A known request error occurred while processing request.',
          [
            {
              field: 'request',
              description: 'Unexpected error occurred while processing request.',
              issue: 'known_request_error'
            }
          ],
          'A system error occurred. Please try again later.'
        ),
      schema: zodd.object({
        timestamp: APIDateTimeSchema,
        status: StatusSchema.BadRequest,
        error: zodd.string().openapi({ example: 'Prisma Client Error: P2002' }),
        message: zodd.string().openapi({
          example: 'A known request error occurred in Prisma Client while processing entity: value.',
          description: 'Error Message'
        }),
        path: zodd.string().openapi({
          example: '/api/v1/entity/action',
          description: 'The path of the request.'
        }),
        details: zodd.array(
          zodd.object({
            field: zodd.string().openapi({
              example: 'entity',
              description: 'The table/entity name related to the error'
            }),
            description: zodd.string().openapi({
              example: 'A known request error with code errorCode occurred while processing entity:value.',
              description: 'Detailed description of the error'
            }),
            issue: zodd.string().openapi({
              example: 'prisma_client_known_request_error',
              description: 'The issue'
            })
          })
        ),
        correlationId: CorrelationIdSchema,
        userFriendlyMessage: zodd.string().openapi({
          example: 'A database error occurred. Please try again later.',
          description: 'User-friendly error message'
        })
      })
    },

    prismaClientUnknownRequestError: {
      build: () =>
        quickErrorResponse(
          StatusCodes.INTERNAL_SERVER_ERROR,
          'Unknown Error',
          'An unknown error occurred.',
          [
            {
              field: 'System',
              description: 'An unknown error occurred in System.',
              issue: 'unknown_request_error'
            }
          ],
          'An unexpected error occurred. Please try again later.'
        ),
      schema: zodd.object({
        timestamp: APIDateTimeSchema,
        status: StatusSchema.InternalServerError,
        error: zodd.string().openapi({ example: 'Unknown Error' }),
        message: zodd.string().openapi({
          example: 'An unknown error occurred.',
          description: 'Error Message'
        }),
        path: zodd.string().openapi({
          example: '/api/endpoint',
          description: 'The path of the request where the error occurred.'
        }),
        details: zodd.array(
          zodd.object({
            field: zodd.string().openapi({
              example: 'System',
              description: 'The component that encountered the error'
            }),
            description: zodd.string().openapi({
              example: 'An unknown error occurred in System Error.',
              description: 'Detailed description of the error'
            }),
            issue: zodd.string().openapi({
              example: 'unknown_request_error',
              description: 'The issue'
            })
          })
        ),
        correlationId: CorrelationIdSchema,
        userFriendlyMessage: zodd.string().openapi({
          example: 'An unexpected error occurred. Please try again later.',
          description: 'User-friendly error message'
        })
      })
    },

    prismaClientRustPanicError: {
      build: () =>
        quickErrorResponse(
          StatusCodes.INTERNAL_SERVER_ERROR,
          'Internal Server Error',
          'An internal server error occurred.',
          [
            {
              field: 'System',
              description: 'A Rust panic occurred in the Request.',
              issue: 'rust_panic_error'
            }
          ],
          'An internal error occurred. Please try again later.'
        ),
      schema: zodd.object({
        timestamp: APIDateTimeSchema,
        status: StatusSchema.InternalServerError,
        error: zodd.string().openapi({ example: 'Internal Server Error' }),
        message: zodd.string().openapi({
          example: 'An internal server error occurred.',
          description: 'Error Message'
        }),
        path: zodd.string().openapi({
          example: '/api/endpoint',
          description: 'The path of the request where the error occurred.'
        }),
        details: zodd.array(
          zodd.object({
            field: zodd.string().openapi({
              example: 'System',
              description: 'The component that encountered the error'
            }),
            description: zodd.string().openapi({
              example: 'A Rust panic occurred in System.',
              description: 'Detailed description of the error'
            }),
            issue: zodd.string().openapi({
              example: 'rust_panic_error',
              description: 'The issue'
            })
          })
        ),
        correlationId: CorrelationIdSchema,
        userFriendlyMessage: zodd.string().openapi({
          example: 'An internal error occurred. Please try again later.',
          description: 'User-friendly error message'
        })
      })
    },

    prismaClientValidationError: {
      build: () =>
        quickErrorResponse(
          StatusCodes.BAD_REQUEST,
          'Validation Error',
          'Validation error occurred.',
          [
            {
              field: 'System',
              description: 'A validation error occurred in Request.',
              issue: 'validation_error'
            }
          ],
          'A validation error occurred. Please check your request and try again.'
        ),
      schema: zodd.object({
        timestamp: APIDateTimeSchema,
        status: StatusSchema.BadRequest,
        error: zodd.string().openapi({ example: 'Validation Error' }),
        message: zodd.string().openapi({
          example: 'Validation error occurred.',
          description: 'Error Message'
        }),
        path: zodd.string().openapi({
          example: '/api/endpoint',
          description: 'The path of the request where the error occurred.'
        }),
        details: zodd.array(
          zodd.object({
            field: zodd.string().openapi({
              example: 'System',
              description: 'The component that encountered the error'
            }),
            description: zodd.string().openapi({
              example: 'A validation error occurred in Request.',
              description: 'Detailed description of the error'
            }),
            issue: zodd.string().openapi({
              example: 'validation_error',
              description: 'The issue'
            })
          })
        ),
        correlationId: CorrelationIdSchema,
        userFriendlyMessage: zodd.string().openapi({
          example: 'A validation error occurred. Please check your request and try again.',
          description: 'User-friendly error message'
        })
      })
    }
  },

  finalUnhandledException: {
    build: (message: string) =>
      quickErrorResponse(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Unhandled Exception',
        message,
        [
          {
            field: 'exception',
            description: message,
            issue: 'unhandled_exception'
          }
        ],
        'An unexpected error occurred. Please try again later.'
      ),
    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.InternalServerError,
      error: zodd.string().openapi({ example: 'Unhandled Exception' }),
      message: zodd.string().openapi({
        example: 'An unexpected error occurred.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/api/v1/some/endpoint',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'exception',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'An unexpected error occurred.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'unhandled_exception',
            description: 'The issue'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'An unexpected error occurred. Please try again later.',
        description: 'User-friendly error message'
      })
    })
  },

  unauthorized: {
    build: () =>
      quickErrorResponse(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'You are not authorized to access this resource.',
        [
          {
            field: 'Authorization',
            description: 'You are not authorized to access this resource.',
            issue: 'unauthorized'
          }
        ],
        'You are not authorized to access this resource.'
      ),
    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.Unauthorized,
      error: zodd.string().openapi({ example: 'Unauthorized' }),
      message: zodd.string().openapi({
        example: 'You are not authorized to access this resource.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/api/v1/some/endpoint',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'Authorization',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'You are not authorized to access this resource.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'unauthorized',
            description: 'The issue'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'You are not authorized to access this resource.',
        description: 'User-friendly error message'
      })
    })
  }
}
