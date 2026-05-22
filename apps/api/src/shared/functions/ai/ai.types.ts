export enum AIProvider {
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
  GOOGLE = 'google'
}

export interface AIMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export type JSONSchema = Record<string, unknown>

export interface AICompletionRequest {
  messages: AIMessage[]
  temperature?: number
  maxTokens?: number
  responseFormat?: 'text' | 'json'
  model?: string
  timeout?: number
  jsonSchema?: JSONSchema
}

export interface AICompletionResponse {
  content: string
  usage?: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
  model?: string
  finishReason?: string
}

export interface AIProviderConfig {
  provider: AIProvider
  apiKey: string
  baseUrl?: string
  defaultModel?: string
}

export interface IAIProvider {
  complete(request: AICompletionRequest): Promise<AICompletionResponse>
  getProviderName(): string
}
