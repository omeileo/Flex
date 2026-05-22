import { logger } from '@/app'
import axios from 'axios'

import { AICompletionRequest, AICompletionResponse, AIProviderConfig, IAIProvider } from '../../ai.types'
import { OpenAICompletionRequest, OpenAICompletionResponse } from './openai.types'

export class OpenAIProvider implements IAIProvider {
  private config: AIProviderConfig

  constructor(config: AIProviderConfig) {
    this.config = config
  }

  private get headers() {
    return {
      Authorization: `Bearer ${this.config.apiKey}`,
      'Content-Type': 'application/json'
    }
  }

  private supportsStructuredOutputs(model: string): boolean {
    const modelLower = model.toLowerCase()
    const supportedPatterns = ['gpt-5', 'gpt-4o', 'gpt-4-0613', 'gpt-3.5-turbo-0613', 'o1', 'o3']

    return supportedPatterns.some((pattern) => modelLower.includes(pattern))
  }

  private usesMaxCompletionTokens(model: string): boolean {
    const modelLower = model.toLowerCase()
    const newTokenParamPatterns = ['gpt-5', 'gpt-4o', 'o1', 'o3']

    return newTokenParamPatterns.some((pattern) => modelLower.includes(pattern))
  }

  async complete(request: AICompletionRequest): Promise<AICompletionResponse> {
    try {
      const model = request.model || this.config.defaultModel || 'gpt-4o-mini'
      const includeTemperature = request.temperature !== undefined && !model.includes('nano')

      let responseFormat: OpenAICompletionRequest['response_format'] | undefined

      if (request.jsonSchema && this.supportsStructuredOutputs(model)) {
        responseFormat = {
          type: 'json_schema',
          json_schema: {
            name: 'response_schema',
            schema: request.jsonSchema,
            strict: true
          }
        }
      } else if (request.responseFormat === 'json') {
        responseFormat = { type: 'json_object' }
      }

      const useCompletionTokens = this.usesMaxCompletionTokens(model)
      const tokenParam = useCompletionTokens
        ? { max_completion_tokens: request.maxTokens }
        : { max_tokens: request.maxTokens }

      const openaiRequest: OpenAICompletionRequest = {
        model,
        messages: request.messages.map((msg) => ({
          role: msg.role,
          content: msg.content
        })),
        ...(includeTemperature && { temperature: request.temperature }),
        ...(request.maxTokens && tokenParam),
        response_format: responseFormat
      }

      const endpoint = `${this.config.baseUrl || 'https://api.openai.com/v1'}/chat/completions`

      const response = await axios.post<OpenAICompletionResponse>(endpoint, openaiRequest, {
        headers: this.headers,
        timeout: request.timeout || 30000
      })

      const choice = response.data.choices[0]

      if (!choice?.message?.content) {
        logger.error('OpenAI returned empty response', { response: response.data })
        throw new Error('OpenAI returned empty response')
      }

      return {
        content: choice.message.content,
        usage: response.data.usage
          ? {
              promptTokens: response.data.usage.prompt_tokens,
              completionTokens: response.data.usage.completion_tokens,
              totalTokens: response.data.usage.total_tokens
            }
          : undefined,
        model: response.data.model,
        finishReason: choice.finish_reason
      }
    } catch (error) {
      const errorDetails: Record<string, unknown> = {
        message: error instanceof Error ? error.message : 'Unknown error'
      }

      if (axios.isAxiosError(error)) {
        errorDetails.status = error.response?.status
        errorDetails.statusText = error.response?.statusText
        errorDetails.data = error.response?.data
        errorDetails.code = error.code
      }

      logger.error('OpenAI completion error', errorDetails)
      throw error
    }
  }

  getProviderName(): string {
    return 'OpenAI'
  }
}
