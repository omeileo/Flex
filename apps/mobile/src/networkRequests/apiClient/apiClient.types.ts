export interface ApiClientRequestConfig {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  headers?: Record<string, string>
  data?: object
  timeout?: number | string
  params?: Record<string, string | string[] | number>
  onUploadProgress?: (progressEvent: { loaded: number; total?: number }) => void
}
