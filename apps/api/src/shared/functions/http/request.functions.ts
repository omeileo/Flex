import { Request } from 'express'

/**
 * Retrieves the request parameters.
 *
 * @template Param - The type of the request parameters.
 * @param {Request} req - The request object.
 * @returns {{ Params }} - An object containing the request parameters and body.
 */
export function getParams<Params>(req: Request) {
  return req.params as Params
}

/**
 * Retrieves the request parameters and body.
 *
 * @template Param - The type of the request parameters.
 * @template Body - The type of the request body.
 * @param {Request} req - The request object.
 * @returns {{ params: Params, body: Body }} - An object containing the request parameters and body.
 */
export function getParamAndBody<Params, Body>(req: Request) {
  return {
    params: req.params as Params,
    body: req.body as Body
  }
}

/**
 * Retrieves the request query parameters.
 *
 * @template QueryParams - The type of the request query parameters.
 * @param {Request} req - The request object.
 * @returns {QueryParams} - An object containing the request query parameters.
 */
export function getQueryParams<QueryParams>(req: Request) {
  return req.query as QueryParams
}

/**
 * Retrieves the request query parameters and body.
 *
 * @template QueryParams - The type of the request query parameters.
 * @template Body - The type of the request body.
 * @param {Request} req - The request object.
 * @returns {{ queryParams: QueryParams, body: Body }} - An object containing the request query parameters and body.
 */
export function getQueryParamsAndBody<QueryParams, Body>(req: Request) {
  return {
    queryParams: req.query as QueryParams,
    body: req.body as Body
  }
}

/**
 * Retrieves the request body.
 *
 * @template Body - The type of the request body.
 * @param {Request} req - The request object.
 * @returns {Body} - The request body.
 */
export function getRequestBody<Body>(req: Request) {
  return req.body as Body
}

function getJwtTokenFromAuthorizationHeader(req: Request): string | null {
  const authorizationHeader = req.headers.authorization

  if (!authorizationHeader?.startsWith('Bearer ')) {
    return null
  }

  const token = authorizationHeader.slice('Bearer '.length).trim()

  return token.length > 0 ? token : null
}

function getJwtTokenFromCookie(req: Request): string | null {
  const encodedCookie = req.cookies['jwt']

  if (!encodedCookie) {
    return null
  }

  try {
    const token = JSON.stringify(encodedCookie)
    const parsedCookie = JSON.parse(token)

    return parsedCookie.token as string
  } catch (error) {
    return null
  }
}

export function getJwtTokenFromRequest(req: Request) {
  return getJwtTokenFromCookie(req) ?? getJwtTokenFromAuthorizationHeader(req)
}

export function getCurrentUserId(req: Request) {
  return req.userPayload?.userId
}
