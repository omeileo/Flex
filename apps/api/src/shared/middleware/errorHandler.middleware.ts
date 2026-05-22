import { Prisma } from '@prisma/client'
import { Errback, ErrorRequestHandler, NextFunction, Request, RequestHandler, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { globalErrors } from '../dictionary/errors.dictionary'
import { errorResponse } from '../functions/http/response/response.function'
import { QuickErrorResponse } from '../functions/http/response/response.types'

const unexpectedRequest: RequestHandler = (_req, res) => {
  res.sendStatus(StatusCodes.NOT_FOUND)
}

const addErrorToRequestLog: ErrorRequestHandler = (err: Errback, req: Request, res: Response, next: NextFunction) => {
  res.locals.err = err
  next(err)
}

function prismaErrorHandler(error: Errback, req: Request, res: Response, next: NextFunction) {
  if (error instanceof Prisma.PrismaClientInitializationError) {
    next(globalErrors.databaseError.databaseConnectionSetupFailed.build())

    return
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle known request errors
    next(globalErrors.databaseError.prismaClientKnownRequestError.build())

    return
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    // Handle unknown request errors
    next(globalErrors.databaseError.prismaClientUnknownRequestError.build())

    return
  }

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    // Handle Rust panic errors
    next(globalErrors.databaseError.prismaClientRustPanicError.build())

    return
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    // Handle validation errors
    next(globalErrors.databaseError.prismaClientValidationError.build())

    console.error('Prisma validation error:', error)

    return
  }

  next(error)
}

/**
 * Handles quick error responses.
 *
 * Middleware function that catches the quick error responses, adds the remaning error details to the response and sends the response to the client.
 *
 * @param err - The error object.
 * @param _req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 */
export const quickErrorResponseHandler: ErrorRequestHandler = (
  err: Errback,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let quickError: QuickErrorResponse = err as unknown as QuickErrorResponse

  if (!quickError.status) {
    console.error('finalUnhandledException', err)
    quickError = globalErrors.finalUnhandledException.build('Unknown error')
  }

  errorResponse(
    res,
    req.originalUrl,
    quickError.status,
    quickError.error,
    quickError.message,
    quickError.details,
    quickError.userFriendlyMessage
  )

  next()
}

export default () => [unexpectedRequest, addErrorToRequestLog, prismaErrorHandler, quickErrorResponseHandler]
