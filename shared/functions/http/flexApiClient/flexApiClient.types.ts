export type FlexApiClientConfig = {
  baseUrl: string
  getToken?: () => Promise<string | null> | string | null
  onUnauthorized?: () => void
}

export type FlexApiRequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  headers?: Record<string, string>
}
