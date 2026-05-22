export type ApiResponse<DataType = undefined> = ApiSuccessResponse<DataType> | ApiErrorResponse

export interface ApiSuccessResponse<DataType> {
  timestamp: string
  status: number
  message: string
  data: DataType
  correlationId: string
  userFriendlyMessage: string
}

export interface ErrorDetail {
  field: string
  issue: string
  description: string
}

export interface ApiErrorResponse {
  timestamp: string
  status: number
  error: string
  message: string
  path: string
  details: ErrorDetail[]
  correlationId: string
  userFriendlyMessage: string
}

export interface Status {
  name: string
  displayName: string
  description: string
}
