import axios, { AxiosError } from 'axios'
import qs from 'qs'

import logger from '../../shared/functions/Logger/logger.functions'
import { ApiErrorResponse, ApiResponse } from '../../shared/types/api.types'
import { ApiClientRequestConfig } from './apiClient.types'
import env from './env.config'

/**
 * Configures and sends an API request.
 *
 * @param {ApiClientRequestConfig} config - The configuration object for the request.
 * @returns {Promise<ApiResponse<object>>} - Resolves to the response data (success or error).
 */
export const configureRequest = async (config: ApiClientRequestConfig): Promise<ApiResponse<object>> => {
  const { url, method, headers = {}, data, timeout = Number(env.API_TIMEOUT), params } = config

  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...headers
  }

  const requestConfig: ApiClientRequestConfig = {
    url: `${env.API_BASE_URL}/${url}`,
    method,
    headers: defaultHeaders,
    data,
    timeout,
    params
  }

  return executeRequest(requestConfig)
    .then((response) => response)
    .catch((error) => {
      logger.logError(error, 'Error during request', 'configureRequest')
      throw error
    })
}

/**
 * Executes an API request using the provided configuration.
 */
export const executeRequest = async (requestConfig: ApiClientRequestConfig): Promise<ApiResponse<object>> => {
  try {
    const response = await axios({
      ...requestConfig,
      paramsSerializer: {
        serialize: (params) => qs.stringify(params, { arrayFormat: 'repeat' })
      }
    })

    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    const apiErrorResponse = axiosError.response?.data as ApiErrorResponse
    const errorMessage = apiErrorResponse?.message || 'Unknown error'

    logger.logError(apiErrorResponse ?? axiosError, errorMessage, 'executeRequest')

    throw apiErrorResponse ?? axiosError
  }
}

/**
 * Replaces path variables in a URL with corresponding values from an object.
 *
 * @example
 * replacePathVariables('/users/:userId/posts/:postId', { userId: '123', postId: '456' })
 * // returns '/users/123/posts/456'
 */
export const replacePathVariables = (path: string, params: Record<string, string | number>): string => {
  try {
    let updatedPath = path

    Object.entries(params).forEach(([key, value]) => {
      const regex = new RegExp(`:${key}`, 'g')
      updatedPath = updatedPath.replace(regex, value.toString())
    })

    return updatedPath
  } catch (error) {
    logger.logError(error, 'Error replacing path variables', 'replacePathVariables')
    throw error
  }
}
