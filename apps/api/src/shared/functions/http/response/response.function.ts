import { logger } from '@/app'
import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { getNow } from '../../date.functions'
import { trace } from '../../trace.functions'
import { ErrorResponse, QuickErrorResponse, SuccessResponse } from './response.types'

/**
 * Sends a success response with the provided data and message.
 *
 * Usually used with a controller function to send a response to the client.
 *
 * @template T - The type of the data being sent in the response.
 * @param {Response} res - The Express response object.
 * @param {StatusCodes} status - The HTTP status code of the response.
 * @param {string} message - The message describing the response.
 * @param {T} data - The data to be sent in the response.
 * @param {string} userFriendlyMessage - The user-friendly message describing the response.
 * @returns {Response} - The Express response object.
 */
export const successResponse = function <T>(
  res: Response,
  status: StatusCodes,
  message: string,
  data: T,
  userFriendlyMessage: string
) {
  const responseBody: SuccessResponse<T> = {
    timestamp: getNow(),
    status,
    message,
    data,
    correlationId: trace.generateCorrelationId(),
    userFriendlyMessage
  }

  return res.status(status).json(responseBody)
}

/**
 * Sends an error response to the client.
 * @param res - The response object.
 * @param fullPath - The full path of the request.
 * @param status - The HTTP status code of the response.
 * @param error - The error code or name.
 * @param message - The error message.
 * @param details - Additional details about the error.
 * @param userFriendlyMessage - A user-friendly error message.
 * @returns The response object with the error response.
 */
export const errorResponse = function (
  res: Response,
  fullPath: string,
  status: StatusCodes,
  error: string,
  message: string,
  details: ErrorResponse['details'],
  userFriendlyMessage: string
) {
  const loggerPrefix = 'Error Response :: '
  const correlationId = trace.generateCorrelationId()

  const responseBody: ErrorResponse = {
    timestamp: getNow(),
    status,
    error,
    message,
    path: fullPath,
    details,
    correlationId,
    userFriendlyMessage
  }

  logger.error(
    `${loggerPrefix} ${correlationId} | ${fullPath} | ${status} | ${error} | ${message} | ${JSON.stringify(details)} | ${userFriendlyMessage}`
  )

  return res.status(status).json(responseBody)
}

/**
 * Generates a quick error response object.
 *
 * Usually used with a service function that does not have access to the response object immediately.
 *
 * Captured by a middleware function and fills in the missing response object and other information to complete the response.
 *
 * @param status - The HTTP status code.
 * @param error - The error code or name.
 * @param message - The error message.
 * @param details - Additional details about the error.
 * @param userFriendlyMessage - A user-friendly error message.
 *
 * @returns The generated quick error response object.
 */
export const quickErrorResponse = function (
  status: StatusCodes,
  error: string,
  message: string,
  details: ErrorResponse['details'],
  userFriendlyMessage: string
) {
  const responseBody: QuickErrorResponse = {
    timestamp: getNow(),
    status,
    error,
    message,
    details,
    correlationId: trace.generateCorrelationId(),
    userFriendlyMessage
  }

  return responseBody
}
