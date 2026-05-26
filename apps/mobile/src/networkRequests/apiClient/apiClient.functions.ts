import axios, { AxiosError } from 'axios'
import qs from 'qs'

import logger from '../../shared/functions/Logger/logger.functions'
import { ApiErrorResponse, ApiResponse } from '../../shared/types/api.types'
import { getFlexApiToken } from '../flexApi/flexApiToken.functions'
import { ApiClientRequestConfig } from './apiClient.types'
import env from './env.config'

/**
 * Configures and sends an API request.
 *
 * @param {ApiClientRequestConfig} config - The configuration object for the request.
 * @returns {Promise<ApiResponse<object>>} - A promise that resolves to the response data which will be of type ApiSuccessResponse or ApiErrorResponse.
 *
 * @throws {AxiosError | ApiErrorResponse} Will throw an error if the request fails.
 */
export const configureRequest = async (config: ApiClientRequestConfig): Promise<ApiResponse<object>> => {
  const { url, method, headers = {}, data, timeout = env.API_TIMEOUT, params, onUploadProgress } = config

  const isFormData = typeof FormData !== 'undefined' && data instanceof FormData
  const token = await getFlexApiToken()
  const defaultHeaders = isFormData
    ? { ...headers }
    : {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers
      }

  const requestConfig: ApiClientRequestConfig = {
    url: `${env.API_BASE_URL}/${url}`,
    method,
    headers: defaultHeaders,
    data,
    timeout: Number(timeout),
    params,
    onUploadProgress
  }

  return executeRequest(requestConfig)
}

/**
 * Executes an API request using the provided configuration.
 */
export const executeRequest = async (requestConfig: ApiClientRequestConfig): Promise<ApiResponse<object>> => {
  try {
    const response = await axios({
      ...requestConfig,
      timeout: Number(requestConfig.timeout),
      paramsSerializer: {
        serialize: (params) => {
          return qs.stringify(params, { arrayFormat: 'repeat' })
        }
      },
      onUploadProgress: requestConfig.onUploadProgress
    })

    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    const flexError = axiosError.response?.data as ApiErrorResponse
    const errorMessage = flexError?.message || 'Unknown error'

    logger.logError(flexError ?? axiosError, errorMessage, 'executeRequest')

    throw flexError ?? axiosError
  }
}

/**
 * Replaces path variables in a URL with corresponding values from an object.
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
