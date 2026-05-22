export interface OpenAICompletionRequest {
  model: string
  messages: OpenAIMessage[]
  temperature?: number
  max_tokens?: number
  max_completion_tokens?: number
  response_format?:
    | { type: 'json_object' }
    | { type: 'json_schema'; json_schema: { name: string; schema: Record<string, unknown>; strict?: boolean } }
}

export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface OpenAICompletionResponse {
  id: string
  object: string
  created: number
  model: string
  choices: OpenAIChoice[]
  usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export interface OpenAIChoice {
  index: number
  message: OpenAIMessage
  finish_reason: string
}
