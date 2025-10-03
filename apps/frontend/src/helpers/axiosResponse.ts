import type { AxiosError, AxiosResponse } from 'axios'

/**
 *
 * @param response
 * @returns
 */
const responseBody = (response: AxiosResponse) => response?.data

/**
 *
 * @param response
 * @returns
 */
const responseError = (response: AxiosError) => response.response

export { responseBody, responseError }
