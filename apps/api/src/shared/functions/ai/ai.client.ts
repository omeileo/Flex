import { logger } from '@/app'

import { env } from '../envConfig'
import { AICompletionRequest, AICompletionResponse, AIProvider, AIProviderConfig, IAIProvider } from './ai.types'
import { OpenAIProvider } from './providers/openai/openai.provider'

class AIClient {
  private provider: IAIProvider
  private providerType: AIProvider

  constructor(providerType?: AIProvider) {
    this.providerType = providerType || this.getDefaultProvider()
    this.provider = this.initializeProvider(this.providerType)
  }

  private getDefaultProvider(): AIProvider {
    const configuredProvider = env.AI_PROVIDER?.toLowerCase()

    switch (configuredProvider) {
      case 'openai':
        return AIProvider.OPENAI
      case 'anthropic':
        return AIProvider.ANTHROPIC
      case 'google':
        return AIProvider.GOOGLE
      default:
        logger.warn('No AI provider configured, defaulting to OpenAI')
        return AIProvider.OPENAI
    }
  }

  private initializeProvider(providerType: AIProvider): IAIProvider {
    switch (providerType) {
      case AIProvider.OPENAI:
        return this.createOpenAIProvider()
      case AIProvider.ANTHROPIC:
        throw new Error('Anthropic provider not yet implemented')
      case AIProvider.GOOGLE:
        throw new Error('Google provider not yet implemented')
      default: {
        const providerTypeStr = String(providerType as unknown)
        throw new Error(`Unsupported AI provider: ${providerTypeStr}`)
      }
    }
  }

  private createOpenAIProvider(): OpenAIProvider {
    const config: AIProviderConfig = {
      provider: AIProvider.OPENAI,
      apiKey: env.OPENAI_API_KEY,
      baseUrl: env.OPENAI_BASE_URL,
      defaultModel: env.OPENAI_MODEL
    }

    return new OpenAIProvider(config)
  }

  async complete(request: AICompletionRequest): Promise<AICompletionResponse> {
    logger.info('AI completion request', {
      provider: this.provider.getProviderName(),
      messageCount: request.messages.length,
      temperature: request.temperature,
      responseFormat: request.responseFormat
    })

    try {
      const response = await this.provider.complete(request)

      logger.info('AI completion successful', {
        provider: this.provider.getProviderName(),
        tokensUsed: response.usage?.totalTokens,
        model: response.model
      })

      return response
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      logger.error(`AI completion failed (${this.provider.getProviderName()}): ${errorMessage}`)
      throw error
    }
  }

  getProviderName(): string {
    return this.provider.getProviderName()
  }

  switchProvider(providerType: AIProvider): void {
    logger.info('Switching AI provider', {
      from: this.providerType,
      to: providerType
    })

    this.providerType = providerType
    this.provider = this.initializeProvider(providerType)
  }
}

export const aiClient = new AIClient()

export { AIClient }
