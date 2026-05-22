export interface ApiClientRequestConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  data?: object;
  timeout?: number;
  params?: Record<string, string | string[] | number>;
}
