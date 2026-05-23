import { Subject } from 'rxjs'

export interface NetworkLoggerRequest {
  requestId?: number
  url?: string
  method?: string
  request?: {
    headers?: Record<string, string>
    body?: unknown
  }
  response?: {
    headers?: Record<string, string>
    body?: unknown
    statusCode?: number
  }
  timeoutPeriod?: number
  responseTime?: number
}

const NetworkLoggerSubject = new Subject<NetworkLoggerRequest>()

export default NetworkLoggerSubject
